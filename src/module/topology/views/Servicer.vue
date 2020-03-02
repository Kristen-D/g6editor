<template>
  <div>
    <el-button type="primary" @click="addNode">增加主机源</el-button>
    <custom-table
      :page="page"
      @currentChange="currentChange"
      size="small"
      @sizeChange="sizeChange">
      <el-table-column width="80px" prop="id" label="序号"></el-table-column>
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="image" label="图标"></el-table-column>
      <el-table-column prop="domain" label="域名称"></el-table-column>
      <el-table-column prop="root" label="父资产ID"></el-table-column>
      <el-table-column prop="x" label="x坐标"></el-table-column>
      <el-table-column prop="y" label="y坐标"></el-table-column>
      <el-table-column label="操作" width="150px">
        <template slot-scope="scope">
          <el-button size="small" @click="handleManager(scope.row, 'edit')">编辑</el-button>
          <el-button size="small" type="danger" @click="handleManager(scope.row, 'delete')">删除</el-button>
        </template>
      </el-table-column>
    </custom-table>
    <el-dialog
      title="主机源"
      :visible.sync="nodeDialog"
      width="500px">
      <el-form label-width="80px">
        <el-form-item required label="主机源">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="图标名称">
          <el-select v-model="form.image" placeholder="请选择图标">
            <el-option 
              v-for="(image, i) in images" 
              :key="i" 
              :label="image.name" 
              :value="image.name">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="x坐标">
          <el-input type="number" v-model="form.x"></el-input>
        </el-form-item>
        <el-form-item label="y坐标">
          <el-input type="number" v-model="form.y"></el-input>
        </el-form-item>
        <el-form-item required label="父资产ID">
          <el-input type="text" v-model="form.root"></el-input>
        </el-form-item>
        <el-form-item required label="域名称">
          <el-input type="text" v-model="form.domain"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="nodeDialog = false">取 消</el-button>
        <el-button type="primary" @click="nodeDialogSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import CustomTable from '../components/CustomTable';
import axios from 'axios';

export default {
  name: 'group',
  components: {CustomTable},
  data() {
    return {
      page: {
        pageIndex: 1, pageSize: 10, data: [], total: 0
      },
      nodeDialog: false,
      form: {
        name: '', image: '', x: 0, y: 0, root: '', id: null, domain: ''
      },
      images: []
    }
  },
  created() {
    this.getList();
    axios.get('/ssa/topology/image/list.do', {params: {topologyId: this.$route.query.id}})
    .then((result) => {
      this.images = result.data.data;
    })
  },
  methods: {
    sizeChange (value) {
      this.page.pageSize = value;
      this.getList();
    },
    currentChange(value) {
      this.page.pageIndex = value;
      this.getList();
    },
    async getList() {
      let result = await axios.get('/ssa/topology/servicer/list.do', {
        params: {
          topologyId: this.$route.query.id, 
          pageIndex: this.page.pageIndex,
          pageSize: this.page.pageSize,
          t: Date.now()
        }
      });
      this.page.data = result.data.data.rowData;
      this.page.total = result.data.data.total;
    },
    addNode() {
      this.form = {name: '', image: '', x: 0, y: 0, root: '', id: null, domain: ''};
      this.nodeDialog = true;
    },
    handleManager(data, type) {
      if (type === 'delete') {
        this.$confirm('此操作将永久删除该数据源, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get('/ssa/topology/servicer/del.do', {params: {id: data.id}}).then(() => {
            this.getList();
          })
        })
      } else if (type === 'edit') {
        this.form = {...data};
        this.nodeDialog = true;
      }
    },
    nodeDialogSubmit() {
      if (this.form.name && this.form.root && this.form.domain) {
        if (this.form.id) {
          axios.post('/ssa/topology/servicer/update.do', this.form).then(() => {
            this.getList();
            this.nodeDialog = false;
          })
        } else {
          this.form.topologyId = this.$route.query.id;
          axios.post('/ssa/topology/servicer/info.do', this.form).then(() => {
            this.getList();
            this.nodeDialog = false;
          })
        }
      } else {
        this.$alert('请将字段填写完整');
      }
    }
  }
}
</script>

