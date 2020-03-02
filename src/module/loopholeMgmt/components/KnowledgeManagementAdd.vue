<template>
<div>
<div class="top-title">新增漏洞</div>
  <el-form :label-position="labelPosition" label-width="150px" :model="params" :rules="rules">
    <el-form-item label="漏洞名称：" style="width:290px;" required prop="vulName">
      <el-input v-model="params.vulName" placeholder="请输入名称" style="width:400px"></el-input>
    </el-form-item>
    <el-form-item label="发布时间：" style="width:290px;" required>
      <el-date-picker v-model="params.publishDate" type="datetime" placeholder="" disabled style="width:400px"></el-date-picker>
    </el-form-item>
    <el-form-item label="CNNVD编号：" style="width:290px;" required prop="cnnvd">
      <el-input v-model="params.cnnvd" placeholder="请输入“CNNVD-年月-编号”格式的编号" style="width:400px"></el-input>
    </el-form-item>
    <el-form-item label="CVE编号：" style="width:290px;" required prop="cve">
      <el-input v-model="params.cve" placeholder="请输入“CVE-年-编号”格式的编号" style="width:400px"></el-input>
    </el-form-item>

    <el-form-item  label="漏洞类型：" style="width:290px" required prop="vulType">
        <el-input v-model="params.vulType"  placeholder="漏洞类型"></el-input>
    </el-form-item>

    <el-form-item label="威胁类型：" style="width:290px">
      <el-select v-model="params.threadType" clearable placeholder="选择类型">
        <el-option  v-for="item in allThreatType" :key="item.value" :label="item.name" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="等级：" style="width:290px" required prop="riskLevel">
      <el-select v-model="params.riskLevel" clearable placeholder="选择等级">
        <el-option  v-for="item in allRiskLevel" :key="item.value" :label="item.name" :value="item.value">
        </el-option>
      </el-select>
    </el-form-item>

    <el-form-item label="补丁信息：" style="width:290px;" >
      <el-input type="textarea" v-model="params.patchInfo" placeholder="内容不超过125个字符" maxlength="125" style="width:700px" :autosize="{ minRows: 1, maxRows: 5}"></el-input>
    </el-form-item>

    <el-form-item label="漏洞公告：" style="width:290px;">
      <el-input type="textarea" v-model="params.vulDisclosure" placeholder="内容不超过125个字符" maxlength="125" style="width:700px" :autosize="{ minRows: 1, maxRows: 5}"></el-input>
    </el-form-item>

    <el-form-item label="漏洞描述：" style="width:290px;" >
      <el-input type="textarea" v-model="params.vulBreif" placeholder="内容不超过125个字符" maxlength="125" style="width:700px" :autosize="{ minRows: 1, maxRows: 5}"></el-input>
    </el-form-item>

    <el-form-item label="厂商：" style="width:290px;">
      <el-input v-model="params.manufacturers" placeholder="厂商名称" style="width:400px"></el-input>
    </el-form-item>

    <el-form-item label="漏洞来源：" style="width:290px;">
      <el-input v-model="params.vulSource" placeholder="来源" style="width:400px"></el-input>
    </el-form-item>

    <el-form-item label="影响范围：" style="width:290px;">
      <el-input type="textarea" v-model="params.affectScope" placeholder="内容不超过125个字符" maxlength="125" style="width:700px" :autosize="{ minRows: 1, maxRows: 5}"></el-input>
    </el-form-item>



    <el-form-item>
       <el-button type="primary" @click="savaNew" class="button-p-3">保存</el-button>
       <el-button type="gray" @click="addBack" class="button-p-3">取消</el-button>
     </el-form-item>
  </el-form>

  <el-dialog title="新增" :visible.sync="addShow" width="30%" class="dialog-panel">
    <span >
      是否新增数据？
    </span>
    <div class="" style="margin-top:20px;">
      <el-button type="primary" @click="confirmAdd" class="button-p-3">确认</el-button>
      <el-button type="gray" @click="cancelAdd" class="button-p-3">取消</el-button>
    </div>
  </el-dialog>
