let inters = [];
let ATTACKS = ['SQL注入', 'WebShell上传探测'];
let LEAKS = ['目录遍历', '权限绕过', '密码破解', '恶意广告'];
let VIRUS = ['蠕虫攻击', '远程控制木马'];

class TwaverNode {
  static createNode(box, element) {
    let node = new twaver.Node(element.id);
    node.setLocation(element.location.x, element.location.y);
    node.setImage(element.image);
    node.setName(element.name);
    // node.setName2(element.id);
    node.setStyle('select.style', 'none');
    node.setStyle('select.color', '#ccc');
    node.setStyle('label.font', '14px arial');
    if (element.size) {
      node.setSize(element.size.w, element.size.h)
    }
    if (element.check) {
      node.s('label.color', '#f87c4b');
    }
    element.tip && node.setClient('tip', element.tip);
    box.add(node);
    return node;
  }

  static createLink(box, element) {
    var from = box.getDataById(element.from);
    var to = box.getDataById(element.to);
    var link = new twaver.Link(element.id, from, to);
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

    box.add(link);
    return link;
  }

  static createGroup(box, element) {
    let group = new twaver.Group(element.id);
    box.add(group);

    group.setName(element.name);
    group.s('group.fill.color', '#f3f7fc');
    group.s('group.deep', 0);
    group.s('select.style', 'none');
    group.s('label.font', '25px arial');
    group.s('label.color', 'black');

    if (element.border !== false) {
      group.s('group.outline.width', 2);
      // group.s('vector.outline.pattern', [5, 2]);
      group.s('group.outline.color', '#6d9fcd');
      group.s('group.shape', 'rectangle');
      group.s('group.padding', 10);
    }
    if (element.paddingVertical) {
      group.s('group.padding.top', element.paddingVertical);
      group.s('group.padding.bottom', element.paddingVertical);
    }
    if (element.paddingHorizontal) {
      group.s('group.padding.left', element.paddingHorizontal);
      group.s('group.padding.right', element.paddingHorizontal);
    }
    group.s('group.join', 'bevel');
    element.parent && group.setParent(box.getDataById(element.parent));
    element.image && group.setImage(element.image);
    if (element.ids) {
      for (let i = 0; i < element.ids.length; i++) {
        group.addChild(box.getDataById(element.ids[i]));
      }
    }
    group.setExpanded(true);
    element.expand === false && group.setExpanded(element.expand);
    return group;
  }

  static createIcon(box, element, success) {
    let node = box.getDataById(element.id);
    node.s('icons.names', [element.icons, success && 'icon_success']);
    node.s('icons.position', ['top.top', 'right.right']);
    node.s('icons.orientation', 'left');
    // element.yoffset && node.s('icons.yoffset', element.yoffset);
  }

