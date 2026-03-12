import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

const DashboardIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>
const CatIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3.1-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0112 5z"/></svg>
const CalendarIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
const UsersIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75"/></svg>
const PlusIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
const EditIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
const TrashIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
const XIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
const LogOutIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
const MenuIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
const ChevronDown = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>

const CAT_BREEDS = ['Kampung Cat', 'Persian', 'British Shorthair', 'Maine Coon', 'Siamese', 'Ragdoll', 'Scottish Fold', 'Bengal', 'Sphynx', 'Russian Blue', 'Abyssinian', 'Burmese', 'Mixed Breed', 'Other']
const EVENT_TYPES = [
  { value: 'adoption', label: 'Adoption' }, { value: 'show', label: 'Cat Show' },
  { value: 'health', label: 'Health' }, { value: 'charity', label: 'Charity' }, { value: 'workshop', label: 'Workshop' },
]
const TIME_OPTIONS = [
  '8:00 AM','8:30 AM','9:00 AM','9:30 AM','10:00 AM','10:30 AM','11:00 AM','11:30 AM',
  '12:00 PM','12:30 PM','1:00 PM','1:30 PM','2:00 PM','2:30 PM','3:00 PM','3:30 PM',
  '4:00 PM','4:30 PM','5:00 PM','5:30 PM','6:00 PM','6:30 PM','7:00 PM','7:30 PM',
  '8:00 PM','8:30 PM','9:00 PM','9:30 PM','10:00 PM',
]
const CAT_STATUSES = [{ value: 'available', label: 'Available' }, { value: 'pending', label: 'Pending' }, { value: 'adopted', label: 'Adopted' }]
const GENDERS = [{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }]

