<template>
    <el-form ref="sceneConf" :model="sceneConf" label-width="80px">
        <el-form-item label="场景名称">
            <el-input v-model="sceneConf.name"></el-input>
        </el-form-item>
        <el-form-item label="场景描述">
            <el-input v-model="sceneConf.desc"></el-input>
        </el-form-item>
        <el-form-item label="报表URL">
            <el-input v-model="sceneConf.url"></el-input>
        </el-form-item>
        <el-form-item>
             <el-button type="primary" @click="onSubmit">保存</el-button>
        </el-form-item>
    </el-form>
</template>
<script>
import { mapState,mapActions } from 'vuex'
import commonAjax from 'components/js/common.js'
    export default{
        data:function(){
            return {              
                
            }
        },
        computed:{
            ...mapState({
            sceneConf:state=>state.content.sceneConf,
            queryCondition:state=>state.content.queryCondition
            
        })},
        
        methods:{
            ...mapActions({
                setSceneConf:'setSceneConf',
                getRuleSceneList:'getRuleSceneList'
            }),
            ruleChange:function(value){
                console.log(value)
            },onSubmit:function(){
                if(this.sceneConf.new==true){
                    commonAjax.req('/ssa/ruleScene/saveSceneConfig.do',this.sceneConf).then((data)=>{
                        this.sceneConf.new=false;
                        this.sceneConf.id=data.id;
                        this.getRuleSceneList(this.queryCondition);
                    })
                }else{
                    commonAjax.req('/ssa/ruleScene/updateSceneConfig.do',this.sceneConf).then((data)=>{
                        this.getRuleSceneList(this.queryCondition);
                    })
                }
                
            }
        }
    }
</script>
<style>
    .ruleSelect.el-select{
        width:100%
    }
</style>
