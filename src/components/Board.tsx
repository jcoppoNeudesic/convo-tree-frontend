import React, { Component, MouseEvent } from 'react';
import "./Board.css"
import PostView from './PostView';
import LineView from './LineView';
import PostCursorBox from './PostCursorBox';
import Post from '../models/Post';
import BoardState from '.././enums/BoardState';

type BoardProps = {
    boardState: BoardState,
    posts: Post[],
    postClicked: (id: string) => void,
    postCreate: (x: number, y: number) => void,
    postColor: string
}

type BoardCompState = {
    mouse_X: number,
    mouse_Y: number,
    clickedPost_X: number,
    clickedPost_Y: number,
    newPost_X: number,
    newPost_Y: number
}

export default class Board extends Component<BoardProps, BoardCompState> {
    state: BoardCompState = {
        mouse_X: 0,
        mouse_Y: 0,
        clickedPost_X: 0,
        clickedPost_Y: 0,
        newPost_X: 0,
        newPost_Y: 0
    }

    boardClicked = () => {
        if (this.props.boardState === BoardState.SelectingLocation) {
            this.setState({
                newPost_X: this.state.mouse_X,
                newPost_Y: this.state.mouse_Y
            })
            this.props.postCreate(this.state.mouse_X, this.state.mouse_Y);
        }
    }

    handleMouseMove = (e: MouseEvent) => {
        let { clientX, clientY } = e.nativeEvent;
        this.setState({
            mouse_X: clientX,
            mouse_Y: clientY
        })
    }

    postClicked = (post: Post) => {
        if (this.props.boardState === BoardState.Reading) {
            this.props.postClicked(post.id);

            this.setState({
                clickedPost_X: post.x + 90,
                clickedPost_Y: post.y + 40
            });
        }
    }

    findPost = (id?: string): Post | undefined => {
        return this.props.posts.find(post => post.id === id);
    }

    superClick = () => {
        console.log('suuuuupa');
    }

    render() {
        const { clickedPost_X, clickedPost_Y, newPost_X, newPost_Y, mouse_X, mouse_Y } = this.state;
        return (
            <div className="board-container" onClick={this.superClick}>
                <div className="board" onClick={this.boardClicked} onMouseMove={this.handleMouseMove}>
                    {this.props.posts.map((post, i) => {
                        return <PostView key={i} post={post} handleClick={this.postClicked} />
                    })}
                    {this.props.posts.map((post, i) => {
                        const parentPost = this.findPost(post.parentPostId);
                        if (parentPost) {
                            return <LineView key={i} x1={parentPost.x + 90} y1={parentPost.y + 40} x2={post.x + 90} y2={post.y + 40} />
                        }
                        return null;
                    })}
                    {this.props.boardState === BoardState.SelectingLocation &&
                        <LineView x1={clickedPost_X} y1={clickedPost_Y} x2={mouse_X} y2={mouse_Y} />
                    }
                    {this.props.boardState === BoardState.WritingPost &&
                        <LineView x1={clickedPost_X} y1={clickedPost_Y} x2={newPost_X} y2={newPost_Y} />
                    }
                    {this.props.boardState === BoardState.SelectingLocation &&
                        <PostCursorBox x={mouse_X} y={mouse_Y} color={this.props.postColor} />
                    }
                    {this.props.boardState === BoardState.WritingPost &&
                        <PostCursorBox x={newPost_X} y={newPost_Y} color={this.props.postColor} />
                    }
                </div>
            </div>
        );
    }
}
