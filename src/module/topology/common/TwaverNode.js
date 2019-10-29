
const imgUrlPre = "/ssa/topology/";
import axios from 'axios';

const getCountAlarm = (alarm) => {
  let result = [
    { name: [], count: [] },
    { name: [], count: [] }, 
    { name: [], count: [] }
  ]
  let alarmIndex = ['typeName', 'subName', 'eventName']
  for (let aIndex = 0; aIndex < alarmIndex.length; aIndex++) {
    for (let i = 0; i < alarm.length; i++) {
      console.log(alarm[i][alarmIndex[aIndex]])
      if (alarm[i][alarmIndex[aIndex]]) {
        if (!result[aIndex].name.includes(alarm[i][alarmIndex[aIndex]])) {
          result[aIndex].name.push(alarm[i][alarmIndex[aIndex]])
          result[aIndex].count.push(1)
        } else {
          let index = result[aIndex].name.indexOf(alarm[i][alarmIndex[aIndex]])
          result[aIndex].count[index]++
        }
      }
    }
  }
  return result;
}

class TwaverNode {
  // box = null
  // network = null
  // inters = []
  static init () {
    this.box = new twaver.ElementBox();
    this.network = new twaver.vector.Network(this.box);
    this.inters = [];
    document.getElementById('preview').appendChild(this.network.getView());
    // this.network.adjustBounds({x: -(1920-screen.availWidth)/2, y: -(1280-screen.availHeight)/2, width: 1920, height: 1280});
    this.network.adjustBounds({
      x: 0, y: 0,
      width: screen.availWidth,
      height: screen.availHeight
    });
    this.network.setZoom(0.7)

    this.initPopupPanel();

    this.registerIcons();

    this.handleNodeClick()
  }
  static registerImages(list, id) {
    let pList = [];
    for (let i = 0; i < list.length; i++) {
      (function (i) {
        pList.push(new Promise((resolve, reject) => {
          let image = new Image();
          let url = imgUrlPre + id + '/' + list[i].name + list[i].suffix;
          image.src = url;
          if (image.complete) {
            twaver.Util.registerImage(list[i].name, image, image.width, image.height);
            resolve();
          } else {
            image.onload = function () {
              twaver.Util.registerImage(list[i].name, image, image.width, image.height);
              image.onload = null;
              resolve();
            }
            image.onerror = () => {
              image.onload = null;
              resolve();
            }
          }
        }))
      }(i))
    }
    return Promise.all(pList);
  }

  static registerIcons() {
    let imgUrlPre = '/static/images/twaver/icon/';
    let list = ['illegal.png', 'leak.png', 'virus.png'];
    let iconName = ['icon_one', 'icon_two', 'icon_three'];
    let pList = [];
    for (let i = 0; i < list.length; i++) {
      (function (i) {
        pList.push(new Promise((resolve, reject) => {
          let image = new Image();
          let url = imgUrlPre + list[i];
          image.src = url;
          image.onload = function () {
            twaver.Util.registerImage(iconName[i], image, image.width, image.height);
            image.onload = null;
            resolve();
          };
        }))
      }(i))
    }
    return Promise.all(pList);
  }

  static createNode(element, debug) {
    let node = new twaver.Node('node-' + element.id);
    node.setLocation(element.x, element.y);
    node.setImage(element.image);
    node.setName(element.name);
    debug && node.setName2(element.id);
    node.setStyle('select.style', 'none');
    node.setStyle('select.color', '#ccc');
    node.setStyle('label.font', '14px arial');
    if (element.size) {
      node.setSize(element.size.w, element.size.h)
    }
    if (element.check) {
      node.s('label.color', '#f87c4b');
    }

    if (element.operate) {
      node.setClient("popup", element.operate);
    }

    // element.assetId && (node.setToolTip(element.assetId));
    node.setToolTip("")
    node.setClient('tip', element.assetId);

    this.box.add(node);
  }

  static createLink(element) {
    var from = this.box.getDataById('node-' + element.origin);
    var to = this.box.getDataById('node-' + element.target);
    var link = new twaver.Link(`link-${element.origin}-${element.target}`, from, to);
    // link.setName(element.id);
    if (element.style) {
      link.s('link.type', 'orthogonal.' + element.style);
      link.s('link.split.by.percent', false);
      link.s('link.split.value', element.value || 65);
    }
    link.s('link.form.at.edge', false);
    link.s('link.handler.padding', 30);
    link.s('link.xradius', 0);
    link.s('link.yradius', 0);
    element.name && link.setName(element.name);
    element.name2 && link.setName2(element.name2);

    link.setStyle('link.width', 1);
    link.setStyle('link.gap', 50);
    link.setStyle('link.color', '#6d9fcd');
    link.setStyle('link.pattern', [5, 2]);

    this.box.add(link);
    return link;
  }

