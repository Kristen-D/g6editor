<template>
  <div class="container-fluid">
    <div class="el-panel  el-button--purple">
      <el-tabs class="headertab" v-model="activeName">
        <el-tab-pane v-for="item in listTypeList" :label='item.text' :name="item.text">

          <div>
            <whiteEditTable :id="item.text"></whiteEditTable>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
import commonAjax from 'components/js/common.js'
import {
  mapState
} from 'vuex'
import whiteEditTable from './WhiteEditTable.vue'
export default {
  components: {
    whiteEditTable
  },
  data() {
    return {
      //自定义属性
      activeName: "IP",
      accept_type: "xlsx/xls",
      fileList: [],
      formatError: false,
      errorList: [],
    }
  },
  computed: {
    ...mapState({
      listTypeList: state => state.context.listTypeList,
      menuName: state => state.context.menuName,
    })
  },
  methods: {
    downloadTemplate() {
      var fileUrl = "/static/template/BlackWhiteListBatchImport.xlsx";
      window.location.href = fileUrl;
    },
    handleBeforeUpload(file) {
      // alert(file.name);
      var filename = file.name.substr(file.name.lastIndexOf(".")).toLowerCase();
      //  alert(nameExt);
      if (filename != ".xlsx") {
        this.$message({
          type: 'error',
          message: "只允许上传与模版相同的xlsx格式的表格文件！"
        });
        this.fileList = [];
        return false;
      } else {
        return true;
      }

    },
    handleSuccessOnBlack(response, file, fileList) {
      let rs = response.data;
      if (response.state) {

        this.$message({
          type: 'success',
          message: rs
        });
        this.$store.dispatch('reloadTable', this.blackId);


      } else {
        this.$message({
          type: 'error',
          message: rs
        });
      }

      this.fileList = [];
    },
    handleSuccessOnWhite(response, file, fileList) {
      if (response.state) {
        this.$message({
          type: 'success',
          message: response.data
        });
        this.$store.dispatch('reloadTable', this.whiteId);
      } else {
        this.$message({
          type: 'error',
          message: response.data
        });
      }
      this.fileList = [];
    },
    //methods end
  },
  created: function() {
    this.$store.dispatch('loadListTypeList')
    
    
  }
}

</script>
