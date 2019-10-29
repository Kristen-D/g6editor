import utils from 'components/js/common.js'

const state = {

}

const getters = {

}

const actions = {

  async getSystemSignDetail({commit,state}, [params]) {
    var result = await utils.req("/ssa/processMgmt/getHiVarsByTaskId.do", params, this);
    var data = {};
    data.attachment_filepath = result[0].textValue;
    data.attachment_filename = result[1].textValue;
    return data;
  },
  async getSystemCheckDetail({commit,state}, [params]) {
    var result = await utils.req("/ssa/processMgmt/getHiVarsByTaskId.do", params, this);
    var data = {};
    data.isPass = result[0].longValue;
    data.reason = result[1].textValue;
    if(!data.isPass){
      data.attachment_filepath = result[2].textValue;
      data.attachment_filename = result[3].textValue;
    }
    return data;
  },
  async getSystemIssuedDetail({commit,state}, [params]) {
    var result = await utils.req("/ssa/processMgmt/getHiVarsByTaskId.do", params, this);
    var data = {};
    data.attachment_filepath = result[0].textValue;
    data.attachment_filename = result[1].textValue;
    return data;
  },
  async getSystemFileCheckDetail({commit,state}, [params]) {
    var result = await utils.req("/ssa/processMgmt/getHiVarsByTaskId.do", params, this);
    var data = {};
    data.isPass = result[0].longValue;
    data.reason = result[1].textValue;
    return data;
  },
  async getSystemRectificationDetail({commit,state}, [params]) {
    var result = await utils.req("/ssa/processMgmt/getHiVarsByTaskId.do", params, this);
    var data = {};
    data.reason = result[0].textValue;
    return data;
  },
  //获取事件上报详细信息
  async getOpinionDetail({
    commit,
    state
  }, [params, tkey]) {
    var data = {};
    if (tkey == "System_Sign") {
      var result = await utils.req("/ssa/processMgmt/getHiVarsByTaskId.do", params, this);
      if (result[0] != undefined) {
        data.attachment_filepath = result[0].textValue;
        data.attachment_filename = result[1].textValue;
      }
    }
    else if (tkey == "System_Check") {
      var result = await utils.req("/ssa/processMgmt/getHiVarsByTaskId.do", params, this);
        data.isPass = result[0].longValue;
        data.reason = result[1].textValue;
        if(!data.isPass){
          data.attachment_filepath = result[2].textValue;
          data.attachment_filename = result[3].textValue;
        }
    }
    else if (tkey == "System_Issued") {
      var result = await utils.req("/ssa/processMgmt/getHiVarsByTaskId.do", params, this);
      if (result[0] != undefined) {
        data.attachment_filepath = result[0].textValue;
        data.attachment_filename = result[1].textValue;
      }
    }
    else if (tkey == "System_FileCheck") {
      var result = await utils.req("/ssa/processMgmt/getHiVarsByTaskId.do", params, this);
        data.isPass = result[0].longValue;
        data.reason = result[1].textValue;
    }
    else if (tkey == "System_Rectification") {
      var result = await utils.req("/ssa/processMgmt/getHiVarsByTaskId.do", params, this);
        data.reason = result[0].textValue;
    }
    else{
      params.varName = "";
      var result2 = await utils.req("/ssa/processMgmt/getHiVarsByTaskId.do", params, this);
      if (result2[0] != undefined) {
        data.reason = result2[0].textValue;
      }
    }
    // if(params.varName != ""){
    //   var result1 = await utils.req("/ssa/processMgmt/getHiVarsByVarNameAndProcessId.do", params, this);
    //   if (result1[0] != undefined) {
    //     data.isPass = result1[0].longValue;
    //   }
    // }
    return data;
  },
  downloadFile({commit,state},[params]) {
    var fileUrl = "/ssa/classifiedP/downloadFile.do?filePath=" + params.filePath + "&fileName=" + params.fileName;
    window.location.href = fileUrl;
  },
}

const mutations = {

}


export default {
  state,
  getters,
  actions,
  mutations
}
