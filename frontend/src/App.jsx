import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import './i18n';
import './index.css';
import { IconSettings } from './components/Icons';
import { UploadStage, ProcessingStage, SummaryStage, CompareStage, PDCAStage } from './components/Stages';

function App() {
  const { t, i18n } = useTranslation();
  const [stage, setStage] = useState(1);
  const [files, setFiles] = useState({ pdf: null, pptx: null });
  const [analysisResult, setAnalysisResult] = useState(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `@keyframes spin { 100% { transform: rotate(360deg); } }`;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  const handleFileUpload = (type, file) => setFiles(prev => ({ ...prev, [type]: file }));
  
  const startAnalysis = async () => {
    if (!files.pdf || !files.pptx) return;
    setStage(2);
    
    const formData = new FormData();
    formData.append('pdf', files.pdf);
    formData.append('pptx', files.pptx);
    
    try {
      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        body: formData,
      });
      const resData = await response.json();
      if(resData.success) {
        setAnalysisResult(resData.data);
        setStage(3);
      } else {
        alert("Xatolik: " + (resData.detail || "Server xatosi"));
        setStage(1);
      }
    } catch(err) {
      alert("Serverga ulanib bo'lmadi! Backend ishlab turganiga ishonch hosil qiling.");
      setStage(1);
    }
  };

  const resetAnalysis = () => {
    setStage(1);
    setFiles({ pdf: null, pptx: null });
    setAnalysisResult(null);
  };

  const changeLanguage = (e) => {
    i18n.changeLanguage(e.target.value);
  };

  return (
    <div className="app-container">
      {/* Sidebar - Glassmorphism applied via css */}
      <aside className="sidebar">
        <div className="brand">
          <IconSettings /> SMK Builder
        </div>
        <nav>
          <button className={`nav-link ${stage === 1 ? 'active' : ''}`} onClick={() => stage > 1 && setStage(1)}><span>{t('app.navUpload')}</span></button>
          <button className={`nav-link ${stage === 2 ? 'active' : ''}`} disabled><span>{t('app.navProcess')}</span></button>
          <button className={`nav-link ${stage === 3 ? 'active' : ''}`} onClick={() => stage >= 3 && setStage(3)} disabled={stage < 3}><span>{t('app.navSummary')}</span></button>
          <button className={`nav-link ${stage === 4 ? 'active' : ''}`} onClick={() => stage >= 3 && setStage(4)} disabled={stage < 3}><span>{t('app.navCompare')}</span></button>
          <button className={`nav-link ${stage === 5 ? 'active' : ''}`} onClick={() => stage >= 3 && setStage(5)} disabled={stage < 3}><span>{t('app.navPDCA')}</span></button>
        </nav>

        {/* Premium Language Switcher */}
        <div className="language-switcher">
          <p className="mb-2 text-sm" style={{ color: 'var(--text-secondary)' }}>Language Preference</p>
          <select 
            onChange={changeLanguage} 
            value={i18n.language}
            className="glass-panel"
            style={{ 
              width: '100%', 
              padding: '0.75rem 1rem', 
              color: 'var(--text-primary)', 
              outline: 'none',
              cursor: 'pointer',
              appearance: 'none',
              backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'right 1rem center',
              backgroundSize: '1em'
            }}
          >
            <option value="uz" style={{ background: '#0f172a' }}>O'zbek</option>
            <option value="ru" style={{ background: '#0f172a' }}>Русский</option>
            <option value="en" style={{ background: '#0f172a' }}>English</option>
          </select>
        </div>
      </aside>

      {/* Main Area */}
      <main className="main-content">
        <header className="mb-8">
          <h1 className="text-gradient app-header-title">{t('app.title')}</h1>
          <p className="app-header-desc">{t('app.desc')}</p>
        </header>

        {stage === 1 && <UploadStage files={files} handleFileUpload={handleFileUpload} startAnalysis={startAnalysis} />}
        {stage === 2 && <ProcessingStage />}
        {stage === 3 && <SummaryStage setStage={setStage} data={analysisResult?.summary} />}
        {stage === 4 && <CompareStage setStage={setStage} data={analysisResult?.comparison} />}
        {stage === 5 && <PDCAStage resetAnalysis={resetAnalysis} data={analysisResult?.pdca} />}
      </main>
    </div>
  );
}

export default App;
