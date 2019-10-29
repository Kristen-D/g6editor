<template>
    <el-row :gutter="24">
        <el-col :span="5"><el-input v-model="inputSearchKey" placeholder="关键字"></el-input></el-col>
        <el-col :span="2"><el-button type="primary" @click="getSceneList">搜 索</el-button></el-col>
      </el-row>
</template>
<script>
import {mapActions,mapState} from 'vuex'
    export default{
        data(){
            return{
                inputSearchKey: ''
            }
        },
        computed:{
            ...mapState({
                queryCondition:state=>state.content.queryCondition

        })
        },
        methods:{
            ...mapActions({
                getRuleSceneList:'getRuleSceneList',
                setQueryCondition:'setQueryCondition'
            }),
            getSceneList:function(){
                this.queryCondition.key=this.inputSearchKey;       
                this.queryCondition.currentPage=1;
                this.setQueryCondition(this.queryCondition);
                this.getRuleSceneList(this.queryCondition);
            }
        }
    }
</script>
<style>
    
</style>