  static setLinksStyle(nodes, type) {
    for (let i = 0; i < nodes.length - 1; i++) {
      let origin = nodes[i].data.id || nodes[i].data.assetId;
      let target = nodes[i + 1].data.id || nodes[i + 1].data.assetId;
      let link = this.box.getDataById(`link-${origin}-${target}`)
       || this.box.getDataById(`link-${target}-${origin}`)
      if (link) {
        link.setStyle('link.pattern', [5, 0]);
        link.setStyle('link.color', 'red');
      }
    }
  }

  static setNewLinksStyle(links, src, dst) {
    for (let i = -1; i < links.length; i++) {
      let origin;
      let target;
      if (i === -1) {
        origin = links[0].id;
        target = src;
      } else if (i === links.length - 1) {
        origin = links[links.length - 1].id;
        target = dst;
      } else {
        origin = links[i].id;
        target = links[i + 1].id
      }
      let link = this.box.getDataById(`link-${origin}-${target}`) || 
      this.box.getDataById(`link-${target}-${origin}`);
      if (link) {
        link.setStyle('link.pattern', [5, 0]);
        link.setStyle('link.color', 'red');
      }
    }
  }

  static createHasGroup(element) {
    console.log(element)
    for (let i = 0; i < element.length; i++) {
      let group = this.box.getDataById('group-' + element[i].id);
      for (let j = 0; j < element[i].list.length; j++) {
        group.addChild(this.box.getDataById(element[i].list[j]))
      }
      console.log(group)
    }
  }

  static createGroup(element, hasGroupCallback) {
    let group = new twaver.Group('group-' + element.id);
    let groups = [];
    this.box.add(group);

    group.setName(element.name);
    group.s('group.fill.color', '#f3f7fc');
    group.s('group.deep', 0);
    group.s('select.style', 'none');
    group.s('label.font', '25px arial');
    group.s('label.color', 'black');
    group.s('group.outline.width', 2);
    // group.s('vector.outline.pattern', [5, 2]);
    group.s('group.outline.color', '#6d9fcd');
    group.s('group.shape', 'rectangle');
    group.s('group.padding', 10);

    if (element.paddingVertical) {
      group.s('group.padding.top', element.paddingVertical);
      group.s('group.padding.bottom', element.paddingVertical);
    }
    if (element.paddingHorizontal) {
      group.s('group.padding.left', element.paddingHorizontal);
      group.s('group.padding.right', element.paddingHorizontal);
    }
    group.s('group.join', 'bevel');
    // element.root && group.setParent(this.box.getDataById('node-' + element.root));
    element.image && group.setImage(element.image);
    if (element.ids) {
      for (let i = 0; i < element.ids.length; i++) {
        if (String(element.ids[i]).includes('group')) {
          groups.push(element.ids[i]);
        } else {
          group.addChild(this.box.getDataById('node-' + element.ids[i]));
        }
      }
    }
    hasGroupCallback && hasGroupCallback(groups);
    group.setExpanded(true);
    element.expand === false && group.setExpanded(element.expand);
    return group;
  }

  static autoAddNode(element, nodeList) {
    let group = this.createGroup(element);
    let location = {x: element.x, y: element.y};
    nodeList.map((value, index) => {
      let node = new twaver.Node({name: value.assetIp || '主机', id: 'node-' + value.assetId});
      node.setImage(element.image);
      node.setLocation({
        "x": location.x + ((100 * index) % 400),
        "y": location.y + Math.floor((index) / 4) * 150
      });
      group.addChild(node);
      this.box.add(node);

      let link = TwaverNode.createLink({
        origin: element.root,
        target: value.assetId,
        id: value.assetId
        // id: element.id + '-' + index
        // "style": "vertical",
        // "value": 140
      });
      link.s('link.bundle.expanded', false);

      // 设置双击事件的数据
      node.setClient('tip', value.assetId)

      if (value.alarm && value.alarm.length > 0) {
        this.setNewAlarmCount(value);
      }
    })
  }

  static reloadIcon (elements, filters) {

    if (this.inters.length > 0) {
      this.inters.map(v => { clearInterval(v); });
      this.inters = [];
    }
    
    elements.map((element, index) => {
      let icons = [];
      if (element.alarm && element.alarm.length > 0) {

        element.alarm.map(v => {
          if ((v.type && filters.one === String(v.type)) || (v.type && filters.one === '0')) {
            !icons.includes('icon_one') && icons.unshift('icon_one');
          }
          if ((v.sub && filters.two === String(v.sub)) || (v.sub && filters.two === '0')) {
            !icons.includes('icon_two') && icons.unshift('icon_two');
          }
          if ((v.event && filters.three === String(v.event)) || (v.event && filters.three === '0')) {
            !icons.includes('icon_three') && icons.unshift('icon_three');
          }
        })
        
        console.log('icons:', icons);
        // icons.length > 0 && this.createIcon(element, icons);
        this.createIcon(element, icons)

        if (icons.length > 0) {
          this.setNewAlarmCount(element)
        }
      }
    })
  }

  static setNewAlarmCount (element) {
    let node = this.box.getDataById('node-' + element.assetId);
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
    this.inters.push(it);
  }

