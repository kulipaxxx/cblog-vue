<template>
    <div class="m-content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
            </el-form-item>

            <el-form-item label="内容" prop="content">
                <mavon-editor v-model="ruleForm.content"></mavon-editor>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">发布</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {editNotice,getDetail} from "../api/admin/user/noticeConsole";

    export default {
        name: "NoticeEdit",
        data() {
            return {
                ruleForm: {
                    id: '',
                    title: '',
                    content: ''
                },
                rules: {
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'},
                        {min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur'}
                    ],
                    content: [
                        {required: true, message: '请输入内容', trigger: 'blur'},
                        {min: 10, max: 25, message: '长度在 10 到 25 个字符', trigger: 'blur'}
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const _this = this
                        editNotice(this.ruleForm.id, this.ruleForm.title, this.ruleForm.content).then(res => {
                            _this.$alert('操作成功', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    _this.$router.push("/blogConsole/comment")
                                }
                            });
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
        },
        created() {
            let id = this.$route.query.id;
            const _this = this;
            console.log("公告id" +id);
            if(id) {
                getDetail(id).then(res => {
                    const notices = res.data.data
                    console.log(notices);
                    _this.ruleForm.id = notices.id
                    _this.ruleForm.title = notices.title
                    _this.ruleForm.content = notices.content
                })
            }

        }
    }
</script>

<style scoped>
    .m-content {
        text-align: center;
        width: 100%;
        margin: 0 auto;
    }
</style>
