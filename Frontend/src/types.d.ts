export interface IMessage {
    id: string;
    author: string;
    message: string;
    datetime: string;
}

export interface IMessageMutation {
    author: string;
    message: string;
}

