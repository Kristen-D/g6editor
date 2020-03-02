<!--安全设备列表-->
<template>
  <div>
    <el-collapse class="custom-collapse" v-model="activeNames">
      <el-collapse-item name="3">
        <template slot="title">
          <div class="el-collapse-heading">
            <h4 class="el-panel-title2">安全服务列表</h4>
          </div>
        </template>
        <el-table :data="securityDevice">
          <el-table-column label="设备名称" align="center">
            <template slot-scope="scope">{{ scope.row.resourceName }}</template>
          </el-table-column>
          <el-table-column label="设备类型" align="center">
            <template slot-scope="scope">{{ convertType(scope.row.resourceType) }}</template>
          </el-table-column>
          <el-table-column label="设备网络地址" align="center">
            <template slot-scope="scope">{{ scope.row.ip }}</template>
          </el-table-column>
          <el-table-column label="创建时间" align="center">
            <template slot-scope="scope">{{ dateTimeFormat(scope.row.createTime) }}</template>
          </el-table-column>
          <el-table-column label="设备创建人" align="center">
            <template slot-scope="scope">{{ scope.row.createrId }}</template>
          </el-table-column>
        </el-table>
      </el-collapse-item>
    </el-collapse>
  </div>

</template>

<script>
    import {TimeFormat} from 'static/sdsec/js/sdsec/myCommonMethods'

    export default {
        data() {
            return {
                activeNames : ["3"],
                securityDevice: []
            }
        },
        methods: {
            dateTimeFormat(time){
                return TimeFormat(time);
            },
            convertType(type) {
                if ("firewall" == type) {
                    return "防火墙";
                } else if ("WAF" == type) {
                    return "web应用防火墙";
                } else {
                    return type;
                }
            },
        },
        created: async function () {
            let params={
                "orderBy": ["create_time"],
                "orderType": "desc",
                "pageSize": 10,
                "pageIndex": 1
            };
            var pageQuerySecDeviceResult = await this.utils.reqObjBackState('/sdsec/web/securitypool/securityservice/pageQuery', params);
            if (!pageQuerySecDeviceResult.resultCode) return;
            this.securityDevice = pageQuerySecDeviceResult.data;
        },
        watch: {
            securityDevice: function (oldVal, curVal) {
                console.log(curVal)
            }
        }
    }
</script>

<style scoped>

</style>
