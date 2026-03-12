import { useState } from 'react'
import { useTheme } from '../App'

const CAT_IMG = 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=200&q=80'

const ArrowLeft = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
const Plus = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
const Check = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
const Pill = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M10.5 20.5L3.5 13.5a4.95 4.95 0 117-7l7 7a4.95 4.95 0 11-7 7z"/></svg>
const Bowl = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 11h16M4 11c0 4.418 3.582 8 8 8s8-3.582 8-8"/></svg>
const Scissors = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"/></svg>
const ChevronLeft = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
const ChevronRight = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>

export default function Schedule({ onNavigate }) {
  const { darkMode, theme } = useTheme()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [tasks, setTasks] = useState([
    { id: 1, title: 'Morning Feeding', time: '8:00 AM', status: 'done', type: 'feeding' },
    { id: 2, title: 'Medication', time: '9:00 AM', status: 'done', type: 'medication' },
    { id: 3, title: 'Afternoon Feeding', time: '1:00 PM', status: 'current', type: 'feeding' },
    { id: 4, title: 'Grooming Session', time: '3:00 PM', status: 'upcoming', type: 'grooming' },
    { id: 5, title: 'Evening Medication', time: '6:00 PM', status: 'upcoming', type: 'medication' },
    { id: 6, title: 'Dinner', time: '7:00 PM', status: 'upcoming', type: 'feeding' },
  ])

  const upcoming = [
    { id: 1, title: 'Vaccination', date: 'Mar 20, 2026', priority: 'urgent' },
    { id: 2, title: 'Vet Checkup', date: 'Mar 25, 2026', priority: 'soon' },
    { id: 3, title: 'Grooming', date: 'Apr 2, 2026', priority: 'normal' },
  ]

  const toggleTask = (id) => setTasks(tasks.map(t => t.id === id ? { ...t, status: t.status === 'done' ? 'upcoming' : 'done' } : t))
  const getIcon = (type) => type === 'feeding' ? <Bowl /> : type === 'medication' ? <Pill /> : <Scissors />
  const getStatus = (s) => s === 'done' ? { bg: '#dcfce7', border: '#22c55e', color: '#166534' } : s === 'current' ? { bg: '#e0e7ff', border: '#4f46e5', color: '#4338ca' } : { bg: darkMode ? '#334155' : '#f1f5f9', border: theme.border, color: theme.textMuted }
  const getPriority = (p) => p === 'urgent' ? { bg: '#fef2f2', color: '#dc2626' } : p === 'soon' ? { bg: '#fef3c7', color: '#d97706' } : { bg: '#f0fdf4', color: '#16a34a' }
  const doneCount = tasks.filter(t => t.status === 'done').length
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

  const isToday = (day) => {
    const today = new Date()
    return day === today.getDate() && currentMonth.getMonth() === today.getMonth() && currentMonth.getFullYear() === today.getFullYear()
  }

  return (
    <div style={{ minHeight: '100vh', background: theme.bg }}>
      <header style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '14px', borderBottom: '1px solid ' + theme.border, background: theme.card }}>
        <button onClick={() => onNavigate('home')} style={{ width: '38px', height: '38px', borderRadius: '10px', border: '1px solid ' + theme.border, background: theme.card, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.textMuted }}><ArrowLeft /></button>
        <img src={CAT_IMG} alt="Cat" style={{ width: '42px', height: '42px', borderRadius: '10px', objectFit: 'cover' }} />
        <div><h1 style={{ fontSize: '20px', fontWeight: '700', color: theme.text, margin: 0 }}>Care Schedule</h1><p style={{ fontSize: '12px', color: theme.textMuted, margin: '2px 0 0' }}>Whiskers daily routine</p></div>
      </header>
      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, padding: '20px' }}>
          <div style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', borderRadius: '14px', padding: '18px', marginBottom: '20px', color: 'white' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <span style={{ fontSize: '14px', fontWeight: '600' }}>Today's Progress</span>
              <span style={{ fontSize: '13px', opacity: 0.9 }}>{doneCount}/{tasks.length} completed</span>
            </div>
            <div style={{ height: '6px', background: 'rgba(255,255,255,0.3)', borderRadius: '3px' }}>
              <div style={{ height: '100%', width: (doneCount / tasks.length) * 100 + '%', background: 'white', borderRadius: '3px' }} />
            </div>
          </div>
          <h3 style={{ fontSize: '12px', fontWeight: '600', color: theme.textMuted, margin: '0 0 12px', textTransform: 'uppercase' }}>Today's Tasks</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {tasks.map(task => {
              const s = getStatus(task.status)
              return (
                <div key={task.id} onClick={() => toggleTask(task.id)} style={{ background: theme.card, borderRadius: '12px', padding: '14px', display: 'flex', alignItems: 'center', gap: '12px', border: '1px solid ' + s.border, cursor: 'pointer' }}>
                  <div style={{ width: '22px', height: '22px', borderRadius: '6px', background: task.status === 'done' ? '#22c55e' : s.bg, border: task.status === 'done' ? 'none' : '2px solid ' + s.border, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>{task.status === 'done' && <Check />}</div>
                  <div style={{ width: '36px', height: '36px', background: s.bg, borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: s.color }}>{getIcon(task.type)}</div>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: '14px', fontWeight: '600', color: task.status === 'done' ? theme.textMuted : theme.text, margin: 0, textDecoration: task.status === 'done' ? 'line-through' : 'none' }}>{task.title}</p>
                    <p style={{ fontSize: '11px', color: theme.textMuted, margin: '2px 0 0' }}>{task.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
          <button onClick={() => alert('Add task')} style={{ width: '100%', marginTop: '14px', background: theme.card, border: '2px dashed ' + theme.border, borderRadius: '12px', padding: '12px', fontSize: '13px', fontWeight: '600', color: theme.textMuted, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}><Plus /> Add Task</button>
        </div>
        <div style={{ width: '280px', padding: '20px 20px 20px 0' }} className="schedule-sidebar">
          <div style={{ background: theme.card, borderRadius: '14px', padding: '14px', marginBottom: '16px', border: '1px solid ' + theme.border }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '700', color: theme.text, margin: 0 }}>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h4>
              <div style={{ display: 'flex', gap: '4px' }}>
                <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} style={{ width: '26px', height: '26px', borderRadius: '6px', border: '1px solid ' + theme.border, background: theme.card, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.textMuted }}><ChevronLeft /></button>
                <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} style={{ width: '26px', height: '26px', borderRadius: '6px', border: '1px solid ' + theme.border, background: theme.card, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.textMuted }}><ChevronRight /></button>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', textAlign: 'center' }}>
              {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(d => <span key={d} style={{ fontSize: '10px', color: theme.textMuted, padding: '4px 0' }}>{d}</span>)}
              {getDaysInMonth(currentMonth).map((day, i) => <button key={i} disabled={!day} style={{ width: '28px', height: '28px', borderRadius: '6px', border: 'none', background: isToday(day) ? '#4f46e5' : 'transparent', color: isToday(day) ? 'white' : day ? theme.text : 'transparent', fontSize: '11px', fontWeight: isToday(day) ? '600' : '400', cursor: day ? 'pointer' : 'default', margin: '0 auto' }}>{day || ''}</button>)}
            </div>
          </div>
          <div style={{ background: theme.card, borderRadius: '14px', padding: '14px', border: '1px solid ' + theme.border }}>
            <h4 style={{ fontSize: '12px', fontWeight: '600', color: theme.textMuted, margin: '0 0 12px', textTransform: 'uppercase' }}>Upcoming</h4>
            {upcoming.map(item => {
              const ps = getPriority(item.priority)
              return <div key={item.id} style={{ background: darkMode ? '#334155' : '#f8fafc', borderRadius: '10px', padding: '12px', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}><div style={{ width: '8px', height: '8px', borderRadius: '50%', background: ps.color }} /><div style={{ flex: 1 }}><p style={{ fontSize: '13px', fontWeight: '600', color: theme.text, margin: 0 }}>{item.title}</p><p style={{ fontSize: '11px', color: theme.textMuted, margin: '2px 0 0' }}>{item.date}</p></div><span style={{ fontSize: '10px', fontWeight: '600', padding: '4px 8px', borderRadius: '100px', background: ps.bg, color: ps.color }}>{item.priority}</span></div>
            })}
          </div>
        </div>
      </div>
      <style>{`@media (max-width: 900px) { .schedule-sidebar { display: none !important; } }`}</style>
    </div>
  )
}