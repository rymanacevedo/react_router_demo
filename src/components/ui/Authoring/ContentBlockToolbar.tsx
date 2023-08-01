import { Button, Flex, Text } from '@chakra-ui/react';
import {
	CardStackPlusIcon,
	FrameIcon,
	IdCardIcon,
	TextIcon,
	VideoIcon,
} from '@radix-ui/react-icons';

interface ToolbarButtonProps {
	label: string;
	icon: React.ReactElement;
}
const ToolbarButton = ({ label, icon }: ToolbarButtonProps) => {
	return (
		<Button
			variant="ghost"
			fontSize="0.75rem"
			fontWeight="400"
			leftIcon={icon}
			padding={3}>
			{label}
		</Button>
	);
};

const ContentBlockToolbar = () => {
	return (
		<Flex
			padding={4}
			borderColor="ampNeutral.400"
			borderRadius="xl"
			borderWidth="1px"
			direction="row"
			gap={3}
			alignItems="center"
			width="100%"
			fontSize="0.75rem"
			fontWeight="400">
			<Text paddingRight={3}>Add Content</Text>
			<ToolbarButton
				label="Text"
				icon={<TextIcon width="16px" height="16px" />}
			/>
			<ToolbarButton
				label="Text &amp; Image"
				icon={<IdCardIcon width="16px" height="16px" />}
			/>
			<ToolbarButton
				label="Video"
				icon={<VideoIcon width="16px" height="16px" />}
			/>
			<ToolbarButton
				label="Embed iFrame"
				icon={<FrameIcon width="16px" height="16px" />}
			/>
			<ToolbarButton
				label="Dynamic Content"
				icon={<CardStackPlusIcon width="16px" height="16px" />}
			/>
		</Flex>
	);
};

export default ContentBlockToolbar;

// END
