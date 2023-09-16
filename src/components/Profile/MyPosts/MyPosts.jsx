import React from 'react';
import pro from './MyPosts.module.css';
import Post from './Post/Post';
import {Field, reduxForm} from "redux-form";
import form from "redux-form/lib/Form";
import {
    maxLengthCreator,
    required
} from "../../../utils/validators/validators";
import {
    Textarea
} from "../../common/FormsControls/FormsControls";


const maxLength10 = maxLengthCreator(10);
let AddNewPostForm = (props) => {
    return  <form onSubmit={props.handleSubmit} >
        <div>
            <Field name={"newPostText"} component={Textarea} validate={[required, maxLength10]} placeholder={"Post message"}  />
        </div>
        <div>
            <button>ADD</button>
        </div>
    </form>
}
let AddNewPostFormRedux = reduxForm({form: "ProfileAddNewPostForm"}) (AddNewPostForm);

const MyPosts = React.memo(props => {
    let postsElements =
        props.posts.map(p => <Post
            key={p.id}
            message={p.message}
            count={p.count}/>)
    let newPostElement = React.createRef();
    let onAddPost = (values) => {
        props.addPost(values.newPostText);
    }
    return (
        <div className={pro.postsBlock}>
            My posts
            <h3>New posts</h3>
            <AddNewPostFormRedux onSubmit={onAddPost}/>
            <div className={pro.posts}>
                {postsElements}
            </div>
        </div>
    )
});

export default MyPosts;