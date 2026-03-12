// Security utilities for PawTrack

// =============================================
// XSS PROTECTION
// =============================================

// Sanitize user input to prevent XSS attacks
export function sanitizeInput(input) {
  if (typeof input !== 'string') return input
  
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',
  }
  
  return input.replace(/[&<>"'`=/]/g, char => map[char])
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
  
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters')
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
// RATE LIMITING (Client-side)
// =============================================

const rateLimitStore = new Map()

export function checkRateLimit(key, maxAttempts = 5, windowMs = 60000) {
  const now = Date.now()
  const record = rateLimitStore.get(key) || { attempts: 0, resetTime: now + windowMs }
  
  // Reset if window has passed
  if (now > record.resetTime) {
    record.attempts = 0
    record.resetTime = now + windowMs
  }
  
  record.attempts++
  rateLimitStore.set(key, record)
  
  const remaining = maxAttempts - record.attempts
  const isLimited = remaining < 0
  
  return {
    isLimited,
    remaining: Math.max(0, remaining),
    resetTime: record.resetTime,
    retryAfter: isLimited ? Math.ceil((record.resetTime - now) / 1000) : 0,
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
}
