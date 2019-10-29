<template>
  <el-container class="editor-container" v-loading="loading">
    <toolbar :editor="editor"></toolbar>
    <page :apps="apps" :editor="editor"></page>
    <itempannel :flowType="form.flowType" :apps="apps.filter(app => app.appName != 'common')" :editor="editor"></itempannel>
    <detailpannel :editor="editor" :selectedModel="selectedModel"></detailpannel>
    <contextmenu :editor="editor"></contextmenu>
    <minimap :editor="editor"></minimap>
    <el-dialog
      title="属性"
      :visible.sync="dialog.visible"
      width="60%">
      <el-collapse value="1">
        <el-collapse-item v-if="selectedModel.current" name="1">
          <template slot="title">基础配置</template>
          <el-form label-width="280px" class="props-form">
            <el-form-item 
              v-for="(item, i) in selectedModel.current" 
              :label="`${item.nickName ? item.nickName : ''}(${item.name})`" :key="i">
              <custom-input :type="item.type" :parent="item.defaultValue" @input="(v) => item.defaultValue=v"></custom-input>
              <!-- <el-input type="textarea" autofocus :rows="1" v-model="item.defaultValue" :placeholder="item.defaultValue"></el-input> -->
              {{item.description}}
            </el-form-item>
          </el-form>
        </el-collapse-item>
        <el-collapse-item v-if="selectedModel.common" name="2">
          <template slot="title">高级设置</template>
          <el-form label-width="280px" class="props-form">
            <el-form-item 
              v-for="(item, i) in selectedModel.common" 
              :label="`${item.nickName ? item.nickName : ''}(${item.name})`" :key="i">
              <custom-input :type="item.type" :parent="item.defaultValue" @input="(v) => item.defaultValue=v"></custom-input>
              <!-- <el-input type="textarea" autofocus :rows="1" v-model="item.defaultValue" :placeholder="item.defaultValue"></el-input> -->
              {{item.description}}
            </el-form-item>
          </el-form>
        </el-collapse-item>
      </el-collapse>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="dialogOk">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog v-loading="form.loading" width="60%" title="场景信息" :visible.sync="form.visible">
      <el-form label-width="100px">
        <!-- <el-form-item label="定义: ">
          <span class="definition-dsl">{{form.dsltext}}</span>
        </el-form-item> -->
        <el-form-item label="名称: ">
          <el-input v-model="form.flowName"></el-input>
        </el-form-item>
        <!-- <el-form-item label="参数: ">
          <el-input v-model="form.flowParams"></el-input>
        </el-form-item> -->
        <el-form-item label="描述: ">
          <el-input :autosize="{minRows: 4, maxRows: 8}" type="textarea" v-model="form.description"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="form.visible = false">取 消</el-button>
        <el-button type="primary" @click="createFlow">保存</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
import G6Editor from '@antv/g6-editor';
import Toolbar from '../components/Toolbar';
import Page from '../components/Page';
import Itempannel from '../components/Itempannel'
import Contextmenu from '../components/Contextmenu'
import Detailpannel from '../components/Detailpannel'
import Minimap from '../components/Minimap'
import Bus from '../common/Bus'
import PROPS from '../common/Properties'
import axios from 'axios'
import { toFloGraph, toG6Graph, toTaskParam } from '../common/Convertor';
import Api from '../common/Api'
import { guid } from '../common/Util';
import CustomInput from '../components/CustomInput'

const CONTROL_LABELS = ["START", "END", "SYNC"];

