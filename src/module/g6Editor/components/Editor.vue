<template>
  <el-container>
    <toolbar :editor="editor"></toolbar>
    <page :editor="editor"></page>
    <itempannel :editor="editor"></itempannel>
    <detailpannel :editor="editor" :selectedModel="selectedModel"></detailpannel>
    <contextmenu :editor="editor"></contextmenu>
    <minimap :editor="editor"></minimap>
  </el-container>
</template>

<script>
import G6Editor from '@antv/g6-editor';
import Toolbar from './Toolbar';
import Page from './Page';
import Itempannel from './Itempannel'
import Contextmenu from './Contextmenu'
import Detailpannel from './Detailpannel'
import Minimap from './Minimap'
import Bus from '../common/Bus'
import PROPS from '../common/Properties'
import axios from 'axios'
import {toProperties} from '../common/Convertor'

// const PROPS = {
//   time: {format: ''},
//   log: {times: '', path: ''}
// }

export default {
  components: { Toolbar, Page, Itempannel, Contextmenu, Detailpannel, Minimap },
  data () {
    return {
      editor: new G6Editor(),
      selectedModel: {}
    }
  },
  mounted () {
    const pages = this.editor.getComponentsByType('page');
    pages.forEach(page => {
      page.on('afteritemselected', ev => {
        this.selectedModel = ev.item.getModel()
        let props = PROPS.get(this.selectedModel.label);
        if (!this.selectedModel.properties) {
          this.selectedModel.properties = props.map(v => {
            return {...v}
          }) || [];
        }
      });
    });
  },
  methods: {
  }
}
</script>

<style scoped>
  .toolbar i {
    width: 30px;
    height: 30px;
    display: inline-block;
  }
</style>

<style scoped>
.main{
  padding-top: 0px;
}
</style>