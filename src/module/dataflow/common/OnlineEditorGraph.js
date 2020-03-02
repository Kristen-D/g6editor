import G6Editor from '@antv/g6-editor';
import G6 from '@antv/g6'
import './Nodes';
import '@antv/g6/build/plugin.layout.dagre';

export default class OnlineEditorGraph {
  constructor (dom, graphData, records, logs, nodeClickCallback) {
    console.log(graphData, records)
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
      if (records && records.length > 0) {
        node.shape = 'pause'
        records.map(record => {
          if (record.appId == node.id && record.detail) {
            node.shape = 'complete';
            node.detail = record.detail;
          }
        })
        logs && logs.map(log => {
          if (log.appId == node.id && log.detail) {
            node.log = log.detail;
          }
        })
      }
      return node;
    })
    flow.read(graphData);

    flow.getGraph().on('click', ev => {
      // console.log(ev)
      nodeClickCallback && nodeClickCallback(ev)
    })
  }
}
