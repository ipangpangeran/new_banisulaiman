import React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { db } from '@/lib/db';
import * as schema from '@/lib/schema';
import { eq, ne, and, sql } from 'drizzle-orm';
import { Calendar, User, BookOpen, ArrowLeft } from 'lucide-react';
import styles from './Post.module.css';

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function PostDetailPage({ params }: PageProps) {
  const { slug } = await params;

  // 1. Fetch main article details
  const post = db.select({
    id: schema.articles.id,
    title: schema.articles.title,
    content: schema.articles.content,
    summary: schema.articles.summary,
    publishDate: schema.articles.publishDate,
    categoryId: schema.articles.categoryId,
    categoryName: schema.categories.name,
    categorySlug: schema.categories.slug,
    authorName: schema.users.name
  })
    .from(schema.articles)
    .leftJoin(schema.categories, eq(schema.articles.categoryId, schema.categories.id))
    .leftJoin(schema.users, eq(schema.articles.authorId, schema.users.id))
    .where(and(eq(schema.articles.slug, slug), eq(schema.articles.status, 'PUBLISHED')))
    .get();

  if (!post) {
    notFound();
  }

  // Increment total view counter in background
  try {
    db.update(schema.articles)
      .set({ totalViews: sql`total_views + 1` })
      .where(eq(schema.articles.id, post.id))
      .run();
  } catch (err) {
    console.error('Failed to increment view count:', err);
  }

  // 2. Fetch up to 3 related articles (same category, excluding current post)
  let relatedPosts: any[] = [];
  if (post.categoryId) {
    relatedPosts = db.select({
      id: schema.articles.id,
      title: schema.articles.title,
      slug: schema.articles.slug,
      publishDate: schema.articles.publishDate
    })
      .from(schema.articles)
      .where(and(
        eq(schema.articles.categoryId, post.categoryId),
        ne(schema.articles.id, post.id),
        eq(schema.articles.status, 'PUBLISHED')
      ))
      .limit(3)
      .all();
  }

  return (
    <div className={styles.wrapper}>
      <div className="container">
        {/* Breadcrumbs / Back button */}
        <div className={styles.backNav}>
          <Link href="/news" className={styles.backLink}>
            <ArrowLeft size={16} />
            <span>Kembali ke Artikel</span>
          </Link>
        </div>

        <div className={styles.postLayout}>
          {/* Main Article Block */}
          <main className={styles.mainPost}>
            <header className={styles.postHeader}>
              {post.categoryName && (
                <span className={styles.category}>{post.categoryName}</span>
              )}
              <h1>{post.title}</h1>
              <div className={styles.meta}>
                <span className={styles.metaItem}>
                  <Calendar size={14} />
                  {post.publishDate ? new Date(post.publishDate).toLocaleDateString('id-ID', { dateStyle: 'long' }) : ''}
                </span>
                <span className={styles.metaItem}>
                  <User size={14} />
                  {post.authorName || 'Ustadz'}
                </span>
              </div>
            </header>

            {/* Post content body */}
            <div 
              className={styles.postBody}
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </main>

          {/* Related Articles sidebar */}
          <aside className={styles.sidebar}>
            <div className={styles.widget}>
              <h3>Artikel Terkait</h3>
              {relatedPosts.length === 0 ? (
                <p className={styles.emptyRelated}>Belum ada artikel terkait dalam kategori ini.</p>
              ) : (
                <ul className={styles.relatedList}>
                  {relatedPosts.map((rel) => (
                    <li key={rel.id}>
                      <span className={styles.relDate}>
                        {rel.publishDate ? new Date(rel.publishDate).toLocaleDateString('id-ID', { dateStyle: 'medium' }) : ''}
                      </span>
                      <Link href={`/news/${rel.slug}`} className={styles.relTitle}>
                        {rel.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Quick Share Widget */}
            <div className={styles.widget}>
              <h3>Kategori Dakwah</h3>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Dapatkan artikel, nasihat ulama, informasi kegiatan, serta pengumuman terbaru seputar Ma'had Bani Sulaiman melalui website resmi kami.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
