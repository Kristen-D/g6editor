<template>
  <el-form v-if="options.formData != null " :ref="options.name" label-width="120px" :model="options.formData">
    <el-form-item v-for="(fitem,bindex) in options.fileds" :label="fitem.label+':'" v-if="fitem.isShow !== false" :prop="fitem.name"
      :required="fitem.required">
      <a v-if="fitem.type=='string'">{{options.formData[fitem.name]}}</a>


      <slot v-if="fitem.type=='slot'" :name="fitem.name"> </slot>

      <el-select v-if="fitem.type=='select'" v-model="options.formData[fitem.name]">
        <el-option v-for="option in options.ajaxDatas[fitem.ajaxData]" :key="option.value" :label="option.label" :value="option.value">
        </el-option>
      </el-select>

      <el-radio-group v-if="fitem.type=='radio'" v-model="options.formData[fitem.name]" @change="radioChange(fitem,options)">
        <el-radio v-for="ritem in fitem.options " :label="ritem.value">{{ritem.label}}</el-radio>
      </el-radio-group>

      <el-input v-if="fitem.type=='input'" style="width:300px" v-model="options.formData[fitem.name]" :placeholder="fitem.placeholder"></el-input>

    </el-form-item>
    <el-form-item v-if="options.button">
      <el-button v-if="options.button.submit" type="primary" @click="submitForm(options)">确认</el-button>
      <el-button v-if="options.button.cancel" @click="goBack()">返回</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
  export default {
    components: {},
    props: ['options'],
    data() {
      return {
        x: null,
      }
    },
    methods: {
      submitForm(options) {
        this.$emit("onSubmitForm", options);
      },
      goBack() {
        if (this.$router) {
          this.$router.go(-1);
        } else {
          this.$emit("close")
        }
      },
      radioChange(item, options) {
        if (item.change) {
          item.change(item, options)
        }
      }
    },
    created: function () {
      console.log(this.options);
    }
  }

</script>
