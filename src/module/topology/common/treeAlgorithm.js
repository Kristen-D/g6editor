class Node {
  constructor(data) {
    this.data = data;
    this.parent = null;
    this.children = [];
  }
}

class Tree {
  constructor(data) {
    var node = new Node(data);
    this._root = node;
  }
}

export default class Algorithm {
  constructor(nodes, links) {
    this.nodes = nodes;
    this.links = links;
  }
  setTree(ip) {
    // 查找当前ip节点作为树的首节点
    for (let node of this.nodes) {
      if (node.assetIp === ip) {
        this.tree = new Tree(node);
        break;
      }
    }

    let children = this.bfs(this.tree._root);
    while (children.length > 0) {
      let newChildren = []
      for (let i = 0; i < children.length; i++) {
        newChildren = newChildren.concat(this.bfs(children[i]))
      }
      children = newChildren;
    }
  }
  dfs(node) {
    for (let link of this.links) {
      let id = node.data.id || node.data.assetId;
      if (id === link.origin) {
        let child = new Node(this.findNode(link.target));
        child.parent = node;
        node.children.push(child);
        this.dfs(child)
      } 
    }
  }
  bfs(node) {
    for (let link of this.links) {
      if (!link.selected) {
        let id = node.data.id || node.data.assetId;
        console.log(`${id}--${link.origin}--${link.target}`)
        if (id === link.origin) {
          link.selected = true;
          let child = new Node(this.findNode(link.target));
          node.children.push(child);
        } else if (id === link.target) {
          link.selected = true;
          let child = new Node(this.findNode(link.origin));
          node.children.push(child);
        }
      }
    }
    return node.children;
  }
  findNode(id) {
    return this.nodes.find((node) => node.id === id || node.assetId === id);
  }
  findLinksByIp(ip) {
    this.path = [];
    if (this.dfsFind(this.tree._root, ip)) {
      this.path.push(this.tree._root);
    }
    return this.path;
  }
  dfsFind(node, ip) {
    console.log(node.data.assetIp, ip)
    if (node.data.assetIp === ip) {
      return true;
    } else if (node.children.length > 0) {
      let flag = false;
      for (let child of node.children) {
        if (this.dfsFind(child, ip)) {
          flag = true;
          this.path.push(child);
          break;
        }
      }
      return flag;
    }
  }
}