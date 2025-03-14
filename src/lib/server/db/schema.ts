import { pgTable, uuid, text, decimal, date, timestamp } from 'drizzle-orm/pg-core';

const ROLES = ['USER', 'ADMIN'] as const;

export const userTable = pgTable('user', {
	id: uuid('id').primaryKey().defaultRandom(),
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),
	email: text('email').notNull(),
	remainingBudget: decimal('remaining_budget').notNull(),
	role: text('role', { enum: ROLES }).notNull(),
	passwordHash: text('password_hash').notNull()
});

export type User = typeof userTable.$inferSelect;

export const trainingTable = pgTable('training', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull(),
	startDate: date('startDate', { mode: 'string' }).notNull(),
	endDate: date('endDate', { mode: 'string' }).notNull(),
	description: text('description'),
	price: decimal('price').notNull()
});

export type Training = typeof trainingTable.$inferSelect;

export const REQUEST_STATES = ['PENDING', 'APPROVED', 'DENIED'] as const;

export type RequestState = typeof REQUEST_STATES[number];

export const trainingRequestTable = pgTable('training_request', {
	id: uuid('id').primaryKey().defaultRandom(),
	description: text('description'),
	durationDays: decimal('duration_days').notNull(),
	status: text('status', { enum: REQUEST_STATES }),
	userId: uuid('user_id').references(() => userTable.id),
	trainingId: uuid('training_id').references(() => trainingTable.id)
});

export type TrainingRequest = typeof trainingRequestTable.$inferSelect;

const COST_TYPES = ['Transport', 'Accomodation', 'Internal Days', 'Other'] as const;

export const costTable = pgTable('cost', {
	id: uuid('id').primaryKey().defaultRandom(),
	name: text('name').notNull(),
	amount: decimal('amount').notNull(),
	type: text('type', { enum: COST_TYPES }).notNull(),
	trainingRequestId: uuid('training_request_id').references(() => trainingRequestTable.id)
});

export type Cost = typeof costTable.$inferSelect;

export const sessionTable = pgTable('session', {
	id: text('id').primaryKey(),
	userId: uuid('user_id')
		.notNull()
		.references(() => userTable.id),
	expiresAt: timestamp('expires_at', {
		withTimezone: true,
		mode: 'date'
	}).notNull()
});
