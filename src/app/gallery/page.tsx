import React from 'react';
import { db } from '@/lib/db';
import * as schema from '@/lib/schema';
import { GalleryGrid } from '@/components/GalleryGrid';
import styles from './Gallery.module.css';

export default async function GalleryPage() {
  // Query gallery items from sqlite
  const items = db.select({
    id: schema.galleryItems.id,
    type: schema.galleryItems.type,
    mediaUrl: schema.galleryItems.videoUrl, // fallback / mapped in seed if available
    caption: schema.galleryItems.type // simplified mock mapping
  })
    .from(schema.galleryItems)
    .all();

  // If db has items, we map them appropriately. Since we haven't seeded gallery items,
  // the client component handles falling back to beautiful default mock photos/videos.
  const mappedItems = items.map(item => ({
    id: item.id,
    type: item.type as 'PHOTO' | 'VIDEO',
    mediaUrl: item.mediaUrl || '',
    caption: item.caption || ''
  }));

  return (
    <div className={styles.wrapper}>
      {/* Banner */}
      <section className={styles.banner}>
        <div className="container text-center">
          <h1>Galeri Media</h1>
          <p>Dokumentasi Kegiatan, Keindahan Lingkungan, dan Kehidupan Mahasantri</p>
        </div>
      </section>

      {/* Grid container */}
      <section className="section">
        <div className="container">
          <GalleryGrid initialItems={mappedItems} />
        </div>
      </section>
    </div>
  );
}
