<template>
  <div id="app">
    <header>
      <a href="" class="logo">
        <span class="logo-text">成都市信息安全公共服务平台</span>
      </a>
      <el-button type="deepblue" icon="el-icon-edit" size="small" @click="dialogEdit=true">编辑</el-button>
      <el-dropdown size="medium" class="user-info">
        <span class="el-dropdown-link">Asiainfo<i class="el-icon-arrow-down el-icon--right"></i></span>
        <el-dropdown-menu slot="dropdown" >
          <el-dropdown-item>修改密码</el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </header>
    <nav class="left-panel">
      <ul class="navigation">
        <li class="sy-console">控制台</li>
        <li><a href=""><i class="el-icon-menu"></i>首页</a></li>
        <li class="is-active"><a href=""><i class="el-icon-news"></i>深度威胁感知</a></li>
        <li><a href=""><i class="el-icon-view"></i>安全巡航视图</a></li>
        <li><a href=""><i class="el-icon-sort"></i>钓鱼网站监控</a></li>
        <li><a href=""><i class="el-icon-sold-out"></i>恶意域名监控</a></li>
        <li><a href=""><i class="el-icon-service"></i>威胁情报</a></li>
        <li><a href=""><i class="el-icon-service"></i>资讯管理</a></li>
      </ul>
    </nav>
    <section class="content">



      <div class="container-fluid">
        <el-breadcrumb separator-class="el-icon-arrow-right" class="top-breadcrumb">
          <el-breadcrumb-item :to="{ path: '/' }">控制台</el-breadcrumb-item>
          <el-breadcrumb-item>深度威胁检测</el-breadcrumb-item>
        </el-breadcrumb>
        <el-row :gutter="16">
          <el-col :span="12">
            <div class="el-panel">
              <div class="el-panel-heading">
                <h3 class="el-panel-title">攻击视图<span class="text-999">（近6月） </span></h3>
              </div>
              <div class="el-panel-body p-t-20">
                <el-row>
                  <el-col :span="7" class="p-l-18">
                    <div class="view">
                      <div class="view-left viewicon1"></div>
                      <div class="view-right">
                        <span class="figure">{{attackNumber}}</span>
                        <p>攻击总数</p>
                      </div>
                    </div>
                    <div class="view">
                      <div class="view-left viewicon2"></div>
                      <div class="view-right">
                        <span class="figure">{{ipNumber}}</span>
                        <p>涉及IP数</p>
                      </div>
                    </div>
                  </el-col>
                  <el-col :span="17" class="clearfloat">
                    <div class="float-l w-among echartsbox1" id="pie">
                      <chart :options="option2"></chart>
                    </div>
                    <ul class="float-l w-among ul-level">
                      <li>
                        <div class="circle circle-high"></div>
                        <label>高危</label>
                        <span style="margin: auto 10%">{{highPercent*100}}%</span>
                        <label class="float-r">{{highRisk}}个</label>
                      </li>
                      <li>
                        <div class="circle circle-medium"></div>
                        <label>中危</label>
                        <span style="margin: auto 10%">{{middlePercent*100}}%</span>
                        <label class="float-r">{{middleRisk}}个</label>
                      </li>
                      <li>
                        <div class="circle circle-low"></div>
                        <label>低危</label>
                        <span style="margin: auto 10%">{{lowPercent*100}}%</span>
                        <label class="float-r">{{lowRisk}}个</label>
                      </li>
                    </ul>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="el-panel">
              <div class="el-panel-heading">
                <h3 class="el-panel-title">攻击阶段</h3>
              </div>
              <div class="el-panel-body p-t-20">
                <ul class="ul-view m-l-30 clearfloat">
                  <li>
                    <div class="view">
                      <div class="view-left viewicon3"></div>
                      <div class="view-right">
                        <span class="figure">{{intelSpying}}</span>
                        <p>情报刺探</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="view">
                      <div class="view-left viewicon4"></div>
                      <div class="view-right">
                        <span class="figure">{{weakAttack}}</span>
                        <p>弱点攻击</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="view">
                      <div class="view-left viewicon5"></div>
                      <div class="view-right">
                        <span class="figure">{{commandControl}}</span>
                        <p>命令控制</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="view">
                      <div class="view-left viewicon6"></div>
                      <div class="view-right">
                        <span class="figure">{{osmoticInfection}}</span>
                        <p>渗透感染</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="view">
                      <div class="view-left viewicon7"></div>
                      <div class="view-right">
                        <span class="figure">{{dataExcavation}}</span>
                        <p>资料发掘</p>
                      </div>
                    </div>
                  </li>
                  <li>
                    <div class="view">
                      <div class="view-left viewicon8"></div>
                      <div class="view-right">
                        <span class="figure">{{attackSteal}}</span>
                        <p>攻击窃取</p>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </el-col>
        </el-row>
        <div class="el-panel">
          <div class="el-panel-heading">
            <h3 class="el-panel-title">攻击趋势</h3>
            <el-tabs class="float-r day-tabs"  v-model="daytabs" @tab-click="getAttackTrend">
              <el-tab-pane label="近60天" name="60"></el-tab-pane>
              <el-tab-pane label="近180天" name="180"></el-tab-pane>
            </el-tabs>
          </div>
          <div class="el-panel-body">
            <div class="echartsbox3" id="line1">
              <chart :options="option1"></chart>
            </div>
          </div>
        </div>
        <div class="el-panel">
          <div class="el-panel-heading">
            <h3 class="el-panel-title">攻击事件</h3>
            <div class="btn-handle">
              <el-button type="text" size="medium" class="text-info btn-download" @click="dialogDown=true"><i class="imgicon download-icon"></i>报告下载</el-button>
            </div>
          </div>
          <div class="el-panel-body">
            <div class="search-form">
              <!--普通搜索-->
              <div class="ordinary-search" v-show="!isMoreSearch">
                <el-form :inline="true" :model="searchParams" class="demo-form-inline setfrom">
                  <el-form-item>
                    <el-date-picker
                      v-model="searchParams.time"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      style="width:330px"
                      size="mini">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item>
                    <el-select v-model="searchParams.grade" placeholder="所有等级" style="width:145px" size="mini">
                      <el-option label="区域一" value="等级1"></el-option>
                      <el-option label="区域二" value="等级2"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-select v-model="searchParams.type" placeholder="所有类型" style="width:145px" size="mini">
                      <el-option label="区域一" value="类型1"></el-option>
                      <el-option label="区域二" value="类型2"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item><el-button type="primary" size="mini" @click="">搜索</el-button></el-form-item>
                </el-form>
                <el-button type="text" id="search-tag1" class="btn-search text-info" @click="isMoreSearch=true"><i class="imgicon search-icon"></i>高级搜索</el-button>
              </div>
              <!--高级搜索-->
              <div class="senior-search" v-show="isMoreSearch">
                <el-form :inline="true" :model="searchParams" class="demo-form-inline setfrom" >
                  <el-form-item label="发现时间">
                    <el-date-picker
                      style="width:330px"
                      v-model="searchParams.time"
                      type="daterange"
                      range-separator="至"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      size="mini">
                    </el-date-picker>
                  </el-form-item>
                  <el-form-item label="风险等级">
                    <el-select v-model="searchParams.grade" placeholder="所有等级" style="width:145px" size="mini">
                      <el-option label="区域一" value="等级1"></el-option>
                      <el-option label="区域二" value="等级2"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="威胁类型">
                    <el-select v-model="searchParams.type" placeholder="所有类型" style="width:145px" size="mini">
                      <el-option label="区域一" value="类型1"></el-option>
                      <el-option label="区域二" value="类型2"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item label="攻击IP">
                    <el-input v-model="searchParams.attackIp" placeholder="所有IP" style="width:145px" size="mini"></el-input>
                  </el-form-item>
                  <el-form-item label="目标IP">
                    <el-input v-model="searchParams.targetIp" placeholder="所有IP" style="width:145px" size="mini"></el-input>
                  </el-form-item>
                  <el-form-item label="协议">
                    <el-select v-model="searchParams.agreement" placeholder="所有协议" style="width:145px" size="mini">
                      <el-option label="区域一" value="ip1"></el-option>
                      <el-option label="区域二" value="ip2"></el-option>
                    </el-select>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" size="mini" @click="">搜索</el-button>
                  </el-form-item>
                </el-form>
                <el-button type="text" size="medium" id="search-tag2" class="btn-search text-info" @click="showLessSearch"><i class="imgicon search-icon2"></i>普通搜索</el-button>
              </div>
            </div>
            <div class="" v-if="attackEvent.length>0">
              <el-table :data="attackEvent"  style="width: 100%" class="white-table" >
                <el-table-column type="selection"></el-table-column>
                <el-table-column  prop="time"  label="发生时间" min-width="80">
                </el-table-column>
                <el-table-column  prop="level"  label="风险等级">
                  <template scope="scope">
                    <i v-if="scope.row.level==='高危'" class="circle circle-high"></i>
                    <i v-if="scope.row.level==='中危'" class="circle circle-medium"></i>
                    <i v-if="scope.row.level==='低危'" class="circle circle-low"></i>
                    <span>{{ scope.row.level}}</span>
                  </template>
                </el-table-column>
                <el-table-column  prop="type"  label="威胁类型"></el-table-column>
                <el-table-column  prop="ip1"  label="攻击IP" min-width="100"></el-table-column>
                <el-table-column  prop="ip2"  label="目标IP" min-width="100"></el-table-column>
                <el-table-column  prop="protocol"  label="协议"></el-table-column>
                <el-table-column  prop="describe"  label="描述" min-width="200" :show-overflow-tooltip="true"></el-table-column>
                <el-table-column   label="操作" width="100">
                  <template scope="scope">
                    <el-button type="text"  @click="showDetail(scope.row)" class="text-info">查看</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="pagelocation">
                <span>每页显示</span>
                <el-pagination class="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageIndex" :page-size="pageSize" :total="total" layout="sizes, prev, pager, next">
                </el-pagination>
              </div>
            </div>
            <!--表格无数据时显示-->
            <div class="wrapper-page animated fadeInDown" v-if="attackEvent.length==0">
              <div class="error-page animated flipInX">
                <img src="/../static/images/cd/console/images/nodate.png" alt="none">
                <div class="error-page-content">
                  <label class="text-999">安全状态良好，无任何攻击</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
        <el-button type="graywhite" class="dialog-button-padding">取消</el-button>
      </div>
    </el-dialog>
    <!--查看表格弹框-->
    <el-dialog title="攻击事件详情" :visible.sync="isDetail" width="50%" class="dialog-panel">
      <table class="dialog-table m-b-30" width="100%">
        <tbody>
          <tr>
            <td>事发时间：</td>
            <td>{{detailFrom.time}}</td>
          </tr>
          <tr>
            <td>风险等级：</td>
            <td>{{detailFrom.level}}</td>
          </tr>
          <tr>
            <td>威胁类型：</td>
            <td>{{detailFrom.type}}</td>
          </tr>
          <tr>
            <td>检测名称：</td>
            <td>59.192.235.16</td>
          </tr>
          <tr>
            <td>攻击IP：</td>
            <td>{{detailFrom.ip1}}</td>
          </tr>
          <tr>
            <td>攻击端口：</td>
            <td>80</td>
          </tr>
          <tr>
            <td>目标IP：</td>
            <td>{{detailFrom.ip2}}</td>
          </tr>
          <tr>
            <td>目标端口：</td>
            <td>450</td>
          </tr>
          <tr>
            <td>协议：</td>
            <td>{{detailFrom.protocol}}</td>
          </tr>
          <tr>
            <td>描述：</td>
            <td>{{detailFrom.describe}}</td>
          </tr>
        </tbody>
      </table>
    </el-dialog>
  </div>
