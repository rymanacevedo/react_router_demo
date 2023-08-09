import { extendTheme } from '@chakra-ui/react';
import { Button } from './Buttons';
import { Badge } from './Badges';
import { Tag } from './Tags';
import { Checkbox } from './Checkbox';
import { Link } from './Link';
import { Divider } from './Divider';
import Heading from './Heading';
import { Card } from './Card';
import styled from 'styled-components';
import { Table, TableProps } from 'antd';
import { QuestionStatus } from '../components/ui/TimedAssessment/TimedAssessmentReviewTable';

export const ampTheme = extendTheme({
	styles: {
		global: {
			'html, body': {
				bg: '#ADBECF',
			},
			'h1, h2, h3, h4, h5, h6': {
				fontWeight: '500',
			},
			a: {
				color: '#015B87',
				textDecoration: 'underline',
			},
			h1: {
				fontSize: '3.188rem',
			},
			h2: {
				fontSize: '2rem',
			},
			h3: {
				fontSize: '1.750rem',
			},
			h4: {
				fontSize: '1.312rem',
			},
			h5: {
				fontSize: '1rem',
			},
		},
	},
	fontSizes: {
		// chakra default sizes
		'xl-chakra': '1.25rem',
		'lg-chakra': '1.125',
		'2xl-chakra': '1.5rem',
		'3xl-chakra': '1.875rem',
		// override chakra default sizes
		lg: '1.3125rem',
		xl: '2rem',
		'2xl': '2.375rem',
		'2.5xl': '1.75rem',
		'3xl': '3.188rem',
		// small screens
		's-xs': '0.688rem',
		's-sm': '0.875rem',
		's-md': '1.125rem',
		's-lg': '1.37rem',
		's-xl': '1.688rem',
		's-2xl': '2.125rem',
		// We don't need these sizes for now, scale is 1.333
		// "4xl": "2.25rem",
		// "5xl": "3rem",
		// "6xl": "3.75rem",
		// "7xl": "4.5rem",
		// "8xl": "6rem",
		// "9xl": "8rem",
	},
	space: {
		11: '2.75rem',
		13: '3.25rem',
		15: '3.75rem',
		17: '4.25rem',
		18: '4.5rem',
		19: '4.75rem',
		21: '5.25rem',
		23: '5.75rem',
		25: '6.25rem',
		27: '6.75rem',
		67.5: '16.875rem',
	},
	fonts: {
		heading: 'Proxima-Nova, sans-serif',
		body: 'Proxima-Nova, sans-serif',
	},
	colors: {
		ampWhite: '#FFFFFF',
		ampPrimaryText: '#20252B',
		ampSecondaryText: '#283C58',
		ampTertiaryText: '#7E8A9B',

		//primary blue shades
		ampPrimary: {
			50: '#EAEFF3',
			100: '#D6DFE7',
			200: '#ADBECF',
			300: '#839EB6',
			400: '#5A7D9E',
			500: '#315D86',
			600: '#2D5172',
			700: '#29445D',
			800: '#263849',
			900: '#222B34',
		},
		//secondary blue shades
		ampSecondary: {
			50: '#E9F2F8',
			100: '#D3E5F0',
			200: '#A8CBE1',
			300: '#7CB0D3',
			400: '#5196C4',
			500: '#257CB5',
			600: '#246997',
			700: '#225779',
			800: '#21445C',
			900: '#1F323E',
		},
		//purple shades
		ampTertiary: {
			50: '#F2EFF6',
			100: '#E4DFED',
			200: '#CABEDA',
			300: '#AF9EC8',
			400: '#957DB5',
			500: '#7A5DA3',
			600: '#685189',
			700: '#55446F',
			800: '#433854',
			900: '#302B3A',
		},
		//neutral shades
		ampNeutral: {
			50: '#F5F5F5',
			100: '#EAEBEC',
			200: '#D5D7D8',
			300: '#C1C3C5',
			400: '#ACAFB1',
			500: '#979B9E',
			600: '#7F8285',
			700: '#67696C',
			800: '#4E5152',
			900: '#363839',
		},
		//green shades
		ampSuccess: {
			50: '#ECF3EC',
			100: '#DAE6DA',
			200: '#B5CEB5',
			300: '#90B590',
			400: '#6B9D6B',
			500: '#468446',
			600: '#3E703E',
			700: '#365C37',
			800: '#2E472F',
			900: '#263328',
		},
		//yellow shades
		ampWarning: {
			50: '#FDF8EC',
			100: '#FBF0D8',
			200: '#F7E2B2',
			300: '#F3D38B',
			400: '#EFC565',
			500: '#EBB63E',
			600: '#C29838',
			700: '#997A32',
			800: '#705B2C',
			900: '#473D26',
		},
		//red shades
		ampError: {
			50: '#FCEBE9',
			100: '#F8D7D3',
			200: '#F1AFA6',
			300: '#EB887A',
			400: '#E4604D',
			500: '#DD3821',
			600: '#B73321',
			700: '#912E21',
			800: '#6A2920',
			900: '#442420',
		},
		//teal shades
		ampInfo: {
			50: '#E7F2F1',
			100: '#D0E6E3',
			200: '#A0CDC7',
			300: '#71B3AA',
			400: '#419A8E',
			500: '#128172',
			600: '#126D62',
			700: '#125A51',
			800: '#124641',
			900: '#123330',
		},
	},
	textStyles: {
		h1: {
			fontSize: ['48px', '72px'],
			fontWeight: 'bold',
			lineHeight: '110%',
			letterSpacing: '-2%',
		},
		h2: {
			fontSize: ['1.688rem', '2.375rem'],
			fontWeight: 'semibold',
			lineHeight: '110%',
			letterSpacing: '-1%',
		},
	},
	components: {
		Button,
		Badge,
		Card,
		Tag,
		Checkbox,
		Link,
		Divider,
		Heading,
		Progress: {
			baseStyle: {
				filledTrack: {
					bg: '#D3E5F0',
				},
			},
			variants: {
				ampDarkSuccess: () => {
					return {
						filledTrack: {
							bg: 'ampSuccess.500',
						},
					};
				},
			},
		},
	},
});

export const AmpTable = styled(Table)<TableProps<QuestionStatus>>`
	.ant-table-thead .ant-table-cell {
		background-color: transparent;
	}

	.ant-table-thead > tr > th {
		color: ${({ theme }) => theme.colors.ampSecondary[600]};
		font-weight: bold;
	}

	.ant-table-column-sorters {
		display: flex;
		flex-direction: row-reverse;
	}

	.ant-table-column-sorter.ant-table-column-sorter-full {
		margin-right: 5px;
	}
`;
