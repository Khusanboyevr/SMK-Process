import React from 'react';
import { useTranslation } from 'react-i18next';
import { IconUpload, IconCheck, IconArrowRight, IconLoader } from './Icons';

export const UploadStage = ({ files, handleFileUpload, startAnalysis }) => {
  const { t } = useTranslation();
  return (
    <div className="animate-fade-in">
      <h2 className="mb-4">{t('upload.title')}</h2>
      <div className="upload-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginBottom: '2rem' }}>
        <label className={`dropzone ${files.pdf ? 'active' : ''}`} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--border-color)', borderRadius: '1rem', padding: '3rem 2rem', background: files.pdf ? 'rgba(99, 102, 241, 0.1)' : 'rgba(30, 41, 59, 0.3)' }}>
          {files.pdf ? <IconCheck /> : <IconUpload />}
          <h3 className="mt-4">{files.pdf ? files.pdf.name : t('upload.pdfTitle')}</h3>
          <p style={{ color: 'var(--text-secondary)' }}>{t('upload.dropText')}</p>
          <input type="file" style={{ display: 'none' }} accept=".pdf" onChange={e => handleFileUpload('pdf', e.target.files[0])} />
        </label>
        <label className={`dropzone ${files.pptx ? 'active' : ''}`} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--border-color)', borderRadius: '1rem', padding: '3rem 2rem', background: files.pptx ? 'rgba(16, 185, 129, 0.1)' : 'rgba(30, 41, 59, 0.3)' }}>
          {files.pptx ? <IconCheck /> : <IconUpload />}
          <h3 className="mt-4">{files.pptx ? files.pptx.name : t('upload.pptxTitle')}</h3>
          <p style={{ color: 'var(--text-secondary)' }}>{t('upload.dropText')}</p>
          <input type="file" style={{ display: 'none' }} accept=".pptx" onChange={e => handleFileUpload('pptx', e.target.files[0])} />
        </label>
      </div>
      <div className="glass-panel" style={{ padding: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg-elevated)', borderRadius: '1rem' }}>
        <div>
          <h3>{t('upload.ready')}</h3>
          <p style={{ color: 'var(--text-secondary)' }}>{t('upload.readyDesc')}</p>
        </div>
        <button className="btn-primary" disabled={!files.pdf || !files.pptx} onClick={startAnalysis} style={{ fontSize: '1.1rem', padding: '0.8rem 2rem' }}>
          {t('upload.start')} <IconArrowRight />
        </button>
      </div>
    </div>
  );
};

export const ProcessingStage = () => {
  const { t } = useTranslation();
  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '5rem 2rem', textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <IconLoader />
      </div>
      <h2 className="text-gradient">{t('process.title')}</h2>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '500px', margin: '1rem auto' }}>{t('process.desc')}</p>
    </div>
  );
};

// ... To keep it simple, others are below, could be further split but they fit easily
export const SummaryStage = ({ setStage, data }) => {
  const { t } = useTranslation();
  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>{t('summary.title')}</h2>
        <button className="btn-primary" onClick={() => setStage(4)}>{t('summary.next')} <IconArrowRight /></button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
            <span style={{ color: 'var(--accent-primary)' }}>🏭 {t('summary.industry')}</span>
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
            {data?.industry || "Sanoat korxonalari SMK poydevori sifatni ta'minlash tsikliga asoslanadi..."}
          </p>
        </div>
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <h3 style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1rem', marginBottom: '1rem' }}>
            <span style={{ color: 'var(--success)' }}>🎓 {t('summary.university')}</span>
          </h3>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>{t('compare.title')}</h2>
        <button className="btn-primary" onClick={() => setStage(5)}>{t('compare.next')} <IconArrowRight /></button>
      </div>
      <div className="glass-panel" style={{ padding: '1rem', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(255,255,255,0.05)' }}>
              <th style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)' }}>{t('compare.crit')}</th>
              <th style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', color: 'var(--success)' }}>{t('compare.uniCol')}</th>
              <th style={{ padding: '1.5rem', borderBottom: '1px solid var(--border-color)', color: 'var(--accent-primary)' }}>{t('compare.indCol')}</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? data.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                <td style={{ padding: '1.25rem 1.5rem', fontWeight: '500' }}>{item.criterion}</td>
                <td style={{ padding: '1.25rem 1.5rem' }}>{item.university}</td>
                <td style={{ padding: '1.25rem 1.5rem' }}>{item.industry}</td>
              </tr>
            )) : (
              <tr><td style={{ padding: '1.25rem 1.5rem' }}>Mahsulot</td><td style={{ padding: '1.25rem 1.5rem' }}>Bilimli kadr</td><td style={{ padding: '1.25rem 1.5rem' }}>Moddiy xizmat</td></tr>
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
    <ul style={{marginTop: '1rem', color: 'var(--text-secondary)', fontSize: '0.9rem', paddingLeft: '1.2rem', lineHeight: '1.6'}}>
      {items?.length ? items.map((p, i) => <li key={i} style={{marginBottom:'0.5rem'}}>{p}</li>) : <li>Ma'lumot yo'q</li>}
    </ul>
  );

  return (
    <div className="animate-fade-in">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>{t('pdca.title')}</h2>
        <button className="btn-primary">{t('pdca.download')}</button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
        <div className="glass-panel" style={{ padding: '1.5rem', borderTop: '4px solid #3b82f6' }}>
          <h3>{t('pdca.plan')}</h3>
          {renderList(data?.plan)}
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem', borderTop: '4px solid #10b981' }}>
          <h3>{t('pdca.do1')}</h3>
          {renderList(data?.do_core)}
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem', borderTop: '4px solid #f59e0b' }}>
          <h3>{t('pdca.do2')}</h3>
          {renderList(data?.do_support)}
        </div>
        <div className="glass-panel" style={{ padding: '1.5rem', borderTop: '4px solid #ef4444' }}>
          <h3>{t('pdca.checkAct')}</h3>
          {renderList(data?.check_act)}
        </div>
      </div>
      <button className="btn-primary mt-4" onClick={resetAnalysis}>{t('pdca.restart')}</button>
    </div>
  );
};
