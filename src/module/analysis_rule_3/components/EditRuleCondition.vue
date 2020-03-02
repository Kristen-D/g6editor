<template>
<el-form ref="formRule" :model="formRule"  :rules="rules" label-width="120px">
  <el-row>
            <div class="el-sub-panel-heading"><h4 class="sub-title">规则条件</h4></div>
            <!--img src="/static/img/vertical-line.png"/><span>规则条件</span-->
        </el-row>
        <el-form-item label="关联方式：" v-if="formRule.configTemplate==2">
            <el-radio-group v-model="formRule.relationType">
                <el-radio :label="1">普通关联</el-radio>
                <el-radio :label="2">分组关联</el-radio>
                <el-radio :label="3">顺序关联</el-radio>
            </el-radio-group>
        </el-form-item>
        <template v-for="(inputEventRule,eventRuleIndex) in formRule.inputEventRules">
            <el-row >
                <el-col :span="11">
                    <el-form-item v-bind:label="'设备('+inputEventRule.identity+')类型：'" :prop="'inputEventRules.'+eventRuleIndex+'.configEvent'" :rules="{required: true, message: '设备类型不能为空', trigger: 'change'}">
                        <el-select v-model="inputEventRule.configEvent" @change="changeEventType(inputEventRule,eventRuleIndex)">
                                <el-option-group
                                v-for="group in deviceTypeList"
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
                <el-col :span="3"  v-if="eventRuleIndex>=2">
                    <label class="delet font-color m-l-30" @click="delEventRule(eventRuleIndex)"><i class="el-icon-delete2 m-r-8"></i>删除</label>
                </el-col>
            </el-row>
            <el-row  v-for="(filter,index) in inputEventRule.filters">
                <el-col :span="10" :offset="1">
                    <el-form-item v-bind:label="'条件'+(index+1)+':'" :prop="'inputEventRules.'+eventRuleIndex+'.filters.'+index+'.attrName'" :rules="{required: true, message: '设备属性不能为空', trigger: 'change'}">
                        <el-select v-model="filter.attrName" @change="changeFilterAttr(filter)" >
                                <el-option v-for="item in inputEventRule.attrData"
                                    :key="item.attrName"
                                    :label="item.attrDesc"
                                    :value="item.attrName">
                                </el-option>            
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="3">
                    <el-form-item label-width="0px" :prop="'inputEventRules.'+eventRuleIndex+'.filters.'+index+'.compareFunc'" :rules="{required: true, message: '函数不能为空', trigger: 'change'}">
                    <el-select v-model="filter.compareFunc" @change="changeFilterFunction(filter)" >
                        <el-option v-for="item in filter.funcData"
                            :label="item.functionDesc"
                            :value="item.functionName">
                        </el-option>            
                    </el-select>
                   </el-form-item>
                </el-col>
                <el-col :span="6/filter.paramNum" v-for="n in filter.paramNum">
                        <el-select v-model="filter.compareValue[0]" v-if="filter.attrType==1">
                            <el-option v-for="item in filter.paramData"
                                :label="item.valueDesc"
                                :value="item.attrValue">
                            </el-option>            
                        </el-select>
                        <el-input v-model="filter.compareValue[n-1]" v-if="filter.attrType==0||n>1"></el-input>
                </el-col>
                <el-col :span="2" >
                    <label class="delet font-color m-l-30" @click="inputEventRule.filters.splice(index,1)"><i class="el-icon-delete2 m-r-8"></i>删除</label>
                      <!--el-button type="text" @click="inputEventRule.filters.splice(index,1)">删除</el-button--> 
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="3" :offset="2">
                    <label class="add font-color"  @click="addFilter(inputEventRule.filters)">+过滤条件</label>
                    <!--el-button class="add" type="text" @click="addFilter(inputEventRule.filters)">+过滤条件</el-button-->
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="5" :offset="1">
                    <el-form-item label="条件关系:">
                            <el-select v-model="inputEventRule.relation">
                                <el-option v-for="item in relationList"
                                        :key="item.value"
                                            :label="item.name"
                                            :value="item.value">
                                </el-option>            
                            </el-select>
                    </el-form-item>
                </el-col>
            </el-row>
        </template>
        <el-row  v-if="formRule.configTemplate<=2">
            <label class="add font-color"  @click="addInputRule">+设备类型</label>
            <!--el-button type="text" @click="addInputRule">+事件类型</el-button-->        
        </el-row>
        <template v-if="formRule.configTemplate==2">
            <el-row>
                <el-col :span="2">
                    <el-form-item label="关联条件：">
                    </el-form-item>
                </el-col>
                <el-col :span="22">
                    <el-row  v-for="(relation,index) in formRule.relations">
                        <el-col :span="8">
                            <el-form-item v-bind:label="'条件'+(index+1)+':'" :prop="'relations.'+index+'.condition'" :rules="{required: true, message: '关联条件不能为空', trigger: 'change'}">
                                <el-select v-model="relation.condition" @change="changeRelationAttr(relation)">
                                    <el-option v-for="item in formRule.outputAttrData"
                                            :key="item.attrName"
                                            :label="item.attrDesc"
                                            :value="item.attrName">
                                    </el-option>            
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="3">
                            <el-form-item label-width="0px" :prop="'relations.'+index+'.compareFunc'" :rules="{required: true, message: '关联函数不能为空', trigger: 'change'}">
                                <el-select v-model="relation.compareFunc" >
                                    <el-option v-for="item in compareFuncList"
                                        :label="item.name"
                                        :value="item.value">
                                    </el-option>            
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="8">
                            <el-form-item label-width="0px" :prop="'relations.'+index+'.condition'" :rules="{required: true, message: '关联条件不能为空', trigger: 'change'}">
                                <el-select v-model="relation.compareValue" >
                                    <el-option v-for="item in relation.attrData"
                                        :key="item.attrName"
                                        :label="item.attrDesc"
                                        :value="item.attrName">
                                    </el-option>            
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="2">
                            <label class="delet font-color m-l-30" @click="formRule.relations.splice(index,1)"><i class="el-icon-delete2 m-r-8"></i>删除</label>
                            <!--el-button type="text">删除</el-button--> 
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :offset="1">
                            <label class="add font-color"  @click="addRelationCondition">+关联条件</label>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="5">
                            <el-form-item label="条件关系:">
                                    <el-select v-model="formRule.relationCondition" disabled>
                                        <el-option v-for="item in relationList"
                                                :key="item.value"
                                                    :label="item.name"
                                                    :value="item.value">
                                        </el-option>            
                                    </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>

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
            compareFuncList:[{value:'>',name:'大于'},{value:'<',name:'小于'},{value:'=',name:'等于'}],
            relationList:[{name:'且',value:'&'},{name:'或',value:'|'}],
            identityList:['A','B','C','D','E','F','G']
            
        }
    },
    computed:{
        ...mapState({
           formRule:state=>state.context.formRule,
           attrData:state=>state.context.attrData,
           funcData:state=>state.context.funcData,
           eventAttrData:state=>state.context.eventAttrData,
           attrFuncList:state=>state.context.attrFuncList,
           attrParamList:state=>state.context.attrParamList,
           deviceTypeList:state=>state.context.deviceTypeList
        })
    },
    methods:{
        addInputRule:function(){
                this.formRule.maxIdentity++;
                var identity=this.identityList[this.formRule.maxIdentity]
                var inputEventRule={identity:'',configEvent:'',deviceType:'',attrData:[],filters:[{attrName:'',attrType:'',funcData:[],paramData:[],compareFunc:'=',paramNum:1,compareValue:['','','']}],relation:'&'}
                inputEventRule.identity=identity;
                console.log(this.formRule.maxIdentity+'   '+identity+"  "+this.identityList);
                this.formRule.inputEventRules.push(inputEventRule);
            },
            addFilter:function(filters){
                var filter={attrName:'',attrType:'',funcData:[],paramData:[],compareFunc:'',paramNum:1,compareValue:['','','']};
                filters.push(filter);
            },
            changeFilterFunction:function(filter){
                for(var item of this.funcData){
                    if(item.functionName==filter.compareFunc){
                        filter.paramNum=item.paramNum;
                        if(filter.paramNum==9999)
                            filter.paramNum=0;
                    }
                }
                console.log(filter.paramNum);

            },
            changeEventType:function(inputEventRule,index){
                console.log(inputEventRule.configEvent)
                console.log("index:"+index)
                for(var i=0;i<this.formRule.outputAttrData.length;){
                    var outputAttr=this.formRule.outputAttrData[i];
                    if(outputAttr.attrName.indexOf(inputEventRule.identity+".")==0){
                        this.formRule.outputAttrData.splice(i,1);
                    }else{
                        i++;
                    }
                }
                
                inputEventRule.attrData.length=0;
                for(var item of this.eventAttrData){
                    if(inputEventRule.configEvent==item.eventTypeId){
                        for(var attr of this.attrData){
                            if(attr.attrId==item.eventAttrId){
                                inputEventRule.attrData.push(attr);
                                var outputAttr1={};
                                outputAttr1.attrName=inputEventRule.identity+"."+attr.attrName;
                                outputAttr1.attrDesc="设备("+inputEventRule.identity+")."+attr.attrDesc;
                                this.formRule.outputAttrData.push(outputAttr1)                 
                            }
                        }
                    }
                }
                //设置deviceType
                for(var group of this.deviceTypeList){
                    for(var item of group.children){
                        if(inputEventRule.configEvent==item.id){
                            inputEventRule.deviceType=item.remark;
                            console.log(inputEventRule.deviceType)
                            break;
                        }
                    }
                }
   
            },
            changeRelationAttr:function(relation){
                relation.compareValue='';
                relation.attrData.length=0;
                var rules=this.formRule.inputEventRules;
                var nextIdentity='';
                for(var i=0;i<rules.length-1;i++){
                    if(relation.condition[0]==rules[i].identity){
                        nextIdentity=rules[i+1].identity;
                    }
                }
                console.log("nextIdentity："+nextIdentity)
                if(nextIdentity!=''){
                    for(var attr of this.formRule.outputAttrData){
                        if(attr.attrName.indexOf(nextIdentity+".")==0){
                            relation.attrData.push(attr);
                        }
                    }
                }
           
            },delEventRule:function(index){
                var identity=this.formRule.inputEventRules[index].identity;
                //删除事件相关的属性
                for(var i=0;i<this.formRule.outputAttrData.length;){
                    var outputAttr=this.formRule.outputAttrData[i];
                    if(outputAttr.attrName.indexOf(identity+".")==0){
                        this.formRule.outputAttrData.splice(i,1);
                    }else{
                        i++;
                    }
                }
                //删除事件
                this.formRule.inputEventRules.splice(index,1)
            },addRelationCondition:function(){
                var relation={condition:'',attrData:[],compareFunc:'',compareValue:''};
                this.formRule.relations.push(relation);
            },changeFilterAttr:function(filter){
                //获取attr_type
                var attrId='';
                filter.attrType=0;
                for(var item of this.attrData){
                    if(item.attrName==filter.attrName){
                        filter.attrType=item.attrType;
                        attrId=item.attrId;
                        break;
                    }
                }
                //改变func配置选项,需要attr和function的对应表
                filter.compareFunc='';
                filter.funcData.splice(0,filter.funcData.length);
                for(var item of this.attrFuncList){
                    if(item.attrName==filter.attrName){
                        for(var func of this.funcData){
                            if(item.functionName==func.functionName){
                                filter.funcData.push(func);
                            }
                        }
                    }
                }
                //设置filter的值列表
                filter.paramData.splice(0,filter.paramData.length);
                filter.compareValue[0]='';
                filter.compareValue[1]='';
                filter.compareValue[2]='';
                    
                
                if(filter.attrType==1){
                    for(var item of this.attrParamList){
                        if(filter.attrName==item.attrName){
                            filter.paramData.push(item)
                        }
                    }
                }
            }
    }
}    
</script>
<style>
    
</style>