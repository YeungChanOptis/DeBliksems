import { db } from '$lib/server/db';
import { trainingTable } from '$lib/server/db/schema';
import { eq } from 'drizzle-orm';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
    const training = await db
        .select()
        .from(trainingTable)
        .where(eq(trainingTable.id, params.id))
	return { training: training[0] };
};
