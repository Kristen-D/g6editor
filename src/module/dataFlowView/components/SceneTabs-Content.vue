<template>
	<ul class="flexStart scene">
		<li v-for="(item,index) in contentData.list" :key="index">
			<el-tooltip effect="dark" placement="bottom">
				<div class="ullitip" slot="content">
					<p><label>场景类型：</label>{{contentData.value === '0'?'我的场景':item.typeName}}</p>
					<p><label>场景名称：</label>{{item.name}}</p>
					<p><label>场景描述：</label>{{item.des}}</p>
					<!-- <p><label>监测描述：</label>{{item.content}}</p> -->
					
				</div>
				<div class="scene-content">
					<p style="height: 70px;"><img :src="'/static/static_web/images/dataflow/'+src+'.png'"></p>

					<h3 class="hname">{{item.name}}</h3>
					<p class="scontent fiveline">{{item.des}}</p>
					<div class="vertical_line" v-if="index!==(SceneTabsData.length-1)"></div>
				</div>
			</el-tooltip>

		</li>

	</ul>
</template>
<script>
	export default{
		props: ['contentData', 'src'],
		data(){
			return{
				SceneTabsData:[
				{
					src:'/static/static_web/images/Modeling-key.png',
					type:'威胁类',
					name:'账号盗用检测',
					describe:'高频攻击或模型',
					content:'账号两次登录不在同一城市且间隔时间较短，那么则可能发生账号盗用行为。场景通过实时分析相邻两次登陆时所具有的行为特征，发现帐号盗用的行为[场景通过实时分析相邻两次登陆时所具有的行为特征，发现帐号盗用的行为'
				},
				{
					src:'/static/static_web/images/Modeling-T.png',
					name:'暴力破解检测',
					content:'针对主机登录认证时，使用同一个用户名，用口令字典中的口令尝试登陆，直到登录成功或者尝试所有口令都不成功遭受暴力破解攻击，说明业务存在端口80'
				},
				{
					src:'/static/static_web/images/Modeling-Web.png',
					name:'Web高频攻击检测',
					content:'正常的用户对页面的请求，频次相对来说较低。但是web高频攻击，通常采用程序模仿网页请求行为，高速的访问页面请求，对web服务器资源消耗较大'
				},
				{
					src:'/static/static_web/images/Modeling-404.png',
					name:'高频404攻击检测',
					content:'WEB对访问的请求返回的代码为404时，表示该页面不存在，当短时间内出现大量返回404时，一方面有可能是黑客在尝试查找存在的页面，以方便后。WEB对访问的请求返回的代码为404时，表示该页面不存在，当短时间内出现大量返回404'
				},
				{
					src:'/static/static_web/images/Modeling-DGA.png',
					name:'内外连接DGA域名检测',
					content:'DGA（域名生成算法）是一种利用随机字符来生成C&C域名，从而逃避域名黑名单检测的技术手段。本场景采用机器学习算法，针对DNS请求的域名进行...'
				},
				]
			}
		}
	}

</script>
<style>
.bguide .el-tooltip__popper{ border-radius: 0px; }
.noBottom .el-tabs__nav-wrap::after{ height: 1px;}
.noBottom .el-tabs__nav-wrap::after{ background-color: #e4e7ed;}
</style>
<style scoped>

.vertical_line{ right: -8%; }
.scene {width:100%; height: 100%; margin-top: 40px;}
.scene li{width: 20%; min-width: 125px; margin-right: 3%;text-align: center; position: relative;}
.scene li .scene-content>.hname{padding:12px 10px; height: 50px }
.scene li .scene-content>.scontent{text-align: left; color: #3e4956; font-size: 13px; line-height: 1.6; height: 100px;}


.ullitip{
	max-width: 300px;
	padding: 1px 6px; 
	background-color: #323232;
	color: #fff;
	text-align: left;
	line-height: 22px;
	font-size: 12px;
}
.ullitip >p >label{ width: 10%; }

</style>