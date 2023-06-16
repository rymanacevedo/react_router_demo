import { getSmartRefresher } from '../services/learning';
import { requireUser } from '../utils/user';
import { getSubAccount } from '../services/utils';
import { ActionFunction, redirect } from 'react-router-dom';

export const refresherAction: ActionFunction = async ({ request }) => {
	const cloneData = request.clone();
	const url = new URL(cloneData.url);
	const user = requireUser();
	const formData = await cloneData.formData();
	const isFocused = formData.get('isFocused');

	const { subAccount } = getSubAccount(user);
	const assignmentKey = url.searchParams.get('assignmentKey');

	if (assignmentKey) {
		const { data, response } = await getSmartRefresher(
			user,
			subAccount,
			assignmentKey,
			isFocused === 'true',
		);
		if (!response.ok) {
			throw Error('Error getting smart refresher');
		}
		return redirect(`/learning/moduleIntro/${data.assignmentKey}`);
	}

	return null;
};
