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
interface ISourcesData {
    id: string;
    name: string;
}
type CallBackType<T> = (data: T) => void;
export { INewsElement, INewsData, ISourcesData, CallBackType };
