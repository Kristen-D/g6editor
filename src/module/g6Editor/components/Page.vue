<template>
  <div class="page">
    <div class="content" ref="page"></div>
    <div class="result">
      <el-input
        type="textarea"
        readonly
        placeholder="definitions"
        v-model="text">
      </el-input>
    </div>
    <div class="control">
      <span @click="convertDsl" class="checked">转换DSL</span>
      <span @click="changeLayout" :class="{'checked': layout}">layout</span>
    </div>
    <el-dialog width="600px" title="任务信息" :visible.sync="taskDialog">
      <el-form label-width="120px">
        <el-form-item label="Definition: ">
          <span style="font-weight: bold">{{text}}</span>
        </el-form-item>
        <el-form-item label="Name: ">
          <el-input v-model="name"></el-input>
        </el-form-item>
        <el-form-item label="Context: ">
          <el-select v-model="context" placeholder="请选择">
            <el-option
              v-for="item in contextOptions"
              :key="item.name"
              :label="item.name"
              :value="item.name">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="taskDialog = false">取 消</el-button>
        <el-button type="primary" @click="create">创建</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import G6Editor from '@antv/g6-editor';
import G6 from '@antv/g6'
import '@antv/g6/build/plugin.layout.dagre'
import Bus from '../common/Bus';
import { toFloGraph, toG6Graph } from '../common/Convertor';
import axios from 'axios';

const dagre = new G6.Layouts.Dagre();

export default {
  name: 'page',
  props: {
    editor: { required: true }
  },
  data () {
    return {
      flow: null,
      text: '',
      layout: false,
      name: '',
      taskDialog: false,
      contextOptions: [],
      context: ''
    }
  },
  async created () {
    let response = await axios.get('/ssa/flow/contexts.do');
    this.contextOptions = response.data.data;
  },
  mounted () {
    this.flow = new G6Editor.Flow({
      graph: {
        container: this.$refs.page,
        layout: dagre
      },
    });
    this.editor.add(this.flow);
    // this.flow.read('<log --path=12 || log>')
    // this.flow.read({"nodes":[{"v-06888fea":"","shape":"card","type":"node","color":"#1890FF","label":"time","size":"170*46","x":254,"y":103.00000000000003,"id":"66a30156","index":0},{"v-06888fea":"","shape":"card","type":"node","color":"#1890FF","label":"time","size":"170*46","x":255,"y":336.39516129032256,"id":"d654ae46","index":3},{"v-06888fea":"","shape":"card","type":"node","color":"#1890FF","label":"log","size":"170*46","x":253.5,"y":235.00000000000003,"id":"e1c90c42","index":4}],"edges":[{"source":"66a30156","target":"e1c90c42"},{"source":"e1c90c42","target":"d654ae46"}]})
    Bus.$on('save', () => {
      // const result = this.flow.save();
      // axios.post("/tools/convertTaskGraphToText", toFloGraph(result)).then(response => {
      //   this.text = response.data.dsl;
      //   localStorage.setItem('result', this.text)
      // }, error => {
      //   this.text = error.response.data[0].message;
      // })
      this.convertDsl();
      this.taskDialog = true
    })
    Bus.$on('taskPropsComplete', () => {
      // 默认的数据
      // let dsl = localStorage.getItem('result');
      // if (dsl) {
      //   // this.flow.read(JSON.parse(record))
      //   this.text = dsl;
      //   axios.post("/tools/parseTaskTextToGraph", {dsl: dsl, name: "unknown"}).then(response => {
      //     this.flow.read(toG6Graph(response.data.graph));
      //     this.flow.getGraph().changeLayout(null)
      //   }, error => {
      //     console.log('error');
      //   })
      // } else {
      //   this.flow.getGraph().changeLayout(null)
      // }
    })
    this.flow.getGraph().changeLayout(null)
  },
  methods: {
    changeLayout () {
      this.layout = !this.layout;
      this.flow.getGraph().changeLayout(this.layout ? dagre : null);
    },
    convertDsl () {
      const result = this.flow.save();
      if (result.nodes && result.edges) {
        axios.post("/tools/convertTaskGraphToText", toFloGraph(result)).then(response => {
          this.text = response.data.dsl;
          localStorage.setItem('result', this.text)
        }, error => {
          this.text = error.response.data[0].message;
        })
      }
    },
    async create () {
      if (!this.text) {
        this.$message({ message: '请先进行流程编辑！', type: 'warning' });
        return;
      }
      if (this.name && this.context) {
        let params = `/tasks/definitions?definition=${this.text}&name=${this.name}`;
        await axios.post(encodeURI(params));
      } else {
        this.$message({ message: '数据填写完成！', type: 'warning' });
      }
    }
  }
}
</script>

<style scoped>
.page{
  width: 100%;
  height: 100%;
  margin-left: 200px; 
  margin-right: 200px;
  position: relative;
}
.page .content {
  width: 100%;
  height: 100%;
}
.page .result{
  position: absolute;
  height: 50px;
  bottom: 0;
  width: 100%;
}
.page .control {
  position: absolute;
  top: 60px;
  right: 100px;
}
.page .control span {
  padding: 5px 10px;
  border: 1px solid #dddddd;
  cursor: pointer;
}
.page .control span.checked {
  background: #1890FF;
  color: white;
}
</style>
