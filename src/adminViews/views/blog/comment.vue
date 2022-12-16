<template>
    <div>
        <div>
            <el-table
                    :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
                    style="width: 100%">
                <el-table-column
                        label="标题"
                        prop="title"
                >
                </el-table-column>
                <el-table-column
                        label="发布时间"
                        prop="created"
                        column-key="date"
                        sortable>
                </el-table-column>
                <el-table-column
                        label="发布状态"
                >
                    <template slot-scope="scope">
                        <el v-if="tableData[scope.$index].status === 1">已启用</el>
                        <el v-else>未启用</el>
                    </template>
                </el-table-column>

                <el-table-column
                        align="right">
                    <template slot="header" slot-scope="scope">
                        <el-input
                                v-model="search"
                                size="small"
                                style="width: 170px;"
                                placeholder="输入关键字搜索"/>
                    </template>
                    <template slot-scope="scope">
                        <el-button v-show="tableData[scope.$index].status === 0"
                                size="mini"
                                type="success"
                                @click="handleOn(scope.$index)">启用
                        </el-button>
                        <el-button v-show="tableData[scope.$index].status === 1"
                                   size="mini"
                                   type="warning"
                                   @click="handleOn(scope.$index)">禁用
                        </el-button>
                        <el-button
                                size="mini"
                                @click="handleEdit(scope.$index)">编辑
                        </el-button>
                        <el-button
                                size="mini"
                                type="danger"
                                @click="handleDelete(scope.$index)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="mpage">
                <el-button type="primary" @click="releasePage">新建</el-button>
                <el-pagination
                        background
                        layout="prev, pager, next"
                        :current-page="currentPage"
                        :page-size="pageSize"
                        :total="total"
                        @current-change=page>
                </el-pagination>
            </div>


        </div>
    </div>
</template>

<script>
    import {deleteNotice,getNotices,noticeOn} from "../../../api/admin/user/noticeConsole";

    export default {
        name: "comment",
        data() {
            return {
                notices: {},
                currentPage: 1,
                total: 0,
                pageSize: 10,
                tableData: [],
                search: '',
                status: ''
            }
        },
        methods: {
            handleEdit(id) {
                let b = this.notices[id].id;
                this.$router.push({
                    path: "/blogConsole/noticeEdit",
                    query: {
                        id: b,
                    }
                });
            },
            handleOn(id) {
                let b = this.notices[id].id;
                noticeOn(b).then(res => {
                    location.reload()
                })
            },
            handleDelete(id) {
                const b = this.notices[id].id;
                const _this = this;
                deleteNotice(b).then(res => {
                    _this.$router.push("/blogConsole/comment")
                })
            },
            releasePage(){
                this.$router.push({
                    path: "/blogConsole/noticeEdit",
                })
            },
            page(currentPage) {
                const _this = this
                let id = this.$store.getters.getAdmin.id;
                console.log("用户id" + id);
                getNotices(id, currentPage).then(res => {
                    console.log(res)
                    _this.notices = res.data.data.records;
                    console.log("===============")
                    console.log(_this.notices)
                    _this.currentPage = res.data.data.current
                    _this.total = res.data.data.total
                    _this.pageSize = res.data.data.size
                    let b = _this.notices.valueOf();
                    this.tableData = b;
                    console.log("status" + this.tableData[0].status)
                })
            }
        },
        created() {
            this.page(1);
            console.log(localStorage.getItem("token"))
        }
    }
</script>

<style scoped>
    .mpage {
        margin: 0 auto;
        text-align: center;
    }
</style>
