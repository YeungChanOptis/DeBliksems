import { seed } from 'drizzle-seed';
import { db } from './index';
import { trainingTable, userTable } from './schema';

async function seedDummyData() {
	await seed(db, { userTable, trainingTable });
}

seedDummyData();
