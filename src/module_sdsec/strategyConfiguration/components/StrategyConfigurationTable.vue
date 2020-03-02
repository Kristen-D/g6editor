<template>
  <div>
    <div class = "el-panel-heading flexBetween">
      <label class = "el-panel-title">安全服务列表</label>
      <div>
        <el-button size="small" @click="refreshTable" style="background-color:#EDF1F5;size: 30px"><i class="el-icon-refresh" style="color:#007BE8"></i></el-button>
<!--        <el-button type = "primary" size = "small" plain @click = "addResource">创建</el-button>-->
<!--        <el-button type = "primary" size = "small" plain @click = "deleteResourceBatch">删除</el-button>-->
      </div>
    </div>
<!--表格布局-->
    <el-table :id="tableId" :data="tableConf.tableData" v-loading="tableConf.load"
                element-loading-spinner="el-icon-loading" stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column label="名称" align="center" prop="name"></el-table-column>
      <el-table-column label="类型" align="center">
        <template slot-scope="scope">
          <div v-for="(item, index) in scope.row.types">
                      {{ convertType(item)}}
          </div>
        </template>
      </el-table-column>
      <el-table-column label="状态" align="center" prop="status">
        <template slot-scope="scope">{{ statusFmt(scope.row.status) }}</template>
      </el-table-column>
<!--      <el-table-column label="设备网络地址" align="center" prop="ip"></el-table-column>-->
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">{{ dateTimeFormat(scope.row.createTime) }}</template>
      </el-table-column>
      <el-table-column label="更新时间" align="center">
        <template slot-scope="scope">{{ dateTimeFormat(scope.row.updateTime) }}</template>
      </el-table-column>
<!--      <el-table-column label="设备创建人" align="center" prop="createrId">-->
<!--      </el-table-column>-->
<!--      <el-table-column label="配置" align="center">-->
<!--        <template scope="scope">-->
<!--          <span  class="fa fa-gear" style="font-size: 24px" @click=configureTheStrategy(scope.row.resourceId)></span>-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="操作" align="center">
        <template scope="scope">
          <el-button type="text" @click=configureTheStrategy(scope.row.resourceId) style="cursor: pointer;" >配置</el-button>
          <el-button type="text" style="cursor: pointer;">
            <a  target = "_blank" href="http://10.1.198.106/ ">登录</a>
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--模态框-配置策略-->
    <el-dialog title="配置策略" :visible.sync="dialogFormVisible" style="margin: auto;width: 103%">
      <div class="strategy-border">
        <el-tag>已有策略</el-tag>
        <el-table :data="currentFirewallSGs" element-loading-spinner="el-icon-loading" stripe @selection-change="">
          <el-table-column label="流量方向" align="center" prop="direction">
            <template slot-scope="scope">
              <div style="color: #409eff">{{directionFormat(scope.row.direction)}}</div>
            </template>
          </el-table-column>
          <el-table-column label="协议" align="center" prop="protocol"></el-table-column>
          <el-table-column label="行为" align="center" prop="action">
            <template slot-scope="scope">
              <div style="color: #409eff">{{actionFormat(scope.row.action)}}</div>
            </template>
          </el-table-column>
          <el-table-column label="源ip" align="center" prop="sourceIp"></el-table-column>
          <el-table-column label="源端口" align="center" prop="sourcePort"></el-table-column>
          <el-table-column label="目的ip" align="center" prop="destIp"></el-table-column>
          <el-table-column label="目的端口" align="center" prop="destPort"></el-table-column>
          <el-table-column label="删除" align="center">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="此操作将会删除本防火墙策略条目" placement="right">
                <div style="color: #409eff" class="fa fa-minus"
                     @click="makeSureDeleteSecurityGroup(scope.row.id,scope.row.firewallId)"></div>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <br>
      <el-form class="strategy-border" status-icon :rules="rules" v-model="newSecurityGroup">
        <el-tag>新建策略</el-tag>
        <el-form-item label="流量方向:" class="strategy-label">
          <el-radio v-model="newSecurityGroup.direction" label="upstream">入栈</el-radio>
          <el-radio v-model="newSecurityGroup.direction" label="downstream">出栈</el-radio>
        </el-form-item>
        <el-form-item label="协议:" class="strategy-label">
          <div>
            <el-radio-group v-model="newSecurityGroup.protocol" size="medium">
              <el-radio-button label="TCP"></el-radio-button>
              <el-radio-button label="UDP"></el-radio-button>
              <el-radio-button label="ICMP"></el-radio-button>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item label="行为:" class="strategy-label">
          <div>
            <el-radio-group v-model="newSecurityGroup.action" size="medium">
              <el-radio-button label="ACCEPT">接受</el-radio-button>
              <el-radio-button label="REJECT">拒绝</el-radio-button>
              <el-radio-button label="DROP">丢弃</el-radio-button>
            </el-radio-group>
          </div>
        </el-form-item>
        <el-form-item label="源ip:" class="strategy-label">
          <el-input clearable placeholder="请填写" class="strategy-input"
                    v-model="newSecurityGroup.sourceIp"></el-input>
        </el-form-item>
        <el-form-item label="源端口:" class="strategy-label" prop="sourcePort">
          <el-input clearable placeholder="请填写" class="strategy-input"
                    v-model.number="newSecurityGroup.sourcePort"></el-input>
        </el-form-item>
        <el-form-item label="目的ip:" class="strategy-label">
          <el-input clearable placeholder="请填写" class="strategy-input"
                    v-model="newSecurityGroup.destIp"></el-input>
        </el-form-item>
        <el-form-item label="目的端口:" class="strategy-label">
          <el-input clearable placeholder="请填写" class="strategy-input"
                    v-model.number="newSecurityGroup.destPort"></el-input>
        </el-form-item>
        <el-form-item class="strategy-button">
          <el-button type="primary" @click="createNewSecurityGroup">新增策略</el-button>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">关闭</el-button>
      </div>
    </el-dialog>

