import request from "@/utils/request"

export function getblogs(currentPage) {
    return request({
        url: 'api/blog/index',
        method: 'get',
        data: {
            currentPage
        }
    })
}

export function getIndex(id, currentPage) {
    return request({
        url: 'api/blog/index',
        method: 'get',
        data: {
            id,
            currentPage
        }
    })
}

export function getDetail(id) {
    return request({
        url: 'api/blog/detail',
        method: 'get',
        data: {
            id
        }
    })
}

export function editBlog(id, title, description, content) {
    return request({
        url: 'api/blog/edit',
        method: 'post',
        data: {
            id,
            title,
            description,
            content
        },
        headers: {
            "Authorization": localStorage.getItem("token")
        }
    })
}
