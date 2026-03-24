import React, { useState, useEffect } from 'react';
import './index.css';
import { Landing } from './components/Landing';
import { AdminPanel } from './components/AdminPanel';
import { defaultSiteData } from './data/defaultData';

function App() {
  const [siteData, setSiteData] = useState(defaultSiteData);

  // Check hash for /admin route
  const isAdmin = () => window.location.hash === '#/admin';
  const [view, setView] = useState(isAdmin() ? 'admin' : 'landing');

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

  if (view === 'admin') {
    return (
      <AdminPanel
        siteData={siteData}
        onSave={handleSaveAdmin}
        onCancel={() => { window.location.hash = ''; setView('landing'); }}
      />
    );
  }

  return <Landing data={siteData} />;
}

export default App;
