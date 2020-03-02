
import * as types from '../mutation-types'
import commonAjax from 'components/js/common.js'

const state = {
   saveFlag: 0,
   searchPanel:0,
   editPanel:0,
   queryCondition:{currentPage:1,pageSize:10,type:'simple',ruleName:'',ruleType:0,status:'',enableAlarm:'',eventTypes:[]},
   ruleList:[],
   ruleTotal:1,
   multipleSelection: [],
   checkHeadCols:['编号','事件','规则分类','规则名称','状态','时间窗口','是否告警'],

   tableHeadCols:[{
                    prop:'ruleId',
                    label:'编号',
                    overflowTooltip:'false',
                    width:70
                },{
                    prop:'ruleName',
                    label:'规则名称',
                    overflowTooltip:true,
                    linkclass:'link'
                },
                {
                    prop:'ruleTypeName',
                    label:'规则分类',
                    overflowTooltip:'false'
                },
                {
                    prop:'eventTypeName',
                    label:'事件',
                    overflowTooltip:'false'
                },{
                    prop:'timeWindows',
                    label:'时间窗口',
                    overflowTooltip:'false',
                    width:100
                },{
                    prop:'enableAlarm',
                    label:'是否告警',
                    overflowTooltip:'false',
                    width:100
                },{
                    prop:'status',
                    label:'状态',
                    overflowTooltip:'false',
                    width:80
                }],
                 //{"ruleId":1,"ruleCode":2001,"ruleName":"预警策略","ruleDesc":"预警子系统预警策略","effectTime":"2017-04-20 10:24:53.0",
      //"expireTime":"2020-12-31 00:00:00.0","status":"1","statusTime":"2017-04-20 10:24:53.0","operatorId":"1","subSystem":null}
        formRule:{
        },
        //ruleId;paramId;paramSubSeq;ruleSubId;paramValue;paramDesc;subRuleDesc;attrId;functionId;
        //statusTime;functionName;paramNum;attrName;updateTime;attrDesc

        attrData:[
                    {attrName:"EVENT_TYPE",attrId:1},
                    {attrName:"EVENT_LEVEL",attrId:2},
                    {attrName:"DURATION",attrId:3},
                    {attrName:"COUNT",attrId:4}
        ],
        funcData:[
                    {functionId:1001,functionName:"=",paramNum:2},
                    {functionId:1002,functionName:"!=",paramNum:1}
        ],
        deviceInfo:[],
        device2Info:[],
        identityList:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T'],
        configTypeInfo:[],
        eventAttrData:[],
        ruleTypeList:[],
        eventTypeList:[],
        event2TypeList:[],
        alarmGradeList:[],
        alarmPhaseList:[],
        alarmTypeList:[],
        attrFuncList:[],
        attrParamList:[],
        deviceTypeList:[],
        ruleAttrData:[],
        eventOutAttrValueList:[],
        eventOutAttrList:[]

}


const getters = {

}


