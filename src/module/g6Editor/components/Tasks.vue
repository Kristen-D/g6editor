<template>
  <div class="tasks">
    <div class="toolbar">
      <div class="filter">
        <el-input @keyup.enter.native="filterItem" v-model="filter" placeholder="Filter items">
          <i @click.stop="filterItem" slot="suffix" class="el-input__icon el-icon-search"></i>
        </el-input>
      </div>
      <el-button type="primary" @click="createTask">创建任务</el-button>
    </div>
    <el-table :data="page.data" stripe border style="width: 100%">
      <el-table-column width="150px" prop="name" label="Name"></el-table-column>
      <el-table-column prop="dslText" label="Definitions"></el-table-column>
      <el-table-column width="100px" prop="status" label="Status"></el-table-column>
      <el-table-column type="expand">
        <template slot-scope="props">
          <!-- <p>上次任务时间：{{props.row.lastTaskExecution.startTime}}</p> -->
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      layout="total, prev, pager, next"
      @current-change="handleCurrentChange"
      :current-page="page.number"
      :total="page.total">
    </el-pagination>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'tasks',
  data () {
    return {
      page: {
        size: 10, number: 1, data: [], total: 0
      },
      filter: ''
    }
  },
  created () {
    this.getDefinitionsList();
  },
  methods: {
    getDefinitionsList() {
      let params = {
        page: this.page.number - 1,
        size: this.page.size
      };
      this.filter ? (params.search = this.filter) : '';
      axios.get('/tasks/definitions', { params }).then(response => {
        let result = response.data;
        this.page.total = result.page.totalElements;
        this.page.number = result.page.number + 1;
        if (result._embedded) {
          this.page.data = result._embedded.taskDefinitionResourceList;
        } else {
          this.page.data = [];
        }
      })
    },
    handleCurrentChange (number) {
      this.page.number = number;
      this.getDefinitionsList();
    },
    createTask () {
      this.$router.push('/editor');
    },
    filterItem () {
      this.getDefinitionsList();
    }
  }
}
</script>

<style scoped>
.tasks {
  padding: 15px;
}
.tasks .toolbar {
  margin-bottom: 10px;
}
.toolbar .filter {
  width: 250px;
  display: inline-block;
  margin-right: 100px;
}
.el-icon-search {
  cursor: pointer;
}
</style>
