import { TOTAL_BUDGET } from '$lib/constants';
import { db } from '$lib/server/db';
import { trainingRequestTable, trainingTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';

export const load = async () => {
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
		//TODO:Change id
		.where(eq(trainingRequestTable.userId, '6e97dea2-15c8-4195-6f80-a9ec395ac15c'));

	const usedBudget = trainingRequests.reduce(
		(acc, { durationDays, ticketCost }) =>
			acc + (parseFloat(durationDays) * 500 + (ticketCost ? Number(ticketCost) : 0)),
		0
	);

	const availableBudget = TOTAL_BUDGET - usedBudget;
	return { trainingRequests, availableBudget, usedBudget };
};
