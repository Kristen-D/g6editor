<template>
  <div class="manager">
    <el-container>
      <!-- <el-header height="40px" class="breadcrumb">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{labels[this.type]}}管理</el-breadcrumb-item>
        </el-breadcrumb>
      </el-header>-->
      <el-container class="content">
        <el-aside width="200px">
          <h5 class="aside-title">
            所有{{labels[this.type]}}
            <i class="el-icon-plus" @click="showAppDialog"></i>
            <!-- <el-button @click="showAppDialog" size="mini" type="primary">增加</el-button> -->
          </h5>
          <el-tree
            :data="tree"
            node-key="id"
            :indent="5"
            :current-node-key="defaultKey"
            highlight-current
            default-expand-all
            @node-click="handleNodeClick">
            <span :title="node.label" slot-scope="{ node }">{{node.label}}</span>
          </el-tree>
          <!-- <el-menu
            :default-active="currentApp.ssaAppId + ''"
            :default-openeds="['0','1','2']"
            @select="menuSelect"
            class="el-menu-vertical"
          >
            <el-submenu :key="i" :index="i + ''" v-for="(menu, i) in menus">
              <span slot="title">{{i==1?'在线': (i==2 ? '公共': '离线')}}</span>
              <!-- <span slot="title">{{(i==1 ? '公共': '离线')}}</span> -->
              <!-- <el-menu-item
                :key="item.ssaAppId"
                v-for="item in menu"
                :index="item.ssaAppId + ''"
              >{{item.appDesc}}</el-menu-item>
            </el-submenu> -->
          <!-- </el-menu> -->
        </el-aside>
        <el-main v-loading="loading">
          <h5 class="aside-title">
            配置
            <el-upload
              class="upload"
              action="/dataflow/app/submit.do"
              :show-file-list="false"
              :data="fileParam"
              :before-upload="beforeUpload"
              :on-success="uploadSuccess"
              name="file">
              <el-button size="small" type="primary">提交算子</el-button>
              <!-- <div slot="tip" class="el-upload__tip">只能上传jar文件</div> -->
            </el-upload>
            <i @click="delApp" class="el-icon-delete" title="删除"></i>
            <i @click="editApp" class="el-icon-edit" title="修改"></i>
          </h5>
          <div style="padding: 15px;">
            <div style="font-size: 20px !important; " class="text">算子: {{currentApp.appDesc}}</div>
            <div class="text" v-if="currentApp.classPath">类路径: {{currentApp.classPath}}</div>
            <div class="text" v-if="currentApp.dependent">依赖jars: {{currentApp.dependent}}</div>
            <div class="text" v-if="currentApp.description">描述：{{currentApp.description}}</div>
            <div class="text" v-if="currentApp.contextFactory">工厂路径: {{currentApp.contextFactory}}</div>
            <el-row class="list-toolbar">
              <el-col :span="12">
                <h5>配置列表</h5>
              </el-col>
              <el-col :span="12">
                <el-button
                  style="float: right"
                  @click="onTemplateAdd"
                  type="primary"
                  size="media"
                >添加配置项</el-button>
              </el-col>
            </el-row>
            <el-row class="list head">
              <el-col class="list-item" :span="4">配置项</el-col>
              <el-col class="list-item" :span="4">名称</el-col>
              <el-col class="list-item" :span="4">默认值</el-col>
              <el-col class="list-item" :span="3">类型</el-col>
              <el-col class="list-item" :span="5">描述</el-col>
              <el-col class="list-item" :span="4">操作</el-col>
            </el-row>
            <el-row
              class="list"
              :class="{'odd': i%2===1}"
              :key="i"
              v-for="(param, i) in currentApp.paramList"
            >
              <el-col class="list-item" :span="4">{{param.name}}</el-col>
              <el-col class="list-item" :span="4">{{param.nickName}}</el-col>
              <!-- <el-col :title="param.defaultValue" class="list-item" :span="4">{{param.defaultValue}}</el-col> -->
              <el-col class="list-item" :span="4">
                <custom-input readonly size="mini" :type="param.type" :parent="param.defaultValue"></custom-input>
              </el-col>
              <el-col class="list-item" :span="3">{{param.type}}</el-col>
              <el-col :title="param.description" class="list-item" :span="5">{{param.description}}</el-col>
              <el-col class="list-item" :span="4">
                <!-- <el-button type="danger" size="mini"></el-button> -->
                <i @click="onParamEdit(i)" class="el-icon-edit" title="修改"></i>
                <i class="el-icon-delete" title="删除" @click="onParamDelete(i)"></i>
              </el-col>
            </el-row>
            <el-row class="list edit" v-if="templateVisible">
              <el-col class="list-item" :span="4">
                <el-input size="mini" v-model="template.name" placeholder="请输入配置项...(必填)"></el-input>
              </el-col>
              <el-col class="list-item" :span="4">
                <el-input size="mini" v-model="template.nickName" placeholder="请输入中文名称..."></el-input>
              </el-col>
              <el-col class="list-item" :span="4">
                <custom-input size="mini" :type="template.type" :parent="template.defaultValue" @input="(v)=>{template.defaultValue = v}"></custom-input>
                <!-- <el-input size="mini" v-model="template.defaultValue" placeholder="请输入默认值..."></el-input> -->
              </el-col>
              <el-col class="list-item" :span="3">
                <el-select size="mini" v-model="template.type" placeholder="请选择">
                  <el-option label="string" value="string"></el-option>
                  <el-option label="boolean" value="boolean"></el-option>
                  <el-option label="number" value="number"></el-option>
                  <el-option label="password" value="password"></el-option>
                  <el-option label="sql" value="sql"></el-option>
                  <el-option label="readonly" value="readonly"></el-option>
                </el-select>
              </el-col>
              <el-col class="list-item" :span="5">
                <el-input size="mini" v-model="template.description" placeholder="请输入描述值..."></el-input>
              </el-col>
              <el-col class="list-item" :span="4">
                <el-button @click="onTemplateSave" size="mini">保存</el-button>
                <el-button @click="onTemplateDelete" type="danger" size="mini">取消</el-button>
              </el-col>
            </el-row>
          </div>
        </el-main>
      </el-container>
    </el-container>
    <el-dialog title="修改" width="30%" :visible.sync="param.visible">
      <el-form size="mini" label-width="60px">
        <el-form-item label="配置项" :rules="[{required: true}]">
          <el-input v-model="param.name"></el-input>
        </el-form-item>
        <el-form-item label="名称">
          <el-input v-model="param.nickName"></el-input>
        </el-form-item>
        <!-- <el-form-item label="默认值">
          <el-input v-model="param.defaultValue"></el-input>
        </el-form-item> -->
        <el-form-item label="类型">
          <el-select size="mini" v-model="param.type" placeholder="请选择">
            <el-option label="string" value="string"></el-option>
            <el-option label="boolean" value="boolean"></el-option>
            <el-option label="number" value="number"></el-option>
            <el-option label="password" value="password"></el-option>
            <el-option label="sql" value="sql"></el-option>
            <el-option label="readonly" value="readonly"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="默认值">
          <custom-input :type="param.type" :parent="param.defaultValue" @input="(v)=>{param.defaultValue = v}"></custom-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="param.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="param.visible = false">取 消</el-button>
        <el-button :loading="param.loading" size="mini" type="primary" @click="onParamEditOk">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="新增" :visible.sync="app.visible" width="30%">
      <el-form size="mini" label-width="60px">
        <!-- <el-form-item label="key" :rules="[{required: true, message: 'key不能为空'}]">
          <el-input v-model="app.appName"></el-input>
        </el-form-item> -->
        <el-form-item label="名称" :rules="[{required: true, message: '名称不能为空'}]">
          <el-input v-model="app.appDesc"></el-input>
        </el-form-item>
        <el-form-item label="类别">
          <el-select v-model="app.ssaAppType">
            <el-option label="离线" :value="0"></el-option>
            <el-option label="在线" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item v-if="type === 'ssa-processor'" label="类型">
          <el-select v-model="app.type" placeholder="请选择">
            <el-option
              v-for="item in appDict"
              :key="item.name"
              :label="item.value"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="依赖">
          <el-input v-model="app.dependent"></el-input>
        </el-form-item>
        <!-- <el-form-item label="类路径">
          <el-input v-model="app.classPath" :rules="[{required: true, message: '类路径不能为空'}]"></el-input>
        </el-form-item> -->
        <el-form-item label="工厂路径">
          <el-input v-model="app.contextFactory"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="app.description"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button size="mini" @click="app.visible = false">取 消</el-button>
        <el-button :loading="app.loading" size="mini" type="primary" @click="addAppOk">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import axios from "axios";
