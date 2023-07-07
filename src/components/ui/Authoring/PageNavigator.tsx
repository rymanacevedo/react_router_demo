import React from 'react';
import { Text } from '@chakra-ui/react';
import PageNavigatorButton from './PageNavigatorButton';

interface PageNavigatorProps {
	currentPage: number;
	pagesTotalCount: number;
	href: string;
}

const PageNavigator = ({
	currentPage,
	pagesTotalCount,
	href,
}: PageNavigatorProps) => {
	if (pagesTotalCount === 1) {
		// if there is only one page then don't show any page navigation
		return <></>;
	}

	// show link to previous page, links to 2 pages before the current page, links to 2 pages after current page, and link to next page

	let previousPage = currentPage > 1 ? currentPage - 1 : undefined;
	let previousPages = [currentPage - 2, currentPage - 1].filter(
		(page) => page > 0,
	);
	let morePreviousPages = currentPage - 2 > 1;

	let nextPage =
		currentPage + 1 <= pagesTotalCount ? currentPage + 1 : undefined;
	let nextPages = [currentPage + 1, currentPage + 2].filter(
		(page) => page < pagesTotalCount + 1,
	);
	let moreNextPages = currentPage + 2 < pagesTotalCount + 1;

	let mkhref = (page: number | undefined) =>
		page ? href + '/' + page : undefined;

	return (
		<>
			{previousPage && (
				<PageNavigatorButton href={mkhref(previousPage)} text={'<'} />
			)}
			{morePreviousPages && <Text>&hellip;</Text>}
			{previousPages.map((page) => (
				<PageNavigatorButton href={mkhref(page)} text={page} />
			))}
			<PageNavigatorButton
				text={currentPage}
				href={mkhref(currentPage)}
				variant={'outline'}
			/>
			{nextPages.map((page) => (
				<PageNavigatorButton href={mkhref(page)} text={page} />
			))}
			{moreNextPages && <Text>&hellip;</Text>}
			{nextPage && <PageNavigatorButton href={mkhref(nextPage)} text={'>'} />}
		</>
	);
};

export default PageNavigator;

// END
