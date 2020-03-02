<template>
<div>
  <div style="height: 974px; background:url(/static/static_web/images/big-GDNX-mapbg.png) no-repeat 46% 12px">
    <e-charts :options="option" auto-resize @click="showDetail"></e-charts>
  </div>
  <el-dialog title="详情" :visible.sync="dialogVisible" class="dialog-GDNX" @click="showDetail">
    <template>
      <el-table :data="tableData" style="width: 100%"
        class="blue-table">
        <el-table-column prop="alarmType" label="攻击类型" align="center">
        </el-table-column>
        <el-table-column prop="alarmGrade" label="风险级别" align="center">
          <template scope="scope">
            <span v-if="scope.row.alarmGrade==='高危'" class="circle-high">{{scope.row.alarmGrade}}</span>
            <span v-if="scope.row.alarmGrade==='中危'" class="circle-medium">{{scope.row.alarmGrade}}</span>
            <span v-if="scope.row.alarmGrade==='低危'" class="circle-low">{{scope.row.alarmGrade}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="srcIp" label="源IP" align="center">
        </el-table-column>
        <el-table-column prop="country" label="源地址" align="center">
        </el-table-column>
        <el-table-column prop="dstOrg" label="目的单位" align="center">
        </el-table-column>
        <el-table-column prop="alarmTime" label="告警时间" align="center">
        </el-table-column>
        <el-table-column prop="alarmSum" label="攻击次数" align="center">
        </el-table-column>
    </el-table>
    </template>
    <div class="pagelocation m-b-100">
      <el-pagination class="pagination" @current-change="handleCurrentChange" :page-size="pageSize" :current-page="pageIndex" layout="total, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
  </el-dialog>
</div>
</template>

<script type="text/javascript">
import ECharts from "components/vue-echarts/ECharts.vue"
import {
  worldmap
} from "../ChartsOption.js";
import {
  geoWorldMap
} from "static/static_web/js/echarts/longladata.js"

export default {
  components: {
    ECharts
  },
  data() {
    return {
      option: worldmap,
      dialogVisible: false,
      countyName: '',
      tableData: [],
      total: 0,
      loading: false,
      pageSize: 10,
      pageIndex: 1,
    };
  },
  mounted() {
    this.initCountryAttack();
    window.fetchData.push(this.initCountryAttack)
  },
  watch: {
    pageIndex() {
      this.getAttackByCountry();
    }
  },
  methods: {
    //点击出弹框
    async showDetail(params) {
      //确保每次打开都在第一页
      this.pageIndex = 1;
      this.countyName = params.name;
      await this.getAttackByCountry(params);
      this.dialogVisible = true;
    },
    //获取最近时间攻击，按国家分类
    initCountryAttack() {
      const reqUrl = "/ssa/bigGznxOffshoreAttack/getAlarmGroupByCountry.do";
      this.commonAjax.req(reqUrl, null, this).then((data) => {
        data.forEach((value) => {
          let location = geoWorldMap[value.src_country_name];
          location.push(4);
          const city = {
            "name": value.src_country_name,
            "value": location,
            "symbolSize": this.getPointSize(value.sum),
            "itemStyle": {
              "normal": {
                "color": "#ff2a00"
              }
            }
          }
          worldmap.series[0].data.push(city);
        });
      });
    },
    //获取某个国家的攻击信息
    async getAttackByCountry() {
      const reqParams = {
        src_country_name: this.countyName,
        pageSize: this.pageSize,
        pageIndex: this.pageIndex
      };
      const reqUrl = "/ssa/bigGznxOffshoreAttack/getAlarmByCountryName.do";
      await this.commonAjax.req(reqUrl, reqParams, this).then((data) => {
        this.tableData = [];
        this.total = data.total;
        data.rowData.forEach((value) => {
          const colunm = {
            country: value.src_country_name,
            alarmType: value.event_type,
            alarmGrade: value.alarmGrade,
            srcIp: value.src_ip,
            dstOrg: value.org_name,
            alarmTime: value.alarm_time,
            alarmSum: value.sum
          };
          this.tableData.push(colunm);
        });
      });
    },
    //根据攻击次数划分点大小
    getPointSize(sum) {
      // 8 10 12 14 16
      if(sum <= 10) {
        return 8;
      } else if (sum > 10 && sum <= 20) {
        return 10;
      } else if (sum > 20 && sum <= 30) {
        return 12;
      } else if (sum > 30 && sum <= 40) {
        return 14;
      } else {
        return 16;
      }
    },
    //处理翻页时间
    handleCurrentChange(pageIndex) {
      this.pageIndex = pageIndex;
    }
  }
};
</script>

<style>
/**********  Table **********/

.blue-table {
  color: #fff;
  background-color: inherit;
  border: 1px solid #38417e;
  border-top: none;
}

.blue-table::after,
.blue-table::before {
  background-color: transparent;
}

.blue-table tr {
  background-color: #0d1960;
}

.blue-table td {
  border-bottom: 1px solid #0c1e7e;
}

.blue-table .el-table__header-wrapper tr th {
  border-bottom: 1px solid #0c1e7e;
  border-top: 1px solid #0c1e7e;
  background-color: #060d33;
  line-height: 50px;
}

.blue-table .el-table__header-wrapper tr th>.cell {
  background-color: #060d33;
  color: #fff;
  font-weight: 500;
}

.blue-table .el-table__row:nth-child(odd) {
  background-color: #0a144f;
}

.blue-table .el-table__body tr:hover td {
  background-color: #112172;
}


/**********  分页 **********/

.pagelocation {
  text-align: right;
  margin: 20px auto;
  line-height: 25px;
  color: #2196f3;
}

.pagination {
  display: inline-block;
}

.pagination.el-pagination .el-pager li {
  margin: 0;
  background-color: #0a144f;
  border: thin solid #2196f3;
  color: #2196f3;
  min-width: 30px;
  border-radius: 0;
}

.pagination.el-pagination .el-pager li.active {
  background-color: #409EFF;
  color: #fff;
}

.pagination.el-pagination .btn-prev,
.pagination.el-pagination .btn-next {
  margin: 0;
  background-color: #3590d2;
  border: thin solid #2196f3;
}

.pagination.el-pagination .btn-prev>i,
.pagination.el-pagination .btn-next>i {
  color: #000;
}

.pagination.el-pagination .btn-prev {
  margin-right: -1px;
}

.pagination.el-pagination .btn-next {
  margin-left: -1px;
}

.pagination>.el-pagination__sizes .el-input__inner {
  background-color: #0a144f;
  border-radius: 0;
  border: 1px solid #2196f3;
  color: #2196f3;
}
</style>
