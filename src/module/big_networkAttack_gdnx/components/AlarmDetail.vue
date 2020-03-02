<template>
<div>
  <el-dialog title="处置 — 反馈结果" :visible.sync="dialogVisible" width="30%" class="dialog-panel">
    <div style="padding-left: 10px; padding-right: 10px;">
      <el-input type="textarea" :rows="14" placeholder="请输入内容" v-model="handleContent" class="handle-input">
      </el-input>


      <div class="dialog-button-location">
        <el-button type="blackblue2" size="medium" class="dialog-button-padding" @click="submit">完成</el-button>
        <el-button type="blackblue2" size="medium" class="dialog-button-padding" @click="cancle">取消</el-button>
      </div>
    </div>
  </el-dialog>
  <header>
    <el-button type="deepblue" size="medium" style="position:absolute; left:30px; top:20px;" @click="goBack"><i class="el-icon-sort"></i>返回</el-button>
    <div class="title" style="text-align: center"> <label>广东农信态势 — 网络攻击详情（共 123 条）</label></div>
      </header>
  <section class="container-table-wrap">
    <div class="">
      <el-table :data="alarmDetailData" class="blue-table">
        <el-table-column prop="bug" label="漏洞" show-overflow-tooltip>
          <template scope="scope">
  							 <i class="circle circle-green"></i>
  							 <span>{{ scope.row.bug }}</span>
  						</template>
        </el-table-column>
        <el-table-column prop="cve" label="CVE编号">
        </el-table-column>
        <el-table-column prop="src" label="来源">
        </el-table-column>
        <el-table-column prop="type" label="类型">
        </el-table-column>
        <el-table-column prop="level" label="严重程度">
        </el-table-column>
        <el-table-column prop="iftest" label="是否验证">
        </el-table-column>
        <el-table-column prop="coltime" label="采集时间" show-overflow-tooltip>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template scope="scope">
  							 <el-button type="text" style="color:#f35c08" @click="handleAlarm">处置</el-button>
  						 </template>
        </el-table-column>
      </el-table>
      {{this.$route.params}}
      <div class="pagelocation m-b-100">
        <!-- <span>每页显示</span> -->
        <el-pagination :current-page.sync="currentPage1" layout="sizes, prev, pager, next" :total="100" class="pagination">
        </el-pagination>
      </div>
    </div>

  </section>


</div>
</template>

<script>
export default {
  components: {
  },
  data() {
    return {
      alarmDetailData: [],
      dialogVisible: false,
      handleContent: ''
    }
  },
  methods: {
    submit() {
      this.dialogVisible = false;
    },
    cancle() {
      this.dialogVisible = false;
    },
    handleAlarm() {
      this.dialogVisible = true;
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  created: function(){

  }

}
</script>

<style>
</style>
