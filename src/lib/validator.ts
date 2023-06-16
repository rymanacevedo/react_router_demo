import { z } from 'zod';

export const RegisterSchema = z
	.object({
		firstName: z.string().min(1),
		lastName: z.string().min(1),
		emailAddress: z.string().email(),
		username: z.string().min(1),
		password: z.string().min(1),
		confirmPassword: z.string().min(1),
		accountUid: z.string().min(1),
		subAccount: z.string().min(1),
		userAltKey: z.string().optional(),
		'g-recaptcha-response': z.string().refine((value) => value.length > 0, {
			message: 'Please complete the CAPTCHA',
		}),
	})
	.superRefine(({ confirmPassword, password }, ctx) => {
		// setErrorMessage(i18n('passwordsDoNotMatch'));
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'Your passwords do not match',
			});
		}

		if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password)) {
			ctx.addIssue({
				code: 'custom',
				message:
					'Your password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
			});
		}
	});
export const AssignmentDataSchema = z.object({
	self: z.string(),
	assignmentUid: z.string(),
	status: z.string(),
	assignmentType: z.string(),
	completionAlgorithmType: z.string(),
	learningUnitsCorrect2x: z.number(),
	learningUnitsUnseen: z.number(),
	learningUnitsMisinformed: z.number(),
	learningUnitsUninformed: z.number(),
	learningUnitsNotSure: z.number(),
	learningUnitsInformed: z.number(),
	learningUnitsCorrect1x: z.number(),
	numCompletedLearningUnits: z.number(),
	estimatedTimeToComplete: z.number(),
	numLearningUnits: z.number(),
	startedTimestamp: z.string(),
	createdTimestamp: z.string(),
	effectiveTimestamp: z.string().nullable(),
	completedTimestamp: z.string().nullable(),
	expiresTimestamp: z.string().nullable(),
	canceledTimestamp: z.string().nullable(),
	canCreateFocusedRefresher: z.boolean(),
	learningUnitsProficient: z.number(),
	learningUnitsMastered: z.number(),
	assignmentKey: z.string(),
	registrationKey: z.string(),
	moduleKey: z.string(),
	moduleUid: z.string(),
	moduleVersionId: z.number(),
	assignmentStatus: z.string(),
	timePerLU: z.number(),
	moduleUri: z.string(),
	registrationUri: z.string(),
	userUri: z.string(),
	classroomUri: z.string(),
	items: z.array(z.any()).optional(),
});

const ChildSchema = z.object({
	curricKey: z.string(),
	curricUid: z.string(),
	name: z.string(),
	version: z.number(),
	kind: z.string(),
	descriptionRc: z.string().nullable(),
	locale: z.string(),
	estimatedTimeToComplete: z.number(),
	estimatedTimeToCompleteRequired: z.number(),
	learningUnitCount: z.number(),
	totalLearningUnits: z.number(),
	totalCompletedLearningUnits: z.number(),
	totalRequiredLearningUnits: z.number(),
	totalCompletedRequiredLearningUnits: z.number(),
	totalCompletedAssignments: z.number(),
	totalEstimatedAssignments: z.number(),
	totalNotEstimatedAssignments: z.number(),
	totalOtherAssignments: z.number(),
	moduleStatus: z.string(),
	defaultAllottedTime: z.number(),
	isSingleAssignment: z.boolean(),
	assignments: z.array(AssignmentDataSchema),
	learnerProgress: z.number(),
});

const DisplayCurriculumSchema = z.object({
	curricKey: z.string(),
	curricUid: z.string(),
	name: z.string(),
	version: z.number(),
	kind: z.string(),
	descriptionRc: z.string().nullable(),
	locale: z.string(),
	estimatedTimeToComplete: z.number(),
	estimatedTimeToCompleteRequired: z.number(),
	totalLearningUnits: z.number(),
	totalCompletedLearningUnits: z.number(),
	totalRequiredLearningUnits: z.number(),
	totalCompletedRequiredLearningUnits: z.number(),
	totalCompletedAssignments: z.number(),
	totalEstimatedAssignments: z.number(),
	totalNotEstimatedAssignments: z.number(),
	totalOtherAssignments: z.number(),
	showModuleStatus: z.boolean(),
	defaultAllottedTime: z.number(),
	isSingleAssignment: z.boolean(),
	children: z.array(ChildSchema),
	learnerProgress: z.number(),
});

const RootSchema = z.object({
	displayCurriculum: DisplayCurriculumSchema,
	assignmentStatistics: z.any().nullable(),
	reviewHeaderResource: z.any().nullable(),
	items: z.array(z.any()).optional(),
});

