



const pieAssetTop5 = {
  color: ['#1B55A5', '#00B8FF', '#FDB502', '#0066cc', '#00cccc', '#6600cc', '#6666cc', '#66cccc', '#336633', '#33ff33', '#9900ff', '#9999ff'],
  legend: {
        orient: 'vertical',
        x: 'left',
        left:'40',
        top:'10',
        width:'5',

        data:[]
    },
  title: {
    // text:'重要资产占比',
    textStyle: {
      color: '#9ea3b4',
      fontSize: 14,
      fontweight: 100,
    },
  },
  tooltip: {
    trigger: 'item',
    formatter: "{a} <br/>{b}: {c} ({d}%)"
  },
  series: [{
    name: '数量',
    type: 'pie',
    center: ['60%', '60%'],
    radius: ['50%', '65%'],
    labelLine:{
      normal:{
         show:true,
       length:10,
       length2:8,

     }

  },

    label: {
      normal: {
        show: true,
            formatter: "{b}: {c} ({d}%)"
        // position: 'center'
      },
      emphasis: {
        show: true,
        textStyle: {
          // color: '#fff',
          fontSize: '12',
        }
      }
    },
    data: [{value:0, name:''}]
  }]
};





export {

  pieAssetTop5,

}
