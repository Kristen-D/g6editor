import * as types from '../mutation-types'
import common from 'components/js/common.js'

const state = {
  menuId: "m08_02",
  repositoryForm: {
    tags:[],
    marks: "",
    title: "",
    qryTitle:"",
    content: ""
  },
	defConf:{
		total:0,
		pageSize:5,
		pageIndex:1,
	},
	params:{},
  saveRepositoryUrl: "/ssa/infoCenter_repository/saveData.do",
	getRepositoryUrl:"/ssa/infoCenter_repository/getDataListBysolr.do",
  delRepositoryUrl:"/ssa/infoCenter_repository/delData.do",
	tableData:[]
}


const getters = {

}

const actions = {
async saveRepository({
    state,
    commit
  },[context]) {
    state.repositoryForm.marks = state.repositoryForm.tags.join(",");
    var result = await common.reqBackState(state.saveRepositoryUrl,state.repositoryForm,context);
		return result;
  },
	async getRepository({state,commit},[context]){
   state.params.pageIndex = state.defConf.pageIndex;
	 state.params.pageSize = state.defConf.pageSize;
	 state.params.rawMsg = state.repositoryForm.qryTitle ;
	 var result = await common.req(state.getRepositoryUrl,state.params,context);
   commit("formatData",result);
	 return  state.tableData ;
 },
 async deleteRepository({state,commit},[context,repo_id]){
   state.params.repo_id  = repo_id;
    var result = await common.req(state.delRepositoryUrl,state.params,context);
    return result;

 },
 async handleCurrentChange ({state,dispatch},[context,pageIndex]){
	 state.defConf.pageIndex = pageIndex;
	 await dispatch("getRepository",[context]);
 }
}


const mutations = {
  //将数据处理后展示
  formatData(state,result){
    state.tableData = result.rowData;
    state.defConf.total = result.total;
    //只显示100字内容
    for(var i in state.tableData){
      var data = state.tableData[i];
      var str=data.rawMsg;

      var obj =  eval('(' + str + ')');
      data.title=obj.cname;
      data.content=obj.brief+" "+obj.patch;
      // console.log(data.content);
     if(data.content.length >100){
        data.showContent = data.content.substring(0,100)+"...";
     }else{
       data.showContent =  data.content;
     }
     data.isVisiable = true;
     //将标签字符串转为数组
    //  var showMarks ="";
    //  if(data.marks != ""){
    //  showMarks  = data.marks.split(",");
     //
    //  }
    //  data.showMarks = showMarks;
    }
  },
  showContent(state,i){
    state.tableData[i].isVisiable = !state.tableData[i].isVisiable;
  },
  //重置表单
  resetForm(state){
    state.repositoryForm.title = "";
    state.repositoryForm.content = "";
    state.repositoryForm.tags = [];
    state.marks = "";
  },

  showDetail(state,i){
    let data = state.tableData[i];
    data.isVisiable = !data.isVisiable;
    state.tableData =   state.tableData.concat();
  }

}




export default {
  state,
  getters,
  mutations,
  actions
}
