

var allData = {
        "citys": [{
            "name": "柏林",
            "value": [13.25, 52.3, 4],
            "symbolSize": 12,
            "itemStyle": {
                "normal": {
                    "color": "#25d6f5"
                }
            }
        }, {
            "name": "波兰",
            "value": [19.08, 51.55, 4],
            "symbolSize": 8,
            "itemStyle": {
                "normal": {
                    "color": "#25d6f5"
                }
            }
        }, {
            "name": "青海",
            "value": [110.49, 36.34, 4],
            "symbolSize": 15,
            "itemStyle": {
                "normal": {
                    "color": "#f72e00"
                }
            }
        }, {
            "name": "India",
            "value": [77,28, 4],
            "symbolSize": 13,
            "itemStyle": {
                "normal": {
                    "color": "#25d6f5"
                }
            }
        }, {
            "name": "Romania",
            "value": [25, 44, 4],
            "symbolSize": 10,
            "itemStyle": {
                "normal": {
                    "color": "#25d6f5"
                }
            }
        }, {
            "name": "Rusia",
            "value": [100, 65, 4],
            "symbolSize": 15,
            "itemStyle": {
                "normal": {
                    "color": "#25d6f5"
                }
            }
        }, {
            "name": "Rusia",
            "value": [30, 31, 4],
            "symbolSize": 12,
            "itemStyle": {
                "normal": {
                    "color": "#25d6f5"
                }
            }
        }, {
            "name": "South Afr ",
            "value": [24, -27, 4],
            "symbolSize": 10,
            "itemStyle": {
                "normal": {
                    "color": "#25d6f5"
                }
            }
        }],


        "moveLines": [{
            "fromName": "青海",
            "toName": "柏林",
            "coords": [
                [110.49, 36.34],
                [13.25, 52.3]
            ]
        }, {
            "fromName": "青海",
            "toName": "SA",
            "coords": [
                [110.49, 36.34],
                [24,-27]
            ]
        }, {
            "fromName": "青海",
            "toName": "Egyp",
            "coords": [
                [110.49, 36.34],
                [30,31]
            ]
        }, {
            "fromName": "青海",
            "toName": "India",
            "coords": [
                [110.49, 36.34],
                [77,28]
            ]
        },{
            "fromName": "青海",
            "toName": "波兰",
            "coords": [
                [110.49, 36.34],
                [19.08, 51.55]
            ]
        }, {
            "fromName": "青海",
            "toName": "Romania",
            "coords": [
                [110.49, 36.34],
                [25,44]
            ]
        }, {
            "fromName": "青海",
            "toName": "Russia",
            "coords": [
                [110.49, 36.34],
                [100, 65]
            ]
        }]
    };

var wdoption={
        geo: {
            map: 'world',
                width: '95%',
            label: {
                emphasis: {
                    show: false
                }
            },
            roam: true,
            itemStyle: {
                normal: {
					areaColor: '#f2f2f2',
					borderColor: '#dadada'
				},
                emphasis: {
                    areaColor: '#71a9c0'
                }
            }

        },
       
        series: [{
            type: 'scatter',
            coordinateSystem: 'geo',
            // data: convertData(data),
            symbolSize: 22,
            symbol:'image://images/skeleton.png',
            symbolRotate: 0,
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: false
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#fa1828',
                }
            },
            data: allData.citys
        }, ]
    };