export const AnswerListDataSchema = z.object({
	self: z.string(),
	id: z.union([z.string(), z.number()]),
	publishedAnswerId: z.union([z.string(), z.number()]),
	uid: z.string(),
	versionId: z.number(),
	answerRc: z.string(),
	optionRc: z.string(),
	isCorrect: z.boolean(),
});
export const QuestionSchema = z.object({
	self: z.string(),
	id: z.union([z.string(), z.number()]),
	uid: z.string(),
	versionId: z.number(),
	questionRc: z.string(),
	introductionRc: z.any(),
	explanationRc: z.any(),
	name: z.string(),
	hasModuleIntroduction: z.boolean(),
	answers: z.array(AnswerListDataSchema),
	questionType: z.string(),
	learningUnitId: z.number(),
	learningUnitUid: z.string(),
	learningUnitVersionId: z.number(),
	learningUnitUri: z.string(),
});
export const LearningUnitSchema = z.object({
	self: z.string(),
	id: z.number(),
	uid: z.string(),
	versionId: z.number(),
	name: z.string(),
	introductionRc: z.any(),
	moreInformationRc: z.any(),
	questions: z.array(QuestionSchema),
});
export const ModuleDataSchema = z.object({
	self: z.string(),
	key: z.string(),
	uid: z.string(),
	id: z.number(),
	versionId: z.number(),
	name: z.string(),
	kind: z.string(),
	accountUri: z.string(),
	ownerAccountUid: z.string(),
	introductionRc: z.any(),
	outroRc: z.any(),
	outroButtonText: z.any(),
	outroLink: z.any(),
	descriptionRc: z.any(),
	locale: z.string(),
	children: z.any(),
	moduleUri: z.union([z.string(), z.null()]).optional(),
	learningUnits: z.array(LearningUnitSchema),
	customizations: z.array(z.any()),
	timedAssessment: z.boolean(),
	timeAllotted: z.any(),
	isAllowTimeIncrease: z.boolean(),
	isRecommendedModulesEnabled: z.boolean(),
	isCustomMessagesEnabled: z.boolean(),
	publishedVersionId: z.any(),
});
export const AnswerHistorySchema = z.object({
	roundNumber: z.number(),
	confidence: z.string(),
	correctness: z.string(),
});
export const AnswerSchema = z.object({
	self: z.union([z.string(), z.null()]),
	answerId: z.union([z.number(), z.string()]),
	confidence: z.number(),
	selectedOptionId: z.number(),
});
export const AnswerDataSchema = z.object({
	self: z.union([z.string(), z.null()]),
	totalQuestionCount: z.number(),
	masteredQuestionCount: z.number(),
	unseenCount: z.number(),
	misinformedCount: z.number(),
	uninformedCount: z.number(),
	notSureCount: z.number(),
	informedCount: z.number(),
	onceCorrectCount: z.number(),
	twiceCorrectCount: z.number(),
	completionPercentage: z.number(),
	completionAlgorithmType: z.union([z.string(), z.null()]),
	questionsMastered: z.number(),
	questionSeconds: z.number(),
	reviewSeconds: z.number(),
	answerDate: z.string(),
	correctness: z.union([z.string(), z.null()]),
	confidence: z.union([z.string(), z.null()]),
	correctAnswerIds: z.union([z.array(z.number()), z.null()]),
	moduleComplete: z.boolean(),
	avatarMessage: z.null(),
	answerList: z.array(AnswerSchema),
});
export const QuestionInFocusAnswerSchema = z.object({
	answerRc: z.string(),
	optionRc: z.string(),
	publishedAnswerId: z.union([z.string(), z.number()]),
	id: z.union([z.string(), z.number()]),
});
export const QuestionInFocusSchema = z.object({
	id: z.union([z.string(), z.number()]),
	questionRc: z.string(),
	name: z.string().optional(),
	answered: z.boolean(),
	questionType: z.string().optional(),
	explanationRc: z.string().optional(),
	hasModalIntroduction: z.boolean().optional(),
	introductionRc: z.any().optional(),
	publishedQuestionId: z.union([z.number(), z.string()]),
	answerList: z.array(QuestionInFocusAnswerSchema),
});
export const RoundDataSchema = z.object({
	totalQuestionCount: z.any(),
	masteredQuestionCount: z.any(),
	notSureCount: z.any(),
	uninformedCount: z.any(),
	informedCount: z.any(),
	misinformedCount: z.any(),
	roundNumber: z.number(),
	roundPhase: z.string(),
	unseenCount: z.any(),
	id: z.union([z.number(), z.string()]),
	questionList: z.array(QuestionInFocusSchema),
	seenCount: z.union([z.number(), z.any()]),
});
export const LearningRoundSchema = z.object({
	subAccount: z.string(),
	assignmentKey: z.string(),
});
export const LearningRoundPutSchema = z.object({
	subAccount: z.string(),
	assignmentKey: z.string(),
	roundId: z.string(),
	questionId: z.string(),
	answerData: AnswerDataSchema,
});
export type Answer = z.infer<typeof AnswerSchema>;
export type AnswerHistory = z.infer<typeof AnswerHistorySchema>;
export type AnswerList = z.infer<typeof AnswerListDataSchema>;
export type AnswerData = z.infer<typeof AnswerDataSchema>;
export type AssignmentData = z.infer<typeof AssignmentDataSchema>;
export type LearningUnit = z.infer<typeof LearningUnitSchema>;
export type QuestionType = z.infer<typeof QuestionSchema>;
export type QuestionInFocus = z.infer<typeof QuestionInFocusSchema>;
export type QuestionInFocusAnswer = z.infer<typeof QuestionInFocusAnswerSchema>;
export type RoundData = z.infer<typeof RoundDataSchema>;
export type ModuleData = z.infer<typeof ModuleDataSchema>;
export type RootData = z.infer<typeof RootSchema>;
