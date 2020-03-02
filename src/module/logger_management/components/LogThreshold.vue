<template>
<div>

  <div :class="[advancedFlag ? 'senior-search':'ordinary-search', clearfloat]" >
      <el-form :model="params" ref="params" label-width="80px">
        <div class="" style="display:inline-block;">

          <el-form-item label="日志类型" style="display:inline-block; margin-left:20px;">
            <el-select v-model="params.logType" clearable placeholder="所有类型">
              <el-option v-for="item in allLogType" :key="item.value" :label="item.label" :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>

          <el-form-item style="display:inline-block;" v-if="!advancedFlag">
            <el-button type="primary" class="button-p-2" @click="search">搜索</el-button>
          </el-form-item>

        </div>
        <transition enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutLeft" mode="out-in">
          <div class="" v-if="advancedFlag">

            <el-form-item label="存储类型" style="display:inline-block; margin-left:20px;">
              <el-select v-model="params.storeType" clearable placeholder="所有类型">
                <el-option v-for="item in allStoreType" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="存储对象" style="display:inline-block; margin-left:20px;">
              <el-input v-model="params.storeObject" placeholder="所有对象"></el-input>
            </el-form-item>

            <el-form-item label="保存周期" style="display:inline-block; margin-left:20px;">
              <el-input v-model="params.savePeriod" placeholder="所有周期"></el-input>
            </el-form-item>

            <el-form-item label="状态" style="display:inline-block; margin-left:20px;">
              <el-select v-model="params.status" clearable placeholder="所有状态">
                <el-option v-for="item in allStatusType" :key="item.value" :label="item.label" :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>
          </div>
        </transition>
        <el-form-item v-if="advancedFlag" style="display:inline-block;margin-bottom:0px;">
          <el-button type="primary" class="button-p-2" @click="search">搜索</el-button>
        </el-form-item>

        <div class="float-r">
          <p class="search-tag search-tag02" @click="hideAdvanced" v-if="advancedFlag">
            <i class="el-icon-search  m-r-8" style="margin-right:8px;"></i>普通搜索
          </p>
          <p class="search-tag" @click="showAdvanced" v-if="!advancedFlag">
            <i class="el-icon-search" style="margin-right:8px;"></i>高级搜索
          </p>
          <el-button type="graypink" size="small" @click="reload"><i class="icon-refresh icon-size"></i></el-button>
        </div>
      </el-form>
  </div>
  <div class="float-r">
     <!-- <span style="position:fixed; left:440px;">阈值列表</span> -->
    <el-button type="primary" size="small" @click="addRow">新增</el-button>
    <el-button type="primary" size="small" @click="deleteRow">删除</el-button>

  </div>
  <el-table :data="data" style="width: 100%" ref="multipleTable" @selection-change="handleSelectionChange">
    <el-table-column type="selection">
    </el-table-column>
    <el-table-column prop="logType"  align="center" label="日志类型" width="100"> </el-table-column>
    <el-table-column prop="storeType"  align="center" label="存储类型" width="100"></el-table-column>
    <el-table-column prop="storeObject"  align="center" label="存储对象" width="100"> </el-table-column>
    <el-table-column prop="savePeriod"  align="center" label="保存周期" width="100"> </el-table-column>
    <el-table-column prop="beginEraseTime"  align="center" label="删除时间" width="200"> </el-table-column>
    <el-table-column prop="status"  align="center" label="状态" width="100"> </el-table-column>
    <el-table-column label="操作" align="center" width="200">
      <template scope="scope">
             <el-button type="text"  style="color:#00a0fe; margin-right:17px;" icon="edit" @click="editThreshold(scope.row)">
             </el-button>
             <span style="color: #F3F3F3">|</span>
             <el-button type="text" style="color:#00a0fe; margin-left:17px;" icon="delete2" @click="deleteThreshold(scope.row)"></el-button>
      </template>
    </el-table-column>
  </el-table>


    <el-pagination class=" float-r page-location" @current-change="handleCurrentChange" :page-size="pageSize" :current-page="pageIndex" layout="total, prev, pager, next, jumper" :total="total">
    </el-pagination>

  <el-dialog title="新增阈值" :visible.sync="addRowShow" width="30%"  class="dialog-panel">
    <el-form :label-position="labelPosition" label-width="100px" :model="params2">
      <el-form-item label="日志类型" required>
        <el-select v-model="params2.logType" clearable placeholder="所有类型">
          <el-option v-for="item in allLogTypeAdd" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="存储类型" required>
        <el-select v-model="params2.storeType" clearable placeholder="所有类型">
          <el-option v-for="item in allStoreTypeAdd" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="存储对象" style="width:290px;" required>
        <el-input v-model="params2.storeObject" placeholder="所有对象"></el-input>
      </el-form-item>
      <el-form-item label="保存周期" required>
      <el-input v-model="params2.savePeriod" class="input-mw"></el-input>
      <span>天</span>
      </el-form-item>
     <el-form-item label="删除时间" required>
      <el-input v-model="params2.minute"  class="input-mw"></el-input>
      <span>分</span>
      <el-input v-model="params2.hour" class="input-mw m-l-10"></el-input>
      <span>时</span>
      <el-input v-model="params2.day" class="input-mw m-l-10"></el-input>
      <span>天</span>

      <el-input v-model="params2.month" class="input-mw m-l-10"></el-input>
      <span>月</span>

      <el-input v-model="params2.week" class="input-mw m-l-10"></el-input>
      <span>周</span>
      </el-form-item>

      <el-form-item>
         <el-button type="primary" @click="savaNewThreshold">保存</el-button>
         <el-button @click="addBack">取消</el-button>
       </el-form-item>
    </el-form>
  </el-dialog>

  <el-dialog title="编辑阈值" :visible.sync="editThresholdShow" width="30%" class="dialog-panel">
    <el-form :label-position="labelPosition" label-width="100px" :model="editParams">
      <el-form-item label="日志类型" required>
        <el-select v-model="editParams.logType" clearable >
          <el-option v-for="item in allLogTypeAdd" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="存储类型" required>
        <el-select v-model="editParams.storeType" clearable >
          <el-option v-for="item in allStoreTypeAdd" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="存储对象" style="width:290px;" required>
        <el-input v-model="editParams.storeObject"></el-input>
      </el-form-item>
      <el-form-item label="保存周期" required>
      <el-input v-model="editParams.savePeriod" class="input-mw"></el-input>
      <span>天</span>
      </el-form-item>
      <el-form-item label="状态" required>
        <el-select v-model="editParams.status" clearable >
          <el-option v-for="item in allStatusType" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
     <el-form-item label="删除时间" required>
      <el-input v-model="editParams.minute"  class="input-mw"></el-input>
      <span>分</span>
      <el-input v-model="editParams.hour" class="input-mw m-l-10"></el-input>
      <span>时</span>
      <el-input v-model="editParams.day" class="input-mw m-l-10"></el-input>
      <span>天</span>

      <el-input v-model="editParams.month" class="input-mw m-l-10"></el-input>
      <span>月</span>

      <el-input v-model="editParams.week" class="input-mw m-l-10"></el-input>
      <span>周</span>
      </el-form-item>
         <el-button type="primary" @click="saveEditThreshold">保存</el-button>
         <el-button @click="editBack">取消</el-button>
       </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog title="新增失败" :visible.sync="addFail" width="30%" class="dialog-panel">
    <span >
      所填写的属性不能为空
    </span>
    <div class="" >
      <el-button type="primary" @click="addFailBack" class="button-p-3">返回</el-button>
    </div>

  </el-dialog>


