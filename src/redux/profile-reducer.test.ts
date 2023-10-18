import profileReducer, {actions} from "./profile-reducer";
import {PostsType} from "../types/types";

let state = {
    posts: [
        {id: 1, message: 'Hi lorem we are crazy', count: 76},
        {id: 2, message: 'i floora we are crazy', count: 32},
        {id: 3, message: 'Hi you we are crazy', count: 15},
        {id: 4, message: 'Hi you we are crazy', count: 25}
    ] as Array<PostsType>,
    profile: null,
    status: ''
};
test('length of posts should be incremented', () => {
    //1. test data
    let action = actions.addPostActionCreator("its amazing")
    //2. action
    let newState = profileReducer(state, action);
// 3. expectation
    expect(newState.posts.length).toBe(5);
});
test('message of new post should be correct ', () => {
    //1. test data
    let action = actions.addPostActionCreator("its amazing")
    //2. action
    let newState = profileReducer(state, action);
// 3. expectation
    expect(newState.posts[4].message).toBe("its amazing");
});

test('after deleting length of messages should be' +
    ' decrement', () => {
    //1. test data
    let action = actions.deletePost(1);
    //2. action
    let newState = profileReducer(state, action);
// 3. expectation
    expect(newState.posts.length).toBe(3);
});
test(`after deleting length of messages shouldn't be decrement if id is incorrect`, () => {
    //1. test data
    let action = actions.deletePost(1000);
    //2. action
    let newState = profileReducer(state, action);
// 3. expectation
    expect(newState.posts.length).toBe(4);
});
