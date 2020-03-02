import G6 from "@antv/g6/build/g6";
import {uniqueId} from '../../utils'
import Shape from '@antv/g/src/shapes'

const customNode = {
  init() {
    G6.registerNode("customNode", {
      draw(cfg, group) {
        let size = cfg.size;
        if (!size) {
          size = [170, 100]
        }
        // 此处必须是NUMBER 不然bbox不正常
        const width = parseInt(size[0]);
        const height = parseInt(size[1]);
        const color = cfg.color;
        const stroke = cfg.stroke;

        // 此处必须有偏移 不然drag-node错位
        const offsetX = -width / 2
        const offsetY = -height / 2
        const mainId = 'rect' + uniqueId();
        const shape = group.addShape("rect", {
          attrs: {
            id: mainId,
            x: offsetX,
            y: offsetY,
            width: width,
            height: height,
            stroke: stroke,
            fill: color,//此处必须有fill 不然不能触发事件
            radius:5,
            shadowBlur:10,
            shadowColor:'rgba(221,232,240,1)',
          }
        });
        if (cfg.stateImage) {
          group.addShape("image", {
            attrs: {
              x: offsetX +width-60,
              y: offsetY+20 ,
              width: 45,
              height: 45,
              parent: mainId,
              img: cfg.stateImage,
              nodeType:cfg.nodeType
            }
          });
        }
        if (cfg.name) {
          let name =cfg.name
          group.addShape("text", {
            attrs: {
              id: 'name' + uniqueId(),
              x: offsetX+15 ,
              y: offsetY +20,
              textAlign: "left",
              textBaseline: "top",
              text:name,
              parent: mainId,
              fill: "#87959b",
              fontSize:12,
            }
          });
        }
        if (cfg.label) {
          let label =cfg.label
          if(cfg.label.length>11){
            label = cfg.label.substring(0,11)+"..."
          }
          group.addShape("text", {
            attrs: {
              id: 'label' + uniqueId(),
              x: offsetX+15 ,
              y: offsetY + height / 2+10,
              textAlign: "left",
              textBaseline: "middle",
              text:label,
              parent: mainId,
              fill: "#464646",
              fontSize:14,
            }
          });
        }
        if (cfg.inPoints) {
          for (let i = 0; i < cfg.inPoints.length; i++) {
            let x,
              y = 0;
            //0为顶 1为底
            if (cfg.inPoints[i][0] === 0) {
              y = 0;
            } else {
              y = height;
            }
            x = width * cfg.inPoints[i][1];
            const id = 'circle' + uniqueId()
            group.addShape("circle", {
              attrs: {
                id: 'circle' + uniqueId(),
                parent: id,
                x: x + offsetX,
                y: y + offsetY,
                r: 10,
                isInPointOut: true,
                fill: "#1890ff",
                opacity: 0
              }
            });
            group.addShape("circle", {
              attrs: {
                id: id,
                x: x + offsetX,
                y: y + offsetY,
                r: 3,
                isInPoint: true,
                fill: "#fff",
                stroke: "#abb2bc",
                opacity: 0
              }
            });
          }
        }
        if (cfg.outPoints) {
          for (let i = 0; i < cfg.outPoints.length; i++) {
            let x,
              y = 0;
            //0为顶 1为底
            if (cfg.outPoints[i][0] === 0) {
              y = 0;
            } else if (cfg.outPoints[i][0] === 0.5) {
              y = height / 2;
            } else {
              y = height;
            }
            x = width * cfg.outPoints[i][1];
            const id = 'circle' + uniqueId()
            group.addShape("circle", {
              attrs: {
                id: 'circle' + uniqueId(),
                parent: id,
                x: x + offsetX,
                y: y + offsetY,
                r: 10,
                isOutPointOut: true,
                fill: "#1890ff",
                opacity: 0//默認0 需要時改成0.3
              }
            });
            group.addShape("circle", {
              attrs: {
                id: id,
                x: x + offsetX,
                y: y + offsetY,
                r: 3,
                isOutPoint: true,
                fill: "#fff",
                stroke: "#abb2bc",
                opacity: 0
              }
            });
          }
        }
        //group.sort()
        return shape;
      },
      //设置状态
      setState(name, value, item) {
        const group = item.getContainer();
        const shape = group.get("children")[0]; // 顺序根据 draw 时确定
        const stateShape = group.get("children")[1]; //

        const children = group.findAll(g => {
          return g._attrs.parent === shape._attrs.id
        });
        const circles = group.findAll(circle => {
          return circle._attrs.isInPoint || circle._attrs.isOutPoint;
        });
        const selectStyles = () => {
          shape.attr("cursor", "move");
          children.forEach(child => {
            child.attr("cursor", "move");
          });
          circles.forEach(circle => {
            circle.attr('opacity', 1)
          })
        };
        const unSelectStyles = () => {
          circles.forEach(circle => {
            circle.attr('opacity', 0)
          })
        };

        switch (name) {
          case "selected":
          case "hover":
            if (value) {
              selectStyles()
            } else {
              unSelectStyles()
            }
            break;
          case"running":
            if (value) {
              shape.attr("stroke", "red");
            }
            break;
          case"valid":
            if (value) {
              if(stateShape.attr("nodeType")==1){
                stateShape.attr("img", "/static/g6/standard-valid.svg");
              }else{
                stateShape.attr("img", "/static/g6/people-valid.svg");
              }
              shape.attr("stroke","#6acd6e");
            }
            break;
        }
      }
    });

    G6.registerNode("flowCondition", {
      draw(cfg, group) {
        let size = cfg.size;
        if (!size) {
          size = [200, 80]
        }
        // 此处必须是NUMBER 不然bbox不正常
        const width = parseInt(size[0]);
        const height = parseInt(size[1]);
        const color = cfg.color;
        const stroke = cfg.stroke;
        // 此处必须有偏移 不然drag-node错位
        const offsetX = -width / 2
        const offsetY = -height / 2
        const mainId = 'cc' + uniqueId()
        const shape = group.addShape("path", {
          attrs: {
            id: mainId,
            x: offsetX,
            y: offsetY,
            path: this.getPath(cfg),
            width: width,
            height: height,
            stroke: stroke,
            fill: color,//此处必须有fill 不然不能触发事件
            radius:5,
            shadowBlur:10,
            shadowColor:'rgba(221,232,240,1)'
        }
        });

        if (cfg.label) {
          let label =cfg.label
          if(cfg.label.length>11){
            label = cfg.label.substring(0,11)+"..."
          }
          group.addShape("text", {
            attrs: {
              id: 'label' + uniqueId(),
              x: offsetX + width / 2,
              y: offsetY + height / 2,
              textAlign: "center",
              textBaseline: "middle",
              text: label,
              parent: mainId,
              fill: "#565758",
              fontSize:14
            }
          });
        }
        if (cfg.inPoints) {
          for (let i = 0; i < cfg.inPoints.length; i++) {
            let x,
              y = 0;
            //0为顶 1为底
            if (cfg.inPoints[i][0] === 0) {
              y = 0;
            } else {
              y = height;
            }
            x = width * cfg.inPoints[i][1];
            const id = 'circle' + uniqueId()
            group.addShape("circle", {
              attrs: {
                id: 'circle' + uniqueId(),
                parent: id,
                x: x + offsetX,
                y: y + offsetY,
                r: 10,
                isInPointOut: true,
                fill: "#1890ff",
                opacity: 0
              }
            });
            group.addShape("circle", {
              attrs: {
                id: id,
                x: x + offsetX,
                y: y + offsetY,
                r: 3,
                isInPoint: true,
                fill: "#fff",
                stroke: "#abb2bc",
                opacity: 0
              }
            });
          }
        }
        if (cfg.outPoints) {
          for (let i = 0; i < cfg.outPoints.length; i++) {
            let x,
              y = 0;
            //0为顶 1为底
            if (cfg.outPoints[i][0] === 0) {
              y = 0;
            } else if (cfg.outPoints[i][0] === 0.5) {
              y = height / 2;
            } else {
              y = height;
            }
            x = width * cfg.outPoints[i][1];
            const id = 'circle' + uniqueId()
            group.addShape("circle", {
              attrs: {
                id: 'circle' + uniqueId(),
                parent: id,
                x: x + offsetX,
                y: y + offsetY,
                r: 10,
                isOutPointOut: true,
                fill: "#1890ff",
                opacity: 0//默認0 需要時改成0.3
              }
            });
            group.addShape("circle", {
              attrs: {
                id: id,
                x: x + offsetX,
                y: y + offsetY,
                r: 3,
                isOutPoint: true,
                fill: "#fff",
                stroke: "#abb2bc",
                opacity: 0
              }
            });
          }
        }
        //group.sort()
        // 添加文本、更多图形
        return shape;
      },
      getPath(cfg) {
        const size = cfg.size || [40, 40]; // 如果没有 size 时的默认大小
        const width = size[0];
        const height = size[1];

        const path = [
          ['M',   -width / 2.5, height / 2],
          ['L', -width / 2, 0],
          ['L',  -width / 2.5, -height / 2],
          ['L', width / 2.5, -height / 2],
          ['L', width / 2,0],
          ['L', width / 2.5, height / 2],
          ['Z'] // 封闭
        ];
        return path;
      },
      //设置状态
      setState(name, value, item) {
        const group = item.getContainer();
        const shape = group.get("children")[0]; // 顺序根据 draw 时确定
        const shape1 = group.get("children")[1];

        const children = group.findAll(g => {
          return g._attrs.parent === shape._attrs.id
        });
        const circles = group.findAll(circle => {
          return circle._attrs.isInPoint || circle._attrs.isOutPoint;
        });
        const selectStyles = () => {
          shape.attr("cursor", "move");
          children.forEach(child => {
            child.attr("cursor", "move");
          });
          circles.forEach(circle => {
            circle.attr('opacity', 1)
          })
        };
        const unSelectStyles = () => {
           circles.forEach(circle => {
            circle.attr('opacity', 0)
          })
        };
        switch (name) {
          case "selected":
          case "hover":
            if (value) {
              selectStyles()
            } else {
              unSelectStyles()
            }
            break;
          case"valid":
            if (value) {
              shape.attr("stroke", "#6acd6e");
            }
            break;
        }
      }
    });

    G6.registerNode("flowDot", {
      draw(cfg, group) {
        let size = cfg.size;
        if (!size) {
          size = [120, 40]
        }
        // 此处必须是NUMBER 不然bbox不正常
        const width = parseInt(size[0]);
        const height = parseInt(size[1]);
        const color = cfg.color;
        const stroke = cfg.stroke;
        // 此处必须有偏移 不然drag-node错位
        const offsetX = -width / 2
        const offsetY = -height / 2
        const mainId = 'dot' + uniqueId();
        const shape = group.addShape("rect", {
          attrs: {
            id: mainId,
            x: offsetX,
            y: offsetY,
            width: width,
            height: height,
            stroke: stroke,
            fill: color,//此处必须有fill 不然不能触发事件
            radius:30,
            shadowBlur:10,
            shadowColor:'rgba(221,232,240,1)'
          }
        });

        if (cfg.label) {
          let label =cfg.label
          if(cfg.label.length>8){
            label = cfg.label.substring(0,8)+"..."
          }
          group.addShape("text", {
            attrs: {
              id: 'label' + uniqueId(),
              x: offsetX + width / 2,
              y: offsetY + height / 2,
              textAlign: "center",
              textBaseline: "middle",
              text:label,
              parent: mainId,
              fill: "#565758",
              fontSize:14
            }
          });
        }
        if (cfg.inPoints) {
          for (let i = 0; i < cfg.inPoints.length; i++) {
            let x,
              y = 0;
            //0为顶 1为底
            if (cfg.inPoints[i][0] === 0) {
              y = 0;
            } else if(cfg.inPoints[i][0] === 1){
              y = height;
            }
            else {
              y = height/2;
            }
            x = width * cfg.inPoints[i][1];
            const id = 'circle' + uniqueId()
            group.addShape("circle", {
              attrs: {
                id: 'circle' + uniqueId(),
                parent: id,
                x: x + offsetX,
                y: y + offsetY,
                r: 10,
                isInPointOut: true,
                fill: "#1890ff",
                opacity: 0
              }
            });
            group.addShape("circle", {
              attrs: {
                id: id,
                x: x + offsetX,
                y: y + offsetY,
                r: 3,
                isInPoint: true,
                fill: "#fff",
                stroke: "#abb2bc",
                opacity: 0
              }
            });
          }
        }
        if (cfg.outPoints) {
          for (let i = 0; i < cfg.outPoints.length; i++) {
            let x,
              y = 0;
            //0为顶 1为底
            if (cfg.outPoints[i][0] === 0) {
              y = 0;
            } else if  (cfg.outPoints[i][0] === 1) {
              y = height;
            }else{
              y = height/2;
            }

            x = width * cfg.outPoints[i][1];
            const id = 'circle' + uniqueId()
            group.addShape("circle", {
              attrs: {
                id: 'circle' + uniqueId(),
                parent: id,
                x: x + offsetX,
                y: y + offsetY,
                r: 10,
                isOutPointOut: true,
                fill: "#1890ff",
                opacity: 0//默認0 需要時改成0.3
              }
            });
            group.addShape("circle", {
              attrs: {
                id: id,
                x: x + offsetX,
                y: y + offsetY,
                r: 3,
                isOutPoint: true,
                fill: "#fff",
                stroke: "#abb2bc",
                opacity: 0
              }
            });
          }
        }
        //group.sort()
        // 添加文本、更多图形
        return shape;
      },

      //设置状态
      setState(name, value, item) {
        const group = item.getContainer();
        const shape = group.get("children")[0]; // 顺序根据 draw 时确定

        const children = group.findAll(g => {
          return g._attrs.parent === shape._attrs.id
        });
        const circles = group.findAll(circle => {
          return circle._attrs.isInPoint || circle._attrs.isOutPoint;
        });
        const selectStyles = () => {
          shape.attr("cursor", "move");
          children.forEach(child => {
            child.attr("cursor", "move");
          });
          circles.forEach(circle => {
            circle.attr('opacity', 1)
          })
        };
        const unSelectStyles = () => {
          circles.forEach(circle => {
            circle.attr('opacity', 0)
          })
        };
        switch (name) {
          case "selected":
          case "hover":
            if (value) {
              selectStyles()
            } else {
              unSelectStyles()
            }
            break;
          case"valid":
            if (value) {
              shape.attr("stroke", "#6acd6e");
            }
            break;
          case"over":
            if (value) {
              const cfg = item.get('model');
              shape.attr("stroke", "green");
            }
            break;
          case"running":
            if (value) {
              const cfg = item.get('model');
              shape.attr("stroke", "yellow");
            }
            break;
          case"error":
            if (value) {
              const cfg = item.get('model');
              shape.attr("stroke", "red");
              /*   shape.animate({
                   // 动画重复
                   repeat: true,
                   // 每一帧的操作，入参 ratio：这一帧的比例值（Number）。返回值：这一帧需要变化的参数集（Object）。
                   onFrame(ratio) {
                     // 先变大、再变小
                     const diff = ratio <= 0.5 ? ratio * 10:(1 - ratio) * 10;
                     let radius = cfg.size;
                     if (isNaN(radius)) radius = radius[0];
                     // 返回这一帧需要变化的参数集，这里只包含了半径
                     return {
                       r: radius / 2 + diff
                     }
                   }
                 }, 3000, 'easeCubic');*/
            }
            break;
        }
      },
      afterDraw(cfg, group) {
        // 获取该节点上的第一个图形
        //const shape = group.get('children')[0];
        //console.log("save:"+this.graph.save())
      }
    });

  }
}

export default customNode
