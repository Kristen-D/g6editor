<template>
<el-form ref="formRule" :model="formRule"  :rules="rules" label-width="120px">
       <template  v-if="formRule.configTemplate==2">
            <el-row >
                <div class="el-sub-panel-heading"><h4 class="sub-title">时间窗口</h4></div>
            </el-row>
            <el-row>
                    <el-col :span="5">
                        <el-form-item label="时间属性：" prop="relation.relationTimeField" :rules="[{required: true, message: '时间属性不能为空', trigger: 'change'}]">
                            <el-select  v-model="formRule.relation.relationTimeField">
                                                    <el-option v-for="item in formRule.inputEventRules[0].attrData"
                                                        :key="item.attrName"
                                                        :label="item.attrDesc"
                                                        :value="item.attrName">
                                                    </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
            </el-row>
            <el-row>
                <el-col :span="5">
                    <el-form-item label="时间窗口："  prop="relation.relationTimeWindow" :rules="[{type:'number',required: true, message: '时间窗口必须为整数'}]">
                        <el-input v-model.number="formRule.relation.relationTimeWindow" @change="secTimeWindow"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                        <el-select v-model="formRule.relation.relationTimeUnit" @change="secTimeWindow">
                                        <el-option v-for="item in timeUnitList"
                                            :key="item.value"
                                            :label="item.name"
                                            :value="item.value">
                                        </el-option>

                        </el-select>
                </el-col>
            </el-row>
            <!-- <template  v-if="formRule.configTemplate==3 ||(formRule.configTemplate==2&&(formRule.relationType==2))">
                <el-row>
                    <el-col :span="13">
                        <el-form-item label="分组条件：" prop="groupField">
                                <el-select v-model="formRule.groupField" multiple placeholder="多选" @change="groupFieldChange">
                                    <el-option
                                    v-for="item in formRule.inputEventRules[0].attrData"
                                    :key="item.attrName"
                                    :label="item.attrDesc"
                                    :value="item.attrName">
                                    </el-option>
                                </el-select>
                        </el-form-item>
                    </el-col>
                </el-row>

                <el-form-item label="分组类型：">
                    <el-radio-group v-model="formRule.groupType">
                        <el-radio :label="1">累加(sum)</el-radio>
                        <el-radio :label="2">计数(count)</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-row>
                    <el-col :span="5" v-if="formRule.groupType==1" >
                        <el-form-item prop="sumField">
                            <el-select v-model="formRule.sumField" placeholder="计算字段" >
                                <el-option v-for="item in formRule.inputEventRules[0].attrData"
                                    :key="item.attrName"
                                    :label="item.attrDesc"
                                    :value="item.attrName">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="2" v-if="formRule.groupType==2">
                        <el-form-item label="发生次数：">
                        </el-form-item>
                    </el-col>
                    <el-col :span='1' v-if="formRule.groupType==1">
                        <el-form-item label="总和">
                        </el-form-item>
                    </el-col>
                    <el-col :span="3">
                        <el-form-item label-width="0px" prop="compareFunc">
                            <el-select v-model="formRule.compareFunc" >
                                <el-option v-for="item in compareFuncList"
                                    :label="item.name"
                                    :value="item.value">
                                </el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="4">
                        <el-form-item label-width="0px" prop="compareValue">
                            <el-input v-model="formRule.compareValue"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </template> -->
        </template>
</el-form>
</template>
<script>
import {mapActions,mapState} from 'vuex'
import commonAjax from 'components/js/common.js'
export default{
    data(){
        return {
            timeUnitList:[{name:'秒',value:'s'},{name:'分',value:'m'},{name:'时',value:'h'},{name:'天',value:'d'}],
            compareFuncList:[{value:'>',name:'大于'},{value:'<',name:'小于'},{value:'=',name:'等于'}],
            rules: {
                    sumField: [
                        { required: true, message: '请选择累加字段', trigger: 'change' }
                    ],
                    compareFunc: [
                        { required: true, message: '请选择比对函数', trigger: 'change' }
                    ],
                    compareValue: [
                        { required: true, message: '请输入比对数值', trigger: 'blur' }
                    ],
                    groupField: [
                        { type: 'array', required: true, message: '请至少选择一个分组属性', trigger: 'change' }
                    ]
                }
        }
    },
    computed:{
        ...mapState({
           formRule:state=>state.context.formRule,
           subSystemList:state=>state.context.subSystemList,
           attrData:state=>state.context.attrData,
           funcData:state=>state.context.funcData,
           eventAttrData:state=>state.context.eventAttrData,
           attrFuncList:state=>state.context.attrFuncList,
           attrParamList:state=>state.context.attrParamList
        })
    },
    methods:{
        secTimeWindow:function(){
                var sec=0;
                var unit=this.formRule.relation.relationTimeUnit;
                var unitSec=0;
                if(unit=='s'){
                    unitSec=1;
                }else if(unit=='m'){
                    unitSec=60;
                }else if(unit=='h'){
                    unitSec=60*60;
                }else if(unit=='d'){
                    unitSec=60*60*24;
                }
                sec=unitSec*this.formRule.relation.relationTimeWindow;
                this.formRule.relation.relationSecTimeWindow=sec;
                console.log("time windows:"+sec)
                return sec
            },
            checkValidateForm() {
              this.$refs.formRule.validate((valid) => {
                if (valid) {
                  // console.log(1);
                } else {
                  this.$store.commit('changeSaveFlag');
                  // console.log(2);
                }
              });
            }
            // groupFieldChange:function(value){
            //     //"groupField":["attr1","attr3","attr5"],
            //     //"groupFieldDeamon":[{"groupKey":"attr1","groupValue":"2"}], 需求来源苏勇冰
            //     var groupFieldDeamon=[];
            //     for(var item of value){
            //         var item1={};
            //         item1.groupkey=item;
            //         item1.groupValue=2;
            //         groupFieldDeamon.push(item1)
            //     }
            //     this.formRule.stat.groupFieldDeamon=groupFieldDeamon
            // }
    }
}
</script>
<style>

</style>
