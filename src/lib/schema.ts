import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

// 1. Users & Roles (Authentication)
export const users = sqliteTable('users', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  email: text('email').unique().notNull(),
  passwordHash: text('password_hash').notNull(),
  role: text('role').default('AUTHOR').notNull(), // 'SUPER_ADMIN', 'ADMIN', 'EDITOR', 'AUTHOR'
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`)
});

// 2. Media Library File Manager
export const media = sqliteTable('media', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  fileName: text('file_name').notNull(),
  filePath: text('file_path').notNull(), // e.g. /uploads/image.jpg
  fileSize: integer('file_size').notNull(),
  mimeType: text('mime_type').notNull(),
  folder: text('folder').default('general').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`)
});

// 3. Categories & Tags
export const categories = sqliteTable('categories', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').unique().notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`)
});

export const tags = sqliteTable('tags', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  slug: text('slug').unique().notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`)
});

// 4. Articles (Blog Engine)
export const articles = sqliteTable('articles', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  slug: text('slug').unique().notNull(),
  summary: text('summary').notNull(),
  content: text('content').notNull(), // Rich text html/markdown
  categoryId: integer('category_id').references(() => categories.id),
  featuredImageId: integer('featured_image_id').references(() => media.id),
  status: text('status').default('DRAFT').notNull(), // 'DRAFT', 'PUBLISHED', 'SCHEDULED'
  publishDate: integer('publish_date', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
  totalViews: integer('total_views').default(0).notNull(),
  authorId: integer('author_id').references(() => users.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`)
});

export const articleTags = sqliteTable('article_tags', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  articleId: integer('article_id').references(() => articles.id),
  tagId: integer('tag_id').references(() => tags.id),
});

// 5. Programs (Educational Programs)
export const programs = sqliteTable('programs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  curriculum: text('curriculum').notNull(), // JSON or bullet lines
  duration: text('duration').notNull(), // e.g. "2 Tahun"
  isOpen: integer('is_open', { mode: 'boolean' }).default(true).notNull(),
  imageId: integer('image_id').references(() => media.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`)
});

// 6. Teachers & Foundation Board
export const teachers = sqliteTable('teachers', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  position: text('position').notNull(), // e.g. Mudir, Ustadz, Pembina
  biography: text('biography'),
  education: text('education'),
  photoId: integer('photo_id').references(() => media.id),
  type: text('type').default('TEACHER').notNull(), // 'FOUNDATION_BOARD' or 'TEACHER'
  order: integer('order').default(0).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`)
});

// 7. Activities Timeline
export const activities = sqliteTable('activities', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  eventDate: integer('event_date', { mode: 'timestamp' }).notNull(),
  type: text('type').default('DAILY').notNull(), // 'DAILY', 'WEEKLY', 'ANNUAL'
  coverImageId: integer('cover_image_id').references(() => media.id),
  videoUrl: text('video_url'), // YouTube embed links
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`)
});

// 8. Gallery Albums & Items
export const galleryAlbums = sqliteTable('gallery_albums', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  description: text('description'),
  coverImageId: integer('cover_image_id').references(() => media.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`)
});

export const galleryItems = sqliteTable('gallery_items', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  albumId: integer('album_id').references(() => galleryAlbums.id),
  type: text('type').default('PHOTO').notNull(), // 'PHOTO' or 'VIDEO'
  mediaId: integer('media_id').references(() => media.id),
  videoUrl: text('video_url'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`)
});

// 9. Achievements
export const achievements = sqliteTable('achievements', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description'),
  date: integer('date', { mode: 'timestamp' }),
  imageId: integer('image_id').references(() => media.id),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`)
});

// 10. Admissions (PPDB) Applications
export const admissions = sqliteTable('admissions', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  fullName: text('full_name').notNull(),
  birthInfo: text('birth_info').notNull(),
  age: integer('age').notNull(),
  ktpAddress: text('ktp_address').notNull(),
  domisiliAddress: text('domisili_address').notNull(),
  maritalStatus: text('marital_status').notNull(),
  program: text('program').notNull(),
  activity: text('activity').notNull(),
  activityOther: text('activity_other'),
  phone: text('phone').notNull(),
  email: text('email').notNull(),
  lastEducation: text('last_education').notNull(),
  educationOther: text('education_other'),
  graduationYear: text('graduation_year').notNull(),
  hafalanJuz: text('hafalan_juz').notNull(),
  fatherName: text('father_name').notNull(),
  fatherJob: text('father_job').notNull(),
  motherName: text('mother_name').notNull(),
  motherJob: text('mother_job').notNull(),
  reason: text('reason').notNull(),
  suratIzinOrtuPath: text('surat_izin_ortu_path'),
  suratKesiapanPath: text('surat_kesiapan_path'),
  status: text('status').default('PENDING').notNull(), // 'PENDING', 'APPROVED', 'REJECTED'
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`)
});

// 11. Donations Campaigns & Donation Reports
export const donationPrograms = sqliteTable('donation_programs', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description').notNull(),
  targetAmount: integer('target_amount'),
  raisedAmount: integer('raised_amount').default(0).notNull(),
  qrisImageId: integer('qris_image_id').references(() => media.id),
  isActive: integer('is_active', { mode: 'boolean' }).default(true).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`)
});

export const donationReports = sqliteTable('donation_reports', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  programId: integer('program_id').references(() => donationPrograms.id),
  donorName: text('donor_name').default('Hamba Allah').notNull(),
  amount: integer('amount').notNull(),
  date: integer('date', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`),
  status: text('status').default('VERIFIED').notNull(), // 'PENDING', 'VERIFIED'
  notes: text('notes'),
  createdAt: integer('created_at', { mode: 'timestamp' }).default(sql`(strftime('%s', 'now'))`)
});

// 12. General Settings
export const siteSettings = sqliteTable('site_settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull() // JSON strings
});
