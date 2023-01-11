const Page = ({ id, header, content }) => {
	return (
		<>
			<h1>{header}</h1>
			<main className="main" id="main">
				<div id={id}>{content}</div>
			</main>
		</>
	);
};

export default Page;
