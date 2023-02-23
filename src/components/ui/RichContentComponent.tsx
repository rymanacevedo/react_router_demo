import { Box } from '@chakra-ui/react';
import { useCallback, useEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { MathComponent } from 'mathjax-react';

const RichContentComponent = ({
	content,
	style,
}: {
	content: any;
	style?: any;
}) => {
	const unsanitize = (dirty: string) => ({
		__html: dirty,
	});

	const renderMathJax = (text: string) => {
		return <MathComponent tex={String.raw`${text}`} />;
	};

	const rootRef = useRef(createRoot(document.createElement('div')));

	const replaceNodeWithReactComponent = (reactComponent: any) => {
		rootRef.current.render(reactComponent);
	};

	const renderH5P = (element: HTMLElement) => {
		let inProgress = false;
		if (element.querySelectorAll(':scope .h5p-iframe-wrapper').length > 0) {
			return;
		}
		if (inProgress) {
			setTimeout(renderH5P.bind(element), 100);
		}

		inProgress = true;
		let src = element.getAttribute('kf_h5p_src');
		if (!src) {
			src = element.getAttribute('data-kf_h5p_src');
		}
		// TODO: we need to set these in the h5p instances via: `new H5P(element, options);`
		const frameJs = `${window.location.origin}/h5p-standalone/dist/frame.bundle.js`;
		const frameCss = `${window.location.origin}/h5p-standalone/dist/styles/h5p.css`;
		const options = {
			frameJs,
			frameCss,
		};
		console.log(options);
	};

	const replaceH5pElements = useCallback(async () => {
		const h5pElements = document.getElementsByClassName('kf_h5p_content');
		for (const h5pElement of Array.of(...h5pElements)) {
			await renderH5P(h5pElement as HTMLElement);
		}
	}, []);

	const replaceMathJaxElements = useCallback(() => {
		const mathJaxElements = document.getElementsByClassName('math-tex');
		for (const mathJaxElement of Array.of(...mathJaxElements)) {
			const element = mathJaxElement as HTMLElement;
			replaceNodeWithReactComponent(renderMathJax(element.innerText));
		}
	}, []);

	useEffect(() => {
		replaceH5pElements();
		replaceMathJaxElements();
	}, [content, replaceH5pElements, replaceMathJaxElements]);

	return (
		<Box
			style={{ ...style }}
			dangerouslySetInnerHTML={unsanitize(content)}></Box>
	);
};
export default RichContentComponent;
