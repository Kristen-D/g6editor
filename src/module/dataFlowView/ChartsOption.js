

var lineData1 = [];
var lineData2 = [];
var lineData3 = [];
var lineData4 = [];
var lineData5 = [];

for (var i = 0; i < 8; i++) {
  var a = Math.random() * 10;
  var b = Math.random() * 20;
  var c = Math.random() * 20;
  var d = Math.random() * 10;
  var sum = a + b + c + d;
  lineData1.push(a.toFixed(0));
  lineData2.push(b.toFixed(0));
  lineData3.push(c.toFixed(0));
  lineData4.push(d.toFixed(0));
  lineData5.push(sum.toFixed(0));
}

const lineCategory = {
//color:['#2ecc71','#f72e00','#f0db2b','#3498db','#4834d4'],
//backgroundColor: '#ffffff',
  tooltip: {
		trigger: 'axis',
		backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 10,
        textStyle: {
          fontSize: 12
        },
        extraCssText: 'border-radius:0;'
	},
  legend: {
    	bottom: '3%',
    left: 'center',
    itemWidth: 8,
    itemHeight: 8,
    itemGap: 20,
    textStyle: {
      color: '#3E4956',
      fontSize: 12,
    },
    data:[]
  },
  grid: {
    top: '10%',
    left: '0',
    right: 20,
    bottom: '15%',
    containLabel: true
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    axisLine: { 
      show: true,
      lineStyle: {
        color: '#E1E3E4'
      },
    },
    axisLabel: { 
			margin:15,
      textStyle: {
        color: '#3E4956',
      },
    },
    axisTick: { show: false},
    data:[]
  },
  yAxis: {
    type: 'value',
    splitNumber: 4,
    splitLine: {
      show: true,
      lineStyle: {
        color: '#E1E3E4'
      }
    },
    axisLine: {show: false},
    axisLabel: {
      textStyle: {
        color: '#3E4956'
      },
    },
    axisTick: {show: false,},
  },
  series:[]
}



//饼图
const BasePie ={
   title: {
        text: "",
        subtext: '',
        x: 'center',
        y: '28%',
        textStyle: {
            color: "#3e4956",
            fontWeight: 600,
            fontFamily: "Haettenschweiler",
            fontSize: 36
        },
        subtextStyle: {
            color: "#3e4956",
            fontSize: 14,
            fontWeight: 'normal'
        }
    },
  tooltip : {
        trigger: 'item',
        formatter: "{a}：{b} <br/> 数量占比：{c} ({d}%)",
        backgroundColor: 'rgba(0,0,0,0.8)',
        padding: 10,
        textStyle: {
          fontSize: 12
        },
        extraCssText: 'border-radius:0;'
    },
    color:['#35a2ff','#2ecc71','#12cbf6','#0065ba'],
    legend: {
      show:true,
        icon: 'circle',
        left: 'center',
        bottom:'7%',
        width:'85%',
        itemWidth:10,
        itemHeight:10,
        itemGap:10,
        textStyle:{
          color:'rgba(62,73,86,0.6)',
          padding:[0,0,0,2],
        },
        data: [],
        formatter:function(name){
            var oa = BasePie.series.data;
            var num = oa[0].value + oa[1].value + oa[2].value + oa[3].value+ oa[4].value;
            for(var i = 0; i < BasePie.series.data.length; i++){
                    if(name==oa[i].name){
                      return name+(oa[i].value/num * 100).toFixed(1)+ '%';
                    }
            }
        }
    },
    series:
    {
        name: '',
        type: 'pie',
        radius : ['50%','65%'],
        center: ['50%', '38%'],
        data:[],
        itemStyle: {
          normal: {
                label:{show: false,},
                borderWidth:2,
                borderColor:'#fff',
            },
            labelLine :{show:false}
        }
    },
}
export {
 	lineCategory,
  BasePie
}
