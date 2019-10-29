<template>
    <div>
        <header class="top-head">
			<a href="" class="logo">
				<img src="/static/img/logo_red.png" alt="logo">
			</a>
			<span class="logo-text">安全态势感知平台</span>
			<el-dropdown size="medium" class="user-info">
				<span class="el-dropdown-link">Asiainfo
					<i class="el-icon-arrow-down el-icon--right"></i>
				</span>
				<el-dropdown-menu slot="dropdown">
					<el-dropdown-item>修改密码</el-dropdown-item>
					<el-dropdown-item>退出</el-dropdown-item>
				</el-dropdown-menu>
			</el-dropdown>
		</header>
		<aside class="left-panel">
			<nav class="navigation">
				<div class="sidebar-fold" id="navbar-toggle" tip="展开／收起">
					<i class="fa fa-sliders"></i>
				</div>
				<ul class="sidebar-one">
					<li class="nav-item active" tip="总览">
						<a href="#">
							<i class="fa fa-home"></i>
							<span class="nav-label">总览</span>
						</a>
					</li>
					<li class="nav-item" tip="数据中心">
						<a href="#">
							<i class="fa  fa-signal"></i>
							<span class="nav-label">数据中心</span>
						</a>
					</li>
					<li class="nav-item" tip="设备管理">
						<a href="#">
							<i class="fa  fa-shield"></i>
							<span class="nav-label">设备管理</span>
						</a>
					</li>
					<li class="nav-item" tip="威胁预警">
						<a href="#">
							<i class="fa  fa-space-shuttle"></i>
							<span class="nav-label">威胁预警</span>
						</a>
					</li>
					<li class="nav-item" tip="事件处置">
						<a href="#">
							<i class="fa  fa-suitcase"></i>
							<span class="nav-label">事件处置</span>
						</a>
					</li>
					<li class="nav-item" tip="案件通报">
						<a href="#">
							<i class="fa  fa-tachometer"></i>
							<span class="nav-label">案件通报</span>
						</a>
					</li>
					<li class="nav-item" tip="智能监管">
						<a href="#" data-submenu="7">
							<i class="fa  fa-umbrella"></i>
							<span class="nav-label">智能监管</span>
						</a>
					</li>
					<li class="nav-item" tip="指挥中心">
						<a href="#">
							<i class="fa  fa-users"></i>
							<span class="nav-label">指挥中心</span>
						</a>
					</li>
					<li class="nav-item" tip="态势视图">
						<a href="#">
							<i class="fa  fa-ticket"></i>
							<span class="nav-label">态势视图</span>
						</a>
					</li>
					<li class="nav-item" tip="系统管理">
						<a href="#">
							<i class="fa  fa-tint"></i>
							<span class="nav-label">系统管理</span>
						</a>
					</li>
				</ul>
			</nav>
			<nav class="sub-navigation">
				<div class="sidebar-subnav-head">
					<span class="sidebar-subnav-title">数据中心</span>
					<i class="fa fa-outdent" id="sidebar-subnav-collapse"></i>
				</div>
				<div class="sidebar-subnav-list">
					<ul class="second-mune hidden">
						<li class="cascade">
							<a href="#">
								<span>DASHBOARD1-1</span>
								<i class="fa fa-angle-left pull-right"></i>
							</a>
							<ul class="treeview-menu">
								<li class="">
									<a href="#"> Dashboard v1</a>
								</li>
								<li>
									<a href="#"> Dashboard v2</a>
								</li>
							</ul>
						</li>
						<li class="cascade">
							<a href="#">
								<span>DASHBOARD2</span>
							</a>
						</li>
						<li class="cascade">
							<a href="#">
								<span>DASHBOARD2</span>
							</a>
						</li>
						<li class="cascade">
							<a href="#">
								<span>DASHBOARD2</span>
							</a>
						</li>
					</ul>
					<ul class="second-mune hidden">
						<li class="cascade">
							<a href="#">
								<span>DASHBOARD1-2</span>
								<i class="fa fa-angle-left pull-right"></i>
							</a>
							<ul class="treeview-menu">
								<li class="">
									<a href="#"> Dashboard v1</a>
								</li>
								<li>
									<a href="#"> Dashboard v2</a>
								</li>
							</ul>
						</li>
						<li class="cascade">
							<a href="#">
								<span>DASHBOARD2</span>
								<i class="fa fa-angle-left pull-right"></i>
							</a>
							<ul class="treeview-menu">
								<li class="">
									<a href="#"> Dashboard v1</a>
								</li>
								<li>
									<a href="#"> Dashboard v2</a>
								</li>
							</ul>
						</li>
						<li class="cascade">
							<a href="#">
								<span>DASHBOARD3</span>
							</a>
						</li>
					</ul>
					<ul class="second-mune hidden">
						<li class="cascade">
							<a href="#">
								<span>DASHBOARD1-3</span>
								<i class="fa fa-angle-left pull-right"></i>
							</a>
							<ul class="treeview-menu">
								<li class="">
									<a href="#"> Dashboard v1</a>
								</li>
								<li>
									<a href="#"> Dashboard v2</a>
								</li>
							</ul>
						</li>
						<li class="cascade">
							<a href="#">
								<span>DASHBOARD2</span>
							</a>
						</li>
						<li class="cascade">
							<a href="#">
								<span>DASHBOARD3</span>
							</a>
						</li>
					</ul>
					<ul class="second-mune hidden">
						<li class="cascade">
							<a href="#">
								<span>DASHBOARD1-4</span>
								<i class="fa fa-angle-left pull-right"></i>
							</a>
							<ul class="treeview-menu">
								<li class="">
									<a href="#"> Dashboard v1</a>
								</li>
								<li>
									<a href="#"> Dashboard v2</a>
								</li>
							</ul>
						</li>
						<li class="cascade">
							<a href="#">
								<span>DASHBOARD2</span>
							</a>
						</li>
						<li class="cascade">
							<a href="#">
								<span>DASHBOARD3</span>
							</a>
						</li>
					</ul>
					<ul class="second-mune hidden">

					</ul>
					<ul class="second-mune hidden">
						<li class="cascade">
							<a href="#">
								<span>DASHBOARD1-6</span>
								<i class="fa fa-angle-left pull-right"></i>
							</a>
							<ul class="treeview-menu">
								<li class="">
									<a href="#"> Dashboard v1</a>
								</li>
								<li>
									<a href="#"> Dashboard v2</a>
								</li>
							</ul>
						</li>
						<li class="cascade">
							<a href="#">
								<span>DASHBOARD2</span>
							</a>
						</li>
						<li class="cascade">
							<a href="#">
								<span>DASHBOARD3</span>
							</a>
						</li>
					</ul>
				</div>
			</nav>
		</aside>
    </div>
</template>
