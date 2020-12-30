declare module 'react-file-base64';

type Post = {
    _id?: string,
    title: string,
    message: string,
    creator: string,
    tags: Array<string>,
    selectedFile: string,
    likeCount?: number,
    createdAt?: Date
};