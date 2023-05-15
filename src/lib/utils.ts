import { useMatches, useRouteLoaderData } from 'react-router-dom';
import { useMemo } from 'react';

const DEFAULT_REDIRECT = '/';

export const useRoutesData = <T extends unknown>(id: string): T | undefined => {
	const matchingRoutes = useMatches();
	const data = useMemo(
		() => matchingRoutes.find((routeMatch) => routeMatch.id === id)?.data,
		[matchingRoutes, id],
	);
	return data as T | undefined;
};
export const useRootLoaderData = <T extends unknown>(): T => {
	const data = useRouteLoaderData('root');

	if (!data) {
		console.log('No root loader data found');
	}
	return data as T;
};

/**
 * This hook will redirect the user to the login page if they are not logged in.
 * It will also redirect the user to the `redirectTo` prop if they are logged in.
 * @param to
 * @param defaultRedirect
 */
export function safeRedirect(
	to: FormDataEntryValue | string | null | undefined,
	defaultRedirect = DEFAULT_REDIRECT,
) {
	if (!to || typeof to !== 'string') {
		return defaultRedirect;
	}

	if (!to.startsWith('/') || to.startsWith('//')) {
		return defaultRedirect;
	}

	return to;
}
