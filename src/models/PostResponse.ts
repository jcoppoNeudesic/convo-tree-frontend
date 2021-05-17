type PostResponse = {
    _id: string,
    parentPostId: string,
    user: string,
    createdAt: number,
    message: string,
    color: string,
    x: number,
    y: number
}

export default PostResponse;
