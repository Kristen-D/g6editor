
import * as types from '../mutation-types'
import commonAjax from 'components/js/common.js'
const state = {
   menuId:"m01",
   menuName:"分析规则",
   searchPanel:0,
   editPanel:0,
   queryCondition:{currentPage:1,pageSize:10,ruleName:'',startTime:'',endTime:'',type:'simple'},
   ruleTotal:0,
   
   multipleSelection: [],
   checkHeadCols:['编号','规则编号','规则名称','状态','状态时间'],
   //ruleList:[],
   ruleList:[{ruleName:'rule1'}],
   tableHeadCols:[{
                    prop:'ruleId',
                    label:'编号',
                    overflowTooltip:false
                },{
                    prop:'ruleName',
                    label:'规则名称',
                    overflowTooltip:'false'
                },
                {
                    prop:'ruleDesc',
                    label:'规则描述',
                    overflowTooltip:'show-overflow-tooltip'
                },
                {
                    prop:'effectTime',
                    label:'生效时间',
                    overflowTooltip:'false'
                },{
                    prop:'expireTime',
                    label:'失效时间',
                    overflowTooltip:'false'
                },{
                    prop:'status',
                    label:'状态',
                    overflowTooltip:'false'
                },{
                    prop:'statusTime',
                    label:'状态时间',
                    overflowTooltip:'false'
                },{
                    prop:'ruleCode',
                    label:'规则编号',
                    overflowTooltip:'false'
                },{
                    prop:'operatorId',
                    label:'操作员',
                    overflowTooltip:'false'
                },{
                    prop:'subSystem',
                    label:'适用子系统',
                    overflowTooltip:'false'
                }],
                 //{"ruleId":1,"ruleCode":2001,"ruleName":"预警策略","ruleDesc":"预警子系统预警策略","effectTime":"2017-04-20 10:24:53.0",
      //"expireTime":"2020-12-31 00:00:00.0","status":"1","statusTime":"2017-04-20 10:24:53.0","operatorId":"1","subSystem":null}
        formRule:{
                    ruleId: '',
                    ruleCode:'',
                    ruleName: 'test',
                    ruleDesc: '',
                    effectTime:'',
                    expireTime:'',
                    status:'',
                    statusTime:'',
                    operatorId:'',
                    subSystem:''
        },
        //ruleId;paramId;paramSubSeq;ruleSubId;paramValue;paramDesc;subRuleDesc;attrId;functionId;
        //statusTime;functionName;paramNum;attrName;updateTime;attrDesc
        ruleConditionData:[
            {attrId:'属性1',attrName:'只读',functionName:'cos',paramNum:2,paramSubSeq:1,paramValue:'param1',modify:false}
        ],
        ruleOutputConditionData:[
            {attrId:'属性1',attrName:'只读',functionName:'cos',paramNum:2,paramSubSeq:1,paramValue:'param1',modify:false}
        ],
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
        subSystemList:[]
     
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
  getRuleInfo:function(context,params){
      commonAjax.req('/ssa/ruleManage/getRuleInfo.do',params,context).then((data)=>{
          context.commit('setRuleList',data.ruleList);
           context.commit('setRuleTotal',data.total);
           console.log(data);
      })
     
  },
  getRuleById:function(context){
      var params={};
      params.ruleId=context.state.formRule.ruleId;

      commonAjax.req('/ssa/ruleManage/getRuleById.do',params,context).then((data)=>{
           context.commit('setEditRule',data);
           console.log('test getRuleById:'+data.ruleDesc);
      })
  },
  setQueryCondition:function(context,obj){
    context.commit('setQueryCondition',obj);
  },
  setEditRuleId:function(context,val){
    context.commit('setEditRuleId',val);
  },

  deleteRuleById:function(context,val){
    var params={};
    params.ruleId=val;

    commonAjax.req('/ssa/ruleManage/delRuleById.do',params,context).then((data)=>{
        context.commit('setMultipleSelection',[]);
        context.dispatch('getRuleInfo',context.state.queryCondition);        
        console.log(data);
    })
  },
  setMultipleSelection:function(context,arr){
     context.commit('setMultipleSelection',arr);
  },
  delMultiRule:function(context){
      var params={};
      var ruleIds=[];
      var select=context.state.multipleSelection;
      if(select.length>0){
          for(var i=0;i<select.length;i++){
              ruleIds.push(select[i].ruleId);
          }
          params.ruleIds=ruleIds.join(",");

          commonAjax.req('/ssa/ruleManage/delMultiRule.do',params,context).then((data)=>{
              context.commit('setMultipleSelection',[]);
              context.dispatch('getRuleInfo',context.state.queryCondition);      
              console.log(data);
          })
      }
  },
  saveEditRule:function(context,rule){
      context.commit('setEditRule',rule);
      commonAjax.req('/ssa/ruleManage/updateRuleInfo.do',rule,context).then((data)=>{
          context.commit('setEditRule',data);
      })
  },
  getRuleConfig:function(context){
      var params={};
      params.ruleId=context.state.formRule.ruleId;

      commonAjax.req('/ssa/ruleManage/getRuleCondition.do',params,context).then((data)=>{
           context.commit('setRuleConditionData',data);
           console.log('getRuleCondition:'+data);
      })
  },
  getRuleOutputCondition:function(context){
      var params={};
      params.ruleId=context.state.formRule.ruleId;
      commonAjax.req('/ssa/ruleManage/getRuleOutputCondition.do',params,context).then((data)=>{
           context.commit('setRuleOutputConditionData',data);
      })
  },
  setRuleConditionData:function(context,data){
      context.commit('setRuleConditionData',data)
  },
  setRuleOutputConditionData:function(context,data){
      context.commit('setRuleOutputConditionData',data)
  },
  newRuleInfo:function(context){
      commonAjax.req('/ssa/ruleManage/saveRuleInfo.do').then((data)=>{
        context.commit('setEditRule',data);
        context.commit('addRule',data); 
        context.dispatch('getRuleConfig');
        context.dispatch('getRuleOutputCondition') 
      })
  },
  getSubSystemList:function(context){
     commonAjax.req('/ssa/ruleManage/getSubSystemList.do').then((data)=>{
         context.commit('setSubSystemList',data);
            
      })
  },
  getAttrData:function(context){
      commonAjax.req('/ssa/ruleManage/getAttributeList.do').then((data)=>{
         context.commit('setAttrData',data);
            
      })
  },
  getFuncData:function(context){
      commonAjax.req('/ssa/ruleManage/getFunctionList.do').then((data)=>{
         context.commit('setFuncData',data);
            
      })
  }

}


export default {
  state,
  getters,
  mutations,
  actions
}
