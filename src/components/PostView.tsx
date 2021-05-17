import React, { FC } from 'react';
import "./PostView.css"
import Post from '../models/Post';
import Date from '../utils/Date';

type PostViewProps = {
    post: Post,
    handleClick: (post: Post) => void
}

const PostView: FC<PostViewProps> = ({ post, handleClick }) => {
    const { user, date, message, color, x, y } = post;

    return (
        <div className='post-container' style={{ left: x, top: y }}>
            <div
                className='post'
                style={{ backgroundColor: color }}
                onClick={() => handleClick(post)}>
                <div className='heading'>
                    <b>{user}</b> {date && Date.formatDate(date)}
                </div>
                <div className='body'>{message}</div>
            </div>
        </div>
    );
}

export default PostView;