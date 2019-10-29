//taiyuan-map
//var chart = echarts.init(document.getElementById('TaiyuanMapA'));
//var tychart = echarts.init(document.getElementById('TaiyuanMapA'));

	var tyData = {
        "tycitys": [{
            "name": "尖草坪区",
            "value": [112.487122, 37.939893, 4],
            "symbolSize": 12,
            "itemStyle": {
                "normal": {
                    "color": "#f72e00"
                }
            }
        }, {
            "name": "万柏林区",
            "value": [112.522258, 37.862653, 4],
            "symbolSize": 8,
            "itemStyle": {
                "normal": {
                    "color": "#25d6f5"
                }
            }
        }, {
            "name": "迎泽区",
            "value": [112.558851, 37.855804, 4],
            "symbolSize": 4,
            "itemStyle": {
                "normal": {
                    "color": "#25d6f5"
                }
            }
        }, {
            "name": "小店区",
            "value": [112.564273, 37.817974, 4],
            "symbolSize": 4,
            "itemStyle": {
                "normal": {
                    "color": "#25d6f5"
                }
            }
        }, {
            "name": "杏花岭区",
            "value": [112.560743, 37.879291, 4],
            "symbolSize": 4,
            "itemStyle": {
                "normal": {
                    "color": "#25d6f5"
                }
            }
        }, {
            "name": "晋源区",
            "value": [112.477849, 37.715619, 4],
            "symbolSize": 15,
            "itemStyle": {
                "normal": {
                    "color": "#25d6f5"
                }
            }
        }, {
            "name": "清徐县",
            "value": [112.357961, 37.60729, 4],
            "symbolSize": 12,
            "itemStyle": {
                "normal": {
                    "color": "#25d6f5"
                }
            }
        }, {
            "name": "古交市",
            "value": [112.174353, 37.908534, 4],
            "symbolSize": 10,
            "itemStyle": {
                "normal": {
                    "color": "#25d6f5"
                }
            }
        }, {
            "name": "娄烦县",
            "value": [111.793798, 38.066035, 4],
            "symbolSize": 10,
            "itemStyle": {
                "normal": {
                    "color": "#25d6f5"
                }
            }
        }, {
            "name": "阳曲县",
            "value": [112.673818, 38.058797, 4],
            "symbolSize": 10,
            "itemStyle": {
                "normal": {
                    "color": "#25d6f5"
                }
            }
        }
        ],


        "tymoveLines": [{
            "fromName": "尖草坪区",
            "toName": "万柏林区",
            "coords": [
                [112.487122, 37.939893],
                [112.522258, 37.862653]
            ]
        }, {
            "fromName": "尖草坪区",
            "toName": "阳曲县",
            "coords": [
                [112.487122, 37.939893],
                [112.673818, 38.058797]
            ]
        }, {
            "fromName": "尖草坪区",
            "toName": "娄烦县",
            "coords": [
                [112.487122, 37.939893],
                [111.793798, 38.066035]
            ]
        }, {
            "fromName": "尖草坪区",
            "toName": "古交市",
            "coords": [
                [112.487122, 37.939893],
                [112.174353, 37.908534]
            ]
        },{
            "fromName": "尖草坪区",
            "toName": "清徐县",
            "coords": [
                [112.487122, 37.939893],
                [112.357961, 37.60729]
            ]
        }, {
            "fromName": "尖草坪区",
            "toName": "晋源区",
            "coords": [
                [112.487122, 37.939893],
                [112.477849, 37.715619]
            ]
        }]
    };

//  chart.setOption({
 var tymapoption ={
        geo: {
            map: 'taiyuan',
            top:'10%',
            left:'center',
            bottom:'17%',
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: true,
            itemStyle: {
                normal: {
					areaColor: '#e1e3e4',
					borderColor: '#111'
				},
                emphasis: {
                    areaColor: '#71a9c0'
                }
            }

        },

        series: [{
            name: '太原',
            type: 'effectScatter',
            coordinateSystem: 'geo',
            zlevel: 2,
            rippleEffect: {
                brushType: 'stroke',
                period: 7,
                scale: 3
            },
            label: {
                emphasis: {
                    show: true,
                    position: 'right',
                    formatter: '{b}'
                }
            },
            symbolSize: 10,
            showEffectOn: 'render',
            itemStyle: {
                normal: {
                    color: '#46bee9'
                }
            },
            data: tyData.tycitys
        },
				// {
        //     name: '太原线路',
        //     type: 'lines',
        //     coordinateSystem: 'geo',
        //     zlevel: 3,
        //     large: true,
        //     effect: {
        //         show: true,
        //         constantSpeed: 30,
        //         symbol: 'arrow', //ECharts 提供的标记类型包括 'circle', 'rect', 'roundRect', 'triangle', 'diamond', 'pin', 'arrow'
        //         symbolSize: 10,
        //         trailLength: 0.3,
        //     },
        //     lineStyle: {
        //         normal: {
        //             color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
        //                 offset: 0,
        //                 color: 'blue'
        //             }, {
        //                 offset: 1,
        //                 color: '#25d6f5'
        //             }], false),
        //             width: 3,
        //             opacity: 0.6,
        //             curveness: 0.1
        //         }
        //     },
        //     data: tyData.tymoveLines
        // }
			]
    };
export default tymapoption;
