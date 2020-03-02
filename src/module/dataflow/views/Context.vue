<template>
  <container :page="page" @currentChange="pageChange" v-loading="page.loading">
    <template slot="toolbar">
      <!-- <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>运行任务</el-breadcrumb-item>
      </el-breadcrumb> -->
      <el-button type="primary" size="mini" style="margin-top: 10px;" @click="createContext">创建</el-button>
    </template>
    <template slot="table">
      <!-- <el-table-column type="expand">
        <template slot-scope="props">
          <div>Params:{{props.row.params}}</div>
        </template>
      </el-table-column> -->
      <el-table-column prop="contextName" label="名称"></el-table-column>
      <el-table-column show-overflow-tooltip prop="params" label="参数"></el-table-column>
      <el-table-column show-overflow-tooltip prop="expiredTime" label="过期时间"></el-table-column>
      <!-- <el-table-column prop="time" label="创建时间"></el-table-column> -->
      <el-table-column prop="status" label="状态">
        <template slot-scope="props">
          {{props.row.status ? '运行中' : '已停止'}}
        </template>
      </el-table-column>
      <el-table-column width="250">
        <template slot-scope="props">
          <el-button v-if="props.row.status" type="primary" @click="changeStatus(props.row)">
            <!-- {{props.row.status ? '关闭' : '启动'}} -->
            关闭
          </el-button>
          <!-- <el-button type="primary" @click="updateContext(props.row)">修改</el-button>
          <el-button type="danger" @click="deleteContext(props.row)">删除</el-button> -->
        </template>
      </el-table-column>
    </template>
    <el-dialog
      :title="dialog.state == 'create' ? '创建' : '修改'"
      :visible.sync="dialog.visible"
      width="40%">
      <el-form :model="form" label-width="150px">
        <el-form-item label="名称:">
          <el-input :readonly="dialog.state == 'create' ? false : true" v-model="form.contextName"></el-input>
        </el-form-item>
        <!-- <el-form-item v-for="(item, i) in form.params" :label="item.key" :key="i">
          <el-input v-model="item.value"></el-input>
        </el-form-item> -->
        <el-form-item v-for="(value, key) in form.params" :label="key" :key="key">
          <el-input v-model="form.params[key]"></el-input>
        </el-form-item>
        <el-form-item label="过期时间:">
          <el-input v-model="form.expiredTime"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialog.visible = false">取 消</el-button>
        <el-button type="primary" @click="dialogOk">确 定</el-button>
      </span>
    </el-dialog>
  </container>
</template>

<script>
import Container from '../components/Container';
import axios from 'axios';
import { dateFmt } from '../common/Util';
import Api from '../common/Api';

// const defaultProps = [
//     {key: 'context-factory', value: 'spark.jobserver.context.JavaSessionContextFactory'},
//     {key: 'spark.executor.cores', value: 4},
//     {key: 'spark.executor.memory', value: '4G'},
//     {key: 'spark.serializer', value: 'org.apache.spark.serializer.JavaSerializer'}
//   ];
const defaultProps = {
  'context-factory': 'spark.jobserver.context.JavaSessionContextFactory',
  'spark.executor.cores': 4,
  'spark.executor.memory': '4G',
  'spark.serializer': 'org.apache.spark.serializer.JavaSerializer'
}

export default {
  components: { Container },
  data () {
    return {
      page: {
        data: [],
        pageIndex: 1,
        total: 10,
        loading: false
      },
      dialog: {
        visible: false,
        state: 'create',
      },
      form: {
        expiredTime: -1,
        params: defaultProps,
        contextName: '',
        status: 0
      }
    }
  },
  created () {
    this.getList();
  },
  methods: {
    createContext () {
      this.form = {
        expiredTime: -1, params: defaultProps, contextName: '', status: 0
      }
      this.dialog = {
        state: 'create', visible: true
      }
    },
    async dialogOk () {
      if (!this.form.contextName) {
        this.$message({ message: '名称是必须填写的哦！', type: 'warning' });
        return ;
      }
      let response;
      let data = {
        contextName: this.form.contextName,
        expiredTime: this.form.expiredTime,
        status: this.form.status,
        params: JSON.stringify(this.form.params)
      }
      if (this.dialog.state === 'create') {
        response = await axios.post(Api.createContext, data);
      } else {
        response = await axios.post(Api.updateContext, data);
      }
      if (!response.data.state) {
        this.$message({ message: response.data.message, type: 'warning' });
        return ;
      }
      this.dialog.visible = false;
      // this.form = { expiredTime: -1, status: 0, contextName: '', params: defaultProps };
      this.getList();
    },
    async changeStatus (item) { 
      let status = 0;
      this.page.loading = true;
      try {
        await axios.post(Api.commandContext, 
          {contextName: item.contextName, status: status, params: item.params}
        )
        this.getList();
        this.$message({ message:  '关闭成功！', type: 'info' });
      } catch (e) {
        this.$message({ message: '关闭失败！', type: 'danger' });
      } finally {
        this.page.loading = false
      }
    },
    async updateContext(item) {
      this.form = {
        expiredTime: item.expiredTime,
        status: item.status,
        contextName: item.contextName
      };
      let params = JSON.parse(item.params);
      this.form.params = {
        'context-factory': params['context-factory'],
        'spark.executor.cores': params['spark.executor.cores'],
        'spark.executor.memory': params['spark.executor.memory'],
        'spark.serializer': params['spark.serializer']
      }
      this.dialog = { state: 'update', visible: true }
    },
    async deleteContext(item) {
      await axios.post(`${Api.deleteContext}?contextName=${item.contextName}`);
      this.getList();
    },
    async getList () {
      let response = await axios.post(Api.getContexts, {
        pageIndex: this.page.pageIndex, pageSize: 10
      });
      this.page.total = response.data.total;
      this.page.data = response.data.rowData;
    },
    pageChange (index) {
      this.page.pageIndex = index;
      this.getList();
    },
  }
}
</script>
