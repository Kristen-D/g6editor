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
           eventTypeList:state=>state.context.eventTypeList,
           deviceInfo:state=>state.context.deviceInfo
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
                // saveRule.subRule = rule.subRule
                // saveRule.cycleEvent = rule.cycleEvent;
                if (rule.configTemplate==2){
                  saveRule.relationType = rule.relationType;
                }
                saveRule.configtype = rule.configtype;
                saveRule.configtypeId = rule.configtypeId;
                saveRule.inputEventRules = []
                for(var item of rule.inputEventRules){
                    var inputEventRule={identity:'',configEvent:'',configName:'',attrData:[],filters:[],relation:''}
                    inputEventRule.identity=item.identity
                    if (rule.configtypeId=='1' || rule.configtypeId=='2'){
                      inputEventRule.configEvent = item.configEvent
                      if (rule.configtypeId=='1'){
                        for (var devItem of this.deviceInfo){
                          if(inputEventRule.configEvent==devItem.id){
                            inputEventRule.configName = devItem.device_type;
                            break;
                          }
                        }
                      }else if (rule.configtypeId=='2'){
                        inputEventRule.configName = item.configEvent;
                      }
                    }else{
                        inputEventRule.configName = item.configName;
                        inputEventRule.configEvent = '2047';
                    }
                    //inputEventRule.deviceType = item.deviceType
                    // inputEventRule.relation = item.relation
                    var relation='';
                    var tmpint=0;
                    for(var filter of item.filters){
                        var newFilter={attrName:'',attrType:'',funcData:[],paramData:[],compareFunc:'',relation:'',paramNum:1,compareValue:['','',''],compareValueAll:''}
                        newFilter.attrName=filter.attrName;
                        newFilter.attrType=filter.attrType;
                        newFilter.compareFunc = filter.compareFunc;
                         if (tmpint==0){
                           filter.relation='';
                           tmpint++;
                         }
                        newFilter.relation = filter.relation;
                        if (filter.relation !=''){
                          relation+=filter.relation+",";
                        }
                        newFilter.paramNum = filter.paramNum;
                        newFilter.compareValue = filter.compareValue;
                        newFilter.compareValueAll = filter.compareValueAll;
                        inputEventRule.filters.push(newFilter);
                    }
                    inputEventRule.relation = relation.substr(0, relation.length - 1);
                    saveRule.inputEventRules.push(inputEventRule);
                }

                var relationJson={};
                relationJson.relations=[];
                var relationCondition='';
                for(var item of rule.relation.relations){
                    var relation={condition:'',attrData:[],relation:'',compareFunc:'',compareValue:''}
                    relation.condition=item.condition;
                    relation.compareFunc = item.compareFunc;
                    relation.compareValue = item.compareValue;
                    relation.relation = item.relation;
                    if (item.relation !=''){
                      relationCondition+=item.relation+",";
                    }
                    relationJson.relations.push(relation);
                }
                relationJson.relationCondition = relationCondition.substr(0, relationCondition.length - 1);
                relationJson.relationTimeField = rule.relation.relationTimeField;
                relationJson.relationTimeWindow = rule.relation.relationTimeWindow;
                relationJson.relationSecTimeWindow = rule.relation.relationSecTimeWindow;
                relationJson.relationTimeUnit = rule.relation.relationTimeUnit;
                saveRule.relation=relationJson;
                var stat={};
                stat.timeField = rule.stat.timeField
                stat.timeWindow = rule.stat.timeWindow
                stat.secTimeWindow = rule.stat.secTimeWindow
                stat.timeUnit = rule.stat.timeUnit
                stat.sumField = rule.stat.sumField
                stat.stateValue = rule.stat.stateValue
                stat.groupField = rule.stat.groupField
                stat.distinctField = rule.stat.distinctField
                stat.groupType = rule.stat.groupType
                stat.groupFieldDeamon = rule.stat.groupFieldDeamon
                stat.compareFunc = rule.stat.compareFunc
                stat.compareValue = rule.stat.compareValue
                stat.outputTime = rule.stat.outputTime
                saveRule.stat=stat;
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
                saveRule.ruleFlow = rule.ruleFlow;
                if (rule.configTemplate==1){
                    var relation={};
                    relation.relations=[{condition:'',attrData:[],relation:'',compareFunc:'',compareValue:''}]
                    relation.relationCondition=''
                    //时间窗口设置，
                    relation.relationTimeField=''
                    relation.relationTimeWindow=0
                    relation.relationSecTimeWindow=0
                    relation.relationTimeUnit='s'
                    saveRule.relation=relation;
                    var stat={};
                      stat.timeField=''   //timeField 时间字段
                      stat.timeWindow=0  //时间窗口值，前台有关，不必管
                      stat.secTimeWindow=0   //后台程序使用，单位秒
                      stat.timeUnit='s'    //时间窗口单位，前台使用
                      stat.sumField=''     //分组累加的字段
                      stat.stateValue=''  //连续性判断
                      stat.groupField=[]   //分组字段
                      stat.groupFieldDeamon=[] //后台使用格式：来源：苏勇冰
                      stat.groupType=1    //分组类型 1 累加 、2 计数
                      stat.compareValue='' //分组对比值
                      stat.compareFunc=''   //分组对比函数
                      stat.outputTime=''
                    saveRule.stat=stat;
                }else if (rule.configTemplate==2){
                  var stat={};
                    stat.timeField=''   //timeField 时间字段
                    stat.timeWindow=0  //时间窗口值，前台有关，不必管
                    stat.secTimeWindow=0   //后台程序使用，单位秒
                    stat.timeUnit='s'    //时间窗口单位，前台使用
                    stat.sumField=''     //分组累加的字段
                    stat.stateValue=''  //连续性判断
                    stat.groupField=[]   //分组字段
                    stat.groupFieldDeamon=[] //后台使用格式：来源：苏勇冰
                    stat.groupType=1    //分组类型 1 累加 、2 计数
                    stat.compareValue='' //分组对比值
                    stat.compareFunc=''   //分组对比函数
                    stat.outputTime=''
                  saveRule.stat=stat;
                }else{
                  var relation={};
                  relation.relations=[{condition:'',attrData:[],relation:'',compareFunc:'',compareValue:''}]
                  relation.relationCondition=''
                  //时间窗口设置，
                  relation.relationTimeField=''
                  relation.relationTimeWindow=0
                  relation.relationSecTimeWindow=0
                  relation.relationTimeUnit='s'
                  saveRule.relation=relation;
                }
                return saveRule;
            },
            submitForm:function(rule){
                var param={};
                param.ruleId=rule.ruleId;
                param.configtype=rule.configtype;
                param.configtypeId=rule.configtypeId;
                param.ruleName=rule.ruleName;
                param.ruleDesc=rule.ruleDesc;
                param.ruleType=rule.ruleType;
                param.status = rule.status;

                //子规则
                // param.subRule = rule.subRule
                //rule2表新增template配置
                param.template = rule.configTemplate
                //获取eventType和eventTypeName
                var eventType='';
                param.eventTypeName='';
                if (rule.configtypeId==3){
                  for(var item of rule.inputEventRules){
                      eventType+=item.configName+',';
                      for(var group of this.deviceInfo){
                                  if(group.id==item.configName){
                                      param.eventTypeName+=group.device_type+',';
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
                }else{
                if (rule.configtypeId==2){
                    for(var item of rule.inputEventRules){
                        eventType+=item.configEvent+',';
                        for(var group of this.eventTypeList){
                                for(var type of group.children){
                                    if(type.id==item.configEvent){
                                        param.eventTypeName+=type.remark+',';
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
              }else{
                for(var item of rule.inputEventRules){
                    eventType+=item.configEvent+',';
                    for(var group of this.deviceInfo){
                                if(group.id==item.configEvent){
                                    param.eventTypeName+=group.device_type+',';
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
              }
            }
                param.eventTypeName=param.eventTypeName.substr(0, param.eventTypeName.length - 1);
                param.eventType = eventType.substr(0, eventType.length - 1);
                if (rule.configTemplate==2){
                  param.windows=rule.relation.relationSecTimeWindow;
                }else if (rule.configTemplate==1){
                  param.windows=0;
                }else{
                  param.windows=rule.stat.secTimeWindow;
                }
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
                    commonAjax.req('/ssa/ruleManage2/saveRuleInfo.do',param).then((data)=>{
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
                        commonAjax.req('/ssa/ruleManage2/updateRuleInfo.do',param).then((data)=>{
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
                // this.$refs[formName].validate((valid) => {
                //     if (valid) {
                //         this.submitForm(this.formRule)
                //     } else {
                //         this.$message.error('未保存！部分选项校验不通过');
                //         return false;
                //     }
                // });

                      this.$store.commit('resetSaveFlag');
                      this.$emit('saveCheck')

                      if (this.saveFlag === 0) {
                        this.submitForm(this.formRule)
                      } else {
                        this.$message.error('未保存！部分选项校验不通过');
                        return false;
                      }
            },
            close:function(){
                this.setEditPanel(0);
            }
    }
}
</script>
<style>

</style>
