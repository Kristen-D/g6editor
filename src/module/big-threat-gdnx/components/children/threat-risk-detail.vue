<template>
    <div style="margin-bottom:50px;">
        <el-table :data="threatRiskPage.rowData" class="black-table hf">
            <el-table-column label="报告时间" min-width="140">
                <template scope="scope">
                    {{scope.row.event_report_time | time('yyyy-MM-dd hh:mm:ss')}}
                </template>
            </el-table-column>
            <el-table-column prop="event_total_count" label="次数">
            </el-table-column>
            <el-table-column prop="event_three_type_name" label="事件三级类型名" min-width="120"></el-table-column>
            <el-table-column label="是否外部安全事件">
                <template scope="scope">
                    <span v-if="scope.row.externalIp_s == 1">
                        外部安全事件
                    </span>
                    <span v-if="scope.row.externalIp_s == 0">
                        内部安全事件
                    </span>
                </template>
            </el-table-column>
            <el-table-column prop="asset_name" label="资产名">
            </el-table-column>

        </el-table>
        <el-pagination class=" float-r page-location" @current-change="handleCurrentChange" :page-size="pageOptions.pageSize" :current-page="pageOptions.pageIndex"
            layout="total, prev, pager, next, jumper" :total="threatRiskPage.total">
        </el-pagination>
    </div>
</template>
<script>
    import { time } from '../../service/filter.js'
    export default {
        props: ["threatRiskPage"],
        data() {
            return {
                pageOptions: {
                    pageIndex: 1,
                    pageSize: 5
                }
            }
        },
        filters: {
            time
        },
        methods: {
            handleCurrentChange(pageIndex) {
                this.$emit("riskPageChange", pageIndex)
            }
        }
    }
</script>