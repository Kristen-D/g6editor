//柱状图
function columnChart(container,name,yName,key,value){
	container.highcharts({ 
		chart: { type: 'column' },
		title: { text: '' },
		xAxis: { categories: key,
			     type: 'category',
                 labels: {
                       rotation: -45,
                       align: 'right',
                       style: {
                           fontSize: '13px',
                           fontFamily: 'Verdana, sans-serif'
                       }
                 }
		}, 
		yAxis: { min: 0, title: { text: yName } },
		tooltip: { headerFormat: '<span style="font-size:10px">{point.key} &nbsp;&nbsp;{point.value}</span>',
		shared: true, useHTML: true }, 
		plotOptions: { column: { pointPadding: 0.2, borderWidth: 0 } },
		series: [{ name: name, data:value }],
		exporting : {enabled : false},
		credits: {enabled:false}
		});
}

//饼图
function pieChart(container,name,yName,key,value) { 
	var data = new Array();
	for(var i = 0;i<key.length;i++){
		var temp = new Array([2]);
		temp[0]=key[i];
		temp[1]=value[i];
		data.push(temp);
	}
	container.highcharts({
		chart: { plotBackgroundColor: null, plotBorderWidth: null, plotShadow: false },
		title: { text: '' },
		tooltip: { pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>' },
		plotOptions: {
			pie: { allowPointSelect: true, cursor: 'pointer', 
				dataLabels: { enabled: true, color: '#000000',
					connectorColor: '#000000', 
					format: '<b>{point.name}</b>: {point.percentage:.1f} %' } } }, 
		series: [{ type: 'pie', name: name,data:data  }],
		exporting : {enabled : false},
		credits: {enabled:false}
	}); 
};

//折线图
function brokenLineChart(container,name,yName,key,value) { 
	container.highcharts({
		title: { text: '', x: -20 }, 
	    xAxis: { categories: key },
	    yAxis: { title: { text: yName },
	    plotLines: [{ value: 0, width: 1, color: '#808080' }] },
//	    tooltip: { valueSuffix: '°C' },
	    legend: { layout: 'vertical', align: 'right', verticalAlign: 'middle', borderWidth: 0 },
	    series: [{ name:name,data: value}],
	    exporting : {enabled : false},
	    credits: {enabled:false}
	    }); 
};

//区域
//有问题，需要调整。。。。。。。。。。。。。
function regionChart(container,name,yName,key,value){ 
	container.highcharts({ 
		chart: { type: 'area' }, 
		title: { text: '' }, 
	    xAxis: { categories: key,labels: { formatter: function() { return this.value;} } },
	    yAxis: { title: { text: yName }, labels: { formatter: function() { return this.value / 1000 +'k'; } } },
	    tooltip: { pointFormat: '{series.name} produced <b>{point.y:,.0f}</b><br>warheads in {series.name}' },
	    plotOptions: { area: { pointStart: 0, marker: { enabled: false, symbol: 'circle', radius: 1, states: { hover: { enabled: true } } } } },
	    series: [{ name: name, data: value }],
	    exporting : {enabled : false},
	    credits: {enabled:false}
	    });
	}; 

//条形图。。栏图
function barChart(container,name,yName,key,value) { 
	    container.highcharts({ 
			chart: { type: 'bar' },
			title: { text: '' },
			xAxis: { categories: key, title: { text: null } },
			yAxis: { min: 0, title: { text: yName, align: 'high' },
			labels: { overflow: 'justify' } }, 
			plotOptions: { bar: { dataLabels: { enabled: true } } },
			legend: { layout: 'vertical', align: 'right', verticalAlign: 'top', x: -40, y: 100, floating: true, borderWidth: 1, backgroundColor: '#FFFFFF', shadow: true }, 
			credits: { enabled: false }, 
			series: [{ name: name, data: value }],
			exporting : {enabled : false},
			credits: {enabled:false}
			}); 
	};
	
//散点图
function scatterChart(container,name,yName,key,value){
	var data = new Array();
	for(var i = 0;i<key.length;i++){
		var temp = new Array([2]);
		temp[0]=key[i];
		temp[1]=value[i];
		data.push(temp);
	}
	container.highcharts({
		chart: { type: 'scatter', zoomType: 'xy' }, 
		title: { text: '' },
		xAxis: { categories: key,title: { enabled: true, text: name },
		startOnTick: true,
		endOnTick: true, showLastLabel: true }, 
		yAxis: { title: { text: yName } },
		legend: { layout: 'vertical', align: 'left', verticalAlign: 'top', x: 100, y: 70, floating: true, backgroundColor: '#FFFFFF', borderWidth: 1 }, 
		plotOptions: { scatter: { marker: { radius: 5, states: { hover: { enabled: true, lineColor: 'rgb(100,100,100)' } } },
		states: { hover: { marker: { enabled: false } } },
		tooltip: { headerFormat: '<b></b><br>', pointFormat: ' {point.y} ' } } }, 
		series: [{ name: name, data: data }],
		exporting : {enabled : false},
		credits: {enabled:false}
});
};

//径向仪表
function radiaChart(container,name,yName,key,value){
	container.highcharts({
		
	    chart: {
	        type: 'gauge',
	        plotBackgroundColor: null,
	        plotBackgroundImage: null,
	        plotBorderWidth: 0,
	        plotShadow: false
	    },
	    
	    title: {
	        text: ''
	    },
	    
	    pane: {
	        startAngle: -150,
	        endAngle: 150,
	        background: [{
	            backgroundColor: {
	                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
	                stops: [
	                    [0, '#FFF'],
	                    [1, '#333']
	                ]
	            },
	            borderWidth: 0,
	            outerRadius: '109%'
	        }, {
	            backgroundColor: {
	                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
	                stops: [
	                    [0, '#333'],
	                    [1, '#FFF']
	                ]
	            },
	            borderWidth: 1,
	            outerRadius: '107%'
	        }, {
	            // default background
	        }, {
	            backgroundColor: '#DDD',
	            borderWidth: 0,
	            outerRadius: '105%',
	            innerRadius: '103%'
	        }]
	    },
	       
	    // the value axis
	    yAxis: {
	        min: 0,
	        max: 200,
	        
	        minorTickInterval: 'auto',
	        minorTickWidth: 1,
	        minorTickLength: 10,
	        minorTickPosition: 'inside',
	        minorTickColor: '#666',
	
	        tickPixelInterval: 30,
	        tickWidth: 2,
	        tickPosition: 'inside',
	        tickLength: 10,
	        tickColor: '#666',
	        labels: {
	            step: 2,
	            rotation: 'auto'
	        },
	        title: {
	            text: 'km/h'
	        },
	        plotBands: [{
	            from: 0,
	            to: 120,
	            color: '#55BF3B' // green
	        }, {
	            from: 120,
	            to: 160,
	            color: '#DDDF0D' // yellow
	        }, {
	            from: 160,
	            to: 200,
	            color: '#DF5353' // red
	        }]        
	    },
	
	    series: [{
	        name: 'Speed',
	        data: [0]
	    }],
	    exporting : {enabled : false},
	    credits: {enabled:false}
	});
};

