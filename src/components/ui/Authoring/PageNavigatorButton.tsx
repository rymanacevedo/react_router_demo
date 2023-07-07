import { Button, Text } from '@chakra-ui/react';
import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { ChevronLeftIcon, ChevronRightIcon } from '@radix-ui/react-icons';

interface PageNavigatorButtonProps {
	text: string | number;
	href?: string;
	isDisabled?: boolean;
	variant?: string;
}

const PageNavigatorButton = ({
	text,
	href,
	isDisabled,
	variant,
}: PageNavigatorButtonProps) => {
	return (
		<Button
			as={RouterLink}
			to={href}
			variant={variant || 'ghost'}
			size={'sm'}
			isDisabled={!href || isDisabled}
			style={{ textDecoration: 'none', padding: 0 }}>
			{text === '<' ? (
				<ChevronLeftIcon />
			) : text === '>' ? (
				<ChevronRightIcon />
			) : (
				<Text fontSize={'md'} fontWeight={'normal'}>
					{text}
				</Text>
			)}
		</Button>
	);
};

export default PageNavigatorButton;

// END