</template>

<script type="text/javascript">
  import chart from 'components/vue-echarts/ECharts.vue'
  import {Echaroption1} from '../js/option'
  import {Echaroption2} from '../js/option'

  export default{
    components: {
      chart
    },
    data () {
      return {
        //组织id
        orgId:'',
        params:{},
        /********** 攻击视图 **********/
        attackNumber:0,
        ipNumber:0,
        option2:Echaroption2,
        highRisk:0,
        highPercent:0,
        middleRisk:0,
        middlePercent:0,
        lowRisk:0,
        lowPercent:0,
        /********** 攻击阶段 **********/
        //情报刺探
        intelSpying:0,
        //弱点攻击
        weakAttack:0,
        //命令控制
        commandControl:0,
        //渗透感染
        osmoticInfection:0,
        //数据发掘
        dataExcavation:0,
        //攻击窃取
        attackSteal:0,
        /********** 攻击趋势 **********/
        //攻击趋势天数
        daytabs:'60',
        //攻击趋势图表
        option1:Echaroption1,

        /********** 攻击事件 **********/
        //是否显示更多搜索数据
        isMoreSearch:false,
        //搜索的参数
        searchParams:{
          time:[],
          firstTime:'',
          secondTime:'',
          grade:'',
          type:'',
          attackIp:'',
          targetIp:'',
          agreement:''
        },
        //攻击事件数据
        attackEvent:[],
        //是否显示详情弹框
        isDetail:false,
        //详情弹框数据
        detailFrom:{},
        //是否显示下载报告
        dialogDown:false,
        //分页
        pageIndex:1,
        pageSize:10,
        total:0,
      }
    },
    methods: {
      //获取参数
      getParams(){
        this.orgId = 27;
        this.params = {
          orgId:this.orgId,
          time:180
        }
      },
      //获取攻击视图
      getAttackView(){
        this.attackNumber = 6299;
        this.ipNumber = 56;
        for(var i=0;i<this.option2.series[0].data.length;i++){
            this.option2.series[0].data[i].value = 27;
        }
        this.highRisk = 0;
        this.middleRisk = 0;
        this.lowRisk = 0;
        var total = (this.highRisk+this.middleRisk+this.lowRisk)==0?1:(this.highRisk+this.middleRisk+this.lowRisk);
        this.highPercent = (this.highRisk/total).toFixed(4);
        this.middlePercent = (this.middleRisk/total).toFixed(4);
        this.lowPercent = (this.lowRisk/total).toFixed(4);
      },
      //获取攻击阶段
      getAttackPhase(){
        this.intelSpying = 110;
        this.weakAttack = 119;
        this.commandControl = 120;
        this.osmoticInfection = 12306;
        this.dataExcavation = 114;
        this.attackSteal = 122;
      },
      //获取攻击趋势
      getAttackTrend(){
        var params = {
          orgId:this.orgId,
          days:this.daytabs
        }
        console.log(params);
        for(var i=0;i<this.option1.series.length;i++){
          // this.option1.series[i].data = [];
        }
      },
      //显示较少的搜索项
      showLessSearch(){
        this.isMoreSearch = false;
        this.searchParams.attackIp = '';
        this.searchParams.targetIp = '';
        this.searchParams.agreement = '';
      },
      //获取攻击事件数据
      getAttackEvent(){
        this.attackEvent = [
				  {
          id:1,
					time:'2017-11-23',
					level:'高危',
					type:'漏洞利用',
					ip1:'59.195.238.50',
					ip2:'59.63.218.12',
					protocol:'SMB',
					describe:'关于“WannaCry”勒索软件漏洞威胁',
				 },{
          id:2,
					time:'2017-11-23',
					level:'低危',
					type:'漏洞利用',
					ip1:'59.195.238.50',
					ip2:'59.63.218.12',
					protocol:'SMB',
					describe:'关于“TROJ_IFRAME.CP”木马威胁',
				 },{
          id:3,
					time:'2017-11-23',
					level:'中危',
					type:'漏洞利用',
					ip1:'59.195.238.50',
					ip2:'59.63.218.12',
					protocol:'SMB',
					describe:'关于“WORM_DOWNAD”蠕虫威胁',
				 },{
          id:4,
					time:'2017-11-23',
					level:'高危',
					type:'漏洞利用',
					ip1:'59.195.238.50',
					ip2:'59.63.218.12',
					protocol:'SMB',
					describe:'关于“PE_CORELINK.C-1”PE病毒威胁',
				 },{
          id:5,
					time:'2017-11-23',
					level:'中危',
					type:'漏洞利用',
					ip1:'59.195.238.50',
					ip2:'59.63.218.12',
					protocol:'SMB',
					describe:'关于“PE_CORELINK.C-1”PE病毒威胁',
				 },{
          id:6,
					time:'2017-11-23',
					level:'高危',
					type:'漏洞利用',
					ip1:'59.195.238.50',
					ip2:'59.63.218.12',
					protocol:'SMB',
					describe:'关于“WORM_DOWNAD”蠕虫威胁',
				 },{
          id:7,
					time:'2017-11-23',
					level:'低危',
					type:'漏洞利用',
					ip1:'59.195.238.50',
					ip2:'59.63.218.12',
					protocol:'SMB',
					describe:'关于“WORM_DOWNAD”蠕虫威胁',
				 },{
          id:8,
					time:'2017-11-23',
					level:'中危',
					type:'漏洞利用',
					ip1:'59.195.238.50',
					ip2:'59.63.218.12',
					protocol:'SMB',
					describe:'关于“WORM_DOWNAD”蠕虫威胁',
				 },{
          id:9,
					time:'2017-11-23',
					level:'高危',
					type:'漏洞利用',
					ip1:'59.195.238.50',
					ip2:'59.63.218.12',
					protocol:'SMB',
					describe:'关于“WORM_DOWNAD”蠕虫威胁',
				 },{
          id:10,
					time:'2017-11-23',
					level:'中危',
					type:'漏洞利用',
					ip1:'59.195.238.50',
					ip2:'59.63.218.12',
					protocol:'SMB',
					describe:'关于“WORM_DOWNAD”蠕虫威胁',
				 }]
      },
      //显示详情弹框
      showDetail(row){
        console.log(row);
        this.isDetail = true;
        var params = {
          attackId:row.id
        }
        //暂时数据
        this.detailFrom = row
      },
      //换一页显示的数据量
      handleSizeChange(pageSize){
        this.pageSize = pageSize;
        this.getAttackEvent();
      },
      //换页
      handleCurrentChange(pageIndex){
        this.pageIndex = pageIndex;
        this.getAttackEvent();
      },

    },
    mounted: function() {
      this.getAttackTrend();
      this.getAttackView();
      this.getAttackPhase();
      this.getAttackEvent();
    },
    created:function() {
      this.getParams();
    }

  }
</script>
