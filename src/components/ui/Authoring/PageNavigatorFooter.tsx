import React from 'react';
import { Flex, Spacer, Text } from '@chakra-ui/react';
import PageNavigator from './PageNavigator';

interface PageNavigatorFooterProps {
	currentPage: number;
	pagesTotalCount: number;
	itemsCurrentCount: number;
	itemsTotalCount: number;
	href: string;
}

const PageNavigatorFooter = ({
	currentPage,
	pagesTotalCount,
	itemsCurrentCount,
	itemsTotalCount,
	href,
}: PageNavigatorFooterProps) => {
	return (
		<Flex paddingTop={8}>
			{itemsCurrentCount > 0 && (
				<Text fontSize={'md'}>
					Showing {itemsCurrentCount} of {itemsTotalCount}
				</Text>
			)}
			<Spacer />
			<PageNavigator
				currentPage={currentPage}
				pagesTotalCount={pagesTotalCount}
				href={href}
			/>
		</Flex>
	);
};

export default PageNavigatorFooter;

// END
