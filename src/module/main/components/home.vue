<template>
	<el-row class="my_container">

		<el-col :span="24" class="header">

			<el-col :span="10" class="logo logo-width" >
				<img :src="sysLogo"   style="width:115px;">
				<span style="font-size:21px">{{sysName}}</span>
			</el-col>
			<!-- <el-col :span="10">
				<div class="tools" @click.prevent="collapse">
					<i class="fa fa-align-justify"></i>
				</div>
			</el-col> -->

			<el-col :span="3" class="userinfo" >
					<el-button type="text" class="tip">
							<i class="icon-version" style="color: black;"></i>
								<div  class="tiptext">
									<img src="/static/static_web/images/aboutlogo.png" alt="about">
									<div class="aboutinfo">
										<p>系统：{{sysAbout.productName}}</p>
										<p>版本：{{sysAbout.sysVersion}}</p>
										<p>发布：{{sysAbout.releaseTime}}</p>
									</div>
								</div>
							</el-button>
				<el-dropdown trigger="hover"   >
					<span class="el-dropdown-link userinfo-inner  "  >  {{loginUser.realname}} <i class="header-select-arrow el-icon-caret-bottom" style="padding-left:8px;"  ></i></span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item @click.native="showPwd()" >修改密码</el-dropdown-item>
						<el-dropdown-item divided @click.native="logout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
			</el-col>
			<!-- <el-col style="width:56px;"  class="headernav">
				 <i class="fa ssa-help" style="font-size:17px"></i>
			</el-col>

			<el-col style="width:56px;"  class="headernav">
				 <i class="fa   fa-bell-o" style="font-size:17px"></i>
				 <div id="msgCount" class="mycount" style="display: block;"></div>
			</el-col>

			<el-col style="width:56px;"  class="headernav">
				 <i class="fa fa-envelope-o" style="font-size:17px"></i>
			</el-col> -->
