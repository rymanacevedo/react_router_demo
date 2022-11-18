import { useTranslation } from 'react-i18next';

import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	VStack,
} from '@chakra-ui/react';

const UserDetails = ({ handleChange }) => {
	const { t: i18n } = useTranslation();
	return (
		<VStack>
			<FormControl isRequired>
				<FormLabel marginBottom={1} requiredIndicator>
					{i18n('username')}
				</FormLabel>
				<Input
					id="userName"
					placeholder="name@email.com"
					name="username"
					onChange={handleChange('userName')}
				/>
				<FormErrorMessage>{i18n('enterUsername')}</FormErrorMessage>
			</FormControl>

			<FormControl isRequired>
				<FormLabel marginBottom={1} requiredIndicator>
					{i18n('password')}
				</FormLabel>
				<Input
					id="password"
					placeholder="password"
					type="password"
					name="password"
					onChange={handleChange('password')}
				/>
				<FormErrorMessage>{i18n('enterPassword')}</FormErrorMessage>
			</FormControl>

			<FormControl isRequired>
				<FormLabel marginBottom={1} requiredIndicator>
					{i18n('confirmPassword')}
				</FormLabel>
				<Input
					id="confirmPassword"
					placeholder="confirm password"
					type="password"
					name="confirmPassword"
					onChange={handleChange('confirmPassword')}
				/>
				<FormErrorMessage>{i18n('enterPassword')}</FormErrorMessage>
			</FormControl>
		</VStack>
	);
};

export default UserDetails;
