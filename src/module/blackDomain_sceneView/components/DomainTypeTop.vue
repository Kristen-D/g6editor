<template>

  <div class="el-panel">
        <span class="left-top"></span><span class="left-bottom"></span>
        <span class="right-top"></span><span class="right-bottom"></span>
        <div class="el-panel-heading">
          <h4 class="el-panel-title">Domain类型TOP</h4>
        </div>
        <div class="el-panel-body shine">
          <div class="text-center" style="margin:10px auto 30px">
              <h4 class="el-subtitle">共挖掘<span class="digital" >{{domainTypeTotal}}</span>种类型</h4>
          </div>
              <ul class="list-bar m-b-40" >
                     <li v-for="item in DomainTypeTop"  >
                            <div class="progressbar" >
                               <div :class="item.className" :style="{width:item.percent+'%'}"></div>
                            </div>
                            <div class="progresstext">
                               <label>{{item.type}}</label>
                               <span class="float-r">{{item.count}}个</span>
                            </div>
                     </li>
             </ul>
        </div>
  </div>

</template>

<script>
import { 	mapState } from 'vuex'

export default {
	components: {},
	data() {
		return {
      getDomainTypeTopUrl: "/ssa/blackDomain/getDomainTopList.do",
			DomainTypeTop:[],
      domainTypeTotal:'',
      classList:["progress-bar progress-bar-info animated progress-animated",
      "progress-bar progress-bar-primary animated progress-animated",
      "progress-bar progress-bar-blue animated progress-animated"]
      }
	},

	computed: {
		...mapState({

		})
	},
	methods: {
    getDomainTypeTop(){
			 this.common.req(this.getDomainTypeTopUrl, {}).then(data => {
				 this.DomainTypeTop = data.typeList;
         this.domainTypeTotal = data.typeTotal;
         //为每一个数据加一个类名称
         for(var i=0;i<this.DomainTypeTop.length;i++){
           this.DomainTypeTop[i].className=this.classList[i];
         }

			 });

		},

	},
	created:async function() {
    this.getDomainTypeTop();
	},
	mounted:  function() {}
}
</script>
<style scoped="">

</style>
