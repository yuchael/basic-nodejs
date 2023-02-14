var http = require('http');
var fs = require('fs');
var url = require('url');
var qs = require('querystring');

function templateHTML(title, list, body){
  return `
  <!doctype html>
  <html>  
  <head>
    <title>WEB1 - ${title}</title>
    <meta charset="utf-8">
  </head>
  <body>
    <h1><a href="/">WEB</a></h1>
    ${list}
    <a href="/create">create</a>
    ${body}
  </body>
  </html>
  `;
}
function templateList(filelist){
  var list = '<ul>';
  var i = 0;
  while(i < filelist.length){
    list = list + `<li><a href="/?id=${filelist[i]}">${filelist[i]}</a></li>`;
    i = i + 1;
  }
  list = list + '</ul>';
  return list;
}

var app = http.createServer(function(request,response){
    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathname = url.parse(_url, true).pathname;  
    if(pathname === '/'){
      if(queryData.id === undefined){        
        fs.readdir('./data', function(error, filelist){ // nodejs는 파일 목록을 가져온 후 function에서 {} 안에 있는 내용을 실행함.
          var title = 'Welcome';
          var description = "Hello, Node.js";          
          var list = templateList(filelist);
          var template = templateHTML(title, list,
          `<h2>${title}</h2><p>${description}</p>`);   
          response.writeHead(200);
          response.end(template);
          })  
      } else{        
        fs.readdir('./data', function(error, filelist){ // nodejs는 파일 목록을 가져온 후 function에서 {} 안에 있는 내용을 실행함.
          fs.readFile(`data/${queryData.id}`, 'utf-8', function(err, description){
            var title = queryData.id;
            var list = templateList(filelist);
            var template = templateHTML(title, list, `<h2>${title}</h2><p>${description}</p>`);
            response.writeHead(200);
            response.end(template);
          });
        });
      }      
    }else if(pathname === '/create'){
      fs.readdir('./data', function(error, filelist){ // nodejs는 파일 목록을 가져온 후 function에서 {} 안에 있는 내용을 실행함.
        var title = 'WEB - create';       
        var list = templateList(filelist);
        var template = templateHTML(title, list,`
        <form action="http://localhost:3000/create_process" method="post">
          <p><input type="text" name="title" placeholder="title"></p>
          <p>
            <textarea name="description" placeholder="description"></textarea>
          </p>
          <p>
              <input type="submit">
          </p>
        </form>
        `);   
        response.writeHead(200);
        response.end(template);
      })
    }else if(pathname === '/create_process'){
      var body = '';
      request.on('data', function(data){ //서버쪽에서 수신할 때마다 call-back function을 수행하고 data라는 인자를 통해서 수신한 정보를 주기로 함
        body = body + data; //post로 보낸 데이터의 양이 너무 많을 경우 쪼개서 data를 통해 받고 body에 합침
      }); 
      request.on('end', function(){
        var post = qs.parse(body);
        var title = post.title;
        var description = post.description;
        console.log(post);
      });
      response.writeHead(200);
      response.end('success');
    }else{
      response.writeHead(404);
      response.end('Not found');
    }
     
});
app.listen(3000);