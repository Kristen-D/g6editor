<template>
  <div class="contextmenu" ref="contextmenu">
    <div data-status="node-selected" class="menu">
      <div data-command="copy" class="command">
        <span>复制</span>
        <span>copy</span>
      </div>
      <div data-command="delete" class="command">
        <span>删除</span>
        <span>delete</span>
      </div>
      <div data-command="props" class="command">
        <span>属性</span>
        <span>props</span>
      </div>
    </div>
    <div data-status="edge-selected" class="menu">
      <div data-command="delete" class="command">
        <span>删除</span>
        <span>delete</span>
      </div>
    </div>
    <div data-status="group-selected" class="menu">
      <div data-command="copy" class="command">
        <span>复制</span>
        <span>copy</span>
      </div>
      <div data-command="delete" class="command">
        <span>删除</span>
        <span>delete</span>
      </div>
      <div data-command="unGroup" class="command">
        <span>解组</span>
        <span>unGroup</span>
      </div>
    </div>
    <div data-status="canvas-selected" class="menu">
      <div data-command="undo" class="command">
        <span>撤销</span>
        <span>undo</span>
      </div>
      <div data-command="redo" class="command">
        <span>重做</span>
        <span>redo</span>
      </div>
      <div data-command="pasteHere" class="command">
        <span>粘贴</span>
        <span>pasteHere</span>
      </div>
    </div>
    <div data-status="multi-selected" class="menu">
      <div data-command="copy" class="command">
        <span>复制</span>
        <span>copy</span>
      </div>
      <div data-command="paste" class="command">
        <span>粘贴</span>
        <span>paste</span>
      </div>
      <div data-command="addGroup" class="command">
        <span>归组</span>
        <span>addGroup</span>
      </div>
      <div data-command="delete" class="command">
        <span>删除</span>
        <span>delete</span>
      </div>
    </div>
  </div>
</template>

<script>
import G6Editor from '@antv/g6-editor';
import Bus from '../common/Bus';

export default {
  name: 'contextmenu',
  props: {
    editor: { required: true }
  },
  mounted () {
    G6Editor.Command.registerCommand('props', {
      enable () {
        return true;
      },
      execute(e) {
        Bus.$emit('props', e);
      },
      back() {

      }
    })
    this.editor.add(new G6Editor.Contextmenu({
      container: this.$refs.contextmenu,
    }));
  }
}
</script>

<style>
.contextmenu{
  margin: 0px;
  width: 200px;
  background: white;
  box-shadow: 0px 1px 4px rgba(0,0,0,0.25);
  color: #000;
  font-size: 12px;
  display: none;
}
.contextmenu .menu {
  background: white;
}
.contextmenu .disable{
  color: rgba(0,0,0,0.25);
}
.contextmenu .command{
  height: 12px;
  padding: 8px;
  box-sizing: content-box; 
}
.contextmenu .command:hover{
  cursor: pointer;
  background: #E6F7FF;
}
.contextmenu .command.disable:hover{
  cursor: default;
  background: none;
}
.contextmenu span:nth-of-type(1){
  float: left;
}
.contextmenu span:nth-of-type(2){
  float: right;
}
</style>

