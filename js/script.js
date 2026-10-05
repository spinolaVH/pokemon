const inputPokemon = document.getElementById("pokemon");
const botaoBuscar = document.getElementById("buscar");

const mensagem = document.getElementById("mensagem");

const nome = document.getElementById("nome");
const numero = document.getElementById("numero");

const imagem = document.getElementById("imagem");

const tipos = document.getElementById("tipos");

const altura = document.getElementById("altura");
const peso = document.getElementById("peso");


// Estatísticas
const hpValor = document.getElementById("hp-valor");
const ataqueValor = document.getElementById("ataque-valor");
const defesaValor = document.getElementById("defesa-valor");
const velocidadeValor = document.getElementById("velocidade-valor");

const hpBarra = document.getElementById("hp-barra");
const ataqueBarra = document.getElementById("ataque-barra");
const defesaBarra = document.getElementById("defesa-barra");
const velocidadeBarra = document.getElementById("velocidade-barra");


// Tradução dos tipos
const nomesTipos = {
    normal: "Normal",
    fire: "Fogo",
    water: "Água",
    electric: "Elétrico",
    grass: "Planta",
    ice: "Gelo",
    fighting: "Lutador",
    poison: "Veneno",
    ground: "Terrestre",
    flying: "Voador",
    psychic: "Psíquico",
    bug: "Inseto",
    rock: "Pedra",
    ghost: "Fantasma",
    dragon: "Dragão",
    dark: "Sombrio",
    steel: "Aço",
    fairy: "Fada"
};


// Buscar Pokémon
async function buscarPokemon() {

    const pesquisa = inputPokemon.value
        .trim()
        .toLowerCase();

    if (pesquisa === "") {

        mensagem.textContent =
            "Digite o nome ou número de um Pokémon.";

        return;
    }

    mensagem.textContent = "Carregando...";

    try {

        const resposta = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${pesquisa}`
        );

        if (!resposta.ok) {
            throw new Error("Pokémon não encontrado");
        }

        const pokemon = await resposta.json();

        mostrarPokemon(pokemon);

        mensagem.textContent = "";

    } catch (erro) {

        mensagem.textContent =
            "Pokémon não encontrado.";

    }
}


// Mostrar informações
function mostrarPokemon(pokemon) {

    // Nome
    nome.textContent = pokemon.name;

    // Número
    numero.textContent =
        `#${String(pokemon.id).padStart(3, "0")}`;


    // Imagem
    imagem.src =
        pokemon.sprites.other["official-artwork"].front_default
        || pokemon.sprites.front_default;

    imagem.alt = pokemon.name;


    // Tipos
    tipos.innerHTML = "";

    pokemon.types.forEach((item) => {

        const tipoOriginal = item.type.name;

        const span = document.createElement("span");

        span.classList.add(
            "tipo",
            tipoOriginal
        );

        span.textContent =
            nomesTipos[tipoOriginal] || tipoOriginal;

        tipos.appendChild(span);

    });


    // Altura
    // A API fornece altura em decímetros.
    altura.textContent =
        `${(pokemon.height / 10).toFixed(1)} m`;


    // Peso
    // A API fornece peso em hectogramas.
    peso.textContent =
        `${(pokemon.weight / 10).toFixed(1)} kg`;


    // Encontrar estatísticas
    const hp = encontrarStatus(
        pokemon.stats,
        "hp"
    );

    const ataque = encontrarStatus(
        pokemon.stats,
        "attack"
    );

    const defesa = encontrarStatus(
        pokemon.stats,
        "defense"
    );

    const velocidade = encontrarStatus(
        pokemon.stats,
        "speed"
    );


    // Mostrar valores
    hpValor.textContent = hp;
    ataqueValor.textContent = ataque;
    defesaValor.textContent = defesa;
    velocidadeValor.textContent = velocidade;


    // Atualizar barras
    atualizarBarra(hpBarra, hp);
    atualizarBarra(ataqueBarra, ataque);
    atualizarBarra(defesaBarra, defesa);
    atualizarBarra(velocidadeBarra, velocidade);
}


// Procurar uma estatística específica
function encontrarStatus(stats, nomeStatus) {

    const status = stats.find(
        (item) => item.stat.name === nomeStatus
    );

    return status ? status.base_stat : 0;
}


// Atualizar barra de status
function atualizarBarra(barra, valor) {

    // A maioria dos stats base fica em uma faixa
    // aproximada de 0 a 255.
    const porcentagem =
        Math.min((valor / 255) * 100, 100);

    barra.style.width =
        `${porcentagem}%`;
}


// Clique no botão
botaoBuscar.addEventListener(
    "click",
    buscarPokemon
);


// Pressionar Enter no campo
inputPokemon.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {
            buscarPokemon();
        }

    }
);


// Carregar Pikachu ao abrir
buscarPokemonInicial();


// Função inicial
async function buscarPokemonInicial() {

    try {

        const resposta = await fetch(
            "https://pokeapi.co/api/v2/pokemon/pikachu&quot" 
        );

        const pokemon = await resposta.json();

        mostrarPokemon(pokemon);

    } catch (erro) {

        mensagem.textContent =
            "Não foi possível carregar o Pokémon.";

    }
}