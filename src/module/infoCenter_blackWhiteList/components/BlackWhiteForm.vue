<template>
<div>

    <div class="whitebackground Whitespace">
      <div class="top-title" v-if="!this.$route.params.list_id">新增黑／白名单</div>
      <div class="top-title" v-if="this.$route.params.list_id">编辑黑／白名单</div>

      <el-form ref="blackWhiteForm" :model="blackWhiteForm" :rules="rules" label-width="90px">

        <el-form-item label="名单类型" prop="list_type_id">
          <el-select v-model="blackWhiteForm.list_type_id" placeholder="请选择">
            <el-option v-for="item in listTypeList" :label="item.text" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="内容" prop="list_value">
          <el-input v-model="blackWhiteForm.list_value"></el-input>
        </el-form-item>


        <el-form-item>
          <el-button type="primary" @click="onSubmit">保存</el-button>
          <el-button @click="goBack">返回</el-button>
        </el-form-item>
      </el-form>
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
      blackWhiteForm: {
        list_type_id: null,
        list_value: "",
        bw_type: ""
      },
      rules: {
        list_type_id: [{
          type: 'number',
          required: true,
          message: '请选择名单类型',
          trigger: 'change'
        }],
        list_value: [{
          required: true,
          message: '请输入内容',
          trigger: 'blur'
        }]
      }

    }

  },
  computed: {
    ...mapState({
      listTypeList: state => state.context.listTypeList
    })
  },
  methods: {
    checkForm(){
      var flag = false;
      this.$refs["blackWhiteForm"].validate((valid) => {
        if (valid) {
          flag =true;
        } else {
          flag=false;
        }
      });
      return flag;
    },

    async onSubmit() {
      if(this.checkForm()){
        var msg = await utils.req("/ssa/infoCenter_blackWhiteList/saveData.do", this.blackWhiteForm, this);
        this.$message({
          type: "success",
          message: msg
        });
        this.goBack();
      }








    },
    goBack() {
      this.$router.go(-1);
    }

  },
  created: function() {
    this.$store.dispatch('loadListTypeList');
    //  修改赋值
    if (this.$route.params.handle == "update") {
      this.blackWhiteForm = this.$route.params;
    }

    //新增赋值
    if (this.$route.query.handle == "add") {
      this.blackWhiteForm.bw_type = this.$route.query.bw_type;
    }

  }
}
</script>

<style>

</style>
