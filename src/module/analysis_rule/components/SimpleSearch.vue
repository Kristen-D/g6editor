<template>
    <el-row :gutter="24">
        <el-col :span="5"><el-input v-model="inputRuleName" placeholder="规则名称"></el-input></el-col>
        <el-col :span="5">
            <div class="block"> 
                <el-date-picker  v-model="timeRange"  type="daterange"  placeholder="选择日期范围" format="yyyy-MM-dd" editable=false>
                </el-date-picker>
            </div>
        </el-col>
        <el-col :span="2"><el-button type="primary" @click="getRuleInfoSimple">搜 索</el-button></el-col>
        <el-col :span="2" :offset="12">
            <el-button type="text" v-on:click="setSearchPanel(1)">高级搜索<i class="el-icon-arrow-down el-icon--right"></i>
            </el-button>
        </el-col>
      </el-row>
</template>
<script>
import {mapActions,mapState} from 'vuex'
    export default{
        data(){
            return{
                inputRuleName: '',
                //timeRange:[new Date().setTime(new Date().getTime() - 3600 * 1000 * 24 * 7),new Date()]
                timeRange:''
            }
        },
        computed:{
            ...mapState({
                queryCondition:state=>state.context.queryCondition

        })
        },
        methods:{
            ...mapActions({
			    setSearchPanel:'setSearchPanel',
                getRuleInfo:'getRuleInfo',
                setQueryCondition:'setQueryCondition'
            }),
            getRuleInfoSimple:function(){
        
                this.queryCondition.type="simple";
                this.queryCondition.ruleName=this.inputRuleName;
                console.log(this.timeRange);
                if(this.timeRange==null || this.timeRange==''){
                    this.queryCondition.startTime=null;
                    this.queryCondition.endTime=null;
                }else{ 
                    if(this.timeRange[0]==null){
                        this.queryCondition.startTime=null;
                        this.queryCondition.endTime=null;
                    }else{
                        var d = new Date(this.timeRange[0]);
                        this.queryCondition.startTime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
                        d = new Date(this.timeRange[1]);
                        this.queryCondition.endTime=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
                    }
                }
                this.queryCondition.currentPage=1;
                this.setQueryCondition(this.queryCondition);

                this.getRuleInfo(this.queryCondition);
            }
        }
    }
</script>
<style>
    
</style>