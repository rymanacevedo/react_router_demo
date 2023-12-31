const questionDataMock = {
	self: 'http://localapi.amplifire.me:8080/v2/curricula/modules/727528d6-64d6-4cff-b2b8-3a320c15a779/version/3',
	key: 'RSD57A6QF-3',
	uid: '727528d6-64d6-4cff-b2b8-3a320c15a779',
	id: 2066,
	versionId: 3,
	name: 'a new module',
	kind: 'Module',
	accountUri:
		'http://localapi.amplifire.me:8080/v2/accounts/93110891-3822-41e5-bb15-45284ebe8f96',
	ownerAccountUid: '93110891-3822-41e5-bb15-45284ebe8f96',
	introductionRc: '<p>some new module intro content</p>\n',
	outroRc: null,
	outroButtonText: null,
	outroLink: null,
	descriptionRc: '<p>a new module dsiplay curriculum</p>\n',
	locale: 'en',
	children: null,
	learningUnits: [
		{
			self: 'http://localapi.amplifire.me:8080/v2/curricula/learningunits/1af6a5dc-7608-49c4-b9ee-a8089f5078b1/version/2',
			id: 18704,
			uid: '1af6a5dc-7608-49c4-b9ee-a8089f5078b1',
			versionId: 2,
			name: 'Add1 - Copy',
			introductionRc: null,
			moreInformationRc: null,
			questions: [
				{
					self: 'http://localapi.amplifire.me:8080/v2/curricula/questions/de12173b-391c-4ae0-9ec4-944b1b7f1393/version/2',
					id: 19589,
					uid: 'de12173b-391c-4ae0-9ec4-944b1b7f1393',
					versionId: 2,
					questionRc: '<p>What causes the changing of the seasons?</p>\n',
					introductionRc: null,
					explanationRc: null,
					name: 'Add1 - Copy',
					hasModalIntroduction: false,
					answers: [
						{
							self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/d16aeed9-75d5-446c-b338-eba59057c705/version/1',
							id: 76969,
							uid: 'd16aeed9-75d5-446c-b338-eba59057c705',
							versionId: 1,
							answerRc: '<p><strong>2</strong></p>\n',
							optionRc: null,
						},
						{
							self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/dcab2cee-fba9-4e7f-8fe7-60b3abb4d4b6/version/1',
							id: 76970,
							uid: 'dcab2cee-fba9-4e7f-8fe7-60b3abb4d4b6',
							versionId: 1,
							answerRc:
								'<p>Seasons are caused by the tilt of the earth on its axis.</p>\n',
							optionRc: null,
						},
						{
							self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/7c73a85a-7599-4ed5-a630-9079bb95402c/version/1',
							id: 76971,
							uid: '7c73a85a-7599-4ed5-a630-9079bb95402c',
							versionId: 1,
							answerRc:
								// eslint-disable-next-line prettier/prettier
                                '<p>Seasons are caused by variations in the sun\'s temperature.</p>\n',
							optionRc: null,
						},
					],
					questionType: 'MultipleChoice',
					learningUnitId: 18704,
					learningUnitUid: '1af6a5dc-7608-49c4-b9ee-a8089f5078b1',
					learningUnitVersionId: 2,
					learningUnitUri:
						'http://localapi.amplifire.me:8080/v2/curricula/learningunits/1af6a5dc-7608-49c4-b9ee-a8089f5078b1/version/2',
				},
			],
		},
		{
			self: 'http://localapi.amplifire.me:8080/v2/curricula/learningunits/07033545-21c9-4119-865e-639832710867/version/2',
			id: 18706,
			uid: '07033545-21c9-4119-865e-639832710867',
			versionId: 2,
			name: 'Add1 - Copy - Copy',
			introductionRc: null,
			moreInformationRc: null,
			questions: [
				{
					self: 'http://localapi.amplifire.me:8080/v2/curricula/questions/0749f150-39b5-4ef3-80e0-f011da0b6cbc/version/2',
					id: 19591,
					uid: '0749f150-39b5-4ef3-80e0-f011da0b6cbc',
					versionId: 2,
					questionRc: '<p>What causes the changing of the seasons?</p>\n',
					introductionRc: null,
					explanationRc: null,
					name: 'Add1 - Copy - Copy',
					hasModalIntroduction: false,
					answers: [
						{
							self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/7fa7c2f8-bb1d-47cc-a292-091beeee2891/version/1',
							id: 76975,
							uid: '7fa7c2f8-bb1d-47cc-a292-091beeee2891',
							versionId: 1,
							answerRc: '<p><strong>2</strong></p>\n',
							optionRc: null,
						},
						{
							self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/244e10b7-3c39-405a-b89d-1aae992205e8/version/1',
							id: 76976,
							uid: '244e10b7-3c39-405a-b89d-1aae992205e8',
							versionId: 1,
							answerRc:
								'<p>Seasons are caused by the tilt of the earth on its axis.</p>\n',
							optionRc: null,
						},
						{
							self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/aa521747-d97c-4563-bd0c-1036b4613e44/version/1',
							id: 76977,
							uid: 'aa521747-d97c-4563-bd0c-1036b4613e44',
							versionId: 1,
							answerRc:
								"<p>Seasons are caused by variations in the sun's temperature.</p>\n",
							optionRc: null,
						},
					],
					questionType: 'MultipleChoice',
					learningUnitId: 18706,
					learningUnitUid: '07033545-21c9-4119-865e-639832710867',
					learningUnitVersionId: 2,
					learningUnitUri:
						'http://localapi.amplifire.me:8080/v2/curricula/learningunits/07033545-21c9-4119-865e-639832710867/version/2',
				},
			],
		},
		{
			self: 'http://localapi.amplifire.me:8080/v2/curricula/learningunits/22cf18c2-37c3-47c6-801a-5e30d7a00f3a/version/2',
			id: 18707,
			uid: '22cf18c2-37c3-47c6-801a-5e30d7a00f3a',
			versionId: 2,
			name: 'Add2 - Copy',
			introductionRc: null,
			moreInformationRc: null,
			questions: [
				{
					self: 'http://localapi.amplifire.me:8080/v2/curricula/questions/b2ca4d98-a3ab-4b7b-9416-a56d809a7926/version/2',
					id: 19592,
					uid: 'b2ca4d98-a3ab-4b7b-9416-a56d809a7926',
					versionId: 2,
					questionRc: '<p>2+2</p>\n',
					introductionRc: null,
					explanationRc: null,
					name: 'Add2 - Copy',
					hasModalIntroduction: false,
					answers: [
						{
							self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/b29b2962-8216-45bc-bbe1-498a490b685e/version/1',
							id: 76978,
							uid: 'b29b2962-8216-45bc-bbe1-498a490b685e',
							versionId: 1,
							answerRc: '<p><strong>4</strong></p>\n',
							optionRc: null,
						},
						{
							self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/e19eab65-7c83-428c-89bf-c6b98fd58b8f/version/1',
							id: 76979,
							uid: 'e19eab65-7c83-428c-89bf-c6b98fd58b8f',
							versionId: 1,
							answerRc: '<p>5</p>\n',
							optionRc: null,
						},
						{
							self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/ad722c15-e0c8-405c-8e36-8cc47f3c16bd/version/1',
							id: 76980,
							uid: 'ad722c15-e0c8-405c-8e36-8cc47f3c16bd',
							versionId: 1,
							answerRc: '<p>6</p>\n',
							optionRc: null,
						},
					],
					questionType: 'MultipleChoice',
					learningUnitId: 18707,
					learningUnitUid: '22cf18c2-37c3-47c6-801a-5e30d7a00f3a',
					learningUnitVersionId: 2,
					learningUnitUri:
						'http://localapi.amplifire.me:8080/v2/curricula/learningunits/22cf18c2-37c3-47c6-801a-5e30d7a00f3a/version/2',
				},
			],
		},
		{
			self: 'http://localapi.amplifire.me:8080/v2/curricula/learningunits/d7088e79-24aa-45d3-b644-d581d1758873/version/2',
			id: 18705,
			uid: 'd7088e79-24aa-45d3-b644-d581d1758873',
			versionId: 2,
			name: 'Add2 - Copy - Copy',
			introductionRc: null,
			moreInformationRc: null,
			questions: [
				{
					self: 'http://localapi.amplifire.me:8080/v2/curricula/questions/877e5b4c-fc7d-44bf-9b7c-3f9c58187dfe/version/2',
					id: 19590,
					uid: '877e5b4c-fc7d-44bf-9b7c-3f9c58187dfe',
					versionId: 2,
					questionRc: '<p>2+2</p>\n',
					introductionRc: null,
					explanationRc: null,
					name: 'Add2 - Copy - Copy',
					hasModalIntroduction: false,
					answers: [
						{
							self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/33e75bd9-0fbb-4dde-8b03-8a7254ec28b1/version/1',
							id: 76972,
							uid: '33e75bd9-0fbb-4dde-8b03-8a7254ec28b1',
							versionId: 1,
							answerRc: '<p><strong>4</strong></p>\n',
							optionRc: null,
						},
						{
							self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/4f2dc530-53e9-4e2f-85ce-505ea543c4a5/version/1',
							id: 76973,
							uid: '4f2dc530-53e9-4e2f-85ce-505ea543c4a5',
							versionId: 1,
							answerRc: '<p>5</p>\n',
							optionRc: null,
						},
						{
							self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/f85f8da0-cc55-45a3-a65e-7a2c207baa2d/version/1',
							id: 76974,
							uid: 'f85f8da0-cc55-45a3-a65e-7a2c207baa2d',
							versionId: 1,
							answerRc: '<p>6</p>\n',
							optionRc: null,
						},
					],
					questionType: 'MultipleChoice',
					learningUnitId: 18705,
					learningUnitUid: 'd7088e79-24aa-45d3-b644-d581d1758873',
					learningUnitVersionId: 2,
					learningUnitUri:
						'http://localapi.amplifire.me:8080/v2/curricula/learningunits/d7088e79-24aa-45d3-b644-d581d1758873/version/2',
				},
			],
		},
		{
			self: 'http://localapi.amplifire.me:8080/v2/curricula/learningunits/f2ce6c71-a1b5-4f83-8657-2989da4717ca/version/2',
			id: 18708,
			uid: 'f2ce6c71-a1b5-4f83-8657-2989da4717ca',
			versionId: 2,
			name: 'Add3 - Copy',
			introductionRc: null,
			moreInformationRc: null,
			questions: [
				{
					self: 'http://localapi.amplifire.me:8080/v2/curricula/questions/e661dbf5-2881-4995-b11f-30617976cf14/version/2',
					id: 19593,
					uid: 'e661dbf5-2881-4995-b11f-30617976cf14',
					versionId: 2,
					questionRc: '<p>3+3</p>\n',
					introductionRc: null,
					explanationRc: null,
					name: 'Add3 - Copy',
					hasModalIntroduction: false,
					answers: [
						{
							self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/28ee8b15-49bb-4f4f-b3ec-5f84de663a7c/version/1',
							id: 76981,
							uid: '28ee8b15-49bb-4f4f-b3ec-5f84de663a7c',
							versionId: 1,
							answerRc: '<p><strong>6</strong></p>\n',
							optionRc: null,
						},
						{
							self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/88d5bc26-1db5-4ca9-9b03-a5a8ae86a4c4/version/1',
							id: 76982,
							uid: '88d5bc26-1db5-4ca9-9b03-a5a8ae86a4c4',
							versionId: 1,
							answerRc: '<p>7</p>\n',
							optionRc: null,
						},
						{
							self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/7369ec0b-eaa6-4431-8dd7-eea23cc99264/version/1',
							id: 76983,
							uid: '7369ec0b-eaa6-4431-8dd7-eea23cc99264',
							versionId: 1,
							answerRc: '<p>8</p>\n',
							optionRc: null,
						},
					],
					questionType: 'MultipleChoice',
					learningUnitId: 18708,
					learningUnitUid: 'f2ce6c71-a1b5-4f83-8657-2989da4717ca',
					learningUnitVersionId: 2,
					learningUnitUri:
						'http://localapi.amplifire.me:8080/v2/curricula/learningunits/f2ce6c71-a1b5-4f83-8657-2989da4717ca/version/2',
				},
			],
		},
		{
			self: 'http://localapi.amplifire.me:8080/v2/curricula/learningunits/34aa4ad1-28ab-4d93-9b9e-f2860447f2fc/version/2',
			id: 18709,
			uid: '34aa4ad1-28ab-4d93-9b9e-f2860447f2fc',
			versionId: 2,
			name: 'Add3 - Copy - Copy',
			introductionRc: null,
			moreInformationRc: null,
			questions: [
				{
					self: 'http://localapi.amplifire.me:8080/v2/curricula/questions/34b4f5b3-8cac-467e-97c6-8d7a7bc42087/version/2',
					id: 19594,
					uid: '34b4f5b3-8cac-467e-97c6-8d7a7bc42087',
					versionId: 2,
					questionRc: '<p>3+3</p>\n',
					introductionRc: null,
					explanationRc: null,
					name: 'Add3 - Copy - Copy',
					hasModalIntroduction: false,
					answers: [
						{
							self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/e408eb00-273c-4835-b40c-bed2a16c0316/version/1',
							id: 76984,
							uid: 'e408eb00-273c-4835-b40c-bed2a16c0316',
							versionId: 1,
							answerRc: '<p><strong>6</strong></p>\n',
							optionRc: null,
						},
						{
							self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/1354b284-927e-4fe7-83ec-46e7e98a6b28/version/1',
							id: 76985,
							uid: '1354b284-927e-4fe7-83ec-46e7e98a6b28',
							versionId: 1,
							answerRc: '<p>7</p>\n',
							optionRc: null,
						},
						{
							self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/da6c815c-4d33-4d3e-bba9-39185dcedfcc/version/1',
							id: 76986,
							uid: 'da6c815c-4d33-4d3e-bba9-39185dcedfcc',
							versionId: 1,
							answerRc: '<p>8</p>\n',
							optionRc: null,
						},
					],
					questionType: 'MultipleChoice',
					learningUnitId: 18709,
					learningUnitUid: '34aa4ad1-28ab-4d93-9b9e-f2860447f2fc',
					learningUnitVersionId: 2,
					learningUnitUri:
						'http://localapi.amplifire.me:8080/v2/curricula/learningunits/34aa4ad1-28ab-4d93-9b9e-f2860447f2fc/version/2',
				},
			],
		},
	],
	customizations: [],
	timedAssessment: false,
	timeAllotted: null,
	isAllowTimeIncrease: false,
	isRecommendedModulesEnabled: false,
	isCustomMessagesEnabled: false,
	publishedVersionId: null,
};

