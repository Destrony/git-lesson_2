import {Field, reduxForm} from "redux-form";
import React from "react";
import {
    Textarea
} from "../../../common/FormsControls/FormsControls";
import {
    maxLengthCreator, required
} from "../../../../utils/validators/validators";


const maxLength50= maxLengthCreator(50);
const AddMessageForm = (props) => {
    return <form onSubmit={props.handleSubmit}>
        <div>
            <Field component={Textarea}
                   validate={[required, maxLength50]}
                   name="newMessageBody"
                   placeholder="Enter your message"/>
        </div>
        <div>
            <button>Send</button></div>
    </form>
}

export default reduxForm({form: "dialog-add-message-form"}) (AddMessageForm);