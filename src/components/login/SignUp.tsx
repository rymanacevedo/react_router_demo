import { useRef } from 'react';
import {
	ActionFunction,
	ActionFunctionArgs,
	redirect,
	useActionData,
	Form,
	useOutletContext,
	LoaderFunction,
	useLoaderData,
	json,
} from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	Input,
	UnorderedList,
	ListItem,
	Text,
	VStack,
	Flex,
} from '@chakra-ui/react';

import ReCAPTCHA from 'react-google-recaptcha';
import { z } from 'zod';
import { badRequest } from '../../services/utils';
import { getSignupData } from '../../services/auth.reactrouter';
import { AuthLayoutContext } from './AuthLayout';
import AlertMessage from '../ui/AlertMessage';
import { AccountInformation } from '../../routes/SignUpLoader';

type InferSafeParseErrors<T extends z.ZodType<any, any, any>, U = string> = {
	formErrors: U[];
	fieldErrors: {
		[P in keyof z.infer<T>]?: U[];
	};
};

export const SignupFieldsSchema = z
	.object({
		username: z.string().min(1),
		password: z.string().min(1),
		confirmPassword: z.string().min(1),
		accountUid: z.string().min(1),
		userAltKey: z.string().min(1),
		'g-recaptcha-response': z.string().refine((value) => value.length > 0, {
			message: 'Please complete the CAPTCHA',
		}),
	})
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: 'custom',
				message: 'Your passwords do not match',
			});
		}

		if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(password)) {
			ctx.addIssue({
				code: 'custom',
				message:
					'Your password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
			});
		}
	});

type SignupFields = z.infer<typeof SignupFieldsSchema>;
type SignupFieldsErrors = InferSafeParseErrors<typeof SignupFieldsSchema>;

export type ActionData<T> = {
	fields: T;
	errors?: T extends SignupFields ? SignupFieldsErrors : any;
};

export const signupAction: ActionFunction = async ({
	request,
}: ActionFunctionArgs) => {
	const clonedData = request.clone();
	const formData = await clonedData.formData();
	const fields = Object.fromEntries(formData.entries()) as SignupFields;
	const result = SignupFieldsSchema.safeParse({
		username: fields.username,
		password: fields.password,
		confirmPassword: fields.confirmPassword,
		accountUid: fields.accountUid,
		userAltKey: fields.userAltKey,
		'g-recaptcha-response': fields['g-recaptcha-response'],
	});

	if (!result.success) {
		return badRequest({
			fields,
			errors: result.error.flatten(),
		});
	}

	const { data } = await getSignupData(
		fields.userAltKey,
		fields.accountUid,
		fields.username,
		fields.password,
		fields['g-recaptcha-response'],
	);

	if (Object.keys(data).length > 0) {
		const items = data.items;

		if (
			data.errorMessage &&
			data.errorMessage === 'username is not available'
		) {
			return badRequest({
				fields,
				errors: {
					formErrors: ['username is not available'],
					fieldErrors: {
						username: ['username is not available'],
					},
				},
			});
		}

		if (
			items[0].message &&
			items[0].message === 'Alternate Key must be 9 characters in length'
		) {
			return badRequest({
				fields,
				errors: {
					formErrors: ['Alternate Key must be 9 characters in length'],
					fieldErrors: {
						userAltKey: ['Alternate Key must be 9 characters in length'],
					},
				},
			});
		}

		if (
			items[0].message &&
			items[0].message === 'Alternate Key has illegal characters'
		) {
			return badRequest({
				fields,
				errors: {
					formErrors: ['Alternate key has illegal characters'],
					fieldErrors: {
						accountUid: ['Alternate key has illegal characters'],
					},
				},
			});
		}
	} else {
		localStorage.removeItem('abbrevName');
		localStorage.removeItem('userAltKey');
		return redirect('/success?successMessageToShow=signUp');
	}
};

export const signupLoader: LoaderFunction = async () => {
	const userAltKey = localStorage.getItem('userAltKey');
	if (userAltKey) {
		return json(userAltKey);
	}

	throw new Error('userAltKey not found');
};

