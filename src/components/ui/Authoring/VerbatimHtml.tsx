/**
 * Adds the given html verbatim as a div within the component.
 *
 * DOM Elements – React
 * https://legacy.reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml
 */
interface VerbatimHtmlProps {
	html: string;
}

const VerbatimHtml = ({ html }: VerbatimHtmlProps) => {
	return <div dangerouslySetInnerHTML={{ __html: html }} />;
};

export default VerbatimHtml;
