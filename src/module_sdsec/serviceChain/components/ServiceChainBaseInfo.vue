<!--服务链详情-基本信息页-->
<template>
  <div>
      <div class="container-fluid">
        <div class="el-pabel-heading flexBetween">
          <label class="el-panel-title2">基本详情</label>
        </div>

        <div class="el-panel-body" id="detail">
          <el-form :model="serviceChainBase" label-width="120px" label-position="right" class="flexStart custom-form">
          <el-form-item label="名称：">
            <label>{{serviceChainBase.name}}</label>
          </el-form-item>
          <el-form-item label = "所属租户：" >
            <!--             演示临时改下 -->
<!--            <label>总部</label>-->
            <label>{{serviceChainBase.tenantId}}</label>
          </el-form-item>
          <el-form-item label = "创建者：">
            <label>{{serviceChainBase.createrId}}</label>
          </el-form-item>
          <el-form-item label = "更新者：">
            <label>{{serviceChainBase.updaterId}}</label>
          </el-form-item>
          <el-form-item label = "服务链状态：" >
            <label v-if="serviceChainBase.state =='Configured-not-yet'">未配置策略</label>
            <label v-if="serviceChainBase.state =='Configure-success'">配置策略成功</label>
            <label v-if="serviceChainBase.state =='Configuring'">配置策略中</label>
            <label v-if="serviceChainBase.state =='Configure-fail'">配置策略失败</label>
            <label v-if="serviceChainBase.state =='Configure-clear'">配置已重载</label>
          </el-form-item>
        </el-form>
<!--        <el-form  label-width="120px" label-position="right" >-->
<!--        </el-form>-->
      </div>
      </div>

    <div class="container-fluid">
      <div class="el-panel-heading flexBetween">
        <label class="el-panel-title2">服务链拓扑展示</label>
      </div>

      <div id="mountNode" style="z-index: 99;margin-left: 20%;margin-right: 20%"></div>
    </div>

      <div class="container-fluid">
        <div class="el-panel-heading flexBetween">
          <label class="el-panel-title2">服务链详情</label>
          <div>
          <el-button type="primary" size="mini" @click="dialogTableVisible = true">新增节点</el-button>
          <el-button type="primary" size="mini" style="float: right" @click="save" >保存</el-button>
          </div>
        </div>
        <el-dialog title="新增节点" :visible.sync="dialogTableVisible">
          <el-table :id = "tableId" :data="product.respoolBase" tooltip-effect="dark"
                    style="width: 100%" height="390" @selection-change="handleSelection">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column label="资源名称" align="center">
              <template slot-scope="scope">{{ scope.row.name }}</template>
            </el-table-column>
<!--            <el-table-column label="资源类型" align="center">-->
<!--              <template slot-scope="scope">{{resType(scope.row.resourceType)}}</template>-->
<!--            </el-table-column>-->
<!--            <el-table-column label="IP地址" align="center">-->
<!--              <template slot-scope="scope">{{ scope.row.ip }}</template>-->
<!--            </el-table-column>-->
            <el-table-column label="创建时间" align="center">
              <template slot-scope="scope">{{ dateTimeFormat(scope.row.createTime) }}</template>
            </el-table-column>
            <el-table-column label="创建时间" align="center">
              <template slot-scope="scope">{{ dateTimeFormat(scope.row.updateTime) }}</template>
            </el-table-column>
          </el-table>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogTableVisible = false">取 消</el-button>
            <el-button type="primary" @click="handlerOk()">确定</el-button>
          </div>
        </el-dialog>

        <div class = "el-panel-body" id = "nodeDetail">
          <el-table
            :id = "tableId"
            :data="serviceChainBase.nodeList"
            row-key="id"
            style="width: 100%" stripe
            v-loading = "serviceChainBase.load"
           >
<!--            @sort-change="handleSortChange"-->

          <el-table-column label="节点顺序" type="index" :index="this.indexStartNum" align="center">
                      </el-table-column>
<!--          <el-table-column label="节点顺序" align="center">-->
<!--          </el-table-column>-->
          <el-table-column label="节点资源名"  prop = "name" align="center">
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column label="节点资源类型"  align="center">
            <template slot-scope="scope"> {{resType(scope.row.types)}} </template>
          </el-table-column>
<!--          <el-table-column label="节点资源IP" prop = "ip" align="center">-->
<!--            <template slot-scope="scope">{{ scope.row.ip }}</template>-->
<!--          </el-table-column>-->
          <el-table-column label="节点开通时间" prop = "createTime" align="center">
            <template slot-scope="scope">
            {{dateTimeFormat(scope.row.createTime)}}
            </template>
          </el-table-column>
