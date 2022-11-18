import { useTranslation } from 'react-i18next';

import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	VStack,
} from '@chakra-ui/react';

const PersonalDetails = ({ handleChange }) => {
	const { t: i18n } = useTranslation();
	return (
		<VStack>
			<FormControl isRequired>
				<FormLabel marginBottom={1} requiredIndicator>
					{i18n('first name')}
				</FormLabel>
				<Input
					id="firstName"
					placeholder="first name"
					name="firstname"
					onChange={handleChange('firstName')}
				/>
				<FormErrorMessage>{i18n('enterFirstName')}</FormErrorMessage>
			</FormControl>

			<FormControl isRequired>
				<FormLabel marginBottom={1} requiredIndicator>
					{i18n('last name')}
				</FormLabel>
				<Input
					id="lastName"
					placeholder="last name"
					name="lastName"
					onChange={handleChange('lastName')}
				/>
				<FormErrorMessage>{i18n('enterLastName')}</FormErrorMessage>
			</FormControl>

			<FormControl isRequired>
				<FormLabel marginBottom={1} requiredIndicator>
					{i18n('email')}
				</FormLabel>
				<Input
					id="emailAddress"
					placeholder="name@email.com"
					name="emailAddress"
					onChange={handleChange('emailAddress')}
				/>
				<FormErrorMessage>{i18n('enterEmailAddress')}</FormErrorMessage>
			</FormControl>
		</VStack>
	);
};

export default PersonalDetails;
