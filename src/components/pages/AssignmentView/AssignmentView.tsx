import { useRef, useState } from 'react';
import { Modal, ModalOverlay } from '@chakra-ui/react';
import { LoaderFunction, redirect, useParams } from 'react-router-dom';
import { Cookies } from 'react-cookie-consent';
import AssignmentComponent from '../../ui/Assignment/AssignmentComponent';

export const assignmentViewLoader: LoaderFunction = () => {
	const hasNotSeenTour = !Cookies.get('seen_tour');

	if (!window.location.href.includes('tour') && hasNotSeenTour) {
		return redirect('tour');
	}
	return null;
};

const AssignmentView = () => {
	const [isInstructionalOverlayOpen, setIsInstructionalOverlayOpen] = useState(
		!Cookies.get('instructional_overlay'),
	);
	const initRef = useRef(null);
	const { assignmentKey } = useParams();
	const onClose = () => {
		setIsInstructionalOverlayOpen(false);
		Cookies.set('instructional_overlay', window.btoa('instructional_overlay'), {
			path: '/',
		});
	};

	return (
		<main id="learning-assignment">
			<Modal isOpen={isInstructionalOverlayOpen} onClose={onClose}>
				<ModalOverlay />
			</Modal>
			<AssignmentComponent
				assignmentKey={assignmentKey as string}
				isInstructionalOverlayOpen={isInstructionalOverlayOpen}
				onClose={onClose}
				initRef={initRef}
			/>
		</main>
	);
};

export default AssignmentView;
