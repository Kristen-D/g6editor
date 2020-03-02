import TwaverNode from './node';
import {data as Data, popupData, moreServicer, newData} from "./data_sx";

const imgUrlPre = "/static/images/twaver/";

let imagesList = [
  {"name": "user.png", "key": "user"},
  {"name": "internet.png", "key": "internet"},
  // 互联网接入区
  {"name": "router.png", "key": "router"},
  {"name": "transfer.png", "key": "transfer"},
  {"name": "switchboard.png", "key": "switchboard"},
  {"name": "servicer.png", "key": "servicer"},
  {"name": "balancing.png", "key": "balancing"},
  {"name": "firewall.png", "key": "firewall"},
  {"name": "gateway.png", "key": "gateway"},
  {"name": "detection.png", "key": "detection"},
  {"name": "clean.png", "key": "clean"},
  {"name": "ddos.png", "key": "ddos"},
  {"name": "access.png", "key": "internetGroup"},
  // 互联网业务区
  {"name": "waf.png", "key": "waf"},
  {"name": "dataPrevention.png", "key": "dataPrevention"},
  {"name": "patch.png", "key": "patch"},
  {"name": "serviceGroup.png", "key": "serviceGroup"},
  {"name": "more.png", "key": "more"},
  {"name": "back.png", "key": "back"},
  //
  {"name": "tradition.png", "key": "tradition"},
  {"name": "develop.png", "key": "develop"},
  {"name": "terminal.png", "key": "terminal"},
  {"name": "manage.png", "key": "manage"},
  {"name": "government.png", "key": "government"},
  {"name": "specialLine.png", "key": "specialLine"},
  {"name": "dataLead.png", "key": "dataLead"},
  {"name": "access.png", "key": "access"},
  {"name": "videoArea.png", "key": "videoArea"},
  {"name": "videoSpecial.png", "key": "videoSpecial"},
  {"name": "core.png", "key": "core"},
  {"name": "bug.png", "key": "bug"},
  // 城市运营区
  {"name": "invade.png", "key": "invade"},
  {"name": "share.png", "key": "share"},

  // 运营管理
  {"name": "4as.png", "key": "4as"},
  {"name": "backsystem.png", "key": "backsystem"},
  {"name": "code.png", "key": "code"},
  {"name": "extendnetwork.png", "key": "extendnetwork"},
  {"name": "televisionline.png", "key": "televisionline"},
  {"name": "networkplatform.png", "key": "networkplatform"},
  {"name": "cloudplatform.png", "key": "cloudplatform"},
  {"name": "operatenetwork.png", "key": "operatenetwork"},
  {"name": "webscan.png", "key": "webscan"},
  // icon
  {'name': 'icon/Illegal.png', 'key': 'icon_attack'},
  {'name': 'icon/leak.png', 'key': 'icon_leak'},
  {'name': 'icon/virus.png', 'key': 'icon_virus'},
  {'name': 'icon/success.png', 'key': 'icon_success'}
];

function registerNormalImages(list) {
  let pList = [];
  for (let i = 0; i < list.length; i++) {
    (function (i) {
      pList.push(new Promise((resolve, reject) => {
        let image = new Image();
        let url = imgUrlPre + list[i].name;
        image.src = url;
        image.onload = function () {
          twaver.Util.registerImage(list[i].key, image, image.width, image.height);
          image.onload = null;
          resolve();
        };
      }))
    }(i))
  }
  return Promise.all(pList);
}

