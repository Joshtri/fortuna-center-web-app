import { pgTable, text, varchar, timestamp, boolean, pgEnum, uuid } from 'drizzle-orm/pg-core';

// Enums
export const sessionStatusEnum = pgEnum('session_status', ['pending', 'live', 'ended', 'error']);
export const inputTypeEnum = pgEnum('input_type', ['browser', 'rtmp', 'audio']);

export const liveSessions = pgTable('live_sessions', {
  id: uuid('id').defaultRandom().primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  status: sessionStatusEnum('status').default('pending').notNull(),
  inputType: inputTypeEnum('input_type').default('browser').notNull(),

  // For RTMP
  ingressId: text('ingress_id'),
  streamKey: text('stream_key'),
  rtmpUrl: text('rtmp_url'),

  // For WebRTC/General
  roomId: text('room_id'), // LiveKit Room Name

  isPublic: boolean('is_public').default(true),
  scheduledAt: timestamp('scheduled_at'),
  startedAt: timestamp('started_at'),
  endedAt: timestamp('ended_at'),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

export type LiveSession = typeof liveSessions.$inferSelect;
export type NewLiveSession = typeof liveSessions.$inferInsert;
