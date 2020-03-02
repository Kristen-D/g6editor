<template>
    <el-form ref="formStaff" :model="formStaff" label-width="120px">
        <el-row>
            <el-col :span="8">
                <el-form-item label="部门">
                    <el-input v-model="formStaff.department"></el-input>
                </el-form-item>
                <el-form-item label="姓名">
                    <el-input v-model="formStaff.name"></el-input>
                </el-form-item>
                <el-form-item label="职务">
                    <el-input v-model="formStaff.duty"></el-input>
                </el-form-item>
                <el-form-item label="警衔" >
                    <el-select v-model="formStaff.rank" clearable class='staffRank'>
                        <el-option
                            v-for="item in listRank"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="警员编号">
                    <el-input v-model="formStaff.code"></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                    <el-input v-model="formStaff.phone"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                    <el-button type="primary" @click="onCanel">刷新</el-button>
                    <el-button type="primary" @click="close">关闭</el-button>
                </el-form-item>
            </el-col>   
        </el-row>       
    </el-form>
</template>
<script>
import {mapActions,mapState} from 'vuex'
import commonAjax from 'components/js/common.js'
export default{
    data(){
        return {
               
                 
        }
    },
    components:{
    },
    computed:{
        ...mapState({
           formStaff:state=>state.content.formStaff,
           listRank:state=>state.content.listRank
        })
    },
    methods:{
            ...mapActions({
			    setEditPanel:'setEditPanel',
                setStaff:'setStaff',
                getStaffById:'getStaffById',
                getStaffList:'getStaffList'
            }),
            onCanel:function(){
                this.getStaffById();
               
            },
            onSubmit:function(){
                var params=this.formStaff;
                console.log
                if(params.new==false){
                    commonAjax.req('/ssa/netSecurityPolice/updateStaff.do',params).then((data)=>{
                        this.getStaffList();
                        this.setEditPanel(0);      
                    })
                }else{
                    commonAjax.req('/ssa/netSecurityPolice/saveStaff.do',params).then((data)=>{
                        this.setStaff(data);
                        this.getStaffList();
                        this.setEditPanel(0);
                    })
                }
            },
            close:function(){
                this.setEditPanel(0);
            }
    }
}   
</script>
<style>
.el-date-editor--date.el-input {
    width: 100%;
}
.staffRank.el-select {
    width:100%
}
</style>