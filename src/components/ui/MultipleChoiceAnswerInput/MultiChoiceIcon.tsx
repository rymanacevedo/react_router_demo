import React, { memo } from 'react';

const CustomCircleIcon = ({
	id,
	color = 'currentColor',
	d,
	strokeWidth,
	fill = 'none',
	viewBox = '0 0 100 100',
	...props
}: {
	id: string;
	color: string;
	d: string;
	strokeWidth: number;
	fill?: string;
	viewBox?: string;
	[key: string]: any;
}) => {
	const { boxSize, fillOpacity, isIndeterminate, isChecked, ...rest } = props;
	return (
		<svg
			id={id}
			className={'custom-circle-icon'}
			aria-hidden={'true'}
			width={boxSize}
			height={boxSize}
			viewBox={viewBox}
			color={color}
			{...rest}>
			<g>
				<path
					d={d}
					fill={fill}
					stroke="currentColor"
					strokeWidth={strokeWidth}
				/>
				{isIndeterminate && (
					<path d={d} fill={color} fillOpacity={fillOpacity} />
				)}
				{
					<circle
						cx={50}
						cy={50}
						r={isIndeterminate ? 15 : isChecked ? 46 : 0}
						fill="#257CB5"
						style={{
							transition: 'all 300ms ease-in-out',
							transform: 'scale(1)',
						}}
					/>
				}
			</g>
		</svg>
	);
};

const CustomIcon = ({ isIndeterminate, isChecked }: any) => {
	const color = '#257CB5';
	const size = '3rem';
	// this is what draws the circle
	const d = 'M6,50a44,44 0 1,0 88,0a44,44 0 1,0 -88,0';
	return (
		<>
			{isIndeterminate ? (
				<CustomCircleIcon
					id={'custom-indeterminate-icon'}
					color={color}
					d={d}
					strokeWidth={7}
					fillOpacity={0.1}
					boxSize={size}
					isIndeterminate={isIndeterminate}
				/>
			) : isChecked ? (
				<CustomCircleIcon
					id={'custom-checked-icon'}
					color={color}
					d={d}
					strokeWidth={7}
					boxSize={size}
					isChecked={isChecked}
				/>
			) : (
				<CustomCircleIcon
					id={'custom-unchecked-icon'}
					color={'black'}
					fill={'none'}
					d={d}
					strokeWidth={3}
					boxSize={size}
				/>
			)}
		</>
	);
};

export default memo(CustomIcon);