const questionInFocusDataMock = {
	id: 148185,
	publishedQuestionId: 19591,
	publishedQuestionAuthoringKey: '0749f150-39b5-4ef3-80e0-f011da0b6cbc',
	questionVersionId: 2,
	publishedQuestionUri:
		'http://localapi.amplifire.me:8080/v2/curricula/questions/0749f150-39b5-4ef3-80e0-f011da0b6cbc/version/2',
	publishedLearningUnitUri:
		'http://localapi.amplifire.me:8080/v2/curricula/learningunits/07033545-21c9-4119-865e-639832710867/version/2',
	answered: false,
	confidence: null,
	correctness: null,
	quizSeconds: 0,
	reviewSeconds: 0,
	displayOrder: 2,
	difficultyScore: -1,
	hideQuestionIntroImages: false,
	questionType: 'MultipleChoice',
	flagged: false,
	pointsWorth: 1,
	interactiveState: null,
	answerList: [
		{
			self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/7fa7c2f8-bb1d-47cc-a292-091beeee2891/version/1',
			id: 464405,
			uid: '7fa7c2f8-bb1d-47cc-a292-091beeee2891',
			versionId: 1,
			displayOrder: 1,
			selected: false,
			publishedAnswerId: 76975,
			publishedOptionId: null,
			selectedOptionId: null,
			questionId: 148185,
			questionVersionId: 2,
			publishedAnswerUri:
				'http://localapi.amplifire.me:8080/v2/curricula/answers/7fa7c2f8-bb1d-47cc-a292-091beeee2891/version/1',
			publishedOptionUri: null,
			selectedOptionUri: null,
			publishedQuestionUri:
				'http://localapi.amplifire.me:8080/v2/curricula/questions/0749f150-39b5-4ef3-80e0-f011da0b6cbc/version/2',
			answerRc:
				'<p>Seasons are caused by the tilt of the earth on its axis.</p>\n',
			optionRc: null,
		},
		{
			self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/aa521747-d97c-4563-bd0c-1036b4613e44/version/1',
			id: 464406,
			uid: 'aa521747-d97c-4563-bd0c-1036b4613e44',
			versionId: 1,
			displayOrder: 2,
			selected: false,
			publishedAnswerId: 76977,
			publishedOptionId: null,
			selectedOptionId: null,
			questionId: 148185,
			questionVersionId: 2,
			publishedAnswerUri:
				'http://localapi.amplifire.me:8080/v2/curricula/answers/aa521747-d97c-4563-bd0c-1036b4613e44/version/1',
			publishedOptionUri: null,
			selectedOptionUri: null,
			publishedQuestionUri:
				'http://localapi.amplifire.me:8080/v2/curricula/questions/0749f150-39b5-4ef3-80e0-f011da0b6cbc/version/2',
			answerRc:
				"<p>Seasons are caused by variations in the sun's temperature.</p>\n",
			optionRc: null,
		},
		{
			self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/244e10b7-3c39-405a-b89d-1aae992205e8/version/1',
			id: 464407,
			uid: '244e10b7-3c39-405a-b89d-1aae992205e8',
			versionId: 1,
			displayOrder: 3,
			selected: false,
			publishedAnswerId: 76976,
			publishedOptionId: null,
			selectedOptionId: null,
			questionId: 148185,
			questionVersionId: 2,
			publishedAnswerUri:
				'http://localapi.amplifire.me:8080/v2/curricula/answers/244e10b7-3c39-405a-b89d-1aae992205e8/version/1',
			publishedOptionUri: null,
			selectedOptionUri: null,
			publishedQuestionUri:
				'http://localapi.amplifire.me:8080/v2/curricula/questions/0749f150-39b5-4ef3-80e0-f011da0b6cbc/version/2',
			answerRc:
				'<p>Seasons are caused by the earth moving closer or farther from the sun as it orbits it.</p>\n',
			optionRc: null,
		},
	],
	moreInformationRc: null,
	name: 'Add1 - Copy - Copy',
	questionRc: '<p>What causes the changing of the seasons?</p>\n',
	explanationRc: null,
	hasModuleIntroduction: undefined,
	introductionRc: null,
};

