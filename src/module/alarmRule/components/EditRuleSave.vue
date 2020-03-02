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
           alarmTypeList:state=>state.context.alarmTypeList
           // ruleTypeList:state=>state.context.ruleTypeList,
           // eventTypeList:state=>state.context.eventTypeList,
           // deviceInfo:state=>state.context.deviceInfo
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
                saveRule.ruleType = rule.configTemplate;
                // saveRule.alarmType = rule.alarmType;
                // saveRule.alarmGrade = rule.alarmGrade;
                saveRule.stats = rule.stats;
              //  saveRule.subRule = rule.subRule
                saveRule.relationType = rule.relationType;
                saveRule.inputEventRules = []
                for(var item of rule.inputEventRules){
                    var inputEventRule={identity:'',attrData:[],filters:[],relation:''}
                    inputEventRule.identity=item.identity;
                    inputEventRule.relation=item.relation;
                    var relation='';
                    for(var filter of item.filters){
                        var newFilter={attrName:'',attrType:'',funcData:[],paramData:[],compareFunc:'',relation:'',paramNum:1,compareValue:['','',''],compareValueAll:''}
                        newFilter.attrName=filter.attrName;
                        newFilter.attrType=filter.attrType;
                        newFilter.compareFunc = filter.compareFunc;
                        // newFilter.relation = filter.relation;
                        // if (filter.relation !=''){
                        //   relation+=filter.relation+",";
                        // }
                        newFilter.paramNum = filter.paramNum;
                        newFilter.compareValue = filter.compareValue;
                        newFilter.compareValueAll = filter.compareValueAll;
                        inputEventRule.filters.push(newFilter);
                    }
                    // inputEventRule.relation = relation.substr(0, relation.length - 1);
                    saveRule.inputEventRules.push(inputEventRule);
                }

                var merge_relations=[];
                for(var item of rule.merge_relations){
                    var merge_relation={attrName:''}
                    merge_relation.attrName=item.attrName;
                    merge_relations.push(merge_relation);
                }
                saveRule.merge_relations = merge_relations;

                if (rule.configTemplate ==102){
                  saveRule.timeField=rule.timeField  //timeField 时间字段
                  saveRule.timeWindow=rule.timeWindow  //时间窗口值，前台有关，不必管
                  saveRule.secTimeWindow=rule.secTimeWindow //后台程序使用，单位秒
                  saveRule.timeUnit=rule.timeUnit    //时间窗口单位，前台使用
                  saveRule.compareValue=rule.compareValue //发生次数对比值
                  saveRule.compareFunc=rule.compareFunc   //发生次数对比函数
                  saveRule.alarmRecovery=0
                  saveRule.timeThreshold=0
                  saveRule.checked1=rule.checked1
                  saveRule.checked2=rule.checked2
                  if(rule.checked1){
                    saveRule.upgrade=rule.upgrade
                  }else{
                    saveRule.upgrade=0
                  }
                  if(rule.checked2){
                    saveRule.degrade=rule.degrade
                  }else{
                    saveRule.degrade=0
                  }
               }else if (rule.configTemplate ==104){
                 saveRule.timeField=rule.timeField   //timeField 时间字段
                 saveRule.timeWindow=0  //时间窗口值，前台有关，不必管
                 saveRule.secTimeWindow=rule.secTimeWindow //后台程序使用，单位秒
                 saveRule.timeUnit=rule.timeUnit    //时间窗口单位，前台使用
                 saveRule.compareValue='' //发生次数对比值
                 saveRule.compareFunc=''   //发生次数对比函数
                 saveRule.alarmRecovery=rule.alarmRecovery
                 saveRule.timeThreshold=rule.timeThreshold
                 saveRule.upgrade=0
                 saveRule.degrade=0
               }else{
                 saveRule.timeField=''   //timeField 时间字段
                 saveRule.timeWindow=0  //时间窗口值，前台有关，不必管
                 saveRule.secTimeWindow=0   //后台程序使用，单位秒
                 saveRule.timeUnit='s'    //时间窗口单位，前台使用
                 saveRule.compareValue='' //发生次数对比值
                 saveRule.compareFunc=''   //发生次数对比函数
                 saveRule.alarmRecovery=0
                 saveRule.timeThreshold=0
                 saveRule.upgrade=0
                 saveRule.degrade=0
               }

                saveRule.outputAttrData = []

                //saveRule.outputRules = rule.outputRules
                saveRule.outputRules=[]
                for(var item of rule.outputRules){
                    var outputRule={outputAttrName:'',srcAttrName:'',type:0,valueData:[],which:''}
                    outputRule.outputAttrName=item.outputAttrName
                    outputRule.srcAttrName=item.srcAttrName
                    outputRule.type=item.type
                    outputRule.which=item.which
                    saveRule.outputRules.push(outputRule)
                }
                saveRule.alarm = rule.alarm;
                //saveRule.ruleFlow = rule.ruleFlow;
                return saveRule;
            },
            submitForm:function(rule){
                var param={};
                param.ruleId=rule.ruleId;
                param.alarmType=rule.alarmType;
                param.alarmGrade=rule.alarmGrade;
                param.ruleName=rule.ruleName;
                param.ruleDesc=rule.ruleDesc;
                param.ruleType=rule.configTemplate;
                // param.alarmType=rule.alarmType;
                // param.alarmGrade=rule.alarmGrade;
                param.status = rule.stats;
                param.template = rule.configTemplate
               if (rule.configTemplate==102){
                  param.windows=rule.secTimeWindow;
                }else{
                  param.windows=0;
                }
                //param.enableAlarm=rule.alarm.state;
                //获取ruleTypeName
                param.ruleTypeName='';
                if(rule.configTemplate==101){
                    param.ruleTypeName='过滤';
                }else if (rule.configTemplate==102){
                    param.ruleTypeName='合并';
                }else if (rule.configTemplate==104){
                    param.ruleTypeName='变更';
                }else{
                    param.ruleTypeName='未定义';
                }
                // param.alarmTypeName='';
                // for(var i=0;i<this.alarmTypeList.length;i++){
                //   if (rule.alarmType==this.alarmTypeList[i].id){
                //      param.alarmTypeName=this.alarmTypeList[i].text;
                //      break;
                //   }
                // }

                var saveRule=this.reduceRule(rule);

                var jsonStr=JSON.stringify(saveRule);
                param.jsonStr=jsonStr;
                if(param.ruleId==''){
                    commonAjax.req('/ssa/alarmRule/saveRuleInfo.do',param).then((data)=>{
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
                        commonAjax.req('/ssa/alarmRule/updateRuleInfo.do',param).then((data)=>{
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
