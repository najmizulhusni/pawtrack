// Security utilities for PawTrack

// =============================================
// XSS PROTECTION
// =============================================

// Sanitize user input to prevent XSS attacks
export function sanitizeInput(input) {
  if (typeof input !== 'string') return input
  
  // Remove null bytes and control characters
  let cleaned = input.replace(/[\x00-\x1F\x7F]/g, '')
  
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',
    '(': '&#x28;',
    ')': '&#x29;',
    '{': '&#x7B;',
    '}': '&#x7D;',
    '[': '&#x5B;',
    ']': '&#x5D;',
  }
  
  return cleaned.replace(/[&<>"'`=/(){}[\]]/g, char => map[char])
}

// Sanitize object recursively
export function sanitizeObject(obj) {
  if (typeof obj === 'string') return sanitizeInput(obj)
  if (Array.isArray(obj)) return obj.map(sanitizeObject)
  if (obj && typeof obj === 'object') {
    const sanitized = {}
    for (const key of Object.keys(obj)) {
      sanitized[key] = sanitizeObject(obj[key])
    }
    return sanitized
  }
  return obj
}

// Validate and sanitize HTML content (strip all tags)
export function stripHtml(html) {
  if (typeof html !== 'string') return html
  return html.replace(/<[^>]*>/g, '')
}

// =============================================
// INPUT VALIDATION
// =============================================

// Email validation
export function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Phone validation (Malaysian format)
export function isValidPhone(phone) {
  const phoneRegex = /^(\+?6?01)[0-46-9]-*[0-9]{7,8}$/
  return phoneRegex.test(phone.replace(/\s/g, ''))
}

// Password strength validation
export function validatePassword(password) {
  const errors = []
  
  if (password.length < 12) {
    errors.push('Password must be at least 12 characters')
  }
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }
  if (!/[0-9]/.test(password)) {
    errors.push('Password must contain at least one number')
  }
  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)) {
    errors.push('Password must contain at least one special character (!@#$%^&*)')
  }
  
  // Check for common patterns
  if (/(.)\1{2,}/.test(password)) {
    errors.push('Password cannot contain 3+ repeated characters')
  }
  if (/^(123|abc|password|qwerty)/i.test(password)) {
    errors.push('Password is too common')
  }
  
  return {
    isValid: errors.length === 0,
    errors,
    strength: errors.length === 0 ? 'strong' : errors.length <= 2 ? 'medium' : 'weak',
  }
}

// Name validation
export function isValidName(name) {
  if (!name || typeof name !== 'string') return false
  const trimmed = name.trim()
  return trimmed.length >= 2 && trimmed.length <= 100 && /^[a-zA-Z\s'-]+$/.test(trimmed)
}

// =============================================
// RATE LIMITING (Client-side + Server-side ready)
// =============================================

const rateLimitStore = new Map()
const ipBlocklist = new Map() // Track blocked IPs

export function checkRateLimit(key, maxAttempts = 3, windowMs = 60000) {
  const now = Date.now()
  const record = rateLimitStore.get(key) || { attempts: 0, resetTime: now + windowMs, blocked: false, blockedUntil: 0 }
  
  // Check if key is temporarily blocked
  if (record.blocked && now < record.blockedUntil) {
    const retryAfter = Math.ceil((record.blockedUntil - now) / 1000)
    return {
      isLimited: true,
      remaining: 0,
      resetTime: record.blockedUntil,
      retryAfter,
      blocked: true,
    }
  }
  
  // Reset if window has passed
  if (now > record.resetTime) {
    record.attempts = 0
    record.resetTime = now + windowMs
    record.blocked = false
  }
  
  record.attempts++
  
  // Block after max attempts (exponential backoff)
  if (record.attempts > maxAttempts) {
    record.blocked = true
    record.blockedUntil = now + (windowMs * Math.pow(2, Math.floor(record.attempts / maxAttempts) - 1))
  }
  
  rateLimitStore.set(key, record)
  
  const remaining = Math.max(0, maxAttempts - record.attempts)
  const isLimited = remaining <= 0
  
  return {
    isLimited,
    remaining,
    resetTime: record.resetTime,
    retryAfter: isLimited ? Math.ceil((record.blockedUntil - now) / 1000) : 0,
    blocked: record.blocked,
  }
}

export function clearRateLimit(key) {
  rateLimitStore.delete(key)
}

// =============================================
// UUID GENERATION
// =============================================

export function generateUUID() {
  // Use crypto API for secure UUID generation
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID()
  }
  
  // Fallback for older browsers
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0
    const v = c === 'x' ? r : (r & 0x3 | 0x8)
    return v.toString(16)
  })
}

// =============================================
// SESSION SECURITY
// =============================================

