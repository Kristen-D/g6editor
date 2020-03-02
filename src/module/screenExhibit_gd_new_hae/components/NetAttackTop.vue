<template>
  <big-screen-grid-header title="网络攻击TOP">
    <el-row :gutter="24">
      <el-col :span="8">
        <net-attack-list-panel :title="title1" :list="attackTypeList"></net-attack-list-panel>
      </el-col>
      <el-col :span="8">
        <net-attack-list-panel :title="title2" :list="deviceList"></net-attack-list-panel>
      </el-col>
      <el-col :span="8">
        <net-attack-list-panel :title="title3" :list="dstIpList"></net-attack-list-panel>
      </el-col>
    </el-row>
  </big-screen-grid-header>
</template>

<script>
  import BigScreenGridHeader from "./BigScreenGridHeader";
  import NetAttackListPanel from "./NetAttackListPanel";
  import {fmtEventTypeList} from "../../../components/js/functionUtil";

  export default {
    components: {
      NetAttackListPanel,
      BigScreenGridHeader
    },
    name: "net-attack-top",
    data(){
            return {
              title1:"攻击类型",
              title2:"资产名称",
              title3:"事发区域",
            }
        },
    computed: {
      attackTypeList () {
        return this.$store.state.context.attackType;
      },
      deviceList () {
        return this.$store.state.context.deviceList;
      },
      dstIpList () {
        return this.$store.state.context.dstIpList;
      }
    }
  }
</script>

<style scoped>

</style>
