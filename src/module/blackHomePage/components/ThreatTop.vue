<template>
    <div class="el-panel animated slideInLeft ">
            <span class="left-top"></span><span class="left-bottom"></span>
            <span class="right-top"></span><span class="right-bottom"></span>
            <div class="el-panel-heading">
        				<h4 class="el-panel-title">重大威胁TOP</h4>
        		</div>

					<div class="el-panel-body shine" >
						<el-collapse v-model="activeName" accordion class="re-el-collapse m-tb-30">
    						    <el-collapse-item v-for="(item,index) in blackHomePage" :name="index+''">
        								<template slot="title">
            									<div class="collapse-icon collapse-icon1"></div>
            									<div class="collapse-title">
            										<div class="clearfloat">
            											<label>{{item.name}}</label><span class="float-r">{{item.count+"个"}}{{item.levelName}}</span>
            										</div>
            										<div class="progressbar" v-if="item.flag==='ip'">
            											<div :class="[classllll,classList[0]]" style=width:100%></div>
            										</div>
                                <div class="progressbar" v-if="item.flag==='domain'">
            											<div :class="[classllll,classList[1]]" style=width:100%></div>
            										</div>
                                <div class="progressbar" v-if="item.flag==='url'">
            											<div :class="[classllll,classList[2]]" style=width:100%></div>
            										</div>
            									</div>

        			    				</template>
        			    				<div class="collapse-content-inner">
        				    				<p class="collapse-content-alarm">重大威胁</p>
          									<p v-if="item.flag==='ip'">IP：{{item.name}}</p>
                            <p v-if="item.flag==='domain'">Domain：{{item.name}}</p>
                            <p v-if="item.flag==='url'">Url：{{item.name}}</p>

                            <p v-if="item.flag==='ip'">威胁类型：恶意IP</p>
                            <p v-if="item.flag==='domain'">威胁类型：恶意域名</p>
                            <p v-if="item.flag==='url'">威胁类型：恶意Url</p>
          									<p>等级：{{item.levelName}}</p>
          									<p>更新时间：{{item.updateDate}}</p>
        								</div>
    							</el-collapse-item>

						</el-collapse>
					</div>

 </div>
</template>

<script>
import { 	mapState } from 'vuex'
// :style="{width:(item.count*10000/total)/100+'%'}"（本类样式用这个百分比，但实际情况是总量数量太大百分比太小看不到效果）
export default {
	components: {},
	data() {
		return {
      getHomePageTopUrl: "/ssa/blackHomePage/getHomePageTop.do",
      activeName:'0',
      blackHomePage:[],
      total:'',
      classllll:["progress-bar ","animated ","progress-animated "],
      classList:["progress-bar-ip","progress-bar-domain","progress-bar-url"]

      }
	},

	computed: {
		...mapState({

		})
	},
	methods: {
    getInitData(){
      this.blackHomePage=[]
       this.common.req(this.getHomePageTopUrl, {}).then(data => {
         this.blackHomePage = data.topList;
         this.total = data.topTotal;
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
