<template>
<div>
    
    <el-row :gutter="10" class="my-panel-title">
        <el-col :span="6"><el-button type="primary">组织机构</el-button></el-col>
        <el-col :span="3" :offset="6"><el-button type="primary" @click="newDepartment"><i class="fa fa-plus"></i></el-button></el-col>
        <el-col :span="3"><el-button type="primary" @click="delDepartment"><i class="fa fa-minus"></i></el-button></el-col>
        <el-col :span="3"><el-button type="primary" @click="editDepartment"><i class="fa fa-edit"></i></el-button></el-col>
        <el-col :span="3"><el-button type="primary" @click="getDepartmentList"><i class="fa fa-refresh"></i></el-button></el-col>
    </el-row>
    <el-tree
      :data="this.data1"
      :props="options"
      node-key="id"
      show-checkbox
      ref="tree"
      highlight-current="true"
      :default-checked-keys="[this.selectedDepartment]"
      @node-click="onNodeClicked"
      @check-change="currentChange"
    ></el-tree>
</div>
</template>
<script>
import {mapActions,mapState} from 'vuex'
import commonAjax from 'components/js/common.js'
export default{
    data(){
        return {
            data1: [],
            options: {
                children: 'child',
                label: 'name'
            }
        }
    },
    computed:{
    ...mapState({
       selectedDepartment:state=>state.content.selectedDepartment
    })},
    mounted:function(){
        this.getDepartmentList();
    },
    methods:{
            ...mapActions({
                setDepartment:'setDepartment',
                setEditPanel:'setEditPanel',
                setFormDepartment:'setFormDepartment',
                getDepartmentById:'getDepartmentById'

            }),
            getDepartmentList:function(){
                commonAjax.req('/ssa/netSecurityPolice/getDepartment.do').then((data)=>{
                    this.data1=data;
                })
            },
            onNodeClicked:function(data){
                
                if(this.selectedDepartment!=data.id){
                    var key=this.selectedDepartment;
                    this.selectedDepartment=data.id;
                    this.setDepartment(data.id);
                    if(key!='')
                        this.$refs.tree.setChecked(key,false);
                    this.$refs.tree.setChecked(data.id,true);
                    console.log(data.id); 
                }
                  
            },
            currentChange:function(data,checked){
                console.log(checked+"  "+data.id)
                if(checked==true){
                    
                    if(this.selectedDepartment==''){
                        this.selectedDepartment=data.id;
                        this.setDepartment(data.id);
                    }else if(this.selectedDepartment!=data.id){
                        var key=this.selectedDepartment;
                        this.selectedDepartment=data.id;
                        this.setDepartment(data.id);
                        this.$refs.tree.setChecked(key,false);
                    }                                                                                           
                }else if(data.id==this.selectedDepartment){
                    this.selectedDepartment='';
                    this.setDepartment('');
                }

                //this.$refs.tree.setCheckedKeys([]);
               // this.$refs.tree.setCheckedKeys([data.id]);    
            },
            newDepartment:function(){
                var newDp={new:true,name:'',contract:'',duty:'',email:'',phone:'',mobilePhone:'',orgId:''};
                this.setFormDepartment(newDp);
                this.setEditPanel(2);
            },
            delDepartment:function(){
                var params={};
                params.id=this.selectedDepartment;
                if(this.selectedDepartment==''){
                    alert('请先选择一个部门！')
                    return
                }
                commonAjax.req('/ssa/netSecurityPolice/deleteDepartmentById.do',params).then((data)=>{
                    this.setDepartment('');
                    this.getDepartmentList();
                })

            },
            editDepartment:function(){
                if(this.selectedDepartment==''){
                    alert('请先选择一个部门！')
                }else{
                    this.getDepartmentById();
                    this.setEditPanel(2);
                }
            }
    }
}    
</script>
<style>
    .title{
        font-size:18px
    }
    .my-panel-title{
        color: #fff;
        background-color: #20a0ff;
        border-color: #20a0ff; 
    }

</style>