import { ActionFunction } from 'react-router-dom';
import {
	TimedAssessmentFields,
	TimedAssessmentFieldsSchema,
} from '../TimedAssessment';
import { badRequest, getSubAccount } from '../../services/utils';
import { postTimedAssessmentAnswer } from '../../services/learning';
import { requireUser } from '../../utils/user';
import { User } from '../../services/user';

export const timedAssessmentAction: ActionFunction = async ({ request }) => {
	// {"secondsSpent":1350.909,"answerUpdated":false,"questionType":"MultipleChoice","flagged":false,"confidence":"NA"}
	const cloneData = request.clone();
	const formData = await cloneData.formData();
	let user = formData.get('user');
	let parsedUser: User | null = null;
	if (user !== null) {
		parsedUser = JSON.parse(user as string) as User;
	}
	if (!parsedUser) {
		parsedUser = requireUser();
	}
	const { subAccount } = getSubAccount(parsedUser);
	const fields = Object.fromEntries(
		formData.entries(),
	) as unknown as TimedAssessmentFields;
	let answers = [];

	if (fields.answerUpdated.toString() === 'true' && fields.answerChoice) {
		answers.push({
			answerId: Number(fields.answerChoice),
		});
	}

	// remove user from fields
	if (fields.user) {
		delete fields.user;
	}

	const modifiedFields = {
		...fields,
		answerChoice: fields.answerChoice ? Number(fields.answerChoice) : undefined,
		answers: answers.length > 0 ? answers : [],
		questionId: Number(fields.questionId),
		secondsSpent: Number(fields.secondsSpent),
		answerUpdated: fields.answerUpdated.toString() === 'true',
		flagged: fields.flagged.toString() === 'true',
	};

	const result = TimedAssessmentFieldsSchema.safeParse(modifiedFields);
	if (!result.success) {
		return badRequest({
			fields,
			errors: result.error.flatten(),
		});
	}
	const { data, response } = await postTimedAssessmentAnswer(
		modifiedFields,
		parsedUser,
		modifiedFields.timedAssessmentKey,
		modifiedFields.questionId,
		subAccount,
	);

	return { data, response };
};
