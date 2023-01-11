import { useState, useContext } from 'react';
import axios from 'axios';

import DialogContext from '../components/DialogProvider';

const useInitialAccountDataService = () => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const { setShowAlert } = useContext(DialogContext);
	const fetchInitialAccountData = async (abbrevName) => {
		try {
			setLoading(true);
			const accountDataResponse = await axios({
				url: `/v2/bootstrap/account-info?name=${abbrevName}`,

				headers: {
					'Content-Type': 'application/json',
				},
				dataType: 'json',
				method: 'GET',
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
	return { error, loading, fetchInitialAccountData };
};
export default useInitialAccountDataService;
