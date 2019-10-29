import axios from 'axios';

export default class TwaverHandle {
  constructor() {
    this.box = new twaver.ElementBox();
    this.network = new twaver.vector.Network(this.box);
  }

  // 数据清洗
  boxNodeClean () {

  }

  handleNodeClick() {
    this.network.addInteractionListener((e) => {
      if (e.kind === 'doubleClickElement' &&
      e.element && 
      e.element.getClassName() === 'twaver.Node' &&
      e.element.getToolTip()) {
        // 获取当前节点的数据
        this.dialogShow(e.element.getToolTip(), {
          x: e.event.clientX, y: e.event.clientY
        });
      } else {
        this.dialogHide();
      }
      return e;
    });
  }

  getDataByAssetId(id) {
    let result;
    this.box._dataList._as.map(node => {
      if (node instanceof twaver.Node) {
        if (node.getToolTip() === id) {
          result = node;
        }
      }
    })
    return result;
  }

  createDomain(element, nodeList) {
    let group = new twaver.Group('group-' + element.id);
    element.image && group.setImage(element.image || 'group_image');
    element.name && group.setName(element.name);
    group.setExpanded(true);
    let from = this.getDataByAssetId(element.root);
    this.box.add(group);
    let location = {x: element.x, y: element.y};
    nodeList.map((value, index) => {
      let node = new twaver.Node({name: value.assetIp || '主机', id: 'node-' + value.assetId});
      node.setImage(element.image || 'node_image');
      node.setToolTip(value.assetId);
      node.setLocation({
        "x": location.x + ((100 * index) % 400),
        "y": location.y + Math.floor((index) / 4) * 150
      });
      group.addChild(node);

      let link = new twaver.Link(`link-${element.root}-${value.assetId}`, from, node);
      link.s('link.bundle.expanded', false);

      this.box.add(node);
      this.box.add(link);
    })
  }

  setRefs(ref, src, dst) {
    console.log(this.box._dataList._as.length)
    let refs = ref.split(',');
    refs.unshift(src);
    refs.push(dst);
    this.box._dataList._as.map(node => {
      if (node instanceof twaver.Link && node.getFromNode() && node.getToNode()) {
        let fromId = node.getFromNode().getToolTip();
        let toId = node.getToNode().getToolTip();
        if (fromId && toId) {
          for (let i = 1; i < refs.length; i++) {
            if ((fromId === refs[i-1] && toId === refs[i]) ||
            (fromId === refs[i] && toId === refs[i-1])) {
              // console.log(node)
              node.s('link.color', 'red');
            }
          }
        }
      }
    })
  }

  setNewAlarmCount (id) {
    let node = this.box.getDataById('node-' + id);
    node.getAlarmState()
      .setNewAlarmCount(twaver.AlarmSeverity.add(500, 'Critical', '', "red"), '');
    // let icons;
    let it = setInterval(() => {
      if (!node.getAlarmState().isEmpty()) {
        node.getAlarmState().removeAllNewAlarms('Critical');
      } else {
        node.getAlarmState()
          .setNewAlarmCount(twaver.AlarmSeverity.add(500, 'Critical', '', "red"), '');
      }
    }, 500);
    // this.inters.push(it);
  }

  async dialogShow(id, l) {
    if (!this.dialog) {
      let dialog = document.createElement('div');
      dialog.className = 'dialog';
      dialog.style.display = 'none';
      document.querySelector(".json-preview").appendChild(dialog);
      let dialogBackground = document.createElement('div');
      let dialogContent = document.createElement('div');
      dialogBackground.className = 'background';
      dialogContent.className = 'content';
      dialog.appendChild(dialogBackground);
      dialog.appendChild(dialogContent);
      this.dialog = dialog;
    }

    const assetRes = await axios.get('/ssa/topology/asset/info.do', {params: {id: id}})
    let asset = assetRes.data.data;

    let text = `<p>资产ID: ${asset.ID}</p>`;
    if (asset.NAME) {
      text += `<p>资产名称: ${asset.NAME}</p>`
    }
    if (asset.IP_ADDRESS) {
      text += `<p>资产IP: ${asset.IP_ADDRESS}</p>`
    }
    
    this.dialog.querySelector('.content').innerHTML = text;
    this.dialog.style.left = `${l.x}px`;
    this.dialog.style.top = `${l.y}px`;
    this.dialog.style.display = 'block';
  }
  dialogHide() {
    this.dialog && (this.dialog.style.display = 'none');
  }
}