import request from '@/utils/request.js'

export function getPage(id) {
    return request({
        url: '/admin/about/' + id,
        method: 'get',
        headers: {
            "Authorization": sessionStorage.getItem("adminToken") || sessionStorage.getItem("token")
        }
    })
}

export function save(id,userId,title,content) {
    return request({
        url: '/admin/about/save',
        method: 'post',
        data: {
            id,
            userId,
            title,
            content
        },
        headers: {
            "Authorization": sessionStorage.getItem("adminToken") || sessionStorage.getItem("token")
        }
    })
}