<!--icon="search" :on-icon-click="handleSelect"-->
			<el-col :span="3"  class="headernav">
				<el-autocomplete id="header-search-input"  v-model="searchStr" :fetch-suggestions="handleSearch" :trigger-on-focus="false"
				@select="handleSelect"  > </el-autocomplete>
			</el-col>
		</el-col>

		<el-col :span="24" class="main"  :style="this.mbxShow?'':'border-top: 50px solid;'">

								<ol class="breadcrumb mbx" :style="'border-left:'+iframeLeft+' solid'" v-show="mbxShow">
								    <li v-for="(item,index) in crumbList"  >
											<template v-if="item.edit">
											<a href="javascirpt:void(0)" @click="toUrl(item.permissionId)" >{{item.name}}</a>
										</template>
										<template v-else >
											{{item.name}}
										</template>
										</li>
								</ol>
			<aside :style="'width:'+menuWidth+';flex:0 0 '+menuWidth">

				<ul  id="menu1"  class="el-menu menu-ssa el-menu--dark "  :class="collapsed?'collapsed':''" ref="menuCollapsed">

					<el-tooltip  :open-delay="300" transition="show-tip" v-for="(item,index) in menus" v-if="!item.hidden" :visible-arrow="false"  class="item" effect="dark" :content="item.name+(item.fullName?'\n'+item.fullName:'')" placement="right">
						<li  class="el-submenu  item"   >
							<template v-if="!item.leaf">
								<div class="el-submenu__title " :class="item.active?'is-active':''" style="padding-left: 20px;"  @click="toIndex(item.permissionId)"><i :class="item.icon"></i>{{collapsed?'':item.name}}</div>

							</template>

						</li>
    		</el-tooltip>



					<li style="height:56px;width:60px;"></li>
				</ul>

				<div  class="bottom-nav"  @click="HandleCollapse()">
						<a class="toggle-nav-collapse" :class="collapsed?'collapse-nav':'expanded-nav'" href="javascript:void(0)" tip="展开/收起"><i class="fa ssa-expansion"></i></a>
				</div>
			</aside>

			<aside class="menu-expanded" v-show="!secondMenuCollapsed" >
				<ul  class="el-menu menu-ssa-sub el-menu--dark" id="menu2"  style="overflow: hidden; outline: none;">
					<li class="menu-header" menuheader index="-1">
						{{selectedMenu.name}}
						<i class="el-submenu__icon-arrow ssa-collapse" @click="collapsedSecondMenu(true)" ></i>
					</li>

					<template v-for="(item,index) in showSecondMenu"  >
								<li class="el-menu-item" :class="item.active?'is-active':''" :index="item.permissionId+''"  style="padding-left: 20px;"  v-if="!item.children"  @click="toUrl(item.permissionId)">
								 <i :class="item.icon"></i>{{item.name}}
							 </li>

							 <li   class="el-submenu" :class="item.active?'is-opened':''" v-else  :index="item.permissionId+''"  >
		 						<div class="el-submenu__title" style="padding-left: 20px;" @click="handleMenuOpenClose(item,$event)">
									  {{item.name}}<i class="el-submenu__icon-arrow el-icon-arrow-down"> </i></div>

					<my-collapse-transition >
								<ul class="el-menu" v-show="item.active">
		 							<li  v-for="child in item.children"  :index="child.permissionId+''"  :class="child.active?'is-active':''"  class="el-menu-item" style="padding-left: 40px;" @click="toUrl(child.permissionId)" >{{child.name}}</li>
							   </ul>
					</my-collapse-transition>

								</li>
					</template>
				</ul>





				 <!-- <el-menu  id="menu2"  class="menu-ssa-sub" @open="openMenu" @close="closeMenu"   theme="dark"  :default-active="subActive" unique-opened="true">
					<li class="menu-header" menuheader index="-1">
						{{selectedMenu.name}}
						<i class="el-submenu__icon-arrow ssa-collapse" @click="collapsedSecondMenu(true)" ></i>
					</li>



					<template v-for="(item,index) in showSecondMenu"  >
						 <el-menu-item :index="item.permissionId+''"  :class="item.active?'is-active':''" v-if="!item.children" @click="toUrl(item.permissionId)" ><i :class="item.icon"></i>{{item.name}}</el-menu-item>
						<el-submenu :index="item.permissionId+''" v-if="item.children"  >
							<template slot="title"><i :class="item.icon"></i>{{item.name}}</template>
							<el-menu-item v-for="child in item.children"   :index="child.permissionId+''"  v-if="!child.hidden" @click="toUrl(child.permissionId)">{{child.name}}</el-menu-item>
						</el-submenu>
					</template>
				</el-menu>  -->

			</aside>
			<!-- <section class="content-my_container">

			</section> -->
			<!--面包屑-->


					<iframe class="g-iframe" id="_main_iframe"  src=""  ></iframe>
		</el-col>
		<el-dialog title="密码修改" :visible.sync="pwdShow" width="30%" @close="onClosePwd()" >
			<el-form ref="pwd" :model="pwdForm" label-width="100px"   :rules="rules"  >
				<el-form-item label="旧密码"  prop="oldPwd"   >
					<el-col :span="20">
					<el-input v-model="pwdForm.oldPwd" type="password" @change="setOldPwdMsg(null)" ></el-input>
					</el-col>

				</el-form-item>

				<el-form-item label="新密码"   prop="newPwd" >
					<el-col :span="20">
						<el-popover
							placement="right"
							width="200"
							trigger="focus"
							content="密码8到16位 必须包含数字,大小写英文字母和特殊字符">
								<el-input v-model="pwdForm.newPwd" type="password" slot="reference"  ></el-input>
						</el-popover>
					</el-col>
				</el-form-item>

				<el-form-item label="确认密码"   prop="confirmPwd"  >
					<el-col :span="20">
						<el-input v-model="pwdForm.confirmPwd" type="password"  ></el-input>
					</el-col>
				</el-form-item>
			</el-form>

				<span slot="footer" class="dialog-footer">
					<el-button @click="pwdShow = false">取 消</el-button>
					<el-button type="primary" @click="editPwd()">确 定</el-button>
				</span>
		</el-dialog>
<!-- <div class="my-warp"  v-show="carouselShow==1">
	<div class="el-dialog__header" style="height:100px">
		<div class="el-dialog__headerbtn"><i @click="closeCarousel()" class="el-dialog__close el-icon el-icon-close"></i></div>
	</div>
		<div id="carousel"  >
		<img v-for="(item,index) in carouselList" class="cloud9-item" :src="item.img" :index="index" @click="handleCarousel(index)" >

	</div>

</div>
		<div class="mask"  v-show="carouselShow==1" >

		</div> -->
	</el-row>

</template>

