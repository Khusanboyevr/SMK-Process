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
      
      <div className="summary-grid">
        <div className="glass-panel summary-panel panel-industry">
          <div className="panel-gradient-bg" />
          <div className="summary-header">
            <span>🏭</span>
            <h3 className="industry-text">{t('summary.industry')}</h3>
          </div>
          <p className="summary-text">
            {data?.industry || "Sanoat korxonalari SMK poydevori sifatni ta'minlash tsikliga asoslanadi..."}
          </p>
        </div>
        
        <div className="glass-panel summary-panel panel-university">
          <div className="panel-gradient-bg" />
          <div className="summary-header">
            <span>🎓</span>
            <h3 className="university-text">{t('summary.university')}</h3>
          </div>
          <p className="summary-text">
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
        <button className="btn-primary outline-btn" onClick={() => setStage(5)}>{t('compare.next')} <IconArrowRight /></button>
      </div>
      
      <div className="glass-panel compare-container">
        <table className="compare-table">
          <thead>
            <tr>
              <th className="col-crit">{t('compare.crit')}</th>
              <th className="col-uni">{t('compare.uniCol')}</th>
              <th className="col-ind">{t('compare.indCol')}</th>
            </tr>
          </thead>
          <tbody>
            {data && data.length > 0 ? data.map((item, idx) => (
              <tr key={idx}>
                <td data-label={t('compare.crit')} className="td-crit">{item.criterion}</td>
                <td data-label={t('compare.uniCol')} className="td-uni">{item.university}</td>
                <td data-label={t('compare.indCol')} className="td-ind">{item.industry}</td>
              </tr>
            )) : (
              <tr>
                <td data-label={t('compare.crit')} className="td-crit">Mahsulot</td>
                <td data-label={t('compare.uniCol')} className="td-uni">Bilimli kadr</td>
                <td data-label={t('compare.indCol')} className="td-ind">Moddiy xizmat</td>
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
        <button className="btn-primary outline-btn">
          {t('pdca.download')}
        </button>
      </div>
      
      <div className="pdca-grid">
        <div className="glass-panel pdca-panel panel-plan">
          <div className="panel-gradient-bg" />
          <h3>{t('pdca.plan')}</h3>
          {renderList(data?.plan)}
        </div>
        
        <div className="glass-panel pdca-panel panel-do1">
          <div className="panel-gradient-bg" />
          <h3>{t('pdca.do1')}</h3>
          {renderList(data?.do_core)}
        </div>
        
        <div className="glass-panel pdca-panel panel-do2">
          <div className="panel-gradient-bg" />
          <h3>{t('pdca.do2')}</h3>
          {renderList(data?.do_support)}
        </div>
        
        <div className="glass-panel pdca-panel panel-check-act">
          <div className="panel-gradient-bg" />
          <h3>{t('pdca.checkAct')}</h3>
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
