import React, { useState, useEffect } from 'react';
import './index.css';
import { Landing } from './components/Landing';
import { AdminPanel } from './components/AdminPanel';
import { defaultSiteData } from './data/defaultData';

function Login({ onLogin, onCancel }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin') {
      onLogin();
    } else {
      setError('Login yoki parol xato!');
    }
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: '#f8fafc', padding: '1rem', fontFamily: "'Inter', sans-serif" }}>
      <div style={{ background: '#fff', padding: '2.5rem', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)', width: '100%', maxWidth: '400px' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '1.5rem', fontSize: '1.5rem', fontWeight: 'bold', color: '#1e293b' }}>Admin Panelga Kirish</h2>
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#475569' }}>Login</label>
            <input 
              type="text" 
              value={username} 
              onChange={e => setUsername(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', transition: 'border-color 0.2s' }}
              placeholder="admin"
              autoFocus
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.875rem', fontWeight: '500', color: '#475569' }}>Parol</label>
            <input 
              type="password" 
              value={password} 
              onChange={e => setPassword(e.target.value)}
              style={{ width: '100%', padding: '0.75rem', borderRadius: '6px', border: '1px solid #cbd5e1', outline: 'none', transition: 'border-color 0.2s' }}
              placeholder="admin"
            />
          </div>
          {error && <div style={{ color: '#ef4444', fontSize: '0.875rem', marginTop: '0.5rem' }}>{error}</div>}
          <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
            <button type="button" onClick={onCancel} style={{ flex: 1, padding: '0.75rem', borderRadius: '6px', border: 'none', background: '#f1f5f9', color: '#475569', fontWeight: '600', cursor: 'pointer' }}>
              Bekor qilish
            </button>
            <button type="submit" style={{ flex: 1, padding: '0.75rem', borderRadius: '6px', border: 'none', background: '#1d4ed8', color: '#fff', fontWeight: '600', cursor: 'pointer' }}>
              Kirish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function App() {
  const [siteData, setSiteData] = useState(defaultSiteData);

  // Check hash for /admin route
  const isAdmin = () => window.location.hash === '#/admin';
  const [view, setView] = useState(isAdmin() ? 'admin' : 'landing');
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('adminAuth') === 'true'
  );

  // Listen to hash changes
  useEffect(() => {
    const onHashChange = () => {
      setView(isAdmin() ? 'admin' : 'landing');
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  // Load from localStorage on mount
  useEffect(() => {
    const savedDataStr = localStorage.getItem('siteData');
    if (savedDataStr) {
      try {
        const savedData = JSON.parse(savedDataStr);
        // Merge saved data with defaultSiteData to ensure new fields (like icons) appear
        const mergedData = {
          ...defaultSiteData,
          ...savedData,
          // Deep merge arrays like services and process if they exist
          services: defaultSiteData.services.map((svc, i) => ({
            ...svc,
            ...(savedData.services?.[i] || {})
          })),
          process: defaultSiteData.process.map((step, i) => ({
            ...step,
            ...(savedData.process?.[i] || {})
          })),
          advantages: defaultSiteData.advantages.map((adv, i) => ({
            ...adv,
            ...(savedData.advantages?.[i] || {})
          })),
          certs: (defaultSiteData.certs || []).map((cert, i) => ({
            ...cert,
            ...(savedData.certs?.[i] || {})
          }))
        };
        setSiteData(mergedData);
      } catch (e) {
        console.error("Failed to parse siteData from localStorage", e);
      }
    }
  }, []);

  const handleSaveAdmin = (newData) => {
    setSiteData(newData);
    localStorage.setItem('siteData', JSON.stringify(newData));
    window.location.hash = '';
    setView('landing');
  };

  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('adminAuth', 'true');
  };

  const handleCancelAdmin = () => {
    window.location.hash = '';
    setView('landing');
  };

  if (view === 'admin') {
    if (!isAuthenticated) {
      return <Login onLogin={handleLogin} onCancel={handleCancelAdmin} />;
    }
    return (
      <AdminPanel
        siteData={siteData}
        onSave={handleSaveAdmin}
        onCancel={handleCancelAdmin}
      />
    );
  }

  return <Landing data={siteData} />;
}

export default App;
