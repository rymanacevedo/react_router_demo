import { Answer } from '../../ui/MultipleChoiceAnswers';

export interface SelectedAnswers {
	answerId: number | string;
	confidence: number;
	selectedOptionId: number;
	self: any;
}

export interface AnswerData {
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
}

export interface QuestionInFocus {
	id: string | number;
	questionRc: any;
	name?: string;
	introductionRc?: any;
	publishedQuestionId: number | string;
	answerList: {
		answerRc: string;
		id: string | number;
	}[];
}

export interface CurrentRoundQuestionListData {
	id: number | string;
	questionList: QuestionInFocus[];
}

export interface CurrentRoundAnswerOverLayData {
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
}
