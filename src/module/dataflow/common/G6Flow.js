import G6 from '@antv/g6';
import { toG6Graph } from './Convertor';
import '@antv/g6/build/plugin.layout.dagre'

G6.registerNode('model-card', {
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
    group.addShape('image', {
      attrs: {
        img: this.icon,
        x: x + 140,
        y: y + 12,
        width: 16,
        height: 16,
        color: '#25b864'
      }
    });
    return keyShape;
  },
  // 设置锚点
  anchor: [
    [ 0.5, 0, {type: 'input'} ], // 上面边的中点
    [ 0.5, 1, {type: 'output'} ] // 下边边的中点
    // [ 0, 0.5, {type: 'input'} ], // 上面边的中点
    // [ 1, 0.5, {type: 'output'} ]
  ]
});

G6.registerNode('card', {
  label: '',
  icon: ''
}, 'model-card');

G6.registerNode('complete-card', {
  label: '',
  icon: '/static/g6/icon/complete.svg'
}, 'model-card');

G6.registerNode('pause-card', {
  label: '',
  icon: '/static/g6/icon/pause.svg'
}, 'model-card');

export default class G6Flow {
  constructor (dom, data, apps, records) {
    let graph = new G6.Graph({
      container: dom,
      // fitView: 'cc',
      minZoom: 0.4,
      maxZoom: 2,
      modes: {
        default: ['drag-canvas', 'zoom-canvas']
      },
      mode: 'default',
      fitView: 'autoZoom',
      // layout: new G6.Layouts.Dagre(),
      plugins: [new G6.Plugins['layout.dagre']({rankdir: 'TB'})], // LR
    });
    // graph.node({
    //   shape: 'rect',
    //   style: {
    //     color: '#1890FF',
    //     stroke: '#1890FF',
    //     fill: '#FFF',
    //     fillOpacity: 0.45,
    //     lineWidth: 2,
    //   }
    // });
    graph.edge({
      style: {
        endArrow: true
      }
    });
    let graphData = toG6Graph(data, apps);
    graphData.nodes = graphData.nodes.map(node => {
      if (node.shape == 'card') {
        node.shape = 'pause-card'
        records && records.map(record => {
          if (record.stepName == node.label && record.status === 'COMPLETED') {
            node.shape = 'complete-card';
          }
        })
      }
      return node;
    })
    graph.read(graphData);

    // graph.on('wheel', (ev) => {
    //   console.log(ev)
    // }); 
    console.log(graph)
  }
}