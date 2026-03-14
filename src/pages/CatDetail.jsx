import { useApp } from '../App'

const ArrowLeft = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
const MapPin = () => <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
const WhatsAppIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>

// Trait icons
const TrainedIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#22c55e" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><path d="M22 4L12 14.01l-3-3"/></svg>
const SpayedIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2"><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>
const PetIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2"><path d="M12 10c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/><path d="M5.5 7c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/><path d="M18.5 7c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/><path d="M5.5 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/><path d="M18.5 17c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z"/><path d="M12 22c2.5 0 4-1.5 4-4-1.5-1-2.5-2-4-2s-2.5 1-4 2c0 2.5 1.5 4 4 4z"/></svg>
const MaleIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2"><circle cx="10" cy="14" r="5"/><path d="M19 5l-5.4 5.4M19 5h-5M19 5v5"/></svg>
const FemaleIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ec4899" strokeWidth="2"><circle cx="12" cy="8" r="5"/><path d="M12 13v8M9 18h6"/></svg>
const VaccinatedIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="2"><path d="M18 2l4 4M17 7l3-3M19 9l-8.7 8.7c-.4.4-1 .4-1.4 0L5.3 14.1c-.4-.4-.4-1 0-1.4L14 4"/><path d="M5 19l-3 3M14 4l5 5M7 17l-2 2"/></svg>
const FriendlyIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
const IndoorIcon = () => <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><path d="M9 22V12h6v10"/></svg>

const WHATSAPP_NUMBER = '601111458752'

