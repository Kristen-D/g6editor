<template>
  <div id="app">
    <div class="container-fluid">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="top-breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">控制台</el-breadcrumb-item>
        <el-breadcrumb-item>域名解析监控</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="el-panel">
        <div class="el-panel-heading">
          <h3 class="el-panel-title">监测域名列表</h3>
          <div class="btn-handle">
            <el-button type="text" size="medium" class="text-info btn-download m-r-20" @click="dialogDown=true"><i class="imgicon download-icon"></i>报告下载</el-button>
            <el-button type="text" size="medium" class="text-info btn-domian" @click="getMonitorDomain"><i class="imgicon domain-icon"></i>监测域名管理</el-button>
          </div>
        </div>
        <div class="el-panel-body">
          <el-collapse v-model="activeNames" @change="handleChange"  class="collapse-panel" v-if="domainList.length>0">
            <el-collapse-item :name="index+1" v-for="(item,index) in domainList">
              <template slot="title">
                <ul class="collapse-header">
                  <li class="order">{{index+1}}</li>
                  <li class="website">{{item.domain_name}}</li>
                  <li class="webip">网站 IP &nbsp;: {{item.domain_ip}}</li>
                  <li class="state text-danger" v-if="item.threat.length>0"><i class="circle circle-high"></i>存在威胁：<span>{{item.threat.length}}</span></li>
                  <li class="state text-green" v-if="!item.threat.length>0"><i class="circle circle-green"></i>状态良好</li>
                </ul>
              </template>
              <div class="info" v-if="item.threat.length>0">
                <h4 class="">
                  <i class="el-icon-caret-right m-r-8 text-primary"></i>基础信息
                  <el-button type="text" size="small" @click="showMoreThreat(item.threat,'clickMore')" class="float-r text-info btn-submore" v-if="item.threat.length>5">更多</el-button>
                </h4>
                <div class="info-content">
                  <el-table :data="item.threat.slice(0,5)"  style="width: 100%" class="white-table">
                    <el-table-column  prop="server_ip"  label="服务器地址"></el-table-column>
                    <el-table-column  prop="server_address"  label="服务器地域"></el-table-column>
                    <el-table-column  prop="monitor_domain"  label="监测域名"></el-table-column>
                    <el-table-column  prop="tamped_ip"  label="篡改后地址"></el-table-column>
                    <el-table-column  prop="time"  label="时间"></el-table-column>
                  </el-table>
                </div>
              </div>
              <!--无数据的时候显示-->
              <div class="wrapper-page animated fadeInDown" v-if="!item.threat.length>0">
                <div class="error-page animated flipInX">
                  <img src="/../static/images/cd/console/images/nodate.png" alt="none">
                  <div class="error-page-content">
                    <label class="text-999">安全状态良好，无任何威胁</label>
                  </div>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
          <!--无数据的时候显示-->
          <div class="wrapper-page animated fadeInDown m-h-500" v-if="!domainList.length>0">
            <div class="error-page animated flipInX">
              <img src="/../static/images/cd/console/images/nodate.png" alt="none">
              <div class="error-page-content">
                <p class="text-999">未发现任何域名信息</p>
                <el-button type="text" class="text-primary" @click="dialogAdd=true"><i class="el-icon-plus m-r-8" style="font-weight: bold"></i>添加网站</el-button>
                <p><label class="text-999">联系客服：</label>028-80256073</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  	<!--下载弹框-->
  	<el-dialog title="报告下载" :visible.sync="dialogDown" width="30%" class="dialog-panel">
      <div class="p-l-18">
        <h4>请选择下载类型：</h4>
        <el-radio-group v-model="radiofile" class="down-filetype">
          <el-radio :label="1">Word模板.doc</el-radio>
          <el-radio :label="2">Excel模板.xsls</el-radio>
          <el-radio :label="3">Pdf模板.pdf</el-radio>
        </el-radio-group>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" class="dialog-button-padding">下载</el-button>
        <el-button type="graywhite" class="dialog-button-padding">取消</el-button>
      </div>
  	</el-dialog>

  	<!--监测域名管理弹框-->
    <el-dialog title="监测站点管理" :visible.sync="dialogMonitor" width="36%" class="dialog-panel">
      <div class="dialog-addweb">
        <el-button type="text" class="text-primary" @click="dialogAdd=true"><i class="el-icon-plus m-r-8" style="font-weight: bold"></i>添加网站</el-button>
      </div>
      <el-table :data="monitorDomain"  style="width: 100%" class="white-table m-b-30">
        <el-table-column  prop="domainName"  label="域名名称"></el-table-column>
        <el-table-column  prop="ip"  label="IP地址"></el-table-column>
        <el-table-column   label="操作" width="100">
          <template scope="scope">
            <el-button type="text" size="medium" @click="showUpdateDomain(scope.row)" class="text-parmiry">编辑</el-button>
            <el-button type="text" size="medium" @click="showDelete(scope.row)" class="text-parmiry">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>

  	<!--更多弹框-->
    <div v-if="dialogMore">
  	  <el-dialog title="被篡改" :visible.sync="dialogMore" width="55%" class="dialog-panel">
  			<el-table :data="moreThreat"  style="width: 100%" class="white-table">
  				<el-table-column  prop="server_ip"  label="服务器地址"></el-table-column>
  				<el-table-column  prop="server_address"  label="服务器地域"></el-table-column>
  				<el-table-column  prop="monitor_domain"  label="监测域名" min-width="120" :show-overflow-tooltip="true"></el-table-column>
  				<el-table-column  prop="tamped_ip"  label="篡改后地址" min-width="120" :show-overflow-tooltip="true"></el-table-column>
  				<el-table-column  prop="time"  label="时间" :show-overflow-tooltip="true"></el-table-column>
  		  </el-table>
  			<div class="pagelocation">
  			  <span>每页显示</span>
  			  <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-size="pageSize" :total="total" layout="sizes, prev, pager, next" class="pagination"></el-pagination>
  			</div>
  	  </el-dialog>
    </div>

  	<!--子弹窗：增加域名-->
    <el-dialog title="监测站点管理" :visible.sync="dialogAdd" width="32%" class="dialog-panel">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="dialog-breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">域名列表</el-breadcrumb-item>
        <el-breadcrumb-item>添加域名</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form :model="addDomainForm" ref="addDomainForm" :rules="rules" label-width="60px" label-position="left" class="dialog-from" style="margin-right:8%">
        <el-form-item label="域名名称" prop="domainName">
          <el-input v-model="addDomainForm.domainName" placeholder="请输入域名名称"></el-input>
        </el-form-item>
        <el-form-item label="IP地址" prop="ip">
          <el-input v-model="addDomainForm.ip" placeholder="请输入IP地址"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addDomain" class="dialog-button-padding">保存</el-button>
        <el-button type="graywhite" @click="cancleAdd" class="dialog-button-padding">取消</el-button>
      </div>
    </el-dialog>

    <!--子弹窗：修改域名-->
    <el-dialog title="监测站点管理" :visible.sync="dialogUpdate" width="32%" class="dialog-panel" :before-close="cancleUpdate">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="dialog-breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">域名列表</el-breadcrumb-item>
        <el-breadcrumb-item>修改域名</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form :model="updateDomainForm" ref="updateDomainForm" :rules="rules" label-width="60px" label-position="left" class="dialog-from" style="margin-right:8%">
        <el-form-item label="域名名称" prop="domainName">
          <el-input v-model="updateDomainForm.domainName" placeholder="请输入域名名称"></el-input>
        </el-form-item>
        <el-form-item label="IP地址" prop="ip">
          <el-input v-model="updateDomainForm.ip" placeholder="请输入IP地址"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="updateDomain" class="dialog-button-padding">保存</el-button>
        <el-button type="graywhite" @click="cancleUpdate" class="dialog-button-padding">取消</el-button>
      </div>
    </el-dialog>

    <!--子弹窗：删除确认-->
    <el-dialog title="删除确认" :visible.sync="dialogDelete" width="30%" class="dialog-panel">
      <div class="dialog-delete-content">您是否确定删除网站："<span></span>{{deleteData.domainName}} "?</div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="deleteDoname" class="dialog-button-padding">确定</el-button>
        <el-button type="graywhite" @click="dialogDelete=false" class="dialog-button-padding">取消</el-button>
      </div>
    </el-dialog>

  </div>
