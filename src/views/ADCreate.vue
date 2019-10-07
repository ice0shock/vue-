<template>
  <div>
    <h1>{{id ? '编辑':'新建'}}广告位</h1>
    <el-form ref="form" :model="model" label-width="120px" style="margin-top:20px">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="广告位">
        <el-button type="primary" @click="model.items.push({})">
        <i class="el-icon-plus"></i>添加广告位
      </el-button>
      <el-row type="flex" class="row-bg" style="flex-wrap:wrap">
        <el-col :span="12" v-for="(item,i) in model.items" :key="i">
          <el-form-item label="链接">
            <el-input v-model="item.url"></el-input>
          </el-form-item>
          <el-form-item label="图标" style="margin-top:1rem">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL+'/upload'"
              :show-file-list="false"
              :on-success="res=> $set(item,'image',res.url)"
            >
              <img v-if="item.image" :src="item.image" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="danger" @click="model.items.splice(i,1)">删除</el-button>
          </el-form-item>
        </el-col>
      </el-row>
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
      model: {
        items:[]
      },
    };
  },
  methods: {
    async onSubmit() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/ads/${this.id}`, this.model);
      } else {
        res = await this.$http.post("/ads", this.model);
      }
      this.$router.push("/ads/list");
      this.$message({
        message: "保存成功",
        type: "success"
      });
    },
    async fentch() {
      const res = await this.$http.get(`/ads/${this.id}`);
      this.model = res.data;
    }
  },
  created() {
    this.id && this.fentch();
  }
};
</script>