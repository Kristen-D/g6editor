<template>
  <div class="page">
    <div class="content" ref="page"></div>
    <!-- <div class="result">
      <el-input
        type="textarea"
        readonly
        placeholder="definitions"
        v-model="form.dsltext">
      </el-input>
    </div> -->
    <div class="control">
      <!-- <span @click="convertDsl" class="checked">转换DSL</span> -->
      <span @click="changeLayout" :class="{'checked': layout}">layout</span>
    </div>
  </div>
</template>

<script>
import G6Editor from '@antv/g6-editor';
import G6 from '@antv/g6'
import '@antv/g6/build/plugin.layout.dagre'

const dagre = new G6.Layouts.Dagre({rankdir: 'LR'});
const CONTROL_LABELS = ["START", "END", "SYNC"]

export default {
  name: 'page',
  props: {
    editor: { required: true }
  },
  data () {
    return {
      flow: null,
      layout: false,
    }
  },
  async mounted () {
    this.flow = new G6Editor.Flow({
      graph: {
        container: this.$refs.page,
        layout: dagre,
        item: 'center'
      },
    });
    this.editor.add(this.flow);
  },
  methods: {
    changeLayout () {
      this.layout = !this.layout;
      this.flow.getGraph().changeLayout(this.layout ? dagre : null);
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
  background: white;
}
.page .content {
  width: 100%;
  height: 100%;
}
.page .result{
  position: absolute;
  height: 100px;
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

<style lang="">
.page .result textarea {
  height: 100px;
}
</style>