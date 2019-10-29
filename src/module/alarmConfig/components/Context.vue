<template>
  <div class="whitebackground Whitespace" style="background-color: #fff; padding-bottom: 120px;">
      <div class="top-title">告警设置</div>
    <div :class="[advancedFlag ? 'senior-search':'ordinary-search', clearfloat]">
      <el-form :inline="true" :model="queryForm" ref="queryForm">
        <el-form-item style="display:inline-block;" label="告警类型">
          <el-select v-model="mparams.alarm_type" clearable  placeholder="告警类型">
            <el-option v-for="item in alarmTypeList" :label="item.text" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="display:inline-block;" v-if="!advancedFlag">
          <el-button type="primary" class="button-p-2" @click="qryData(0)">搜索</el-button>
        </el-form-item>
        <div class="" v-if="advancedFlag"  style="display:inline;">
        <el-form-item label="风险级别" style="display:inline-block;">
          <el-select v-model="mparams.alarm_grade" clearable  placeholder="风险级别">
            <el-option v-for="item in alarmGradeList" :label="item.text" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="告警方式" style="display:inline-block;">
          <el-select v-model="mparams.type" clearable  placeholder="告警方式">
            <el-option v-for="item in type" :label="item.text" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="告警模板" style="display:inline-block;">
          <el-select v-model="mparams.template_id" clearable  placeholder="告警模板">
            <el-option v-for="item in templateList" :label="item.text" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="告警对象" style="display:inline-block;">
          <el-select v-model="mparams.send_object" clearable  placeholder="告警对象">
            <el-option v-for="item in userList" :label="item.username" :value="item.user_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="抄送对象" style="display:inline-block;">
          <el-select v-model="mparams.card_copy_object" clearable  placeholder="抄送对象">
            <el-option v-for="item in userList" :label="item.username" :value="item.user_id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="">
          <el-button  @click="qryData(0)" type="primary">查询</el-button>
        </el-form-item>

    </div>
    <div class="float-r">
      <p class="search-tag search-tag02" @click="hideAdvanced" v-if="advancedFlag">
        <i class="el-icon-search  m-r-8" style="margin-right:8px;"></i>普通搜索
      </p>
      <p class="search-tag" @click="showAdvanced" v-if="!advancedFlag">
        <i class="el-icon-search" style="margin-right:8px;"></i>高级搜索
      </p>
    </div>
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
      type:[{id:"1",text:"邮件"},{id:"2",text:"短信"}],
      advancedFlag:false,
      templateList:[],
      emailId: "emailId",
      mparams: {
        alarm_type: null,
        alarm_grade: null,
        send_object: null,
        type: null,
        card_copy_object: null,
        template_id:null
      },
      delSelected: "/ssa/alarm_config/deleteCheckedRows.do",

    }
  },
  computed: {
    ...mapState({
      alarmTypeList:state=>state.context.alarmTypeList,
      alarmGradeList:state=>state.context.alarmGradeList,
      userList:state=>state.context.userList
    })
  },
  methods: {
    showAdvanced(){
      this.advancedFlag = true;
    },
    hideAdvanced(){
      this.advancedFlag = false;
    },
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
  created: async function() {
    this.$store.dispatch('loadListTypeList');
    var params={};
    this.templateList = await commonAjax.req("/ssa/alarm_config/getTemplateList.do", params, this);
  }
}
</script>