  static dialogShow(o, l) {
    if (!TwaverNode.dialog) {
      let dialog = document.createElement('div');
      dialog.className = 'dialog';
      dialog.style.display = 'none';
      document.body.appendChild(dialog);
      let dialogBackground = document.createElement('div');
      let dialogContent = document.createElement('div');
      dialogBackground.className = 'background';
      dialogContent.className = 'content';
      dialog.appendChild(dialogBackground);
      dialog.appendChild(dialogContent);
      TwaverNode.dialog = dialog;
    }
    let text = `<p>设备名：${o.name}</p>
            <p>设备IP：${o.name2}</p>`;
    if (o.alarm) {
      if (o.alarm.attack && o.alarm.attack.length > 0) {
        text += '<p><i class="cus-icon-attack"></i>&nbsp;&nbsp;网络攻击：</p>';
        o.alarm.attack.map(v => {
          text += `<p>&nbsp;&nbsp;${ATTACKS[v.key - 1]}: ${v.status === 1 ? '受攻击' : '已阻断'}</p>`;
        });
      }
      if (o.alarm.leak && o.alarm.leak.length > 0) {
        text += '<p><i class="cus-icon-leak"></i>&nbsp;&nbsp;漏洞设备：</p>';
        o.alarm.leak.map(v => {
          text += `<p>&nbsp;&nbsp;${LEAKS[v.key - 1]}: ${v.value}个</p>`;
        });
      }
      if (o.alarm.virus && o.alarm.virus.length > 0) {
        text += '<p><i class="cus-icon-virus"></i>&nbsp;&nbsp;病毒威胁：</p>';
        o.alarm.virus.map(v => {
          text += `<p>&nbsp;&nbsp;${VIRUS[v.key - 1]}: ${v.value}个</p>`;
        });
      }
    }

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

  static autoAddNode(box, element, linkIndex) {
    let group = TwaverNode.createGroup(box, element.group);
    let location = element.location;
    element.node = element.node.map((value, index) => {
      let node = new twaver.Node({name: value.name, id: element.group.id + '-node-' + index});
      node.setImage(value.image);
      node.setLocation({
        "x": location.x + ((100 * index) % 400),
        "y": location.y + Math.floor((index) / 4) * 150
      });
      node.setClient('tip', value);
      group.addChild(node);
      box.add(node);
      let link = TwaverNode.createLink(box, {
        from: element.group.root,
        to: node.getId(),
        id: element.group.id + '-link-' + index
        // "style": "vertical",
        // "value": 140
      });
      link.s('link.bundle.expanded', false);
      value.id = node.getId();
      value.linkId = element.group.id + '-link-' + index;
      value.linkType = linkIndex;
      return value;
    });
  }

  static setNewAlarmCount (box, nodeId) {
    let node = box.getDataById(nodeId.id);
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
    inters.push(it);
  }

  static reloadIcons(box, nodes, status = {attack: {}, leak: 0, virus: 0}) {
    if (inters.length > 0) {
      inters.map(v => {
        clearInterval(v);
      });
      inters = [];
    }
    // 全部情况下展示
    nodes.map(value => {
      let icons = [];
      let a = value.alarm;
      let success = false;
      if (a) {
        if (status.attack !== undefined) {
          if (a.attack && a.attack.length > 0) {
            if (status.attack.type) {
              for (let i = 0; i < a.attack.length; i++) {
                if ((status.attack.type === '0' || String(a.attack[i].key) === String(status.attack.type)) &&
                  (status.attack.state === '0' || String(status.attack.state) === String(a.attack[i].status))) {
                  icons.push('icon_attack');
                  break;
                }
                // if (status.attack.type === '0' || String(a.attack[i].key) === String(status.attack.type)) {
                //   icons.push('icon_attack');
                //   break;
                // }
              }
            } else {
              status.attack.type !== "" && icons.push('icon_attack');
            }
            for (let i = 0; i < a.attack.length; i++) {
              if (String(a.attack[i].status) === "2") {
                success = true;
                break;
              }
            }
          }
        }
        if (status.leak !== undefined && status.leak !== "") {
          if (a.leak && a.leak.length > 0) {
            if (status.leak) {
              for (let i = 0; i < a.leak.length; i++) {
                if (String(a.leak[i].key) === String(status.leak) || status.leak === '0') {
                  icons.push('icon_leak');
                  break;
                }
              }
            } else {
              icons.push('icon_leak');
            }
          }
        }
        if (status.virus !== undefined && status.virus !== "") {
          if (a.virus && a.virus.length > 0) {
            if (status.virus) {
              for (let i = 0; i < a.virus.length; i++) {
                if (String(a.virus[i].key) === String(status.virus) || status.virus === '0') {
                  icons.push('icon_virus');
                  break;
                }
              }
            } else {
              icons.push('icon_virus');
            }
          }
        }
      }
      console.log(icons)
      value.icons = icons;
      if (icons.length > 0) {
        TwaverNode.setNewAlarmCount(box, value);
        TwaverNode.createIcon(box, value, success);
      } else {
        let node = box.getDataById(value.id);
        node.getAlarmState().removeAllNewAlarms('Critical');
        TwaverNode.createIcon(box, value);
      }
    });
  }
}

TwaverNode.dialog = null;

export default TwaverNode;
