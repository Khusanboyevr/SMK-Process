import React, { useState, useEffect } from 'react';
import {
  CheckCircle2, Phone, Mail, MapPin, ChevronRight, ShieldCheck,
  Award, BarChart2, Globe, Users, FileText, ClipboardList,
  TrendingUp, ArrowRight, Menu, X
} from 'lucide-react';
import './Landing.css';

export const Landing = ({ data, onStartAdmin }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [selectedService, setSelectedService] = useState(null);

  useEffect(() => {
    if (selectedService) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [selectedService]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!data) return null;

  const trustPoints = [
    "Mijozlar va hamkorlar ishonchini oshiring",
    "Ichki jarayonlarni optimallashtirib, xarajatlarni kamaytiring",
    "Xalqaro bozorlarga chiqib, yangi tenderlarga qo'shiling",
    "Raqobatchilardan ajralib turing — sertifikatsiya bilan",
  ];

  return (
    <div className="lp">
      {/* ═══════════ NAV ═══════════ */}
      <header className={`lp-nav ${scrolled ? 'lp-nav--scrolled' : ''}`}>
        <div className="lp-container lp-nav__inner">
          <a href="#" className="lp-nav__logo">
            <ShieldCheck size={26} strokeWidth={2.5} />
            <span>SMK<strong>Builder</strong></span>
          </a>

          <nav className={`lp-nav__links ${menuOpen ? 'open' : ''}`}>
            <a href="#about" onClick={() => setMenuOpen(false)}>Kompaniya</a>
            <a href="#services" onClick={() => setMenuOpen(false)}>Xizmatlar</a>
            <a href="#process" onClick={() => setMenuOpen(false)}>Jarayon</a>
            <a href="#advantages" onClick={() => setMenuOpen(false)}>Afzalliklar</a>
            <a href="#contact" onClick={() => setMenuOpen(false)}>Bog'lanish</a>
          </nav>

          <div className="lp-nav__right">
            <a href={`tel:${(data.phone||'').replace(/\s/g,'')}`} className="lp-nav__phone">
              <Phone size={16} /> {data.phone}
            </a>
            <button className="lp-btn lp-btn--sm" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
              Murojaat
            </button>
            <a href="#/admin" className="lp-btn lp-btn--outline lp-btn--sm" style={{ padding: '0.4rem 0.8rem', textDecoration: 'none', marginLeft: '0.5rem' }}>Admin</a>
            <button className="lp-hamburger" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </header>

      {/* ═══════════ HERO ═══════════ */}
      <section className="lp-hero">
        <div className="lp-hero__bg"></div>
        <div className="lp-container lp-hero__content">
          <div className="lp-hero__text">
            <div className="lp-badge"><Award size={14} /> ISO Sertifikatsiyasi</div>
            <h1 dangerouslySetInnerHTML={{ __html: data.heroTitle }}></h1>
            <p dangerouslySetInnerHTML={{ __html: data.heroDesc }}></p>
            <div className="lp-hero__actions">
              <button className="lp-btn lp-btn--primary lp-btn--lg" onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}>
                Bepul Konsultatsiya <ArrowRight size={18} />
              </button>
              <a href="#services" className="lp-btn lp-btn--outline lp-btn--lg">
                Xizmatlarimiz
              </a>
            </div>
          </div>

          <div className="lp-hero__trust">
            <div className="lp-trust-card">
              <h3>Nima uchun SMK tizimi kerak?</h3>
              <ul>
                {trustPoints.map((pt, i) => (
                  <li key={i}><CheckCircle2 size={18} className="lp-check" /><span>{pt}</span></li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="lp-stats-bar">
          <div className="lp-container lp-stats-bar__inner">
            {[
              { val: '200+', label: 'Mijozlar', icon: <Users size={20} /> },
              { val: '5', label: 'Yil tajriba', icon: <TrendingUp size={20} /> },
              { val: '98%', label: 'Muvaffaqiyat', icon: <Award size={20} /> },
              { val: '10+', label: 'ISO standarti', icon: <ShieldCheck size={20} /> },
            ].map((s, i) => (
              <div key={i} className="lp-stat">
                <div className="lp-stat__icon">{s.icon}</div>
                <strong>{s.val}</strong>
                <span>{s.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ ABOUT ═══════════ */}
      <section id="about" className="lp-section lp-section--white">
        <div className="lp-container lp-about">
          <div className="lp-about__text">
            <div className="lp-section__label">Kompaniya haqida</div>
            <h2>{data.aboutTitle}</h2>
            <p dangerouslySetInnerHTML={{ __html: data.aboutText }}></p>
          </div>
          <div className="lp-about__org">
            <div className="lp-org-card">
              <div className="lp-org-card__icon"><ClipboardList size={30} /></div>
              <h3>Tashkilot Tuzilmasi</h3>
              <ul>
                <li><ChevronRight size={16}/> Sifat uchun mas'ul tayinlanadi</li>
                <li><ChevronRight size={16}/> Ishchi guruh tuziladi, xarita yaratiladi</li>
                <li><ChevronRight size={16}/> Barcha xodimlar jalb qilinadi</li>
                <li><ChevronRight size={16}/> Hujjatlashtirilgan tizim boshqariladi</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ SERVICES ═══════════ */}
      <section id="services" className="lp-section lp-section--gray">
        <div className="lp-container">
          <div className="lp-section__label center">Nima qilamiz</div>
          <h2 className="lp-section__title center">{data.servicesTitle}</h2>
          <div className="lp-services">
            {data.services.map((svc, i) => (
              <div key={i} className="lp-service-card">
                <div className="lp-service-card__icon">{svc.icon}</div>
                <h3>{svc.title}</h3>
                <p>{svc.desc}</p>
                <button className="lp-service-card__more" onClick={() => setSelectedService(svc)}>
                  Batafsil <ChevronRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ ISO CERTS ═══════════ */}
      <section className="lp-section lp-section--blue">
        <div className="lp-container">
          <div className="lp-section__label center" style={{ color: 'rgba(255,255,255,0.7)' }}>Sertifikatlar</div>
          <h2 className="lp-section__title center" style={{ color: '#fff' }}>{data.certsTitle}</h2>
          <div className="lp-certs">
            {(data.certs || []).map((c, i) => (
              <div key={i} className="lp-cert-card">
                <div className="lp-cert-card__icon" style={{ fontSize: '1.75rem' }}>{c.icon}</div>
                <strong>{c.code}</strong>
                <span>{c.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ PROCESS ═══════════ */}
      <section id="process" className="lp-section lp-section--white">
        <div className="lp-container">
          <div className="lp-section__label center">Qanday ishlaymiz</div>
          <h2 className="lp-section__title center">{data.processTitle}</h2>
          <div className="lp-process">
            {data.process.map((step, idx) => (
              <div key={idx} className="lp-process__step">
                <div className="lp-process__icon-box">
                  <div className="lp-process__icon">{step.icon}</div>
                  <div className="lp-process__num-badge">{idx + 1}</div>
                </div>
                <div className="lp-process__body">
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
                {idx < data.process.length - 1 && <div className="lp-process__arrow"><ChevronRight size={24}/></div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ ADVANTAGES ═══════════ */}
      <section id="advantages" className="lp-section lp-section--gray">
        <div className="lp-container">
          <div className="lp-section__label center">Nima uchun biz</div>
          <h2 className="lp-section__title center">{data.advTitle}</h2>
          <div className="lp-adv-grid">
            {data.advantages.map((adv, i) => (
              <div key={i} className="lp-adv-card">
                <div className="lp-adv-card__top">
                  <span className="lp-adv-card__icon">{adv.icon}</span>
                  <h4>{adv.title}</h4>
                </div>
                <p>{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CONTACT ═══════════ */}
      <section id="contact" className="lp-section lp-section--white">
        <div className="lp-container">
          <div className="lp-section__label center">Bog'lanish</div>
          <h2 className="lp-section__title center">{data.contactTitle}</h2>
          <p className="lp-section__desc center" dangerouslySetInnerHTML={{ __html: data.contactDesc }}></p>

          <div className="lp-contact">
            <div className="lp-contact__info">
              <div className="lp-contact__item"><Phone size={20}/><div><strong>Telefon</strong><a href={`tel:${data.phone}`} style={{ color: 'inherit', fontWeight: 600 }}>{data.phone}</a></div></div>
              <div className="lp-contact__item"><Mail size={20}/><div><strong>Email</strong><a href={`mailto:${data.email}`} style={{ color: 'inherit', fontWeight: 600 }}>{data.email}</a></div></div>
              <div className="lp-contact__item"><MapPin size={20}/><div><strong>Manzil</strong><span>{data.address}</span></div></div>
            </div>
            <form className="lp-contact__form" onSubmit={e => { e.preventDefault(); alert("So'rovingiz yuborildi! Tez orada bog'lanamiz."); }}>
              <input type="text" placeholder="Ismingiz" required />
              <input type="tel" placeholder="Telefon raqamingiz" required />
              <textarea rows="4" placeholder="Xabar yoki savol..."></textarea>
              <button type="submit" className="lp-btn lp-btn--primary">
                Murojaat Yuborish <ArrowRight size={16}/>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="lp-footer">
        <div className="lp-container lp-footer__inner">
          <div className="lp-footer__logo">
            <ShieldCheck size={20}/> SMK<strong>Builder</strong>
          </div>
          <p>© 2026 SMK Builder. Sifat Menejmenti Tizimi. Barcha huquqlar himoyalangan.</p>
          <div className="lp-footer__links">
            <a href="#about">Kompaniya</a>
            <a href="#services">Xizmatlar</a>
            <a href="#contact">Bog'lanish</a>
          </div>
        </div>
      </footer>

      {/* ═══════════ SERVICE MODAL ═══════════ */}
      <div className={`lp-modal-overlay ${selectedService ? 'open' : ''}`} onClick={() => setSelectedService(null)}>
        {selectedService && (
          <div className="lp-modal" onClick={e => e.stopPropagation()}>
            <button className="lp-modal__close" onClick={() => setSelectedService(null)}>
              <X size={20} />
            </button>
            <div className="lp-modal__icon">{selectedService.icon}</div>
            <h2>{selectedService.title}</h2>
            <div className="lp-modal__desc">
              {selectedService.fullDesc || selectedService.desc}
            </div>
            <div className="lp-modal__footer">
              <button 
                className="lp-btn lp-btn--primary" 
                onClick={() => {
                  setSelectedService(null);
                  document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Savol Yo'llash <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
