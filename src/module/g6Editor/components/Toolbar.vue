<template>
  <div class="toolbar" ref="toolbar">
    <el-button style="float: left; margin-left: 10px;" size="mini" type="primary" @click="back">后退</el-button>
    <div style="float:left;">
      <link rel="stylesheet" type="text/css" href="//at.alicdn.com/t/font_598462_3xve1872wizzolxr.css" />
      <i data-command="undo" class="command iconfont icon-undo" title="撤销"></i>
      <i data-command="redo" class="command iconfont icon-redo" title="重做"></i>
      <span class="separator"></span>
      <i data-command="copy" class="command iconfont icon-copy-o" title="复制"></i>
      <i data-command="paste" class="command iconfont icon-paster-o" title="粘贴"></i>
      <i data-command="delete" class="command iconfont icon-delete-o" title="删除"></i>
      <span class="separator"></span>
      <i data-command="zoomIn" class="command iconfont icon-zoom-in-o" title="放大"></i>
      <i data-command="zoomOut" class="command iconfont icon-zoom-out-o" title="缩小"></i>
      <i data-command="autoZoom" class="command iconfont icon-fit" title="适应画布"></i>
      <i data-command="resetZoom" class="command iconfont icon-actual-size-o" title="实际尺寸"></i>
      <span class="separator"></span>
      <i data-command="toBack" class="command iconfont icon-to-back disabled" title="层级后置"></i>
      <i data-command="toFront" class="command iconfont icon-to-front" title="层级前置"></i>
      <span class="separator"></span>
      <i data-command="multiSelect" class="command iconfont icon-select" title="多选"></i>
      <i data-command="addGroup" class="command iconfont icon-group" title="成组"></i>
      <i data-command="unGroup" class="command iconfont icon-ungroup" title="解组"></i>
    </div>
    <span @click="save" class="save icon" title="保存"></span>
  </div>
</template>

<script>
import G6Editor from '@antv/g6-editor';
import Bus from '../common/Bus';

export default {
  name: 'toolbar',
  props: {
    editor: { required: true }
  },
  mounted () {
    const toolbar = new G6Editor.Toolbar({
      container: this.$refs.toolbar,
    });
    this.editor.add(toolbar);
  },
  methods: {
    save () {
      Bus.$emit('save');
    },
    back () {
      this.$confirm('信息未保存，确定后退了?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$router.back();
      })
    }
  }
}
</script>

<style scoped>
.toolbar{
  /* padding: 8px 0px; */
  padding-top: 4px;
  width: 100%;
  border: 1px solid #E9E9E9;
  background-color: white;;
  height: 42px;
  z-index: 3;
  box-shadow: 0px 8px 12px 0px rgba(0, 52, 107, 0.04);
  position: absolute;
  left: 0;
  top: 0;
}
.toolbar *::before{
  font-size: 16px !important;
}
.toolbar .disable{
  color: rgba(0,0,0,0.25);
}
.toolbar .icon-select.disable{
  background: #EEEEEE;
}
.toolbar .separator{
  margin: 4px;
  border-left: 1px solid #E9E9E9;
}
.toolbar i {
  width: 27px;
  height: 27px;
  margin: 0px 6px;
  border-radius: 2px;
  padding: 4px;
  display: inline-block;
  border: 1px solid rgba(2,2,2,0);
}
.toolbar .command:nth-of-type(1){
  margin-left: 24px;
}
.toolbar .command:hover{
  cursor: pointer;
  border: 1px solid #E9E9E9;
}
.toolbar .disable:hover{
  cursor: default;
  border: 1px solid rgba(2,2,2,0);
}
.toolbar span.icon {
  width: 20px;
  height: 20px;
  margin: 3px 6px;
  border-radius: 2px;
  display: inline-block;
  cursor: pointer;
}
.toolbar .save {
  background: url("/static/g6/icon/save.png") no-repeat;
  background-size: 100% 100%;
}
</style>

