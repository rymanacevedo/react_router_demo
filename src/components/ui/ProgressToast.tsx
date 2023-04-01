import React, { useEffect } from 'react';
import { Box, useToast, Button, Text } from '@chakra-ui/react';
import ProgressMessageComponent from './ProgressMessageComponent';
import { useTranslation } from 'react-i18next';

type FireProgressToastType = {
	setIsOpen?: (isOpen: boolean) => void;
	isToastOpen?: boolean;
	textPrompt: string;
	expandProgressMenu: () => void;
};

const FireProgressToast = (props: FireProgressToastType) => {
	const { isToastOpen, textPrompt, expandProgressMenu } = props;
	const toast = useToast();
	const { t: i18n } = useTranslation();

	useEffect(() => {
		const id = 'progress-toast';
		if (isToastOpen === false) {
			toast.close(id);
		}
		if (isToastOpen) {
			const closeToast = () => {
				if (toast) {
					toast.close(id);
				}
			};

			const expandToast = () => {
				toast.close(id);
				expandProgressMenu();
			};

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
							style={{ border: '1px' }}
							marginTop={'160px'}
							borderRadius={'24px'}
							width={'475px'}
							paddingTop="1px"
							marginLeft="200px"
							bg="ampWhite">
							<Box w="373px">
								<ProgressMessageComponent
									closeToast={closeToast}
									textPrompt={textPrompt}
								/>
							</Box>
							<Button
								variant={'outline'}
								borderColor={'ampPrimary.300'}
								bg="ampWhite"
								width="325px"
								height="40px"
								margin="24px"
								onClick={expandToast}>
								<Text fontSize={'16px'} fontWeight="600">
									{i18n('viewMoreProgress')}
								</Text>
							</Button>
						</Box>
					),
				});
			}
		}
	}, [isToastOpen]);

	// To appease the TypeScript gods
	return <></>;
};

export default FireProgressToast;
