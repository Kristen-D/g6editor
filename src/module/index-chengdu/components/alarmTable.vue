<template>
  <div class="container-fluid">
    <el-breadcrumb separator-class="el-icon-arrow-right" class="top-breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">控制台</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>告警信息</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="el-panel">
      <div class="el-panel-heading">
      	<h3 class="el-panel-title">告警信息</h3>
      </div>
      <div class="el-panel-body">
        <div class="search-form">
      		 <!--普通搜索-->
      		 <div class="ordinary-search" v-show="!isMoreSearch">
      			 <el-form :inline="true" :model="searchParams" class="demo-form-inline setfrom">
                <el-form-item>
                  <el-select v-model="searchParams.alarm_type" placeholder="告警类型"  size="mini" clearable>
                    <el-option v-for="item in AlarmType" :label="item.name" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
      				  <el-form-item>
                  <el-button type="primary" size="mini" @click="getThreatWarningData(true)">搜索</el-button>
                </el-form-item>
      			 </el-form>
      			<el-button type="text" id="search-tag1" @click="isMoreSearch=true" class="btn-search text-info"><i class="imgicon search-icon"></i>高级搜索</el-button>
      		 </div>
      		 <!--高级搜索-->
      		 <div class="senior-search" v-show="isMoreSearch">
              <el-form :inline="true" :model="searchParams" class="demo-form-inline setfrom" >
                <el-form-item label="告警类型">
                  <el-select v-model="searchParams.alarm_type" placeholder="所有类型"  size="mini" clearable>
                    <el-option v-for="item in AlarmType" :label="item.name" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="告警等级">
                  <el-select v-model="searchParams.alarm_grade" placeholder="所有等级"  size="mini" clearable>
                    <el-option v-for="item in AlarmGrade" :label="item.name" :value="item.value"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="告警详情">
                   <el-input v-model="searchParams.alarm_desc" placeholder="所有详情" size="mini"></el-input>
                </el-form-item>
      				  <el-form-item label="发布时间">
                  <el-date-picker
                    v-model="searchParams.alarm_time"
                    @change="setTime"
                    value-format="yyyy-MM-dd hh:mm:ss"
                    type="datetimerange"
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    size="mini">
                  </el-date-picker>
      				  </el-form-item>
                <el-form-item label="源IP">
                   <el-input v-model="searchParams.src_ip" placeholder="所有IP" size="mini"></el-input>
                </el-form-item>
                <el-form-item label="目标IP">
                   <el-input v-model="searchParams.dst_ip" placeholder="所有IP" size="mini"></el-input>
                </el-form-item>
      				  <el-form-item>
      					  <el-button type="primary" size="mini" @click="getThreatWarningData(true)">搜索</el-button>
      				  </el-form-item>
      			 </el-form>
      			 <el-button type="text" size="medium" id="search-tag2" @click="showLessSearch" class="btn-search text-info"><i class="imgicon search-icon2"></i>普通搜索</el-button>
      		</div>
        </div>
        <div class="" style="height: 50px; line-height: 50px;">
      		<label class="el-panel-subtitle f-bold">告警列表</label>
        </div>
        <div :class="{hidden:!isData}">
          <el-table :data="AlarmTable" style="width: 100%">
            <el-table-column prop="alarm_type_name"  label="告警类型" min-width="80" align="center">
            </el-table-column>
            <el-table-column prop="alarm_grade_name" label="告警等级" min-width="80"  align="center">
            </el-table-column>
            <el-table-column prop="alarm_desc"  label="告警详情" min-width="80"  align="center">
            </el-table-column>
            <el-table-column prop="alarm_time"  label="告警时间" min-width="80" show-overflow-tooltip  align="center">
            </el-table-column>
            <el-table-column prop="src_ip"  label="源IP" min-width="80" show-overflow-tooltip  align="center">
            </el-table-column>
            <el-table-column prop="dst_ip"  label="目标IP" min-width="80" show-overflow-tooltip  align="center">
            </el-table-column>
            <el-table-column prop="status"  label="操作" min-width="80"  align="center">
              <template scope="scope">
                <label>
                  <el-button type="text"  @click="getAlarmDetail(scope.row)" style="color:#00a0fe;">查看</el-button>
                </label>
              </template>
            </el-table-column>
          </el-table>
          <div class="pagelocation">
            <span>每页显示</span>
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-size="pageSize" :total="total" layout="sizes, prev, pager, next" class="pagination"></el-pagination>
          </div>
        </div>
        <!--表格无数据时显示-->
        <div class="wrapper-page animated fadeInDown" :class="{hidden:isData}">
          <div class="error-page animated flipInX">
            <img src="/../static/images/cd/console/images/nodate.png" alt="none">
            <div class="error-page-content">
              <label class="text-999">安全状态良好，无任何攻击</label>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 子弹窗：-->
    <el-dialog title="攻击事件详情" :visible.sync="isDetail" width="50%" class="dialog-panel">
      <table class="dialog-table m-b-30" width="100%">
        <tbody>
          <tr>
            <td>告警id：</td>
            <td>{{AlarmDetail.alarm_id}}</td>
          </tr>
          <tr>
            <td>告警类型：</td>
            <td>{{AlarmDetail.alarm_type_name}}</td>
          </tr>
          <tr>
            <td>告警等级：</td>
            <td>{{AlarmDetail.alarm_grade_name}}</td>
          </tr>
          <tr>
            <td>告警详情：</td>
            <td>{{AlarmDetail.alarm_desc}}</td>
          </tr>
          <tr>
            <td>告警时间：</td>
            <td>{{AlarmDetail.alarm_time}}</td>
          </tr>
          <tr>
            <td>源IP：</td>
            <td>{{AlarmDetail.src_ip}}</td>
          </tr>
          <tr>
            <td>目标IP：</td>
            <td>{{AlarmDetail.dst_ip}}</td>
          </tr>
        </tbody>
      </table>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
    export default{
      data () {
        return {
          //组织id
          orgId:'',
          //告警类型
          AlarmType:[],
          //告警等级
          AlarmGrade:[],
          //显示高级搜索
          isMoreSearch:false,
          //搜索参数
          searchParams:{
            alarm_type:'',
            alarm_grade:'',
            alarm_desc:'',
            alarm_time:'',
            alarm_time_first:'',
            alarm_time_second:'',
            src_ip:'',
            dst_ip:''
          },
          //表格数据
          AlarmTable:[],
          //是否存在表格数据
          isData:true,
          //翻页参数
          pageIndex:1,
          pageSize:10,
          total:0,
          //是否显示详情页面
          isDetail:false,
          AlarmDetail:{},

        }
      },
      methods: {
        //获取组织参数
        getParams(){
          //获取组织id
          // this.orgId = this.$route.params.orgId;
          this.orgId =27;
        },
        //获取全部告警类型
        getAllAlarmType(){
          this.common.req("/ssa/index/getAllAlarmType.do",null).then(data => {
            this.AlarmType = data;
          })
        },
        //获取全部告警等级
        getAllAlarmGrade(){
          this.common.req("/ssa/index/getAllAlarmGrade.do",null).then(data => {
            this.AlarmGrade = data;
          })
        },
        //获取表格数据
        getThreatWarningData(isSearch){
          if(isSearch){
            this.pageIndex = 1;
          }
          var params = {
            ...this.searchParams,
            orgId:this.orgId,
            pageSize: this.pageSize,
            pageIndex: this.pageIndex
          };
          this.common.req("/ssa/index/getThreatWarningData.do",params).then(data => {
            if(data.rowData.length>0){
              this.AlarmTable = data.rowData;
              this.total = data.total;
              this.isData = true;
            }else{
              this.isData = false;
            }
          });
        },
        //换一页显示的数据量
        handleSizeChange(pageSize){
          this.pageSize = pageSize;
          this.getThreatWarningData();
        },
        //换页
        handleCurrentChange(pageIndex){
          this.pageIndex = pageIndex;
          this.getThreatWarningData();
        },
        //更改时间格式
        setTime(val){
          if(val!=null){
            this.searchParams.alarm_time_first = val[0];
            this.searchParams.alarm_time_second = val[1];
          }else{
            this.searchParams.alarm_time_first = null;
            this.searchParams.alarm_time_second = null;
          }
        },
        //获取告警详细数据
        getAlarmDetail(row){
          var params = {
            alarm_id:row.alarm_id
          }
          this.common.req("/ssa/index/getAlarmDetail.do",params).then(data => {
            this.AlarmDetail = data[0];
          })
          this.isDetail = true;
          // this.$router.push({
          //   name:'detail',
          //   params:{
          //     alarm_id:row.alarm_id
          //   }
          // })
        },
        //显示较少的搜索项
        showLessSearch(){
          this.isMoreSearch = false;
          this.searchParams.alarm_grade = '';
          this.searchParams.alarm_desc = '';
          this.searchParams.alarm_time = '';
          this.searchParams.alarm_time_first = '';
          this.searchParams.alarm_time_second = '';
          this.searchParams.src_ip = '';
          this.searchParams.dst_ip = '';
        },


      },
      mounted: function() {
        this.getAllAlarmType();
        this.getAllAlarmGrade();
        this.getThreatWarningData();
      },
      created:function() {
        this.getParams();
      }

    }
</script>
