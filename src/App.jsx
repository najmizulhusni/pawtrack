import { useState, useEffect, createContext, useContext } from 'react'
import Login from './pages/Login'
import Home from './pages/Home'
import NewSchedule from './pages/NewSchedule'
import Records from './pages/Records'
import Profile from './pages/Profile'
import Adopt from './pages/Adopt'
import Admin from './pages/Admin'
import { auth, supabase } from './lib/supabase'
import { generateUUID, sanitizeInput, secureStore, secureRetrieve, secureClear } from './lib/security'

const AppContext = createContext()
export const useApp = () => useContext(AppContext)

const DashboardIcon = ({ active }) => <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
const CalendarIcon = ({ active }) => <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
const ClipboardIcon = ({ active }) => <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>
const UserIcon = ({ active }) => <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
const HeartIcon = ({ active }) => <svg width="20" height="20" viewBox="0 0 24 24" fill={active ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
const MoonIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
const SunIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
const BellIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
const CatIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3.1-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0112 5z"/></svg>
const XIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
const MenuIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>

const calculateAge = (birthdate) => {
  if (!birthdate) return null
  const birth = new Date(birthdate), now = new Date()
  let years = now.getFullYear() - birth.getFullYear(), months = now.getMonth() - birth.getMonth()
  if (months < 0 || (months === 0 && now.getDate() < birth.getDate())) { years--; months += 12 }
  if (now.getDate() < birth.getDate()) months = months > 0 ? months - 1 : 11
  return { years, months, display: years > 0 ? `${years}y ${months}m` : `${months} months` }
}


export default function App() {
  // Check URL for admin route
  const isAdminRoute = window.location.pathname === '/admin'
  
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(isAdminRoute)
  const [isLoading, setIsLoading] = useState(true)
  const [page, setPage] = useState('home')
  const [darkMode, setDarkMode] = useState(false)
  const [notifications, setNotifications] = useState([])
  const [showNotifications, setShowNotifications] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [cats, setCats] = useState([]) // Start with no cats - user must add
  const [user, setUser] = useState({ id: '', name: '', email: '', phone: '', address: '' })
  const [catsLoading, setCatsLoading] = useState(false)

  const theme = { bg: darkMode ? '#0f172a' : '#f5f7fb', card: darkMode ? '#1e293b' : 'white', text: darkMode ? '#f1f5f9' : '#1e293b', textMuted: darkMode ? '#94a3b8' : '#64748b', border: darkMode ? '#334155' : '#e8ecf4', primary: '#4f46e5' }

  // Load user's cats from Supabase
  const loadUserCats = async (userId) => {
    if (!supabase || !userId) {
      console.log('[LOAD CATS] No supabase or userId:', { supabase: !!supabase, userId })
      return
    }
    console.log('[LOAD CATS] Loading cats for user:', userId)
    setCatsLoading(true)
    try {
      const { data, error } = await supabase
        .from('cats')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: true })
      
      console.log('[LOAD CATS] Response:', { data, error })
      
      if (error) {
        console.error('[LOAD CATS] Error:', error)
        return
      }
      
      if (data && data.length > 0) {
        const formattedCats = data.map((cat, index) => ({
          ...cat,
          img: cat.img_url || 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=300&q=80',
          active: index === 0
        }))
        console.log('[LOAD CATS] Setting cats:', formattedCats)
        setCats(formattedCats)
      } else {
        console.log('[LOAD CATS] No cats found for user')
      }
    } catch (err) {
      console.error('[LOAD CATS] Exception:', err)
    } finally {
      setCatsLoading(false)
    }
  }

  // Load user profile from Supabase
  const loadUserProfile = async (userId) => {
    if (!supabase || !userId) return
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('user_id', userId)
        .single()
      
      if (error) {
        // Profile doesn't exist yet, that's ok - just skip silently
        return
      }
      
      if (data) {
        setUser(prev => ({
          ...prev,
          name: data.name || prev.name,
          email: data.email || prev.email,
          phone: data.phone || prev.phone,
          address: data.address || ''
        }))
      }
    } catch (err) {
      // Profile might not exist yet, that's ok - just skip silently
    }
  }

  // Save user profile to Supabase
  const saveUserProfile = async (userData) => {
    if (!supabase || !userData.id) return
    try {
      const { error } = await supabase
        .from('profiles')
        .upsert({
          user_id: userData.id,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          address: userData.address || '',
          updated_at: new Date().toISOString()
        }, { onConflict: 'user_id' })
      
      if (error) console.error('Save profile error:', error)
    } catch (err) {
      console.error('Save profile error:', err)
    }
  }

  // Check for existing session on mount
  useEffect(() => {
    const checkSession = async () => {
      try {
        // Check for stored session (demo mode)
        const storedUser = secureRetrieve('user')
        if (storedUser) {
          setUser(storedUser)
          setIsLoggedIn(true)
          // Load cats and profile for this user
          loadUserCats(storedUser.id)
          loadUserProfile(storedUser.id)
        }
        
        // Check Supabase session (production mode)
        const { data } = await auth.getSession()
        if (data?.session?.user) {
          const userData = {
            id: data.session.user.id,
            name: data.session.user.user_metadata?.name || 'Pet Owner',
            email: data.session.user.email,
            phone: data.session.user.user_metadata?.phone || '',
          }
          setUser(userData)
          setIsLoggedIn(true)
          loadUserCats(userData.id)
          loadUserProfile(userData.id)
        }
      } catch (err) {
        console.error('Session check error:', err)
      } finally {
        setIsLoading(false)
      }
    }
    
    checkSession()
    
    // Listen for auth state changes
    const { data: { subscription } } = auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_OUT') {
        setIsLoggedIn(false)
        setUser({ id: '', name: '', email: '', phone: '', address: '' })
        setCats([])
        secureClear('user')
      }
    })
    
    return () => subscription?.unsubscribe()
  }, [])

  const handleLogin = (userData) => {
    // Check if admin login
    if (userData.isAdmin) {
      setIsAdmin(true)
      setIsLoggedIn(true)
      window.history.pushState({}, '', '/admin')
      return
    }
    
    const sanitizedUser = {
      id: userData.id || generateUUID(),
      name: sanitizeInput(userData.name || 'Pet Owner'),
      email: sanitizeInput(userData.email || ''),
      phone: sanitizeInput(userData.phone || ''),
      address: '',
    }
    setUser(sanitizedUser)
    secureStore('user', sanitizedUser)
    setIsLoggedIn(true)
    window.history.pushState({}, '', '/')
    // Load cats for this user
    loadUserCats(sanitizedUser.id)
  }

  const handleLogout = async () => {
    try {
      await auth.signOut()
    } catch (err) {
      console.error('Logout error:', err)
    }
    secureClear('user')
    setIsLoggedIn(false)
    setIsAdmin(false)
    setPage('home')
    window.history.pushState({}, '', '/')
  }

  // Add cat - save to Supabase
  const addCat = async (cat) => {
    const newCat = { 
      ...cat, 
      id: generateUUID(), 
      name: sanitizeInput(cat.name),
      breed: sanitizeInput(cat.breed),
      color: sanitizeInput(cat.color || ''),
      active: cats.length === 0,
      img: cat.img || 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=300&q=80'
    }
    
    console.log('[ADD CAT] Adding cat:', newCat)
    console.log('[ADD CAT] User ID:', user.id)
    console.log('[ADD CAT] Supabase available:', !!supabase)
    
    // Add to local state first
    setCats(prev => [...prev, newCat])
    
    // Save to Supabase
    if (supabase && user.id) {
      try {
        const insertData = {
          id: newCat.id,
          user_id: user.id,
          name: newCat.name,
          breed: newCat.breed,
          birthdate: newCat.birthdate || null,
          weight: newCat.weight || null,
          gender: newCat.gender || null,
          color: newCat.color || null,
          img_url: newCat.img,
          vaccinated: newCat.vaccinated || false,
          neutered: newCat.neutered || false,
          is_active: newCat.active
        }
        console.log('[ADD CAT] Inserting to Supabase:', insertData)
        
        const { data, error } = await supabase.from('cats').insert([insertData]).select()
        
        if (error) {
          console.error('[ADD CAT] Supabase error:', error)
          alert('Error saving cat: ' + error.message)
        } else {
          console.log('[ADD CAT] Success! Saved to Supabase:', data)
        }
      } catch (err) {
        console.error('[ADD CAT] Exception:', err)
      }
    } else {
      console.log('[ADD CAT] Not saving to Supabase - missing supabase or user.id')
    }
  }
  
  // Update cat - save to Supabase
  const updateCat = async (id, data) => {
    const updatedCats = cats.map(c => c.id === id ? { 
      ...c, 
      ...data,
      name: data.name ? sanitizeInput(data.name) : c.name,
      breed: data.breed ? sanitizeInput(data.breed) : c.breed,
      color: data.color ? sanitizeInput(data.color) : c.color,
    } : c)
    setCats(updatedCats)
    
    // Update in Supabase
    if (supabase) {
      try {
        const updateData = {}
        if (data.name) updateData.name = sanitizeInput(data.name)
        if (data.breed) updateData.breed = sanitizeInput(data.breed)
        if (data.color) updateData.color = sanitizeInput(data.color)
        if (data.birthdate !== undefined) updateData.birthdate = data.birthdate
        if (data.weight !== undefined) updateData.weight = data.weight
        if (data.gender) updateData.gender = data.gender
        if (data.vaccinated !== undefined) updateData.vaccinated = data.vaccinated
        if (data.neutered !== undefined) updateData.neutered = data.neutered
        
        const { error } = await supabase.from('cats').update(updateData).eq('id', id)
        if (error) console.error('Update cat error:', error)
      } catch (err) {
        console.error('Update cat error:', err)
      }
    }
  }
  
  // Delete cat - remove from Supabase
  const deleteCat = async (id) => {
    if (cats.length <= 1) return
    setCats(cats.filter(c => c.id !== id))
    
    if (supabase) {
      try {
        const { error } = await supabase.from('cats').delete().eq('id', id)
        if (error) console.error('Delete cat error:', error)
      } catch (err) {
        console.error('Delete cat error:', err)
      }
    }
  }
  const selectCat = (id) => setCats(cats.map(c => ({ ...c, active: c.id === id })))
  const activeCat = cats.find(c => c.active) || cats[0]
  const getCatAge = (cat) => cat?.birthdate ? calculateAge(cat.birthdate) : null
  
  // Update user and save to Supabase
  const updateUser = (newUserData) => {
    const updatedUser = { ...user, ...newUserData }
    setUser(updatedUser)
    secureStore('user', updatedUser)
    saveUserProfile(updatedUser)
  }
  
  const markNotificationRead = (id) => setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n))
  const clearNotifications = () => setNotifications([])
  const unreadCount = notifications.filter(n => !n.read).length

  const navItems = [
    { id: 'home', label: 'Home', Icon: DashboardIcon },
    { id: 'schedule', label: 'Schedule', Icon: CalendarIcon },
    { id: 'records', label: 'Records', Icon: ClipboardIcon },
    { id: 'adopt', label: 'Adopt', Icon: HeartIcon },
    { id: 'profile', label: 'Profile', Icon: UserIcon },
  ]

  // Show loading screen while checking session
  if (isLoading) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f7fb', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ width: '64px', height: '64px', background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', borderRadius: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', margin: '0 auto 16px' }}><CatIcon /></div>
          <p style={{ color: '#64748b', fontSize: '14px' }}>Loading...</p>
        </div>
      </div>
    )
  }

  // Show login page if not logged in
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />
  }

  // Show admin dashboard if admin
  if (isAdmin) {
    return <Admin onLogout={handleLogout} />
  }


  return (
    <AppContext.Provider value={{ darkMode, setDarkMode, theme, cats, setCats, addCat, updateCat, deleteCat, selectCat, activeCat, getCatAge, user, setUser: updateUser, notifications, setNotifications, markNotificationRead, clearNotifications, setPage, calculateAge, handleLogout }}>
      <div style={{ display: 'flex', minHeight: '100vh', background: theme.bg, fontFamily: 'system-ui, -apple-system, sans-serif' }}>
        
        {/* Desktop Left Sidebar */}
        <aside className="desktop-sidebar" style={{ width: '72px', background: theme.card, borderRight: `1px solid ${theme.border}`, display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px 0', position: 'fixed', height: '100vh', zIndex: 100 }}>
          <div onClick={() => setPage('home')} style={{ width: '44px', height: '44px', background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', marginBottom: '32px', cursor: 'pointer' }}><CatIcon /></div>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
            {navItems.map(({ id, Icon }) => (
              <button key={id} onClick={() => setPage(id)} title={id} style={{ width: '44px', height: '44px', borderRadius: '12px', border: 'none', background: page === id ? 'linear-gradient(135deg, #4f46e5, #7c3aed)' : 'transparent', color: page === id ? 'white' : theme.textMuted, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><Icon active={page === id} /></button>
            ))}
          </nav>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <button onClick={() => setShowNotifications(!showNotifications)} style={{ width: '44px', height: '44px', borderRadius: '12px', border: 'none', background: 'transparent', color: theme.textMuted, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <BellIcon />{unreadCount > 0 && <span style={{ position: 'absolute', top: '6px', right: '6px', width: '8px', height: '8px', background: '#ef4444', borderRadius: '50%' }} />}
            </button>
            <button onClick={() => setDarkMode(!darkMode)} style={{ width: '44px', height: '44px', borderRadius: '12px', border: 'none', background: 'transparent', color: theme.textMuted, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{darkMode ? <SunIcon /> : <MoonIcon />}</button>
          </div>
        </aside>

        {/* Mobile Header */}
        <header className="mobile-header" style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, background: theme.card, borderBottom: `1px solid ${theme.border}`, padding: '12px 16px', display: 'none' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <button onClick={() => setMobileMenuOpen(true)} style={{ width: '40px', height: '40px', borderRadius: '10px', border: `1px solid ${theme.border}`, background: theme.card, color: theme.text, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><MenuIcon /></button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><CatIcon /></div>
              <span style={{ fontSize: '18px', fontWeight: '700', color: theme.text }}>PawTrack</span>
            </div>
            <button onClick={() => setShowLogoutConfirm(true)} style={{ width: '40px', height: '40px', borderRadius: '10px', border: 'none', background: 'transparent', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
            </button>
          </div>
        </header>

        {/* Logout Confirmation Modal */}
        {showLogoutConfirm && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 400, padding: '20px' }}>
            <div style={{ background: theme.card, borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '340px', textAlign: 'center' }}>
              <div style={{ width: '56px', height: '56px', background: '#fef2f2', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#ef4444' }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: theme.text, margin: '0 0 8px' }}>Sign Out?</h3>
              <p style={{ fontSize: '14px', color: theme.textMuted, margin: '0 0 24px' }}>Are you sure you want to sign out of your account?</p>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button onClick={() => setShowLogoutConfirm(false)} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: `1px solid ${theme.border}`, background: 'transparent', color: theme.text, fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                <button onClick={() => { setShowLogoutConfirm(false); handleLogout() }} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', background: '#ef4444', color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Sign Out</button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Slide-out Menu - Left Side */}
        {mobileMenuOpen && (
          <>
            <div onClick={() => setMobileMenuOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 150 }} />
            <div style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: '280px', background: theme.card, zIndex: 200, overflowY: 'auto', boxShadow: '4px 0 20px rgba(0,0,0,0.15)' }}>
              <div style={{ padding: '16px 20px', borderBottom: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '36px', height: '36px', background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><CatIcon /></div>
                  <span style={{ fontSize: '18px', fontWeight: '700', color: theme.text }}>PawTrack</span>
                </div>
                <button onClick={() => setMobileMenuOpen(false)} style={{ background: 'none', border: 'none', color: theme.textMuted, cursor: 'pointer', padding: '4px' }}><XIcon /></button>
              </div>
              <div style={{ padding: '16px 20px', borderBottom: `1px solid ${theme.border}` }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={activeCat?.img} alt={activeCat?.name} style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'cover' }} />
                  <div>
                    <p style={{ fontSize: '15px', fontWeight: '600', color: theme.text, margin: 0 }}>{user.name?.split(' ')[0] || 'Pet Owner'}</p>
                    <p style={{ fontSize: '13px', color: theme.textMuted, margin: '2px 0 0' }}>{activeCat?.name}</p>
                  </div>
                </div>
              </div>
              <nav style={{ padding: '12px' }}>
                {navItems.map(({ id, label, Icon }) => (
                  <button key={id} onClick={() => { setPage(id); setMobileMenuOpen(false) }} style={{ display: 'flex', alignItems: 'center', gap: '14px', padding: '14px 16px', borderRadius: '10px', border: 'none', background: page === id ? (darkMode ? '#334155' : '#f0f9ff') : 'transparent', color: page === id ? '#4f46e5' : theme.text, cursor: 'pointer', fontSize: '15px', fontWeight: page === id ? '600' : '500', textAlign: 'left', width: '100%', marginBottom: '4px' }}>
                    <Icon active={page === id} />{label}
                  </button>
                ))}
              </nav>
              <div style={{ padding: '12px 20px', borderTop: `1px solid ${theme.border}`, marginTop: 'auto' }}>
                <button onClick={() => setDarkMode(!darkMode)} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '10px', border: 'none', background: 'transparent', color: theme.text, cursor: 'pointer', fontSize: '14px', width: '100%' }}>
                  {darkMode ? <SunIcon /> : <MoonIcon />} {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>
            </div>
          </>
        )}

        {/* Notifications Panel */}
        {showNotifications && (
          <>
            <div onClick={() => setShowNotifications(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 150 }} />
            <div className="notifications-panel" style={{ position: 'fixed', top: 0, right: 0, bottom: 0, width: '320px', background: theme.card, borderLeft: `1px solid ${theme.border}`, zIndex: 200, padding: '20px', overflowY: 'auto' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '700', color: theme.text, margin: 0 }}>Notifications</h3>
                <button onClick={() => setShowNotifications(false)} style={{ background: 'none', border: 'none', color: theme.textMuted, cursor: 'pointer' }}><XIcon /></button>
              </div>
              {notifications.length === 0 ? <p style={{ color: theme.textMuted, fontSize: '14px' }}>No notifications</p> : (
                <>
                  <button onClick={clearNotifications} style={{ fontSize: '12px', color: '#4f46e5', background: 'none', border: 'none', cursor: 'pointer', marginBottom: '16px' }}>Clear all</button>
                  {notifications.map(n => (
                    <div key={n.id} onClick={() => markNotificationRead(n.id)} style={{ padding: '14px', background: n.read ? 'transparent' : (darkMode ? '#334155' : '#f0f9ff'), borderRadius: '10px', marginBottom: '10px', cursor: 'pointer', border: `1px solid ${theme.border}` }}>
                      <p style={{ fontSize: '14px', fontWeight: '600', color: theme.text, margin: '0 0 4px' }}>{n.title}</p>
                      <p style={{ fontSize: '12px', color: theme.textMuted, margin: '0 0 6px' }}>{n.message}</p>
                      <p style={{ fontSize: '11px', color: theme.textMuted, margin: 0 }}>{n.time}</p>
                    </div>
                  ))}
                </>
              )}
            </div>
          </>
        )}

        {/* Main Content */}
        <main className="main-content" style={{ flex: 1, marginLeft: '72px', minHeight: '100vh' }}>
          {page === 'home' && <Home onNavigate={setPage} />}
          {page === 'schedule' && <NewSchedule onNavigate={setPage} />}
          {page === 'records' && <Records onNavigate={setPage} />}
          {page === 'adopt' && <Adopt onNavigate={setPage} />}
          {page === 'profile' && <Profile onNavigate={setPage} />}
        </main>

        <style>{`
          @media (max-width: 768px) { 
            .desktop-sidebar { display: none !important; } 
            .mobile-header { display: block !important; }
            .main-content { margin-left: 0 !important; margin-top: 65px; }
          }
          @media (min-width: 769px) { 
            .mobile-header { display: none !important; }
          }
        `}</style>
      </div>
    </AppContext.Provider>
  )
}