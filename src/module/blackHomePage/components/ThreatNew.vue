<template>

      <div class="el-panel animated slideInLeft ">
              <span class="left-top"></span><span class="left-bottom"></span>
              <span class="right-top"></span><span class="right-bottom"></span>
              <div class="el-panel-heading">
                <h4 class="el-panel-title">最新威胁TOP</h4>
              </div>
              <div class="el-panel-body shine">
                 <ul class="list m-tb-30">
                      <li v-for="(item,index) in blackHomePage">
                        <span :class="item.className"></span>
                        <span class="">{{item.name}}</span>
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
      getHomePageNewUrl: "/ssa/blackHomePage/getHomePageNew.do",
      blackHomePage:[],
      classList:["circle circle-c1","circle circle-c2","circle circle-c3","circle circle-c4","circle circle-c5"]
      }
	},

	computed: {
		...mapState({

		})
	},
	methods: {
    getInitData(){
      this.blackHomePage=[]
       this.common.req(this.getHomePageNewUrl).then(data => {
         this.blackHomePage = data;
         for(var i=0;i<this.blackHomePage.length;i++){
           this.blackHomePage[i].className=this.classList[i];
         }
       });
    },

	},
	created: async function() {
      this.getInitData();
	},
	mounted:  function() {}
}
</script>
<style scoped="">

</style>
