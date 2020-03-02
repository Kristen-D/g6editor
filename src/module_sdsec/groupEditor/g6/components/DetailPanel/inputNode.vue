<template>
  <div style="padding: 15px">
    <el-collapse class="custom-collapse" v-model="activeNames">
      <el-collapse-item name="1">
        <template slot="title">
          <div class="el-collapse-heading">
            <h4 class="el-panel-title2" style="display: inline-block">基本属性</h4>
            <label>
              (
              <span>*</span>必填)
            </label>
          </div>
        </template>
        <div class="el-panel-body" style="padding: 0 15px">
          <el-form :model="node" label-width="120px" label-position="right" class="custom-form">
            <el-form-item label="节点名称：">
              <el-input class="custom-width" v-model="node.name" @change="handelChangeName" v-if="handle!='view'"></el-input>
              <p v-if="handle == 'view'" style="width:400px">{{node.name}}</p>
            </el-form-item>
            <el-form-item label="问题描述：">
                <el-input class="custom-width"   :disabled="handle == 'view'" v-model="node.manualIn.inputDesc"></el-input>
            </el-form-item>
            <el-form-item label="操作类型：">
              <el-select v-model="node.manualIn.inputType" :disabled="handle == 'view'" placeholder="请选择" class="custom-width">
                <el-option
                  v-for="item in optType"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="责任人：">
              <el-select v-model="node.manualIn.owner" :disabled="handle == 'view'" @change="ownerChange" placeholder="请选择" class="custom-width">
                <el-option
                  v-for="(item,index) in userList"
                  :key="index"
                  :label="item.name"
                  :value="item.userName"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="截至时间：" >
              <div class="flexStart" style="width:300px;">
              <el-input-number :min="1" :max="48" v-model="node.manualIn.deadline" :disabled="handle == 'view'" style="width:200px;height:auto"></el-input-number> <span class="m-l-10">小时</span>
            </div>
            </el-form-item>
          </el-form>
        </div>
      </el-collapse-item>
    </el-collapse>
    <div class="fix-bottom-buttonIn"  v-if="handle!='view'">
      <el-button type="primary" size="medium" @click="updateNode">保存</el-button>
      <el-button type="gray" size="medium" @click="delNode">删除</el-button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    node: {
      type: Object,
      required: true
    },
    handle : {
      type : String,
    }
  },
  data() {
    return {
      activeNames: ["1", "2"],
      userList: [],
      optType : [{
        value : 1,
        label : 'boolean'
      }],
    };
  },
  methods: {
    handelChangeName() {
      this.$emit("handelChangeName");
    },
    updateNode() {
      console.log("updateNode");
      this.$emit("updateNode");
    },
    delNode() {
      this.$emit("delNode");
    },
    async getUserList(){
      let params = {};
      let data = await this.utils.reqObj('/ssa/soar/node/listSrUpmsUser.do',params);
      this.userList = data;
    },
    ownerChange(value){
      console.log(value);
    }
  },
  created : function(){
    this.getUserList();
  }
};
</script>

<style scoped>
.el-input-number{ height:30px; line-height: 30px;}
.el-collapse-heading {
  padding: 0 15px;
}

.el-collapse-heading h4 {
  display: inline-block;
}

.el-collapse-heading label {
  padding-left: 5px;
  color: #999;
  font-size: 12px;
  line-height: 14px;
}

.el-collapse-heading label span {
  color: #f00;
  padding-right: 3px;
}

.custom-inputwidth {
  width: 16.48% !important;
}

.custom-width {
  width: 250px;
}

.addbutton {
  padding-right: 20px !important;
  line-height: 40px;
}

.custom-collapse.el-collapse {
  border-top: none;
}

.custom-collapse .el-collapse-item__header,
.custom-collapse .el-collapse-item__wrap {
  border-bottom: none;
}

.custom-collapse .el-collapse-item__content {
  padding-bottom: 0;
}

.custom-collapse .el-collapse-item.is-active .el-collapse-item__header {
  border-bottom: 1px solid #ebeef5;
}

.custom-form.el-form .el-form-item {
  width: calc(100% / 3);
}

.custom-form {
  flex-wrap: wrap;
}

.el-form-item__label {
  float: left;
}

.el-form-item__label {
  float: left;
}
.fix-bottom-buttonIn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 600px;
  padding: 10px;
  position: fixed;
  bottom: 5px;
  right: 0px;
}
</style>
<style>
.ss-white-table {
  margin-top: 10px;
}

.ss-white-table th {
  background-color: #f5f6fa;
}
</style>
