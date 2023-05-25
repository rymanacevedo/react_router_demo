import {
	Button,
	Center,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Flex,
	Heading,
	HStack,
	VStack,
	Input,
	Text,
} from '@chakra-ui/react';
import { useRef } from 'react';
import ReCAPTCHA, { ReCAPTCHA as ReCAPTCHAType } from 'react-google-recaptcha';
import { useTranslation } from 'react-i18next';
import {
	ActionFunctionArgs,
	Form,
	redirect,
	useActionData,
	useNavigate,
	useOutletContext,
} from 'react-router-dom';
import { getForgotPasswordData } from '../../services/auth.reactrouter';
import { z } from 'zod';
import AlertMessage from '../../components/ui/AlertMessage';
import { badRequest } from '../../services/utils';
import { AuthLayoutContext } from './AuthLayout';

type InferSafeParseErrors<T extends z.ZodType<any, any, any>, U = string> = {
	formErrors: U[];
	fieldErrors: {
		[P in keyof z.infer<T>]?: U[];
	};
};

export const ForgotPasswordFieldsSchema = z.object({
	username: z.string().min(1).max(100),
	accountUid: z.string().min(1),
	'g-recaptcha-response': z.string().refine((value) => value.length > 0, {
		message: 'Please complete the CAPTCHA',
	}),
});

export type ForgotPasswordFields = z.infer<typeof ForgotPasswordFieldsSchema>;
type ForgotPasswordFieldsErrors = InferSafeParseErrors<
	typeof ForgotPasswordFieldsSchema
>;

export type ActionData<T> = {
	fields: T;
	errors?: T extends ForgotPasswordFields ? ForgotPasswordFieldsErrors : any;
};

export const forgotPasswordAction = async ({ request }: ActionFunctionArgs) => {
	const clonedData = request.clone();
	const formData = await clonedData.formData();
	const fields = Object.fromEntries(
		formData.entries(),
	) as unknown as ForgotPasswordFields;

	const result = ForgotPasswordFieldsSchema.safeParse(fields);
	if (!result.success) {
		return badRequest({
			fields,
			errors: result.error.flatten(),
		});
	}

	const { data } = await getForgotPasswordData(fields);
	const items = data.items;
	if (items && items[0].message === 'an error has occurred') {
		//TODO: 	setErrorMessage(i18n('passwordResetError'));
		return badRequest({
			fields,
			errors: {
				formErrors: ['an error has occurred'],
				fieldErrors: {
					username: ['an error has occurred'],
				},
			},
		});
	}

	if (items && items[0].message === 'unable to validate captcha') {
		// TODO: 	setErrorMessage(i18n('passwordResetError'));
		return badRequest({
			fields,
			errors: {
				formErrors: ['unable to validate captcha'],
				fieldErrors: {
					'g-recaptcha-response': ['unable to validate captcha'],
				},
			},
		});
	}

	return redirect('/success');
};

export default function ForgotPassword() {
	const navigate = useNavigate();
	const actionData = useActionData() as ActionData<ForgotPasswordFields>;
	const context = useOutletContext<AuthLayoutContext>();
	const { t: i18n } = useTranslation();
	const recaptchaRef = useRef<ReCAPTCHAType | null>(null);
	const mailParts = actionData.fields.username.split('@');
	const obsfucatedEmail = `${mailParts[0].slice(0, 1)}...${mailParts[0].slice(
		-1,
	)}@${mailParts[1]}`;

	return (
		<VStack spacing={5} w={{ base: '100%', md: '358px' }}>
			<Heading textAlign="center" fontSize="28px">
				{i18n('enterUsername')}
			</Heading>
			<Form method="post" noValidate>
				<Text align="center">{i18n('weWillSendPasswordResetEmail')}</Text>
				<FormControl
					isRequired
					isInvalid={Boolean(actionData?.errors?.fieldErrors.username)}
					mt={5}>
					<FormLabel marginBottom={1} requiredIndicator={<span></span>}>
						{i18n('username')}
						<Text float="right" fontSize="12px">
							{i18n('typicallyEmail')}
						</Text>
					</FormLabel>
					<Input
						id="username"
						placeholder="name@email.com"
						name="username"
						maxLength={100}
					/>
					<FormErrorMessage>{i18n('enterEmailAddress')}</FormErrorMessage>
				</FormControl>

				{context.recaptcha && (
					<Center mt={5}>
						<ReCAPTCHA sitekey={context.recaptcha} ref={recaptchaRef} />
					</Center>
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

				<HStack w="100%" mt={5}>
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
			<Flex
				direction="column"
				grow={1}
				w={{ base: '100%', md: '358px' }}
				align="center"
				justify="center">
				<Center>
					<Text align="center" mb={5}>
						{i18n('forgotPasswordSuccess', {
							email: obsfucatedEmail,
						})}
					</Text>
				</Center>
				<Center>
					<Text align="center">{i18n('pleaseCloseWindow')}</Text>
				</Center>
			</Flex>
		</VStack>
	);
}
