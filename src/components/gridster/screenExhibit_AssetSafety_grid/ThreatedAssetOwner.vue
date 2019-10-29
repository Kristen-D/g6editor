<template>
  <div class="el-panel-bigscreen threat-asset-owner">
    <div class="el-panel-bigscreen-heading">
      <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>被威胁资产负责人</h3>
    </div>
    <div class="el-panel-bigscreen-body">
      <ul class="">
        <li v-for="item in liData">
          <p class="name">{{item.user_name}}</p>
          <label>{{item.org_name}}</label>
          <p class="number">{{item.value}}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        liData: []
      }
    },
    methods: {
      getInitData() {
        this.common.req('/ssa/screenExhibit/getThreatedAssetOwner.do', {dateRange: 'month'}, this).then((data) => {
          this.liData = data;
        });
      }
    },
    created() {
      this.getInitData();
    }
  }
</script>

<style scoped>
  .threat-asset-owner ul li {
    color: white;
    padding: 8px 0;
    border-bottom: 1px solid rgba(255,255,255,0.1);
  }
  .threat-asset-owner ul li label {
    margin: 0;
  }
  .threat-asset-owner ul li:hover {
    background: rgba(255,255,255,0.1);
  }

  .threat-asset-owner .name {
    display: inline-block;
    margin: 0 10px;
  }

  .threat-asset-owner .number {
    width: 30px;
    float: right;
  }
</style>
