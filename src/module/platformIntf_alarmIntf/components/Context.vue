<template>

  <div class="whitebackground Whitespace">
    <div class="top-title">告警设置</div>
    <div :class="['ordinary-search', 'clearfloat']">
      <el-form :inline="true" :model="queryForm" ref="queryForm">
        <el-form-item label="">
          <el-select v-model="mparams.alarm_type" clearable style="width:204px;" placeholder="告警类型">
            <el-option v-for="item in alarmTypeList" :label="item.text" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="">
          <el-select v-model="mparams.alarm_grade" clearable style="width:204px;" placeholder="告警级别">
            <el-option v-for="item in alarmGradeList" :label="item.text" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="">
          <el-input placeholder="邮件告警对象" v-model="mparams.alarm_email_object"> </el-input>
        </el-form-item>

        <el-form-item label="">
          <el-button  @click="qryData(0)" type="primary">查询</el-button>
        </el-form-item>
      </el-form>

    </div>

    <div style="margin-right: 20px; margin-top: 10px; height:42px;" class="float-r">
      <el-button type="primary" size="small" @click="addRow()"><i class="icon-add m-r-8"></i>添加</el-button>
      <el-button type="primary" size="small" @click="delCheckedRows(0)"><i class="icon-delet m-r-8"></i>删除</el-button>
    </div>
      <alarmInterfaceEditTable :id="interfaceId"></alarmInterfaceEditTable>
  </div>


</template>

<script>
import commonAjax from 'components/js/common.js'
import {
  mapState
} from 'vuex'
import alarmInterfaceEditTable from './AlarmInterfaceEditTable.vue'
export default {
  components: {
    alarmInterfaceEditTable
  },
  data() {
    return {
      //自定义属性
      interfaceId: "interfaceId",
      emailId: "emailId",
      mparams: {
        alarm_type: null,
        alarm_grade: null,
        alarm_email_object: null
      },
      delSelected: "/ssa/platformIntf_alarmIntf/deleteCheckedRows.do",

    }
  },
  computed: {
    ...mapState({
      alarmTypeList:state=>state.context.alarmTypeList,
      alarmGradeList:state=>state.context.alarmGradeList,
      emailTemplateList:state=>state.context.emailTemplateList
    })
  },
  methods: {

    qryData(val) {
      var tableId = this.interfaceId;
      var params = this.mparams;
      this.$store.commit('setParams', [tableId, params]);
      this.$store.dispatch('reloadTable', tableId);
    },
    addRow(val) {
      var params = {};
      params.handle = "add";
      this.$router.push({name:"alarmInterfaceForm",params:params})

    },
    delCheckedRows(val) {
      if (val == "0") {
        var tableId = this.interfaceId;
      } else {
        var tableId = this.emailId;
      }
      var rows = this.$store.state.editTable[tableId].multipleSelection;

      if (rows.length <= 0) {
        this.$alert("请先选中数据");
        return;
      }

      this.$confirm('此操作将删除选中数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        var data_ids = [];
        rows.forEach(row => {
          data_ids.push(row.alarm_type_id);
        })
        var ids = data_ids.join(",");
        var result = await commonAjax.reqBackState(this.delSelected, {
          ids: ids
        });
        if(result.state) {
          this.$store.dispatch('reloadTable', tableId);
          this.$message({
            type: 'success',
            message: result.message
          });
        }else {
          this.$message({
            type: 'error',
            message: result.message
          });
        }

      })
    }
    //methods end
  },
  created: function() {
    this.$store.dispatch('loadListTypeList');
  }
}
</script>
