<template>
  <section class="schedule-container">
	  <div class="schedule-evneName categories-position1">预警响应</div>
	  <div class="schedule-evneName categories-position2">应急响应</div>
	  <div class="schedule-content">
	      <div class="schedule-topcontent">
			   <div class="stage-I" :style="{color:dispatchConfig.startColor}">
                    <div class="start" @click="start">开始
                        <span style='font-size:13px'>{{this.startTimeStr}}</span>
                    </div>
					<h4 class="stage-title"><i class="icon-fa-monitor"></i> 监测报告</h4>
					<ul class="stage-I-content">
						<li :style="{color:dispatchConfig.relevantDepartmentColor}" @click="toggle(1,'relevantDepartmentColor','blue')"><i class="el-icon-circle-check"></i>相关单位</li>
						<li :style="{color:dispatchConfig.securityMonitorColor}" @click="toggle(1,'securityMonitorColor','blue')"><i class="el-icon-circle-check"></i>安全检测系统</li>
						<li :style="{color:dispatchConfig.securityEventColor}" @click="toggle(1,'securityEventColor','blue')"><i class="el-icon-circle-check"></i>网络与信息安全事件</li>
					</ul>
			   </div>
			   <div class="shortline slt-position1">
                    <hr :style="{borderTopColor:dispatchConfig.startColor}">
                    <span class="triangle" :style="{borderLeftColor:dispatchConfig.startColor}"></span>
               </div>

			   <div class="stage-II" :style="{color:dispatchConfig.warningApproveColor}">
					<h4 class="stage-title"><i class="icon-fa-seal"></i>预警响应审批</h4>
					<ul class="stage-II-content">
						<li @click="warningApprove('Y')">
                            <i class="icon-fa-passed" :style="{color:dispatchConfig.warningApproveYColor}"></i>
                            <label :style="{color:dispatchConfig.warningApproveYColor}" >通过</label>
                        </li>
						<li  @click="warningApprove('N')">
                            <i class="icon-fa-unpassed" :style="{color:dispatchConfig.warningApproveNColor}"></i>
                            <label :style="{color:dispatchConfig.warningApproveNColor}">不通过</label>
                        </li>
					</ul>
			   </div>
			   <div class="shortline slt-position2" style="width:80px; margin-left:0px;">
                    <hr :style="{borderTopColor:dispatchConfig.warningApproveYColor}">
                    <span class="triangle" :style="{borderLeftColor:dispatchConfig.warningApproveYColor}"></span>
                </div>

			   <div class="stage-III">
					<div class="box">
							<span class="box-tl"></span>
							<span class="box-br"></span>
							<div class="box-inner">
								 <h3 class="stage-boxtitle" :style="{color:dispatchConfig.warningLevelColor}">预警响应分级</h3>
								 <ul class="stage-III-content">
									<li @click="warningLevelChange('yellow')">
                                        <i class="icon-fa-lightning" :style="{color:dispatchConfig.warningLevelYellowColor}"></i>
                                        <label :style="{color:dispatchConfig.warningLevelYellowColor}">黄</label>
                                    </li>
									<li @click="warningLevelChange('orange')">
                                        <i class="icon-fa-lightning" :style="{color:dispatchConfig.warningLevelOrangeColor}"></i>
                                        <label :style="{color:dispatchConfig.warningLevelOrangeColor}">橙</label>
                                    </li>
									<li @click="warningLevelChange('red')">
                                        <i class="icon-fa-lightning" :style="{color:dispatchConfig.warningLevelRedColor}"></i>
                                        <label :style="{color:dispatchConfig.warningLevelRedColor}">红</label>
                                    </li>
								</ul>
							</div>
					</div>
					<div class="icon-time"><i class="el-icon-time"></i></div>
			   </div>
			   <div class="shortline slt-position3">
                    <hr :style="{borderTopColor:dispatchConfig.warningLevelColor}">
                    <span class="triangle" :style="{borderLeftColor:dispatchConfig.warningLevelColor}"></span>
                </div>

			   <div class="stage-IV" :style="{color:dispatchConfig.emergencyApproveColor}">
					<h4 class="stage-title"><i class="icon-fa-seal"></i>应急响应审批</h4>
					<ul class="stage-IV-content">
						<li  @click="emergencyApprove('Y')">
                            <i class="icon-fa-passed" :style="{color:dispatchConfig.emergencyApproveYColor}"></i>
                            <label :style="{color:dispatchConfig.emergencyApproveYColor}">通过</label>
                        </li>
						<li  @click="emergencyApprove('N')">
                            <i class="icon-fa-unpassed" :style="{color:dispatchConfig.emergencyApproveNColor}"></i>
                            <label :style="{color:dispatchConfig.emergencyApproveNColor}">不通过</label>
                        </li>
					</ul>
				</div>
			   <div class="shortline slt-position4">
                    <hr :style="{borderTopColor:dispatchConfig.warningApproveNColor||dispatchConfig.emergencyApproveNColor}">
                    <span class="triangle" :style="{borderLeftColor:dispatchConfig.warningApproveNColor||dispatchConfig.emergencyApproveNColor}"></span>
                </div>

			   <div class="stage-V" :style="{color:dispatchConfig.warningEndColor}">
					<h4 class="stage-title" @click="warningEnd('warningEndColor')"><i class="icon-fa-frame-end"></i> 预警响应结束</h4>
					<ul class="stage-V-content">
						<li :style="{color:dispatchConfig.warningDismissColor}" @click="warningEnd('warningDismissColor')"><i class="el-icon-circle-check"></i>解除预警</li>
						<li :style="{color:dispatchConfig.warningArchiveColor}" @click="warningEnd('warningArchiveColor')"><i class="el-icon-circle-check"></i>预警归档</li>
					</ul>
			   </div>
	     </div>

		  <div class="longline1">
			 <div class="left" :style="{borderLeftColor:dispatchConfig.warningApproveNColor,borderBottomColor:dispatchConfig.warningApproveNColor}"></div>
			 <div class="right" :style="{borderLeftColor:dispatchConfig.warningApproveNColor}">
                <div class="triangle-up" :style="{borderBottomColor:dispatchConfig.warningApproveNColor}"></div>
            </div>
  		 </div>
		  <div class="longline2">
		      <div class="left" :style="{borderLeftColor:dispatchConfig.emergencyApproveYColor}">
                    <div class="triangle-down" :style="{borderBottomColor:dispatchConfig.emergencyApproveYColor}"></div>
              </div>
			  <div class="right" :style="{borderRightColor:dispatchConfig.emergencyApproveYColor,borderBottomColor:dispatchConfig.emergencyApproveYColor}"></div>
		  </div>

		 <!--下半部分-->
		<div class="schedule-bottomcontent">
			 <div class="stage-VI">
			  	<h4 class="stage-title" :style="{color:dispatchConfig.infoReportColor}" @click="infoReport"><i class="icon-fa-frame2"></i> 信息报告</h4>
			  	<ul class="stage-VI-content">
					<li :style="{color:dispatchConfig.departmentInfoUploadColor}" @click="toggle(6,'departmentInfoUploadColor')"><span class="line"></span>部门信息报告上传</li>
					<li :style="{color:dispatchConfig.orgInfoUploadColor}" @click="toggle(6,'orgInfoUploadColor')"><span class="line"><div></div></span>机构信息报告上传</li>
					<li :style="{color:dispatchConfig.reportToGovernmentColor}" @click="toggle(6,'reportToGovernmentColor')"><span class="line"><div></div></span>上报市政府</li>
					<li :style="{color:dispatchConfig.reportToHeadQuarterColor}" @click="toggle(6,'reportToHeadQuarterColor')"><span class="line"></span>上报指挥部</li>
			  	</ul>
		     </div>
		     <div class="shortline slb-position1">
                <hr :style="{borderTopColor:dispatchConfig.infoReportColor}">
                <span class="triangle" :style="{borderLeftColor:dispatchConfig.infoReportColor}"></span>
            </div>

		     <div class="stage-VII" :style="{color:dispatchConfig.earlyDealingColor}">
			  	<h4 class="stage-title"  @click="earlyDealing"><i class="icon-fa-cirle-handle1"></i> 先期处置</h4>
				<p class="stage-VII-content" :style="{color:dispatchConfig.earlyDealingColor}">上传先期处置报告</p>
		   </div>
		     <div class="shortline slb-position2">
                <hr :style="{borderTopColor:dispatchConfig.earlyDealingColor}">
                <span class="triangle" :style="{borderLeftColor:dispatchConfig.earlyDealingColor}"></span>
            </div>

		     <div class="stage-VIII">
			  	<h4 class="stage-title"  :style="{color:dispatchConfig.baseResponseColor}" @click="baseResponse"><i class="icon-fa-response"></i> 基本响应</h4>
			  	<ul class="stage-VIII-content">
			  	  	<li :style="{color:dispatchConfig.memberColor}" @click="toggle(8,'memberColor')"><i class="el-icon-circle-check"></i>成员单位</li>
			  	  	<li :style="{color:dispatchConfig.expertColor}" @click="toggle(8,'expertColor')"><i class="el-icon-circle-check"></i>专家顾问组</li>
			  	  	<li :style="{color:dispatchConfig.talentPoolColor}" @click="toggle(8,'talentPoolColor')"><i class="el-icon-circle-check"></i>人才库专家</li>
			  	  	<li :style="{color:dispatchConfig.fieldManagerColor}" @click="toggle(8,'fieldManagerColor')"><i class="el-icon-circle-check"></i>成立现场指挥部</li>
			  	  	<li :style="{color:dispatchConfig.publishWarningColor}" @click="toggle(8,'publishWarningColor')"><i class="el-icon-circle-check"></i>发布预警信息</li>
			  	  	<li :style="{color:dispatchConfig.professionalManColor}" @click="toggle(8,'professionalManColor')"><i class="el-icon-circle-check"></i>专业技术人员</li>
					<li :style="{color:dispatchConfig.professionalTeamColor}" @click="toggle(8,'professionalTeamColor')"><i class="el-icon-circle-check"></i>专业应急处置队伍</li>
			  	</ul>
		   </div>
		     <div class="shortline slb-position3">
                <hr :style="{borderTopColor:dispatchConfig.baseResponseColor}">
                <span class="triangle" :style="{borderLeftColor:dispatchConfig.baseResponseColor}"></span>
            </div>

		     <div class="stage-IX">
		        <div class="box box2">
					<span class="box-tl"></span>
					<span class="box-br"></span>
					<div class="box-inner">
						<h3 class="stage-boxtitle" :style="{color:dispatchConfig.emergencyLevelColor}">应急响应分级</h3>
						<ul class="stage-IX-level">
							<li class="" :style="{backgroundColor:dispatchConfig.emergencyLevel1Color}" @click="emergencyLevelChange(1)">一级</li>
							<li class="" :style="{backgroundColor:dispatchConfig.emergencyLevel2Color}" @click="emergencyLevelChange(2)">二级</li>
							<li class="" :style="{backgroundColor:dispatchConfig.emergencyLevel3Color}" @click="emergencyLevelChange(3)">三级</li>
							<li class="" :style="{backgroundColor:dispatchConfig.emergencyLevel4Color}" @click="emergencyLevelChange(4)">四级</li>
						</ul>
						<div class="stage-IX-content">
							 <div class="stage-IX-content1 boxwrap clearfloat" :style="{color:dispatchConfig.emergencySuggestColor}" @click="emergencyProcess(1)">
								 <div class="left"><i class="icon-fa-frame-more"></i> </div>
								 <div class="right"><span>建议</span><span>指挥部办公室</span></div>
							 </div>
							 <div class="IXline IXline-positon1"><hr><span class="triangle"></span></div>
							 <div class="stage-IX-content2 boxwrap clearfloat" :style="{color:dispatchConfig.emergencyExamineColor}" @click="emergencyProcess(2)">
								 <div class="left"><i class="icon-fa-seal"></i> </div>
								 <div class="right"><span>审批</span><span>指挥部总指挥</span></div>
							 </div>
							 <div class="IXline IXline-positon2 vertical-line"><hr><span class="triangle"></span></div>
							 <div class="stage-IX-content3 boxwrap clearfloat" :style="{color:dispatchConfig.emergencyStartColor}" @click="emergencyProcess(3)">
								 <div class="left"><i class="icon-fa-pulse-on"></i> </div>
								 <div class="right"><span>启动</span><span>指挥部总指挥</span></div>
							 </div>
							 <div class="IXline IXline-positon3"><hr><span class="triangle"></span></div>

							  <div class="stage-IX-content4 boxwrap clearfloat" :style="{color:dispatchConfig.emergencyEstablishColor}" @click="emergencyProcess(4)">
								 <div class="left"><i class="icon-fa-flag"></i> </div>
								 <div class="right"><span>成立</span><span>指挥部办公室</span></div>
							 </div>
							 <div class="IXline IXline-positon4 vertical-line"><hr><span class="triangle"></span></div>

							 <div class="stage-IX-content5 boxwrap clearfloat" :style="{color:dispatchConfig.emergencyEndColor}" @click="emergencyProcess(5)">
								 <div class="left"><i class="icon-fa-frame-end"></i> </div>
								 <div class="right">
									 <span>结束</span>
									 <span>指挥部办公室</span>
								 </div>
							 </div>

						</div>
				   </div>
				</div>
		   		<div class="icon-time"><i class="el-icon-time"></i></div>
		   </div>
		     <div class="shortline slb-position4">
                <hr :style="{borderTopColor:dispatchConfig.emergencyLevelColor}">
                <span class="triangle" :style="{borderLeftColor:dispatchConfig.emergencyLevelColor}"></span>
            </div>

		     <div class="stage-X">
                <div class="start" :style="{color:dispatchConfig.laterDealingColor}" @click='laterDealing'>结束</div>
			  	<h4 class="stage-title" :style="{color:dispatchConfig.laterDealingColor}" @click='laterDealing'><i class="icon-fa-cirle-handle2"></i>后期处置</h4>
			  	<ul class="stage-X-content">
			  	  	<li :style="{color:dispatchConfig.summaryColor}" @click="toggle(10,'summaryColor')"><i class="el-icon-circle-check"></i>事件总结</li>
			  	  	<li :style="{color:dispatchConfig.commendColor}" @click="toggle(10,'commendColor')"><i class="el-icon-circle-check"></i>表彰</li>
			  	  	<li :style="{color:dispatchConfig.punishColor}" @click="toggle(10,'punishColor')"><i class="el-icon-circle-check"></i>惩处</li>
			  	</ul>
		   </div>
		</div>

     </div><!--schedule-content  end-->
     <el-popover ref="popover2" placement="top" width="400" trigger="click">
        <el-form  :model="dispatchConfig" ref="dispatchConfig">
            <el-select v-model="dispatchConfig.id" placeholder="请选择" @change="changeProcess">
                <el-option
                v-for="item in dispatchList"
                :key="item.id"
                :label="item.id+' '+item.name"
                :value="item.id">
                </el-option>
            </el-select>
            <el-button @click="newDispatchProcess">新流程</el-button>
        </el-form>
    </el-popover>
	  <el-button class="export-button" v-if="dispatchConfig.report==true"><i class="ion-arrow-right-a"></i>导出报告</el-button>
      <el-button   class="export-button"  v-popover:popover2><i class="ion-arrow-right-a"></i>流程编号：{{this.dispatchConfig.id}}</el-button>
  </section>
