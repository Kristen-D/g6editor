// JavaScript Document						   
$(document).ready(function () {
	
	//折线图01
     require.config({
                    paths: {
                        'echarts': './js'
                    }
                });
                require(
                    [
                        'echarts',
                        'echarts/theme/shine',
                        'echarts/chart/line'
                    ],
                    function (ec,theme) {
                        var myChart = ec.init(document.getElementById('flowDayLineA'),theme); 
                        
                        var option = {
									color: [
										'rgba(192,32,42,1)',
										'rgba(255,172,56,1)',
										'rgba(50,171,74,1)',
										'rgba(146,35,140,1)',
										'rgba(238,100,177,1)',
										'rgba(28,115,192,1)',
										'rgba(5,173,238,1)',
										'#b5c334',
										'#fcce10',
										'#fe8463',
										],
										 title : {
											text: '',
											subtext: '单位：kbit/秒'
										},
										tooltip : {
											trigger: 'axis'
										},
										legend: {
											data:['停机时间','合计','其他','WWW','FTP/P2P','Mail','Remote control','Infarstructure','NetBAOS','Various'],
											x:'center',
											y:'25px',
										},
									
										calculable : true,
										xAxis : [
											{
												type : 'category',
												boundaryGap : false,
												data : ['10:00','10:05','10:10','10:15','10:20','10:25','10:30','10:35','10:40','10:45','10:50','10:55','11:00','11:05','11:10','11:15','11:20','11:25','11:30','11:35','11:40']
											}
										],
										yAxis : [
											{
												type : 'value',
											}
										],
										series : [
											{
												name:'停机时间',
												type:'line',
												smooth:true,
												itemStyle: {normal: {areaStyle: {type: 'default'}}},
												data:[2000,10000, 9000, 6000, 30000, 70000, 90000, 20000, 10000, 30000, 70000, 50000, 90000, 100000, 20000, 30000, 50000, 80000, 10000, 80000, 7000]
											},
											{
												name:'合计',
												type:'line',
												smooth:true,
												itemStyle: {normal: {areaStyle: {type: 'default'}}},
												data:[20000,30000, 70000, 120000, 90000, 160000, 140000, 160000, 140000, 160000, 140000, 160000, 140000, 160000, 140000, 160000, 140000, 160000, 140000, 160000, 140000]
											},
											{
												name:'其他',
												type:'line',
												smooth:true,
												itemStyle: {normal: {areaStyle: {type: 'default'}}},
												data:[13200, 11320, 60100, 23400, 12000, 90000, 20000, 11320, 60100, 23400, 12000, 9000, 2000, 11320, 60100, 23400, 12000, 90000, 20000, 140000, 160000,]
											},
											{
												name:'WWW',
												type:'line',
												smooth:true,
												itemStyle: {normal: {areaStyle: {type: 'default'}}},
												data:[13200, 11320, 60100, 23400, 12000, 90000, 20000, 11320, 60100, 23400, 12000, 9000, 2000, 11320, 60100, 23400, 12000, 90000, 20000, 140000, 160000,]
											},
											{
												name:'FTP/P2P',
												type:'line',
												smooth:true,
												itemStyle: {normal: {areaStyle: {type: 'default'}}},
												data:[13200, 11320, 60100, 23400, 12000, 90000, 20000, 11320, 60100, 23400, 12000, 9000, 2000, 11320, 60100, 23400, 12000, 90000, 20000, 140000, 160000,]
											},
											{
												name:'Mail',
												type:'line',
												smooth:true,
												itemStyle: {normal: {areaStyle: {type: 'default'}}},
												data:[13200, 11320, 60100, 23400, 12000, 90000, 20000, 11320, 2000, 23400, 12000, 9000, 2000, 11320, 60100, 23400, 12000, 90000, 20000, 140000, 160000,]
											},
											{
												name:'Remote control',
												type:'line',
												smooth:true,
												itemStyle: {normal: {areaStyle: {type: 'default'}}},
												data:[13200, 11320, 60100, 23400, 12000, 2000, 20000, 2000, 60100, 23400, 12000, 2000, 2000, 11320, 60100, 23400, 12000, 90000, 20000, 140000, 160000,]
											},
											{
												name:'Infarstructure',
												type:'line',
												smooth:true,
												itemStyle: {normal: {areaStyle: {type: 'default'}}},
												data:[13200, 11320, 60100, 60100, 12000, 60100, 2000, 11320, 60100, 23400, 12000, 9000, 2000, 60100, 60100, 23400, 12000, 90000, 20000, 140000, 160000,]
											},
											{
												name:'NetBAOS',
												type:'line',
												smooth:true,
												itemStyle: {normal: {areaStyle: {type: 'default'}}},
												data:[13200, 11320, 60100, 2000, 60100, 2000, 20000, 11320, 60100, 23400, 12000, 9000, 2000, 11320, 60100, 23400, 12000, 90000, 20000, 140000, 160000,]
											},
											{
												name:'Various',
												type:'line',
												smooth:true,
												itemStyle: {normal: {areaStyle: {type: 'default'}}},
												data:[2000, 2000, 2000, 2000, 2000, 2000, 20000, 11320, 60100, 23400, 12000, 9000, 2000, 60100, 60100, 23400, 12000, 90000, 2000, 2000, 2000,]
											},
											
										]
                         
                         
                         
                      };
                        myChart.setOption(option); 
                    }
                );
	  
	      
	
	

}); 

