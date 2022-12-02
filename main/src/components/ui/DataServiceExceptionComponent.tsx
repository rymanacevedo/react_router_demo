import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import {
	useDisclosure,
	Button,
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter,
} from '@chakra-ui/react';

function DataServiceExceptionComponent(props: {
	isOpen: boolean;
	closeOnEsc: boolean;
}) {
	const { t: i18n } = useTranslation();
	const { onClose } = useDisclosure();
	const cancelRef = useRef<HTMLDivElement | null>(null);

	return (
		<>
			<AlertDialog
				isOpen={props.isOpen}
				leastDestructiveRef={cancelRef}
				onClose={onClose}
				closeOnEsc={props.closeOnEsc}>
				<AlertDialogOverlay>
					<AlertDialogContent margin="auto">
						<AlertDialogHeader fontSize="lg" fontWeight="bold">
							{i18n('appErrorTitle')}
						</AlertDialogHeader>

						<AlertDialogBody>{i18n('appErrorText')}</AlertDialogBody>

						<AlertDialogFooter>
							<Button onClick={onClose}>
								{i18n('appErrorRestartButtonText')}
							</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
}

export default DataServiceExceptionComponent;
