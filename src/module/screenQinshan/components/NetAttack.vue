<template>
  <qinshan-component-panel title="网络攻击">
    <p class="panel-subtitle">共<span>{{total}}</span>个</p>
    <ul class="netattack-content clearfloat">
      <li v-for="(item, index) in data" :key="index">
        <p>{{item.name}}</p>
        <p>{{item.count}}</p>
      </li>
    </ul>
  </qinshan-component-panel>
</template>

<script>
  import QinshanComponentPanel from "./QinshanComponentPanel";

  export default {
    components: {QinshanComponentPanel},
    name: "net-attack",
    data () {
      return {
        data: [],
        total: 0
      }
    },
    methods: {
      async refreshData(){
        let data = await this.common.req('/ssa/screenExhibit/getActionList.do',
            {dataRange: 'month'}, this);
        // let data = [{"event_action": "通过", "count": 6308}, {"event_action": "告警", "count": 52}, {
        //   "event_action": "阻断",
        //   "count": 7
        // }];

          let total = 0;
          this.data = data.map((item) => {
            total += item.count;
            return {
              name: item.event_action, count: item.count
            }
          });
          this.total = total;
 

      }
    },
     created() {
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

  ul.netattack-content {
    padding-bottom: 5px;
  }

  ul.netattack-content li {
    float: left;
    display: inline-block;
    text-align: center;
    width: calc((100% - 2px) / 3);
  }

  ul.netattack-content li:not(:last-child) {
    border-right: 1px solid #1e2431;
  }

  ul.netattack-content li p {
    text-align: center;
  }

  ul.netattack-content li p:last-of-type {
    color: #29fafe;
    font-family: "ElementalEnd";
    font-weight: 600;
    font-size: 20px;
    line-height: 40px;
  }

</style>
