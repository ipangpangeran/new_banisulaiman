'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import styles from './QrisImageZoom.module.css';

interface QrisImageZoomProps {
  src: string;
  alt: string;
  className?: string;
}

export function QrisImageZoom({ src, alt, className }: QrisImageZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Close on Escape keypress
  useEffect(() => {
    if (!isZoomed) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsZoomed(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isZoomed]);

  // Lock body scroll when zoomed
  useEffect(() => {
    if (isZoomed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isZoomed]);

  const modalContent = isZoomed && (
    <div 
      className={styles.overlay} 
      onClick={(e) => {
        e.stopPropagation();
        setIsZoomed(false);
      }}
    >
      <button 
        className={styles.closeBtn} 
        onClick={(e) => {
          e.stopPropagation();
          setIsZoomed(false);
        }}
      >
        <X size={24} />
      </button>
      <div className={styles.zoomedCard} onClick={(e) => e.stopPropagation()}>
        <img 
          src={src} 
          alt={alt} 
          className={styles.zoomedImg}
          onClick={(e) => {
            e.stopPropagation();
            setIsZoomed(false); // Clicking the image itself closes the zoom view
          }}
        />
        <div className={styles.zoomedTip}>Klik di mana saja untuk menutup</div>
      </div>
    </div>
  );

  return (
    <>
      <div 
        className={`${styles.qrisWrapper} ${className || ''}`}
        onClick={(e) => {
          e.stopPropagation();
          setIsZoomed(true);
        }}
      >
        <img 
          src={src} 
          alt={alt} 
          className={styles.qrisThumbnail} 
        />
      </div>

      {mounted && typeof document !== 'undefined' && createPortal(modalContent, document.body)}
    </>
  );
}