<script>
import nicescroll from 'components/js/jquery.nicescroll.min.js'
//import cloud9carousel from 'components/js/jquery.cloud9carousel.js'
import MyCollapseTransition from "components/js/collapse-transition.js"
	export default {
		components: {MyCollapseTransition},
		data() {
			var validateOldPwd = (rule, value, callback)=>{
	        let oldPwdMsg = this.oldPwdMsg;
	        if(oldPwdMsg!=null && oldPwdMsg!=""){
	            callback(oldPwdMsg);
	        }
	        callback();
	    }

	    var validateNewPwd = (rule, value, callback) => {
	     //   var reg = /^[a-zA-Z0-9]{3,10}$/;
	    //      if (!reg.test(value)) {
						if(!this.regCheckPwd(value)){
	            callback(new Error('密码格式错误'));
	          }
	          callback();
	      };
	      var validateConfirmPwd = (rule, value, callback) => {
	            if (value != this.pwdForm.newPwd) {
	              callback(new Error('密码输入不一致'));
	            }
	            callback();
	        };
			return {
				tmptotal:0,
				newtotal:0,
				bulltmptotal:0,
				bullnewtotal:0,
				carouselList:[
					{img:"/static/img/01sjcj.png"},
					{img:"/static/img/02sjfx.png"},
					{img:"/static/img/03wxyj.png"},
					{img:"/static/img/04sjcz.png"},
					{img:"/static/img/05jcgz.png"},
					{img:"/static/img/06ajdc.png"},
					{img:"/static/img/07znjg.png"},
					{img:"/static/img/08zhdd.png"},
					{img:"/static/img/09tszs.png"},
				],
				carouselShow:0,
				mbxShow:true,
				loginUser:{realname:''},
				crumbList:[],
				menuWidth:"160px",
				iframeLeft:"160px",
				sysLogo:'/static/images/logo.png',
				sysName:'',
				collapsed:false,
				selectUp:false,
				secondMenuCollapsed:true,
				showSecondMenu:[],
				selectedMenu:{},
				subActive:"",
				sysUserAvatar: '',
        activePath:"",
				menus:[],
				idMenu:{},
				searchStr:"",
				form: {
					name: '',
					region: '',
					date1: '',
					date2: '',
					delivery: false,
					type: [],
					resource: '',
					desc: ''
				},
				sysAbout: {},
				pwdShow:false,
				pwdForm:{oldPwd:"",newPwd:"",confirmPwd:""},
				oldPwdMsg:"",
				rules:{
					oldPwd:[{ required: true, message: '密码不可为空', trigger: 'blur' },
									{ validator: validateOldPwd, trigger: 'blur' },
				],
					newPwd:[{ required: true, message: '密码不可为空', trigger: 'blur' },
									{ validator: validateNewPwd, trigger: 'blur' },
					],
					confirmPwd:[{ required: true, message: '密码不可为空', trigger: 'blur' },
											{ validator: validateConfirmPwd, trigger: 'blur' },
				],
			}

			}
		},
		methods: {
			handleMenuOpenClose(m,e){

					 this.showSecondMenu.forEach(ss=>{
						 if(ss.permissionId != m.permissionId){
							 ss.active = false;
						 }
					 })
					 m.active = !m.active ;
					 this.showSecondMenu = this.showSecondMenu.concat();

			},
			 regCheckPwd(newPwd) {
				 var patt1 = new RegExp(/[a-z]+/g);
				 var patt2 = new RegExp(/[A-Z]+/g);
				 var patt3 = new RegExp(/[0-9]+/g);
				 var patt4 = new RegExp(/[`~!@#\$%\^\&\*\(\)_\+\|<>\?:"\{\},\.\\\/;'\[\]]/im);
				 return patt4.test(newPwd) && patt1.test(newPwd) && patt2.test(newPwd) && patt3.test(newPwd) && newPwd.length >= 8 && newPwd.length <= 16;
		 },
			restScroll(){
				console.log("rest")
				Vue.nextTick(()=>{
					$("#menu2").getNiceScroll().resize();
				})
			},
			onSubmit() {
				console.log('submit!');
			},
			 collapseMeun(){
				 this.collapsed = !this.collapsed;
			 },
			//退出登录
			logout: function () {
				var _this = this;
				this.$confirm('确认退出吗?', '提示', {
					//type: 'warning'
				}).then(() => {
					window.location.href="/sso/logout.do";
				}).catch(() => {

				});


			},
			handleSearch(queryString, cb	){
				var results = [];
				for (var id in this.idMenu) {
						var menu = this.idMenu[id];
						if(menu.name.indexOf(queryString)>=0||( menu.fullName && menu.fullName.indexOf(queryString)>=0)){
							if(menu.uri)results.push({value:menu.name,menu:menu});
						}

				}
				cb(results);
			},

			handleSelect(item){
					this.toUrl(item.menu.permissionId);
					this.searchStr = "";
			},
			toIndex(id){
				for (let i=0;i<=10;i++) {
						let m = this.idMenu[id];
						let cd = m.children;
						if(cd && !m.uri){
							if( cd[0].uri){
									this.toUrl(cd[0].permissionId);
									break;
							}else{
								id = cd[0].permissionId;
							}
						}
						else {
							this.toUrl(m.permissionId);
							break;
						}
				}
			},
			showMenu(item,open){
				this.HandleCollapse(true);
				if(item.children){
					this.collapsedSecondMenu(false);
					this.selectedMenu = item;
					this.showSecondMenu = item.children;
				}else{
					this.collapsedSecondMenu(true);
					//	if(item.uri)this.toUrl(item.permissionId);
				}

			},

			//折叠导航栏
			collapsed(){
				this.collapsed = false;
			},
			collapsedSecondMenu(flag){
				this.secondMenuCollapsed = flag;
					this.iframeLeft =(this.collapsed?60:160)+(this.secondMenuCollapsed?0:160)+"px";

			},
			HandleCollapse(flag){
				if(flag)	this.collapsed=flag;
				else this.collapsed=!this.collapsed;
				this.menuWidth = this.collapsed?"60px":"160px";
					this.iframeLeft =(this.collapsed?60:160)+(this.secondMenuCollapsed?0:160)+"px";
			},
			toUrl(id){
			 var vm = this;
			 console.log(this.idMenu);
			 var m = this.idMenu[id];
			 
			 
			 var type = m.type;
			 if(type == 100){
				 m.uri = "/ssa/viewPlugins/viewShow.do";
			 }

			 for(let x in this.idMenu){
				 this.idMenu[x].active = false;
			 }

			  this.mbxShow=(m.uri!="/ssa/alarmMap/screenDisplay.do");
			 this.crumbList = [];
			 this.setCrumbList(id);

			 this.setMenuActive(m);
			 Vue.nextTick(()=>{
				  vm.subActive = m.permissionId+'';
			 })
			 var path = m.uri;
			 if(!path)return;

			 if(path.match("[\?]"))
			 path = path+"&";
			 else
			 path = path+"?";

			 path = path+"mid="+id;

			 $.hash("id",id);
			 if($.hash("url")==path)
				 this.toUrlByHash();
			 else
			 $.hash("url",path);

		 },
		 setMenuActive(m){
			 m.active = true;
			 if(m.pid!=-1){
				 this.setMenuActive(this.idMenu[m.pid]);
			 }else {
				 this.showMenu(m,true);
			 }
		 },
		 setCrumbList(id){
			 var m = this.idMenu[id];
			 if(m){
				 	 this.crumbList.splice(0, 0, m);
			 }
			 if(m.pid!=-1)this.setCrumbList(m.pid);

		 },
			toUrlByHash(){
			 var url = $.hash("url");
			 var _iframe = document.getElementById('_main_iframe');
			 Vue.nextTick(()=>{
				 if(url.match("[\?]"))
				 url = url+"&";
				 else
				 url = url+"?";
				 url = url + "random_date="+new Date().getTime();
				 if(url.indexOf("http://")==0 || url.indexOf("https://")==0 ){
					 alert( "禁止跨域访问");
					 return;
				 }
				  _iframe.contentWindow.location.replace(url);
			 })

		 },
		 showPwd(){
       this.pwdShow = true;
     },
		 onClosePwd(){
			 this.$refs.pwd.resetFields();
		 },
		 setOldPwdMsg(msg){
			 this.oldPwdMsg = msg;
			 this.$refs.pwd.validateField("oldPwd");
		 },
		  editPwd(){
       this.$refs.pwd.validate(async(valid) => {
          if (valid) {
						var st ="66f1b370c660445a8657bf8bf1794486";
	          this.pwdForm.oldPwd = md5(this.pwdForm.oldPwd+st).toUpperCase();
	          this.pwdForm.newPwd = md5(this.pwdForm.newPwd+st).toUpperCase();
            var data = await this.common.reqBackState("/ssa/authority/userCfg/editPwd.do",this.pwdForm,this);
              if(data.state){
                this.$message({ type: 'success',   message:data.message});
                this.pwdShow = false;
              }else{
               this.setOldPwdMsg(data.message);
              }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
			setCarousel(){

						 Vue.nextTick(()=>{
							 	 let carousel = $("#carousel");
								carousel.Cloud9Carousel( {
							  autoPlay: 0,
							  bringToFront: true,
								onLoaded: function() {
													carousel.css( 'position', '' )
													 carousel.css( 'visibility', 'visible' )

												 }
											 } );


							})
			},
			handleCarousel(index){
				var showIndex = $("#carousel").data("carousel").nearestIndex();
				if(index == showIndex){

				}
			},
			closeCarousel(){
				this.carouselShow = 0;
				sessionStorage.carouselShow = this.carouselShow;
			},
			goDetail(type) {

	      var path = "";
	      if (type == 'caseInvestigate') {
	        path = "/ssa/caseInvestigate/begin.do";
	      } else if (type == 'eventMgmtProcess') {
	        path = "/ssa/eventMgmt/begin.do";
	      } else if (type=='warnMgmtProcess'){
	        path = "/ssa/warnMgmt/begin.do";
	      }else if (type=='单位备案'){
	       path = "/ssa/classifiedP/begin_unit.do";
	     } else if (type=='系统备案'){
	       path = "/ssa/classifiedP/begin_system.do";
	     } else if (type=='机构测评'){
	       path = "/ssa/evaluationOrgan/begin_evaluationOrgan.do";
	     }else if (type=='任务督查'){
	       path = "/ssa/taskInspect/begin.do";
	     }else if (type=='notice'){
	       path = "/ssa/alertNotice/begin.do";
	     }else if (type=='bulletin'){
	       path = "/ssa/alertNoticeBulletn/begin.do";
	     }
	      $.hash("url", path);
	     this.toUrlByHash();
	    },
			setNiceScroll(){
				Vue.nextTick(()=>{
						$("aside>ul").niceScroll({
							cursorcolor: '#8e909a',
							cursorborder: '0px solid #fff',
							cursoropacitymax: '0.5',
							cursorborderradius: '0px'
					});
				})
				$(window).resize(function() {
						$("#menu1").getNiceScroll().resize();
						$("#menu2").getNiceScroll().resize();
				});
			},
		},
		created(){

			this.common.req("/ssa/main/getLoginUser.do").then(data=>{
				 this.loginUser = data;
			});

			this.common.req("/ssa/main/getSysInfo.do").then(data=>{
				 if(data.sysLogo)this.sysLogo = data.sysLogo;
				 if(data.sysFullName)this.sysName = data.sysFullName;
				 this.sysAbout = data;
			});

			var vm =this;

		},
		 mounted() {
			var params={};
			params.pageSize=10;
      params.pageIndex=1;
			var vm  = this;

			this.common.req("/ssa/main/getPermission.do").then(data=>{
			 
				let treeMap = this.common.fmtListToTree(data,"permissionId");
				this.menus = treeMap.tree;
				this.idMenu = treeMap.idTree;
				var id = $.hash("id");
				if(id)  this.toUrl(id);
				else this.toUrl(1);

			});



			this.setNiceScroll();


			var vm = this;

			window.toUrl=function(menuId){
					vm.toUrl(menuId);
			 }

			window.onhashchange=function(){
					vm.toUrlByHash();
			 }
			 window.getMenuId = function(){
				 let id = $.hash("id");
				 if(id) id = parseInt(id);
				 else id = null;
				 	return id;
			 }

			 window.getLoginUser = function(){
				 return vm.loginUser;
			 }

		}
	}



</script>
<style  >

#carousel .cloud9-item, #buttons button {
  cursor: pointer;
}

body{
	overflow: hidden;
}
.my-warp{
	z-index: 9999;
	position: fixed;
  display: block;
	left: 0;
	top: 0;
	width: 100%;
	height: 100%;
}
.mask{
	z-index: 9998;
	position: fixed;
	    display: block;
left: 0;
top: 0;
width: 100%;
height: 100%;
opacity: .5;
background: #000;
}
.el-tooltip__popper{
	line-height: 18px;
	height:18px;
	padding: 0 4px;
	border-radius:1px;
	 font-size: 12px;
	 opacity:0.8;
}
.show-tip-enter-active {
	  transition: all  .3s;
		opacity: 0.8;
}
.show-tip-leave-active {
	 transition: all  .3s;
	 opacity: 0;
}
.show-tip-enter{
	transform: translateX(-10px);
	opacity: 0;
}
 .show-tip-leave-active {
  transform: translateX(-10px);
  opacity: 0;
}

.my_container .header .el-input .el-input__inner  {
    height: 30px;
}

.el-menu--dark .el-submenu .el-menu .el-menu-item{
	background-color: #185fa4;
}
.el-menu--dark .el-submenu .el-menu .el-menu-item.is-active{
	background-color: #007be8;
}
.el-menu-item.is-active{
	color: #f5f5f6;
	background-color: #007be8;
}
.el-menu--dark .el-submenu__title{
	color: #ffffff;
}

.el-menu--dark .el-submenu__title:hover{
	 background-color: #0e335f;
}
.el-input__inner{
	background-color:#edf1f2;
}

.el-input__inner:focus{
	background-color:#fff;
}
.el-icon-search{
	color:#5f6263;
}
</style>
<style scoped lang="scss">
	@import './vars.scss';
	.mbx{
		z-index:0;
		width:100%;
		box-sizing: border-box ;
		//border-left: 160px solid ;
		line-height: 25px;
		 margin-top:-40px;
		position: absolute;
		border-radius:0px;
	}
	.el-input__inner {
		height: 30px;
	}


	.g-iframe {
		//	padding-top:60px;

			//z-index:0;
			display: block;
		//	position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			border: 0px;
		//	border-top: 60.8px solid ;
		//	border-left: 160px solid ;
	}

	.my_container {
		position: absolute;
		top: 0px;
		bottom: 0px;
		width: 100%;
		.header {
			 z-index: 89;
			 position: absolute;
			height: 50px;
			line-height:50px;
			background: $color-primary;
			color:#3e4956;
			 .headernav {
				 position: relative;
		    display: inline-block;
		    float: right;
		    padding: 0 20px;
		    line-height:50px;
		    color: #505354;
		    cursor: pointer;
			}

			.el-input{
				height: 30px;
			}
			.is-opened  {
					-ms-transform:rotate(180deg);
					transform:rotateZ(180deg);
			}
			.header-select-arrow {
 			    display: inline-block;
 			    zoom: 1;
					color:#505354;
 			    -webkit-transition: all 0.3s;
 			    -moz-transition: all 0.3s;
 			    -ms-transition: all 0.3s;
 			    transition: all 0.3s;
 			    -moz-transition: all .3s;
 			    -webkit-transition: all .3s;
 			    transition: all .3s;
 			}
			.mycount{
				width: 11px;
				height: 11px;
				top: 11px;
				right: 18px;
				padding: 0;
				margin: 0;
		    position: absolute;
		    display: block;
		    color: #fff;
			  border: 2px solid #fff;
		    background-color: #e33244;
		    -moz-border-radius: 50px;
		    border-radius: 50px;
		}
			.userinfo {
				text-align: right;
				padding-right: 35px;
				float: right;
				.userinfo-inner {
					cursor: pointer;
					color:#505354;
					display:inline-block;
					height:50px;
					img {
						width: 40px;
						height: 40px;
						border-radius: 20px;
						margin: 10px 0px 10px 10px;
						float: right;
					}
				}
			}

			.logo {
				//width:230px;
				height:50px;
				font-size: 16px;
				 font-weight:bold;
				padding-left:20px;
				padding-right:20px;
			//	border-color: rgba(238,241,146,0.3);
		//		border-right-width: 1px;
			//	border-right-style: solid;
				img {
					width: 115px;
					float: left;
					margin: 10px 28px 10px 18px;
				}
				.txt {
					color:#fff;
				}
			}
			.logo-width{
				width:600px;
			}
			.logo-collapse-width{
				width:60px
			}
			.tools{
				padding: 0px 23px;
				width:14px;
				height: 60px;
				line-height: 60px;
				cursor: pointer;
			}
		}
		.main {
			 box-sizing: border-box ;
			display: flex;
			//	z-index:11;
			// background: #324057;
			//position: absolute;
			top:0;
			height: 100%;
			border-top:  90px solid;
			bottom: 0px;
			overflow: hidden;
			aside {
			// z-index: 1;
			 left: 0;
			 top: 0;
				// position: absolute;
				// top: 0px;
				// bottom: 0px;
				.el-menu{
					height: 100%;
				}
				.collapsed{
						width:60px;
				}
				.el-submenu__title.is-active{
					// background-color: #0e335f;
					// border-left:2px solid #007be8;
					color: #007be8;
				}
			}
			.menu-collapsed{
				flex:0 0 60px;
				width: 60px;
			}
			.ssa-collapse{
				cursor: pointer;
			}
			.menu-expanded{
				flex:0 0 160px;
				width: 160px;
			}
			#menu1 >li>div.el-submenu__title{
				color: #ffffff;
				border-left:2px solid #134580;
			}

	    .el-menu-item:hover{
				background-color: #0e335f;
			}
			#menu1 >li>div.el-submenu__title:hover{
				color: #fff;
				background-color: #0e335f;
				border-left:2px solid #007be8;
			}
			.menu-ssa{
				z-index:88;
					box-sizing: border-box;
				border-top:50px solid;
				position: absolute;
				bottom: 0px;
				width:160px;
				border-radius: 0px;
				background: #134580;
				.item{
					position: relative;
				}
				.submenu{
					position:absolute;
					top:0px;
					left:60px;
					z-index:9999;
					height:auto;
					display:none;
				}
			}



			.menu-ssa-sub{
				box-sizing: border-box;
				z-index: 77;
				position: absolute;
				border-top:50px solid;
				width: 160px;
				bottom: 0px;
				border-radius: 0px;
				background: #2a74bd;
			}
		 .collapse-nav, .custom-nav {
			 	width:60px;
			    background: #121a2c;
			    display: inline-block;
			    color: #e2e5ec;
			}
			.expanded-nav{
				width:160px;
			    background: #121a2c;
			    display: inline-block;
			    color: #e2e5ec;
			}
		  .bottom-nav {
				z-index:99;
		    position: fixed;
		    bottom: 0;
		    left: 0;
		    height: 40px;
		    font-size: 13px;
		    outline: none;
		    line-height: 40px;
		    text-align: center;
		}
		.el-menu-item{
			color: #fff;
		}
		.menu-header {
					z-index:88;
					font-size: 16px;
					color: #fff;
					background: #2a74bd;
					padding-left: 20px;
					line-height: 80px;
					position: relative;
					//margin-top: -40px;
					 border-bottom: 1px solid #172850;
			}




			.content-my_container {
				flex:1;
				overflow-y: scroll;
				padding: 20px;
				.breadcrumb-my_container {
					//margin-bottom: 15px;
					.title {
						width: 200px;
						float: left;
						color: #475669;
					}
					.breadcrumb-inner {
						float: right;
					}
				}
				.content-wrapper {
					background-color: #fff;
					box-sizing: border-box;
				}
			}
		}
	}
	.tip {
    position: relative;
    display: inline-block;
}

.tip .tiptext {
    visibility:hidden;
    min-width: 150px;
    background-color: #fff;
    color: #000;
    padding: 15px;
    position: absolute;
    z-index: 1;
    top: 95%;
    right: -220%;
   -moz-box-shadow: 4px 4px 5px #999; 
	box-shadow: 4px 4px 5px #999;
	border: 1px solid #999;
}

.tip .tiptext::before {
    content: "";
    position: absolute;
    bottom: 100%;
    right: 12%;
    margin-left: -5px;
    border-width: 8px;
    border-style: solid;
    border-color: transparent transparent #999 transparent;
}
.tip .tiptext::after {
    content: "";
    position: absolute;
    bottom: 100%;
    right: 13%;
    margin-left: -5px;
    border-width: 7px;
    border-style: solid;
    border-color: transparent transparent #fff transparent;
}

.tip:hover .tiptext {
    visibility: visible;
}

.tip .tiptext img{text-align: center; padding: 0 15px 15px; border-bottom: 1px solid #E1E3E4;}
.tip .tiptext .aboutinfo{padding: 20px 15px;text-align: left;font-size: 12px;}
.tip .tiptext .aboutinfo p{color: #000;line-height: 24px;}
</style>
