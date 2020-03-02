const UrlDistribution = {

      color:['#42a5f5','#1565c0','#0d47a1','#3d5afe','#2962ff','#2979ff','#448aff','#6091e4','#2196f3'],
      tooltip : {
        trigger: 'item',
        formatter: "来源：{b}  <br/>数量： {c}"
      },
      // tooltip: {
      //   trigger: 'item',
      //   formatter: "来源：{b}  <br/>数量： {c}"
      // },
      calculable: true,
      series: [{
        name: '分布',
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
      borderWidth: 1,
      borderColor: '#000'
    },
    emphasis: {
      label: {
        show: true
      },
      color: '#95ccf8',
    }
  },
        data: []
      }]

};
const UrlRelation = {
  tooltip: {
    trigger: 'item'


  },
  animationDurationUpdate: 1500,
  animationEasingUpdate: 'quinticInOut',
  series: [{
      type: 'graph',
      layout: 'force',
      symbolSize: 20,
      roam: true,
      left: '-70%',
      label: {
        normal: {
          show: true,
          position:'bottom',
          textStyle:{
            fontSize:12,
            color:"#47a8f1"
          }

        }
      },
      force: {
        initLayout: 'circular',
        repulsion: 200,
        edgeLength: 70
      },
      data: [],
      links: [],
      lineStyle: {
                normal: {
                    opacity: 0.9,
                    width: 2,
                    curveness: 0,
                    color:"#00ae4e"
                }
            },
      itemStyle: {
        normal: {
            color:"#fff",
      borderColor : 'rgba(36, 124, 241, 0.6)',
                borderWidth : 12
        }
      }

    },
    {
      type: 'graph',
      layout: 'force',
      symbolSize: 20,
      roam: true,
      left: '-10%',
      label: {
        normal: {
          show: true,
          position:'bottom',
          textStyle:{
            fontSize:12,
            color:"#47a8f1"
          }

        }
      },
      force: {
        initLayout: 'circular',
        repulsion: 200,
        edgeLength: 70
      },
      data: [],
      links: [],
      lineStyle: {
                normal: {
                    opacity: 0.9,
                    width: 2,
                    curveness: 0,
                    color:"#00ae4e"
                }
            },
      itemStyle: {
        normal: {
            color:"#fff",
      borderColor : 'rgba(36, 124, 241, 0.6)',
                borderWidth : 12
        }
      }
    },
    {
      type: 'graph',
      layout: 'force',
      symbolSize: 20,
      roam: true,
      left: '60%',
      label: {
        normal: {
          show: true,
          position:'bottom',
          textStyle:{
            fontSize:12,
            color:"#47a8f1"
          }

        }
      },
      force: {
        initLayout: 'circular',
        repulsion: 200,
        edgeLength: 70
      },
      data: [],
      links: [],
      lineStyle: {
                normal: {
                    opacity: 0.9,
                    width: 2,
                    curveness: 0,
                    color:"#00ae4e"
                }
            },
      itemStyle: {
        normal: {
            color:"#fff",
      borderColor : 'rgba(36, 124, 241, 0.6)',
                borderWidth : 12
        }
      }
    }
  ]
};
export {
 UrlDistribution,UrlRelation

}
