import { z } from 'zod';

export const schema = z.object({
	name: z.string().min(2),
	description: z.string().optional(),
	startDate: z
		.string()
		.date()
		.transform((d) => d.toString()),
	endDate: z
		.string()
		.date()
		.transform((d) => d.toString()),
	price: z.number().transform((d) => d.toString())
});
