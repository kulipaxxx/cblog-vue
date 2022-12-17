import request from '@/utils/request'

export function index(id) {
    return request({
        url: 'api/user/' + id,
        method: 'get',
        headers: {
            "Authorization": sessionStorage.getItem("adminToken")
        }
    })
}

export function save(id,username,avatar,email,gender,age) {
    return request({
        url: 'api/user/save',
        method: 'post',
        data: {
            id,
            username,
            avatar,
            email,
            gender,
            age
        },
        headers: {
            "Authorization": sessionStorage.getItem("adminToken")
        }
    })
}
