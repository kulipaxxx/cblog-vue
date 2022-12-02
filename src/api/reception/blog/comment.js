import request from "@/utils/request";

export function getComments(blogId){
    return request({
        url: '/api/comment/getComments',
        method: 'get',
        params: {
            blogId
        }
    })
}