const pokemonName = document.querySelector(".pokemon-name");
const pokemonNumber = document.querySelector(".pokemon-number");
const pokemonImage = document.querySelector(".pokemon-image");

const form = document.querySelector("form");
const input = document.querySelector("input");
const btnPrev = document.querySelector(".btn-prev");
const btnNext = document.querySelector(".btn-next");

let pokemonAtual = 0;

async function fetchPokemon(pokemon) {
    const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    //Realizando a requisição
    const response = await fetch(url);
    //Convertendo os dados da requisição para JSON
    const data = await response.json();
    // Retornando o Pokemon pesquisado
    console.log(data);
    return data
}

// Função que carrega o pokemon no body
async function renderPokemon(pokemon) {
    pokemonName.innerText = "Carregando...";
    pokemonNumber.innerText = "";

    const data = await fetchPokemon(pokemon);
    if (data) {
        pokemonName.innerText = data.name;
        pokemonNumber.innerText = data.id;
        let imagem = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        if (imagem != null) {
            pokemonImage.src = imagem;
        }
        else {
            pokemonImage.src = 'images/pokebola.png';
        }
        input.value = "";
        pokemonAtual = data.id;
    }
    else {
        pokemonImage.style.display = 'none';
        pokemonName.innerText = 'Não encontrado :(';
    }

}

//Função 'submit' do form
form.addEventListener('submit', (e) => {
    //impede um refresh na página
    e.preventDefault();
    // pegando o valor digitado
    let pokemon = input.value;
    // passando o valor digitado para a função
    renderPokemon(pokemon);
}) 

btnPrev.addEventListener('click', (e) => {
    // Se o pokemon for maior que 1
    if (pokemonAtual > 1) {
        //Decrementa a vatiável pokemonAtual
        pokemonAtual--;
        //Chama a função render com o pokemon atual
        renderPokemon(pokemonAtual);
    }
})

btnNext.addEventListener('click', () => {
    pokemonAtual++;
    renderPokemon(pokemonAtual);
})

//renderPokemon(pokemonAtual);