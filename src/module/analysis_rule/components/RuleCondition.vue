
<template>
    <div>
        <el-row>
            <el-col :span="2">规则输入条件</el-col>
            <el-col :span="2"><el-button  size="small" type="text" @click="newRuleCondition">增加</el-button></el-col>
        </el-row>
        <el-table :data="ruleConditionData" border tooltip-effect="dark"  style="width: 100%"  
            :default-sort = "{prop: 'attrId', order: 'ascending'}" @expand="onExpand">
                <el-table-column type="expand">
                    <template scope="props">
                        <el-form label-position="left" inline class="demo-table-expand" label-width="100px">
                        <el-form-item label="条件编号">
                            <el-input v-model="props.row.ruleSubId"></el-input> 
                        </el-form-item>
                        <el-form-item label="属性名称">
                            <el-select v-model="props.row.attrId" @change='selectAttr(props.row)'>
                                <el-option
                                    v-for="item in attrData"
                                        :key="item.attrId"
                                        :label="item.attrName"
                                        :value="item.attrId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="函数">
                            <el-select v-model="props.row.functionId" @change='selectFunc(props.row)'>
                                <el-option
                                    v-for="item in funcData"
                                        :key="item.functionId"
                                        :label="item.functionName"
                                        :value="item.functionId">
                                </el-option>
                            </el-select>
                        </el-form-item>
                                                
                        <el-form-item label="参数编号">
                            <el-input v-model="props.row.paramSubSeq"></el-input> 
                        </el-form-item>
                        <el-form-item label="参数值">
                            <el-input v-model="props.row.paramValue"></el-input> 
                        </el-form-item>
                        <el-form-item label="参数描述">
                            <el-input v-model="props.row.paramDesc"></el-input> 
                        </el-form-item>
                        </el-form>
                    </template>
                </el-table-column>
                <el-table-column 
                    v-for="col in conditionCols"
                    :prop="col.prop" :label="col.label" :show-overflow-tooltip="true" :sortable="true">
                </el-table-column>

                <el-table-column label="操作" >
                    <template scope="scope">
                        <el-button
                        size="small"
                        type="text"
                        :disabled="!scope.row.modify"
                        @click="handleEdit(scope.$index, scope.row)">保存</el-button>
                        <el-button
                        size="small"
                        type="text"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
        </el-table>
    </div>
</template>
<script>
import {mapActions,mapState} from 'vuex'
import commonAjax from 'components/js/common.js'
    export default{
        data(){
            return{
                conditionCols:[
                    //ruleId;paramId;paramSubSeq;ruleSubId;paramValue;paramDesc;subRuleDesc;attrId;functionId;
                    //statusTime;functionName;paramNum;attrName;updateTime;attrDesc;modify
                    {prop:"ruleSubId",label:"条件编号"},
                    {prop:"attrName",label:"属性名称"},
                    {prop:"functionName",label:"函数"},
                    //{prop:"paramNum",label:"参数个数"},
                    {prop:"paramSubSeq",label:"参数编号"},
                    {prop:"paramValue",label:"参数值"},
                    ]
            }
        },
        computed:{
            ...mapState({
                ruleConditionData:state=>state.context.ruleConditionData,
                attrData:state=>state.context.attrData,
                funcData:state=>state.context.funcData,
                formRule:state=>state.context.formRule
        })
        },
        methods: {
            ...mapActions({
                //saveEditRuleConfig:'saveEditRuleConfig',
                getRuleConfig:'getRuleConfig',
                setRuleConditionData:'setRuleConditionData',
                saveEditRule:'saveEditRule'
                
            }),
            handleInsert(index,row){
                var ruleConditionData=this.ruleConditionData;
                var func=this.setRuleConditionData;
                this.formRule.status=0;
                this.saveEditRule(this.formRule);
                commonAjax.req('/ssa/ruleManage/saveRuleCondition.do',row).then((data)=>{
                    row.ruleSubId=data.ruleSubId;
                        row.paramId=data.paramId;
                        row.modify=false;
                        row.new=false;
                        func(ruleConditionData);
                })
            },
            handleEdit(index,row){
                var ruleConditionData=this.ruleConditionData;
                var func=this.setRuleConditionData;
                if(row.new==true){
                    this.handleInsert(index,row);
                }else{
                    this.formRule.status=0;
                    this.saveEditRule(this.formRule);
                    commonAjax.req('/ssa/ruleManage/updateRuleCondition.do',row).then((data)=>{
                        row.modify=false;
                        func(ruleConditionData);
                        
                    })
                }

            },
            handleDelete(index,row){
                var ruleConditionData=this.ruleConditionData;
                var func=this.setRuleConditionData;
                this.formRule.status=0;
                this.saveEditRule(this.formRule);
                 commonAjax.req('/ssa/ruleManage/delRuleCondition.do',row).then((data)=>{
                    ruleConditionData.splice(index,1);
                    func(ruleConditionData);
                 })  
            },
            newRuleCondition(){
                var newCondition={attrName:'EVENT_TYPE',attrId:1,functionId:1001,functionName:'=',paramNum:1,paramSubSeq:'1',paramValue:'param1',modify:true,new:true};
                newCondition.ruleId=this.formRule.ruleId;
                this.ruleConditionData.push(newCondition);
            },
            onExpand(row,expanded){
                console.log("event onExpand:"+row + " "+ expanded)
                if(expanded==true){
                    row.modify=true;
                }
            },
            selectAttr(row){
                for(var i=0;i<this.attrData.length;i++){
                    var item=this.attrData[i];
                    if(item.attrId==row.attrId){
                        row.attrName=item.attrName;
                    }
                }
            },
            selectFunc(row){
                for(var i=0;i<this.funcData.length;i++){
                    var item=this.funcData[i];
                    if(item.functionId==row.functionId){
                        row.functionName=item.functionName;
                        row.paramNum=item.paramNum
                    }
                }
            }
        }
    }
</script>
<style>
  .demo-table-expand label {
    width: 100px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 30%;
  }
  .demo-table-expand .el-input__inner {
      width:200px;
  }
</style>