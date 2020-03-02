<template>
  <div id="mountNode" :style="{width:width}">
    <div class="editor" >
      <!-- <context-menu /> -->
      <!--toolbar-->
      <toolbar />
      <div style="height: 42px;"></div>
      <div class="bottom-container">
        <!--itempannel-->
        <item-panel />
        <!--detailpannel-->
        <detail-panel />
        <!--miniMap-->
        <!-- <minimap /> -->
        <!--page-->
        <page :height="height" :width="width"  :data="data" />
      </div>
    </div>
    <Flow />
     <div class="fix-bottom-button">
       <el-button type="primary" size="medium" @click="confirmPb">保存并返回</el-button>
    </div>
  </div>
</template>

<script>
import Toolbar from "../Toolbar";
import ItemPanel from "../ItemPanel";
import DetailPanel from "../DetailPanel";
// import Minimap from "../Minimap";
import Page from "../Page";
import Flow from "../Flow"
// import ContextMenu from "../ContextMenu";
import Editor from "../Base/Editor";
import command from "../../command";
import eventBus from "../../utils/eventBus";
export default {
  name: "G6Editor",
  components: {
    Toolbar,
    ItemPanel,
    DetailPanel,
    // Minimap,
    Page,
    // ContextMenu,
    Flow
  },
  props: {
    height: {
      type: Number,
      default: document.documentElement.clientHeight
    },
    width: {
      type: Number,
      default: document.documentElement.clientWidth
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  created() {
    this.handle = this.$route.params.handle;
    this.pbId = this.$route.params.pbId;
    this.init();
  },
  data() {
    return {
      editor: {},
      command: null,
      pbId : null,
      handle : null,
    };
  },
  methods: {
    init() {
      this.editor = new Editor();
      this.command = new command(this.editor,this.pbId,this.handle);
    },
      goBack(){
        this.$router.push({
          name : 'Context',
          params : {
            from : 'g6'
          }
        })
      },
      confirmPb(){
        eventBus.$emit("updatePb",this.pbId);
        this.goBack();
      },
  },
};
</script>

<style scoped>
.editor {
  position: relative;
  width: 100%;
  user-select: none;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
}
.bottom-container {
  position: relative;
}
  .fix-bottom-button{
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background: rgba(255,255,255,.7);
    padding: 10px;
    z-index: 10;
    /* position: absolute; */
    bottom: 0px;
    right:0px;
  }
</style>
