
import commonAjax from 'components/js/common.js'
const state = {
  editPanel:0,
  checkHeadCols:['部门','姓名','职务','警衔','警员编号','联系方式'],
  tableTotal:0,
  tableList:[],
  multipleSelection:'',
  queryCondition:{currentPage:1,pageSize:10,name:'',rank:'',code:'',type:'simple',department:''},
  tableHeadCols:[{prop:'id',label:'编号',overflowTooltip:false
    },{
        prop:'department',label:'部门',overflowTooltip:false
  },{
        prop:'name',label:'姓名',overflowTooltip:false
  },{
        prop:'duty',label:'职务',overflowTooltip:false
  },{
        prop:'rank',label:'警衔',overflowTooltip:false
  },{
        prop:'code',label:'警员编号',overflowTooltip:false
  },{
        prop:'phone',label:'联系方式',overflowTooltip:false
  }],
  selectedDepartment:'',
  formStaff:{},
  formDepartment:{},
  listRank:[],
  listOrg:[],
  selectedDepartment:''
}


const getters = {

}


const mutations = {
    setEditPanel(state,value){
        state.editPanel=value
    },
    setHeadCols(state,arr){
        state.checkHeadCols=arr
    },
    setStaffList(state,arr){
        state.tableList=arr
    },
    setStaffTotal(state,val){
        state.tableTotal=val;
    },
    setMultipleSelection(state,val){
        state.multipleSelectionS=val;
    },
    setDepartment(state,val){
        state.selectedDepartment=val;
        state.queryCondition.department=val;
    },
    setStaff(state,obj){
        state.formStaff=obj;
    },
    setFormDepartment(state,obj){
        state.formDepartment=obj;
    },
    setEditStaff(state,obj){
        state.formStaff=obj;
    },
    setPoliceRank(state,list){
        state.listRank=list;
    },
    setOrgList(state,list){
        state.listOrg=list;
    }
}

const actions={
    setEditPanel:(context,value)=>{
        context.commit('setEditPanel',value)
    },
    setHeadCols:(context,arr)=>{
        context.commit('setHeadCols',arr);
    },
    getStaffList:function(context,params){
        context.commit('setMultipleSelection',[]);
        commonAjax.req('/ssa/netSecurityPolice/getPoliceList.do',params,context).then((data)=>{
            context.commit('setStaffList',data.staffList);
            context.commit('setStaffTotal',data.total);
            console.log(data);
        })
    },
    delMultiStaff:function(context){
      var params={};
      var staffIds=[];
      var select=context.state.multipleSelection;
      if(select.length>0){
          for(var i=0;i<select.length;i++){
              staffIds.push(select[i].id);
          }
          params.ids=staffIds.join(",");

          commonAjax.req('/ssa/netSecurityPolice/delMultiStaff.do',params,context).then((data)=>{
              context.dispatch('getStaffList',context.state.queryCondition);      
              console.log(data);
          })
      }
    },
    getStaffById:function(context){
      var params={};
      params.id=context.state.formStaff.id;

      commonAjax.req('/ssa/netSecurityPolice/getStaffById.do',params,context).then((data)=>{
           context.commit('setEditStaff',data);
      })
    },
    deleteStaffById:function(context,val){
        var params={};
        params.id=val;
        commonAjax.req('/ssa/netSecurityPolice/delStaffById.do',params,context).then((data)=>{
            context.dispatch('getStaffList',context.state.queryCondition);        
        })
    },
    setDepartment:function(context,val){
        context.commit('setDepartment',val)
    },
    setStaff:function(context,obj){
        context.commit('setStaff',obj)
    },
    setFormDepartment:function(context,obj){
        context.commit('setFormDepartment',obj)
    },
    getDepartmentById:function(context){
        var params={};
        params.id=context.state.selectedDepartment;
        commonAjax.req('/ssa/netSecurityPolice/getDepartmentById.do',params).then((data)=>{
             context.commit('setFormDepartment',data);
                   
        })
    },
    saveEditDepartment:function(context,params){
        if(params.new==true){
             commonAjax.req('/ssa/netSecurityPolice/saveDepartment.do',params).then((data)=>{
                 context.commit('setFormDepartment',data);
                   
            })
        }else{
             commonAjax.req('/ssa/netSecurityPolice/updateDepartment.do',params).then((data)=>{      
            })
        }
        
    },
    setPoliceRank:function(context,list){
        context.commit('setPoliceRank',list)
    },
    getOrgList:function(context){
        commonAjax.req('/ssa/netSecurityPolice/getOrgList.do').then((data)=>{
            context.commit('setOrgList',data)   
        })
    }
}


export default {
  state,
  getters,
  mutations,
  actions
}
