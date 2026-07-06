import React from 'react';
import Link from 'next/link';
import { db } from '@/lib/db';
import * as schema from '@/lib/schema';
import { sql, eq, like, and } from 'drizzle-orm';
import { Search, Calendar, User, Tag, ArrowRight } from 'lucide-react';
import styles from './News.module.css';

interface PageProps {
  searchParams: Promise<{
    q?: string;
    category?: string;
    page?: string;
  }>;
}

export default async function NewsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const query = params.q || '';
  const catSlug = params.category || '';
  const currentPage = Math.max(1, parseInt(params.page || '1', 10));
  const limit = 6;
  const offset = (currentPage - 1) * limit;

  // 1. Fetch categories
  const categoriesList = db.select().from(schema.categories).all();
  
  // Find selected category ID
  let activeCategoryId: number | undefined;
  if (catSlug) {
    const activeCat = categoriesList.find(c => c.slug === catSlug);
    if (activeCat) {
      activeCategoryId = activeCat.id;
    }
  }

  // 2. Build where conditions
  const conditions = [eq(schema.articles.status, 'PUBLISHED')];
  if (query) {
    conditions.push(like(schema.articles.title, `%${query}%`));
  }
  if (activeCategoryId !== undefined) {
    conditions.push(eq(schema.articles.categoryId, activeCategoryId));
  }

  const whereClause = and(...conditions);

  // 3. Query matching articles
  let selectQuery = db.select()
    .from(schema.articles)
    .where(whereClause);
    
  // Count total articles for pagination
  const totalArticles = selectQuery.all().length;
  const totalPages = Math.ceil(totalArticles / limit);

  // Fetch paginated results with authors & categories info
  const articlesList = db.select({
    id: schema.articles.id,
    title: schema.articles.title,
    slug: schema.articles.slug,
    summary: schema.articles.summary,
    publishDate: schema.articles.publishDate,
    categoryName: schema.categories.name,
    categorySlug: schema.categories.slug,
    authorName: schema.users.name
  })
    .from(schema.articles)
    .leftJoin(schema.categories, eq(schema.articles.categoryId, schema.categories.id))
    .leftJoin(schema.users, eq(schema.articles.authorId, schema.users.id))
    .where(whereClause)
    .orderBy(sql`${schema.articles.publishDate} DESC`)
    .limit(limit)
    .offset(offset)
    .all();

  return (
    <div className={styles.wrapper}>
      {/* Banner */}
      <section className={styles.banner}>
        <div className="container text-center">
          <h1>Artikel & Berita</h1>
          <p>Kajian Islami, Kegiatan Pesantren, dan Pengumuman Terkini</p>
        </div>
      </section>

      {/* Main Catalog */}
      <section className="section">
        <div className="container">
          <div className={styles.catalogLayout}>
            {/* Main Articles List */}
            <div className={styles.articlesColumn}>
              
              {/* Desktop Filters Info */}
              {query && (
                <div className={styles.filterNotice}>
                  <span>Menampilkan hasil pencarian untuk: <strong>"{query}"</strong></span>
                  <Link href="/news" className={styles.clearFilter}>Hapus</Link>
                </div>
              )}

              {articlesList.length === 0 ? (
                <div className={styles.emptyNotice}>
                  <h3>Tidak Ada Artikel Ditemukan</h3>
                  <p>Cobalah mengganti kata kunci pencarian Anda atau memilih kategori yang lain.</p>
                  <Link href="/news" className="btn btn-primary" style={{ marginTop: '1rem' }}>
                    Reset Filter
                  </Link>
                </div>
              ) : (
                <div className={styles.articlesGrid}>
                  {articlesList.map((art) => (
                    <article key={art.id} className={`${styles.articleCard} card`}>
                      <div className={styles.articleThumb}>
                        <span>📝</span>
                        {art.categoryName && (
                          <span className={styles.categoryBadge}>{art.categoryName}</span>
                        )}
                      </div>
                      <div className={styles.cardContent}>
                        <div className={styles.cardMeta}>
                          <span className={styles.metaItem}>
                            <Calendar size={13} />
                            {art.publishDate ? new Date(art.publishDate).toLocaleDateString('id-ID', { dateStyle: 'medium' }) : ''}
                          </span>
                          <span className={styles.metaItem}>
                            <User size={13} />
                            {art.authorName || 'Ustadz'}
                          </span>
                        </div>
                        <h3>
                          <Link href={`/news/${art.slug}`}>{art.title}</Link>
                        </h3>
                        <p>{art.summary}</p>
                        <Link href={`/news/${art.slug}`} className={styles.readMore}>
                          <span>Baca Selengkapnya</span>
                          <ArrowRight size={14} />
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>
              )}

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className={styles.pagination}>
                  {currentPage > 1 && (
                    <Link
                      href={{
                        pathname: '/news',
                        query: {
                          ...(query ? { q: query } : {}),
                          ...(catSlug ? { category: catSlug } : {}),
                          page: currentPage - 1
                        }
                      }}
                      className={styles.pageBtn}
                    >
                      &larr; Prev
                    </Link>
                  )}
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((pNum) => (
                    <Link
                      key={pNum}
                      href={{
                        pathname: '/news',
                        query: {
                          ...(query ? { q: query } : {}),
                          ...(catSlug ? { category: catSlug } : {}),
                          page: pNum
                        }
                      }}
                      className={`${styles.pageBtn} ${currentPage === pNum ? styles.activePage : ''}`}
                    >
                      {pNum}
                    </Link>
                  ))}
                  {currentPage < totalPages && (
                    <Link
                      href={{
                        pathname: '/news',
                        query: {
                          ...(query ? { q: query } : {}),
                          ...(catSlug ? { category: catSlug } : {}),
                          page: currentPage + 1
                        }
                      }}
                      className={styles.pageBtn}
                    >
                      Next &rarr;
                    </Link>
                  )}
                </div>
              )}
            </div>

            {/* Sidebar (Search & Categories) */}
            <aside className={styles.sidebar}>
              {/* Search Widget */}
              <div className={styles.widget}>
                <h3>Cari Artikel</h3>
                <form action="/news" method="GET" className={styles.searchForm}>
                  <input
                    type="text"
                    name="q"
                    placeholder="Kata kunci..."
                    defaultValue={query}
                    className={styles.searchInput}
                  />
                  {catSlug && <input type="hidden" name="category" value={catSlug} />}
                  <button type="submit" className={styles.searchSubmit}>
                    <Search size={16} />
                  </button>
                </form>
              </div>

              {/* Categories Widget */}
              <div className={styles.widget}>
                <h3>Kategori</h3>
                <ul className={styles.categoryList}>
                  <li>
                    <Link href="/news" className={!catSlug ? styles.activeCatLink : ''}>
                      Semua Kategori
                    </Link>
                  </li>
                  {categoriesList.map((cat) => (
                    <li key={cat.id}>
                      <Link 
                        href={`/news?category=${cat.slug}${query ? `&q=${query}` : ''}`}
                        className={catSlug === cat.slug ? styles.activeCatLink : ''}
                      >
                        {cat.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
