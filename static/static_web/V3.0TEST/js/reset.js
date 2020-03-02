
function handleDelete(){
	$(".el-dialog .el-dialog__headerbtn i").removeClass('el-icon-close').addClass('el-icon-error');
}

//一二级菜单切换变化的时候,让echart随着外部容器的大小自适应
function changeEchart(chart,methods){
	$('.chart').resize(function () {
			chart.resize();
			if(methods != null && methods != ""){
				methods();
			}
	});
}

function lineMethod(object,params){
	object.xAxis.data = params.data.xData;
	object.color = params.style.color;
	var seriesParam = [];
	for(let i = 0; i < params.data.lineNumber; i++){
		var seriesChild = {
			name: '',
			type: 'line',
			data: [],
			showSymbol: false,
			smooth: true,
			lineStyle: {
				width: 3
			}
		}
		seriesChild.name = params.data.seriesName[i];
		seriesChild.data = params.data.series[i];
		seriesParam.push(seriesChild);
	}
	object.series = seriesParam;
}

export default{
	handleDelete,
	changeEchart,
	lineMethod
};
