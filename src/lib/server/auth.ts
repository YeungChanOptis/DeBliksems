import { Lucia } from 'lucia';
import { adapter } from './db';
import { dev } from '$app/environment';

export const lucia = new Lucia(adapter, {
	sessionCookie: {
		attributes: {
			// set to `true` when using HTTPS
			secure: !dev
		}
	},
	getUserAttributes: (attr) => ({
		email: attr.email,
		role: attr.role
	})
});

declare module 'lucia' {
	interface Register {
		Lucia: typeof lucia;
		DatabaseUserAttributes: DatabaseUserAttributes;
	}
}

interface DatabaseUserAttributes {
	email: string;
	role: 'USER' | 'ADMIN';
}
