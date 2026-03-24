import React, { useState } from 'react';
import { Save, ChevronLeft, Settings } from 'lucide-react';

const adminStyles = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  .ap { font-family: 'Inter', sans-serif; color: #1e293b; background: #f8fafc; min-height: 100vh; }
  .ap * { box-sizing: border-box; }
  .ap-topbar {
    position: sticky; top: 0; z-index: 100;
    background: #fff; border-bottom: 1px solid #e2e8f0;
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 2rem; height: 64px; gap: 1rem;
  }
  .ap-logo { display: flex; align-items: center; gap: .6rem; font-size: 1.1rem; font-weight: 700; color: #1e293b; }
  .ap-logo svg { color: #1d4ed8; }
  .ap-actions { display: flex; gap: .75rem; }
  .ap-btn { display: inline-flex; align-items: center; gap: .5rem; padding: .6rem 1.25rem; border-radius: 6px; font-size: .9rem; font-weight: 600; cursor: pointer; border: none; font-family: inherit; transition: .2s; }
  .ap-btn--cancel { background: #f1f5f9; color: #475569; }
  .ap-btn--cancel:hover { background: #e2e8f0; }
  .ap-btn--save { background: #1d4ed8; color: #fff; }
  .ap-btn--save:hover { background: #1e40af; }
  .ap-body { max-width: 940px; margin: 0 auto; padding: 3rem 1.5rem; }
  .ap-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 2rem; margin-bottom: 2rem; }
  .ap-card h2 { font-size: 1.15rem; font-weight: 700; margin-bottom: 1.5rem; padding-bottom: .75rem; border-bottom: 1px solid #f1f5f9; color: #0f172a; display: flex; align-items: center; gap: .5rem; }
  .ap-card h2 span { font-size: 1.25rem; }
  .ap-field { margin-bottom: 1.25rem; }
  .ap-label { display: block; font-size: .82rem; font-weight: 600; text-transform: uppercase; letter-spacing: .06em; color: #64748b; margin-bottom: .4rem; }
  .ap-input { width: 100%; padding: .7rem .9rem; border: 1px solid #e2e8f0; border-radius: 8px; font-size: .95rem; font-family: inherit; color: #1e293b; background: #f8fafc; outline: none; transition: border-color .2s; }
  .ap-input:focus { border-color: #1d4ed8; background: #fff; }
  textarea.ap-input { resize: vertical; }
  .ap-grid2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .ap-grid3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; }
  .ap-item { background: #f8fafc; border: 1px dashed #cbd5e1; border-radius: 8px; padding: 1rem; }
  .ap-item-header { font-size: .78rem; font-weight: 700; color: #94a3b8; text-transform: uppercase; margin-bottom: .75rem; }
  @media (max-width: 640px) { .ap-grid2, .ap-grid3 { grid-template-columns: 1fr; } .ap-topbar { padding: 0 1rem; } }
`;

export const AdminPanel = ({ siteData, onSave, onCancel }) => {
  const [data, setData] = useState(siteData);

  const handle = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  const handleArr = (arr, idx, field, value) => {
    const next = [...data[arr]];
    next[idx] = { ...next[idx], [field]: value };
    setData(prev => ({ ...prev, [arr]: next }));
  };

  const field = (label, name, textarea = false, placeholder = '') => (
    <div className="ap-field">
      <label className="ap-label">{label}</label>
      {textarea
        ? <textarea className="ap-input" name={name} value={data[name] || ''} onChange={handle} rows={3} placeholder={placeholder} />
        : <input className="ap-input" type="text" name={name} value={data[name] || ''} onChange={handle} placeholder={placeholder} />}
    </div>
  );

  return (
    <div className="ap">
      <style>{adminStyles}</style>

      {/* Top bar */}
      <div className="ap-topbar">
        <div className="ap-logo"><Settings size={20} /> Admin Panel</div>
        <div className="ap-actions">
          <button className="ap-btn ap-btn--cancel" onClick={onCancel}>
            <ChevronLeft size={16}/> Ortga
          </button>
          <button className="ap-btn ap-btn--save" onClick={() => onSave(data)}>
            <Save size={16}/> Saqlash
          </button>
        </div>
      </div>

      <div className="ap-body">

        {/* ── Contact Info ── */}
        <div className="ap-card">
          <h2><span>📞</span> Bog'lanish Ma'lumotlari</h2>
          <div className="ap-grid3">
            <div className="ap-field">
              <label className="ap-label">Telefon Raqami</label>
              <input className="ap-input" type="text" name="phone" value={data.phone || ''} onChange={handle} placeholder="+998 90 000 00 00" />
            </div>
            <div className="ap-field">
              <label className="ap-label">Email Manzil</label>
              <input className="ap-input" type="text" name="email" value={data.email || ''} onChange={handle} placeholder="info@example.uz" />
            </div>
            <div className="ap-field">
              <label className="ap-label">Joylashuv / Manzil</label>
              <input className="ap-input" type="text" name="address" value={data.address || ''} onChange={handle} placeholder="Toshkent, O'zbekiston" />
            </div>
          </div>
        </div>

        {/* ── Hero ── */}
        <div className="ap-card">
          <h2><span>🏠</span> Asosiy Qism (Hero)</h2>
          {field("Bosh Sarlavha (HTML: <br/> ishlaydi)", 'heroTitle')}
          {field("Qisqa Ta'rif", 'heroDesc', true)}
        </div>

        {/* ── About ── */}
        <div className="ap-card">
          <h2><span>🏢</span> Kompaniya Haqida</h2>
          {field('Sarlavha', 'aboutTitle')}
          {field("Matn (HTML ishlaydi: <br/>, <strong>, <em>)", 'aboutText', true)}
        </div>

        {/* ── Services ── */}
        <div className="ap-card">
          <h2><span>⚙️</span> Xizmatlarimiz</h2>
          {field('Bo\'lim Sarlavhasi', 'servicesTitle')}
          <div className="ap-grid2">
            {(data.services || []).map((item, idx) => (
              <div key={idx} className="ap-item">
                <div className="ap-item-header">Xizmat {idx + 1}</div>
                <div className="ap-field">
                  <label className="ap-label">Sarlavha</label>
                  <input className="ap-input" value={item.title} onChange={e => handleArr('services', idx, 'title', e.target.value)} />
                </div>
                <div className="ap-field">
                  <label className="ap-label">Qisqa tavsif</label>
                  <textarea className="ap-input" rows={2} value={item.desc} onChange={e => handleArr('services', idx, 'desc', e.target.value)} />
                </div>
                <div className="ap-field" style={{ marginBottom: 0 }}>
                  <label className="ap-label">Batafsil ma'lumot (Modal uchun)</label>
                  <textarea className="ap-input" rows={4} value={item.fullDesc} onChange={e => handleArr('services', idx, 'fullDesc', e.target.value)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Certificates ── */}
        <div className="ap-card">
          <h2><span>🏅</span> Sertifikatlar Bo'limi</h2>
          {field("Bo'lim Sarlavhasi", 'certsTitle')}
          <div className="ap-grid2">
            {(data.certs || []).map((item, idx) => (
              <div key={idx} className="ap-item">
                <div className="ap-item-header">Sertifikat {idx + 1}</div>
                <div className="ap-field">
                  <label className="ap-label">Kod (masalan: ISO 9001)</label>
                  <input className="ap-input" value={item.code} onChange={e => handleArr('certs', idx, 'code', e.target.value)} placeholder="ISO 9001" />
                </div>
                <div className="ap-field" style={{ marginBottom: 0 }}>
                  <label className="ap-label">Nomi</label>
                  <input className="ap-input" value={item.title} onChange={e => handleArr('certs', idx, 'title', e.target.value)} placeholder="Sifat menejment" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Process ── */}
        <div className="ap-card">
          <h2><span>🔄</span> Jarayon Bosqichlari</h2>
          {field("Bo'lim Sarlavhasi", 'processTitle')}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {(data.process || []).map((item, idx) => (
              <div key={idx} className="ap-item" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                <div style={{ fontWeight: 800, fontSize: '1.4rem', color: '#1d4ed8', width: '28px', flexShrink: 0, marginTop: '8px' }}>{idx + 1}</div>
                <div style={{ flex: 1 }}>
                  <div className="ap-grid2">
                    <div className="ap-field">
                      <label className="ap-label">Ikonka (Emoji)</label>
                      <input className="ap-input" value={item.icon || ''} onChange={e => handleArr('process', idx, 'icon', e.target.value)} placeholder="🔍" />
                    </div>
                    <div className="ap-field">
                      <label className="ap-label">Bosqich Nomi</label>
                      <input className="ap-input" value={item.title} onChange={e => handleArr('process', idx, 'title', e.target.value)} />
                    </div>
                  </div>
                  <div className="ap-field" style={{ marginBottom: 0 }}>
                    <label className="ap-label">Ta'rif</label>
                    <textarea className="ap-input" rows={2} value={item.desc} onChange={e => handleArr('process', idx, 'desc', e.target.value)} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Advantages ── */}
        <div className="ap-card">
          <h2><span>✅</span> Afzalliklar</h2>
          {field("Bo'lim Sarlavhasi", 'advTitle')}
          <div className="ap-grid2">
            {(data.advantages || []).map((item, idx) => (
              <div key={idx} className="ap-item">
                <div className="ap-item-header">Afzallik {idx + 1}</div>
                <div className="ap-field">
                  <label className="ap-label">Sarlavha</label>
                  <input className="ap-input" value={item.title} onChange={e => handleArr('advantages', idx, 'title', e.target.value)} />
                </div>
                <div className="ap-field" style={{ marginBottom: 0 }}>
                  <label className="ap-label">Ta'rif</label>
                  <textarea className="ap-input" rows={2} value={item.desc} onChange={e => handleArr('advantages', idx, 'desc', e.target.value)} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Contact Section ── */}
        <div className="ap-card">
          <h2><span>📬</span> Bog'lanish Bo'limi (Sahifadagi matn)</h2>
          {field('Sarlavha', 'contactTitle')}
          {field('Tavsif matni', 'contactDesc', true)}
        </div>

        {/* Bottom Save */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', paddingBottom: '3rem' }}>
          <button className="ap-btn ap-btn--cancel" onClick={onCancel}><ChevronLeft size={16}/> Bekor qilish</button>
          <button className="ap-btn ap-btn--save" onClick={() => onSave(data)}><Save size={16}/> Saqlash va Chiqish</button>
        </div>

      </div>
    </div>
  );
};
