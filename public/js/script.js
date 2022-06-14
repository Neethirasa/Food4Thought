/*
Server

A Web-based application to find recipes for food. 

http://localhost:3000/recipes
http://localhost:3000/recipes?ingredient=Basil
http://localhost:3000/recipes?ingredient=Basil,Cumin

To get just the JSON data:
http://localhost:3000/api
http://localhost:3000/api?ingredient=Basil
http://localhost:3000/api?ingredient=Basil,Cumin

*/

function getRecipes() {

    let ingredient = document.getElementById('ingredient').value

    let recipeDiv = document.getElementById('recipes')
    recipeDiv.innerHTML = ''

    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let response = JSON.parse(xhr.responseText)
            let recipes = response.recipes

            for (let recipe of recipes) {
                recipeDiv.innerHTML = recipeDiv.innerHTML + `
                <div class="recipe">
                    <a href="${recipe.f2f_url}" target="_blank">
                        <img src=${recipe.image_url} />
                        <h2>${recipe.title}</h2>
                    </a>
                </div>
            `

            }
        }
    }
    if(ingredient === '') {
       xhr.open('GET', `/api`, true)
    }
	else{
       xhr.open('GET', `/api?ingredient=${ingredient}`, true)
	}
    xhr.send()
}

//Attach Enter-key Handler
const ENTER=13
document.getElementById("ingredient")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === ENTER) {
        document.getElementById("submit").click();
    }
});


document.addEventListener('DOMContentLoaded',function(){
	document.getElementById("submit").click();
});
