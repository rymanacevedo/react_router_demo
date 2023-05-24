import { useRef } from 'react';
import {
	Form,
	Link as ReactRouterLink,
	useActionData,
	useOutletContext,
} from 'react-router-dom';
import ReCAPTCHA from 'react-google-recaptcha';
import { useTranslation } from 'react-i18next';
import {
	Button,
	FormControl,
	FormErrorMessage,
	FormLabel,
	Heading,
	HStack,
	Input,
	Link,
	ListItem,
	Text,
	UnorderedList,
	VStack,
} from '@chakra-ui/react';
import AlertMessage from '../ui/AlertMessage';
import { AuthLayoutContext } from '../login/AuthLayout';
import { ActionData } from '../login/LoginForm';
import { RegisterSchema } from '../../lib/validator';
import { z } from 'zod';

export type RegisterFields = z.infer<typeof RegisterSchema>;
export default function Register() {
	const context = useOutletContext<AuthLayoutContext>();
	const actionData = useActionData() as ActionData<RegisterFields>;
	const { t: i18n } = useTranslation();
	const recaptchaRef = useRef() as any;

	const renderText = () => {
		return (
			<>
				<Heading as="h2" size="md">
					{i18n('passwordRequirements', undefined, {
						numberOfCriteria: 3,
						charactersNumber: 5,
					})}
				</Heading>
				<UnorderedList>
					<ListItem>{i18n('upperCaseRule')}</ListItem>
					<ListItem>{i18n('lowerCaseRule')}</ListItem>
					<ListItem>{i18n('digitRule')}</ListItem>
					<ListItem>{i18n('specialCharacterRule')}</ListItem>
				</UnorderedList>

				<Text>
					If you are already registered,{' '}
					<Link
						as={ReactRouterLink}
						to={{
							pathname: '/login',
							search: `?abbrevName=${context.abbrevNameState}`,
						}}
						color="ampSecondary.500"
						textDecoration="underline">
						{i18n('clickHere')}
					</Link>{' '}
					{i18n('toLogIn')}
				</Text>
			</>
		);
	};

	return (
		<>
			<Heading as="h1" size="lg">
				{i18n('enrollCompleteFormText')}
			</Heading>
			<Form method="post">
				<HStack spacing={5}>
					{/*<PersonalDetails actionData={actionData} />*/}
					<VStack>
						<FormControl
							isRequired
							isInvalid={Boolean(actionData?.errors?.fieldErrors.firstName)}>
							<FormLabel marginBottom={1}>{i18n('first name')}</FormLabel>
							<Input id="firstName" placeholder="first name" name="firstName" />
							<FormErrorMessage>{i18n('enterFirstName')}</FormErrorMessage>
						</FormControl>

						<FormControl
							isRequired
							isInvalid={Boolean(actionData?.errors?.fieldErrors.lastName)}>
							<FormLabel marginBottom={1}>{i18n('last name')}</FormLabel>
							<Input id="lastName" placeholder="last name" name="lastName" />
							<FormErrorMessage>{i18n('enterLastName')}</FormErrorMessage>
						</FormControl>

						<FormControl
							isRequired
							isInvalid={Boolean(actionData?.errors?.fieldErrors.emailAddress)}>
							<FormLabel marginBottom={1}>{i18n('email')}</FormLabel>
							<Input
								id="emailAddress"
								placeholder="name@email.com"
								name="emailAddress"
							/>
							<FormErrorMessage>{i18n('enterEmailAddress')}</FormErrorMessage>
						</FormControl>
					</VStack>
					{/*<UserDetails actionData={actionData} />*/}
					<VStack>
						<FormControl
							isRequired
							isInvalid={Boolean(actionData?.errors?.fieldErrors.username)}>
							<FormLabel marginBottom={1}>{i18n('username')}</FormLabel>
							<Input
								id="username"
								placeholder="name@email.com"
								name="username"
							/>
							<FormErrorMessage>{i18n('enterUsername')}</FormErrorMessage>
						</FormControl>

						<FormControl
							isRequired
							isInvalid={Boolean(actionData?.errors?.fieldErrors.password)}>
							<FormLabel marginBottom={1}>{i18n('password')}</FormLabel>
							<Input
								id="password"
								placeholder="password"
								type="password"
								name="password"
							/>
							<FormErrorMessage>{i18n('enterPassword')}</FormErrorMessage>
						</FormControl>

						<FormControl
							isRequired
							isInvalid={Boolean(
								actionData?.errors?.fieldErrors.confirmPassword,
							)}>
							<FormLabel marginBottom={1}>{i18n('confirmPassword')}</FormLabel>
							<Input
								id="confirmPassword"
								placeholder="confirm password"
								type="password"
								name="confirmPassword"
							/>
							<FormErrorMessage>{i18n('enterPassword')}</FormErrorMessage>
						</FormControl>
					</VStack>
				</HStack>
				{/*hidden form control*/}
				<FormControl hidden={true}>
					<Input
						readOnly={true}
						id="accountUid"
						name="accountUid"
						value={context.accountUid}
					/>
				</FormControl>
				{/*hidden form control*/}
				<FormControl hidden={true}>
					<Input
						readOnly={true}
						id="subAccount"
						name="subAccount"
						value={context.abbrevNameState}
					/>
				</FormControl>
				{context.recaptcha && (
					<ReCAPTCHA ref={recaptchaRef} sitekey={context.recaptcha} />
				)}
				<Button type="submit">{i18n('submitBtnText')}</Button>
				{renderText()}
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
