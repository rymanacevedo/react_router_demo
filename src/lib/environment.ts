import { z } from 'zod';

const baseAPI =
	window.location.origin === 'http://localhost:3000'
		? 'http://mybob.amplifire.me:8080'
		: window.location.origin;
const schema = z.object({
	PORT: z.coerce.number().positive().default(3000),
	API: z.string().url().default(baseAPI),
	// ... other env vars
});

export const { PORT, API } = schema.parse(import.meta.env);
