<template>
    <div>
        <h4 class="el-panel-title"><i class="el-icon-caret-right m-r-10"></i>受攻击单位TOP</h4>
        <div style="height: 296px;">
            <e-charts :options="options" auto-resize></e-charts>
        </div>
    </div>
</template>

<script>
    import ECharts from "../../../commom/vue-echarts/ECharts.vue"
    export default {
        props: ["orgAttackTopList"],
        data() {
            return {
                options: null
            }
        },
        watch: {
            orgAttackTopList(newVal) {
                this.init(newVal)
            }
        },
        created() {
            this.init(this.orgAttackTopList)
        },
        methods: {
            init(orgAttackTopList) {
                if (orgAttackTopList == null || orgAttackTopList.length == 0) {
                    return;
                }
                let xData = [];
                let yData = [];

                for (let orgAttack of orgAttackTopList) {
                    xData.push(orgAttack.name);
                    yData.push(orgAttack.event_total_count_sum);
                }

                this.options = {
                    tooltip: { trigger: 'item' },
                    grid: {
                        top: '10%',
                        left: '6%',
                        right: '0%',
                        bottom: '10%',
                        containLabel: true,
                    },
                    xAxis: [{
                        type: 'category',
                        data: xData,
                        axisLine: { show: false },
                        axisLabel: {
                            interval: '0',
                            textStyle: {
                                color: '#9fa6c6',
                            },
                        },
                        axisTick: { show: false },
                    }],
                    yAxis: [{
                        type: 'value',
                        min: 0,
                        max: 80,
                        splitNumber: 5,
                        splitLine: {
                            show: true,
                            lineStyle: {
                                color: '#27377f'
                            }
                        },
                        axisLine: { show: false },
                        axisLabel: { show: false },
                        axisTick: { show: false },
                    }],
                    series: [
                        {
                            type: 'bar',
                            barGap: "10%",//柱间距离，
                            barWidth: '26%',
                            itemStyle: {
                                normal: {
                                    color: '#2196f3'
                                }
                            },
                            label: {
                                normal: {
                                    show: true,
                                    position: 'top',
                                    textStyle: {
                                        color: '#9fa6c6',
                                    },
                                }
                            },
                            data: yData
                        }
                    ]
                }
            }
        },
        components: {
            ECharts
        }
    }
</script>