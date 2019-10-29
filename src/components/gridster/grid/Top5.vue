<template>
<div class="panel panel-default bg-panel">
  <div class="panel-heading">TOP5(最细层级)<i class="fa fa-list-ul pull-right"></i></div>
  <div class="panel-body">

    <div class="panel-group accordion mar-no" id="accordionP">

      <div class="panel defaultpanel" v-for="(m, index) in topData">
        <!--Accordion title-->
        <div class="panel-heading">
          <h4 class="panel-title"> <a data-parent="#accordionP" data-toggle="collapse" :href="'#accordion'+ index"> {{m.title}}</a> </h4>
        </div>
        <!--Accordion content-->
        <div :class="index<1?'panel-collapse collapse in':'panel-collapse collapse'" :id="'accordion'+ index">
          <div class="panel-body pad-no">





            <div v-for="(n, index2) in m.data" style="cursor:pointer" @click="showDetail(n)" :class="topClass[index2]">
                          <p>{{index2+1}}&nbsp;&nbsp;{{n.title}} <span class="pull-right">{{n.total}}</span></p>
              </div>




          </div>
        </div>
      </div>

    </div>


  </div>
</div>
</template>

<script>
import {
  mapState,
  mapActions
} from 'vuex'

export default {
  data() {
    return {
      topData: [],
      detailThreatData: [],
      dialogVisible: false,
      topClass: [
        "top-one",
        "top-two",
        "top-three",
        "top-four",
        "top-five"]
    }
  },
  methods: {
    showDetail(data) {


      var param = {};
      param.chartName = "top5";
      if (data.event_threat_type != undefined) {
        param.eventThreatTypes = data.event_threat_type;
      } else {
        param.productType = data.product_type;

      }

      this.$store.dispatch('drillData', param);

    }
  },
  created: function() {
    this.commonAjax.req("/ssa/home/getTopInfo.do").then((data) => {
      this.topData = data;
    });
  }
}
</script>
