

export default {
  data() {
    return {
      option: {

        tooltip: {
          trigger: 'item',
          formatter: function(params, ticket, callback) {
            if (typeof params.data.score === 'undefined') {
              params.data.score = 100;
            }
            if (typeof params.data.quantities === 'undefined') {
              params.data.quantities = 0;
            }
            return '当前区域：' + params.name + '<br />安全指数：' + params.data.score + '<br />漏洞数：' + params.data.quantities
          }
          // '当前区域：全网<br />安全指数：83<br />漏洞数：61<br />威胁数：{c}'
        },
        visualMap: {
          type: 'piecewise', //分段型。
          splitNumber: 4,
          //		        inverse: true,
          pieces: [{
              gt: divvalue[0],
              color: mapcolorlist[0],
              label: '紧急'
            },
            {
              gt: divvalue[1],
              lte: divvalue[0],
              color: mapcolorlist[1],
              label: '高危'
            },
            {
              gt: divvalue[2],
              lte: divvalue[1],
              color: mapcolorlist[2],
              label: '中危'
            },
            {
              lte: divvalue[2],
              color: mapcolorlist[3],
              label: '低危'
            }
          ],
          left: 'left',
          top: '60%',
          itemWidth:15,
          itemHeight:8,
          outOfRange: {symbol:'rect',color:'#ccc'}

        },

        series: [{
          // name: '中国',
          type: 'map',
          mapType: 'china',
          roam: true,
          selectedMode: 'single',
          label: {
            normal: {
              show: true,
              //offset:[-50,-50]
            },
            emphasis: {
              textStyle: {
                color: 'rgba(0,0,0,1)',
                fontSize: 18,
                fontWeight: 600
              }
            }
          },
          itemStyle: {

            normal: {
              borderColor: '#fff',
              areaColor: 'rgb(121, 224, 195)',//#4ecf69 #ccc
            },
            emphasis: {
              areaColor: '',
              borderWidth: 0,
              borderColor: '#fff',
              shadowColor: 'rgba(0, 0, 0, 0.3)',
              shadowBlur: 5,
              shadowOffsetX: 8,
              shadowOffsetY: 8,
              //	opacity:1

            }
          },
          animation: false,

          data: cvedata

        }],

      }
    }
  }
}
