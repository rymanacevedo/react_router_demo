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

const Header = ({ user, tabs }: { user: User; tabs: any[] }) => {
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
											height: '80px',
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
			<Box maxH={'80px'} as="nav" bg="bg-surface" boxShadow={'sm'}>
				<Container maxH={'80px'} maxW={'100%'} py={{ base: '0', lg: '0' }}>
					<Flex as="nav" maxH={'80px'} w="full">
						<Image
							alt="Amplifire Logo"
							src="data:image/png;base64,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"
							width="275"
							height="90"
						/>
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