</template>

<script type="text/javascript">
  export default{
    data () {
      return {
        //组织id
        orgId:'',
        params:{},
        //显示报告下载
        dialogDown:false,
        //显示检测域名管理
        dialogSilt:false,
        //折叠面板
        activeNames: [],
        activeIndex:[],
        //增加网站
        dialogAdd:false,
        addDomainForm:{
          domainName:'',
          ip:''
        },
        //编辑网站
        dialogUpdate:false,
        updateDomainForm:{
          id:'',
          orgId:'',
          domainName:'',
          ip:''
        },
        //点击显示更多
        dialogMore:false,
        pageIndex:1,
        pageSize:10,
        total:0,
        //选择模板
        radiofile:1,
        //表单校验规则
        rules:{
          //新增的校验
          domainName: [{
            validator:(rule, value, callback)=>{
              if(value==null||value==''){
                callback(new Error('请输入域名'))
              }else if(!/^http:\/\/([a-zA-Z\d][a-zA-Z\d-_]+\.)+[a-zA-Z\d-_][^ ]*$/.test(value)){
                callback(new Error('域名错误,请输入正确的域名'))
              }else {
                this.common.req('/ssa/domain/getMonitorDomain.do',this.params).then(data => {
                  var boolean = true;
                  for(var i=0;i<data.length;i++){
                    if(value == data[i].domainName && this.updateDomainForm.id != data[i].id){
                      boolean = false
                      callback(new Error('域名已经存在,请重新输入'));
                      break;
                    }
                  }
                  if(boolean){
                    callback();
                  }
                });
              }
            }, trigger:'blur' }],
          ip:[{
            validator:(rule, value, callback)=>{
              if(value==null||value==''){
                callback(new Error('请输入ip'))
              }else if(!/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/.test(value)){
                callback(new Error('IP错误,请输入正确的IP'))
              }else {
                this.common.req('/ssa/domain/getMonitorDomain.do',this.params).then(data => {
                  var boolean = true;
                  for(var i=0;i<data.length;i++){
                    if(value == data[i].ip && this.updateDomainForm.id != data[i].id){
                      boolean = false
                      callback(new Error('IP已经存在,请重新输入'));
                      break;
                    }
                  }
                  if(boolean){
                    callback();
                  }
                });
              }
            }, trigger:'blur' }],
        },
        //列表数据
        domainList:[],
        //更多威胁数据
        moreThreat:[],
        allThreat:[],
        //检测域名管理
        dialogMonitor:false,
        //删除域名
        dialogDelete:false,
        deleteData:{},
        //检测站点管理数据
        monitorDomain:[]


      }
    },
    methods: {
      //获取组织参数
      getParams(){
        //获取组织id
        this.orgId = 27;
        //设置全局参数
        this.params = {
          orgId:this.orgId
        }
      },
      //折叠面板方法
      handleChange(val) {
      },
      //获取列表数据
      getDomainList(){
        this.common.req('/ssa/domain/getDomainList.do',this.params).then(data => {
          this.domainList = data;
        });
      },
      //取消编辑
      cancleUpdate(){
        this.dialogUpdate = false;
        this.updateDomainForm = {domainName:'',ip:''};
        //清除验证
        this.$refs['updateDomainForm'].clearValidate();
        this.getMonitorDomain();
      },
      //取消增加网站
      cancleAdd(){
        this.dialogAdd = false;
        this.addDomainForm = {domainName:'',ip:''};
        //清除验证
        this.$refs['addDomainForm'].clearValidate();
        this.getMonitorDomain();
      },
      //增加网站
      addDomain(){
        this.$refs['addDomainForm'].validate((valid) => {
          if (valid) {
            var params = {
              orgId:this.orgId,
              ...this.addDomainForm
            }
            console.log(params);
            this.common.req('/ssa/domain/addDomain.do',params).then(data => {
              this.$message({
                type: 'success',
                message: '新增成功!'
              });
            })
            //清理表单内容
            this.cancleAdd();
            //重新获取数据
            this.getMonitorDomain();
          } else {
            console.log('输入错误了');
          }
        })
      },
      //切换一页显示的内容
      handleSizeChange(pageSize){
        this.pageSize = pageSize;
        this.pageIndex = 1;
        this.showMoreThreat(null);
      },
      //换页
      handleCurrentChange(pageIndex){
        this.pageIndex = pageIndex;
        this.showMoreThreat(null);
      },
      //显示'更多'威胁数据
      showMoreThreat(val,clickMore){
        if(clickMore == 'clickMore'){
          this.pageIndex = 1;
        }
        if(val!=null){
          this.total = val.length;
          this.allThreat = val;
        }
        this.moreThreat = this.allThreat.slice((this.pageIndex-1)*this.pageSize,this.pageIndex*this.pageSize);
        this.dialogMore = true;
      },
      //获取检测域名数据
      getMonitorDomain(val){
        this.dialogMonitor = true;
        this.common.req("/ssa/domain/getMonitorDomain.do",this.params).then(data => {
          this.monitorDomain = data;
        })
      },
      //显示确认删除
      showDelete(val){
        this.dialogDelete = true;
        this.deleteData = val;
      },
      //删除域名
      deleteDoname(){
        this.common.req('/ssa/domain/deleteDomain.do',this.deleteData).then(data => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
          this.getMonitorDomain();
        })
        //重新获取数据
        this.getDomainList();
        this.dialogDelete = false;
      },
      //显示编辑
      showUpdateDomain(row){
        this.updateDomainForm = {...row};
        this.dialogUpdate = true;
      },
      //保存编辑
      updateDomain(){
        this.$refs['updateDomainForm'].validate((valid) => {
          if (valid) {
            this.common.req('/ssa/domain/updateDomain.do',this.updateDomainForm).then(data => {
              this.$message({
                type: 'success',
                message: '更新成功!'
              });
              this.getMonitorDomain();
              this.dialogUpdate = false;
            })
          }else{
            console.log('输入错误了');
          }
        })
      },


    },
    mounted: function() {
      this.getDomainList();
    },
    created:function() {
      this.getParams();
    }

  }
</script>
