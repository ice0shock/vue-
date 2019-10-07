<template>
  <div>
    <h1>{{id ? '编辑':'新建'}}文章</h1>
    <el-form ref="form" :model="model" label-width="120px" style="margin-top:20px">
      <el-form-item label="所属分类">
        <el-select v-model="model.categories" placeholder="请选择" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="标题">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <vue-editor v-model="model.content" useCustomImageHandler @image-added="handleImageAdded"></vue-editor>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
export default {
  components: {
    VueEditor
  },
  props: {
    id: {}
  },
  data() {
    return {
      categories: [],
      model: {}
    };
  },
  methods: {
    async onSubmit() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/articles/${this.id}`, this.model);
      } else {
        res = await this.$http.post("/articles", this.model);
      }
      this.$router.push("/articles/list");
      this.$message({
        message: "保存成功",
        type: "success"
      });
    },
    async fentch() {
      const res = await this.$http.get(`/articles/${this.id}`);
      this.model = res.data;
    },
    async fentchCategories() {
      const res = await this.$http.get("/categories");
      this.categories = res.data;
    },
    async handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      const formData = new FormData();
      formData.append("file", file);

      const res = await this.$http.post("/upload", formData);
      Editor.insertEmbed(cursorLocation, "image", res.data.url);
      resetUploader();
    }
  },
  created() {
    this.fentchCategories();
    this.id && this.fentch();
  }
};
</script>
<style >
</style>