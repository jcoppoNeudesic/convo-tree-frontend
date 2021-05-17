import PostRequest from "../models/PostRequest";

const baseAPI = 'api';

const postAPI = {
    get() {
        return new Promise((resolve, reject) => {
            fetch(`/${baseAPI}/posts`)
                .then(result => result.json())
                .then(json => resolve(json))
                .catch(err => reject(err));
        });
    },
    create(post: PostRequest) {
        return new Promise((resolve, reject) => {
            fetch(`/${baseAPI}/post`, {
                method: 'POST',
                body: JSON.stringify(post),
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                }
            })
                .then(result => result.json())
                .then(json => resolve(json))
                .catch(err => reject(err));
        });
    }
}
export default postAPI;