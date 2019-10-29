<template>
	<div>
		<section class="content">
			<div class="container-fluid">
				<div class="top-breadcrumb">
					<el-breadcrumb separator="/">
						<el-breadcrumb-item>态势场景</el-breadcrumb-item>
						<el-breadcrumb-item>网络攻击态势</el-breadcrumb-item>
						<el-breadcrumb-item>外部攻击分析</el-breadcrumb-item>
					</el-breadcrumb>
				</div>
				<el-row :gutter="15">
					<el-col :span="6">
						<div class="el-panel">
							<div class="el-panel-heading">
								<h4 class="el-panel-title">安全指数</h4>
							</div>
							<div class="el-panel-body">
								<securityScore></securityScore>
							</div>
						</div>
						<div class="el-panel">
							<div class="el-panel-heading">
								<h4 class="el-panel-title">受攻击类型</h4>
							</div>
							<div class="el-panel-body">
								<attackType></attackType>
							</div>
						</div>
						<div class="el-panel">
							<div class="el-panel-heading">
								<h4 class="el-panel-title">受攻击IP排行</h4>
							</div>
							<div class="el-panel-body">
								<attackIp></attackIp>
							</div>
						</div>
					</el-col>
					<el-col :span="12">
						<div class="el-panel" style="position: relative;">
							<div class="el-panel-heading">
								<h4 class="el-panel-title">受攻击IP排行</h4>
							</div>
							<attackMap></attackMap>
						</div>
						<div class="el-panel">
							<div class="el-panel-heading">
								<h4 class="el-panel-title">受攻击趋势</h4>
								<el-tabs class="float-r day-tabs" v-model="daytabs">
									<el-tab-pane label="今天" name="first"></el-tab-pane>
									<el-tab-pane label="近7天" name="second"></el-tab-pane>
									<el-tab-pane label="近30天" name="third"></el-tab-pane>
								</el-tabs>
							</div>
							<div class="el-panel-body">
								<attackTendency></attackTendency>
							</div>
						</div>
					</el-col>
					<el-col :span="6">
						<div class="el-panel">
							<div class="el-panel-heading">
								<h4 class="el-panel-title">受攻击资产</h4>
							</div>
							<div class="el-panel-body">
								<attackAsset></attackAsset>
							</div>
						</div>
					</el-col>
				</el-row>

			</div>
		</section>
	</div>
</template>

<script>
import securityScore from "./securityScore";
import attackType from "./attackType";
import attackIp from "./attackIp";
import attackAsset from "./attackAsset";
import attackTendency from "./attackTendency";
import attackMap from "./attackMap";

export default {
  components: {
    securityScore,
    attackType,
    attackIp,
    attackAsset,
    attackTendency,
    attackMap
  },
  data(){
	  return{
		  daytabs: 'second',
	  }
  }
};
</script>
<style>
/* vue组件无头部时使用,添加头部要去掉样式 */
.content{
	left:0;
	top:0;
}
</style>
