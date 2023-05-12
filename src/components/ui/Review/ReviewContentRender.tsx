import { useEffect, useRef } from 'react';

type ReviewContentRenderPropsType = {
	content: string;
};

const ReviewContentRender = ({ content }: ReviewContentRenderPropsType) => {
	const containerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const containerNode = containerRef.current;

		if (!containerNode) return;

		containerNode.innerHTML = content;

		const imgElements = containerNode.getElementsByTagName('img');
		for (let i = 0; i < imgElements.length; i++) {
			const imgElement = imgElements[i];
			imgElement.style.height = '50%';
			imgElement.style.width = '50%';
		}
	}, [content]);

	return <div style={{ marginBottom: '48px' }} ref={containerRef} />;
};

export default ReviewContentRender;
