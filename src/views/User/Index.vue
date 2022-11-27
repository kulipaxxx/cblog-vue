<template>
  <div class="m">
    <Header></Header>

    <div class="content_user">
      <el-form
        label-width="50px"
      >
        <el-form-item label="">
          <el-upload
            class="avatar-uploade"
            :multiple="true"
            :action="actionPath"
            accept="image/jpeg,image/gif,image/png,image/bmp"
            :before-upload="beforeAvatarUpload"
            :data="postData"
            :on-success="handleAvatarSuccess"
          >
            <el-image
              v-if="imageUrl"
              :src="imageUrl"
              class="avatar"
              style="width: 140px; height: 140px"
              fit="cover"
            >
            </el-image>
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
      </el-form>
    </div>

    <div style="margin: 10px auto"></div>
    <div class="content">
      <el-timeline>
        <el-timeline-item
          :timestamp="blog.created"
          placement="top"
          v-for="(blog, index) in tableData"
          :key="index"
        >
          <el-card>
            <h4>
              <router-link
                :to="{ name: 'BlogDetail', params: { blogId: blog.id } }"
              >
                {{ blog.title }}
              </router-link>
            </h4>
            <p>{{ blog.description }}</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>

      <el-pagination
        class="mpage"
        background
        layout="prev, pager, next"
        :current-page="currentPage"
        :page-size="pageSize"
        :total="total"
        @current-change="page"
      >
      </el-pagination>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {genUpToken} from "@/common/qiniuToken"
import {getIndex} from "../../api/reception/blog/blog";

export default {
  name: "Index",
  components: { Header, Footer },

  data() {
    return {
      blogs: {},
      currentPage: 1,
      total: 0,
      pageSize: 5,
      tableData: [],
      search: "",
      imageUrl:
        "https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png",
      postData: {
        // 填写你的Token
        token: "",
      },
      EncodedEntryURI: "",
      actionPath: "http://upload-z2.qiniup.com",
    };
  },
  methods: {
    page(id,currentPage) {
      const _this = this;
      getIndex(id, currentPage)
        .then((res) => {
          console.log(res);
          _this.blogs = res.data.data.records;
          _this.currentPage = res.data.data.current;
          _this.total = res.data.data.total;
          _this.pageSize = res.data.data.size;
          let b = _this.blogs.valueOf();
          this.tableData = b;
          console.log(this.tableData);
        });
    },
    handleAvatarSuccess(res) {
      //上传成功之后的操作
      this.imageUrl = "http://rl8colubh.hn-bkt.clouddn.com/" + res.key;
      this.EncodedEntryURI = res.key;
      if (this.imageUrl != null) {
        //更换头像
        let userInfo = this.$store.getters.getUser;
        userInfo.avater = this.imageUrl;
        this.$store.commit("SET_USERINFO", userInfo);
      }
    },
    beforeAvatarUpload(file) {
      //上传之前的操作
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPEG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
  },
  created() {
    this.page(this.$store.getters.getUser.id,1);

    let token;
    let policy = {};
    let bucketName = "cblog723";
    let AK = "IlJlS8lfjC-vYZMSnWl1E-AYtsKZTiSxSfnNw-tP";
    let SK = "vIbWy_9UMf2bfCHovLdMVHBkJHmZuBODj_vvVujE";
    let deadline = Math.round(new Date().getTime() / 1000) + 3600;
    if (this.$store.getters.getUser.avatar != null)
      this.imageUrl = this.$store.getters.getUser.avatar;
    policy.scope = bucketName;
    policy.deadline = deadline;
    token = genUpToken(AK, SK, policy);
    this.postData.token = token;
  },

};
</script>

<style scoped>
.mpage {
  margin: 0 auto;
  text-align: center;
}
.content {
  max-width: 960px;
  background-color: white;
  margin: 0 auto;
}
.m {
  background-color: #f2f6fcaf;
}
.content_user {
  max-width: 960px;
  height: 250px;
  background-color: antiquewhite;
  margin: 0 auto;
}
</style>
