<template>
  <div>
    <div class="block" style="display: inline-block; margin-left:14px; ">
      <el-date-picker
        v-model="searchDate"
        type="month"
        style="width:255px;"
        placeholder="选择月份">
      </el-date-picker>

      <span class="demonstration" style="margin-left: 80px;">
        <el-button type="primary" @click="searchByDate">查询</el-button>
      </span>
    </div>
    <!-- <div style="margin-right: 20px;" class="float-r">
      <el-button type="primary" @click="showExportDialog"><i class="icon-export m-r-8"></i>导出</el-button>
    </div> -->

    <iframe :src="iframeUrl" width="100%" height="700" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes"></iframe>

    <el-dialog title="导出" :visible.sync="exportDialogShow" width="30%" class="dialog-panel">
    <div class="dialog-import-content">
       <label>请选择要导出的模板类型：</label>
         <el-radio-group v-model="radioValue" class="dialog-templet">
            <el-radio class="radio" :label="1">Word模板.doc</el-radio>
            <el-radio class="radio" :label="2">Excel模板.xsls</el-radio>
            <el-radio class="radio" :label="3">Pdf模板.pdf</el-radio>
          </el-radio-group>
       <div class="dialog-button-location">
          <el-button type="primary" class="dialog-button-padding" @click="exportReport">导出</el-button>
          <el-button type="gray" class="dialog-button-padding" @click="cancelExport">取消</el-button>
       </div>
      </div>
    </el-dialog>

    <!-- <el-dialog title="导出" :visible.sync="exportDialogShow" width="30%">
      <div class="dialog-content">
        <span>请选择导出模板：</span>
        <el-radio-group v-model="radioValue">
          <el-radio :label="1">Word报表.docx</el-radio>
          <el-radio :label="2">Excel报表.xlsx</el-radio>
          <el-radio :label="3">Pdf报表.pdf</el-radio>
        </el-radio-group>

        <el-button type="primary" class="button-p-3" slot="trigger" @click="exportReport">导出</el-button>
        <el-button class="button-p-3" slot="trigger" @click="cancelExport">取消</el-button>
      </div>
    </el-dialog> -->

  </div>
</template>

<script>
  export default {
    components: {},

    props: ['reportUrl', 'id'],
    watch: {
      reportUrl: function() {
        this.iframeUrl = this.reportUrl;
      }
    },

    data() {
      return {
        searchDate: new Date(),
        radioValue: 2,
        exportDialogShow: false,
        iframeUrl: this.reportUrl,
        templateId: this.id
      }
    },

    methods: {
      searchByDate() {
        var strSearchDate = this.common.formatDate(this.searchDate, "yyyy-MM");
        this.iframeUrl = this.reportUrl + "?dateStr=" + strSearchDate;
      },

      refresh() {
        this.iframeUrl = this.reportUrl;
        this.searchDate = new Date();
      },

      showExportDialog() {
        this.exportDialogShow = true;
      },
      cancelExport() {
        this.exportDialogShow = false;
      },
      async exportReport() {
        var countDate = this.common.formatDate(this.searchDate, "yyyy-MM");
        var typeOfReport = "excel";
        if (this.radioValue == 1) {
          typeOfReport = "word";
        } else if (this.radioValue == 2) {
          typeOfReport = "excel";
        } else if (this.radioValue == 3) {
          typeOfReport = "pdf";
        }
        //alert("/ssa/report/exportReport.do?"+"templateId="+this.id+"&reportType="+typeOfReport+"&date="+countDate);
        window.location.href = "/ssa/report/exportReport.do?"+"templateId="+this.templateId+"&reportType="+typeOfReport+"&date="+countDate;
        this.exportDialogShow = false;
      }
    }
  }
</script>
