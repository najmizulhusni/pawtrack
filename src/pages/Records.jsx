import { useState, useEffect } from 'react'
import { useApp } from '../App'
import { supabase } from '../lib/supabase'

const Syringe = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2l4 4M17 7l3-3M19 9l-8.7 8.7c-.4.4-1 .4-1.4 0L5.3 14.1c-.4-.4-.4-1 0-1.4L14 4"/><path d="M5 19l-3 3M14 4l5 5M7 17l-2 2"/></svg>
const Stethoscope = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4.8 2.3A.3.3 0 105 2H4a2 2 0 00-2 2v5a6 6 0 006 6 6 6 0 006-6V4a2 2 0 00-2-2h-1a.2.2 0 10.3.3"/><path d="M8 15v1a6 6 0 006 6 6 6 0 006-6v-4"/><circle cx="20" cy="10" r="2"/></svg>
const Tooth = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2C9.5 2 7 3 7 6c0 2 .5 3 .5 5s-.5 4-.5 6c0 3 1.5 5 3 5s2-2 2-4c0 2 .5 4 2 4s3-2 3-5c0-2-.5-4-.5-6s.5-3 .5-5c0-3-2.5-4-5-4z"/></svg>
const Plus = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
const Download = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3"/></svg>
const Eye = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
const XIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
const ChevronDown = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
const Trash = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
const FilterIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>
const CalendarIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>

// Cat Avatar Component
const CatAvatar = ({ size = 48, cat, style = {} }) => {
  const colors = ['#4f46e5', '#7c3aed', '#ec4899', '#f59e0b', '#22c55e', '#06b6d4', '#ef4444', '#8b5cf6']
  const getColor = () => {
    if (!cat) return colors[0]
    const hash = (cat.name || '').split('').reduce((a, c) => a + c.charCodeAt(0), 0)
    return colors[hash % colors.length]
  }
  const bgColor = getColor()
  const iconSize = Math.floor(size * 0.5)
  return (
    <div style={{ width: size, height: size, borderRadius: size * 0.25, background: `linear-gradient(135deg, ${bgColor}, ${bgColor}dd)`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0, ...style }}>
      <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3.1-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0112 5z"/></svg>
    </div>
  )
}

const RECORD_TYPES = [
  { value: 'vaccination', label: 'Vaccination', Icon: Syringe },
  { value: 'checkup', label: 'Check-up', Icon: Stethoscope },
  { value: 'dental', label: 'Dental', Icon: Tooth },
  { value: 'surgery', label: 'Surgery', Icon: Stethoscope },
  { value: 'other', label: 'Other', Icon: Stethoscope },
]

