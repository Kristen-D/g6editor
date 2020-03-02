<template>
  <div class="el-panel">
      <span class="left-top"></span><span class="left-bottom"></span>
      <span class="right-top"></span><span class="right-bottom"></span>
    <div class="el-panel-heading">
      <h4 class="el-panel-title">最新IP服务</h4>
    </div>
    <div class="el-panel-body shine">
       				     <div class="text-center" style="margin:20px auto 40px;">
       				     	<h4 class="el-subtitle">共发现<span class="digital">{{ipServiceTotal}}</span>种服务</h4>
       				     </div>
         				 <ul class="list m-b-40" >
             				 	<li v-for="(item,index) in ipService">
             				 		<span class="square">{{index+1}}</span>
             				 		<span class="">{{item.service}}</span>
             				 		<span class="float-r">{{item.collectDate}}</span>
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
      getIpServiceUrl: "/ssa/blackIp/getIpServiceList.do",
			ipService:[],
      ipServiceTotal:'',
      }
	},

	computed: {
		...mapState({

		})
	},
	methods: {
    getIpService(){
			 this.common.req(this.getIpServiceUrl, {}).then(data => {
				 this.ipService = data.serviceList;
         this.ipServiceTotal = data.serviceTotal;
			 });

		},

	},
	created:async function() {

	},
	mounted: async function() {this.getIpService();}
}
</script>
<style scoped="">

</style>
