<template>
  <qinshan-component-panel title="攻击类型">
    <ul class="attacktype-content clearfloat">
      <li>
        <div class="el-box">
          <span class="el-box-stl"></span><span class="el-box-str"></span>
          <span class="el-box-sbl"></span><span class="el-box-sbr"></span>
          <p class="number">{{data[0].value}}</p>
          <p class="name">{{data[0].name}}</p>
        </div>
      </li>
      <li>
        <div class="el-box">
          <span class="el-box-stl"></span><span class="el-box-str"></span>
          <span class="el-box-sbl"></span><span class="el-box-sbr"></span>
          <p class="number">{{data[1].value}}</p>
          <p class="name">{{data[1].name}}</p>
        </div>
      </li>
    </ul>
  </qinshan-component-panel>
</template>

<script>
  import QinshanComponentPanel from "./QinshanComponentPanel";

  export default {
    components: {QinshanComponentPanel},
    name: "attack-type",
    data () {
      return {
        data: [
          {name: '渗透感染', value: '--'},
          {name: '异常行为', value: '--'}
        ]
      }
    },
    methods:{
      async refreshData(){
        let data = await this.common.req('/ssa/situationAnaly/getEventAttackPhase.do',
            {dateRange: 'month'}, this);
        // let data = {"current": [{"event_attack_phase":"命令控制","count":885},{"event_attack_phase":"弱点攻击","count":1125},{"event_attack_phase":"攻击窃取","count":53},{"event_attack_phase":"渗透感染","count":4091},{"event_attack_phase":"资料发掘","count":71352}]} ;

    data.current && data.current.map((item) => {
      let event = item.event_attack_phase;
      event === this.data[0].name && (this.data[0].value = item.count);
      event === '命令控制' && (this.data[1].value = item.count)
    });
 


      }
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
  ul.attacktype-content li {
    float: left;
    display: inline-block;
    text-align: center;
    margin: 0 10px;
    width: calc(50% - 20px);
    color: #23ffff;
  }

  ul.attacktype-content li p.number {
    text-align: center;
    font-family: "ElementalEnd";
    font-size: 26px;
    line-height: 40px;
  }

</style>
