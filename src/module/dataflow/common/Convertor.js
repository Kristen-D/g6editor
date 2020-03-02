import { guid } from './Util';

const SHAPES = ["START", "END", "SYNC"];
const SHAPES_LABEL = ["开始", "结束", "合并"];

// const base64 = new Base64();

export const toTaskParam = (graph) => {
  let hashMap = {}, params = [];
  graph.nodes.map(node => {
    hashMap[node.id] = node;
  });
  graph.edges.map(edge => {
    const source = hashMap[edge.source];
    const target = hashMap[edge.target];
    source.nextAppId = !source.nextAppId ? '' + target.id 
      : source.nextAppId + (',' + target.id)
    target.preAppId = !target.preAppId ? '' + source.id
     : target.preAppId + (',' + source.id)
  })
  graph.nodes.map(node => {
    let param = {};
    node.nextAppId ? param['next-app-id'] = node.nextAppId : '';
    node.preAppId ? param['pre-app-id'] = node.preAppId : '';
    param['app-type'] = node.appName.slice(4);
    param['app-id'] = node.id;
    param['ssa-app-id'] = parseInt(node.appId);
    param['class-name'] = node.className;
    params.push({
      ...param, ...node.properties
    })
  })
  return JSON.stringify(params);
}


export const toFloGraph = (graph) => {

  let start, end, hashMap = {};
  graph.nodes.map(node => {  // 转换设置 topicId
    if (node.label === '开始') {
      start = node.id;
    } else if (node.label === '结束') {
      end = node.id;
    }
    hashMap[node.id] = node;
  })
  graph.edges.map((edge, i) => {
    let topic = `topic-${guid()}`;
    if (edge.source != start && edge.target != end) {
      if (hashMap[edge.source]['properties']['generate-topic']) {
        hashMap[edge.target]['receive-topic'] = hashMap[edge.source]['properties']['generate-topic'];
      } else {
        hashMap[edge.source]['generate-topic'] = topic;
        hashMap[edge.target]['receive-topic'] = topic;
      }
    }
  })

  return {
    nodes: graph.nodes.map(node => {
      node.appId && (node.properties['ssa_app_id'] = node.appId)
      node.appType != undefined && (node.properties['ssa_app_type'] = node.appType)
      node['generate-topic'] && (node.properties['generate-topic'] = node['generate-topic'])
      node['receive-topic'] && (node.properties['receive-topic'] = node['receive-topic'])
      let o = {
        properties: {},
        id: node.id,
        metadata: {}
      }
      for (let key in node.properties) {
        if (node.properties.hasOwnProperty(key) && node.properties[key]) {
          // console.log(node.properties[key])
          // o.properties[key] = base64.encode(new String(node.properties[key]));
          o.properties[key] = node.properties[key];
        }
      }
      o.name = node.label;
      if (SHAPES_LABEL.includes(node.label)) {
        o.name = SHAPES[SHAPES_LABEL.indexOf(node.label)];
      } else {
        o.name = `${node.appName}-${node.uid ? node.uid : guid() + `$${node.appId}$`}:${node.appName}`
      }

      return o;
    }),
    links: graph.edges.map(edge => {
      let link = {};
      if (edge.status) {
        link.properties = {transitionName: edge.status}
      }
      return {
        ...link,
        from: edge.source,
        to: edge.target
      }
    })
  }
}

export const toG6Graph = (graph, apps) => {
  return {
    nodes: graph.nodes.map(node => {
      let o = {
        color: "#1890FF",
        type: "node",
      }
      o.id = node.id;
      if (SHAPES.includes(node.name)) {
        o.label = SHAPES_LABEL[SHAPES.indexOf(node.name)];
        o.shape = "flow-circle";
        o.size = "80*80"
      } else {
        if (node.metadata && node.metadata.label) {
          o.uid = node.metadata.label.split('-')[2];
        }
        o.shape = "card";
        o.size = "170*46"
        o.properties = node.properties || {};
        // o.properties = {};

        // for (let key in node.properties) {
        //   if (node.properties.hasOwnProperty(key) && node.properties[key]) {
        //     o.properties[key] = base64.decode(node.properties[key]);
        //   }
        // }
        
        apps.map(app => {
          if (app.ssaAppId == o.properties['ssa_app_id']) {
            o.label = app.appDesc;
            o.appId = app.ssaAppId;
            o.appType = app.ssaAppType;
            o.appName = app.ssaAppName;
            o.appDesc = app.description
          }
        })
      }
      return o;
    }),
    edges: graph.links.map(link => {
      return {
        source: link.from,
        target: link.to
      }
    })
  }
}

export const toProperties = (data) => {
  return data.options.map(option => {
    return {
      key: option.name,
      defaultValue: option.defaultValue,
      description: option.description,
      value: ''
    }
  })
}