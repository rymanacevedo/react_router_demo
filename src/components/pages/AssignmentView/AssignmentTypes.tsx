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
	answerList: {
	  answerRc: string;
	  displayOrder: number;
	  id: number;
	  isCorrect: boolean;
	  optionRc: string | null;
	  publishedAnswerId: number;
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
	confidence: string;
	correctness: string;
	difficultyScore: number;
	displayOrder: number;
	explanationRc: string | null;
	flagged: boolean;
	hasModuleIntroduction: boolean | undefined;
	hideQuestionIntroImages: boolean;
	id: number;
	interactiveState: any | null;
	introductionRc: string | null;
	moreInformationRc: string | null;
	name: string;
	pointsWorth: number;
	publishedLearningUnitUri: string;
	publishedQuestionAuthoringKey: string;
	publishedQuestionId: number;
	publishedQuestionUri: string;
	questionRc: string;
	questionType: string;
	questionVersionId: number;
	quizSeconds: number;
	reviewSeconds: number;
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
