<template>
  <div id="app">
    <header>
        <a href="" class="logo">
        	<img src="/../static/images/cd/console/images/LOGO.png" alt="logo">
        	<span class="logo-text">成都市信息安全公共服务平台</span>
        </a>
        <el-button type="deepblue" icon="el-icon-edit" size="small" @click="dialogEdit=true">编辑</el-button>
        <el-dropdown size="medium" class="user-info">
    		<span class="el-dropdown-link">Asiainfo<i class="el-icon-arrow-down el-icon--right"></i></span>3
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
    		 <li><a href=""><i class="el-icon-news"></i>深度威胁感知</a></li>
    		 <li><a href=""><i class="el-icon-view"></i>安全巡航视图</a></li>
    		 <li><a href=""><i class="el-icon-sort"></i>钓鱼网站监控</a></li>
    		 <li><a href=""><i class="el-icon-sold-out"></i>恶意域名监控</a></li>
    		 <li><a href=""><i class="el-icon-service"></i>威胁情报</a></li>
         <li  class="is-active"><a href=""><i class="el-icon-view"></i>网站安全监测</a></li>
    		 <li><a href=""><i class="el-icon-service"></i>资讯管理</a></li>
    	 </ul>
    </nav>
    <section class="content">


    	 <div class="container-fluid">
    		 <el-breadcrumb separator-class="el-icon-arrow-right" class="top-breadcrumb">
    			  <el-breadcrumb-item :to="{ path: '/' }">控制台</el-breadcrumb-item>
    			  <el-breadcrumb-item>网站安全监测</el-breadcrumb-item>
    		 </el-breadcrumb>
    			 <el-row :gutter="16">
    				 <el-col :span="12">
    					 <div class="el-panel">
                 <div class="el-panel-heading">
                   <h3 class="el-panel-title">篡改趋势</h3>
                   <el-tabs class="float-r day-tabs"  v-model="tamperDays" @tab-click="getTamperData">
                     <el-tab-pane label="近3月" name="90"></el-tab-pane>
        						 <el-tab-pane label="近6月" name="180"></el-tab-pane>
                     <el-tab-pane label="近1年" name="365"></el-tab-pane>
                   </el-tabs>
                 </div>
                 <div class="el-panel-body">
                   <el-select v-model="tamperParams" placeholder="所有检测网站" filterable clearable size="mini" @change="getTamperData">
                     <el-option v-for="item in tamperOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                   </el-select>
                   <div class="echartsbox3" id="line1">
                      <chart :options="option1"></chart>
                    </div>
                 </div>
    					</div>
    				 </el-col>
    				 <el-col :span="12">
               <div class="el-panel">
                  <div class="el-panel-heading">
                    <h3 class="el-panel-title">挂马趋势</h3>
                    <el-tabs class="float-r day-tabs"  v-model="horseDays" @tab-click="getHorseData">
                      <el-tab-pane label="近3月" name="90"></el-tab-pane>
                     <el-tab-pane label="近6月" name="180"></el-tab-pane>
                      <el-tab-pane label="近1年" name="365"></el-tab-pane>
                    </el-tabs>
                  </div>
                  <div class="el-panel-body">
                    <el-select v-model="horseParams" placeholder="所有检测网站" filterable clearable size="mini" @change="getTamperData">
                      <el-option v-for="item in horseOption" :key="item.value" :label="item.label" :value="item.value"></el-option>
                    </el-select>
                    <div class="echartsbox3" id="line1">
                       <chart :options="option2"></chart>
                     </div>
                  </div>
              </div>
    				 </el-col>
    			 </el-row>
           <div class="el-panel">
             <div class="el-panel-heading">
               <h3 class="el-panel-title">监测域名列表</h3>
               <div class="btn-handle">
                 <el-button type="text" size="medium" class="text-info btn-download m-r-20" @click="dialogDown=true"><i class="imgicon download-icon"></i>报告下载</el-button>
                 <el-button type="text" size="medium" class="text-info btn-domian" @click="dialogSilt2=true"><i class="imgicon domain-icon"></i>监测域名管理</el-button>
               </div>
             </div>
             <div class="el-panel-body">
               <el-collapse v-model="activeNames" @change="handleChange"  class="collapse-panel">
                 <el-collapse-item name="1">
                   <template slot="title" scope="scope">
                     <ul class="collapse-header">
                       <li class="order">1</li>
                       <li class="website">http://www.anyicx.com/</li>
                       <li class="webip">网站 IP &nbsp;: 10.36.25.11</li>
                       <li class="state text-danger"><i class="circle circle-high"></i>存在威胁：<span>5个</span></li>
                       <li style="position:absolute;right:10px;">
                           <el-button type="text" size="medium" @click="handleChange" class="text-parmiry">查看威胁历史</el-button>
                       </li>
                     </ul>
                   </template>
                   <div class="info">
                     <h4 class=""><i class="el-icon-caret-right m-r-8 text-primary">
                     </i>篡改页面</h4>
                     <div class="info-content">
                       <el-table :data="tamperListData"  style="width: 100%" class="white-table">
                         <el-table-column  prop="seradress"  label="地址"></el-table-column>
                         <el-table-column  prop="seradress"  label="篡改内容"></el-table-column>
                         <el-table-column  prop="mondomian"  label="篡改类型"></el-table-column>
                         <el-table-column  prop="distortdaddress"  label="危害"></el-table-column>
                         <el-table-column  prop="snapshot"  label="威胁快照"></el-table-column>
                         <el-table-column  prop="time"  label="检测时间"></el-table-column>
                       </el-table>
                     </div>
                   </div>
                   <div class="info">
                     <h4 class=""><i class="el-icon-caret-right m-r-8 text-primary">
                     </i>网页挂马</h4>
                     <div class="info-content">
                       <el-table :data="horseListData"  style="width: 100%" class="white-table">
                         <el-table-column  prop="seradress"  label="地址"></el-table-column>
                         <el-table-column  prop="seradress"  label="网马"></el-table-column>
                         <el-table-column  prop="mondomian"  label="网马类型"></el-table-column>
                         <el-table-column  prop="distortdaddress"  label="匹配规则"></el-table-column>
                         <el-table-column  prop="time"  label="检测时间"></el-table-column>
                       </el-table>
                     </div>
                   </div>
                   <div class="info">
                     <h4 class=""><i class="el-icon-caret-right m-r-8 text-primary">
                     </i>节点监控状态</h4>
                     <div class="info-content">
                       <el-row :gutter="16">
                         <el-col :span="6">
                           <div class="el-panel">
                              <div class="el-panel-heading">
                                <h3 class="el-panel-title" style="display:inline-block">节点监控状态</h3>
                                <el-button type="text" size="medium" @click="handleChange" class="float-r text-parmiry" style="display:inline-block;padding:5px">管理</el-button>
                              </div>
                              <div class="el-panel-body" style="height:310px">
                                <div class="" style="margin-left:30px">
                                  <i class="el-icon-success" style="color:#00FF00;font-size:20px;margin-left:20px"></i>
                                  <span style="font-size:15px;margin-top:30px;">&nbsp;检测频率：20分钟</span>
                                </div>
                                <div class="float-l" style="width:32px;height:200px;padding-top:120px;" >
                                  <el-button type="text" size="medium" @click="showLeft=false" class="text-parmiry" v-show="showLeft">
                                    <i class="el-icon-arrow-left" style="font-size:30px;"></i>
                                  </el-button>
                                </div>
                                <div class="" style="display:inline-block;width:240px;height:200px;margin-left:5px;margin-top:30px;vertical-align:top;float:float">
                                  <div class="" style="width:70px;height:70px;border:1px solid #EAEEF1;display:inline-block;margin:3px;text-align:center;padding-top:15px">
                                    <i class="el-icon-check" style="color:#00FF00;font-size:20px;"></i>
                                    <div>南京</div>
                                  </div>
                                  <div class="" style="width:70px;height:70px;border:1px solid #EAEEF1;display:inline-block;margin:3px;text-align:center;padding-top:15px">
                                    <i class="el-icon-check" style="color:#00FF00;font-size:20px;"></i>
                                    <div>南京</div>
                                  </div>
                                  <div class="" style="width:70px;height:70px;border:1px solid #EAEEF1;display:inline-block;margin:3px;text-align:center;padding-top:15px">
                                    <i class="el-icon-warning" style="color:#FF0000;font-size:20px;"></i>
                                    <div>南京</div>
                                  </div>
                                  <div class="" style="width:70px;height:70px;border:1px solid #EAEEF1;display:inline-block;margin:3px;text-align:center;padding-top:15px">
                                    <i class="el-icon-check" style="color:#00FF00;font-size:20px;"></i>
                                    <div>南京</div>
                                  </div>
                                  <div class="" style="width:70px;height:70px;border:1px solid #EAEEF1;display:inline-block;margin:3px;text-align:center;padding-top:15px">
                                    <i class="el-icon-warning" style="color:#FF0000;font-size:20px;"></i>
                                    <div>南京</div>
                                  </div>
                                  <div class="" style="width:70px;height:70px;border:1px solid #EAEEF1;display:inline-block;margin:3px;text-align:center;padding-top:15px">
                                    <i class="el-icon-warning" style="color:#FF0000;font-size:20px;"></i>
                                    <div>南京</div>
                                  </div>
                                  <div class="" style="width:70px;height:70px;border:1px solid #EAEEF1;display:inline-block;margin:3px;text-align:center;padding-top:15px">
                                    <i class="el-icon-check" style="color:#00FF00;font-size:20px;"></i>
                                    <div>南京</div>
                                  </div>
                                  <div class="" style="width:70px;height:70px;border:1px solid #EAEEF1;display:inline-block;margin:3px;text-align:center;padding-top:15px">
                                    <i class="el-icon-warning" style="color:#FF0000;font-size:20px;"></i>
                                    <div>南京</div>
                                  </div>
                                  <div class="" style="width:70px;height:70px;border:1px solid #EAEEF1;display:inline-block;margin:3px;text-align:center;padding-top:15px">
                                    <i class="el-icon-warning" style="color:#FF0000;font-size:20px;"></i>
                                    <div>南京</div>
                                  </div>
                                </div>
                                <div class="" style="display:inline-block;height:200px;margin-top:30px;padding-top:90px;vertical-align:top" v-show="showRight">
                                  <el-button type="text" size="medium" @click="showRight=false" class="text-parmiry" style="margin-top:100px;margin-top:0px">
                                    <i class="el-icon-arrow-right" style="font-size:30px;"></i>
                                  </el-button>
                                </div>
                              </div>

                          </div>
                         </el-col>
                				 <el-col :span="8">
                					 <div class="el-panel">
                             <div class="el-panel-heading">
                               <h3 class="el-panel-title">可用性占比(近1周)</h3>
                             </div>
                             <div class="el-panel-body">
                               <div class="" id="line1" style="height:280px">
                                  <chart :options="option4"></chart>
                                </div>
                             </div>
                					</div>
                				 </el-col>
                         <el-col :span="10">
                					 <div class="el-panel">
                             <div class="el-panel-heading">
                               <h3 class="el-panel-title">可用率趋势</h3>
                               <el-tabs class="float-r day-tabs"  v-model="monitorDays" @tab-click="getMonitorListData">
                                 <el-tab-pane label="近3月" name="90"></el-tab-pane>
                    						 <el-tab-pane label="近6月" name="180"></el-tab-pane>
                                 <el-tab-pane label="近1年" name="365"></el-tab-pane>
                               </el-tabs>
                             </div>
                             <div class="el-panel-body">
                               <div class="" id="line1" style="height:280px">
                                  <chart :options="option3"></chart>
                                </div>
                             </div>
                					</div>
                				 </el-col>
                			 </el-row>
                     </div>
                   </div>
                 </el-collapse-item>
                 <el-collapse-item name="2">
                   <template slot="title" scope="scope">
                     <ul class="collapse-header">
                       <li class="order">1</li>
                       <li class="website">http://www.anyicx.com/</li>
                       <li class="webip">网站 IP &nbsp;: 10.36.25.11</li>
                       <li class="state text-danger"><i class="circle circle-high"></i>存在威胁：<span>5个</span></li>
                       <li style="position:absolute;right:10px;">
                           <el-button type="text" size="medium" @click="handleChange" class="text-parmiry">查看威胁历史</el-button>
                       </li>
                     </ul>
                   </template>
                 </el-collapse-item>
                 <el-collapse-item name="3">
                   <template slot="title" scope="scope">
                     <ul class="collapse-header">
                       <li class="order">1</li>
                       <li class="website">http://www.anyicx.com/</li>
                       <li class="webip">网站 IP &nbsp;: 10.36.25.11</li>
                       <li class="state text-danger"><i class="circle circle-high"></i>存在威胁：<span>5个</span></li>
                       <li class="" style="position:absolute;right:10px;">
                           <el-button type="text" size="medium" @click="handleChange" class="text-parmiry">查看威胁历史</el-button>
                       </li>
                     </ul>
                   </template>
                 </el-collapse-item>
               </el-collapse>
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
    		  <el-button type="graywhite" class="dialog-button-padding" @click="dialogDown=false">取消</el-button>
         </div>
    	</el-dialog>
  </div>
