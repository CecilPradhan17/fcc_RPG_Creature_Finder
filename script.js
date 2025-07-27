//search bar 
const searchBtn = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");
const searchBar = document.getElementById("search-bar");

//information container 
const creatureName = document.getElementById("creature-name");
const creatureId = document.getElementById("creature-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const specialName = document.getElementById("specialName");
const specialDescription = document.getElementById("specialDescription");

//stats container
const statsContainer = document.getElementById("stats-container");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed"); 

const base = document.getElementById("base");
const statsLabel = document.getElementById("stats");
const hpName = document.getElementById("hpName");
const attackName = document.getElementById("attackName");
const defenseName = document.getElementById("defenseName");
const specialAttackName = document.getElementById("special-attackName");
const specialDefenseName = document.getElementById("special-defenseName");
const speedName = document.getElementById("speedName");

//Valid Creature List Container
const listHeader = document.getElementById("listHeader");
const validCreatureList = document.getElementById("validCreatureList");
const table = document.getElementById("table");
const toggleBtn = document.getElementById("toggleListBtn");

const displayValidCreatureList = async () => 
{
  try
  {
    const response = await fetch ("https://rpg-creature-api.freecodecamp.rocks/api/creatures");
    if (!response.ok)
      throw new error("Network error");

    const data = await response.json();
    validCreatureList.innerHTML = data.map(data => `<tr><td>${data.id}</td><td>${data.name}</td></tr>`).join("");
  }
  catch(error)
  {
    console.error("Fetch error", error.message);
  }
}

// Toggle the Creature List 
listHeader.addEventListener( "click", () => 
  {
    const isHidden = table.classList.toggle("hidden");
    toggleBtn.innerHTML = isHidden ? '▼' : '▲';
  });

displayValidCreatureList();

const updateCreatureInfo = (data) => 
{
  creatureName.innerHTML = `<strong>${data.name.toUpperCase()}</strong>`;
  creatureId.textContent = `#${data.id}`;
  weight.textContent = `Weight: ${data.weight}`;
  height.textContent = `Height: ${data.height}`;
  types.innerHTML = "";
  types.innerHTML = data.types.map(types => `<div class="type" id="${types.name}">${types.name.toUpperCase()}</div>`).join("");
  specialName.innerHTML = `<strong>${data.special.name}</strong>`;
  specialDescription.textContent = data.special.description;
}

const updateCreatureStats = (data) =>
{
  flipAndSetText(hp, data.stats[0].base_stat);
  flipAndSetText(attack, data.stats[1].base_stat);
  flipAndSetText(defense, data.stats[2].base_stat);
  flipAndSetText(specialAttack, data.stats[3].base_stat);
  flipAndSetText(specialDefense, data.stats[4].base_stat);
  flipAndSetText(speed, data.stats[5].base_stat);

  flipAndSetText(base, base.textContent);
  flipAndSetText(statsLabel, statsLabel.textContent);
  flipAndSetText(hpName, hpName.textContent);
  flipAndSetText(attackName, attackName.textContent);
  flipAndSetText(defenseName, defenseName.textContent);
  flipAndSetText(specialAttackName, specialAttackName.textContent);
  flipAndSetText(specialDefenseName, specialDefenseName.textContent);
  flipAndSetText(speedName, speedName.textContent);
}


const updateCreatureCard = async (nameOrId) => 
{
  const creatureInfoURL = `https://rpg-creature-api.freecodecamp.rocks/api/creature/${nameOrId}`;

  try 
  {
    const response = await fetch(creatureInfoURL);
    if (!response.ok) 
      throw new Error("Creature not found");

    const data = await response.json();
    updateCreatureInfo(data);
    updateCreatureStats(data);
  } 
  catch (error) 
  {
    console.error("Fetch error:", error.message);
    throw error; // Important so searchCreature can alert properly
  }
};

// Animation Function 
const flipAndSetText = (element, value) =>
{
  element.classList.add("flip-once");
  setTimeout(() => {
    element.textContent = value;
  }, 500);

  // Remove the class so it can be reused on next update
  element.addEventListener("animationend", () => {
    element.classList.remove("flip-once");
  }, { once: true });
}

//Execute main functions when search button is clicked
const searchCreature = async () => 
{
  const nameOrId = searchInput.value.trim();

  if (!nameOrId) return;

  try 
  {
    await updateCreatureCard(nameOrId);
  } 
  catch (error) 
  {
    alert("Creature not found");
  }
  searchInput.value = "";
}

searchBtn.addEventListener("click",searchCreature);
searchBar.addEventListener("submit",(e) => 
{
  e.preventDefault();
  searchCreature();
});
