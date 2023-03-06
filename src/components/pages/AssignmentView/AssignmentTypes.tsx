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
	confidence: string;
	correctness: string;
};

export type AnswerData = {
	answerDate: string;
	answerList: Answer[];
	avatarMessage: any;
	completionAlgorithmType: any;
	completionPercentage: number;
	confidence: any;
	correctAnswerIds: any;
	correctness: any;
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
	questionRc: any;
	name?: string;
	introductionRc?: any;
	publishedQuestionId: number | string;
	answerList: {
		answerRc: string;
		id: string | number;
	}[];
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
	correctness: string;
	confidence: string;
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
