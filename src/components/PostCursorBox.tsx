import { FC } from 'react';
import "./PostCursorBox.css"

type PostCursorBoxProps = {
    x: number,
    y: number,
    color: string
}

/**
 * a box that represents where a user's new post will go. It followes the mouse when selecting post location, and stays in place when writing post.
 */
const PostCursorBox: FC<PostCursorBoxProps> = ({ x, y, color }) => {
    return (
        <div className='post-cursor-box' style={{ left: x - 30, top: y - 30, backgroundColor: color }}></div>
    );
}

export default PostCursorBox;