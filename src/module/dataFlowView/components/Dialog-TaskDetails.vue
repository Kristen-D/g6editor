<template>
	<el-dialog title="撞库B1131315-任务详情" :visible.sync="taskVisible" width='1140px' class="dialog-white">
		<el-row>
			<el-col :span="17" style="width: 69.3%;">
				<div class="scene-chain flexCenter">
					<img src="/static/static_web/images/Dialog-TaskDetails-chainbg.png" alt="">
				</div>
				<div>
					<el-table :data="tableData" style="width: 100%" height="241" class="white-table taskDialog-table" :cell-style="cellstyle" :header-cell-style="headercellstyle">
				      	<el-table-column label="日志">
							<template slot-scope="scope">
								<span class="circle"></span>
								{{scope.row.log}}
							</template>
				      	</el-table-column>
				    </el-table>
				</div>
			</el-col>
			<el-col :span="7" style="width: 30.7%;">
				<div class="deploy-panel">
					<el-tabs v-model="activeName">
						<el-tab-pane label="属性" name="first">
							<div style="margin-bottom: 6px;">
								<p class="deploy-panel-tit">输出节点类型</p>
								<p class="deploy-panel-content">数据表读取</p>
							</div>
							<div style="margin-bottom: 6px;">
								<p class="deploy-panel-tit">节点描述</p>
								<p class="deploy-panel-content">
									类型转换就是将数据转换为合适的类型。计算机储存数据时都有对应的类型,比如字符型,整数型,日期型等等,针对不同的数据类型,都有不同的适用的计算公式和方法等。比如:日期数据在通过文件导入项目后的数据类型可能是字符型,字符之间是不能进行任何运算操作的,如果想计算时间间隔之类的,就有必要通过数据类型转换的组件将该变量转换为日期型变量。
								</p>
							</div>
						</el-tab-pane>
						<el-tab-pane label="配置" name="second">
							<div style="margin-bottom: 6px;">
								<p class="deploy-panel-tit">输出节点类型</p>
								<p class="deploy-panel-content">数据表读取</p>
							</div>
							<div style="margin-bottom: 6px;">
								<p class="deploy-panel-tit">节点描述</p>
								<p class="deploy-panel-content">
									类型转换就是将数据转换为合适的类型。计算机储存数据时都有对应的类型,比如字符型,整数型,日期型等等,针对不同的数据类型,都有不同的适用的计算公式和方法等。比如:日期数据在通过文件导入项目后的数据类型可能是字符型,字符之间是不能进行任何运算操作的,如果想计算时间间隔之类的,就有必要通过数据类型转换的组件将该变量转换为日期型变量。
								</p>
							</div>
							<div style="margin-bottom: 10px;">
								<p class="deploy-panel-tit">操作说明（节点注释）</p>
								<el-input type="textarea" v-model="description" :rows='5' class="m-t-3"></el-input>
							</div>
							<div>
								<p class="deploy-panel-tit">所属步骤</p>
								<el-select v-model="step" placeholder="数据预处理" style="width: 100%;">
							      <el-option label="数据预处理1" value="data1"></el-option>
							      <el-option label="数据预处理2" value="data2"></el-option>
							    </el-select>
							    <el-checkbox v-model="checked" class="m-t-10 text-xs">输出结果保存到临时空间</el-checkbox>
							</div>
						</el-tab-pane>
					</el-tabs>
				</div>
			</el-col>
		</el-row>
		<div class="button-group flexCenter">
			<el-button type="primary">编辑</el-button>
			<el-button type="gray">取消</el-button>
		</div>
	</el-dialog>
</template>
<style scoped>
	.scene-chain{ height: 559px; border: 1px solid #e1e3e4; }
	.taskDialog-table{ border: 1px solid #e1e3e4; }
	.deploy-panel{ height: 800px; border: 1px solid #e1e3e4; }
	.circle{ width: 4px;height: 4px; background-color: #3e4956; }
	.button-group{ margin-top: 22px; }

	.deploy-panel-tit{ font-size: 13px; color:#3e4956;  }
	.deploy-panel-content{ color: rgba(62,73,86,0.7); line-height: 20px; }
</style>
<style>
	.taskDialog-table .el-table__header tr { font-size: 14px; }
	.taskDialog-table .el-table__header tr > th{padding: 7px 0px;}
	.taskDialog-table .el-table__body-wrapper{ overflow: auto; }
	/*滚动条整体样式*/
	.taskDialog-table .el-table__body-wrapper::-webkit-scrollbar{width: 8px;}
	  /*滚动条里面小方块*/
	.taskDialog-table .el-table__body-wrapper::-webkit-scrollbar-thumb{
	    border: 2px solid #fff;
	    background-color: #dcdfe0;
	}
	  /*滚动条里面轨道*/
	.taskDialog-table .el-table__body-wrapper::-webkit-scrollbar-track{
	    border: 2px solid #fff;
	}
	.deploy-panel .el-tabs__nav-wrap::after{ height: 1px; }
	.deploy-panel .el-tabs__nav-scroll{ padding-left: 20px; }
	.deploy-panel .el-tabs__item.is-active{ color: #007be8; }
	.deploy-panel .el-tabs__active-bar{ background-color:#007be8;  }
	.deploy-panel .el-tabs__content{padding:5px 20px; }
	.deploy-panel .el-textarea__inner,
	.deploy-panel .el-select .el-input,
	.deploy-panel .el-checkbox__label
	{ font-size: 12px; }
	.deploy-panel .el-checkbox__input.is-checked+.el-checkbox__label{ color: #3e4956; }
</style>
<script>
  	export default {
  		props:['taskDialog'],
	    data() {
	      	return {
	        	taskVisible: false,
	        	activeName:'second',
	        	description:'数据表读取输出',
	        	step:'',
	        	checked:true,
	        	tableData:[
	        		{
	        			log:'[info]2019-02-11 13:14:15 项目 预测花型模型克隆',
	        		},{
	        			log:'(2lkdc9439rfdumiuoruwtourewotwxcnbnmxbz）开始提交',
	        		},{
	        			log:'[info]2019-02-11 13:14:15 项目 预测花型模型克隆',
	        		},{
	        			log:'(2lkdc9439rfdumiuoruwtourewotwxcnbnmxbz）启动运行',
	        		},{
	        			log:'[info]2019-02-11 13:14:15 项目 预测花型模型克隆',
	        		},{
	        			log:'(2lkdc9439rfdumiuoruwtourewotwxcnbnmxbz）开始提交',
	        		},{
	        			log:'[info]2019-02-11 13:14:15 项目 预测花型模型克隆',
	        		},{
	        			log:'(2lkdc9439rfdumiuoruwtourewotwxcnbnmxbz）启动运行',
	        		},
	        	]
	        }
	    },
	    watch:{
    		taskDialog:function(){
				this.taskVisible =  this.taskDialog;
	    	},
	    	taskVisible:function(){
	    		this.$emit('taskVisible',this.taskVisible)
	    	}
	    },
	    methods:{
	    	cellstyle({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				if(columnIndex === 0) {
					return "padding-left:15px;";
				}
			},
			headercellstyle({
				row,
				column,
				rowIndex,
				columnIndex
			}) {
				if(columnIndex === 0) {
					return "padding-left:15px;";
				}
			}
	    },
	    mounted(){
	    }
	}
</script>  