import { db } from '$lib/server/db';
import { trainingRequestTable, trainingTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { TOTAL_BUDGET } from '$lib/constants';

export const load: PageServerLoad = async ({ params, locals }) => {
	const training = await db.select().from(trainingTable).where(eq(trainingTable.id, params.id));

	const trainingRequests = await db
		.select({
			id: trainingRequestTable.id,
			description: trainingRequestTable.description,
			durationDays: trainingRequestTable.durationDays,
			status: trainingRequestTable.status,
			userId: trainingRequestTable.userId,
			trainingId: trainingRequestTable.trainingId,
			ticketCost: trainingTable.price,
			trainingName: trainingTable.name
		})
		.from(trainingRequestTable)
		.leftJoin(trainingTable, eq(trainingRequestTable.trainingId, trainingTable.id))
		.where(eq(trainingRequestTable.userId, locals.user!.id));

	const usedBudget = trainingRequests.reduce(
		(acc, { durationDays, ticketCost }) =>
			acc + (parseFloat(durationDays) * 500 + (ticketCost ? Number(ticketCost) : 0)),
		0
	);

	const availableBudget = TOTAL_BUDGET - usedBudget;
	return { training: training[0], availableBudget };
};
