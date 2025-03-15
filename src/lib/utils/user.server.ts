import { db } from '$lib/server/db';
import { userTable } from '$lib/server/db/schema';
import { redirect } from '@sveltejs/kit';
import { eq } from 'drizzle-orm';

export async function getUser(id: string | undefined) {
	const result = await db
		.select()
		.from(userTable)
		.where(eq(userTable.id, id ?? ''));

	if (!result.length) {
		redirect(302, '/sign-in');
	}

	return result[0];
}