// Custom Dropdown
function CustomDropdown({ value, options, onChange, placeholder, theme, darkMode }) {
  const [isOpen, setIsOpen] = useState(false)
  const selected = options.find(o => o.value === value)
  
  return (
    <div style={{ position: 'relative' }}>
      <button type="button" onClick={() => setIsOpen(!isOpen)} style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'left' }}>
        <span>{selected?.label || placeholder}</span>
        <ChevronDown />
      </button>
      {isOpen && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 100 }} onClick={() => setIsOpen(false)} />
          <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '4px', background: theme.card, border: `1px solid ${theme.border}`, borderRadius: '10px', boxShadow: '0 10px 40px rgba(0,0,0,0.15)', zIndex: 101, maxHeight: '200px', overflowY: 'auto' }}>
            {options.map((option) => (
              <button key={option.value} type="button" onClick={() => { onChange(option.value); setIsOpen(false) }} style={{ width: '100%', padding: '10px 14px', border: 'none', background: option.value === value ? (darkMode ? '#334155' : '#f0f9ff') : 'transparent', color: theme.text, fontSize: '13px', cursor: 'pointer', textAlign: 'left' }}>
                {option.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function Records({ onNavigate }) {
  const { darkMode, theme, cats, activeCat, user, selectCat } = useApp()
  const [showAddRecord, setShowAddRecord] = useState(false)
  const [records, setRecords] = useState([])
  const [allRecords, setAllRecords] = useState([])
  const [newRecord, setNewRecord] = useState({ date: '', type: 'checkup', clinic: '', notes: '', catId: '' })
  const [loading, setLoading] = useState(true)
  const [filterCat, setFilterCat] = useState('all')
  const [filterDateFrom, setFilterDateFrom] = useState('')
  const [filterDateTo, setFilterDateTo] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  // Load records from Supabase for all cats
  useEffect(() => {
    loadAllRecords()
  }, [cats])

  const loadAllRecords = async () => {
    if (!supabase || cats.length === 0) {
      setLoading(false)
      return
    }
    
    try {
      const catIds = cats.map(c => c.id)
      const { data, error } = await supabase
        .from('medical_records')
        .select('*')
        .in('cat_id', catIds)
        .order('record_date', { ascending: false })
      
      if (error) {
        console.error('Load records error:', error)
      } else {
        setAllRecords(data || [])
      }
    } catch (err) {
      console.error('Load records exception:', err)
    } finally {
      setLoading(false)
    }
  }

  // Filter records based on selected cat and date range
  useEffect(() => {
    let filtered = [...allRecords]
    
    // Filter by cat
    if (filterCat !== 'all') {
      filtered = filtered.filter(r => r.cat_id === filterCat)
    }
    
    // Filter by date from
    if (filterDateFrom) {
      filtered = filtered.filter(r => r.record_date >= filterDateFrom)
    }
    
    // Filter by date to
    if (filterDateTo) {
      filtered = filtered.filter(r => r.record_date <= filterDateTo)
    }
    
    setRecords(filtered)
  }, [allRecords, filterCat, filterDateFrom, filterDateTo])

  const clearFilters = () => {
    setFilterCat('all')
    setFilterDateFrom('')
    setFilterDateTo('')
  }

  const hasActiveFilters = filterCat !== 'all' || filterDateFrom || filterDateTo

  const getIcon = (type) => {
    const found = RECORD_TYPES.find(t => t.value === type)
    return found ? found.Icon : Stethoscope
  }

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('en-MY', { day: 'numeric', month: 'short', year: 'numeric' })

  if (loading) {
    return (
      <div style={{ minHeight: '100vh', background: theme.bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <p style={{ color: theme.textMuted }}>Loading records...</p>
      </div>
    )
  }

  const handleAddRecord = async () => {
    const catId = newRecord.catId || activeCat?.id
    if (newRecord.date && newRecord.type && catId) {
      const recordData = {
        id: crypto.randomUUID(),
        cat_id: catId,
        user_id: user.id,
        record_date: newRecord.date,
        record_type: newRecord.type,
        clinic: newRecord.clinic || null,
        notes: newRecord.notes || null,
        has_files: false,
        file_url: null
      }
      
      // Add to local state immediately
      setAllRecords([recordData, ...allRecords])
      setNewRecord({ date: '', type: 'checkup', clinic: '', notes: '', catId: '' })
      setShowAddRecord(false)
      
      // Save to Supabase
      if (supabase) {
        try {
          const { error } = await supabase
            .from('medical_records')
            .insert([recordData])
          
          if (error) {
            console.error('Save record error:', error)
            alert('Error saving record: ' + error.message)
            // Reload to sync with database
            loadAllRecords()
          }
        } catch (err) {
          console.error('Save record exception:', err)
        }
      }
    }
  }

  const deleteRecord = async (id) => {
    if (confirm('Delete this record?')) {
      // Remove from local state
      setAllRecords(allRecords.filter(r => r.id !== id))
      
      // Delete from Supabase
      if (supabase) {
        try {
          const { error } = await supabase
            .from('medical_records')
            .delete()
            .eq('id', id)
          
          if (error) {
            console.error('Delete record error:', error)
            // Reload to sync with database
            loadAllRecords()
          }
        } catch (err) {
          console.error('Delete record exception:', err)
        }
      }
    }
  }

  const getCatById = (catId) => cats.find(c => c.id === catId)

  const stats = [
    { label: 'Total Visits', value: allRecords.length, color: '#4f46e5' },
    { label: 'This Year', value: allRecords.filter(r => new Date(r.record_date).getFullYear() === 2026).length, color: '#7c3aed' },
    { label: 'Documents', value: allRecords.filter(r => r.has_files).length, color: '#ec4899' },
  ]

  const catOptions = [{ value: 'all', label: 'All Cats' }, ...cats.map(c => ({ value: c.id, label: c.name }))]

  return (
    <div style={{ minHeight: '100vh', background: theme.bg }}>
      <header style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '14px', borderBottom: `1px solid ${theme.border}`, background: theme.card }}>
        <CatAvatar size={42} cat={filterCat === 'all' ? activeCat : getCatById(filterCat)} />
        <div style={{ flex: 1 }}><h1 style={{ fontSize: '20px', fontWeight: '700', color: theme.text, margin: 0 }}>Medical Records</h1><p style={{ fontSize: '12px', color: theme.textMuted, margin: '2px 0 0' }}>{filterCat === 'all' ? 'All cats' : getCatById(filterCat)?.name}'s health history</p></div>
        <button onClick={() => setShowAddRecord(true)} style={{ height: '38px', padding: '0 14px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: 'white', fontSize: '12px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}><Plus /> Add</button>
      </header>

      <div style={{ padding: '20px' }}>
        {/* Filter - Same style as Schedule */}
        <div style={{ background: theme.card, borderRadius: '14px', padding: '16px', marginBottom: '16px', border: `1px solid ${theme.border}` }}>
          <div className="records-filter" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <div>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: theme.text, margin: '0 0 4px' }}>Filter Records</h4>
              <p style={{ fontSize: '12px', color: theme.textMuted, margin: 0 }}>View records for specific cat or date range</p>
            </div>
            <div className="records-filter-controls" style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
              <div style={{ minWidth: '160px' }}>
                <CustomDropdown value={filterCat} options={catOptions} onChange={setFilterCat} placeholder="All Cats" theme={theme} darkMode={darkMode} />
              </div>
              <input type="date" value={filterDateFrom} onChange={e => setFilterDateFrom(e.target.value)} placeholder="From" style={{ padding: '10px 12px', borderRadius: '10px', border: `1px solid ${theme.border}`, fontSize: '13px', background: theme.bg, color: theme.text }} />
              <input type="date" value={filterDateTo} onChange={e => setFilterDateTo(e.target.value)} placeholder="To" style={{ padding: '10px 12px', borderRadius: '10px', border: `1px solid ${theme.border}`, fontSize: '13px', background: theme.bg, color: theme.text }} />
              {hasActiveFilters && <button onClick={clearFilters} style={{ padding: '10px 14px', borderRadius: '10px', border: 'none', background: '#ef444420', color: '#ef4444', fontSize: '12px', fontWeight: '500', cursor: 'pointer' }}>Clear</button>}
            </div>
          </div>
          {hasActiveFilters && <p style={{ fontSize: '12px', color: theme.textMuted, margin: '12px 0 0' }}>Showing {records.length} of {allRecords.length} records</p>}
        </div>

        {/* Stats */}
        <div className="records-stats" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
          {stats.map((stat, i) => (
            <div key={i} style={{ background: theme.card, borderRadius: '14px', padding: '18px', border: `1px solid ${theme.border}` }}>
              <p style={{ fontSize: '26px', fontWeight: '700', color: stat.color, margin: '0 0 4px' }}>{stat.value}</p>
              <p style={{ fontSize: '12px', color: theme.textMuted, margin: 0 }}>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Records */}
        <h3 style={{ fontSize: '12px', fontWeight: '600', color: theme.textMuted, margin: '0 0 12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Visit History</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {records.map(record => {
            const Icon = getIcon(record.record_type)
            return (
              <div key={record.id} style={{ background: theme.card, borderRadius: '14px', padding: '16px', border: `1px solid ${theme.border}` }}>
                <div style={{ display: 'flex', gap: '14px' }}>
                  <div style={{ width: '44px', height: '44px', background: darkMode ? '#334155' : '#e0e7ff', borderRadius: '10px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4f46e5', flexShrink: 0 }}><Icon /></div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '15px', fontWeight: '600', color: theme.text, margin: '0 0 4px' }}>{RECORD_TYPES.find(t => t.value === record.record_type)?.label || 'Record'}</p>
                    <p style={{ fontSize: '12px', color: theme.textMuted, margin: '0 0 4px' }}>{formatDate(record.record_date)} {record.clinic && `• ${record.clinic}`}</p>
                    {record.notes && <p style={{ fontSize: '12px', color: theme.textMuted, margin: 0, opacity: 0.8 }}>{record.notes}</p>}
                  </div>
                  <button onClick={() => deleteRecord(record.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}><Trash /></button>
                </div>
                {record.has_files && (
                  <div style={{ display: 'flex', gap: '8px', marginTop: '14px', paddingTop: '14px', borderTop: `1px solid ${theme.border}` }}>
                    <button onClick={() => alert('View Photo')} style={{ flex: 1, background: darkMode ? '#334155' : '#f8fafc', color: theme.text, border: `1px solid ${theme.border}`, padding: '10px', borderRadius: '8px', fontSize: '12px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}><Eye /> View</button>
                    <button onClick={() => alert('Download')} style={{ flex: 1, background: darkMode ? '#334155' : '#f8fafc', color: theme.text, border: `1px solid ${theme.border}`, padding: '10px', borderRadius: '8px', fontSize: '12px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}><Download /> Download</button>
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {records.length === 0 && (
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <p style={{ fontSize: '14px', color: theme.textMuted }}>No medical records yet. Add your first record!</p>
          </div>
        )}
      </div>

      <style>{`
        @media (max-width: 600px) {
          .records-stats { grid-template-columns: 1fr !important; }
          .records-filter { flex-direction: column !important; align-items: stretch !important; }
          .records-filter-controls { flex-direction: column !important; width: 100% !important; }
          .records-filter-controls > * { width: 100% !important; min-width: 100% !important; }
        }
      `}</style>

      {/* Add Record Modal */}
      {showAddRecord && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 300, padding: '20px' }}>
          <div style={{ background: theme.card, borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '420px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: theme.text, margin: 0 }}>Add Medical Record</h3>
              <button onClick={() => setShowAddRecord(false)} style={{ background: 'none', border: 'none', color: theme.textMuted, cursor: 'pointer' }}><XIcon /></button>
            </div>
            
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', color: theme.textMuted, display: 'block', marginBottom: '4px' }}>Date *</label>
              <input type="date" value={newRecord.date} onChange={e => setNewRecord({...newRecord, date: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: `1px solid ${theme.border}`, fontSize: '14px', background: theme.bg, color: theme.text, boxSizing: 'border-box' }} />
            </div>
            
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', color: theme.textMuted, display: 'block', marginBottom: '4px' }}>Record Type *</label>
              <CustomDropdown
                value={newRecord.type}
                options={RECORD_TYPES}
                onChange={(val) => setNewRecord({...newRecord, type: val})}
                placeholder="Select type"
                theme={theme}
                darkMode={darkMode}
              />
            </div>
            
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', color: theme.textMuted, display: 'block', marginBottom: '4px' }}>Clinic Name</label>
              <input placeholder="e.g., Happy Paws Clinic" value={newRecord.clinic} onChange={e => setNewRecord({...newRecord, clinic: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: `1px solid ${theme.border}`, fontSize: '14px', background: theme.bg, color: theme.text, boxSizing: 'border-box' }} />
            </div>
            
            <div style={{ marginBottom: '20px' }}>
              <label style={{ fontSize: '12px', color: theme.textMuted, display: 'block', marginBottom: '4px' }}>Notes</label>
              <textarea placeholder="Add any notes about this visit..." value={newRecord.notes} onChange={e => setNewRecord({...newRecord, notes: e.target.value})} rows={3} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: `1px solid ${theme.border}`, fontSize: '14px', background: theme.bg, color: theme.text, boxSizing: 'border-box', resize: 'none' }} />
            </div>
            
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={() => setShowAddRecord(false)} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: `1px solid ${theme.border}`, background: 'transparent', color: theme.text, fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
              <button onClick={handleAddRecord} disabled={!newRecord.date || !newRecord.type} style={{ flex: 1, padding: '12px', borderRadius: '10px', border: 'none', background: newRecord.date && newRecord.type ? 'linear-gradient(135deg, #4f46e5, #7c3aed)' : '#94a3b8', color: 'white', fontSize: '14px', fontWeight: '600', cursor: newRecord.date && newRecord.type ? 'pointer' : 'not-allowed' }}>Add Record</button>
            </div>
          </div>
        </div>
      )}


    </div>
  )
}
