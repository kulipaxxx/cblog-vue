import request from "@/utils/request"

export function getNotices(id,currentPage) {
    return request({
        url: '/api/notice/getNotice/' + id + '/' + currentPage,
        method: 'get',
        headers: {
            "Authorization": localStorage.getItem("adminToken")
        }
    })
}

export function editNotice(id,title,content) {
    return request({
        url: '/api/notice/editNotice',
        method: 'post',
        data: {
            id,
            title,
            content
        },
        headers: {
            "Authorization": localStorage.getItem("adminToken")
        }
    })
}

export function getDetail(id) {
    return request({
        url: '/api/notice/' + id,
        method: 'get',
        headers: {
            "Authorization": localStorage.getItem("adminToken")
        }
    })
}
export function deleteNotice(id) {
    return request({
        url: '/api/notice/' + id,
        method: 'delete',
        headers: {
            "Authorization": localStorage.getItem("adminToken")
        }
    })
}
