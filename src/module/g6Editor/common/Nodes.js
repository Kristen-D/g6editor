import G6Editor from '@antv/g6-editor';

const { Flow } = G6Editor;

// 注册模型卡片基类
Flow.registerNode('model-card', {
  draw(item) {
    const group = item.getGraphicGroup();
    const model = item.getModel();
    const width = 170;
    const height = 46;
    const x = -width / 2;
    const y = -height / 2;
    const borderRadius = 4;
    const keyShape = group.addShape('rect', {
      attrs: {
        x,
        y,
        width,
        height,
        radius: borderRadius,
        fill: 'white',
        stroke: '#CED4D9'
      }
    });
    // 左侧色条
    group.addShape('path', {
      attrs: {
        path: [
          [ 'M', x, y + borderRadius ],
          [ 'L', x, y + height - borderRadius ],
          [ 'A', borderRadius, borderRadius, 0, 0, 0, x + borderRadius, y + height ],
          [ 'L', x + borderRadius, y ],
          [ 'A', borderRadius, borderRadius, 0, 0, 0, x, y + borderRadius ]
        ],
        fill: '#1890FF'
      }
    });
    // 名称文本
    const label = model.label ? model.label : this.label;
    group.addShape('text', {
      attrs: {
        text: label,
        x: x + 10,
        y: y + 16,
        textAlign: 'start',
        textBaseline: 'top',
        fill: 'rgba(0,0,0,0.65)'
      }
    });
    return keyShape;
  },
  // 设置锚点
  anchor: [
    [ 0.5, 0, {type: 'input'} ], // 上面边的中点
    [ 0.5, 1, {type: 'output'} ] // 下边边的中点
  ]
});

Flow.registerNode('card', {
  label: '',
}, 'model-card');
Flow.registerNode('start', {
  label: 'START',
  anchor: [[ 0.5, 1, {type: 'output'}]]
}, 'model-card')
Flow.registerNode('end', {
  label: 'END',
  anchor: [[ 0.5, 0, {type: 'input'} ]]
}, 'model-card')

Flow.registerNode('pause', {
  label: 'operator',
  state_icon_url: '/static/g6/icon/pause.svg',
}, 'model-card');

Flow.registerNode('complete', {
  label: 'operator',
  state_icon_url: '/static/g6/icon/complete.svg',
}, 'model-card');

// k 均值聚类
Flow.registerNode('k-means', {
  label: 'k 均值聚类',
  color_type: '#1890FF',
  type_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
  state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg',
  // 设置锚点
  anchor: [
    [ 0.5, 0, {
      type: 'input'
    }], // 上面边的中点
    [ 0.5, 1, {
      type: 'output'
    }] // 下边边的中点
  ]
}, 'model-card');

// 随机森林
Flow.registerNode('random-forest', {
  label: '随机森林',
  color_type: '#9254DE',
  type_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
  state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg',
  // 设置锚点
  anchor: [
    [ 0.5, 0, {
      type: 'input'
    }],
    [ 0.5, 1, {
      type: 'output'
    }]
  ]
}, 'model-card');

// PS-SMART 分类
Flow.registerNode('PS-SMART', {
  label: 'PS-SMART 分类',
  color_type: '#1890FF',
  type_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
  state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg',
  // 设置锚点
  anchor: [
    [ 0.5, 0, {
      type: 'input'
    }],
    [ 0.33, 1, {
      type: 'output'
    }],
    [ 0.66, 1, {
      type: 'output'
    }]
  ]
}, 'model-card');

// 朴素贝叶斯
Flow.registerNode('Bayes', {
  label: '朴素贝叶斯',
  color_type: '#9254DE',
  type_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
  state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/uZVdwjJGqDooqKLKtvGA.svg',
  // 设置锚点
  anchor: [
    [ 0.5, 0, {
      type: 'input'
    }],
    [ 0.5, 1, {
      type: 'output'
    }]
  ]
}, 'model-card');

// 读数据表
Flow.registerNode('read-data-base', {
  label: '读数据表',
  color_type: '#FAAD14',
  type_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/czNEJAmyDpclFaSucYWB.svg',
  state_icon_url: 'https://gw.alipayobjects.com/zos/rmsportal/MXXetJAxlqrbisIuZxDO.svg',
  // 设置锚点
  anchor: [
    [ 0.5, 1, {
      type: 'output'
    }]
  ]
}, 'model-card');
