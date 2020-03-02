<template>
  <div class="container-fluid">
    <div class="el-panel">
      <div class="search sass-search">
        <div class="ordinary-search">
          <el-form :inline="true" :model="params" class="demo-form-inline" onSubmit="return false">
            <el-form-item class="m-b-0">
              <el-input
                @keyup.enter.native="querySrPlaybook"
                placeholder="剧本名称"
                v-model="params.name"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item class="m-b-0">
              <el-button
                type="primary"
                size="small"
                style="margin-top:1px;"
                @click="querySrPlaybook"
              >搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="el-panel-heading flexBetween" style="height: 45px">
        <label class="el-panel-title">剧本列表</label>
        <div>
          <el-button type="primary" size="small" plain @click="addSrPlaybookBtn">新增</el-button>
          <el-button type="primary" size="small" plain @click="replaybook">导入</el-button>
          <el-button type="primary" size="small" plain @click="exportPlaybook">导出</el-button>
          <el-button type="primary" size="small" plain @click="publishPlaybook">发布</el-button>
          <el-button type="primary" size="small" plain @click="archivePlaybook">归档</el-button>
        </div>
      </div>
      <el-table :data="tableConf.tableData" v-loading ="tableConf.load"
              element-loading-spinner="el-icon-loading" stripe  @selection-change="handleSelectionChange">
      <el-table-column type="selection">
      </el-table-column>
        <el-table-column label="序号" type="index" width="50" align="center">
          <template scope="scope">
            <span>{{(tableConf.pageIndex - 1) * tableConf.pageSize + scope.$index + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column label="剧本名称" align="center" prop="name">
          <template slot-scope="scope">
            <div style="cursor: pointer;color: #409eff" @click="viewbook(scope.row)">
              <span v-html="nameFmt(scope.row.name)"></span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="描述" align="center" prop="desc">
          <template slot-scope="scope">
           <span v-html="nameFmt(scope.row.desc)"></span>
          </template>
        </el-table-column>
        <el-table-column label="状态" align="center" prop="state">
          <template slot-scope="scope"><span v-html="stateFmt(scope.row)"></span></template>
        </el-table-column>
        <el-table-column label="启用" align="center" prop="enable">
          <template slot-scope="scope">
            <el-switch v-model="scope.row.enableBoolean" @change="enalbeplaybook(scope.row)" active-color="#409EFF"
           ></el-switch>

          </template>
        </el-table-column>
        <el-table-column label="操作人" align="center" prop="updateAcc"></el-table-column>
        <el-table-column label="操作时间" align="center" prop="updateTime" width="200px;">
          <template slot-scope="scope">
              {{timeFmt(scope.row.updateTime)}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="200px;">
          <template scope="scope">
            <span v-if="scope.row.state != 6" title="修改" style="cursor: pointer;" @click="editplaybook(scope.row)">
              <i class="el-icon-edit"></i>
            </span>
             <span class="vert-bar-color" v-if="scope.row.state == 1">|</span>
            <span v-if="scope.row.state == 1" title="绘制" style="cursor: pointer;" @click="replaybook(scope.row)">
              <i class="el-icon-picture"></i>
            </span>
            <span class="vert-bar-color" v-if="scope.row.state != 1 && scope.row.state != 6">|</span>
            <span v-if="scope.row.state != 1" title="复制" style="cursor: pointer;" @click="copyplaybook(scope.row)">
              <i class="el-icon-copy-document"></i>
            </span>
            <!-- <span class="vert-bar-color">|</span>
            <span title="启/禁用" style="cursor: pointer;" @click="enalbeplaybook(scope.row)">
              <i class="el-icon-turn-off"></i>
            </span> -->
            <span v-if="scope.row.state == 1" class="vert-bar-color">|</span>
            <span v-if="scope.row.state == 1" title="删除" style="cursor: pointer;" @click="delplaybook(scope.row)">
              <i class="el-icon-delete"></i>
            </span>

          </template>
        </el-table-column>
      </el-table>
      <div class="pagelocation m-b-30">
        <el-pagination
          :current-page.sync="tableConf.pageIndex"
          background
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          layout="total,sizes, prev, pager, next, jumper"
          :total="tableConf.total"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="tableConf.pageSize"
          class="pagination"
        ></el-pagination>
      </div>
    </div>
     <iframe id="fwObjIfrm" style="display: none;"  frameborder="0"></iframe>
    <el-dialog
      :title="playbookTitle"
      :visible.sync="playbookDialog"
      width="800px"
      class="dialog-panel"
      :before-close="playbookCancel"
      :close-on-click-modal="false"
    >
      <div style="height:450px;overflow-y:auto;overflow-x:hidden;">
        <el-collapse class="custom-collapse" v-model="activeNames">
          <el-collapse-item name="1">
            <template slot="title">
              <div class="el-collapse-heading">
                <h4 class="el-panel-title2">基本属性</h4>
                <label>
                  (
                  <span>*</span>必填)
                </label>
              </div>
            </template>
            <el-form
              :model="playbook"
              label-width="150px"
              ref="playbookForm"
              :rules="playbookRules"
            >
              <el-form-item label="剧本名称：" prop="name">
                <el-input v-model="playbook.name" class="dialog_form"></el-input>
              </el-form-item>
              <el-form-item label="剧本类型：" prop="type">
                <el-select v-model="playbook.type" class="dialog_form">
                  <el-option
                    v-for="item in playbookType"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >{{item.label}}</el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="事件类型：">
                <el-select v-model="playbook.incTypeIds" multiple  placeholder="选择事件类型">
                   <el-option v-for="item in incTypeList" :key="item.id" :label="item.typeName" :value="item.id"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="角色分配：">
                 <el-select v-model="playbook.roleIds" multiple  placeholder="选择角色">
                   <el-option v-for="item in assignUserList" :key="item.id" :label="item.roleName" :value="item.roleId"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="描述：">
                <el-input type="textarea" class="dialog_form" v-model="playbook.desc" :rows="4"></el-input>
              </el-form-item>
            </el-form>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="dialog-button-location">
        <el-button
          type="primary"
          size="small"
          class="dialog-button-padding"
          @click="savePlaybook"
        >确定</el-button>
        <el-button type="gray" size="small" class="dialog-button-padding" @click="playbookCancel">取消</el-button>
      </div>
    </el-dialog>

    <el-dialog title="剧本导入" :visible.sync="importDialog" width="600px" class="dialog-panel">
      <div class="dialog-content">
        <el-form class="demo-form-inline">
          <el-form-item label="是否覆盖：">
            <el-switch v-model="override"></el-switch>
          </el-form-item>
          <el-form-item label="文件列表：">
            <el-upload
              class="upload-demo"
              action="/ssa/soar/playbook/importPlaybook.do"
              :on-preview="handlePreview"
              ref="upload"
              :on-success="handleSuccess"
              :multiple="false"
              :auto-upload="false"
              :limit="1"
              :file-list="fileList"
              :on-exceed="handleExceed"
            >
              <el-button size="small" slot="trigger" type="primary">选取文件</el-button>
            </el-upload>
          </el-form-item>
        </el-form>
        <div class="dialog-button-location">
          <el-button type="primary" size="small" class="dialog-button-padding" @click="confirmImportPb">导入</el-button>
          <el-button
            type="gray"
            size="small"
            class="dialog-button-padding"
            @click="importDialog=false"
          >取消</el-button>
        </div>
      </div>
    </el-dialog>
     <el-dialog title="测试结果" :visible.sync="testDialog" width="600px" class="dialog-panel"  :before-close="closeTestDialog">
       <el-table :data="testResultData">
         <el-table-column label=""></el-table-column>
       </el-table>
     </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableId: "pbTableId",
      params: {
        name: null
      },
      tableConf: null,
      activeNames: ["1"],
      playbookTitle: "编辑剧本",
      playbookRules: {
        name: [
          { required: true, message: "剧本名称不能为空", trigger: "blur" }
        ],
        type: [
          { required: true, message: "剧本类型不能为空", trigger: "change" }
        ]
      },
      playbookDialog: false,
      playbookOpt: "",
      dtTypeArray: [
        {
          label: "字符",
          value: 1
        },
        {
          label: "整数",
          value: 2
        }
      ],
      playbookType: [
        {
          label: "丰富化",
          value: 1
        },
        {
          label: "响应",
          value: 2
        },
        {
          label: "混合",
          value: 3
        }
      ],
      playbook: {
        name: null,
        type: 3,
        desc: null,
        in: [
          {
            code: null,
            dtype: 1,
            desc: null
          }
        ],
        out: [
          {
            code: null,
            dtype: 1,
            desc: null
          }
        ]
      },
      importDialog: false,
      override: false,
      testDialog : false,
      testResultData : [],
      assignUserList : [],
      incTypeList : [],
    };
  },
  methods: {
    stateFmt(obj) {
      let str = "";
      let state = obj.state;
      let valid = obj.valid;
      if (state) {
        if (state == 1) {
          if(valid == 1){
            str = '<font style="color:#409EFF">新建</font>';
          }else{
            str = '<font style="color:gray">新建</font>';
          }
        } else if (state == 5) {
          if(valid == 1){
            str = '<font style="color:#409EFF">发布</font>';
          }else{
            str = '<font style="color:gray">发布</font>';
          }
        } else if (state == 6) {
          if(valid == 1){
            str = '<font style="color:#409EFF">归档</font>';
          }else{
            str = '<font style="color:gray">归档</font>';
          }
        }
      }
      return str;
    },

    typeFmt(type) {
      let str = "";
      if (type) {
        if (type == 1) {
          str = "丰富化";
        } else if (type == 2) {
          str = "响应";
        } else if (type == 3) {
          str = "混合";
        }
      }
      return str;
    },
    enableFmt(enable){
      let str = "";
      if(enable == 1){
        str = "是";
      }else if(enable == 0){
        str = "否";
      }
      return str;
    },
    timeFmt(t){
      let str = "";
      if(t){
        str =  this.utils.toDateSS(t);
      }
      return str;
    },
    nameFmt(name){
      if(name){
        if(name.length < 10){
          return '<font>' + name + '</<font>';
        }else{
          let str = name.substr(0,10) + "...";
          return '<font title="' + name + '">' + str + '</font>';
        }
      }else {
        return "";
      }
    },

    addSrPlaybook() {
      this.$router.push({
        name: "G6"
      });
    },
    addPut(type) {
      let item = {
        code: null,
        dtype: 1,
        desc: null
      };
      if (type == "in") {
        this.playbook.in.push(item);
      } else if (type == "out") {
        this.playbook.out.push(item);
      }
    },
    removePut(index, list) {
      list.splice(index, 1);
    },
    async addSrPlaybookBtn() {
      this.playbookDialog = true;
      this.playbookOpt = "add";
       let params = {};
      this.assignUserList = await this.utils.reqObj('/ssa/soar/playbook/listAvailableRole.do',{});
      this.incTypeList = await this.utils.reqObj("/ssa/soar/inctype/listSrIncType.do",{});
    },
    checkForm(formName) {
      var flag = false;
      this.$refs[formName].validate(valid => {
        if (valid) {
          flag = true;
        }
      });
      return flag;
    },
    replaybook() {
      debugger
       let g6Params = {pbId: '1', handle : "update"};
          this.$router.push({
            name : 'G6',
            params : g6Params,
          });
    },

    viewbook(row){
    let g6Params = {pbId: row.id, handle : "view"};
    this.$router.push({
      name : 'G6View',
      params : g6Params,
    });
},

    async savePlaybook() {
      if (!this.checkForm("playbookForm")) return;
      if (this.playbookOpt == "add") {
        let id = await this.utils.reqObj("/ssa/soar/playbook/getNewId.do");
        this.playbook.id = id;
        let baseResult = await this.utils.reqObjBackState(
          "/ssa/soar/playbook/savePlaybook.do",
          this.playbook
        );
        if (baseResult.state) {
          this.playbookCancel();
          this.$store.dispatch("reloadTable", this.tableId);
          this.$message({ message: "剧本新增成功", type: "success" });
          let g6Params = {pbId: id, handle : "add"};
          this.$router.push({
            name : 'G6',
            params : g6Params,
          });
        } else {
          this.$message({ message: baseResult.messagem, type: "error" });
        }
      } else if (this.playbookOpt == "update") {
        let baseResult = await this.utils.reqObjBackState(
          "/ssa/soar/playbook/updatePlaybook.do",
          this.playbook
        );
        if (baseResult.state) {
          this.playbookCancel();
          this.$store.dispatch("reloadTable", this.tableId);
          this.$message({ message: "剧本修改成功", type: "success" });
        } else {
          this.$message({ message: baseResult.messagem, type: "error" });
        }
      }
    },
    playbookCancel() {
      this.playbookDialog = false;
      let playbookInit = {
        name: null,
        type: null,
        desc: null,
        roleIds : null,
        incTypeIds : null,
        in: [
          {
            code: null,
            dtype: null,
            desc: null
          }
        ],
        out: [
          {
            code: null,
            dtype: null,
            desc: null
          }
        ]
      };
      this.playbook = playbookInit;
      this.$refs["playbookForm"].resetFields();
    },
    querySrPlaybook() {
      this.$store.commit("setParams", [this.tableId, this.params]);
      this.$store.dispatch("reloadSearchTable", [this.tableId]);
    },
    handleCurrentChange(pageIndex) {
      this.$store.dispatch("handleCurrentChange", [this.tableId, pageIndex]);
    },
    handleSizeChange(pageSize) {
      this.$store.dispatch("handleSizeChange", [this.tableId, pageSize]);
    },
    async editplaybook(obj) {
      this.playbookDialog = true;
      let params = {};
      this.assignUserList = await this.utils.reqObj('/ssa/soar/playbook/listAvailableRole.do',{});
       this.incTypeList = await this.utils.reqObj("/ssa/soar/inctype/listSrIncType.do",{});
      this.playbookOpt = "update";
      let param = { id: obj.id };
      this.playbook = await this.utils.reqObj(
        "/ssa/soar/playbook/getPlaybook.do",
        param
      );

    },
    async copyplaybook(obj) {
      let baseResult = await this.utils.reqObjBackState(
        "/ssa/soar/playbook/copyPlaybook.do",
        obj
      );
      if (baseResult.state) {
        this.$store.dispatch("reloadTable", this.tableId);
        this.$message({ message: "剧本复制成功", type: "success" });
      } else {
        this.$message({ message: baseResult.message, type: "error" });
      }
    },

    async enalbeplaybook(obj){
        let pbIds = new Array();
        let enable = obj.enable;
        pbIds.push(obj.id);
        let params = {pbIds : pbIds};
        let result = await this.utils.reqObjBackState('/ssa/soar/playbook/enablePlaybook.do',params);
        if(result.state){
          this.$store.dispatch("reloadTable", this.tableId);
          if(enable == 1){
            this.$message({ message: "禁用成功", type: "success" });
          }else if(enable == 0){
             this.$message({ message: "启用成功", type: "success" });
          }
        }else {
           this.$store.dispatch("reloadTable", this.tableId);
         this.$message({ message: result.message, type: "error" });
      }
    },
    delplaybook(obj) {
      this.$confirm("此操作将删除所选条目，是否继续？", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        let baseResult = await this.utils.reqObjBackState(
          "/ssa/soar/playbook/deletePlaybook.do",
          obj
        );
        if (baseResult.state) {
          this.$store.dispatch("reloadTable", this.tableId);
          this.$message({ message: "剧本删除成功", type: "success" });
        } else {
          this.$message({ message: baseResult.message, type: "error" });
        }
      });
    },
    handleSelectionChange(selectedRow) {
        this.$store.commit('handleSelectionChange', [this.tableId, selectedRow]);
    },
     handleExceed : function(file, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次已经选择了 ${fileList.length} 个文件`);
      },
    exportPlaybook(){
      let num = this.tableConf.multipleSelection.length;
      if(num < 1){
        this.$message({message : "至少选择一个剧本进行导出",type : "error"});
        return;
      }
      if(num > 1){
         this.$message({message : "请选择一个剧本进行导出",type : "error"});
        return;
      }
      let state = this.tableConf.multipleSelection[0].state;
      if(state !== 5){
          this.$message({message : "未发布的剧本无法导出",type : "error"});
          return;
      }
       let id = this.tableConf.multipleSelection[0].id;
       document.getElementById("fwObjIfrm").src = "/ssa/soar/playbook/exportPlaybook.do?ids=" + id;
    },
    async publishPlaybook(){
       let num = this.tableConf.multipleSelection.length;
      if(num < 1){
        this.$message({message : "至少选择一个剧本进行发布",type : "error"});
        return;
      }
       if(num > 1){
         this.$message({message : "请选择一个剧本进行发布",type : "error"});
        return;
      }
      let pbIds = new Array();
      let selecions = this.tableConf.multipleSelection;
      for(var index in selecions){
        pbIds.push(selecions[index].id);
      }
      let params = {pbIds : pbIds}
      let result = await this.utils.reqObjBackState('/ssa/soar/playbook/publishPlaybook.do',params);
      if(result.state){
         this.$store.dispatch('reloadTable', this.tableId);
        this.$message({message : "剧本发布成功", type : "success"});

      }else{
        this.$message({message : result.message, type : "error"});
      }
    },

    async archivePlaybook(){
      let num = this.tableConf.multipleSelection.length;
      if(num < 1){
        this.$message({message : "至少选择一个剧本进行归档",type : "error"});
        return;
      }
       if(num > 1){
         this.$message({message : "请选择一个剧本进行归档",type : "error"});
        return;
      }
      let pbIds = new Array();
      let selecions = this.tableConf.multipleSelection;
      for(var index in selecions){
        pbIds.push(selecions[index].id);
      }
      let params = {pbIds : pbIds}
      let result = await this.utils.reqObjBackState('/ssa/soar/playbook/archivePlaybook.do',params);
      if(result.state){
         this.$store.dispatch('reloadTable', this.tableId);
        this.$message({message : "剧本归档成功", type : "success"});
      }else{
        this.$message({message : result.message, type : "error"});
      }
    },
    async importPlaybook(){
      if(this.$refs.upload){
        await this.$refs.upload.clearFiles();
      }
      this.importDialog = true;
    },
    handleSuccess  : function (response,file,fileList) {;
        var state = response.state;
        if(state){
           this.$message({message : '上传成功',type : "success"});
        }else{
           this.$message({message : response.message,type : "error"});
        }
      },
    confirmImportPb(){
      this.$refs.upload.submit();
      this.importDialog = false;
      this.$store.dispatch('reloadTable', this.tableId);
    },
    cancalImport(){
      this.importDialog=false
      this.$refs.upload.clearFiles();
    },
    refreshTestResult(){
      var testInterval = setInterval(() => {

      }, 2000);
    },
    closeTestDialog(){
      clearInterval(testInterval);
    },

  },
  created: function() {
    let from = this.$route.params.from;
    if(from == 'g6'){
      window.location.reload();
    }
    var tableConf = {
      total: 0,
      tableData: [],
      pageSize: 10,
      pageIndex: 1,
      load: true,
      tableUrl: "/ssa/soar/playbook/pagePlaybook.do",
      params: {},
      multipleSelection: []
    };
    this.$store.commit("registerConf", [this.tableId, tableConf]);
    this.tableConf = this.$store.state.context[this.tableId];
    this.$store.dispatch("reloadTable", this.tableId);

  }
};
</script>

<style scoped>
.dialog_form {
  width: 300px;
}
.el-collapse-heading {
  padding: 0 15px;
}
.el-collapse-heading h4 {
  display: inline-block;
}
.el-collapse-heading label {
  padding-left: 5px;
  color: #999;
  font-size: 12px;
  line-height: 14px;
}
.el-collapse-heading label span {
  color: #f00;
  padding-right: 3px;
}
.custom-inputwidth {
  width: 16.48% !important;
}
.custom-width {
  width: 250px;
}
.addbutton {
  padding-right: 20px !important;
  line-height: 40px;
}

.custom-collapse.el-collapse {
  border-top: none;
}
.custom-collapse .el-collapse-item__header,
.custom-collapse .el-collapse-item__wrap {
  border-bottom: none;
}
.custom-collapse .el-collapse-item__content {
  padding-bottom: 0;
}
.custom-collapse .el-collapse-item.is-active .el-collapse-item__header {
  border-bottom: 1px solid #ebeef5;
}
.custom-form.el-form .el-form-item {
  width: calc(100% / 3);
}
.custom-form {
  flex-wrap: wrap;
}
.el-form-item__label {
  float: left;
}
.el-form-item__label {
  float: left;
}

tr th {
  padding: 6px 0px;
  background-color: #f5f6fa;
}
</style>
<style>
#pbadd-white-table {
  margin-top: 10px;
}
#pbadd-white-table th {
  background-color: #f5f6fa;
}
</style>