function SignUp() {
	const { t: i18n } = useTranslation();
	const context = useOutletContext<AuthLayoutContext>();
	const actionData = useActionData() as ActionData<SignupFields>;
	const userAltKey = useLoaderData() as AccountInformation;
	const recaptchaRef = useRef<ReCAPTCHA | null>(null);

	return (
		<>
			<VStack
				spacing="20px"
				w={{ base: '100%', md: '358px' }}
				alignItems="center"
				justifyContent="center">
				<Form method="post">
					<Heading
						alignContent="center"
						size="lg"
						mb={'20px'}
						fontSize={25}
						whiteSpace="nowrap">
						<p>{i18n('signUpText')}</p>
					</Heading>

					<FormControl
						isRequired
						isInvalid={Boolean(actionData?.errors?.fieldErrors.username)}
						mb={4}>
						<FormLabel mb={4}>{i18n('username')}</FormLabel>
						<Input
							id="username"
							autoFocus
							placeholder="name@email.com"
							name="username"
							maxLength={100}
						/>
						<FormErrorMessage>{i18n('enterUsername')}</FormErrorMessage>
					</FormControl>

					<FormControl
						isRequired
						isInvalid={Boolean(actionData?.errors?.fieldErrors.password)}
						mb={4}>
						<FormLabel mb={4}>{i18n('password')}</FormLabel>
						<Input
							id="newPassword"
							type="password"
							placeholder={i18n('password')}
							name="password"
						/>
						<FormErrorMessage>{i18n('enterPassword')}</FormErrorMessage>
					</FormControl>

					<FormControl
						isRequired
						isInvalid={Boolean(actionData?.errors?.fieldErrors.confirmPassword)}
						mb="20px">
						<FormLabel mb={4}>{i18n('reenterPasswordFormLabel')}</FormLabel>
						<Input
							id="newPassword2"
							type="password"
							placeholder={i18n('reenterPasswordFormLabel')}
							name="confirmPassword"
						/>
						<FormErrorMessage>{i18n('enterPassword')}</FormErrorMessage>
					</FormControl>

					<Flex direction="column" alignItems="center" w="100%">
						{context.recaptcha && (
							<ReCAPTCHA sitekey={context.recaptcha} ref={recaptchaRef} />
						)}
					</Flex>

					{/* hidden form control */}
					<FormControl hidden={true}>
						<Input
							readOnly={true}
							id="userAltKey"
							name="userAltKey"
							value={userAltKey as unknown as string}
						/>
					</FormControl>

					{/* hidden form control */}
					<FormControl hidden={true}>
						<Input
							readOnly={true}
							id="accountUid"
							name="accountUid"
							value={context.accountUid}
						/>
					</FormControl>

					<Button w="full" type="submit" name="Login" mt="20px">
						{i18n('continueBtnText')}
					</Button>

					<Text mt={'20px'}>{i18n('passwordRuleText')}</Text>
					<UnorderedList>
						<ListItem>{i18n('upperCaseRule')}</ListItem>
						<ListItem>{i18n('lowerCaseRule')}</ListItem>
						<ListItem>{i18n('digitRule')}</ListItem>
						<ListItem>{i18n('specialCharacterRule')}</ListItem>
					</UnorderedList>
				</Form>
				{(actionData?.errors?.formErrors &&
					actionData.errors.formErrors.length > 0 && (
						<AlertMessage text={actionData.errors.formErrors[0]} />
					)) ||
					(actionData?.errors?.fieldErrors &&
						actionData.errors.fieldErrors.userAltKey && (
							<AlertMessage
								text={actionData.errors.fieldErrors.userAltKey[0]}
							/>
						)) ||
					(actionData?.errors?.fieldErrors &&
						actionData.errors.fieldErrors.accountUid && (
							<AlertMessage
								text={actionData.errors.fieldErrors.accountUid[0]}
							/>
						)) ||
					(actionData?.errors?.fieldErrors &&
						actionData.errors.fieldErrors['g-recaptcha-response'] && (
							<AlertMessage
								text={actionData.errors.fieldErrors['g-recaptcha-response'][0]}
							/>
						))}
			</VStack>
		</>
	);
}

export default SignUp;
