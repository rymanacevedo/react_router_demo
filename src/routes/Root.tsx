import { json, LoaderFunction } from 'react-router-dom';

export const rootLoader: LoaderFunction = async () => {
	return json({ message: 'Hello World' });
};
