import { json, LoaderFunctionArgs, Outlet } from 'react-router-dom';
import { z } from 'zod';
import { generateTabs, TabsSchema } from '../services/roles';
import { User, UserSchema } from '../services/user';
import { bootstrap } from '../services/auth.reactrouter';

export const AuthenticationDataSchema = z.object({
	user: UserSchema,
	permissions: z.array(z.string()),
	tabs: TabsSchema,
	redirectTo: z.string(),
});
export const BootstrapDataSchema = z.object({
	accountInfo: z.object({
		key: z.string(),
		abbrevName: z.string(),
		uid: z.string(),
		name: z.string().optional(),
		parentUid: z.string().optional(),
		demo: z.boolean().optional(),
		modifiedTime: z.number().optional(),
	}),
	recaptchaSiteKey: z.string(),
});

export type AuthenticationData = z.infer<typeof AuthenticationDataSchema>;
export type BootstrapData = z.infer<typeof BootstrapDataSchema>;
export const rootLoader =
	(user: User) =>
	async ({ request }: LoaderFunctionArgs) => {
		let data: AuthenticationData | BootstrapData | null;
		if (user) {
			const { tabs, redirectTo, permissions } = generateTabs(user);
			data = {
				user,
				tabs,
				permissions,
				redirectTo,
			} as AuthenticationData;
		} else {
			const bootstrapData = (await bootstrap(request)) as BootstrapData;
			data = {
				...bootstrapData,
			};
		}
		return json(data);
	};

export default function Root() {
	return <Outlet />;
}