function CustomDropdown({ value, options, onChange, placeholder }) {
  const [isOpen, setIsOpen] = useState(false)
  const selected = options.find(o => o.value === value)
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <button type="button" onClick={() => setIsOpen(!isOpen)} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', background: 'white', color: '#1e293b', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'left' }}>
        <span>{selected?.label || placeholder || 'Select...'}</span>
        <ChevronDown />
      </button>
      {isOpen && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 100 }} onClick={() => setIsOpen(false)} />
          <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '4px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '6px', boxShadow: '0 10px 40px rgba(0,0,0,0.12)', zIndex: 101, maxHeight: '200px', overflowY: 'auto' }}>
            {options.map(opt => (
              <button key={opt.value} type="button" onClick={() => { onChange(opt.value); setIsOpen(false) }} style={{ width: '100%', padding: '8px 12px', border: 'none', background: opt.value === value ? '#f0f9ff' : 'transparent', color: '#1e293b', fontSize: '13px', cursor: 'pointer', textAlign: 'left' }}>{opt.label}</button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

const ShelterIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1"/><path d="M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16"/></svg>

export default function Admin({ onLogout }) {
  const [tab, setTab] = useState('dashboard')
  const [events, setEvents] = useState([])
  const [cats, setCats] = useState([])
  const [profiles, setProfiles] = useState([])
  const [shelters, setShelters] = useState([])
  const [showModal, setShowModal] = useState(null)
  const [editItem, setEditItem] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [eventForm, setEventForm] = useState({ title: '', organizer: '', event_date: '', event_time_from: '10:00 AM', event_time_to: '4:00 PM', location: '', event_type: 'adoption', description: '' })
  const [catForm, setCatForm] = useState({ name: '', breed: 'Kampung Cat', age: '', gender: 'Male', color: '', description: '', vaccinated: false, neutered: false, location: '', address: '', contact: '', status: 'available' })
  const [shelterForm, setShelterForm] = useState({ name: '', address: '', is_open: true })

  useEffect(() => { loadData() }, [])

  const loadData = async () => {
    setLoading(true); setError('')
    try {
      if (!supabase) { setError('Supabase not configured'); setLoading(false); return }
      const [eventsRes, catsRes, profilesRes, sheltersRes] = await Promise.all([
        supabase.from('events').select('*').order('event_date', { ascending: true }),
        supabase.from('adoption_cats').select('*').order('created_at', { ascending: false }),
        supabase.from('profiles').select('*').order('created_at', { ascending: false }),
        supabase.from('shelters').select('*').order('name', { ascending: true })
      ])
      if (eventsRes.error) throw eventsRes.error
      if (catsRes.error) throw catsRes.error
      setEvents(eventsRes.data || []); setCats(catsRes.data || []); setProfiles(profilesRes.data || []); setShelters(sheltersRes.data || [])
    } catch (err) { console.error('Load error:', err); setError(err.message || 'Failed to load data') }
    finally { setLoading(false) }
  }

  const stats = [
    { label: 'Total Events', value: events.length, icon: <CalendarIcon />, color: '#4f46e5' },
    { label: 'Available Cats', value: cats.filter(c => c.status === 'available').length, icon: <CatIcon />, color: '#22c55e' },
    { label: 'Pending', value: cats.filter(c => c.status === 'pending').length, icon: <CatIcon />, color: '#f59e0b' },
    { label: 'Adopted', value: cats.filter(c => c.status === 'adopted').length, icon: <UsersIcon />, color: '#ec4899' },
    { label: 'Shelters', value: shelters.length, icon: <ShelterIcon />, color: '#06b6d4' },
    { label: 'Users', value: profiles.length, icon: <UsersIcon />, color: '#7c3aed' },
  ]

  const openEventModal = (item = null) => {
    if (item) {
      const timeParts = (item.event_time || '').split(' - ')
      setEventForm({ title: item.title || '', organizer: item.organizer || '', event_date: item.event_date || '', event_time_from: timeParts[0]?.trim() || '10:00 AM', event_time_to: timeParts[1]?.trim() || '4:00 PM', location: item.location || '', event_type: item.event_type || 'adoption', description: item.description || '' })
      setEditItem(item)
    } else {
      setEventForm({ title: '', organizer: '', event_date: '', event_time_from: '10:00 AM', event_time_to: '4:00 PM', location: '', event_type: 'adoption', description: '' })
      setEditItem(null)
    }
    setShowModal('event')
  }

  const openCatModal = (item = null) => {
    if (item) {
      setCatForm({ name: item.name || '', breed: item.breed || 'Kampung Cat', age: item.age || '', gender: item.gender || 'Male', color: item.color || '', description: item.description || '', vaccinated: item.vaccinated || false, neutered: item.neutered || false, location: item.location || '', address: item.address || '', contact: item.contact || '', status: item.status || 'available' })
      setEditItem(item)
    } else {
      setCatForm({ name: '', breed: 'Kampung Cat', age: '', gender: 'Male', color: '', description: '', vaccinated: false, neutered: false, location: '', address: '', contact: '', status: 'available' })
      setEditItem(null)
    }
    setShowModal('cat')
  }

  const handleSaveEvent = async () => {
    if (!eventForm.title || !eventForm.event_date) { alert('Title and Date are required'); return }
    const data = { title: eventForm.title, organizer: eventForm.organizer, event_date: eventForm.event_date, event_time: `${eventForm.event_time_from} - ${eventForm.event_time_to}`, location: eventForm.location, event_type: eventForm.event_type, description: eventForm.description }
    try {
      if (editItem) { const { error } = await supabase.from('events').update(data).eq('id', editItem.id); if (error) throw error }
      else { const { error } = await supabase.from('events').insert([data]); if (error) throw error }
      await loadData(); setShowModal(null); setEditItem(null)
    } catch (err) { alert('Error: ' + err.message) }
  }

  const handleSaveCat = async () => {
    if (!catForm.name) { alert('Name is required'); return }
    const data = { name: catForm.name, breed: catForm.breed, age: catForm.age || null, gender: catForm.gender, color: catForm.color || null, description: catForm.description || null, vaccinated: catForm.vaccinated, neutered: catForm.neutered, location: catForm.location || null, address: catForm.address || null, contact: catForm.contact || null, status: catForm.status }
    try {
      if (editItem) { const { error } = await supabase.from('adoption_cats').update(data).eq('id', editItem.id); if (error) throw error }
      else { const { error } = await supabase.from('adoption_cats').insert([data]); if (error) throw error }
      await loadData(); setShowModal(null); setEditItem(null)
    } catch (err) { alert('Error: ' + err.message) }
  }

  const deleteEvent = async (id) => { if (!confirm('Delete this event?')) return; try { const { error } = await supabase.from('events').delete().eq('id', id); if (error) throw error; await loadData() } catch (err) { alert('Error: ' + err.message) } }
  const deleteCat = async (id) => { if (!confirm('Remove this cat?')) return; try { const { error } = await supabase.from('adoption_cats').delete().eq('id', id); if (error) throw error; await loadData() } catch (err) { alert('Error: ' + err.message) } }

  const openShelterModal = (item = null) => {
    if (item) {
      setShelterForm({ name: item.name || '', address: item.address || '', is_open: item.is_open !== false })
      setEditItem(item)
    } else {
      setShelterForm({ name: '', address: '', is_open: true })
      setEditItem(null)
    }
    setShowModal('shelter')
  }

  const handleSaveShelter = async () => {
    if (!shelterForm.name) { alert('Name is required'); return }
    const data = { name: shelterForm.name, address: shelterForm.address || null, is_open: shelterForm.is_open }
    try {
      if (editItem) { const { error } = await supabase.from('shelters').update(data).eq('id', editItem.id); if (error) throw error }
      else { const { error } = await supabase.from('shelters').insert([data]); if (error) throw error }
      await loadData(); setShowModal(null); setEditItem(null)
    } catch (err) { alert('Error: ' + err.message) }
  }

  const deleteShelter = async (id) => { if (!confirm('Delete this shelter?')) return; try { const { error } = await supabase.from('shelters').delete().eq('id', id); if (error) throw error; await loadData() } catch (err) { alert('Error: ' + err.message) } }

  const getStatusStyle = (status) => {
    const base = { fontSize: '11px', padding: '4px 10px', borderRadius: '100px', fontWeight: '500', display: 'inline-block' }
    if (status === 'available') return { ...base, background: '#f0fdf4', color: '#166534' }
    if (status === 'pending') return { ...base, background: '#fefce8', color: '#854d0e' }
    return { ...base, background: '#f1f5f9', color: '#475569' }
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <DashboardIcon /> },
    { id: 'events', label: 'Events', icon: <CalendarIcon /> },
    { id: 'cats', label: 'Adoption Cats', icon: <CatIcon /> },
    { id: 'shelters', label: 'Shelters', icon: <ShelterIcon /> },
    { id: 'users', label: 'Users', icon: <UsersIcon /> },
  ]

  if (loading) return <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}><p style={{ color: '#64748b' }}>Loading...</p></div>

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Mobile Header */}
      <header className="admin-mobile-header" style={{ background: 'white', borderBottom: '1px solid #e2e8f0', padding: '12px 16px', position: 'sticky', top: 0, zIndex: 50 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button onClick={() => setMobileMenuOpen(true)} style={{ padding: '8px', background: 'none', border: 'none', cursor: 'pointer' }}><MenuIcon /></button>
          <span style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b' }}>PawTrack Admin</span>
          <button onClick={onLogout} style={{ padding: '8px', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><LogOutIcon /></button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <>
          <div onClick={() => setMobileMenuOpen(false)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.3)', zIndex: 100 }} />
          <div style={{ position: 'fixed', top: 0, left: 0, bottom: 0, width: '260px', background: 'white', zIndex: 101, padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <span style={{ fontSize: '18px', fontWeight: '700' }}>Menu</span>
              <button onClick={() => setMobileMenuOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}><XIcon /></button>
            </div>
            {navItems.map(item => (
              <button key={item.id} onClick={() => { setTab(item.id); setMobileMenuOpen(false) }} style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', padding: '12px', marginBottom: '4px', borderRadius: '8px', border: 'none', background: tab === item.id ? '#f1f5f9' : 'transparent', color: tab === item.id ? '#4f46e5' : '#475569', cursor: 'pointer', fontSize: '14px', fontWeight: tab === item.id ? '600' : '400' }}>
                {item.icon} {item.label}
              </button>
            ))}
          </div>
        </>
      )}

      <div style={{ display: 'flex' }}>
        {/* Desktop Sidebar */}
        <aside className="admin-desktop-sidebar" style={{ width: '220px', background: 'white', borderRight: '1px solid #e2e8f0', minHeight: '100vh', padding: '20px', position: 'fixed' }}>
          <div style={{ marginBottom: '32px' }}>
            <h1 style={{ fontSize: '18px', fontWeight: '700', color: '#1e293b', margin: 0 }}>PawTrack</h1>
            <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0' }}>Admin Panel</p>
          </div>
          <nav>
            {navItems.map(item => (
              <button key={item.id} onClick={() => setTab(item.id)} style={{ display: 'flex', alignItems: 'center', gap: '10px', width: '100%', padding: '10px 12px', marginBottom: '4px', borderRadius: '6px', border: 'none', background: tab === item.id ? '#f1f5f9' : 'transparent', color: tab === item.id ? '#4f46e5' : '#475569', cursor: 'pointer', fontSize: '13px', fontWeight: tab === item.id ? '600' : '400', textAlign: 'left' }}>
                {item.icon} {item.label}
              </button>
            ))}
          </nav>
          <button onClick={onLogout} style={{ position: 'absolute', bottom: '20px', left: '20px', right: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0', background: 'white', color: '#64748b', fontSize: '13px', cursor: 'pointer' }}>
            <LogOutIcon /> Logout
          </button>
        </aside>

        {/* Main Content */}
        <main className="admin-main" style={{ flex: 1, padding: '24px', minWidth: 0 }}>
          {error && <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '12px', marginBottom: '20px' }}><p style={{ color: '#dc2626', fontSize: '13px', margin: 0 }}>{error}</p><button onClick={loadData} style={{ marginTop: '8px', fontSize: '12px', color: '#4f46e5', background: 'none', border: 'none', cursor: 'pointer' }}>Retry</button></div>}

          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '600', color: '#1e293b', margin: '0 0 4px' }}>
              {tab === 'dashboard' ? 'Dashboard' : tab === 'events' ? 'Events' : tab === 'cats' ? 'Adoption Cats' : 'Registered Users'}
            </h2>
            <p style={{ fontSize: '13px', color: '#64748b', margin: 0 }}>
              {tab === 'dashboard' ? 'Overview of your platform' : tab === 'events' ? 'Manage pet events' : tab === 'cats' ? 'Manage cats for adoption' : 'View registered user profiles'}
            </p>
          </div>

          {/* Dashboard */}
          {tab === 'dashboard' && (
            <>
              <div className="admin-stats-grid" style={{ display: 'grid', gap: '12px', marginBottom: '24px' }}>
                {stats.map((stat, i) => (
                  <div key={i} style={{ background: 'white', borderRadius: '8px', padding: '14px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', color: stat.color }}>{stat.icon}</div>
                    <p style={{ fontSize: '22px', fontWeight: '600', color: '#1e293b', margin: '0 0 2px' }}>{stat.value}</p>
                    <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>{stat.label}</p>
                  </div>
                ))}
              </div>
              <div className="admin-dashboard-grid" style={{ display: 'grid', gap: '16px' }}>
                <div style={{ background: 'white', borderRadius: '8px', padding: '16px', border: '1px solid #e2e8f0' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', margin: '0 0 12px' }}>Recent Events</h3>
                  {events.slice(0, 3).map(ev => (
                    <div key={ev.id} style={{ padding: '10px', background: '#f8fafc', borderRadius: '6px', marginBottom: '8px' }}>
                      <p style={{ fontSize: '13px', fontWeight: '500', color: '#1e293b', margin: '0 0 2px' }}>{ev.title}</p>
                      <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>{ev.event_date} {ev.location && `- ${ev.location}`}</p>
                    </div>
                  ))}
                  {events.length === 0 && <p style={{ fontSize: '12px', color: '#94a3b8' }}>No events yet</p>}
                </div>
                <div style={{ background: 'white', borderRadius: '8px', padding: '16px', border: '1px solid #e2e8f0' }}>
                  <h3 style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', margin: '0 0 12px' }}>Recent Users</h3>
                  {profiles.slice(0, 5).map(p => (
                    <div key={p.id} style={{ padding: '10px', background: '#f8fafc', borderRadius: '6px', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div>
                        <p style={{ fontSize: '13px', fontWeight: '500', color: '#1e293b', margin: '0 0 2px' }}>{p.name || 'Unknown'}</p>
                        <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>{p.email || 'No email'}</p>
                      </div>
                      <span style={{ fontSize: '10px', color: '#64748b' }}>{p.phone || ''}</span>
                    </div>
                  ))}
                  {profiles.length === 0 && <p style={{ fontSize: '12px', color: '#94a3b8' }}>No users yet</p>}
                </div>
              </div>
            </>
          )}

          {/* Events Tab */}
          {tab === 'events' && (
            <>
              <button onClick={() => openEventModal()} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', borderRadius: '8px', border: 'none', background: '#4f46e5', color: 'white', fontSize: '13px', fontWeight: '500', cursor: 'pointer', marginBottom: '16px', width: '100%', justifyContent: 'center' }} className="admin-add-btn"><PlusIcon /> Add Event</button>
              {/* Desktop Table */}
              <div className="admin-table-wrap" style={{ background: 'white', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '600px' }}>
                    <thead><tr style={{ background: '#f8fafc' }}>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Event</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Date / Time</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Location</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Type</th>
                      <th style={{ padding: '12px', textAlign: 'right', fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Actions</th>
                    </tr></thead>
                    <tbody>
                      {events.map(ev => (
                        <tr key={ev.id} style={{ borderTop: '1px solid #e2e8f0' }}>
                          <td style={{ padding: '12px' }}><p style={{ fontSize: '13px', fontWeight: '500', color: '#1e293b', margin: 0 }}>{ev.title}</p><p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 0' }}>{ev.organizer}</p></td>
                          <td style={{ padding: '12px' }}><p style={{ fontSize: '12px', color: '#475569', margin: 0 }}>{ev.event_date}</p><p style={{ fontSize: '11px', color: '#94a3b8', margin: '2px 0 0' }}>{ev.event_time}</p></td>
                          <td style={{ padding: '12px', fontSize: '12px', color: '#475569' }}>{ev.location}</td>
                          <td style={{ padding: '12px' }}><span style={{ fontSize: '11px', padding: '3px 8px', borderRadius: '100px', background: '#f1f5f9', color: '#475569' }}>{ev.event_type}</span></td>
                          <td style={{ padding: '12px', textAlign: 'right' }}>
                            <button onClick={() => openEventModal(ev)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px', marginRight: '4px' }}><EditIcon /></button>
                            <button onClick={() => deleteEvent(ev.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}><TrashIcon /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {events.length === 0 && <p style={{ padding: '24px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>No events. Add your first event.</p>}
              </div>
              {/* Mobile Cards */}
              <div className="admin-card-list">
                {events.map(ev => (
                  <div key={ev.id} style={{ background: 'white', borderRadius: '10px', padding: '14px', border: '1px solid #e2e8f0', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', margin: '0 0 2px' }}>{ev.title}</p>
                        {ev.organizer && <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>{ev.organizer}</p>}
                      </div>
                      <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                        <button onClick={() => openEventModal(ev)} style={{ background: '#f1f5f9', border: 'none', color: '#64748b', cursor: 'pointer', padding: '6px', borderRadius: '6px' }}><EditIcon /></button>
                        <button onClick={() => deleteEvent(ev.id)} style={{ background: '#fef2f2', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '6px', borderRadius: '6px' }}><TrashIcon /></button>
                      </div>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', fontSize: '12px', color: '#475569' }}>
                      <span>{ev.event_date}</span>
                      {ev.event_time && <span>- {ev.event_time}</span>}
                    </div>
                    {ev.location && <p style={{ fontSize: '12px', color: '#64748b', margin: '4px 0 0' }}>{ev.location}</p>}
                    <span style={{ fontSize: '10px', padding: '3px 8px', borderRadius: '100px', background: '#f1f5f9', color: '#475569', display: 'inline-block', marginTop: '8px' }}>{ev.event_type}</span>
                  </div>
                ))}
                {events.length === 0 && <p style={{ padding: '24px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>No events. Add your first event.</p>}
              </div>
            </>
          )}

          {/* Cats Tab */}
          {tab === 'cats' && (
            <>
              <button onClick={() => openCatModal()} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', borderRadius: '8px', border: 'none', background: '#4f46e5', color: 'white', fontSize: '13px', fontWeight: '500', cursor: 'pointer', marginBottom: '16px', width: '100%', justifyContent: 'center' }} className="admin-add-btn"><PlusIcon /> Add Cat</button>
              {/* Desktop Table */}
              <div className="admin-table-wrap" style={{ background: 'white', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
                    <thead><tr style={{ background: '#f8fafc' }}>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Cat</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Age</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Gender</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Location</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Contact</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Status</th>
                      <th style={{ padding: '12px', textAlign: 'right', fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Actions</th>
                    </tr></thead>
                    <tbody>
                      {cats.map(cat => (
                        <tr key={cat.id} style={{ borderTop: '1px solid #e2e8f0' }}>
                          <td style={{ padding: '12px' }}><p style={{ fontSize: '13px', fontWeight: '500', color: '#1e293b', margin: 0 }}>{cat.name}</p><p style={{ fontSize: '11px', color: '#64748b', margin: '2px 0 0' }}>{cat.breed} {cat.color && `- ${cat.color}`}</p></td>
                          <td style={{ padding: '12px', fontSize: '12px', color: '#475569' }}>{cat.age || '-'}</td>
                          <td style={{ padding: '12px', fontSize: '12px', color: '#475569' }}>{cat.gender}</td>
                          <td style={{ padding: '12px', fontSize: '12px', color: '#475569' }}>{cat.location || '-'}</td>
                          <td style={{ padding: '12px', fontSize: '12px', color: '#475569' }}>{cat.contact || '-'}</td>
                          <td style={{ padding: '12px' }}><span style={getStatusStyle(cat.status)}>{cat.status}</span></td>
                          <td style={{ padding: '12px', textAlign: 'right' }}>
                            <button onClick={() => openCatModal(cat)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px', marginRight: '4px' }}><EditIcon /></button>
                            <button onClick={() => deleteCat(cat.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}><TrashIcon /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {cats.length === 0 && <p style={{ padding: '24px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>No cats. Add your first cat for adoption.</p>}
              </div>
              {/* Mobile Cards */}
              <div className="admin-card-list">
                {cats.map(cat => (
                  <div key={cat.id} style={{ background: 'white', borderRadius: '10px', padding: '14px', border: '1px solid #e2e8f0', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                          <p style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', margin: 0 }}>{cat.name}</p>
                          <span style={getStatusStyle(cat.status)}>{cat.status}</span>
                        </div>
                        <p style={{ fontSize: '11px', color: '#64748b', margin: 0 }}>{cat.breed} {cat.color && `- ${cat.color}`}</p>
                      </div>
                      <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                        <button onClick={() => openCatModal(cat)} style={{ background: '#f1f5f9', border: 'none', color: '#64748b', cursor: 'pointer', padding: '6px', borderRadius: '6px' }}><EditIcon /></button>
                        <button onClick={() => deleteCat(cat.id)} style={{ background: '#fef2f2', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '6px', borderRadius: '6px' }}><TrashIcon /></button>
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', fontSize: '12px', color: '#475569' }}>
                      <div><span style={{ color: '#94a3b8' }}>Age: </span>{cat.age || '-'}</div>
                      <div><span style={{ color: '#94a3b8' }}>Gender: </span>{cat.gender}</div>
                      <div><span style={{ color: '#94a3b8' }}>Location: </span>{cat.location || '-'}</div>
                      <div><span style={{ color: '#94a3b8' }}>Contact: </span>{cat.contact || '-'}</div>
                    </div>
                  </div>
                ))}
                {cats.length === 0 && <p style={{ padding: '24px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>No cats. Add your first cat for adoption.</p>}
              </div>
            </>
          )}

          {/* Users Tab */}
          {tab === 'users' && (
            <>
              {/* Desktop Table */}
              <div className="admin-table-wrap" style={{ background: 'white', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px' }}>
                    <thead><tr style={{ background: '#f8fafc' }}>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Name</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Email</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Phone</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Joined</th>
                    </tr></thead>
                    <tbody>
                      {profiles.map(p => (
                        <tr key={p.id} style={{ borderTop: '1px solid #e2e8f0' }}>
                          <td style={{ padding: '12px', fontSize: '13px', fontWeight: '500', color: '#1e293b' }}>{p.name || 'Unknown'}</td>
                          <td style={{ padding: '12px', fontSize: '12px', color: '#475569' }}>{p.email || '-'}</td>
                          <td style={{ padding: '12px', fontSize: '12px', color: '#475569' }}>{p.phone || '-'}</td>
                          <td style={{ padding: '12px', fontSize: '12px', color: '#94a3b8' }}>{p.created_at ? new Date(p.created_at).toLocaleDateString('en-MY') : '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {profiles.length === 0 && <p style={{ padding: '24px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>No registered users yet.</p>}
              </div>
              {/* Mobile Cards */}
              <div className="admin-card-list">
                {profiles.map(p => (
                  <div key={p.id} style={{ background: 'white', borderRadius: '10px', padding: '14px', border: '1px solid #e2e8f0', marginBottom: '10px' }}>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', margin: '0 0 4px' }}>{p.name || 'Unknown'}</p>
                    <p style={{ fontSize: '12px', color: '#475569', margin: '0 0 2px' }}>{p.email || '-'}</p>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '6px' }}>
                      <span style={{ fontSize: '12px', color: '#475569' }}>{p.phone || '-'}</span>
                      <span style={{ fontSize: '11px', color: '#94a3b8' }}>{p.created_at ? new Date(p.created_at).toLocaleDateString('en-MY') : '-'}</span>
                    </div>
                  </div>
                ))}
                {profiles.length === 0 && <p style={{ padding: '24px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>No registered users yet.</p>}
              </div>
            </>
          )}

          {/* Shelters Tab */}
          {tab === 'shelters' && (
            <>
              <button onClick={() => openShelterModal()} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '10px 16px', borderRadius: '8px', border: 'none', background: '#4f46e5', color: 'white', fontSize: '13px', fontWeight: '500', cursor: 'pointer', marginBottom: '16px', width: '100%', justifyContent: 'center' }} className="admin-add-btn"><PlusIcon /> Add Shelter</button>
              {/* Desktop Table */}
              <div className="admin-table-wrap" style={{ background: 'white', borderRadius: '8px', border: '1px solid #e2e8f0', overflow: 'hidden' }}>
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '500px' }}>
                    <thead><tr style={{ background: '#f8fafc' }}>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Name</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Address</th>
                      <th style={{ padding: '12px', textAlign: 'left', fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Status</th>
                      <th style={{ padding: '12px', textAlign: 'right', fontSize: '11px', fontWeight: '600', color: '#64748b', textTransform: 'uppercase' }}>Actions</th>
                    </tr></thead>
                    <tbody>
                      {shelters.map(s => (
                        <tr key={s.id} style={{ borderTop: '1px solid #e2e8f0' }}>
                          <td style={{ padding: '12px', fontSize: '13px', fontWeight: '500', color: '#1e293b' }}>{s.name}</td>
                          <td style={{ padding: '12px', fontSize: '12px', color: '#475569' }}>{s.address || '-'}</td>
                          <td style={{ padding: '12px' }}><span style={{ fontSize: '11px', padding: '4px 10px', borderRadius: '100px', fontWeight: '500', background: s.is_open ? '#f0fdf4' : '#fef2f2', color: s.is_open ? '#166534' : '#dc2626' }}>{s.is_open ? 'Open' : 'Closed'}</span></td>
                          <td style={{ padding: '12px', textAlign: 'right' }}>
                            <button onClick={() => openShelterModal(s)} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', padding: '4px', marginRight: '4px' }}><EditIcon /></button>
                            <button onClick={() => deleteShelter(s.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}><TrashIcon /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {shelters.length === 0 && <p style={{ padding: '24px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>No shelters. Add your first shelter.</p>}
              </div>
              {/* Mobile Cards */}
              <div className="admin-card-list">
                {shelters.map(s => (
                  <div key={s.id} style={{ background: 'white', borderRadius: '10px', padding: '14px', border: '1px solid #e2e8f0', marginBottom: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                          <p style={{ fontSize: '14px', fontWeight: '600', color: '#1e293b', margin: 0 }}>{s.name}</p>
                          <span style={{ fontSize: '10px', padding: '3px 8px', borderRadius: '100px', fontWeight: '500', background: s.is_open ? '#f0fdf4' : '#fef2f2', color: s.is_open ? '#166534' : '#dc2626' }}>{s.is_open ? 'Open' : 'Closed'}</span>
                        </div>
                        {s.address && <p style={{ fontSize: '12px', color: '#64748b', margin: 0 }}>{s.address}</p>}
                      </div>
                      <div style={{ display: 'flex', gap: '4px', flexShrink: 0 }}>
                        <button onClick={() => openShelterModal(s)} style={{ background: '#f1f5f9', border: 'none', color: '#64748b', cursor: 'pointer', padding: '6px', borderRadius: '6px' }}><EditIcon /></button>
                        <button onClick={() => deleteShelter(s.id)} style={{ background: '#fef2f2', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '6px', borderRadius: '6px' }}><TrashIcon /></button>
                      </div>
                    </div>
                  </div>
                ))}
                {shelters.length === 0 && <p style={{ padding: '24px', textAlign: 'center', color: '#94a3b8', fontSize: '13px' }}>No shelters. Add your first shelter.</p>}
              </div>
            </>
          )}
        </main>
      </div>

      {/* Event Modal */}
      {showModal === 'event' && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 200, padding: '0' }} className="admin-modal-overlay">
          <div style={{ background: 'white', borderRadius: '12px 12px 0 0', padding: '20px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }} className="admin-modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', margin: 0 }}>{editItem ? 'Edit Event' : 'Add Event'}</h3>
              <button onClick={() => { setShowModal(null); setEditItem(null) }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><XIcon /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Title *</label>
                <input value={eventForm.title} onChange={e => setEventForm({...eventForm, title: e.target.value})} placeholder="Event title" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#1e293b', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Organizer</label>
                <input value={eventForm.organizer} onChange={e => setEventForm({...eventForm, organizer: e.target.value})} placeholder="Organizer name" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#1e293b', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Date *</label>
                <input type="date" value={eventForm.event_date} onChange={e => setEventForm({...eventForm, event_date: e.target.value})} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#1e293b', boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Time From</label>
                  <CustomDropdown value={eventForm.event_time_from} options={TIME_OPTIONS.map(t => ({ value: t, label: t }))} onChange={v => setEventForm({...eventForm, event_time_from: v})} placeholder="From" />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Time To</label>
                  <CustomDropdown value={eventForm.event_time_to} options={TIME_OPTIONS.map(t => ({ value: t, label: t }))} onChange={v => setEventForm({...eventForm, event_time_to: v})} placeholder="To" />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Location</label>
                <input value={eventForm.location} onChange={e => setEventForm({...eventForm, location: e.target.value})} placeholder="Event location" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#1e293b', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Event Type</label>
                <CustomDropdown value={eventForm.event_type} options={EVENT_TYPES} onChange={v => setEventForm({...eventForm, event_type: v})} placeholder="Select type" />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Description</label>
                <textarea value={eventForm.description} onChange={e => setEventForm({...eventForm, description: e.target.value})} placeholder="Event description..." rows={3} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#1e293b', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }} />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <button onClick={() => { setShowModal(null); setEditItem(null) }} style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0', background: 'white', color: '#475569', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleSaveEvent} style={{ flex: 1, padding: '10px', borderRadius: '6px', border: 'none', background: '#4f46e5', color: 'white', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>{editItem ? 'Update' : 'Add Event'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Cat Modal */}
      {showModal === 'cat' && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 200, padding: '0' }} className="admin-modal-overlay">
          <div style={{ background: 'white', borderRadius: '12px 12px 0 0', padding: '20px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }} className="admin-modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', margin: 0 }}>{editItem ? 'Edit Cat' : 'Add Cat for Adoption'}</h3>
              <button onClick={() => { setShowModal(null); setEditItem(null) }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><XIcon /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Name *</label>
                <input value={catForm.name} onChange={e => setCatForm({...catForm, name: e.target.value})} placeholder="Cat name" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#1e293b', boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Breed</label>
                  <CustomDropdown value={catForm.breed} options={CAT_BREEDS.map(b => ({ value: b, label: b }))} onChange={v => setCatForm({...catForm, breed: v})} placeholder="Select breed" />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Gender</label>
                  <CustomDropdown value={catForm.gender} options={GENDERS} onChange={v => setCatForm({...catForm, gender: v})} placeholder="Gender" />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Age</label>
                  <input value={catForm.age} onChange={e => setCatForm({...catForm, age: e.target.value})} placeholder="e.g., 8 months" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#1e293b', boxSizing: 'border-box' }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Color</label>
                  <input value={catForm.color} onChange={e => setCatForm({...catForm, color: e.target.value})} placeholder="e.g., Orange" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#1e293b', boxSizing: 'border-box' }} />
                </div>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Description</label>
                <textarea value={catForm.description} onChange={e => setCatForm({...catForm, description: e.target.value})} placeholder="Describe the cat's personality..." rows={2} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#1e293b', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }} />
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={catForm.vaccinated} onChange={e => setCatForm({...catForm, vaccinated: e.target.checked})} style={{ width: '16px', height: '16px', accentColor: '#4f46e5' }} />
                  <span style={{ fontSize: '13px', color: '#1e293b' }}>Vaccinated</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={catForm.neutered} onChange={e => setCatForm({...catForm, neutered: e.target.checked})} style={{ width: '16px', height: '16px', accentColor: '#4f46e5' }} />
                  <span style={{ fontSize: '13px', color: '#1e293b' }}>Neutered/Spayed</span>
                </label>
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Location / Shelter</label>
                <input value={catForm.location} onChange={e => setCatForm({...catForm, location: e.target.value})} placeholder="e.g., SPCA Selangor" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#1e293b', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Shelter Address</label>
                <input value={catForm.address} onChange={e => setCatForm({...catForm, address: e.target.value})} placeholder="e.g., No. 1, Jalan SS13/4, Subang Jaya" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#1e293b', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>WhatsApp Contact</label>
                <input value={catForm.contact} onChange={e => setCatForm({...catForm, contact: e.target.value})} placeholder="e.g., 60123456789" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#1e293b', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Status</label>
                <CustomDropdown value={catForm.status} options={CAT_STATUSES} onChange={v => setCatForm({...catForm, status: v})} placeholder="Select status" />
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <button onClick={() => { setShowModal(null); setEditItem(null) }} style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0', background: 'white', color: '#475569', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleSaveCat} style={{ flex: 1, padding: '10px', borderRadius: '6px', border: 'none', background: '#4f46e5', color: 'white', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>{editItem ? 'Update' : 'Add Cat'}</button>
            </div>
          </div>
        </div>
      )}

      {/* Shelter Modal */}
      {showModal === 'shelter' && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', zIndex: 200, padding: '0' }} className="admin-modal-overlay">
          <div style={{ background: 'white', borderRadius: '12px 12px 0 0', padding: '20px', width: '100%', maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }} className="admin-modal-content">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', margin: 0 }}>{editItem ? 'Edit Shelter' : 'Add Shelter'}</h3>
              <button onClick={() => { setShowModal(null); setEditItem(null) }} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}><XIcon /></button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div>
                <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Name *</label>
                <input value={shelterForm.name} onChange={e => setShelterForm({...shelterForm, name: e.target.value})} placeholder="Shelter name" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#1e293b', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ fontSize: '12px', color: '#64748b', display: 'block', marginBottom: '4px' }}>Address</label>
                <textarea value={shelterForm.address} onChange={e => setShelterForm({...shelterForm, address: e.target.value})} placeholder="Full address..." rows={2} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid #e2e8f0', fontSize: '13px', color: '#1e293b', resize: 'vertical', fontFamily: 'inherit', boxSizing: 'border-box' }} />
              </div>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                  <input type="checkbox" checked={shelterForm.is_open} onChange={e => setShelterForm({...shelterForm, is_open: e.target.checked})} style={{ width: '16px', height: '16px', accentColor: '#4f46e5' }} />
                  <span style={{ fontSize: '13px', color: '#1e293b' }}>Open for visits</span>
                </label>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
              <button onClick={() => { setShowModal(null); setEditItem(null) }} style={{ flex: 1, padding: '10px', borderRadius: '6px', border: '1px solid #e2e8f0', background: 'white', color: '#475569', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleSaveShelter} style={{ flex: 1, padding: '10px', borderRadius: '6px', border: 'none', background: '#4f46e5', color: 'white', fontSize: '13px', fontWeight: '500', cursor: 'pointer' }}>{editItem ? 'Update' : 'Add Shelter'}</button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .admin-desktop-sidebar { display: block; }
        .admin-mobile-header { display: none; }
        .admin-main { margin-left: 220px; }
        .admin-card-list { display: none; }
        .admin-table-wrap { display: block; }
        .admin-add-btn { width: auto !important; }
        .admin-stats-grid { grid-template-columns: repeat(6, 1fr); }
        .admin-dashboard-grid { grid-template-columns: 1fr 1fr; }
        .admin-modal-overlay { align-items: center !important; padding: 20px !important; }
        .admin-modal-content { border-radius: 12px !important; }

        @media (max-width: 1200px) {
          .admin-stats-grid { grid-template-columns: repeat(3, 1fr); }
        }

        @media (max-width: 768px) {
          .admin-desktop-sidebar { display: none !important; }
          .admin-mobile-header { display: block !important; }
          .admin-main { margin-left: 0 !important; padding: 16px !important; }
          .admin-table-wrap { display: none !important; }
          .admin-card-list { display: block !important; }
          .admin-add-btn { width: 100% !important; }
          .admin-stats-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .admin-dashboard-grid { grid-template-columns: 1fr !important; }
          .admin-modal-overlay { align-items: flex-end !important; padding: 0 !important; }
          .admin-modal-content { border-radius: 16px 16px 0 0 !important; max-height: 85vh !important; }
        }

        @media (max-width: 400px) {
          .admin-stats-grid { grid-template-columns: 1fr 1fr !important; }
          .admin-main { padding: 12px !important; }
        }
      `}</style>
    </div>
  )
}