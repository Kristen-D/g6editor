<template>
  <big-screen-header
    title="攻击IP排行">
    <el-row>
      <el-col :span="6">
        <div class="echartsbox6">
          <e-charts :options="topOption"></e-charts>
        </div>
        <div class="echartsbox6">
          <e-charts :options="bottomOption"></e-charts>
        </div>
      </el-col>
      <el-col :span="18">
        <div class="abnormal">
          <div class="abnormal-inner">
            <div class="echartsbox5" id="globebox">
              <e-charts :options="map"></e-charts>
            </div>
          </div>
        </div>
      </el-col>
    </el-row>

    <div class="">
      <el-table :data="alarmList"  style="width: 100%" class="blue-table" max-height='132'>
        <el-table-column prop="content"  label="告警内容" show-overflow-tooltip width="300"></el-table-column>
        <el-table-column prop="level"  label="级别" align="center" width="60">
          <template scope="scope">
            <i v-if="scope.row.level==='高危'"><span class="circle circle-high"></span></i>
            <i v-if="scope.row.level==='中危'"><span class="circle circle-medium"></span></i>
            <i v-if="scope.row.level==='低危'"><span class="circle circle-low"></span></i>
            <span>{{ scope.row.level }}</span>
          </template>
        </el-table-column>
        <el-table-column  prop="dstIp"  label="目标IP" align="center"></el-table-column>
        <el-table-column  prop="srcIp"  label="攻击源IP" align="center"></el-table-column>
        <el-table-column  prop="time"  label="时间" align="center"></el-table-column>
      </el-table>
    </div>
  </big-screen-header>
</template>

<script>
  import BigScreenHeader from "./BigScreenHeader";
  import ECharts from "../../../components/vue-echarts/ECharts";
  import {mapBottom, mapTop} from "./chartOptions";
  import {map3d, geoCoordMap} from "./chartOptions";

  const XI_NIN = [101.4038,36.8207];

  export default {
    components: {
      ECharts,
      BigScreenHeader},
    name: "global-map-container",
    data() {
      return {
        topOption: mapTop,
        bottomOption: mapBottom,
        map: map3d
      }
    },
    computed: {
      visited() {
        return this.$store.state.visited;
      },
      ips() {
        return this.$store.state.ips;
      },
      country() {
        return this.$store.state.country;
      },
      alarmList() {
        let list = this.$store.state.alarmList;
        return list.map(v => {
          return {
            content: v['alert.signature_s'],
            level: v['alert.severity_d'],
            dstIp: v['dest_ip_s'],
            srcIp: v['src_ip_s'],
            time: v['collectTime']
          }
        })
      }
    },
    watch: {
      visited(value) {
        this.topOption.yAxis.data = value.area;
        this.topOption.series[0].data = value.number;
      },
      ips(value) {
        this.bottomOption.yAxis.data = value.name;
        this.bottomOption.series[0].data = value.count;
      },
      country(value) {
        let data = [];
        value.map((v) => {
          data.push([
            XI_NIN, geoCoordMap[v.name]
          ])
        });
        this.map.series[1].data = data;
      }
    },
    created() {
      $.getJSON('/static/js/map/population.json').then(data => {
        // data.push({
        //   symbolSize: 5,
        //   itemStyle: {color: "red"},
        //   value: [-75.440806, 40.652083, 0]
        // });
        //
        // data.push({
        //   symbolSize: 5,
        //   itemStyle: {color: "red"},
        //   value: [-80.943139, 35.214]
        // })

        data = data.filter(function (dataItem) {
          return dataItem[2] > 0;
        }).map(function (dataItem) {
          return [dataItem[0], dataItem[1], Math.sqrt(dataItem[2])];
        });
        // var airSections = airports.slice(1000, 2000);
        // var airDatas = [];
        // for (var i = 0; i < airSections.length; i += 2) {
        //   airDatas.push([
        //     [airSections[i][3], airSections[i][4]],
        //     [airSections[i + 1][3], airSections[i + 1][4]]
        //   ])
        // };
        this.map.series[0].data = data;
      })
    }
  }
</script>

<style scoped>

</style>
