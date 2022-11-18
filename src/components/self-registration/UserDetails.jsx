import { useTranslation } from 'react-i18next';

import {
	FormControl,
	FormErrorMessage,
	FormLabel,
	Input,
	VStack,
} from '@chakra-ui/react';

const UserDetails = (props) => {
	const { t: i18n } = useTranslation();
	return (
		<VStack>
			<FormControl
				isRequired
				isInvalid={
					props.formError.userName &&
					(props.formData.userName === '' ||
						props.formData.userName.length <= 1)
				}>
				<FormLabel marginBottom={1} requiredIndicator>
					{i18n('username')}
				</FormLabel>
				<Input
					id="userName"
					placeholder="name@email.com"
					name="username"
					onChange={props.handleChange('userName')}
				/>
				<FormErrorMessage>{i18n('enterUsername')}</FormErrorMessage>
			</FormControl>

			<FormControl
				isRequired
				isInvalid={
					props.formError.password &&
					(props.formData.password === '' ||
						props.formData.password.length < 5 ||
						!/(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/.test(
							props.formData.password,
						))
				}>
				<FormLabel marginBottom={1} requiredIndicator>
					{i18n('password')}
				</FormLabel>
				<Input
					id="password"
					placeholder="password"
					type="password"
					name="password"
					onChange={props.handleChange('password')}
				/>
				<FormErrorMessage>{i18n('enterPassword')}</FormErrorMessage>
			</FormControl>

			<FormControl
				isRequired
				isInvalid={
					props.formError.password &&
					props.formData.confirmPassword !== props.formData.password
				}>
				<FormLabel marginBottom={1} requiredIndicator>
					{i18n('confirmPassword')}
				</FormLabel>
				<Input
					id="confirmPassword"
					placeholder="confirm password"
					type="password"
					name="confirmPassword"
					onChange={props.handleChange('confirmPassword')}
				/>
				<FormErrorMessage>{i18n('enterPassword')}</FormErrorMessage>
			</FormControl>
		</VStack>
	);
};

export default UserDetails;