function init(network, box, nodes) {
  document.getElementById('preview').appendChild(network.getView());
  let rate = screen.availWidth / 1920;
  network.adjustBounds({x: -(1920-screen.availWidth)/2, y: -(1280-screen.availHeight)/2, width: 1920, height: 1280});

  network.setZoom(0.6)

  registerNormalImages(imagesList).then(function () {
    network.invalidateElementUIs();

    ((data = Data) => {
      if (data.node) {
        for (let i = 0; i < data.node.length; i++) {
          TwaverNode.createNode(box, data.node[i]);
        }
      }
      if (data.link) {
        for (let i = 0; i < data.link.length; i++) {
          TwaverNode.createLink(box, data.link[i]);
        }
      }
      if (data.group) {
        for (let i = 0; i < data.group.length; i++) {
          TwaverNode.createGroup(box, data.group[i]);
        }
      }

      if (data.icon) {
        for (let i = 0; i < data.icon.length; i++) {
          TwaverNode.createIcon(box, data.icon[i]);
        }
        network.invalidateElementUIs();
      }
    })();

    moreServicer.map((value, index) => {
      moreServicer[index].node = moreServicer[index].node.map((value) => {
        return {
          name: value.name,
          name2: value.ip,
          image: "servicer",
          alarm: value.alarm
        }
      });
      TwaverNode.autoAddNode(box, moreServicer[index], index);
    });
    moreServicer.map((value, index) => {
      moreServicer[index].node.map(v => {
        nodes.push(v);
      })
    });
    TwaverNode.reloadIcons(box, nodes);
    let number = {attack: 0, leak: 0, virus: 0, fail: 0, success: 0};
    let mLeak = 0;
    let mVirus = 0;
    nodes.map(value => {
      let a = value.alarm;
      if (a) {
        if (a.attack && a.attack.length > 0) {
          number.attack += a.attack.length;
          a.attack.map(v => {
            if (v.status === 2) {
              number.success += 1;
            } else {
              number.fail += 1;
            }
          })
        }
        if (a.leak && a.leak.length > 0) {
          a.leak.map(v => {
            number.leak += v.value;
          });
          mLeak++;
        }
        if (a.virus && a.virus.length > 0) {
          a.virus.map(v => {
            number.virus += v.value;
          })
          mVirus++;
        }
      }
    });
    // let htm = `<div class="top-panel">
    //             <div title="受攻击：${number.fail}, 已阻断：${number.success}"><i class="cus-icon-attack"></i>&nbsp;网络攻击: ${number.attack}</div>
    //             <div title="漏洞数：${number.leak}"><i class="cus-icon-leak"></i>&nbsp;漏洞设备: ${mLeak}</div>
    //             <div title="病毒数：${number.virus}"><i class="cus-icon-virus"></i>&nbsp;病毒感染: ${mVirus}</div>
    //           </div>`;
    // document.getElementById("top").innerHTML = htm;
    initPopupPanel(network);
  });

  network.addInteractionListener(function (e) {
    if (e.kind === 'doubleClickElement' && e.element && e.element.getClassName() === 'twaver.Node' &&
      e.element.getClient('tip')) {
      let tip = e.element.getClient('tip');
      TwaverNode.dialogShow(tip, {
        x: e.event.clientX, y: e.event.clientY
      });
      if (e.element.getClient('tip').alarm) {
        newData["link" + tip.linkType].map((value) => {
          TwaverNode.setLinkStyle(box, value.id, value.type);
        });
        TwaverNode.setLinkStyle(box, e.element.getClient('tip').linkId, "solid")
      }
    } else {
      TwaverNode.dialogHide();
    }
  });

  network.getToolTip = function (element) {
    if (element && element.getClassName() === 'twaver.Group') {
      if (!element.isExpanded()) {
        let size = element.getChildrenSize();
        let count = 0;
        element.getChildren().forEach((value) => {
          let tip = value.getClient('tip');
          if (tip) {
            count += tip.count
          }
        });
        return `设备总数${size}台` + (count > 0 ? `, 攻击总量${count}` : '');
      }
    }
    return false;
  }
}

function initPopupPanel(network) {
  let popupMenu = new twaver.controls.PopupMenu(network);

  popupMenu.onMenuItemRendered = function (div, menuItem) {
    div.style['font-size'] = '12px';
  };

  popupMenu.onMenuShowing = (e) => {
    let rightClickNode = network.getSelectionModel().getLastData();
    // if (rightClickNode && rightClickNode.getClient('tip')) {
    console.log(rightClickNode)
    if (rightClickNode && rightClickNode.getClassName() === 'twaver.Node' && rightClickNode._name === '漏洞扫描') {
      popupMenu.setMenuItems(popupData);
      return true;
    }
    if (rightClickNode && rightClickNode.getClassName() === 'twaver.Node' && rightClickNode._name === '防火墙') {
      popupMenu.setMenuItems([{
        label: '策略管理',
        action: function () {
          location.href = '/ssa/strategyMgmt/begin.do';
        }}]);
      return true;
    }
    if (rightClickNode && rightClickNode.getClassName() === 'twaver.Node' && rightClickNode._name.includes("设备")) {
      popupMenu.setMenuItems([{
        label: '告警处置',
        action: function () {
          location.href = '/ssa/associativeAnalysis/begin.do';
        }}]);
      return true;
    }
    return false;
  }
}

export default init;
