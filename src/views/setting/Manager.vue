<template>
    <div>
        <Header></Header>
        <el-table
                :data="tableData.filter(data => !search || data.title.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
            <el-table-column
                    label="Date"
                    prop="created">
            </el-table-column>
            <el-table-column
                    label="Name"
                    prop="title">
            </el-table-column>
            <el-table-column
                    align="right">
                <template slot="header" slot-scope="scope">
                    <el-input
                            v-model="search"
                            size="mini"
                            placeholder="输入关键字搜索"/>
                </template>
                <template slot-scope="scope">
                    <el-button
                            size="mini"
                            @click="handleEdit(scope.$index)">Edit</el-button>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index)">Delete</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="mpage"
                       background
                       layout="prev, pager, next"
                       :current-page="currentPage"
                       :page-size="pageSize"
                       :total="total"
                       @current-change=page>
        </el-pagination>

        <Footer></Footer>
    </div>
</template>

<script>
    import Header from '@/components/Header'
    import Footer from '@/components/Footer'

    export default {
        name: "Manager",
        components: {Header,Footer},

        data() {
            return {
                blogs: {},
                currentPage: 1,
                total: 0,
                pageSize: 5,
                tableData: [],
                search: ''
            }
        },
        methods: {
            handleEdit(id) {
                let b = this.blogs[id].id;
                console.log(b);
                this.$router.push({
                    path: "/blog/add",
                    query: {
                        blogId: b,
                    }
                });
            },
            handleDelete(id) {
                const b = this.blogs[id].id;
                console.log(b);
                const _this = this;
                this.$axios.get('/blog/delete?id=' + b).then(res=>{
                    _this.$router.push("/blogs")
                })
            },
            page(currentPage,id) {
                const _this = this
                _this.$axios.get("/blog/blogs?id=" + id + "&currentPage=" + currentPage).then(res => {
                    console.log(res)
                    _this.blogs = res.data.data.records
                    _this.currentPage = res.data.data.current
                    _this.total = res.data.data.total
                    _this.pageSize = res.data.data.size
                    let b = _this.blogs.valueOf();
                    this.tableData = b;
                    console.log(this.tableData)
                })
            }
        },
        created() {
            this.page(1,this.$store.getters.getUser.id)
        }
    }
</script>

<style scoped>
    .mpage {
        margin: 0 auto;
        text-align: center;
    }
</style>

