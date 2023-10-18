import form from "redux-form/lib/Form";
import {InjectedFormProps, reduxForm} from "redux-form";
import {
    createField,
    GetStringKeys,
    Input
} from "../../../common/FormsControls/FormsControls";
import {
    required
} from "../../../../utils/validators/validators";
import React from "react";


type PropsType = {

}
export type AddPostFormValuesType = {
    newPostText: string
}
type AddPostFormValuesTypeKeys = GetStringKeys<AddPostFormValuesType>

const AddPostForm: React.FC<InjectedFormProps<AddPostFormValuesType, PropsType>
    & PropsType> = (props) => {
    return  <form onSubmit={props.handleSubmit}>
        <div>
            {createField<AddPostFormValuesTypeKeys>("Your Post", "newPostText",
                [required], Input)}
        </div>
        <div>
            <button>Add post</button>
        </div>
    </form>
}

export default reduxForm<AddPostFormValuesType>({form: 'profile-add-post'}) (AddPostForm)