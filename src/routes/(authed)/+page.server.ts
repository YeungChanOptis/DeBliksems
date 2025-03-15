import { db } from '$lib/server/db';
import { count, inArray } from 'drizzle-orm';
import { trainingRequestTable, trainingTable } from '../../lib/server/db/schema';

export const load = async () => {
	const trainings = await db.select().from(trainingTable);

	const attendanceRequests = await db
		.select({ trainingId: trainingRequestTable.trainingId, count: count() })
		.from(trainingRequestTable)
		.where(
			inArray(
				trainingRequestTable.trainingId,
				trainings.map((t) => t.id)
			)
		)
		.groupBy(trainingRequestTable.trainingId);

	return {
		trainings: trainings.map((training) => ({
			...training,
			image:
				'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80',
			attendeeCount:
				attendanceRequests.find((attRequest) => attRequest.trainingId === training.id)?.count ?? 0
		}))
	};
};
