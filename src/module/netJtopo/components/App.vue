<template>
<div class="whitebackground Whitespace">
  <div class="top-title">攻击溯源</div>
  <div class="attack-nav clearfloat">
    <div class="">
      <ul>
        <li><label>阶段</label></li>
        <li class="link-line"><span>刺探</span>
          <p>情报刺探</p>
        </li>
        <li class="link-line"><span>攻击</span>
          <p>弱点攻击</p>
        </li>
        <li class="link-line"><span>控制</span>
          <p>命令控制</p>
        </li>
        <li class="link-line"><span>感染</span>
          <p>参透感染</p>
        </li>
        <li class="link-line"><span>窃取</span>
          <p>攻击窃取</p>
        </li>
      </ul>
    </div>
    <div class="">
      <ul>
        <li><label>资产</label></li>
        <li><i class="el-icon-star-on"></i>
          <p>重要</p>
        </li>
      </ul>
    </div>
    <div class="levels-icon">
      <ul>
        <li><label>等级</label></li>
        <li>
          <p class="level-high"></p>
          <p>高危</p>
        </li>
        <li>
          <p class="level-med"></p>
          <p>中危</p>
        </li>
        <li>
          <p class="level-low"></p>
          <p>低危</p>
        </li>
      </ul>
    </div>
    <div class="">
      <ul>
        <li><label>信誉</label></li>
        <li><i class="el-icon-circle-check"></i>
          <p>正常</p>
        </li>
        <li><i class="el-icon-warning"></i>
          <p>疑似</p>
        </li>
        <li>
          <p class="spite-png"></p>
          <p>恶意</p>
        </li>
      </ul>
    </div>
  </div>
  <div class="attack-sel clearfloat">
<el-row>
    <el-col :span="25">
      <span class="demonstration">显示固定文字</span>
    </el-col>
</el-row>
    <!-- <el-input v-model="this.input" text="dddddddd" readonly="true" placeholder="请输入内容" ></el-input> -->
    <!-- <el-col :span="16">
      <div>dfdfdfdfdfd</div>
    </el-col> -->
    <!-- <el-select v-model="value" placeholder="请选择">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
      </el-option>
    </el-select> -->
    <div class="attack-topbutton">
          <el-button :plain="true" type="primary" @click="getSingleRes">单IP透视</el-button>
          <el-button :plain="true" type="primary" @click="getRes">关联溯源</el-button>
        </div>
<!--
    <el-button-group>
      <el-button type="primary" @click="getSingleRes">单IP透视</el-button>
      <el-button type="primary" @click="getRes">关联溯源</el-button>
    </el-button-group>

    <div>
      <ul class="attack-tabs">
        <li><a @click="getSingleRes()">单IP透视</a></li>
        <li class="active"><a @click="getRes()">关联溯源</a></li>
      </ul>
    </div>-->
  </div>
  <div class="attack-content-top clearfloat" v-show="visible == true">
    <div class="" style="position:absolute;top:0px; z-index:99;width:100%;height:95%">
        <canvas id="canvas" width="1500px" height="500px"></canvas>
    </div>

    <div class="attack-content-top1">
      <p>外网</p>
      <div></div>
    </div>
    <div class="attack-content-top2">
      <p>内网</p>
      <div></div>
    </div>
    <div class="attack-content-top3">
      <p>外网</p>
      <div></div>
    </div>

  </div>
  <div style="text-align:center" v-show="visible == false">
  </div>

  <div name="topo_tips" class="panel panel-default" id="topoTips">
    <div class="panel-body"></div>
  </div>

</div>
</template>

