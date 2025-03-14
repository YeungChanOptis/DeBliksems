import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';
import { env } from '$env/dynamic/private';
import { seed, reset } from 'drizzle-seed';

if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
const client = postgres(env.DATABASE_URL);

export const db = drizzle(client, {
	schema
});

await reset(db, schema);
await seed(db, {
	user: schema.userTable,
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
