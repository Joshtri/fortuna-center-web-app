import { pgTable, text, varchar, timestamp, pgEnum, uuid } from 'drizzle-orm/pg-core';

// Role enum
export const userRoleEnum = pgEnum('user_role', [
  'ADMINISTRATIVE_EMPLOYEE',
  'ADMIN',
  'TEACHER',
  'STUDENT'
]);

// Users table
export const users = pgTable('users', {
  id: uuid('id').defaultRandom().primaryKey(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  name: text('name').notNull(),
  role: userRoleEnum('role').notNull(),
  password: text('password'), // hashed password
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

// Type exports
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
