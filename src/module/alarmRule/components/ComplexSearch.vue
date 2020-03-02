<template>
  <div class="senior-search clearfloat">
    <el-form :model="params" ref="queryCondition" label-width="80px">
      <div class="">
        <el-form-item label="规则名称" style="display:inline-block;">
          <el-input v-model="queryCondition.ruleName" placeholder="规则名称"></el-input>
        </el-form-item>
        <el-form-item label="状态" style="display:inline-block; margin-left:20px;">
          <el-select v-model="queryCondition.status" clearable placeholder="所有状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="暂停" value="2"></el-option>
            <el-option label="异常" value="3"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否告警" style="display:inline-block;  margin-left:20px;">
          <el-select v-model="queryCondition.enableAlarm" clearable placeholder="">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规则类型" style="display:inline-block;  margin-left:20px;">
          <el-select v-model="queryCondition.ruleTypeList" clearable multiple placeholder="所有类型">
            <el-option v-for="item in ruleTypeList" :key="item.value" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </div>

      <el-form-item style="display:inline-block;margin-bottom:5px;">
        <el-button type="primary" class="button-p-2" @click="complexQuery">搜索</el-button>
        <!-- <el-button type="gray" class="button-p-2 m-l-30" @click="resetForm('params')">清空</el-button> -->
      </el-form-item>

      <div class="float-r">
        <p class="search-tag search-tag02" @click="setSearchPanel(0)">
          <i class="el-icon-search  m-r-8" style="margin-right:8px;"></i>普通搜索
        </p>
      </div>
    </el-form>
  </div>
  <!-- 
  <el-form ref="queryCondition" :model="queryCondition" label-width="80px">
    <el-row :gutter="30">
      <el-col :span="8">
        <el-form-item label="规则名称">
          <el-input v-model="queryCondition.ruleName" placeholder="规则名称"></el-input>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="状态">
          <el-select v-model="queryCondition.status" clearable placeholder="所有状态">
            <el-option label="启用" value="1"></el-option>
            <el-option label="暂停" value="2"></el-option>
            <el-option label="异常" value="3"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
      <el-col :span="8">
        <el-form-item label="是否告警">
          <el-select v-model="queryCondition.enableAlarm" clearable placeholder="所有">
            <el-option label="是" value="1"></el-option>
            <el-option label="否" value="0"></el-option>
          </el-select>
        </el-form-item>
      </el-col>
    </el-row>
    <el-row :gutter="30">
      <el-col :span="8">
        <el-form-item label="规则类型">
          <el-select v-model="queryCondition.ruleTypeList" clearable multiple placeholder="所有类型">
            <el-option v-for="item in ruleTypeList" :key="item.value" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-form-item>
          <el-button type="primary" @click="complexQuery">搜索</el-button>
        </el-form-item>
      </el-col>
      <el-col :span="4" :offset="4">
        <el-form-item>
          <el-button type="text" v-on:click="setSearchPanel(0)">普通搜索<i class="el-icon-arrow-up el-icon--right"></i>
          </el-button>
        </el-form-item>
      </el-col>
    </el-row>
  </el-form> -->

</template>
<script>
  import {
    mapActions,
    mapState
  } from 'vuex'
  export default {
    data() {
      return {
        ruleTypeList: [{
          value: 101,
          name: '过滤'
        }, {
          value: 102,
          name: '合并'
        }, {
          value: 104,
          name: '变更'
        }]

      }
    },
    computed: {
      ...mapState({
        queryCondition: state => state.context.queryCondition
      })
    },
    methods: {
      ...mapActions({
        setSearchPanel: 'setSearchPanel',
        getRuleList: 'getRuleList'
      }),
      complexQuery: function () {
        this.queryCondition.currentPage = 1;
        this.queryCondition.type = 'complex';
        console.log(this.queryCondition.ruleTypeList);
        this.getRuleList();
      }
    }
  }

</script>
<style>
  .el-select {
    display: inline-block;
    position: relative;
    width: 100%;
  }

  .el-row {
    margin-bottom: 5px;
  }

  .el-date-editor--daterange.el-input {
    width: 100%;
  }

</style>
