<template>
  <div class="itempannel" ref="itempannel">
    <el-collapse v-model="active">
      <!-- <el-collapse-item title="控制组件" name="-1" v-if="flowType==0">
        <ul>
          <li class="getItem" data-shape="flow-circle" data-type="node"
            data-color="#1890FF" data-label="开始" data-size="80*80">开始</li>
          <li class="getItem" data-shape="flow-circle" data-type="node"
            data-color="#1890FF" data-label="结束" data-size="80*80">结束</li>
          <li class="getItem" data-shape="flow-circle" data-type="node"
            data-color="#1890FF" data-label="合并" data-size="80*80">合并</li>
        </ul>
      </el-collapse-item> -->
      <template v-for="(arr, i) in app">
        <el-collapse-item  :key="i + '' + i" :title="labels[i]" :name="i">
          <ul :key="i">
            <template v-for="(item) in arr">
              <li :key="item.ssaAppId" class="getItem" data-shape="card" data-type="node"
                :data-app-id="item.ssaAppId" :data-app-type="item.ssaAppType"
                :data-app-name="item.ssaAppName"
                :data-app-desc="item.description"
                :data-class-name="item.appName"
                data-color="#F2F2F2"
                data-size="150*100"
                :data-label="item.appDesc">
                {{item.appDesc}} 
              </li>
            </template>
          </ul>
        </el-collapse-item>
      </template>
    </el-collapse>
  </div>
</template>

<script>
import G6Editor from '@antv/g6-editor';
import '../common/Nodes';
import Properties from '../common/Properties'
import axios from 'axios'
import Bus from '../common/Bus'
import Api from '../common/Api';
export default {
  name: 'itempannel',
  props: {
    editor: { required: true },
    apps: { required: true },
    flowType: { required: true}
  },
  data() {
    return {
      list: [],
      labels: ['输入算子', '处理算子', '输出算子'],
      active: ['-1', 0]
    }
  },
  computed: {
    app () {
      return [
        this.apps.filter(app => app.ssaAppName === 'ssa-source'),
        this.apps.filter(app => app.ssaAppName === 'ssa-processor'),
        this.apps.filter(app => app.ssaAppName === 'ssa-sink'),
      ]
    }
  },
  mounted () {
    this.editor.add(new G6Editor.Itempannel({
      container: this.$refs.itempannel,
    }));
  }
}
</script>

<style scoped>
.itempannel{
  height: 100%;
  position: absolute;
  top: 0;
  left: 0px;
  z-index: 2;
  background: #F7F9FB;
  width: 200px;
  padding-top: 42px;
  border-right: 1px solid #E6E9ED;
  overflow: auto;
}
.itempannel img{
  width: 92px;
  height: 96px;
  padding: 4px;
  margin-left: 4px;
  border-radius: 2px;
  border: 1px solid rgba(0,0,0,0);
}
.itempannel img:hover{
  cursor: move;
  border: 1px solid #ccc;
}
.itempannel ul{
  padding: 0px;
  padding-left: 16px;
}
.itempannel li {
  border: 1px solid #CED4D9;
  border-radius: 4px;
  border-left: 2px solid #1890FF;
  margin: 5px 0;
  list-style-type: none;
  user-select: none;
  width: 160px;
  height: 30px;
  line-height: 28px;
  padding-left: 10px;
  overflow: hidden;
}
.itempannel li:hover{
  background: white;
  cursor: move;
}
.itempannel .panel-title {
  height: 32px;
  border-top: 1px solid #DCE3E8;
  border-bottom: 1px solid #DCE3E8;
  background: #EBEEF2;
  color: #000;
  line-height: 28px;
  padding-left: 12px;
}
</style>

<style>
.itempannel .el-collapse-item__header {
  line-height: 30px;
  height: 30px;
  padding-left: 15px;
}
.itempannel .el-collapse-item__arrow {
  float: left;
  line-height: 30px;
}
.itempannel .el-collapse-item__content {
  padding-bottom: 10px;
}
</style>

