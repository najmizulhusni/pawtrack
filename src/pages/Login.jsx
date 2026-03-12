import { useState, useEffect } from 'react'
import { auth, supabase } from '../lib/supabase'
import { 
  sanitizeInput, 
  isValidEmail, 
  isValidPhone, 
  validatePassword, 
  isValidName,
  checkRateLimit,
  clearRateLimit 
} from '../lib/security'

const CatIcon = () => <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3.1-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0112 5z"/></svg>
const MailIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
const LockIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
const UserIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
const PhoneIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
const EyeIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
const EyeOffIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/><line x1="1" y1="1" x2="23" y2="23"/></svg>
const CheckCircle = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
const LoaderIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ animation: 'spin 1s linear infinite' }}><path d="M21 12a9 9 0 11-6.219-8.56"/></svg>

// Demo mode disabled - using real Supabase auth
const DEMO_MODE = false

export default function Login({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', phone: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [passwordStrength, setPasswordStrength] = useState(null)
  const [rateLimited, setRateLimited] = useState(null)

  // Check password strength on change
  useEffect(() => {
    if (form.password && isSignUp) {
      setPasswordStrength(validatePassword(form.password))
    } else {
      setPasswordStrength(null)
    }
  }, [form.password, isSignUp])

  // Validate form inputs
  const validateForm = () => {
    const errors = []
    
    // Sanitize inputs
    const email = sanitizeInput(form.email.trim())
    const name = sanitizeInput(form.name.trim())
    const phone = sanitizeInput(form.phone.trim())
    
    if (!isValidEmail(email)) {
      errors.push('Please enter a valid email address')
    }
    
    if (isSignUp) {
      if (!isValidName(name)) {
        errors.push('Please enter a valid name (2-100 characters, letters only)')
      }
      if (phone && !isValidPhone(phone)) {
        errors.push('Please enter a valid Malaysian phone number')
      }
      const pwdValidation = validatePassword(form.password)
      if (!pwdValidation.isValid) {
        errors.push(...pwdValidation.errors)
      }
    } else {
      if (!form.password) {
        errors.push('Please enter your password')
      }
    }
    
    return errors
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    
    // Rate limiting check
    const rateLimitKey = `login_${form.email}`
    const rateLimit = checkRateLimit(rateLimitKey, 5, 60000) // 5 attempts per minute
    
    if (rateLimit.isLimited) {
      setRateLimited(rateLimit)
      setError(`Too many attempts. Please try again in ${rateLimit.retryAfter} seconds.`)
      return
    }
    
    // Validate form
    const validationErrors = validateForm()
    if (validationErrors.length > 0) {
      setError(validationErrors[0])
      return
    }
    
    setLoading(true)
    
    try {
      // Use Supabase authentication
      if (isSignUp) {
        const { data, error: signUpError } = await auth.signUp(
          form.email,
          form.password,
          { name: sanitizeInput(form.name), phone: sanitizeInput(form.phone) }
        )
        
        // If user already exists, try to login instead
        if (signUpError?.message?.includes('already registered')) {
          const { data: loginData, error: loginError } = await auth.signIn(form.email, form.password)
          
          if (loginError) {
            throw loginError
          }
          
          if (loginData?.user) {
            // Check if profile exists
            const { data: profileData } = await supabase
              .from('profiles')
              .select('*')
              .eq('user_id', loginData.user.id)
              .single()
            
            // If profile doesn't exist, create it
            if (!profileData) {
              await supabase
                .from('profiles')
                .insert({
                  user_id: loginData.user.id,
                  name: sanitizeInput(form.name),
                  email: loginData.user.email,
                  phone: sanitizeInput(form.phone),
                  address: '',
                  created_at: new Date().toISOString(),
                  updated_at: new Date().toISOString()
                })
            }
            
            clearRateLimit(rateLimitKey)
            onLogin({
              id: loginData.user.id,
              name: sanitizeInput(form.name),
              email: loginData.user.email,
              phone: sanitizeInput(form.phone),
            })
            return
          }
        }
        
        if (signUpError) {
          throw signUpError
        }
        
        if (data?.user) {
          // Create profile in profiles table
          const { error: profileError } = await supabase
            .from('profiles')
            .insert({
              user_id: data.user.id,
              name: sanitizeInput(form.name),
              email: data.user.email,
              phone: sanitizeInput(form.phone),
              address: '',
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString()
            })
          
          if (profileError) {
            console.error('Profile creation error:', profileError)
            throw new Error('Failed to create user profile. Please try again.')
          }
          
          clearRateLimit(rateLimitKey)
          onLogin({
            id: data.user.id,
            name: sanitizeInput(form.name),
            email: data.user.email,
            phone: sanitizeInput(form.phone),
          })
        }
      } else {
        const { data, error: signInError } = await auth.signIn(form.email, form.password)
        
        if (signInError) {
          throw signInError
        }
        
        if (data?.user) {
          // Check if user profile exists (user must have completed signup)
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', data.user.id)
            .single()
          
          if (profileError || !profileData) {
            // User exists in auth but hasn't completed signup
            await auth.signOut()
            throw new Error('Please complete your signup first. Your account was not fully created.')
          }
          
          clearRateLimit(rateLimitKey)
          onLogin({
            id: data.user.id,
            name: data.user.user_metadata?.name || 'Pet Owner',
            email: data.user.email,
            phone: data.user.user_metadata?.phone || '',
          })
        }
      }
    } catch (err) {
      console.error('Auth error:', err)
      setError(err.message || 'Authentication failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    if (!form.email || !isValidEmail(form.email)) {
      setError('Please enter a valid email address first')
      return
    }
    
    setLoading(true)
    try {
      const { error } = await auth.resetPassword(form.email)
      if (error) throw error
      setError('') // Clear any existing error
      alert('Password reset email sent! Check your inbox.')
    } catch (err) {
      setError(err.message || 'Failed to send reset email')
    } finally {
      setLoading(false)
    }
  }

  const features = [
    'Track your pet\'s health & schedule',
    'Manage medical records securely',
    'Adopt cats from trusted shelters',
    'Get reminders for vaccinations'
  ]

  const getStrengthColor = (strength) => {
    switch (strength) {
      case 'strong': return '#22c55e'
      case 'medium': return '#f59e0b'
      default: return '#ef4444'
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Left Side - Hero (Desktop Only) */}
      <div className="login-hero" style={{ flex: 1, background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #6366f1 100%)', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '-100px', right: '-100px', width: '300px', height: '300px', background: 'rgba(255,255,255,0.1)', borderRadius: '50%' }} />
        <div style={{ position: 'absolute', bottom: '-50px', left: '-50px', width: '200px', height: '200px', background: 'rgba(255,255,255,0.08)', borderRadius: '50%' }} />
        
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '480px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '40px' }}>
            <div style={{ width: '56px', height: '56px', background: 'white', borderRadius: '14px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5' }}><CatIcon /></div>
            <span style={{ fontSize: '28px', fontWeight: '800', color: 'white' }}>PawTrack</span>
          </div>
          
          <h1 style={{ fontSize: '42px', fontWeight: '800', color: 'white', margin: '0 0 16px', lineHeight: 1.2 }}>Your Pet's Health,<br/>All in One Place</h1>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.85)', margin: '0 0 40px', lineHeight: 1.6 }}>The complete pet management app for cat lovers. Track health, schedule care, and discover adoption opportunities.</p>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {features.map((feature, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '24px', height: '24px', background: 'rgba(255,255,255,0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><CheckCircle /></div>
                <span style={{ fontSize: '15px', color: 'rgba(255,255,255,0.95)' }}>{feature}</span>
              </div>
            ))}
          </div>

          <div style={{ marginTop: '50px', padding: '20px', background: 'rgba(255,255,255,0.1)', borderRadius: '16px', backdropFilter: 'blur(10px)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex' }}>
                {['https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=100&q=80', 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=100&q=80', 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=100&q=80'].map((img, i) => (
                  <img key={i} src={img} alt="" style={{ width: '36px', height: '36px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', marginLeft: i > 0 ? '-10px' : 0, objectFit: 'cover' }} />
                ))}
              </div>
              <div>
                <p style={{ fontSize: '14px', fontWeight: '600', color: 'white', margin: 0 }}>Malaysia's first integrated pet health and adoption platform</p>
                <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.7)', margin: '2px 0 0' }}>Trusted by pet owners across the country</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Form */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', background: '#f8fafc', minHeight: '100vh' }}>
        {/* Mobile Hero - Fixed Design */}
        <div className="mobile-hero" style={{ display: 'none', background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)', padding: '50px 24px 80px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
          {/* Decorative elements */}
          <div style={{ position: 'absolute', top: '15%', left: '8%', width: '50px', height: '50px', background: 'rgba(255,255,255,0.15)', borderRadius: '50%' }} />
          <div style={{ position: 'absolute', top: '10%', right: '8%', width: '70px', height: '70px', border: '3px solid rgba(255,255,255,0.2)', borderRadius: '16px', transform: 'rotate(15deg)' }} />
          <div style={{ position: 'absolute', bottom: '20%', right: '15%', width: '40px', height: '40px', background: 'rgba(255,255,255,0.1)', borderRadius: '10px', transform: 'rotate(-10deg)' }} />
          
          {/* Cat icon */}
          <div style={{ position: 'relative', zIndex: 1, marginBottom: '24px' }}>
            <div style={{ width: '100px', height: '100px', background: 'white', borderRadius: '24px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5', boxShadow: '0 8px 32px rgba(0,0,0,0.15)' }}>
              <CatIcon />
            </div>
          </div>
          
          {/* Text */}
          <div style={{ position: 'relative', zIndex: 1 }}>
            <h1 style={{ fontSize: '26px', fontWeight: '800', color: 'white', margin: '0 0 12px', lineHeight: 1.3 }}>
              Your Pet's <span style={{ color: '#fbbf24' }}>Health</span>,<br/>All in One Place
            </h1>
            <p style={{ fontSize: '14px', color: 'rgba(255,255,255,0.85)', margin: 0 }}>
              Malaysia's first integrated pet health platform
            </p>
          </div>
        </div>

        {/* Form Container */}
        <div className="form-container" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 24px' }}>
          <div className="form-card" style={{ width: '100%', maxWidth: '400px', background: 'transparent', borderRadius: '0', padding: '0' }}>
            <div className="desktop-form-header" style={{ textAlign: 'center', marginBottom: '32px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', margin: '0 0 8px' }}>{isSignUp ? 'Create Account' : 'Welcome Back'}</h2>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>{isSignUp ? 'Start your pet care journey' : 'Sign in to continue to PawTrack'}</p>
            </div>

            {/* Mobile Form Header */}
            <div className="mobile-form-header" style={{ display: 'none', textAlign: 'center', marginBottom: '24px' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', margin: '0 0 8px' }}>{isSignUp ? 'Sign Up' : 'Login'}</h2>
              <p style={{ fontSize: '14px', color: '#64748b', margin: 0 }}>
                {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                <span onClick={() => { setIsSignUp(!isSignUp); setError('') }} style={{ color: '#4f46e5', fontWeight: '600', cursor: 'pointer' }}>{isSignUp ? 'Login' : 'Sign Up'}</span>
              </p>
            </div>

            {/* Tab Buttons - Desktop only */}
            <div className="desktop-tabs" style={{ display: 'flex', gap: '12px', marginBottom: '24px' }}>
              <button onClick={() => { setIsSignUp(false); setError('') }} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: !isSignUp ? 'none' : '1px solid #e5e7eb', background: !isSignUp ? 'linear-gradient(135deg, #4f46e5, #7c3aed)' : 'white', color: !isSignUp ? 'white' : '#64748b', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Login</button>
              <button onClick={() => { setIsSignUp(true); setError('') }} style={{ flex: 1, padding: '14px', borderRadius: '12px', border: isSignUp ? 'none' : '1px solid #e5e7eb', background: isSignUp ? 'linear-gradient(135deg, #4f46e5, #7c3aed)' : 'white', color: isSignUp ? 'white' : '#64748b', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Sign Up</button>
            </div>

            {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '10px', padding: '12px', marginBottom: '16px' }}><p style={{ color: '#b91c1c', fontSize: '13px', margin: 0, textAlign: 'center' }}>{error}</p></div>}

            <form onSubmit={handleSubmit}>
              {isSignUp && (
                <>
                  <div style={{ position: 'relative', marginBottom: '14px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '500', color: '#475569', display: 'block', marginBottom: '6px' }}>Full Name *</label>
                    <div style={{ position: 'absolute', left: '14px', top: '34px', color: '#94a3b8' }}><UserIcon /></div>
                    <input type="text" placeholder="Enter your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} maxLength={100} autoComplete="name" style={{ width: '100%', padding: '14px 14px 14px 46px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box', background: 'white' }} />
                  </div>
                  <div style={{ position: 'relative', marginBottom: '14px' }}>
                    <label style={{ fontSize: '12px', fontWeight: '500', color: '#475569', display: 'block', marginBottom: '6px' }}>Phone Number</label>
                    <div style={{ position: 'absolute', left: '14px', top: '34px', color: '#94a3b8' }}><PhoneIcon /></div>
                    <input type="tel" placeholder="+60123456789" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} maxLength={15} autoComplete="tel" style={{ width: '100%', padding: '14px 14px 14px 46px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box', background: 'white' }} />
                  </div>
                </>
              )}
              
              <div style={{ position: 'relative', marginBottom: '14px' }}>
                <label style={{ fontSize: '12px', fontWeight: '500', color: '#475569', display: 'block', marginBottom: '6px' }}>Email Address *</label>
                <div style={{ position: 'absolute', left: '14px', top: '34px', color: '#94a3b8' }}><MailIcon /></div>
                <input type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} maxLength={255} autoComplete="email" required style={{ width: '100%', padding: '14px 14px 14px 46px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box', background: 'white' }} />
              </div>
              
              <div style={{ position: 'relative', marginBottom: isSignUp && passwordStrength ? '8px' : '20px' }}>
                <label style={{ fontSize: '12px', fontWeight: '500', color: '#475569', display: 'block', marginBottom: '6px' }}>Password *</label>
                <div style={{ position: 'absolute', left: '14px', top: '34px', color: '#94a3b8' }}><LockIcon /></div>
                <input type={showPassword ? 'text' : 'password'} placeholder={isSignUp ? 'Min 8 chars, uppercase, number' : 'Enter your password'} value={form.password} onChange={e => setForm({...form, password: e.target.value})} maxLength={128} autoComplete={isSignUp ? 'new-password' : 'current-password'} required style={{ width: '100%', padding: '14px 46px 14px 46px', borderRadius: '12px', border: '1px solid #e2e8f0', fontSize: '14px', boxSizing: 'border-box', background: 'white' }} />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '14px', top: '34px', background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', padding: 0 }}>{showPassword ? <EyeOffIcon /> : <EyeIcon />}</button>
              </div>

              {/* Password strength indicator */}
              {isSignUp && passwordStrength && (
                <div style={{ marginBottom: '16px' }}>
                  <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                    {[1, 2, 3].map(i => (
                      <div key={i} style={{ flex: 1, height: '4px', borderRadius: '2px', background: i <= (passwordStrength.strength === 'strong' ? 3 : passwordStrength.strength === 'medium' ? 2 : 1) ? getStrengthColor(passwordStrength.strength) : '#e2e8f0' }} />
                    ))}
                  </div>
                  <p style={{ fontSize: '11px', color: getStrengthColor(passwordStrength.strength), margin: 0, textTransform: 'capitalize' }}>{passwordStrength.strength} password</p>
                </div>
              )}

              {!isSignUp && (
                <p onClick={handleForgotPassword} style={{ fontSize: '13px', color: '#4f46e5', textAlign: 'right', margin: '-10px 0 20px', cursor: 'pointer', fontWeight: '500' }}>Forgot Password?</p>
              )}

              <button type="submit" disabled={loading || rateLimited?.isLimited} style={{ width: '100%', padding: '16px', borderRadius: '12px', border: 'none', background: loading || rateLimited?.isLimited ? '#94a3b8' : 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: 'white', fontSize: '15px', fontWeight: '600', cursor: loading || rateLimited?.isLimited ? 'not-allowed' : 'pointer', boxShadow: '0 4px 14px rgba(79, 70, 229, 0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                {loading && <LoaderIcon />}
                {loading ? 'Please wait...' : isSignUp ? 'Create Account' : 'Sign In'}
              </button>
            </form>

            <p style={{ fontSize: '13px', color: '#64748b', textAlign: 'center', margin: '24px 0 0' }}>
              {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
              <span onClick={() => { setIsSignUp(!isSignUp); setError('') }} style={{ color: '#4f46e5', fontWeight: '600', cursor: 'pointer' }}>{isSignUp ? 'Sign In' : 'Sign Up'}</span>
            </p>

            {/* Add User Profile for Admin */}
            <div style={{ marginTop: '20px', textAlign: 'center', paddingTop: '20px', borderTop: '1px solid #e5e7eb' }}>
              <p style={{ fontSize: '12px', color: '#64748b', margin: '0 0 12px' }}>Admin Setup</p>
              <button onClick={() => { setIsSignUp(true); setError('') }} style={{ background: 'none', border: 'none', color: '#4f46e5', fontSize: '13px', cursor: 'pointer', fontWeight: '600', textDecoration: 'underline' }}>Create Admin Profile</button>
            </div>

            {/* Security notice */}
            <p style={{ fontSize: '11px', color: '#94a3b8', textAlign: 'center', margin: '16px 0 0' }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: 'middle', marginRight: '4px' }}><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
              Your data is encrypted and secure
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @media (max-width: 900px) {
          .login-hero { display: none !important; }
          .mobile-hero { display: block !important; }
          .desktop-form-header { display: none !important; }
          .mobile-form-header { display: block !important; }
          .desktop-tabs { display: none !important; }
          .form-container { 
            padding: 0 !important; 
            align-items: flex-start !important; 
            margin-top: -40px !important;
            position: relative !important;
            z-index: 10 !important;
            flex: 1 !important;
          }
          .form-card {
            background: white !important;
            border-radius: 32px 32px 0 0 !important;
            padding: 36px 24px 32px !important;
            box-shadow: 0 -4px 32px rgba(0,0,0,0.08) !important;
            width: 100% !important;
            max-width: 100% !important;
            min-height: calc(100vh - 280px) !important;
            box-sizing: border-box !important;
          }
        }
        @media (min-width: 901px) { 
          .mobile-hero { display: none !important; } 
          .mobile-form-header { display: none !important; }
        }
        input:focus { outline: none; border-color: #4f46e5 !important; }
      `}</style>
    </div>
  )
}
