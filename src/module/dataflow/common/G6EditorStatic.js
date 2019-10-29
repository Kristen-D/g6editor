import G6Editor from '@antv/g6-editor';
import G6 from '@antv/g6'
import './Nodes';
import '@antv/g6/build/plugin.layout.dagre';
import {toG6Graph} from './Convertor'

export default class G6EditorStatic {
  constructor (dom, graphData, apps, records, nodeClickCallback) {
    let editor = new G6Editor();
    let flow = new G6Editor.Flow({
      graph: {
        container: dom,
        layout: new G6.Layouts.Dagre({rankdir: 'LR'}),
        item: 'center',
        // fitView: 'autoZoom'
      },
    });
    editor.add(flow);

    graphData.nodes = graphData.nodes.map(node => {
      if (node.shape == 'card' && records && records.length > 0) {
        node.shape = 'pause'
        records.map(record => {
          if (record.stepName.includes(node.uid) && record.status === 'COMPLETED') {
            node.shape = 'complete';
            node.stepExecutionId = record.stepExecutionId;
          }
        })
      }
      node.stepExecutionId = node.stepExecutionId;
      return node;
    })
    flow.read(graphData);

    flow.getGraph().on('node:click', ev => {
      nodeClickCallback && nodeClickCallback(ev)
    })
  }
}
