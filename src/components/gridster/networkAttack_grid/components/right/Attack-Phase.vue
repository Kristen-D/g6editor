<template>
<div class="el-panel">
  <div class="el-panel-heading">
    <h4 class="el-panel-title">攻击阶段</h4>
  </div>
  <div class="el-panel-body">
    <ul class="ul-view m-10-a clearfloat">
      <li v-for="item in attackPhaseData">
        <div class="view">
          <div :class="['view-left', item.icon]"></div>
          <div class="view-right">
            <span class="figure">{{item.value}}</span>
            <p>{{item.name}}</p>
          </div>
        </div>
      </li>
    </ul>




  </div>
</div>
</template>
<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState({
      attackPhaseList: state => state.context.list.AttackPhaseList
    })
  },
	data() {
		return {
      iconObj:{
        '情报刺探': 'viewicon3',
        '弱点攻击': 'viewicon4',
        '命令控制': 'viewicon5',
        '渗透感染': 'viewicon6',
        '资料发掘': 'viewicon7',
        '攻击窃取': 'viewicon8',
      },
      attackPhaseData: []
		}
	},
	methods: {
		getInitData() {
			this.common.req('/ssa/netattack/getNetAttackPhaseStat.do', {}, this).then((data) => {
        let dataObj = this.common.convertArray2Obj(data, 'name', 'value');
        let iconArray = this.common.convertObj2Array(this.iconObj, 'name', 'icon');
        let newData = [];
        for(let ia of iconArray) {
          let newObj = {name:ia.name, value:dataObj[ia.name]===undefined? 0: dataObj[ia.name] , icon: ia.icon};
          newData.push(newObj);
        }
        // for(let du of data) {
        //   du.icon = this.icons[du.name];
        // }
        // data.sort((a, b) => {
        //   return b.icon - a.icon;
        // })

        this.attackPhaseData = newData;
			})
		},
	},
	created() {
		this.getInitData();
	}
}
</script>
<style>



</style>
