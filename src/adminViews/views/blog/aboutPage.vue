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
                <el-button type="primary" @click="submitForm('ruleForm')">更新</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import {getPage,save} from "../../../api/admin/blog/aboutConsole";

    export default {
        name: "aboutPage.vue",
        data() {
            return {
                ruleForm: {
                    id: '',
                    title: '',
                    content: '',
                },
                rules: {
                    title: [
                        {required: true, message: '请输入标题', trigger: 'blur'},
                        {min: 3, max: 25, message: '长度在 3 到 25 个字符', trigger: 'blur'}
                    ],
                    content: [
                        {required: true, message: '请输入内容', trigger: 'blur'},
                    ]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        const _this = this
                        save(this.ruleForm.id, this.$store.getters.getAdmin.id, this.ruleForm.title, this.ruleForm.content).then(res => {
                            _this.$alert('操作成功', '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                    _this.$router.push("/pageConsole/aboutMe")
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
            let id = this.$store.getters.getAdmin.id;
            const _this = this;
            console.log("关于页面：用户id" +id);
            if(id) {
                getPage(id).then(res => {
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
