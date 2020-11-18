
const requestURL = 'https://byui-cit230.github.io/lessons/lesson-09/data/latter-day-prophets.json';

fetch(requestURL)
  .then(function (response) {
    return response.json();
  })
  .then(function (jsonObject) {
    const prophets = jsonObject['prophets'];

    for (let prophetIdx = 0; prophetIdx < prophets.length; prophetIdx++) {
      let prophetCard = document.createElement('section');

      let prophetName = document.createElement('h2');
      prophetName.textContent = `${prophets[prophetIdx].name} ${prophets[prophetIdx].lastname}`;
      prophetCard.appendChild(prophetName);

      let dateOfBirth = document.createElement('p');
      dateOfBirth.textContent = `Date of Birth: ${prophets[prophetIdx].birthdate}`;
      prophetCard.appendChild(dateOfBirth);

      let placeOfBirth = document.createElement('p');
      placeOfBirth.textContent = `Place of Birth: ${prophets[prophetIdx].birthplace}`;
      prophetCard.appendChild(placeOfBirth);

      let image = document.createElement('img');
      image.src = prophets[prophetIdx].imageurl;
      image.alt = `${prophets[prophetIdx].name} ${prophets[prophetIdx].lastname} - ${prophetIdx + 1}`;
      prophetCard.appendChild(image);

      document.querySelector('div.cards').appendChild(prophetCard);
    }
    
  });




