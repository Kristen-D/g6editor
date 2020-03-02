<template>
<div>
<div class="top-title">{{formRule.title}}</div>
<el-form ref="formRule" :model="formRule"  :rules="rules" label-width="120px">
        <el-form-item label="选择模板：" >
            <el-radio-group v-model="formRule.configTemplate" @change="templateChange">
                <el-radio-button v-for="item in configTemplateList"     :label="item.value">{{item.name}}</el-radio-button>
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
                    <!--el-button type="text" @click="delEventRule(eventRuleIndex)">删除</el-button-->
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
                            <!--el-button type="text" @click="addRelationCondition">+关联条件</el-button-->
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
        <template  v-if="formRule.configTemplate==2 || formRule.configTemplate==3">
            <el-row >
                <div class="el-sub-panel-heading"><h4 class="sub-title">时间窗口</h4></div>
            </el-row>
            <el-row>
                    <el-col :span="5">
                        <el-form-item label="时间属性：" prop="timeField" :rules="{required: true, message: '时间属性不能为空', trigger: 'change'}">
                            <el-select v-model="formRule.timeField">
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
                    <el-form-item label="时间窗口："  prop="timeWindow" :rules="{required: true, message: '时间窗口不能为空', trigger: 'blur'}">
                        <el-input v-model="formRule.timeWindow" @change="secTimeWindow"></el-input>
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
            <template  v-if="formRule.configTemplate==3 ||(formRule.configTemplate==2&&(formRule.relationType==2))">
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
            </template>
        </template>
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
                    <el-select v-model="outputRule.outputAttrName" v-if="index>0">
                            <el-option v-for="item in formRule.outputAttrData"
                                                :key="item.attrName"
                                                :label="item.attrDesc"
                                                :value="item.attrName">
                            </el-option>
                    </el-select>
                </el-form-item>
            </el-col>
            <el-col :span="4">
                <el-form-item label="字段命名为" label-width="90px">
                    <el-select v-model="outputRule.renameAttrName" :disabled="index==0">
                            <el-option v-for="item in attrData"
                                                :key="item.attrName"
                                                :label="item.attrDesc"
                                                :value="item.attrName">
                            </el-option>
                    </el-select>
                </el-form-item>
            </el-col>

            <el-col :span="4">
                <el-form-item label="取值" label-width="60px" v-if="index==0"  :prop="'outputRules.'+index+'.which'" :rules="{required: true, message: '输出事件类型不能为空', trigger: 'change'}">
                    <el-select v-model="outputRule.which">
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
                </el-form-item>
                <el-form-item label="取值" label-width="60px" v-if="index>0">
                    <el-input v-model="outputRule.which"></el-input>
                    <!--el-select v-model="outputRule.which">
                            <el-option v-for="item in whichList"
                                                :key="item.value"
                                                :label="item.name"
                                                :value="item.value">
                            </el-option>
                    </el-select-->
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

        <el-row>
            <div class="el-sub-panel-heading"><h4 class="sub-title">告警配置</h4></div>
        </el-row>
        <el-row>
            <el-col :span="11">
        <el-form-item label="启动：">
            <el-radio-group v-model="formRule.alarm.state">
                <el-radio label="1">是</el-radio>
                <el-radio label="2">否</el-radio>
            </el-radio-group>
        </el-form-item>
        <template v-if="formRule.alarm.state==1">
            <el-form-item label="重点关注：">
                <el-radio-group v-model="formRule.alarm.focus">
                <el-radio label="1">是</el-radio>
                <el-radio label="2">否</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="告警类型：" prop="alarm.alarmType" :rules="{required: true, message: '告警类型不能为空', trigger: 'change'}">
                            <el-select v-model="formRule.alarm.alarmType">
                                                    <el-option v-for="item in alarmTypeList"
                                                        :key="item.value"
                                                        :label="item.name"
                                                        :value="item.value">
                                                    </el-option>

                            </el-select>
            </el-form-item>
            <el-form-item label="告警阶段："  prop="alarm.alarmPhase" :rules="{required: true, message: '告警阶段不能为空', trigger: 'change'}">
                            <el-select v-model="formRule.alarm.alarmPhase">
                                                    <el-option v-for="item in alarmPhaseList"
                                                        :key="item.value"
                                                        :label="item.name"
                                                        :value="item.value">
                                                    </el-option>

                            </el-select>
            </el-form-item>
            <el-form-item label="告警级别："  prop="alarm.alarmGrade" :rules="{required: true, message: '告警级别不能为空', trigger: 'change'}">
                            <el-select v-model="formRule.alarm.alarmGrade">
                                                    <el-option v-for="item in alarmGradeList"
                                                        :key="item.value"
                                                        :label="item.name"
                                                        :value="item.value">
                                                    </el-option>

                            </el-select>
            </el-form-item>
            <!-- {state:1,focus:1,alarmType:'',alarmPhase:'',alarmGrade:'',alarmContext:'',mail:false,message:false}-->
            <el-form-item label="告警内容："  prop="alarm.alarmContext" :rules="{required: true, message: '告警内容不能为空', trigger: 'blur'}">
                <el-input type="textarea" v-model="formRule.alarm.alarmContext"></el-input>
            </el-form-item>
            <el-form-item label="通知方式：">
                <el-checkbox-group v-model="formRule.alarm.notice">
                <el-checkbox label="mail">邮件</el-checkbox>
                <el-checkbox label="message">短信</el-checkbox>
            </el-checkbox-group>
            </el-form-item>
        </template>
        </el-col>
        </el-row>
        <el-form-item>
            <el-button type="primary" @click="onSubmit('formRule')">保存</el-button>
            <el-button type="gray" @click="close">返回</el-button>
        </el-form-item>

