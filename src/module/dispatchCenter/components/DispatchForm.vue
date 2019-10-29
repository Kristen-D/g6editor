<template>
<el-row>
    <el-col :span='8'>
        <el-form ref="dispatchConfig" :model="dispatchConfig" label-width="80px">
        <el-form-item label="标题:">
            <el-input v-model="dispatchConfig.title"></el-input>
        </el-form-item>
        <el-form-item label="开始时间">
            <el-col :span="11">
            <el-date-picker type="date" placeholder="选择日期" v-model="dispatchConfig.startDate" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
            <el-time-picker type="fixed-time" placeholder="选择时间" v-model="dispatchConfig.startDate1" style="width: 100%;"></el-time-picker>
            </el-col>
        </el-form-item>
        <el-form-item label="计时开始:">
            <el-switch on-text="" off-text="" v-model="dispatchConfig.timerStart"></el-switch>
        </el-form-item>
        <el-form-item label="相关单位:">
            <el-switch on-text="" off-text="" v-model="dispatchConfig.relevantDepartment"></el-switch>
        </el-form-item>
        <el-form-item label="安全监测系统:">
            <el-switch on-text="" off-text="" v-model="dispatchConfig.securityMonitor"></el-switch>
        </el-form-item>
        <el-form-item label="网络与信息安全事件:">
            <el-switch on-text="" off-text="" v-model="dispatchConfig.securityEvent"></el-switch>
        </el-form-item>
        <el-form-item label-width="80px">
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button>取消</el-button>
        </el-form-item>
        </el-form>
    </el-col>
</el-row>
</template>
<script>
    import {mapActions,mapState} from 'vuex'
    export default{
        computed:{
            ...mapState({
                dispatchConfig:state=>state.context.dispatchConfig
            })
        },
        methods:{
            onSubmit() {
                console.log(this.dispatchConfig.startDate +'  '+this.dispatchConfig.startDate1);
                var d = new Date(this.dispatchConfig.startDate1);
                this.dispatchConfig.startTime=d.getTime();
                this.dispatchConfig.startDateStr=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
                this.dispatchConfig.startTimeStr=d.getHours()+':'+d.getMinutes()
                
                if(this.dispatchConfig.timerStart==true){
                    this.dispatchConfig.startColor='blue'
                }else{
                    this.dispatchConfig.startColor='white'
                }
            }
        }
    }
</script>
<style>
    
</style>