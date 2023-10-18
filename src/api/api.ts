import axios from "axios";
import {UsersType} from "../types/types";

export type InstanceType = {
    withCredentials: boolean
    baseURL: string
    headers: string
}

export const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY" : "c7b0d99f-f847-41ff-90e9-0fd60bcf2500"
    }
});



export enum ResultCodesEnum {
    Success = 0,
    Error = 1,
}
export enum ResultCodeForCapcthaEnum {
    CaptchaIsRequired = 10
}
export type GetItemsType = {
    items: Array<UsersType>
    totalCount: number
    error: string | null
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    messages: Array<string>
    resultCode: RC
}