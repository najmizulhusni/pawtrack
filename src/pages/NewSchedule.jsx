import { useState, useEffect } from 'react'
import { useApp } from '../App'
import { supabase } from '../lib/supabase'

const Plus = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
const Check = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 6L9 17l-5-5"/></svg>
const Trash = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6M8 6V4a2 2 0 012-2h4a2 2 0 012 2v2"/></svg>
const XIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
const ChevronLeft = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6"/></svg>
const ChevronRight = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6"/></svg>
const ChevronDown = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 9l6 6 6-6"/></svg>
const RepeatIcon = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg>
const CatIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3.1-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0112 5z"/></svg>

// Cat Avatar Component
const CatAvatar = ({ size = 24, cat, style = {} }) => {
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

const TASK_TYPES = [
  { value: 'feeding', label: 'Feeding', color: '#22c55e' },
  { value: 'medication', label: 'Medication', color: '#ef4444' },
  { value: 'vaccination', label: 'Vaccination', color: '#3b82f6' },
  { value: 'checkup', label: 'Vet Checkup', color: '#8b5cf6' },
  { value: 'grooming', label: 'Grooming', color: '#ec4899' },
  { value: 'deworming', label: 'Deworming', color: '#f59e0b' },
  { value: 'flea', label: 'Flea Treatment', color: '#14b8a6' },
  { value: 'task', label: 'Other Task', color: '#64748b' },
]

const RECURRENCE = [
  { value: 'none', label: 'No repeat' },
  { value: 'daily', label: 'Daily' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'yearly', label: 'Yearly' },
]

// Custom Dropdown Component
function CustomDropdown({ value, options, onChange, placeholder, theme, darkMode, renderOption }) {
  const [isOpen, setIsOpen] = useState(false)
  const selected = options.find(o => o.value === value || o.id === value)
  
  return (
    <div style={{ position: 'relative' }}>
      <button type="button" onClick={() => setIsOpen(!isOpen)} style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: `1px solid ${theme.border}`, background: theme.bg, color: theme.text, fontSize: '14px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between', textAlign: 'left' }}>
        <span>{selected ? (renderOption ? renderOption(selected) : selected.label || selected.name) : placeholder}</span>
        <ChevronDown />
      </button>
      {isOpen && (
        <>
          <div style={{ position: 'fixed', inset: 0, zIndex: 100 }} onClick={() => setIsOpen(false)} />
          <div style={{ position: 'absolute', top: '100%', left: 0, right: 0, marginTop: '4px', background: theme.card, border: `1px solid ${theme.border}`, borderRadius: '10px', boxShadow: '0 10px 40px rgba(0,0,0,0.15)', zIndex: 101, maxHeight: '200px', overflowY: 'auto' }}>
            {options.map((option, i) => (
              <button key={option.value || option.id || i} type="button" onClick={() => { onChange(option.value || option.id); setIsOpen(false) }} style={{ width: '100%', padding: '10px 14px', border: 'none', background: (option.value || option.id) === value ? (darkMode ? '#334155' : '#f0f9ff') : 'transparent', color: theme.text, fontSize: '13px', cursor: 'pointer', textAlign: 'left', display: 'flex', alignItems: 'center', gap: '10px' }}>
                {renderOption ? renderOption(option) : (option.label || option.name)}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default function NewSchedule() {
  const { theme, darkMode, activeCat, cats, user } = useApp()
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [showAddTask, setShowAddTask] = useState(false)
  const [selectedCat, setSelectedCat] = useState('all')
  const [newTask, setNewTask] = useState({ title: '', time: '', type: 'task', recurrence: 'none', catId: null })
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)

  // Load tasks from Supabase
  useEffect(() => {
    loadTasks()
  }, [activeCat?.id])

  const loadTasks = async () => {
    if (!supabase || !user?.id) {
      setLoading(false)
      return
    }
    
    try {
      const { data, error } = await supabase
        .from('schedules')
        .select('*')
        .eq('user_id', user.id)
        .order('task_date', { ascending: true })
      
      if (error) {
        console.error('Load tasks error:', error)
      } else {
        setTasks(data || [])
      }
    } catch (err) {
      console.error('Load tasks exception:', err)
    } finally {
      setLoading(false)
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

  const formatDate = (day) => {
    const y = currentMonth.getFullYear(), m = String(currentMonth.getMonth() + 1).padStart(2, '0'), d = String(day).padStart(2, '0')
    return `${y}-${m}-${d}`
  }

  const isToday = (day) => { const t = new Date(); return day === t.getDate() && currentMonth.getMonth() === t.getMonth() && currentMonth.getFullYear() === t.getFullYear() }
  
  const getTasksForDate = (dateStr) => {
    const date = new Date(dateStr)
    return tasks.filter(t => {
      if (selectedCat !== 'all' && t.cat_id !== parseInt(selectedCat)) return false
      const taskDate = new Date(t.task_date)
      if (t.task_date === dateStr) return true
      if (t.recurrence === 'daily' && date >= taskDate) return true
      if (t.recurrence === 'weekly' && date >= taskDate && date.getDay() === taskDate.getDay()) return true
      if (t.recurrence === 'monthly' && date >= taskDate && date.getDate() === taskDate.getDate()) return true
      if (t.recurrence === 'yearly' && date >= taskDate && date.getMonth() === taskDate.getMonth() && date.getDate() === taskDate.getDate()) return true
      return false
    })
  }

  const hasTask = (day) => day && getTasksForDate(formatDate(day)).length > 0
  
  const toggleTask = async (id) => {
    const task = tasks.find(t => t.id === id)
    if (!task) return
    
    const newStatus = task.status === 'done' ? 'upcoming' : 'done'
    setTasks(tasks.map(t => t.id === id ? { ...t, status: newStatus } : t))
    
    // Update in Supabase
    if (supabase) {
      try {
        const { error } = await supabase
          .from('schedules')
          .update({ status: newStatus })
          .eq('id', id)
        
        if (error) {
          console.error('Update task error:', error)
          loadTasks() // Reload to sync
        }
      } catch (err) {
        console.error('Update task exception:', err)
      }
    }
  }
  
  const deleteTask = async (id) => {
    setTasks(tasks.filter(t => t.id !== id))
    
    // Delete from Supabase
    if (supabase) {
      try {
        const { error } = await supabase
          .from('schedules')
          .delete()
          .eq('id', id)
        
        if (error) {
          console.error('Delete task error:', error)
          loadTasks() // Reload to sync
        }
      } catch (err) {
        console.error('Delete task exception:', err)
      }
    }
  }

  const handleAddTask = async () => {
    if (newTask.title && selectedDate) {
      // Format time to 12h format if provided
      let formattedTime = ''
      if (newTask.time) {
        const [hours, minutes] = newTask.time.split(':')
        const h = parseInt(hours)
        const ampm = h >= 12 ? 'PM' : 'AM'
        const hour12 = h % 12 || 12
        formattedTime = `${hour12}:${minutes} ${ampm}`
      }
      
      const task = {
        id: crypto.randomUUID(),
        cat_id: newTask.catId || activeCat?.id,
        user_id: user.id,
        title: newTask.title,
        task_date: selectedDate,
        task_time: formattedTime || null,
        task_type: newTask.type,
        recurrence: newTask.recurrence,
        status: 'upcoming',
        notes: null
      }
      
      // Add to local state
      setTasks([...tasks, task])
      setNewTask({ title: '', time: '', type: 'task', recurrence: 'none', catId: null })
      setShowAddTask(false)
      
      // Save to Supabase
      if (supabase) {
        try {
          const { error } = await supabase
            .from('schedules')
            .insert([task])
          
          if (error) {
            console.error('Save task error:', error)
            alert('Error saving task: ' + error.message)
            loadTasks() // Reload to sync
          }
        } catch (err) {
          console.error('Save task exception:', err)
        }
      }
    }
  }

  const handleDayClick = (day) => {
    if (day) {
      setSelectedDate(formatDate(day))
      setShowAddTask(false)
    }
  }

  const getTypeColor = (type) => TASK_TYPES.find(t => t.value === type)?.color || '#64748b'
  const todayStr = new Date().toISOString().split('T')[0]
  const todayTasks = getTasksForDate(todayStr)
  const doneCount = todayTasks.filter(t => t.status === 'done').length
  const upcomingTasks = tasks.filter(t => t.status === 'upcoming' && new Date(t.task_date) >= new Date()).slice(0, 5)

  // Cat filter options
  const catFilterOptions = [{ value: 'all', label: 'All Cats' }, ...cats.map(c => ({ value: c.id.toString(), label: c.name, img: c.img }))]

  return (
    <div style={{ minHeight: '100vh', background: theme.bg }}>
      <header style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '14px', borderBottom: `1px solid ${theme.border}`, background: theme.card }}>
        <CatAvatar size={42} cat={activeCat} style={{ borderRadius: '10px' }} />
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '20px', fontWeight: '700', color: theme.text, margin: 0 }}>Care Schedule</h1>
          <p style={{ fontSize: '12px', color: theme.textMuted, margin: '2px 0 0' }}>Manage your pet's routine</p>
        </div>
      </header>

      <div style={{ display: 'flex' }}>
        <div style={{ flex: 1, padding: '20px' }}>
          {/* Cat Filter - Always visible */}
          <div style={{ background: theme.card, borderRadius: '14px', padding: '16px', marginBottom: '16px', border: `1px solid ${theme.border}` }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '600', color: theme.text, margin: '0 0 4px' }}>Filter Schedule</h4>
                <p style={{ fontSize: '12px', color: theme.textMuted, margin: 0 }}>View tasks for specific cat</p>
              </div>
              <div style={{ minWidth: '200px' }}>
                <CustomDropdown
                  value={selectedCat}
                  options={catFilterOptions}
                  onChange={(val) => setSelectedCat(val)}
                  placeholder="Select cat"
                  theme={theme}
                  darkMode={darkMode}
                  renderOption={(opt) => (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      {opt.value === 'all' ? <CatIcon /> : <CatAvatar size={24} cat={opt} />}
                      <span>{opt.label}</span>
                    </div>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Calendar */}
          <div style={{ background: theme.card, borderRadius: '14px', padding: '16px', marginBottom: '20px', border: `1px solid ${theme.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h4 style={{ fontSize: '16px', fontWeight: '700', color: theme.text, margin: 0 }}>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h4>
              <div style={{ display: 'flex', gap: '6px' }}>
                <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))} style={{ width: '32px', height: '32px', borderRadius: '8px', border: `1px solid ${theme.border}`, background: theme.card, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.textMuted }}><ChevronLeft /></button>
                <button onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))} style={{ width: '32px', height: '32px', borderRadius: '8px', border: `1px solid ${theme.border}`, background: theme.card, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: theme.textMuted }}><ChevronRight /></button>
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '4px', textAlign: 'center' }}>
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(d => <span key={d} style={{ fontSize: '11px', color: theme.textMuted, padding: '8px 0', fontWeight: '600' }}>{d}</span>)}
              {getDaysInMonth(currentMonth).map((day, i) => (
                <button key={i} onClick={() => handleDayClick(day)} disabled={!day} style={{ height: '40px', borderRadius: '8px', border: selectedDate === formatDate(day) ? '2px solid #4f46e5' : 'none', background: isToday(day) ? '#4f46e5' : 'transparent', color: isToday(day) ? 'white' : day ? theme.text : 'transparent', fontSize: '13px', fontWeight: isToday(day) || selectedDate === formatDate(day) ? '600' : '400', cursor: day ? 'pointer' : 'default', position: 'relative' }}>
                  {day || ''}
                  {hasTask(day) && <span style={{ position: 'absolute', bottom: '4px', left: '50%', transform: 'translateX(-50%)', width: '4px', height: '4px', background: isToday(day) ? 'white' : '#4f46e5', borderRadius: '50%' }} />}
                </button>
              ))}
            </div>
          </div>

          {/* Selected Date Tasks - Auto shows today */}
          <div style={{ background: theme.card, borderRadius: '14px', padding: '16px', border: `1px solid ${theme.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <h4 style={{ fontSize: '14px', fontWeight: '600', color: theme.text, margin: 0 }}>
                {selectedDate === todayStr ? "Today's Tasks" : `Tasks for ${new Date(selectedDate).toLocaleDateString('en-MY', { weekday: 'short', day: 'numeric', month: 'short' })}`}
              </h4>
              <button onClick={() => setShowAddTask(true)} style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '8px 12px', borderRadius: '8px', border: 'none', background: '#4f46e5', color: 'white', fontSize: '12px', fontWeight: '600', cursor: 'pointer' }}><Plus /> Add Task</button>
            </div>
            {getTasksForDate(selectedDate).length === 0 ? (
              <p style={{ color: theme.textMuted, fontSize: '13px', textAlign: 'center', padding: '20px 0' }}>No tasks for this day. Click "Add Task" to create one.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {getTasksForDate(selectedDate).map(task => (
                  <div key={task.id} style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', background: darkMode ? '#334155' : '#f8fafc', borderRadius: '10px' }}>
                    <button onClick={() => toggleTask(task.id)} style={{ width: '22px', height: '22px', borderRadius: '6px', border: task.status === 'done' ? 'none' : `2px solid ${theme.border}`, background: task.status === 'done' ? '#22c55e' : 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', flexShrink: 0 }}>{task.status === 'done' && <Check />}</button>
                    <div style={{ width: '4px', height: '32px', background: getTypeColor(task.task_type), borderRadius: '2px', flexShrink: 0 }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '14px', fontWeight: '600', color: task.status === 'done' ? theme.textMuted : theme.text, margin: 0, textDecoration: task.status === 'done' ? 'line-through' : 'none' }}>{task.title}</p>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '2px' }}>
                        <span style={{ fontSize: '11px', color: theme.textMuted }}>{task.task_time || 'All day'}</span>
                        {task.recurrence !== 'none' && <span style={{ fontSize: '10px', color: '#4f46e5', display: 'flex', alignItems: 'center', gap: '2px' }}><RepeatIcon /> {task.recurrence}</span>}
                      </div>
                    </div>
                    <button onClick={() => deleteTask(task.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '4px' }}><Trash /></button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ width: '280px', padding: '20px 20px 20px 0' }} className="schedule-sidebar">
          <div style={{ background: 'linear-gradient(135deg, #4f46e5, #7c3aed)', borderRadius: '14px', padding: '16px', marginBottom: '16px', color: 'white' }}>
            <p style={{ fontSize: '13px', fontWeight: '600', margin: '0 0 8px' }}>Today's Progress</p>
            <p style={{ fontSize: '24px', fontWeight: '700', margin: '0 0 8px' }}>{doneCount}/{todayTasks.length}</p>
            <div style={{ height: '4px', background: 'rgba(255,255,255,0.3)', borderRadius: '2px' }}>
              <div style={{ height: '100%', width: todayTasks.length ? `${(doneCount / todayTasks.length) * 100}%` : '0%', background: 'white', borderRadius: '2px' }} />
            </div>
          </div>

          <div style={{ background: theme.card, borderRadius: '14px', padding: '14px', marginBottom: '16px', border: `1px solid ${theme.border}` }}>
            <h4 style={{ fontSize: '12px', fontWeight: '600', color: theme.textMuted, margin: '0 0 10px', textTransform: 'uppercase' }}>Task Types</h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px' }}>
              {TASK_TYPES.map(t => (
                <div key={t.value} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: t.color }} />
                  <span style={{ fontSize: '11px', color: theme.text }}>{t.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ background: theme.card, borderRadius: '14px', padding: '14px', border: `1px solid ${theme.border}` }}>
            <h4 style={{ fontSize: '12px', fontWeight: '600', color: theme.textMuted, margin: '0 0 12px', textTransform: 'uppercase' }}>Upcoming</h4>
            {upcomingTasks.length === 0 ? (
              <p style={{ fontSize: '12px', color: theme.textMuted }}>No upcoming tasks</p>
            ) : (
              upcomingTasks.map(task => (
                <div key={task.id} style={{ padding: '10px', background: darkMode ? '#334155' : '#f8fafc', borderRadius: '8px', marginBottom: '8px', borderLeft: `3px solid ${getTypeColor(task.task_type)}` }}>
                  <p style={{ fontSize: '13px', fontWeight: '600', color: theme.text, margin: 0 }}>{task.title}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '2px' }}>
                    <span style={{ fontSize: '11px', color: theme.textMuted }}>{task.task_date} • {task.task_time || 'All day'}</span>
                    {task.recurrence !== 'none' && <span style={{ fontSize: '9px', color: '#4f46e5', display: 'flex', alignItems: 'center', gap: '2px' }}><RepeatIcon /></span>}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 300, padding: '20px' }}>
          <div style={{ background: theme.card, borderRadius: '16px', padding: '24px', width: '100%', maxWidth: '400px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '18px', fontWeight: '700', color: theme.text, margin: 0 }}>Add Task</h3>
              <button onClick={() => setShowAddTask(false)} style={{ background: 'none', border: 'none', color: theme.textMuted, cursor: 'pointer' }}><XIcon /></button>
            </div>
            
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', color: theme.textMuted, display: 'block', marginBottom: '4px' }}>Task Title *</label>
              <input placeholder="e.g., Vaccination, Feeding" value={newTask.title} onChange={e => setNewTask({...newTask, title: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: `1px solid ${theme.border}`, fontSize: '14px', background: theme.bg, color: theme.text, boxSizing: 'border-box' }} />
            </div>
            
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', color: theme.textMuted, display: 'block', marginBottom: '4px' }}>Time</label>
              <input type="time" value={newTask.time} onChange={e => setNewTask({...newTask, time: e.target.value})} style={{ width: '100%', padding: '12px', borderRadius: '10px', border: `1px solid ${theme.border}`, fontSize: '14px', background: theme.bg, color: theme.text, boxSizing: 'border-box' }} />
            </div>
            
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', color: theme.textMuted, display: 'block', marginBottom: '4px' }}>Task Type</label>
              <CustomDropdown
                value={newTask.type}
                options={TASK_TYPES}
                onChange={(val) => setNewTask({...newTask, type: val})}
                placeholder="Select type"
                theme={theme}
                darkMode={darkMode}
                renderOption={(opt) => (
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '3px', background: opt.color }} />
                    <span>{opt.label}</span>
                  </div>
                )}
              />
            </div>
            
            <div style={{ marginBottom: '12px' }}>
              <label style={{ fontSize: '12px', color: theme.textMuted, display: 'block', marginBottom: '4px' }}>Repeat</label>
              <CustomDropdown
                value={newTask.recurrence}
                options={RECURRENCE}
                onChange={(val) => setNewTask({...newTask, recurrence: val})}
                placeholder="Select recurrence"
                theme={theme}
                darkMode={darkMode}
              />
              <p style={{ fontSize: '11px', color: theme.textMuted, margin: '4px 0 0' }}>
                {newTask.recurrence === 'daily' && 'Task will repeat every day'}
                {newTask.recurrence === 'weekly' && 'Task will repeat every week on the same day'}
                {newTask.recurrence === 'monthly' && 'Task will repeat every month on the same date'}
                {newTask.recurrence === 'yearly' && 'Task will repeat every year (e.g., annual vaccination)'}
              </p>
            </div>
            
            {cats.length > 1 && (
              <div style={{ marginBottom: '20px' }}>
                <label style={{ fontSize: '12px', color: theme.textMuted, display: 'block', marginBottom: '4px' }}>For Cat</label>
                <CustomDropdown
                  value={newTask.catId?.toString() || ''}
                  options={[{ value: '', label: `Current cat (${activeCat?.name})` }, ...cats.map(c => ({ value: c.id.toString(), label: c.name, img: c.img }))]}
                  onChange={(val) => setNewTask({...newTask, catId: val ? parseInt(val) : null})}
                  placeholder="Select cat"
                  theme={theme}
                  darkMode={darkMode}
                  renderOption={(opt) => (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <CatAvatar size={20} cat={opt} />
                      <span>{opt.label}</span>
                    </div>
                  )}
                />
              </div>
            )}
            
            <button onClick={handleAddTask} disabled={!newTask.title} style={{ width: '100%', padding: '14px', borderRadius: '10px', border: 'none', background: newTask.title ? 'linear-gradient(135deg, #4f46e5, #7c3aed)' : '#94a3b8', color: 'white', fontSize: '14px', fontWeight: '600', cursor: newTask.title ? 'pointer' : 'not-allowed' }}>Add Task</button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 900px) { .schedule-sidebar { display: none !important; } }
      `}</style>
    </div>
  )
}
