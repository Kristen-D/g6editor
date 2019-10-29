<template>
  <div class="itempannel" ref="itempannel">
    <div class="panel-title">必选的的开始结尾控件</div>
    <ul>
      <li class="getItem" data-shape="flow-circle" data-type="node"
        data-color="#1890FF" data-label="START" data-size="80*80">START</li>
      <li class="getItem" data-shape="flow-circle" data-type="node"
        data-color="#1890FF" data-label="END" data-size="80*80">END</li>
    </ul>
    <div class="panel-title">控制组件</div>
    <ul>
      <li class="getItem" data-shape="flow-circle" data-type="node"
        data-color="#1890FF" data-label="SYNC" data-size="80*80">SYNC</li>
    </ul>
    <div class="panel-title">算子列表</div>
    <ul>
      <template v-for="(item, i) in list">
         <li :key="i" class="getItem" data-shape="card" data-type="node" 
          data-color="#1890FF" :data-label="item.name" data-size="170*46">
          {{item.name}} 
        </li>
      </template>
    </ul>
  </div>
</template>

<script>
import G6Editor from '@antv/g6-editor';
import '../common/Nodes';
import Properties from '../common/Properties'
import axios from 'axios'
import Bus from '../common/Bus'

export default {
  name: 'itempannel',
  props: {
    editor: { required: true }
  },
  data() {
    return {
      list: []
    }
  },
  mounted () {
    this.editor.add(new G6Editor.Itempannel({
      container: this.$refs.itempannel,
    }));
  },
  async created () {
    let apps = await axios.get('/apps?page=0&size=1000');
    this.list = apps.data._embedded.appRegistrationResourceList.filter(v => v.type == 'task');
    await Properties.initTaskProps(this.list.map(v => v.name));
    Bus.$emit('taskPropsComplete')
  },
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
