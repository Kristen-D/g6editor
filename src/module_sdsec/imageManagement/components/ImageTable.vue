<template>
  <div>
    <div class="el-panel-heading flexBetween">
      <label class="el-panel-title">镜像列表</label>
      <div>
<!--        action 后端接口，待改-->
        <el-upload
          style="display:inline-block"
          action="http://localhost:8080/module_sdsec/imageManagement"
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :data = "tableConf">
        <el-button type="primary" size="small">上传镜像</el-button>
        </el-upload>
        <el-button type="primary" size="small" @click="showComponentTypeModal">设置安全组件类型</el-button>
        <el-button size="small" @click="refreshTable" style="background-color:#EDF1F5;size: 30px"><i class="el-icon-refresh" style="color:#007BE8"></i></el-button>
      </div>
    </div>
    <!--表格布局-->
    <el-table :id="tableId" :data="tableConf.tableData" v-loading="tableConf.load"
              element-loading-spinner="el-icon-loading" stripe @selection-change="handleSelectionChange">
      <el-table-column type="selection">
      </el-table-column>
      <el-table-column label="名称" align="center" prop="name">
      </el-table-column>
      <el-table-column label="安全组件类型" align="center" prop="componentType">
        <template slot-scope="scope">
          {{componentTypeFormat(scope.row.componentType)}}
        </template>
      </el-table-column>
      <el-table-column label="容量" align="center" prop="size">
        <template slot-scope="scope">
          {{sizeFormat(scope.row.size)}}
        </template>
      </el-table-column>
      <el-table-column label="真实容量" align="center" prop="actualSize">
        <template slot-scope="scope">
          {{sizeFormat(scope.row.actualSize)}}
        </template>
      </el-table-column>
      <el-table-column label="镜像格式" align="center" prop="format">
      </el-table-column>
      <el-table-column label="平台" align="center" prop="platform">
      </el-table-column>
      <el-table-column label="启用状态" align="center" prop="state">
        <template slot-scope="scope">
          {{useStateFmt(scope.row.state)}}
        </template>
      </el-table-column>
