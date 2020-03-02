<template>
  <div id="mountNode" :style="{width:width}">
    <div class="editor">
      <div class="bottom-container">
        <detail-panel :handle="handle"/>
        <!--page-->
        <page :height="height" :width="width" :data="data"/>
      </div>
    </div>
    <Flow/>
    <div class="fix-bottom-button">
      <el-button type="gray" size="medium" @click="goBack">返回</el-button>
    </div>
  </div>
</template>
<script>
  import ItemPanel from "../ItemPanel";
  import DetailPanel from "../DetailPanel";
  import Page from "../ViewPage";
  import Flow from "../Flow"
  import Editor from "../Base/Editor";
  import command from "../../command";
  import eventBus from "../../utils/eventBus";

  export default {
    name: "G6View",
    components: {
      ItemPanel,
      DetailPanel,
      Page,
      Flow
    },
    props: {
      height: {
        type: Number,
        default: document.documentElement.clientHeight-24

      },
      width: {
        type: Number,
        default: document.documentElement.clientWidth-20
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
        pbId: null,
        handle: null,
      };
    },
    methods: {
      init() {
        this.editor = new Editor();
        this.command = new command(this.editor, this.pbId, this.handle);
      },
      goBack() {
        this.$router.push({
          name : 'Context',
          params : {
            from : 'g6'
          }
        })
      },
      confirmPb() {
        eventBus.$emit("updatePb", this.pbId);
        this.goBack();
      },
    },
  };
</script>

<style scoped>
  #mountNode{
    overflow: hidden;
  }
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

  .fix-bottom-button {
    position: fixed;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    background: rgba(255, 255, 255, .7);
    padding: 10px;
    z-index: 10;
  }
</style>
