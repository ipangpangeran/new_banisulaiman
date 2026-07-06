'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/components/LanguageContext';
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, AlertCircle, CheckCircle2 } from 'lucide-react';
import styles from './Contact.module.css';

export default function ContactPage() {
  const { t, language } = useLanguage();
  
  // Contact form state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  // Status indicators
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');
    setSuccess(false);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, phone, subject, message })
      });

      if (response.ok) {
        setSuccess(true);
        setName('');
        setEmail('');
        setPhone('');
        setSubject('');
        setMessage('');
      } else {
        const data = await response.json();
        setErrorMsg(data.message || t('contact_error'));
      }
    } catch (err) {
      setErrorMsg(t('contact_error'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      {/* Banner */}
      <section className={styles.banner}>
        <div className="container text-center">
          <h1>{language === 'id' ? 'Hubungi Kami' : 'Contact Us'}</h1>
          <p>
            {language === 'id' 
              ? 'Silakan hubungi kami untuk informasi pendaftaran, donasi, atau kerja sama.' 
              : 'Please contact us for admissions, donation, or partnership inquiries.'}
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="section">
        <div className="container">
          <div className={styles.contactGrid}>
            
            {/* Left: Contact Form */}
            <div className={styles.formCol}>
              <div className={styles.cardHeader}>
                <MessageSquare className={styles.cardHeaderIcon} size={20} />
                <h2>{t('contact_form_title')}</h2>
              </div>
              
              {success && (
                <div className="alert alert-success d-flex align-items-center gap-2">
                  <CheckCircle2 size={16} />
                  <span>{t('contact_success')}</span>
                </div>
              )}

              {errorMsg && (
                <div className="alert alert-danger d-flex align-items-center gap-2">
                  <AlertCircle size={16} />
                  <span>{errorMsg}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.formGridRow}>
                  <div className="form-group">
                    <label className="form-label">{t('contact_name')}</label>
                    <input
                      type="text"
                      className="form-control"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label className="form-label">No. WhatsApp</label>
                    <input
                      type="text"
                      placeholder="Contoh: 0812345678"
                      className="form-control"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">{t('email')}</label>
                  <input
                    type="email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t('contact_subject')}</label>
                  <input
                    type="text"
                    className="form-control"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">{t('contact_message')}</label>
                  <textarea
                    rows={4}
                    className="form-control"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100" style={{ justifyContent: 'center' }} disabled={loading}>
                  <Send size={16} />
                  <span>{loading ? t('contact_sending') : t('contact_send')}</span>
                </button>
              </form>
            </div>

            {/* Right: Coordinates & Map */}
            <div className={styles.infoCol}>
              <div className={styles.coordWidget}>
                <h3>{t('footer_contact_info')}</h3>
                <ul className={styles.coordList}>
                  <li>
                    <MapPin size={18} className={styles.coordIcon} />
                    <div>
                      <strong>{t('address')}</strong>
                      <span>Masjid Bani Sulaiman, Jl. Dago Pojok Tanggulan, Gg. 6, Cikalapa II RT 09 RW 03, Kel. Dago, Kec. Coblong, Kota Bandung, Jawa Barat 40135</span>
                    </div>
                  </li>
                  <li>
                    <Phone size={18} className={styles.coordIcon} />
                    <div>
                      <strong>{language === 'id' ? 'WhatsApp Hubungan' : 'WhatsApp Support'}</strong>
                      <span>+62 851-8321-2024 / +62 815-7201-4321</span>
                    </div>
                  </li>
                  <li>
                    <Mail size={18} className={styles.coordIcon} />
                    <div>
                      <strong>{t('email')}</strong>
                      <span>admin@banisulaiman.or.id</span>
                    </div>
                  </li>
                  <li>
                    <Clock size={18} className={styles.coordIcon} />
                    <div>
                      <strong>{t('office_hours')}</strong>
                      <span>{t('office_hours_val')}</span>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Direct WhatsApp Callout */}
              <div className={styles.waCard}>
                <h4>Konfirmasi Pendaftaran / Donasi via WA</h4>
                <p>Klik tombol di bawah untuk langsung terhubung dengan WhatsApp Admin Ma'had.</p>
                <div className={styles.waButtons}>
                  <a href="https://wa.me/6285183212024?text=Bismillah,%20Assalamualaikum" target="_blank" rel="noreferrer" className={styles.waBtn}>
                    💬 Admin 1 (+62 851-8321-2024)
                  </a>
                  <a href="https://wa.me/6281572014321?text=Bismillah,%20Assalamualaikum" target="_blank" rel="noreferrer" className={styles.waBtn}>
                    💬 Admin 2 (+62 815-7201-4321)
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="section section-bg-alt">
        <div className="container">
          <h2 className="section-title">{t('section_map_title')}</h2>
          <div className={styles.mapFrameWrapper}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d472.0371105305936!2d107.61544543400078!3d-6.867006947296926!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e68e6e0b29aeb69%3A0x33acbf46ca35a161!2sMasjid%20Bani%20Sulaiman!5e0!3m2!1sid!2sid!4v1736053625572!5m2!1sid!2sid"
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