</div>
</template>
<script>
export default {
  data(){

    return {
      params:{
        vulName:'',
        vulType:'',
        vulTypeTwo:[],
        threadType:'',
        riskLevel:'',
        cnnvd:'',
        cve:'',
        publishDate:'',
        patchInfo:'',
      	vulDisclosure:'',
      	vulBreif:'',
      	manufacturers:'',
      	vulSource:'',
      	affectScope:''
      },
      rules:{
        vulName:[{required: true, message: '请输入漏洞名称', trigger: 'blur'} ],
        cnnvd:[{required: true, message: '请输入CNNVD编号', trigger: 'blur'}],
        cve:[{required: true, message: '请输入CVE编号', trigger: 'blur'}],
        vulType:[
          { required: true, message: '请输入漏洞类型', trigger: 'blur'},
      // { validator: checkAge, trigger: 'change' }
    ],
        riskLevel:[{required: true, message: '请选择等级', trigger: 'change'}]
      },
      allThreatType:[],
      allVulTypeHandle:[],
      allVulType:[],
      allRiskLevel:[],
      selectVulType:'',
      addShow:false,

      getAllThreatTypeUrl:"/ssa/loopholeMgmtManager/getAllThreatType.do",
      getAllRiskLevelUrl:"/ssa/loopholeMgmtManager/getAllRiskLevel.do",
      addNewKnowledgeUrl:"/ssa/loopholeMgmtManager/addNewKnowledge.do"

    }
  },
  methods:{
    confirmAdd(){
  //    this.params.vulType = this.selectVulType;
      this.judgeTimeType();
      var cnnvdFormat =  /^[A-Z]{5}[-]{1}[0-9]{4}(0{1}[1-9]|1[0-2])[-]{1}[0-9]{1,}$/;
      var cveFormat = /^[A-Z]{3}[-]{1}[0-9]{4}[-]{1}[0-9]{1,}$/;
      if(cnnvdFormat.test(this.params.cnnvd) && cveFormat.test(this.params.cve)){
      this.common.reqDef(this.addNewKnowledgeUrl, this.params).then(data => {

        if(data.message==='cnnvdFalse'){
            this.addShow = false;
            this.$message({
              type: 'error',
              message: 'CNNVD编号重复，请更换。'
            })
        }else if(data.message==='cveFalse'){
          this.addShow = false;
          this.$message({
            type: 'error',
            message: 'CVE编号重复，请更换。'
          })
        }else{
          this.addShow = false;

          this.$router.push({name:'knowledgemanagement'});
          this.$message({
            type: 'success',
            message: '新增成功'
          })
        }
      });
    }else{
      this.$message({
        type: 'error',
        message: 'CNNVD或CVE编号格式不正确。'
      })
    }
    },
    cancelAdd(){
      this.addShow = false;
    },
    judgeTimeType(){
      if(typeof(this.params.publishDate) === 'object'){
        this.params.publishDate = this.common.formatDate(this.params.publishDate);
      }
    },
    savaNew(){
      this.addShow = true;

    },
    addBack(){

        this.$router.push({name:'knowledgemanagement'});
    },
    getAllRiskLevel(){
      var params = {};
     this.common.req(this.getAllRiskLevelUrl, params).then(data => {
       this.allRiskLevel =data;
     });
    },
    getAllThreatType(){
      var params = {};
     this.common.req(this.getAllThreatTypeUrl, params).then(data => {
       this.allThreatType =data;
     });
    },
    selectType(val){
      this.selectVulType = val[1];
    //  console.log(this.selectVulType);

    },

      getNowFormatDate() {
          var date = new Date();
          var seperator1 = "-";
          var seperator2 = ":";
          var month = date.getMonth() + 1;
          var strDate = date.getDate();
          if (month >= 1 && month <= 9) {
              month = "0" + month;
          }
          if (strDate >= 0 && strDate <= 9) {
              strDate = "0" + strDate;
          }
          var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                  + " " + date.getHours() + seperator2 + date.getMinutes()
                  + seperator2 + date.getSeconds();
          return currentdate;
      },

     handleAllVulType(){
       for(var i=0; i<this.allVulType.length; i++){
         if(this.allVulType[i].pid.toString() === '-1'){
           var temp = {
             value:'',
             label:'',
             children:[]
           };
           temp.value = this.allVulType[i].id.toString();
           temp.label = this.allVulType[i].name.toString();
           this.allVulTypeHandle.push(temp);
         }else{
          for(var j=i; j<this.allVulType.length;j++){
            if(this.allVulType[i-1].id === this.allVulType[j].pid){
              var childData = {
                value:'',
                label:''
              };
               childData.value = this.allVulType[j].id.toString();
               childData.label = this.allVulType[j].name.toString();
               temp.children.push(childData);
            }
          }
        }
       }
     }



},
  created: async function() {

    this.getAllThreatType();
    this.getAllRiskLevel();
    this.params.publishDate = this.getNowFormatDate();


}
}
</script>
<style>

</style>
