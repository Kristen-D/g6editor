<!--任务管理详情-->
<template>
  <div class="el-panel">
    <div class="el-panel-body">
      <div class="fix-bottom-button">
        <el-button type ="gray" size="medium" @click="goBack">返回</el-button>
      </div>

      <div style="margin:20px;">
        <div class="el-subpanel-heading  no-bottom">
          <h4 class="el-subpanel-title">任务详情</h4>
        </div>
        <table class="info-table m-10-5" inside border="1" :model="traceJobInfo">
          <tr>
<!--            <th>任务编号</th><td>{{traceJobInfo.jobId}}</td>-->
            <th>任务行为</th><td>{{traceJobInfo.jobAction}}</td>
<!--            <th>任务类型</th><td>{{typeFmt(traceJobInfo.type)}}</td>-->
            <th>任务状态</th><td>{{statusFmt(traceJobInfo.status)}}</td>
          </tr>
          <tr>
<!--            <th>子任务数</th><td> {{traceJobInfo.subJobCount}}</td>-->
            <th>开始时间</th><td>{{dateTimeFormat(traceJobInfo.startTime)}}</td>
            <th>完成时间</th><td >{{dateTimeFormat(traceJobInfo.finishTime)}}</td>
<!--            <th>错误信息</th><td>{{traceJobInfo.errorMsg}}</td>-->
          </tr>
        </table>
      </div>


      <div style="margin:20px;">
        <div class="el-subpanel-heading  no-bottom">
          <h4 class="el-subpanel-title">子任务详情</h4>
        </div>
        <table class="info-table m-10-5" inside border="1" :model="subJobInfo">
          <tr>
<!--            <th>任务编号</th>-->
<!--            <th>任务总线id</th><th>父任务id</th>-->
            <th>任务行为</th><th>任务状态</th>
<!--            <th>错误信息</th>-->
            <th>开始时间</th><th>完成时间</th>
          </tr>
          <tr  v-for="(row,index) in subJobInfo">
<!--            <td>{{ row.jobId }}</td>-->
<!--            <td>{{row.traceId}}</td>-->
<!--            <td>{{row.parentId}}</td>-->
            <td>{{row.jobAction}}</td>
            <td>{{subStatusFmt(row.status)}}</td>
<!--            <td>{{row.errorMsg}}</td>-->
            <td>{{ dateTimeFormat(row.startTime) }}</td>
            <td>{{ dateTimeFormat(row.finishTime) }}</td>
          </tr>

        </table>
      </div>
    </div>
  </div>
</template>

<script>
    import {TimeFormat,traceJobStatusFormat,subJobStatusFormat, jobTypeFormat} from 'static/sdsec/js/sdsec/myCommonMethods'

    export default {
      props : ["detail"],
      data(){
          return {
              id: this.$route.params.id,
              subJobInfo:{},
              traceJobInfo:{},
          }
  },
      methods:{
          dateTimeFormat(time){
              return TimeFormat(time);
          },
          statusFmt(status){
              return traceJobStatusFormat(status);
          },
          subStatusFmt(status){
              return subJobStatusFormat(status);
          },
          typeFmt: function (type) {
              return  jobTypeFormat(type);
          },

          goBack : function(){
              this.$router.go(-1);
          }

      },
      created:async function() {
          // 任务信息
          let traceJobInfo = await this.utils.reqObjBackState('/sdsec/web/pub/job/get', {'id':this.id})
          this.traceJobInfo = traceJobInfo.data;
          console.log('this.id',this.id)
          console.log('this.traceJobInfo', this.traceJobInfo)
          //子任务信息
          let params= {
              "filters": {
                  "traceId": "dfacf107-09c5-4da2-b5f8-598591c828a9"
              }
          };
          let subJobInfo = await this.utils.reqObjBackState('/sdsec/web/pub/job/querySubJobs', params);
          this.subJobInfo = subJobInfo.data;
          console.log('this.traceJobInfo.traceId',this.traceJobInfo.traceId)
          console.log('this.subJobInfo',this.subJobInfo)
      },

    }
</script>

<style>
  .custom-inputwidth{width: 16.48% !important}
  .custom-width{width: 70%;}
  .addbutton{padding-right: 20px !important;line-height: 40px;}

  .custom-form.el-form .el-form-item{width: calc(100%/3);}
  .custom-form{flex-wrap: wrap;}
  #detail  .el-form-item__label{ float: left; }
  #attrDiv  .el-form-item__label{ float: left; }

</style>
