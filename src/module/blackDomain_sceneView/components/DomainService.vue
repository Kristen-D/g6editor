<template>
  <div class="el-panel">
          <span class="left-top"></span><span class="left-bottom"></span>
          <span class="right-top"></span><span class="right-bottom"></span>
          <div class="el-panel-heading">
            <h4 class="el-panel-title">最新Domain服务</h4>
          </div>
          <div class="el-panel-body shine">
             				     <div class="text-center" style="margin:20px auto 40px;">
             				     	<h4 class="el-subtitle">共发现<span class="digital">{{DomainServiceTotal}}</span>种服务</h4>
             				     </div>
               				 <ul class="list m-b-40" >
                   				 	<li v-for="(item,index) in DomainService">
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
      getDomainServiceUrl: "/ssa/blackDomain/getDomainServiceList.do",
			DomainService:[],
      DomainServiceTotal:'',
      }
	},

	computed: {
		...mapState({

		})
	},
	methods: {
    getDomainService(){
			 this.common.req(this.getDomainServiceUrl, {}).then(data => {
				 this.DomainService = data.serviceList;
         this.DomainServiceTotal = data.serviceTotal;
			 });

		},
    dataHandle(){

    }
	},
	created:async function() {
    this.getDomainService();
	},
	mounted:  function() {}
}
</script>
<style scoped="">

</style>
