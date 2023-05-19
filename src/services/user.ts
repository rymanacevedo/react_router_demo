import { RoleSchema } from './roles';
import { z } from 'zod';

export const UserSchema = z.object({
	firstName: z.string(),
	lastName: z.string(),
	roles: z.array(RoleSchema),
	sessionKey: z.string(),
	userKey: z.string(),
	accountDomain: z.string(),
	deviceUid: z.string().nullable(),
});

export type User = z.infer<typeof UserSchema>;
