function parser (tokens) {
  var AST = {
    type: 'Drawing',
    body: []
  }

  while (tokens.length > 0){
    var current_token = tokens.shift()

    if (current_token.type === 'word') {
      switch (current_token.value) {
        case 'Paper' :
          var expression = {
            type: 'CallExpression',
            name: 'Paper',
            arguments: []
          }
          var argument = tokens.shift()
          if(argument.type === 'number') {
            expression.arguments.push({
              type: 'NumberLiteral',
              value: argument.value
            })
            AST.body.push(expression)
          } else {
            throw 'Paper command must be followed by a number.'
          }
          break

        case 'Pen' :
          var expression = {
            type: 'CallExpression',
            name: 'Pen',
            arguments: []
          }
          var argument = tokens.shift()
          if(argument.type === 'number') {
            expression.arguments.push({
              type: 'NumberLiteral',
              value: argument.value
            })
            AST.body.push(expression)
          } else {
            throw 'Pen command must be followed by a number.'
          }
          break

        case 'Line':
          var expression = {
            type: 'CallExpression',
            name: 'Line',
            arguments: []
          }
          for (var i = 0; i < 4; i++) {
            var argument = tokens.shift()
            if(argument.type === 'number') {
              expression.arguments.push({
                type: 'NumberLiteral',
                value: argument.value
              })
            } else {
              throw 'Line command must be followed by 4 numbers.'
            }
          }
          AST.body.push(expression)
          break
      }
    }
  }
  return AST
}
