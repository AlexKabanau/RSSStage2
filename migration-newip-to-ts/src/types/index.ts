export interface INewsInterface {
    source: {
        name: string;
        id: string;
    };
    author: string;
    content: string;
    urlToImage: string;
    publishedAt: string;
    title: string;
    description: string;
    url: string;
}
export interface INewsData {
    status: string;
    totalResults?: number;
    articles?: Array<INewsInterface>;
}
