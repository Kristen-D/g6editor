
import * as types from '../mutation-types'
import commonAjax from 'components/js/common.js'

const state = {
   searchPanel:0,
   editPanel:0,
   queryCondition:{currentPage:1,pageSize:10,type:'simple',ruleName:'',ruleType:0,status:'',enableAlarm:'',ruleTypeList:[]},
   ruleList:[],
   ruleTotal:1,
   multipleSelection: [],
   checkHeadCols:['编号','规则分类','规则描述','规则名称','状态','时间窗口','修改时间'],

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
                    prop:'ruleDesc',
                    label:'规则描述',
                    overflowTooltip:'false'
                },
                // {
                //     prop:'alarmTypeName',
                //     label:'告警类型',
                //     overflowTooltip:'false'
                // },{
                //     prop:'alarmGradeName',
                //     label:'告警级别',
                //     overflowTooltip:'false'
                // },
                {
                    prop:'statusTime',
                    label:'修改时间',
                    overflowTooltip:'false'
                },{
                    prop:'timeWindows',
                    label:'时间窗口',
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
        // identityList:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T'],
          identityList:['1','2','3','4','5','6','7','8','9','10','1','12','13','14','15','16','17','18','19','20'],
        eventAttrData:[],
        ruleTypeList:[],
        eventTypeList:[],
        alarmGradeList:[],
        alarmPhaseList:[],
        alarmTypeList:[],
        attrFuncList:[],
        attrParamList:[],
        deviceTypeList:[],
        ruleAttrData:[],
        alarmAttrData:[],
        eventOutAttrValueList:[],
        eventOutAttrList:[]

}


const getters = {

}


const mutations = {
    [types.SET_CONTEXT_TITLE] (state,name) {
        state.menuName = name;
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
  },setAlarmAttrData(state,data){
      state.alarmAttrData=data
  },setFuncData(state,data){
      state.funcData=data
  },setRuleTypeList(state,list){
      state.ruleTypeList=list;
      console.log("ruleTypeList:"+list)
  },setEventAttrData(state,data){
      state.eventAttrData=data
  },setEventTypeList(state,list){
      state.eventTypeList=list;
  },setDeviceInfoList(state,list){
      state.deviceInfo=list;
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
      commonAjax.req('/ssa/alarmRule/getRuleList.do',context.state.queryCondition,context).then((data)=>{
          context.commit('setRuleList',data.ruleList);
          context.commit('setRuleTotal',data.total);
      })
  },
  getRuleById:function(context){
      var params={};
      params.ruleId=context.state.formRule.ruleId;

      commonAjax.req('/ssa/alarmRule/getRuleById.do',params,context).then((data)=>{
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
      // for(var relation of rule.relation.relations){
      //           relation.attrData = [];
      //           var nextIdentity=[];
      //           for(var i=0;i<rules.length-1;i++){
      //               if(relation.condition[0]==rules[i].identity){
      //                 for (var j=i+1;j<=maxIdentity;j++)
      //                   nextIdentity.push(rules[j].identity);
      //               }
      //           }
      //           if(nextIdentity.length>0){
      //             for(var i1=0; i1<nextIdentity.length;i1++){
      //               var nextIdentity1=nextIdentity[i1];
      //               for(var attr of rule.outputAttrData){
      //                   if(attr.attrName.indexOf(nextIdentity1+".")==0){
      //                       relation.attrData.push(attr);
      //                   }
      //               }
      //             }
      //           }
      // }
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
      if(rule.subRule == undefined){
          rule.subRule=0
      }

      if(rule.cycleEvent == undefined){
          rule.cycleEvent='0'
      }

      // if(rule.stat.distinctField == undefined){
      //   rule.stat.distinctField=[];
      // }
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
          for(var group of context.state.eventTypeList){
              for(var item of group.children){
                  if(item.id ==rule.outputRules[0].which){
                      rule.outputRules[0].whichCascader[0] = group.id+""
                      rule.outputRules[0].whichCascader[1] = item.id+""
                  }
              }
          }

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

    commonAjax.req('/ssa/alarmRule/delRuleById.do',params).then((data)=>{
        context.commit('setMultipleSelection',[]);
        context.dispatch('getRuleList',context.state.queryCondition);
        console.log(data);
    })
  },
  setMultipleSelection:function(context,arr){
     context.commit('setMultipleSelection',arr);
  },
  saveEditRule:function(context,rule){
      context.commit('setEditRule',rule);
  },
  getAttrData:function(context){
      commonAjax.req('/ssa/alarmRule/getAttributeList.do').then((data)=>{
         context.commit('setAttrData',data);

      })
  },

  getAlarmAttrData:function(context){
      commonAjax.req('/ssa/alarmRule/getAlarmAttributeList.do').then((data)=>{
         context.commit('setAlarmAttrData',data);

      })
  },
  getFuncData:function(context){
      commonAjax.req('/ssa/alarmRule/getFunctionList.do').then((data)=>{
         context.commit('setFuncData',data);

      })
  },
  getEventAttrData:function(context){
      commonAjax.req('/ssa/alarmRule/getEventAttrList.do').then((data)=>{
         context.commit('setEventAttrData',data);

      })
  },
  setRuleTypeList:function(context,list){
      context.commit('setRuleTypeList',list);
  },
  setEventTypeList:function(context,list){
      context.commit('setEventTypeList',list);
  },
  setDeviceInfoList:function(context,list){
      context.commit('setDeviceInfoList',list);
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
      commonAjax.req('/ssa/alarmRule/getAttrFunctionList.do').then((data)=>{
                    context.commit('setAttrFuncList',data);

                })
  },
  getAttrParamList:function(context){
      commonAjax.req('/ssa/alarmRule/getAttrParamList.do').then((data)=>{
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
        commonAjax.req('/ssa/alarmRule/getEventOutAttrValueList.do').then((data)=>{
                    context.commit('setEventOutAttrValueList',data);
        })
  },
  getEventOutAttrList:function(context){
        commonAjax.req('/ssa/alarmRule/getEventOutAttrList.do').then((data)=>{
                    context.commit('setEventOutAttrList',data);
        })
  },
  getAlarmTypeList:function(context){
      commonAjax.req('/ssa/alarmRule/getAlarmTypeList.do').then((data)=>{
                     context.commit('setAlarmTypeList',data);
                })
  },
  getAlarmGradeList:function(context){
      commonAjax.req('/ssa/alarmRule/getAlarmGradeList.do').then((data)=>{
                     context.commit('setAlarmGradeList',data);
                })
  }

}


export default {
  state,
  getters,
  mutations,
  actions
}
