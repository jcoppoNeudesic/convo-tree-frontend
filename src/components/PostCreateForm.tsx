import { Component, FormEvent, ChangeEvent, KeyboardEvent } from 'react';
import "./PostCreateForm.css";

type PostCreateFormProps = {
    onSubmit: (comment: string) => void,
    onCancel: () => void,
    color: string
}

type PostCreateFormState = {
    comment: string,
}

class PostCreateForm extends Component<PostCreateFormProps, PostCreateFormState> {

    state: PostCreateFormState = {
        comment: ''
    };

    onCommentFieldChanged = (e: ChangeEvent<HTMLTextAreaElement>) => {
        this.setState({ comment: e.currentTarget.value })
    }

    submitPressed = (e: FormEvent) => {
        if (this.state.comment.length > 0) {
            this.handleSubmit();
            e.preventDefault();
        }
    }

    cancelPressed = () => {
        this.setState({ comment: '' });
        this.props.onCancel();
    }

    handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Enter') {
            this.handleSubmit();
        }
    }

    handleSubmit = () => {
        if (this.state.comment.length > 0) {
            this.props.onSubmit(this.state.comment)
            this.setState({ comment: '' });
        }
    }

    render() {
        return (
            <div className="comment-form" style={{ backgroundColor: this.props.color }} onKeyDown={this.handleKeyDown}>
                <h2>New Comment</h2>
                <div className="editFields">
                    <div>
                        <textarea
                            name="comment"
                            placeholder="What would you like to say?"
                            value={this.state.comment}
                            onChange={this.onCommentFieldChanged}
                            maxLength={140}
                        />
                    </div>
                </div>
                <div className="button-area">
                    <button disabled={this.state.comment.length <= 0} onClick={this.submitPressed} >Post</button>
                    <button onClick={this.cancelPressed}>Cancel</button>
                </div>
            </div>
        );
    }
}

export default PostCreateForm;