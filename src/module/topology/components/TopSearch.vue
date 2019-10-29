<template>
  <div class="top-search">
    <div class="top-search-wrap">
      <el-row :gutter="30">
        <el-col :span="4">
          <el-checkbox @change="allChange" v-model="all">所有</el-checkbox>
        </el-col>
        <el-col :span="5">
          <div class="item-wrap">
            <i class="cus-icon-attack"></i>
            <el-select size="mini" v-model="oneModel" placeholder="请选择" @change="modelChange">
              <el-option label="所有类型" value="0"></el-option>
              <el-option :key="i" v-for="(option, i) in filters[0]" :label="option.value" :value="option.key + ''"></el-option>
              <el-option label="不选" value="-1"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="item-wrap">
            <i class="cus-icon-leak"></i>
            <el-select size="mini" @change="modelChange" v-model="twoModel" placeholder="请选择">
              <el-option label="所有类型" value="0"></el-option>
              <el-option :key="i" v-for="(option, i) in filters[1]" :label="option.value" :value="option.key + ''"></el-option>
              <el-option label="不选" value="-1"></el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="5">
          <div class="item-wrap">
            <i class="cus-icon-virus"></i>
            <el-select size="mini" @change="modelChange" v-model="threeModel" placeholder="请选择">
              <el-option label="所有类型" value="0"></el-option>
              <el-option :key="i" v-for="(option, i) in filters[2]" :label="option.value" :value="option.key + ''"></el-option>
              <el-option label="不选" value="-1"></el-option>
            </el-select>
          </div>
        </el-col>
        <!-- <el-col :span="5">
          <el-select size="mini" v-model="attackStateModel" @change="modelChange" placeholder="请选择状态">
            <el-option label="所有" value="0"></el-option>
            <el-option label="受攻击" value="1"></el-option>
            <el-option label="已阻断" value="2"></el-option>
            <el-option label="不选" value="-1"></el-option>
          </el-select>
        </el-col> -->
      </el-row>
    </div>
    <el-row :gutter="10" class="asset-introduce">
      <el-col :span="8">
        <!-- <el-popover
          placement="bottom"
          width="200"
          trigger="hover">
          <span slot="reference">主机<i class="el-icon-arrow-down"></i></span>
        </el-popover> -->
      </el-col>
      <el-col :span="8">
        <!-- <el-popover
          placement="bottom"
          width="200"
          trigger="hover">
          <span slot="reference">安全设备<i class="el-icon-arrow-down"></i></span>
        </el-popover> -->
      </el-col>
      <el-col :span="8">
        <!-- <el-popover
          placement="bottom"
          width="200"
          trigger="hover">
          
          <span slot="reference">威胁设备<i class="el-icon-arrow-down"></i></span>
        </el-popover> -->
      </el-col>
    </el-row>
  </div>
</template>

<script>

// import {moreServicer} from '../common/data';

export default {
  name: 'top-search',
  data () {
    return {
      all: true,
      oneModel: '0',
      twoModel: '0',
      threeModel: '0'
    }
  },
  props: {
    filters: Array
  },
  created () {
    
  },
  methods: {
    allChange () {
      if (this.all) {
        this.oneModel = '0'
        this.twoModel = '0'
        this.threeModel = '0'
      } else {
        this.oneModel = '-1'
        this.twoModel = '-1'
        this.threeModel = '-1'
      }
      this.modelChange();
    },
    modelChange () {
      let status = {
        one: this.oneModel,
        two: this.twoModel,
        three: this.threeModel
      }
      console.log('status', status)
      this.$emit('change', status);
    }
  }
}
</script>

<style scoped>
  .top-search {
    position: fixed;
    z-index: 12;
    background: white;
    left: 0;
    top: 0;
    height: 45px;
    width: 100%;
    line-height: 45px;
    border-bottom: 1px solid #ddd;
  }

  .top-search .top-search-wrap {
    width: 750px;
    padding-left: 30px;
    float: left;
  }
  .top-search-wrap .item-wrap {
    position: relative;
  }
  .top-search-wrap .item-wrap i {
    position: absolute;
    left: -20px;
    top: 13px;
  }
  .top-search .asset-introduce {
    float: right;
    padding-right: 50px;
    color: #409EFF;
    width: 360px;
    cursor: pointer;
  }
</style>

<style>
  .cus-icon-attack {
    width: 16px; height: 16px;
    display: inline-block;
    background: url("../assets/icon/Illegal.png") no-repeat;
    background-size: 100% 100%;
  }
  .cus-icon-leak {
    width: 16px; height: 16px;
    display: inline-block;
    background: url("../assets/icon/leak.png") no-repeat;
    background-size: 100% 100%;
  }
  .cus-icon-virus {
    width: 16px; height: 16px;
    display: inline-block;
    background: url("../assets/icon/virus.png") no-repeat;
    background-size: 100% 100%;
  }
</style>
