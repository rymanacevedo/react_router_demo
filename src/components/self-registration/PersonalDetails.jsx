import { useTranslation } from 'react-i18next';

import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	VStack,
} from '@chakra-ui/react';

const PersonalDetails = (props) => {
	const { t: i18n } = useTranslation();
	return (
		<VStack>
			<FormControl
				isRequired
				isInvalid={
					props.formError.firstName &&
					(props.formData.firstName === '' ||
						props.formData.firstName.length < 1)
				}>
				<FormLabel marginBottom={1} requiredIndicator>
					{i18n('first name')}
				</FormLabel>
				<Input
					id="firstName"
					placeholder="first name"
					name="firstname"
					onChange={props.handleChange('firstName')}
				/>
				<FormErrorMessage>{i18n('enterFirstName')}</FormErrorMessage>
			</FormControl>

			<FormControl
				isRequired
				isInvalid={
					props.formError.lastName &&
					(props.formData.lastName === '' || props.formData.lastName.length < 1)
				}>
				<FormLabel marginBottom={1} requiredIndicator>
					{i18n('last name')}
				</FormLabel>
				<Input
					id="lastName"
					placeholder="last name"
					name="lastName"
					onChange={props.handleChange('lastName')}
				/>
				<FormErrorMessage>{i18n('enterLastName')}</FormErrorMessage>
			</FormControl>

			<FormControl
				isRequired
				isInvalid={
					props.formError.emailAddress &&
					(props.formData.emailAddress === '' ||
						props.formData.emailAddress.length < 1)
				}>
				<FormLabel marginBottom={1} requiredIndicator>
					{i18n('email')}
				</FormLabel>
				<Input
					id="emailAddress"
					placeholder="name@email.com"
					name="emailAddress"
					onChange={props.handleChange('emailAddress')}
				/>
				<FormErrorMessage>{i18n('enterEmailAddress')}</FormErrorMessage>
			</FormControl>
		</VStack>
	);
};

export default PersonalDetails;
