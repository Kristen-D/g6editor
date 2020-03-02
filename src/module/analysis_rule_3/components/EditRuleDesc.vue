<template>
<el-form ref="formRule" :model="formRule"  :rules="rules" label-width="120px">
        <el-form-item label="选择模板：" >
            <el-radio-group v-model="formRule.configTemplate" @change="templateChange">
                <el-radio-button v-for="item in configTemplateList"    :label="item.value">{{item.name}}</el-radio-button>
            </el-radio-group>
        </el-form-item>
        <el-row>
            <el-col :span="13">
                <el-form-item label="规则名称：" prop="ruleName">
                    <el-input v-model="formRule.ruleName" placeholder="输入不超过64个字符"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="13">
                <el-form-item label="规则分类：" prop="ruleType">
                    <el-select v-model="formRule.ruleType" placeholder="请选择分类">
                        <el-option-group
                        v-for="group in ruleTypeList"
                        :key="group.id"
                        :label="group.name">
                        <el-option
                            v-for="item in group.children"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                        </el-option-group>
                    </el-select>
                </el-form-item>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="13">
                <el-form-item label="规则描述：">
                    <el-input v-model="formRule.ruleDesc" type="textarea" :rows="2" placeholder="输入不超过128字符"></el-input>
                </el-form-item>
            </el-col>
        </el-row>
        <el-form-item label="是否启用：">
            <el-radio-group v-model="formRule.stats">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="2">否</el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="子规则：">
            <el-radio-group v-model="formRule.subRule">
                <el-radio :label="1">是</el-radio>
                <el-radio :label="0">否</el-radio>
            </el-radio-group>
        </el-form-item>
</el-form>
</template>
<script>
import {mapActions,mapState} from 'vuex'
import commonAjax from 'components/js/common.js'
export default{
     data(){
        return {
            configTemplateList:[{name:'普通模板',value:1},{name:'关联模板',value:2},{name:'分组模板',value:3},{name:'串行规则',value:4}],
            rules: {
                    ruleName: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max:64, message: '长度在 3 到 64 个字符', trigger: 'blur' }
                    ],
                    ruleType: [
                        { required: true, message: '请选择规则类型', trigger: 'change' }
                    ]
                }
        }
     },
    computed:{
        ...mapState({
           formRule:state=>state.context.formRule,
           ruleTypeList:state=>state.context.ruleTypeList
        })
    },
    methods:{
        templateChange:function(value){
                switch(value){
                    case 1:
                    case 3:
                        var l=this.formRule.inputEventRules.length
                        this.formRule.inputEventRules.splice(1,l-1);
                        for(var i=0;i<this.formRule.outputAttrData.length;){
                            var outputAttr=this.formRule.outputAttrData[i];
                            if(outputAttr.attrName.indexOf("A.")!=0){
                                this.formRule.outputAttrData.splice(i,1);
                            }else{
                                i++;
                            }
                        }
                        break;
                    case 2:
                        if(this.formRule.inputEventRules.length==1){
                            var inputEventRule={identity:'B',configEvent:'',deviceType:'',attrData:[],filters:[{attrName:'',attrType:'',funcData:[],paramData:[],compareFunc:'=',paramNum:1,compareValue:['','','']}],relation:'&'}
                            this.formRule.inputEventRules.push(inputEventRule);
                        }
                        break;
                    default:
                        console.log("template change do nothing!")
                }
            }
    }
}
</script>
<style>

</style>
