const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';// tutaj są dane w formacie json - zewntrzne źródło (ktoś wstawił na github dane 1000 misat w USA!) / Someone actually put 1000 US cities in JSON on their GitHub!
var latitude = 40.730610;
var longitude = -73.935242;
const cities = [];
fetch(endpoint) // pobiera dane z adresu
.then(blob => blob.json()) //zwraca promise z danymi
.then(data => cities.push(...data));//dopiero teraz promise jest rozwiązany i dane (data) są dostpne jako czytelne obiekty (blob i data to oczywiście zmienne). Można sprawdzić: .then(data => console.log(data));
// (...data) - to jest spread w ES6 - bez wielokropka w cities byłaby 1 tablica z 1000 elementów - spread usuwa zagnieżdżenie i w cities jest 1000 oddzielnych elementów


function findMatches(wordToMatch, cities) { //whatever user input and all the cities
  return cities.filter(place => { //filter through every object in CITIES and put each in PLACE
    const regex = new RegExp(wordToMatch, 'gi');//global, insensitive
    return place.city.match(regex);/*check if it matches regex */
  });
  }

function getAdditionalData(cityName, cities) { //get additional data about the city
  cities.forEach(function(town) {
    if (town.city === cityName) {
      state = town.state;
      population = town.population;
      latitude = town.latitude;
      longitude = town.longitude;
      return {state, population, latitude, longitude};
    }
  });
}

function displayMatches () { //search results
  if(this.value==="") { // if empty - clear the search, get general map and exit the function
    miasto.innerHTML = "";
    stan.innerHTML = "";
    populacja.innerHTML = "";
    initMap(3);
    return;
  }
  const matchArray = findMatches(this.value, cities);
  const html = matchArray.map(place => {
    return `
    <p>
    <span class="name">${place.city}</span>
    </p>
    `
  }).join('');
  miasto.innerHTML = html;
}

function displayAdditionalData(e) { //displays additional data aftech choosing the city
  cityName = e.target.innerText||e.srcElement.innerText; //tutaj ukryła sie nazwa miasta !!!Uwaga! Musi być taka kolejność, bo Firefox wyrzuci błąd i zatrzyma skrypt (!) Pierwsza wartość jest pobierana dla Firefoxa, druga - dla Chrome, Opery i Edge. / Warning! It MUST be in this order - the first is for Firefox, the second for Chrome, Opera and Edge. If you change the order Firefox will throw an error!
  const additionalData = getAdditionalData(cityName, cities);
  stan.innerHTML = `
  <p>
  <span class="name">${state}</span>
  </p>
  `;
  populacja.innerHTML = `
  <p>
  <span class="name">${population}</span>
  </p>
  `;
  miasto.innerHTML = `
  <p>
  <span class="name">${cityName}</span>
  </p>
  `;
  initMap(10); //initialize Google maps
}
    function initMap(zoom) {
        var setting = {lat: parseFloat(`${latitude}`), lng: parseFloat(`${longitude}`)};//geolocation data from parsed variables
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: parseFloat(`${zoom}`),
          center: setting
        });
      }

const searchInput = document.querySelector('#search');
const miasto = document.querySelector('#miasto');
const stan = document.querySelector('#stan');
const populacja = document.querySelector('#populacja');
searchInput.addEventListener('keyup', displayMatches);
miasto.addEventListener('click', displayAdditionalData);

//a little jQuery ;)
$(document).ready(function(){
  $('#logo').tooltip();
  $('#search').tooltip();
  $('#name').tooltip();
  $('.category').tooltip();
});
