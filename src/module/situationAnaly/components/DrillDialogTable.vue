<template>
<div class="">
  <el-dialog :title="drillData.title" :visible.sync="drillData.dialogTableVisible" width="85%" class="dialog-panel">

    <!-- <div class="block" v-if="drillData.queryDisplayFlag">

        <span class="demonstration">{{drillData.queryName}}</span>&nbsp;
        <el-select v-model="drillData.queryParam" placeholder="请选择产品类型">
          <el-option :label="pt.name" :value="pt.id" v-for="pt in drillData.ProductTypes"></el-option>
        </el-select>
        <el-button type="primary" @click="query">查询</el-button>
    </div> -->
    <el-form :inline="true" :model="drillData.queryParams" class="demo-form-inline" v-if="drillData.queryDisplayFlag">
      <!-- <el-form-item >
          <el-input v-model="drillData.queryParams.p1" placeholder="请输入资产名称"></el-input>
      </el-form-item> -->
      <el-form-item >
        <el-input v-model="drillData.queryParams.p2" placeholder="请输入源IP"></el-input>
      </el-form-item>
      <el-form-item >
        <el-input v-model="drillData.queryParams.p3" placeholder="请输入目标IP"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="query">查询</el-button>
      </el-form-item>
    </el-form>

    <!-- <el-checkbox-group v-model="drillData.customColumnList"  style="display:inline-block;" @change="getChange">
      <el-checkbox v-for="c in drillData.totalColumns" :label="c" >
        {{c.split(":")[1]}}
      </el-checkbox>
    </el-checkbox-group> -->

    <el-table :data="drillData.tableData" style="margin-top:20px;">

      <el-table-column :prop="key" :label="value" v-for="(value, key) in drillData.columnList"
      :min-width="getMinWidth(key)"    show-overflow-tooltip  align="center">
      </el-table-column>

      <!-- <div slot="empty" >
        <div class="" v-if="(!drillData.tableData || drillData.tableData.length === 0) && 'loaded' === drillData.loading">
          <i class="el-icon-document"></i> 没有相关数据！
        </div>

        <div class="" v-if="'wrong' === drillData.loading">
          <i class="el-icon-warning"></i> 数据加载错误！ 点击 <a @click="refresh">刷新</a>
        </div>

        <div class="" v-if="'load' === drillData.loading">
          <i class="el-icon-loading"></i> 正在读取数据，请稍后...
        </div>
      </div> -->
    </el-table>
    <el-pagination class="float-r page-location" @current-change="handleCurrentChange" :page-size="drillData.pageSize"
      :current-page="drillData.pageIndex" layout="total, prev, pager, next, jumper" :total="drillData.total">
    </el-pagination>
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
      // queryParams: {
      //   p1: '',
      //   p2: ''
      // }
    }
  },
  computed: {
    ...mapState({
      drillData: state => state.drillDialog.drillData
    })
  },
  methods: {
    getChange(event) {
      let obj = new Object();
      if (event.length > 0) {
        event.forEach((c) => {
          let arra  = c.split(':');
          let descriptor = Object.create({ value: null, writable: true, enumerable: true, configurable: true });
          descriptor.value = arra[1];
          Object.defineProperty(obj, arra[0], descriptor);
        });
        this.drillData.columnList = obj;
      }
    },
    handleCurrentChange(pageIndex) {
      this.$store.dispatch('listCurrentChange', pageIndex);
    },
    getMinWidth(value) {
      if(value=="logTime_dt"){
        return 170;
      }else if(value=="srcIp_s"){
          return 120;
      }else if(value=="dstIp_s"){
          return 120;
      }else if(value=="protocol_s"){
          return 100;
      }
    },
    query() {
      this.$store.dispatch('queryByConditions');
    }
  },
  created: function() {

  }
}
</script>

<style >
</style>
