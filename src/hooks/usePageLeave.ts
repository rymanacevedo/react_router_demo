import { useEffect } from 'react';
import { off, on } from '../lib/utils';

const usePageLeave = (onPageLeave: any, args = []) => {
	useEffect(() => {
		if (!onPageLeave) {
			return;
		}

		const handler = (event: any) => {
			event = event ? event : (window.event as any);
			const from = event.relatedTarget || event.toElement;
			if (!from || from.nodeName === 'HTML') {
				onPageLeave();
			}
		};

		on(document, 'mouseout', handler);
		return () => {
			off(document, 'mouseout', handler);
		};
	}, args);
};

export default usePageLeave;
