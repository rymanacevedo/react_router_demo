import { LoaderFunction } from 'react-router-dom';
import { redirect } from 'react-router-dom';
import { z } from 'zod';

export const AccountInformationSchema = z.object({
	abbrevName: z.string(),
	userAltKey: z.string(),
});

export type AccountInformation = z.infer<typeof AccountInformationSchema>;
export const loader: LoaderFunction = async ({ params }) => {
	const { abbrevName, userAltKey } = params as AccountInformation;

	return redirect(`/signup?abbrevName=${abbrevName}`, {});
};