<!--            <el-table-column label="节点更新时间" prop = "updateTime" align="center">-->
<!--              <template slot-scope="scope">-->
<!--                {{dateTimeFormat(scope.row.updateTime)}}-->
<!--              </template>-->
<!--            </el-table-column>-->
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button size="mini" :disabled="scope.$index === 0" @click="moveUpRow(scope.$index, scope.row)"><i class="el-icon-arrow-up"></i> </el-button>
                <el-button size="mini" :disabled = "scope.$index === (serviceChainBase.nodeList.length-1)" @click="moveDownRow(scope.$index, scope.row)"><i class="el-icon-arrow-down"></i></el-button>
                <el-button size="mini"  @click.native.prevent="deleteRow(scope.$index, serviceChainBase.nodeList)"><i class="el-icon-delete"></i></el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>



  </div>
</template>

<script>
    import {TimeFormat} from 'static/sdsec/js/sdsec/myCommonMethods'

    export default {
        props: ["detail", "nodeDetail", "mountNode","tableId"],
        data() {
            return {
                dialogTableVisible: false,
                indexStartNum: 1,
                id: this.$route.params.id,
                serviceChainBase: {
                    nodeList: []
                },
                product: {
                    respoolBase: [],
                },
                propertiesList: {},
                nodeData: {
                    nodeList:[]
                },
                finalG6Data:{
                    finalNodes:[],
                    finalEdges:[]
                },
                multiSelection:[],
            }
        },
        methods: {
            dateTimeFormat(time){
                return TimeFormat(time);
            },
            resType: function (resourceType) {
                var str = '';
                if (resourceType) {
                    if (resourceType == 'firewall') {
                        str = '防火墙';
                    } else if (resourceType == 'WAF') {
                        str = 'WAF';
                    }
                }
                return str;
            },
            moveUpRow(index, row) {
                var that = this;
                if (index > 0) {
                    let updata = that.serviceChainBase.nodeList[index - 1];
                    that.serviceChainBase.nodeList.splice(index - 1, 1);
                    that.serviceChainBase.nodeList.splice(index, 0, updata);
                } else {
                    this.$message({
                        type: 'info',
                        message: '已是第一条，不可上移！'
                    });
                }
            },
            moveDownRow(index, row) {
                var that = this;
                if ((index + 1) === that.serviceChainBase.nodeList.length) {
                    this.$message({
                        type: 'info',
                        message: '已是最后一条，不可下移！'
                    });
                } else {
                    let downdata = that.serviceChainBase.nodeList[index + 1];
                    that.serviceChainBase.nodeList.splice(index + 1, 1);
                    that.serviceChainBase.nodeList.splice(index, 0, downdata);
                }
            },
            deleteRow(index, rows) {
                this.$confirm('此操作将删除选中条目，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    rows.splice(index, 1);
                    rows.deleted = 1;
                    return rows.deleted;
                })
            },
            handleSelection(val) {
                this.multiSelection = val;
                console.log('this.multiSelection',this.multiSelection)
                return this.multiSelection;
            },
            handlerOk() {
                this.dialogTableVisible = false;
                let arr = [];
                for(let i = 0; i<this.multiSelection.length; i ++) {
                    let data = {};
                    data = this.multiSelection[i].id;
                    let resource = {
                        'resourceId': data,
                        // 'resourceType': this.multiSelection[i].resourceType,
                        'name': this.multiSelection[i].name,
                        // 'ip': this.multiSelection[i].ip,
                        'createTime': this.multiSelection[i].createTime,
                    };
                    if (this.serviceChainBase.nodeList == null) {
                        arr.push(resource);
                        this.serviceChainBase.nodeList = arr;
                    } else {
                        this.serviceChainBase.nodeList.push(resource)
                    }
                }
                return this.serviceChainBase.nodeList;
            },
            save: async function () {
                var params = {};
                params = this.serviceChainBase;
                var ChainNodeData = await this.utils.reqObjBackState('/sdsec/web/serchain/servicechain/deployServiceChain', params);
                if (ChainNodeData) {
                    this.$message({message: "Success", type: 'success'});
                } else {
                    this.$message({message: "Fail", type: 'error'});
                }
                // graph.clear();
                graph.destroy();
                this.initG6();
            },
          async initG6() {
            const width = document.getElementById('mountNode').scrollWidth;
            const height = document.getElementById('mountNode').scrollHeight || 400;
            // console.log(width)
            // console.log(height)
            const grid = new Grid();
            const graph = new G6.Graph({
              container: 'mountNode', // 指定挂载容器
              // width,// 图的宽度
              // height,  // 图的高度
              width: 800,
              height: 400,
              renderer: 'svg',
              plugins: [grid],
              animate: true,
              fitView: true, //设置是否将图适配到画布中
              fitViewPadding: [20, 50, 20, 50], //画布上四周的留白宽度。fitView 为 true 时生效。图适应画布时，指定四周的留白。
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
                shape: 'line',
                color: '#3CB66E',
                style: {
                  lineWidth: 2
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
            });

            G6.registerEdge('circle-running-line', {
              afterDraw(cfg, group) {
                const shape = group.get('children')[0];
                const startPoint = shape.getPoint(0);
                // 添加红色圆点
                const circle = group.addShape('circle', {
                  attrs: {
                    x: startPoint.x,
                    y: startPoint.y,
                    fill: '#3CB66E',
                    r: 1
                  }
                });

                // 对红色圆点添加动画
                circle.animate({
                  repeat: true,
                  onFrame(ratio) {
                    const tmpPoint = shape.getPoint(ratio);
                    return {
                      x: tmpPoint.x,
                      y: tmpPoint.y
                    };
                  }
                }, 3000);
              }
            }, 'line');

            // 获取接口数据
            await this.utils.reqObjBackState('/sdsec/web/serchain/servicechain/getServiceChain', {'id': this.id}).then(data => {
              this.nodeData = data.data.nodeList;
            });
            // console.log('nodeData',this.nodeData)
            // 处理数据
            const finalG6Data = {
              nodes: [],
              edges: [],
              // groups: [{
              //     id: 'chain',
              // }],
            };
            let finalNodes = finalG6Data.nodes;
            let finalEdges = finalG6Data.edges;


            // console.log('nodeData',this.nodeData.length)

            for (let i = 0; i <this.nodeData.length - 1; i++) {
              let oneEdges = {};
              oneEdges.source = this.nodeData[i].id;
              oneEdges.target = this.nodeData[i + 1].id;
              finalEdges.push(oneEdges);
            }
            // console.log('finalEdges',finalEdges)

            for (let i = 0; i < this.nodeData.length; i++) {
              let oneNode = {};
              oneNode.id = this.nodeData[i].id;
              oneNode.label = this.nodeData[i].name;
              if (this.nodeData[i].resourceType === 'firewall') {
                oneNode.img = '/static/sdsec/image/graphFirewall.png'
              } else if (this.nodeData[i].resourceType === 'WAF') {
                oneNode.img = '/static/sdsec/image/graphWaf.png'
              } else {
                oneNode.img = '/static/sdsec/image/serChain.png'
              }
              // oneNode.groupId = 'chain';
              finalNodes.push(oneNode);
            }

            //固定点
            const fixData = {
              nodes: [
                {
                  id: 'start',
                  shape: 'image',
                  img: '/static/sdsec/image/graphUser.png',
                  label: '',
                },
                {
                  id: 'end',
                  shape: 'image',
                  img: '/static/sdsec/image/graphService.png',
                  label: '',
                },
              ],
              edges: [{
                source: 'start',  // 起始点 id
                target: this.nodeData[0].id,   // 目标点 id

              },
                {
                  source: this.nodeData[this.nodeData.length - 1].id,  // 起始点 id
                  // source: this.nodeData[-1].id,  // 起始点 id
                  target: 'end', // 目标点 id
                  // target:  'start' , // 目标点 id
                  // shape:'cubic-horizontal'

                }]
            };

            for (let i = 0; i < fixData.nodes.length; i++) {
              let oneFixData = {};
              oneFixData.nodes = fixData.nodes[i];
              finalNodes.push(oneFixData.nodes);
            }
            for (let i = 0; i < fixData.edges.length; i++) {
              let oneFixEdges = {};
              oneFixEdges.edges = fixData.edges[i];
              finalEdges.push(oneFixEdges.edges);
            }

            // // 加载图
            graph.data(finalG6Data);
            // // console.log('finalG6Data',finalG6Data)
            // // 渲染图
            graph.render();

            // 更新数据源，根据新的数据重新渲染视图
            graph.changeData(finalG6Data);

            //todo 之后改善，不能用那么多for循环
            //样式，层级关系(节点分组)

          },

        },
            created: async function () {
                //服务链详情列表数据
                var serviceChainBase = await this.utils.reqObjBackState('/sdsec/web/serchain/servicechain/getServiceChain', {'id': this.id});
                this.serviceChainBase = serviceChainBase.data;
                console.log('this.serviceChainBase',this.serviceChainBase)
                //新增节点弹框列表数据
                var respoolBase = await this.utils.reqObjBackState('/sdsec/web/securitypool/securityservice/querySecurityService', {});
                this.product.respoolBase = respoolBase.data;
                console.log('this.product.respoolBase',this.product.respoolBase)

            },
            mounted: async function () {
                this.initG6();
            }
    }

</script>

<style>
  .el-collapse-heading{padding: 0 15px;}
  .el-collapse-heading h4{display: inline-block;}
  .el-collapse-heading label{padding-left: 5px;color:#999;font-size: 12px;line-height: 14px;}
  .el-collapse-heading label span{color:#f00;padding-right: 3px;}
  .custom-inputwidth{width: 16.48% !important}
  .custom-width{width: 70%;}
  .addbutton{padding-right: 20px !important;line-height: 40px;}

  .custom-collapse.el-collapse{border-top: none;}
  .custom-collapse .el-collapse-item__header, .custom-collapse .el-collapse-item__wrap{border-bottom: none;}
  .custom-collapse .el-collapse-item__content{padding-bottom: 0;}
  .custom-collapse .el-collapse-item.is-active .el-collapse-item__header{border-bottom: 1px solid #ebeef5;}
  .custom-form.el-form .el-form-item{width: calc(100%/3);}
  .custom-form{flex-wrap: wrap;}
  #detail  .el-form-item__label{ float: left;}
  #attrDiv  .el-form-item__label{ float: left; }

</style>
