import { useEffect, useRef, useState } from 'react';
import { Modal, ModalOverlay } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import { Cookies } from 'react-cookie-consent';
import AssignmentComponent from '../../ui/Assignment/AssignmentComponent';

const AssignmentView = () => {
	const [isInstructionalOverlayOpen, setIsInstructionalOverlayOpen] = useState(
		!Cookies.get('instructional_overlay'),
	);
	const [hasNotSeenTour] = useState(!Cookies.get('seen_tour'));
	const initRef = useRef(null);
	const { assignmentKey } = useParams();
	const navigate = useNavigate();
	const onClose = () => {
		setIsInstructionalOverlayOpen(false);
		Cookies.set('instructional_overlay', window.btoa('instructional_overlay'), {
			path: '/',
		});
	};

	useEffect(() => {
		if (!window.location.href.includes('tour') && hasNotSeenTour) {
			navigate('tour');
		}
	}, []);

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