const mutations = {
    [types.SET_CONTEXT_TITLE] (state,name) {
        state.menuName = name;
  },
  changeSaveFlag(state) {
      state.saveFlag++;
  },
  resetSaveFlag(state) {
      state.saveFlag = 0;
  },
  setSearchPanel(state,value){
     state.searchPanel=value
  },
  setEditPanel(state,value){
     state.editPanel=value
  },
  setHeadCols(state,arr){
    console.log(arr);
    state.checkHeadCols=arr
  },
  setRuleList(state,arr){
    state.ruleList=arr;
  },
  setQueryCondition(state,obj){
    state.queryCondition=obj;
  },
  setRuleTotal(state,val){
    state.ruleTotal=val;
  },
  setEditRuleId(state,val){
    state.formRule.ruleId=val;
  },
  setEditRule(state,obj){
    // alert("aa");
    state.formRule=obj;
  },setMultipleSelection(state,arr){
    state.multipleSelection=arr;
  },setRuleConditionData(state,arr){
      state.ruleConditionData=arr;
  },setRuleOutputConditionData(state,arr){
      state.ruleOutputConditionData=arr;
  },addRule(state,data){
      state.ruleList.push(data);
  },setSubSystemList(state,data){
      state.subSystemList=data;
  },setAttrData(state,data){
      state.attrData=data
  },setFuncData(state,data){
      state.funcData=data
  },setRuleTypeList(state,list){
      state.ruleTypeList=list;
      console.log("ruleTypeList:"+list)
  },setEventAttrData(state,data){
      state.eventAttrData=data
  },setEventTypeList(state,list){
      state.eventTypeList=list;
  },setEventTypeList2(state,list){
      state.event2TypeList=list;
  },setDeviceInfoList(state,list){
      state.deviceInfo=list;
  },setDeviceInfoList2(state,list){
      state.device2Info=list;
  },setAlarmTypeList(state,list){
      state.alarmTypeList=list;
  },setAlarmPhaseList(state,list){
      state.alarmPhaseList=list;
  },setAlarmGradeList(state,list){
      state.alarmGradeList=list;
  },setAttrFuncList(state,list){
      state.attrFuncList=list;
  },setAttrParamList(state,list){
      state.attrParamList=list;
  },setDeviceTypeList(state,list){
      state.deviceTypeList=list;
  },setEventOutAttrValueList(state,list){
      state.eventOutAttrValueList=list;
  },setEventOutAttrList(state,list){
      state.eventOutAttrList=list;
  },setConfigTypeList(state,list){
      state.configTypeInfo=list;
  },setRuleAttrDataList(state,list){
      state.ruleAttrData=list;
  }
}

