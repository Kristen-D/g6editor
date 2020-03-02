<template>
<div>
    <el-form ref="sceneForm" :model="sceneForm" label-width="80px">
        <el-form-item label="场景名称">
            <el-input v-model="sceneForm.name"></el-input>
        </el-form-item>
        <el-form-item label="场景描述">
            <el-input v-model="sceneForm.desc"></el-input>
        </el-form-item>
        <el-form-item>
             <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
    </el-form>
    <el-collapse v-model="activeName" accordion>
        <el-collapse-item title="数据定义" name="1">
            <el-form ref="sceneForm" :model="sceneForm" label-width="80px">
                <el-form-item label="数据源">
                    <el-select v-model="sceneForm.dataSource" @change="dataSourceChange">
                        <el-option   v-for="item in ruleDataSource"
                                :key="item.ruleId"
                                :label="item.ruleName"
                                :value="item.ruleId">
                        </el-option>

                    </el-select>
                </el-form-item>
                <el-form-item label="字段选择">
                    <el-checkbox-group v-model="sceneForm.checkedFields" @change="checkedFieldsChange">
                        <el-checkbox v-for="item in ruleDataFields" :label="item.name" :key="item.value">{{item.name}}</el-checkbox>
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="时间字段">
                    <el-select v-model="sceneForm.timeField">
                        <el-option   v-for="item in timeFields"
                                :key="item.value"
                                :label="item.name"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                
                <el-form-item label="统计周期">
                    <el-select v-model="sceneForm.cycle">
                        <el-option label="年" value="year"></el-option>
                        <el-option label="月" value="month"></el-option>
                        <el-option label="日" value="day"></el-option>
                        <el-option label="时" value="hour"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-collapse-item>
        <el-collapse-item title="图表选项" name="2">
            <el-form ref="sceneForm" :model="sceneForm" label-width="80px">
                <el-form-item label="工具栏">
                     <el-switch on-text="" off-text="" v-model="sceneForm.toolbar"></el-switch>
                </el-form-item>
                <el-form-item label="类型图表">
                    <el-radio-group v-model="sceneForm.chartTypes">
                        <el-radio label="线图" name="chartTypes"></el-radio>
                        <el-radio label="饼图" name="chartTypes"></el-radio>
                        <el-radio label="柱状图" name="chartTypes"></el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="x轴">
                    <el-select v-model="sceneForm.xAxis">
                        <el-option   v-for="item in sceneForm.checkedFields"
                                :key="item"
                                :label="item"
                                :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="x轴类型">
                    <el-select v-model="sceneForm.xAxisType">
                        <el-option label="类目型" value="category"></el-option>
                        <el-option label="数值型" value="value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="y轴">
                    <el-select v-model="sceneForm.yAxis">
                        <el-option   v-for="item in sceneForm.checkedFields"
                                :key="item"
                                :label="item"
                                :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="y轴类型">
                    <el-select v-model="sceneForm.yAxisType">
                        <el-option label="类目型" value="category"></el-option>
                        <el-option label="数值型" value="value"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="聚合函数">
                    <el-select v-model="sceneForm.aggregate">
                        <el-option label="计数" value="count"></el-option>
                        <el-option label="累加" value="sum"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分组">
                    <el-select v-model="sceneForm.series" clearable>
                        <el-option   v-for="item in sceneForm.checkedFields"
                                :key="item"
                                :label="item"
                                :value="item">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
        </el-collapse-item> 
    </el-collapse>
</div>
</template>
<script>
import {mapActions,mapState} from 'vuex'
import commonAjax from 'components/js/common.js'
export default {
    data() {
      return {
        activeName: '1',
        sceneForm:{
            name:'',
            desc:'',
            dataSource:'',
            checkedFields:[],
            timeField:'',
            cycle:'',
            toolbar:true,
            chartTypes:[],
            defaultChartType:'',
            xAxis:'',
            xAxisType:'category',
            yAxis:'',
            yAxisType:'value',
            aggregate:'count',
            series:''
        },
        ruleDataSource:[{ruleId:1,ruleName:'规则1'},{ruleId:2,ruleName:'规则2'},{ruleId:3,ruleName:'规则3'}],
        ruleDataFields:[],
        timeFields:[]
      }
    },
    computed:{
        ...mapState({
           chartOption:state=>state.content.chartOption
        })
    },
    mounted:function(){
        var func=this.setRuleDataFields;
        commonAjax.req('/ssa/ruleScene/getRuleResultColumn.do').then((data)=>{
            func(data)
        });


    },
    methods:{
            ...mapActions({
                setChartOption:'setChartOption',
                setShowDataHeadCols:'setShowDataHeadCols'      
            }),
            onSubmit:function(){
                this.setChartOption(this.sceneForm);
                
                var cols=[];
                var checked=this.sceneForm.checkedFields.join(',');
                for(var item of this.ruleDataFields){
                    if(checked.indexOf(item.name)>=0){
                        cols.push(item);
                    }
                }
                this.setShowDataHeadCols(cols);
            },
            dataSourceChange:function(val){
                
            },
            setRuleDataFields:function(data){
                this.ruleDataFields=data;
                var arr=[];
                for(var i=0;i<this.ruleDataFields.length;i++){
                    if(this.ruleDataFields[i].value.indexOf('Time')>0){
                        arr.push(this.ruleDataFields[i]);
                    }
                }
                this.timeFields=arr;
        
            },
            checkedFieldsChange:function(arr){
                console.log(arr.join(','));
            }

    }
  }
</script>
<style>
    
</style>