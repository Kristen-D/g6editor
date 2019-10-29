<template>
  <div id="preview">
    <top-search @change="filterChange" :filters="filters"></top-search>
  </div>
</template>

<script>
// import {reload, initNode} from '../common/index';
import TopSearch from '../components/TopSearch'
import axios from 'axios';
import TwaverNode from '../common/TwaverNode';
import Bus from '../common/bus';
import Tree from '../common/treeAlgorithm';
import Ref from '../common/refAlgorithm';

let nodeData = []; // 主机数据
let nodeAsset = []; // 节点数据
let linkAsset = []; // 节点连线
let linkMore = []; // 主机连线

export default {
  name: 'Preview',
  components: {TopSearch},
  data() {
    return {
      filters: [[], [], []]
    }
  },
  methods: {
    filterChange(val) {
      //reload(val);
      TwaverNode.reloadIcon(nodeData, val);
    },
    addAlarmFilter (fitler, value) {
      let flag = true;
      fitler.map(f => {
        if (f.key === value.key) {
          flag = false;
        }
      });
      flag && value.key && fitler.push(value);
    }
  },
  async mounted() {
    nodeData = []; // 主机数据
    nodeAsset = []; // 节点数据
    linkAsset = []; // 节点连线
    linkMore = []; // 主机连线
    // initNode();
    TwaverNode.init();

    let id = this.$route.query.id;
    let debug = this.$route.query.debug;
    
    const imageRes = await axios.get('/ssa/topology/image/list.do', {params: {topologyId: id, t: Date.now()}})
    TwaverNode.registerImages(imageRes.data.data, id).then( () => {
      TwaverNode.network.invalidateElementUIs();
    });

    const nodeRes = await axios.get('/ssa/topology/node/list.do', {params: {topologyId: id, t: Date.now()}})
    let nodes = nodeRes.data.data;
    nodeAsset = nodes;
        
    for (let i = 0; i < nodes.length; i++) {
      TwaverNode.createNode(nodes[i], debug);
    }

    const groupRes = await axios.get('/ssa/topology/group/list.do', {params: {topologyId: id, t: Date.now()}})
    let groups = groupRes.data.data;

    let hasGroups = [];
    for(let i = 0; i < groups.length; i++) {
      let group = groups[i];
      if (group.ids) {
        group.ids = group.ids.split(',');
        group.ids && TwaverNode.createGroup(group, (list) => {
          if (list && list.length > 0) {
            hasGroups.push({
              id: group.id, list: list
            })
          }
        });
      } else if (group.domain) {
        const domainRes = await axios.get('/ssa/topology/domain/list.do', {params: {domain: group.domain, t: Date.now()}})
        console.log(i)
        let data = domainRes.data.data
        let promis = [];
        nodeData = nodeData.concat(data);
        linkMore = linkMore.concat(data.map((v, i) => {
          return {
            origin: parseInt(group.root), target: v.assetId, id: v.assetId
          }
        }))
        data.map((value, index) => {
          promis.push(axios.get('/ssa/topology/alarm/list.do', {params: {assetId: value.assetId}}))
        })
        let filters = [...this.filters];
        Promise.all(promis).then((values) => {
          values.map((value, index) => {
            let d = value.data.data;
            if (d && d.length > 0) {
              data[index].alarm = d;
              for (let i = 0; i < d.length; i++) {
                this.addAlarmFilter(filters[0], {key: d[i].type, value: d[i].typeName});
                this.addAlarmFilter(filters[1], {key: d[i].sub, value: d[i].subName});
                this.addAlarmFilter(filters[2], {key: d[i].event, value: d[i].eventName});
              }
            }
          })
          this.filters = filters;
          TwaverNode.autoAddNode(group, data);
          TwaverNode.reloadIcon(data, {one: '0', two: '0', three: '0'});
        })
      }  
    }
    if (hasGroups && hasGroups.length > 0) {
      TwaverNode.createHasGroup(hasGroups);
    }

    let linkRes = await axios.get('/ssa/topology/link/list.do', {params: {topologyId: id}})
    let links = linkRes.data.data;
    linkAsset = links;

    for(let i = 0; i < links.length; i++) {
      let link = links[i];
      TwaverNode.createLink(link);
    }

    // console.log(nodeData, nodeAsset, linkAsset, linkMore)

    // let tree = new Tree(nodeData.concat(nodeAsset), linkAsset.concat(linkMore));
    // tree.setTree("192.168.1.20");
    // TwaverNode.setLinksStyle(tree.findLinksByIp("192.168.1.2"));


    // 画线
    if (this.$route.query.alarmId) {
      let refAssetRes = await axios.get('/ssa/topology/alarm/ref.do', {params: {id: this.$route.query.alarmId}})
      let refAsset = refAssetRes.data.data;
      let refObj = new Ref(nodeAsset, refAsset.ref);
    
      TwaverNode.setNewLinksStyle(refObj.findLinks(), refAsset.srcAssetId, refAsset.dstAssetId);
    }

    // console.log('tree1', tree)
    // console.log('tree2', tree.findLinksByIp("192.168.1.2"));
  },
}
</script>

<style>

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>

<style>
  .dialog {
    position: fixed;
    z-index: 300;
  }

  .dialog div.background {
    background: black;
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: 0.8;
  }

  .dialog div.content {
    padding: 5px 20px;
    color: white;
    position: relative;
    z-index: 1;
    line-height: 18px;
  }
  .dialog div.content p {
    padding: 0;
    font-size: 12px;
    margin: 0;
  }
  .top-panel {
    width: 500px;
    margin: 10px auto;
    position: relative;
    z-index: 2002;
  }
  .top-panel > div {
    float: left; width: 33%;
  }
</style>
