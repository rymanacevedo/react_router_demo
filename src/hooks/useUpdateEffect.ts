import { DependencyList, EffectCallback, useEffect, useState } from 'react';

export default function useUpdateEffect(
	callback: EffectCallback,
	dependencies: DependencyList,
) {
	const [firstRender, setFirstRender] = useState(true);

	useEffect(() => {
		if (firstRender) {
			setFirstRender(false);
			return;
		}
		return callback();
	}, dependencies);
}
