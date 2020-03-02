<template>
  <div style="margin-bottom:30px;" v-loading="loading">

    <el-card class="box-card" style="margin-top:20px;">
      <div slot="header" class="clearfix">
        处置
      </div>
      <processForm :options="formOptions" @onSubmitForm="onSubmitForm">
        <div slot="statusName" scope>
          {{statusNameMap[status]}} <a v-if="hiTasks != null " style="color:#3b9dda;cursor:pointer;" @click="dialogVisible = true">处置流程</a>
        </div>

      </processForm>
    </el-card>


    <el-card class="box-card" style="margin-top:20px;">
      <div slot="header" class="clearfix">
        告警信息
      </div>
      <template v-for="(bitem,bindex) in infoOptions">
        <a v-if v-if="bitem.type=='string'"> {{bitem.data}}</a>
        <div v-if="bitem.type=='tableInfo'" style="margin-top:30px;">
          <div class="el-panel-white-subtitle">{{bitem.label}}</div>
          <paramsTable :columns="bitem.columns" :tableData="bitem.tableData"></paramsTable>
        </div>
      </template>

      <div style="margin-top:30px;">
        <div class="el-panel-white-subtitle">关联事件</div>
        <defTable @currentChange="showEventInfo" ref="eventTable" :highlight-current-row="true" :pageSize="30" style="margin-top:15px;width:20%;height:666px;float:left;"
          :params="eventParams" :loadUrl="eventUrl">
          <template slot="fixedColumn">
            <el-table-column prop="" label="事发时间">
              <template slot-scope="scope">
                <div style="cursor:pointer;">
                  {{scope.row.logTime_dt}}
                </div>
              </template>
            </el-table-column>
          </template>

        </defTable>

        <div style="margin-top:15px;width:80%;height:666px;float:left;overflow:auto;" v-show="eventShow">
          <dataTotalTable :tableData="eventData"></dataTotalTable>
        </div>
      </div>
    </el-card>



    <el-dialog title="处置流程" :visible.sync="dialogVisible" width="30%">
      <el-collapse v-model="activeNames" class="Check-the-process-state-collapse">
        <el-collapse-item class="processcollapse-item" v-for="(item, index) in hiTasks">

          <template slot="title">
            <span class="processcollapse-itemnane"> {{item.task_name}}</span>
            &nbsp;&nbsp;<label>{{ item.end_time}}</label>
            <span class="processcollapse-itemperson">{{item.realname}}</span>
          </template>
          <div>
            <el-row class="process-content" v-if="taskVarMap[item.id] && taskVarMap[item.id].taskReason" :gutter="20">
              <el-col :span="4">
                <div>原因:</div>
              </el-col>
              <el-col :span="16">
                <div> {{taskVarMap[item.id].taskReason}}</div>
              </el-col>
            </el-row>
          </div>
        </el-collapse-item>
      </el-collapse>
    </el-dialog>

    <!-- <el-dialog title="事件详情" :visible.sync="eventShow" size="large"  class="dialog-panel" top="5%" >
    
      <dataTotalTable :tableData="eventData"  ></dataTotalTable>
    
  </el-dialog> -->
  </div>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import defTable from 'components/table/DefTable.vue'
  import processForm from 'components/processInfo/ProcessForm.vue'
  import common from 'components/js/common.js'
  import dataTotalTable from '../../netAttack/components/DataTotalTable.vue'
  import paramsTable from 'components/processInfo/ParamsTable.vue'
  export default {
    components: {
      paramsTable,
      processForm,
      dataTotalTable,
      defTable,
    },
    mounted: function () {
      let vm = this;
      Vue.nextTick(() => {
        window.setTimeout(function () {
          let data = vm.$refs.eventTable.getTableData();
          if (data.length > 0) {
            vm.showEventInfo(data[0]);
            vm.$refs.eventTable.setCurrentRow(data[0]);
          }
        }, 800);

      })
    },
    computed: {
      ...mapState({
        params: state => state.context.params,
        eventTypeList: state => state.context.eventTypeList,
        ProductTypeList: state => state.context.ProductTypeList,
        EventThreatList: state => state.context.EventThreatList,
        EventGradeList: state => state.context.EventGradeList,
        EventRiskList: state => state.context.EventRiskList,
      })
    },
    data() {
      return {
        formOptions: {
          ajaxDatas: {},
          button: {
            'submit': true,
            'cancel': true
          },
          name: "form",
          formData: {
            actionType: 2,
            alarm_parent_type: null,
            alarm_type: null,
            alarm_grade: null,
          },
          fileds: [],
        },
        eventShow: false,
        eventParams: {
          alarmId: null,
        },
        eventUrl: "/ssa/alarmManager/getSolrQuery.do",
        eventData: [],
        taskVarMap: {},
        actionTypeUrlMap: {
          "1": "/ssa/alarmProcess/aduitAlarm.do",
          "2": "/ssa/alarmProcess/cleanAlarms.do",
          "3": "/ssa/alarmProcess/nopassAlarm.do",
          "4": "/ssa/alarmProcess/submitThirdPart.do",
        },
        alarmThirdPart: 0,
        dialogVisible: false,
        loading: true,
        status: null,
        hiTasks: null,
        alarm: {},
        statusNameMap: {
          0: "待确认",
          1: "未审批",
          2: "未派发",
          3: "已派发",
          4: "已归档"
        },
        infoOptions: [{
            type: "string",
            data: ""
          },
          {
            label: "基础信息",
            type: "tableInfo",
            name: "info",
            columns: [],
            tableData: []
          },
          {
            label: "目标信息",
            type: "tableInfo",
            name: "info2",
            columns: [],
            tableData: []
          },
          {
            label: "源信息",
            type: "tableInfo",
            name: "info3",
            columns: [],
            tableData: []
          },
        ],
      }
    },
    methods: {

      showEventInfo(currentRow, oldCurrentRow) {
        this.eventShow = true;
        currentRow.processShow = false,
          this.eventData = currentRow;
      },
      goBack() {
        this.$router.go(-1);
      },
      async onSubmitForm(options) {
        let params = options.formData;
        params.alarm_ids = params.alarm_id;
        params.task_id = this.alarm.task_id;
        let actionType = params.actionType;
        let result = await this.common.reqDef(this.actionTypeUrlMap[actionType], params);
        if (result && result.state) {
          this.goBack();
        }

      },

      changeActionType(action, options) {
        let actionType = options.formData.actionType;
        let input = options.fileds[2];
        if (actionType == 2) {
          input.placeholder = "请输入归档原因";
          input.isShow = true;
        } else if (actionType == 3) {
          input.placeholder = "请输入不通过原因";
          input.isShow = true;
        } else {
          input.isShow = false;
        }

      },

      async setAlarmInfoForm(data) {
        if (data.status == 2) {
          this.setSubmitThirdParty();
          return;
        }
        if (data.status == 4) {
          this.setViewForm();
          return;
        }
        this.formOptions.fileds = [{
            label: "当前状态",
            type: "slot",
            name: "statusName"
          },
          {
            label: "确认操作",
            required: true,
            type: "radio",
            name: "actionType",
            options: [],
            change: this.changeActionType
          },
          {
            label: "原因",
            type: "input",
            name: "task_reason",
            placeholder: "请输入归档原因",
            isShow: true
          },
          {
            label: "告警类别",
            required: true,
            type: "select",
            name: "alarm_parent_type",
            ajaxData: "alarmParentType"
          },
          {
            label: "告警类型",
            required: true,
            type: "select",
            name: "alarm_type",
            ajaxData: "alarmType"
          },
          {
            label: "告警级别",
            required: true,
            type: "select",
            name: "alarm_grade",
            ajaxData: "alarmGrade"
          },
        ];
        this.setRaido(data);
        data.alarm_grade = data.alarm_grade + "";
        data.alarm_type = data.alarm_type + "";
        data.alarm_parent_type = data.alarm_parent_type + "";
        let alarmParentType = await this.common.reqDef("/ssa/alarmProcess/getSysDict.do", {
          type: "CATEGORY"
        });
        let alarmType = await this.common.reqDef("/ssa/alarmProcess/getSysDict.do", {
          type: "ALARMTYPE"
        });
        let alarmGrade = await this.common.reqDef("/ssa/alarmProcess/getSysDict.do", {
          type: "ALARMGRADE"
        });

        this.formOptions.ajaxDatas = {
          alarmParentType: alarmParentType.data,
          alarmType: alarmType.data,
          alarmGrade: alarmGrade.data
        }
        for (var p in data) {
          this.formOptions.formData[p] = data[p];
        }
      },
      setRaido(data) {
        let radio = this.formOptions.fileds[1];
        if (data.status == 0) {
          radio.options = [{
            label: "发布",
            value: 1
          }, {
            label: "归档",
            value: 2
          }];
        }

        if (data.status == 1) {
          if (this.alarmThirdPart == 0) {
            radio.options = [{
              label: "不通过",
              value: 3
            }, {
              label: "归档",
              value: 2
            }];
          } else {
            radio.options = [{
              label: "不通过",
              value: 3
            }, {
              label: "通过",
              value: 4
            }, {
              label: "归档",
              value: 2
            }];
          }
        }
      },
      setViewForm() {
        this.formOptions.fileds = [{
          label: "当前状态",
          type: "slot",
          name: "statusName"
        }, ];
        this.formOptions.button = {
          'cancel': true
        };
      },
      setSubmitThirdParty() {
        this.formOptions.fileds = [{
            label: "当前状态",
            type: "slot",
            name: "statusName"
          },
          {
            label: "告警接收人",
            required: true,
            type: "select",
            name: "receiver",
            ajaxData: "receiverList"
          },
        ];
      },
      setAlarmInfoTable(data) {
        if (data.src_area) {
          let area = data.src_area.split(" ");
          data.src_country = area[0];
          if (area.length >= 2) {
            data.src_city = area[1];
          }
        }
        let infoOptions = this.infoOptions;
        //告警信息
        infoOptions[0].data = data.alarm_desc;
        //基础信息
        infoOptions[1].tableData = [data];
        infoOptions[1].columns = [{
              label: "类别",
              name: "alarm_parent_typeName"
            },
            {
              label: "类型",
              name: "alarm_typeName"
            },
            {
              label: "级别",
              name: "alarm_gradeName"
            },
            {
              label: "关键字",
              name: "alarm_key"
            },
            {
              label: "累计次数",
              name: "sum"
            }
          ],
          //源信息
          infoOptions[2].tableData = [data];
        infoOptions[2].columns = [{
            label: "源IP",
            name: "src_ip"
          },
          {
            label: "资产标识",
            name: "src_asset_id"
          },
          {
            label: "组织机构",
            name: "src_org_name"
          },
          {
            label: "国家",
            name: "src_country"
          },
          {
            label: "城市",
            name: "src_city"
          },
        ];
        //目标信息
        infoOptions[3].tableData = [data];
        infoOptions[3].columns = [{
            label: "目标IP",
            name: "dst_ip"
          },
          {
            label: "资产标识",
            name: "dst_asset_id"
          },
          {
            label: "组织机构",
            name: "dst_org_name"
          },
        ]
      },
      initTaskVarMap(varList) {
        varList.forEach(v => {
          let map = this.taskVarMap[v.id];
          if (!map) {
            map = {};
            this.taskVarMap[v.id] = map;
          }
          map[v.name] = v.value;
        })
      },
      fmtEventTypeList(val) {
        for (var item in this.eventTypeList) {
          if (val == this.eventTypeList[item].id) {
            return this.eventTypeList[item].text;
          }
        }
        return "未知";
      },
      fmtEventRiskList(val) {
        // console.log(val);
        for (var item in this.EventRiskList) {
          if (val == this.EventRiskList[item].id) {
            return this.EventRiskList[item].text;
          }
        }
        return "未知";
      },
    },
    beforeCreate: async function () {
      let alarmId = this.$route.params.alarm_id;
      if (alarmId) {
        sessionStorage._m_alarm_id = alarmId;
      }
      alarmId = sessionStorage._m_alarm_id;
      //获取告警信息
      let alarm = await this.common.req("/ssa/alarmManager/getAlarmInfoById.do", {
        alarmId: alarmId
      });
      this.alarmThirdPart = alarm.alarmThirdPart;
      //获取历史告警信息
      let {
        taskList,
        taskVarList
      } = await this.common.req("/ssa/alarmProcess/getAlarmHiTasks.do", {
        alarmId: alarmId
      });
      if (taskList.length > 0) {
        this.hiTasks = taskList;
        this.initTaskVarMap(taskVarList);
      }


      //读取关联事件
      this.eventParams.alarmId = alarmId;
      this.$refs.eventTable.loadTableData();

      //
      this.status = alarm.status;
      this.alarm = alarm;
      await this.setAlarmInfoForm(alarm);
      await this.setAlarmInfoTable(alarm);
      this.$store.dispatch('loadListTypeList');
      this.loading = false;

    }
  }

</script>
<style>
  .link {
    color: #3b9dda;
  }

</style>
