import { Box, useToast, Button, Text } from '@chakra-ui/react';
import ProgressMessageComponent from './ProgressMessageComponent';
import { useTranslation } from 'react-i18next';

type FireProgressToastType = {
	setIsOpen: (isOpen: boolean) => void;
};

const FireProgressToast = ({ setIsOpen }: FireProgressToastType) => {
	const toast = useToast();
	const { t: i18n } = useTranslation();

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

export default FireProgressToast;
