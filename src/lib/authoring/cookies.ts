import { Cookies } from 'react-cookie-consent';

/**
 * Returns a tuple containing a function to get the current cookie value (or default if unset)
 * and a function to set the cookie value (or remove it if null or the default value).
 *
 * @param key the cookie's name
 * @param defaultValue the cookie's default value
 * @param options See https://github.com/js-cookie/js-cookie
 */
export const handleCookie = (key: string, defaultValue: string, options = {}) =>
	[
		() => {
			return (Cookies.get(key) as string) || defaultValue;
		},
		(value: string | null) => {
			if (value === null || value == defaultValue) {
				Cookies.remove(key);
			} else {
				Cookies.set(key, value, options);
			}
		},
	] as const;

// Preferred course content list sort order
export const [courseContentsOrder, setCourseContentsOrder] = handleCookie(
	'amp-course-contents-order',
	'a',
);

// Preferred folder list sort order
export const [folderListOrder, setFolderListOrder] = handleCookie(
	'amp-folders-order',
	'a',
);

// Preferred folder course content list sort order
export const [folderContentsOrder, setFolderContentsOrder] = handleCookie(
	'amp-folder-contents-order',
	'a',
);

// END
