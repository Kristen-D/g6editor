<template>
  <div class="minimap">
    <div class="panel-title">缩略图</div>
    <div class="map" ref="minimap"></div>
  </div>
</template>

<script>
import G6Editor from '@antv/g6-editor';

export default {
  name: 'minimap',
  props: {
    editor: { required: true }
  },
  mounted () {
    this.editor.add(new G6Editor.Minimap({
      container: this.$refs.minimap,
    }));
  }
}
</script>

<style>
.minimap {
  width: 200px;
  height: 176px;
  position: absolute;
  bottom: 0px;
  right: 0px;
  z-index: 3;
  border-left: 1px solid #DCE3E8;
}
.minimap .panel-title {
  height: 32px;
  border-top: 1px solid #DCE3E8;
  border-bottom: 1px solid #DCE3E8;
  background: #EBEEF2;
  color: #000;
  line-height: 28px;
  padding-left: 12px;
}
.minimap .map {
  width: 200px;
  height: 144px;
}
</style>

