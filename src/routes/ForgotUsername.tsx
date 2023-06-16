import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import ReCAPTCHA from 'react-google-recaptcha';
import {
	Form,
	ActionFunctionArgs,
	redirect,
	useActionData,
	ActionFunction,
	useNavigate,
	useOutletContext,
} from 'react-router-dom';
import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	HStack,
	Input,
	Text,
} from '@chakra-ui/react';
import { AuthLayoutContext } from '../components/login/AuthLayout';
import { z } from 'zod';
import AlertMessage from '../components/ui/AlertMessage';
import { badRequest } from '../services/utils';
import { getForgotUsernameData } from '../services/auth.reactrouter';

type InferSafeParseErrors<T extends z.ZodType<any, any, any>, U = string> = {
	formErrors: U[];
	fieldErrors: {
		[P in keyof z.infer<T>]?: U[];
	};
};

export const ForgotUsernameFieldsSchema = z.object({
	email: z.string().email(),
	accountUid: z.string().min(1),
	'g-recaptcha-response': z.string().refine((value) => value.length > 0, {
		message: 'Please complete the CAPTCHA',
	}),
});

export type ForgotUsernameFields = z.infer<typeof ForgotUsernameFieldsSchema>;
type ForgotUsernameFieldsErrors = InferSafeParseErrors<
	typeof ForgotUsernameFieldsSchema
>;

export type ActionData<T> = {
	fields: T;
	errors?: T extends ForgotUsernameFields ? ForgotUsernameFieldsErrors : any;
};

export const forgotUsernameAction: ActionFunction = async ({
	request,
}: ActionFunctionArgs) => {
	const clonedData = request.clone();
	const formData = await clonedData.formData();
	const fields = Object.fromEntries(
		formData.entries(),
	) as unknown as ForgotUsernameFields;

	const result = ForgotUsernameFieldsSchema.safeParse(fields);
	if (!result.success) {
		return badRequest({
			fields,
			errors: result.error.flatten(),
		});
	}

	const { data, response } = await getForgotUsernameData(fields);

	if (!response.ok) {
		if (data.items) {
			const items = data.items;

			if (items && items[0].message === 'email address not found') {
				return badRequest({
					fields,
					errors: {
						formErrors: ['email address not found'],
						fieldsErrors: {
							email: ['email address not found'],
						},
					},
				});
			}

			if (items && items[0].message === 'invalid email address') {
				return badRequest({
					fields,
					errors: {
						formErrors: ['invalid email address'],
						fieldsErrors: {
							email: ['invalid email address'],
						},
					},
				});
			}

			if (items && items[0].message) {
				return badRequest({
					fields,
					errors: {
						formErrors: ['Uh oh, something went wrong'],
						fieldErrors: {},
					},
				});
			}
		}
	}

	return redirect('/success?successMessageToShow=forgotUsername');
};

export default function ForgotUsername() {
	const actionData = useActionData() as ActionData<ForgotUsernameFields>;
	const navigate = useNavigate();
	const context = useOutletContext<AuthLayoutContext>();
	const { t: i18n } = useTranslation();
	const recaptchaRef = useRef() as any;

	return (
		<>
			<Heading textAlign="center" fontSize="28px">
				{i18n('pleaseEnterEmailAddress')}
			</Heading>
			<Form method="post">
				<Text align="center">{i18n('weWillSendEmail')}</Text>

				<FormControl isRequired>
					<FormLabel marginBottom={1}>{i18n('emailLabel')}</FormLabel>
					<Input
						id="email"
						type="email"
						placeholder="name@email.com"
						name="email"
					/>
					<FormErrorMessage>{i18n('enterEmailAddress')}</FormErrorMessage>
				</FormControl>

				{context.recaptcha && (
					<ReCAPTCHA
						style={{ margin: '24px' }}
						sitekey={context.recaptcha}
						ref={recaptchaRef}
					/>
				)}
				{/*hidden form control*/}
				<FormControl hidden={true}>
					<Input
						readOnly={true}
						id="accountUid"
						name="accountUid"
						value={context.accountUid}
					/>
				</FormControl>
				<HStack w="100%">
					<Button w="50%" type="submit" name="Login">
						{i18n('submitBtnText')}
					</Button>
					<Button
						w="50%"
						variant="ampOutline"
						name="cancel"
						onClick={() => {
							navigate(-1);
						}}>
						{i18n('cancelBtnText')}
					</Button>
				</HStack>
			</Form>
			{(actionData?.errors?.formErrors &&
				actionData.errors.formErrors.length > 0 && (
					<AlertMessage text={actionData.errors.formErrors[0]} />
				)) ||
				(actionData?.errors?.fieldErrors &&
					actionData.errors.fieldErrors['g-recaptcha-response'] && (
						<AlertMessage
							text={actionData.errors.fieldErrors['g-recaptcha-response'][0]}
						/>
					))}
		</>
	);
}
