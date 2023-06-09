import { useLoaderData, useOutletContext } from 'react-router-dom';

function TestComponent() {
	const contextData = useLoaderData();
	const context = useOutletContext();

	console.log(context);

	return (
		<div>
			<h2>Test Component</h2>
			<p>Context Data:</p>
			<pre>{JSON.stringify(contextData, null, 2)}</pre>
		</div>
	);
}

export default TestComponent;
