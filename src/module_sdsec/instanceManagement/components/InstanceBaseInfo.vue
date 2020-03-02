<template>
  <div>
    <el-collapse class="custom-collapse" v-model="activeNames">
<!--    <el-collapse-item name="1">-->
<!--      <template slot="title">-->
<!--        <div class="el-collapse-heading">-->
<!--          <h4 class="el-panel-title2">概览</h4>-->
<!--        </div>-->
<!--      </template>-->
      <div class="el-panel-body" id="detail">
        <el-form :model="instanceBase" label-width="150px" label-position="right" class="flexStart custom-form">
          <el-form-item label="名称：" prop="name">
            <label>{{instanceBase.name}}</label>
          </el-form-item>

<!--          <el-form-item label = "分配策略：">-->
<!--            <label>{{instanceBase.allocatorStrategy}}</label>-->
<!--          </el-form-item>-->

          <el-form-item label = "创建者：">
            <label>{{instanceBase.createrId}}</label>
          </el-form-item>
          <el-form-item label = "更新者：">
            <label>{{instanceBase.updaterId}}</label>
          </el-form-item>

          <el-form-item label = "创建时间：">
            <label>{{dateTimeFormat(instanceBase.createTime)}}</label>
          </el-form-item>
          <el-form-item label = "更新时间：">
            <label>{{dateTimeFormat(instanceBase.updateTime)}}</label>
          </el-form-item>
          <el-form-item label = "同步时间：">
            <label>{{dateTimeFormat(instanceBase.syncTime)}}</label>
          </el-form-item>

        </el-form>
      </div>
<!--    </el-collapse-item>-->
    </el-collapse>

    <el-collapse class="custom-collapse" v-model="activeNames">
      <el-collapse-item name="1">
        <template slot="title">
          <div class="el-collapse-heading">
            <h4 class="el-panel-title2">更多信息</h4>
          </div>
        </template>
        <div class="el-panel-body" id="moreDetail">
          <el-form :model="instanceInfo" label-width="150px" label-position="right" class="flexStart custom-form">
            <el-form-item label="平台：" prop="platform">
              <label>{{instanceBase.platform}}</label>
            </el-form-item>
            <el-form-item label="虚拟化类型：">
              <label>{{instanceBase.hypervisorType}}</label>
            </el-form-item>
            <el-form-item label="云主机类型：">
              <label v-if="instanceBase.type =='UserVm'">UserVm</label>
              <label v-if="instanceBase.type =='ApplianceVm'">ApplianceVm</label>
            </el-form-item>
            <el-form-item label = "CPU核心数量：">
              <label>{{instanceBase.cpuNum}}</label>
            </el-form-item>
            <el-form-item label = "cpu运算速度：">
              <label>{{instanceBase.cpuSpeed}}</label>
            </el-form-item>
            <el-form-item label = "内存容量：" >
              <label>{{sizeFormat(instanceBase.memorySize)}}</label>
            </el-form-item>
            <el-form-item label="状态：">
              <label v-if="instanceBase.status =='Deploying'">部署中</label>
              <label v-if="instanceBase.status =='Deployed-success'">部署成功</label>
              <label v-if="instanceBase.status =='Deployed-fail'">部署失败</label>
              <label v-if="instanceBase.status =='Delete-fail'">删除失败</label>
              <label v-if="instanceBase.status =='Additional-recording'">补录</label>
            </el-form-item>
            <el-form-item label = "计算机规格：" prop="instanceOfferingUuid">
              <label>{{instanceInfo.instanceOfferingUuid}}</label>
            </el-form-item>
            <el-form-item label="镜像：" prop="imageId">
              <label>{{instanceInfo.imageId}}</label>
            </el-form-item>
            <el-form-item label="所在物理机：" prop="hostUuid">
              <label>{{instanceInfo.hostUuid}}</label>
            </el-form-item>
<!--            <el-form-item label = "上次运行的物理机：" prop="lasthostUuid">-->
<!--              <label>{{instanceInfo.lasthostUuid}}</label>-->
<!--            </el-form-item>-->
            <el-form-item label="集群：" prop="clusterUuid">
              <label>{{instanceInfo.clusterUuid}}</label>
            </el-form-item>
            <el-form-item label = "描述：">
              <label>{{instanceBase.description}}</label>
            </el-form-item>
            <el-form-item label="网卡：" prop="uuid">
              <label>{{instanceInfo.uuid}}</label>
<!--              <i class="el-icon-view"></i>-->
              <el-popover
                placement="right"
                trigger="click">
                <el-table :data="uuidData">
                  <el-table-column property="uuid" label="uuid"></el-table-column>
                  <el-table-column property="mac" label="mac地址"></el-table-column>
                  <el-table-column property="ip" label="IP"></el-table-column>
                </el-table>
                <i  slot="reference" class="el-icon-view"></i>
              </el-popover>
            </el-form-item>
<!--            <el-form-item label="区域：" prop="zoneUuid">-->
<!--              <label>{{instanceInfo.zoneUuid}}</label>-->
<!--            </el-form-item>-->
<!--            <el-form-item label = "根云盘：" prop="rootColumwUuid">-->
<!--              <label>{{instanceInfo.memorySize}}</label>-->
<!--            </el-form-item>-->

<!--            <el-form-item label = "网卡信息：">-->
<!--              <label>{{instanceBase.syncTime}}</label>-->
<!--            </el-form-item>-->

          </el-form>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
    import {TimeFormat} from 'static/sdsec/js/sdsec/myCommonMethods'

    export default {
      props : ["detail","moreDetail"],
      data(){
          return {
              id: this.$route.params.id,
              // activeNames : ["1","2","3"],
              activeNames : ["1"],
              instanceBase:{},
              instanceInfo:{},
              uuidData:[],
              // fileList : [],
          }
  },
      methods:{
          dateTimeFormat(time){
              return TimeFormat(time);
          },
          sizeFormat:function(byte){
              var size = "";
              size = (byte/(1024 * 1024 * 1024)).toFixed(2) + "GB";
              return size;
          },
      },
      created:async function() {
          var instanceBase = await this.utils.reqObjBackState('/sdsec/web/respool/instance/get',{'id' : this.id});
          this.instanceBase = instanceBase.data;
      }
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
  #moreDetail  .el-form-item__label{ float: left; }
  #attrDiv  .el-form-item__label{ float: left; }

</style>
