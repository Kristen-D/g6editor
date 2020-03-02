<!-- 大屏-L7地图 -->
<template>
  <div>
    <div class="el-panel-body">
      <el-row type="flex">
        <div id="map" class="map-div map-l7"></div>
      </el-row>
    </div>

  </div>
</template>
<script>
    import { Scene, LineLayer, PointLayer ,PolygonLayer } from '@antv/l7';
    import { GaodeMap, Mapbox } from '@antv/l7-maps';

    export default {
        data () {
            return {
                interval: null
            }
        },
        mounted () {
            this.initMap();
        },
        methods: {
            initMap: function () {
                var This = this;
                // This.gaodeMapQiPaoTu1();
                // This.mapboxLiuXiangTu();
                // This.mapboxThirdTu();
                // This.mapboxTest2();
                This.mapboxTest3();
            },
            gaodeMapQiPaoTu1: function () {
                const scene = new Scene({
                    id: 'map',
                    map: new GaodeMap({
                        pitch: 0,
                        type: 'amap',
                        style: 'light',
                        center: [ 140.067171, 36.26186 ],
                        zoom: 5.32,
                        maxZoom: 10
                    })
                });

                fetch(
                    '/static/sdsec/js/gaode-qipao.json'
                )
                    .then(res => res.json())
                    .then(data => {
                        const pointLayer = new PointLayer({})
                            .source(data)
                            .shape('circle')
                            .size('mag', [ 1, 25 ])
                            .color('mag', mag => {
                                return mag > 4.5 ? '#5B8FF9' : '#5CCEA1';
                            })
                            .active(true)
                            .style({
                                opacity: 0.3,
                                strokeWidth: 1
                            });

                        scene.addLayer(pointLayer);
                    });
            },
            mapboxLiuXiangTu: function () {
                const scene = new Scene({
                    id: 'map',
                    map: new Mapbox({
                        pitch: 40,
                        style: {
                            version: 8,
                            sprite: 'https://lzxue.github.io/font-glyphs/sprite/sprite',
                            glyphs:
                                'https://gw.alipayobjects.com/os/antvdemo/assets/mapbox/glyphs/{fontstack}/{range}.pbf',
                            sources: {},
                            layers: [
                                {
                                    id: 'background',
                                    type: 'background',
                                    paint: {
                                        'background-color': '#2b2b3a'
                                    }
                                }
                            ]
                        },
                        center: [ 3.438, 40.16797 ],
                        zoom: 0.51329
                    })
                });
                Promise.all([
                    fetch('https://gw.alipayobjects.com/os/basement_prod/dbd008f1-9189-461c-88aa-569357ffc07d.json').then(d => d.json()),
                    fetch('https://gw.alipayobjects.com/os/basement_prod/4472780b-fea1-4fc2-9e4b-3ca716933dc7.json').then(d => d.text()),
                    fetch('https://gw.alipayobjects.com/os/basement_prod/a5ac7bce-181b-40d1-8a16-271356264ad8.json').then(d => d.text())
                ]).then(function onLoad([ world, dot, flyline ]) {
                    const dotData = eval(dot);
                    const flydata = eval(flyline).map(item => {
                        const latlng1 = item.from.split(',').map(e => { return e * 1; });
                        const latlng2 = item.to.split(',').map(e => { return e * 1; });
                        return { coord: [ latlng1, latlng2 ] };
                    });
                    // const worldFill = new PolygonLayer()
                    //   .source(world)
                    //   .color('#98E3FA')
                    //   .shape('fill')
                    //   .style({
                    //     opacity: 1
                    //   });

                    const worldLine = new LineLayer()
                        .source(world)
                        .color('#41fc9d')
                        .size(0.5)
                        .style({
                            opacity: 0.4
                        });
                    const dotPoint = new PointLayer()
                        .source(dotData, {
                            parser: {
                                type: 'json',
                                x: 'lng',
                                y: 'lat'
                            }
                        })
                        .shape('circle')
                        .color('#ffed11')
                        .animate(true)
                        .size(40)
                        .style({
                            opacity: 1.0
                        });
                    const flyLine = new LineLayer()
                        .source(flydata, {
                            parser: {
                                type: 'json',
                                coordinates: 'coord'
                            }
                        })
                        .color('#ff6b34')
                        .shape('arc3d')
                        .size(2)
                        .active(true)
                        .animate({
                            interval: 2,
                            trailLength: 2,
                            duration: 1
                        })
                        .style({
                            opacity: 1
                        });
                    // scene.addLayer(worldFill);
                    scene.addLayer(worldLine);
                    scene.addLayer(dotPoint);
                    scene.addLayer(flyLine);
                });
            },
            mapboxThirdTu: function () {
                const scene = new Scene({
                    id: 'map',
                    map: new Mapbox({
                        pitch: 0,
                        style: 'blank',
                        center: [ 3.438, 40.16797 ],
                        zoom: 0.51329
                    })
                });
                Promise.all([
                    fetch(
                        'https://gw.alipayobjects.com/os/antvdemo/assets/data/world.geo.json'
                    ).then(d => d.json()),
                    fetch(
                        'https://gw.alipayobjects.com/os/basement_prod/f3c467a4-9ae0-4f08-bb5f-11f9c869b2cb.json'
                    ).then(d => d.json())
                ]).then(function onLoad([ world, population ]) {
                    const popobj = {};
                    population.forEach(element => {
                        popobj[element.Code] =
                            element['Population, female (% of total) (% of total)'];
                    });
                    // 数据绑定
                    world.features = world.features.map(fe => {
                        fe.properties.female = popobj[fe.id] * 1 || 0;
                        return fe;
                    });
                    const colors = [
                        // '#EFF3F6',
                        '#0A3663',
                        '#1558AC',
                        '#3771D9',
                        '#4D89E5',
                        '#64A5D3',
                        '#72BED6',
                        '#83CED6',
                        '#A6E1E0',
                        '#B8EFE2',
                        '#D7F9F0'
                    ];
                    const layer = new PolygonLayer({})
                        .source(world)
                        .scale('female', {
                            type: 'quantile'
                        })
                        .color('female', colors)
                        .shape('fill')
                        .style({
                            opacity: 0.9
                        });

                    const layer2 = new LineLayer({
                        zIndex: 2
                    })
                        .source(world)
                        .color('#fff')
                        .size(0.3)
                        .style({
                            opacity: 1
                        });

                    scene.addLayer(layer);
                    scene.addLayer(layer2);
                });
            },
            mapboxTest: function () {
                const scene = new Scene({
                    id: 'map',
                    map: new Mapbox({
                        pitch: 20,
                        style: 'blank',
                        center: [ 3.438, 40.16797 ],
                        zoom: 0.81329
                    })
                });
                Promise.all([
                    fetch('https://gw.alipayobjects.com/os/antvdemo/assets/data/world.geo.json').then(d => d.json()),
                    fetch('https://gw.alipayobjects.com/os/basement_prod/4472780b-fea1-4fc2-9e4b-3ca716933dc7.json').then(d => d.text()),
                    fetch('https://gw.alipayobjects.com/os/basement_prod/a5ac7bce-181b-40d1-8a16-271356264ad8.json').then(d => d.text())
                ]).then(function onLoad([ world, dot, flyline ]) {

                    const dotData = eval(dot);
                    const flydata = eval(flyline).map(item => {
                        const latlng1 = item.from.split(',').map(e => { return e * 1; });
                        const latlng2 = item.to.split(',').map(e => { return e * 1; });
                        return { coord: [ latlng1, latlng2 ] };
                    });
                    const worldFill = new PolygonLayer()
                      .source(world)
                      .color('#2b2b3a')
                      .shape('fill')
                      .style({
                        opacity: 1
                      });

                    const worldLine = new LineLayer()
                        .source(world)
                        .color('#41fc9d')
                        .size(0.5)
                        .style({
                            opacity: 0.4
                        });
                    const dotPoint = new PointLayer()
                        .source(dotData, {
                            parser: {
                                type: 'json',
                                x: 'lng',
                                y: 'lat'
                            }
                        })
                        .shape('circle')
                        .color('#ffed11')
                        .animate(true)
                        .size(40)
                        .style({
                            opacity: 1.0
                        });
                    const flyLine = new LineLayer()
                        .source(flydata, {
                            parser: {
                                type: 'json',
                                coordinates: 'coord'
                            }
                        })
                        .color('#ff6b34')
                        .shape('arc3d')
                        .size(2)
                        .active(true)
                        .animate({
                            interval: 2,
                            trailLength: 2,
                            duration: 1
                        })
                        .style({
                            opacity: 1
                        });

                    scene.addLayer(worldFill);
                    scene.addLayer(worldLine);
                    scene.addLayer(dotPoint);
                    scene.addLayer(flyLine);
                });
            },
            mapboxTest2: function () {
                const scene = new Scene({
                    id: 'map',
                    map: new Mapbox({
                        pitch: 20,
                        style: 'blank',
                        center: [ 3.438, 40.16797 ],
                        zoom: 0.81329
                    })
                });
                Promise.all([
                    fetch('/static/sdsec/js/world.geo.json').then(d => d.json()),
                    fetch('/static/sdsec/js/dot-data.json').then(d => d.text()),
                    fetch('/static/sdsec/js/flyline-data.json').then(d => d.text())
                ]).then(function onLoad([ world, dot, flyline ]) {

                    const dotData = eval(dot);
                    const flydata = eval(flyline).map(item => {
                        const latlng1 = item.from.split(',').map(e => { return e * 1; });
                        const latlng2 = item.to.split(',').map(e => { return e * 1; });
                        return { coord: [ latlng1, latlng2 ] };
                    });
                    const worldFill = new PolygonLayer()
                      .source(world)
                      .color('#2b2b3a')
                      .shape('fill')
                      .style({
                        opacity: 1
                      });

                    const worldLine = new LineLayer()
                        .source(world)
                        .color('#41fc9d')
                        .size(0.5)
                        .style({
                            opacity: 0.4
                        });
                    const dotPoint = new PointLayer()
                        .source(dotData, {
                            parser: {
                                type: 'json',
                                x: 'lng',
                                y: 'lat'
                            }
                        })
                        .shape('circle')
                        .color('#ffed11')
                        .animate(true)
                        .size(40)
                        .style({
                            opacity: 1.0
                        });
                    const flyLine = new LineLayer()
                        .source(flydata, {
                            parser: {
                                type: 'json',
                                coordinates: 'coord'
                            }
                        })
                        .color('#ff6b34')
                        .shape('arc3d')
                        .size(2)
                        .active(true)
                        .animate({
                            interval: 2,
                            trailLength: 2,
                            duration: 1
                        })
                        .style({
                            opacity: 1
                        });

                    scene.addLayer(worldFill);
                    scene.addLayer(worldLine);
                    scene.addLayer(dotPoint);
                    scene.addLayer(flyLine);
                });
            },
            mapboxTest3: function () {
                const scene = new Scene({
                    id: 'map',
                    map: new Mapbox({
                        pitch: 20,
                        style: 'blank',
                        center: [ 3.438, 40.16797 ],
                        zoom: 0.81329
                    })
                });
                Promise.all([
                    fetch('/static/sdsec/js/world.geo.json').then(d => d.json()),
                    // fetch('/static/sdsec/js/countries-geo/countries.geo.json').then(d => d.json()),
                    fetch('/static/sdsec/js/dot-data.json').then(d => d.text()),
                    fetch('/static/sdsec/js/flyline-data.json').then(d => d.text())
                ]).then(function onLoad([ world, dot, flyline ]) {

                    const dotData = eval(dot);
                    const flydata = eval(flyline).map(item => {
                        const latlng1 = item.from.split(',').map(e => { return e * 1; });
                        const latlng2 = item.to.split(',').map(e => { return e * 1; });
                        return { coord: [ latlng1, latlng2 ] };
                    });
                    const worldFill = new PolygonLayer()
                      .source(world)
                      .color('#2b2b3a')
                      .shape('fill')
                      .style({
                        opacity: 1
                      });

                    const worldLine = new LineLayer()
                        .source(world)
                        .color('#41fc9d')
                        .size(0.5)
                        .style({
                            opacity: 0.4
                        });
                    const dotPoint = new PointLayer()
                        .source(dotData, {
                            parser: {
                                type: 'json',
                                x: 'lng',
                                y: 'lat'
                            }
                        })
                        .shape('circle')
                        .color('#ffed11')
                        .animate(true)
                        .size(40)
                        .style({
                            opacity: 1.0
                        });
                    const flyLine = new LineLayer()
                        .source(flydata, {
                            parser: {
                                type: 'json',
                                coordinates: 'coord'
                            }
                        })
                        .color('#ff6b34')
                        .shape('arc3d')
                        .size(2)
                        .active(true)
                        .animate({
                            interval: 2,
                            trailLength: 2,
                            duration: 1
                        })
                        .style({
                            opacity: 1
                        });

                    scene.addLayer(worldFill);
                    scene.addLayer(worldLine);
                    scene.addLayer(dotPoint);
                    scene.addLayer(flyLine);
                });
            }
        }
    };


</script>

<style>
  .map-div {
    height: 650px;
    width: 100%;
  }
  .map-l7 canvas {
    background-color: #2b2b3b;
  }
</style>

