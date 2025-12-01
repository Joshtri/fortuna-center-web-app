import { pgTable, text, timestamp, uuid, pgEnum, integer } from 'drizzle-orm/pg-core';
import { users } from './users.schema';
import { classes } from './class.schema';

// Assignment status enum
export const assignmentStatusEnum = pgEnum('assignment_status', [
  'draft',
  'published',
  'closed'
]);

// Submission status enum
export const submissionStatusEnum = pgEnum('submission_status', [
  'pending',
  'submitted',
  'graded',
  'late'
]);

// Assignments table
export const assignments = pgTable('assignments', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  instructions: text('instructions'),
  classId: uuid('class_id').references(() => classes.id).notNull(),
  teacherId: uuid('teacher_id').references(() => users.id).notNull(), // Teacher who created it
  status: assignmentStatusEnum('status').default('draft').notNull(),
  maxScore: integer('max_score').default(100),
  dueDate: timestamp('due_date'),
  publishedAt: timestamp('published_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Assignment submissions
export const assignmentSubmissions = pgTable('assignment_submissions', {
  id: uuid('id').defaultRandom().primaryKey(),
  assignmentId: uuid('assignment_id').references(() => assignments.id).notNull(),
  studentId: uuid('student_id').references(() => users.id).notNull(),
  content: text('content'), // Submission text/content
  attachmentUrl: text('attachment_url'), // Optional file attachment
  status: submissionStatusEnum('status').default('pending').notNull(),
  score: integer('score'),
  feedback: text('feedback'), // Teacher's feedback
  gradedBy: uuid('graded_by').references(() => users.id), // Teacher who graded
  submittedAt: timestamp('submitted_at'),
  gradedAt: timestamp('graded_at'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Type exports
export type Assignment = typeof assignments.$inferSelect;
export type NewAssignment = typeof assignments.$inferInsert;
export type AssignmentSubmission = typeof assignmentSubmissions.$inferSelect;
export type NewAssignmentSubmission = typeof assignmentSubmissions.$inferInsert;
