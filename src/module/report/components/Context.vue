<template>
  <div class="whitebackground Whitespace">
    <div class="top-title">{{reportName}}</div>

    <el-tabs v-model="chooseIndex" type="card" @tab-click="handleClick">
      <el-tab-pane
        :key="item.tabname"
        v-for="(item, index) in tabs"
        :label="item.tabname"
        :name="index"
      >

        <myTab :reportUrl="reportUrl" :id="reportId"></myTab>

      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import myTab from './Tab.vue'

  export default {
    components: {
      myTab
    },

    created: async function() {
      // let menuId = window.top.location.href.getMenuId;
      let param = window.top.location.hash;
      let menuId = '';
      param.split(";").forEach((p) => {
          if(p.startsWith("id=")){
            menuId = p.split("=")[1];
          }
      })
      let data = await this.common.req("/ssa/report/getTabParams.do", {"menuId":menuId}, this);
      this.reportId = data.reportId;
      this.tabs = data.tabs;
      this.reportName = data.reportName;
      this.reportUrl = this.tabs[this.chooseIndex].url;
    },

    data() {
      return {

        reportId: 0,
        reportName: "",
        tabs: null,
        chooseIndex: 0,
        reportUrl: ""
      }
    },

    methods: {
      getUrlParam(name) {
        return decodeURIComponent((new RegExp('[?|&]'+name+'='+'([^&;]+?)(&|#|;|$)').exec(location.href) || [''])[1].replace(/\+/g, '%20')) || null;
      },

      handleClick(tab, event) {
        this.reportUrl = this.tabs[this.chooseIndex].url;
      }
    }
}
</script>

<style>
</style>
