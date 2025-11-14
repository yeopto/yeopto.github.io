import { remark } from 'remark';
import remarkHtml from 'remark-html';
import remarkPrism from 'remark-prism';

/**
 * 마크다운 텍스트를 HTML로 변환
 */
export async function parseMarkdown(markdown: string): Promise<string> {
	const processedContent = await remark()
		.use(remarkHtml, { sanitize: false })
		.use(remarkPrism)
		.process(markdown);

	return processedContent.toString();
}
