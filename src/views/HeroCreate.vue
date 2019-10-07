<template>
  <div>
    <h1>{{id ? '编辑':'新建'}}英雄</h1>
    <el-form ref="form" :model="model" label-width="120px" style="margin-top:20px">
      <el-tabs type="border-card" @tab-click="handleClick" value="skills">
        <el-tab-pane label="基础信息" name="first">
          <el-form-item label="英雄名称">
            <el-input v-model="model.name"></el-input>
          </el-form-item>
          <el-form-item label="英雄称号">
            <el-input v-model="model.title"></el-input>
          </el-form-item>
          <el-form-item label="类型">
            <el-select v-model="model.categories" placeholder="请选择" multiple>
              <el-option
                v-for="item in categories"
                :key="item._id"
                :label="item.name"
                :value="item._id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="难度">
            <el-rate
              v-model="model.scores.difficult"
              show-score
              :max="10"
              style="margin-top:0.5rem"
            ></el-rate>
          </el-form-item>
          <el-form-item label="技能">
            <el-rate v-model="model.scores.skills" show-score :max="10" style="margin-top:0.5rem"></el-rate>
          </el-form-item>
          <el-form-item label="攻击">
            <el-rate v-model="model.scores.attack" show-score :max="10" style="margin-top:0.5rem"></el-rate>
          </el-form-item>
          <el-form-item label="生存">
            <el-rate v-model="model.scores.survive" show-score :max="10" style="margin-top:0.5rem"></el-rate>
          </el-form-item>
          <el-form-item label="顺风出装">
            <el-select v-model="model.items1" placeholder="请选择" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="逆风出装">
            <el-select v-model="model.items2" placeholder="请选择" multiple>
              <el-option v-for="item in items" :key="item._id" :label="item.name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="头像">
            <el-upload
              class="avatar-uploader"
              :action="$http.defaults.baseURL+'/upload'"
              :show-file-list="false"
              :on-success="afterUpload"
            >
              <img v-if="model.avatar" :src="model.avatar" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane label="技能" name="skills">
          <el-button type="primary" @click="model.skills.push({})">
            <i class="el-icon-plus"></i>添加技能
          </el-button>
          <el-row type="flex" class="row-bg" style="flex-wrap:wrap">
            <el-col :span="12" v-for="(item,i) in model.skills" :key="i">
              <el-form-item label="名称">
                <el-input v-model="item.name"></el-input>
              </el-form-item>
              <el-form-item label="图标">
                <el-upload
                  class="avatar-uploader"
                  :action="$http.defaults.baseURL+'/upload'"
                  :show-file-list="false"
                  :on-success="res=> $set(item,'icon',res.url)"
                >
                  <img v-if="item.icon" :src="item.icon" class="avatar" />
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>
              <el-form-item label="描述">
                <el-input type="textarea" v-model="item.description"></el-input>
              </el-form-item>
              <el-form-item label="小提示">
                <el-input type="textarea" v-model="item.tips"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="danger" @click="model.skills.splice(i,1)">删除</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-tab-pane>
      </el-tabs>

      <el-form-item style="margin-top:1rem">
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
      categories: [],
      items: [],
      model: {
        name: "",
        avatar: "",
        scores: { difficult: 0, skills: 0, attack: 0, survive: 0 },
        skills: []
      }
    };
  },
  methods: {
    async onSubmit() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/heroes/${this.id}`, this.model);
      } else {
        res = await this.$http.post("/heroes", this.model);
      }
      this.$router.push("/heroes/list");
      this.$message({
        message: "保存成功",
        type: "success"
      });
    },
    async fentch() {
      const res = await this.$http.get(`/heroes/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    },
    async fentchCategories() {
      const res = await this.$http.get("/categories");
      this.categories = res.data;
    },
    async fentchitems() {
      const res = await this.$http.get("/items");
      this.items = res.data;
    },
    afterUpload(res) {
      this.model.avatar = res.url;
    }
  },
  created() {
    this.fentchCategories();
    this.fentchitems();
    this.id && this.fentch();
  }
};
</script>



<style >
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>