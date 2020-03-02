<template>
 <div>
   <div class="">

              <h4 class="el-subtitle">TOP3</h4>
              <ul class="list-bar m-b-40">
                     <li v-for="(item,index) in ipTypeTop">
                              <div class="progressbar"  >
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
      getIpTypeTopUrl: "/ssa/blackIp/getIpTypeTopList.do",
			ipTypeTop:[],
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
    getIpTypeTop(){
			 this.common.req(this.getIpTypeTopUrl, {}).then(data => {
				 this.ipTypeTop = data;
         //给每一个数据加一个类名称
         for(var i=0;i<this.ipTypeTop.length;i++){
           this.ipTypeTop[i].className=this.classList[i];
         }

			 });
		},
    dataHandle(){

    }
	},
	created:async function() {

	},
	mounted: async function() {this.getIpTypeTop();}
}
</script>
<style scoped="">

</style>
