import React from 'react';
import { db } from '@/lib/db';
import * as schema from '@/lib/schema';
import { Mail, GraduationCap, Briefcase, Award } from 'lucide-react';
import styles from './Teachers.module.css';

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
                  <div className={styles.avatarEmoji}>👳</div>
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
          <div className={styles.boardGrid}>
            {boardMembers.map((member) => (
              <div key={member.id} className={`${styles.boardCard} card`}>
                <div className={styles.boardIcon}>🏛️</div>
                <h3>{member.name}</h3>
                <span className={styles.boardPos}>{member.position}</span>
                <p>{member.biography}</p>
                {member.education && (
                  <span className={styles.boardEdu}>{member.education}</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
