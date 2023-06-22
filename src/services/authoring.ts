import { authenticatedFetch } from './utils';
import { User } from './user';

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

export const deleteCourse = async (
	user: User,
	courseContentUid: string,
): Promise<any> => {
	const url = `/v2/authoring-course-content/${courseContentUid}`;

	return authenticatedFetch<any>(url, user.sessionKey, 'DELETE');
};

export const copyNewCourse = async (
	user: User,
	courseContentUid: string,
): Promise<any> => {
	const url = `/v2/authoring-course-content/${courseContentUid}/copy?cloneQuestions=false`;

	return authenticatedFetch<any>(url, user.sessionKey, 'POST');
};
