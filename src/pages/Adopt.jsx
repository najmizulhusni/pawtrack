import { useState, useEffect } from 'react'
import { useApp } from '../App'
import { supabase } from '../lib/supabase'
import CatDetail from './CatDetail'

const MapPin = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
const Phone = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
const SearchIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></svg>
const Calendar = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
const Clock = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
const HeartIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
const CalendarIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>
const WhatsAppIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>

const TYPE_COLORS = { adoption: { bg: '#dcfce7', text: '#166534', label: 'Adoption' }, show: { bg: '#dbeafe', text: '#1e40af', label: 'Cat Show' }, health: { bg: '#fce7f3', text: '#9d174d', label: 'Health' }, charity: { bg: '#fef3c7', text: '#92400e', label: 'Charity' }, workshop: { bg: '#f3e8ff', text: '#6b21a8', label: 'Workshop' } }

export default function Adopt({ onNavigate }) {
  const { theme, darkMode } = useApp()
  const [tab, setTab] = useState('cats')
  const [selectedCat, setSelectedCat] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterGender, setFilterGender] = useState('all')
  const [eventFilter, setEventFilter] = useState('all')
  const [adoptCats, setAdoptCats] = useState([])
  const [events, setEvents] = useState([])
  const [shelters, setShelters] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    setLoading(true)
    try {
      const [catsRes, eventsRes, sheltersRes] = await Promise.all([
        supabase.from('adoption_cats').select('*').order('created_at', { ascending: false }),
        supabase.from('events').select('*').order('event_date', { ascending: true }),
        supabase.from('shelters').select('*').order('name', { ascending: true })
      ])
      if (catsRes.data) setAdoptCats(catsRes.data)
      if (eventsRes.data) setEvents(eventsRes.data)
      if (sheltersRes.data) setShelters(sheltersRes.data)
    } catch (err) {
      console.error('Failed to load adopt data:', err)
    } finally { setLoading(false) }
  }

  const filteredCats = adoptCats.filter(cat => {
    const matchesSearch = (cat.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || (cat.breed || '').toLowerCase().includes(searchQuery.toLowerCase())
    const matchesGender = filterGender === 'all' || cat.gender === filterGender
    return matchesSearch && matchesGender
  })

  const filteredEvents = eventFilter === 'all' ? events : events.filter(e => e.event_type === eventFilter)
  const formatDate = (dateStr) => { try { return new Date(dateStr).toLocaleDateString('en-MY', { weekday: 'short', day: 'numeric', month: 'short' }) } catch { return dateStr } }

  if (selectedCat) {
    // Map Supabase data to CatDetail expected format
    const catForDetail = {
      ...selectedCat,
      desc: selectedCat.description || 'No description available',
      img: selectedCat.img_url || 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&q=80',
      shelter: selectedCat.location || 'Unknown',
      weight: null,
      personality: selectedCat.description || '',
      dewormed: false,
      trained: false,
      friendly: true,
      indoor: true,
      distance: '-',
    }
    return <CatDetail cat={catForDetail} onBack={() => setSelectedCat(null)} />
  }

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: theme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: theme.textMuted, fontSize: '14px' }}>Loading...</p>
      </div>
    )
  }

  return (
    <div style={{ minHeight: '100vh', background: theme.bg }}>
      <header style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '14px', borderBottom: `1px solid ${theme.border}`, background: theme.card }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '20px', fontWeight: '700', color: theme.text, margin: 0 }}>Adopt & Events</h1>
          <p style={{ fontSize: '12px', color: theme.textMuted, margin: '2px 0 0' }}>Find your furry friend or join pet events</p>
        </div>
      </header>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 73px)' }}>
        {/* Sidebar for Desktop */}
        <div className="adopt-sidebar" style={{ width: '240px', background: theme.card, borderRight: `1px solid ${theme.border}`, padding: '20px', flexShrink: 0 }}>
          <div style={{ marginBottom: '24px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: '600', color: theme.textMuted, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Browse</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[
                { id: 'cats', label: 'Available Cats', icon: <HeartIcon />, count: adoptCats.filter(c => c.status === 'available').length },
                { id: 'events', label: 'Pet Events', icon: <CalendarIcon />, count: events.length },
                { id: 'shelters', label: 'Shelters', icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 21h18M9 8h1M9 12h1M9 16h1M14 8h1M14 12h1M14 16h1"/><path d="M5 21V5a2 2 0 012-2h10a2 2 0 012 2v16"/></svg>, count: shelters.length },
              ].map(item => (
                <button key={item.id} onClick={() => setTab(item.id)} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 12px', borderRadius: '10px', border: 'none', background: tab === item.id ? (darkMode ? '#334155' : '#f0f9ff') : 'transparent', color: tab === item.id ? '#4f46e5' : theme.text, cursor: 'pointer', width: '100%', textAlign: 'left', fontSize: '13px', fontWeight: tab === item.id ? '600' : '500' }}>
                  {item.icon}
                  <span style={{ flex: 1 }}>{item.label}</span>
                  <span style={{ fontSize: '11px', padding: '2px 8px', borderRadius: '100px', background: darkMode ? '#475569' : '#e2e8f0', color: theme.textMuted }}>{item.count}</span>
                </button>
              ))}
            </div>
          </div>
          <div style={{ background: '#fef3c7', borderRadius: '10px', padding: '12px', border: '1px solid #fcd34d' }}>
            <p style={{ fontSize: '11px', color: '#92400e', margin: 0, lineHeight: 1.5 }}>All adoptions require face-to-face meeting and IC verification. Using adopted animals as food is strictly prohibited.</p>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          {/* Mobile Tabs */}
          <div className="mobile-tabs" style={{ display: 'none', gap: '8px', marginBottom: '16px', overflowX: 'auto', paddingBottom: '4px' }}>
            <button onClick={() => setTab('cats')} style={{ padding: '10px 18px', borderRadius: '10px', border: 'none', background: tab === 'cats' ? 'linear-gradient(135deg, #4f46e5, #7c3aed)' : theme.card, color: tab === 'cats' ? 'white' : theme.text, fontSize: '13px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap' }}>Cats ({adoptCats.filter(c => c.status === 'available').length})</button>
            <button onClick={() => setTab('events')} style={{ padding: '10px 18px', borderRadius: '10px', border: 'none', background: tab === 'events' ? 'linear-gradient(135deg, #4f46e5, #7c3aed)' : theme.card, color: tab === 'events' ? 'white' : theme.text, fontSize: '13px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap' }}>Events ({events.length})</button>
            <button onClick={() => setTab('shelters')} style={{ padding: '10px 18px', borderRadius: '10px', border: 'none', background: tab === 'shelters' ? 'linear-gradient(135deg, #4f46e5, #7c3aed)' : theme.card, color: tab === 'shelters' ? 'white' : theme.text, fontSize: '13px', fontWeight: '600', cursor: 'pointer', whiteSpace: 'nowrap' }}>Shelters</button>
          </div>

          {/* Mobile Warning */}
          <div className="mobile-warning" style={{ display: 'none', background: '#fef3c7', borderRadius: '10px', padding: '12px', marginBottom: '16px', border: '1px solid #fcd34d' }}>
            <p style={{ fontSize: '11px', color: '#92400e', margin: 0 }}>All adoptions require face-to-face meeting and IC verification.</p>
          </div>

          {/* CATS TAB */}
          {tab === 'cats' && (
            <>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px', position: 'relative' }}>
                  <div style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: theme.textMuted }}><SearchIcon /></div>
                  <input type="text" placeholder="Search by name or breed..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ width: '100%', padding: '12px 12px 12px 40px', borderRadius: '10px', border: `1px solid ${theme.border}`, fontSize: '13px', background: theme.card, color: theme.text, boxSizing: 'border-box' }} />
                </div>
                <select value={filterGender} onChange={e => setFilterGender(e.target.value)} style={{ padding: '12px 16px', borderRadius: '10px', border: `1px solid ${theme.border}`, fontSize: '13px', background: theme.card, color: theme.text, appearance: 'none', backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'14\' height=\'14\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'%2364748b\' stroke-width=\'2\'%3E%3Cpath d=\'M6 9l6 6 6-6\'/%3E%3C/svg%3E")', backgroundRepeat: 'no-repeat', backgroundPosition: 'right 12px center', paddingRight: '36px' }}>
                  <option value="all">All Genders</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '16px' }}>
                {filteredCats.map(cat => {
                  const catImg = cat.img_url || 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=600&q=80'
                  const statusStyle = cat.status === 'available' ? { bg: '#dcfce7', color: '#166534' } : cat.status === 'pending' ? { bg: '#fef3c7', color: '#92400e' } : { bg: '#f1f5f9', color: '#475569' }
                  return (
                    <div key={cat.id} onClick={() => setSelectedCat(cat)} style={{ background: theme.card, borderRadius: '16px', overflow: 'hidden', border: `1px solid ${theme.border}`, cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s' }} className="cat-card">
                      <div style={{ position: 'relative' }}>
                        <img src={catImg} alt={cat.name} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                        <span style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '10px', fontWeight: '600', padding: '4px 10px', borderRadius: '100px', background: statusStyle.bg, color: statusStyle.color, textTransform: 'capitalize' }}>{cat.status}</span>
                      </div>
                      <div style={{ padding: '16px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                          <div>
                            <h3 style={{ fontSize: '16px', fontWeight: '600', color: theme.text, margin: '0 0 2px' }}>{cat.name}</h3>
                            <p style={{ fontSize: '12px', color: theme.textMuted, margin: 0 }}>{cat.breed}</p>
                          </div>
                          <span style={{ fontSize: '11px', padding: '4px 8px', borderRadius: '6px', background: darkMode ? '#334155' : '#f1f5f9', color: theme.text }}>{cat.gender}</span>
                        </div>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '10px' }}>
                          {cat.age && <span style={{ fontSize: '10px', padding: '3px 8px', borderRadius: '100px', background: darkMode ? '#334155' : '#f1f5f9', color: theme.text }}>{cat.age}</span>}
                          {cat.color && <span style={{ fontSize: '10px', padding: '3px 8px', borderRadius: '100px', background: darkMode ? '#334155' : '#f1f5f9', color: theme.text }}>{cat.color}</span>}
                          {cat.vaccinated && <span style={{ fontSize: '10px', padding: '3px 8px', borderRadius: '100px', background: '#dcfce7', color: '#166534' }}>Vaccinated</span>}
                          {cat.neutered && <span style={{ fontSize: '10px', padding: '3px 8px', borderRadius: '100px', background: '#dbeafe', color: '#1e40af' }}>Neutered</span>}
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <p style={{ fontSize: '11px', color: theme.textMuted, margin: 0, display: 'flex', alignItems: 'center', gap: '4px' }}><MapPin /> {cat.location || 'Unknown'}</p>
                          {cat.contact && (
                            <button onClick={e => { e.stopPropagation(); window.open(`https://wa.me/${cat.contact.replace(/[^0-9]/g, '')}`, '_blank') }} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '4px 8px', borderRadius: '6px', border: 'none', background: '#dcfce7', color: '#166534', fontSize: '10px', fontWeight: '600', cursor: 'pointer' }}>
                              <WhatsAppIcon /> Chat
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
              {filteredCats.length === 0 && <div style={{ textAlign: 'center', padding: '60px 20px' }}><p style={{ fontSize: '14px', color: theme.textMuted }}>No cats found matching your search.</p></div>}
            </>
          )}

          {/* EVENTS TAB */}
          {tab === 'events' && (
            <>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', flexWrap: 'wrap' }}>
                {[{ value: 'all', label: 'All Events' }, ...Object.entries(TYPE_COLORS).map(([k, v]) => ({ value: k, label: v.label }))].map(f => (
                  <button key={f.value} onClick={() => setEventFilter(f.value)} style={{ padding: '8px 14px', borderRadius: '100px', border: 'none', background: eventFilter === f.value ? 'linear-gradient(135deg, #4f46e5, #7c3aed)' : (darkMode ? '#334155' : '#f1f5f9'), color: eventFilter === f.value ? 'white' : theme.text, fontSize: '12px', fontWeight: '500', cursor: 'pointer' }}>{f.label}</button>
                ))}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
                {filteredEvents.map(event => {
                  const typeColor = TYPE_COLORS[event.event_type] || { bg: '#f1f5f9', text: '#475569', label: event.event_type || 'Event' }
                  return (
                    <div key={event.id} style={{ background: theme.card, borderRadius: '16px', overflow: 'hidden', border: `1px solid ${theme.border}` }}>
                      <div style={{ padding: '20px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                          <span style={{ fontSize: '10px', fontWeight: '600', padding: '4px 10px', borderRadius: '100px', background: typeColor.bg, color: typeColor.text }}>{typeColor.label}</span>
                        </div>
                        <h3 style={{ fontSize: '15px', fontWeight: '700', color: theme.text, margin: '0 0 4px' }}>{event.title}</h3>
                        <p style={{ fontSize: '12px', color: '#4f46e5', margin: '0 0 12px', fontWeight: '500' }}>{event.organizer}</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginBottom: '12px' }}>
                          <p style={{ fontSize: '12px', color: theme.text, margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar /> {formatDate(event.event_date)}</p>
                          {event.event_time && <p style={{ fontSize: '12px', color: theme.text, margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}><Clock /> {event.event_time}</p>}
                          {event.location && <p style={{ fontSize: '12px', color: theme.text, margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}><MapPin /> {event.location}</p>}
                        </div>
                        {event.description && <p style={{ fontSize: '12px', color: theme.textMuted, margin: 0, lineHeight: 1.5 }}>{event.description}</p>}
                      </div>
                    </div>
                  )
                })}
              </div>
              {filteredEvents.length === 0 && <div style={{ textAlign: 'center', padding: '60px 20px' }}><p style={{ fontSize: '14px', color: theme.textMuted }}>No events found for this category.</p></div>}
            </>
          )}

          {/* SHELTERS TAB */}
          {tab === 'shelters' && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '16px' }}>
              {shelters.length > 0 ? shelters.map(shelter => (
                <div key={shelter.id} style={{ background: theme.card, borderRadius: '16px', padding: '20px', border: `1px solid ${theme.border}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                    <h3 style={{ fontSize: '16px', fontWeight: '700', color: theme.text, margin: 0 }}>{shelter.name}</h3>
                    <span style={{ fontSize: '11px', fontWeight: '600', padding: '4px 10px', borderRadius: '100px', background: shelter.is_open ? '#dcfce7' : '#fee2e2', color: shelter.is_open ? '#166534' : '#dc2626' }}>
                      {shelter.is_open ? 'Open' : 'Closed'}
                    </span>
                  </div>
                  {shelter.address && (
                    <p style={{ fontSize: '13px', color: theme.textMuted, margin: 0, display: 'flex', alignItems: 'flex-start', gap: '6px', lineHeight: 1.5 }}>
                      <span style={{ marginTop: '2px' }}><MapPin /></span>
                      <span>{shelter.address}</span>
                    </p>
                  )}
                </div>
              )) : (
                <div style={{ textAlign: 'center', padding: '60px 20px', gridColumn: '1 / -1' }}>
                  <p style={{ fontSize: '14px', color: theme.textMuted }}>No shelters found.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) { 
          .adopt-sidebar { display: none !important; }
          .mobile-tabs { display: flex !important; }
          .mobile-warning { display: block !important; }
        }
        .cat-card:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,0,0,0.1); }
      `}</style>
    </div>
  )
}