<template>
    <table class="AttackEvent-table" style="width:100%">
        <tr>
            <th align="right" width="168">攻击类型</th>
            <td align="left">
                {{alarmInfo.alarm_type_name}}
            </td>
        </tr>
        <tr>
            <th align="right" width="168">风险级别</th>
            <td align="left">
                <span class="level-square  text-s" :class="alarmGradeNameToClass[alarmInfo.alarm_grade_name]">{{alarmInfo.alarm_grade_name}}</span>
            </td>
        </tr>
        <tr>
            <th align="right" width="168">源地址</th>
            <td align="left">
                {{alarmInfo.src_ip}}
                {{alarmInfo.src_country_name}} 
                <span v-if="alarmInfo.src_city_name != null && alarmInfo.src_city_name != ''">
                    · {{alarmInfo.src_city_name}}
                </span>
            </td>
        </tr>
        <tr>
            <th align="right" width="168">事件数</th>
            <td align="left">
                {{alarmInfo.alarm_ref_event_count}}
            </td>
        </tr>
        <tr>
            <th align="right" width="168">资产名称</th>
            <td align="left">
                {{alarmInfo.dst_asset_name}}
            </td>
        </tr>
        <tr>
            <th align="right" width="168">资产归属</th>
            <td align="left">
                {{alarmInfo.dst_org_name}}
            </td>
        </tr>
        <tr>
            <th align="right" width="168">关键字</th>
            <td align="left">
                {{alarmInfo.alarm_key}}
            </td>
        </tr>
        <tr>
            <th align="right" width="168">告警内容</th>
            <td align="left">
                {{alarmInfo.alarm_desc}}
            </td>
        </tr>
    </table>
</template>
<script>
    /**
     *  告警事件详情
     */
    export default {
        props: ["alarmInfo"],
        data() {
            return {
                alarmGradeNameToClass: {
                    "高危": "circle-high",
                    "中危": "circle-medium",
                    "低危": "circle-low"
                }
            }
        }
    }
</script>

<style scoped>
    .AttackEvent-table {
        width: 100%;
        border-spacing: 4px;
    }

    .AttackEvent-table th,
    .AttackEvent-table td {
        padding: 0 20px;
        line-height: 40px;
        border: 1px solid rgba(36, 49, 116, 0.8);
        background-color: #0a154d;
    }

    .AttackEvent-table th {
        font-weight: normal;
        border: 1px solid rgba(15, 31, 114, 0.8);
        background-color: #060d33;
    }

    .AttackEvent-table .level-square {
        border-radius: 0;
        padding: 4px 7px;
    }
</style>