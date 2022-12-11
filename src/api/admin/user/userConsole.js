import request from "@/utils/request";

export function getRoles() {
    return request({
        url: '/admin/user/role/getRoles',
        method: 'get',
    })
}

export function editRole(id,username,email,password,created,lastLogin,gender,age) {
    return request({
        url: '/admin/user/role/edit',
        method: 'post',
        data: {
            id,
            username,
            email,
            password,
            created,
            lastLogin,
            gender,
            age
        }
    })
}
export function deleteRole(id) {
    return request({
        url: '/admin/user/role/' + id,
        method: 'delete',
    })
}
