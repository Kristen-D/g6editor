<template>
<div class="">
  <!-- {{checkList}} {{tableId}} -->
  <el-table :data="defConf.tableData" style="width: 100%" @expand="openExpand">
    <el-table-column type="expand">
      <template scope="props">

        <div :id="props.row.alarm_id" style="height:200px;width:100%;" class="grid-content bg-purple"></div>
</template>
      </el-table-column>

    <el-table-column  label="告警内容"  prop="alarm_desc" align="center" show-overflow-tooltip>
      <template scope="scope">
<el-button type="text">
  {{scope.row.alarm_desc}}</el-button>
</template>
    </el-table-column>
    <el-table-column label="风险等级"  prop="alarm_gradename" align="center" >
    </el-table-column>
    <el-table-column label="告警类型"  prop="alarm_type_name" align="center">
    </el-table-column>
    <el-table-column label="关联结果"  prop="correlation" align="center">
    </el-table-column>
    <el-table-column label="是否阻拦"  prop="action" align="center" width="100px;">
    </el-table-column>
	<el-table-column label="源IP"  prop="src_ip" align="center" >
    </el-table-column>
    <el-table-column label="目标IP"  prop="dst_ip" align="center" >
    </el-table-column>
    <el-table-column label="告警时间"  prop="alarm_time" align="center" >
    </el-table-column>
    <!--
    <el-table-column label="状态"  prop="flowStatus" align="center">
    </el-table-column>

    <el-table-column label="操作" align="center" width="180"   >
<template   scope="scope">
      <div>
        <el-button v-if="scope.row.flow_status == 2" type="text"  style="color:#00a0fe; margin-right:17px;" @click="clClick(scope.row)" >处置</el-button>
        <el-button v-if="scope.row.flow_status != 2" type="text" @click="handleView(scope.row)" style="color:#00a0fe; margin-right:17px;">查看</el-button>
      </div>

    </template>
</el-table-column>
  -->
    <div slot="empty">
      <div class="" v-if="(!defConf.tableData || defConf.tableData.length === 0) && 'loaded' === defConf.loading">
        <i class="el-icon-document"></i> 没有相关数据！
      </div>

      <div class="" v-if="'wrong' === defConf.loading">
        <i class="el-icon-warning"></i> 数据加载错误！ 点击
        <el-button type="text" @click="refresh">刷新</el-button>
      </div>

      <div class="" v-if="'load' === defConf.loading">
        <i class="el-icon-loading"></i> 正在读取数据，请稍后...
      </div>
    </div>

  </el-table>
  <el-pagination class=" float-r page-location" @current-change="handleCurrentChange" :page-size="defConf.pageSize" :current-page="defConf.pageIndex" layout="total, prev, pager, next, jumper" :total="defConf.total">
  </el-pagination>

  <el-dialog close-on-click-modal title="事件列表" :visible.sync="myShow" width="85%" @close="myShow=false" class="dialog-panel" top="15%" >
      <detailListTable :detailListData="rowData"></detailListTable>

  </el-dialog>

  <el-dialog title="事件详情" :modal="false" width="85%"  :visible.sync="detailDialog.visible">

    <dataTotalTable :tableData="detailDialog.detailData"></dataTotalTable>
  </el-dialog>
</div>
</template>

