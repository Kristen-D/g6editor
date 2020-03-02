<template>
  <div id="app">
     <div class="container-fluid">
    	 <el-breadcrumb separator-class="el-icon-arrow-right" class="top-breadcrumb">
    		  <el-breadcrumb-item :to="{ path: '/' }">控制台</el-breadcrumb-item>
    		  <el-breadcrumb-item>钓鱼网站监控</el-breadcrumb-item>
    	 </el-breadcrumb>
    	 <div class="el-panel">
    		<div class="el-panel-heading">
    			<h3 class="el-panel-title">监测网站列表</h3>
    			<div class="btn-handle">
    				<el-button type="text" size="medium" class="text-info btn-download m-r-20" @click="dialogDown=true"><i class="imgicon download-icon"></i>报告下载</el-button>
    				<el-button type="text" size="medium" class="text-info btn-domian" @click="dialogSilt=true"><i class="imgicon domain-icon"></i>监测域名管理</el-button>
    			</div>
    		</div>
    		<div class="el-panel-body">
    			 <el-collapse v-model="activeNames" accordion @change="handleChange"  class="collapse-panel">
    				 <el-collapse-item :name="index+1" v-for="(item,index) in fishlist">
    					<template slot="title">
    						<ul class="collapse-header">
    							<li class="order">{{index+1}}</li>
    							<li class="website">{{item.url}}</li>
    							<li class="webip">网站IP &nbsp;: {{item.ip}}</li>
    							<li class="state text-danger" v-if="item.threat.length>0"><i class="circle circle-high"></i>存在威胁</li>
                  <li class="state text-green" v-if="!item.threat.length>0"><i class="circle circle-green"></i>状态良好</li>
    						</ul>
    					</template>
    					<el-row :gutter="140">
    						<el-col :span="12">
    							<div class="info">
    								<h4 class="info-title"><i class="el-icon-caret-right m-r-8 text-primary"></i>基础信息</h4>
    								<ul class="info-content-inner">
    									<li>
    										<label>使用域名：</label>
    										<span>{{item.url}}</span>
    									</li>
    									<li>
    										<label>检测名：</label>
    										<span>{{item.detectionName}}</span>
    									</li>
    								</ul>
    							</div>
    							<div class="info">
    								<h4 class="info-title"><i class="el-icon-caret-right m-r-8 text-primary"></i>服务器托管信息</h4>
    								<ul class="info-content-inner">
    									<li>
    										<label>IP所在地：</label>
    										<span>{{item.IP_Place}}</span>
    									</li>
    								</ul>
    							</div>
    							<div class="info">
    								<h4 class="info-title"><i class="el-icon-caret-right m-r-8 text-primary"></i>注册人信息</h4>
    								<ul class="info-content-inner">
    									<li>
    										<label>姓名：</label>
    										<span>{{item.name}}</span>
    									</li>
    									<li>
    										<label>电话：</label><span>{{item.phone}}</span></li>
    									<li>
    										<label>邮箱：</label><span>{{item.email}}</span>
    									</li>
    									<li>
    										<label>地址：</label>
    										<span>{{item.address}}</span>
    									</li>
    								</ul>
    							</div>
    							<div class="info">
    								<h4 class="info-title"><i class="el-icon-caret-right m-r-8 text-primary"></i>注册网站信息</h4>
    								<ul class="info-content-inner">
    									<li>
    										<label>注册时间：</label>
    										<span>{{item.regisTime}}</span>
    									</li>
    									<li>
    										<label>到期时间：</label>
                        <span>{{item.expiryTime}}</span>
    									</li>
    									<li>
    										<label class="w-size">最新更新时间：</label>
    										<span>{{item.updateTime}}</span>
                      </li>
    									<li>
    										<label class="w-size">代理域名注册公司：</label>
                        <span>{{item.urlRegisCom}}</span>
    									</li>
    								</ul>
    							</div>
    						</el-col>
    						<el-col :span="11">
    							<div class="scanning">
    								<div class="scanning-img"></div>
    							</div>
    							<div class="now-status text-center">当前状态：
    								 <span class="state text-danger" v-if="item.threat.length>0"><i class="circle circle-high"></i>存在威胁</span>
                     <span class="state text-green" v-if="!item.threat.length>0"><i class="circle circle-green"></i>状态良好</span>
    							</div>
    							<el-collapse v-model="activeIndex" accordion @change="handleChange" class="inner-collpanel">
    								<el-collapse-item :name="index+1" v-for="(item,index) in item.threat">
    									<template slot="title">
    										<h4 class="text-danger"><i class="el-icon-caret-right m-r-8 text-primary"></i>
    										<label class="m-r-20">威胁来源 {{index+1}}:</label><span>{{item.threatSrc}}</span></h4>
    									</template>
    									<table class="col-table" width="100%">
    										<tbody>
    										  <tr>
    											  <td>威胁类型：</td>
    											  <td>{{item.threatType}}</td>
    										  </tr>
    										  <tr>
    											  <td>使用域名：</td>
    											  <td>{{item.domainName}}</td>
    										  </tr>
    										  <tr>
    											  <td>检查名：</td>
    											  <td>{{item.checkName}}</td>
    										  </tr>
    										  <tr>
    											  <td>服务器所在地：</td>
    											  <td>{{item.serverPlace}}</td>
    										  </tr>
    										  <tr>
    											  <td>注册人：</td>
    											  <td>{{item.registrant}}</td>
    										  </tr>
    										  <tr>
    											  <td>注册地址：</td>
    											  <td>{{item.regisAddress}}</td>
    										  </tr>
    										  <tr>
    											  <td>注册人电话：</td>
    											  <td>{{item.regisPhone}}</td>
    										  </tr>
    										  <tr>
    											  <td>注册人邮箱：</td>
    											  <td>{{item.regisEmail}}</td>
    										  </tr>
    										  <tr>
    											  <td>IP地址：</td>
    											  <td>{{item.IpPlace}}</td>
    										  </tr>
    										  <tr>
    											  <td>域名注册时间：</td>
    											  <td>{{item.regisTime}}</td>
    										  </tr>
    										  <tr>
    											  <td>域名到期时间：</td>
    											  <td>{{item.expiryTime}}</td>
    										  </tr>
    										  <tr>
    											  <td>域名更新时间：</td>
    											  <td>{{item.updateTime}}</td>
    										  </tr>
    										</tbody>
    									 </table>
    								</el-collapse-item>
    							</el-collapse>
    						</el-col>
    					</el-row>
    				 </el-collapse-item>
    			 </el-collapse>
    		</div>
    	</div>
    </div>
  	<!--下载弹框-->
  	<el-dialog title="报告下载" :visible.sync="dialogDown" width="30%" class="dialog-panel">
  	     <div class="p-l-18">
  	   		 <h4>请选择下载类型：</h4>
  	   		 <el-radio-group v-model="radiofile" class="down-filetype">
  				 <el-radio :label="1">Word模板.doc</el-radio>
  				 <el-radio :label="2">Excel模板.xsls</el-radio>
  				 <el-radio :label="3">Pdf模板.pdf</el-radio>
  			 </el-radio-group>
  	     </div>
  	     <div slot="footer" class="dialog-footer">
  			  <el-button type="primary" class="dialog-button-padding">下载</el-button>
  			  <el-button type="graywhite" @click="dialogDown=false" class="dialog-button-padding">取消</el-button>
  	     </div>
  	</el-dialog>
  	<!--站点管理弹框-->
  	<el-dialog title="监测站点管理" :visible.sync="dialogSilt" class="dialog-panel dialog-size1">
      <div class="dialog-addweb">
        <el-button type="text" class="text-primary" @click="dialogAdd=true"><i class="el-icon-plus m-r-8" style="font-weight: bold"></i>添加网站</el-button>
      </div>
  	   <div class="dialog-header">
  		   <ul class="dialog-header-inner">
  			   <li class="domain">域名名称</li>
  			   <li class="ipadr">IP地址</li>
  			   <li class="adr">所在地</li>
  			   <li class="op">操作</li>
  		   </ul>
  	   </div>
  	   <el-collapse v-model="dilogcollapse" accordion @change="handleChange"  class="dialog-collapse-panel">
  			 <el-collapse-item :name="index+1" v-for="(item,index) in fishlist">
  				<template slot="title">
  					<ul class="dialog-collapse-header">
  						<li class="website">{{item.url}}</li>
  						<li class="webip">{{item.ip}}</li>
  						<li class="adress"><!-- {{item.address.substr(0,5)}} --></li>
  						<li class="operate">
  							<el-button type="text" @click="editFish" size="medium" class="text-parmiry">编辑</el-button>
  							<el-button type="text" @click="delectFish" size="medium" class="text-parmiry">删除</el-button>
  						</li>
  					</ul>
  				</template>
  				<div class="dialog-collapse-content">
  					 <table class="col-table" width="100%">
  						<tbody>
  						  <tr>
  							  <td>检查名：</td>
  							  <td>{{item.detectionName}}</td>
  						  </tr>
  						  <tr>
                  <!-- 这个是什么鬼！！！ -->
  							  <td>服务器所在地：</td>
  							  <td>{{item.IP_Place}}</td>
  						  </tr>
  						  <tr>
  							  <td>注册人：</td>
  							  <td>HUANG MAKE</td>
  						  </tr>
  						  <tr>
  							  <td>注册地址：</td>
  							  <td>福建省福州市鼓楼区五一北路106号新侨联A座1001</td>
  						  </tr>
  						  <tr>
  							  <td>注册人电话：</td>
  							  <td>19936362653</td>
  						  </tr>
  						  <tr>
  							  <td>域名注册时间：</td>
  							  <td>2016-02-03</td>
  						  </tr>
  						  <tr>
  							  <td>域名到期时间：</td>
  							  <td>2016-02-03</td>
  						  </tr>
  						  <tr>
  							  <td>域最新更新时间：</td>
  							  <td>2016-02-03</td>
  						  </tr>
  						</tbody>
  					 </table>
  				</div>
  			 </el-collapse-item>
  	   </el-collapse>
  	</el-dialog>

  	<!--子弹窗：增加站点-->
  	<el-dialog title="监测站点管理" :visible.sync="dialogAdd" width="32%" class="dialog-panel">
      <el-breadcrumb separator-class="el-icon-arrow-right" class="dialog-breadcrumb">
        <el-breadcrumb-item :to="{ path: '/' }">站点列表</el-breadcrumb-item>
        <el-breadcrumb-item>添加网站</el-breadcrumb-item>
      </el-breadcrumb>
      <el-form  ref="addFishFrom" :model="addFishFrom" :rules="rules" label-width="85px" label-position="left" class="dialog-from">
        <el-form-item label="网站名称">
          <el-input v-model="addFishFrom.name" placeholder="请输入网站名称"></el-input>
        </el-form-item>
        <el-form-item label="服务器所在地">
          <el-input v-model="addFishFrom.name" placeholder="请输入所在地"></el-input>
        </el-form-item>
        <el-form-item label="IP地址">
          <el-input v-model="addFishFrom.name" placeholder="请输入IP地址"></el-input>
        </el-form-item>
        <el-form-item label="检查名">
          <el-input v-model="addFishFrom.name" placeholder="请输入检查名"></el-input>
        </el-form-item>
        <el-form-item label="注册人">
          <el-input v-model="addFishFrom.name" placeholder="请输入注册人"></el-input>
        </el-form-item>
        <el-form-item label="注册地址">
          <el-input v-model="addFishFrom.name" placeholder="请输入注册地址"></el-input>
        </el-form-item>
        <el-form-item label="注册电话">
          <el-input v-model="addFishFrom.name" placeholder="请输入注册人电话"></el-input>
        </el-form-item>
        <el-form-item label="注册邮箱" prop="email">
          <el-input v-model="addFishFrom.email" placeholder="请输入注册人邮箱"></el-input>
        </el-form-item>
        <el-form-item label="域名注册时间">
          <el-input v-model="addFishFrom.name" placeholder="请输入注册时间"></el-input>
        </el-form-item>
        <el-form-item label="域名到期时间">
          <el-input v-model="addFishFrom.name" placeholder="请输入到期时间"></el-input>
        </el-form-item>
        <el-form-item label="最新更新时间">
          <el-input v-model="addFishFrom.name" placeholder="请输入最新更新时间"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addFish" class="dialog-button-padding">保存</el-button>
        <el-button type="graywhite" @click="cancleAdd" class="dialog-button-padding">取消</el-button>
      </div>
  	</el-dialog>

  </div>
