export default {
  createFlow: '/dataflow/flow.do',  // flowName: , contextName: ,
  getFlows: '/dataflow/flows.do',
  getTemplates: '/dataflow/templates.do',
  deleteFlow: '/dataflow/delete.do',
  updateFlow: '/dataflow/updateFlow.do',
  getFlowById: '/dataflow/flowById.do',
  getTemplateById: '/dataflow/templateById.do',
  currentFlowExist: '/dataflow/exist.do',
  changeFlowStatus: '/dataflow/changeFlowStatus.do',
  getJobParams: '/dataflow/jobServerParams.do',
  getTasks: '/dataflow/getTasks.do',
  getStepTasks: '/dataflow/stepTasks.do',
  getContexts: '/dataflow/contexts.do', 
  deleteContext: '/dataflow/context/delete.do',
  updateContext: '/dataflow/context/update.do',
  createContext: '/dataflow/context.do',  
  commandContext:'/ssa/flow/context/commandContext.do',
  getFlowHisJob:'/dataflow/getFlowHisJob.do',
  startFlowJob:'/dataflow/startFlowJob.do',
  onlineServerStart: '/dataflow/onlineServerStart.do',
  stopFlowJob:'/dataflow/stopFlowJob.do',
  getAppList: '/dataflow/app/list.do',
  addApp: '/dataflow/app/add.do',
  updateApp: '/dataflow/app/update.do',
  getAppBySsaAppId: '/dataflow/app/id/',
  delAppBySsaAppId: '/dataflow/app/del/',
 
  getApps:"/springdataflow/apps?page=0&size=1000",
  taskExecutions: '/springdataflow/tasks/executions',
  taskDefinitions: '/springdataflow/tasks/definitions',
  toolConvertToText: '/springdataflow/tools/convertTaskGraphToText',
  toolParseTaskTextToGraph: '/springdataflow/tools/parseTaskTextToGraph',

  getJobsByFlowId: '/dataflow/jobsByFlowId/',
  getTaskByStepExecutionId: '/dataflow/taskByStepExecutionId/',
  getModelPreviewByJobId: '/dataflow/modelPreviewByJobId/',
  getModelLogByJobId: '/dataflow/modelLogByJobId/',
  getDictByType: '/dataflow/dictByType.do',
  appSubmit: '/dataflow/app/submit.do'
}