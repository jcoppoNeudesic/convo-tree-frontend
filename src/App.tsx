import { Component } from 'react';
import './App.css';
import BoardState from './enums/BoardState';
import Post from './models/Post';
import PostRequest from './models/PostRequest';
import PostResponse from './models/PostResponse';
import Board from './components/Board';
import PostCreateForm from './components/PostCreateForm';
// import samplePosts from './SamplePosts';
import Color from './utils/Color';
import postService from './services/PostsService'

type AppState = {
  posts: Post[],
  boardState: BoardState,
  postClickedId: string,
  postColor: string,
  newPost_X: number,
  newPost_Y: number,
}

export default class App extends Component {

  state: AppState = {
    posts: [],
    boardState: BoardState.Reading,
    postClickedId: '',
    postColor: Color.randomLightColor(), //TODO: get user color
    newPost_X: 0,
    newPost_Y: 0
  }

  componentDidMount() {
    this.getAllPosts();
  }

  getAllPosts = () => {
    postService.get()
      .then((json: any) => {
        const posts: Post[] = json.map((post: PostResponse) => {
          return {
            id: post._id,
            parentPostId: post.parentPostId || undefined,
            user: post.user,
            date: post.createdAt,
            message: post.message,
            color: post.color,
            x: post.x,
            y: post.y
          }
        })

        this.setState({ posts: posts })
      })
      .catch(err => {
        console.log('err', err);
      })
  }

  postClicked = (id: string) => {
    this.setState({
      boardState: BoardState.SelectingLocation,
      postClickedId: id
    });
  }

  presentPostCreateForm = (x: number, y: number) => {
    this.setState({
      boardState: BoardState.WritingPost,
      newPost_X: x,
      newPost_Y: y
    });
  }

  createPostSubitted = (message: string) => {
    const newPost: PostRequest = {
      parentPostId: this.state.postClickedId,
      user: 'Myself',
      message: message,
      color: this.state.postColor,
      x: this.state.newPost_X - 80,
      y: this.state.newPost_Y - 30,
    }

    this.setState({
      boardState: BoardState.Reading,
    })

    postService.create(newPost).then(post => {
      this.getAllPosts();
    });
  }

  cancelPost = () => {
    this.setState({ boardState: BoardState.Reading })
  }

  render() {
    return <div>
      <Board
        boardState={this.state.boardState}
        posts={this.state.posts}
        postClicked={this.postClicked}
        postCreate={this.presentPostCreateForm}
        postColor={this.state.postColor}
      />
      <div className="ui-overlay">
        <div>
          <h1>The Big Bulletin Board</h1>
          <div className="header-bar" />
        </div>
        {this.state.boardState === BoardState.WritingPost && (
          <div className='comment-form-container'>
            <PostCreateForm
              onSubmit={this.createPostSubitted}
              onCancel={this.cancelPost}
              color={this.state.postColor}
            />
          </div>
        )}
      </div>
    </div>
  }
}