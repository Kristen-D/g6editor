<template>
<div class="container_content">

  <el-dialog title="已上传文件" :visible.sync="dialogVisible" width="30%"  @close="closeDialog()">
    <div v-for="item in items" class="text item" style="margin-bottom:30px;">
      <info :ref="item.id" :processNum="item.processNum" :fileName="item.fileName" :errorMsg="item.errorMsg" :status="item.status"></info>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </span>
  </el-dialog>



  <el-row>
    <el-col :span="24">

      <div :class="['ordinary-search', 'clearfloat']" style="border-bottom: 1px solid #e1e3e4;margin-top: 10px;float:right">
        <el-button id="picker" size="small" type="primary">选取文件</el-button>
        <el-button id="ctlBtn" @click="showUploadFile()" size="small" type="primary">已上传文件</el-button>
        <el-button size="small" @click="deleteAttachment()" type="primary">删除文件</el-button>
      </div>
      <br/>
      <el-table :data="defConf.tableData" v-loading="defConf.loading" @selection-change="handleSelectionChange" style="width: 100%">

        <el-table-column type="selection" width="55">
        </el-table-column>
        <el-table-column prop="attachment_filename" label="文件名称">
        </el-table-column>
        <el-table-column prop="hash" label="文件hash" width="300">
        </el-table-column>
        <el-table-column prop="upload_time" label="上传时间" width="180">
        </el-table-column>

      </el-table>
      <el-pagination class="float-r page-location" @current-change="handleCurrentChange" :page-size="defConf.pageSize" :current-page="defConf.pageIndex" layout="total, prev, pager, next, jumper" :total="defConf.total">
      </el-pagination>
    </el-col>
  </el-row>
</div>
</template>
<script>
//
import info from "./Info"
export default {
  data() {
    return {
      id: "attachementTable",
      items: [],
      defConf: {},
      dialogVisible: false,
      multipleSelection: []


    }
  },
  components: {
    info
  },
  methods: {
    handleCurrentChange(pageIndex) {
      this.$store.dispatch('handleCurrentChange', [this.id, pageIndex]);
    },
    showUploadFile() {
      this.dialogVisible = true;
    },
    closeDialog(){
      this.$store.dispatch('reloadTable', this.id);
    },
    deleteAttachment(){


      var  rows = this.multipleSelection;

        if (rows.length ==0) {
          this.$alert("请选中删除数据!");
          return;
        }
        this.$confirm('此操作将删除选中条目，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          var ids = [];
          rows.forEach(row => {
            ids.push(row.id);
          });
          var msg = await this.utils.req("/ssa/processMgmt/deleteSelectedAttachment.do", {
            ids: ids
          }, this);
          this.$message({
            type: 'success',
            message: msg
          });
          this.$store.dispatch('reloadTable', this.id);
        })


    },
    handleSelectionChange(val){
      this.multipleSelection = val;
    }

  },
  mounted: function() {
    var $ = jQuery,
      $list = $('#thelist'),
      $btn = $('#ctlBtn'),
      state = 'pending',
      uploader;

    uploader = WebUploader.create({

      // swf文件路径
      swf: 'webuploader/Uploader.swf',
      // 文件接收服务端。
      server: '/ssa/processMgmt/uploadBigFile.do',
      // 不压缩image
      resize: false,
      auto: true,

      // 内部根据当前运行是创建，可能是input元素，也可能是flash.
      pick: '#picker',
      chunked: true,
      chunkSize: 1014 * 1024,
      threads: true,
      fileNumLimit: 3,
      fileSingleSizeLimit: 3000 * 1024 * 1024,
      duplicate: true

    });
    var vm = this;
    // 当有文件添加进来的时候
    uploader.on('fileQueued', function(file) {
      var data = {};
      data.id = file.id;
      data.fileName = file.name;
      data.status = "等待上传...";
      data.processNum = 0;
      vm.items.push(data);

    });

    // 文件上传过程中创建进度条实时显示。
    uploader.on('uploadProgress', function(file, percentage) {

      for (var item in vm.items) {
        if (vm.items[item].id == file.id) {
          vm.items[item].status = "上传中";
          vm.items[item].processNum = percentage * 100;
        }
      }
    });

    uploader.on('uploadSuccess', function(file, response) {
      for (var item in vm.items) {
        if (vm.items[item].id == file.id) {
          vm.items[item].status = "已上传";

        }
      }
    });

    uploader.on('uploadAccept', function(object, ret) {
      var file = object.file;
      if (ret.state == false) {
        for (var item in vm.items) {
          if (vm.items[item].id == file.id) {
            vm.items[item].status = "上传出错";
            vm.items[item].errorMsg = ret.message;
          }
        }
        uploader.cancelFile(file);
      }



    });

    uploader.on('uploadComplete', function(file) {
      uploader.removeFile(file, true);
    });
    uploader.on('fileQueued', function(file) {
      vm.dialogVisible = true;
    });


    uploader.on('all', function(type) {
      if (type === 'startUpload') {
        state = 'uploading';
      } else if (type === 'stopUpload') {
        state = 'paused';
      } else if (type === 'uploadFinished') {
        state = 'done';
      }

      // if (state === 'uploading') {
      //   $btn.text('暂停上传');
      // } else {
      //   $btn.text('已上传文件');
      // }
    });

    // $btn.on('click', function() {
    //   if (state === 'uploading') {
    //     uploader.stop();
    //   } else {
    //   //  uploader.upload();
    //     vm.dialogVisible =true;
    //   }
    // });

    $("div.webuploader-pick").removeClass("webuploader-pick");
  },
  created: function() {
    var defConf = {
      total: 0,
      loading: false,
      tableData: [],
      pageSize: 10,
      pageIndex: 1,
      //默认ajax属性
      tableUrl: "/ssa/processMgmt/getAttachmentList.do",
      params: {},
    };




    this.$store.commit('registerConf', [this.id, defConf]);
    this.defConf = this.$store.state.table[this.id];
    this.$store.dispatch('reloadTable', this.id);
  }

}
</script>
<style>
.info {
  display: inline-block;
  margin-left: 10px;
}
</style>
