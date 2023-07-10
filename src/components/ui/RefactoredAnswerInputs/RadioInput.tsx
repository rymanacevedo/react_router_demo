import { Radio } from '@chakra-ui/react';
import RichContentComponent from '../RichContentComponent';

export default function RadioInput({
	value,
	answerRc,
}: {
	value: number;
	answerRc: string;
}) {
	return (
		<Radio
			size="xxl"
			variant="amp"
			colorScheme="ampPrimary"
			value={value.toString()}>
			<RichContentComponent content={answerRc} />
		</Radio>
	);
}
