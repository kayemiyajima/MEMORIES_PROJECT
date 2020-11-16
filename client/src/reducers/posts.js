import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

export default (posts = [], action) => {
    // in this case the state is always a simply posts, so renamed it.
    //it is initially created as a 'const reducer = ~~~' function, but since we don't use it here, need to be exported, as it returns posts, it is exported as posts.
    switch (action.type) {
        case FETCH_ALL:
            return action.payload;
            // all the posts which is data that we got from action, in action we send that data through the action.payload. so the return value here is {action.payload: data}, which is actual posts

        case CREATE:
            return [...posts, action.payload];

        case UPDATE:
        case LIKE:
            return posts.map((post) => post._id === action.payload._id ? action.payload : post);
            //map thorough the array of posts and for each post check this ternaly expression:
            //id of each post is equal to the id of updatedPost, then return the newly updated post, otherwaise just return the post as it was without any updates.
        
        case DELETE:
            return posts.filter((post) => post._id !== action.payload);
            // basically returns all the posts but filter out the one that we deleted

        default:
            return posts;
            //as a default we can simply return posts.
    }
}