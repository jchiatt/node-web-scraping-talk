import fetch from 'node-fetch';

export function initHttpFetcher() {
  return async function httpFetcher(url, config) {
    try {
      const response = await fetch(url, {
        headers: { ...config.headers },
      });

      const contentType = response.headers.get('content-type');
      if (contentType.includes('application/json')) {
        const data = await response.json();
        return data;
      } else {
        const data = await response.text();
        return data;
      }
    } catch (err) {
      console.error('Error', err);
    }
  };
}
