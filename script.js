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

const creatureNameOrIdURL = "https://rpg-creature-api.freecodecamp.rocks/api/creatures";

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
  hp.textContent = data.stats[0].base_stat;
  attack.textContent = data.stats[1].base_stat;
  defense.textContent = data.stats[2].base_stat;
  specialAttack.textContent = data.stats[3].base_stat;
  specialDefense.textContent = data.stats[4].base_stat;
  speed.textContent = data.stats[5].base_stat;
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
 // ✅ reset animation state
  statsContainer.classList.remove("show");
  statsContainer.classList.add("hidden");

  // ✅ force reflow so browser registers class change
  void statsContainer.offsetWidth;

  // ✅ now trigger animation
  statsContainer.classList.remove("hidden");
  statsContainer.classList.add("show");
};

searchBtn.addEventListener("click",searchCreature);
searchBar.addEventListener("submit",(e) => 
{
  e.preventDefault();
  searchCreature();
  // statsContainer.classList.remove("hidden");
  // statsContainer.classList.toggle("show");
});