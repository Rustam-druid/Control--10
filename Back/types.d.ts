export interface INews {
    id: string;
    title: string;
    description: string;
    datetime: string;
    comments: IComments[]
}

export interface INewsWithoutIdAndDatetime {
    title: string;
    description: string;

}

export interface IComments {
    id: string;
    author: string;
    titleComments: string;
}

export interface ICommentsWithoutId {
    author: string;
    titleComments: string;
}
