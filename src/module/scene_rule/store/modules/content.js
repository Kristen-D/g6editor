

import commonAjax from 'components/js/common.js'
const state = {
   searchPanel:0,
   editPanel:0,
   queryCondition:{currentPage:1,pageSize:10,key:''},
   total:0,
   chartOption: {
        title : {
            text: '未来一周气温变化'
        },
        legend: {
            data:['最高气温','最低气温']
        },
        toolbox: {
            show : true,
            feature : {
                mark : {show: true},
                dataView : {show: true, readOnly: false},
                magicType : {show: true, type: ['line', 'bar']},
                restore : {show: true},
                saveAsImage : {show: true}
            }
        },
        calculable : true,
        xAxis : [
            {
                type : 'category',
                boundaryGap : false,
                data : ['周一','周二','周三','周四','周五','周六','周日']
            }
        ],
        yAxis : [
            {
                type : 'value',
                axisLabel : {
                    formatter: '{value} °C'
                }
            }
        ],
        series : [
            {
                name:'最高气温',
                type:'bar',
                data:[11, 11, 15, 13, 12, 13, 10],
                markPoint : {
                    data : [
                        {type : 'max', name: '最大值'},
                        {type : 'min', name: '最小值'}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name: '平均值'}
                    ]
                }
            },
            {
                name:'最低气温',
                type:'line',
                data:[1, -2, 2, 5, 3, 2, 0],
                markPoint : {
                    data : [
                        {name : '周最低', value : -2, xAxis: 1, yAxis: -1.5}
                    ]
                },
                markLine : {
                    data : [
                        {type : 'average', name : '平均值'}
                    ]
                }
            }
        ]
    },
   multipleSelection: [],
   checkHeadCols:['编号','场景名称','场景描述','链接'],
   sceneList:[],
   tableHeadCols:[{
                    prop:'id',
                    label:'编号',
                    overflowTooltip:false
                },{
                    prop:'sceneName',
                    label:'场景名称',
                    overflowTooltip:'show-overflow-tooltip'
                },{
                    prop:'sceneDesc',
                    label:'场景描述',
                    overflowTooltip:'false'
                },{
                    prop:'url',
                    label:'链接',
                    overflowTooltip:'false'
                }],
    showDataHeadCols:[],
    sceneConf:{     
                    id:0,
                    name:'',
                    desc:'',
                    rule:1,
                    url:'',
                    new:false
                },
    sceneTableQueryParam:{ currentPage:1,pageSize:10},
    sceneTableData:[],
    isShowConf:true,
    reportContext:'' 
}
const getters = {

}


const mutations = {
    
  setSearchPanel(state,value){
     state.searchPanel=value
  },
  setEditPanel(state,value){
     state.editPanel=value
  },
  setHeadCols(state,arr){
    
    state.checkHeadCols=arr
  },
  setSceneList(state,arr){
    state.sceneList=arr;
  },
  setQueryCondition(state,obj){
    state.queryCondition=obj;
  },
  setTotal(state,val){
    state.total=val;
  },setMultipleSelection(state,arr){
    state.multipleSelection=arr;
  },
  setChartOption(state,obj){
      //sceneForm:{name:'',desc:'',dataSource:'',checkedFields:[],timeField:'',cycle:'',toolbar:true,chartTypes:[],defaultChartType:'',
       // xAxis:'',xAxisType:'category',yAxis:'',yAxisType:'value',aggregate:'count',series:''}
      state.chartOption.title.text=obj.name;
      state.sceneForm=obj;
      state.sceneTableQueryParam.column=obj.checkedFields;
      state.sceneTableQueryParam.dataSource=obj.dataSource;
      state.sceneTableQueryParam.timeField=obj.timeField;
  },
  setShowDataHeadCols(state,arr){
      state.showDataHeadCols=arr;
  },setSceneTableData(state,arr){
      state.sceneTableData=arr;
  },setSceneTableTotal(state,total){
      state.sceneTableTotal=total
  },setSceneTimeRange(state,arr){
      state.sceneTableQueryParam.timeRange=arr;
  },setSceneConf(state,obj){
      state.sceneConf=obj
  },setIsShowConf(state,bool){
      state.isShowConf=bool;
  },setReportContext(state,val){
      state.reportContext=val;
  }

}

const actions={
  setEditPanel:(context,value)=>{
    context.commit('setEditPanel',value)
  },
  setHeadCols:(context,arr)=>{
    context.commit('setHeadCols',arr);
  }, 
  getRuleSceneList:function(context,params){
     commonAjax.req('/ssa/ruleScene/getRuleSceneList.do',params,context).then((data)=>{
          context.commit('setSceneList',data.ruleSceneList);
          context.commit('setTotal',data.total);
      })
     
  },
  getRuleById:function(context){
      
  },
  setQueryCondition:function(context,obj){
    context.commit('setQueryCondition',obj);
  },
  setEditRuleId:function(context,val){
    
  },
  setMultipleSelection:function(context,arr){
      context.commit('setMultipleSelection',arr);
  },
  deleteRuleSceneById:function(context,val){
      var params={};
      params.id=val;

    commonAjax.req('/ssa/ruleScene/removeRuleSceneById.do',params,context).then((data)=>{
        context.commit('setMultipleSelection',[]);
        context.dispatch('getRuleSceneList',context.state.queryCondition);        
    })
  },
  delMultiRuleScene:function(context){
       var params={};
      var ids=[];
      var select=context.state.multipleSelection;
      if(select.length>0){
          for(var i=0;i<select.length;i++){
              ids.push(select[i].id);
          }
          params.ids=ids.join(",");

          commonAjax.req('/ssa/ruleScene/removeMultiRuleScene.do',params,context).then((data)=>{
              context.commit('setMultipleSelection',[]);
              context.dispatch('getRuleSceneList',context.state.queryCondition);      
          })
      }
  },
  saveEditRule:function(context,rule){
      
  },
  newRuleInfo:function(context){
 
  },
  setChartOption:function(context,obj){
      context.commit('setChartOption',obj)
  },
  setShowDataHeadCols:function(context,arr){
      context.commit('setShowDataHeadCols',arr)
  },
  getSceneTableData:function(context){
     commonAjax.req('/ssa/ruleScene/getSceneTableData.do',this.sceneTableQueryParam,context).then((data)=>{
          context.commit('setSceneTableData',data.sceneTableData);
          context.commit('setSceneTableTotal',data.sceneTableTotal);
      })
  },
  setSceneTimeRange:function(context,arr){
      console.log("setSceneTimeRange:"+arr);
       context.commit('setSceneTableData',arr);
  },
  setSceneConf:function(context,obj){
      console.log(obj.desc)
      context.commit('setSceneConf',obj)
  },
  setIsShowConf:function(context,bool){
      context.commit('setIsShowConf',bool);
  },
  getReportContext:function(context){
     commonAjax.req('/ssa/ruleScene/getReportContext.do').then((data)=>{
          context.commit('setReportContext',data);
         
      })
  },  
  

}


export default {
  state,
  getters,
  mutations,
  actions
}
