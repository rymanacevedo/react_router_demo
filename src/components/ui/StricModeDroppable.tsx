import { useState } from 'react';
import useEffectOnce from '../../hooks/useEffectOnce';
import { Droppable, DroppableProps } from 'react-beautiful-dnd';

export const StrictModeDroppable = ({ children, ...props }: DroppableProps) => {
	const [enabled, setEnabled] = useState(false);

	useEffectOnce(() => {
		const animation = requestAnimationFrame(() => setEnabled(true));

		return () => {
			cancelAnimationFrame(animation);
			setEnabled(false);
		};
	});

	if (!enabled) {
		return null;
	}

	return <Droppable {...props}>{children}</Droppable>;
};