</template>

<script type="text/javascript">
  export default{
    data () {
      return {
        //组织id
        orgId:'',
        params:{},
        //显示报告下载
        dialogDown:false,
        //显示检测域名管理
        dialogSilt:false,
        //折叠面板
        activeNames: [],
        activeIndex:[],
        //钓鱼列表
        fishlist:[],
        //增加网站
        dialogAdd:false,
        addFishFrom:{},
        //选择模板
        radiofile:1,
        rules:{
          //邮箱校验
          email: [
            { validator:(rule, value, callback)=>{
                if(value==null||value==''){
                  callback(new Error('请输入邮箱'))
                }else if(!/[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/.test(value)){
                  callback(new Error('邮箱格式错误'))
                }else {
                  callback()
                }
            }, trigger:'blur' }
          ],
        },



      }
    },
    methods: {
      //获取组织参数
      getParams(){
        //获取组织id
        this.orgId = 27;
        //设置全局参数
        this.params = {
          orgId:this.orgId,
          time:''
        }
      },
      //折叠面板方法
      handleChange(val) {
        console.log(val);
      },
      //获取钓鱼列表
      getFishList(){
        this.common.req("/ssa/fish/getFishList.do",this.params).then(data => {
          console.log(data);
          this.fishlist = data;
        })
        // this.fishlist = [{
        //   url:'http://www.anyicx.com/',
        //   ip:'10.36.25.11',
        //   detectionName:'unknown',
        //   IP_Place:"葬爱家族大本营",
        //   name:'葬爱家族',
        //   phone:'买不起手机',
        //   email:'手机都没有还想要邮箱？',
        //   address:'福建省福州市鼓楼区XX拘留所',
        //   regisTime:'2017-11-23  02:58:56',
        //   expiryTime:'2017-11-23  02:58:56',
        //   updateTime:'2017-11-23  02:58:56',
        //   urlRegisCom:'F1G1NS1.DNSPOD.NET||F1G1NS2.DNSPOD.NET',
        //   threat:[{
        //     threatSrc:'www.jdkfjldf.com',
        //     threatType:'钓鱼盗号',
        //     domainName:'WWW.KDJFLSJ.COM',
        //     checkName:'NUKNOW',
        //     serverPlace:'美国 纽约',
        //     registrant:'HUANG MAKE',
        //     regisAddress:'福建省福州市鼓楼区五一北路106号新侨联A座1001',
        //     regisPhone:'19936362653',
        //     IpPlace:'101.23.25.111',
        //     regisTime:'2016-02-03',
        //     expiryTime:'2016-02-03',
        //     updateTime:'2016-02-03'
        //   },{
        //     threatSrc:'www.jdkfjldf.com',
        //     threatType:'钓鱼盗号',
        //     domainName:'WWW.KDJFLSJ.COM',
        //     checkName:'NUKNOW',
        //     serverPlace:'美国 纽约',
        //     registrant:'HUANG MAKE',
        //     regisAddress:'福建省福州市鼓楼区五一北路106号新侨联A座1001',
        //     regisPhone:'19936362653',
        //     IpPlace:'101.23.25.111',
        //     regisTime:'2016-02-03',
        //     expiryTime:'2016-02-03',
        //     updateTime:'2016-02-03'
        //   }],
        // }]

      },
      //取消增加网站
      cancleAdd(){
        //清空
        this.addFishFrom = {};
        this.dialogAdd = false;
      },
      //编辑钓鱼数据
      editFish(){

      },
      //新增网站
      addFish(){

      },
      //删除钓鱼数据
      delectFish(){
        this.$confirm('此操作将删除, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      },



    },
    mounted: function() {
      //获取钓鱼列表
      this.getFishList();
    },
    created:function() {
      this.getParams();
    }

  }
</script>
