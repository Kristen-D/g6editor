<template>
  <div style="padding-bottom: 18px;"  >
    <div class="el-panel-white">
      <div class="el-panel-white-heading">
        <h3 class="el-panel-white-title">{{form.typeName}}</h3>
      </div>
       <div class="el-panel-white-body p-l-50 clearfloat">
  <el-form  :model="form"   ref="form" label-width="150px" class="sys-cfg-form">
   <el-form-item label="zookeeper地址:" prop="zkUrl"  >
     <el-input v-model="form.zkUrl" style="width:50%" >   </el-input>
      <testBtn ref="zkTest" @click="testZkUrl" ></testBtn>
   </el-form-item>


   <el-form-item label="solr地址:" prop="solrUrl">
     <el-input v-model="form.solrUrl" style="width:50%" >  </el-input>
     <testBtn ref="solrTest" @click="testSolrUrl" ></testBtn>
   </el-form-item>
   <el-form-item>
    <el-button type="primary" @click="save">保存</el-button>
  </el-form-item>
 </el-form>
</el-card>
</div>
</div>
</div>
</template>
<script>
import testBtn from './TestButton.vue';
export default {
    components:{testBtn},
    data() {
        return {
          form:{type:"middleware",typeName:"中间件",zkUrl:"",solrUrl:"",},
        }
    },
    methods: {

    async  save(){
        let result =  await  this.common.reqDef("/ssa/sysCfg/saveSysCfg.do",this.form);
        if(result.state){
            this.$alert(result.message, '成功');
        }else{
            this.$alert(result.message, '失败');
        }

       },

    async testZkUrl(){
         let result =  await  this.common.req("/ssa/sysCfg/testZkUrl.do",{zkUrl:this.form.zkUrl});
         this.$refs.zkTest.changeButton(result);

      },
      async testSolrUrl(){
          let  result =  await  this.common.req("/ssa/sysCfg/testSolrUrl.do",{solrUrl:this.form.solrUrl});
          this.$refs.solrTest.changeButton(result);

        },

    },

    created: async function() {
        this.common.req("/ssa/sysCfg/getCfg.do",this.form).then(data=>{
            this.form = {...this.form,...data};
        })
    },
    mounted: function() {


    }

}

</script>
