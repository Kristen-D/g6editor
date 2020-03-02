<template>
  <div class="page">
    <div :id="pageId" class="graph-container" style="position: relative;z-index: 9"></div>
  </div>
</template>


<script>
  import G6 from "@antv/g6/build/g6";
  import {initBehavors} from "../../behavior";
  import Grid from "@antv/g6/build/grid";

  export default {
    data() {
      return {
        pageId: "graph-container",
        graph: null,
      };
    },
    props: {
      height: {
        type: Number,
        default: 0
      },
      width: {
        type: Number,
        default: 0
      },
      data: {
        type: Object,
        default: () => {}
      }
    },
    created() {
      initBehavors();
    },
    mounted() {
      this.$nextTick(() => {
        this.init();
      });
    },
    methods: {
      init() {
        const height = this.height
        const width = this.width
        this.graph = new G6.Graph({
          container: "graph-container",
          height: height,
          width: width,
          modes: {
            // 支持的 behavior
            default: [
              "drag-canvas",
              "zoom-canvas",
              "select-node",
              {
                type: 'tooltip',
                formatText: function formatText(model) {
                  let text = "";
                  if (model.label.length > 8) {
                    text = model.label;
                  }
                  return text;
                }
              }
            ],

            addEdge: ["add-edge"],
            moveNode: ["drag-item"],
          },

        });

        const {editor, command} = this.$parent;
        editor.emit("afterAddPage", {graph: this.graph, command});

        this.grid = new Grid();
        this.graph.addPlugin(this.grid);
        this.readData();

      },
      async readData() {
        //const data={"nodes":[{"name":"开始","label":"开始","size":["120","40"],"type":"node","x":151,"y":89,"shape":"Dot","color":"#fff","image":"https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg","outPoints":[[0.5,0],[0,0.5],[1,0.5],[0.5,1]],"offsetX":51,"offsetY":13,"id":"node2"},{"name":"结束","label":"结束","size":["120","40"],"type":"node","x":111,"y":293,"shape":"Dot","color":"#fff","image":"https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg","inPoints":[[0.5,0],[0,0.5],[1,0.5],[0.5,1]],"offsetX":60,"offsetY":17,"id":"node13"}],"edges":[{"id":"edge72","source":"node2","target":"node13","sourceId":"node2","targetId":"node13","start":{"x":0,"y":20},"end":{"x":0,"y":-20},"shape":"customEdge","type":"edge","startPoint":{"x":146.98039215686273,"y":109.5},"endPoint":{"x":115.01960784313727,"y":272.5}}],"groups":[]}
        let handle = this.$parent.command.handle;
        let pbId = this.$parent.command.pbId;
        let data = "";
        if ( handle == "view") {
          let vo = await this.utils.reqObj("/ssa/soar/playbook/getPlaybook.do", {id: pbId});
          let data1 = vo.flowXml;
          data = JSON.parse(data1);
        }

        if (data) {
          this.graph.read(data);
        }
      }
    }
  };


</script>

<style scoped>
  .page {
    background-color: #fff;
  }
</style>

