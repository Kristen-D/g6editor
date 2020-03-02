$(document).ready(function() {
/*
 * API官方文档地址：
 * http://www.jtopo.com/demo/helloworld.html
 */
	var scene;

	//定义画布
	function newScene(elementId, backgroundUrl) {
		var canvas = document.getElementById(elementId);
		var stage = new JTopo.Stage(canvas);
		scene = new JTopo.Scene();
		stage.add(scene);
		scene.background = backgroundUrl;
	}

	//定义圆
	function newCircle(x, y, r, text) {
		var myCircleNode = new JTopo.CircleNode(text);
		myCircleNode.radius = r;
		myCircleNode.setLocation(x, y);
		myCircleNode.fillColor = '100, 100, 255';
		scene.add(myCircleNode);
	}

	//定义节点
	function newNode(x, y, w, h, text, imageUrl) {
		var node = new JTopo.Node(text);
		node.setLocation(x, y);
		//node.textPosition = "Middle_Center";
		node.setSize(w, h);
		node.textOffsetY = -1;
		node.setImage(imageUrl)
		node.font = 'italic bold 16px 微软雅黑';
		/*node.borderRadius = 5; // 圆角
		node.borderWidth = 4; // 边框的宽度
		node.borderColor = '255,255,255'; //边框颜色*/
		node.alpha = 0.9;
		node.showSelected = false;
		scene.add(node);
		return node;
	}

	//定义简单连线
	function newLink(nodeA, nodeZ, text, dashedPattern) {
		var link = new JTopo.Link(nodeA, nodeZ, text);
		link.lineWidth = 3; // 线宽
		link.dashedPattern = dashedPattern; // 虚线
		link.bundleOffset = 60; // 折线拐角处的长度
		link.bundleGap = 20; // 线条之间的间隔
		link.textOffsetY = -5; // 文本偏移量（向下3个像素）
		link.strokeColor = JTopo.util.randomColor();
		//	link.arrowsRadius = 7;
		scene.add(link);
		return link;
	}

	//定义折线
	function newFoldLink(nodeA, nodeZ, text, direction, dashedPattern) {
		var link = new JTopo.FoldLink(nodeA, nodeZ, text);
		link.direction = direction || 'horizontal';
		link.arrowsRadius = 15; //箭头大小
		link.lineWidth = 3; // 线宽
		link.bundleOffset = 60; // 折线拐角处的长度
		link.bundleGap = 20; // 线条之间的间隔
		link.textOffsetY = 3; // 文本偏移量（向下3个像素）
		link.strokeColor = JTopo.util.randomColor(); // 线条颜色随机
		link.dashedPattern = dashedPattern;
		scene.add(link);
		return link;
	}

	//定义二次折线
	function newFlexionalLink(nodeA, nodeZ, text, direction, dashedPattern) {
		var link = new JTopo.FlexionalLink(nodeA, nodeZ, text);
		link.direction = direction || 'horizontal';
		link.arrowsRadius = 10;
		link.lineWidth = 3; // 线宽
		link.offsetGap = 35;
		link.bundleGap = 15; // 线条之间的间隔
		link.textOffsetY = 10; // 文本偏移量（向下15个像素）
		link.strokeColor = '0,250,0';
		link.dashedPattern = dashedPattern;
		scene.add(link);
		return link;
	}

	//定义曲线
	function newCurveLink(nodeA, nodeZ, text) {
		var link = new JTopo.CurveLink(nodeA, nodeZ, text);
		link.lineWidth = 3; // 线宽
		scene.add(link);
		return link;
	}

	//1.初始化画布
	newScene("canvas", "/static/sdsec/image/background.jpg");

	//2.定义节点
	/*var myFirewall = newNode(50, 50, 60, 60, "防火墙一", "./img/firewall.png");
	var myRouter = newNode(200, 50, 100, 100, "路由器", "./img/router.png");*/

	//3.将两个Node连接起来(简单连线)
	/*var simpleLink = newLink(myFirewall, myRouter, '高优先级', 5);*/
	//simpleLink.arrowsRadius = 10;

	//4.将两个Node连接起来(折线)
	/*var folderLink1 = newFoldLink(myFirewall, myRouter, 'FoldLink1');*/
	/*var folderLink2 = newFoldLink(myFirewall, myRouter, 'FoldLink2', 'vertical', 5);*/

	//5.将两个Node连接起来(二次折线)
	/*var flexionalLink1 = newFlexionalLink(myFirewall, myRouter, 'FlexLink1');
	var flexionalLink2 = newFlexionalLink(myFirewall, myRouter, 'FlexLink2', 'vertical', 2);*/

	//6.将两个Node连接起来(曲线)
	/*var curveLink = newCurveLink(myFirewall, myRouter, 'curve')*/

	//7.树形布局
	/*var coreRouter = newNode(400, 200, 100, 100, "路由器", "./img/router.png");

	coreRouter.layout = {
		type: 'tree',
		direction: 'left',
		width: 140,
		height: 200
	};

	//关键注意点：画树形拓扑时要把父节点放置于link的第一个参数
	for(var i = 0; i < 4; i++) {
		var firewall = newNode(0, 0, 60, 60, "防火墙" + (i + 1), "./img/firewall.png");
		var folderLink = newFoldLink(coreRouter, firewall, '第' + (i + 1) + "优先级", 'vertical', 5);
	}

	JTopo.layout.layoutNode(scene, coreRouter, true);
	scene.addEventListener('mouseup', function(e) {
		if(e.target && e.target.layout) {
			JTopo.layout.layoutNode(scene, e.target, true);
		}
	});*/

	//8.圆形布局(混合树形布局)
	var coreSwitch = newNode(300, 200, 150, 150, "SDN交换机", "/static/sdsec/image/switch.png");

	coreSwitch.layout = {
		type: 'circle',
		radius: 150
	}

	for(var i = 0; i < 3; i++) {
		var coreRouter = newNode(300, 200, 100, 100, "路由器" + (i + 1), "/static/sdsec/image/router.png");

		var simpleLink = newLink(coreSwitch, coreRouter, '第' + (i + 1) + "优先级", 5);

		JTopo.layout.layoutNode(scene, coreSwitch, true);
		scene.addEventListener('mouseup', function(e) {
			if(e.target && e.target.layout) {
				JTopo.layout.layoutNode(scene, e.target, true);
			}
		});

		var direction;

		if(i == 0) {
			direction = 'bottom';
		} else if(i == 1) {
			direction = 'left';
		} else if(i == 2) {
			direction = 'top';
		} else {
			direction = 'left';
		}

		coreRouter.layout = {
			type: 'tree',
			direction: direction,
			width: 100,
			height: 100
		};

		//关键注意点：画树形拓扑时要把父节点放置于link的第一个参数
		for(var j = 0; j < 2; j++) {
			var firewall = newNode(0, 0, 60, 60, "防火墙" + (i + 1), "/static/sdsec/image/firewall.png");
			var folderLink = newFoldLink(coreRouter, firewall, '第' + (i + 1) + "优先级", 'vertical', 5);
		}

		JTopo.layout.layoutNode(scene, coreRouter, true);
		scene.addEventListener('mouseup', function(e) {
			if(e.target && e.target.layout) {
				JTopo.layout.layoutNode(scene, e.target, true);
			}
		});
	}
});