<!--      <el-table-column label="就绪状态" align="center" prop="status">-->
<!--        <template slot-scope="scope">-->
<!--          {{finishStateFmt(scope.row.status)}}-->
<!--        </template>-->
<!--      </el-table-column>-->
      <el-table-column label="创建时间" align="center" prop="createTime">
        <template slot-scope="scope">
          {{dateTimeFormat(scope.row.createTime)}}
        </template>
      </el-table-column>
      <el-table-column label="更新时间" align="center" prop="updateTime">
        <template slot-scope="scope">
          {{dateTimeFormat(scope.row.updateTime)}}
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template scope="scope">
          <el-button type="text" @click="showResourceDetail(scope.row)" style="cursor: pointer;" >详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--翻页-->
    <div class="pagelocation m-b-30">
      <el-pagination :current-page.sync="tableConf.pageIndex" background
                     @size-change="handleSizeChange" @current-change="handleCurrentChange"
                     layout="total,sizes, prev, pager, next, jumper"
                     :total="tableConf.total" :page-size="tableConf.pageSize" class="pagination"></el-pagination>
    </div>

    <el-dialog title="上传镜像" :visible.sync=showUploadImageModal style="margin: auto;width: 103%">
      <el-form>
        <el-form-item :label=componentTypeDetail>
          <br/>
          选择镜像文件：
          <input type="file" id="imageFile"></input>
        </el-form-item>
        <el-form-item class="strategy-button">
          <el-button type="primary" @click="uploadImage">上传</el-button>
          <el-button @click="showUploadImageModal = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog title="设置安全组件类型" :visible.sync=dialogFormVisible style="margin: auto;width: 103%">
      <el-form>
        <el-form-item :label=componentTypeDetail>
          <br/>
          <el-select v-model="componentTypeValue" placeholder="请选择">
            <el-option
              v-for="item in componentType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item class="strategy-button">
          <el-button type="primary" @click="modifyImageComponentType">设置</el-button>
          <el-button @click="dialogFormVisible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
    import {TimeFormat} from 'static/sdsec/js/sdsec/myCommonMethods'

    export default {
        props: ['tableId'],
        data() {
            return {
                pageIndex: 1,
                pageSize: 10,
                total: 30,
                tableConf: {},
                dialogFormVisible: false,
                showUploadImageModal: false,

                componentType: [{
                    value: 'FIREWALL',
                    label: '防火墙(FIREWALL)'
                }, {
                    value: 'WAF',
                    label: 'web应用防火墙(WAF)'
                }, {
                    value: 'IPS',
                    label: '入侵防御系统(IPS)'
                }, {
                    value: '',
                    label: '未设置'
                }],
                componentTypeValue: '',
                componentTypeDetail: '',
                modifyImgComponentTypeIds: []
            }
        },
        methods: {
            dateTimeFormat(time){
                return TimeFormat(time);
            },
            sizeFormat: function (byte) {
                var size = "";
                size = (byte / (1024 * 1024 * 1024)).toFixed(2) + "GB"
                return size;
            },
            showResourceDetail: function (row) {
                this.$router.push({path: 'imageDetail/' + row.id})
            },
            handleSelectionChange(selectedRow) {
                this.$store.commit('handleSelectionChange', [this.tableId, selectedRow]);
                return;
            },
            handleSizeChange(pageSize) {
                this.$store.dispatch('handleSizeChange', [this.tableId, pageSize]);
            },
            handleCurrentChange(pageIndex) {
                this.$store.dispatch('handleCurrentChange', [this.tableId, pageIndex]);
            },
            useStateFmt: function (state) {
                var str = '';
                if (state) {
                    if (state == 'Unsynchronized') {
                        str = '未启用';
                    } else if (state == 'Enabled') {
                        str = '已启用';
                    }
                }
                return str;
            },
            finishStateFmt: function (status) {
                var str = '';
                if (status) {
                    if (status == 'Unsynchronized') {
                        str = '未就绪';
                    } else if (status == 'Ready') {
                        str = '已就绪';
                    }
                }
                return str;
            },
            showComponentTypeModal() {
                this.componentTypeValue = "";
                var rows = this.$store.state.context[this.tableId].multipleSelection;
                if (rows.length <= 0) {
                    this.$alert("请先选择一个镜像!", {
                        type: 'warning'
                    });
                    return;
                } else {
                    this.modifyImgComponentTypeIds = rows.map(item => item.id);
                    this.componentTypeDetail = "将镜像【 " + rows.map(item => item.name) + " 】" + "的安全组件类型设置为";
                    this.dialogFormVisible = true;
                }
            },

            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file);
            },
            uploadImage() {
                if("" == $("#imageFile").val() || $("#imageFile").val() == null){
                  alert("您还没有选择镜像文件！");
                }else{
                    this.showUploadImageModal = false;
                    this.$notify({
                        title: '正在上传镜像，时间可能较长，请耐心等待 ...',
                        iconClass: 'el-icon-refresh',
                        duration: 5000
                    });
                }
            },
            async modifyImageComponentType() {
                var updateReq = {
                    ids: this.modifyImgComponentTypeIds,
                    componentType: this.componentTypeValue
                };
                await this.utils.reqObjBackState('/sdsec/web/respool/image/batchUpdate', updateReq);
                this.refreshTable();
                this.dialogFormVisible = false;
            },
            componentTypeFormat(componentType) {
                var str = '';
                if (componentType) {
                    if (componentType == 'FIREWALL') {
                        str = '防火墙';
                    } else if (componentType == 'WAF') {
                        str = 'web应用防火墙';
                    } else if (componentType == 'IPS') {
                        str = '入侵防御系统';
                    } else {
                        return componentType;
                    }
                }
                return str;
            },
            refreshTable() {
                var tableConf = {
                    total: 0,
                    tableData: [],
                    pageSize: 10,
                    pageIndex: 1,
                    load: true,
                    tableUrl: "/sdsec/web/respool/image/pageQuery",
                    params: {
                        "orderBy": ["create_time"],
                        "orderType": "desc",
                        "filters": {"oemInteralUseOnly": 0}
                    },
                    multipleSelection: [],
                }
                this.$store.commit('registerConf', [this.tableId, tableConf]);
                this.tableConf = this.$store.state.context[this.tableId];
                this.$store.dispatch('reloadTable', this.tableId);
            }
        },
        created: function () {
            this.refreshTable();
        },
        watch: {
            tableId: function (curVal) {
                console.log("tableId:" + curVal);
            }
        },
    }
</script>

<style scoped>

  .strategy-label {
    margin-left: 10%;
    text-align: right;
    width: 40%;
  }

  .strategy-button {
    margin-left: 10%;
    text-align: right;
  }

</style>
