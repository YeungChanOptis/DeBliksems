import { db } from '$lib/server/db';
import { trainingTable } from '../../lib/server/db/schema';

export const load = async () => {
	const trainings = await db.select().from(trainingTable);

	return {
		trainings: trainings.map((training) => ({
			...training,
			image:
				'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=800&q=80'
		}))
	};
};
