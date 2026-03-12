import { createClient } from '@supabase/supabase-js'

// Environment variables - these should be set in .env file
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

// Check if Supabase is configured
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

if (!isSupabaseConfigured) {
  console.warn('Supabase credentials not configured. Running in demo mode.')
}

// Only create client if credentials are available
export const supabase = isSupabaseConfigured 
  ? createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
        storage: window.localStorage,
        storageKey: 'pawtrack-auth',
        flowType: 'pkce',
      },
      global: {
        headers: {
          'X-Client-Info': 'pawtrack-web',
        },
      },
    })
  : null

// Auth helper functions with demo mode fallback
export const auth = {
  // Sign up with email and password
  async signUp(email, password, metadata = {}) {
    if (!supabase) {
      return { data: null, error: { message: 'Demo mode - signup simulated' } }
    }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata,
      },
    })
    return { data, error }
  },

  // Sign in with email and password
  async signIn(email, password) {
    if (!supabase) {
      return { data: null, error: { message: 'Demo mode - signin simulated' } }
    }
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })
    return { data, error }
  },

  // Sign out
  async signOut() {
    if (!supabase) {
      return { error: null }
    }
    const { error } = await supabase.auth.signOut()
    return { error }
  },

  // Get current session
  async getSession() {
    if (!supabase) {
      return { session: null, error: null }
    }
    const { data: { session }, error } = await supabase.auth.getSession()
    return { session, error }
  },

  // Get current user
  async getUser() {
    if (!supabase) {
      return { user: null, error: null }
    }
    const { data: { user }, error } = await supabase.auth.getUser()
    return { user, error }
  },

  // Password reset
  async resetPassword(email) {
    if (!supabase) {
      return { data: null, error: { message: 'Password reset not available in demo mode' } }
    }
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    })
    return { data, error }
  },

  // Update password
  async updatePassword(newPassword) {
    if (!supabase) {
      return { data: null, error: { message: 'Not available in demo mode' } }
    }
    const { data, error } = await supabase.auth.updateUser({
      password: newPassword,
    })
    return { data, error }
  },

  // Listen to auth state changes
  onAuthStateChange(callback) {
    if (!supabase) {
      // Return a mock subscription for demo mode
      return { data: { subscription: { unsubscribe: () => {} } } }
    }
    return supabase.auth.onAuthStateChange(callback)
  },
}

export default supabase
