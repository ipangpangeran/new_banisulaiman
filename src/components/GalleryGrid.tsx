'use client';

import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import { X, Play, Image as ImageIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import styles from './GalleryGrid.module.css';

interface GalleryItem {
  id: number;
  type: 'PHOTO' | 'VIDEO';
  mediaUrl: string; // e.g. path or YouTube embed url
  caption: string;
}

interface GalleryGridProps {
  initialItems: GalleryItem[];
}

const mockGalleryItems: GalleryItem[] = [
  { id: 1, type: 'PHOTO', mediaUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800', caption: 'KBM Santri di Masjid Bani Sulaiman' },
  { id: 2, type: 'PHOTO', mediaUrl: 'https://images.unsplash.com/photo-1564507592333-c60657eea523?w=800', caption: 'Suasana Tenang dan Indah di Pesantren' },
  { id: 3, type: 'PHOTO', mediaUrl: 'https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?w=800', caption: 'Setoran Hafalan Al-Qur\'an Santri' },
  { id: 4, type: 'VIDEO', mediaUrl: 'https://www.youtube.com/embed/Pj15b63x55Q', caption: 'Video Profil Singkat Pondok Pesantren Bani Sulaiman' },
  { id: 5, type: 'PHOTO', mediaUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800', caption: 'Dauroh Tahfidz dan Kajian Pemuda Dago' },
  { id: 6, type: 'VIDEO', mediaUrl: 'https://www.youtube.com/embed/Pj15b63x55Q', caption: 'Dokumentasi Kegiatan Wisuda Huffazh Ke-I' }
];

export const GalleryGrid: React.FC<GalleryGridProps> = ({ initialItems }) => {
  const { language } = useLanguage();
  const [filter, setFilter] = useState<'ALL' | 'PHOTO' | 'VIDEO'>('ALL');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const items = initialItems.length > 0 ? initialItems : mockGalleryItems;

  const filteredItems = filter === 'ALL' 
    ? items 
    : items.filter((item) => item.type === filter);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const showPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev! - 1));
  };

  const showNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (lightboxIndex === null) return;
    setLightboxIndex((prev) => (prev === filteredItems.length - 1 ? 0 : prev! + 1));
  };

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <div>
      {/* Category Tabs */}
      <div className={styles.tabs}>
        <button 
          onClick={() => setFilter('ALL')} 
          className={`${styles.tabBtn} ${filter === 'ALL' ? styles.activeTab : ''}`}
        >
          {language === 'id' ? 'Semua Media' : 'All Media'}
        </button>
        <button 
          onClick={() => setFilter('PHOTO')} 
          className={`${styles.tabBtn} ${filter === 'PHOTO' ? styles.activeTab : ''}`}
        >
          {language === 'id' ? 'Foto' : 'Photos'}
        </button>
        <button 
          onClick={() => setFilter('VIDEO')} 
          className={`${styles.tabBtn} ${filter === 'VIDEO' ? styles.activeTab : ''}`}
        >
          {language === 'id' ? 'Video' : 'Videos'}
        </button>
      </div>

      {/* Masonry Layout Grid */}
      <div className={styles.masonryGrid}>
        {filteredItems.map((item, index) => (
          <div 
            key={item.id} 
            className={styles.gridItem} 
            onClick={() => openLightbox(index)}
          >
            <div className={styles.card}>
              {item.type === 'PHOTO' ? (
                <div className={styles.mediaContainer}>
                  <img src={item.mediaUrl} alt={item.caption} className={styles.image} loading="lazy" />
                  <div className={styles.overlay}>
                    <ImageIcon size={24} className={styles.overlayIcon} />
                  </div>
                </div>
              ) : (
                <div className={styles.mediaContainer}>
                  {/* YouTube thumbnail extractor */}
                  <img 
                    src={
                      item.mediaUrl.includes('embed/')
                        ? `https://img.youtube.com/vi/${item.mediaUrl.split('embed/')[1]?.split('?')[0]}/0.jpg`
                        : 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=800'
                    } 
                    alt={item.caption} 
                    className={styles.image} 
                    loading="lazy" 
                  />
                  <div className={`${styles.overlay} ${styles.videoOverlay}`}>
                    <div className={styles.playCircle}>
                      <Play size={20} fill="white" />
                    </div>
                  </div>
                </div>
              )}
              <div className={styles.captionBox}>
                <p>{item.caption}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIndex !== null && activeItem && (
        <div className={styles.lightbox} onClick={closeLightbox}>
          <button className={styles.closeBtn} onClick={closeLightbox} aria-label="Close Lightbox">
            <X size={24} />
          </button>
          
          <button className={styles.navBtnLeft} onClick={showPrev} aria-label="Previous">
            <ChevronLeft size={36} />
          </button>
          
          <div className={styles.lightboxContent} onClick={(e) => e.stopPropagation()}>
            {activeItem.type === 'PHOTO' ? (
              <img src={activeItem.mediaUrl} alt={activeItem.caption} className={styles.lightboxImage} />
            ) : (
              <div className={styles.videoWrapper}>
                <iframe
                  src={activeItem.mediaUrl}
                  title={activeItem.caption}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            )}
            <div className={styles.lightboxCaption}>
              <p>{activeItem.caption}</p>
            </div>
          </div>

          <button className={styles.navBtnRight} onClick={showNext} aria-label="Next">
            <ChevronRight size={36} />
          </button>
        </div>
      )}
    </div>
  );
};
