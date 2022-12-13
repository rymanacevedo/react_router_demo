import { useState } from 'react';
import {
	Box,
	Container,
	HStack,
	useToast,
	Button,
	Text,
} from '@chakra-ui/react';
import TestProgressBarMenu from '../ui/TestProgressBarMenu';
import ProgressMenu from '../ui/ProgressMenu';
import ProgressMessageComponent from '../ui/ProgressMessageComponent';
import { useTranslation } from 'react-i18next';

const AssignmentView = () => {
	const [isOpen, setIsOpen] = useState(false);
	const toast = useToast();
	const { t: i18n } = useTranslation();

	// This function will be used with future progress service call
	// @ts-ignore
	// eslint-disable-next-line no-use-before-define
	const fireProgressToast = () => {
		const id = 'progress-toast';
		if (!toast.isActive(id)) {
			toast({
				position: 'top-right',
				duration: 10000,
				isClosable: true,
				id,
				render: () => (
					<Box
						marginTop={'160px'}
						borderRadius={'24px'}
						width={'475px'}
						paddingTop="1px"
						marginLeft="200px"
						bg="ampWhite">
						<Box w="373px">
							<ProgressMessageComponent />
						</Box>
						<Button
							variant={'outline'}
							borderColor={'ampPrimary.300'}
							bg="ampWhite"
							width="325px"
							height="40px"
							margin="24px"
							onClick={() => {
								setIsOpen(true);
								toast.close(id);
							}}>
							<Text fontSize={'16px'} fontWeight="600">
								{i18n('viewMoreProgress')}
							</Text>
						</Button>
					</Box>
				),
			});
		}
	};

	return (
		<main id="learning-Assignment">
			<Container
				id={'learning-Assignment'}
				margin="0"
				padding="0"
				maxWidth={'100vw'}
				overflowY={'hidden'}
				overflowX={'hidden'}>
				<TestProgressBarMenu isOpen={isOpen} setIsOpen={setIsOpen} />
				<HStack width="100vw" justifyContent={'space-between'}>
					<HStack w="100%">
						<Text>Under Construction</Text>
					</HStack>
					<ProgressMenu isOpen={isOpen} />
				</HStack>
			</Container>
		</main>
	);
};

export default AssignmentView;
