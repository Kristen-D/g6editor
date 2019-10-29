<template>
  <div class="el-panel-bigscreen">
    <div class="el-panel-bigscreen-heading">
      <h3 class="el-panel-bigscreen-title"><i class="el-icon-caret-right title-symbol"></i>被威胁资产负责人</h3>
    </div>
    <div class="el-panel-bigscreen-body">
      <ul class="safe-mark addattr">
        <li v-for="item in liData">
          <p style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">{{item.user_name}}</p>
          <label style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">{{item.org_name}}</label>
          <p style="overflow: hidden; white-space: nowrap; text-overflow: ellipsis;">{{item.value}}</p>
        </li>
        <!-- <li><p>林冬冬</p><label>太原市国资委</label><p>98</p></li>
        <li><p>吴亚卿</p><label>太原市财政局</label><p>87</p></li>
        <li><p>杨建民</p><label>太原市国家税务局</label><p>46</p></li>
        <li><p>何登平</p><label>山西省国资委</label><p>38</p></li>
        <li><p>黄杰</p><label>山西省财政厅</label><p>24</p></li> -->
      </ul>
    </div>
  </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState({
      activeScreen: state => state.context.activeScreen
    })
  },
  watch: {
    activeScreen: function() {
      if(this.activeScreen===3) {
        this.getInitData();
      }
    }
  },
  data() {
    return {
      liData: []
    }
  },
  methods: {
    async getInitData() {
      let data = await this.common.req('/ssa/screenExhibit/getThreatedAssetOwner.do', {dateRange: 'month'}, this);
      this.liData = data;
    }
  },
  mounted: function() {
    // this.getInitData();
  }
}
</script>

<style lang="css">
</style>
