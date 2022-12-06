import request from "@/utils/request";

//获取博客评论数据
export function getComments(blogId){
    return request({
        url: '/api/comment/getComments',
        method: 'get',
        params: {
            blogId
        }
    })
}
//发表评论
export function alterComment(content,userId,userName,blogId,parentId,rootParentId){
    return request({
        url: '/api/comment/alterComment',
        method: 'post',
        data: {
            content,
            userId,
            userName,
            blogId,
            parentId,
            rootParentId
        }
    })
}