<script>
export default {
  data(){
    return {
      input:'dfdfdfdfdfd'
    }
  },
  methods: {
    //显示弹窗
    showToolip(options) {
      var temp = $(document);
      var tipsWin = temp.find('div[name=topo_tips]').hide();
      //var tipsWin = $("#topoTips")
      var tips_body = tipsWin.find('.panel-body');
      var op = options || {};
      var x = op.x;
      var y = op.y;
      var width = op.width || 200;
      var content = op.content || '';
      if (content) {
        tips_body.show();
        tips_body.html(content);
        tipsWin.css({
          "left": x,
          "top": y,
          "width": width
        }).show();
      } else {
        tips_body.hide();
        tipsWin.hide();
      }
    },
    drawFromArr(data) {
      //var jsonStr=JSON.stringify(json);
      if (data != null && data.length > 0) {
        var icoPic = this.getIconPic(data[0].productType,data[0].iskey,data[0].threatLevel);
        var flag = data[0].flag;
        var x = 50;
        var ip='';
        if (flag == '1') {
          x = 100;
          //ip = "&-30&40@"+data[0].ip+"&-30&60";
          ip = data[0].ipAttr+"&-25&40@"+data[0].ip+"&-25&60";
        } else if (flag == '2') {
          x = 1150;
          ip = data[0].ipAttr+"&-30&40@"+data[0].ip+"&-30&60";
        } else {
          x = 450;
          ip = data[0].ip;
        }
        var y = 150;
        var node = this.newNode(x, y, 50, 50,ip,icoPic, this.scene);
        node.prop = {
          src_ip: data[0].ip,
          port: data[0].port,
          productName: data[0].productName,
          unitNmme: data[0].unitNmme,
          phone: data[0].phone,
          ocntact: data[0].ocntact
        }
        for (var i = 1; i < data.length; i++) {
          flag = data[i].flag;
          icoPic = this.getIconPic(data[i].productType,data[i].iskey,data[i].threatLevel);
          //  alert(data[i].ip+","+data[i].productType);
          if (flag == '2') {
            if (node.x > 1150) {
              x = node.x + 250;
            } else {
              x = 1150;
            }
            ip = data[i].ipAttr+"&-30&40@"+data[i].ip+"&-30&60";
          } else {
            x = node.x + 200;
            ip = data[i].ip;
          }

          var tempNode = this.newNode(x, y, 50, 50, ip, icoPic, this.scene);
          tempNode.prop = {
            src_ip: data[i].ip,
            port: data[i].port,
            productName: data[i].productName,
            unitNmme: data[i].unitNmme,
            phone: data[i].phone,
            ocntact: data[i].ocntact
          }
          var link = this.newLink(node, tempNode, data[i].stage, 2, this.scene, data[i].threatLevel);
          link.prop = {
            stage: data[i].stage,
            logTime: data[i].logTime
          }
          node = tempNode;
        }
      }
      var vm = this;
      this.scene.mousemove(function(e) {
        var element = e.target;
        if (element && element.elementType == 'node') {
          var info = {
            设备名称: element.prop.productName || '无',
            IP: element.prop.src_ip,
            端口: element.prop.port,
            单位: element.prop.unitNmme || '无',
            联系人: element.prop.ocntact || '无',
            联系电话: element.prop.phone || '无'
          };
          var content = '';
          var width = 0;
          var len;

          $.each(info, function(k, v) {
            //var str = k + ':' + v;
            content += '<h5>&nbsp;&nbsp;' + k + ':' + v + '</h5>';
            //len = str.length + 20;
            //console.log(content);
            // if (len > width) {
            //   width = len;
            // }
          });
          vm.showToolip({
            x: e.pageX + 30,
            y: e.pageY - 10,
            width: 200,
            content: content
          });
        } else if (element && element.elementType == 'link') {
          var info = {
            阶段: element.prop.stage || '无',
            攻击时间: element.prop.logTime || '无'
          };
          var content = '';
          var width = 0;
          var len;

          $.each(info, function(k, v) {
            var str = k + ':' + v;
            content += '<h5>&nbsp;&nbsp;' + k + ':' + v + '</h5>';
            len = str.length + 20;
            console.log(content);
            if (len > width) {
              width = len;
            }
          });
          vm.showToolip({
            x: e.pageX + 30,
            y: e.pageY - 10,
            width: 200,
            content: content
          });
        } else {
          vm.showToolip('hide');
        }
      });
    },
    getSingleRes() {
      this.visible = true;
      //清除画布
      this.scene.clear();
      var param = {};
      param.src_ip = '192.168.2.2';
      param.src_port = '8081';
      param.dst_ip = '122.22.22.22';
      param.dst_port = '8085';
      //源坐标
      param.srcx = 100;
      // param.srcy=150;
      //目标坐标
      param.dstx = 1150;
      //param.dsty=150;
      //正常坐标
      param.x = 450;
      param.y = 150;

      param.maxy = 400;
      param.starty = 50;
      // var vm = this;
      this.utils.req("/ssa/netJtopo/getSingleResult.do", param, this).then(result => {
        //console.log(data);
        this.drawFromArr(result.node);
      });
    },
    getRes() {
      this.visible = true;
      this.scene.clear();
      var param = {};
      //源坐标
      param.srcx = 100;
      //目标坐标
      param.dstx = 1150;
      //正常坐标
      param.x = 250;
      param.y = 150;
      param.maxy = 400;
      param.starty = 50;
      var vm = this;
      this.utils.req("/ssa/netJtopo/getResult.do", param, this).then(result => {
        console.log(result);
        var nodeList = {};
        var showIp = '';
        for (var i = 0; i < result.node.length; i++) {
          var data = result.node[i];
          var ip = data.ip;
          var port = data.port;
          var flag = data.flag;
          if (flag=="1" || flag=="2"){
            showIp = data.ipAttr+"&-30&40@"+data.ip+"&-30&60";
          }else{
            showIp = data.ip;
          }
          var icoPic = this.getIconPic(data.productType,data.iskey,data.threatLevel);
          var node = vm.newNode(data.x, data.y, 30, 30, showIp, icoPic, this.scene);
          node.prop = {
            src_ip: ip,
            port: port,
            productName: data.productName,
            unitNmme: data.unitNmme,
            phone: data.phone,
            ocntact: data.ocntact
          }
          nodeList[data.id] = node;
          //this.scene.add(node);
        }
        for (var j = 0; j < result.edges.length; j++) {
          var data = result.edges[j];
          var link = vm.addLink(nodeList[data.formId], nodeList[data.toId], data.stage, 5, this.scene, data.threatLevel);
          link.prop = {
            stage: data.stage,
            logTime: data.logTime
          }
          link.arrowsRadius = 10;
        }

      });
      this.scene.mousemove(function(e) {
        var element = e.target;
        if (element && element.elementType == 'node') {
          var info = {
            设备名称: element.prop.productName || '无',
            IP: element.prop.src_ip,
            端口: element.prop.port,
            单位: element.prop.unitNmme || '无',
            联系人: element.prop.ocntact || '无',
            联系电话: element.prop.phone || '无'
          };
          var content = '';
          var width = 0;
          var len;

          $.each(info, function(k, v) {
            //var str = k + ':' + v;
            content += '<h5>&nbsp;&nbsp;' + k + ':' + v + '</h5>';
            //len = str.length + 20;
            console.log(content);
            // if (len > width) {
            //   width = len;
            // }
          });
          vm.showToolip({
            x: e.pageX + 30,
            y: e.pageY - 10,
            width: 200,
            content: content
          });
        } else if (element && element.elementType == 'link') {
          var info = {
            阶段: element.prop.stage || '无',
            攻击时间: element.prop.logTime || '无'
          };
          var content = '';
          var width = 0;
          var len;

          $.each(info, function(k, v) {
            var str = k + ':' + v;
            content += '<h5>&nbsp;&nbsp;' + k + ':' + v + '</h5>';
            len = str.length + 20;
            console.log(content);
            if (len > width) {
              width = len;
            }
          });
          vm.showToolip({
            x: e.pageX + 30,
            y: e.pageY - 10,
            width: 200,
            content: content
          });
        } else {
          vm.showToolip('hide');
        }
      });
    },
    getIconPic(productType,isKey,threatLevel) {
      var icoPic = "";
      if (productType == "8") {
        //防火墙
          icoPic = "/static/images/topo/fhq.png";
      } else if (productType == "6") {
        //交换机
        icoPic = "/static/images/topo/jhj.png";
      } else if (productType == "7") {
        //路由器
        icoPic = "/static/images/topo/lyq.png";
      } else if (productType == "18") {
        //服务器
        if(isKey=="1"){
         if (threatLevel=="2"){
              icoPic = "/static/images/topo/zy-fileServer-zw.png";
          }else if (threatLevel=="3"){
              icoPic = "/static/images/topo/zy-fileServer-gw.png";
          }else{
              icoPic = "/static/images/topo/zy-fileServer-dw.png";
          }
        }else{
           if (threatLevel=="2"){
              icoPic = "/static/images/topo/fileServer-zw.png";
          }else if (threatLevel=="3"){
              icoPic = "/static/images/topo/fileServer-gw.png";
          }else{
              icoPic = "/static/images/topo/fileServer-dw.png";
          }
        }
      }else if (productType == "20") {
        //数据库
        if(isKey=="1"){
           if (threatLevel=="2"){
              icoPic = "/static/images/topo/zy-sjg-zw.png";
          }else if (threatLevel=="3"){
              icoPic = "/static/images/topo/zy-sjg-gw.png";
          }else {
              icoPic = "/static/images/topo/zy-sjg-dw.png";
          }
        }else{
           if (threatLevel=="2"){
              icoPic = "/static/images/topo/sjg-zw.png";
          }else if (threatLevel=="3"){
              icoPic = "/static/images/topo/sjg-gw.png";
          }else{
              icoPic = "/static/images/topo/sjg-gw.png";
          }
        }
      }else {
        //未知设备
        icoPic = "/static/images/topo/ask-dw.png";
      }
      return icoPic;
    },
    // 节点
    newNode(x, y, w, h, text, path, scene) {
      var node = new JTopo.Node(text);
      node.textOffsetY = 8;
      if (null != path) {
        node.setImage(path, false);
      }
      node.setLocation(x, y);
      node.setSize(w, h);
      node.fontColor = '155,123,2';
      node.font = 'bold 16px 微软雅黑';
      scene.add(node);
      return node;
    },
    // 简单连线
    newLink(nodeA, nodeZ, text, dashedPattern, scene, threatLevel) {
      var link = new JTopo.Link(nodeA, nodeZ, text);
      link.fontColor ='0,0,255';
      link.lineWidth = 3; // 线宽
      //link.dashedPattern = dashedPattern; // 虚线
      link.bundleOffset = 60; // 折线拐角处的长度
      link.bundleGap = 20; // 线条之间的间隔
      link.textOffsetY = 3; // 文本偏移量（向下3个像素）
      //link.strokeColor = '0,200,255';
      //threatLevel='2';
      if (threatLevel == '1') {
        //黄色
        link.strokeColor = '255,255,0';
      } else if (threatLevel == '2') {
        //橙色
        link.strokeColor = '255,128,10';
      } else {
        // 红色
        link.strokeColor = '255,0,0';
      }
      scene.add(link);
      return link;
    },

    addLink(nodeA, nodeZ, text, dashedPattern, scene, threatLevel) {
      var link = new JTopo.Link(nodeA, nodeZ, text);
      link.fontColor ='0,0,255';
      link.lineWidth = 2; // 线宽
      //  link.dashedPattern = dashedPattern; // 虚线
      link.bundleOffset = 60; // 折线拐角处的长度
      link.bundleGap = 20; // 线条之间的间隔
      link.textOffsetY = 3; // 文本偏移量（向下3个像素）
      //黄色 link.strokeColor ='255,255,0'
      //红色 link.strokeColor ='255,0,0'
      //橙色 link.strokeColor ='255,128,10'
      //threatLevel='2';
      if (threatLevel == '1') {
        //黄色
        link.strokeColor = '255,255,0';
      } else if (threatLevel == '2') {
        //橙色
        link.strokeColor = '255,128,10';
      } else {
        // 红色
        link.strokeColor = '255,0,0';
      }

      scene.add(link);
      return link;
    }

  },
  data() {
    return {
      scene: {},
      stage: {},
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      visible: true
    };
  },
  mounted: function() {
    // this.visible = false;
    var canvas = document.getElementById("canvas");
    this.stage = new JTopo.Stage(canvas); // 创建一个舞台对象
    this.scene = new JTopo.Scene(this.stage); // 创建一个场景对象
    //this.scene.background="/static/img/picjumbo-bg5.png";
    //this.scene.backgroundColor ="#FFFFFF";
    //this.scene.alpha=1;
  }
}
</script>
<style>
div.panel {
  color: white;
  background: rgba(51, 122, 183, 0.5);
  position: absolute;
  z-index:99;
}
</style>
