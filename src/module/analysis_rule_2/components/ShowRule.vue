<template>
<div>
<h3>{{formRule.title}}</h3>
<el-form ref="formRule" :model="formRule" label-width="120px">
        <!-- <el-form-item label="选择模板：">
            <el-radio-group v-model="formRule.configTemplate">
                <el-radio-button v-for="item in configTemplateList"
                  :disabled="getSelectTemplateState(item.value)"  :label="item.value"> {{item.name}}
                </el-radio-button>
            </el-radio-group>
        </el-form-item> -->
        <el-row>
            <el-col :span="13" >
                <el-form-item label="规则名称：">
                    <span>{{formRule.ruleName}}</span>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="13" >
                <el-form-item label="规则分类：">
                    <span>{{getRuleTypeName(formRule.ruleType)}}</span>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="13">
                <el-form-item label="规则描述：">
                    <span>{{formRule.ruleDesc}}</span>
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item label="是否启用：">
                <span v-if="formRule.status==1">是</span>
                <span v-if="formRule.status==2">否</span>
        </el-form-item>
        <el-form-item label="配置类型：">
                <span>{{getConfigTypeName(formRule.configtypeId)}}</span>
        </el-form-item>
        <!-- <el-form-item label="参与循环：">
                <span v-if="formRule.cycleEvent==1">是</span>
                <span v-if="formRule.cycleEvent==0">否</span>
        </el-form-item> -->
       <div v-if="formRule.configTemplate!=5">
        <el-row>
            <div class="el-sub-panel-heading"><h4 class="sub-title">规则条件</h4></div>
        </el-row>
        <el-form-item label="关联方式：" v-if="formRule.configTemplate==2">
                <span v-if="formRule.stats==1">普通关联</span>
                <!-- <span v-if="formRule.stats==2">分组关联</span>
                <span v-if="formRule.stats==3">顺序关联</span> -->
        </el-form-item>
        <template v-for="(inputEventRule,eventRuleIndex) in formRule.inputEventRules">
            <el-row v-if="(formRule.configTemplate==4 && eventRuleIndex!=1) || formRule.configTemplate !=4">
                <el-col :span="11">
                    <el-form-item v-bind:label="'事件('+inputEventRule.identity+')：'">
                        <span>{{getEventTypeNameNew(formRule.configtypeId,inputEventRule.configEvent,inputEventRule.configName)}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <el-row v-if="(formRule.configTemplate==4 && eventRuleIndex==1)">
                <el-col :span="11">
                    <el-form-item v-bind:label="'事件('+inputEventRule.identity+')：'">
                        <span>{{getEventTypeName2(inputEventRule.configEvent,formRule.configtypeId)}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
            <template  v-for="(filter,index) in inputEventRule.filters">
              <el-row v-if="index >0">
                  <el-col :span="5" :offset="1">
                      <el-form-item v-bind:label="'条件关系'+index+':'" >
                            <span>{{getRelationConditionName(filter.relation)}}</span>
                      </el-form-item>
                  </el-col>
              </el-row>
              <el-row>
                <el-col :span="10" :offset="1">
                    <el-form-item v-bind:label="'条件'+(index+1)+':'">
                        <span>{{getAttrName(filter.attrName)}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <span>{{getFilterFuncName(filter.compareFunc)}}</span>
                </el-col>
                <el-col :span="6/filter.paramNum" v-for="n in filter.paramNum">
                        <span  v-if="filter.attrType==1">{{getFilterParamDesc(filter.compareValue[0])}}</span>
                        <span  v-if="filter.attrType==0||n>1">{{filter.compareValue[n-1]}}</span>
                </el-col>
            </el-row>
            <!-- <el-row>
                <el-col :span="4" :offset="1">
                    <el-form-item label="条件关系:">
                            <span>{{getRelationConditionName(inputEventRule.relation)}}
                            </span>
                    </el-form-item>
                </el-col>
            </el-row> -->
            </template>
        </template>
        <template v-if="formRule.configTemplate==2 || formRule.configTemplate==4">
            <el-row>
                <el-col :span="2">
                    <el-form-item label="关联条件：">
                    </el-form-item>
                </el-col>
                <el-col :span="22">
                    <template  v-for="(relation,index) in formRule.relation.relations">
                      <el-row v-if="index > 0">
                          <el-col :span="5">
                              <el-form-item v-bind:label="'条件关系'+index+':'" >
                                        <span>{{getRelationConditionName(relation.relation)}}</span>
                              </el-form-item>
                          </el-col>
                      </el-row>
                        <el-row>
                        <el-col :span="8">
                            <el-form-item v-bind:label="'条件'+(index+1)+':'">
                                <span>{{getOutputAttrName(relation.condition)}}</span>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <span>{{getCompareFunc(relation.compareFunc)}}</span>
                        </el-col>
                        <el-col :span="8">
                            <span>{{getOutputAttrName(relation.compareValue)}}</span>
                        </el-col>
                    </el-row>
                      </template>
                    <!-- <el-row>
                        <el-col :span="4">
                            <el-form-item label="条件关系:">
                                <span>{{getRelationConditionName(formRule.relationCondition)}}</span>
                            </el-form-item>
                        </el-col>
                    </el-row> -->

                </el-col>
            </el-row>

        </template>
        <template  v-if="formRule.configTemplate==2">
            <el-row >
                <div class="el-sub-panel-heading"><h4 class="sub-title">时间窗口</h4></div>
            </el-row>
            <el-row>
                    <el-col :span="5">
                        <el-form-item label="时间属性：">
                            <span>{{getAttrName(formRule.relation.relationTimeField)}}</span>
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row>
                <el-col :span="5">
                    <el-form-item label="时间窗口：">
                        <span>{{formRule.relation.relationTimeWindow}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <span>{{getTimeUnit(formRule.relation.relationTimeUnit)}}</span>
                </el-col>
            </el-row>

        </template>
        <template  v-if="formRule.configTemplate==3">
            <el-row >
                <div class="el-sub-panel-heading"><h4 class="sub-title">时间窗口</h4></div>
            </el-row>
            <el-row>
                    <el-col :span="5">
                        <el-form-item label="时间属性：">
                            <span>{{getAttrName(formRule.stat.timeField)}}</span>
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row>
                <el-col :span="5">
                    <el-form-item label="时间窗口：">
                        <span>{{formRule.stat.timeWindow}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <span>{{getTimeUnit(formRule.stat.timeUnit)}}</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="5">
                  <el-form-item label="输出时间点：">
                      <span>{{getoutputTimeName(formRule.stat.outputTime)}}</span>
                  </el-form-item>
                </el-col>
            </el-row>
            <template  v-if="formRule.configTemplate==3 ||(formRule.configTemplate==2&&formRule.relationType==2)">
                <el-row>
                    <el-col :span="13">
                        <el-form-item label="分组条件：">
                               <span>{{getGroupAttrName(formRule.stat.groupField)}}</span>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item label="分组类型：">
                    <span v-if="formRule.stat.groupType==1">累加(sum)</span>
                    <span v-if="formRule.stat.groupType==2">计数(count)</span>
                    <span v-if="formRule.stat.groupType==3">连续性</span>
                    <span v-if="formRule.stat.groupType==4">唯一计数</span>
                </el-form-item>
                <el-row>
                    <el-col :span="5" v-if="formRule.stat.groupType==1 || formRule.stat.groupType==3" >
                        <el-form-item>
                            <span>{{getAttrName(formRule.stat.sumField)}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="5" v-if="formRule.stat.groupType==4" >
                        <el-form-item>
                            <span>{{getGroupAttrName(formRule.stat.distinctField)}}</span>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4"  v-if="formRule.stat.groupType==3" >
                        <el-form-item >
                            <span>{{formRule.stat.stateValue}}</span>
                        </el-form-item>

                    </el-col>
                    <el-col :span="2" v-if="formRule.stat.groupType==2 ">
                        <el-form-item label="发生次数：">
                        </el-form-item>
                    </el-col>
                    <el-col :span='1' v-if="formRule.stat.groupType==1">
                        <el-form-item label="总和">
                        </el-form-item>
                    </el-col>
                    <el-col :span='1' v-if="formRule.stat.groupType==4 || formRule.stat.groupType==3">
                        <el-form-item label="总数">
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <span>{{getCompareFunc(formRule.stat.compareFunc)}}</span>
                    </el-col>
                    <el-col :span="4">
                            <span>{{formRule.stat.compareValue}}</span>
                    </el-col>
                </el-row>
            </template>
        </template>
        </div>
        <el-row>
           <div class="el-sub-panel-heading"><h4 class="sub-title">输出字段</h4></div>
        </el-row>
        <el-row v-for="(outputRule,index) in formRule.outputRules">
            <el-col :span="11">
                <el-form-item v-bind:label="'字段'+(index+1)+'：'">
                    <span v-if="index==0">输出事件类型</span>
                    <span v-if="index>0">{{getAttrName(outputRule.outputAttrName)}}</span>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item label="原始字段" label-width="90px">
                    <span v-if="index==0"></span>
                    <span v-if="index>0">{{getOutputAttrName(outputRule.srcAttrName)}}</span>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item label="取值" label-width="50px">
                    <span v-if="index==0">{{getOutputEventTypeName(outputRule.which)}}</span>
                    <span v-if="index>0 && outputRule.type==0">{{outputRule.which}}</span>
                    <span v-if="index>0 && outputRule.type==1">{{getAttrValue(outputRule)}}</span>
                    <span v-if="index>0 && outputRule.type==2">{{getWhichName(outputRule.which)}}</span>
                </el-form-item>
            </el-col>

        </el-row>


        <el-row>
             <div class="el-sub-panel-heading"><h4 class="sub-title">告警配置</h4></div>
        </el-row>
        <el-row>
            <el-col :span="11">
        <el-form-item label="启动">
            <span v-if="formRule.alarm.state==1">是</span>
            <span v-if="formRule.alarm.state==2">否</span>
        </el-form-item>
        <template v-if="formRule.alarm.state==1">
            <el-form-item label="重点关注：">
                <span v-if="formRule.alarm.focus==1">是</span>
                <span v-if="formRule.alarm.focus==2">否</span>
            </el-form-item>
            <el-form-item label="告警类型：">
                <span>{{getAlarmTypeName(formRule.alarm.alarmType)}}</span>

            </el-form-item>
            <el-form-item label="告警阶段：">
                 <span>{{getAlarmPhaseName(formRule.alarm.alarmPhase)}}</span>
            </el-form-item>
            <el-form-item label="告警级别：">
                <span>{{getAlarmGradeName(formRule.alarm.alarmGrade)}}</span>
            </el-form-item>
            <!-- {state:1,focus:1,alarmType:'',alarmPhase:'',alarmGrade:'',alarmContext:'',mail:false,message:false}-->
            <el-form-item label="告警内容：">
                <span>{{formRule.alarm.alarmContext}}</span>
            </el-form-item>
            <!-- <el-form-item label="通知方式：">
                <template v-for="item in formRule.alarm.notice ">
                    <span v-if="item==mail">邮件 </span>
                    <span v-if="item==message">短信 </span>
                </template>
            </el-form-item> -->
        </template>
        </el-col>
        </el-row>
        <el-form-item>
            <el-button type="primary" @click="onEdit">编辑</el-button>
            <el-button type="primary" @click="close">返回</el-button>
        </el-form-item>

</el-form>

</div>
</template>
<script>
import {mapActions,mapState} from 'vuex'
import commonAjax from 'components/js/common.js'
export default{
    data(){

        return {
                 outputTimeList:[{name:'满足条件输出',value:'1'},{name:'时间窗口到输出',value:'2'}],
                 configTemplateList:[{name:'普通模板',value:1},{name:'关联模板',value:2},{name:'分组模板',value:3},{name:'威胁情报关联模板',value:4}],

                 timeUnitList:[{name:'秒',value:'s'},{name:'分',value:'m'},{name:'时',value:'h'},{name:'天',value:'d'}],
                 statsTypeList:[{name:'分组计数',value:'count'},{name:'分组累加',value:'sum'}],
                 whichList:[{name:'最后一个',value:'last'},{name:'第一个',value:'first'}],

                 compareFuncList:[{value:'>',name:'大于'},{value:'<',name:'小于'},{value:'=',name:'等于'}],
                 relationList:[{name:'且',value:'&'},{name:'或',value:'|'}],
                 identityList:['A','B','C','D','E','F','G'],
                 eventTypeList:[],
                 alarmGradeList:[],
                 alarmPhaseList:[],
                 alarmTypeList:[],
                 ruleSubSystemList:[]
        }
    },

    computed:{
        ...mapState({
           formRule:state=>state.context.formRule,
           subSystemList:state=>state.context.subSystemList,
           attrData:state=>state.context.attrData,
           ruleTypeList:state=>state.context.ruleTypeList,
           funcData:state=>state.context.funcData,
           deviceInfo:state=>state.context.deviceInfo,
           deviceInfo2:state=>state.context.device2Info,
           eventAttrData:state=>state.context.eventAttrData,
           attrFuncList:state=>state.context.attrFuncList,
           attrParamList:state=>state.context.attrParamList,
           event2TypeList:state=>state.context.event2TypeList,
           eventOutAttrValueList:state=>state.context.eventOutAttrValueList,
           configTypeInfo:state=>state.context.configTypeInfo

        })
    },
    methods:{
            ...mapActions({
			    setEditPanel:'setEditPanel'

            }),
            onEdit:function(){
                this.formRule.title="编辑规则";
                this.setEditPanel(1);
            },
            close:function(){
                this.setEditPanel(0);
            },
            getoutputTimeName:function(val){
              for(var item in this.outputTimeList){
                if (val==this.outputTimeList[item].value){
                  return this.outputTimeList[item].name;
                  break;
                }
              }
            },
            getConfigTypeName:function(val){
                for(var item in this.configTypeInfo){
                  if (val==this.configTypeInfo[item].id){
                    return this.configTypeInfo[item].configtypename;
                    break;
                  }
                }
            },getRuleTypeName:function(ruleType){
                for(var item of this.ruleTypeList){
                    for(var type of item.children){
                        if(type.id==ruleType){
                            return type.name;
                        }
                    }
                }
            },
            getOutputEventTypeName:function(eventTypeId){
              for(var group of this.eventTypeList){
                  for(var type of group.children){
                      if(type.id==eventTypeId){
                          return type.remark;
                      }
                  }
              }
            },
            getEventTypeName:function(eventTypeId){
                for(var group of this.eventTypeList){
                    for(var type of group.children){
                        if(type.id==eventTypeId){
                            return type.remark;
                        }
                    }
                }
            },getEventTypeName2:function(eventTypeId,configtypeId){
              if (configtypeId==2){
                for(var group of this.event2TypeList){
                    for(var type of group.children){
                        if(type.id==eventTypeId){
                            return type.remark;
                        }
                    }
                }
              }else if (configtypeId==1){
                  for(var group of this.deviceInfo2){
                     if(group.id==eventTypeId){
                        return group.device_vendor;
                    }
                  }
              }
            },
            getEventTypeName3:function(configtypeId,eventTypeId){
              if (configtypeId==2){
                for(var group of this.eventTypeList){
                    for(var type of group.children){
                        if(type.id==eventTypeId){
                            return type.remark;
                        }
                    }
                }
              }else if (configtypeId==1){
                  for(var group of this.deviceInfo){
                     if(group.id==eventTypeId){
                        return group.device_vendor;
                    }
                  }
              }
            },
            getEventTypeNameNew:function(configtypeId,configEvent,configName){

                if (configtypeId==3){
                  return   configName;
                }else{
                  return   this.getEventTypeName3(configtypeId,configEvent);
                }
            },getRelationConditionName:function(relationValue){
               // relationList:[{name:'且',value:'&'},{name:'或',value:'|'}],
               for(var relation of this.relationList){
                   if(relation.value==relationValue){
                       return relation.name;
                   }
               }
            },getTimeUnit:function(value){
                for(var item of this.timeUnitList){
                   if(item.value==value){
                       return item.name;
                   }
               }
            },getWhichName:function(value){
                for(var item of this.whichList){
                   if(item.value==value){
                       return item.name;
                   }
               }
            },getAlarmTypeName:function(value){
                for(var item of this.alarmTypeList){
                   if(item.value==value){
                       return item.name;
                   }
               }
            },getAlarmPhaseName:function(value){
                for(var item of this.alarmPhaseList){
                   if(item.value==value){
                       return item.name;
                   }
               }
            },getAlarmGradeName:function(value){
                for(var item of this.alarmGradeList){
                   if(item.value==value){
                       return item.name;
                   }
               }
            },getSelectTemplateState:function(value){
                if(value==this.formRule.configTemplate)
                    return false;
                else
                    return true;
            },getAttrName:function(name){
                for(var item of this.attrData){
                    if(name==item.attrName)
                        return item.attrDesc
                }
            },getFilterFuncName:function(funcName){
                for(var item of this.funcData){
                    if(item.functionName==funcName)
                        return item.functionDesc
                }
            },getOutputAttrName:function(name){
                for(var item of this.formRule.outputAttrData){
                    if(item.attrName==name)
                        return item.attrDesc
                }

            },getCompareFunc:function(value){
                for(var item of this.compareFuncList){
                    if(item.value==value)
                        return item.name;
                }
            },getGroupAttrName:function(group){
                var groupAttrName=[];
                for(var item of group){
                    groupAttrName.push(this.getAttrName(item))
                }
                return groupAttrName;
            },getFilterParamDesc:function(value){
                for(var item of this.attrParamList){
                    if(item.attrValue==value){
                        return item.valueDesc
                    }
                }
            },
             getAttrValue:function(outputRule){
                for(var item of outputRule.valueData){
                    if(item.value == outputRule.which){
                        return item.name
                    }
                }
            },getRuleSubSystemName:function(rule){
                for(var item of this.ruleSubSystemList){
                    if(rule== item.ruleId)
                        return item.ruleName
                }
            }


    },
    created:async function(){
        commonAjax.req('/ssa/ruleManage2/getEventTypeList.do').then((data)=>{
                    this.eventTypeList=data;
                })
        var param={};
        param.types='ALARMPHASE,ALARMGRADE'
        commonAjax.req('/ssa/ruleManage2/getSysDictList.do',param).then((data)=>{
            for(var item of data){
                if(item.type=='ALARMTYPE')
                    this.alarmTypeList.push(item);
                if(item.type=='ALARMPHASE')
                    this.alarmPhaseList.push(item);
                if(item.type=='ALARMGRADE')
                    this.alarmGradeList.push(item);
            }

        })

        await commonAjax.req('/ssa/ruleManage2/getEventThreeType2.do').then((data)=>{
                    this.alarmTypeList=data;
                })
        await commonAjax.req('/ssa/ruleManage2/getRuleAllList.do').then((data)=>{
                    this.ruleSubSystemList=data;
                })
    },
}
</script>
<style>
    .el-date-editor--date.el-input {
    width: 100%;
}
</style>
