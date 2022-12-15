import request from "@/utils/request";

export function getRoles() {
    return request({
        url: '/admin/user/role/getRoles',
        method: 'get',
        headers: {
            "Authorization": localStorage.getItem("adminToken")
        }
    })
}

export function editRole(id,username,email,age,gender) {
    return request({
        url: '/admin/user/role/edit',
        method: 'post',
        data: {
            id,
            username,
            email,
            age,
            gender
        },
        headers: {
            "Authorization": localStorage.getItem("adminToken")
        }
    })
}

export function deleteRole(id) {
    return request({
        url: '/admin/user/role/' + id,
        method: 'delete',
        headers: {
            "Authorization": localStorage.getItem("adminToken")
        }
    })
}
