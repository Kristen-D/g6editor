<!--资源池详情-基本信息页-->
<template>
  <div class="el-panel">

    <div class="el-panel-body">
<!--      <div class="fix-bottom-button">-->
<!--        <el-button type="gray"  size="medium" @click="goBack">返回</el-button>-->
<!--      </div>-->

      <div style="margin:20px;">
        <div class="el-subpanel-heading  no-bottom">
          <h4 class="el-subpanel-title">资源池详情</h4>
        </div>

        <table class="info-table m-10-5" inside border="1" :model="resourcePoolBase">
          <tr>
            <th>资源池名称</th><td>{{resourcePoolBase.name}}</td>
            <th>资源池类型</th><td>{{typeStateFmt(resourcePoolBase.poolType)}}</td>
            <th>状态</th><td>{{recStateFmt(resourcePoolBase.poolStatus)}}</td>
          </tr>
          <tr>
            <th>厂商</th><td>{{resourcePoolBase.poolSupplier}}</td>
            <th>管理IP</th><td> {{resourcePoolBase.ipAddr}}</td>
            <th>管理URL</th><td> {{resourcePoolBase.ipAddr}}</td>
          </tr>
          <tr>
            <th>创建时间</th><td>{{dateTimeFormat(resourcePoolBase.createTime)}}</td>
            <th>更新时间</th><td colspan="3"> {{dateTimeFormat(resourcePoolBase.updateTime)}}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>
</template>


<!--<template>-->
<!--  <div>-->
<!--    <el-collapse class="custom-collapse" v-model="activeNames">-->
<!--    <el-collapse-item name="1">-->
<!--      <template slot="title">-->
<!--        <div class="el-collapse-heading">-->
<!--          <h4 class="el-panel-title2">基本属性</h4>-->
<!--        </div>-->
<!--      </template>-->
<!--      <div class="el-panel-body" id="detail">-->
<!--        <el-form :model="resourcePoolBase" label-width="120px" label-position="right" class="flexStart custom-form">-->
<!--          <el-form-item label="资源池名称：" prop="name">-->
<!--            <label>{{resourcePoolBase.name}}</label>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="资源池类型：">-->
<!--            <label v-if="resourcePoolBase.poolType =='physical'">物理资源池</label>-->
<!--            <label v-if="resourcePoolBase.poolType =='virtual'">虚拟资源池</label>-->
<!--          </el-form-item>-->
<!--          <el-form-item label = "厂商：">-->
<!--            <label>{{resourcePoolBase.poolSupplier}}</label>-->
<!--          </el-form-item>-->
<!--          <el-form-item label = "型号：" >-->
<!--            <label>{{resourcePoolBase.secDevModel}}</label>-->
<!--          </el-form-item>-->
<!--          <el-form-item label = "软件版本：">-->
<!--            <label>{{resourcePoolBase.swVersion}}</label>-->
<!--          </el-form-item>-->
<!--          <el-form-item label = "管理IP：">-->
<!--            <label>{{resourcePoolBase.ipAddr}}</label>-->
<!--          </el-form-item>-->
<!--          <el-form-item label = "管理账号：">-->
<!--            <label>{{resourcePoolBase.sdnAccount}}</label>-->
<!--          </el-form-item>-->
<!--          <el-form-item label = "密码：">-->
<!--            <label>{{resourcePoolBase.sdnPassword}}</label>-->
<!--          </el-form-item>-->
<!--          <el-form-item label = "云平台管理URL：">-->
<!--            <label>{{resourcePoolBase.cloudUrl}}</label>-->
<!--          </el-form-item>-->
<!--          <el-form-item label = "云平台accessKey：">-->
<!--            <label>{{resourcePoolBase.cloudAccessKey}}</label>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="状态：">-->
<!--            <label v-if="resourcePoolBase.poolStatus =='synchronized'">已同步</label>-->
<!--            <label v-if="resourcePoolBase.poolStatus =='Unsynchronized'">未同步</label>-->
<!--          </el-form-item>-->
<!--        </el-form>-->
<!--        <el-form  label-width="120px" label-position="right" >-->
<!--        </el-form>-->
<!--      </div>-->
<!--    </el-collapse-item>-->
<!--    </el-collapse>-->
<!--  </div>-->
<!--</template>-->

<script>
    import {TimeFormat} from 'static/sdsec/js/sdsec/myCommonMethods'

    export default {
      props : ["detail"],
      data(){
          return {
              id: this.$route.params.id,
              // activeNames : ["1","2","3"],
              activeNames : ["1"],
              resourcePoolBase:{},
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
                      str = '物理资源池';
                  } else if (poolType == 'virtual') {
                      str = '虚拟资源池';
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
          var resourcePoolBase = await this.utils.reqObjBackState('/sdsec/web/respool/resourcepool/get',{'id' : this.id});
          this.resourcePoolBase = resourcePoolBase.data;
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
