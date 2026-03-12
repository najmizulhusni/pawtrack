import { useState } from 'react'

const CAT_HERO = 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=800&q=80'
const CAT_AVATAR = 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=200&q=80'

const Cat = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3.1-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0112 5z"/>
  </svg>
)

const Arrow = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M5 12h14M12 5l7 7-7 7"/>
  </svg>
)

const Check = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 6L9 17l-5-5"/>
  </svg>
)

const Pill = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M10.5 20.5L3.5 13.5a4.95 4.95 0 117-7l7 7a4.95 4.95 0 11-7 7z"/><path d="M8.5 8.5l7 7"/>
  </svg>
)

const Scissors = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4L8.12 15.88M14.47 14.48L20 20M8.12 8.12L12 12"/>
  </svg>
)

const Bowl = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M4 11h16M4 11c0 4.418 3.582 8 8 8s8-3.582 8-8"/>
  </svg>
)

const Phone = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/>
  </svg>
)

const MapPin = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
  </svg>
)

export default function Hero({ onStart }) {
  const [activeNav, setActiveNav] = useState('home')
  
  const navItems = ['Home', 'Services', 'MediCare', 'Blog']
  
  const scrollTo = (id) => {
    setActiveNav(id.toLowerCase())
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: 'smooth' })
  }

  const pets = [
    { img: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=100&q=80' },
    { img: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?w=100&q=80' },
    { img: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=100&q=80' },
    { img: 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?w=100&q=80' },
  ]

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fafaf8', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      {/* Header */}
      <header style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16px 24px',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <div 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', color: '#0d3d47' }}
        >
          <Cat />
          <span style={{ fontSize: '20px', fontWeight: '700' }}>PawTrack</span>
        </div>
        
        <nav style={{ display: 'flex', gap: '28px', fontSize: '14px', fontWeight: '500' }}>
          {navItems.map(item => (
            <span 
              key={item}
              onClick={() => scrollTo(item)}
              style={{ 
                color: activeNav === item.toLowerCase() ? '#f26b3a' : '#64748b', 
                cursor: 'pointer',
                transition: 'color 0.2s',
              }}
            >
              {item}
            </span>
          ))}
        </nav>
        
        <button 
          onClick={onStart}
          style={{
            background: '#f26b3a',
            color: 'white',
            border: 'none',
            padding: '10px 24px',
            borderRadius: '8px',
            fontWeight: '600',
            fontSize: '14px',
            cursor: 'pointer',
          }}
        >
          Sign up
        </button>
      </header>

      {/* Hero */}
      <section id="home" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: '480px' }}>
        <div style={{ padding: '48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f26b3a', fontSize: '13px', fontWeight: '600', marginBottom: '20px' }}>
            <Check />
            Available in select states
          </div>
          
          <h1 style={{ fontSize: '48px', fontWeight: '800', lineHeight: 1.1, color: '#0d3d47', letterSpacing: '-1px', margin: 0 }}>
            Your Pet's Health,<br />
            <span style={{ color: '#f26b3a' }}>All in One Place</span>
          </h1>
          
          <p style={{ color: '#64748b', fontSize: '15px', lineHeight: 1.7, marginTop: '20px', maxWidth: '400px' }}>
            The complete pet management app for cat lovers. Track health, schedule care, and discover adoption opportunities.
          </p>
          
          <button 
            onClick={onStart}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              marginTop: '32px',
              background: '#f26b3a',
              color: 'white',
              border: 'none',
              padding: '14px 28px',
              borderRadius: '8px',
              fontWeight: '600',
              fontSize: '15px',
              cursor: 'pointer',
              boxShadow: '0 8px 24px rgba(242,107,58,0.3)',
              width: 'fit-content',
            }}
          >
            Get Started <Arrow />
          </button>
        </div>

        <div style={{
          background: '#0d3d47',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <img 
            src={CAT_HERO}
            alt="Cat"
            style={{ width: '280px', height: '280px', borderRadius: '50%', objectFit: 'cover', border: '6px solid rgba(255,255,255,0.1)' }}
          />
          <div style={{ position: 'absolute', width: '120px', height: '120px', border: '3px solid #ffcc00', borderRadius: '50%', top: '20%', right: '20%', opacity: 0.5 }} />
          <div style={{ position: 'absolute', width: '80px', height: '80px', border: '3px solid #ffcc00', borderRadius: '50%', bottom: '30%', right: '35%', opacity: 0.3 }} />
        </div>
      </section>

      {/* Category Bar */}
      <section style={{ background: '#f26b3a', padding: '24px', display: 'flex', alignItems: 'center', gap: '24px' }}>
        <div style={{ width: '72px', height: '72px', background: '#ffcc00', borderRadius: '50%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: '22px', fontWeight: '800', color: '#0d3d47' }}>45+</span>
          <span style={{ fontSize: '8px', fontWeight: '600', color: '#0d3d47', textTransform: 'uppercase' }}>Categories</span>
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{ color: 'white', fontSize: '11px', marginBottom: '8px' }}>Cat <span style={{ color: '#ffcc00' }}>(WHISKERS)</span></p>
          <img src={CAT_AVATAR} alt="Cat" style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', border: '3px solid white' }} />
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          {pets.map((pet, i) => (
            <button key={i} onClick={() => alert('Pet selected')} style={{ width: '44px', height: '44px', borderRadius: '50%', overflow: 'hidden', border: '2px solid rgba(255,255,255,0.3)', padding: 0, cursor: 'pointer' }}>
              <img src={pet.img} alt="Pet" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </button>
          ))}
        </div>
      </section>

      {/* Services */}
      <section id="services" style={{ padding: '48px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <div style={{ width: '32px', height: '3px', background: '#ffcc00', borderRadius: '2px' }} />
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0d3d47', margin: 0 }}>Our Services</h2>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {[
            { Icon: Pill, title: 'Track Health & Schedule', desc: 'Monitor your pet\'s health records and appointments.', featured: true },
            { Icon: Scissors, title: 'Manage Medical Records', desc: 'Store all documents securely in one place.', featured: false },
            { Icon: Bowl, title: 'Adopt from Shelters', desc: 'Discover trusted shelters and find your new pet.', featured: false },
          ].map(({ Icon, title, desc, featured }) => (
            <div 
              key={title}
              onClick={() => onStart()}
              style={{
                background: featured ? '#ffcc00' : 'white',
                borderRadius: '20px',
                padding: '28px',
                boxShadow: featured ? '0 12px 32px rgba(255,204,0,0.25)' : 'none',
                border: featured ? 'none' : '1px solid #e2e8f0',
                cursor: 'pointer',
              }}
            >
              <div style={{ width: '48px', height: '48px', background: featured ? 'rgba(255,255,255,0.4)' : '#fff8e1', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '16px', color: featured ? '#0d3d47' : '#f26b3a' }}>
                <Icon />
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: '700', color: featured ? '#0d3d47' : '#1e293b', marginBottom: '8px' }}>{title}</h3>
              <p style={{ fontSize: '13px', color: featured ? 'rgba(13,61,71,0.75)' : '#64748b', lineHeight: 1.6, marginBottom: '20px' }}>{desc}</p>
              <button style={{
                background: featured ? '#0d3d47' : 'transparent',
                color: featured ? 'white' : '#1e293b',
                border: featured ? 'none' : '2px solid #e2e8f0',
                padding: '10px 22px',
                borderRadius: '8px',
                fontWeight: '600',
                fontSize: '13px',
                cursor: 'pointer',
              }}>
                Explore
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Medicare */}
      <section id="medicare" style={{ padding: '48px 24px', background: '#f1f5f9' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
            <div style={{ width: '32px', height: '3px', background: '#f26b3a', borderRadius: '2px' }} />
            <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0d3d47', margin: 0 }}>MediCare</h2>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {[
              { title: 'Track your pet\'s health & schedule', desc: 'Monitor vital signs and appointments.' },
              { title: 'Manage medical records securely', desc: 'Store all documents in one secure place.' },
              { title: 'Get reminders for vaccinations', desc: 'Never miss important health updates.' },
            ].map((item, i) => (
              <div key={i} onClick={onStart} style={{ background: 'white', borderRadius: '16px', padding: '24px', border: '1px solid #e2e8f0', cursor: 'pointer' }}>
                <h4 style={{ fontSize: '16px', fontWeight: '600', color: '#1e293b', marginBottom: '8px' }}>{item.title}</h4>
                <p style={{ fontSize: '13px', color: '#64748b', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" style={{ padding: '48px 24px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '32px' }}>
          <div style={{ width: '32px', height: '3px', background: '#1a5f6a', borderRadius: '2px' }} />
          <h2 style={{ fontSize: '24px', fontWeight: '700', color: '#0d3d47', margin: 0 }}>Latest from Blog</h2>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {[
            { img: 'https://images.unsplash.com/photo-1495360010541-f48722b34f7d?w=400&q=80', title: '10 Tips for Cat Nutrition', date: 'Mar 5, 2026' },
            { img: 'https://images.unsplash.com/photo-1518791841217-8f162f1e1131?w=400&q=80', title: 'Understanding Cat Behavior', date: 'Mar 3, 2026' },
            { img: 'https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400&q=80', title: 'Grooming Your Persian Cat', date: 'Feb 28, 2026' },
          ].map((post, i) => (
            <div key={i} onClick={() => alert(`Reading: ${post.title}`)} style={{ background: 'white', borderRadius: '16px', overflow: 'hidden', border: '1px solid #e2e8f0', cursor: 'pointer' }}>
              <img src={post.img} alt={post.title} style={{ width: '100%', height: '160px', objectFit: 'cover' }} />
              <div style={{ padding: '16px' }}>
                <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '6px' }}>{post.date}</p>
                <h4 style={{ fontSize: '15px', fontWeight: '600', color: '#1e293b', margin: 0 }}>{post.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section style={{ padding: '64px 24px', background: '#0d3d47', textAlign: 'center' }}>
        <h2 style={{ fontSize: '32px', fontWeight: '700', color: 'white', marginBottom: '12px' }}>Malaysia's first integrated pet health and adoption platform</h2>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '15px', marginBottom: '28px' }}>Trusted by pet owners across the country.</p>
        <button onClick={onStart} style={{ background: '#f26b3a', color: 'white', border: 'none', padding: '14px 36px', borderRadius: '8px', fontWeight: '600', fontSize: '15px', cursor: 'pointer', boxShadow: '0 8px 24px rgba(242,107,58,0.35)' }}>
          Get Started Now
        </button>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0a2e36', color: 'white', padding: '48px 24px 24px' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px', marginBottom: '32px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
              <Cat />
              <span style={{ fontSize: '18px', fontWeight: '700' }}>PawTrack</span>
            </div>
            <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', lineHeight: 1.6 }}>The complete pet management app for cat lovers. Track health, schedule care, and discover adoption opportunities.</p>
          </div>
          
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>Quick Links</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {navItems.map(item => (
                <span key={item} onClick={() => scrollTo(item)} style={{ fontSize: '13px', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}>{item}</span>
              ))}
            </div>
          </div>
          
          <div>
            <h4 style={{ fontSize: '14px', fontWeight: '600', marginBottom: '16px' }}>Contact</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: 'rgba(255,255,255,0.6)' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Phone /> +60-3-1234-5678</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin /> Kuala Lumpur, Malaysia</span>
            </div>
          </div>
        </div>
        
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '24px', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: 'rgba(255,255,255,0.4)' }}>© 2026 PawTrack. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
