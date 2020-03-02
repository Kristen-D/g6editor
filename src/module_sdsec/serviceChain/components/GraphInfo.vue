<!--此页面暂时不用-->
<template>
  <div>
    <div class="el-panel-heading  flexBetween">
      <label class="el-panel-title">逻辑拓扑图</label>
    </div>
    <div id="mountNode"></div>
  </div>

</template>

<script>
    export default {
        name: "graphInfo",
        // props: ["mountNode"],
        data() {
            return {
                id: this.$route.params.id,
                nodeData: {
                    nodeList:[]
                },
                finalG6Data:{
                    finalNodes:[],
                    finalEdges:[]
                }

            }



        },
        methods: {
            async initG6() {
                // const width = document.getElementById('container').scrollWidth || 800
                // const height = document.getElementById('container').scrollHeight || 800;
                const graph = new G6.Graph({
                    container: 'mountNode', // 指定挂载容器
                    width: 1000, // 图的宽度
                    height: 800,  // 图的高度
                    renderer: 'svg',
                    fitView: true, //设置是否将图适配到画布中
                    fitViewPadding:20, //画布上四周的留白宽度。fitView 为 true 时生效。图适应画布时，指定四周的留白。
//                 当指定一个值时，四边的边距都相等，当指定数组时，数组内数值依次对应 上，右，下，左四边的边距。


                    defaultNode: {
                        shape: 'image',
                        size: 16,
                        label: '默认标题',
                        labelCfg: {
                            position: 'bottom',
                            style: {
                                fill: '#000', // 节点标签文字颜色
                                fontSize: 6,
                            }
                        },
                    },
                    defaultEdge: {
                        // shape: 'cubic-vertical',
                        shape:'cubic-horizontal',
                        size: 0.2,
                        // color: '#000',
                        style: {
                            lineDash: [2, 2],    // 虚线边
                            endArrow: {//箭头
                                path: 'M 6,0 L -6,-6 L -6,6 Z',
                                d: 1
                            }
                        }

                    },
                    layout: {
                        type: 'dagre',   //自动布局类型，层次布局。
                        rankdir: 'LR', // 布局的方向。'TB'：从上至下；'BT'：从下至上；'LR'：从左至右；'RL'：从右至左。
                        // align: 'DR', // 节点对齐方式。'UL'：对齐到左上角；'UR'：对齐到右上角；'DL'：对齐到左下角；'DR'：对齐到右下角。
                        nodesep: 10, // 节点间距（px）在rankdir 为 'TB' 或 'BT' 时是节点的水平间距；在rankdir 为 'LR' 或 'RL' 时代表节点的竖直方向间距
                        ranksep: 6, // 层间距（px）在rankdir 为 'TB' 或 'BT' 时是竖直方向相邻层间距；在rankdir 为 'LR' 或 'RL' 时代表水平方向相邻层间距
                        controlPoints: true // 是否保留布局连线的控制点
                    },
                    groupType: 'rect',
                    // groupStyle: {
                    //     default:{
                    //         minDis: 25
                    //     }
                    //
                    // },
                });

                // 初始化节点数据
                const nodes = [];
                // 初始化边数据
                const edges = [];
                // 获取接口数据
                await this.utils.reqObjBackState('/sdsec/web/serchain/servicechain/getServiceChain', {'id': this.id}).then(data => {
                    this.nodeData = data.data.nodeList;
                });
                // console.log('nodeData',this.nodeData)
                // 处理数据
                const finalG6Data = {
                    nodes:[],
                    edges:[],
                    groups: [{
                        id: 'chain',
                    }],
                };
                let finalNodes = finalG6Data.nodes;
                let finalEdges = finalG6Data.edges;


                // console.log('nodeData',this.nodeData.length)

                for (let i = 0; i< this.nodeData.length-1; i++) {
                    let oneEdges = {};
                    oneEdges.source = this.nodeData[i].id;
                    oneEdges.target = this.nodeData[i+1].id;
                    finalEdges.push(oneEdges);
                }
                // console.log('finalEdges',finalEdges)

                for (let i = 0; i < this.nodeData.length; i++) {
                    let oneNode={};
                    oneNode.id=this.nodeData[i].id;
                    oneNode.label=this.nodeData[i].resourceName;
                    if(this.nodeData[i].resourceType==='firewall'){
                        oneNode.img = '/static/sdsec/image/vFirewall.png'
                    }else if(this.nodeData[i].resourceType==='WAF'){
                        oneNode.img = '/static/sdsec/image/WAF.png'
                    }else{
                        oneNode.img ='/static/sdsec/image/serChain.png'
                    }
                    oneNode.groupId = 'chain';
                    finalNodes.push(oneNode);
                }

                //固定点
                const fixData = {
                    nodes: [
                        {
                            id: 'start',
                            shape: 'image',
                            img: '/static/sdsec/image/serChain.png',
                            label: 'start',
                        },
                        {
                            id: 'end',
                            shape: 'image',
                            img: '/static/sdsec/image/serChain.png',
                            label: 'end',
                        },
                    ],
                    edges: [{
                        source: 'start',  // 起始点 id
                        target: this.nodeData[0].id,   // 目标点 id
                        style: {
                            fill: '#fff',
                            endArrow: {//箭头
                                path: 'M 6,0 L -6,-6 L -6,6 Z',
                                d: 1
                            }
                        },
                    },
                        {
                            source: this.nodeData[this.nodeData.length-1].id,  // 起始点 id
                            target:  'end' , // 目标点 id
                            // target:  'start' , // 目标点 id
                            // shape:'cubic-horizontal'
                            style: {
                                fill: '#fff',
                                endArrow: {//箭头
                                    path: 'M 6,0 L -6,-6 L -6,6 Z',
                                    d: 1
                                }
                            }
                        }]
                };

                for (let i = 0; i < fixData.nodes.length; i++) {
                    let oneFixData={};
                    oneFixData.nodes = fixData.nodes[i];
                    finalNodes.push(oneFixData.nodes);
                }
                for (let i = 0; i< fixData.edges.length; i++) {
                    let oneFixEdges={};
                    oneFixEdges.edges =fixData.edges[i];
                    finalEdges.push(oneFixEdges.edges);
                }

                // 加载图
                graph.data(finalG6Data);
                // console.log('finalG6Data',finalG6Data)
                // 渲染图
                graph.render();
                // 更新数据源，根据新的数据重新渲染视图
                graph.changeData(finalG6Data)

                //todo 之后改善，不能用那么多for循环
                //样式，层级关系(节点分组)
            }
        },
        created: async function (){


        },
        mounted: async function () {
            this.initG6();
        }
    }

</script>

<style scoped>

</style>


