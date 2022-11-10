import React from 'react';
import { NavLink } from 'react-router-dom';

const Navigation = (id, { name, navlink }) => {
	return (
		<li key={id} id={id}>
			<NavLink to={navlink}>{name}</NavLink>
		</li>
	);
};

export default Navigation;
