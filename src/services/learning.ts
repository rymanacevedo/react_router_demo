import { authenticatedFetch } from './utils';
import { User } from './user';
import {
	AnswerData,
	AssignmentData,
	ModuleData,
	RoundData,
} from '../lib/validator';
import { QuestionFeedbackFields } from '../routes/QuestionFeedback';
import { API } from '../lib/environment';

export const getCourseList = async (
	user: any,
	courseRole: any,
	subAccount: any,
): Promise<{
	data: {
		items: any[];
	};
	response: Response;
}> => {
	const url = `/v2/courses?courseRole=${courseRole}&userKey=${user.userKey}&sort=name%20ASC,displayName%20ASC&subaccount=${subAccount}`;

	return authenticatedFetch<any>(url, user.sessionKey);
};

export const getCurriculaCourseList = async (
	user: User,
	courseKey: string,
	subAccount: string,
): Promise<{
	data: {
		items: any[];
	};
	response: Response;
}> => {
	const url = `/v2/courses/${courseKey}/course-curricula?subaccount=${subAccount}`;
	return authenticatedFetch<any>(url, user.sessionKey);
};

export const getAssignments = async (
	courseCurricKey: string,
	user: User,
	subAccount: string,
): Promise<{
	data: AssignmentData;
	response: Response;
}> => {
	const url = `/v2/user-associations?courseCurricKey=${courseCurricKey}&userKey=${user.userKey}&hideUnassigned=false&isWebapp=true&subaccount=${subAccount}`;
	return authenticatedFetch<AssignmentData>(url, user.sessionKey);
};

const getAssignmentContent = async (
	user: User,
	subAccount: string,
	assignmentKey: string | undefined,
): Promise<{ data: AssignmentData; response: Response }> => {
	const url = `/v2/assignments/${assignmentKey}?includeTimePerLU=true&subaccount=${subAccount}`;

	return authenticatedFetch<AssignmentData>(url, user.sessionKey);
};

export const getModuleContent = async (
	user: User,
	subAccount: string,
	assignmentKey: string | undefined,
): Promise<{
	assignmentData: AssignmentData;
	moduleData: ModuleData;
}> => {
	const { data: assignmentData } = await getAssignmentContent(
		user,
		subAccount,
		assignmentKey,
	);
	const { data: moduleData } = await authenticatedFetch<ModuleData>(
		assignmentData.moduleUri,
		user.sessionKey,
	);

	return { assignmentData, moduleData };
};

export const getFullModuleWithQuestions = async (
	user: User,
	subAccount: string,
	assignmentKey: string | undefined,
) => {
	const { assignmentData, moduleData } = await getModuleContent(
		user,
		subAccount,
		assignmentKey,
	);
	const { data: moduleInfoAndQuestions } = await authenticatedFetch<ModuleData>(
		`${moduleData.self}?deep=true&subaccount=${subAccount}`,
		user.sessionKey,
	);

	return { assignmentData, moduleData, moduleInfoAndQuestions };
};

export const getCurrentRound = async (
	user: User,
	subAccount: string,
	assignmentKey: string | undefined,
): Promise<{ data: RoundData; response: Response }> => {
	const url = `/v2/assignments/${assignmentKey}/current-round?isWebApp=true&subaccount=${subAccount}`;

	return authenticatedFetch<RoundData>(url, user.sessionKey);
};

export const getAnswerHistory = async (
	user: User,
	subAccount: string,
	assignmentKey: string | undefined,
): Promise<{ data: any; response: Response }> => {
	const url = `/v2/assignments/${assignmentKey}/answer-history?subaccount=${subAccount}`;

	return authenticatedFetch<any>(url, user.sessionKey);
};

export const putCurrentRound = async (
	user: User,
	roundId: string,
	questionId: string,
	answerData: AnswerData,
	subAccount: string,
): Promise<
	{ data: AnswerData; response: Response } | { data: any; response: Response }
> => {
	const url = `/v2/rounds/${roundId}/questions/${questionId}/response?isWebApp=true&subaccount=${subAccount}`;

	return authenticatedFetch<AnswerData>(
		url,
		user.sessionKey,
		'PUT',
		answerData,
	);
};

export const postFeedback = async (
	user: User,
	fields: QuestionFeedbackFields,
	subAccount: string,
): Promise<any> => {
	const url = `${API}/v2/curricula/questions/feedback?subaccount=${subAccount}`;
	const body = {
		id: fields.id,
		courseKey: fields.courseKey,
		assignmentKey: fields.assignmentKey,
		questionUid: fields.questionUid,
		questionVersionId: fields.questionVersionId,
		feedback: fields.feedback,
		feedbackType: fields.feedbackType,
		discipline: fields.discipline,
	};
	return authenticatedFetch(url, user.sessionKey, 'POST', body);
};