</template>
<script>
import {mapActions,mapState} from 'vuex'
import commonAjax from 'components/js/common.js'

export default{
    data(){
        return {
            dispatchList:''
        }
    },
    computed:{
            ...mapState({
                dispatchConfig:state=>state.context.dispatchConfig
            }),
            startTimeStr:function(){
                console.log(this.dispatchConfig.startDate1)
                var d = new Date(this.dispatchConfig.startDate1);
                var str=d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
                var hour=d.getHours()
                var sHour = hour < 10 ? "0" + hour : hour;
                var min=d.getMinutes()
                var sMin = min < 10 ? "0" + min : min;
                str+=' '+sHour+':'+sMin
                return str
            }
    },
    methods:{
        ...mapActions({
                setDispatchConfig:'setDispatchConfig',
                initDispatchConfig:'initDispatchConfig'
        }),
        updateRecord:function(){
            var params={};
            params.name=this.dispatchConfig.title
            params.config=JSON.stringify(this.dispatchConfig)
            params.id=this.dispatchConfig.id
            console.log(params.config)
            commonAjax.req('/ssa/dispatchCenter/updateRecord.do',params).then((data)=>{
                console.log(data)
            })
        },
        warningApprove:function(val){
            var stage=this.dispatchConfig.currentStage;
            if(stage<1||(stage>2&&stage!=5)||(stage==5&&this.dispatchConfig.warningLevelColor!=''))
                return;
            this.dispatchConfig.currentStage=2
            this.dispatchConfig.warningApproveColor='blue'
            if(val=='Y'){
                this.dispatchConfig.warningApproveYColor='blue'
                this.dispatchConfig.warningApproveNColor=''
                this.dispatchConfig.currentStage=2
                this.dispatchConfig.warningEndColor=''
                this.dispatchConfig.warningDismissColor=''
                this.dispatchConfig.warningArchiveColor=''
            }else if(val=='N'){
                this.dispatchConfig.warningApproveYColor=''
                this.dispatchConfig.warningApproveNColor='blue'
                this.dispatchConfig.currentStage=5
            }
            this.updateRecord()

        },
        warningLevelChange:function(color){
            if(this.dispatchConfig.currentStage<2||(this.dispatchConfig.currentStage==2&&this.dispatchConfig.warningApproveYColor=='')||(this.dispatchConfig.currentStage==5&&this.dispatchConfig.emergencyApproveNColor==''))
                return;
            if( this.dispatchConfig.currentStage==2)
                this.dispatchConfig.currentStage=3;
            var lastColor=this.dispatchConfig.warningLevelColor;
            if(lastColor==''){
                lastColor='blue';
            }
            this.dispatchConfig.warningLevelColor=color
            this.dispatchConfig.warningLevelYellowColor=''
            this.dispatchConfig.warningLevelOrangeColor=''
            this.dispatchConfig.warningLevelRedColor=''
            if(color==='yellow'){
                this.dispatchConfig.warningLevelYellowColor=color
            }else if(color==='orange'){
                this.dispatchConfig.warningLevelOrangeColor=color
            }else if(color==='red'){
                this.dispatchConfig.warningLevelRedColor=color
            }
            //修改所有阶段颜色
            for(var item in this.dispatchConfig){
                if(this.dispatchConfig[item]==lastColor){
                    this.dispatchConfig[item]=color
                }
            }
            this.updateRecord()

        },
        emergencyApprove:function(val){
            if(this.dispatchConfig.currentStage<3||this.dispatchConfig.currentStage>5)
                return;
            this.dispatchConfig.currentStage=4
            this.dispatchConfig.emergencyApproveColor=this.dispatchConfig.warningLevelColor;
            if(val=='Y'){
                this.dispatchConfig.emergencyApproveNColor=''
                this.dispatchConfig.emergencyApproveYColor=this.dispatchConfig.warningLevelColor;
                this.dispatchConfig.currentStage=4
                this.dispatchConfig.warningEndColor=''
                this.dispatchConfig.warningDismissColor=''
                this.dispatchConfig.warningArchiveColor=''
            }else if(val=='N'){
                this.dispatchConfig.emergencyApproveYColor=''
                this.dispatchConfig.emergencyApproveNColor=this.dispatchConfig.warningLevelColor;
                this.dispatchConfig.currentStage=5
            }
            this.updateRecord()
        },
        infoReport:function(){
            if(this.dispatchConfig.currentStage<4||(this.dispatchConfig.currentStage==4&&this.dispatchConfig.emergencyApproveYColor==''))
                return;
            this.dispatchConfig.currentStage=6
            this.dispatchConfig.infoReportColor=this.dispatchConfig.warningLevelColor
            this.updateRecord()
        },
        earlyDealing:function(){
            if(this.dispatchConfig.currentStage!=6)
                return
            this.dispatchConfig.currentStage=7
            this.dispatchConfig.earlyDealingColor=this.dispatchConfig.warningLevelColor
            this.updateRecord()
        },
        baseResponse:function(){
            if(this.dispatchConfig.currentStage!=7)
                return
            this.dispatchConfig.currentStage=8
            this.dispatchConfig.baseResponseColor=this.dispatchConfig.warningLevelColor
            this.updateRecord()
        },
        warningEnd:function(name){
            if(this.dispatchConfig.currentStage!=5)
                return
            var color='blue'
            if(this.dispatchConfig.warningLevelColor!='')
                color=this.dispatchConfig.warningLevelColor
            this.dispatchConfig[name]=color
            this.updateRecord()
        },
        emergencyLevelChange:function(val){
            if(this.dispatchConfig.currentStage<8||this.dispatchConfig.currentStage>9)
                return
            this.dispatchConfig.currentStage=9
            this.dispatchConfig.emergencyLevelColor=this.dispatchConfig.warningLevelColor
            this.dispatchConfig.emergencyLevel1Color=''
            this.dispatchConfig.emergencyLevel2Color=''
            this.dispatchConfig.emergencyLevel3Color=''
            this.dispatchConfig.emergencyLevel4Color=''
            switch(val){
                case 1:this.dispatchConfig.emergencyLevel1Color=this.dispatchConfig.warningLevelColor
                    break;
                case 2:this.dispatchConfig.emergencyLevel2Color=this.dispatchConfig.warningLevelColor
                    break;
                case 3:this.dispatchConfig.emergencyLevel3Color=this.dispatchConfig.warningLevelColor
                    break;
                case 4:this.dispatchConfig.emergencyLevel4Color=this.dispatchConfig.warningLevelColor
                    break;
            }
            this.updateRecord()
        },
        laterDealing:function(){
            if(this.dispatchConfig.currentStage!=9)
                return
            this.dispatchConfig.currentStage=10
            this.dispatchConfig.laterDealingColor=this.dispatchConfig.warningLevelColor
            this.dispatchConfig.endTime=new Date().getTime()
            this.updateRecord()
        },
        toggle:function(stage,name,color){
            if(this.dispatchConfig.currentStage==stage){
                if(this.dispatchConfig[name]==''){
                    var c= color||this.dispatchConfig.warningLevelColor
                    this.dispatchConfig[name]=c
                }else{
                    this.dispatchConfig[name]=''
                }
            }
            console.log(this.dispatchConfig.currentStage + ' '+ stage+' '+this.dispatchConfig[name])
            this.updateRecord()
        },
        emergencyProcess:function(step){
            if(this.dispatchConfig.currentStage!=9)
                return;
            var steps=['emergencySuggestColor','emergencyExamineColor','emergencyStartColor','emergencyEstablishColor','emergencyEndColor']
            for(var item of steps){
                this.dispatchConfig[item]=''
            }
            for(var i=0;i<step;i++){
                var name=steps[i]
                this.dispatchConfig[name]=this.dispatchConfig.warningLevelColor
            }
            this.updateRecord()
        },
        start:function(){
            if(this.dispatchConfig.currentStage!=0)
                return
            this.dispatchConfig.currentStage=1
            this.dispatchConfig.startColor='blue'
            //this.dispatchConfig.startDate1=new Date()
            this.dispatchConfig.timerStart=true
            this.updateRecord()
        },
        getDispatchList:function(){
            commonAjax.req('/ssa/dispatchCenter/getDispatchList.do').then((data)=>{
                this.dispatchList=data
            })
        },
        newDispatchProcess:function(){

            this.initDispatchConfig()
            this.getDispatchList()
        },
        changeProcess:function(val){
            for(var item of this.dispatchList){
                if(item.id==val){
                    var config=JSON.parse(item.config)
                    config.id=item.id
                    this.setDispatchConfig(config)
                }
            }
        }
    },
    mounted:function(){
        this.getDispatchList()
    }
}
</script>
<style>

</style>
