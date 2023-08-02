import { Badge } from '@chakra-ui/react';

export function moduleTypeToLabel(type: string) {
	return type === 'Standard'
		? 'Dynamic Learning'
		: type === 'PracticeTest' || type == 'TimedAssessment'
		? 'Gap Finder'
		: type;
}

interface ModuleTypeBadgeProps {
	type: string;
}

const ModuleTypeBadge = ({ type }: ModuleTypeBadgeProps) => {
	return (
		<Badge color="white" background="ampSecondary.500" flexGrow="0">
			{moduleTypeToLabel(type)}
		</Badge>
	);
};

export default ModuleTypeBadge;
