import { db } from './db';
import * as schema from './schema';
import { sql } from 'drizzle-orm';

async function seedCategories() {
  console.log('🌱 Seeding blog categories...');
  const cats = [
    { name: 'Kajian Islam', slug: 'kajian-islam' },
    { name: 'Kegiatan Pesantren', slug: 'kegiatan-pesantren' },
    { name: 'Pengumuman', slug: 'pengumuman' }
  ];

  for (const c of cats) {
    const existing = db.select().from(schema.categories).where(sql`slug = ${c.slug}`).get();
    if (!existing) {
      db.insert(schema.categories).values(c).run();
      console.log(`+ Added category: ${c.name}`);
    }
  }
  console.log('✅ Categories seeded successfully!');
}

seedCategories();
