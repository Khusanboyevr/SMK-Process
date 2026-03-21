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
    <div className="app-container" style={{ display: 'flex', minHeight: '100vh', width: '100%' }}>
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand" style={{ marginBottom: '3rem' }}>
          <IconSettings /> SMK Builder
        </div>
        <nav>
          <button className={`nav-link ${stage === 1 ? 'active' : ''}`} onClick={() => stage > 1 && setStage(1)}><span>{t('app.navUpload')}</span></button>
          <button className={`nav-link ${stage === 2 ? 'active' : ''}`} disabled><span>{t('app.navProcess')}</span></button>
          <button className={`nav-link ${stage === 3 ? 'active' : ''}`} onClick={() => stage >= 3 && setStage(3)} disabled={stage < 3}><span>{t('app.navSummary')}</span></button>
          <button className={`nav-link ${stage === 4 ? 'active' : ''}`} onClick={() => stage >= 3 && setStage(4)} disabled={stage < 3}><span>{t('app.navCompare')}</span></button>
          <button className={`nav-link ${stage === 5 ? 'active' : ''}`} onClick={() => stage >= 3 && setStage(5)} disabled={stage < 3}><span>{t('app.navPDCA')}</span></button>
        </nav>

        {/* Language Switcher */}
        <div style={{ marginTop: 'auto', padding: '1rem 0' }}>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', marginBottom: '0.5rem' }}>Language</p>
          <select 
            onChange={changeLanguage} 
            value={i18n.language}
            style={{ width: '100%', padding: '0.5rem', borderRadius: '4px', background: 'rgba(255,255,255,0.1)', color: 'white', border: 'none' }}
          >
            <option value="uz" style={{ color: 'black' }}>O'zbek</option>
            <option value="ru" style={{ color: 'black' }}>Русский</option>
            <option value="en" style={{ color: 'black' }}>English</option>
          </select>
        </div>
      </aside>

      {/* Main Area */}
      <main className="main-content" style={{ flex: 1, padding: '3rem', maxWidth: '1200px', margin: '0 auto' }}>
        <header className="mb-4" style={{ marginBottom: '2.5rem' }}>
          <h1 className="text-gradient" style={{ fontSize: '2.5rem' }}>{t('app.title')}</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>{t('app.desc')}</p>
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
