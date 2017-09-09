// Lexer function

function lexer (code){
  return code.split(/\s+/)
             .filter(function(t) { return t.length > 0 })
             .map(function(t) {
               return isNaN(t)
                ? { type: 'word', value: t }
                : { type: 'number', value: t }
             })
}

function parser (tokens) {
  var AST = {
    type: 'Drawing',
    body: []
  }

  while (tokens.length > 0) {
    var current_token = tokens.shift()
    if (current_token.type === 'word') {
      switch (current_token.value) {
        case 'Paper':
          var expression = {
            type: 'CallExpression',
            name: 'Paper',
            arguments: []
          }

          var argument = tokens.shift()

          if (argument.type === 'number') {
            expression.arguments.push({
              type:  'NumberLiteral',
              value:  argument.value
            })
            AST.body.push(expression)
          } else {
            throw 'Papper command must be followed by a number'
          }
          break
          case 'Pen' :

          case 'Line' :
        default:

      }
    }
  }

  return AST
}

function transformer (ast) {
  var svg_ast = {
    tag : 'svg',
    attr: {
      width: 100, height: 100, viewBox: '0 0 100 100',
      xmlns: 'http://www.w3.org/2000/svg', version: '1.1'
    },
    body: []
  }

  var pen_color = 100

  while (ast.body.length > 0) {
    var node = ast.body.shift()
    switch (node.name) {
      case 'Paper':
        var paper_color = 100 - node.arguments[0].value
        svg_ast.body.push({
          tag : 'rect',
          attr: {
            x: 0, y: 0,
            width: 100, height: 100,
            fill: 'rgb(' + paper_color + '%, ' + paper_color + '%, ' + paper_color + '%)'
          }
        })
        break
      case 'Pen':
        pen_color = 100 - node.arguments[0].value
        break

      case 'Line':
        break
      default:

    }
  }

  return svg_ast
}
