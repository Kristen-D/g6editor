<template>
<el-form ref="formRule" :model="formRule"  :rules="rules" label-width="120px">
  <el-row>
            <div class="el-sub-panel-heading"><h4 class="sub-title">规则条件</h4></div>
            <!--img src="/static/img/vertical-line.png"/><span>规则条件</span-->
        </el-row>
        <el-form-item label="关联方式：" v-if="formRule.configTemplate==2">
            <el-radio-group v-model="formRule.relationType">
                <el-radio :label="1">普通关联</el-radio>
                <!-- <el-radio :label="2">分组关联</el-radio>
                <el-radio :label="3">顺序关联</el-radio> -->
            </el-radio-group>
        </el-form-item>
        <el-form-item label="配置类型：" width="30" v-if="formRule.addflag==1" prop="configtype" :rules="{required: true, message: '该值不能为空', trigger: 'change'}">
            <!-- <el-radio-group v-model="formRule.configtype"  @change="changeConfigType(formRule.configtype)">
                <el-radio :label="1">设备</el-radio>
                <el-radio :label="2">类型</el-radio>
            </el-radio-group> -->
             <el-col :span="5">
              <el-select v-model="formRule.configtype" placeholder="请选择" @change="changeConfigType(formRule.configtype)">
                  <el-option v-for="item in configTypeInfo"
                          :key="item.configtype"
                          :label="item.configtypename"
                          :value="item.configtype">
                  </el-option>
              </el-select>
            </el-col>
        </el-form-item>
        <template v-for="(inputEventRule,eventRuleIndex) in formRule.inputEventRules" v-if="formRule.configtypeId=='1'">
            <el-row >
                <el-col :span="11">
                    <el-form-item v-bind:label="'事件('+inputEventRule.identity+')：'" :prop="'inputEventRules.'+eventRuleIndex+'.configEvent'" :rules="{ type: 'number',required: true, message: '设备类型不能为空', trigger: 'change'}">
                        <el-select v-model="inputEventRule.configEvent" @change="changeEventType(inputEventRule,eventRuleIndex)" v-if="(formRule.configTemplate==4 && eventRuleIndex!=1) || formRule.configTemplate !=4">
                          <el-option v-for="item in deviceInfo"
                                  :key="item.id"
                                  :label="item.device_vendor"
                                  :value="item.id">
                          </el-option>
                        </el-select>

                        <el-select v-model="inputEventRule.configEvent" @change="changeEventType(inputEventRule,eventRuleIndex)" v-if="formRule.configTemplate==4 && eventRuleIndex==1">
                          <el-option v-for="item in deviceInfo2"
                                  :key="item.id"
                                  :label="item.device_vendor"
                                  :value="item.id">
                          </el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="3"  v-if="eventRuleIndex>=2">
                    <label class="delet font-color m-l-30" @click="delEventRule(eventRuleIndex)"><i class="el-icon-delete2 m-r-8"></i>删除</label>
                </el-col>
            </el-row>
            <template  v-for="(filter,index) in inputEventRule.filters">
              <el-row v-if="index >0">
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
              </el-row>
              <el-row>
                <el-col :span="10" :offset="1">
                    <el-form-item v-bind:label="'条件'+(index+1)+':'" :prop="'inputEventRules.'+eventRuleIndex+'.filters.'+index+'.attrName'" :rules="{required: true, message: '事件属性不能为空', trigger: 'change'}">
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
              </template>
            <el-row>
                <el-col :span="3" :offset="2">
                    <label class="add font-color"  @click="addFilter(inputEventRule.filters)">+过滤条件</label>
                    <!--el-button class="add" type="text" @click="addFilter(inputEventRule.filters)">+过滤条件</el-button-->
                </el-col>
            </el-row>


        </template>
        <template v-for="(inputEventRule,eventRuleIndex) in formRule.inputEventRules" v-if="formRule.configtypeId=='2'">
            <el-row >
                <el-col :span="11">
                    <el-form-item v-bind:label="'事件('+inputEventRule.identity+')：'" :prop="'inputEventRules.'+eventRuleIndex+'.configEvent'" :rules="{required: true, message: '事件类型不能为空', trigger: 'change'}">
                        <el-select v-model="inputEventRule.configEvent" @change="changeEventType(inputEventRule,eventRuleIndex)" v-if="formRule.configTemplate!=4">
                                <el-option-group
                                v-for="group in eventTypeList"
                                :key="group.id"
                                :label="group.remark">
                                <el-option
                                    v-for="item in group.children"
                                    :key="item.id"
                                    :label="item.remark"
                                    :value="item.id">
                                </el-option>
                                </el-option-group>
                        </el-select>
                        <el-select v-model="inputEventRule.configEvent" @change="changeEventType(inputEventRule,eventRuleIndex)"  v-if="formRule.configTemplate==4">
                                <el-option-group
                                v-for="group in eventTypeList2"
                                :key="group.id"
                                :label="group.remark">
                                <el-option
                                    v-for="item in group.children"
                                    :key="item.id"
                                    :label="item.remark"
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
            <template  v-for="(filter,index) in inputEventRule.filters">
              <el-row v-if="index >0">
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
              </el-row>
              <el-row>
                <el-col :span="10" :offset="1">
                    <el-form-item v-bind:label="'条件'+(index+1)+':'" :prop="'inputEventRules.'+eventRuleIndex+'.filters.'+index+'.attrName'" :rules="{required: true, message: '事件属性不能为空', trigger: 'change'}">
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
<!--
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
            </el-row> -->
            </template>
            <el-row>
                <el-col :span="3" :offset="2">
                    <label class="add font-color"  @click="addFilter(inputEventRule.filters)">+过滤条件</label>
                    <!--el-button class="add" type="text" @click="addFilter(inputEventRule.filters)">+过滤条件</el-button-->
                </el-col>
            </el-row>
        </template>

        <template v-for="(inputEventRule,eventRuleIndex) in formRule.inputEventRules" v-if="formRule.configtypeId=='3'">
            <el-row >
                <el-col :span="11">
                    <el-form-item v-bind:label="'事件('+inputEventRule.identity+')：'" :prop="'inputEventRules.'+eventRuleIndex+'.configName'" :rules="{required: true, message: '事件类型不能为空', trigger: 'blue'}">
                          <el-input v-model="inputEventRule.configName" ></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="3"  v-if="eventRuleIndex>=2">
                    <label class="delet font-color m-l-30" @click="delEventRule(eventRuleIndex)"><i class="el-icon-delete2 m-r-8"></i>删除</label>
                </el-col>
            </el-row>
            <template  v-for="(filter,index) in inputEventRule.filters">
              <el-row v-if="index >0">
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
              </el-row>
              <el-row>
                <el-col :span="10" :offset="1">
                    <el-form-item v-bind:label="'条件'+(index+1)+':'" :prop="'inputEventRules.'+eventRuleIndex+'.filters.'+index+'.attrName'" :rules="{required: true, message: '事件属性不能为空', trigger: 'change'}">
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
            </template>
            <el-row>
                <el-col :span="3" :offset="2">
                    <label class="add font-color"  @click="addFilter(inputEventRule.filters)">+过滤条件</label>
                    <!--el-button class="add" type="text" @click="addFilter(inputEventRule.filters)">+过滤条件</el-button-->
                </el-col>
            </el-row>
        </template>
        <el-row v-if="formRule.configTemplate!=4">
            <label class="add font-color"  @click="addInputRule">+事件</label>
            <!--el-button type="text" @click="addInputRule">+事件类型</el-button-->
        </el-row>
        <template v-if="formRule.configTemplate==2 || formRule.configTemplate==4">
            <el-row>
                <el-col :span="2">
                    <el-form-item label="关联条件：">
                    </el-form-item>
                </el-col>
                <el-col :span="22">
                    <template v-for="(relation,index) in formRule.relation.relations">
                      <el-row v-if="index > 0">
                          <el-col :span="5">
                              <el-form-item v-bind:label="'条件关系'+index+':'" :prop="'relation.relations.'+index+'.relation'">
                                      <el-select v-model="relation.relation">
                                          <el-option v-for="item in relationList"
                                                  :key="item.value"
                                                      :label="item.name"
                                                      :value="item.value">
                                          </el-option>
                                      </el-select>
                              </el-form-item>
                          </el-col>
                      </el-row>
                      <el-row>
                          <el-col :span="8">
                              <el-form-item v-bind:label="'条件'+(index+1)+':'" :prop="'relation.relations.'+index+'.condition'" :rules="{required: true, message: '关联条件不能为空', trigger: 'change'}">
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
                              <el-form-item label-width="0px" :prop="'relation.relations.'+index+'.compareFunc'" :rules="{required: true, message: '关联函数不能为空', trigger: 'change'}">
                                  <el-select v-model="relation.compareFunc" >
                                      <el-option v-for="item in compareFuncList"
                                          :label="item.name"
                                          :value="item.value">
                                      </el-option>
                                  </el-select>
                              </el-form-item>
                          </el-col>
                          <el-col :span="8">
                              <el-form-item label-width="0px" :prop="'relation.relations.'+index+'.condition'" :rules="{required: true, message: '关联条件不能为空', trigger: 'change'}">
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
                              <label class="delet font-color m-l-30" @click="formRule.relation.relations.splice(index,1)"><i class="el-icon-delete2 m-r-8"></i>删除</label>
                              <!--el-button type="text">删除</el-button-->
                          </el-col>
                      </el-row>
                      </template>
                    <el-row>
                        <el-col :offset="1">
                            <label class="add font-color"  @click="addRelationCondition">+关联条件</label>
                        </el-col>
                    </el-row>
                    <!-- <el-row>
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
                    </el-row> -->

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
            identityList:['A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T']


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
           eventTypeList:state=>state.context.eventTypeList,
           eventTypeList2:state=>state.context.eventType2List,
           deviceInfo:state=>state.context.deviceInfo,
           deviceInfo2:state=>state.context.device2Info,
           ruleAttrData:state=>state.context.ruleAttrData,
           configTypeInfo:state=>state.context.configTypeInfo
        })
    },
    methods:{
      changeConfigType:function(val){
        for(var item in this.configTypeInfo) {
            if (val==this.configTypeInfo[item].configtype){
              this.formRule.configtypeId= this.configTypeInfo[item].id;
              break;
            }
        }
        if (this.formRule.configTemplate==2 || this.formRule.configTemplate==4){
          if (this.formRule.maxIdentity<1){
            this.formRule.maxIdentity++;
          }
          // this.formRule.inputEventRule.identity=this.identityList[this.formRule.maxIdentity];

        }
        if (this.formRule.configtypeId==3){
          for ( var j=0;j< this.formRule.inputEventRules.length;j++){
          var inputEventRule={}
            inputEventRule = this.formRule.inputEventRules[j];
            inputEventRule.configEvent='2047';
              console.log(inputEventRule.configEvent)
            this.changeEventType(inputEventRule,j);
           }
        }else{
            var i=0;
            for ( var j=0;j< this.formRule.inputEventRules.length;j++){
              var inputEventRule={}
                inputEventRule = this.formRule.inputEventRules[j];
              inputEventRule.configEvent='';
              inputEventRule.identity=this.identityList[i++];
              this.changeEventType(inputEventRule,j);
            }

            // for ( var j=0;j< this.formRule.inputEventRules.length;j++){
            //     var inputEventRule={}
            //     inputEventRule = this.formRule.inputEventRules[j];
            //     inputEventRule.identity=this.identityList[i++];
            // }
        }
      },
        addInputRule:function(){
            // if  (this.formRule.configtypeId=='3'){
            //   this.formRule.maxIdentity++;
            //   var identity=this.identityList[this.formRule.maxIdentity];
            //   var inputEventRule={identity:'',configEvent:'',configName:'',attrData:[],filters:[{attrName:'',attrType:'',funcData:[],paramData:[],relation:'',compareFunc:'=',paramNum:1,compareValue:['','','']}],relation:'&'}
            //   inputEventRule.identity=identity;
            //   console.log(this.formRule.maxIdentity+'   '+identity+"  "+this.identityList);
            //   this.formRule.inputEventRules.push(inputEventRule);
            // }else{
                this.formRule.maxIdentity++;
                var identity=this.identityList[this.formRule.maxIdentity];
                var inputEventRule={identity:'',configEvent:'',attrData:[],filters:[{attrName:'',attrType:'',funcData:[],paramData:[],relation:'',compareFunc:'=',paramNum:1,compareValue:['','','']}],relation:'&'}
                inputEventRule.identity=identity;
                console.log(this.formRule.maxIdentity+'   '+identity+"  "+this.identityList);
                this.formRule.inputEventRules.push(inputEventRule);
              // }
            },
            addFilter:function(filters){
                var filter={attrName:'',attrType:'',funcData:[],paramData:[],relation:'',compareFunc:'',paramNum:1,compareValue:['','','']};
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
                                outputAttr1.attrDesc="事件("+inputEventRule.identity+")."+attr.attrDesc;
                                this.formRule.outputAttrData.push(outputAttr1)
                            }
                        }
                    }
                }
            },
            changeRelationAttr:function(relation){
                relation.compareValue='';
                relation.attrData.length=0;
                var rules=this.formRule.inputEventRules;
                var nextIdentity=[];
                for(var i=0;i<rules.length-1;i++){
                    if(relation.condition[0]==rules[i].identity){
                      for (var j=i+1;j<=this.formRule.maxIdentity;j++){
                        // console.log("maxIdentity"+this.formRule.maxIdentity)
                        nextIdentity.push(rules[j].identity);
                      }
                    }
                }
                 console.log("nextIdentity："+nextIdentity)
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
            },addRelationCondition:function(){
                var relation={condition:'',attrData:[],relation:'',compareFunc:'',compareValue:''};
                this.formRule.relation.relations.push(relation);
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
    },
    created:function(){

    }
}
</script>
<style>

</style>
