import { API } from '../lib/environment';

export async function bootstrap(request: Request) {
	try {
		const url = new URL(request.url);
		const abbrevName = url.searchParams.get('abbrevName');
		if (abbrevName) {
			const response = await fetch(
				`${API}/v2/bootstrap/account-info?name=${abbrevName}`,
			);
			return await response.json();
		}

		return false;
	} catch (e: any) {
		throw new Error(
			`bootstrap call failed, check if your database is running and restart your backend: ${e.message}`,
		);
	}
}
