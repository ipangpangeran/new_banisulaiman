import React from 'react';
import { db } from '@/lib/db';
import * as schema from '@/lib/schema';
import { Mail, GraduationCap, Briefcase, Award } from 'lucide-react';
import styles from './Teachers.module.css';
import { TeacherPhotoZoom } from '@/components/TeacherPhotoZoom';
import { BoardSlider } from '@/components/BoardSlider';

export const dynamic = 'force-dynamic';

// Helper to determine clean teacher photo path from name
function getTeacherPhoto(name: string): string {
  const cleanName = name
    .toLowerCase()
    .replace(/h\.\s+/g, '')
    .replace(/,\s*lc.*$/g, '')
    .replace(/,\s*s\.ag.*$/g, '')
    .replace(/,\s*dipl.*$/g, '')
    .replace(/[^a-z0-9]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
  return `/images/teacher-${cleanName}.jpg`;
}

export default async function TeachersPage() {
  // Query all instructors & board members
  const teachersList = db.select()
    .from(schema.teachers)
    .orderBy(schema.teachers.order)
    .all();

  const boardMembers = teachersList.filter(t => t.type === 'FOUNDATION_BOARD');
  const instructors = teachersList.filter(t => t.type === 'TEACHER');

  return (
    <div className={styles.wrapper}>
      {/* Banner */}
      <section className={styles.banner}>
        <div className="container text-center">
          <h1>Dewan Guru & Pengurus</h1>
          <p>Mudir, Asatidzah, dan Pengurus Yayasan Bani Sulaiman</p>
        </div>
      </section>

      {/* Instructors list */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Pelaksana Akademik (Asatidzah)</h2>
          <div className={styles.teachersGrid}>
            {instructors.map((teacher) => (
              <div key={teacher.id} className={styles.teacherRow}>
                <div className={styles.avatarCol}>
                  <TeacherPhotoZoom src={getTeacherPhoto(teacher.name)} alt={teacher.name} size={80} />
                </div>
                <div className={styles.infoCol}>
                  <h3>{teacher.name}</h3>
                  <span className={styles.positionBadge}>{teacher.position}</span>
                  
                  {teacher.biography && (
                    <div className={styles.detailRow}>
                      <Briefcase size={16} className={styles.detailIcon} />
                      <p className={styles.bioText}>{teacher.biography}</p>
                    </div>
                  )}

                  {teacher.education && (
                    <div className={styles.detailRow}>
                      <GraduationCap size={16} className={styles.detailIcon} />
                      <p className={styles.eduText}>
                        <strong>Pendidikan:</strong> {teacher.education}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Board Pengurus list */}
      <section className="section section-bg-alt">
        <div className="container">
          <h2 className="section-title">Pengurus Yayasan</h2>
          <BoardSlider boardMembers={boardMembers} />
        </div>
      </section>
    </div>
  );
}
