<template>
  <div class="whitebackground Whitespace" style="background-color: #fff; padding-bottom: 120px;">
    <div class="top-title"></div>
    <div :class="['ordinary-search', 'clearfloat']">

      <el-form :inline="true" :model="queryForm" ref="queryForm">
        <el-form-item label="">
          <el-select v-model="queryForm.alarm_type" clearable  placeholder="告警类型">
            <el-option v-for="item in alarmTypeList" :label="item.text" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="">
          <el-cascader :options="alarmTypeOption" style="width:200px" clearable  placeholder="选择类型" :props="cascaderConfig" v-model="queryForm.alarm_typeArr" > </el-cascader>
        </el-form-item> -->
        <el-form-item label="">
          <el-select v-model="queryForm.alarm_level" clearable  placeholder="告警级别">
            <el-option v-for="item in alarmGradeList" :label="item.text" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="" >
          <el-input  v-model="queryForm.alarm_name" placeholder="告警名称"></el-input>
        </el-form-item>
        <el-form-item label="" >
          <el-input  v-model="queryForm.alarm_desc" placeholder="告警描述"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryData">查询</el-button>
        </el-form-item>
      </el-form>
      </div>
      <div class="top-title-1 float-l">告警处置库</div>
    <div class="float-r button-toolbar" style="margin-right:20px;margin-bottom:5px;">
      <el-button size="small" @click="addRow" type="primary"><i class="icon-add m-r-8"></i>新增</el-button>
      <el-button type="primary" size="small" @click="HandleImport"><i class="icon-import m-r-8"></i>导入</el-button>
      <el-button type="primary" size="small" @click="delCheckedRows"><i class="icon-delet m-r-8"></i>删除</el-button>
    </div>
      <div>
        <alarmRepositoryTable :id="interfaceId"></alarmRepositoryTable>
      </div>
      <el-dialog title="导入"  :visible.sync="importDialogVisible" width="30%">
        <span>请先下载Excel模板，并填写完整后，在选择上传</span><br>
        <a href="/static/template/alarmRepository.xlsx" class="dialog-downloadtext font-color">告警处置库模版</a>
        <el-upload ref="upload" action="/ssa/alarmRepository/importExcel.do" :on-success="handleSuccess" :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
          <div slot="tip" class="el-upload__tip">只能上传xls/xlsx文件</div>
        </el-upload>
        <span slot="footer" class="dialog-footer">
        <el-button style="margin-left: 10px;" type="primary"  @click="submitUpload">导入</el-button>
        <el-button @click="importDialogVisible = false">取消</el-button>
      </span>
      </el-dialog>
  </div>

</template>

<script>
import commonAjax from 'components/js/common.js'
import {
  mapState
} from 'vuex'
import alarmRepositoryTable from './AlarmRepositoryTable.vue'
export default {
  components: {
    alarmRepositoryTable
  },
  data() {
    return {
      cascaderConfig: {
        label: 'name',
        value: 'id',
        children: 'children'
      },
      //自定义属性
      interfaceId: "interfaceId",
      queryForm: {
        alarm_type: null,
        alarm_typeArr:[],
        alarm_name:'',
        alarm_desc:'',
        alarm_level: null
      },

      delSelected: "/ssa/alarmRepository/deleteCheckedRows.do",
      importDialogVisible:false
    }
  },
  computed: {
    ...mapState({
      alarmTypeList:state=>state.context.alarmTypeList,
      alarmGradeList:state=>state.context.alarmGradeList,
      userList:state=>state.context.userList,
      alarmTypeOption:state=>state.context.alarmTypeTreeOption
    })
  },
  methods: {
    HandleImport() {
      this.importDialogVisible = true;
    },
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleSuccess(response, file, fileList) {
      this.importDialogVisible = false;
      console.log(response);
      //alert(response.data);
      if (!response.state) {
        this.$alert(response.message, "消息");
        this.$refs.upload.clearFiles();
      } else {
        this.$message({
          message: response.data,
          type: 'success'
        });
        this.$refs.upload.clearFiles();
        this.$store.dispatch('reloadTable', this.interfaceId);
      }
    },
    queryData() {
      // this.queryForm.alarm_type = this.queryForm.alarm_typeArr[this.queryForm.alarm_typeArr.length-1]
      var tableId = this.interfaceId;
      var params = this.queryForm;
      this.$store.commit('setParams', [tableId, params]);
      this.$store.dispatch('reloadTable', tableId);
    },
    addRow() {
      var params = {};
      params.handle = "add";
      this.$router.push({name:"alarmRepositoryForm",params:params})

    },
    delCheckedRows() {
      var tableId = this.interfaceId;
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
          data_ids.push(row.id);
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
    // this.alarmTypeOption =  await this.commonAjax.req("/ssa/alarmMonitor/getAlarmTypeChildRen.do", null, this);
    // var params={};
    // this.templateList = await commonAjax.req("/ssa/alarm_template/getTemplateList.do", params, this);
  }
}
</script>
<style>
.top-title-1 {
    padding-left: 20px;
    margin-bottom: 20px;
    /* margin-top: 10px; */
    /* border-bottom: 1px solid #e1e3e4; */
    font-size: 16px;
    /* line-height: 40px; */
    color: #000;
    font-weight: 500;
}
</style>