</div>
</template>

<script>

export default {
  components: {
  },
  computed: {
  },
  data() {
    return {
      beginEraseTimeParams:[],
      labelPosition: 'right',
      logType:'',
      storeType:'',
      storeObject:'',
      savePeriod:'',
      status:'',
      beginEraseTime:'',
      params:{
        logType:'',
        storeType:'',
        storeObject:'',
        savePeriod:'',
        status:'',
        beginEraseTime:''
      },
      params2:{
        logType:'',
        storeType:'',
        storeObject:'',
        savePeriod:'',
        status:'',
        beginEraseTime:'',
        day:'',
        minutr:'',
        hour:'',
        week:'',
        month:''
      },
      editParams:{
        logType:'',
        storeType:'',
        storeObject:'',
        savePeriod:'',
        status:'',
        beginEraseTime:'',
        day:'',
        minutr:'',
        hour:'',
        week:'',
        month:''
      },
      advancedFlag:false,
      addRowShow:false,
      editThresholdShow:false,
      pageSize: 10,
      pageIndex: 1,
      total:0,
      addFail:false,
      getBeginEraseTime:'',
      editRowId:'',
      data:[],
      allLogType:[],
      allStoreType:[],
      allStatusType:[],
      allLogTypeAdd:[],
      allStoreTypeAdd:[],
      allStatusTypeAdd:[],
      allSelectRow:[],
      queryThresholdInfoByConditionsUrl:"/ssa/loggerManagement/queryThresholdInfoByConditions.do",
        getLogTypeUrl:"/ssa/loggerManagement/getLogType.do",
        getStoreTypeUrl:"/ssa/loggerManagement/getStoreType.do",
        getStatusTypeUrl:"/ssa/loggerManagement/getStatusType.do",
        deleteThresholdUrl:"/ssa/loggerManagement/deleteThreshold.do",
        addNewThresholdUrl:"/ssa/loggerManagement/addNewThreshold.do",
        getBeginEraseTimeUrl:"/ssa/loggerManagement/getBeginEraseTime.do",
        updateThresholdUrl:"/ssa/loggerManagement/updateThreshold.do"

  }
},
  methods: {
    saveEditThreshold(){
      if(this.editParams.logType === ''||this.editParams.storeType === ''||this.editParams.storeObject===''||this.editParams.savePeriod===''){
        this.addFail = true;
      }else if (this.editParams.logType !== ''||this.editParams.storeType !== ''||this.editParams.storeObject!==''||this.editParams.savePeriod!=='') {
        if(this.editParams.minute === ''){
          this.editParams.minute = "*";
        }
        if (this.editParams.hour === '') {
          this.editParams.hour = "*";
        }
        if(this.editParams.day === ''){
          this.editParams.day = "*";
        }
        if (this.editParams.month === '') {
          this.editParams.month = "*";
        }
        if (this.editParams.week==='') {
          this.editParams.week = "*";
        }
        this.editParams.beginEraseTime = this.editParams.minute+" "+this.editParams.hour+" "+this.editParams.day+" "+this.editParams.month+" "+this.editParams.week+" ";
        var params = {
          id: this.editRowId,
          logType : this.editParams.logType,
          storeType : this.editParams.storeType,
          storeObject: this.editParams.storeObject,
          savePeriod: this.editParams.savePeriod,
          status: this.editParams.status,
          beginEraseTime: this.editParams.beginEraseTime
        }
        this.common.req(this.updateThresholdUrl, params).then(data => {
            this.editThresholdShow = false;
            this.getData();
        });

      }
    },
    handleSelectionChange(val){
      this.allSelectRow = val;

    },
    deleteRow(){
      for(var i = 0; i < this.allSelectRow.length; i++){
        this.deleteThreshold(this.allSelectRow[i]);
      }
    },
    deleteThreshold(row){
    var params = {id:row.id};
    var a = this;
      this.common.req(this.deleteThresholdUrl, params).then(data => {
        a.getData();
      });
    },
    addFailBack(){
      this.addFail = false;

    },
    savaNewThreshold(){
      if(this.params2.logType === ''||this.params2.storeType === ''||this.params2.storeObject===''||this.params2.savePeriod===''){
        this.addFail = true;
      }else if (this.params2.logType !== ''||this.params2.storeType !== ''||this.params2.storeObject!==''||this.params2.savePeriod!=='') {
        if(this.params2.minute === ''){
          this.params2.minute = "*";
        }
        if (this.params2.hour === '') {
          this.params2.hour = "*";
        }
        if(this.params2.day === ''){
          this.params2.day = "*";
        }
        if (this.params2.month === '') {
          this.params2.month = "*";
        }
        if (this.params2.week==='') {
          this.params2.week = "*";
        }
        this.params2.beginEraseTime = this.params2.minute+" "+this.params2.hour+" "+this.params2.day+" "+this.params2.month+" "+this.params2.week+" ";
        var params = {
          logType : this.params2.logType,
          storeType : this.params2.storeType,
          storeObject: this.params2.storeObject,
          savePeriod: this.params2.savePeriod,
          status: '1',
          beginEraseTime: this.params2.beginEraseTime
        }
        this.common.req(this.addNewThresholdUrl, params).then(data => {
          this.addRowShow = false;
          this.getData();
          this.addReLoad();
        });

      }

    },
    addReLoad(){
      this.params2.logType = '';
      this.params2.storeType = '';
      this.params2.storeObject = '';
      this.params2.savePeriod = '';
      this.params2.status = '';
      this.params2.minute = '';
      this.params2.hour = '';
      this.params2.day ='';
      this.params2.month='';
      this.params2.week = '';
    },
    reload(){
      this.params.logType = '';
      this.params.storeType = '';
      this.params.storeObject = '';
      this.params.savePeriod = '';
      this.params.status = '';
      this.getData();
    },
    search(){
      this.getData();
    },
    getStatusType(){
      var params = {};
     this.common.req(this.getStatusTypeUrl, params).then(data => {
       this.allStatusType =data;
       this.allStatusTypeAdd =data;

     });
    },
    getLogType(){
      var params = {};
     this.common.req(this.getLogTypeUrl, params).then(data => {
       this.allLogType =data;
       this.allLogTypeAdd = data;

     });
    },
    getStoreType(){
      var params = {};
     this.common.req(this.getStoreTypeUrl, params).then(data => {
       this.allStoreType =data;
       this.allStoreTypeAdd =data;

     });
    },
    editBack(){
      this.editThresholdShow = false;
    },
    editThreshold(row){
      this.editThresholdShow = true;
    //  console.log(row.adataType);
      this.editParams.logType = row.adataType.toString();
      this.editParams.storeType = row.astoreType.toString();
      this.editParams.storeObject = row.storeObject;
      this.editParams.savePeriod= row.savePeriod;
      this.editParams.status = row.astatus.toString();
      this.editParams.beginEraseTime = row.beginEraseTime;
      this.editRowId = row.id;
      this.handleEditBeginEraseTime(row.id);
    },
    handleEditBeginEraseTime(rid){
      var params = {id:rid};
      var a = this;
        this.common.req(this.getBeginEraseTimeUrl, params).then(data => {
          this.getBeginEraseTime=data[0].beginEraseTime;
          var strs= new Array();
          strs = this.getBeginEraseTime.split(" ");
          this.editParams.minute = strs[0];
          this.editParams.hour = strs[1];
          this.editParams.day = strs[2];
          this.editParams.month = strs[3];
          this.editParams.week = strs[4];
        });


    },

    addBack(){
      this.addRowShow = false;
      this.addReLoad();
    },
    addRow(){
      this.addRowShow = true;
    },
    hideAdvanced(){
        this.advancedFlag = false;
    },
    showAdvanced(){
        this.advancedFlag = true;
    },
    getData(){
      var params = {...this.params,pageSize:this.pageSize, pageIndex:this.pageIndex};
       this.common.req(this.queryThresholdInfoByConditionsUrl, params).then(data => {
       this.data =data.rowData;
       this.total = data.total;
       this.handleBeginEraseTime(this.data);
  //     console.log(this.data[0].beginEraseTime);
//  console.log(this.data);
     });
   },

   handleBeginEraseTime(data){
    //  console.log(data.length);
    var i=0;
    var strs= new Array();
     for(;i<data.length;i++){
      strs = data[i].beginEraseTime.split(" ");
      this.data[i].beginEraseTime = strs[0]+"分"+strs[1]+"时"+strs[2]+"日"+strs[3]+"月"+strs[4]+"周";
      //console.log(this.data[i].beginEraseTime);
     }

   },
   //处理翻页时候的事件
   handleCurrentChange(pageIndex) {
     this.pageIndex = pageIndex;
     this.getData();
   }


},
  created: async function() {
    this.getData();
    this.getLogType();
    this.getStoreType();
    this.getStatusType();
}
}
</script>

<style>
  .input-mw{ max-width: 10%;}
  .m-l-10{ margin-left: 10px; }

  .dialog-panel .el-dialog {min-width: 575px;}
  .dialog-panel .el-dialog__header{padding:20px 20px 0; padding-bottom:14px; padding-top:14px; border:1px solid #E1E3E4; }
  .dialog-panel .el-dialog__header .el-dialog__close {cursor: pointer; color: #505354 !important;}
  .dialog-panel .el-dialog__body{padding:30px 20px; padding:20px; color:#3E4956; font-size:14px;}

  .senior-search{margin-top: 10px;}

</style>
