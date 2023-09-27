import axios from "axios";

export type InstanceType = {
    withCredentials: boolean
    baseURL: string
    headers: string
}

const instance = axios.create({
    withCredentials: true,
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    headers: {
        "API-KEY" : "c7b0d99f-f847-41ff-90e9-0fd60bcf2500"
    }
});

// type UsersAPIType = {
//     currentPage: number
//     pageSize: number
// }

export const usersAPI = {
    getUsers (currentPage = 1, pageSize = 10)  {
        return (
            instance.get(`users?page=${currentPage}&count=${pageSize}`)
        )
            .then(response => {
                return response.data;
            });
    },
    follow(userId:any) {
        return instance.post(`follow/${userId}`)
    },
    unfollow(userId:any) {
       return instance.delete(`follow/${userId}`)
    },
    getProfile (userId:any) {
        console.warn('Absolute method. Please profileAPI' +
            ' object')
        return profileAPI.getProfile(userId);
    }
}
export const profileAPI = {
    getProfile (userId:any) {
       return instance.get(`profile/`+ userId);
    },
    getStatus(userId:any) {
        return instance.get(`profile/status/`+ userId);
    },
    updateStatus(status:any) {
        return instance.put(`profile/status`, {status: status});
    },
    savePhoto(photoFile:any) {
        const formData = new FormData();
        formData.append("image", photoFile)
        return instance.put(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    saveProfile(profile:any) {
        return instance.put(`profile`, profile);
    }
}
export const authAPI = {
me() {
    return instance.get(`auth/me`);
    },
    login(email: string,password: string,rememberMe:boolean = false, captcha:boolean | null = null) {
    return instance.post(`auth/login`, {email,password,rememberMe, captcha});
    },
    logout() {
    return instance.delete(`auth/login`);
    }

}
export const securityAPI = {
getCaptchaUrl() {
    return instance.get(`/security/get-captcha-url`);
    }
    }


