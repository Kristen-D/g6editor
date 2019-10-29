<template>
  <div class="detailpannel" ref="detailpannel">
    <div data-status="node-selected" class="pannel">
      <div class="panel-title">节点详情</div>
      <div class="block-container">
        <el-form size="mini">
          <el-form-item label="名称"><el-input readonly v-model="selectedModel.label"></el-input></el-form-item>
          <el-form-item label="描述"><el-input type="textarea" readonly v-model="selectedModel.appDesc"></el-input></el-form-item>
          <!-- <template>
            <el-form-item :label="val.key" :key="key" v-for="(val, key) in selectedModel.properties">
              <el-input v-model="selectedModel.properties[key].value"></el-input>
            </el-form-item>
          </template> -->
        </el-form>
      </div>
    </div>
    <div data-status="group-selected" class="pannel">
      <div class="panel-title">群组详情</div>
      <div class="block-container">
        group-selected
      </div>
    </div>
    <div data-status="canvas-selected" class="pannel">
      <div class="panel-title">画布</div>
      <div class="block-container">
        <el-checkbox v-model="checked" @change="check">网格对齐</el-checkbox>
      </div>
    </div>
    <div data-status="edge-selected" class="pannel">
      <div class="panel-title">边</div>
      <div class="block-container">
        <el-form size="mini" label-width="80px">
          <el-form-item label="Status"><el-input v-model="selectedModel.status"></el-input></el-form-item>
        </el-form>
      </div>
    </div>
    
  </div>
</template>

<script>
import G6Editor from '@antv/g6-editor';
import Bus from '../common/Bus';


export default {
  name: 'detailpannel',
  props: {
    editor: { required: true },
    selectedModel: {}
  },
  data() {
    return {
      checked: false,
      states: [
        {label: '开始', value: 'start'},
        {label: '暂停', value: 'pause'},
        {label: '完成', value: 'complete'}
      ]
    }
  },
  watch: {
    'selectedModel.label'() {
      this.updateGraph('label', this.selectedModel.label)
    }
  },
  mounted () {
    this.editor.add(new G6Editor.Detailpannel({
      container: this.$refs.detailpannel,
    }));
  },
  methods: {
    check () {
      const page = this.editor.getCurrentPage();
      this.checked ? page.showGrid() : page.hideGrid();
    },
    updateGraph(key, value) {
      const editor = this.editor;
      editor.executeCommand(() => {
        const page = editor.getCurrentPage();
        const selectedItems = page.getSelected();
        selectedItems.forEach(item => {
          const updateModel = {};
          updateModel[key] = value;
          page.update(item, updateModel);
        });
      });
    },
    stateChange () {
      this.updateGraph('shape', this.selectedModel.shape)
    }
  }
}
</script>

<style scoped>
.detailpannel{
  height: 100%;
  position: absolute;
  right: 0px;
  z-index: 2;
  background: #F7F9FB;
  width: 200px;
  border-left: 1px solid #E6E9ED;
  padding-top: 42px;
  overflow: auto;
  padding-bottom: 150px;
}
.detailpannel .pannel{
  display: none
}
.detailpannel .block-containe{
  padding-top: 20px;
}
.detailpannel .input{
  margin-left: 16px;
}
.detailpannel .name-input{
  width: 120px;
}
.detailpannel .width-input{
  width: 52px;
}
.detailpannel .height-input{
  width: 52px;
}
.detailpannel .block-container{
  padding: 16px 8px;
}
.panel-title{
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
  .detailpannel .el-form-item__label {
    word-break: break-all;
  }
</style>