<!--翻页-->
    <div class="pagelocation m-b-30">
      <el-pagination :current-page.sync="tableConf.pageIndex" background
                     @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     layout="total,sizes, prev, pager, next, jumper"
                     :total="tableConf.total" :page-size="tableConf.pageSize" class="pagination"></el-pagination>
    </div>

  </div>
</template>

<script>
    import {TimeFormat, serviceStatusFormat, serviceTypeFormat} from "static/sdsec/js/sdsec/myCommonMethods";
    export default {
      props : ['tableId'],
      data(){
        return{
          pageIndex : 1,
          pageSize : 10,
          total : 30,
          tableConf : {},
          // securityDevice: [],

          dialogFormVisible: false,
          currentFirewallSGs: [],
          newSecurityGroup: {
                direction: 'upstream',
                protocol: "TCP",
                action: "ACCEPT",
                sourceIp: "",
                sourcePort: "",
                destIp: "",
                destPort: "",
                firewallId: ""
            },
        }
      },

      methods:{
          statusFmt:function(status){
              return serviceStatusFormat(status);
          },
          convertType(type) {
              return serviceTypeFormat(type)
        },

          //1.提示确认删除安全规则组
          makeSureDeleteSecurityGroup: function (sescurityGroupId, firewallId) {
              this.$confirm('删除操作不可恢复，是否确认删除安全规则组策略？', '确认删除', {
                  distinguishCancelAndClose: true,
                  confirmButtonText: '确定',
                  cancelButtonText: '取消'
              }).then(() => {
                  this.$message({
                      type: 'info',
                      message: '已删除'
                  });
                  this.deleteSecurityGroup(sescurityGroupId, firewallId);
              }).catch(action => {
                  this.$message({
                      type: 'info',
                      message: action === 'cancel'
                          ? '取消删除'
                          : '停留在当前页面'
                  })
              });
          },
          //2.删除安全规则组
          deleteSecurityGroup: async function (securitygroupId, firewallId) {
              await this.utils.reqObjBackState('/sdsec/web/respool/securitygroup/deleteSecurityGroupAndReConfigureIPtables', {'id': securitygroupId});
              var securityGroups = await this.utils.reqObjBackState('/sdsec/web/respool/securitygroup/querySecurityGroupsByFirewallId', {'id': firewallId});
              this.currentFirewallSGs = securityGroups.data;
          },
          //3. 流量方向格式化
          directionFormat: function (direction) {
              if ("upstream" == direction) {
                  return "入栈";
              } else if ("downstream" == direction) {
                  return "出栈";
              } else {
                  return "";
              }
          },
          actionFormat: function (action) {
              if ("ACCEPT" == action) {
                  return "接受";
              } else if ("REJECT" == action) {
                  return "拒绝";
              } else if ("DROP" == action) {
                  return "丢弃";
              } else {
                  return action;
              }
          },
          resourceTypeFormat: function (resourceType) {
              if ("firewall" == resourceType) {
                  return "防火墙";
              } else if ("WAF" == resourceType) {
                  return "web应用防火墙";
              } else {
                  return resourceType;
              }
          },
          //4. 配置防火墙策略
        configureTheStrategy: async function (firewallId) {
              //1. 先查出所有已有的防火墙规则
              var securityGroups = await this.utils.reqObjBackState('/sdsec/web/respool/securitygroup/querySecurityGroupsByFirewallId', {'id': firewallId});
              this.currentFirewallSGs = securityGroups.data;
              this.newSecurityGroup.sourceIp = "";
              this.newSecurityGroup.sourcePort = "";
              this.newSecurityGroup.destIp = "";
              this.newSecurityGroup.destPort = "";
              this.newSecurityGroup.protocal = "TCP";
              this.newSecurityGroup.action = "ACCEPT";
              this.newSecurityGroup.firewallId = firewallId;
              this.dialogFormVisible = true;
          },

          //5.时间格式转换
          dateTimeFormat(time){
              return TimeFormat(time);
          },
          //6.创建新的安全规则组
          createNewSecurityGroup: async function () {
              //创建
              await this.utils.reqObjBackState('/sdsec/web/respool/securitygroup/saveSecurityGroupAndConfigureIPtables', this.newSecurityGroup);
              //更新列表
              var securityGroups = await this.utils.reqObjBackState('/sdsec/web/respool/securitygroup/querySecurityGroupsByFirewallId', {'id': this.newSecurityGroup.firewallId});
              this.currentFirewallSGs = securityGroups.data;
          },


          handleSelectionChange(selectedRow){
            this.$store.commit('handleSelectionChange', [this.tableId, selectedRow]);
            return;
          },
          handleSizeChange(pageSize){
            this.$store.dispatch('handleSizeChange',[this.tableId,pageSize]);
          },
          handleCurrentChange(pageIndex){
            this.$store.dispatch('handleCurrentChange', [this.tableId, pageIndex]);
          },
          refreshTable(){
            var tableConf={
                total: 0,
                tableData: [],
                pageSize: 10,
                pageIndex: 1,
                load: true,
                tableUrl:"/sdsec/web/securitypool/securityservice/pageQuerySecurityService",
                params: {
                    "orderBy": ["create_time"],
                    "orderType": "desc"
              },
                multipleSelection: [],
            }
              this.$store.commit('registerConf', [this.tableId, tableConf]);
              this.tableConf = this.$store.state.context[this.tableId];
              this.$store.dispatch('reloadTable', this.tableId);

          }
      },

      created:async function () {
        this.refreshTable();
      }
    }
</script>

<style scoped>

</style>
