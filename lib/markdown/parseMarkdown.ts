import { remark } from 'remark';
import remarkHtml from 'remark-html';

/**
 * 마크다운 텍스트를 HTML로 변환
 */
export async function parseMarkdown(markdown: string): Promise<string> {
	const processedContent = await remark().use(remarkHtml, { sanitize: false }).process(markdown);

	return processedContent.toString();
}
