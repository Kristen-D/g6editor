<template>
  <container :page="page">
    <template slot="toolbar">
      <el-button type="primary" @click="createFlow">创建任务流程</el-button>
    </template>
    <template slot="table">
      <el-table-column prop="name" label="名称"></el-table-column>
      <el-table-column prop="context" label="Context"></el-table-column>
      <el-table-column show-overflow-tooltip prop="params" label="参数"></el-table-column>
      <el-table-column>
        <template slot-scope="props">
          <el-button type="primary" @click="changeStatus(props.row)">
            启动
          </el-button>
        </template>
      </el-table-column>
    </template>
    <el-dialog
      title="任务启动参数"
      :visible.sync="dialogVisible"
      width="40%">
      <el-form label-width="80px">
        <el-form-item label="params:">
          <el-input v-model="params"></el-input>
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

export default {
  components: { Container },
  data () {
    return {
      page: {
        data: [{name: 'test', status: 0, params: 'xxxx'}],
        number: 1,
        total: 10
      },
      dialogVisible: false,
      params: ''
    }
  },
  methods: {
    createFlow () {
      this.$router.push('/editor');
    },
    dialogOk () {
      // 
      this.dialogVisible = false
    },
    changeStatus (item) {
      this.dialogVisible = true;
    }
  }
}
</script>
