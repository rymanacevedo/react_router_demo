import { ActionFunction } from 'react-router';
import { z } from 'zod';
import { badRequest } from '../services/utils';
import { postFeedback } from '../services/learning';
import { requireUser } from '../utils/user';

const QuestionFeedbackFieldsSchema = z
	.object({
		id: z.number().min(1),
		courseKey: z.string().min(1).nullable(), // Allow null values
		assignmentKey: z.string().min(1),
		questionUid: z.string().min(1),
		questionVersionId: z.number().min(1),
		feedback: z.string(),
		feedbackType: z.string().min(1),
		discipline: z.enum(['Standard', 'Healthcare']), // Keep the minimum length restriction
	})
	.superRefine(({ feedbackType, feedback }, ctx) => {
		if (feedbackType === 'other' && feedback.length === 0) {
			ctx.addIssue({
				code: z.ZodIssueCode.custom,
				message: 'Feedback is required',
			});
		}
	});

export type QuestionFeedbackFields = z.infer<
	typeof QuestionFeedbackFieldsSchema
>;
export const questionFeedbackAction: ActionFunction = async ({ request }) => {
	const cloneData = request.clone();
	const user = requireUser();
	// TODO: how do we handle undefined subaccount
	let subaccount = '';
	for (let i = 0; i < user.roles.length; i++) {
		if (user.roles[i].name === 'Learner') {
			subaccount = user.roles[i].accountKey;
			break;
		}
	}

	const formData = await cloneData.formData();
	const fields = Object.fromEntries(
		formData.entries(),
	) as unknown as QuestionFeedbackFields;

	const modifiedFields = {
		...fields,
		id: Number(fields.id),
		questionVersionId: Number(fields.questionVersionId),
		courseKey: fields.courseKey === '' ? null : fields.courseKey,
	};

	const result = QuestionFeedbackFieldsSchema.safeParse(modifiedFields);
	if (!result.success) {
		return badRequest({
			fields,
			errors: result.error.flatten(),
		});
	}

	const feedback = await postFeedback(user, modifiedFields, subaccount);

	console.log(feedback);

	return null;
};
