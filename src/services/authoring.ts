import { authenticatedFetch } from './utils';
import { User } from './user';

export const getCourseList = async (
	user: any,
	page: number, // 1 based
	pageSize: number,
): Promise<{
	data: {
		items: any[];
		totalCount: 0;
	};
	response: Response;
}> => {
	const url = `/v2/authoring-course-content?offset=${(page - 1) * pageSize}&limit=${pageSize}`;

	return authenticatedFetch<any>(url, user.sessionKey);
};

export const deleteCourse = async (
	user: User,
	courseContentUid: string,
): Promise<any> => {
	const url = `/v2/authoring-course-content/${courseContentUid}`;

	return authenticatedFetch<any>(url, user.sessionKey, 'DELETE');
};

export const copyCourse = async (
	user: User,
	courseContentUid: string,
	cloneQuestions: boolean,
): Promise<any> => {
	const url = `/v2/authoring-course-content/${courseContentUid}/copy?cloneQuestions=${cloneQuestions}`;

	return authenticatedFetch<any>(url, user.sessionKey, 'POST');
};

export const getFolderList = async (
	user: User,
): Promise<{
	data: {
		items: any[];
	};
	response: Response;
}> => {
	const url = '/v2/authoring-folders';

	return authenticatedFetch<any>(url, user.sessionKey);
};

export const createFolder = async (
	user: User,
	body: {
		name: string;
		description: string;
	},
): Promise<{
	response: Response;
}> => {
	const url = '/v2/authoring-folders';

	return authenticatedFetch<any>(url, user.sessionKey, 'POST', body);
};