import Api from "../common/Api";
import CustomInput from './CustomInput'

const TEMPLATE = {
  type: "string",
  nickName: "",
  name: "",
  defaultValue: "",
  description: ""
};
const APP = {
  appName: "",
  appDesc: "",
  ssaAppType: 0,
  classPath: "",
  ssaAppName: "",
  type: '1',
  description: '',
  contextFactory:'',
  dependent: '',
  icon: ''
};
const LABELS = {
  "ssa-sink": "输出",
  "ssa-source": "输入",
  "ssa-processor": "算子"
};
const APP_STATUS_TYPE = [
  {name: '0', value: '离线'},
  {name: '1', value: '在线'},
  {name: '2', value: '共有'}
]
export default {
  name: "outputManager",
  components: {CustomInput},
  data() {
    return {
      template: { ...TEMPLATE },
      templateVisible: false,
      labels: LABELS,
      app: {
        visible: false,
        loading: false,
        dialogType: "add",
        ...APP
      },
      param: {
        visible: false
      },
      menus: [[], [], []],
      currentApp: {},
      loading: false,
      appDict: [],
      defaultKey: 0,
      file: ''
    };
  },
  props: {
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    fileParam () {
      return { key: this.currentApp.appName}
    }
  },
  async created() {
    let rp = await axios.get(Api.getDictByType, {params: {type: 'PROCESS_TYPE'}});
    this.appDict = rp.data.data;
    this.getAppList(true);
  },
  methods: {
    onParamEdit(i) {
      // this.template = { ...this.currentApp.paramList[i] };
      // this.currentApp.paramList.splice(i, 1);
      // this.templateVisible = true;
      this.param = {...this.currentApp.paramList[i], visible: !this.param.visible}
      this.param.nickName = this.currentApp.paramList[i].nickName
      this.param.index = i;
      // this.param.visible = true;
    },
    async onParamEditOk () {
      let i = this.param.index;
      this.currentApp.paramList[i].name = this.param.name;
      this.currentApp.paramList[i].defaultValue = this.param.defaultValue || '';
      this.currentApp.paramList[i].type = this.param.type;
      this.currentApp.paramList[i].description = this.param.description  || '';
      this.currentApp.paramList[i].nickName = this.param.nickName || '';
      this.currentApp.params = JSON.stringify(this.currentApp.paramList);
      this.param.loading = true;
      await axios.post(Api.updateApp, this.currentApp);
      this.param.loading = false;
      this.param.visible = false;
    },
    async delApp() {
      this.$confirm("此操作将永久删除该算子, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        await axios.post(
          Api.delAppBySsaAppId + `${this.currentApp.ssaAppId}.do`
        );
        this.getAppList(true);
      });
    },
    editApp() {
      if (this.currentApp.appName === "common") {
        this.$message("公共的暂时不支持修改!");
        return;
      }
      // this.app = {...this.app, ...this.currentApp};
      // this.app.appName = this.currentApp.appName;
      this.app.appDesc = this.currentApp.appDesc;
      this.app.ssaAppType = this.currentApp.ssaAppType;
      // this.app.classPath = this.currentApp.classPath;
      this.app.type = this.currentApp.type + '';
      this.app.description = this.currentApp.description;
      this.app.contextFactory = this.currentApp.contextFactory
      this.app.dependent = this.currentApp.dependent;
      this.app.icon = this.currentApp.icon;
      this.app.dialogType = "edit";
      this.app.visible = true;
    },
    showAppDialog() {
      this.app = { ...this.app, ...APP };
      this.app.dialogType = "add";
      this.app.visible = true;
    },
    addAppOk() {
      if (this.app.appDesc) {
        let temp = {
          appName: this.app.ssaAppType == 0 ? 'offlineJob' : 'onlineJob',
          classPath: this.app.ssaAppType == 0 ? 'dfamp.default_job.OfflineJob' : 'dfamp.default_job.OnlineJob'
        }
        if (this.app.dialogType === "add") {
          this.addApp({
            ssaAppName: this.type,
            appDesc: this.app.appDesc,
            ssaAppType: this.app.ssaAppType,
            type: this.app.type,
            description: this.app.description,
            icon: this.app.icon,
            dependent: this.app.dependent,
            contextFactory: this.app.contextFactory,
            ...temp
          });
        } else {
          this.currentApp.appName = temp.appName;
          this.currentApp.appDesc = this.app.appDesc;
          this.currentApp.ssaAppType = this.app.ssaAppType;
          this.currentApp.classPath = temp.classPath;
          this.currentApp.type = this.app.type;
          this.currentApp.description = this.app.description;
          this.currentApp.icon = this.app.icon;
          this.currentApp.dependent = this.app.dependent;
          this.currentApp.contextFactory = this.app.contextFactory;
          this.updateApp(this.currentApp);
        }
      } else {
        this.$message("信息填写完整！");
      }
    },
    async getAppList(flag) {
      // 是否设置默认值
      let response = await axios.post(Api.getAppList, {
        ssaAppName: this.type 
      });
      if (flag && response.data.data && response.data.data.length > 0) {
        this.currentApp = { ...response.data.data[0] };
        this.currentApp.paramList = this.currentApp.params
          ? JSON.parse(this.currentApp.params)
          : [];
      }
      this.handleAppListToTree(response.data.data.map(v => {
        v.label = v.appDesc;
        v.id = v.ssaAppId;
        return v;
      }));
    },
    async addApp(data) {
      this.app.loading = true;
      let response = await axios.post(Api.addApp, data);
      // this.getAppList(false);
      //this.menus[data.ssaAppType].push(response.data.data);
      this.currentApp = response.data.data;
      this.currentApp.paramList = this.currentApp.params
          ? JSON.parse(this.currentApp.params)
          : [];
      await this.getAppList();
      this.app.visible = false;
      this.app.loading = false;
      this.$message("新增成功！");
    },
    async updateApp(data) {
      this.app.loading = true;
      await axios.post(Api.updateApp, data);
      this.getAppList(false);
      this.$message("更新成功");
      this.app.visible = false;
      this.app.loading = false;
    },
    handleAppListToTree(list) {
    //  转为树形结构
      this.tree = APP_STATUS_TYPE.map(status => {
        let treeNode = {
          label: status.value
        }
        if (this.type !== 'ssa-processor') {
          treeNode.children = list.filter(v => v.ssaAppType == status.name);
        } else {
          let l = list.filter(v => v.ssaAppType == status.name);
          treeNode.children = this.appDict.map(dict => {
            return {
              label: dict.value,
              children: l.filter(v => v.type == dict.name)
            }
          }).filter(v => v.children.length > 0)
          if (status.name == '2') {
            treeNode.children = l;
          }
        }
        return treeNode;
      })
      // this.defaultKey = list[0].id;  // 默认
    },
    handleNodeClick (node) {
      if (node.ssaAppId) {
        this.currentApp = node;
        if (this.currentApp.params) {
          try {
            this.currentApp.paramList = JSON.parse(this.currentApp.params);
          } catch (e) {
            this.$alert("数据属性解析出错！");
          }
        } else {
          this.currentApp.paramList = [];
        }
      }
    },
    onTemplateAdd() {
      this.template = { ...TEMPLATE };
      this.templateVisible = true;
    },
    async onTemplateSave() {
      if (this.template.name) {
        this.currentApp.paramList.push({
          name: this.template.name,
          nickName: this.template.nickName,
          defaultValue: this.template.defaultValue || '',
          description: this.template.description,
          type: this.template.type
        });
        this.currentApp.params = JSON.stringify(this.currentApp.paramList);
        await axios.post(Api.updateApp, this.currentApp);
        this.template = { ...TEMPLATE };
        this.templateVisible = false;
        this.$message("添加成功！");
      } else {
        this.$message("数据填写完整！");
      }
    },
    async onTemplateDelete() {
      this.templateVisible = false;
    },
    async onParamDelete(i) {
      this.$confirm("此操作将永久删除该配置项, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(async () => {
        this.currentApp.paramList.splice(i, 1)
        this.currentApp.params = JSON.stringify(this.currentApp.paramList);
        let rp = await axios.post(Api.updateApp, this.currentApp);
        this.currentApp = rp.data.data;
        this.currentApp.paramList = this.currentApp.params
            ? JSON.parse(this.currentApp.params)
            : [];
        this.$message("删除成功！");
      });
    },
    uploadSuccess(response) {
      if (!response.state) {
        this.$message(response.data.result)
      } else {
        this.$message("jar上传成功!")
      }
    },
    beforeUpload (file) {
      if (!/\.(jar)$/.test(file.name)) {
        this.$message("只能上次jar包文件！")
        return false;
      }
      return this.$confirm(`当前算子为: ${this.currentApp.appName}, 提交算子文件名为:${file.name}`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      });
    }
  }
};
</script>

