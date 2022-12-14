import request from '@/utils/request.js'

export function blogDelete(id) {
    return request({
        url: '/admin/blog/' + id,
        method: 'delete',
        headers: {
            "Authorization": sessionStorage.getItem("adminToken")
        }
    })
}

export function editBlog(id, title, description, content) {
    return request({
        url: 'admin/blog/edit',
        method: 'post',
        data: {
            id,
            title,
            description,
            content
        },
        headers: {
            "Authorization": sessionStorage.getItem("adminToken")
        }
    })
}
