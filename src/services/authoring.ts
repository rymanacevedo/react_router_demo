import { authenticatedFetch } from './utils';
import { User } from './user';
import { CourseContent } from '../store/slices/authoring/coursesViewSlice';
import { DEFAULT_COURSE_CONTENT_NAME } from '../lib/authoring/constants';
import { Module } from '../store/slices/authoring/moduleSlice';

function toSortCriteria(sortOrder: string): string {
	return sortOrder === 'm'
		? 'modifiedTime+desc' // ie, most recently modified
		: sortOrder === 'c'
		? 'createdTime+desc' // ie, most recently created
		: 'name+asc'; // defaults to alphabetical
}

export const getCreators = async (
	user: any,
): Promise<{
	data: { items: { uid: string; firstName: string; lastName: string }[] };
	response: Response;
}> => {
	let url = '/v2/authoring-course-content/created-by';
	return authenticatedFetch<any>(url, user.sessionKey);
};

export const getCourseList = async (
	user: any,
	page: number, // 1 based
	pageSize: number,
	sortOrder: string,
	status: string | null,
	alerts: string | null,
	authors: string | null,
): Promise<{
	data: {
		items: any[];
		totalCount: 0;
	};
	response: Response;
}> => {
	const sort = toSortCriteria(sortOrder);
	const offset = (page - 1) * pageSize;
	let url = `/v2/authoring-course-content?sort=${sort}&offset=${offset}&limit=${pageSize}`;
	if (status) {
		url += '&status=' + status;
	}
	if (alerts) {
		url += '&alerts=' + alerts;
	}
	if (authors) {
		url += '&authors=' + authors;
	}

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

export const getCourseContentTree = async (
	user: User,
	uid: string,
): Promise<{
	data: any;
	response: Response;
}> => {
	const url = `/v2/authoring-course-content/${uid}/tree`;

	return authenticatedFetch<any>(url, user.sessionKey);
};

export const createModule = async (
	user: User,
	parentUid: string,
	name: string,
	type: string,
): Promise<{
	data: any;
	response: Response;
}> => {
	const url = '/v2/authoring-modules';

	const body = {
		parentUid,
		name,
		type,
	};

	return authenticatedFetch<any>(url, user.sessionKey, 'POST', body);
};

export const updateModule = async (
	user: User,
	moduleUid: string,
	moduleData: any,
): Promise<{
	data: any;
	response: Response;
}> => {
	const url = `/v2/authoring-modules/${moduleUid}`;

	return authenticatedFetch<any>(url, user.sessionKey, 'PUT', moduleData);
};

export const createSection = async (
	user: User,
	courseContentUid: string,
	name: string,
): Promise<{
	data: any;
	response: Response;
}> => {
	const url = '/v2/authoring-sections';

	const body = {
		courseContentUid,
		name,
	};

	return authenticatedFetch<any>(url, user.sessionKey, 'POST', body);
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
		name: name || DEFAULT_COURSE_CONTENT_NAME,
	};
	return authenticatedFetch<any>(url, user.sessionKey, 'POST', body);
};

export const updateCourseContent = async (
	user: User,
	courseContent: CourseContent,
): Promise<{
	data: CourseContent;
	response: Response;
}> => {
	const url = `/v2/authoring-course-content/${courseContent.uid}`;

	return authenticatedFetch<any>(url, user.sessionKey, 'PUT', courseContent);
};

export const deleteCourse = async (
	user: User,
	courseContentUid: string,
): Promise<any> => {
	const url = `/v2/authoring-course-content/${courseContentUid}`;

	return authenticatedFetch<any>(url, user.sessionKey, 'DELETE');
};

export const bulkDeleteCourse = async (
	user: User,
	courses: string[],
	subAccount: string,
): Promise<any> => {
	const url = `/v2/authoring-course-content?subaccount=${subAccount}`;

	const body = {
		items: courses,
	};

	return authenticatedFetch<any>(url, user.sessionKey, 'DELETE', body);
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
	sortOrder: string,
): Promise<{
	data: {
		items: any[];
		totalCount: 0;
	};
	response: Response;
}> => {
	const sort = toSortCriteria(sortOrder);
	const url = `/v2/authoring-folders?sort=${sort}&includeUsage=true&paginate=true&offset=${
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
	data: {
		uid?: string;
	};
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

export const getModule = async (
	user: User,
	moduleUid: string,
	revision: number,
): Promise<{ data: Module; response: Response }> => {
	const url = `/v2/authoring-modules/${moduleUid}?revision=${revision}`;

	return authenticatedFetch<any>(url, user.sessionKey, 'GET');
};
