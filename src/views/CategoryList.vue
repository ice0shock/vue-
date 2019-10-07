<template>
  <div>
    <h1>分类列表</h1>
    <el-main>
      <el-table :data="models">
        <el-table-column prop="_id" label="ID" width="180"></el-table-column>
        <el-table-column prop="parent.name" label="上级分类" width="150"></el-table-column>
        <el-table-column prop="name" label="分类名称" width="150"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="$router.push(`/categories/${scope.row._id}`)">编辑</el-button>
            <el-button size="mini" type="danger" @click="del(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </div>
</template>
<script>
export default {
  data() {
    return {
      models: {}
    };
  },

  methods: {
    async fentch() {
      const res = await this.$http.get("categories");
      this.models = res.data;
    },
    del(row) {
      this.$confirm(`此操作将永久删除分类${row.name}, 是否继续?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const res = await this.$http.delete(`/categories/${row._id}`);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
          this.fentch();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  created() {
    this.fentch();
  }
};
</script>
<style  scoped>
</style>