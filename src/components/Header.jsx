import React, { memo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from './navigation/Navigation';
import { useAuth } from '../hooks/useAuth';

function Header() {
	const nav = useNavigate();
	const { user, logout } = useAuth();

	const navigateAccountMap = {
		'v8-switch-account': {
			name: 'switch account',
			navlink: 'switch-account',
			order: 1,
			priority: 2,
		},
		'v8-account-link': {
			name: 'account',
			navlink: 'account',
			order: 2,
			priority: 3,
		},
		'v8-authoring-link': {
			name: 'authoring',
			navlink: 'authoring',
			order: 3,
			priority: 5,
		},
		'v8-reporting-link': {
			name: 'reporting',
			navlink: 'reporting',
			order: 4,
			priority: 6,
		},
		'v8-courses-link': {
			name: 'courses',
			navlink: 'courses',
			order: 5,
			priority: 4,
		},
		'v8-learning-link': {
			name: 'learning',
			navlink: 'learning',
			order: 6,
			priority: 1,
		},
	};

	const rolesMap = {
		'System Admin': [
			'v8-account-link',
			'v8-authoring-link',
			'v8-courses-link',
			'v8-learning-link',
			'v8-reporting-link',
			'v8-switch-account',
		],
		'Setup Admin': ['v8-account-link'],
		'Account Admin': ['v8-account-link'],
		'Course Admin': ['v8-account-link'],
		'Author-view-only': ['v8-authoring-link'],
		Author: ['v8-authoring-link'],
		Publisher: ['v8-authoring-link'],
		NDE: ['v8-authoring-link'],
		'Report Viewer': ['v8-reporting-link'],
		'Data Analyst': ['v8-reporting-link'],
		Instructor: ['v8-courses-link', 'v8-learning-link', 'v8-reporting-link'],
		Learner: ['v8-learning-link'],
	};

	const tabs = [];
	const toggleMenu = () => {
		const menu = document.querySelector('.sub-nav');
		const button = document.querySelector('#logout-toggle');
		menu.classList.toggle('open');
		// eslint-disable-next-line @typescript-eslint/no-unused-expressions
		button.getAttribute('aria-expanded') === 'true'
			? button.setAttribute('aria-expanded', 'false')
			: button.setAttribute('aria-expanded', 'true');
	};

	const buildNavigation = () => {
		// eslint-disable-next-line @typescript-eslint/no-shadow
		for (const { name } of user.roles) {
			rolesMap[name].forEach((role) => {
				if (!tabs.some((tab) => tab.key === role)) {
					tabs.push(Navigation(role, navigateAccountMap[role]));
				}
			});
		}

		// sort tabs by navigateAccountMap order
		tabs.sort((a, b) => {
			return navigateAccountMap[a.key].order < navigateAccountMap[b.key].order
				? -1
				: 1;
		});
		return (
			<ul>
				{tabs.length > 1 ? tabs.map((tab) => tab) : null}
				<li id="v8-logout-link">
					<button
						onClick={toggleMenu}
						id="logout-toggle"
						aria-expanded="false"
						aria-controls="logout">
						{user.firstName} {user.lastName}
						<i className="chevron-down-white"></i>
					</button>
					<ul id="logout" className="absolute sub-nav z-9999">
						<li className="logoutButton">
							{/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
							<a
								tabIndex="0"
								onClick={logout}
								className="p-15 pr-140 pl-25 bold remove-text-decoration">
								Logout
							</a>
						</li>
					</ul>
				</li>
			</ul>
		);
	};

	useEffect(() => {
		// filter tabs by priority
		const highestPriority = Math.max(
			...tabs.map((tab) => navigateAccountMap[tab.key].priority),
		);
		const filteredTabs = tabs.filter(
			(tab) => navigateAccountMap[tab.key].priority === highestPriority,
		);
		const link = navigateAccountMap[filteredTabs[0].key].navlink;
		nav(link);
	}, [user]);

	return (
		<nav
			style={{
				display: 'flex',
				backgroundColor: '#283c58',
			}}>
			<img
				className="gwt-Image"
				alt=""
				src="data:image/png;base64,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"
				width="275"
				height="90"
			/>
			{buildNavigation()}
		</nav>
	);
}

export default memo(Header);