<script>
import detailListTable from './DetailListTable'
import dataTotalTable from './DataTotalTable'
import {
  mapState
} from 'vuex'
export default {
  components: {
    dataTotalTable,
    detailListTable
  },
  computed: {
    ...mapState({
      detailDialog: state => state.context.detailDialog

    })
  },
  props: ['id'],

  data() {
    return {
      rowData: [],
      myShow: false,
      defConf: {},
      links: [{
          source: '',
          target: 'TDA',
          lineStyle: {
            normal: {
              color: '#00ae4e'
            }
          }
        },
        {
          source: '',
          target: 'IDS',
          lineStyle: {
            normal: {
              color: '#00ae4e'
            }
          }
        },
        {
          source: '',
          target: 'IPS',
          lineStyle: {
            normal: {
              color: '#ff8400'
            }
          }
        },
        {
          source: 'IPS',
          target: 'WAF',
          lineStyle: {
            normal: {
              color: '#ff8400'
            }
          }
        },
        {
          source: 'WAF',
          target: '',
          lineStyle: {
            normal: {
              color: '#ff8400'
            }
          }
        },
      ],
      associativeData: [{
          name: '',
          symbolSize: 60,
          label: {
            normal: {
              position: 'top'
            }
          },
          x: 300,
          y: 200,
          fixed: true,
          symbol: 'image:///static/images/source.png',
          itemStyle: {
            normal: {
              color: '#ff8400'
            }
          }
        },
        {
          solrId: '',
          name: 'TDA',
          x: 500,
          y: 100,
          fixed: true,
          itemStyle: {
            normal: {
              color: ''
            }
          }
        },
        {
          solrId: '',
          name: 'IDS',
          x: 500,
          y: 200,
          fixed: true,
          itemStyle: {
            normal: {
              color: ''
            }
          }
        },
        {
          solrId: '',
          name: 'IPS',
          x: 500,
          y: 300,
          fixed: true,
          itemStyle: {
            normal: {
              color: '',
              borderColor: '#ffe3c4',
              borderWidth: 2
            }
          }
        },
        {
          solrId: '',
          name: 'WAF',
          x: 700,
          y: 300,
          fixed: true,
          itemStyle: {
            normal: {
              color: '',
              borderColor: '#ffe3c4',
              borderWidth: 2
            }
          }
        },
        {
          name: '',
          label: {
            normal: {
              position: 'top'
            }
          },
          x: 900,
          y: 300,
          fixed: true,
          symbol: 'image:///static/images/target.png',
          itemStyle: {
            normal: {
              color: '#ff8400'
            }
          }
        }
      ]

    }
  },
  methods: {
    refresh() {
      this.$store.dispatch('reloadTable', this.id);
    },
    filterType(value, row) {
      return row.type === value;
    },
    //默认的方法,基本无需修改
    handleEdit(i, row) {
      row.tableId = this.id;
      row.assetOrg = (row.assetOrg + '').split(',');
      row.handle = 'update';
      this.$router.push({
        name: 'assetInfoForm',
        params: row
      })
      // this.$store.dispatch('handleEdit', [this.id, i, row]);
    },

    //处理翻页时候的事件
    handleCurrentChange(pageIndex) {
      this.$store.dispatch('handleCurrentChange', [this.id, pageIndex]);
    },
    //处理排序时候的事件
    handleSortChange(val) {
      this.$store.dispatch('handleSortChange', [this.id, val]);
    },
    openExpand(row) {
      this.links[0].source = row.src_ip;
      this.links[1].source = row.src_ip;
      this.links[2].source = row.src_ip;
      this.links[4].target = row.dst_ip;

      this.associativeData[0].name = row.src_ip;
      this.associativeData[5].name = row.dst_ip;

      var color0 = row.tda != null ? "#ff8400" : "#999999";
      var color1 = row.ids != null ? "#ff8400" : "#999999";
      var color2 = row.ips != null ? "#ff8400" : "#999999";
      var color3 = row.waf != null ? "#ff8400" : "#999999";
      var color4 = row.waf != null && row.dst_ip != null ? "#ff8400" : "#999999";

      this.associativeData[1].itemStyle.normal.color = color0;
      this.associativeData[2].itemStyle.normal.color = color1;
      this.associativeData[3].itemStyle.normal.color = color2;
      this.associativeData[4].itemStyle.normal.color = color3;
      this.associativeData[5].itemStyle.normal.color = color4;

      this.associativeData[1].solrId = row.tda;
      this.associativeData[2].solrId = row.ids;
      this.associativeData[3].solrId = row.ips;
      this.associativeData[4].solrId = row.waf;

      this.links[0].lineStyle.normal.color = color0;
      this.links[1].lineStyle.normal.color = color1;
      this.links[2].lineStyle.normal.color = color2;
      this.links[3].lineStyle.normal.color = color3;
      this.links[4].lineStyle.normal.color = color4;





      var vm = this;
      Vue.nextTick(function() {
        vm.loadGraph(row.alarm_id);
      })
    },
    loadGraph(id) {
      var option = {
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        series: [{
          type: 'graph',
          layout: 'none',
          symbolSize: 30,
          roam: true,
          label: {
            normal: {
              show: true
            }
          },
          edgeSymbol: ['circle', 'arrow'],
          edgeSymbolSize: [4, 10],
          edgeLabel: {
            normal: {
              textStyle: {
                fontSize: 20
              }
            }
          },
          data: this.associativeData,

          links: this.links,
          lineStyle: {
            normal: {
              opacity: 0.9,
              width: 2,
              curveness: 0
            }
          }
        }]
      };

      var myChart = echarts.init(document.getElementById(id));
      var vm = this;
      myChart.on('click', function(params) {

        vm.showDetail(params.data);

      });
      myChart.setOption(option);
      window.addEventListener("resize", myChart.resize);


    },

    async showDetail(row) {
      if (row.solrId == null || row.solrId == "") {
        return;
      } else {
        var param = {};

        param.event_id = "(" + row.solrId.split(',').join(' , ') + ")";
        await this.common.req("/ssa/alarmInfoList/getSolrQuery.do", param, this).then(result => {
          this.rowData = result.rowData;
          this.myShow = true;
        });

      }
    },

    handleView(row) {
      //alert(row.alarm_id);
      row.tkey = "alarmView";
      this.$router.push({
        name: 'AlarmHiTaskDetail',
        params: row
      });
    },

    clClick(row) {
      row.tkey = "clInfoForm";
      row.alarmIds = row.alarm_id;
      this.$router.push({
        name: "alarmInfoForm",
        params: row
      });
    }
  },
  created: function() {
    var defConf = {
      total: 0,
      loading: false,
      tableData: [],
      pageSize: 10,
      pageIndex: 1,
      editRowIndex: -1,
      editRowTemp: {},
      multipleSelection: [],
      //默认ajax属性
      tableUrl: "/ssa/associativeAnalysis/getAssociativeAnalysis.do",
      params: {}

    };
    this.$store.commit('registerConf', [this.id, defConf]);
    this.defConf = this.$store.state.editTable[this.id];
    this.$store.dispatch('reloadTable', this.id);
  }

}
</script>

<style>

</style>
