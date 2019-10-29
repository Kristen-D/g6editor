<template>
  <qinshan-component-panel title="病毒发现">
    <p class="panel-subtitle">共<span>{{total}}</span>个</p>
    <ul class="list m-tb-30">
      <li v-for="item in list">
        <span class="circle"></span>
        <span class="">{{item.name}}</span>
        <span class="float-r">{{item.level}}</span>
      </li>
    </ul>
  </qinshan-component-panel>
</template>

<script>
  import QinshanComponentPanel from "./QinshanComponentPanel";
  import {eventRiskList} from "../../../components/js/functionUtil";

  export default {
    components: {QinshanComponentPanel},
    name: "bug-find",
    data() {
      return {
        list: [],
        total: 0
      }
    },
    methods: {
      async refreshData(){
        let data = await this.common.req('/ssa/screenExhibit/getMalwareList.do',
            {dataRange: 'month'}, this);
        // let data = [{"malwareName_s":"Backdoor.Win32.Rbot.B","event_risk_level":3,"count":5540},{"malwareName_s":"Virus.Win32.Viking.HA","event_risk_level":3,"count":2238},{"malwareName_s":"virus.acad.bursted.e5","event_risk_level":3,"count":877},{"malwareName_s":"Trojan.Win32.FakeLPK.A","event_risk_level":3,"count":679},{"malwareName_s":"Trojan.Win32.FakeLPK.C","event_risk_level":3,"count":471}]

    let total = 0;
    this.list = data.map((value) => {
      total += value.count;
      return {
        level: eventRiskList[value.event_risk_level],
        name: value.malwareName_s,
      }
    });
    this.total = total;
 


      },
    },
    created () {
      this.refreshData();
      setInterval(() => {
        this.refreshData();
      }, 60000);
    },
  }
</script>

<style scoped>
  .panel-subtitle {
    text-align: center;
    padding: 5px 0 15px;
  }

  .panel-subtitle span {
    padding: 0 10px;
    font-family: "ElementalEnd";
    font-weight: 600;
    color: #fff;
    font-size: 20px;
  }

  .circle {
    display: inline-block;
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: red;
    margin-right: 10px;
  }

  ul.list li {
    padding: 5px 20px;
    line-height: 24px;
    color: #23ffff;
    border-top: 1px solid #2d6a98;
    font-size: 12px;
  }

  ul.list li:last-child {
    border-bottom: 1px solid #2d6a98;
  }

  ul.list li:nth-child(odd) {
    background-color: #0d1f38;
  }
</style>
