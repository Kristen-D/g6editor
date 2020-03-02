import PROP from './Properties';

export const toFloGraph = (graph) => {
  return {
    nodes: graph.nodes.map(node => {
      let props = {};
      // for (let key in node.properties) {
      //   if (node.properties.hasOwnProperty(key) && node.properties[key]) {
      //     props[key] = node.properties[key];
      //   }
      // }
      if (node.properties) {
        for (let i = 0; i < node.properties.length; i++) {
          if (node.properties[i].value) {
            props[node.properties[i].key] = node.properties[i].value;
          }
        }
      }
      return {
        name: node.label,
        properties: props,
        id: node.id,
        metadata: {}
      }
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
const SHAPES = ["START", "END", "SYNC"];
export const toG6Graph = (graph) => {
  console.log(graph)
  return {
    nodes: graph.nodes.map(node => {
      let o = {
        color: "#1890FF",
        type: "node",
      }
      o.id = node.id;
      o.label = node.name;
      if (SHAPES.includes(node.name)) {
        o.shape = "flow-circle";
        o.size = "80*80"
      } else {
        o.shape = "card";
        o.size = "170*46"
        o.properties = PROP.get(node.name);
        console.log(node.name, o.properties)
        if (node.properties) {
          for (let key in node.properties) {
            if (node.properties.hasOwnProperty(key)) {
              // o.properties[key] = node.properties[key];
              o.properties.map(v => {
                if (v.key === key) v.value = node.properties[key]
                return v;
              })
            }
          }
        }
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