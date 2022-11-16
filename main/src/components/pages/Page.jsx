import AssignmentList from '../ui/AssignmentList';
import { Spinner } from '@chakra-ui/react';

const Page = ({ id, header, content }) => {
	return (
		<>
			<h1>{header}</h1>
			<main className="main" id="main">
				<div id={id}>{content}</div>
				{!true ? (
					<Spinner
						thickness="4px"
						speed="0.65s"
						emptyColor="gray.200"
						color="blue.500"
						size="xl"
					/>
				) : (
					<AssignmentList />
				)}
			</main>
		</>
	);
};

export default Page;
