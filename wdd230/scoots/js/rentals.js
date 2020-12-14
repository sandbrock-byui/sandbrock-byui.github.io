const addEntryToTable = (document, table, name, value) => {
  const row = document.createElement('tr');
  table.appendChild(row);

  const nameElement = document.createElement('td');
  nameElement.textContent = name;
  row.appendChild(nameElement);

  const valueElement = document.createElement('td');
  valueElement.textContent = value;
  row.appendChild(valueElement);
}

const showRentals = (rentals) => {
  const rentalsRoot = document.getElementById('rentals');

  for (const rental of rentals.rentals) {
    // Article
    const article = document.createElement('article');

    // Header
    const header = document.createElement('header');
    article.appendChild(header);

    const h2 = document.createElement('h2');
    h2.textContent = rental.type;
    header.appendChild(h2);

    // Data
    const div = document.createElement('div');
    article.appendChild(div);

  // Image
    const picture = document.createElement('picture');
    div.appendChild(picture);

    const source400 = document.createElement("source");
    source400.srcset = `images/${rental.image}400.jpg`;
    source400.media = "(max-width: 400px)";
    picture.appendChild(source400);

    const source650 = document.createElement("source");
    source650.srcset = `images/${rental.image}650.jpg`;
    source650.media = "(max-width: 650px)";
    picture.appendChild(source650);

    const source930 = document.createElement("source");
    source930.srcset = `images/${rental.image}930.jpg`;
    source930.media = "(max-width: 930px)";
    picture.appendChild(source930);

    const img = document.createElement('img');
    img.src = `images/${rental.image}930.jpg`;
    img.alt = rental.type;
    picture.appendChild(img);

    // Description
    const description = document.createElement('p');
    description.textContent = rental.description;
    description.classList.add('rental-description');
    div.appendChild(description);

    // Table
    const table = document.createElement('table');
    table.classList.add('rentals');
    div.appendChild(table);

    addEntryToTable(document, table, 'Maximum People', rental.maxPersons);
    addEntryToTable(document, table, 'Half-day (reservation)', "$" + rental.reservationHalfDay);
    addEntryToTable(document, table, 'Half-day (walk-in)', "$" + rental.walkInHalfDay);
    addEntryToTable(document, table, 'Full-day (reservation)', "$" + rental.reservationFullDay);
    addEntryToTable(document, table, 'Full-day (walk-in)', "$" + rental.walkInFullDay);

    rentalsRoot.appendChild(article);
  };
};

const loadRentals = () => {
  fetch("data/rentals.json")
    .then(response => response.json())
    .then(rentals => {
      showRentals(rentals);
    });
};

loadRentals();