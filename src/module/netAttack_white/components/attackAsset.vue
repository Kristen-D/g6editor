<template>
    <div>
        <div class="echartbox10" id="attackpropertypieA">
            <e-charts :options="optionA" auto-resize></e-charts>
        </div>
        <div class="echartbox10" id="attackpropertypieB">
            <e-charts :options="optionB" auto-resize></e-charts>
        </div>
        <div class="echartbox10" id="attackpropertypieC">
            <e-charts :options="optionC" auto-resize></e-charts>
        </div>
        <div class="echartbox10" id="attackpropertypieD">
            <e-charts :options="optionD" auto-resize></e-charts>
        </div>
        <div class="echartbox10" id="attackpropertypieE">
            <e-charts :options="optionE" auto-resize></e-charts>
        </div>
    </div>
</template>
<script>
import {
  attackAssetA,
  attackAssetB,
  attackAssetC,
  attackAssetD,
  attackAssetE
} from "../CharOptions";
import ECharts from "components/vue-echarts/ECharts";

export default {
  components: {
    ECharts
  },
  data() {
    return {
        optionA:attackAssetA,
        optionB:attackAssetB,
        optionC:attackAssetC,
        optionD:attackAssetD,
        optionE:attackAssetE,
    };
  }
};
</script>