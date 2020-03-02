<template>
  <div>
    <el-button type="primary" @click="addNode">增加线</el-button>
    <custom-table
      :page="page"
      @currentChange="currentChange"
      @sizeChange="sizeChange">
      <el-table-column width="80px" prop="id" label="序号"></el-table-column>
      <el-table-column prop="type" label="类型"></el-table-column>
      <el-table-column prop="style" label="样式"></el-table-column>
      <el-table-column prop="origin" label="from"></el-table-column>
      <el-table-column prop="target" label="to"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button @click="handleManager(scope.row, 'edit')">编辑</el-button>
          <el-button type="danger" @click="handleManager(scope.row, 'delete')">删除</el-button>
        </template>
      </el-table-column>
    </custom-table>
    <el-dialog
      title="节点"
      :visible.sync="nodeDialog"
      width="300px">
      <el-form label-width="80px">
        <el-form-item label="origin">
          <el-input type="number" v-model="form.origin"></el-input>
        </el-form-item>
        <el-form-item label="target">
          <el-input type="number" v-model="form.target"></el-input>
        </el-form-item>
        <el-form-item label="样式">
          <el-input v-model="form.style"></el-input>
        </el-form-item>
        <el-form-item label="类型">
          <el-input v-model="form.type"></el-input>
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
  name: 'link',
  components: {CustomTable},
  data() {
    return {
      page: {
        pageIndex: 1, pageSize: 10, data: [], total: 0
      },
      nodeDialog: false,
      form: {
        name: '', origin: '', target: '', type: '', style: '', id: null
      },
    }
  },
  created() {
    this.getList();
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
      let result = await axios.get('/ssa/topology/link/list.do', {
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
      this.form = {name: '', origin: '', target: '', type: '', style: '', id: null};
      this.nodeDialog = true;
    },
    handleManager(data, type) {
      if (type === 'delete') {
        this.$confirm('此操作将永久删除该节点, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          axios.get('/ssa/topology/link/del.do', {params: {id: data.id}}).then(() => {
            this.getList();
          })
        })
      } else if (type === 'edit') {
        this.form = {...data};
        this.nodeDialog = true;
      }
    },
    nodeDialogSubmit() {
      if (this.form.id) {
        axios.post('/ssa/topology/link/update.do', this.form).then(() => {
          this.getList();
          this.nodeDialog = false;
        })
      } else {
        this.form.topologyId = this.$route.query.id;
        axios.post('/ssa/topology/link/info.do', this.form).then(() => {
          this.getList();
          this.nodeDialog = false;
        })
      }
    }
  }
}
</script>