// Generate CSRF token
export function generateCSRFToken() {
  const array = new Uint8Array(32)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

// Store CSRF token
export function setCSRFToken() {
  const token = generateCSRFToken()
  sessionStorage.setItem('csrf_token', token)
  return token
}

// Validate CSRF token
export function validateCSRFToken(token) {
  const storedToken = sessionStorage.getItem('csrf_token')
  return storedToken && storedToken === token
}

// =============================================
// SECURE STORAGE
// =============================================

// Encrypt sensitive data before storing (basic obfuscation)
export function secureStore(key, value) {
  try {
    const encoded = btoa(JSON.stringify(value))
    localStorage.setItem(`pawtrack_${key}`, encoded)
  } catch (e) {
    console.error('Failed to store data securely:', e)
  }
}

// Retrieve and decrypt data
export function secureRetrieve(key) {
  try {
    const encoded = localStorage.getItem(`pawtrack_${key}`)
    if (!encoded) return null
    return JSON.parse(atob(encoded))
  } catch (e) {
    console.error('Failed to retrieve data:', e)
    return null
  }
}

// Clear secure storage
export function secureClear(key) {
  localStorage.removeItem(`pawtrack_${key}`)
}

// =============================================
// CONTENT SECURITY
// =============================================

// Validate URL (prevent javascript: and data: URLs)
export function isValidUrl(url) {
  if (!url || typeof url !== 'string') return false
  try {
    const parsed = new URL(url)
    return ['http:', 'https:'].includes(parsed.protocol)
  } catch {
    return false
  }
}

// Sanitize URL
export function sanitizeUrl(url) {
  if (!isValidUrl(url)) return ''
  return url
}

// =============================================
// ADDITIONAL SECURITY MEASURES
// =============================================

// Validate and sanitize file uploads
export function validateFileUpload(file, maxSizeMB = 5, allowedTypes = ['image/jpeg', 'image/png', 'image/webp']) {
  const errors = []
  const maxSizeBytes = maxSizeMB * 1024 * 1024
  
  if (!file) {
    errors.push('No file selected')
    return { isValid: false, errors }
  }
  
  if (file.size > maxSizeBytes) {
    errors.push(`File size must be less than ${maxSizeMB}MB`)
  }
  
  if (!allowedTypes.includes(file.type)) {
    errors.push(`File type must be one of: ${allowedTypes.join(', ')}`)
  }
  
  // Check file extension matches MIME type
  const extension = file.name.split('.').pop().toLowerCase()
  const mimeToExt = {
    'image/jpeg': ['jpg', 'jpeg'],
    'image/png': ['png'],
    'image/webp': ['webp'],
  }
  
  const validExtensions = mimeToExt[file.type] || []
  if (!validExtensions.includes(extension)) {
    errors.push('File extension does not match file type')
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}

// Detect and prevent SQL injection patterns
export function detectSQLInjection(input) {
  if (typeof input !== 'string') return false
  
  const sqlPatterns = [
    /(\b(UNION|SELECT|INSERT|UPDATE|DELETE|DROP|CREATE|ALTER|EXEC|EXECUTE|SCRIPT)\b)/i,
    /(-{2}|\/\*|\*\/|;|'|")/,
    /(OR\s+1\s*=\s*1|AND\s+1\s*=\s*1)/i,
  ]
  
  return sqlPatterns.some(pattern => pattern.test(input))
}

// Validate data types strictly
export function validateDataType(value, expectedType) {
  const typeMap = {
    'string': (v) => typeof v === 'string',
    'number': (v) => typeof v === 'number' && !isNaN(v),
    'boolean': (v) => typeof v === 'boolean',
    'email': (v) => isValidEmail(v),
    'phone': (v) => isValidPhone(v),
    'url': (v) => isValidUrl(v),
    'date': (v) => !isNaN(Date.parse(v)),
    'uuid': (v) => /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(v),
  }
  
  const validator = typeMap[expectedType]
  return validator ? validator(value) : false
}

// Generate secure random token
export function generateSecureToken(length = 32) {
  const array = new Uint8Array(length)
  crypto.getRandomValues(array)
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('')
}

// Hash password (client-side - for additional security layer)
export async function hashPassword(password) {
  const encoder = new TextEncoder()
  const data = encoder.encode(password)
  const hashBuffer = await crypto.subtle.digest('SHA-256', data)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('')
}

// Validate request headers
export function validateRequestHeaders(headers) {
  const requiredHeaders = ['content-type']
  const validContentTypes = ['application/json', 'application/x-www-form-urlencoded']
  
  const errors = []
  
  for (const header of requiredHeaders) {
    if (!headers[header]) {
      errors.push(`Missing required header: ${header}`)
    }
  }
  
  if (headers['content-type'] && !validContentTypes.some(ct => headers['content-type'].includes(ct))) {
    errors.push('Invalid content-type header')
  }
  
  return {
    isValid: errors.length === 0,
    errors,
  }
}

export default {
  sanitizeInput,
  sanitizeObject,
  stripHtml,
  isValidEmail,
  isValidPhone,
  validatePassword,
  isValidName,
  checkRateLimit,
  clearRateLimit,
  generateUUID,
  generateCSRFToken,
  setCSRFToken,
  validateCSRFToken,
  secureStore,
  secureRetrieve,
  secureClear,
  isValidUrl,
  sanitizeUrl,
  validateFileUpload,
  detectSQLInjection,
  validateDataType,
  generateSecureToken,
  hashPassword,
  validateRequestHeaders,
}