const currentRoundQuestionListDataMock = {
	self: 'http://mybob.amplifire.me:8080/v2/assignments/JS89MASNV/current-round?isWebApp=true&subaccount=D8FCK9GWY',
	totalQuestionCount: 6,
	masteredQuestionCount: 0,
	unseenCount: 0,
	misinformedCount: 1,
	uninformedCount: 2,
	notSureCount: 2,
	informedCount: 1,
	onceCorrectCount: 0,
	twiceCorrectCount: 0,
	completionPercentage: 100,
	completionAlgorithmType: 'Correct1x',
	questionsMastered: 0,
	id: 11742,
	roundNumber: 2,
	avatarMessage: null,
	roundPhase: 'QUIZ',
	timeRemaining: null,
	questionList: [
		{
			id: 148184,
			publishedQuestionId: 19589,
			publishedQuestionAuthoringKey: 'de12173b-391c-4ae0-9ec4-944b1b7f1393',
			questionVersionId: 2,
			publishedQuestionUri:
				'http://localapi.amplifire.me:8080/v2/curricula/questions/de12173b-391c-4ae0-9ec4-944b1b7f1393/version/2',
			publishedLearningUnitUri:
				'http://localapi.amplifire.me:8080/v2/curricula/learningunits/1af6a5dc-7608-49c4-b9ee-a8089f5078b1/version/2',
			answered: true,
			confidence: 'NotSure',
			correctness: 'NoAnswerSelected',
			quizSeconds: 8,
			reviewSeconds: 0,
			displayOrder: 1,
			difficultyScore: 3,
			hideQuestionIntroImages: false,
			questionType: 'MultipleChoice',
			flagged: false,
			pointsWorth: 1,
			interactiveState: null,
			answerList: [
				{
					self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/d16aeed9-75d5-446c-b338-eba59057c705/version/1',
					id: 464402,
					uid: 'd16aeed9-75d5-446c-b338-eba59057c705',
					versionId: 1,
					displayOrder: 1,
					selected: false,
					publishedAnswerId: 76969,
					publishedOptionId: null,
					selectedOptionId: null,
					questionId: 148184,
					questionVersionId: 2,
					publishedAnswerUri:
						'http://localapi.amplifire.me:8080/v2/curricula/answers/d16aeed9-75d5-446c-b338-eba59057c705/version/1',
					publishedOptionUri: null,
					selectedOptionUri: null,
					publishedQuestionUri:
						'http://localapi.amplifire.me:8080/v2/curricula/questions/de12173b-391c-4ae0-9ec4-944b1b7f1393/version/2',
				},
				{
					self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/7c73a85a-7599-4ed5-a630-9079bb95402c/version/1',
					id: 464403,
					uid: '7c73a85a-7599-4ed5-a630-9079bb95402c',
					versionId: 1,
					displayOrder: 2,
					selected: false,
					publishedAnswerId: 76971,
					publishedOptionId: null,
					selectedOptionId: null,
					questionId: 148184,
					questionVersionId: 2,
					publishedAnswerUri:
						'http://localapi.amplifire.me:8080/v2/curricula/answers/7c73a85a-7599-4ed5-a630-9079bb95402c/version/1',
					publishedOptionUri: null,
					selectedOptionUri: null,
					publishedQuestionUri:
						'http://localapi.amplifire.me:8080/v2/curricula/questions/de12173b-391c-4ae0-9ec4-944b1b7f1393/version/2',
				},
				{
					self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/dcab2cee-fba9-4e7f-8fe7-60b3abb4d4b6/version/1',
					id: 464404,
					uid: 'dcab2cee-fba9-4e7f-8fe7-60b3abb4d4b6',
					versionId: 1,
					displayOrder: 3,
					selected: false,
					publishedAnswerId: 76970,
					publishedOptionId: null,
					selectedOptionId: null,
					questionId: 148184,
					questionVersionId: 2,
					publishedAnswerUri:
						'http://localapi.amplifire.me:8080/v2/curricula/answers/dcab2cee-fba9-4e7f-8fe7-60b3abb4d4b6/version/1',
					publishedOptionUri: null,
					selectedOptionUri: null,
					publishedQuestionUri:
						'http://localapi.amplifire.me:8080/v2/curricula/questions/de12173b-391c-4ae0-9ec4-944b1b7f1393/version/2',
				},
			],
		},
		{
			id: 148185,
			publishedQuestionId: 19591,
			publishedQuestionAuthoringKey: '0749f150-39b5-4ef3-80e0-f011da0b6cbc',
			questionVersionId: 2,
			publishedQuestionUri:
				'http://localapi.amplifire.me:8080/v2/curricula/questions/0749f150-39b5-4ef3-80e0-f011da0b6cbc/version/2',
			publishedLearningUnitUri:
				'http://localapi.amplifire.me:8080/v2/curricula/learningunits/07033545-21c9-4119-865e-639832710867/version/2',
			answered: false,
			confidence: null,
			correctness: null,
			quizSeconds: 0,
			reviewSeconds: 0,
			displayOrder: 2,
			difficultyScore: -1,
			hideQuestionIntroImages: false,
			questionType: 'MultipleChoice',
			flagged: false,
			pointsWorth: 1,
			interactiveState: null,
			answerList: [
				{
					self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/7fa7c2f8-bb1d-47cc-a292-091beeee2891/version/1',
					id: 464405,
					uid: '7fa7c2f8-bb1d-47cc-a292-091beeee2891',
					versionId: 1,
					displayOrder: 1,
					selected: false,
					publishedAnswerId: 76975,
					publishedOptionId: null,
					selectedOptionId: null,
					questionId: 148185,
					questionVersionId: 2,
					publishedAnswerUri:
						'http://localapi.amplifire.me:8080/v2/curricula/answers/7fa7c2f8-bb1d-47cc-a292-091beeee2891/version/1',
					publishedOptionUri: null,
					selectedOptionUri: null,
					publishedQuestionUri:
						'http://localapi.amplifire.me:8080/v2/curricula/questions/0749f150-39b5-4ef3-80e0-f011da0b6cbc/version/2',
				},
				{
					self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/aa521747-d97c-4563-bd0c-1036b4613e44/version/1',
					id: 464406,
					uid: 'aa521747-d97c-4563-bd0c-1036b4613e44',
					versionId: 1,
					displayOrder: 2,
					selected: false,
					publishedAnswerId: 76977,
					publishedOptionId: null,
					selectedOptionId: null,
					questionId: 148185,
					questionVersionId: 2,
					publishedAnswerUri:
						'http://localapi.amplifire.me:8080/v2/curricula/answers/aa521747-d97c-4563-bd0c-1036b4613e44/version/1',
					publishedOptionUri: null,
					selectedOptionUri: null,
					publishedQuestionUri:
						'http://localapi.amplifire.me:8080/v2/curricula/questions/0749f150-39b5-4ef3-80e0-f011da0b6cbc/version/2',
				},
				{
					self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/244e10b7-3c39-405a-b89d-1aae992205e8/version/1',
					id: 464407,
					uid: '244e10b7-3c39-405a-b89d-1aae992205e8',
					versionId: 1,
					displayOrder: 3,
					selected: false,
					publishedAnswerId: 76976,
					publishedOptionId: null,
					selectedOptionId: null,
					questionId: 148185,
					questionVersionId: 2,
					publishedAnswerUri:
						'http://localapi.amplifire.me:8080/v2/curricula/answers/244e10b7-3c39-405a-b89d-1aae992205e8/version/1',
					publishedOptionUri: null,
					selectedOptionUri: null,
					publishedQuestionUri:
						'http://localapi.amplifire.me:8080/v2/curricula/questions/0749f150-39b5-4ef3-80e0-f011da0b6cbc/version/2',
				},
			],
		},
		{
			id: 148186,
			publishedQuestionId: 19592,
			publishedQuestionAuthoringKey: 'b2ca4d98-a3ab-4b7b-9416-a56d809a7926',
			questionVersionId: 2,
			publishedQuestionUri:
				'http://localapi.amplifire.me:8080/v2/curricula/questions/b2ca4d98-a3ab-4b7b-9416-a56d809a7926/version/2',
			publishedLearningUnitUri:
				'http://localapi.amplifire.me:8080/v2/curricula/learningunits/22cf18c2-37c3-47c6-801a-5e30d7a00f3a/version/2',
			answered: false,
			confidence: null,
			correctness: null,
			quizSeconds: 0,
			reviewSeconds: 0,
			displayOrder: 3,
			difficultyScore: -1,
			hideQuestionIntroImages: false,
			questionType: 'MultipleChoice',
			flagged: false,
			pointsWorth: 1,
			interactiveState: null,
			answerList: [
				{
					self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/b29b2962-8216-45bc-bbe1-498a490b685e/version/1',
					id: 464408,
					uid: 'b29b2962-8216-45bc-bbe1-498a490b685e',
					versionId: 1,
					displayOrder: 1,
					selected: false,
					publishedAnswerId: 76978,
					publishedOptionId: null,
					selectedOptionId: null,
					questionId: 148186,
					questionVersionId: 2,
					publishedAnswerUri:
						'http://localapi.amplifire.me:8080/v2/curricula/answers/b29b2962-8216-45bc-bbe1-498a490b685e/version/1',
					publishedOptionUri: null,
					selectedOptionUri: null,
					publishedQuestionUri:
						'http://localapi.amplifire.me:8080/v2/curricula/questions/b2ca4d98-a3ab-4b7b-9416-a56d809a7926/version/2',
				},
				{
					self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/ad722c15-e0c8-405c-8e36-8cc47f3c16bd/version/1',
					id: 464409,
					uid: 'ad722c15-e0c8-405c-8e36-8cc47f3c16bd',
					versionId: 1,
					displayOrder: 2,
					selected: false,
					publishedAnswerId: 76980,
					publishedOptionId: null,
					selectedOptionId: null,
					questionId: 148186,
					questionVersionId: 2,
					publishedAnswerUri:
						'http://localapi.amplifire.me:8080/v2/curricula/answers/ad722c15-e0c8-405c-8e36-8cc47f3c16bd/version/1',
					publishedOptionUri: null,
					selectedOptionUri: null,
					publishedQuestionUri:
						'http://localapi.amplifire.me:8080/v2/curricula/questions/b2ca4d98-a3ab-4b7b-9416-a56d809a7926/version/2',
				},
				{
					self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/e19eab65-7c83-428c-89bf-c6b98fd58b8f/version/1',
					id: 464410,
					uid: 'e19eab65-7c83-428c-89bf-c6b98fd58b8f',
					versionId: 1,
					displayOrder: 3,
					selected: false,
					publishedAnswerId: 76979,
					publishedOptionId: null,
					selectedOptionId: null,
					questionId: 148186,
					questionVersionId: 2,
					publishedAnswerUri:
						'http://localapi.amplifire.me:8080/v2/curricula/answers/e19eab65-7c83-428c-89bf-c6b98fd58b8f/version/1',
					publishedOptionUri: null,
					selectedOptionUri: null,
					publishedQuestionUri:
						'http://localapi.amplifire.me:8080/v2/curricula/questions/b2ca4d98-a3ab-4b7b-9416-a56d809a7926/version/2',
				},
			],
		},
		{
			id: 148187,
			publishedQuestionId: 19590,
			publishedQuestionAuthoringKey: '877e5b4c-fc7d-44bf-9b7c-3f9c58187dfe',
			questionVersionId: 2,
			publishedQuestionUri:
				'http://localapi.amplifire.me:8080/v2/curricula/questions/877e5b4c-fc7d-44bf-9b7c-3f9c58187dfe/version/2',
			publishedLearningUnitUri:
				'http://localapi.amplifire.me:8080/v2/curricula/learningunits/d7088e79-24aa-45d3-b644-d581d1758873/version/2',
			answered: false,
			confidence: null,
			correctness: null,
			quizSeconds: 0,
			reviewSeconds: 0,
			displayOrder: 4,
			difficultyScore: -1,
			hideQuestionIntroImages: false,
			questionType: 'MultipleChoice',
			flagged: false,
			pointsWorth: 1,
			interactiveState: null,
			answerList: [
				{
					self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/f85f8da0-cc55-45a3-a65e-7a2c207baa2d/version/1',
					id: 464411,
					uid: 'f85f8da0-cc55-45a3-a65e-7a2c207baa2d',
					versionId: 1,
					displayOrder: 1,
					selected: false,
					publishedAnswerId: 76974,
					publishedOptionId: null,
					selectedOptionId: null,
					questionId: 148187,
					questionVersionId: 2,
					publishedAnswerUri:
						'http://localapi.amplifire.me:8080/v2/curricula/answers/f85f8da0-cc55-45a3-a65e-7a2c207baa2d/version/1',
					publishedOptionUri: null,
					selectedOptionUri: null,
					publishedQuestionUri:
						'http://localapi.amplifire.me:8080/v2/curricula/questions/877e5b4c-fc7d-44bf-9b7c-3f9c58187dfe/version/2',
				},
				{
					self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/33e75bd9-0fbb-4dde-8b03-8a7254ec28b1/version/1',
					id: 464412,
					uid: '33e75bd9-0fbb-4dde-8b03-8a7254ec28b1',
					versionId: 1,
					displayOrder: 2,
					selected: false,
					publishedAnswerId: 76972,
					publishedOptionId: null,
					selectedOptionId: null,
					questionId: 148187,
					questionVersionId: 2,
					publishedAnswerUri:
						'http://localapi.amplifire.me:8080/v2/curricula/answers/33e75bd9-0fbb-4dde-8b03-8a7254ec28b1/version/1',
					publishedOptionUri: null,
					selectedOptionUri: null,
					publishedQuestionUri:
						'http://localapi.amplifire.me:8080/v2/curricula/questions/877e5b4c-fc7d-44bf-9b7c-3f9c58187dfe/version/2',
				},
				{
					self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/4f2dc530-53e9-4e2f-85ce-505ea543c4a5/version/1',
					id: 464413,
					uid: '4f2dc530-53e9-4e2f-85ce-505ea543c4a5',
					versionId: 1,
					displayOrder: 3,
					selected: false,
					publishedAnswerId: 76973,
					publishedOptionId: null,
					selectedOptionId: null,
					questionId: 148187,
					questionVersionId: 2,
					publishedAnswerUri:
						'http://localapi.amplifire.me:8080/v2/curricula/answers/4f2dc530-53e9-4e2f-85ce-505ea543c4a5/version/1',
					publishedOptionUri: null,
					selectedOptionUri: null,
					publishedQuestionUri:
						'http://localapi.amplifire.me:8080/v2/curricula/questions/877e5b4c-fc7d-44bf-9b7c-3f9c58187dfe/version/2',
				},
			],
		},
		{
			id: 148188,
			publishedQuestionId: 19593,
			publishedQuestionAuthoringKey: 'e661dbf5-2881-4995-b11f-30617976cf14',
			questionVersionId: 2,
			publishedQuestionUri:
				'http://localapi.amplifire.me:8080/v2/curricula/questions/e661dbf5-2881-4995-b11f-30617976cf14/version/2',
			publishedLearningUnitUri:
				'http://localapi.amplifire.me:8080/v2/curricula/learningunits/f2ce6c71-a1b5-4f83-8657-2989da4717ca/version/2',
			answered: false,
			confidence: null,
			correctness: null,
			quizSeconds: 0,
			reviewSeconds: 0,
			displayOrder: 5,
			difficultyScore: -1,
			hideQuestionIntroImages: false,
			questionType: 'MultipleChoice',
			flagged: false,
			pointsWorth: 1,
			interactiveState: null,
			answerList: [
				{
					self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/28ee8b15-49bb-4f4f-b3ec-5f84de663a7c/version/1',
					id: 464414,
					uid: '28ee8b15-49bb-4f4f-b3ec-5f84de663a7c',
					versionId: 1,
					displayOrder: 1,
					selected: false,
					publishedAnswerId: 76981,
					publishedOptionId: null,
					selectedOptionId: null,
					questionId: 148188,
					questionVersionId: 2,
					publishedAnswerUri:
						'http://localapi.amplifire.me:8080/v2/curricula/answers/28ee8b15-49bb-4f4f-b3ec-5f84de663a7c/version/1',
					publishedOptionUri: null,
					selectedOptionUri: null,
					publishedQuestionUri:
						'http://localapi.amplifire.me:8080/v2/curricula/questions/e661dbf5-2881-4995-b11f-30617976cf14/version/2',
				},
				{
					self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/7369ec0b-eaa6-4431-8dd7-eea23cc99264/version/1',
					id: 464415,
					uid: '7369ec0b-eaa6-4431-8dd7-eea23cc99264',
					versionId: 1,
					displayOrder: 2,
					selected: false,
					publishedAnswerId: 76983,
					publishedOptionId: null,
					selectedOptionId: null,
					questionId: 148188,
					questionVersionId: 2,
					publishedAnswerUri:
						'http://localapi.amplifire.me:8080/v2/curricula/answers/7369ec0b-eaa6-4431-8dd7-eea23cc99264/version/1',
					publishedOptionUri: null,
					selectedOptionUri: null,
					publishedQuestionUri:
						'http://localapi.amplifire.me:8080/v2/curricula/questions/e661dbf5-2881-4995-b11f-30617976cf14/version/2',
				},
				{
					self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/88d5bc26-1db5-4ca9-9b03-a5a8ae86a4c4/version/1',
					id: 464416,
					uid: '88d5bc26-1db5-4ca9-9b03-a5a8ae86a4c4',
					versionId: 1,
					displayOrder: 3,
					selected: false,
					publishedAnswerId: 76982,
					publishedOptionId: null,
					selectedOptionId: null,
					questionId: 148188,
					questionVersionId: 2,
					publishedAnswerUri:
						'http://localapi.amplifire.me:8080/v2/curricula/answers/88d5bc26-1db5-4ca9-9b03-a5a8ae86a4c4/version/1',
					publishedOptionUri: null,
					selectedOptionUri: null,
					publishedQuestionUri:
						'http://localapi.amplifire.me:8080/v2/curricula/questions/e661dbf5-2881-4995-b11f-30617976cf14/version/2',
				},
			],
		},
		{
			id: 148189,
			publishedQuestionId: 19594,
			publishedQuestionAuthoringKey: '34b4f5b3-8cac-467e-97c6-8d7a7bc42087',
			questionVersionId: 2,
			publishedQuestionUri:
				'http://localapi.amplifire.me:8080/v2/curricula/questions/34b4f5b3-8cac-467e-97c6-8d7a7bc42087/version/2',
			publishedLearningUnitUri:
				'http://localapi.amplifire.me:8080/v2/curricula/learningunits/34aa4ad1-28ab-4d93-9b9e-f2860447f2fc/version/2',
			answered: false,
			confidence: null,
			correctness: null,
			quizSeconds: 0,
			reviewSeconds: 0,
			displayOrder: 6,
			difficultyScore: -1,
			hideQuestionIntroImages: false,
			questionType: 'MultipleChoice',
			flagged: false,
			pointsWorth: 1,
			interactiveState: null,
			answerList: [
				{
					self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/1354b284-927e-4fe7-83ec-46e7e98a6b28/version/1',
					id: 464417,
					uid: '1354b284-927e-4fe7-83ec-46e7e98a6b28',
					versionId: 1,
					displayOrder: 1,
					selected: false,
					publishedAnswerId: 76985,
					publishedOptionId: null,
					selectedOptionId: null,
					questionId: 148189,
					questionVersionId: 2,
					publishedAnswerUri:
						'http://localapi.amplifire.me:8080/v2/curricula/answers/1354b284-927e-4fe7-83ec-46e7e98a6b28/version/1',
					publishedOptionUri: null,
					selectedOptionUri: null,
					publishedQuestionUri:
						'http://localapi.amplifire.me:8080/v2/curricula/questions/34b4f5b3-8cac-467e-97c6-8d7a7bc42087/version/2',
				},
				{
					self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/da6c815c-4d33-4d3e-bba9-39185dcedfcc/version/1',
					id: 464418,
					uid: 'da6c815c-4d33-4d3e-bba9-39185dcedfcc',
					versionId: 1,
					displayOrder: 2,
					selected: false,
					publishedAnswerId: 76986,
					publishedOptionId: null,
					selectedOptionId: null,
					questionId: 148189,
					questionVersionId: 2,
					publishedAnswerUri:
						'http://localapi.amplifire.me:8080/v2/curricula/answers/da6c815c-4d33-4d3e-bba9-39185dcedfcc/version/1',
					publishedOptionUri: null,
					selectedOptionUri: null,
					publishedQuestionUri:
						'http://localapi.amplifire.me:8080/v2/curricula/questions/34b4f5b3-8cac-467e-97c6-8d7a7bc42087/version/2',
				},
				{
					self: 'http://localapi.amplifire.me:8080/v2/curricula/answers/e408eb00-273c-4835-b40c-bed2a16c0316/version/1',
					id: 464419,
					uid: 'e408eb00-273c-4835-b40c-bed2a16c0316',
					versionId: 1,
					displayOrder: 3,
					selected: false,
					publishedAnswerId: 76984,
					publishedOptionId: null,
					selectedOptionId: null,
					questionId: 148189,
					questionVersionId: 2,
					publishedAnswerUri:
						'http://localapi.amplifire.me:8080/v2/curricula/answers/e408eb00-273c-4835-b40c-bed2a16c0316/version/1',
					publishedOptionUri: null,
					selectedOptionUri: null,
					publishedQuestionUri:
						'http://localapi.amplifire.me:8080/v2/curricula/questions/34b4f5b3-8cac-467e-97c6-8d7a7bc42087/version/2',
				},
			],
		},
	],
};

const currentRoundAnswerOverlayDataMock = {
	self: null,
	totalQuestionCount: 0,
	masteredQuestionCount: 0,
	unseenCount: 0,
	misinformedCount: 0,
	uninformedCount: 0,
	notSureCount: 0,
	informedCount: 0,
	onceCorrectCount: 0,
	twiceCorrectCount: 0,
	completionPercentage: 0,
	completionAlgorithmType: '',
	questionsMastered: 0,
	questionSeconds: 0,
	reviewSeconds: 0,
	answerDate: '',
	correctness: '',
	confidence: '',
	correctAnswerIds: [],
	moduleComplete: false,
	avatarMessage: null,
	answerList: [],
};

export {
	questionDataMock,
	questionInFocusDataMock,
	currentRoundQuestionListDataMock,
	currentRoundAnswerOverlayDataMock,
};
