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
                <el-col :span="1" :offset="13"><el-button type="primary" @click="setEditPanel(0)"><i class="fa fa-close fa-lg"></i></el-button></el-col>
                <el-col :span="1" ><el-button :class="{hidden:!isShowConf}" type="primary" @click="toggleSetting"><i class="fa fa-cog fa-lg"></i></el-button></el-col>
                           
            </el-row>
            <el-card class="box-card">
                <SceneReport></SceneReport>
            </el-card>
        </el-col>
    </el-row>
</template>
<script>
    import SceneConf from './SceneConf.vue'
    import SceneReport from './SceneReport.vue'
    import {mapActions,mapState} from 'vuex'
    export default{
        components:{
            SceneConf,SceneReport
        },
        data:function(){
            return {
          
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
             ...mapState({
            isShowConf:state=>state.content.isShowConf
            
            }),
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
			    setSceneTimeRange:'setSceneTimeRange',
                setEditPanel:'setEditPanel'
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
    width: 100%;
}

</style>