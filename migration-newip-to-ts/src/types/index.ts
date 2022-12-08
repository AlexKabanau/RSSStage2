interface INewsElement {
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
interface INewsData {
    status: string;
    totalResults?: number;
    articles?: Array<INewsElement>;
}
export { INewsElement, INewsData };
