import request from "@/utils/request"

export function login(username,password,code,uuid) {
    return request({
        url: 'auth/login',
        method: 'post',
        data:{
            username,
            password,
            code,
            uuid
        }
    })
}
export function code() {
    return request({
        url: '/auth/code',
        method: 'get',
    })
}
export function register(username,password,email,code,uuid) {
    return request({
        url: 'auth/register',
        method: 'post',
        data:{
            username,
            password,
            email,
            code,
            uuid
        }
    })
}
export function logout() {
    return request({
        url: 'auth/logout',
        method: 'post',
        headers: {
            "Authorization": localStorage.getItem("token")
        }
    })
}
export function getPassword(username,email,code,uuid){
    return request({
        url: 'auth/getPassword',
        method: 'post',
        data: {
            username,
            email,
            code,
            uuid
        }
    })
}