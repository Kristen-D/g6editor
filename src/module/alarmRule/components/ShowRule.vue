<template>
<div>
<h3>{{formRule.title}}</h3>
<el-form ref="formRule" :model="formRule" label-width="120px">
        <el-row>
            <el-col :span="13" >
                <el-form-item label="规则名称：">
                    <span>{{formRule.ruleName}}</span>
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
        <el-row>
            <el-col :span="13">
                <el-form-item label="规则类型：">
                    <span>{{getRuleTypeName(formRule.ruleType)}}</span>
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item label="是否启用：">
                <span v-if="formRule.status==1">是</span>
                <span v-if="formRule.status==2">否</span>
        </el-form-item>
       <div>
        <el-row>
            <div class="el-sub-panel-heading"><h4 class="sub-title">规则条件</h4></div>
        </el-row>
        <template v-for="(inputEventRule,eventRuleIndex) in formRule.inputEventRules">
            <el-row >
                <el-col :span="11">
                    <el-form-item v-bind:label="'条件组('+inputEventRule.identity+')：'">
                    </el-form-item>
                </el-col>
            </el-row>
            <template  v-for="(filter,index) in inputEventRule.filters"  v-if="formRule.configTemplate==101 || formRule.configTemplate==102">
              <!-- <el-row v-if="index >0">
                  <el-col :span="5" :offset="1">
                      <el-form-item v-bind:label="'条件关系'+index+':'" >
                            <span>{{getRelationConditionName(filter.relation)}}</span>
                      </el-form-item>
                  </el-col>
              </el-row> -->
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
            </template>
            <template  v-for="(filter,index) in inputEventRule.filters"  v-if="formRule.configTemplate==104">
              <!-- <el-row v-if="index >0">
                  <el-col :span="5" :offset="1">
                      <el-form-item v-bind:label="'条件关系'+index+':'" >
                            <span>{{getRelationConditionName(filter.relation)}}</span>
                      </el-form-item>
                  </el-col>
              </el-row> -->
              <el-row>
                <el-col :span="10" :offset="1">
                    <el-form-item v-bind:label="'条件'+(index+1)+':'">
                        <span>{{getAlarmAttrName(filter.attrName)}}</span>
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
            </template>
            <el-row>
                <el-col :span="4" :offset="1">
                    <el-form-item label="条件关系:">
                            <span>{{getRelationConditionName(inputEventRule.relation)}}
                            </span>
                    </el-form-item>
                </el-col>
            </el-row>
        </template>
        <template  v-if="formRule.configTemplate==102">
            <el-row >
                <div class="el-sub-panel-heading"><h4 class="sub-title">合并属性</h4></div>
            </el-row>
            <template  v-for="(merge_relation,index) in formRule.merge_relations">
              <el-row>
                <el-col :span="10" :offset="1">
                    <el-form-item v-bind:label="'属性'+(index+1)+':'">
                        <span>{{getAttrName(merge_relation.attrName)}}</span>
                    </el-form-item>
                </el-col>
            </el-row>
              </template>
        </template>
        <template  v-if="formRule.configTemplate==102">
            <el-row >
                <div class="el-sub-panel-heading"><h4 class="sub-title">时间窗口</h4></div>
            </el-row>
            <el-row>
                    <el-col :span="5">
                        <el-form-item label="时间属性：">
                            <span>{{getAttrName(formRule.timeField)}}</span>
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row>
                <el-col :span="5">
                    <el-form-item label="时间窗口：">
                        <span>{{formRule.timeWindow}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                  <el-form-item>
                    <span>{{getTimeUnit(formRule.timeUnit)}}</span>
                  </el-form-item>
                </el-col>
            </el-row>
            <!-- <el-row>
              <el-col :span="5">
                  <el-form-item label="发生次数：">
                      <span>{{getCompareFunc(formRule.compareFunc)}}</span>
                  </el-form-item>
              </el-col>
              <el-col :span="3">
                  <el-form-item>
                      <span> {{formRule.compareValue}}</span>
                  </el-form-item>
              </el-col>
            </el-row> -->
            <el-row>
              <el-col :span="8">
                  <el-form-item label="发生次数:">
                      <div>
                        <div style="width:25%;display:inline-block ;">
                            大于
                        </div>
                        <div style="width:40%;display:inline-block ;">
                          <el-form-item label="">
                            <span>{{formRule.upgrade}}</span>
                          </el-form-item>
                        </div>
                        <div style="width:15%;display:inline-block ;">
                        升级
                        </div>
                      </div>

                      <div>
                        <div style="width:25%;display:inline-block ;">
                              小于
                        </div>
                        <div style="width:40%;display:inline-block ;">
                            <span>{{formRule.degrade}}</span>
                        </div>
                        <div style="width:15%;display:inline-block ;">
                        降级
                        </div>
                      </div>
                  </el-form-item>
              </el-col>
            </el-row>
        </template>

        <template v-if="formRule.configTemplate==104">
            <el-row>
                <div class="el-sub-panel-heading"><h4 class="sub-title">变更条件</h4></div>
            </el-row>
            <el-row>
                    <el-col :span="5">
                        <el-form-item label="时间属性：">
                            <span>{{getAlarmAttrName(formRule.timeField)}}</span>
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row>
                <el-col :span="5">
                    <el-form-item label="门限：">
                        <span>{{formRule.timeThreshold}}</span>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <span>{{getTimeUnit(formRule.timeUnit)}}</span>
                </el-col>
            </el-row>
            <el-form-item label="变更方式：">
                    <span v-if="formRule.alarmRecovery==1">恢复</span>
                    <span v-if="formRule.alarmRecovery==2">升级</span>
            </el-form-item>
       </template>
        </div>
          <template v-if="formRule.configTemplate!=101">
        <el-row>
           <div class="el-sub-panel-heading"><h4 class="sub-title">输出字段</h4></div>
        </el-row>
        <el-row v-for="(outputRule,index) in formRule.outputRules">
          <el-col :span="11">
              <el-form-item v-bind:label="'字段'+(index+1)+'：'">
                  <span>{{getAttrName(outputRule.outputAttrName)}}</span>
              </el-form-item>
          </el-col>
            <!-- <el-col :span="4">
                <el-form-item label="字段" label-width="90px">
                    <span >{{getOutputAttrName(outputRule.srcAttrName)}}</span>
                </el-form-item>
            </el-col> -->
            <el-col :span="4">
                <el-form-item label="取值" label-width="50px">
                    <!-- <span v-if="index==0">{{getEventTypeName(outputRule.which)}}</span> -->
                    <span v-if="outputRule.type==0">{{outputRule.which}}</span>
                    <span v-if="outputRule.type==1">{{getAttrValue(outputRule)}}</span>
                    <span v-if="outputRule.type==2">{{getWhichName(outputRule.which)}}</span>
                </el-form-item>
            </el-col>
        </el-row>
        </template>
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

                 ruleTypeList:[{name:'过滤规则',value:101},{name:'合并规则',value:102},{name:'变更规则',value:104}],

                 timeUnitList:[{name:'秒',value:'s'},{name:'分',value:'m'},{name:'时',value:'h'},{name:'天',value:'d'}],
                 statsTypeList:[{name:'分组计数',value:'count'},{name:'分组累加',value:'sum'}],
                 whichList:[{name:'最后一个',value:'last'},{name:'第一个',value:'first'}],

                 compareFuncList:[{value:'>',name:'大于'},{value:'<',name:'小于'},{value:'=',name:'等于'},{value:'>=',name:'大于等于'},{value:'<=',name:'小于等于'}],
                 relationList:[{name:'且',value:'&'},{name:'或',value:'|'}],
                 identityList:['A','B','C','D','E','F','G'],
                 eventTypeList:[],
                 // alarmGradeList:[],
                 alarmPhaseList:[],
                 // alarmTypeList:[],
                 ruleSubSystemList:[]
        }
    },

    computed:{
        ...mapState({
           formRule:state=>state.context.formRule,
           subSystemList:state=>state.context.subSystemList,
           attrData:state=>state.context.attrData,
           alarmAttrData:state=>state.context.alarmAttrData,
           funcData:state=>state.context.funcData,
           eventAttrData:state=>state.context.eventAttrData,
           attrFuncList:state=>state.context.attrFuncList,
           attrParamList:state=>state.context.attrParamList,
           eventOutAttrValueList:state=>state.context.eventOutAttrValueList,
           alarmTypeList:state=>state.context.alarmTypeList,
           alarmGradeList:state=>state.context.alarmGradeList

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
            getAlarmTypeName:function(val){
                for(var item in this.alarmTypeList){
                  if (val==item.id){
                    return item.text;
                    break;
                  }
                }
            },getRuleTypeName:function(ruleType){
                for(var item of this.ruleTypeList){
                  if (ruleType==item.value){
                    return item.name;
                    break;
                  }
                }
            },getEventTypeName:function(eventTypeId){

                for(var group of this.eventTypeList){
                    for(var type of group.children){
                        if(type.id==eventTypeId){
                            return type.remark;
                        }
                    }
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
            },getAlarmAttrName:function(name){
                for(var item of this.alarmAttrData){
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
    created:function(){
        commonAjax.req('/ssa/ruleManage2/getEventTypeList.do').then((data)=>{
                    this.eventTypeList=data;
                })
        var param={};
        param.types='ALARMTYPE,ALARMPHASE,ALARMGRADE'
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
        commonAjax.req('/ssa/ruleManage2/getRuleAllList.do').then((data)=>{
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
