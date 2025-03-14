import { db } from '$lib/server/db';
import { costTable } from '$lib/server/db/schema';

export const load = async () => {
	const costs = await db.select().from(costTable);
	return { cost: costs.reduce((sum, cost) => sum + parseFloat(cost.amount), 600) };
};
