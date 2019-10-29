<template>
<el-form ref="formRule" :model="formRule"  :rules="rules" label-width="120px">
     <el-form-item>
            <el-button type="primary" @click="onSubmit('formRule')">保存</el-button>
            <el-button type="gray" @click="close">返回</el-button>
    </el-form-item>
</el-form>
</template>  
<script>
import {mapActions,mapState} from 'vuex'
import commonAjax from 'components/js/common.js'
export default{
    data(){
        return {

        }
    },
    computed:{
        ...mapState({

           formRule:state=>state.context.formRule,
           ruleTypeList:state=>state.context.ruleTypeList,
           deviceTypeList:state=>state.context.deviceTypeList
        })
    },
    methods:{
        ...mapActions({
			    setEditPanel:'setEditPanel',
                saveEditRule:'saveEditRule'
               
                
            }),
            reduceRule:function(rule){
                var saveRule={};
                saveRule.ruleId=rule.ruleId;
                saveRule.configTemplate=rule.configTemplate;
                saveRule.ruleName = rule.ruleName;
                saveRule.ruleDesc = rule.ruleDesc;
                saveRule.ruleType = rule.ruleType;
                saveRule.stats = rule.stats;
                saveRule.subRule = rule.subRule
                saveRule.relationType = rule.relationType;
                saveRule.inputEventRules = []
                for(var item of rule.inputEventRules){
                    var inputEventRule={identity:'',configEvent:'',deviceType:'',attrData:[],filters:[],relation:''}
                    inputEventRule.identity=item.identity
                    inputEventRule.configEvent = item.configEvent
                    inputEventRule.deviceType = item.deviceType
                    inputEventRule.relation = item.relation
                    for(var filter of item.filters){
                        var newFilter={attrName:'',attrType:'',funcData:[],paramData:[],compareFunc:'',paramNum:1,compareValue:['','',''],compareValueAll:''}
                        newFilter.attrName=filter.attrName;
                        newFilter.attrType=filter.attrType;
                        newFilter.compareFunc = filter.compareFunc;
                        newFilter.paramNum = filter.paramNum;
                        newFilter.compareValue = filter.compareValue;
                        newFilter.compareValueAll = filter.compareValueAll;
                        inputEventRule.filters.push(newFilter);
                    }
                    saveRule.inputEventRules.push(inputEventRule);
                }
                saveRule.relations=[]
                for(var item of rule.relations){
                    var relation={condition:'',attrData:[],compareFunc:'',compareValue:''}
                    relation.condition=item.condition
                    relation.compareFunc = item.compareFunc
                    relation.compareValue = item.compareValue
                    saveRule.relations.push(relation)
                }
                saveRule.relationCondition = rule.relationCondition
                saveRule.timeField = rule.timeField
                saveRule.timeWindow = rule.timeWindow
                saveRule.secTimeWindow = rule.secTimeWindow
                saveRule.timeUnit = rule.timeUnit
                saveRule.sumField = rule.sumField
                saveRule.groupField = rule.groupField
                saveRule.groupType = rule.groupType
                saveRule.groupFieldDeamon = rule.groupFieldDeamon
                saveRule.compareFunc = rule.compareFunc
                saveRule.compareValue = rule.compareValue
                saveRule.outputAttrData = []
                //saveRule.outputRules = rule.outputRules
                saveRule.outputRules=[]
                for(var item of rule.outputRules){
                    var outputRule={outputAttrName:'',renameAttrName:'',type:0,valueData:[],which:''}
                    outputRule.outputAttrName=item.outputAttrName
                    outputRule.renameAttrName=item.renameAttrName
                    outputRule.type=item.type
                    outputRule.which=item.which
                    saveRule.outputRules.push(outputRule)
                }
                saveRule.alarm = rule.alarm;
                saveRule.ruleFlow = rule.ruleFlow
                return saveRule;
            },
            submitForm:function(rule){
                var param={};
                param.ruleId=rule.ruleId;

                param.ruleName=rule.ruleName;
                param.ruleDesc=rule.ruleDesc;
                param.ruleType=rule.ruleType;
                param.status = rule.stats;
                //子规则
                param.subRule = rule.subRule
                //获取eventType和eventTypeName
                var eventType='';
                param.eventTypeName='';
                for(var item of rule.inputEventRules){
                    eventType+=item.configEvent+',';
                    for(var group of this.deviceTypeList){
                            for(var dev of group.children){
                                if(dev.id==item.configEvent){
                                    param.eventTypeName+=dev.name+',';
                                }
                            }
                        }
                        //归并过滤函数参数
                        for(var filter of item.filters){
                            var value=filter.compareValue.join();
                            while(value[value.length-1]==','){
                                value=value.substr(0,value.length-1);
                            }
                            filter.compareValueAll=value;
                        }
                }
                param.eventTypeName=param.eventTypeName.substr(0, param.eventTypeName.length - 1);
                param.eventType = eventType.substr(0, eventType.length - 1);
                param.windows=rule.secTimeWindow;
                param.enableAlarm=rule.alarm.state;
                //获取ruleTypeName
                param.ruleTypeName='';
                for(var item of this.ruleTypeList){
                    for(var type of item.children){
                        if(type.id==param.ruleType){
                            param.ruleTypeName=type.name;
                        }
                    } 
                }
               
                var saveRule=this.reduceRule(rule);
                
                var jsonStr=JSON.stringify(saveRule);
                param.jsonStr=jsonStr;
                if(param.ruleId==''){
                    commonAjax.req('/ssa/ruleManage3/saveRuleInfo.do',param).then((data)=>{
                            console.log(data);
                            rule.ruleId=data.ruleId;
                            rule.title="编辑规则";
                            this.saveEditRule(this.formRule);
                            this.$message({
                                message: '保存规则成功',
                                type: 'success'
                                });
                            rule.title="查看规则"
                            this.setEditPanel(2);    
                        })
                }else{
                        commonAjax.req('/ssa/ruleManage3/updateRuleInfo.do',param).then((data)=>{
                            this.$message({
                                message: '保存规则成功',
                                type: 'success'
                                });
                        })
                        rule.title="查看规则"
                        this.setEditPanel(2);
                }
            },
            onSubmit:function(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.submitForm(this.formRule)
                    } else {
                        this.$message.error('未保存！部分选项校验不通过');
                        return false;
                    }
                });
            },
            close:function(){
                this.setEditPanel(0);
            }
    }
}    
</script>
<style>
    
</style>