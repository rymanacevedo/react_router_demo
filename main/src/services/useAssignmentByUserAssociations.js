import { useState } from 'react';
import axios from 'axios';

const useAssignmentByUserAssociations = () => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const getAssignments = async () => {
		try {
			setLoading(true);
			const assignmentDataResponse = await axios({
				url: 'v2/user-associations?courseCurricKey=P5HWFY38U&hideUnassigned=false&isWebapp=true&subaccount=D8FCK9GWY',

				headers: {
					'Content-Type': 'application/json',
				},
				dataType: 'json',
				method: 'GET',
			});

			return assignmentDataResponse.data;
		} catch (err) {
			console.log(err);
			setError(err);
		} finally {
			setLoading(false);
		}
	};
	return { error, loading, getAssignments };
};
export default useAssignmentByUserAssociations;
