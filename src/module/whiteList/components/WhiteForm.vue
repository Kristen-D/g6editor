<template>
  <div>
    <div class="el-subpanel-heading" style="padding-left:15px;padding-top:15px;">
      <h2 class="lightPurple" v-if="this.$route.params.handle == 'add'&& this.$route.params.bw_type == 1 ">新增白名单</h2>
      <h2 class="lightPurple" v-if="this.$route.params.handle == 'update'&& this.$route.params.bwType == 1 ">编辑白名单</h2>
    </div>
    <div class="areaFocus el-button--purple">
      <div class="el-subpanel-body">
        <el-form ref="blackWhiteForm" :model="blackWhiteForm" :rules="rules" label-width="90px">
          <el-form-item v-for="(value,key) in testList" :prop="key" :label="value" style="width:500px">
            <el-input  v-model="blackWhiteForm[key]"></el-input>
          </el-form-item> 
          <el-form-item>
            <div style="color:#bbb">注：不填内容系统默认填为any</div>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button type="gray" @click="goBack">返回</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script>
import utils from 'components/js/common.js'
import {
  mapState
} from 'vuex'
export default {

  data() {
    return {
      testList:[],
      blackWhiteForm: {
        bw_type:"1",
        list_type_id:"",
        list_id:"",
        value1:"",
        value2:"",
        value3:"",
        value4:"",
        value5:"",
      },

    }

  },
  computed: {
    ...mapState({
      listTypeList: state => state.context.listTypeList
    })
  },
  methods: {
    checkForm(){
      var len = Object.keys(this.testList).length
      for(var i=1;i<=len;i++){
        var key = "value" + i;
        this.blackWhiteForm[key] = this.blackWhiteForm[key] == ""? "any":this.blackWhiteForm[key];
      }
    },
    async onSubmit() {
      this.checkForm()
      console.log(this.blackWhiteForm);
      // if (this.checkForm()) {
        var msg = await utils.reqBackState("/ssa/blackWhiteList/saveData.do", this.blackWhiteForm, this);
        if(msg){
          this.$message({
            type: 'success',
            message: msg.data
          });
        }else{
          this.$message({
            type: 'error',
            message: msg.data
          });
        }
        this.goBack();
      // }
    },
    goBack() {
      this.$router.go(-1);
    }

  },
  created: function() {
    this.$store.dispatch('loadListTypeList');
    this.testList = this.$route.params.testList;
    //  修改赋值
    if (this.$route.params.handle == "update") {

      this.blackWhiteForm.list_type_id = this.$route.params.listTypeId;
      this.blackWhiteForm.list_id = this.$route.params.listId;
      this.blackWhiteForm.bw_type = this.$route.params.bwType;

      this.blackWhiteForm.value1 = this.$route.params.value1;
      this.blackWhiteForm.value2 = this.$route.params.value2;
      this.blackWhiteForm.value3 = this.$route.params.value3;
      this.blackWhiteForm.value4 = this.$route.params.value4;
      this.blackWhiteForm.value5 = this.$route.params.value5;
      console.log(this.blackWhiteForm)
    }

    //新增赋值
    if (this.$route.params.handle == "add") {
      this.testList = this.$route.params.testList;
      this.blackWhiteForm.bw_type = this.$route.params.bw_type;
      this.blackWhiteForm.list_type_id = this.$route.params.list_type_id;
    }
    
  }
}

</script>
<style>
</style>
