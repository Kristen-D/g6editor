<template>
<el-form ref="formRule" :model="formRule"  :rules="rules" label-width="120px">
        <el-row>
            <div class="el-sub-panel-heading"><h4 class="sub-title">串行规则</h4></div>
        </el-row>
        <el-row v-for="(node,index) in formRule.ruleFlow">
            <el-col :span="11">
                <el-form-item v-bind:label="'节点'+(index+1)+'：'">
                    <el-select v-model="node.rule">
                            <el-option v-for="item in ruleSubSystemList"
                                    :key="item.ruleId"
                                    :label="item.ruleName"
                                    :value="item.ruleId">
                            </el-option>                    
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="3" :offset="1">
                <label class="add font-color"  @click="addRuleNode(index)">+规则</label>
            </el-col>

            <el-col :span="3">
                <label class="delet font-color m-l-30" @click="formRule.ruleFlow.splice(index,1)" v-if="index>0"><i class="el-icon-delete2 m-r-8"></i>删除</label>
            </el-col>
        </el-row>
        
</el-form>
</template>  
<script>
import {mapActions,mapState} from 'vuex'
import commonAjax from 'components/js/common.js'
export default{
    data(){
        return{
            ruleSubSystemList:[]
        }
    },
    computed:{
        ...mapState({
           formRule:state=>state.context.formRule,
           ruleList:state=>state.context.ruleList
        })
    },
    methods:{
        addRuleNode:function(index){
            var node={rule:''}
            this.formRule.ruleFlow.splice(index+1,0,node)
        }
    },
    mounted:function(){
        commonAjax.req('/ssa/ruleManage3/getRuleAllList.do').then((data)=>{
                    this.ruleSubSystemList=data; 
                }) 
    }
}    
</script>
<style>
    
</style>