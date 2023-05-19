import { z } from 'zod';

const schema = z.object({
	PORT: z.coerce.number().positive().default(3000),
	API: z.string().url().default('http://mybob.amplifire.me:8080'),
	// ... other env vars
});

export const { PORT, API } = schema.parse(import.meta.env);