  static createIcon(element, icons, success) {
    let node = this.box.getDataById('node-' + element.assetId);
    node.s('icons.names', [icons, success && 'icon_success']);
    node.s('icons.position', ['top.top', 'right.right']);
    node.s('icons.orientation', 'left');
    // element.yoffset && node.s('icons.yoffset', element.yoffset);
  }

  static async dialogShow(id, l) {
    if (!TwaverNode.dialog) {
      let dialog = document.createElement('div');
      dialog.className = 'dialog';
      dialog.style.display = 'none';
      document.querySelector("#preview").appendChild(dialog);
      let dialogBackground = document.createElement('div');
      let dialogContent = document.createElement('div');
      dialogBackground.className = 'background';
      dialogContent.className = 'content';
      dialog.appendChild(dialogBackground);
      dialog.appendChild(dialogContent);
      TwaverNode.dialog = dialog;
    }

    const assetRes = await axios.get('/ssa/topology/asset/info.do', {params: {id: id}})
    let asset = assetRes.data.data;
    console.log(asset)

    let text = `<p>资产ID: ${asset.ID}</p>`;
    if (asset.NAME) {
      text += `<p>资产名称: ${asset.NAME}</p>`
    }
    if (asset.IP_ADDRESS) {
      text += `<p>资产IP: ${asset.IP_ADDRESS}</p>`
    }
    // if (o.alarm) {
    //   let alarmRes = getCountAlarm(o.alarm)
    //   if (alarmRes[0].name.length > 0) {
    //     text += `<p><i class="cus-icon-attack"></i>&nbsp;&nbsp;告警：</p>`
    //     alarmRes[0].name.map((v, i) => {
    //       text += `<p>&nbsp;&nbsp;${v}: ${alarmRes[0].count[i]}个</p>`
    //     })
    //   }  
    //   if (alarmRes[1].name.length > 0) {
    //     text += `<p><i class="cus-icon-leak"></i>&nbsp;&nbsp;二级事件：</p>`
    //     alarmRes[1].name.map((v, i) => {
    //       text += `<p>&nbsp;&nbsp;${v}: ${alarmRes[1].count[i]}个</p>`
    //     })
    //   } 
    //   if (alarmRes[2].name.length > 0) {
    //     text += `<p><i class="cus-icon-virus"></i>&nbsp;&nbsp;三级事件：</p>`
    //     alarmRes[0].name.map((v, i) => {
    //       text += `<p>&nbsp;&nbsp;${v}: ${alarmRes[2].count[i]}个</p>`
    //     })
    //   }     
    // }
    
    TwaverNode.dialog.querySelector('.content').innerHTML = text;
    TwaverNode.dialog.style.left = `${l.x}px`;
    TwaverNode.dialog.style.top = `${l.y}px`;
    TwaverNode.dialog.style.display = 'block';
  }

  static dialogHide() {
    TwaverNode.dialog && (TwaverNode.dialog.style.display = 'none');
  }

  static setLinkStyle(box, id, type) {
    var link = box.getDataById(id);
    if (!link) return;
    if (type === "solid") {
      link.setStyle('link.width', 3);
      link.setStyle('link.color', '#f87c4b');
      link.setStyle('link.pattern', null);
    } else if (type === "dashed") {
      link.setStyle('link.width', 1);
      link.setStyle('link.color', '#6d9fcd');
      link.setStyle('link.pattern', [5, 2]);
    }
  }

  static initPopupPanel() {
    let popupMenu = new twaver.controls.PopupMenu(this.network);
  
    popupMenu.onMenuItemRendered = function (div, menuItem) {
      div.style['font-size'] = '12px';
    };
  
    popupMenu.onMenuShowing = (e) => {
      let rightClickNode = this.network.getSelectionModel().getLastData();
      // if (rightClickNode && rightClickNode.getClient('tip')) {
      console.log(rightClickNode)
      if (rightClickNode && rightClickNode.getClassName() === 'twaver.Node' && rightClickNode.getClient('popup')) {
        let data = rightClickNode.getClient('popup');
        let menus = data.split(',').map(v => {
          let arr = v.split('*');
          return {
            label: arr[0],
            action: function () {
              location.href = arr[1];
            }
          }
        });
        popupMenu.setMenuItems(menus);
        return true;
      }
      return false;
    }
  }

  static handleNodeClick() {
    this.network.addInteractionListener(function (e) {
      if (e.kind === 'doubleClickElement' &&
      e.element && 
      e.element.getClassName() === 'twaver.Node' &&
      e.element.getClient('tip')) {
        // 获取当前节点的数据
        let id = e.element.getClient('tip');
        TwaverNode.dialogShow(id, {
          x: e.event.clientX, y: e.event.clientY
        });
        // if (e.element.getClient('tip').alarm) {
        //   newData["link" + tip.linkType].map((value) => {
        //     TwaverNode.setLinkStyle(box, value.id, value.type);
        //   });
        //   TwaverNode.setLinkStyle(box, e.element.getClient('tip').linkId, "solid")
        // }
      } else {
        TwaverNode.dialogHide();
      }
    });
  }
}

TwaverNode.dialog = null;

export default TwaverNode;