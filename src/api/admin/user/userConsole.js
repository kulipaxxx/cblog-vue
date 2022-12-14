import request from "@/utils/request";

export function getRoles() {
    return request({
        url: '/admin/user/role/getRoles',
        method: 'get',
        headers: {
            "Authorization": localStorage.getItem("token")
        }
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
        },
        headers: {
            "Authorization": localStorage.getItem("token")
        }
    })
}

export function deleteRole(id) {
    return request({
        url: '/admin/user/role/' + id,
        method: 'delete',
        headers: {
            "Authorization": localStorage.getItem("token")
        }
    })
}
