

<template >

<div class="el-panel-white mygrid-def">
    <div class="el-panel-white-heading">
        <h3 class="el-panel-white-title">部门视图</h3>
        <el-tabs class="float-r day-tabs" v-model="params.dateRange" @tab-click="changeTime">
            <el-tab-pane label="今天" name="day"></el-tab-pane>
            <el-tab-pane label="近7天" name="week"></el-tab-pane>
            <el-tab-pane label="近30天" name="month"></el-tab-pane>
        </el-tabs>
    </div>
    <div class="el-panel-white-body">
        <el-row :gutter="10">
            <el-col :span="14">
                <div class="el-panel-white-subtitle">重要部门受威胁TOP5</div>
                <div class="echartbox1">
                    <vchart :options="orgChartOption" @click="chartClick" auto-resize></vchart>
                </div>

            </el-col>
            <el-col :span="10">
                <div class="el-panel-white-subtitle">安全评分</div>
                <div style="margin-top: 18px; padding-left: 8px;">
                    <label style="font-size: 12px;">按分数高低排名</label>

                    <ul class="safe-mark-content">
                        <li v-for="(m, index) in orgScorelist">
                            <div>{{index+1}}</div>
                            <label>{{ m.name}}</label><span>{{m.score}}</span></li>
                    </ul>
                </div>
            </el-col>
        </el-row>
    </div>
</div>

</template>

<script>

import {
    mapState, mapActions
}
from 'vuex'
import vchart from 'components/vue-echarts/ECharts.vue'
import orgChartOption from './orgManage.js'
export default {
    components: {
        vchart
    },
    computed: {},
    mixins: [orgChartOption],
    data() {
        return {
            isOpen: false,
            currentIndex: -1,
            cacheData: [],
            params: {
                dateRange: 'month'
            },
            orgScorelist: [],
            activeName: "3",
            api: {
                getOrgEventType: "/ssa/situationAnaly/getOrgEventType.do",
                getScoreList: "/ssa/situationAnaly/getScoreList.do",
                getOrgEventTypeDetail: "/ssa/situationAnaly/getOrgEventTypeDetail.do",
            }
        }
    },

    methods: {
        changeTime(value) {
                Vue.nextTick(() => {
                    this.initData();
                })
            },
            chartClick(params) {
                let vm = this;
                let parameters = {};
                for (var item in vm.eventTypeList) {

                    if (params.seriesName == vm.eventTypeList[item].text) {
                        parameters.parentEventType_s = vm.eventTypeList[item].id;
                    }
                }
                parameters.module = 'threatDepartment_drilling';
                parameters.detailUrl = this.api.getOrgEventTypeDetail;
                parameters.time = vm.params.dateRange;
                parameters.dateRange = vm.params.dateRange;
                parameters.title = params.name;
                parameters.old_total = params.value;

                vm.$store.dispatch('getDrillColumns', [vm, parameters.title]);
                vm.$store.dispatch('loadDrillTableData');
                vm.$store.commit('openDrillDialogTable', parameters);
            },

            getChildSeriesData(dataMap, eventType, yAxis) {
                let item = dataMap[eventType];
                let data = [];
                yAxis.forEach(d => {
                    let value = item[d] ? item[d] : 0;
                    data.push(value);
                })
                let childSeries = {
                    name: eventType,
                    type: 'bar',
                    barWidth: 12,
                    stack: '总量',
                    label: {
                        normal: {
                            show: false,
                            position: 'insideRight'
                        }
                    },
                    data: data
                }

                return childSeries;

            },

            loadMapChart(data) {
                let all = data.all;
                var lenData = this.common.groupById(all, "event_type_name");

                var seriesData = [];
                var yAxis = data.orgName;
                let dataMap = this.common.fmtInsideData(all, "org_name", "event_type_name", "count");

                for (var i = 0; i < lenData.length; i++) {
                    var eventType = lenData[i];
                    var childSeries = this.getChildSeriesData(dataMap, eventType, yAxis);
                    seriesData.push(childSeries);
                }
                this.orgChartOption.legend.data = lenData;
                this.orgChartOption.yAxis.data = yAxis;
                this.orgChartOption.series = seriesData;
                //  this.orgChartOption = {...this.orgChartOption};


            },

            initData() {
                this.commonAjax.req(this.api.getOrgEventType, this.params).then(data => {
                    this.loadMapChart(data);
                })
            }

    },

    created: function() {
        this.initData();
    },
    mounted: function() {
    
        this.commonAjax.req(this.api.getScoreList, this.params).then(data => {
            this.orgScorelist = data.orgScorelist;
        })
    },
    destroy() {
        this.dispose();
    }

}

</script>