</el-form>

</div>
</template>
<script>
import {mapActions,mapState} from 'vuex'
import commonAjax from 'components/js/common.js'
export default{
    data(){
        return {
                 configTemplateList:[{name:'普通模板',value:1},{name:'关联模板',value:2},{name:'分组模板',value:3}],
                 eventTypeList:[{name:'事件类型1',id:1,children:[{name:'文件传输事件',id:2},{name:'登录事件',id:3}]}],
                 timeUnitList:[{name:'秒',value:'s'},{name:'分',value:'m'},{name:'时',value:'h'},{name:'天',value:'d'}],
                 statsTypeList:[{name:'分组计数',value:'count'},{name:'分组累加',value:'sum'}],
                 whichList:[{name:'最后一个',value:'last'},{name:'第一个',value:'first'}],


                 //alarmTypeList:[{name:'攻击事件',value:1},{name:'信息泄露',value:2}],
                 alarmTypeList:[],
                 //alarmPhaseList:[{name:'嗅探',value:1},{name:'入侵',value:2}],
                 alarmPhaseList:[],
                 //alarmGradeList:[{name:'严重',value:1},{name:'普通',value:2}],
                 alarmGradeList:[],
                 compareFuncList:[{value:'>',name:'大于'},{value:'<',name:'小于'},{value:'=',name:'等于'}],
                 relationList:[{name:'且',value:'&'},{name:'或',value:'|'}],
                 identityList:['A','B','C','D','E','F','G'],

                 outputEventAttr:[{name:'输出事件类型',value:'eventType_s'}],

                 rules: {
                    ruleName: [
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max:64, message: '长度在 3 到 64 个字符', trigger: 'blur' }
                    ],
                    ruleType: [
                        { required: true, message: '请选择规则类型', trigger: 'change' }
                    ],
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
           ruleTypeList:state=>state.context.ruleTypeList,
           funcData:state=>state.context.funcData,
           eventAttrData:state=>state.context.eventAttrData,
           attrFuncList:state=>state.context.attrFuncList,
           attrParamList:state=>state.context.attrParamList,
           deviceTypeList:state=>state.context.deviceTypeList

        })
    },
    methods:{
            ...mapActions({
			    setEditPanel:'setEditPanel',
                saveEditRule:'saveEditRule'


            }),
            reduceRule:function(rule){
                var saveRule={};
                saveRule.ruleId=rule.ruleId;
                saveRule.configTemplate=rule.configTemplate;
                saveRule.ruleName = rule.ruleName;
                saveRule.ruleDesc = rule.ruleDesc;
                saveRule.ruleType = rule.ruleType;
                saveRule.stats = rule.stats;
                saveRule.relationType = rule.relationType;
                saveRule.inputEventRules = []
                for(var item of rule.inputEventRules){
                    var inputEventRule={identity:'',configEvent:'',deviceType:'',attrData:[],filters:[],relation:''}
                    inputEventRule.identity=item.identity
                    inputEventRule.configEvent = item.configEvent
                    inputEventRule.deviceType = item.deviceType
                    inputEventRule.relation = item.relation
                    for(var filter of item.filters){
                        var newFilter={attrName:'',attrType:'',funcData:[],paramData:[],compareFunc:'',paramNum:1,compareValue:['','',''],compareValueAll:''}
                        newFilter.attrName=filter.attrName;
                        newFilter.attrType=filter.attrType;
                        newFilter.compareFunc = filter.compareFunc;
                        newFilter.paramNum = filter.paramNum;
                        newFilter.compareValue = filter.compareValue;
                        newFilter.compareValueAll = filter.compareValueAll;
                        inputEventRule.filters.push(newFilter);
                    }
                    saveRule.inputEventRules.push(inputEventRule);
                }
                saveRule.relations=[]
                for(var item of rule.relations){
                    var relation={condition:'',attrData:[],compareFunc:'',compareValue:''}
                    relation.condition=item.condition
                    relation.compareFunc = item.compareFunc
                    relation.compareValue = item.compareValue
                    saveRule.relations.push(relation)
                }
                saveRule.relationCondition = rule.relationCondition
                saveRule.timeField = rule.timeField
                saveRule.timeWindow = rule.timeWindow
                saveRule.secTimeWindow = rule.secTimeWindow
                saveRule.timeUnit = rule.timeUnit
                saveRule.sumField = rule.sumField
                saveRule.groupField = rule.groupField
                saveRule.groupType = rule.groupType
                saveRule.groupFieldDeamon = rule.groupFieldDeamon
                saveRule.compareFunc = rule.compareFunc
                saveRule.compareValue = rule.compareValue
                saveRule.outputAttrData = []
                saveRule.outputRules = rule.outputRules
                saveRule.alarm = rule.alarm;

                return saveRule;
            },
            submitForm:function(rule){
                //

                var param={};
                param.ruleId=rule.ruleId;

                param.ruleName=rule.ruleName;
                param.ruleDesc=rule.ruleDesc;
                param.ruleType=rule.ruleType;
                param.status = rule.stats;
                //获取eventType和eventTypeName
                var eventType='';
                param.eventTypeName='';
                for(var item of rule.inputEventRules){
                    eventType+=item.configEvent+',';
                    for(var group of this.deviceTypeList){
                            for(var dev of group.children){
                                if(dev.id==item.configEvent){
                                    param.eventTypeName+=dev.name+',';
                                }
                            }
                        }
                        //归并过滤函数参数
                        for(var filter of item.filters){
                            var value=filter.compareValue.join();
                            while(value[value.length-1]==','){
                                value=value.substr(0,value.length-1);
                            }
                            filter.compareValueAll=value;
                        }
                }
                param.eventTypeName=param.eventTypeName.substr(0, param.eventTypeName.length - 1);
                param.eventType = eventType.substr(0, eventType.length - 1);
                param.windows=rule.secTimeWindow;
                param.enableAlarm=rule.alarm.state;
                //获取ruleTypeName
                param.ruleTypeName='';
                for(var item of this.ruleTypeList){
                    for(var type of item.children){
                        if(type.id==param.ruleType){
                            param.ruleTypeName=type.name;
                        }
                    }
                }

                var saveRule=this.reduceRule(rule);

                var jsonStr=JSON.stringify(saveRule);
                param.jsonStr=jsonStr;
                if(param.ruleId==''){
                    commonAjax.req('/ssa/ruleManage3/saveRuleInfo.do',param).then((data)=>{
                            console.log(data);
                            rule.ruleId=data.ruleId;
                            rule.title="编辑规则";
                            this.saveEditRule(this.formRule);
                            this.$message({
                                message: '保存规则成功',
                                type: 'success'
                                });
                            rule.title="查看规则"
                            this.setEditPanel(2);
                        })
                }else{
                        commonAjax.req('/ssa/ruleManage3/updateRuleInfo.do',param).then((data)=>{
                            this.$message({
                                message: '保存规则成功',
                                type: 'success'
                                });
                        })
                        rule.title="查看规则"
                        this.setEditPanel(2);
                }
            },
            onSubmit:function(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.submitForm(this.formRule)
                    } else {
                        this.$message.error('未保存！部分选项校验不通过');
                        return false;
                    }
                });
            },
            close:function(){
                this.setEditPanel(0);
            },
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
            },
            addInputRule:function(){
                this.formRule.maxIdentity++;
                var identity=this.identityList[this.formRule.maxIdentity]
                var inputEventRule={identity:'',configEvent:'',deviceType:'',attrData:[],filters:[{attrName:'',attrType:'',funcData:[],paramData:[],compareFunc:'=',paramNum:1,compareValue:['','','']}],relation:'&'}
                inputEventRule.identity=identity;
                console.log(this.formRule.maxIdentity+'   '+identity+"  "+this.identityList);
                this.formRule.inputEventRules.push(inputEventRule);
            },
            change:function(value){
                console.log(value+'  '+this.formRule.stats);
            },
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
            },addFilter:function(filters){
                var filter={attrName:'',attrType:'',funcData:[],paramData:[],compareFunc:'',paramNum:1,compareValue:['','','']};
                filters.push(filter);
            },addOutputRule:function(){
                var outputRule={outputAttrName:'',renameAttrName:'',which:'first'};
                this.formRule.outputRules.push(outputRule);
            },changeFilterFunction:function(filter){
                for(var item of this.funcData){
                    if(item.functionName==filter.compareFunc){
                        filter.paramNum=item.paramNum;
                        if(filter.paramNum==9999)
                            filter.paramNum=0;
                    }
                }
                console.log(filter.paramNum);

            },changeEventType:function(inputEventRule,index){
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

            },changeRelationAttr:function(relation){
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
            },groupFieldChange:function(value){
                //"groupField":["attr1","attr3","attr5"],
                //"groupFieldDeamon":[{"groupKey":"attr1","groupValue":"2"}], 需求来源苏勇冰
                var groupFieldDeamon=[];
                for(var item of value){
                    var item1={};
                    item1.groupkey=item;
                    item1.groupValue=2;
                    groupFieldDeamon.push(item1)
                }
                this.formRule.groupFieldDeamon=groupFieldDeamon
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

    },
    created:function(){
        commonAjax.req('/ssa/ruleManage2/getEventTypeList.do').then((data)=>{
                    this.eventTypeList=data;

                })
        var param={};
        param.types='ALARMTYPE,ALARMPHASE,ALARMGRADE'
        commonAjax.req('/ssa/ruleManage2/getSysDictList.do',param).then((data)=>{
            for(var item of data){
                if(item.type=='ALARMTYPE')
                    this.alarmTypeList.push(item);
                if(item.type=='ALARMPHASE')
                    this.alarmPhaseList.push(item);
                if(item.type=='ALARMGRADE')
                    this.alarmGradeList.push(item);
            }

        })

    },
}
</script>
<style>
    .el-date-editor--date.el-input {
    width: 100%;
}
input[type=text], input[type=password], textarea {
    color: #1f2d3d;
}
</style>
