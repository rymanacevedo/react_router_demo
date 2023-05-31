import { ActionFunction } from 'react-router';
import { z } from 'zod';
import { badRequest } from '../services/utils';

const QuestionFeedbackFieldsSchema = z
	.object({
		id: z.string().min(1),
		courseKey: z.string().min(1),
		assignmentKey: z.string().min(1),
		questionUid: z.string().min(1),
		questionVersionId: z.number().min(1),
		feedback: z.string(),
		feedbackType: z.string().min(1),
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
	const formData = await cloneData.formData();
	const fields = Object.fromEntries(
		formData.entries(),
	) as unknown as QuestionFeedbackFields;

	const result = QuestionFeedbackFieldsSchema.safeParse(fields);
	if (!result.success) {
		return badRequest({
			fields,
			errors: result.error.flatten(),
		});
	}

	return null;
};
