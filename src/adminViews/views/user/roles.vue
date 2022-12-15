<template>
    <div>
        <el-table
                :data="userData.filter(data => !search || data.username.toLowerCase().includes(search.toLowerCase()))"
                style="width: 100%">
            <el-table-column
                    label="序号"
                    prop="id"
                    sortable
                    width="100"
            >
            </el-table-column>
            <el-table-column
                    label="用户名"
                    prop="username"
                    sortable
                    width="100">
            </el-table-column>
            <el-table-column
                    label="权限"
                    prop="roleId"
                    width="100"
            >
                <el v-if="userData.roleId != 1">管理员</el>
                <el v-else>普通用户</el>
            </el-table-column>
            <el-table-column
                    label="邮箱"
                    prop="email"
                    width="160px">
            </el-table-column>
            <el-table-column
                    label="创建时间"
                    prop="created"
                    column-key="date"
                    sortable
                    width="100">
            </el-table-column>
            <el-table-column
                    label="上次登录"
                    prop="lastLogin"
                    width="100"
            >
            </el-table-column>

            <el-table-column
                    align="right">
                <template slot="header" slot-scope="scope">
                    <el-input
                            v-model="search"
                            size="small"
                            style="width: 130px;"
                            placeholder="输入关键字搜索"/>
                </template>
                <template slot-scope="scope">
                    <!-- Form -->
                    <el-button type="text" size="mini" @click="dialogFormVisible = true">详细</el-button>
                    <el-button size="mini" @click="dialogFormVisible = true">编辑</el-button>

                    <el-dialog title="编辑" :visible.sync="dialogFormVisible" append-to-body>
                        <el-form :inline="true" :model="roleForm" label-width="120px">
                            <el-form-item label="用户名" :label-width="formLabelWidth">
                                <el-input v-model="roleForm.username" autocomplete="off" style="width: 100px"></el-input>
                            </el-form-item>
                            <el-form-item label="邮箱" :label-width="formLabelWidth">
                                <el-input v-model="roleForm.email" autocomplete="off" style="width: 100px"></el-input>
                            </el-form-item>
                            <el-form-item label="年龄" :label-width="formLabelWidth">
                                <el-input v-model="roleForm.age" autocomplete="off" style="width: 100px"></el-input>
                            </el-form-item>
                            <el-form-item label="性别" :label-width="formLabelWidth">
                                <el-select v-model="roleForm.gender" placeholder="性别" style="width: 100px">
                                    <el-option label="男" value="男"></el-option>
                                    <el-option label="女" value="女"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <el-button type="primary"  @click="handleEdit(scope.$index, roleForm)">确 定</el-button>
                        </div>
                    </el-dialog>
                    <el-button
                            size="mini"
                            type="danger"
                            @click="handleDelete(scope.$index)">删除
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    import {getRoles, editRole, deleteRole} from "../../../api/admin/user/userConsole";

    export default {
        name: "roles",
        data() {
            return {
                userData: [],
                search: '',
                dialogTableVisible: false,
                dialogFormVisible: false,
                roleForm: {
                    username: null,
                    email: null,
                    age: null,
                    gender: null
                },
                rules: {
                    username: [
                        {required: true, message: '请输入用户名', trigger: 'blur'},
                        {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
                    ],
                    email: [{ required: true, message: '请输入邮箱地址', trigger: 'blur' },
                        { type: 'email', message: '请输入正确的邮箱地址', trigger: ['blur', 'change']}
                    ],
                    age: [{required: true, trigger: 'change', message: "年龄不能为空"},
                        {min: 0, max:120, message: '请输入正确的年龄', trigger: 'blur'}
                    ],
                    gender: [{required: true, trigger: 'change', message: '验证码不能为空'}
                    ],
                },
                formLabelWidth: '100px'
            }
        },
        methods: {
            handleEdit(id,roleForm) {
                const b = this.userData[id].id;
                console.log(b);
                const _this = this;
                editRole(b,roleForm.username,roleForm.email,roleForm.age,roleForm.gender).then(res => {
                    console.log(res.data);
                });
                this.dialogFormVisible = false
            },
            handleDelete(id) {
                const b = this.userData[id].id;
                console.log(b);
                const _this = this;
                // deleteRole(b).then(res => {
                //     _this.$router.push("/blogConsole/article")
                // })
            },
        },
        created() {
            getRoles().then(res => {
                this.userData = res.data.data;
                console.log("角色信息" + res.data);
            })
        }
    }
</script>

<style scoped>
    .mpage {
        margin: 0 auto;
        text-align: center;
    }
</style>
