"use strict";

const obtenerResultado = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const prod = 'Personajes de POKEMON';
            resolve(prod);
        }, 2000);
    });
}

const procesarDatos = () => {
    obtenerResultado()
        .then(respuesta => {
            document.getElementById("resultado").innerHTML = respuesta;
        })
        .catch(error => {
            console.error('Error al obtener el resultado:', error);
        });
}

const fetchData = () => {
    fetch("https://pokeapi.co/api/v2/pokemon?limit=10")
        .then(response => {
            if (!response.ok) {
                throw new Error(`La respuesta de la red no fue correcta. Estado: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const pokemonList = data.results;
            const pokemonContainer = document.getElementById("productos");

            // Limpiar el contenido del contenedor antes de agregar nuevos elementos
            pokemonContainer.innerHTML = '';

            // Procesar cada Pokémon
            const fetchPromises = pokemonList.map(pokemon =>
                fetch(pokemon.url)
                    .then(response => response.json())
                    .then(pokemonData => {
                        // Crear un contenedor para cada Pokémon
                        const pokemonDiv = document.createElement('div');
                        pokemonDiv.classList.add('pokemon');

                        // Crear un elemento de imagen y de texto para el Pokémon
                        const pokemonImg = document.createElement('img');
                        pokemonImg.src = pokemonData.sprites.front_default;
                        pokemonImg.alt = pokemon.name;

                        const pokemonName = document.createElement('p');
                        pokemonName.textContent = pokemon.name;

                        // Agregar la imagen y el nombre al contenedor del Pokémon
                        pokemonDiv.appendChild(pokemonImg);
                        pokemonDiv.appendChild(pokemonName);

                        // Agregar el contenedor del Pokémon al contenedor principal
                        pokemonContainer.appendChild(pokemonDiv);
                    })
                    .catch(error => {
                        console.error('Error al obtener datos del Pokémon:', error);
                    })
            );

            // Esperar a que todas las promesas se resuelvan
            Promise.all(fetchPromises).catch(error => {
                console.error('Error al procesar las promesas de los Pokémon:', error);
            });
        })
        .catch(error => {
            console.error('Error al obtener datos:', error);
        });
}

// Llamadas a las funciones
procesarDatos();
fetchData();
