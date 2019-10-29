<template>

    <el-form ref="complexCondition" :model="complexCondition" label-width="120px">
        <el-row>
            <el-col :span="8">
                <el-form-item label="规则编号">
                    <el-input v-model="complexCondition.ruleCode" placeholder="编号"></el-input>
                </el-form-item>
            </el-col> 
            <el-col :span="8">
                <el-form-item label="状态">
                    <el-select v-model="complexCondition.status" placeholder="状态">
                    <el-option label="正常" value="1"></el-option>
                    <el-option label="修改" value="0"></el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="规则名称">
                    <el-input v-model="complexCondition.ruleName" placeholder="规则名称"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="8">
                <el-form-item label="状态时间">
                    <el-date-picker
                    v-model="complexCondition.statusTimeRange"
                    type="daterange"
                    placeholder="选择日期范围">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="生效时间">
                    <el-date-picker
                    v-model="complexCondition.effectTimeRange"
                    type="daterange"
                    placeholder="选择日期范围">
                    </el-date-picker>
                </el-form-item>
            </el-col>
            <el-col :span="8">
                <el-form-item label="过期时间">
                    <el-date-picker
                    v-model="complexCondition.expiredTimeRange"
                    type="daterange"
                    placeholder="选择日期范围">
                    </el-date-picker>
                </el-form-item>
            </el-col>
        </el-row>       
        <el-row> 
            <el-col :span="8">
                <el-form-item label="规则描述">
                    <el-input v-model="complexCondition.ruleDesc" placeholder="规则描述"></el-input>
                </el-form-item>
            </el-col>
             <el-col :span="8">
                <el-form-item label="维护人员">
                    <el-input v-model="complexCondition.operatorId" placeholder="维护人员"></el-input>
                </el-form-item>
            </el-col> 
             <el-col :span="8">
                <el-form-item label="适用系统">
                    <el-input v-model="complexCondition.subSystem" placeholder="适用系统"></el-input>
                </el-form-item>
            </el-col>  
        </el-row>
        <el-row>
            <el-col :span="8" :offset="8">
                <el-form-item>
                    <el-button type="primary" @click="complexQuery">查询</el-button>
                </el-form-item>
            </el-col>
            <el-col :span="4" :offset="4">
                <el-form-item>
                    <el-button type="text" v-on:click="setSearchPanel(0)">普通搜索<i class="el-icon-arrow-up el-icon--right"></i>
                    </el-button>
                </el-form-item>
            </el-col>
        </el-row>
    </el-form>

</template>
<script>
import {mapActions,mapState} from 'vuex'
    export default {
        data(){
            return{
                complexCondition:{
                    ruleCode:'',
                    ruleName: '',
                    ruleDesc: '',
                    effectTimeRange:'',
                    expireTimeRange:'',
                    status:'',
                    statusTimeRange:'',
                    operatorId:'',
                    subSystem:''
                }
               
            }
        },
        computed:{
        ...mapState({
            queryCondition:state=>state.context.queryCondition
        })
        },
        methods:{
            ...mapActions({
			    setSearchPanel:'setSearchPanel',
                getRuleInfo:'getRuleInfo',
                setQueryCondition:'setQueryCondition'
            }),
            complexQuery:function(){
                this.queryCondition.type="complex";
                this.queryCondition.complexCondition=this.complexCondition;
                this.queryCondition.currentPage=1;
                this.setQueryCondition(this.queryCondition);
                this.getRuleInfo(this.queryCondition);
            }
        }
    }
</script>
<style>
.el-select {
    display: inline-block;
    position: relative;
    width: 100%;
}
.el-row {
    margin-bottom: 5px;
}
.el-date-editor--daterange.el-input {
    width: 100%;
}
</style>