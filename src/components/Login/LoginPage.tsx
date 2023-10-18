import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import {
    createField,
    GetStringKeys,
    Input
} from "../common/FormsControls/FormsControls";
import {required} from "../../utils/validators/validators";
import {useDispatch, useSelector} from "react-redux";
import {login} from "../../redux/auth-reducer";
import {Navigate} from "react-router-dom";
import style
    from "./../common/FormsControls/FormsControls.module.css"
import {
    AppDispatch,
    AppStateType
} from "../../redux/redux-store";


type LoginFormOwnProps = {
    captchaUrl: string | null
}
const LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps>
    & LoginFormOwnProps> =
    ({handleSubmit, error, captchaUrl}) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<LoginFormPropertiesTypeKeys>("Email", "email",
                [required], Input  )}

            {createField<LoginFormPropertiesTypeKeys>("Password", "password",
                [required], Input, {type: "password"} )}

            {createField<LoginFormPropertiesTypeKeys>(undefined, "rememberMe",
                [], Input, {type: "checkbox"}, "remember me" )}

            {captchaUrl && <img src={captchaUrl} alt={"img"}/>}
            {captchaUrl &&   createField<LoginFormPropertiesTypeKeys>( "Symbols from" +
                    " image", "captcha", [required], Input, {} )}

            {error &&
                <div className={style.formSummaryError}>
                {error}
            </div>
            }
            <div>
                <button>LOGIN</button>
            </div>
        </form>
    )
}

const LoginReduxForm =
    reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm)
export type LoginFormValuesType = {
    captcha: string
    rememberMe: boolean
    password: string
    email: string
}
type LoginFormPropertiesTypeKeys = GetStringKeys<LoginFormValuesType>

export const LoginPage: React.FC = () => {
    const captchaUrl = useSelector((state: AppStateType) => state.auth.captchaUrl)
    const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
        const dispatch: AppDispatch = useDispatch()
    const onSubmit = (formData: LoginFormValuesType) => {
        dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha));
    }
    if (isAuth) {
        return <Navigate to={"/profile"}/>
    }
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaUrl={captchaUrl}/>
        </div>
    )
}

