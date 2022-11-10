import { useAuth } from '../hooks/useAuth';
import useAxios from '../hooks/useAxios';

const useModuleContentService = () => {
	const { user, state } = useAuth();
	const moduleId = '6af13155-a5b1-4741-878c-c6e4d664f73b';
	const headers = {
		Authorization: `Basic ${window.base64.encode(
			`${user.sessionKey}:someotherstring`,
		)}`,
		'Content-type': 'application/json',
	};
	const { data, error, loading } = useAxios(
		`${state.baseUri}/v2/curricula/modules/${moduleId}/version/1`,
		'GET',
		headers,
	);

	return { data, error, loading };
};

export default useModuleContentService;
