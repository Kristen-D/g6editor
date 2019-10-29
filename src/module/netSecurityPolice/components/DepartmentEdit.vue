<template>
    <el-form ref="formDepartment" :model="formDepartment" :rules="rulesDepartment" label-width="120px">
        <el-row>
            <el-col :span="8">
                <el-form-item label="部门名称：" prop='name'>
                    <el-input v-model="formDepartment.name"></el-input>
                </el-form-item>
                <el-form-item label="联系人：">
                    <el-input v-model="formDepartment.contract"></el-input>
                </el-form-item>
                <el-form-item label="职务：">
                    <el-input v-model="formDepartment.duty"></el-input>
                </el-form-item>
                <el-form-item label="邮件：" prop='email'>
                    <el-input v-model="formDepartment.email" ></el-input>
                </el-form-item>
                <el-form-item label="电话："  prop='phone' >
                    <el-input v-model="formDepartment.phone" placeholder="区号***-******"></el-input>
                </el-form-item>
                <el-form-item label="移动电话：" prop='mobilePhone'  >
                    <el-input v-model="formDepartment.mobilePhone" placeholder="11位手机号码" ></el-input>
                </el-form-item>
                 <el-form-item label="所属机构：" prop='orgId'>
                    <el-select v-model="formDepartment.orgId" clearable class='org'>
                        <el-option
                            v-for="item in listOrg"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('formDepartment')">保存</el-button>
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
        var validateMobile = (rule, value, callback) => {
            var reg=/^((0\d{2,3}-\d{7,8})|(1[345678]\d{9}))$/
            if (value === '') {
                callback(new Error('请输入11位手机号码'))
            } else {
                console.log(reg.test(value)+'  '+value)
                if (reg.test(value)) {
                    callback()
                }else{
                    callback(new Error('请输入11位手机号码'));
                }
            }
        };
        var validatePhone = (rule, value, callback) => {
            var reg=/^((0\d{2,3}-\d{7,8})|(1[345678]\d{9}))$/
            if (value === '') {
                callback(new Error('格式***-********'));
            } else {
                if (reg.test(value)) {
                    callback()
                }else{
                    callback(new Error('格式***-********'));
                }
            }
            };
        return {
            rulesDepartment: {
                name:[
                    { required: true, message: '请输入部门名称', trigger: 'blur' }
                ],
                email: [
                     { type: 'email', required: true,  message: '请输入正确的邮箱地址',trigger: 'change' }
                ],
                phone : [
                    { validator: validatePhone, required:true,trigger: 'blur' }
                ],
                mobilePhone: [
                    { validator: validateMobile,required:true, trigger: 'change' }
                ],
                orgId:[
                    { type:'number',required: true, message: '请选择机构', trigger: 'change' }
                ]
                }
            };
    },
    components:{
    },
    computed:{
        ...mapState({
           formDepartment:state=>state.content.formDepartment,
           listOrg:state=>state.content.listOrg
        })
    },
    methods:{
            ...mapActions({
			    setEditPanel:'setEditPanel',
                saveEditDepartment:'saveEditDepartment',
                getDepartmentById:'getDepartmentById'
                
            }),
            onCanel:function(){
                this.getDepartmentById();
               
            },
            onSubmit:function(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        alert('保存数据!');
                        this.saveEditDepartment(this.formDepartment);
                        this.setEditPanel(0);
                    } else {
                        alert('表单校验不通过!!');
                        return false;
                    }
                });    
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
.org.el-select {
    width:100%
}
</style>