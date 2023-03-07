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
} from '@chakra-ui/react';

const DataServiceExceptionComponent = (props: any) => {
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
							{i18n('appErrorTitle')}
						</AlertDialogHeader>

						<AlertDialogBody>{i18n('appErrorText')}</AlertDialogBody>

						<AlertDialogFooter>
							<Button onClick={props.onClose} ref={cancelRef}>
								{i18n('appErrorRestartButtonText')}
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
};

export default DataServiceExceptionComponent;
