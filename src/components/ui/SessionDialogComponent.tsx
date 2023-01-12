import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import {
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter,
	Button,
	HStack,
} from '@chakra-ui/react';

const SessionDialogComponent = (props: any) => {
	const { t: i18n } = useTranslation();
	const cancelRef = useRef<HTMLButtonElement>(null);

	return (
		<>
			<AlertDialog
				onClose={props.onClose}
				leastDestructiveRef={cancelRef}
				isOpen={props.isOpen}
				isCentered
				closeOnEsc={false}
				closeOnOverlayClick={false}>
				<AlertDialogOverlay bg="rgba(41, 61, 89, 0.8)" backdropFilter="auto">
					<AlertDialogContent>
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							{i18n('sessionExpiring')}
						</AlertDialogHeader>

						<AlertDialogBody>{i18n('staySignedInQuestion')}</AlertDialogBody>

						<AlertDialogFooter justifyContent="flex-start">
							<HStack>
								<Button onClick={props.handleStaySignedIn}>
									{i18n('staySignedInButton')}
								</Button>
								<Button
									variant="ampOutline"
									onClick={props.onClose}
									ref={cancelRef}>
									{i18n('logOutButton')}
								</Button>
							</HStack>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
};

export default SessionDialogComponent;
