import { pgTable, text, timestamp, uuid, boolean } from 'drizzle-orm/pg-core';
import { users } from './users.schema';

// Classes table
export const classes = pgTable('classes', {
  id: uuid('id').defaultRandom().primaryKey(),
  name: text('name').notNull(),
  description: text('description'),
  code: text('code').notNull().unique(), // e.g., "MATH101", "ENG201"
  isActive: boolean('is_active').default(true).notNull(),
  createdBy: uuid('created_by').references(() => users.id).notNull(), // Admin who created the class
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Teacher-Class relationship (many-to-many)
// Any teacher can teach any class - no permanent assignment
export const teacherClasses = pgTable('teacher_classes', {
  id: uuid('id').defaultRandom().primaryKey(),
  teacherId: uuid('teacher_id').references(() => users.id).notNull(),
  classId: uuid('class_id').references(() => classes.id).notNull(),
  assignedAt: timestamp('assigned_at').defaultNow().notNull(),
  assignedBy: uuid('assigned_by').references(() => users.id), // Admin who assigned
});

// Student-Class enrollment (many-to-many)
export const classEnrollments = pgTable('class_enrollments', {
  id: uuid('id').defaultRandom().primaryKey(),
  studentId: uuid('student_id').references(() => users.id).notNull(),
  classId: uuid('class_id').references(() => classes.id).notNull(),
  enrolledAt: timestamp('enrolled_at').defaultNow().notNull(),
  enrolledBy: uuid('enrolled_by').references(() => users.id), // Admin who enrolled
});

// Type exports
export type Class = typeof classes.$inferSelect;
export type NewClass = typeof classes.$inferInsert;
export type TeacherClass = typeof teacherClasses.$inferSelect;
export type NewTeacherClass = typeof teacherClasses.$inferInsert;
export type ClassEnrollment = typeof classEnrollments.$inferSelect;
export type NewClassEnrollment = typeof classEnrollments.$inferInsert;
