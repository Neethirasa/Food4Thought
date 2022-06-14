node.js version: 6.4.1
OS: Windows 10 Home

There is no code needed to be installed, however to confirm npm is correctly installed,
execute:
>npm -v

To install npm express
>npm install express

Instructions to launch:
Assuming folder is in Downloads, open Command prompt and execute:
> cd Downloads
> cd "COMP2406A Assignment 4"
> node server.js

Instructions to test:
Browse on Google Chrome
>http://localhost:3000
>http://localhost:3000/
>http://localhost:3000/recipes
>http://localhost:3000/recipes?ingredient=Basil
>http://localhost:3000/recipes?ingredient=Basil,Cumin
>http://localhost:3000/recipes.html
>http://localhost:3000/index.html

To get just the JSON data:
>http://localhost:3000/api
>http://localhost:3000/api?ingredient=Basil
>http://localhost:3000/api?ingredient=Basil,Cumin