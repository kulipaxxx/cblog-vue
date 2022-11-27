import request from "@/utils/request"

export function getRelation(blogId, userId) {
    return request({
        url: 'api/like/likeRelationships/' + blogId + '/' + userId,
        method: 'get',
    })
}
export function clickLike(likedBlogId,giveLikedId,status) {
    return request({
        url: 'api/like/clickL',
        method: 'post',
        data: {
            likedBlogId,
            giveLikedId,
            status
        }
    })
}
export function likeCount(id) {
    return request({
        url: 'api/like/getClickL/' + id,
        method: 'get',
    })
}
