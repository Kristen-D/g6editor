import commonAjax from 'components/js/common.js'

const state = {
  dispatchConfig:{
    title:'太原网安网络攻击-网络安全指挥调度',
    id:0,
    report:false,
    endTime:0,
    currentStage:2,
    //开始和计时,stage=1
    timerStart:true,
    startDate:'',
    startDate1:new Date(2017, 6, 24, 18, 40),
    timer:-1,


    startColor:'blue',
    relevantDepartmentColor:'blue',
    securityMonitorColor:'',
    securityEventColor:'blue',
    //预警审批 stage=2
    warningApproveColor:'blue',
    warningApproveYColor:'blue',
    warningApproveNColor:'',

    //预警分级 stage=3
    warningLevelColor:'',
    warningLevelYellowColor:'',
    warningLevelOrangeColor:'',
    warningLevelRedColor:'',
    //应急响应审批
    emergencyApproveColor:'',
    emergencyApproveYColor:'',
    emergencyApproveNColor:'',

    //预警响应结束 stage=5
    warningEndColor:'',
    warningDismissColor:'',
    warningArchiveColor:'',
    
    //信息报告 stage=6
    infoReportColor:'',
    departmentInfoUploadColor:'',
    orgInfoUploadColor:'',
    reportToGovernmentColor:'',
    reportToHeadQuarterColor:'',
    //先期处理 stage=7
    earlyDealingColor:'',
    //基本响应
    baseResponseColor:'',
    memberColor:'',
    expertColor:'',
    talentPoolColor:'',
    fieldManagerColor:'',
    publishWarningColor:'',
    professionalManColor:'',
    professionalTeamColor:'',

    //响应分级
    emergencyLevelColor:'',
    emergencyLevel1Color:'',
    emergencyLevel2Color:'',
    emergencyLevel3Color:'',
    emergencyLevel4Color:'',
    emergencySuggestColor:'',
    emergencyExamineColor:'',
    emergencyStartColor:'',
    emergencyEstablishColor:'',
    emergencyEndColor:'',
    //后期响应
    laterDealingColor:'',
    summaryColor:'',
    commendColor:'',
    punishColor:'',
  }
}


const getters = {

}


const mutations = {
  setDispatchConfig(state,obj){
      state.dispatchConfig=obj;
  }
}

const actions = {
    setDispatchConfig:(context,obj)=>{
      context.commit('setDispatchConfig',obj);
    },
    initDispatchConfig:(context)=>{
        var dispatchConfig=context.state.dispatchConfig;
          for(var item in dispatchConfig){
              if(item.indexOf('Color')>0)
                dispatchConfig[item]=''
          }
          dispatchConfig.timerStart=false
          dispatchConfig.timer=-1
          dispatchConfig.currentStage=0
          dispatchConfig.startDate1=new Date()
          dispatchConfig.report=false
          dispatchConfig.endTime=0
     

          var params={};
          params.name=dispatchConfig.title
          params.config=JSON.stringify(dispatchConfig)
          commonAjax.req('/ssa/dispatchCenter/saveRecord.do',params).then((data)=>{
              dispatchConfig.id=data.id
          })
          context.commit('setDispatchConfig',dispatchConfig)
      }
 }


export default {
  state,
  getters,
  actions,
  mutations
}
