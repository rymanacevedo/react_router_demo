import type { User } from './user';
import { z } from 'zod';

export const RoleSchema = z.object({
	self: z.string().nullable(),
	id: z.number(),
	name: z.string(),
	active: z.boolean(),
	accountKey: z.string(),
	accountUri: z.string(),
});

export const TabSchema = z.object({
	role: z.string(),
	name: z.string(),
	navlink: z.string(),
	id: z.string(),
	key: z.string(),
});
export const TabsSchema = z.array(TabSchema);

export type NavigateAccountMap = {
	[key: string]: {
		name: string;
		navlink: string;
		order: number;
		priority: number;
		id: string;
	};
};

export type Role = z.infer<typeof RoleSchema>;
export type Tab = z.infer<typeof TabSchema>;

export type RolesMap = {
	[key: string]: string[];
};

const tabs: Tab[] = [];
const permissions: string[] = [];
let redirectTo: string;

export const navigateAccountMap: NavigateAccountMap = {
	'v8-switch-account-link': {
		name: 'Switch Account',
		navlink: 'switch-account',
		order: 1,
		priority: 2,
		id: 'header-composite-switch-account-link',
	},
	'v8-account-link': {
		name: 'Account',
		navlink: 'account',
		order: 2,
		priority: 3,
		id: 'header-composite-account-admin-link',
	},
	'v8-authoring-link': {
		name: 'Authoring',
		navlink: 'authoring',
		order: 3,
		priority: 5,
		id: 'header-composite-authoring-link',
	},
	'v8-reporting-link': {
		name: 'Reporting',
		navlink: 'reporting',
		order: 4,
		priority: 6,
		id: 'header-composite-reporting-link',
	},
	'v8-courses-link': {
		name: 'Courses',
		navlink: 'courses',
		order: 5,
		priority: 4,
		id: 'header-composite-courses-link',
	},
	'v8-learning-link': {
		name: 'Learning',
		navlink: 'learning',
		order: 6,
		priority: 1,
		id: 'header-composite-learning-link',
	},
};

export const rolesMap: RolesMap = {
	'System Admin': [
		'v8-account-link',
		'v8-authoring-link',
		'v8-courses-link',
		'v8-learning-link',
		'v8-reporting-link',
		'v8-switch-account-link',
	],
	'Setup Admin': ['v8-account-link'],
	'Account Admin': ['v8-account-link'],
	'Course Admin': ['v8-account-link'],
	'Author-view-only': ['v8-authoring-link'],
	Author: ['v8-authoring-link'],
	Publisher: ['v8-authoring-link'],
	NDE: ['v8-authoring-link'],
	'Report Viewer': ['v8-reporting-link'],
	'Data Analyst': ['v8-reporting-link'],
	Instructor: ['v8-courses-link', 'v8-reporting-link'],
	Learner: ['v8-learning-link'],
};

export const generateTabs = (user: User) => {
	for (const { name } of user.roles) {
		rolesMap[name].forEach((link: string) => {
			// append key to tabs array
			const navigateAccountMapElement: any = navigateAccountMap[link];
			navigateAccountMapElement.key = link;
			if (!tabs.some((tab) => tab.key === link)) {
				tabs.push(navigateAccountMapElement);
				permissions.push(navigateAccountMapElement.navlink);
			}
		});
	}
	// sort tabs by navigateAccountMap order
	tabs.sort((a, b) => {
		return navigateAccountMap[a.key].order < navigateAccountMap[b.key].order
			? -1
			: 1;
	});

	const highestPriority = Math.max(
		...tabs.map((tab) => navigateAccountMap[tab.key].priority),
	);
	const filteredTabs = tabs.filter(
		(tab) => navigateAccountMap[tab.key].priority === highestPriority,
	);

	redirectTo = navigateAccountMap[filteredTabs[0].key].navlink;

	return { tabs, redirectTo, permissions };
};
