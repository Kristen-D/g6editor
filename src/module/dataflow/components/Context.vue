<template>
  <container :page="page">
    <template slot="toolbar">
      <el-button type="primary" @click="createContext">创建Context</el-button>
    </template>
    <template slot="table">
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column show-overflow-tooltip prop="params" label="参数"></el-table-column>
      <el-table-column prop="time" label="创建时间"></el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="props">
          {{props.row.status ? '运行中' : '未启动'}}
        </template>
      </el-table-column>
      <el-table-column>
        <template slot-scope="props">
          <el-button type="primary" @click="changeStatus(props.row)">
            {{props.row.status ? '关闭' : '启动'}}
          </el-button>
          <el-button type="danger" @click="deleteContext(props.row)">删除</el-button>
        </template>
      </el-table-column>
    </template>
    <el-dialog
      title="创建Context"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form :model="form" label-width="80px">
        <el-form-item label="名称:">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="参数:">
          <el-input v-model="form.params"></el-input>
        </el-form-item>
        <el-form-item label="过期时间:">
          <el-input v-model="form.expired"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogOk">确 定</el-button>
      </span>
    </el-dialog>
  </container>
</template>

<script>
import Container from './Container';
import axios from 'axios';
import { dateFmt } from '../common/Util';

export default {
  components: { Container },
  data () {
    return {
      page: {
        data: [],
        pageIndex: 1,
        total: 10
      },
      dialogVisible: false,
      form: {
        expired: -1,
        params: null,
        name: '',
        status: 0
      }
    }
  },
  created () {
    this.getList();
  },
  methods: {
    createContext () {
      this.dialogVisible = true
    },
    async dialogOk () {
      if (!this.form.name) {
        this.$message({
          message: '名称是必须填写的哦！',
          type: 'warning'
        });
        return ;
      }
      let response = await axios.post('/ssa/flow/context.do', this.form);
      if (!response.data.state) {
        this.$message({
          message: response.data.message,
          type: 'warning'
        });
        return ;
      }
      this.form = { expired: -1, state: 0, name: '', params: null };
      this.dialogVisible = false
      this.getList();
    },
    async changeStatus (item) {
      await axios.get('/ssa/flow/context/update.do', {
        params: {name: item.name, status: item.status ? 0 : 1}
      })
      item.status = !item.status
    },
    async deleteContext(item) {
      let response = await axios.get('/ssa/flow/context/delete.do', { params: { name: item.name }});
      this.getList();
    },
    async getList () {
      let response = await axios.get('/ssa/flow/contexts.do', {
        params: {
          pageIndex: this.page.pageIndex
        }
      });
      this.page.total = response.data.data.total;
      this.page.data = response.data.data.rowData.map(v => {
        v.time = dateFmt(v.time, 'MM-dd hh:mm:ss');
        return v;
      });
    }
  }
}
</script>
