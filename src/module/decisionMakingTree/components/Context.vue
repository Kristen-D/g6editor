<template>
	<div>
		<p>撞库检测模型</p>
	</div>
</template>

<script>
	export default {
		components:{},
		data(){
			return{
				box:new twaver.ElementBox(),
				locationMap:new Map(),//防止节点位置冲突，记录每个节点坐标 key:x坐标，value：y坐标集
				firstX:100,//初始x坐标
				firstY:100,//初始y坐标
				size:200//每个节点的偏移量
			}
		},
		computed:{
		},
		methods:{
			getLocation(x,y){//获取下个节点坐标
				var array =this.locationMap.get(x);
				if(array==null){//表示当前x的y方向没有任意节点，可直接使用上游提供的坐标
					array = new Array();
				}else{
					var isIndex=false;//当前坐标是否已被占用
					var isNextIndex=false;//下方坐标是否已被占用
					for ( var i = 0; i <array.length; i++){
						if(array[i]==y){
							isIndex=true;
						}
						if(array[i]>y){
							isNextIndex=true;
						}
					}
					if(isIndex){
						if(isNextIndex){
							while(this.locationMap.get(x) !=null){
								x+=this.size;
							}
							array = new Array();
						}
						y+=this.size;//统一加一次偏移，即使是分叉的节点也保证在父节点的y坐标下方（子节点的Y坐标保持一致）
					}
				}
				array.push(y);
				this.locationMap.set(x,array);
				var location=new Array();//结果坐标，顺序为x -> y
				location.push(x);
				location.push(y);
				return location;
			},
			recursive(obj,parentNode,parentLink){//json解析
				var location;
				if (typeof obj === 'object'){//前置条件判断，是否是待拆分的对象
					for (var key in obj) {//开始遍历
						if(parentNode!=null){//根据父节点坐标获取子坐标
							var f=parentNode.getCenterLocation();
							location=this.getLocation(f.x,f.y);
						}else{
							location=this.getLocation(this.firstX,this.firstY);
						}
						var item = obj[key];
						if (typeof item === 'object') {//如果子集是对象，说明还需要拆分
							var node=this.createProcessNode(this.box, location[0], location[1],key);//创建节点
							node.setStyle('label.position','topright.topright');
							if(parentNode!=null){//如果有父节点，则画线
								this.createLink(this.box, parentNode, node, false);
							}
							this.recursive(item,node);//传入当前节点，则刚好为递归时子节点获取坐标、画线传参
						} else {//如果子集是个值，说明到了一条线的尽头
							var nodeKey=this.createProcessNode(this.box, location[0], location[1],key);
							nodeKey.setStyle('label.position','topright.topright');
							this.createLink(this.box, parentNode, nodeKey, false);
							location=this.getLocation(location[0],location[1]);//获取结果坐标
							var nodeValue=this.createSplitNode(this.box, location[0], location[1],""+item);//结果的节点
							nodeValue.setStyle('label.position','center');
							this.createLink(this.box, nodeKey, nodeValue, false);
						}
					}
				}
			},
			createSplitNode(box, x, y, name){
				return this.createNode(box, x, y, 'split', name);
			},
			createProcessNode(box, x, y, name){
				return this.createNode(box, x, y, 'process', name); 
			},
			createJointNode(box, x, y, name){
				return this.createNode(box, x, y, 'joint', name); 
			},
			createDummyNode(box, x, y, name){ 
				var node=createNode(box, x, y, 'joint', name); 
				node.setImage(null);
				node.setSize(10,10);
				node.setCenterLocation(x,y);
				return node;
			},
			createNode(box, x, y, image, name){
				var node=new twaver.Node();
				node.setImage(image);
				node.setCenterLocation(x,y);
				node.setStyle('label.font', '15px "Microsoft Yahei"');
				node.setStyle('label.position', 'right.right');
				node.setName(name);
				box.add(node);
				return node;
			},
			createLink(box, from, to, withIcon, xoffset){
				var link=new twaver.Link(from, to);
				link.setStyle('link.width', 1);
				link.setStyle('link.color', '#3691AC');
				link.setStyle('arrow.to', true);
				link.setStyle('arrow.to.color', '#3691AC');
				link.setStyle('arrow.to.outline', 'white');
				link.setStyle('arrow.to.xoffset', -1);
				link.setStyle('arrow.to.width', 10);
				link.setStyle('arrow.to.height', 8);
				link.setStyle('icons.position', 'center');
				link.setStyle('link.xradius', 0);
				link.setStyle('link.yradius', 0);
				link.setStyle('label.font', '15px "Microsoft Yahei"');
				link.setStyle('label.position', 'right.right');
				if(withIcon){
					link.setStyle('icons.names', ['link_arrow']);
				}
				link.setClient('xoffset', xoffset);
				box.add(link);
				
				var nodeListener=function(e){
					if(e.property==='location'){
						this.updateLinkIcon(link);
					}
				};
				from.addPropertyChangeListener(nodeListener);
				to.addPropertyChangeListener(nodeListener);
				this.updateLinkIcon(link);

				return link;
			},
			updateLinkIcon(link){
				var from=link.getFromAgent();
				var to=link.getToAgent();
				var f=from.getCenterLocation();
				var t=to.getCenterLocation();
				var xoffset=(t.x-f.x)/2;
				if(link.getClient('xoffset')!=undefined){
					xoffset=t.x-f.x+link.getClient('xoffset')-(t.x-f.x)/2;
				}
				var yoffset=-(t.y-f.y)/2+40;
				link.setStyle('icons.xoffset', xoffset);
				link.setStyle('icons.yoffset', yoffset);		
				link.setStyle('label.xoffset', xoffset+5);
				link.setStyle('label.yoffset', (t.y-f.y)/2-to.getHeight()/2-20);
			},
			createLinkPath(linkUI, defaultPoints){
				var link=linkUI._element;
				if(!link.getStyle('icons.names')){
					return defaultPoints;
				}
				var f = linkUI.getFromPoint();
				var t = linkUI.getToPoint();		
				var fromNode=linkUI.getElement().getFromAgent();
				var toNode=linkUI.getElement().getToAgent();

				var points = new twaver.List();

				points.add({x: f.x, y:f.y+fromNode.getHeight()/2+1});
				var offset=20;
				var xoffset=link.getClient('xoffset') || 0;
				points.add({x: f.x, y:f.y+offset});
				points.add({x: t.x+xoffset, y:f.y+offset});
				if(xoffset){
					points.add({x: t.x+xoffset, y:t.y});
					points.add({x: t.x, y:t.y});
				}else{
					points.add({x: t.x+xoffset, y:t.y-toNode.getHeight()/2-2});
				}

				return points;
			},
			expandGroup(data, view){
				if(data.getImage()=='split' && data.getClient('joint')){
					var split=data;
					var joint=data.getClient('joint');
					if(data.getClient('closed')){
						var elements=data.getClient('closed_elements');
						for(var id in elements){ 
							var element=elements[id];
							if(element instanceof twaver.Node){
								var originLocation=element.getClient('origin_location');
								moveNode(element, originLocation);
							}
							element.setClient('visible', true);
						}
						data.setClient('closed', false);
						var jointLinks=split.getClient('joint_links');
						if(jointLinks){
							for(var i=0;i<jointLinks.length;i++){
								jointLinks[i].setFromNode(joint);
							}
						}
						split.setClient('joint_links', null);
					}else{				
						var elements={};
						expandChildren(view, split, joint, elements);				
						for(var id in elements){ 
							var element=elements[id];
							if(element instanceof twaver.Node){
								element.setClient('origin_location', element.getCenterLocation());
								moveNode(element, data.getCenterLocation(), true);
							}
							if(element ==joint){
								var jointLinks=[];
								var jointFromLinks=element.getFromAgentLinks();
								jointFromLinks.forEach(function(link){
									link.setFromNode(split);
									jointLinks.push(link);
								});
								split.setClient('joint_links', jointLinks);
							}
						}
						data.setClient('closed_elements', elements);
						data.setClient('closed', true);
					}
				}
			},
			expandChildren(view, start, end, elements){
				var links=start.getFromAgentLinks();
				if(links){
					links.forEach(function(link){
						if(!elements[link.getId()] && view.isVisible(link)){
							elements[link.getId()]=link;
						}
						var nextNode=link.getToAgent();				
						if(nextNode!=start && !elements[nextNode.getId()] && view.isVisible(nextNode)){
							elements[nextNode.getId()]=nextNode;					
							if(nextNode!=end){
								expandChildren(view, nextNode, end, elements);
							}
						}				
					});
				}
			},
			moveNode(node, newLocation, hideOnFinish){
				var oldLocation=node.getCenterLocation();
				var animation=new twaver.Animate({
					from: oldLocation,
					to: newLocation,
					type: 'point',
					dur: 1500,
					easing: 'easeBoth',
					onUpdate: function (value) {
						node.setCenterLocation(value.x, value.y);
					},
				});
				if(hideOnFinish){
					animation.onDone=function(){
						node.setClient('visible', false);
					}
				}
				animation.play();
			}
		},
		created:async function(){
			twaver.Util.registerImage('split', {		
				w: 52,
				h: 24,
				lineWidth:0.5,
				v: [{			
					shape: 'rect',
					w: '100%',
					h: '100%',	
					x: '-50%',
					y: '-50%',
					fill:'white',
					lineColor:'white',
					lineWidth:3,
				},{
					shape: 'path',
					data: [ -24, 10, 24, 10, 24, 0, 0, -10, -24, 0, 'z' ],
					lineColor: '#13485D',
					fill: '#3691AC',
					gradient: {
						type: 'linear.north',
						color: 'white',
					}
				}],
				onDoubleClick: this.expandGroup,
			});
			twaver.Util.registerImage('joint', {		
				w: 30,
				h: 30,
				lineWidth:0.5,
				v: [{			
					shape: 'circle',
					cx: 0, 
					cy: 0,
					r: 13,
					fill: 'white',
					lineColor:'white',
					lineWidth:3,
				},{
					shape: 'circle',
					cx: 0, 
					cy: 0,
					r: 12,
					fill: '#AAAAAA',
					gradient: {
						type: 'linear.north',
						color:'white',
					}
				},{
					shape: 'path',
					data: 'M-3,-3l0,-6l6,0l0,6l6,0l0,6l-6,0l0,6l-6,0l0,-6l-6,0l0,-6,z',
					lineColor: '#13485D',
					lineWidth:1,
					fill: '#3691AC',
					gradient: {
						type: 'linear.north',
						color: 'white',
					}
				}]
			});
			twaver.Util.registerImage('process', {		
				w: 48,
				h: 42,
				lineWidth:1,
				lineColor: '#848484',
				v: [{			
					shape: 'rect',
					w: '100%',
					h: '100%',	
					x: '-50%',
					y: '-50%',
					lineColor:'white',
					fill:'white',
					lineWidth:3,
				},{			
					shape: 'rect',
					w: 42,
					h: 36,	
					x: -21,
					y: -18,
					r: 4,
					gradient: {
						type: 'linear',
						x1: 0,
						y1: -25,
						x2: 0,
						y2: 25,
						stop: [{
							offset: 0,
							color: 'white'
						},{
							offset: 0.4,
							color: '#D8D8D8'
						},{
							offset: 1,
							color: 'white'
						}]
					}
				},{			
					shape: 'rect',
					w: 36,
					h: 30,	
					x: -18,
					y: -15,
					r: 3,
					gradient: {
						type: 'linear',
						x1: 0,
						y1: -20,
						x2: 0,
						y2: 25,
						stop: [{
							offset: 0,
							color: 'white'
						},{
							offset: 0.4,
							color: '#B45F04'
						},{
							offset: 1,
							color: 'white'
						}]
					}
				},{
					shape: 'path',
					data: 'M-12,-8l4,0m2,0l12,0M-9,-3l4,0m2,0l12,0M-6,2l4,0m2,0l12,0M-9,7l4,0m2,0l12,0',
					lineWidth: 1.5,
					lineColor: '#F2F2F2',
				}]
			});
			twaver.Util.registerImage('link_arrow', {		
				w: 20,
				h: 25,
				lineWidth:0.5,
				v: [{			
					shape: 'rect',
					w: '100%',
					h: '100%',	
					x: '-50%',
					y: '-50%',
					visible: false,//for debug.
				},{
					shape: 'path',
					data: [ -4, -9, 4, -9, 4, 4, 9,4, 0, 11,-9,4, -4,4,'z'],
					lineColor: '#13485D',
					fill: '#3691AC',
					gradient: {
						type: 'linear.north',
						color: 'white',
					}
				}]
			});
			var network = new twaver.vector.Network(this.box);
			document.body.appendChild(network.getView());
			network.adjustBounds({x:0,y:0,width:document.documentElement.clientWidth,height:document.documentElement.clientHeight});		
			network.setLinkPathFunction(this.createLinkPath);
			network.setToolTipEnabled(false);
			network.moveSelectedElements = function(a,b,c,d){};
			network.setVisibleFunction(function (element) {
				if (element.getClient('visible') == false) {
					return false;
				}
				return true;
			});
			var data=this.common.reqDef("/ssa/decisionMakingTree/loginMatching.do").then((data) => {
				this.recursive(data.data,null);
		    });
			window.setInterval(function(){
				window.location.reload();
			},60000);
		}
	}
</script>
