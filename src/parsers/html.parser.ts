import { parse } from 'node-html-parser';

export const htmlParser = async (response: string): Promise<string | null> => {
  try {
    const docRoot = parse(response);
    const title = docRoot.querySelector('h1').textContent || null;
    return title;
  } catch (err) {
    console.error('Failed to parse html', err);
    return null;
  }
};
