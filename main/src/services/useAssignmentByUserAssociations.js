<<<<<<< HEAD
import { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

=======
import { useState, useContext } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

import DialogContext from '../components/DialogProvider';

>>>>>>> cfccbc521 (add service exception to useAssignmentByUserAssociatione)
const useAssignmentByUserAssociations = () => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { user } = useAuth();
<<<<<<< HEAD
=======
	const { setShowAlert } = useContext(DialogContext);

<<<<<<< HEAD
>>>>>>> cfccbc521 (add service exception to useAssignmentByUserAssociatione)
	let courseCurricKey = '3HD7FRP39';
=======
>>>>>>> 341455984 (Feat: created new useCourseCurriculaListService, refactored useAssignmentByUserAssociations, and useCourseListService, typed AssignmentList, finished logic for learning view)
	let subaccount = '';
	user.roles.forEach((role) => {
		if (role.name === 'Learner') {
			subaccount = role.account;
		}
	});

	const getAssignments = async (courseCurricKey) => {
		try {
			setLoading(true);
			const assignmentDataResponse = await axios({
				method: 'get',
				url: `/v2/user-associations?courseCurricKey=${courseCurricKey}&userKey=CB59UXSUD&hideUnassigned=false&isWebapp=true&subaccount=${subaccount}`,
				headers: {
					Authorization: `Basic ${window.base64.encode(
						`${user.sessionKey}:someotherstring`,
					)}`,
					'Content-type': 'application/json',
				},
			});

			return assignmentDataResponse.data;
		} catch (err) {
			console.log(err);
			setError(err);
<<<<<<< HEAD
=======
			if (err.response.status >= 500) {
				setShowAlert(true);
			}
>>>>>>> cfccbc521 (add service exception to useAssignmentByUserAssociatione)
		} finally {
			setLoading(false);
		}
	};
	return { error, loading, getAssignments };
};
export default useAssignmentByUserAssociations;
