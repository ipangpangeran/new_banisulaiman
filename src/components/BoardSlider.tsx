'use client';

import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { TeacherPhotoZoom } from '@/components/TeacherPhotoZoom';
import styles from './BoardSlider.module.css';

interface BoardMember {
  id: number;
  name: string;
  position: string;
  biography: string | null;
  education: string | null;
  type: string;
}

interface BoardSliderProps {
  boardMembers: BoardMember[];
}

// Clean prefixes and degrees to map board member names to filename paths
function getTeacherPhoto(name: string): string {
  const baseName = name.split(',')[0];
  const cleanName = baseName
    .toLowerCase()
    .replace(/^(drs\.\s+|dr\.\s+|h\.\s+|hj\.\s+|ir\.\s+|ustadz\s+|ustadzah\s+)+/i, '')
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return `/images/teacher-${cleanName}.jpg`;
}

export function BoardSlider({ boardMembers }: BoardSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerSlide, setItemsPerSlide] = useState(3);

  // Responsively detect and update how many items can fit in the viewport
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 600) {
        setItemsPerSlide(1);
      } else if (window.innerWidth <= 992) {
        setItemsPerSlide(2);
      } else {
        setItemsPerSlide(3);
      }
    };

    handleResize(); // Initial check
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const totalItems = boardMembers.length;
  const maxIndex = Math.max(0, totalItems - itemsPerSlide);

  // If slide count decreases dynamically, keep index within safe bounds
  useEffect(() => {
    if (currentIndex > maxIndex) {
      setCurrentIndex(maxIndex);
    }
  }, [itemsPerSlide, maxIndex, currentIndex]);

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const handleDotClick = (index: number) => {
    setCurrentIndex(Math.min(maxIndex, index));
  };

  // If board members is 3 or less, render a simple static grid (no sliding needed)
  if (totalItems <= 3) {
    return (
      <div className={styles.boardGrid}>
        {boardMembers.map((member) => (
          <div key={member.id} className={styles.boardCard}>
            <div className={styles.boardIcon}>
              <TeacherPhotoZoom src={getTeacherPhoto(member.name)} alt={member.name} size={80} />
            </div>
            <h3>{member.name}</h3>
            <span className={styles.boardPos}>{member.position}</span>
            <p>{member.biography}</p>
          </div>
        ))}
      </div>
    );
  }

  // Render responsive slider for > 3 board members
  const translatePercent = currentIndex * (100 / itemsPerSlide);
  const totalDots = maxIndex + 1;

  return (
    <div className={styles.sliderContainer}>
      <div className={styles.sliderViewport}>
        <div 
          className={styles.sliderTrack}
          style={{ transform: `translateX(-${translatePercent}%)` }}
        >
          {boardMembers.map((member) => (
            <div key={member.id} className={styles.sliderItem}>
              <div className={styles.boardCard}>
                <div className={styles.boardIcon}>
                  <TeacherPhotoZoom src={getTeacherPhoto(member.name)} alt={member.name} size={80} />
                </div>
                <h3>{member.name}</h3>
                <span className={styles.boardPos}>{member.position}</span>
                <p>{member.biography}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation arrows and dots */}
      <div className={styles.controls}>
        <button 
          onClick={handlePrev} 
          disabled={currentIndex === 0}
          className={styles.navBtn}
          aria-label="Previous slide"
        >
          <ChevronLeft size={20} />
        </button>

        <div className={styles.dots}>
          {Array.from({ length: totalDots }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => handleDotClick(idx)}
              className={`${styles.dot} ${currentIndex === idx ? styles.activeDot : ''}`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>

        <button 
          onClick={handleNext} 
          disabled={currentIndex === maxIndex}
          className={styles.navBtn}
          aria-label="Next slide"
        >
          <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
}
