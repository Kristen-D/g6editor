// series[0].data
const UrlDistribution = {
  tooltip: {
    trigger: 'item',
    formatter: "来源：{b}  <br/>数量： {c}"
  },
  calculable: true,
  // color: ['#2ecc71', '#1abc9c', '#309562', '#309562', '#3bbf7c'],
  series: [{
    name: 'URL分布',
    type: 'treemap',
    width: '100%',
    height: '90%',
    roam: false, //是否开启拖拽漫游（移动和缩放）
    nodeClick: false, //点击节点后的行为,false无反应
    breadcrumb: { //关闭面包屑路径
      show: false
    },
    silent: false, //关闭鼠标事件
    label: {
      normal: {
        textStyle: {
          // fontWeight: 'bold',
          fontSize: '14',
        }
      }
    },
    itemStyle: {
      normal: {
        label: {
          show: true,
          formatter: "{b}"
        },
        //   borderWidth: 0.51,
        // borderColor: '#0b1724',
        gapWidth: 5
      },
    },
    data: []
  }]
};

export {
  UrlDistribution,

}
