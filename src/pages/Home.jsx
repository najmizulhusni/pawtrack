import { useState, useEffect } from 'react'
import { useApp } from '../App'

const LogoutIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
const CalendarSmallIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
const PlusIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
const CalendarIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
const ClipboardIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/></svg>
const HeartIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
const ChevronLeft = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
const ChevronRight = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
const XIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
const DropletIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"/></svg>
const SunIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
const ScissorsIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"/></svg>
const ActivityIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
const CatIcon = () => <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3.1-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0112 5z"/></svg>

const ChevronDown = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>

function CustomDropdown({ value, options, onChange, placeholder, theme: t }) {
  const [isOpen, setIsOpen] = useState(false)
  const selected = options.find(o => o.value === value)
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <button type="button" onClick={() => setIsOpen(!isOpen)} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: `1px solid ${t?.border || '#e2e8f0'}`, background: t?.bg || 'white', color: t?.text || '#1e293b', fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'left' }}>
        <span>{selected?.label || placeholder || 'Select...'}</span>
        <ChevronDown />
      </button>
      {isOpen && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 100 }} onClick={() => setIsOpen(false)} />
          <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '4px', background: t?.card || 'white', border: `1px solid ${t?.border || '#e2e8f0'}`, borderRadius: '10px', boxShadow: '0 10px 40px rgba(0,0,0,0.12)', zIndex: 101, maxHeight: '200px', overflowY: 'auto' }}>
            {options.map(opt => (
              <button key={opt.value} type="button" onClick={() => { onChange(opt.value); setIsOpen(false) }} style={{ width: '100%', padding: '10px 12px', border: 'none', background: opt.value === value ? '#f0f9ff' : 'transparent', color: t?.text || '#1e293b', fontSize: '13px', cursor: 'pointer', textAlign: 'left' }}>{opt.label}</button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

const CAT_BREEDS = ['Kampung Cat', 'Persian', 'British Shorthair', 'Maine Coon', 'Siamese', 'Ragdoll', 'Scottish Fold', 'Bengal', 'Sphynx', 'Russian Blue', 'Abyssinian', 'Burmese', 'Mixed Breed', 'Other']

export default function Home({ onNavigate }) {
  const { theme, darkMode, cats, addCat, selectCat, activeCat, getCatAge, calculateAge, user, handleLogout } = useApp()
    const [showAddCat, setShowAddCat] = useState(false)
  const [newCat, setNewCat] = useState({ name: '', breed: 'Kampung Cat', birthdate: '', weight: '', gender: 'Male', color: '', vaccinated: false, neutered: false })
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [currentTime, setCurrentTime] = useState(new Date())

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000)
    return () => clearInterval(timer)
  }, [])

  const formatDateTime = () => {
    const options = { weekday: 'short', day: 'numeric', month: 'short' }
    const date = currentTime.toLocaleDateString('en-MY', options)
    const time = currentTime.toLocaleTimeString('en-MY', { hour: '2-digit', minute: '2-digit', hour12: true })
    return `${date} • ${time}`
  }


  const handleAddCat = () => {
    if (newCat.name) {
      addCat({ ...newCat, weight: parseFloat(newCat.weight) || 0, img: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=300&q=80' })
      setNewCat({ name: '', breed: 'Kampung Cat', birthdate: '', weight: '', gender: 'Male', color: '', vaccinated: false, neutered: false })
      setShowAddCat(false)
    }
  }

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const getDaysInMonth = (date) => {
    const year = date.getFullYear(), month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    const days = []
    for (let i = 0; i < (firstDay === 0 ? 6 : firstDay - 1); i++) days.push(null)
    for (let i = 1; i <= daysInMonth; i++) days.push(i)
    return days
  }
  const isToday = (day) => { const t = new Date(); return day === t.getDate() && currentMonth.getMonth() === t.getMonth() && currentMonth.getFullYear() === t.getFullYear() }

  const tips = [
    { icon: <DropletIcon />, title: 'Fresh Water', desc: 'Change water 2-3 times daily. Cats prefer running water.', color: '#3b82f6' },
    { icon: <SunIcon />, title: 'Sunlight', desc: 'Let your cat bask in sunlight for vitamin D.', color: '#f59e0b' },
    { icon: <ScissorsIcon />, title: 'Grooming', desc: 'Brush weekly to reduce hairballs and shedding.', color: '#ec4899' },
    { icon: <ActivityIcon />, title: 'Playtime', desc: '15-20 min daily play keeps cats healthy and happy.', color: '#22c55e' },
  ]

  const healthReminders = [
    { title: 'Vaccination', desc: 'Annual boosters keep your cat protected', due: 'Check schedule' },
    { title: 'Deworming', desc: 'Every 3-6 months for indoor cats', due: 'Monthly for outdoor' },
    { title: 'Flea Prevention', desc: 'Monthly treatment recommended', due: 'Year-round protection' },
  ]

  const catAge = getCatAge(activeCat)
  const newCatAge = newCat.birthdate ? calculateAge(newCat.birthdate) : null

  // Get first name from user
  const firstName = user?.name?.split(' ')[0] || 'there'

  // Show setup screen if no cats
  if (cats.length === 0 && !showAddCat) {
    return (
      <div style={{ minHeight: '100vh', background: theme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div style={{ textAlign: 'center', maxWidth: '400px' }}>
          <div style={{ width: '80px', height: '80px', background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', margin: '0 auto 24px' }}>
            <CatIcon />
          </div>
          <h1 style={{ fontSize: '24px', fontWeight: '700', color: theme.text, margin: '0 0 8px' }}>Welcome to PawTrack!</h1>
          <p style={{ fontSize: '14px', color: theme.textMuted, margin: '0 0 24px', lineHeight: 1.6 }}>Let's get started by adding your first cat. You can track their health, schedule vet visits, and more.</p>
          <button onClick={() => setShowAddCat(true)} style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: 'white', border: 'none', padding: '14px 28px', borderRadius: '12px', fontSize: '15px', fontWeight: '600', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <PlusIcon /> Add Your First Cat
          </button>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: theme.bg }}>
      <header style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: `1px solid ${theme.border}`, background: theme.card }}>
        <h1 style={{ fontSize: '20px', fontWeight: '700', color: '#4f46e5', margin: 0, letterSpacing: '-0.3px' }}>PawTrack</h1>
        <button onClick={() => { if (window.confirm('Are you sure you want to sign out?')) handleLogout() }} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 14px', borderRadius: '8px', border: 'none', background: 'transparent', color: theme.textMuted, cursor: 'pointer', fontSize: '14px', fontWeight: '500' }}>
          <LogoutIcon />
          <span>Sign Out</span>
        </button>
      </header>


      {/* Add Cat Modal */}
      {showAddCat && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 300, padding: '20px' }}>
          <div style={{ background: theme.card, borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '420px', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: theme.text, margin: 0 }}>{cats.length === 0 ? 'Add Your First Cat' : 'Add Your Cat'}</h3>
              {cats.length > 0 && <button onClick={() => setShowAddCat(false)} style={{ background: 'none', border: 'none', color: theme.textMuted, cursor: 'pointer' }}><XIcon /></button>}
            </div>
            {cats.length === 0 && <p style={{ fontSize: '13px', color: theme.textMuted, margin: '0 0 16px' }}>Welcome to PawTrack! Let's start by adding your cat's profile.</p>}
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', color: theme.textMuted, display: 'block', marginBottom: '4px' }}>Name *</label>
              <input placeholder="e.g., Mochi, Oyen, Comot" value={newCat.name} onChange={e => setNewCat({...newCat, name: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: `1px solid ${theme.border}`, fontSize: '14px', background: theme.bg, color: theme.text, boxSizing: 'border-box' }} />
            </div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '12px', color: theme.textMuted, display: 'block', marginBottom: '4px' }}>Breed</label>
                <CustomDropdown value={newCat.breed} options={CAT_BREEDS.map(b => ({ value: b, label: b }))} onChange={v => setNewCat({...newCat, breed: v})} placeholder="Select breed" theme={theme} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '12px', color: theme.textMuted, display: 'block', marginBottom: '4px' }}>Gender</label>
                <CustomDropdown value={newCat.gender} options={[{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }]} onChange={v => setNewCat({...newCat, gender: v})} placeholder="Select gender" theme={theme} />
              </div>
            </div>
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', color: theme.textMuted, display: 'block', marginBottom: '4px' }}>Birthdate (for age tracking)</label>
              <input type="date" value={newCat.birthdate} onChange={e => setNewCat({...newCat, birthdate: e.target.value})} max={new Date().toISOString().split('T')[0]} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: `1px solid ${theme.border}`, fontSize: '14px', background: theme.bg, color: theme.text, boxSizing: 'border-box' }} />
              {newCatAge && <p style={{ fontSize: '11px', color: '#4f46e5', margin: '4px 0 0' }}>Age: {newCatAge.display}</p>}
            </div>
            <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '12px', color: theme.textMuted, display: 'block', marginBottom: '4px' }}>Weight (kg)</label>
                <input type="number" step="0.1" placeholder="e.g., 4.5" value={newCat.weight} onChange={e => setNewCat({...newCat, weight: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: `1px solid ${theme.border}`, fontSize: '14px', background: theme.bg, color: theme.text, boxSizing: 'border-box' }} />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '12px', color: theme.textMuted, display: 'block', marginBottom: '4px' }}>Color</label>
                <input placeholder="e.g., Orange, White" value={newCat.color} onChange={e => setNewCat({...newCat, color: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: `1px solid ${theme.border}`, fontSize: '14px', background: theme.bg, color: theme.text, boxSizing: 'border-box' }} />
              </div>
            </div>
            
            {/* Health Status */}
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '12px', color: theme.textMuted, display: 'block', marginBottom: '8px' }}>Health Status</label>
              <div style={{ display: 'flex', gap: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={newCat.vaccinated} onChange={e => setNewCat({...newCat, vaccinated: e.target.checked})} style={{ width: '18px', height: '18px', accentColor: '#4f46e5' }} />
                  <span style={{ fontSize: '13px', color: theme.text }}>Vaccinated</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={newCat.neutered} onChange={e => setNewCat({...newCat, neutered: e.target.checked})} style={{ width: '18px', height: '18px', accentColor: '#4f46e5' }} />
                  <span style={{ fontSize: '13px', color: theme.text }}>{newCat.gender === 'Female' ? 'Spayed' : 'Neutered'}</span>
                </label>
              </div>
            </div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              {cats.length > 0 && <button onClick={() => setShowAddCat(false)} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: `1px solid ${theme.border}`, background: 'transparent', color: theme.text, fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>}
              <button onClick={handleAddCat} disabled={!newCat.name} style={{ flex: cats.length > 0 ? 1 : 'none', width: cats.length === 0 ? '100%' : 'auto', padding: '12px', borderRadius: '10px', border: 'none', background: newCat.name ? 'linear-gradient(135deg, #4f46e5, #7c3aed)' : '#94a3b8', color: 'white', fontSize: '14px', fontWeight: '600', cursor: newCat.name ? 'pointer' : 'not-allowed' }}>{cats.length === 0 ? 'Get Started' : 'Add Cat'}</button>
            </div>
          </div>
        </div>
      )}


      <div style={{ display: 'flex' }}>
        {/* Main Content */}
        <div style={{ flex: 1, padding: '20px' }}>
          {/* Welcome Hero Card */}
          <div style={{ background: 'linear-gradient(135deg, #c7d2fe 0%, #a5b4fc 100%)', borderRadius: '16px', padding: '24px', marginBottom: '20px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ maxWidth: '60%' }}>
              <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#1e293b', margin: '0 0 8px', lineHeight: 1.3 }}>Hello, {firstName}!</h2>
              <p style={{ fontSize: '14px', color: '#475569', margin: '0 0 16px' }}>You have {cats.length} {cats.length === 1 ? 'cat' : 'cats'} to care for today</p>
              
              {/* Cats list */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
                {cats.map(cat => (
                  <div key={cat.id} onClick={() => selectCat(cat.id)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 12px', background: cat.active ? 'white' : 'rgba(255,255,255,0.6)', borderRadius: '10px', cursor: 'pointer', border: cat.active ? '2px solid #4f46e5' : '2px solid transparent' }}>
                    <img src={cat.img} alt={cat.name} style={{ width: '28px', height: '28px', borderRadius: '8px', objectFit: 'cover' }} />
                    <span style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{cat.name}</span>
                  </div>
                ))}
                <button onClick={() => setShowAddCat(true)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 12px', background: 'rgba(255,255,255,0.4)', borderRadius: '10px', border: '2px dashed rgba(79,70,229,0.4)', cursor: 'pointer', fontSize: '12px', fontWeight: '600', color: '#4f46e5' }}><PlusIcon /> Add</button>
              </div>

              <button onClick={() => onNavigate('schedule')} style={{ background: '#1e293b', color: 'white', border: 'none', padding: '10px 18px', borderRadius: '10px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><CalendarIcon /> View Schedule</button>
            </div>
            <img src={activeCat?.img} alt="Cat" style={{ position: 'absolute', right: '20px', top: '50%', transform: 'translateY(-50%)', width: '140px', height: '140px', objectFit: 'cover', borderRadius: '50%', border: '4px solid white', boxShadow: '0 8px 25px rgba(0,0,0,0.15)' }} />
          </div>

          {/* Pet Info Card */}
          {activeCat && (
            <div style={{ background: theme.card, borderRadius: '14px', padding: '16px', marginBottom: '20px', border: `1px solid ${theme.border}` }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
                <img src={activeCat.img} alt={activeCat.name} style={{ width: '48px', height: '48px', borderRadius: '12px', objectFit: 'cover' }} />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: theme.text, margin: 0 }}>{activeCat.name}</h3>
                  <p style={{ fontSize: '12px', color: theme.textMuted, margin: '2px 0 0' }}>{activeCat.breed} • {activeCat.gender}</p>
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  {activeCat.vaccinated && <span style={{ fontSize: '9px', padding: '3px 8px', borderRadius: '100px', background: '#dcfce7', color: '#166534' }}>Vaccinated</span>}
                  {activeCat.neutered && <span style={{ fontSize: '9px', padding: '3px 8px', borderRadius: '100px', background: '#dbeafe', color: '#1e40af' }}>Neutered</span>}
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
                <div style={{ background: darkMode ? '#334155' : '#f8fafc', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
                  <p style={{ fontSize: '10px', color: theme.textMuted, margin: 0 }}>Age</p>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: theme.text, margin: '2px 0 0' }}>{catAge?.display || '-'}</p>
                </div>
                <div style={{ background: darkMode ? '#334155' : '#f8fafc', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
                  <p style={{ fontSize: '10px', color: theme.textMuted, margin: 0 }}>Weight</p>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: theme.text, margin: '2px 0 0' }}>{activeCat.weight ? `${activeCat.weight} kg` : '-'}</p>
                </div>
                <div style={{ background: darkMode ? '#334155' : '#f8fafc', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
                  <p style={{ fontSize: '10px', color: theme.textMuted, margin: 0 }}>Color</p>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: theme.text, margin: '2px 0 0' }}>{activeCat.color || '-'}</p>
                </div>
                <div style={{ background: darkMode ? '#334155' : '#f8fafc', borderRadius: '10px', padding: '12px', textAlign: 'center' }}>
                  <p style={{ fontSize: '10px', color: theme.textMuted, margin: 0 }}>Gender</p>
                  <p style={{ fontSize: '14px', fontWeight: '600', color: theme.text, margin: '2px 0 0' }}>{activeCat.gender || '-'}</p>
                </div>
              </div>
            </div>
          )}


          {/* Quick Actions */}
          <h3 style={{ fontSize: '12px', fontWeight: '600', color: theme.textMuted, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Quick Actions</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', marginBottom: '20px' }}>
            {[
              { label: 'Schedule', icon: <CalendarIcon />, color: '#4f46e5', page: 'schedule' },
              { label: 'Records', icon: <ClipboardIcon />, color: '#7c3aed', page: 'records' },
              { label: 'Adopt', icon: <HeartIcon />, color: '#ec4899', page: 'adopt' },
              { label: 'Profile', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>, color: '#f59e0b', page: 'profile' }
            ].map((item, i) => (
              <button key={i} onClick={() => onNavigate(item.page)} style={{ background: theme.card, border: `1px solid ${theme.border}`, borderRadius: '12px', padding: '14px 10px', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '38px', height: '38px', background: `${item.color}20`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: item.color }}>{item.icon}</div>
                <span style={{ fontSize: '12px', fontWeight: '600', color: theme.text }}>{item.label}</span>
              </button>
            ))}
          </div>

          {/* Care Tips */}
          <h3 style={{ fontSize: '12px', fontWeight: '600', color: theme.textMuted, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Daily Care Tips</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px', marginBottom: '20px' }}>
            {tips.map((tip, i) => (
              <div key={i} style={{ background: theme.card, borderRadius: '12px', padding: '14px', border: `1px solid ${theme.border}`, display: 'flex', gap: '12px' }}>
                <div style={{ width: '36px', height: '36px', background: `${tip.color}20`, borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: tip.color, flexShrink: 0 }}>{tip.icon}</div>
                <div><p style={{ fontSize: '13px', fontWeight: '600', color: theme.text, margin: '0 0 2px' }}>{tip.title}</p><p style={{ fontSize: '11px', color: theme.textMuted, margin: 0 }}>{tip.desc}</p></div>
              </div>
            ))}
          </div>

          {/* Health Reminders */}
          <h3 style={{ fontSize: '12px', fontWeight: '600', color: theme.textMuted, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Health Reminders</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {healthReminders.map((reminder, i) => (
              <div key={i} style={{ background: theme.card, borderRadius: '12px', padding: '14px', border: `1px solid ${theme.border}`, display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '40px', height: '40px', background: i === 0 ? '#dbeafe' : i === 1 ? '#fef3c7' : '#fce7f3', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  {i === 0 && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0016.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 002 8.5c0 2.3 1.5 4.05 3 5.5l7 7z"/></svg>}
                  {i === 1 && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>}
                  {i === 2 && <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '13px', fontWeight: '600', color: theme.text, margin: '0 0 2px' }}>{reminder.title}</p>
                  <p style={{ fontSize: '11px', color: theme.textMuted, margin: 0 }}>{reminder.desc}</p>
                </div>
                <span style={{ fontSize: '10px', padding: '4px 10px', borderRadius: '100px', background: darkMode ? '#334155' : '#f1f5f9', color: theme.textMuted, whiteSpace: 'nowrap' }}>{reminder.due}</span>
              </div>
            ))}
          </div>
        </div>


        {/* Right Sidebar */}
        <div style={{ width: '300px', padding: '20px 20px 20px 0' }} className="home-sidebar">
          {/* Calendar */}
          <div style={{ background: theme.card, borderRadius: '14px', padding: '16px', marginBottom: '16px', border: `1px solid ${theme.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: '700', color: theme.text, margin: 0 }}>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h4>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} style={{ width: '28px', height: '28px', borderRadius: '8px', border: `1px solid ${theme.border}`, background: theme.card, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.textMuted }}><ChevronLeft /></button>
                <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} style={{ width: '28px', height: '28px', borderRadius: '8px', border: `1px solid ${theme.border}`, background: theme.card, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.textMuted }}><ChevronRight /></button>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center' }}>
              {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => <span key={d} style={{ fontSize: '11px', color: theme.textMuted, padding: '6px 0', fontWeight: '600' }}>{d}</span>)}
              {getDaysInMonth(currentMonth).map((day, i) => (
                <button key={i} onClick={() => day && onNavigate('schedule')} disabled={!day} style={{ width: '32px', height: '32px', borderRadius: '8px', border: 'none', background: isToday(day) ? '#4f46e5' : 'transparent', color: isToday(day) ? 'white' : day ? theme.text : 'transparent', fontSize: '12px', fontWeight: isToday(day) ? '600' : '400', cursor: day ? 'pointer' : 'default', margin: '0 auto' }}>{day || ''}</button>
              ))}
            </div>
            <button onClick={() => onNavigate('schedule')} style={{ width: '100%', marginTop: '14px', padding: '10px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: 'white', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>View Full Schedule</button>
          </div>

          {/* My Cats */}
          <div style={{ background: theme.card, borderRadius: '14px', padding: '16px', marginBottom: '16px', border: `1px solid ${theme.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: '700', color: theme.text, margin: 0 }}>My Cats ({cats.length})</h4>
              <button onClick={() => setShowAddCat(true)} style={{ fontSize: '11px', color: '#4f46e5', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600' }}>+ Add</button>
            </div>
            {cats.map(cat => {
              const age = getCatAge(cat)
              return (
                <div key={cat.id} onClick={() => selectCat(cat.id)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px', background: cat.active ? (darkMode ? '#334155' : '#f0f9ff') : 'transparent', borderRadius: '10px', marginBottom: '6px', cursor: 'pointer', border: cat.active ? '1px solid #4f46e5' : '1px solid transparent' }}>
                  <img src={cat.img} alt={cat.name} style={{ width: '38px', height: '38px', borderRadius: '10px', objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '13px', fontWeight: '600', color: theme.text, margin: 0 }}>{cat.name}</p>
                    <p style={{ fontSize: '11px', color: theme.textMuted, margin: '2px 0 0' }}>{cat.breed} • {age?.display || 'Age unknown'}</p>
                  </div>
                  {cat.active && <span style={{ width: '8px', height: '8px', background: '#4f46e5', borderRadius: '50%' }} />}
                </div>
              )
            })}
          </div>

          {/* Upcoming Events */}
          <div style={{ background: theme.card, borderRadius: '14px', padding: '16px', border: `1px solid ${theme.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h4 style={{ fontSize: '15px', fontWeight: '700', color: theme.text, margin: 0 }}>Pet Events</h4>
              <button onClick={() => onNavigate('adopt')} style={{ fontSize: '11px', color: '#4f46e5', background: 'none', border: 'none', cursor: 'pointer', fontWeight: '600' }}>View All</button>
            </div>
            <div style={{ padding: '12px', background: darkMode ? '#334155' : '#f8fafc', borderRadius: '10px', marginBottom: '8px' }}>
              <p style={{ fontSize: '12px', fontWeight: '600', color: theme.text, margin: '0 0 4px' }}>SPCA Adoption Drive</p>
              <p style={{ fontSize: '11px', color: theme.textMuted, margin: 0 }}>Mar 22 • Paradigm Mall PJ</p>
            </div>
            <div style={{ padding: '12px', background: darkMode ? '#334155' : '#f8fafc', borderRadius: '10px' }}>
              <p style={{ fontSize: '12px', fontWeight: '600', color: theme.text, margin: '0 0 4px' }}>Cat Club Show 2026</p>
              <p style={{ fontSize: '11px', color: theme.textMuted, margin: 0 }}>Apr 5 • KLCC Convention</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`@media (max-width: 900px) { .home-sidebar { display: none !important; } }`}</style>
    </div>
  )
}