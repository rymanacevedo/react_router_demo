import React, { Dispatch, SetStateAction, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
} from '@chakra-ui/react';
import { FetcherWithComponents } from 'react-router-dom';

type Props = {
	isOpen: boolean;
	fetcher: FetcherWithComponents<any>;
	setShowAlert: Dispatch<SetStateAction<boolean>>;
};
const DataServiceExceptionComponent = ({
	isOpen,
	setShowAlert,
	fetcher,
}: Props) => {
	const { t: i18n } = useTranslation();
	const cancelRef = useRef<HTMLButtonElement>(null);

	const handleCloseAlert = () => {
		setShowAlert(false);
		fetcher.load('/logout');
	};
	return (
		<>
			<AlertDialog
				onClose={handleCloseAlert}
				leastDestructiveRef={cancelRef}
				isOpen={isOpen}
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
							<fetcher.Form method="post">
								<Button onClick={handleCloseAlert} ref={cancelRef}>
									{i18n('appErrorRestartButtonText')}
								</Button>
							</fetcher.Form>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
};

export default DataServiceExceptionComponent;
