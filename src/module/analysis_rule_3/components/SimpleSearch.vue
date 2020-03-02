<template>
    <el-row :gutter="24" class="ordinary-search">
        <el-col :span="5"><el-input v-model="queryCondition.ruleName" placeholder="规则名称"></el-input></el-col>
        <el-col :span="2"><el-button type="primary" @click="getRuleInfoSimple">搜 索</el-button></el-col>
        <el-col :span="2" :offset="14">
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
                getRuleList:'getRuleList',
            }),
            getRuleInfoSimple:function(){
                this.queryCondition.currentPage=1;
                this.queryCondition.type='simple';
                this.getRuleList();
            }
        }
    }
</script>
<style>
    
</style>