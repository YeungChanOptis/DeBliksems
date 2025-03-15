import { TOTAL_BUDGET } from '$lib/constants';
import { db } from '$lib/server/db';
import { trainingRequestTable, trainingTable, costTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { Actions, LayoutServerLoad } from '../$types';
import { fail, superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { createInsertSchema } from 'drizzle-zod';
import { redirect } from '@sveltejs/kit';
import { schema } from './schema';

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
	const usedBudget = trainingRequests.reduce(
		(acc, { durationDays, ticketCost }) =>
			acc + (parseFloat(durationDays) * 500 + (ticketCost ? Number(ticketCost) : 0)),
		0
	);

	const availableBudget = TOTAL_BUDGET - usedBudget;
	return { trainingRequests, availableBudget, usedBudget };
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
		return redirect(303, "/requests");
	}
};
