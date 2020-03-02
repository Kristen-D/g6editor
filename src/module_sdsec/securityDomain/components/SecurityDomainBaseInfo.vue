<!--安全域详情页---暂无-->
<template>
  <div class="el-panel">

    <div class="el-panel-body">
<!--      <div class="fix-bottom-button">-->
<!--        <el-button type="gray"  size="medium" @click="goBack">返回</el-button>-->
<!--      </div>-->

      <div style="margin:20px;">
        <div class="el-subpanel-heading  no-bottom">
          <h4 class="el-subpanel-title">安全域详情</h4>
        </div>

        <table class="info-table m-10-5" inside border="1" :model="securityDomainBase">
          <tr>
            <th>安全域名称</th><td>{{securityDomainBase.name}}</td>
            <th>安全域类型</th><td>{{typeStateFmt(securityDomainBase.poolType)}}</td>
            <th>状态</th><td>{{recStateFmt(securityDomainBase.poolStatus)}}</td>
          </tr>
          <tr>
            <th>厂商</th><td>{{securityDomainBase.poolSupplier}}</td>
            <th>管理IP</th><td> {{securityDomainBase.ipAddr}}</td>
            <th>管理URL</th><td> {{securityDomainBase.ipAddr}}</td>
          </tr>
          <tr>
            <th>创建时间</th><td>{{dateTimeFormat(securityDomainBase.createTime)}}</td>
            <th>更新时间</th><td colspan="3"> {{dateTimeFormat(securityDomainBase.updateTime)}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
    import {TimeFormat} from 'static/sdsec/js/sdsec/myCommonMethods'

    export default {
      props : ["detail"],
      data(){
          return {
              id: this.$route.params.id,
              // activeNames : ["1","2","3"],
              activeNames : ["1"],
              securityDomainBase:{},
              // fileList : [],
          }
  },
      methods:{
          dateTimeFormat(time){
              return TimeFormat(time);
          },
          typeStateFmt: function (poolType) {
              var str = '';
              if (poolType) {
                  if (poolType == 'physical') {
                      str = '物理安全域';
                  } else if (poolType == 'virtual') {
                      str = '虚拟安全域';
                  }
              }
              return str;
          },
          recStateFmt: function (poolStatus) {
              var str = '';
              if (poolStatus) {
                  if (poolStatus == 'Unsynchronized') {
                      str = '未同步';
                  } else if (poolStatus == 'synchronized') {
                      str = '已同步';
                  }
              }
              return str;
          },
      },
      created:async function() {
          var securityDomainBase = await this.utils.reqObjBackState('/sdsec/web/respool/resourcepool/get',{'id' : this.id});
          this.securityDomainBase = securityDomainBase.data;
      },

    }
</script>

<style>
  .el-collapse-heading{padding: 0 15px;}
  .el-collapse-heading h4{display: inline-block;}
  .el-collapse-heading label{padding-left: 5px;color:#999;font-size: 12px;line-height: 14px;}
  .el-collapse-heading label span{color:#f00;padding-right: 3px;}
  .custom-inputwidth{width: 16.48% !important}
  .custom-width{width: 70%;}
  .addbutton{padding-right: 20px !important;line-height: 40px;}

  .custom-collapse.el-collapse{border-top: none;}
  .custom-collapse .el-collapse-item__header, .custom-collapse .el-collapse-item__wrap{border-bottom: none;}
  .custom-collapse .el-collapse-item__content{padding-bottom: 0;}
  .custom-collapse .el-collapse-item.is-active .el-collapse-item__header{border-bottom: 1px solid #ebeef5;}
  .custom-form.el-form .el-form-item{width: calc(100%/3);}
  .custom-form{flex-wrap: wrap;}
  #detail  .el-form-item__label{ float: left; }
  #attrDiv  .el-form-item__label{ float: left; }

</style>
