import AssignmentList from '../ui/AssignmentList';
import { Spinner } from '@chakra-ui/react';
import useModuleContentService from '../../services/useModuleContentService';

const Page = ({ id, header, content }) => {
	// useModuleContentService
	const { data } = useModuleContentService();
	return (
		<>
			<h1>{header}</h1>
			<main className="main" id="main">
				<div id={id}>{content}</div>
				{!data ? (
					<Spinner
						thickness="4px"
						speed="0.65s"
						emptyColor="gray.200"
						color="blue.500"
						size="xl"
					/>
				) : (
<<<<<<< HEAD:src/components/pages/Page.jsx
					<ModuleIntroductionComponent
						moduleName={data.name}
						introductionRc={data.introductionRc}
						numOfQuestionsText={'31 Questions'}
						descriptionRc={data.descriptionRc}
						testTimeText={'About 45 minutes'}
						proceedBtnText={'lets begin'}
					/>
=======
					<AssignmentList />
>>>>>>> 7bdc82135 (Feat: create assignmentList component):main/src/components/pages/Page.jsx
				)}
			</main>
		</>
	);
};

export default Page;
