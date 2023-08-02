import { PropsWithChildren } from 'react';
import { Button, ButtonProps } from '@chakra-ui/react';
import { Link as ReactRouterLink } from 'react-router-dom';

interface AuthoringOutlineButtonProps extends ButtonProps {
	href?: string;
}

const AuthoringOutlineButton = ({
	href,
	children,
	...props
}: PropsWithChildren<AuthoringOutlineButtonProps>) => {
	return href ? (
		<Button
			as={ReactRouterLink}
			to={href}
			variant="outline"
			paddingX={3}
			paddingY={3}
			borderColor="ampPrimary.300"
			color="ampPrimary.600"
			fontWeight="normal"
			{...props}>
			{children}
		</Button>
	) : (
		<Button
			variant="outline"
			paddingX={3}
			paddingY={3}
			borderColor="ampPrimary.300"
			color="ampPrimary.600"
			fontWeight="normal"
			{...props}>
			{children}
		</Button>
	);
};

export default AuthoringOutlineButton;