<style scoped>
.manager {
  height: 100%;
  padding: 10px 10px;
}
.manager .breadcrumb {
  padding-top: 15px;
  padding-left: 0;
}
.manager .content {
  background: white;
}
.manager .aside-title {
  height: 40px;
  line-height: 40px;
  padding: 0 8px;
  border-bottom: 1px solid #f2f2f2;
}
.manager .el-menu-vertical {
  margin-top: 15px;
}
.manager .list-toolbar {
  height: 50px;
  line-height: 50px;
}
.manager .list {
  height: 40px;
  line-height: 40px;
}
.manager .list-item {
  padding-left: 10px;
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  -o-text-overflow: ellipsis;
  white-space: nowrap;
}
.manager .list.head {
  background: #f2f2f2;
}
.manager .list.odd {
  background: #f8f8f8;
}
.manager .text {
  line-height: 30px;
}
.manager .el-icon-plus {
  float: right;
  margin-top: 12px;
  cursor: pointer;
  color: #409eff;
  font-size: 16px !important;
}
.manager .el-icon-delete {
  cursor: pointer;
  color: #f56c6c;
  font-size: 16px !important;
}
.manager .el-icon-delete {
  color: #f56c6c;
}
.manager .el-icon-edit {
  font-size: 16px !important;
  margin-right: 10px;
  cursor: pointer;
}
.manager .aside-title .el-icon-edit,
.manager .aside-title .el-icon-delete {
  font-size: 16px !important;
  float: right;
  margin-top: 12px;
  margin-right: 10px;
  cursor: pointer;
}
.manager .upload {
  float: right;
  margin-left: 10px;
}
</style>

<style lang="">
.manager .el-submenu__title,
.manager .el-submenu .el-menu-item {
  height: 30px;
  line-height: 30px;
}
.manager .el-menu {
  border: none;
}
.manager .el-aside {
  height: 100%;
  border-right: 1px solid #f2f2f2;
}
.manager .content .el-main {
  padding: 0;
}
</style>
