type Post = {
    id: string,
    parentPostId?: string,
    user: string,
    date: number,
    message: string,
    color: string,
    x: number,
    y: number
}

export default Post;
