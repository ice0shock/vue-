<template>
  <div>
    <h1>{{id ? '编辑':'新建'}}分类</h1>
    <el-form ref="form" :model="model" label-width="120px" style="margin-top:20px">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent" placeholder="请选择" >
          <el-option
            v-for="item in parents"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  props: {
    id: {}
  },
  data() {
    return {
      model: {},
      parents: []
    };
  },
  methods: {
    async onSubmit() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/categories/${this.id}`, this.model);
      } else {
        res = await this.$http.post("/categories", this.model);
      }
      this.$router.push("/categories/list");
      this.$message({
        message: "保存成功",
        type: "success"
      });
    },
    async fentch() {
      const res = await this.$http.get(`/categories/${this.id}`);
      this.model = res.data;
    },
    async fentchParents() {
      const res = await this.$http.get("/categories");
      this.parents = res.data;
    }
  },
  created() {
    this.fentchParents()
    this.id && this.fentch();
  }
};
</script>