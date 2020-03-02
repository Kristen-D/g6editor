<template>
		<section class="content">
			<div class="container-fluid">
				<div class="top-breadcrumb">
					<el-breadcrumb separator="/">
						<el-breadcrumb-item>总览</el-breadcrumb-item>
					</el-breadcrumb>
				</div>

				<div class="el-panel">
					<div class="el-panel-heading">
						<div class="el-panel-title">备案状态</div>
					</div>
					<div class="el-panel-body">
						<el-row :gutter="40">
							<el-col :span="6">
								<div style="height: 300px">
									<echarts-asset1 :data="pieData"></echarts-asset1>
								</div>
							</el-col>
							<el-col :span="9">
								<ul class="flexBetween">
									<li v-for="item in assetData" class="assetop">

											<echarts-asset2 :data="item"></echarts-asset2>


									</li>
								</ul>

							</el-col>
							<el-col :span="9">
								<ul class="flexBetween">
									<li v-for="item in radarData" class="attacktype">

											<echarts-top :data="item"></echarts-top>

									</li>
								</ul>
							</el-col>
						</el-row>
					</div>
				</div>

			</div>
		</section>

</template>

<script>
	import  EchartsAsset1 from "./Echarts-Asset-pie.vue"
	import  EchartsAsset2 from "./Echarts-Asset-bar.vue"
    import  EchartsTop from "./Echarts-Top-radar.vue"


	export default {
	  name: "container",
	  components: {
	  	EchartsAsset1,
	  	EchartsAsset2,
	  	EchartsTop

	  },
	  data() {
    	    return {
    	    	assetData:[
                {json:{"name":"网络设备","dataUrl":"/ssa/assetOverview/getNetAssetCount.do"}},
                {json:{"name":"安全设备","dataUrl":"/ssa/assetOverview/getSecurityAssetCount.do"}},
                {json:{"name":"终端设备","dataUrl":"/ssa/assetOverview/getZDAssetCount.do"}},
                {json:{"name":"应用系统","dataUrl":"/ssa/assetOverview/getUseAssetCount.do"}},
            ],
    			  radarData:[
                {json:{"name":"受攻击资产TOP","dataUrl":"/ssa/assetOverview/getAttackAssetDataTop5.do"}},
                {json:{"name":"受威胁资产TOP","dataUrl":"/ssa/assetOverview/getTreadAssetDataTop5.do"}},
            ],
            pieData:{
              json:{"name":"资产饼图","dataUrl":"/ssa/assetOverview/getPieAssetData.do"}
            }


    	    }
	      }
    }
</script>

<style scoped>
	.flexBetween{display:flex;display:-webkit-flex;justify-content:space-between;align-items:center;flex-flow:row  wrap;}
	.attacktype{ width: 48.6%;  }
	.assetop{width: 46%;}
	 li.assetop:first-child,li.assetop:nth-child(2){ margin-bottom: 20px; }

    .assetop-inner li{
	  	width: 32%;
	  	font-family: "Haettenschweiler";
	    border-right: 1px solid transparent;
	    text-align: center;
		border-image: -moz-linear-gradient(rgba(0,0,0,0.1), #eaeef1 , rgba(0,0,0,0.1))1 10 1;
	    border-image: -webkit-linear-gradient(rgba(0,0,0,0.1), #eaeef1 , rgba(0,0,0,0.1))1 10 1;
		border-image: -o-linear-gradient(rgba(0,0,0,0.1), #eaeef1 , rgba(0,0,0,0.1))1 10 1;
	    border-image: linear-gradient(rgba(0,0,0,0.1), #eaeef1 , rgba(0,0,0,0.1))1 10 1;
	}
	.assetop-inner li >p:first-child{ margin:auto auto 5px 10px; font-size: 20px; color: #3e4956;}
	.assetop-inner li:first-child{margin-left: 10px;}
	.assetop-inner li:last-child{ border:none; }

	.c1{background-color: #12cbf6}
	.c2{background-color: #3498db}
	.c3{background-color: #2ecc71}



</style>
