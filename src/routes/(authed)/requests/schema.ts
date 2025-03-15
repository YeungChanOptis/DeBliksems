import { z } from 'zod';

export const schema = z.object({
	trainingRequestId: z.string(),
	name: z.string(),
	type: z.enum(['Transport', 'Accomodation', 'Other']).optional(),
	amount: z.number().transform((d) => d.toString())
});
