<template>
<el-form ref="formRule" :model="formRule"  :rules="rules" label-width="120px">
    <el-row>
            <div class="el-sub-panel-heading"><h4 class="sub-title">输出字段</h4></div>
        </el-row>
        <el-row v-for="(outputRule,index) in formRule.outputRules">
            <el-col :span="11">
                <el-form-item v-bind:label="'字段'+(index+1)+'：'">

                    <el-select v-model="outputRule.outputAttrName" v-if="index==0">
                            <el-option v-for="item in outputEventAttr"
                                    :key="item.value"
                                    :label="item.name"
                                    :value="item.value">
                            </el-option>
                    </el-select>
                    <el-select v-model="outputRule.outputAttrName"  v-if="index>0">
                            <el-option v-for="item in attrData"
                                                :key="item.attrName"
                                                :label="item.attrDesc"
                                                :value="item.attrName">
                            </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item label="原始字段" label-width="90px">
                    <el-select v-model="outputRule.srcAttrName" :disabled="index==0" v-if="index==0">
                            <el-option v-for="item in attrData"
                                                :key="item.attrName"
                                                :label="item.attrDesc"
                                                :value="item.attrName">
                            </el-option>
                    </el-select>

                    <el-select v-model="outputRule.srcAttrName" v-if="index>0" @change="outAttrChange(outputRule)">
                            <el-option v-for="item in formRule.outputAttrData"
                                                :key="item.attrName"
                                                :label="item.attrDesc"
                                                :value="item.attrName">
                            </el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="4">
                <el-form-item label="取值" label-width="60px" v-if="index==0"  :prop="'outputRules.'+index+'.which'" :rules="{required: true, message: '输出事件类型不能为空', trigger: 'change'}">
                    <!--el-select>
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

                    </el-select-->
                    <el-cascader
                                :options= "eventTypeList"
                                :props = "props"
                                :show-all-levels="false"
                                v-model="outputRule.whichCascader"
                                @change="handleWhichChange" change-on-select>
                            ></el-cascader>
                </el-form-item>
                <el-form-item label="取值" label-width="60px" v-if="index>0 &&　outputRule.type == 0">
                    <el-input v-model="outputRule.which"></el-input>
                </el-form-item>
                <el-form-item label="取值" label-width="60px" v-if="index>0 &&　outputRule.type==1">
                    <el-select v-model="outputRule.which">
                            <el-option v-for="item in outputRule.valueData"
                                                :key="item.value"
                                                :label="item.name"
                                                :value="item.value">
                            </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="取值" label-width="60px" v-if="index>0 &&　outputRule.type==2">
                    <el-select v-model="outputRule.which">
                            <el-option v-for="item in whichList"
                                                :key="item.value"
                                                :label="item.name"
                                                :value="item.value">
                            </el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="3" v-if="formRule.outputRules.length>5 && index>0">
                <label class="delet font-color m-l-30" @click="formRule.outputRules.splice(index,1)"><i class="el-icon-delete2 m-r-8"></i>删除</label>
                <!--el-button type="text" @click="formRule.outputRules.splice(index,1)">删除</el-button-->
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="3" :offset="1">
                <label class="add font-color"  @click="addOutputRule">+输出字段</label>
                <!--el-button type="text" @click="addOutputRule">+输出字段</el-button-->
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

            // outputEventAttr:[{name:'输出事件类型',value:'eventType_s'}],
            outputEventAttr:[],
            whichList:[{name:'最后一个',value:'last'},{name:'第一个',value:'first'}],
            props :{
                                    value:'id',
                                    label:'remark',
                                    children:'children'
                                }
        }
    },
    computed:{
        ...mapState({
           formRule:state=>state.context.formRule,
           attrData:state=>state.context.attrData,
           eventOutAttrValueList:state=>state.context.eventOutAttrValueList,
           eventOutAttrList:state=>state.context.eventOutAttrList,
           configTypeInfo:state=>state.context.configTypeInfo,
           eventTypeList:state=>state.context.eventTypeList
        })
    },
    methods:{
        addOutputRule:function(){
                var outputRule={outputAttrName:'',srcAttrName:'',type:0,valueData:[],which:''}
                this.formRule.outputRules.push(outputRule)
            },
        outAttrChange:function(outputRule){

                var attr = outputRule.srcAttrName
                outputRule.which=''
                if(attr[1]=='.'){
                    outputRule.type=2
                }else{
                    for(var item of this.eventOutAttrList){
                        if(item.attrName==attr){
                            outputRule.type=item.attrType
                        }
                    }
                    console.log("outputRule.type:"+outputRule.type)
                    if(outputRule.type==1){
                        outputRule.valueData.splice(0)
                        for(var item of this.eventOutAttrValueList){
                            console.log(item.attrName+" "+attr)
                            if(item.attrName==attr){
                                var o={};
                                o.name=item.valueDesc
                                o.value=item.attrValue
                                outputRule.valueData.push(o)
                            }
                        }
                    }
                }
            },
        handleWhichChange:function(value){
            this.formRule.outputRules[0].which=value[value.length-1]
            console.log("which:"+value[value.length-1])
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
      var obj={};
      obj.name="输出事件类型";
      obj.value = this.configTypeInfo[1].configtype;
      this.outputEventAttr=[obj];
    }
}
</script>
<style>

</style>
