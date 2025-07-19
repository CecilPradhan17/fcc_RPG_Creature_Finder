//search bar 
const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

//information container 
const creatureName = document.getElementById("creature-name");
const creatureId = document.getElementById("creature-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");

//stats container
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed"); 

const creatureNameOrIdURL = "https://rpg-creature-api.freecodecamp.rocks/api/creatures";

const isValid = true;

const findNameOrId = (nameOrId) => 
{
  fetch(creatureNameOrIdURL)
  .then(response => response.json())
  .then(data => (data.id || data.name) === nameOrId ? data : ;
}

const searchCreature = () => 
{
  const nameOrId = searchInput.value();
  findNameOrId(nameOrId);

}