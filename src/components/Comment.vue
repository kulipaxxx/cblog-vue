<template>
    <div>
        <!-- 发表直接评论 -->
        <div v-clickoutside="hideReplyBtn" @click="inputFocus" class="my-reply">
            <el-avatar class="header-img" :size="40" :src="user.avatar"></el-avatar>
            <div class="reply-info">
                <div
                        tabindex="0"
                        contenteditable="true"
                        id="replyInput"
                        spellcheck="false"
                        placeholder="输入评论..."
                        class="reply-input"
                        @focus="showReplyBtn"
                        @input="onDivInput($event)"
                ></div>
            </div>
            <div class="reply-btn-box" v-show="btnShow">
                <el-button
                        class="reply-btn"
                        size="medium"
                        @click="sendComment(true)"
                        type="primary"
                >发表评论
                </el-button
                >
            </div>
        </div>
        <!-- 遍历出已有评论 -->
        <!-- CommentDto(id=1, content=这是测试内容, userId=1, userName=cblog, createTime=null, isDelete=0,
          blogId=1, parentId=null, rootParentId=null, child=[CommentDto(id=2, content=测试内容,
          userId=1, userName=xqc, createTime=2022-11-30 22:36:29, isDelete=0, blogId=1, parentId=1,
          rootParentId=1, child=null)])] -->

        <div
                v-for="(item, i) in comments"
                :key="i"
                class="author-title reply-father"
        >
            <el-avatar class="header-img" :size="40" :src="user.avatar"></el-avatar>
            <div class="author-info">
                <span class="author-name">{{ item.userName }}</span>
                <span class="author-time">{{ item.createTime }}</span>
            </div>
            <!-- 展示根评论回复点赞图标及内容 -->
            <div class="icon-btn">
        <span @click="showReplyInput(i, item.id, item.id)"
        ><i class="iconfont el-icon-s-comment"></i>{{ item.commentNum }}</span
        >
                <i class="iconfont el-icon-caret-top"></i>{{ item.like }}
            </div>
            <div class="talk-box">
                <p>
                    <span class="reply">{{ item.content }}</span>
                </p>
            </div>

            <div class="reply-box">
                <div v-for="(reply, j) in item.child" :key="j" class="author-title">
                    <el-avatar
                            class="header-img"
                            :size="40"
                            :src="user.avatar"
                    ></el-avatar>
                    <div class="author-info">
                        <span class="author-name">{{ reply.userName }}</span>
                        <span class="author-time">{{ reply.createTime }}</span>
                    </div>
                    <div class="icon-btn">
            <span @click="showReplyInput(i, reply.rootParentId, reply.id)"
            ><i class="iconfont el-icon-s-comment"></i
            >{{ reply.commentNum }}</span
            >
                        <i class="iconfont el-icon-caret-top"></i>{{ reply.like }}
                    </div>
                    <div class="talk-box">
                        <p>
                            <span>回复 {{ item.userName }}:</span>
                            <span class="reply">{{ reply.content }}</span>
                        </p>
                    </div>
                </div>
            </div>

            <div v-show="_inputShow(i)" class="my-reply my-comment-reply">
                <el-avatar
                        class="header-img"
                        :size="40"
                        :src="user.avatar"
                ></el-avatar>
                <div class="reply-info">
                    <div
                            tabindex="0"
                            contenteditable="true"
                            spellcheck="false"
                            placeholder="输入评论..."
                            @input="onDivInput($event)"
                            class="reply-input reply-comment-input"
                    ></div>
                </div>
                <div class="reply-btn-box">
                    <el-button
                            class="reply-btn"
                            size="medium"
                            @click="sendComment(false)"
                            type="primary"
                    >发表评论
                    </el-button
                    >
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import {getComments, alterComment} from "@/api/reception/blog/comment";

    const clickoutside = {
        // 初始化指令
        bind(el, binding, vnode) {
            function documentHandler(e) {
                // 这里判断点击的元素是否是本身，是本身，则返回
                if (el.contains(e.target)) {
                    return false;
                }
                // 判断指令中是否绑定了函数
                if (binding.expression) {
                    // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
                    binding.value(e);
                }
            }

            // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
            el.vueClickOutside = documentHandler;
            document.addEventListener("click", documentHandler);
        },
        update() {
        },
        unbind(el, binding) {
            // 解除事件监听
            document.removeEventListener("click", el.vueClickOutside);
            delete el.vueClickOutside;
        },
    };
    export default {
        name: "ArticleComment",
        props: {
            //props列表
            blogId: String, //定义参数类型
        },
        data() {
            return {
                btnShow: false,
                index: "0",
                rootParentId: "",
                parentId: "",
                content: "",
                flag: false,
                user: {
                    id: "",
                    username: "请先登录",
                    avatar:
                        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
                },
                hasLogin: false,
                comments: {},
            };
        },
        directives: {clickoutside},
        methods: {
            inputFocus() {
                var replyInput = document.getElementById("replyInput");
                replyInput.style.padding = "8px 8px";
                replyInput.style.border = "2px solid blue";
                replyInput.focus();
            },
            showReplyBtn() {
                this.btnShow = true;
            },
            hideReplyBtn() {
                this.btnShow = false;
                replyInput.style.padding = "10px";
                replyInput.style.border = "none";
            },
            showReplyInput(i, rootParentId, id) {
                console.log("展示方框:" + i)
                //记录当前评论在树中位置
                this.comments[this.index].inputShow = false;
                this.index = i;
                this.comments[i].inputShow = true;
                //根评论id
                this.rootParentId = rootParentId;
                //回复评论id
                this.parentId = id;
                console.log(
                    "根评论id: " + this.rootParentId + "回复评论id: " + this.parentId
                );
            },
            _inputShow(i) {
                return this.comments[i].inputShow;
            },
            sendComment(flag) {
                //发表评论
                if (!this.hasLogin) {
                    this.$message({
                        showClose: true,
                        type: "warning",
                        message: "请先登录",
                    });
                } else if (!this.content) {
                    this.$message({
                        showClose: true,
                        type: "warning",
                        message: "评论不能为空",
                    });
                } else if (flag) {
                    //根角色发表评论
                    alterComment(
                        this.content,
                        this.user.id,
                        this.user.username,
                        this.blogId,
                        null,
                        null
                    ).then((res) => {
                        location.reload();
                        console.log(res.data);
                    });
                } else {
                    //回复评论
                    console.log("角色id" + this.user.id);
                    alterComment(
                        this.content,
                        this.user.id,
                        this.user.username,
                        this.blogId,
                        this.parentId,
                        this.rootParentId
                    ).then((res) => {
                        location.reload();
                        console.log(res.data);
                    });
                }
            },
            onDivInput: function (e) {
                this.content = e.target.innerHTML;
                console.log("评论内容：" + this.content);
            },
        },
        created() {
            if (this.$store.getters.getUser) {
                this.user.username = this.$store.getters.getUser.username;
                this.user.id = this.$store.getters.getUser.id;
                if (this.$store.getters.getUser.avatar != null)
                    this.user.avatar = this.$store.getters.getUser.avatar;
                this.hasLogin = true;
            }
            console.log("评论模块:博客id为：" + this.blogId); //3
            getComments(this.blogId).then((res) => {
                console.log("进入博客模块");
                console.log(res);
                this.comments = res.data.data;
            });
        },
    };
