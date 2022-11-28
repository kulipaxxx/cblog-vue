import request from "@/utils/request";

export function getFileInfo(id){
    return request({
        url: '/api/about/' + id,
        method: 'get',
    })
}