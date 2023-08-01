import { useState } from 'react';

export default function useSet<T>(defaultValue: Set<T> = new Set()) {
	const [set, internalSet] = useState<Set<T>>(defaultValue);

	function add(value: T) {
		internalSet((prevSet) => new Set([...prevSet, value]));
	}

	function remove(value: T) {
		internalSet((prevSet) => {
			const newSet = new Set(prevSet);
			newSet.delete(value);
			return newSet;
		});
	}

	function toggle(value: T) {
		internalSet((prevSet) => {
			const newSet = new Set(prevSet);
			if (newSet.has(value)) {
				newSet.delete(value);
			} else {
				newSet.add(value);
			}
			return newSet;
		});
	}

	function clear() {
		internalSet(new Set());
	}

	function setValues(newSet: Set<T>) {
		internalSet(newSet);
	}

	return { set, add, remove, toggle, clear, setValues };
}
