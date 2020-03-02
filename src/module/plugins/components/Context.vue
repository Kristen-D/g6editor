<template>
<div class="whitebackground Whitespace">
  <div class="top-title">插件配置</div>
  <el-dialog title="上传插件" :visible.sync="uploadShow" width="30%" @close="onCloseUpload()" >
    <el-upload
      class="upload-demo"
      action="/ssa/plugins/pluginupload.do"
      name="pluginfile"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-upload="handleBeforeUpload"
      :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传war文件！</div>
    </el-upload>
  </el-dialog>
  <div style="margin-right: 20px; margin-top: 10px; height:42px;" class="float-r">
    <el-button type="primary" size="small" @click="uploadShow=true"><i class="icon-import m-r-8"></i>上传</el-button>
    <el-button type="primary" size="small" @click="delCheckedRows"><i class="icon-delet m-r-8"></i>删除</el-button>

  </div>
  <editTable :id="tableId"></editTable>
</div>

</template>

<script>
import editTable from './PluginEditTable.vue'

import { mapState } from 'vuex'
export default {
  components: { editTable},
  data() {
    return {
      uploadShow:false,
        fileList: [],
        columnList:[],
        tableId:"pluginTable",
      };
  },
  computed: {
    ...mapState({
    //  menuName: state => state.context.menuName,
    })
  },
  created: async function() {

  },
  methods: {
    handleBeforeUpload(file) {
      if(!file.name.endsWith('.war')) {
        this.$message({
          message: '文件格式错误，请重新选择！',
          type: 'warning'
        });
        return false;
      }
    },
    onCloseUpload(){
       this.$store.dispatch('reloadTable', this.tableId);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    async delCheckedRows(){
      var rows = this.$store.state.editTable[this.tableId].multipleSelection;

      if(rows.length<=0){
        this.$alert("请先选中插件");
        return;
      }

      this.$confirm('此操作将删除选中插件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() =>
      {
              var user_ids = [];
              // rows.forEach(row=>{
              //   user_ids.push(row.plugin_id+"-"+row.system_id);
              // })
             var ids = JSON.stringify(rows);
             var msg = await   this.common.req("/ssa/plugins/deletePlugins.do",{rows:ids});
             await this.$store.dispatch('reloadTable',this.tableId);
             this.$message({   type: 'success',     message: msg   });
      })
    },

  },

}
</script>
