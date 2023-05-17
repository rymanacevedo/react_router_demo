import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import {
	AlertDialog,
	AlertDialogBody,
	AlertDialogContent,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogOverlay,
	Button,
	HStack,
} from '@chakra-ui/react';
import { FetcherWithComponents } from 'react-router-dom';

type Props = {
	isOpen: boolean;
	expiration: number;
	fetcher: FetcherWithComponents<any>;
};
const SessionDialogComponent = ({ isOpen, expiration, fetcher }: Props) => {
	const { t: i18n } = useTranslation();
	const cancelRef = useRef<HTMLButtonElement>(null);

	const handleStayLoggedIn = () => {
		fetcher.submit(null, {
			method: 'post',
			action: `/keep-alive?checkExpiration=${expiration}`,
		});
	};
	const handleLogout = () => {
		fetcher.load('/logout');
	};

	return (
		<AlertDialog
			onClose={handleStayLoggedIn}
			leastDestructiveRef={cancelRef}
			isOpen={isOpen}
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
							<fetcher.Form method="post">
								<Button ref={cancelRef} onClick={handleStayLoggedIn}>
									{i18n('staySignedInButton')}
								</Button>
								<Button variant="ampOutline" onClick={handleLogout}>
									{i18n('logOutButton')}
								</Button>
							</fetcher.Form>
						</HStack>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialogOverlay>
		</AlertDialog>
	);
};

export default SessionDialogComponent;
