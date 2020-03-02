<script>

  const scoreMap = r => require.ensure([], () => r(require('./index_grid/scoreMap/ScoreMap.vue')), 'scoreMap')
  const orgManage = r => require.ensure([], () => r(require('./index_grid/orgManage/OrgManage.vue')), 'orgManage')
  
  const productView = r => require.ensure([], () => r(require('./index_grid/productView/ProductView.vue')), 'productView')
  const eventAttackPhase = r => require.ensure([], () => r(require('./index_grid/eventAttackPhase/EventAttackPhase.vue')), 'eventAttackPhase')
  // const assetData = r => require.ensure([], () => r(require('./dataCenter_grid/AssetData.vue')), 'AssetData')
  // const dataFlow = r => require.ensure([], () => r(require('./dataCenter_grid/DataFlow.vue')), 'DataFlow')
  // const dataPick = r => require.ensure([], () => r(require('./dataCenter_grid/DataPick.vue')), 'DataPick')
  // const enterSituation = r => require.ensure([], () => r(require('./dataCenter_grid/EnterSituation')), 'EnterSituation')
  // const chinaMap = r => require.ensure([], () => r(require('./netAttack_outside_grid/ChinaMap.vue')), 'ChinaMap')
  // const ipPie = r => require.ensure([], () => r(require('./netAttack_outside_grid/IpPie.vue')), 'IpPie')
  // const threatTop5 = r => require.ensure([], () => r(require('./netAttack_outside_grid/ThreatTop5.vue')), 'ThreatTop5')
  // const netAttackDetail = r => require.ensure([], () => r(require('./netAttack_grid/NetAttackDetail.vue')), 'NetAttackDetail')
  // const netAttackDataMap = r => require.ensure([], () => r(require('./netAttack_grid/NetAttackDataMap.vue')), 'NetAttackDataMap')
  // const netAttackHeatMap = r => require.ensure([], () => r(require('./netAttack_grid/NetAttackHeatMap.vue')), 'NetAttackHeatMap')
  // const attackTrend = r => require.ensure([], () => r(require('./screenExhibit_AttackInfo_grid/AttackTrend')), 'AttackTrend')
  // const keyAssetAttacked = r => require.ensure([], () => r(require('./screenExhibit_AttackInfo_grid/KeyAssetAttacked')), 'KeyAssetAttacked')
  // const keyInstAttacked = r => require.ensure([], () => r(require('./screenExhibit_AttackInfo_grid/KeyInstAttacked')), 'KeyInstAttacked')
  // const attackSourcePro = r => require.ensure([], () => r(require('./screenExhibit_AttackInfo_grid/AttackSourcePro')), 'AttackSourcePro')
  // const safeAttackTop = r => require.ensure([], () => r(require('./screenExhibit_AttackInfo_grid/SafeAttackTop')), 'SafeAttackTop')
  // const netAttackSituation = r => require.ensure([], () => r(require('./screenExhibit_AttackInfo_grid/NetAttackSituation')), 'NetAttackSituation')
  // const assetProportion = r => require.ensure([], () => r(require('./screenExhibit_AssetSafety_grid/AssetProportion')), 'AssetProportion')
  // const threatedTrend = r => require.ensure([], () => r(require('./screenExhibit_AssetSafety_grid/ThreatedTrend')), 'ThreatedTrend')
  // const safetyTrend = r => require.ensure([], () => r(require('./screenExhibit_AssetSafety_grid/SafetyTrend')), 'SafetyTrend')
  // const activeAttack = r => require.ensure([], () => r(require('./screenExhibit_AssetSafety_grid/ActiveAttack')), 'ActiveAttack')
  // const keyAssetThreatedTop5 = r => require.ensure([], () => r(require('./screenExhibit_AssetSafety_grid/KeyAssetThreatedTop5')), 'KeyAssetThreatedTop5')
  // const assetThreatedTop5 = r => require.ensure([], () => r(require('./screenExhibit_AssetSafety_grid/AssetThreatedTop5')), 'AssetThreatedTop5')
  // const threatedAssetOwner = r => require.ensure([], () => r(require('./screenExhibit_AssetSafety_grid/ThreatedAssetOwner')), 'ThreatedAssetOwner')
  // const alarmCategory = r => require.ensure([], () => r(require('./alarmInfo_grid/AlarmCategory')), 'AlarmCategory')
  // const alarmRelation = r => require.ensure([], () => r(require('./alarmInfo_grid/AlarmRelation')), 'AlarmRelation')
  // const safetyIndex = r => require.ensure([], () => r(require('./telecomOverall/middle/safetyIndex.vue')), 'safetyIndex')
  // const UrlDistribution = r => require.ensure([], () => r(require('./blackURL_grid/UrlDistribution/UrlDistribution.vue')), 'UrlDistribution')
  // const UrlTypeTOP = r => require.ensure([], () => r(require('./blackURL_grid/UrlTypeTOP/UrlTypeTOP.vue')), 'UrlTypeTOP')
  // const UrlCategory = r => require.ensure([], () => r(require('./blackURL_grid/UrlCategory/UrlCategory.vue')), 'UrlCategory')
  // const UrlRegistrant = r => require.ensure([], () => r(require('./blackURL_grid/UrlRegistrant/UrlRegistrant.vue')), 'UrlRegistrant')

  //首页组件
  const dataCenter = r => require.ensure([], () => r(require('./index_grid/dataCenter/DataCenter.vue')), 'dataCenter')
  const threatTypeLine = r => require.ensure([], () => r(require('./index_grid/productTypeLine/ThreatTypeLine.vue')), 'ThreatTypeLine')
  const threatTypeBarAndLine = r => require.ensure([], () => r(require('./index_grid/threatTypeBarAndLine.vue')), 'threatTypeBarAndLine')
  const productTypeLine = r => require.ensure([], () => r(require('./index_grid/productTypeLine/ProductTypeLine.vue')), 'productTypeLine')
  const eventTypeBarAndLine = r => require.ensure([], () => r(require('./index_grid/eventTypeBarAndLine/EventTypeBarAndLine.vue')), 'eventTypeBarAndLine')
  const eventTable = r => require.ensure([], () => r(require('./index_grid/eventTable/EventTable.vue')), 'EventTable')

  //有害程序组件
  const PupStatistics = r => require.ensure([], () => r(require('./pups_grid/top/PupStatistics.vue')), 'PupStatistics')
  const PupType = r => require.ensure([], () => r(require('./pups_grid/top/PupType.vue')), 'PupType')
  const PupWarnings = r => require.ensure([], () => r(require('./pups_grid/middle/PupWarnings.vue')), 'PupWarnings')
  const PupAffected = r => require.ensure([], () => r(require('./pups_grid/middle/AffectedThings.vue')), 'PupAffected')
  const PupTrend = r => require.ensure([], () => r(require('./pups_grid/bottom/PupTrend.vue')), 'PupTrend')
  const PupAttackTop = r => require.ensure([], () => r(require('./pups_grid/bottom/PupAttackTop.vue')), 'PupAttackTop')
  //新网络攻击
  const mapChange = r => require.ensure([], () => r(require('./networkAttack_grid/MapChange.vue')), 'MapChange')
  const newAlarm = r => require.ensure([], () => r(require('./networkAttack_grid/NewAlarm.vue')), 'NewAlarm')
  const attackPhase = r => require.ensure([], () => r(require('./networkAttack_grid/components/right/Attack-Phase.vue')), 'AttackPhase')
  const attackType = r => require.ensure([], () => r(require('./networkAttack_grid/components/right/Attack-Type-bar.vue')), 'AttackType')
  const attackedAsset = r => require.ensure([], () => r(require('./networkAttack_grid/components/right/Attacked-Asset-pie.vue')), 'AttackedAsset')
  //脆弱性组件
  const kindOfVulnerability = r => require.ensure([], () => r(require('./vulnerability_grid/left/KindOfVulnerability.vue')), 'KindOfVulnerability')
  const safetySatatistics = r => require.ensure([], () => r(require('./vulnerability_grid/middle/SafetySatatistics.vue')), 'SafetySatatistics')
  const vulnerabilityWarning = r => require.ensure([], () => r(require('./vulnerability_grid/middle/VulnerabilityWarning.vue')), 'VulnerabilityWarning')
  const affectedVul = r => require.ensure([], () => r(require('./vulnerability_grid/right/AffectedVul.vue')), 'AffectedVul')
  const owaspTop = r => require.ensure([], () => r(require('./vulnerability_grid/right/OwaspTop.vue')), 'OwaspTop')
  const vulnerabilityTrend = r => require.ensure([], () => r(require('./vulnerability_grid/right/VulnerabilityTrend.vue')), 'VulnerabilityTrend')
  //新资产视图
  const pieAssetData = r => require.ensure([], () => r(require('./index_grid/assetOverview/Echarts-Asset-pie.vue')), 'pieAssetData')
  const attackAssetTop5 = r => require.ensure([], () => r(require('./index_grid/assetOverview/Echarts-Top-radar.vue')), 'attackAssetTop5')
  const assetCount = r => require.ensure([], () => r(require('./index_grid/assetOverview/Echarts-Asset-bar.vue')), 'assetCount')
  const assetViewNew = r => require.ensure([], () => r(require('./index_grid/assetOverview/AssetViewNew.vue')), 'assetViewNew')

  export default {
    components: {
      // orgManage, productTypeLine, eventTypeBarAndLine,
      // scoreMap, eventAttackPhase, productView, eventTable,dataCenter,
      // dataFlow, dataPick, enterSituation, chinaMap,
      // ipPie, threatTop5, netAttackDetail, netAttackDataMap,
      // netAttackHeatMap, attackTrend, keyAssetAttacked,
      // attackSourcePro, keyInstAttacked, safeAttackTop,
      // netAttackSituation, assetProportion, threatedTrend,
      // safetyTrend, activeAttack, keyAssetThreatedTop5,
      // assetThreatedTop5, threatedAssetOwner, alarmCategory,
      // alarmRelation, safetyIndex,UrlDistribution,
      // UrlTypeTOP,UrlCategory,UrlRegistrant,threatTypeLine,
      // threatTypeBarAndLine,
      //首页组件
      dataCenter,threatTypeLine,threatTypeBarAndLine,eventAttackPhase,productView,
      productTypeLine,eventTypeBarAndLine,eventTable,
      //有害程序小组件
      PupStatistics, PupType, PupWarnings, PupAffected,
      PupTrend, PupAttackTop,
      //新网络攻击
      mapChange,newAlarm,attackPhase,attackType,attackedAsset,
      //脆弱性小组件
      kindOfVulnerability,safetySatatistics,vulnerabilityWarning,
      affectedVul,owaspTop,vulnerabilityTrend,
      //新资产视图
      pieAssetData,attackAssetTop5,assetCount,assetViewNew,
      // 云堡垒机
      fortressWorldMap, fortressAlnormalLogin, fortressNormalLogin, fortressImportanceBar,
      fortressOperBehavior, fortressEventDistribution, fortressViolentCrack,
      // 抗DDOS
      ddosWorldMap, ddosAbnormalIn, ddosAbnormalOut, ddosNewAlarm,
      // 虚拟apt
      aptThreatGrade, aptThreatType, aptThreatHost,
      // 虚拟waf
      wafAttackTime, wafAttackTrend, wafAttackDistributed, wafAttackProtected, wafDomain, wafWorldMap,
      // 数据库审计
      sqlOperate, sqlRiskLevel, sqlLoginFailed, sqlOperateTable, sqlTable
    },
    data() {
      return {}
    },
    props: ['data'],
    methods: {
      getGridRef() {
        this.$refs[this.data.i];
      }
    },
    created: function () {
    },
    render(h){
       if(typeof this.data.json =="string" && this.data.json != "") {
        this.data.json = JSON.parse(this.data.json);
      }

       return h(this.data.component,
          {
            props: {
              data: this.data,
            },
            ref: this.data.i,
          });
    },
    mounted: function () {

      var ref = this.$refs[this.data.i];
      //   if(ref.setCustomMenu)ref.setCustomMenu();
      this.$store.commit("addGridRef", [this.data.i, ref]);
    }
  }
</script>
