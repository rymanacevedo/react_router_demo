import { useEffect, useRef } from 'react';
import { API } from '../../../lib/environment';

type ReviewContentRenderPropsType = {
	content: string | undefined;
};

const ReviewContentRender = ({ content }: ReviewContentRenderPropsType) => {
	const containerRef = useRef<HTMLDivElement>(null);
	// TODO: apply .env variables to this instead of isLocal
	const isLocal = window.location.origin === 'http://localhost:3000';

	useEffect(() => {
		const containerNode = containerRef.current;

		if (!containerNode) return;

		if (content) {
			containerNode.innerHTML = content;

			const imgElements = containerNode.getElementsByTagName('img');
			for (let i = 0; i < imgElements.length; i++) {
				const imgElement = imgElements[i];
				imgElement.style.height = '50%';
				imgElement.style.width = '50%';
				let src = imgElement.getAttribute('src');

				// For rendering in local
				if (src && isLocal && src.includes('amp_resource')) {
					src = `${API}/amp/${src}`;
					imgElement.setAttribute('src', src);
				} else if (src && src.includes('amp_resource')) {
					// For rendering in lower environments
					src = `${window.location.origin}/amp/${src}`;
					imgElement.setAttribute('src', src);
				}
			}
		}
	}, [content]);

	return <div style={{ marginBottom: '48px' }} ref={containerRef} />;
};

export default ReviewContentRender;
