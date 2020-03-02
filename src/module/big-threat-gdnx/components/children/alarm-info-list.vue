<template>
	<div>
		<el-table :data="alarmInfoTopList" class="black-table hf">
			<el-table-column prop="alarm_type_name" label="攻击类型"></el-table-column>
			<el-table-column prop="alarm_grade_name" label="风险级别">
				<template scope="scope">
					<span class="level-square " :class="alarmGradeNameToClass[scope.row.alarm_grade_name]">
						{{scope.row.alarm_grade_name}}
					</span>
					
				</template>
			</el-table-column>
			<el-table-column prop="src_ip" label="源IP"></el-table-column>
			<el-table-column prop="dst_ip" label="目的IP"></el-table-column>
			<el-table-column label="告警时间" :show-overflow-tooltip="true">
				<template scope="scope">
					{{scope.row.alarm_time | time('yyyy-MM-dd')}}
				</template>
			</el-table-column>
			<el-table-column label="查看" min-width="50">
				<template scope="scope">
					<el-button type="text" @click="openAlarmDetail(scope.row.alarm_id)">详情</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
</template>

<script>
	/**
	 *  最新告警事件
	 */

	import { time } from '../../service/filter.js'
	export default {
		props: ["alarmInfoTopList"],
		data() {
			return {
				alarmGradeNameToClass: {
					"高危": "circle-high",
					"中危": "circle-medium",
					"低危": "circle-low"
				}
			}
		},
		methods: {
			openAlarmDetail(alarmId) {
				this.$emit("openAlarmDetail", alarmId);
			}
		},
		filters: {
			time
		}
	}



</script>




<style scoped>
	.el-button {
		padding: 6px 0;
	}
</style>