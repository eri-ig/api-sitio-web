const solicitud = document.getElementById("buscador");
const btnBuscar = document.getElementById("buscar");
const tarjetas = document.getElementById("tarjetas");


btnBuscar.addEventListener('click', (event) => {// al hacer click en el boton buscar
  event.preventDefault();//no se carga nuevamente la pagina

  const myHeaders = new Headers();//esto pertenece al api,aqui esta la key
  myHeaders.append("x-apihub-key", "Xabi79j5HGQWU8brpFZOZDm2PR8z4PKP1XVMRy72TV9-4DlmrQ");
  myHeaders.append("x-apihub-host", "AnimeList-API.allthingsdev.co");
  myHeaders.append("x-apihub-endpoint", "10b0d633-40f8-43ee-af7f-812833c933a1");

  const requestOptions = {//configuracion de opciones del fetch
    method: "GET",
    headers: myHeaders,
    redirect: "follow"
  };

  //la solicitud a la API
  fetch("https://AnimeList-API.proxy-production.allthingsdev.co/v4/anime?q=" + solicitud.value, requestOptions)
    .then(response => response.json()) // convertimos la respuesta a json
    .then(animes => {
      tarjetas.innerHTML = ''; // se limpia el area de las tarjetas

      // para cada anime recorrido
      animes.data.forEach(anime => {//se crea una card
        const animeCard = `
          <div class="card" style="width: 20rem; margin: 10px; overflow-y: auto;">
            <img src="${anime.images.jpg.image_url}" class="card-img-top compact-image" style="height: 200px; width: auto;"alt="${anime.title}">
            <div class="card-body" style="height: 200px;">
              <h6 class="card-title dynapuff-titleCard">${anime.title}</h6>
              <div class="card-text-wrapper" style="max-height: 100px; overflow-y: auto;">
                <p class="card-text" style="max-height: 140px;">${anime.synopsis || 'Sin sinopsis disponible'}</p>
              </div>
              <a href="${anime.url}" target="_blank" class="btn btn-primary my-2 fixed-button">See more</a>
            </div>
          </div>`;
        tarjetas.innerHTML += animeCard;//se añade cada tarjeta al container
      });
    })
    .catch(error => console.error("Error:", error)); 
});
