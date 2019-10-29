import init from './init';
import Node from './node';
import {data} from './data';

let box = new twaver.ElementBox();
let network = new twaver.vector.Network(box);

let nodes = [];

export const initNode = () => {
  init(network, box, nodes);
}

export const reload = (status) => {
  Node.reloadIcons(box, nodes, status);
  data.link.map(v => {
    Node.setLinkStyle(box, v.id, 'dashed');
  });
  nodes.map(v => {
    Node.setLinkStyle(box, v.linkId, 'dashed');
  })
};
