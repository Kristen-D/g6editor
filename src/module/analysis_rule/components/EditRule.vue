<template>
<el-collapse v-model="activeNames" @change="handleChange">
  <el-collapse-item title="规则信息" name="1">  
    <el-form ref="formRule" :model="formRule" label-width="120px">
        <el-row>
            <el-col :span="8">
                <el-form-item label="规则编号">
                    <el-input v-model="formRule.ruleCode" placeholder="编号"></el-input>
                </el-form-item>
            </el-col> 
            <el-col :span="8">
                <el-form-item label="规则名称">
                    <el-input v-model="formRule.ruleName" placeholder="规则名称"></el-input>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="规则描述">
                    <el-input v-model="formRule.ruleDesc" placeholder="规则描述"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            
            <el-col :span="8">
                <el-form-item label="生效时间">
                    <el-date-picker
                    v-model="formRule.effectTime"
                    type="date"
                    placeholder="选择日期范围">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="过期时间">
                    <el-date-picker
                    v-model="formRule.expireTime"
                    type="date"
                    placeholder="选择日期范围">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="适用系统">
                    <el-select v-model="formRule.subSystem" placeholder="适用系统">
                        <el-option v-for="item in subSystemList"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                        
                    </el-select>
                </el-form-item>
            </el-col>  
            
        </el-row>       
        <el-row> 
            <el-col :span="8">
                <el-form-item label="状态">
                    <el-select v-model="formRule.status" disabled>
                    <el-option label="正常" value="1" ></el-option>
                    <el-option label="修改中" value="0"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="状态时间">
                    <el-input v-model="formRule.statusTime"  :disabled="true"></el-input>
                </el-form-item>
            </el-col>
             <el-col :span="8">
                <el-form-item label="维护人员">
                    <el-input v-model="formRule.operatorId" placeholder="维护人员" :disabled="true"></el-input>
                </el-form-item>
            </el-col> 
            
        </el-row>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                    <el-button type="primary" @click="onCanel">刷新</el-button>
                    <el-button type="primary" @click="onEffect" :disabled="formRule.status==1">生效</el-button>
                    <el-button type="primary" @click="close">关闭</el-button>
                </el-form-item>

    </el-form>
</el-collapse-item>
<el-collapse-item title="规则输入条件" name="2">
    <RuleCondition></RuleCondition>
</el-collapse-item>
<el-collapse-item title="规则输出条件" name="3">
    <RuleOutCondition></RuleOutCondition>
</el-collapse-item>
</el-collapse>

</template>
<script>
import {mapActions,mapState} from 'vuex'
import RuleCondition from './RuleCondition.vue'
import RuleOutCondition from './RuleOutCondition.vue'
import commonAjax from 'components/js/common.js'
export default{
    data(){
        return {
                 activeNames: ['1','2','3']
                 
        }
    },
    components:{ RuleCondition,RuleOutCondition
    },
    computed:{
        ...mapState({
           formRule:state=>state.context.formRule,
           subSystemList:state=>state.context.subSystemList
        })
    },
    methods:{
            ...mapActions({
			    setEditPanel:'setEditPanel',
                saveEditRule:'saveEditRule',
                getRuleById:'getRuleById',
                getRuleConfig:'getRuleConfig',
                getRuleOutputCondition:'getRuleOutputCondition'
                
            }),
            onCanel:function(){
                //取消修改
                this.getRuleById();
                this.getRuleConfig();
                this.getRuleOutputCondition();
            },
            onSubmit:function(){
                this.formRule.status=0;
                this.saveEditRule(this.formRule);
                
            },
            close:function(){
                this.setEditPanel(0);
            },
            handleChange:function(){

            },
            onEffect:function(){
                this.formRule.status=1;
                this.saveEditRule(this.formRule);
            }
    }
}   
</script>
<style>
    .el-date-editor--date.el-input {
    width: 100%;
}
</style>