import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconUpload, IconCheck, IconArrowRight, IconLoader } from './Icons';

export const UploadStage = ({ files, handleFileUpload, startAnalysis }) => {
  const { t } = useTranslation();
  return (
    <div className="animate-fade-in">
      <h2 className="mb-4">{t('upload.title')}</h2>
      
      <div className="upload-grid">
        <label className={`dropzone dropzone-pdf ${files.pdf ? 'active' : ''}`}>
          <div className="dropzone-icon">
            {files.pdf ? <IconCheck /> : <IconUpload />}
          </div>
          <h3>{files.pdf ? files.pdf.name : t('upload.pdfTitle')}</h3>
          <p>{t('upload.dropText')}</p>
          <input type="file" className="file-input" accept=".pdf" onChange={e => handleFileUpload('pdf', e.target.files[0])} />
        </label>
        
        <label className={`dropzone dropzone-pptx ${files.pptx ? 'active' : ''}`}>
          <div className="dropzone-icon">
            {files.pptx ? <IconCheck /> : <IconUpload />}
          </div>
          <h3>{files.pptx ? files.pptx.name : t('upload.pptxTitle')}</h3>
          <p>{t('upload.dropText')}</p>
          <input type="file" className="file-input" accept=".pptx" onChange={e => handleFileUpload('pptx', e.target.files[0])} />
        </label>
      </div>
      
      <div className="glass-panel upload-action-panel">
        <div>
          <h3 style={{ marginBottom: '0.25rem' }}>{t('upload.ready')}</h3>
          <p style={{ color: 'var(--text-secondary)' }}>{t('upload.readyDesc')}</p>
        </div>
        <button 
          className="btn-primary" 
          disabled={!files.pdf || !files.pptx} 
          onClick={startAnalysis} 
        >
          {t('upload.start')} <IconArrowRight />
        </button>
      </div>
    </div>
  );
};

export const ProcessingStage = () => {
  const { t } = useTranslation();
  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '6rem 2rem', textAlign: 'center' }}>
      <div className="animate-pulse-glow" style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
        <IconLoader />
      </div>
      <h2 className="text-gradient" style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>{t('process.title')}</h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto', fontSize: '1.1rem' }}>{t('process.desc')}</p>
    </div>
  );
};

export const SummaryStage = ({ setStage, data }) => {
  const { t } = useTranslation();
  return (
    <div className="animate-fade-in">
      <div className="stage-header">
        <h2>{t('summary.title')}</h2>
        <button className="btn-primary" onClick={() => setStage(4)}>{t('summary.next')} <IconArrowRight /></button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
        <div className="glass-panel" style={{ padding: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '2rem' }}>🏭</span>
            <h3 style={{ color: 'var(--accent-primary)', fontSize: '1.5rem', margin: 0 }}>{t('summary.industry')}</h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem' }}>
            {data?.industry || "Sanoat korxonalari SMK poydevori sifatni ta'minlash tsikliga asoslanadi..."}
          </p>
        </div>
        
        <div className="glass-panel" style={{ padding: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '2rem' }}>🎓</span>
            <h3 style={{ color: 'var(--success)', fontSize: '1.5rem', margin: 0 }}>{t('summary.university')}</h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '1.05rem' }}>
            {data?.university || "Ou maskani SMK xizmat sifatini oshirishga yo'naltiriladi..."}
          </p>
        </div>
      </div>
    </div>
  );
};

export const CompareStage = ({ setStage, data }) => {
  const { t } = useTranslation();
  return (
    <div className="animate-fade-in">
      <div className="stage-header">
        <h2>{t('compare.title')}</h2>
        <button className="btn-primary" onClick={() => setStage(5)}>{t('compare.next')} <IconArrowRight /></button>
      </div>
      
      <div className="glass-panel" style={{ padding: '1rem', overflowX: 'auto' }}>
        <table>
          <thead>
            <tr>
              <th style={{ minWidth: '200px' }}>{t('compare.crit')}</th>
              <th style={{ minWidth: '300px', color: 'var(--success)' }}>{t('compare.uniCol')}</th>
              <th style={{ minWidth: '300px', color: 'var(--accent-primary)' }}>{t('compare.indCol')}</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? data.map((item, idx) => (
              <tr key={idx}>
                <td style={{ fontWeight: '500', color: 'var(--text-primary)' }}>{item.criterion}</td>
                <td style={{ color: 'var(--text-secondary)' }}>{item.university}</td>
                <td style={{ color: 'var(--text-secondary)' }}>{item.industry}</td>
              </tr>
            )) : (
              <tr>
                <td style={{ fontWeight: '500', color: 'var(--text-primary)' }}>Mahsulot</td>
                <td style={{ color: 'var(--text-secondary)' }}>Bilimli kadr</td>
                <td style={{ color: 'var(--text-secondary)' }}>Moddiy xizmat</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export const PDCAStage = ({ resetAnalysis, data }) => {
  const { t } = useTranslation();
  
  const renderList = (items) => (
    <ul style={{ marginTop: '1.5rem', color: 'var(--text-secondary)', fontSize: '1rem', paddingLeft: '1.5rem', lineHeight: '1.8' }}>
      {items?.length ? items.map((p, i) => <li key={i} style={{ marginBottom:'0.75rem' }}>{p}</li>) : <li>Ma'lumot yo'q</li>}
    </ul>
  );

  return (
    <div className="animate-fade-in">
      <div className="stage-header">
        <h2>{t('pdca.title')}</h2>
        <button className="btn-primary" style={{ background: 'var(--bg-elevated)', border: '1px solid var(--border-color)', boxShadow: 'none' }}>
          {t('pdca.download')}
        </button>
      </div>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '3rem' }}>
        <div className="glass-panel" style={{ padding: '2rem', borderTop: '4px solid #3b82f6', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50px', background: 'linear-gradient(to bottom, rgba(59, 130, 246, 0.1), transparent)' }} />
          <h3 style={{ fontSize: '1.3rem', color: '#60a5fa' }}>{t('pdca.plan')}</h3>
          {renderList(data?.plan)}
        </div>
        
        <div className="glass-panel" style={{ padding: '2rem', borderTop: '4px solid #10b981', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50px', background: 'linear-gradient(to bottom, rgba(16, 185, 129, 0.1), transparent)' }} />
          <h3 style={{ fontSize: '1.3rem', color: '#34d399' }}>{t('pdca.do1')}</h3>
          {renderList(data?.do_core)}
        </div>
        
        <div className="glass-panel" style={{ padding: '2rem', borderTop: '4px solid #f59e0b', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50px', background: 'linear-gradient(to bottom, rgba(245, 158, 11, 0.1), transparent)' }} />
          <h3 style={{ fontSize: '1.3rem', color: '#fbbf24' }}>{t('pdca.do2')}</h3>
          {renderList(data?.do_support)}
        </div>
        
        <div className="glass-panel" style={{ padding: '2rem', borderTop: '4px solid #ef4444', position: 'relative', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: '50px', background: 'linear-gradient(to bottom, rgba(239, 68, 68, 0.1), transparent)' }} />
          <h3 style={{ fontSize: '1.3rem', color: '#f87171' }}>{t('pdca.checkAct')}</h3>
          {renderList(data?.check_act)}
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button className="btn-primary" onClick={resetAnalysis} style={{ padding: '1rem 3rem', fontSize: '1.1rem' }}>
          {t('pdca.restart')}
        </button>
      </div>
    </div>
  );
};