export default function CatDetail({ cat, onBack }) {
  const { theme, darkMode } = useApp()

  const sendWhatsAppInquiry = () => {
    const message = encodeURIComponent(`Hi! I'm interested in adopting ${cat.name} (${cat.breed}, ${cat.age}, ${cat.gender}).\n\nI saw this cat on PawTrack and would like to know more about the adoption process.\n\nThank you!`)
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank')
  }

  const traits = [
    cat.trained && { icon: <TrainedIcon />, label: 'Trained', color: '#22c55e' },
    cat.neutered && { icon: <SpayedIcon />, label: cat.gender === 'Female' ? 'Spayed' : 'Neutered', color: '#3b82f6' },
    { icon: <PetIcon />, label: 'Pet', color: '#f59e0b' },
    { icon: cat.gender === 'Male' ? <MaleIcon /> : <FemaleIcon />, label: cat.gender, color: cat.gender === 'Male' ? '#8b5cf6' : '#ec4899' },
    cat.vaccinated && { icon: <VaccinatedIcon />, label: 'Vaccinated', color: '#14b8a6' },
    cat.friendly && { icon: <FriendlyIcon />, label: 'Friendly', color: '#f97316' },
    cat.indoor && { icon: <IndoorIcon />, label: 'Indoor', color: '#6366f1' },
  ].filter(Boolean)


  return (
    <div style={{ minHeight: '100vh', background: theme.bg }}>
      {/* Back Button - Fixed on top */}
      <div style={{ position: 'fixed', top: '16px', left: '16px', zIndex: 10 }}>
        <button onClick={onBack} style={{ width: '40px', height: '40px', borderRadius: '12px', border: 'none', background: 'rgba(255,255,255,0.9)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1e293b', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}><ArrowLeft /></button>
      </div>

      {/* Main Content - Responsive Layout */}
      <div className="cat-detail-container" style={{ display: 'flex', flexDirection: 'column', maxWidth: '1200px', margin: '0 auto' }}>
        {/* Image Section */}
        <div className="cat-detail-image" style={{ position: 'relative' }}>
          <img src={cat.img} alt={cat.name} style={{ width: '100%', height: '320px', objectFit: 'cover' }} />
        </div>

        {/* Content Section */}
        <div className="cat-detail-content" style={{ padding: '20px', marginTop: '-30px', position: 'relative' }}>
          <div style={{ background: theme.card, borderRadius: '20px', padding: '20px', marginBottom: '16px', border: `1px solid ${theme.border}` }}>
            <h1 style={{ fontSize: '24px', fontWeight: '700', color: theme.text, margin: '0 0 4px' }}>{cat.breed}</h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <PetIcon />
              <span style={{ fontSize: '14px', color: theme.text, fontWeight: '500' }}>{cat.name}</span>
            </div>
            <p style={{ fontSize: '13px', color: theme.textMuted, margin: 0, display: 'flex', alignItems: 'center', gap: '6px' }}>
              <MapPin /> {cat.distance || '5'} km - {cat.location || cat.shelter || 'Petaling Jaya, Malaysia'}
            </p>
          </div>

          {/* About / Traits */}
          <div style={{ background: theme.card, borderRadius: '20px', padding: '20px', marginBottom: '16px', border: `1px solid ${theme.border}` }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: theme.text, margin: '0 0 16px' }}>About</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {traits.map((trait, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 16px', borderRadius: '100px', background: darkMode ? '#334155' : '#f8fafc', border: `1px solid ${theme.border}` }}>
                  {trait.icon}
                  <span style={{ fontSize: '13px', fontWeight: '500', color: theme.text }}>{trait.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div style={{ background: theme.card, borderRadius: '20px', padding: '20px', marginBottom: '16px', border: `1px solid ${theme.border}` }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: theme.text, margin: '0 0 16px' }}>Details</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}>
              <div style={{ padding: '12px', background: darkMode ? '#334155' : '#f8fafc', borderRadius: '12px' }}>
                <p style={{ fontSize: '11px', color: theme.textMuted, margin: '0 0 2px' }}>Age</p>
                <p style={{ fontSize: '14px', fontWeight: '600', color: theme.text, margin: 0 }}>{cat.age}</p>
              </div>
              <div style={{ padding: '12px', background: darkMode ? '#334155' : '#f8fafc', borderRadius: '12px' }}>
                <p style={{ fontSize: '11px', color: theme.textMuted, margin: '0 0 2px' }}>Weight</p>
                <p style={{ fontSize: '14px', fontWeight: '600', color: theme.text, margin: 0 }}>{cat.weight} kg</p>
              </div>
              <div style={{ padding: '12px', background: darkMode ? '#334155' : '#f8fafc', borderRadius: '12px' }}>
                <p style={{ fontSize: '11px', color: theme.textMuted, margin: '0 0 2px' }}>Color</p>
                <p style={{ fontSize: '14px', fontWeight: '600', color: theme.text, margin: 0 }}>{cat.color}</p>
              </div>
              <div style={{ padding: '12px', background: darkMode ? '#334155' : '#f8fafc', borderRadius: '12px' }}>
                <p style={{ fontSize: '11px', color: theme.textMuted, margin: '0 0 2px' }}>Gender</p>
                <p style={{ fontSize: '14px', fontWeight: '600', color: theme.text, margin: 0 }}>{cat.gender}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div style={{ background: theme.card, borderRadius: '20px', padding: '20px', marginBottom: '100px', border: `1px solid ${theme.border}` }}>
            <h3 style={{ fontSize: '16px', fontWeight: '700', color: theme.text, margin: '0 0 12px' }}>Description</h3>
            <p style={{ fontSize: '14px', color: theme.text, margin: 0, lineHeight: 1.6 }}>{cat.desc}</p>
            {cat.personality && (
              <>
                <h4 style={{ fontSize: '14px', fontWeight: '600', color: theme.text, margin: '16px 0 8px' }}>Personality</h4>
                <p style={{ fontSize: '14px', color: theme.textMuted, margin: 0, lineHeight: 1.6 }}>{cat.personality}</p>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="cat-detail-cta" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, padding: '16px 20px', background: theme.card, borderTop: `1px solid ${theme.border}`, paddingBottom: 'calc(16px + env(safe-area-inset-bottom))' }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <button onClick={sendWhatsAppInquiry} style={{ width: '100%', padding: '16px', borderRadius: '14px', border: 'none', background: '#25D366', color: 'white', fontSize: '15px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
            <WhatsAppIcon /> Send Your Inquiry
          </button>
        </div>
      </div>

      {/* Responsive Styles */}
      <style>{`
        @media (min-width: 768px) {
          .cat-detail-container {
            flex-direction: row !important;
            padding: 60px 40px 120px;
            gap: 40px;
          }
          .cat-detail-image {
            flex: 0 0 400px;
            position: sticky;
            top: 80px;
            height: fit-content;
          }
          .cat-detail-image img {
            height: 400px !important;
            border-radius: 20px;
          }
          .cat-detail-content {
            flex: 1;
            margin-top: 0 !important;
            padding: 0 !important;
          }
        }
        @media (min-width: 1024px) {
          .cat-detail-image {
            flex: 0 0 480px;
          }
          .cat-detail-image img {
            height: 500px !important;
          }
        }
      `}</style>
    </div>
  )
}