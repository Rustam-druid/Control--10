export interface INews {
    id: string;
    title: string;
    description: string;
    datetime: string;
    comments: IComments[]
}

export interface INewsMutation{
    title: string;
    description: string;

}

export interface IComments {
    id: string;
    author: string;
    titleComments: string;
    idNews:string
}

export interface ICommentsMutation {
    author: string;
    titleComments: string;
}
export interface AddCommentArgs {
    idNews: string;
    comment: ICommentsMutation;
}