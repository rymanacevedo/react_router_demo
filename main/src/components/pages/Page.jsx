<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
import AssignmentList from '../ui/AssignmentList';
import { Spinner } from '@chakra-ui/react';
=======
>>>>>>> 852b1f17f (Feat: completed ui for progress bar)
import AmpMiniChip from '../../css/AmpMiniChip';
=======
import AmpMicroChip from '../../css/AmpMicroChip';
>>>>>>> 1ff658e8e (Fix: made mini chips into micro chips)
import AmpChip from '../../css/AmpChip';

=======
>>>>>>> 44b1afbb3 (Feat: create learning view route, create learning view component, added pop over to test progress bar)
const Page = ({ id, header, content }) => {
	return (
		<>
			<h1>{header}</h1>
			<main className="main" id="main">
				<div id={id}>{content}</div>
<<<<<<< HEAD
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
				<AmpMicroChip variant="ampNeutralUnfilled" />
				<AmpMicroChip variant="ampDarkSuccessOutline" />
				<AmpMicroChip variant="ampDarkSuccess" />
				<AmpMicroChip variant="ampDarkError" />
				<AmpMicroChip variant="ampDarkErrorOutline" />
				<AmpMicroChip variant="ampWarningOutline" />
				<AmpMicroChip variant="ampNeutralFilled" />
				<AmpMicroChip variant="ampSecondary" />
				<AmpMicroChip variant="ampDarkSuccessOutlineDot" />
				<AmpMicroChip variant="ampDarkSuccessDot" />
				<AmpMicroChip variant="ampDarkErrorDot" />
				<AmpMicroChip variant="ampDarkErrorOutlineDot" />
				<AmpMicroChip variant="ampWarningOutlineDot" />
				<AmpMicroChip variant="ampNeutralFilledDot" />
				<AmpMicroChip variant="ampSecondaryDot" />
=======
>>>>>>> 44b1afbb3 (Feat: create learning view route, create learning view component, added pop over to test progress bar)
			</main>
		</>
	);
};

export default Page;
