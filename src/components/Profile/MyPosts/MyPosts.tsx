import React from 'react';
import pro from './MyPosts.module.css';
import Post from './Post/Post';
import AddPostForm, {
    AddPostFormValuesType
} from "./AddPostForm/AddPostForm";
import {PostsType} from "../../../types/types";

export type MapPropsType = {
    posts: Array<PostsType>
}
export type DispatchPropsType = {
    addPost: (newPostText:string) => void
}

const MyPosts: React.FC<MapPropsType & DispatchPropsType> =
    (props => {
    let postsElements =
        props.posts.map(p => <Post
            key={p.id}
            message={p.message}
            count={p.count}/>)
    let onAddPost = (values: AddPostFormValuesType) => {
        props.addPost(values.newPostText);
    }
    return (
        <div className={pro.postsBlock}>
            My posts
            <h3>New posts</h3>
            <AddPostForm onSubmit={onAddPost}/>
            <div className={pro.posts}>
                {postsElements}
            </div>
        </div>
    )
});

const MyPostsMemorized =
    React.memo(MyPosts)

export default MyPostsMemorized;