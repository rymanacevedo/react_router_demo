import { memo } from 'react';
import {
	NavLink as ReactRouterNavLink,
	useFetcher,
	useLocation,
} from 'react-router-dom';
import {
	Box,
	ButtonGroup,
	Container,
	Flex,
	HStack,
	Image,
	Menu,
	MenuItem,
	MenuList,
	Text,
	useMediaQuery,
} from '@chakra-ui/react';
import CourseHome from './ui/CourseHome';
import { User } from '../services/user';
import QuickStart from './ui/QuickStart';
import CustomMenuButton from './ui/CustomMenuButton';
import { Tab } from '../services/roles';
import ampLogoWhite from '../ampLogoWhite.svg';

const Header = ({ user, tabs }: { user: User; tabs: Tab[] }) => {
	const location = useLocation();
	const fetcher = useFetcher();
	const inAssignment = location.pathname.indexOf('assignment');
	const inReview = location.pathname.indexOf('review');
	const inPracticeTest = location.pathname.indexOf('timedAssessment');
	const [isLargerThan992] = useMediaQuery('(min-width: 992px)');

	const handleLogout = () => {
		fetcher.load('/logout');
	};

	const Navigation = () => {
		return (
			<ButtonGroup variant="link" boxSizing="border-box">
				{tabs.length > 1
					? tabs.map((tab) => {
							return (
								<ReactRouterNavLink
									style={({ isActive }) => {
										return {
											borderBottom: isActive ? '5px solid white' : '',
											color: 'white',
											margin: '0px 8px',
											height: '60px',
											padding: '25px',
											boxSizing: 'border-box',
										};
									}}
									key={tab.role}
									to={tab.navlink}
									id={tab.id}>
									<Text fontWeight="bold" textAlign={'center'}>
										{tab.name}
									</Text>
								</ReactRouterNavLink>
							);
					  })
					: null}
				<Menu isLazy>
					<CustomMenuButton largerThan992={isLargerThan992} user={user} />
					<MenuList zIndex={'10'} right={'0'}>
						{inAssignment > -1 && !isLargerThan992 ? (
							<MenuItem width={'100%'}>
								<ReactRouterNavLink to="/learning">
									<HStack>
										{/*<ArrowLeftIcon />*/}
										<Text fontWeight="bold">Course Home</Text>
									</HStack>
								</ReactRouterNavLink>
							</MenuItem>
						) : null}
						<MenuItem
							width={'100%'}
							id="header-composite-logout-button"
							onClick={handleLogout}>
							<Text fontWeight="bold">Logout</Text>
						</MenuItem>
					</MenuList>
				</Menu>
			</ButtonGroup>
		);
	};

	return (
		<Box
			as="header"
			bgGradient="linear(to-r, ampSecondaryText, ampPrimary.500)"
			pb={{ base: '0', md: '0' }}
			overflow="hidden">
			<Box maxH={'60px'} as="nav" bg="bg-surface" boxShadow={'sm'}>
				<Container maxH={'60px'} maxW={'100%'} py={{ base: '0', lg: '0' }}>
					<Flex
						as="nav"
						maxH={'60px'} // hardcoded per Andrew's request
						w="full"
						justifyContent="space-between"
						alignItems="center">
						<Image alt="Amplifire Logo" src={ampLogoWhite} height={'40px'} />
						{(inAssignment > -1 || inReview > -1 || inPracticeTest > -1) &&
						isLargerThan992 ? (
							<CourseHome />
						) : null}
						<QuickStart />
						<Navigation />
					</Flex>
				</Container>
			</Box>
		</Box>
	);
};

export default memo(Header);
