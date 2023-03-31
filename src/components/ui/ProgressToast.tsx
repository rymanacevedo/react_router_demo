import { Box, useToast, Button, Text } from '@chakra-ui/react';
import ProgressMessageComponent from './ProgressMessageComponent';
import { useTranslation } from 'react-i18next';
import { useEffect, useRef } from 'react';

type FireProgressToastType = {
	setIsOpen?: (isOpen: boolean) => void;
	isToastOpen?: boolean;
};

const FireProgressToast = (props: FireProgressToastType) => {
	const {isToastOpen} = props;
	const toast = useToast();
	const { t: i18n } = useTranslation();

	useEffect(() => {
		if (isToastOpen){
			const closeToast = () => {
				if (toast) {
					toast.close(id)
				}
			}
			const id = 'progress-toast';
			if (!toast.isActive(id)) {
				toast({
					position: 'top-right',
					duration: 10000,
					isClosable: true,
					id,
					render: () => (
						<Box
						border="1px solid #E2E8F0"
						boxShadow="0px 4px 4px rgba(0, 0, 0, 0.25)"
							style={{border: '1px'}}
							marginTop={'160px'}
							borderRadius={'24px'}
							width={'475px'}
							paddingTop="1px"
							marginLeft="200px"
							bg="ampWhite">
							<Box w="373px">
								<ProgressMessageComponent closeToast={closeToast} />
							</Box>
							<Button
								variant={'outline'}
								borderColor={'ampPrimary.300'}
								bg="ampWhite"
								width="325px"
								height="40px"
								margin="24px"
								onClick={() => {
									// setIsOpen(true);
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
	
		}}, [isToastOpen]);	
};

export default FireProgressToast;
