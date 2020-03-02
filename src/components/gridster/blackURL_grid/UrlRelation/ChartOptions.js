
// series[0].data, .links
const UrlRelation = {
  // tooltip: {},
  animationDurationUpdate: 1500,
  animationEasingUpdate: 'quinticInOut',
  series: [{
      type: 'graph',
      layout: 'force',
      symbolSize: 40,
      roam: true,
      left: '-70%',
      label: {
        normal: {
          show: true,
          color: '#ccc',
          fontSize: 14,
          align: 'center',
          offset: [0, 30],
          rich: {
            a: {
              color: 'black',
              fontSize: 14,
              align: 'center',
              padding: [20, 10]
            }
          }
        }
      },
      force: {
        initLayout: 'circular',
        repulsion: 500,
        edgeLength: 70
      },
      data: [],
      links: [],
      itemStyle: {
        normal: {
          color: 'white',
          borderColor: '#ccc'
        }
      }
    },
    {
      type: 'graph',
      layout: 'force',
      symbolSize: 40,
      roam: true,
      left: '-10%',
      label: {
        normal: {
          show: true,
          color: '#ccc',
          fontSize: 14,
          align: 'center',
          offset: [0, 30],
          rich: {
            a: {
              color: 'black',
              fontSize: 14,
              align: 'center',
              padding: [20, 10]
            }
          }
        }
      },
      force: {
        initLayout: 'circular',
        repulsion: 500,
        edgeLength: 70
      },
      data: [],
      links: [],
      itemStyle: {
        normal: {
          color: 'white',
          borderColor: '#ccc'
        }
      }
    },
    {
      type: 'graph',
      layout: 'force',
      symbolSize: 40,
      roam: true,
      left: '60%',
      label: {
        normal: {
          show: true,
          color: '#ccc',
          fontSize: 14,
          align: 'center',
          offset: [0, 27],
          rich: {
            a: {
              color: 'black',
              fontSize: 14,
              align: 'center',
              padding: [20, 10]
            }
          }
        }
      },
      force: {
        initLayout: 'circular',
        repulsion: 500,
        edgeLength: 70
      },
      data: [],
      links: [],
      itemStyle: {
        normal: {
          color: 'white',
          borderColor: '#ccc'
        }
      }
    }
  ]
};

export {
UrlRelation
}
