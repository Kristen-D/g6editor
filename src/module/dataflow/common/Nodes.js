import G6Editor from '@antv/g6-editor';

const { Flow } = G6Editor;

const ICONS = {
  'ssa-source': '/static/g6/icon/source.png',
  'ssa-processor': '/static/g6/icon/processor.png',
  'ssa-sink': '/static/g6/icon/sink.png'
}

// 注册模型卡片基类
Flow.registerNode('model-card', {
  draw(item) {
    // const group = item.getGraphicGroup();
    // const model = item.getModel();
    // const width = 170;
    // const height = 46;
    // const x = -width / 2;
    // const y = -height / 2;
    // const borderRadius = 4;
    // const keyShape = group.addShape('rect', {
    //   attrs: {
    //     x,
    //     y,
    //     width,
    //     height,
    //     radius: borderRadius,
    //     fill: 'white',
    //     stroke: '#CED4D9'
    //   }
    // });
    // // 
    // group.addShape('path', {
    //   attrs: {
    //     path: [
    //       [ 'M', x, y + borderRadius ],
    //       [ 'L', x, y + height - borderRadius ],
    //       [ 'A', borderRadius, borderRadius, 0, 0, 0, x + borderRadius, y + height ],
    //       [ 'L', x + borderRadius, y ],
    //       [ 'A', borderRadius, borderRadius, 0, 0, 0, x, y + borderRadius ]
    //     ],
    //     fill: '#1890FF'
    //   }
    // });
    // // 名称文本
    // let label = model.label ? model.label : this.label;
    // if (label.length > 12) {
    //   label = label.substr(0, 12) + '...';
    // }
    // group.addShape('text', {
    //   attrs: {
    //     text: label,
    //     x: x + 10,
    //     y: y + 16,
    //     textAlign: 'start',
    //     textBaseline: 'top',
    //     fill: 'rgba(0,0,0,0.65)'
    //   }
    // });
    // group.addShape('image', {
    //   attrs: {
    //     img: this.state_icon_url,
    //     x: x + 140,
    //     y: y + 12,
    //     width: 16,
    //     height: 16,
    //     color: '#25b864'
    //   }
    // });
    const group = item.getGraphicGroup();
    const model = item.getModel();
    const width = 80;
    const height = 80;
    const x = -width / 2;
    const y = -height / 2;
   
    // 名称文本
    let label = model.label ? model.label : this.label;
    if (label.length > 15) {
      label = label.substr(0, 15) + '...';
    }
    group.addShape('text', {
      attrs: {
        text: label,
        x: x + 40,
        y: y + 90,
        textAlign: 'center',
        textBaseline: 'top',
        fill: 'rgba(0,0,0,0.65)'
      }
    });
    const keyShape = group.addShape('rect', {
      attrs: {
        x: x,
        y: y,
        width: width,
        height: width,
        fill: 'white',
        radius: 4,
        stroke: '#f2f2f2'
      }
    });
    group.addShape('image', {
      attrs: {
        img: ICONS[model.appName],
        x: x + 5,
        y: y + 5,
        width: 70,
        height: 70,
      }
    });
    if (this.state_icon_url) {
      group.addShape('image', {
        attrs: {
          img: this.state_icon_url,
          x: x + 70,
          y: y + 5,
          width: 16,
          height: 16,
        }
      });
    }
    return keyShape;
  },
  // 设置锚点
  anchor: [
    // [ 0.5, 0, {type: 'input'} ], // 上面边的中点
    // [ 0.5, 1, {type: 'output'} ] // 下边边的中点
    [ 0, 0.5, {type: 'input'} ], // 左边的中点
    [ 1, 0.5, {type: 'output'} ] // 右边的中点
  ]
});

Flow.registerNode('card', {
  label: '',
  appName: '',
  state_icon_url: '',
}, 'model-card');
// Flow.registerNode('start', {
//   label: 'START',
//   anchor: [[ 0.5, 1, {type: 'output'}]]
// }, 'model-card')
// Flow.registerNode('end', {
//   label: 'END',
//   anchor: [[ 0.5, 0, {type: 'input'} ]]
// }, 'model-card')

Flow.registerNode('pause', {
  label: 'operator',
  state_icon_url: '/static/g6/icon/pause.svg',
}, 'model-card');

Flow.registerNode('complete', {
  label: 'operator',
  state_icon_url: '/static/g6/icon/complete.svg',
}, 'model-card');
