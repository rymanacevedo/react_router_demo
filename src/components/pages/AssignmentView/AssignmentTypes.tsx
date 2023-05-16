import { Answer } from '../../ui/MultipleChoiceAnswers';

export type SelectedAnswers = {
	answerId: number | string;
	confidence: number;
	selectedOptionId: number;
	self: any;
};

export type ApiRes = {
	items: Item[];
};

export type Item = {
	publishedQuestionUri: string;
	answerHistory: AnswerHistory[];
};

export type AnswerHistory = {
	roundNumber: number;
	confidence: Confidence | null;
	correctness: Correctness | null;
};

export type AnswerData = {
	answerDate: string;
	answerList: Answer[];
	avatarMessage: any;
	completionAlgorithmType: any;
	completionPercentage: number;
	confidence: Confidence | null;
	correctAnswerIds: any;
	correctness: Correctness | null;
	informedCount: number;
	masteredQuestionCount: number;
	misinformedCount: number;
	moduleComplete: boolean;
	notSureCount: number;
	onceCorrectCount: number;
	questionSeconds: number;
	questionsMastered: number;
	reviewSeconds: number;
	self: any;
	totalQuestionCount: number;
	twiceCorrectCount: number;
	uninformedCount: number;
	unseenCount: number;
};

export type QuestionInFocus = {
	id: string | number;
	questionRc: string;
	name?: string;
	reviewSeconds: number;
	introductionRc?: string;
	explanationRc?: string;
	moreInformationRc?: string;
	publishedQuestionId: number | string;
	answerList: {
		answerRc: string;
		displayOrder: number;
		id: number;
		isCorrect: boolean;
		optionRc: string | null;
		publishedAnswerId: number | string;
		publishedAnswerUri: string;
		publishedOptionId: number | null;
		publishedOptionUri: string | null;
		publishedQuestionUri: string;
		questionId: number;
		questionVersionId: number;
		selected: boolean;
		selectedOptionId: number | null;
		selectedOptionUri: string | null;
		self: string;
		uid: string;
		versionId: number;
	}[];
	answered: boolean;
	confidence: Confidence | null;
	correctness: Correctness | null;
	difficultyScore: number;
	displayOrder: number;
	flagged: boolean;
	hasModuleIntroduction: boolean | undefined;
	hideQuestionIntroImages: boolean;
	interactiveState: any | null;
	pointsWorth: number;
	publishedLearningUnitUri: string;
	publishedQuestionAuthoringKey: string;
	publishedQuestionUri: string;
	questionType: string;
	questionVersionId: number;
	quizSeconds: number;
};

export type CurrentRoundQuestionListData = {
	totalQuestionCount: any;
	masteredQuestionCount: any;
	notSureCount: any;
	uninformedCount: any;
	informedCount: any;
	misinformedCount: any;
	roundNumber: number;
	roundPhase: string;
	unseenCount: any;
	id: number | string;
	questionList: QuestionInFocus[];
	seenCount: number | any;
};

export type CurrentRoundAnswerOverLayData = {
	self: null;
	totalQuestionCount: number;
	masteredQuestionCount: number;
	unseenCount: number;
	misinformedCount: number;
	uninformedCount: number;
	notSureCount: number;
	informedCount: number;
	onceCorrectCount: number;
	twiceCorrectCount: number;
	completionPercentage: number;
	completionAlgorithmType: string;
	questionsMastered: number;
	questionSeconds: number;
	reviewSeconds: number;
	answerDate: string;
	correctness: Correctness | null;
	confidence: Confidence | null;
	correctAnswerIds: number[];
	moduleComplete: boolean;
	avatarMessage: null;
	answerList: {
		self: null;
		answerId: number;
		confidence: number;
		selectedOptionId: number;
		answerConfidence: string;
	}[];
};

type LearningUnitQuestionAnswer = {
	answerRc: string;
	id: number;
	isCorrect: boolean;
	optionRc: null;
	self: string;
	uid: string;
	versionId: number;
};

export type LearningUnitQuestion = {
	answers: LearningUnitQuestionAnswer[];
	explanationRc: null;
	hasModalIntroduction: boolean;
	id: number;
	introductionRc: null;
	learningUnitId: number;
	learningUnitUid: string;
	learningUnitUri: string;
	learningUnitVersionId: number;
	name: string;
	questionRc: string;
	questionType: string;
	self: string;
	uid: string;
	versionId: number;
};

export type ModuleDataLearningUnit = {
	id: number;
	introductionRc: null;
	moreInformationRc: null;
	name: string;
	questions: LearningUnitQuestion[];
	self: string;
	uid: string;
	versionId: number;
};

export type ModuleData = {
	[key: string]: any;
	accountUri: string;
	children: null;
	customizations: any[];
	descriptionRc: null;
	id: number;
	introductionRc: string | null;
	isAllowTimeIncrease: boolean;
	isCustomMessagesEnabled: boolean;
	isRecommendedModulesEnabled: boolean;
	key: string;
	kind: string;
	learningUnits: ModuleDataLearningUnit[];
	locale: string;
	name: string;
	outroButtonText: string | null;
	outroLink: string | null;
	outroRc: string | null;
	ownerAccountUid: string;
	publishedVersionId: null;
	self: string;
	timeAllotted: null;
	timedAssessment: boolean;
	uid: string;
	versionId: number;
};

export enum Confidence {
	NotSure = 'NotSure',
	OneAnswerPartSure = 'OneAnswerPartSure',
	Sure = 'Sure',
}

export enum Correctness {
	Incorrect = 'Incorrect',
	NoAnswerSelected = 'NoAnswerSelected',
	Correct = 'Correct',
}

export type TransformedQuestion = LearningUnitQuestion & {
	answerHistory: AnswerHistory[];
};

export type QuizMessage = {
	FIVE_FAST_ANSWERS: number;
	FIVE_CONSEC_SI: number;
	SIX_DK_IN_ROUND: number;
	FIVE_CONSEC_SC: number;
	FULL_ROUND_OF_SC: number;
	FIVE_FAST_REVIEWS: number;
	TWO_FAST_REVIEWS_IN_LU: {
		questionId: number;
		fastReviewsOnQuestion: number;
	}[];
	TEN_LONG_REVIEWS: number;
	TWO_NPA_IN_ROUND: number;
	TWO_IDENTICAL_SI: {
		questionId: number;
		siCount: number;
		answerIdArray: number[];
	}[];
	TWO_NPA_ON_LU: {
		questionId: number;
		seenCount: number;
		npaCount: number;
	}[];
};
