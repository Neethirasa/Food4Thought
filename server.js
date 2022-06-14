/*
To Start App use one of the following:
http://localhost:3000
http://localhost:3000/
http://localhost:3000/recipes
http://localhost:3000/recipes?ingredient=Basil
http://localhost:3000/recipes?ingredient=Basil,Cumin
http://localhost:3000/recipes.html
http://localhost:3000/index.html

To get just the JSON data:
http://localhost:3000/api
http://localhost:3000/api?ingredient=Basil
http://localhost:3000/api?ingredient=Basil,Cumin

*/
const express = require('express')//express framework
const requestModule = require('request')//helpful npm module for easy http requests
const fs = require('fs')
const PORT = 3000

let API_KEY = '522d759833c47c0b3d8050034ad9a3aa' //our food2fork API

const app = express()

//Middleware
app.use(express.static(__dirname + '/public'))//static server

function send_index_with_ingredient(request, response, ingredient){
	var filePath1 = __dirname + '/views/index_with_ingredient-part1.html';
	var filePath2 = __dirname + '/views/index_with_ingredient-part2.html';
    fs.readFile(filePath1, function(err,data){
       if(err){ handleError(response); return;}
       response.writeHead(200, {'Content-Type': 'text/html'});
       response.write(data);
	   response.write(ingredient);
	   fs.readFile(filePath2, function(err,data){
           if(err){ handleError(response); return;}
           response.write(data);
	       response.end();
       });
     });
}
function handleError(response){
    console.log('ERROR: ' + JSON.stringify(err));
    response.writeHead(404);
    response.end(JSON.stringify(err));
}

app.use(function(request, response, next){
	console.log('LOG:');
  console.log(`URL: ${request.url}`)
	console.log(request.query);
	next();
})


app.get('/', (request, response) => {
  let ingredient = request.query.ingredient
  if(ingredient){
  	send_index_with_ingredient(request, response, ingredient);
  }
  else {
	response.sendFile(__dirname + '/views/index.html')
  }
})


app.get('/recipes.html', (request, response) => {
    response.redirect('/')
})

app.get('/recipes', (request, response) => {
  let url = ''
  let ingredient = request.query.ingredient
  if(ingredient) {
  	send_index_with_ingredient(request, response, ingredient);
  }
  else {
    response.sendFile(__dirname + '/views/index.html')
  }
})

app.get('/index.html', (request, response) => {
      response.redirect('/')
})

app.get('/api', (request, response) => {
  let url = ''
  let ingredient = request.query.ingredient
  if(ingredient) {
  	url = `https://food2fork.com/api/search?key=${API_KEY}&q=${ingredient}`
  }
  else {
    url = `https://food2fork.com/api/search?key=${API_KEY}`
  }
  requestModule.get(url, (err, res, data) => {
    return response.contentType('application/json').json(JSON.parse(data))
  })
})

//start server
app.listen(PORT, err => {
  if(err) console.log(err)
  else {
    console.log(`Server listening on port: ${PORT} CNTL-C to quit`)
    console.log(`To Test:`)
    console.log(`http://localhost:3000/recipes`)
    console.log(`http://localhost:3000/recipes?ingredient=Basil`)
    console.log(`http://localhost:3000/recipes?ingredient=Basil,Cumin`)
    console.log(`To get just the JSON data:`)
    console.log(`http://localhost:3000/api`)
    console.log(`http://localhost:3000/api?ingredient=Basil`)
    console.log(`http://localhost:3000/api?ingredient=Basil,Cumin`)
  }
})

