<template>
  <div>
  <el-card class="box-card" v-for="(item,index) in options" style="margin-top:20px;">
    <div slot="header" class="clearfix">
      {{item.cardTitle}}
    </div>
    <template v-for="(bitem,bindex) in item.cardBody" >
     <a v-if  v-if="bitem.type=='string'" > {{bitem.data}}</a>

      <slot v-if="bitem.type=='slot'" :name="bitem.name"  ></slot>

      <el-form v-if="bitem.type=='form'" :ref="bitem.name" label-width="120px" :model="bitem.formData" >
        <el-form-item v-for="(fitem,bindex) in bitem.fileds" :label="fitem.label+':'"  v-if="fitem.isShow !== false" :prop="fitem.name" :required="fitem.required">
          <a v-if="fitem.type=='string'">{{bitem.formData[fitem.name]}}</a>


          <slot v-if="fitem.type=='slot'"   :name="fitem.name" > </slot>

          <el-select v-if="fitem.type=='select'" v-model="bitem.formData[fitem.name]" >
            <el-option
           v-for="option in item.ajaxDatas[fitem.ajaxData]"
           :key="option.value"
           :label="option.label"
           :value="option.value" >
         </el-option>
          </el-select>

          <el-radio-group v-if="fitem.type=='radio'"   v-model="bitem.formData[fitem.name]">
            <el-radio v-for="ritem in fitem.options " :label="ritem.value">{{ritem.label}}</el-radio>
          </el-radio-group>

          <el-input  v-if="fitem.type=='input'" style="width:300px" v-model="input" :placeholder="fitem.placeholder"></el-input>

       </el-form-item>
       <el-form-item v-if="bitem.button">
          <el-button v-if="bitem.button.submit" type="primary" @click="submitForm(bitem)">确认</el-button>
          <el-button v-if="bitem.button.cancel" @click="goBack()" >返回</el-button>
        </el-form-item>
     </el-form>

     <div  v-if="bitem.type=='tableInfo'"  style="margin-top:30px;">
       <div class="el-panel-white-subtitle">{{bitem.label}}</div>
       <paramsTable :columns="bitem.columns" :tableData = "bitem.tableData" ></paramsTable>
     </div>


    </template>


  </el-card>
</div>
</template>
<script>
import paramsTable from './ParamsTable.vue'
export default {
  components:{
    paramsTable
  },
    props:['options'],
    data(){
        return {

        }
    },
    methods:{

      submitForm(data){
        this.$emit("onSubmitForm",data);
      },
      goBack() {
        this.$router.go(-1);
      },
    },
    created :function() {
      this.$watch('options', options => {
       this.options = options;
       this.$emit("onOptionsChange",options);
      }, { deep: true })
    }
  }

</script>
