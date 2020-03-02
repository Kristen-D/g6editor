<template>
<div class="whitebackground Whitespace kbase">
  <div class="top-title">安全知识库</div>

  <div style="width:70%;">
    <el-input style="width:60%;margin-left:20px;" placeholder="请输入内容" v-model="repositoryForm.qryTitle"></el-input>
    <el-button @click="queryRepository" type="primary"> 查询</el-button>
    <el-button class="float-r" @click="addRepository" type="text"><i class="ion-navigate m-r-8"></i>新增知识库</el-button>
  </div>
  <div class="kbase-content" style="width:70%;">
    <div class="kbase-content-panel" v-for="(data,index) in tableData">
      <div class="kbase-content-heading">
        <h4 class="kbase-content-title" style="cursor:pointer;" @click="showDetail(index,$event,data)">{{data.title}} </h4>

        <el-tag v-if="marks !=''" :type="tagsColor[index % 5]" v-for="(marks,index) in data.showMarks" style="margin-left:5px;">
          {{marks}}
        </el-tag>
        <span class="kbase-delete" @click="deleteRepository(data.repo_id)"><i class="el-icon-delete2 m-r-8" ></i>删除</span>
      </div>
      <div class="kbase-content-body">
        <a v-if="data.existFile" class="search-link" @click="downloadFile(data.repo_id)">点击下载文件 {{data.filename}}</a>
        <p v-show="data.isVisiable">
          {{data.showContent}}
        </p>
        <el-collapse-transition>
          <div class="kbase-detail-content" style="white-space:pre-wrap;" v-show="!data.isVisiable">{{data.content}}</div>
        </el-collapse-transition>
      </div>
    </div>

    <el-pagination class="float-r page-location2" @current-change="handleCurrentChange" :page-size="defConf.pageSize" :current-page="defConf.pageIndex" layout="total, prev, pager, next" :total="defConf.total">
    </el-pagination>
  </div>


  <!--模态框 -->
  <el-dialog title="新增知识库" :visible.sync="dialogVisible" width="30%" class="dialog-panel" @close="dialogClose">
    <el-form ref="repositoryForm" :model="repositoryForm" :rules="rules">

      <el-form-item prop="title" required>
        <el-input placeholder="请输入标题" v-model="repositoryForm.title"></el-input>
      </el-form-item>

      <el-form-item>
        <el-input style="width:100px;" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="mini" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm">
        </el-input>
        <el-button v-else type="text" @click="showInput"><i class="dialog-addbase-icon"></i>添加标签</el-button>

        <el-tag style="margin-left:5px;" :key="tag" v-for="tag in repositoryForm.tags" :closable="true" type="primary" :close-transition="false" @close="handleClose(tag)">
          {{tag}}
        </el-tag>
      </el-form-item>

      <el-form-item prop="content" required>
        <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model="repositoryForm.content">
        </el-input>
      </el-form-item>

      <el-form-item>
        <el-upload class="upload-demo" ref="upload" action="/ssa/infoCenter_repository/uploadFile.do" :data="repositoryForm" :on-success="handleSuccess" :multiple="false" :auto-upload="false">
          <el-button slot="trigger" size="small" type="primary">上传附件(可选)</el-button>
        </el-upload>
      </el-form-item>
    </el-form>

    <el-button class="dialog-button-location2" style="padding:10px 40px;" type="primary" @click="saveRepository">发布</el-button>

  </el-dialog>



</div>
</template>
<script>
import {
  mapState
} from 'vuex'
export default {
  data() {
    return {
      isDetail: false,
      detailContent: "",
      dialogVisible: false,
      detailTitle: "",
      tagsColor: ["primary", "success", "warning", "danger"],
      inputVisible: false,
      inputValue: "",
      rules: {
        title: [{
            required: true,
            message: '请填写知识标题！',
            trigger: 'blur'
          },
          {
            min: 2,
            max: 30,
            message: '长度在 2 到 30 个字符',
            trigger: 'blur'
          }
        ],
        content: [{
          required: true,
          message: '请填写知识内容！',
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    ...mapState({
      repositoryForm: state => state.context.repositoryForm,
      defConf: state => state.context.defConf,
      tableData: state => state.context.tableData

    })
  },
  methods: {
    dialogClose() {
      this.$refs['repositoryForm'].resetFields();
    },
    deleteRepository: async function(repo_id) {

      this.$confirm('此操作将删除这条数据, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        var result = await this.$store.dispatch("deleteRepository", [this, repo_id]);
        this.$message({
          message: result,
          type: 'success'
        });
        this.$store.dispatch("getRepository", [this]);
      })

    },
    //处理翻页时候的事件
    handleCurrentChange(pageIndex) {
      this.$store.dispatch('handleCurrentChange', [this, pageIndex]);
    },
    showDetail(i, e, data) {
      if (data.showContent.length < 100) {
        return;
      }
      this.$store.commit('showDetail', i);

    },
    handleClose(tag) {
      this.repositoryForm.tags.splice(this.repositoryForm.tags.indexOf(tag), 1);
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.repositoryForm.tags.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    queryRepository() {
      this.$store.dispatch("getRepository", [this]);
    },
    saveRepository: function() {
      // if (this.repositoryForm.title == "") {
      //   this.$alert("请填写知识标题", "警告", {
      //     confirmButtonText: "确定",
      //     type: "warning"
      //   });
      //   return;
      // }
      // var result;
      this.$refs['repositoryForm'].validate(async(valid) => {
        if (valid) {
          //没有上传附件时调用普通请求传递参数
          if (this.$refs["upload"].uploadFiles.length == 0) {
            let result = await this.$store.dispatch("saveRepository", [this]);
            if (result.state) {
              this.$message({
                type: 'success',
                message: result.data
              });
              this.$store.commit("resetForm");
              this.dialogVisible = false;
              this.$store.dispatch("getRepository", [this]);
            } else {
              this.$message({
                type: 'error',
                message: result.data
              });
            }

          } else {
            //有附件上传时使用upload组件传递参数和文件
            this.$store.state.context.repositoryForm.marks = this.$store.state.context.repositoryForm.tags.join(",");
            this.$refs["upload"].submit();
          }
        }

      });



    },
    //上传文件后
    handleSuccess(response) {
      if (response.state) {
        this.$message({
          type: 'success',
          message: response.data
        });
        this.$store.commit("resetForm");
        this.$refs["upload"].clearFiles();
        this.$store.dispatch("getRepository", [this]);
        this.dialogVisible = false;
      } else {
        this.$message({
          type: 'error',
          message: response.data
        });
      }

    },
    downloadFile(repo_id) {
      var url = "/ssa/infoCenter_repository/downloadFile.do?repo_id=" + repo_id;
      window.location.href = url;

    },
    addRepository() {
      this.dialogVisible = true;
    }
  },
  created: function() {
    this.$store.dispatch("getRepository", [this]);
  }
}
</script>


<style>
.el-tag {
  border-radius: 0px;
}

.slide-fade-enter-active {
  animation: bounce-in 0.2s;
}

.slide-fade-leave-active {
  animation: bounce-out 0.2s;
}

@keyframes bounce-in {
  0% {
    height: 0px;
  }
  50% {
    height: 30px;
  }
  100% {
    height: 60px;
  }
}

@keyframes bounce-out {
  0% {
    opacity: 0.2;
    height: 60px;
  }
  50% {
    opacity: 0.1;
    height: 30px;
  }
  100% {
    opacity: 0;
    height: 0px;
  }
}

.search-link {
  color: #006621;
  font-size: 13px;
}
</style>
