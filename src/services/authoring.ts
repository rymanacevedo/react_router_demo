import { authenticatedFetch } from './utils';

export const getCourseList = async (
	user: any,
): Promise<{
	data: {
		items: any[];
	};
	response: Response;
}> => {
	const url = '/v2/authoring-course-content';

	return authenticatedFetch<any>(url, user.sessionKey);
};
