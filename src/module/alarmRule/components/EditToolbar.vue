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
          //规则类型 101 过滤 102 合并 3 升降 104 变更
          configTemplate: 101,
          addflag: 1,
          ruleName: '',
          ruleDesc: '',
          //规则类型 101 过滤 102 合并 3 升降 104 变更
          ruleType: 101,
          //状态 1 启用 2 停用
          stats: 1,

          statsTime: '',
          operator: '',
          ruleTypeName: '',
          alarmTypeName: '',
          //输入事件及过滤条件，标准模板和分组模板只有1条,关联模板可有多条
          inputEventRules: [{
            identity: '1',
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
          merge_relations: [{
            identity: '1',
            attrName: ''
          }],
          timeField: '',
          timeWindow: 0, //时间窗口值，前台有关，不必管
          secTimeWindow: 0, //后台程序使用，单位秒
          timeUnit: 's', //时间窗口单位，前台使用
          compareFunc: '', //对比函数
          compareValue: '', //对比值
          alarmRecovery: 1, //是否恢复
          checked1: false,
          checked2: false,
          upgrade: 0,
          degrade: 0,
          //输出设置
          //outputAttrName 输出字段名   renameAttrName 重命名名 which ：第一个、最后一个
          outputAttrData: [],
          outputRules: [{
              outputAttrName: '',
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
          ]
          // alarm:{state:'2',focus:'1',alarmType:'',alarmPhase:'',alarmGrade:'',alarmContext:'',notice:[]},
          // ruleFlow:[{rule:''}]
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

          commonAjax.req('/ssa/alarmRule/delMultiRule.do', params).then((data) => {
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
