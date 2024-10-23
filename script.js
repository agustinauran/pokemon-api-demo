const API_BASE_URL = "https://pokeapi.co/api/v2/"
const API_POKEMON_URL = `${API_BASE_URL}pokemon?limit={{LIMIT}}`

document.addEventListener("DOMContentLoaded", function () {
  displayPokemonGrid();
});


const displayPokemonGrid = async () => {
  const pokemonList = await getPokemon();
  const grid = document.getElementById('pokemon-grid');
  for (let pokemon of pokemonList) {
      const details = await getPokemonDetails(pokemon.url);
      const card = createPokemonCard(details);
      grid.innerHTML += card;
  }
};

const getPokemon = async (limit = 12) => {
  const response = await fetch(API_POKEMON_URL.replace('{{LIMIT}}', limit));
  const data = await response.json();
  return data.results;
};

const getPokemonDetails = async (url) => {
  const response = await fetch(url);
  return response.json();
};

const createPokemonCard = (pokemon) => {
  return `
      <div class="col-md-3 mb-4">
          <div class="card shadow-sm">
              <img src="${pokemon.sprites.front_default}" class="card-img-top" alt="${pokemon.name}">
              <div class="card-body text-center">
                  <h5 class="card-title text-capitalize">${pokemon.name}</h5>
                  <p class="card-text">ID: ${pokemon.id}</p>
                  <p class="card-text">Height: ${pokemon.height}</p>
                  <p class="card-text">Weight: ${pokemon.weight}</p>
              </div>
          </div>
      </div>
  `;
};
