import type { Actions, PageServerLoad } from './$types.js';

import { superValidate } from 'sveltekit-superforms';
import { zod } from 'sveltekit-superforms/adapters';
import { fail, redirect } from '@sveltejs/kit';
import { schema } from './schema.js';
import { db } from '../../../../lib/server/db/index.js';
import { trainingTable } from '$lib/server/db/schema.js';
import { createInsertSchema } from 'drizzle-zod';

export const load: PageServerLoad = async () => {
	return { form: await superValidate(zod(schema)) };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(schema));
		if (!form.valid) return fail(400, { form });
		const trainingTableInsertSchema = createInsertSchema(trainingTable);
		const parsed = trainingTableInsertSchema.parse(form.data);
		await db.insert(trainingTable).values(parsed);
		return redirect(303, '/');
	}
};
