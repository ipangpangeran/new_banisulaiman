'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import styles from './TeacherPhotoZoom.module.css';

interface TeacherPhotoZoomProps {
  src: string;
  alt: string;
  className?: string;
  size?: number;
}

export function TeacherPhotoZoom({ src, alt, className, size = 100 }: TeacherPhotoZoomProps) {
  const [isZoomed, setIsZoomed] = useState(false);
  const [imgError, setImgError] = useState(false);
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

  const fallbackEmoji = '👳';

  const modalContent = isZoomed && !imgError && (
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
        <X size={20} />
      </button>
      <img 
        src={src} 
        alt={alt} 
        className={styles.zoomedImg}
        onClick={(e) => {
          e.stopPropagation();
          setIsZoomed(false); // Clicking anywhere (including on the photo itself) closes the zoom view
        }}
      />
    </div>
  );

  return (
    <>
      <div 
        className={`${styles.photoContainer} ${className || ''}`}
        onClick={(e) => {
          e.stopPropagation();
          if (!imgError) setIsZoomed(true);
        }}
        style={{ 
          width: `${size}px`, 
          height: `${size}px`,
          cursor: imgError ? 'default' : 'zoom-in' 
        }}
      >
        {imgError ? (
          <div 
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: `${size * 0.45}px`,
              backgroundColor: 'rgba(0, 0, 0, 0.05)'
            }}
          >
            {fallbackEmoji}
          </div>
        ) : (
          <img 
            src={src} 
            alt={alt} 
            className={styles.photoImg}
            onError={() => setImgError(true)}
          />
        )}
      </div>

      {mounted && typeof document !== 'undefined' && createPortal(modalContent, document.body)}
    </>
  );
}

