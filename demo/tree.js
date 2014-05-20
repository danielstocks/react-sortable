function populateTreeIds(tree) {

  collection[0] = tree;

  var startId = 1;
  walk(tree.children, function(node, parent) {
    node.id = startId;
    if(parent) {
      node.parent_id = parent.id;
    } else { node.parent_id = 0
    }
    collection[startId] = node;
    startId++;
    return node;
  });
  return tree;
}

function walk(tree, fn, parent) {
  tree.forEach(function(node) {
    var node = fn(node, parent);
    if(node.children) {
      walk(node.children, fn, node);
    } else {
      node.children = [];
    }
  });
}
