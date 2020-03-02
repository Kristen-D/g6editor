<template>

  <div style="margin-right: 20px; margin-top: 10px; height:42px;" class="float-r">
    <el-popover ref="popover4" placement="right" width="70" trigger="click">
      <el-checkbox-group v-model="localCheckCols" @change="setHeadCols(localCheckCols)">
        <el-checkbox v-for="col in tableHeadCols" :label="col.label" :disabled="col.disabled">
        </el-checkbox>

      </el-checkbox-group>
    </el-popover>
    <el-button type="primary" size="small" @click="newRule"><i class="icon-add m-r-8"></i>新增</el-button>
    <!-- <el-button type="primary" size="small" @click="importEvent"><i class="icon-import m-r-8"></i>导入</el-button> -->
    <el-button type="primary" size="small" @click="delMultiRuleConfirm"><i class="icon-delet m-r-8"></i>删除</el-button>
    <!-- <el-button type="primary" size="small" @click="exportReport">导出</el-button> -->
    <el-button type="text" v-popover:popover4><i class="fa fa-cog fa-lg"></i></el-button>
    <el-button type="text" @click="refresh"><i class="fa fa-refresh fa-lg"></i></el-button>
  </div>

  <!-- <div>
    <el-popover ref="popover4" placement="right" width="70" trigger="click">
      <el-checkbox-group v-model="localCheckCols" @change="setHeadCols(localCheckCols)">
        <el-checkbox v-for="col in tableHeadCols" :label="col.label" :disabled="col.disabled">
        </el-checkbox>

      </el-checkbox-group>
    </el-popover>
    <el-row :gutter="20">
      <el-col :span="5"><span style="font-size:18px">规则列表</span></el-col>
      <el-col :span="6" :offset="13">
        <el-button type="primary" @click="newRule">新增</el-button>
        <el-button type="primary" @click="delMultiRuleConfirm">删除</el-button>
        <el-button type="text" v-popover:popover4><i class="fa fa-cog fa-lg"></i></el-button>
        <el-button type="text" @click="refresh"><i class="fa fa-refresh fa-lg"></i></el-button>

      </el-col>
    </el-row>
  </div> -->
</template>
<script>
  import {
    mapActions,
    mapState
  } from 'vuex'
  import commonAjax from 'components/js/common.js'
  export default {
    data() {
      return {
        localCheckCols: []
      }
    },
    computed: {
      ...mapState({
        tableHeadCols: state => state.context.tableHeadCols,
        queryCondition: state => state.context.queryCondition,
        multipleSelection: state => state.context.multipleSelection,
        configTypeInfo: state => state.context.configTypeInfo,
        checkHeadCols: state => state.context.checkHeadCols
        //deviceInfo:state=>state.context.deviceInfo
      })

    },
    mounted: function () {
      this.localCheckCols = this.checkHeadCols.slice();
    },
    methods: {

      ...mapActions({
        setEditPanel: 'setEditPanel',
        setHeadCols: 'setHeadCols',
        getRuleList: 'getRuleList',
        // delMultiRule:'delMultiRule',
        setEditRule: 'setEditRule',
        getRuleOutputCondition: 'getRuleOutputCondition',
        getRuleConfig: 'getRuleConfig',
        setMultipleSelection: 'setMultipleSelection'
      }),
      newRule: function () {
        //初始化规则配置
        var newRule = {
          title: '新增规则',
          ruleId: '',
          //模板类型 1 标准模板 2 关联模板 3 分组模板 4-威胁情报模板
          configTemplate: 1,
          configtype: null,
          configtypeId: null,
          addflag: 1,
          ruleName: '',
          ruleDesc: '',
          //规则类型
          ruleType: '',
          ruleTypeCascader: [],
          //状态 1 启用 2 停用
          status: 1,

          //子规则，1 允许作为子规则在串联规则中使用
          // subRule: 0,
          // cycleEvent:0,

          statsTime: '',
          operator: '',
          ruleTypeName: '',
          eventTypeName: '',
          //关联类型 1 普通关联 2 分组关联
          relationType: 1,
          //输入事件及过滤条件，标准模板和分组模板只有1条,关联模板可有多条
          inputEventRules: [{
            identity: 'A',
            configEvent: '',
            configName: '',
            attrData: [],
            filters: [{
              attrName: '',
              attrType: '',
              funcData: [],
              paramData: [],
              compareFunc: '',
              relation: '',
              paramNum: 1,
              compareValue: ['', '', '']
            }],
            relation: '&'
          }],
          maxIdentity: 1,
          //关联条件，只在关联模板使用
          relation: {
            relations: [{
              condition: '',
              attrData: [],
              relation: '',
              compareFunc: '',
              compareValue: ''
            }],
            relationCondition: '',
            //时间窗口设置，
            relationTimeField: '',
            relationTimeWindow: 0,
            relationSecTimeWindow: 0,
            relationTimeUnit: 's'
          },
          //分组统计设置
          stat: {
            timeField: '', //timeField 时间字段
            timeWindow: 0, //时间窗口值，前台有关，不必管
            secTimeWindow: 0, //后台程序使用，单位秒
            timeUnit: 's', //时间窗口单位，前台使用
            sumField: '', //分组累加的字段
            distinctField: [], //唯一计数的field选择，可以多选
            stateValue: '', //用于连续性判断
            groupField: [], //分组字段
            groupFieldDeamon: [], //后台使用格式：来源：苏勇冰
            groupType: 1, //分组类型 1 累加 、2 计数
            compareValue: '', //分组对比值
            compareFunc: '', //分组对比函数
            outputTime: '' //1:满足条件输出，2：窗口到输出
          },
          //输出设置
          //outputAttrName 输出字段名   renameAttrName 重命名名 which ：第一个、最后一个
          outputAttrData: [],
          outputRules: [{
              outputAttrName: this.configTypeInfo[1].configtype,
              srcAttrName: '',
              type: 0,
              valueData: [],
              which: '',
              whichCascader: []
            },
            {
              outputAttrName: '',
              srcAttrName: '',
              type: 0,
              valueData: [],
              which: ''
            },
            {
              outputAttrName: '',
              srcAttrName: '',
              type: 0,
              valueData: [],
              which: ''
            }, {
              outputAttrName: '',
              srcAttrName: '',
              type: 0,
              valueData: [],
              which: ''
            },
            {
              outputAttrName: '',
              srcAttrName: '',
              type: 0,
              valueData: [],
              which: ''
            }
          ],
          alarm: {
            alarmTypeArr:[],
            state: '2',
            focus: '1',
            alarmType: '',
            alarmSubType: '',
            alarmThreeType: '',
            alarmPhase: '',
            alarmGrade: '',
            alarmContext: '',
            notice: []
          },
          ruleFlow: [{
            rule: ''
          }]
        };

        this.setEditRule(newRule);
        this.setEditPanel(1);
      },
      refresh: function () {
        this.getRuleList();
      },
      delMultiRule: function () {
        var params = {};
        var ruleIds = [];
        var select = this.multipleSelection;
        if (select.length > 0) {
          for (var i = 0; i < select.length; i++) {
            ruleIds.push(select[i].ruleId);
          }
          params.ruleIds = ruleIds.join(",");

          commonAjax.req('/ssa/ruleManage2/delMultiRule.do', params).then((data) => {
            this.setMultipleSelection([]);
            this.getRuleList();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          })
        }
      },
      delMultiRuleConfirm: function () {

        this.$confirm('此操作将永久删除规则配置, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.delMultiRule();
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });


      }

    }
  }

</script>
<style>
  .el-checkbox {
    margin-left: 15px;
  }

</style>