</template>

<script type="text/javascript">
    import chart from 'components/vue-echarts/ECharts.vue'
    import {Echaroption1} from '../js/option'
    import {Echaroption2} from '../js/option'
    import {Echaroption3} from '../js/option'
    import {Echaroption4} from '../js/option'

    export default{
      components: {
        chart
      },
      data () {
        return {
          //组织id
          orgId:'',
          //全局数据获取参数
          params:{
            orgId:'',
            time:''
          },
          /*********** 篡改趋势参数 ***********/
          tamperDays:'180',
          option1:Echaroption1,
          tamperOption: [],
          tamperParams: '',
          /*********** 挂马趋势参数 ***********/
          horseDays:'180',
          option2:Echaroption2,
          horseOption: [],
          horseParams: '',
          //下载弹窗
          dialogDown:false,
          /*********** 网站检测列表 ***********/
          activeNames:'1',
          tamperListData:[],
          horseListData:[],
          monitorDays:'180',
          monitorListData:[],
          option3:Echaroption3,
          option4:Echaroption4,
          showLeft:true,
          showRight:true,

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
        //获取篡改趋势
        getTamperData(tab, event){
          if(this.tamperParams != ''){
            console.log(this.tamperParams);
          }
          var date = [];
          var textTamper = [];
          var imgTamper = [];
          var params = {
            orgId:this.orgId,
            days:this.tamperDays
          };
          this.common.req("/ssa/loophole/getLoopholeData.do",params).then(data => {
            for(var i=0;i<data.length;i++){
              date[i] = data[i].date;
            }
            //设置x轴坐标
            this.option1.xAxis.data = date;
          });
        },
        //获取篡改选项
        getTamperOption(){
          this.tamperOption = [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }]
        },
        //获取挂马趋势
        getHorseData(tab, event){
          var date = [];
          var highnum = [];
          var urgentnum = [];
          var params = {
            orgId:this.orgId,
            days:this.horseDays
          };
          this.common.req("/ssa/loophole/getLoopholeData.do",params).then(data => {
            for(var i=0;i<data.length;i++){
              date[i] = data[i].date;
            }
            //设置x轴坐标
            this.option2.xAxis.data = date;
          });
        },
        //获取挂马选项
        getHorseOption(){
          this.horseOption = [{
            value: '选项1',
            label: '黄金糕'
          }, {
            value: '选项2',
            label: '双皮奶'
          }, {
            value: '选项3',
            label: '蚵仔煎'
          }, {
            value: '选项4',
            label: '龙须面'
          }, {
            value: '选项5',
            label: '北京烤鸭'
          }]
        },
        //节点监控状态
        getMonitorListData(tab, event){
          var date = [];
          var highnum = [];
          var urgentnum = [];
          var params = {
            orgId:this.orgId,
            days:this.monitorDays
          };
          this.common.req("/ssa/loophole/getLoopholeData.do",params).then(data => {
            for(var i=0;i<data.length;i++){
              date[i] = data[i].date;
            }
            //设置x轴坐标
            this.option3.xAxis.data = date;
          });
        },


        //换页
        handleCurrentChange(pageIndex){
          this.pageIndex = pageIndex;
          this.getDetailLoopholeData();
        },
        //换一页显示的数据量
        handleSizeChange(pageSize){
          this.pageSize = pageSize;
          this.getDetailLoopholeData();
        },


        handleChange(val) {
          this.getMonitorListData();
          console.log(val);
        },


      },
      mounted: function() {
        this.getTamperData();
        this.getHorseData();
        this.getTamperOption();

      },
      created:function() {
        this.getParams();
      }

    }
</script>

<style media="screen">
   .collapse-header{
     position: relative;
   }
</style>
