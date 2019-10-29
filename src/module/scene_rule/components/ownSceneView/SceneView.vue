<template>
     <el-row :gutter="20">
        <el-col :span="6" :class="{hidden:!isShowConf}">
            <SceneConf></SceneConf>
        </el-col>
        <el-col :span="colwidth">
            <el-row :gutter="0">
                <el-col :span="6"><el-date-picker
                    v-model="dateRange"
                    type="daterange"
                    align="right"
                    placeholder="选择日期范围"
                    :picker-options="pickerOptions2"
                    @change="timeChange"
                    >
                    </el-date-picker>
                </el-col>
                <el-col :span="2"><el-button type="primary" @click="query">查询</el-button></el-col>
                <el-col :span="1" :offset="13"><el-button type="primary" @click="toggleSetting">toggleConfig</el-button></el-col>
                <hr style="margin:5px;height:1px;border:0px;background-color:#D5D5D5;color:#D5D5D5;"/>
            </el-row>
            <el-card class="box-card">
                <SceneChart></SceneChart>
            </el-card>
            <el-card class="box-card-table">
                <SceneTable></SceneTable>
            </el-card>

            
        </el-col>
    </el-row>
</template>
<script>
    import SceneConf from './SceneConf.vue'
    import SceneChart from './SceneChart.vue'
    import SceneTable from './SceneTable.vue'
    import {mapActions,mapState} from 'vuex'
    export default{
        components:{
            SceneConf,SceneChart,SceneTable
        },
        data:function(){
            return {
                isShowConf:true,
                pickerOptions2: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                        picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                        const end = new Date();
                        const start = new Date();
                        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                        picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                dateRange: [new Date((new Date().getTime() - 3600 * 1000 * 24 * 7)),new Date()]
            }
        },
        computed:{
            colwidth:function(){
                if(this.isShowConf){
                    return 18
                }else{
                    return 24
                }
            }
        },
        mounted:function(){
            var  timeStamp2String = function(time){
                var datetime = new Date(time);  
                var year = datetime.getFullYear();  
                var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;  
                var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
                return year + "-" + month + "-" + date  
            }
            var range=timeStamp2String(this.dateRange[0]);
            range+=" - "
            range+=timeStamp2String(this.dateRange[1]);
            this.setSceneTimeRange(range);
        },
        methods:{
            ...mapActions({
			    setSceneTimeRange:'setSceneTimeRange'

            }),
            toggleSetting:function(){
                this.isShowConf=!this.isShowConf;
            },
            query:function(){

            },timeChange:function(val){
                this.setSceneTimeRange(val);
            }

        }
    }
</script>
<style>
.el-date-editor--daterange.el-input {
    width: 330px;
}
</style>