export interface Bloginterface {
    _id: string;
    title: string;
    content: string[];
    creator: {
        username: string;
        email: string;
    };
    cover: {
        url: string;
        public_id: string;
    };

    comments: any[];
}

export interface CommentInterface {
    _id: string;
    blogId: string;
    comment: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
    user: {
        _id: string;
        username: string;
        email: string;
    };
}
