import { authenticatedFetch } from './utils';
import { User } from './user';

function toSortCriteria(sortOrder: string): string {
	return sortOrder === 'm'
		? 'modifiedTime+desc' // ie, most recently modified
		: sortOrder === 'c'
		? 'createdTime+desc' // ie, most recently created
		: 'name+asc'; // defaults to alphabetical
}

export const getCourseList = async (
	user: any,
	page: number, // 1 based
	pageSize: number,
	sortOrder: string,
): Promise<{
	data: {
		items: any[];
		totalCount: 0;
	};
	response: Response;
}> => {
	const sort = toSortCriteria(sortOrder);
	const offset = (page - 1) * pageSize;
	const url = `/v2/authoring-course-content?sort=${sort}&offset=${offset}&limit=${pageSize}`;

	return authenticatedFetch<any>(url, user.sessionKey);
};

export const getCourseContent = async (
	user: User,
	uid: string,
): Promise<{
	data: {
		uid: string;
		name: string;
		descriptionHtml: string;
	};
	response: Response;
}> => {
	const url = `/v2/authoring-course-content/${uid}`;

	return authenticatedFetch<any>(url, user.sessionKey);
};

export const createCourseContent = async (
	user: User,
	name?: string,
): Promise<{
	data: {
		uid: string;
		name: string;
	};
	response: Response;
}> => {
	const url = '/v2/authoring-course-content';
	const body = {
		name: name || 'Untitled',
	};
	return authenticatedFetch<any>(url, user.sessionKey, 'POST', body);
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
	page: number, // 1 based
	pageSize: number,
): Promise<{
	data: {
		items: any[];
		totalCount: 0;
	};
	response: Response;
}> => {
	const url = `/v2/authoring-folders?sort=name+asc&includeUsage=true&paginate=true&offset=${
		(page - 1) * pageSize
	}&limit=${pageSize}`;

	return authenticatedFetch<any>(url, user.sessionKey);
};

export const getFolder = async (
	user: User,
	folderUid: string,
): Promise<{
	data: {
		name: string;
		description: string;
		uid: string;
	};
	response: Response;
}> => {
	const url = `/v2/authoring-folders/${folderUid}`;

	return authenticatedFetch<any>(url, user.sessionKey);
};

export const getFolderContent = async (
	user: User,
	folderUid: string,
	page: number, // 1 based
	pageSize: number,
	sortOrder: string,
): Promise<{
	data: {
		items: any[];
		totalCount: 0;
	};
	response: Response;
}> => {
	const sort = toSortCriteria(sortOrder);
	const url = `/v2/authoring-course-content?folderUid=${folderUid}&offset=${
		(page - 1) * pageSize
	}&limit=${pageSize}&sort=${sort}`;

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

export const deleteFolder = async (
	user: User,
	folderUid: string,
): Promise<any> => {
	const url = `/v2/authoring-folders/${folderUid}`;

	return authenticatedFetch<any>(url, user.sessionKey, 'DELETE');
};

export const addCoursesToFolder = async (
	user: User,
	folderUid: string,
	body: {
		items: {
			uid: string;
		}[];
	},
): Promise<{
	response: Response;
}> => {
	const url = `/v2/authoring-folders/${folderUid}/course-content`;

	return authenticatedFetch<any>(url, user.sessionKey, 'POST', body);
};
