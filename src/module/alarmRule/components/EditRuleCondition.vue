<template>
<el-form ref="formRule" :model="formRule"  :rules="rules" label-width="120px">
  <el-row>
            <div class="el-sub-panel-heading"><h4 class="sub-title">规则条件</h4></div>
            <!--img src="/static/img/vertical-line.png"/><span>规则条件</span-->
        </el-row>
        <template v-for="(inputEventRule,eventRuleIndex) in formRule.inputEventRules" >
            <el-row >
                <el-col :span="11">
                    <el-form-item v-bind:label="'条件组'+inputEventRule.identity+'：'" :prop="'inputEventRules.'+eventRuleIndex+''"> </el-form-item>
                </el-col>
                <el-col :span="3"  v-if="eventRuleIndex>=1">
                    <label class="delet font-color m-l-30" @click="delEventRule(eventRuleIndex)"><i class="el-icon-delete2 m-r-8"></i>删除</label>
                </el-col>
            </el-row>
            <template  v-for="(filter,index) in inputEventRule.filters" v-if="formRule.configTemplate==101 || formRule.configTemplate==102">
              <!-- <el-row v-if="index >0">
                  <el-col :span="5" :offset="1">
                      <el-form-item v-bind:label="'条件关系'+index+':'" :prop="'inputEventRules.'+eventRuleIndex+'.filters.'+index+'.relation'">
                              <el-select v-model="filter.relation">
                                  <el-option v-for="item in relationList"
                                          :key="item.value"
                                              :label="item.name"
                                              :value="item.value">
                                  </el-option>
                              </el-select>
                      </el-form-item>
                  </el-col>
              </el-row> -->
              <el-row>
                <el-col :span="10" :offset="1">
                    <el-form-item v-bind:label="'条件'+(index+1)+':'" :prop="'inputEventRules.'+eventRuleIndex+'.filters.'+index+'.attrName'" :rules="{required: true, message: '事件属性不能为空', trigger: 'change'}">
                        <el-select v-model="filter.attrName" @change="changeFilterAttr(filter)" >
                                <el-option v-for="item in attrData"
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
              </template>

              <template  v-for="(filter,index) in inputEventRule.filters" v-if="formRule.configTemplate==104">
                <!-- <el-row v-if="index >0">
                    <el-col :span="5" :offset="1">
                        <el-form-item v-bind:label="'条件关系'+index+':'" :prop="'inputEventRules.'+eventRuleIndex+'.filters.'+index+'.relation'">
                                <el-select v-model="filter.relation">
                                    <el-option v-for="item in relationList"
                                            :key="item.value"
                                                :label="item.name"
                                                :value="item.value">
                                    </el-option>
                                </el-select>
                        </el-form-item>
                    </el-col>
                </el-row> -->
                <el-row>
                  <el-col :span="10" :offset="1">
                      <el-form-item v-bind:label="'条件'+(index+1)+':'" :prop="'inputEventRules.'+eventRuleIndex+'.filters.'+index+'.attrName'" :rules="{required: true, message: '事件属性不能为空', trigger: 'change'}">
                          <el-select v-model="filter.attrName" @change="changeFilterAttr(filter)" >
                                  <el-option v-for="item in alarmAttrData"
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
                </template>
            <el-row>
                <el-col :span="3" :offset="2">
                    <label class="add font-color"  @click="addFilter(inputEventRule.filters)">+过滤条件</label>
                    <!--el-button class="add" type="text" @click="addFilter(inputEventRule.filters)">+过滤条件</el-button-->
                </el-col>
            </el-row> <!--整组只有一个条件关系-->

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


        <el-row >
            <label class="add font-color"  @click="addInputRule">+条件组</label>
        </el-row>
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
            // identityList:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T'],
            identityList:['1','2','3','4','5','6','7','8','9','10','1','12','13','14','15','16','17','18','19','20']


        }
    },
    computed:{
        ...mapState({
           formRule:state=>state.context.formRule,
           attrData:state=>state.context.attrData,
           alarmAttrData:state=>state.context.alarmAttrData,
           funcData:state=>state.context.funcData,
           attrFuncList:state=>state.context.attrFuncList,
           attrParamList:state=>state.context.attrParamList
        })
    },
    methods:{
        addInputRule:function(){
                this.formRule.maxIdentity++;
                var identity=this.identityList[this.formRule.maxIdentity];
                var inputEventRule={identity:'',attrData:[],filters:[{attrName:'',attrType:'',funcData:[],paramData:[],relation:'',compareFunc:'=',paramNum:1,compareValue:['','','']}],relation:'&'}
                inputEventRule.identity=identity;
                console.log(this.formRule.maxIdentity+'   '+identity+"  "+this.identityList);
                this.formRule.inputEventRules.push(inputEventRule);

            },
            addFilter:function(filters){
                var filter={attrName:'',attrType:'',funcData:[],paramData:[],relation:'',compareFunc:'',paramNum:1,compareValue:['','','']};
                filters.push(filter);
            },
            addAttr:function(){
              this.formRule.maxIdentity++;
              var identity=this.identityList[this.formRule.maxIdentity];
              var merge_relation={identity:'',attrName:''}
              merge_relation.identity=identity;
              console.log(this.formRule.maxIdentity+'   '+identity+"  "+this.identityList);
              this.formRule.merge_relations.push(merge_relation);
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
            changeRelationAttr:function(relation){
                relation.compareValue='';
                relation.attrData.length=0;
                var rules=this.formRule.inputEventRules;
                var nextIdentity=[];
                for(var i=0;i<rules.length-1;i++){
                    if(relation.condition[0]==rules[i].identity){
                      for (var j=i+1;j<=this.formRule.maxIdentity;j++){
                        nextIdentity.push(rules[j].identity);
                      }
                    }
                }
                // console.log("nextIdentity："+nextIdentity)
                if(nextIdentity.length>0 ){
                  for(var i1=0;i1<nextIdentity.length;i1++){
                    var nextIdentity1=nextIdentity[i1];
                    for(var attr of this.formRule.outputAttrData){
                        if(attr.attrName.indexOf(nextIdentity1+".")==0){
                            relation.attrData.push(attr);
                        }
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
            },
            delAttrRule:function(index){
                //删除事件
                this.formRule.merge_relations.splice(index,1)
            },
            changeFilterAttr:function(filter){
                //获取attr_type
                var attrId='';
                filter.attrType=0;
                let ad=[];
                if (this.formRule.configTemplate==104){
                  ad=this.alarmAttrData;
                }else{
                  ad= this.attrData;
                }
                for(var item of ad){
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
            },
            changeAttr:function(merge_relation){
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
    },
    created:function(){

    }
}
</script>
<style>

</style>
