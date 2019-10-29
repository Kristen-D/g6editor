<template>
<el-form ref="formRule" :model="formRule"  :rules="rules" label-width="120px">
     <el-row>
            <div class="el-sub-panel-heading"><h4 class="sub-title">告警配置</h4></div>
        </el-row>
        <el-row>
            <el-col :span="11">
        <el-form-item label="启动：">
            <el-radio-group v-model="formRule.alarm.state">
                <el-radio label="1">是</el-radio>
                <el-radio label="2">否</el-radio>
            </el-radio-group>
        </el-form-item>
        <template v-if="formRule.alarm.state==1">
            <el-form-item label="重点关注：">
                <el-radio-group v-model="formRule.alarm.focus">
                <el-radio label="1">是</el-radio>
                <el-radio label="2">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="告警类型：" prop="alarm.alarmType" :rules="{required: true, message: '告警类型不能为空', trigger: 'change'}">
                            <el-select v-model="formRule.alarm.alarmType">
                                                    <el-option v-for="item in alarmTypeList"
                                                        :key="item.value"
                                                        :label="item.name"
                                                        :value="item.value">
                                                    </el-option>
                                                    
                            </el-select>
            </el-form-item>
            <el-form-item label="告警阶段："  prop="alarm.alarmPhase" :rules="{required: true, message: '告警阶段不能为空', trigger: 'change'}">
                            <el-select v-model="formRule.alarm.alarmPhase">
                                                    <el-option v-for="item in alarmPhaseList"
                                                        :key="item.value"
                                                        :label="item.name"
                                                        :value="item.value">
                                                    </el-option>
                                                    
                            </el-select>
            </el-form-item>
            <el-form-item label="告警级别："  prop="alarm.alarmGrade" :rules="{required: true, message: '告警级别不能为空', trigger: 'change'}">
                            <el-select v-model="formRule.alarm.alarmGrade">
                                                    <el-option v-for="item in alarmGradeList"
                                                        :key="item.value"
                                                        :label="item.name"
                                                        :value="item.value">
                                                    </el-option>
                                                    
                            </el-select>
            </el-form-item>
            <!-- {state:1,focus:1,alarmType:'',alarmPhase:'',alarmGrade:'',alarmContext:'',mail:false,message:false}-->
            <el-form-item label="告警内容："  prop="alarm.alarmContext" :rules="{required: true, message: '告警内容不能为空', trigger: 'blur'}">
                <el-input type="textarea" v-model="formRule.alarm.alarmContext"></el-input>
            </el-form-item>
            <el-form-item label="通知方式：">
                <el-checkbox-group v-model="formRule.alarm.notice">
                <el-checkbox label="mail">邮件</el-checkbox>
                <el-checkbox label="message">短信</el-checkbox>
            </el-checkbox-group>
            </el-form-item>
        </template>
        </el-col>
        </el-row>
</el-form>
</template>  
<script>
import {mapActions,mapState} from 'vuex'
import commonAjax from 'components/js/common.js'
export default{
    data(){
        return{
            alarmTypeList:[],
            alarmPhaseList:[],
            alarmGradeList:[]
        }
    },
    computed:{
        ...mapState({
           formRule:state=>state.context.formRule
        })
    },
    created:function(){
        var param={};
        param.types='ALARMTYPE,ALARMPHASE,ALARMGRADE'
        commonAjax.req('/ssa/ruleManage2/getSysDictList.do',param).then((data)=>{
            for(var item of data){
                if(item.type=='ALARMTYPE')
                    this.alarmTypeList.push(item);
                if(item.type=='ALARMPHASE')
                    this.alarmPhaseList.push(item);
                if(item.type=='ALARMGRADE')
                    this.alarmGradeList.push(item);
            }
     
        })
        
    }
}    
</script>
<style>
    
</style>