</script>

<style lang="stylus" scoped>
    .my-reply {
        padding: 10px;
        background-color: #fafbfc;

        .header-img {
            display: inline-block;
            vertical-align: top;
        }

        .reply-info {
            display: inline-block;
            margin-left: 5px;
            width: 90%;

            @media screen and (max-width: 1200px) {
                width: 80%;
            }

            .reply-input {
                min-height: 20px;
                line-height: 22px;
                padding: 10px 10px;
                color: #ccc;
                background-color: #fff;
                border-radius: 5px;

                &:empty:before {
                    content: attr(placeholder);
                }

                &:focus:before {
                    content: none;
                }

                &:focus {
                    padding: 8px 8px;
                    border: 2px solid blue;
                    box-shadow: none;
                    outline: none;
                }
            }
        }

        .reply-btn-box {
            height: 25px;
            margin: 10px 0;

            .reply-btn {
                position: relative;
                float: right;
                margin-right: 15px;
            }
        }
    }

    .my-comment-reply {
        margin-left: 50px;

        .reply-input {
            width: flex;
        }
    }

    .author-title:not(:last-child) {
        border-bottom: 1px solid rgba(178, 186, 194, 0.3);
    }

    .author-title {
        padding: 10px;

        .header-img {
            display: inline-block;
            vertical-align: top;
        }

        .author-info {
            display: inline-block;
            margin-left: 5px;
            width: 60%;
            height: 40px;
            line-height: 20px;

            > span {
                display: block;
                cursor: pointer;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
            }

            .author-name {
                color: #000;
                font-size: 18px;
                font-weight: bold;
            }

            .author-time {
                font-size: 14px;
            }
        }

        .icon-btn {
            width: 30%;
            padding: 0 !important;
            float: right;

            @media screen and (max-width: 1200px) {
                width: 20%;
                padding: 7px;
            }

            > span {
                cursor: pointer;
            }

            .iconfont {
                margin: 0 5px;
            }
        }

        .talk-box {
            margin: 0 50px;

            > p {
                margin: 0;
            }

            .reply {
                font-size: 16px;
                color: #000;
            }
        }

        .reply-box {
            margin: 10px 0 0 50px;
            background-color: #efefef;
        }
    }
</style>
