import { z } from 'zod';
import { UserSchema } from './services/user';
import { generateTabs, TabsSchema } from './services/roles';
import { Suspense } from 'react';
import { json, Outlet } from 'react-router-dom';
import { getUser } from './utils/user';

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

export const appLoader = () => {
	const user = getUser();
	let data: AuthenticationData | null = null;
	if (user) {
		const { tabs, redirectTo, permissions } = generateTabs(user);
		data = {
			user,
			tabs,
			permissions,
			redirectTo,
		} as AuthenticationData;
	}

	return json(data);
};

export default function App() {
	return (
		<Suspense fallback={<>Loading...</>}>
			<Outlet />
		</Suspense>
	);
}
