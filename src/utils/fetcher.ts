export const fetcher = (url: RequestInfo | URL, options: RequestInit) => fetch(url, options).then(res => res.json());
