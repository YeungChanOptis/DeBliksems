import { z } from 'zod';
import type { Actions } from './$types';
import { db } from '$lib/server/db';
import { userTable } from '$lib/server/db/schema';
import { fail, redirect } from '@sveltejs/kit';
import { verify } from '@node-rs/argon2';
import { lucia } from '$lib/server/auth';
import { eq } from 'drizzle-orm';

const UserSignIn = z.object({
	email: z.string({ message: 'Required' }).email(),
	password: z.string({ message: 'Required' })
});

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();

		const signInData = UserSignIn.parse(Object.fromEntries(formData));

		const user = await db.select().from(userTable).where(eq(userTable.email, signInData.email));
		if (!user.length) {
			return fail(400, { message: 'Incorrect email/password.' });
		}

		const existingUser = user[0];

		const validPassword = await verify(existingUser.passwordHash, signInData.password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		if (!validPassword) {
			return fail(400, { message: 'Incorrect email/password' });
		}

		console.info('Create session for user', signInData.email);
		const session = await lucia.createSession(existingUser.id, {});
		const sessionCookie = lucia.createSessionCookie(session.id);

		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/');
	}
};
