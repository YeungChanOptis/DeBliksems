import { TOTAL_BUDGET } from '$lib/constants';
import { db } from '$lib/server/db';
import { trainingRequestTable, trainingTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { LayoutServerLoad } from '../$types';
import {REQUEST_STATES} from "../../../lib/server/db/schema";

export const load: LayoutServerLoad = async ({ locals }) => {
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
	const usedBudget = trainingRequests
		.filter(request => request.status != REQUEST_STATES[2])
		.reduce(
			(total, { durationDays, ticketCost }) =>
				total + (parseFloat(durationDays) * 500 + (ticketCost ? Number(ticketCost) : 0)),
			0
		);

	const availableBudget = TOTAL_BUDGET - usedBudget;
	return { trainingRequests, availableBudget, usedBudget };
};
