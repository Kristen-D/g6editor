<template>
		<header class="top-head">
			<a href="" class="logo">
				<img src="../../../static/static_web/images/logo2.png" alt="logo">
			</a>
			<span class="logo-text">安全态势感知平台</span>
			<div style="float: right;">
			<el-tooltip class="item" placement="bottom-end" effect="light" hide-after="0">
				<div slot="content" class="about">
					<img src="../../../static/static_web/images/aboutlogo.png" alt="about">
					<div class="aboutinfo">
						<p>系统：亚信安全态势感知平台</p>
						<p>版本：V2.10</p>
						<p>发布：2018-08-08</p>
					</div>
				</div>
		        <el-button type="text" icon="icon-version"></el-button>
		    </el-tooltip>
			<el-dropdown size="medium" class="user-info">
				<span class="el-dropdown-link">Asiainfo<i class="el-icon-arrow-down el-icon--right"></i></span>
				<el-dropdown-menu slot="dropdown" >
					<el-dropdown-item>修改密码</el-dropdown-item>
					<el-dropdown-item>退出</el-dropdown-item>
				 </el-dropdown-menu>
		    </el-dropdown>
		    </div>
		</header>
</template>


<style scoped>
	header{ 
	position: fixed;
	left: 0;
	top: 0;
	z-index: 3; 
	width: 100%;
	height: 50px;
	line-height: 50px;
	border-bottom: 1px solid #ffffff;
    background-color:#ffffff;
	
}
header .logo{
	display: block;
	float: left;
	height: 50px;
    margin-left: 20px;
	white-space: nowrap;
	overflow: hidden;
}
header .logo img{vertical-align: middle; width: 100px; height: 32px; margin-right: 10px; }
header .logo-text{vertical-align: middle; color: #000; font-weight: 700; font-size: 14px;}
header .user-info{ margin:0 20px; cursor: pointer;}
.el-button--text{color: #000000;}

.el-tooltip__popper.is-light{border-radius: 0;border-color: transparent;}

.about{padding: 10px;}
.about img{text-align: center; padding: 0 15px 15px; border-bottom: 1px solid #E1E3E4;}
.about div.aboutinfo{padding: 20px 15px;}
.about div.aboutinfo p{color: #000;line-height: 24px;}
</style>