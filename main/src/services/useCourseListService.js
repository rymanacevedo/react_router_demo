import { useState, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';
import axios from 'axios';

import DialogContext from '../components/DialogProvider';

const useCourseListService = () => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { setShowAlert } = useContext(DialogContext);

	const { user } = useAuth();
	let subaccount = '';
	let courseRole = '';
	user.roles.forEach((role) => {
		courseRole = role.name;
		if (role.name === 'Learner') {
			subaccount = role.account;
		}
	});

	const fetchCourseList = async () => {
		try {
			setLoading(true);
			const accountDataResponse = await axios({
				url: `/v2/courses?courseRole=${courseRole}&userKey=${user.userKey}&sort=name%20ASC,displayName%20ASC&subaccount=${subaccount}`,
				headers: {
					Authorization: `Basic ${window.base64.encode(
						`${user.sessionKey}:someotherstring`,
					)}`,
					'Content-type': 'application/json',
				},
				method: 'get',
			});

			return accountDataResponse.data;
		} catch (err) {
			console.log(err);
			setError(err);
			if (err.response.status >= 500) {
				setShowAlert(true);
			}
		} finally {
			setLoading(false);
		}
	};
	return { error, loading, fetchCourseList };
};
export default useCourseListService;
