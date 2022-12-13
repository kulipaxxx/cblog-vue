import request from "@/utils/request"

export function getblogs(currentPage) {
    return request({
        url: 'api/blog/index',
        method: 'get',
        params: {
            currentPage
        }
    })
}

export function getIndex(id, currentPage) {
    return request({
        url: 'api/blog/index/' + id + '/' + currentPage,
        method: 'get',
    })
}

export function getDetail(id) {
    return request({
        url: 'api/blog/detail/'+ id,
        method: 'get',
    })
}

