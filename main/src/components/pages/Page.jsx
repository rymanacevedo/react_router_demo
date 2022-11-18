<<<<<<< HEAD
import AssignmentList from '../ui/AssignmentList';
import { Spinner } from '@chakra-ui/react';
=======
>>>>>>> 852b1f17f (Feat: completed ui for progress bar)
import AmpMiniChip from '../../css/AmpMiniChip';
import AmpChip from '../../css/AmpChip';

const Page = ({ id, header, content }) => {
	return (
		<>
			<h1>{header}</h1>
			<main className="main" id="main">
				<div id={id}>{content}</div>
<<<<<<< HEAD
				{!true ? (
					<Spinner
						thickness="4px"
						speed="0.65s"
						emptyColor="gray.200"
						color="blue.500"
						size="xl"
					/>
				) : (
<<<<<<< HEAD
					<AssignmentList />
=======
					<ModuleIntroductionComponent />
>>>>>>> 594855381 (Feat: created ampminichips)
				)}
=======

>>>>>>> 852b1f17f (Feat: completed ui for progress bar)
				<AmpChip variant="ampDarkSuccessOutline" size="lg" />
				<AmpChip variant="ampDarkSuccess" size="lg" />
				<AmpChip variant="ampDarkError" size="lg" />
				<AmpChip variant="ampDarkErrorOutline" size="lg" />
				<AmpChip variant="ampWarningOutline" size="lg" />
				<AmpChip variant="ampNeutralFilled" size="lg" />
				<AmpChip variant="ampDarkSuccessOutline" size="sm" />
				<AmpChip variant="ampDarkSuccess" size="sm" />
				<AmpChip variant="ampDarkError" size="sm" />
				<AmpChip variant="ampDarkErrorOutline" size="sm" />
				<AmpChip variant="ampWarningOutline" size="sm" />
				<AmpChip variant="ampNeutralFilled" size="sm" />
				<AmpMiniChip variant="ampNeutralUnfilled" />
				<AmpMiniChip variant="ampDarkSuccessOutline" />
				<AmpMiniChip variant="ampDarkSuccess" />
				<AmpMiniChip variant="ampDarkError" />
				<AmpMiniChip variant="ampDarkErrorOutline" />
				<AmpMiniChip variant="ampWarningOutline" />
				<AmpMiniChip variant="ampNeutralFilled" />
				<AmpMiniChip variant="ampSecondary" />
				<AmpMiniChip variant="ampDarkSuccessOutlineDot" />
				<AmpMiniChip variant="ampDarkSuccessDot" />
				<AmpMiniChip variant="ampDarkErrorDot" />
				<AmpMiniChip variant="ampDarkErrorOutlineDot" />
				<AmpMiniChip variant="ampWarningOutlineDot" />
				<AmpMiniChip variant="ampNeutralFilledDot" />
				<AmpMiniChip variant="ampSecondaryDot" />
			</main>
		</>
	);
};

export default Page;
