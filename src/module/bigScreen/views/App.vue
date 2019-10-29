<template>
  <div class="container-wrap">
    <el-row :gutter="20">
      <el-col :span="4">
        <safe-grade></safe-grade>
        <access-amount></access-amount>
        <website-attack></website-attack>
      </el-col>
      <el-col :span="12">
        <!--<global-map></global-map>-->
        <!--<alarm-list></alarm-list>-->
        <global-map-container></global-map-container>
      </el-col>
      <el-col :span="8">
        <company-attack></company-attack>
        <attack-type-rank style="margin-top: 10px;"></attack-type-rank>
        <attack-url-file style="margin-top: 10px;"></attack-url-file>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import SafeGrade from "../components/SafeGrade";
  import AccessAmount from "../components/AccessAmount";
  import WebsiteAttack from "../components/WebsiteAttack";
  import CompanyAttack from "../components/CompanyAttack";
  import AppHeader from "../components/AppHeader";
  import AlarmList from "../components/AlarmList";
  import AttackTypeRank from "../components/AttackTypeRank";
  import AttackUrlFile from "../components/AttackUrlFile";
  import GlobalMap from "../components/GlobalMap";
  import GlobalMapContainer from "../components/GlobalMapContainer";

  import * as types from '../store/const';

  export default {
    components: {
      GlobalMapContainer,
      GlobalMap,
      AttackUrlFile,
      AttackTypeRank,
      AlarmList,
      AppHeader,
      CompanyAttack,
      WebsiteAttack,
      AccessAmount,
      SafeGrade
    },
    name: "app",
    created () {
      this.$store.dispatch(types.GET_VISITED_AREA);
      this.$store.dispatch(types.GET_VISITED_IPS);
      this.$store.dispatch(types.GET_WEBSITES);
      this.$store.dispatch(types.GET_COMPANY_NAME);
      this.$store.dispatch(types.GET_ATTACK_TYPE);
      this.$store.dispatch(types.GET_URL_FILE);
      this.$store.dispatch(types.GET_SAFE_GRADE);
      this.$store.dispatch(types.GET_VISITED_COUNTRY);
      this.$store.dispatch(types.GET_ALARM_LIST);
      this.$store.dispatch(types.GET_TREND_LIST);
    }
  }
</script>

<style scoped>
  .main-container {
    padding: 10px;
    background: #8f949a;
  }
</style>
