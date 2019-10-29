<template>
  <div>
    <custom-table
      :page="page"
      @currentChange="currentChange"
      size="small"
      @sizeChange="sizeChange">
        <el-table-column width="80px" prop="id" label="序号"></el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="suffix" label="扩展名"></el-table-column>
        <el-table-column label="图片">
          <template slot-scope="scope">
            <img style="width: 80px" :src="'/ssa/topology/' + topologyId + '/' + scope.row.name + scope.row.suffix" />
          </template>
        </el-table-column>
        <el-table-column>
          <template slot-scope="scope">
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
    </custom-table>
  </div>
</template>

<script>
import CustomTable from '../components/CustomTable';
import axios from 'axios';

export default {
  name: 'images',
  components: {CustomTable},
  data () {
    return {
      page: {
        pageIndex: 1, pageSize: 10, data: [], total: 0
      },
      topologyId: 0
    }
  },
  methods: {
    async getList() {
      let result = await axios.get('/ssa/topology/images/list.do', {
        params: {
          topologyId: this.topologyId, 
          pageIndex: this.page.pageIndex,
          pageSize: this.page.pageSize,
          t: Date.now()
        }
      });
      this.page.data = result.data.data.rowData;
      this.page.total = result.data.data.total;
    },
    sizeChange (value) {
      this.page.pageSize = value;
      this.getList();
    },
    currentChange(value) {
      this.page.pageIndex = value;
      this.getList();
    },
    async handleDelete (id) {
      await axios.get('/ssa/topology/image/del.do', {
        params: { id: id }
      })
      this.getList();
    }
  },
  created() {
    this.topologyId = this.$route.query.id;
    this.getList();
  },
}
</script>

<style scoped>

</style>


