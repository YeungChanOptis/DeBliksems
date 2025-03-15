import { uuid } from 'drizzle-orm/pg-core';
import { trainingRequestTable, trainingTable } from '$lib/server/db/schema';

import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { db } from '../../../lib/server/db/index';
import { eq } from 'drizzle-orm';
import type { Actions } from './$types';
import { z } from 'zod';
import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async ({ locals }) => {
	if (locals?.user?.role !== 'ADMIN') {
		return redirect(308, '/');
	}
	const data = await db
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
		.where(eq(trainingRequestTable.status, 'PENDING'));
	return { pendingRequests: data ?? [] };
};

const schema = z.object({
	id: z.string().uuid()
});

export const actions: Actions = {
	accept: async (request) => {
		const form = await superValidate(request, zod(schema));
		await db
			.update(trainingRequestTable)
			.set({ status: 'APPROVED' })
			.where(eq(trainingRequestTable.id, form.data.id));
	},
	decline: async (request) => {
		const form = await superValidate(request, zod(schema));
		await db
			.update(trainingRequestTable)
			.set({ status: 'DENIED' })
			.where(eq(trainingRequestTable.id, form.data.id));
	}
};
