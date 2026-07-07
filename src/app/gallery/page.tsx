import React from 'react';
import { db } from '@/lib/db';
import * as schema from '@/lib/schema';
import { eq } from 'drizzle-orm';
import { GalleryGrid } from '@/components/GalleryGrid';
import styles from './Gallery.module.css';

export const dynamic = 'force-dynamic';

export default async function GalleryPage() {
  // Query gallery items from sqlite joined with media for photo paths
  const dbItems = db.select({
    id: schema.galleryItems.id,
    type: schema.galleryItems.type,
    videoUrl: schema.galleryItems.videoUrl,
    filePath: schema.media.filePath,
    caption: schema.galleryItems.caption
  })
    .from(schema.galleryItems)
    .leftJoin(schema.media, eq(schema.galleryItems.mediaId, schema.media.id))
    .all();

  // If database contains items, map them correctly.
  const mappedItems = dbItems.map(item => ({
    id: item.id,
    type: item.type as 'PHOTO' | 'VIDEO' | 'INSTAGRAM',
    mediaUrl: item.type === 'PHOTO' ? (item.filePath || '') : (item.videoUrl || ''),
    caption: item.caption || (item.type === 'PHOTO' ? 'Dokumentasi Foto' : item.type === 'INSTAGRAM' ? 'Dokumentasi Instagram' : 'Dokumentasi Video')
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
