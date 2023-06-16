import { LoaderFunction } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import { z } from 'zod';

export const AccountInformationSchema = z.object({
	abbrevName: z.string(),
	userAltKey: z.string(),
});

export type AccountInformation = z.infer<typeof AccountInformationSchema>;

export const preSignUpLoader: LoaderFunction = async ({ params }) => {
	const { userAltKey, abbrevName } = params as AccountInformation;
	localStorage.setItem('abbrevName', abbrevName);
	localStorage.setItem('userAltKey', userAltKey);
	return redirect('/signup');
};
