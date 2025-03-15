import { db } from '$lib/server/db';
import { trainingRequestTable, trainingTable, userTable } from '$lib/server/db/schema';
import { and, eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';
import { TOTAL_BUDGET } from '$lib/constants';
import { fail, redirect, type Actions } from '@sveltejs/kit';
import { daysBetween } from '$lib/utils/dateUtils';
import { z } from 'zod';
import { getUser } from '$lib/utils/user.server';

async function getTrainingRequest(userId: string, trainingId: string) {
	const existing = await db
		.select()
		.from(trainingRequestTable)
		.where(
			and(eq(trainingRequestTable.userId, userId), eq(trainingRequestTable.trainingId, trainingId))
		);

	return existing.length ? existing[0] : null;
}

export const load: PageServerLoad = async ({ params, locals }) => {
	const user = await getUser(locals.user?.id);
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
		.where(eq(trainingRequestTable.userId, user.id));

	const usedBudget = trainingRequests.reduce(
		(acc, { durationDays, ticketCost }) =>
			acc + (parseFloat(durationDays) * 500 + (ticketCost ? Number(ticketCost) : 0)),
		0
	);

	const attendees = await db
		.select({
			userId: userTable.id,
			firstName: userTable.firstName,
			lastName: userTable.lastName,
			days: trainingRequestTable.durationDays
		})
		.from(userTable)
		.leftJoin(trainingRequestTable, eq(trainingRequestTable.userId, userTable.id))
		.where(eq(trainingRequestTable.trainingId, params.id));

	const availableBudget = TOTAL_BUDGET - usedBudget;
	
	return {
		training: training[0],
		availableBudget,
		attendees,
		attending: Boolean(attendees.find((attendee) => attendee.userId))
	};
};

async function getTraining(id: string) {
	const training = await db.select().from(trainingTable).where(eq(trainingTable.id, id));
	if (!training.length) {
		throw new Error('No training found id: ' + id);
	}
	return training[0];
}

const ConfirmRequest = z.object({
	durationDays: z.coerce.number().min(1),
	description: z.string().optional()
});

export const actions: Actions = {
	default: async (event) => {
		const user = await getUser(event.locals.user?.id);

		const trainingId = event.params['id'];
		const formData = await event.request.formData();

		const { durationDays, description } = ConfirmRequest.parse(Object.fromEntries(formData));

		if (!trainingId) {
			return fail(400, { message: 'Missing training id.' });
		}

		const userTrainingRequest = await getTrainingRequest(user.id, trainingId);
		if (userTrainingRequest !== null) {
			return fail(400, { message: 'Already attending training' });
		}

		const training = await getTraining(trainingId);
		const maxDurationDays = daysBetween(training.startDate, training.endDate);

		if (durationDays > maxDurationDays) {
			return fail(400, { message: 'Incorrect duration days' });
		}

		await db.insert(trainingRequestTable).values({
			description,
			durationDays: String(durationDays),
			status: 'PENDING',
			userId: user.id,
			trainingId
		});

		redirect(303, '/');
	}
};
