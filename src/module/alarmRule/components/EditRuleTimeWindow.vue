<template>
<el-form ref="formRule" :model="formRule"  :rules="rules" label-width="120px">
       <template  v-if="formRule.configTemplate==102">
            <el-row >
                <div class="el-sub-panel-heading"><h4 class="sub-title">时间窗口</h4></div>
            </el-row>
            <el-row>
                    <el-col :span="5">
                        <el-form-item label="时间属性：" prop="timeField" :rules="[{required: true, message: '时间属性不能为空', trigger: 'change'}]">
                            <el-select  v-model="formRule.timeField">
                                                    <el-option v-for="item in attrData"
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
                    <el-form-item label="窗口大小："  prop="timeWindow" :rules="[{type:'number',required: true, message: '时间窗口必须为整数'}]">
                        <el-input v-model.number="formRule.timeWindow" @change="secTimeWindow"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                        <el-select v-model="formRule.timeUnit" @change="secTimeWindow">
                                        <el-option v-for="item in timeUnitList"
                                            :key="item.value"
                                            :label="item.name"
                                            :value="item.value">
                                        </el-option>

                        </el-select>
                </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                  <el-form-item label="发生次数:">
                      <div>
                        <div style="width:25%;display:inline-block ;">
                              <el-checkbox v-model="formRule.checked1"></el-checkbox> 大于
                        </div>
                        <div style="width:40%;display:inline-block ;">
                          <el-form-item label="">
                            <el-input v-model="formRule.upgrade"></el-input>
                          </el-form-item>
                        </div>
                        <div style="width:15%;display:inline-block ;">
                        升级
                        </div>
                      </div>

                      <div>
                        <div style="width:25%;display:inline-block ;">
                              <el-checkbox v-model="formRule.checked2"></el-checkbox>小于
                        </div>
                        <div style="width:40%;display:inline-block ;">
                          <el-form-item label="">
                            <el-input v-model="formRule.degrade"></el-input>
                          </el-form-item>
                        </div>
                        <div style="width:15%;display:inline-block ;">
                        降级
                        </div>
                      </div>
                  </el-form-item>
              </el-col>
            </el-row>
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
            // compareFuncList:[{value:'>',name:'大于'},{value:'<',name:'小于'},{value:'=',name:'等于'}],
            compareFuncList:[{value:'>',name:'大于'},{value:'<',name:'小于'},{value:'=',name:'等于'},{value:'>=',name:'大于等于'},{value:'<=',name:'小于等于'}],
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
           attrData:state=>state.context.attrData
        })
    },
    methods:{
        secTimeWindow:function(){
                var sec=0;
                var unit=this.formRule.timeUnit;
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
                sec=unitSec*this.formRule.timeWindow;
                this.formRule.secTimeWindow=sec;
                console.log("time windows:"+sec)
                return sec
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
