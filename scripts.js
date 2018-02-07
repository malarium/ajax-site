const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';// tutaj są dane w formacie json - zewntrzne źródło

const cities = [];
fetch(endpoint) // pobiera dane z adresu
.then(blob => blob.json()) //zwraca promise z danymi
.then(data => cities.push(...data));//dopiero teraz promise jest rozwiązany i dane (data) są dostpne jako czytelne obiekty (blob i data to oczywiście zmienne). Można sprawdzić: .then(data => console.log(data));
// (...data) - to jest spread w ES6 - bez wielokropka w cities byłaby 1 tablica z 1000 elementów - spread usuwa zagnieżdżenie i w cities jest 1000 oddzielnych elementów


function findMatches(wordToMatch, cities) { //funkcja pobiera to co wprowadził user i całą kolekcj w zmiennej cities
  return cities.filter(place => { //filtruje przez wszystkie obiekty w cities i każdy przypisuje do zmiennej place
    const regex = new RegExp(wordToMatch, 'gi');//global, insensitive
    return place.city.match(regex)/*i sprawdza czy tym razem place pasuje do filtru regex */
        })
  };

function getAdditionalData(cityName, cities) {
  cities.forEach(function(town) {
    if (town.city == cityName) {
      state = town.state;
      population = town.population;
      return {state, population};
    }
  });
}

function displayMatches () { //wyświetla wyniki wyszukiwania
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

function displayAdditionalData(e) {
  let cityName = e.srcElement.innerText;
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
}

const searchInput = document.querySelector('#search');
const miasto = document.querySelector('#miasto');
const stan = document.querySelector('#stan');
const populacja = document.querySelector('#populacja');
searchInput.addEventListener('keyup', displayMatches);
miasto.addEventListener('click', displayAdditionalData);
