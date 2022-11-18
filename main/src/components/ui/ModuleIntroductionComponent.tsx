import { Box, Heading, Text, Button, Stack } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import useModuleContentService from '../../services/useModuleContentService';
import RichContentComponent from './RichContentComponent';

const ModuleIntroductionComponent = () => {
	const { fetchModuleContent } = useModuleContentService();
	const [data, setData] = useState({
		name: '',
		introductionRc: '',
	});

	useEffect(() => {
		const fetchData = async () => {
			let response = await fetchModuleContent();
			setData(response);
		};
		fetchData();
	}, []);
	return (
		<Box
			style={{
				backgroundColor: 'white',
			}}
			boxShadow="2xl"
			w="990px"
			overflow="hidden"
			margin={'0 auto'}
			borderRadius={24}
			padding={16}>
			<Heading as="h2">{data?.name}</Heading>
			<Stack paddingTop="16px" paddingBottom="16px">
				<RichContentComponent content={data?.introductionRc} />
			</Stack>
			<Button>
				<Text>Let's Begin</Text>
			</Button>
		</Box>
	);
};

export default ModuleIntroductionComponent;
