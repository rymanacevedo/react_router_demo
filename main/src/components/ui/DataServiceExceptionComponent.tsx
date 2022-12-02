import React, { useRef } from 'react';

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
							Application Error
						</AlertDialogHeader>

						<AlertDialogBody>
							Looks like you hit a snag in our system. Please wait a minute or
							two and try again.
						</AlertDialogBody>

						<AlertDialogFooter>
							<Button onClick={onClose}>restart application</Button>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialogOverlay>
			</AlertDialog>
		</>
	);
}

export default DataServiceExceptionComponent;
