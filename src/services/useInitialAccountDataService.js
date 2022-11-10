import { useState } from 'react';
import axios from 'axios';

const useInitialAccountDataService = () => {
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);
	const fetchInitialAccountData = async (abbrevName) => {
		try {
			setLoading(true);
			const accountDataResponse = await axios({
				url: `${window.KF.state.baseUri}/v2/bootstrap/account-info?name=${abbrevName}`,

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
		} finally {
			setLoading(false);
		}
	};
	return { error, loading, fetchInitialAccountData };
};
export default useInitialAccountDataService;