export default {
  components: { Toolbar, Page, Itempannel, Contextmenu, Detailpannel, Minimap, CustomInput },
  data () {
    return {
      editor: new G6Editor(),
      selectedModel: {},
      dialog: {   // 属性参数配置
        visible: false,
        type: ''
      },
      loading: false,
      params: [],
      paramsIndex: 0,
      apps: [],
      form: {  // 保存当前流程图
        visible: false,
        loading: false,
        flowName: '',
        flowParams: '',
        flowType: 0,
        // flowId: '',
        dsltext: '',
        description: '',
        isTemplate: 0,
        dataType: 0
      }
    }
  },
  async created () {
    Bus.$off('save');
    Bus.$on('save', () => {
      const result = this.flow.save();
      this.form.dsltext = JSON.stringify(result);
      this.form.flowParams = toTaskParam(result);
      this.form.visible = true
    })
  },
  async mounted () {
    this.flow = this.editor.getCurrentPage();
    this.loading = true;
    if (this.$route.query.id) {
      let response, data;
      if (this.$route.query.type == 2) {
        response = await axios.get(Api.getTemplateById, { params: {id: this.$route.query.id} })
        data = response.data.data;
        this.form = {
          flowName: data.flowName,
          flowParams: data.flowParams,
          // @模板加密
          dsltext: data.dsltext,
          flowType: data.flowType,
          visible: this.form.visible,
          description: data.description,
          loading: this.form.loading,
          dataType: data.dataType
        }
      } else {
        response = await axios.get(Api.getFlowById, { params: {id: this.$route.query.id} })
        data = response.data.data;
        this.form = {
          flowName: data.flowName,
          dsltext: (new Base64()).decode(data.dsltext),
          flowType: data.flowType,
          visible: this.form.visible,
          description: data.description,
          loading: this.form.loading,
          dataType: data.dataType,
          flowId: data.flowId
        }
      }
      response = await axios.post(Api.getAppList, {ssaAppType: data.flowType});
      this.apps = response.data.data;

      if (this.form.dsltext) {
        this.flow.read(JSON.parse(this.form.dsltext));
        this.flow.getGraph().changeLayout(null)
      }
    } else {
      this.form.flowType = this.$route.query.type || 0;
      let rp = await axios.post(Api.getAppList, {ssaAppType: parseInt(this.form.flowType)});
      this.apps = rp.data.data;
      this.flow.getGraph().changeLayout(null)
    }
    this.loading = false;

    const pages = this.editor.getComponentsByType('page');
    pages.forEach(page => {
      page.on('afteritemselected', ev => {
        this.selectedModel = ev.item.getModel()        
        // 判断增加 flow task id
        if (this.selectedModel.properties) {
          if (!this.selectedModel.properties['flow_task_id']) {
            this.selectedModel.properties['flow_task_id'] = guid();
          }
        } else {
          this.selectedModel.properties = {'flow_task_id': guid()}
        }

        // 增加默认属性
        if (!this.selectedModel.params && this.selectedModel.appId) {
          let current = this.apps.find(app => app.appDesc == this.selectedModel.label);
          let common = this.apps.find(app => app.appName == 'common' && app.ssaAppName == current.ssaAppName);
          
          let currentParam = current.params ? JSON.parse(current.params) : [];
          let commonParam = common.params ? JSON.parse(common.params) : [];
          this.selectedModel.params = commonParam.concat(currentParam);
          // 设置下自有属性的长度
          this.selectedModel.current = currentParam;
          this.selectedModel.common = commonParam;

          this.selectedModel.params.map((v, i) => {
            if (v.defaultValue !== null && !this.selectedModel.properties[v.name]) {
              this.selectedModel.properties[v.name] = v.defaultValue;
            }
          })
        }
      });
    });
    Bus.$on('props', () => {
     
      this.dialog.visible = true;
      // console.log('props', this.selectedModel.properties)
      // console.log('params', this.selectedModel.params)
      // 初始化已经有的数据
      if (this.selectedModel.properties && this.selectedModel.params) {
        this.selectedModel.params.map(v => {
          for (let key in this.selectedModel.properties) {
            if (this.selectedModel.properties.hasOwnProperty(key)) {
              if (key === v.name) {
                v.defaultValue = this.selectedModel.properties[key];
              }
            }
          }
        })
      }
    })
  },
  methods: {
    dialogOk () {
      this.dialog.visible = false;
      this.selectedModel.params.map((v, i) => {
        // if (v.defaultValue !== null) {
          this.selectedModel.properties[v.name] = v.defaultValue;
        // }
      })
    },
    convertDsl (result) {
      if (result.nodes && result.edges) {
        this.form.loading = true;
        axios.post(Api.toolConvertToText, toFloGraph(result)).then(response => {
          this.form.dsltext = response.data.dsl;
          this.form.loading = false;
        }, error => {
          this.form.loading = false;
          this.form.dsltext = '流程设计有误：' + error.response.data[0].message;
        })
      }
    },
    async createFlow () {
      if (!this.form.dsltext) {
        this.$message({ message: '请先进行流程编辑！', type: 'warning' });
        return;
      }
      if (this.form.flowName) {
        this.form.dsltext = (new Base64()).encode(this.form.dsltext);
        if (this.form.flowId) {
          await axios.post(Api.updateFlow, this.form)
        } else {
          await axios.post(Api.createFlow, this.form)
        }      
        this.$router.push('/model');
      } else {
        this.$message({ message: '数据填写完成！', type: 'warning' });
      }
    }
  }
}
</script>

<style scoped>
  .toolbar i {
    width: 30px;
    height: 30px;
    display: inline-block;
  }
  .props-form {
    max-height: 400px;
    overflow: auto;
  }
  .editor-container {
    user-select: none;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }
</style>

<style scoped>
.main{
  padding-top: 0px;
}
.definition-dsl {
  max-height: 200px;
  overflow: auto;
  display: inline-block;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  width: 100%;
}
</style>

<style>
  .editor-container .props-form .el-form-item {
    margin-bottom: 5px;
  }
  .editor-container .el-dialog__body {
    max-height: 450px;
    overflow: auto;
    padding: 5px 20px;
  }
</style>
