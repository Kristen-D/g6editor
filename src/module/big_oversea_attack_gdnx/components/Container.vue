<template>
<div class="black-gdnx">
  <div class="attack-top clearfloat">
    <label class="tit text-white float-l">受攻击TOP：</label>
    <marquee direction="left" behavior="scroll" loop="infinite" style="width: 90%; height: 40px" onMouseOut="this.start()" onMouseOver="this.stop()">
      <span v-for="attack in attacks"><i class="circle"></i>{{ attack }}</span>
    </marquee>
  </div>
  <div style="position: relative;">
    <offshore-attack></offshore-attack>
    <div class="slider-box">
      <div class="ligth-line m-10-a"></div>
      <slider></slider>
    </div>
  </div>
</div>
</template>

<style scoped>
.attack-top {
  width: 1426px;
  margin: 30px auto;
  color: #3bd8ff;
  border: 1px solid rgba(255, 255, 255, 0.18);
  background-color: rgba(8, 22, 91, 0.4);
  box-shadow: inset 0 0 20px #101f66;
}

.attack-top .tit {
  padding: 0 25px;
  display: inline-block;
  line-height: 40px;
}

.attack-top marquee span {
  line-height: 40px;
  margin-right: 40px;
}

.attack-top marquee span .circle {
  width: 6px;
  height: 6px;
  background-color: #3bd8ff;
}

.ligth-line {
  height: 12px;
  background: url(/static/static_web/images/big-GDNX-lightingline.png) no-repeat top center;
}

.slider-box {
  position: absolute;
  bottom: 22px;
  width: 100%;
}
</style>


<script>
import OffshoreAttack from "./Echarts-OffshoreAttack-map.vue";
import Slider from "./Slider.vue"

export default {
  name: "container",
  components: {
    OffshoreAttack,
    Slider,
  },
  data() {
    return {
      attacks: [
        //"2018-08-10 10:30:15  发生SQL注入-攻击源IP 10.1.3.5-美国洛杉矶，被攻击地址172.38.2.1-省农信CRM"
      ]
    }
  },
  created(){
    window.fetchData = []
    window.fetchData.push(this.initTopAttack)
  },
  mounted() {
    this.initTopAttack();
  },
  methods: {
    //获取受攻击Top的数据并对数据进行处理
    initTopAttack() {
      const reqUrl = "/ssa/bigGznxOffshoreAttack/getAttackTop.do";
      this.commonAjax.req(reqUrl, null, this).then((data) => {
        this.attacks = [];
        //数据后缀
        const suffix = "-省农信CRM";
        data.forEach((value, index) => {
          let attack = value.alarm_time + "  发生" + value.event_type +
            "-攻击源IP " + value.src_ip + "-" + value.src_country_name +
            value.src_city_name + "，被攻击地址" + value.dst_ip + suffix;
          this.$data.attacks.push(attack);
        });
      });
    }
  }
};
</script>
