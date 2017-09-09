function generator (svg_ast) {
  function createAttrString (attr) {
    return Object.keys(attr).map(function (key) {
      return key + '= "' + attr[key] + '"'
    }).join(' ')
  }

  var svg_attr = createAttrString(svg_ast.attr)

  var elements = svg_ast.body.map(function (node) {
    return '<' + node.tag + ' ' + createAttrString(node.attr) + '></' + node.tag + '>'
  }).join('\n\t')

  return '<svg ' + svg_attr + '>\n' + elements + '\n</svg>'
}
