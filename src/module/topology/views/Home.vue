<template>
   <div class="container">
     <div class="toolbar">
       <el-button type="primary" @click="newDialog=true">新建</el-button>
     </div>
     <el-table :data="tableData" stripe border style="width: 100%">
      <el-table-column width="80px" prop="id" label="序号"></el-table-column>
      <el-table-column width="200px" prop="name" label="名称"></el-table-column>
      <el-table-column prop="json" show-overflow-tooltip label="json数据"></el-table-column>
      <el-table-column label="操作" width="480px">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleIcon(scope.row)">上传图标</el-button>
          <el-button size="mini" @click="handleManager(scope.row, 'image')">图标</el-button>
          <el-button size="mini" @click="handleManager(scope.row, 'edit')">编辑</el-button>
          <el-button size="mini" @click="handleManager(scope.row, 'servicer')">主机管理</el-button>
          <!-- <el-button size="mini" @click="handleManager(scope.row, 'node')">节点</el-button>
          <el-button size="mini" @click="handleManager(scope.row, 'group')">组</el-button>
          <el-button size="mini" @click="handleManager(scope.row, 'link')">连线</el-button>
          <el-button size="mini" @click="handleManager(scope.row, 'preview')">预览</el-button> -->
          <el-button size="mini" @click="handleManager(scope.row, 'jsonPreview')">编辑图预览</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog title="图片上传" :visible.sync="iconDialog" width="400px">
      <el-upload
        class="upload-demo"
        drag
        action="/ssa/topology/image/add.do"
        :data="iconData"
        name="images"
        accept="image/*"
        :file-list="fileList"
        :auto-upload="true"
        multiple>
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__tip" slot="tip">上传图标文件（格式png或svg），支持多张上传，文件名相同会覆盖</div>
      </el-upload>
    </el-dialog>
    <el-dialog title="新建拓扑图" :visible.sync="newDialog">
      <el-form>
        <el-form-item label="名称" label-width="100">
          <el-input :maxlength="20" v-model="name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="JSON" label-width="100">
          <el-input type="textarea" v-model="json" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="createTolopogy">确 定</el-button>
      </div>
    </el-dialog>
   </div>
</template>

<script>

import axios from 'axios';

export default {
  name: 'home',
  created () {
    this.getList();
  },
  data() {
    return {
      iconDialog: false,
      iconData: {id: 0},
      newDialog: false,
      name: '',
      json: '',
      fileList: [],
      tableData: []
    }
  },
  methods: {
    handleManager(data, type) {
      this.$router.push(`/${type}?id=${data.id}`)
    },
    handleDelete (data) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
        center: true
      }).then(() => {
        axios.get('/ssa/topology/del.do?topologyId='+data.id).then(() => {
          this.getList();
          this.$message({ type: 'success', message: '删除成功!' });
        })
      })
    },
    handleIcon(data) {
      this.iconData.id = data.id;
      this.fileList = [];
      this.iconDialog = true;
    },
    createTolopogy () {
      if (this.name) {
        axios.post('/ssa/topology/add.do', {name: this.name, json: this.json}).then((result) => {
          this.newDialog = false;
          this.name = '';
          this.json = '';
          this.getList();
        })
      } else {
        this.$alert('请输入拓扑名称！');
      }
    },
    async getList() {
      let result =  await axios.get('/ssa/topology/list.do?pageIndex=1&pageSize=10&t='+Date.now());
      this.tableData = result.data.data.rowData;
    }
  }
}
</script>

<style scoped>
.container {
  padding: 10px;
}
.container .toolbar {
  padding: 5px 0;
}
.container .el-button+.el-button {
  margin: 0
}
</style>

<style>
.el-button {
  border-radius: 0;
}
</style>



