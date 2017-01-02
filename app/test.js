const http = require('http')

var server = http.createServer((req, res)=> {
  switch (req.url) {
    case '/form':
      res.setHeader('Content-Type', 'text/html; charset=UTF-8')
      res.write(
        '<form method="post" action="/submit">' +
        '<label>用户名</label><br/>' +
        '<input name="username"/><br/>' +
        '<button type="submit">提交</button>' +
        '</form>'
      )
      res.end()
      break
    case '/submit':
      var body = ''
      req.on('data', (chunk)=>{
        body += chunk.toString()
      })
      req.on('end', ()=>{
        res.write('Your input: ' + body)
        res.end()
      })
      break
    case '/':
    default:
      res.write(
        '<h1>Hello World!</h1>' +
        '<a href="/form">Form</a>'
      )
      res.end()
      break
  }

})

server.listen(3000, '0.0.0.0')