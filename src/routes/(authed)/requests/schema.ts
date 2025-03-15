import { z } from 'zod';

export const schema = z.object({
	trainingRequestId: z.string(),
	name: z.string(),
	type: z.enum(['Transport', 'Accomodation', 'Other']).optional(),
	description: z.string(),
	amount: z.number().transform((d) => d.toString())
});
