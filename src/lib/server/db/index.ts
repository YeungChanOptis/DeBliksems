import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';
import { seed, reset } from 'drizzle-seed';
import { DrizzlePostgreSQLAdapter } from '@lucia-auth/adapter-drizzle';
import { hash } from '@node-rs/argon2';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
if (!env.DUMMY_PW) throw new Error('DUMMY PW not set');

const client = postgres(env.DATABASE_URL);

export const db = drizzle(client, {
	schema
});

export const adapter = new DrizzlePostgreSQLAdapter(db, schema.sessionTable, schema.userTable);

await reset(db, schema);
await seed(db, {
	training: schema.trainingTable,
	trainingRequest: schema.trainingRequestTable
}).refine((f) => ({
	training: {
		columns: {
			price: f.number({
				minValue: 100,
				maxValue: 1000,
				precision: 2
			})
		}
	},
	trainingRequest: {
		columns: {
			durationDays: f.int({
				minValue: 1,
				maxValue: 4
			}),
			status: f.valuesFromArray({ values: ['PENDING', 'APPROVED', 'DENIED'] })
		}
	}
}));

const hashedDummyPw = await hash(env.DUMMY_PW, {
	memoryCost: 19456,
	timeCost: 2,
	outputLen: 32,
	parallelism: 1
});

await db.insert(schema.userTable).values([
	{
		id: crypto.randomUUID(),
		firstName: 'test',
		lastName: 'tester',
		email: 'test@mail.be',
		passwordHash: hashedDummyPw,
		remainingBudget: '4500',
		role: 'USER'
	},
	{
		id: crypto.randomUUID(),
		firstName: 'admin',
		lastName: 'admin',
		email: 'admin@mail.be',
		passwordHash: hashedDummyPw,
		remainingBudget: '4500',
		role: 'ADMIN'
	}
]);
