import { z } from 'zod';
import {
	Confidence,
	Correctness,
} from '../components/pages/AssignmentView/AssignmentTypes';

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

// there is an issue with recursive-types in typescript
// https://zod.dev/?id=recursive-types
const BaseChildSchema = z.object({
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
	assignments: z.array(AssignmentDataSchema).optional(),
	learnerProgress: z.number(),
});

export type Curriculum = z.infer<typeof BaseChildSchema> & {
	children: Curriculum[];
};

const ChildSchema: z.ZodSchema<Curriculum> = BaseChildSchema.extend({
	children: z.lazy(() => ChildSchema.array()),
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

const AssignmentSchema = z.object({
	assignments: RootSchema,
});

const LearningUnitQuestionAnswerSchema = z.object({
	self: z.string(),
	id: z.union([z.string(), z.number()]),
	publishedAnswerId: z.union([z.string(), z.number()]),
	uid: z.string(),
	versionId: z.number(),
	answerRc: z.string(),
	optionRc: z.string(),
	isCorrect: z.boolean(),
});

// Zod schema for LearningUnitQuestion
const LearningUnitQuestionSchema = z.object({
	answers: z.array(LearningUnitQuestionAnswerSchema),
	explanationRc: z.string().nullable(),
	hasModuleIntroduction: z.boolean(),
	id: z.union([z.string(), z.number()]),
	introductionRc: z.string().nullable(),
	learningUnitId: z.number(),
	learningUnitUid: z.string(),
	learningUnitUri: z.string(),
	learningUnitVersionId: z.number(),
	name: z.string(),
	questionRc: z.string(),
	questionType: z.string(),
	self: z.string(),
	uid: z.string(),
	versionId: z.number(),
});

// Zod schema for LearningUnit
const LearningUnitSchema = z.object({
	id: z.number(),
	introductionRc: z.string(),
	moreInformationRc: z.string(),
	name: z.string(),
	questions: z.array(LearningUnitQuestionSchema),
	self: z.string(),
	uid: z.string(),
	versionId: z.number(),
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
	items: z.array(z.any()).optional(),
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

export const ConfidenceSchema = z.enum([
	Confidence.NA,
	Confidence.NotSure,
	Confidence.PartSure,
	Confidence.OneAnswerPartSure,
	Confidence.Sure,
]);

// Zod schema for Correctness enum
export const CorrectnessSchema = z.enum([
	Correctness.NoAnswer,
	Correctness.Incorrect,
	Correctness.NoAnswerSelected,
	Correctness.Correct,
]);

export const QuestionInFocusAnswerSchema = z.object({
	answerRc: z.string(),
	displayOrder: z.number(),
	id: z.number(),
	isCorrect: z.boolean().optional(),
	optionRc: z.string().nullable(),
	publishedAnswerId: z.union([z.number(), z.string()]),
	publishedAnswerUri: z.string(),
	publishedOptionId: z.union([z.number().nullable(), z.string().nullable()]),
	publishedOptionUri: z.string().nullable(),
	publishedQuestionUri: z.string(),
	questionId: z.number(),
	questionVersionId: z.number(),
	selected: z.boolean(),
	selectedOptionId: z.union([z.number().nullable(), z.string().nullable()]),
	selectedOptionUri: z.string().nullable(),
	self: z.string(),
	uid: z.string(),
	versionId: z.number(),
});
export const QuestionInFocusSchema = z.object({
	id: z.union([z.string(), z.number()]),
	questionRc: z.string(),
	name: z.string().optional(),
	reviewSeconds: z.number(),
	introductionRc: z.string().nullable(),
	explanationRc: z.string().nullable(),
	moreInformationRc: z.string().nullable(),
	publishedQuestionId: z.union([z.number(), z.string()]),
	answerList: z.array(QuestionInFocusAnswerSchema),
	answered: z.boolean(),
	confidence: ConfidenceSchema.nullable(), // Replace `Confidence` with the appropriate type if available
	correctness: CorrectnessSchema.nullable(), // Replace `Correctness` with the appropriate type if available
	difficultyScore: z.number(),
	displayOrder: z.number(),
	flagged: z.boolean(),
	hasModuleIntroduction: z.boolean().optional(),
	hideQuestionIntroImages: z.boolean(),
	interactiveState: z.any().nullable(),
	pointsWorth: z.number(),
	publishedLearningUnitUri: z.string(),
	publishedQuestionAuthoringKey: z.string(),
	publishedQuestionUri: z.string(),
	questionType: z.string(),
	questionVersionId: z.number(),
	quizSeconds: z.number(),
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
	timeRemaining: z.number().nullable(),
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

const RootCourseStatsSchema = z.object({
	averageProgress: z.number(),
	averageTimeSpent: z.number(),
	averageNumRefreshers: z.number(),
	averageStartingKnowledge: z.number(),
	learnerProgress: z.number(),
	learnerTimeSpent: z.number(),
	learnerNumRefreshers: z.number(),
	learnerStartingKnowledge: z.number(),
});

export const CourseStatsSchema = z.object({
	courseStats: RootCourseStatsSchema,
});

export type Answer = z.infer<typeof AnswerSchema>;
export type AnswerHistory = z.infer<typeof AnswerHistorySchema>;
export type AnswerData = z.infer<typeof AnswerDataSchema>;
export type AssignmentData = z.infer<typeof AssignmentDataSchema>;
export type LearningUnit = z.infer<typeof LearningUnitSchema>;
export type LearningUnitQuestion = z.infer<typeof LearningUnitQuestionSchema>;
export type QuestionInFocus = z.infer<typeof QuestionInFocusSchema>;
export type QuestionInFocusAnswer = z.infer<typeof QuestionInFocusAnswerSchema>;
export type RoundData = z.infer<typeof RoundDataSchema>;
export type ModuleData = z.infer<typeof ModuleDataSchema>;
export type RootData = z.infer<typeof RootSchema>;
export type CourseAssignmentData = z.infer<typeof AssignmentSchema>;
export type CourseStatsData = z.infer<typeof CourseStatsSchema>;
