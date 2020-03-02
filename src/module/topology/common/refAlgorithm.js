export default class {
  constructor (nodes, ref) {
    this.nodes = nodes;
    this.refs = ref.split(',');
  }

  findNodeByAssetId(id) {
    return this.nodes.find((node) => node.assetId == id);
  }

  findLinks() {
    return this.refs.map(ref => {
      return this.findNodeByAssetId(ref);
    })
  }
}