const actions={
  setSearchPanel:(context,value)=>{
    context.commit('setSearchPanel',value)
  },
  setEditPanel:(context,value)=>{
    context.commit('setEditPanel',value)
  },
  setHeadCols:(context,arr)=>{
    context.commit('setHeadCols',arr);
  },
  getRuleList:function(context){
      commonAjax.req('/ssa/ruleManage2/getRuleList.do',context.state.queryCondition,context).then((data)=>{
          context.commit('setRuleList',data.ruleList);
          context.commit('setRuleTotal',data.total);
      })
  },
  getRuleById:function(context){
      var params={};
      params.ruleId=context.state.formRule.ruleId;

      commonAjax.req('/ssa/ruleManage2/getRuleById.do',params,context).then((data)=>{
           context.commit('setEditRule',data);
           console.log('test getRuleById:'+data.ruleDesc);
      })
  },
  setQueryCondition:function(context,obj){
    context.commit('setQueryCondition',obj);
  },
  competeRule:function(context,rule){

       rule.outputAttrData = [];
       var maxIdentity=-1;
      for(var inputEventRule of rule.inputEventRules){
          maxIdentity++;
            inputEventRule.identity=context.state.identityList[maxIdentity];
            inputEventRule.attrData = [];
            //根据事件类型，设置inputEventRule的attrData和outputAttrData
            // if (rule.configtype=='eventType'){
                  for(var item of context.state.eventAttrData){
                          if(inputEventRule.configEvent==item.eventTypeId){
                              for(var attr of context.state.attrData){
                                  if(attr.attrId==item.eventAttrId){
                                      inputEventRule.attrData.push(attr);
                                      var outputAttr1={};
                                      outputAttr1.attrName=inputEventRule.identity+"."+attr.attrName;
                                      outputAttr1.attrDesc="事件("+inputEventRule.identity+")."+attr.attrDesc;
                                      rule.outputAttrData.push(outputAttr1)
                                  }
                              }
                          }
                  }

                  if (rule.configtypeId=='3'){
                    inputEventRule.configEvent=inputEventRule.configName;
                  }
                // alert( JSON.stringify(  rule.outputAttrData));
            // for(var item of context.state.eventOutAttrList){
            //     rule.outputAttrData.push(item)
            // }
            //设置filter的funcData和paramData
            for(var filter of inputEventRule.filters){

                //改变func配置选项,需要attr和function的对应表
                filter.funcData=[];
                for(var item of context.state.attrFuncList){
                    if(item.attrName==filter.attrName){
                        for(var func of context.state.funcData){
                            if(item.functionName==func.functionName){
                                filter.funcData.push(func);
                            }
                        }
                    }
                }
                filter.paramData=[];
                if(filter.attrType==1){
                    for(var item of context.state.attrParamList){
                        if(filter.attrName==item.attrName){
                            filter.paramData.push(item)
                        }
                    }
                }
            }
      }
      //设置relation的attrData
      var rules=rule.inputEventRules;
      for(var relation of rule.relation.relations){
                relation.attrData = [];
                var nextIdentity=[];
                for(var i=0;i<rules.length-1;i++){
                    if(relation.condition[0]==rules[i].identity){
                      for (var j=i+1;j<=maxIdentity;j++)
                        nextIdentity.push(rules[j].identity);
                    }
                }
                if(nextIdentity.length>0){
                  for(var i1=0; i1<nextIdentity.length;i1++){
                    var nextIdentity1=nextIdentity[i1];
                    for(var attr of rule.outputAttrData){
                        if(attr.attrName.indexOf(nextIdentity1+".")==0){
                            relation.attrData.push(attr);
                        }
                    }
                  }
                }
      }
      //设置ouputRule的valueData,补全outputRule.type,
      for(var item of rule.outputRules){
          if(item.type == undefined){
              item.type = 2
              item.valueData=[]
          }
          if(item.type == 1){
                for(var attrValue of context.state.eventOutAttrValueList){
                            if(attrValue.attrName==item.outputAttrName){
                                var o={};
                                o.name=attrValue.valueDesc
                                o.value=attrValue.attrValue
                                item.valueData.push(o)
                            }
                }
          }
      }
      //补全subRule
      // if(rule.subRule == undefined){
      //     rule.subRule=0
      // }

      // if(rule.cycleEvent == undefined){
      //     rule.cycleEvent='0'
      // }

      if(rule.stat.distinctField == undefined){
        rule.stat.distinctField=[];
      }
      //补全ruleFlow
      if(rule.ruleFlow == undefined){
         rule.ruleFlow=[{rule:''}]
      }
      if(rule.ruleTypeCascader == undefined){
          rule.ruleTypeCascader=[]
          //rule.ruleTypeCascader.push(rule.ruleType)
          for(var group of context.state.ruleTypeList){
              for(var item of group.children){
                  if(item.id == rule.ruleType){
                      rule.ruleTypeCascader[0]=group.id+""
                      rule.ruleTypeCascader[1]=rule.ruleType+""
                  }
              }
          }

          console.log(rule.ruleTypeCascader)
      }
      if(rule.outputRules[0].whichCascader == undefined){
          rule.outputRules[0].whichCascader=[]
          // if (rule.configTemplate==4){
          //   for(var group of context.state.event2TypeList){
          //       for(var item of group.children){
          //           if(item.id ==rule.outputRules[0].which){
          //               rule.outputRules[0].whichCascader[0] = group.id+""
          //               rule.outputRules[0].whichCascader[1] = item.id+""
          //           }
          //       }
          //   }
          // }else{
            for(var group of context.state.eventTypeList){
                for(var item of group.children){
                    if(item.id ==rule.outputRules[0].which){
                        rule.outputRules[0].whichCascader[0] = group.id+""
                        rule.outputRules[0].whichCascader[1] = item.id+""
                    }
                }
            }
        // }

      }
      rule.maxIdentity=maxIdentity;
      console.log(JSON.stringify(rule));
  },
  setEditRule:function(context,obj){
    /*补全rule信息*/
    context.dispatch('competeRule',obj);
    context.commit('setEditRule',obj);
  },

  deleteRuleById:function(context,val){
    var params={};
    params.ruleId=val;

    commonAjax.req('/ssa/ruleManage2/delRuleById.do',params).then((data)=>{
        context.commit('setMultipleSelection',[]);
        context.dispatch('getRuleList',context.state.queryCondition);
        console.log(data);
    })
  },
  setMultipleSelection:function(context,arr){
     context.commit('setMultipleSelection',arr);
  },
  /*
  delMultiRule:function(context){
      var params={};
      var ruleIds=[];
      var select=context.state.multipleSelection;
      if(select.length>0){
          for(var i=0;i<select.length;i++){
              ruleIds.push(select[i].ruleId);
          }
          params.ruleIds=ruleIds.join(",");

          commonAjax.req('/ssa/ruleManage2/delMultiRule.do',params,context).then((data)=>{
              context.commit('setMultipleSelection',[]);
              context.dispatch('getRuleList',context.state.queryCondition);
          })
      }
  },*/
  saveEditRule:function(context,rule){
      context.commit('setEditRule',rule);
  },
  getAttrData:function(context){
      commonAjax.req('/ssa/ruleManage2/getAttributeList.do').then((data)=>{
         context.commit('setAttrData',data);

      })
  },
  getFuncData:function(context){
      commonAjax.req('/ssa/ruleManage2/getFunctionList.do').then((data)=>{
         context.commit('setFuncData',data);

      })
  },
  getEventAttrData:function(context){
      commonAjax.req('/ssa/ruleManage2/getEventAttrList.do').then((data)=>{
         context.commit('setEventAttrData',data);

      })
  },
  setRuleTypeList:function(context,list){
      context.commit('setRuleTypeList',list);
  },
  setEventTypeList:function(context,list){
      context.commit('setEventTypeList',list);
  },
  setEventTypeList2:function(context,list){
      context.commit('setEventTypeList2',list);
  },
  setDeviceInfoList:function(context,list){
      context.commit('setDeviceInfoList',list);
  },
  setDeviceInfoList2:function(context,list){
      context.commit('setDeviceInfoList2',list);
  },
  setAlarmTypeList:function(context,list){
      context.commit('setAlarmTypeList',list);
  },
  setAlarmPhaseList:function(context,list){
      context.commit('setAlarmPhaseList',list);
  },
  setAlarmGradeList:function(context,list){
      context.commit('setAlarmGradeList',list);
  },

  getAttrFunctionList:function(context){
      commonAjax.req('/ssa/ruleManage2/getAttrFunctionList.do').then((data)=>{
                    context.commit('setAttrFuncList',data);

                })
  },
  getAttrParamList:function(context){
      commonAjax.req('/ssa/ruleManage2/getAttrParamList.do').then((data)=>{
                    context.commit('setAttrParamList',data);
                })
  },
  /*
  getDeviceTypeList:function(context){
      commonAjax.req('/ssa/ruleManage3/getDeviceTypeList.do').then((data)=>{
                    context.commit('setDeviceTypeList',data);
                })
  },*/
  getEventOutAttrValueList:function(context){
        commonAjax.req('/ssa/ruleManage2/getEventOutAttrValueList.do').then((data)=>{
                    context.commit('setEventOutAttrValueList',data);
        })
  },
  getEventOutAttrList:function(context){
        commonAjax.req('/ssa/ruleManage2/getEventOutAttrList.do').then((data)=>{
                    context.commit('setEventOutAttrList',data);
        })
  },
  getEventTypeList:function(context){
      commonAjax.req('/ssa/ruleManage2/getEventTypeList.do').then((data)=>{
                     context.commit('setEventTypeList',data);
                })
  },
  getEventTypeList2:function(context){
      commonAjax.req('/ssa/ruleManage2/getEventTypeList2.do').then((data)=>{
                     context.commit('setEventTypeList2',data);
                })
  },
  getDeviceInfoList:function(context){
      commonAjax.req('/ssa/ruleManage2/getDeviceInfoList.do').then((data)=>{
                     context.commit('setDeviceInfoList',data);
                })
  },
  getDeviceInfoList2:function(context){
      commonAjax.req('/ssa/ruleManage2/getDeviceInfoList2.do').then((data)=>{
                     context.commit('setDeviceInfoList2',data);
                })
  },
  getConfigTypeList:function(context){
      commonAjax.req('/ssa/ruleManage2/getConfigTypeList.do').then((data)=>{
                     context.commit('setConfigTypeList',data);
                })
  }
  ,
  getRuleAttrDataList:function(context){
      commonAjax.req('/ssa/ruleManage2/getRuleAttrDataList.do').then((data)=>{
                     context.commit('setRuleAttrDataList',data);
                })
  }

}


export default {
  state,
  getters,
  mutations,
  actions
}
