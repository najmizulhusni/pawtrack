import { useState } from 'react'
import { useApp } from '../App'

const UserIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
const MailIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><path d="M22 6l-10 7L2 6"/></svg>
const PhoneIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
const EditIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>
const TrashIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
const MoonIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
const BellIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 01-3.46 0"/></svg>
const LogOutIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9"/></svg>
const ChevronDown = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>

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

const CAT_BREEDS = ['Kampung Cat', 'Persian', 'British Shorthair', 'Maine Coon', 'Siamese', 'Ragdoll', 'Scottish Fold', 'Bengal', 'Sphynx', 'Russian Blue', 'Abyssinian', 'Burmese', 'Mixed Breed', 'Other']

function CustomDropdown({ value, options, onChange, theme: t }) {
  const [isOpen, setIsOpen] = useState(false)
  const selected = options.find(o => o.value === value)
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <button type="button" onClick={() => setIsOpen(!isOpen)} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: `1px solid ${t?.border || '#e2e8f0'}`, background: t?.bg || 'white', color: t?.text || '#1e293b', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'left' }}>
        <span>{selected?.label || 'Select...'}</span>
        <ChevronDown />
      </button>
      {isOpen && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 100 }} onClick={() => setIsOpen(false)} />
          <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '4px', background: 'white', border: '1px solid #e2e8f0', borderRadius: '6px', boxShadow: '0 10px 40px rgba(0,0,0,0.12)', zIndex: 101, maxHeight: '200px', overflowY: 'auto' }}>
            {options.map(opt => (
              <button key={opt.value} type="button" onClick={() => { onChange(opt.value); setIsOpen(false) }} style={{ width: '100%', padding: '8px', border: 'none', background: opt.value === value ? '#f0f9ff' : 'transparent', color: '#1e293b', fontSize: '13px', cursor: 'pointer', textAlign: 'left' }}>{opt.label}</button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function Profile({ onNavigate }) {
  const { theme, darkMode, setDarkMode, user, setUser, cats, updateCat, deleteCat, getCatAge, notifications, handleLogout } = useApp()
  const [editingUser, setEditingUser] = useState(false)
  const [editUser, setEditUser] = useState({ ...user })
  const [editingCat, setEditingCat] = useState(null)
  const [editCat, setEditCat] = useState(null)

  const handleSaveUser = () => { setUser(editUser); setEditingUser(false) }
  const handleSaveCat = () => { if (editCat) { updateCat(editingCat, editCat); setEditingCat(null); setEditCat(null) } }
  const handleDeleteCat = (id) => { if (cats.length > 1 && confirm('Delete this cat?')) deleteCat(id); else if (cats.length <= 1) alert('You must have at least one cat') }
  const startEditCat = (cat) => { setEditingCat(cat.id); setEditCat({ ...cat }) }


  return (
    <div style={{ minHeight: '100vh', background: theme.bg }}>
      <header style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '14px', borderBottom: `1px solid ${theme.border}`, background: theme.card }}>
        <h1 style={{ fontSize: '20px', fontWeight: '700', color: theme.text, margin: 0 }}>Profile & Settings</h1>
      </header>

      <div style={{ padding: '20px', maxWidth: '700px' }}>
        {/* User Profile */}
        <div style={{ background: theme.card, borderRadius: '14px', padding: '20px', marginBottom: '20px', border: `1px solid ${theme.border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: theme.text, margin: 0 }}>Account</h3>
            <button onClick={() => { setEditingUser(!editingUser); setEditUser({ ...user }) }} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '6px 12px', borderRadius: '8px', border: `1px solid ${theme.border}`, background: 'transparent', color: theme.text, fontSize: '12px', fontWeight: '500', cursor: 'pointer' }}><EditIcon /> {editingUser ? 'Cancel' : 'Edit'}</button>
          </div>

          {editingUser ? (
            <div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '12px', color: theme.textMuted, display: 'block', marginBottom: '4px' }}>Name</label>
                <input value={editUser.name} onChange={e => setEditUser({...editUser, name: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: `1px solid ${theme.border}`, fontSize: '14px', background: theme.bg, color: theme.text, boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '12px' }}>
                <label style={{ fontSize: '12px', color: theme.textMuted, display: 'block', marginBottom: '4px' }}>Email</label>
                <input value={editUser.email} onChange={e => setEditUser({...editUser, email: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: `1px solid ${theme.border}`, fontSize: '14px', background: theme.bg, color: theme.text, boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={{ fontSize: '12px', color: theme.textMuted, display: 'block', marginBottom: '4px' }}>Phone</label>
                <input value={editUser.phone} onChange={e => setEditUser({...editUser, phone: e.target.value})} style={{ width: '100%', padding: '10px', borderRadius: '8px', border: `1px solid ${theme.border}`, fontSize: '14px', background: theme.bg, color: theme.text, boxSizing: 'border-box' }} />
              </div>
              <button onClick={handleSaveUser} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: 'none', background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', color: 'white', fontSize: '14px', fontWeight: '600', cursor: 'pointer' }}>Save Changes</button>
            </div>
          ) : (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: `1px solid ${theme.border}` }}>
                <UserIcon style={{ color: theme.textMuted }} /><div><p style={{ fontSize: '12px', color: theme.textMuted, margin: 0 }}>Name</p><p style={{ fontSize: '14px', color: theme.text, margin: '2px 0 0', fontWeight: '500' }}>{user.name}</p></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0', borderBottom: `1px solid ${theme.border}` }}>
                <MailIcon style={{ color: theme.textMuted }} /><div><p style={{ fontSize: '12px', color: theme.textMuted, margin: 0 }}>Email</p><p style={{ fontSize: '14px', color: theme.text, margin: '2px 0 0', fontWeight: '500' }}>{user.email}</p></div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '10px 0' }}>
                <PhoneIcon style={{ color: theme.textMuted }} /><div><p style={{ fontSize: '12px', color: theme.textMuted, margin: 0 }}>Phone</p><p style={{ fontSize: '14px', color: theme.text, margin: '2px 0 0', fontWeight: '500' }}>{user.phone}</p></div>
              </div>
            </div>
          )}
        </div>


        {/* My Cats */}
        <div style={{ background: theme.card, borderRadius: '14px', padding: '20px', marginBottom: '20px', border: `1px solid ${theme.border}` }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: theme.text, margin: '0 0 16px' }}>My Cats ({cats.length})</h3>
          {cats.map(cat => {
            const age = getCatAge(cat)
            const isEditing = editingCat === cat.id
            return (
              <div key={cat.id} style={{ padding: '14px', background: darkMode ? '#334155' : '#f8fafc', borderRadius: '12px', marginBottom: '10px' }}>
                {isEditing ? (
                  <div>
                    <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}>
                      <CatAvatar size={60} cat={cat} />
                      <div style={{ flex: 1 }}>
                        <input value={editCat.name} onChange={e => setEditCat({...editCat, name: e.target.value})} placeholder="Name" style={{ width: '100%', padding: '8px', borderRadius: '6px', border: `1px solid ${theme.border}`, fontSize: '13px', background: theme.bg, color: theme.text, marginBottom: '8px', boxSizing: 'border-box' }} />
                        <CustomDropdown value={editCat.breed} options={CAT_BREEDS.map(b => ({ value: b, label: b }))} onChange={v => setEditCat({...editCat, breed: v})} theme={theme} />
                      </div>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '8px', marginBottom: '12px' }}>
                      <div>
                        <label style={{ fontSize: '10px', color: theme.textMuted }}>Birthdate</label>
                        <input type="date" value={editCat.birthdate || ''} onChange={e => setEditCat({...editCat, birthdate: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: `1px solid ${theme.border}`, fontSize: '13px', background: theme.bg, color: theme.text, boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', color: theme.textMuted }}>Weight (kg)</label>
                        <input type="number" step="0.1" value={editCat.weight || ''} onChange={e => setEditCat({...editCat, weight: parseFloat(e.target.value) || 0})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: `1px solid ${theme.border}`, fontSize: '13px', background: theme.bg, color: theme.text, boxSizing: 'border-box' }} />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', color: theme.textMuted }}>Gender</label>
                        <CustomDropdown value={editCat.gender || 'Male'} options={[{ value: 'Male', label: 'Male' }, { value: 'Female', label: 'Female' }]} onChange={v => setEditCat({...editCat, gender: v})} theme={theme} />
                      </div>
                      <div>
                        <label style={{ fontSize: '10px', color: theme.textMuted }}>Color</label>
                        <input value={editCat.color || ''} onChange={e => setEditCat({...editCat, color: e.target.value})} style={{ width: '100%', padding: '8px', borderRadius: '6px', border: `1px solid ${theme.border}`, fontSize: '13px', background: theme.bg, color: theme.text, boxSizing: 'border-box' }} />
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: '8px', marginBottom: '12px' }}>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: theme.text, cursor: 'pointer' }}>
                        <input type="checkbox" checked={editCat.vaccinated || false} onChange={e => setEditCat({...editCat, vaccinated: e.target.checked})} /> Vaccinated
                      </label>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', color: theme.text, cursor: 'pointer' }}>
                        <input type="checkbox" checked={editCat.neutered || false} onChange={e => setEditCat({...editCat, neutered: e.target.checked})} /> Neutered
                      </label>
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => { setEditingCat(null); setEditCat(null) }} style={{ flex: 1, padding: '8px', borderRadius: '8px', border: `1px solid ${theme.border}`, background: 'transparent', color: theme.text, fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Cancel</button>
                      <button onClick={handleSaveCat} style={{ flex: 1, padding: '8px', borderRadius: '8px', border: 'none', background: '#4f46e5', color: 'white', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}>Save</button>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <CatAvatar size={50} cat={cat} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '14px', fontWeight: '600', color: theme.text, margin: 0 }}>{cat.name}</p>
                      <p style={{ fontSize: '12px', color: theme.textMuted, margin: '2px 0 0' }}>{cat.breed} • {cat.gender} • {age?.display || 'Age unknown'}</p>
                      <p style={{ fontSize: '11px', color: theme.textMuted, margin: '2px 0 0' }}>{cat.weight ? `${cat.weight} kg` : ''} {cat.color ? `• ${cat.color}` : ''}</p>
                      <div style={{ display: 'flex', gap: '4px', marginTop: '4px' }}>
                        {cat.vaccinated && <span style={{ fontSize: '9px', padding: '2px 6px', borderRadius: '100px', background: '#dcfce7', color: '#166534' }}>Vaccinated</span>}
                        {cat.neutered && <span style={{ fontSize: '9px', padding: '2px 6px', borderRadius: '100px', background: '#dbeafe', color: '#1e40af' }}>Neutered</span>}
                      </div>
                    </div>
                    <button onClick={() => startEditCat(cat)} style={{ padding: '6px', background: 'none', border: 'none', color: theme.textMuted, cursor: 'pointer' }}><EditIcon /></button>
                    <button onClick={() => handleDeleteCat(cat.id)} style={{ padding: '6px', background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}><TrashIcon /></button>
                  </div>
                )}
              </div>
            )
          })}
        </div>


        {/* Settings */}
        <div style={{ background: theme.card, borderRadius: '14px', padding: '20px', marginBottom: '20px', border: `1px solid ${theme.border}` }}>
          <h3 style={{ fontSize: '16px', fontWeight: '700', color: theme.text, margin: '0 0 16px' }}>Settings</h3>
          
          <div onClick={() => setDarkMode(!darkMode)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: `1px solid ${theme.border}`, cursor: 'pointer' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <MoonIcon style={{ color: theme.textMuted }} />
              <span style={{ fontSize: '14px', color: theme.text }}>Dark Mode</span>
            </div>
            <div style={{ width: '44px', height: '24px', borderRadius: '12px', background: darkMode ? '#4f46e5' : theme.border, position: 'relative', transition: 'background 0.2s' }}>
              <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'white', position: 'absolute', top: '2px', left: darkMode ? '22px' : '2px', transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }} />
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <BellIcon style={{ color: theme.textMuted }} />
              <span style={{ fontSize: '14px', color: theme.text }}>Notifications</span>
            </div>
            <span style={{ fontSize: '12px', color: theme.textMuted }}>{notifications.filter(n => !n.read).length} unread</span>
          </div>
        </div>

        {/* Sign Out */}
        <button onClick={handleLogout} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: `1px solid #ef4444`, background: 'transparent', color: '#ef4444', fontSize: '14px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <LogOutIcon /> Sign Out
        </button>
      </div>


    </div>
  )
}