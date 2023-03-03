import {
	Box,
	Button,
	HStack,
	Progress,
	Text,
	VStack,
	useMediaQuery,
} from '@chakra-ui/react';
import AmpMicroChip from '../../css/AmpMicroChip';
import { useTranslation } from 'react-i18next';
import { EnterIcon, ExitIcon, ChevronDownIcon } from '@radix-ui/react-icons';

type ProgressBarMenu = {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
	title: string;
	timeRemaining: string;
	assignmentType: string;
	progress: number;
	roundNumber?: number;
	roundPhase?: string;
	totalQuestionCount: any;
	masteredQuestionCount: any;
	unseenCount: any;
	misinformedCount: number;
	seenCount: number;
	answerHistory: ApiRes;
};

type ApiRes = {
	items: Item[];
};

type Item = {
	publishedQuestionUri: string;
	answerHistory: AnswerHistory[];
};

type AnswerHistory = {
	roundNumber: number;
	confidence: string;
	correctness: string;
};

type ModuleTitleType = {
	assignmentType: string;
	title: string;
};

type ModuleTimeRemainingType = {
	timeRemaining: string;
};

type RoundNumberType = {
	roundNumber?: number;
};

//refactor to accept assignment type, title, time left, progress props
const ModuleTitle = ({ assignmentType, title }: ModuleTitleType) => {
	return (
		<Text fontSize={'21px'} fontWeight={'600'}>
			{assignmentType}: {title}
		</Text>
	);
};

const ModuleTimeRemaining = ({ timeRemaining }: ModuleTimeRemainingType) => {
	return (
		<Text fontSize={'16px'} color="ampNeutral.800">
			{timeRemaining}
		</Text>
	);
};

const RoundNumberAndPhase = ({ roundNumber }: RoundNumberType) => {
	return (
		<Text fontSize={'20px'} fontWeight={'600'}>
			{`Round ${roundNumber}: Learning`}
		</Text>
	);
};

type AnswerHistoryType = {
	totalQuestionCount: number;
	masteredQuestionCount: number;
	seenCount: number;
	misinformedCount: number;
	unseenCount: number;
	answerHistory: ApiRes;
};

const variantFunc = (answerHistory: any, dotIndex: number) => {
	type LookupType = {
		[key: string]: string;
		OneAnswerPartSureCorrect: string;
		PartSureCorrect: string;
		SureCorrect: string;
		SureIncorrect: string;
		UnsureCorrect: string;
		UnsureIncorrect: string;
		empty: string;
		PartSurePartiallyCorrect: string;
		OneAnswerPartSureIncorrect: string;
		PartSureIncorrect: string;
	};
	const lookup: LookupType = {
		OneAnswerPartSureCorrect: 'ampDarkSuccessOutline',
		PartSureCorrect: 'ampDarkSuccessOutline',
		SureCorrect: 'ampDarkSuccess',
		SureIncorrect: 'ampDarkError',
		UnsureCorrect: 'ampDarkSuccessOutline',
		UnsureIncorrect: 'ampDarkErrorOutline',
		empty: 'ampNeutralUnfilled',
		PartSurePartiallyCorrect: 'ampWarningOutline',
		OneAnswerPartSureIncorrect: 'ampDarkErrorOutline',
		PartSureIncorrect: 'ampDarkErrorOutline',
	};

	if (answerHistory.items) {
		const wholeAnswerString: any = answerHistory.items.map(
			(ans: any, i: number) => {
				if (i === dotIndex) {
					const classString: keyof LookupType = `${
						ans.answerHistory.at(-1).confidence
					}${ans.answerHistory.at(-1).correctness}`;
					return lookup[classString];
				} else {
					return lookup.empty;
				}
			},
		);

		return wholeAnswerString[dotIndex];
	}
};

const AnswerHistoryComponent = ({
	totalQuestionCount,
	answerHistory,
}: AnswerHistoryType) => {
	return (
		<HStack>
			{Array.from({ length: totalQuestionCount }, (_, i) => (
				<AmpMicroChip key={i} variant={variantFunc(answerHistory, i)} />
			))}
		</HStack>
	);
};

const TestProgressBarMenu = ({
	isOpen,
	setIsOpen,
	title,
	timeRemaining,
	assignmentType,
	progress,
	roundNumber,
	totalQuestionCount,
	masteredQuestionCount,
	unseenCount,
	misinformedCount,
	seenCount,
	answerHistory,
}: ProgressBarMenu) => {
	const { t: i18n } = useTranslation();
	const [isSmallerThan1000] = useMediaQuery('(max-width: 1000px)');
	return (
		<Box width="100vw" boxSizing="border-box">
			<HStack
				borderBottom={'1px'}
				borderBottomColor="ampSecondary.300"
				zIndex="2"
				position={'absolute'}
				width="100%"
				height={'80px'}
				bg={'transparent'}
				justifyContent={isSmallerThan1000 ? '' : 'space-between'}
				paddingLeft="24px"
				paddingRight="24px"
				flexDirection={isSmallerThan1000 ? 'column' : 'initial'}>
				<VStack align={'left'} display={isSmallerThan1000 ? 'none' : 'block'}>
					<ModuleTitle title={title} assignmentType={assignmentType} />
					<ModuleTimeRemaining timeRemaining={timeRemaining} />
				</VStack>
				<VStack
					alignSelf={'center'}
					style={{ marginTop: isSmallerThan1000 ? '12px' : '' }}>
					<RoundNumberAndPhase roundNumber={roundNumber} />
					<AnswerHistoryComponent
						totalQuestionCount={totalQuestionCount}
						masteredQuestionCount={masteredQuestionCount}
						unseenCount={unseenCount}
						misinformedCount={misinformedCount}
						seenCount={seenCount}
						answerHistory={answerHistory}
					/>
				</VStack>

				{isSmallerThan1000 ? (
					<Button
						variant={'outline'}
						borderColor={'ampPrimary.300'}
						bg="ampWhite"
						alignSelf={'flex-end'}
						style={{ marginTop: '-40px' }}>
						{<ChevronDownIcon />}
					</Button>
				) : (
					<Button
						variant={'outline'}
						borderColor={'ampPrimary.300'}
						bg="ampWhite"
						width="200px"
						leftIcon={isOpen ? <ExitIcon /> : <EnterIcon />}
						onClick={() => {
							setIsOpen(!isOpen);
						}}>
						<Text fontSize={'16px'} fontWeight="600">
							{isOpen ? i18n('hideProgress') : i18n('showProgress')}
						</Text>
					</Button>
				)}
			</HStack>
			<Progress
				value={progress}
				height={'80px'}
				colorScheme="gray"
				zIndex={'1'}
				width="100%"
				bg="ampNeutral.50"
			/>
		</Box>
	);
};

export default TestProgressBarMenu;
