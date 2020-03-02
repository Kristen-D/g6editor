<template>
  <div>
    <el-collapse class="custom-collapse" v-model="activeNames">
    <el-collapse-item name="1">
      <template slot="title">
        <div class="el-collapse-heading">
          <h4 class="el-panel-title2">基本属性</h4>
        </div>
      </template>
      <div class="el-panel-body" id="detail">
        <el-form :model="imageBase" label-width="120px" label-position="right" class="flexStart custom-form">
          <el-form-item label="名称：" prop="name">
            <label>{{imageBase.name}}</label>
          </el-form-item>
          <el-form-item label="描述：" prop="description">
            <label>{{imageBase.description}}</label>
          </el-form-item>
          <el-form-item label="启用状态：">
            <label v-if="imageBase.state =='Enabled'">已启用</label>
            <!--            <label v-if="imageBase.state =='Unsynchronized'">未启用</label>-->
          </el-form-item>
          <el-form-item label="就绪状态：">
            <label v-if="imageBase.status =='Ready'">已就绪</label>
            <!--            <label v-if="imageBase.status =='Unsynchronized'">未就绪</label>-->
          </el-form-item>
          <el-form-item label="容量：" prop="size">
            <label>{{sizeFormat(imageBase.size)}}</label>
          </el-form-item>
          <el-form-item label="真实容量：" prop="actualSize">
            <label>{{sizeFormat(imageBase.actualSize)}}</label>
          </el-form-item>
          <el-form-item label="镜像格式：" prop="format">
            <label>{{imageBase.format}}</label>
          </el-form-item>
          <el-form-item label = "平台：" prop="plateform">
            <label>{{imageBase.plateform}}</label>
          </el-form-item>
          <el-form-item label = "创建时间：" prop="createTime">
            <label>{{dateTimeFormat(imageBase.createTime)}}</label>
          </el-form-item>
          <el-form-item label = "更新时间：" prop="updateTime">
            <label>{{dateTimeFormat(imageBase.updateTime)}}</label>
          </el-form-item>
          <el-form-item label = "同步时间：" prop="syncTime">
            <label>{{dateTimeFormat(imageBase.syncTime)}}</label>
          </el-form-item>
        </el-form>
        <el-form  label-width="120px" label-position="right" >
        </el-form>
      </div>
    </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
    import {TimeFormat} from 'static/sdsec/js/sdsec/myCommonMethods'

    export default {
      props : ["detail"],
      data(){
          return {
              id: this.$route.params.id,
              activeNames : ["1"],
              imageBase:{},
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
          var imageBase = await this.utils.reqObjBackState('/sdsec/web/respool/image/get',{'id' : this.id});
          this.imageBase = imageBase.data;
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
  #attrDiv  .el-form-item__label{ float: left; }

</style>
