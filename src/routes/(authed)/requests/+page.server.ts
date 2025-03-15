import { TOTAL_BUDGET } from '$lib/constants';
import { db } from '$lib/server/db';
import { costTable, trainingRequestTable, trainingTable, userTable } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';
import { eq, inArray, sql } from 'drizzle-orm';
import { createInsertSchema } from 'drizzle-zod';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import type { Actions, LayoutServerLoad } from '../$types';
import { REQUEST_STATES } from '../../../lib/server/db/schema';
import { schema } from './schema';

export const load: LayoutServerLoad = async ({ locals }) => {
	const userId = locals.user!.id;
	const CONSULTANT_DAY_COST = 500;

	const trainingRequests = await db
		.select({
			id: trainingRequestTable.id,
			description: trainingRequestTable.description,
			durationDays: trainingRequestTable.durationDays,
			status: trainingRequestTable.status,
			userId: trainingRequestTable.userId,
			trainingId: trainingRequestTable.trainingId,
			ticketCost: trainingTable.price,
			trainingName: trainingTable.name,
			costs: sql`json_agg(json_build_object(
		'id', ${costTable.id},
		'amount', ${costTable.amount},
		'description', ${costTable.description}
	  ))`.as('costs')
		})
		.from(trainingRequestTable)
		.leftJoin(trainingTable, eq(trainingRequestTable.trainingId, trainingTable.id))
		.leftJoin(userTable, eq(trainingRequestTable.userId, userTable.id))
		.leftJoin(costTable, eq(trainingRequestTable.id, costTable.trainingRequestId))
		.where(eq(trainingRequestTable.userId, userId))
		.groupBy(trainingRequestTable.id, trainingTable.price, trainingTable.name);

	const ticketBudget = trainingRequests
		.filter((request) => request.status === REQUEST_STATES[1])
		.reduce((total, { ticketCost }) => total += Number(ticketCost), 0);


	const internalDaysBudget = trainingRequests
		.filter((request) => request.status === REQUEST_STATES[1])
		.reduce((total, { durationDays }) => total += parseFloat(durationDays) * CONSULTANT_DAY_COST, 0);

	const costs = await db.select({
		id: costTable.id,
		amount: costTable.amount,
		type: costTable.type
	})
		.from(costTable)
		.leftJoin(trainingRequestTable, eq(trainingRequestTable.id, costTable.trainingRequestId))
		.where(inArray(trainingRequestTable.trainingId, trainingRequests.map(request => request.trainingId)));


	const totalsPerType: {[key: string]: number} = costs.reduce((total, cost) => {
		if (!total[cost.type]) {
			total[cost.type] = 0;
		}

		total[cost.type] += parseFloat(cost.amount.toString());

		return total;
	}, {});

	totalsPerType['Ticket'] = ticketBudget;
	totalsPerType['Internal Days'] = internalDaysBudget;


	const availableBudget = Object.values(totalsPerType).reduce((total, cost) => total -= cost, TOTAL_BUDGET);
	totalsPerType['Available'] = availableBudget;
	const usedBudget = Object.values(totalsPerType).reduce((total, cost) =>  total += cost, 0);
	return { trainingRequests, availableBudget, totalsPerType, usedBudget };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(schema));
		console.log('formData', form);

		if (!form.valid) return fail(400, { form });
		console.log('form is valid, persisting.....', JSON.stringify(form.data));

		const costTableInsertSchema = createInsertSchema(costTable);
		const parsed = costTableInsertSchema.parse(form.data);
		await db.insert(costTable).values({ ...parsed, status: 'PENDING' });
		return redirect(303, '/requests');
	}
};

