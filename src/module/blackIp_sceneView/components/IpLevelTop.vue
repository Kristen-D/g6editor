<template>
 <div>

          <ul class="list-bar m-b-40">
               <li v-for="item in ipLevelTop">
                  <div class="progressbar">
                     <div :class="item.className" :style="{width: item.percent+'%'}"></div>
                  </div>
                  <div class="progresstext">
                   <label>{{item.levelName}}</label>
                   <span class="float-r">{{item.count}}个</span>
                   <span class="float-r progresstext-precent">{{item.percent}}%</span>
                  </div>
               </li>

         </ul>

 </div>
</template>

<script>
import { 	mapState } from 'vuex'

export default {
	components: {},
	data() {
		return {
      getIpLevelTopUrl: "/ssa/blackIp/getIpLevelTopList.do",
			ipLevelTop:[],
      classList:["progress-bar progress-bar-deepdanger animated progress-animated",
                "progress-bar progress-bar-danger animated progress-animated",
                "progress-bar progress-bar-orange animated progress-animated",
                "progress-bar progress-bar-yellow animated progress-animated"
                ]
      }
	},

	computed: {
		...mapState({

		})
	},
	methods: {
    getIpLevelTop(){
			 this.common.req(this.getIpLevelTopUrl, {}).then(data => {
				 this.ipLevelTop = data;
         //为每个数据加一个类名称
         for(var i=0;i<this.ipLevelTop.length;i++){
           this.ipLevelTop[i].className=this.classList[i];
         }

			 });
		},
    dataHandle(){

    }
	},
	created:async function() {

	},
	mounted:async  function() {this.getIpLevelTop();}
}
</script>
