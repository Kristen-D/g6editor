<template>
  <div id='main'></div>
</template>

<script>
import axios from 'axios';
import { install } from 'vuex';

export default {
  name: 'topology-editor',
  mounted () {
    let id = this.$route.query.id;
    
    let topologyEditor = new TopologyEditor();
    // 注册回调 比如删除节点
    topologyEditor.init();
    new twaver.SerializationSettings.setClientType('node-id','string');

    axios.get(`/ssa/topology/info.do?id=${id}&t=${Date.now()}`).then(function (result) {
      var data = result.data.data;
      if (data) {
        topologyEditor.initBox(data.json);
        
        let sp1 = document.createElement("span");
        sp1.innerText = `${data.name}`;
        let toolbar = document.querySelector(".toolbar");
        toolbar.insertBefore(sp1, toolbar.firstChild);

      } else {
        alert('暂未创建该条编辑记录');
      }
    })

    axios.get("/ssa/topology/image/list.do?topologyId="+id).then((result) => {
      let data = result.data.data;
      let images = [];
      if (data) {
        for (let i = 0; i < data.length; i++) {
          topologyEditor.registerImage("/ssa/topology/" + id + "/" + data[i].name + data[i].suffix);
          images.push(data[i].name);
        }
        demo.NodeImages.setEnumInfo(images);
      } else {

      }
      console.log(demo.customAsset)
    })

    demo.Util.addButton(document.querySelector(".toolbar"), '保存数据', 'save', function () {
      var box = topologyEditor.network.getElementBox();
      // let nodeList = [];
      // let linkList = [];
      // let groupList = [];
      // box.forEach(element => {
        
      //   if (element instanceof twaver.Node && !element.hasOwnProperty("_expanded")) {
      //     nodeList.push(element);
      //   }

      //   if (element instanceof twaver.Link) {
      //     linkList.push(element);
      //   }

      //   if (element instanceof twaver.Group) {
      //     groupList.push(element);
      //   }
      // });

      // let nodePromises = [];
      // let otherPromises = [];
      // // 节点
      // nodeList.map(element => {
      //   nodePromises.push(new Promise(resolve => {
      //     let param = {
      //       image: element._image,
      //       x: element._location.x,
      //       y: element._location.y,
      //       name: element._name,
      //       topologyId: id
      //     }
      //     if (element.getClient("node-id")) {
      //       param.id = element.getClient("node-id");
      //       axios.post("/ssa/topology/node/update.do", param).then(result => {
      //         resolve();
      //       });
      //     } else {
      //       axios.post("/ssa/topology/node/info.do", param).then(result => {
      //         element.setClient("node-id", result.data.data);
      //         resolve();
      //       })
      //     }
      //   }))
      // })
      // // 组
      // groupList.map(element => {
      //   nodePromises.push(new Promise((resolve) => {
      //     let param = {
      //       image: element._image,
      //       x: element._location.x,
      //       y: element._location.y,
      //       name: element._name,
      //       topologyId: id
      //     }
      //     if (element.getClient("node-id")) {
      //       param.id = element.getClient("node-id");
      //       axios.post("/ssa/topology/group/update.do", param).then(result => {
      //         resolve();
      //       });
      //     } else {
      //       axios.post("/ssa/topology/group/info.do", param).then(result => {
      //         element.setClient("node-id", result.data.data);
      //         resolve();
      //       })
      //     }
      //   }))
      // })
      // Promise.all(nodePromises).then(() => {
      //   linkList.map(element => {
      //     otherPromises.push(new Promise(resolve => {
      //       let param = {
      //         origin: element._fromNode.getClient("node-id"),
      //         target: element._toNode.getClient("node-id"),
      //         topologyId: id
      //       }
      //       if (element.getClient("node-id")) {
      //         param.id = element.getClient("node-id");
      //         axios.post("/ssa/topology/link/update.do", param).then(result => {
      //           resolve();
      //         });
      //       } else {
      //         axios.post("/ssa/topology/link/info.do", param).then(result => {
      //           element.setClient("node-id", result.data.data);
      //           resolve();
      //         })
      //       }
      //     }))
      //   })
      //   groupList.map(element => {
      //     otherPromises.push(new Promise(resolve => {
      //       let param = { topologyId: id }
      //       let ids = element._childList._as.map(v => {
      //         if (v instanceof twaver.Group) {
      //           return 'group-' + v["_clientMap"]["node-id"];
      //         } else if (v instanceof twaver.Node) {
      //           return v["_clientMap"]["node-id"];
      //         }
      //       });
      //       param.ids = ids.join(",");
      //       param.id = element.getClient("node-id");
      //       axios.post("/ssa/topology/group/update.do", param).then(result => {
      //         resolve();
      //       })
      //     }))
      //   })

        // 数据提交
        // Promise.all(otherPromises).then(() => {
          
        // })
      // })

      new twaver.SerializationSettings.setClientType('node-id','string');
      var text = new twaver.JsonSerializer(box).serialize();
          
      axios.post("/ssa/topology/info.do", {id: id, json: text}).then(function (value) {
        if (value.data.state) {
          alert("保存成功");
        } else {
          alert("用户登录信息过期了！");
        }
      })
    });
    demo.Util.addButton(document.querySelector(".toolbar"), '下载JSON', 'save', function () {
      
      var box = topologyEditor.network.getElementBox();

      var text = new twaver.JsonSerializer(box).serialize();
      if (twaver.Util.isIE) {
          var iframe = document.createElement('iframe');
          document.body.insertBefore(iframe);
          iframe.style.display = 'none';
          iframe.contentDocument.write(text);
          iframe.contentDocument.execCommand('SaveAs', true, id + '.json');
          document.body.removeChild(iframe);
      } else {
          var blob = new Blob([text], { type: "text/plain;charset=utf-8" });
          blob && saveAs(blob,  id + '.json');
      }
    })
  }
}
</script>

<style>
html:-moz-full-screen {
  background: white;
}

html:-webkit-full-screen {
  background: white;
}

html:fullscreen {
  background: white;
}

* {
  box-sizing: border-box;
}

.toolbar {
  padding: 10px;
  border-top: 1px solid #e1e3e4;
  border-bottom: 1px solid #e1e3e4;
}
.padding {
  margin: 10px 15px;
}

.tab-div {
  margin: 10px 10px 0 10px;
  color: white;
}

.tab-content-div {
  margin: 10px;
}


</style>


