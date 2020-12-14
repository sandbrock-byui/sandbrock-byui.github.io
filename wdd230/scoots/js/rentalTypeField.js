const addRentalType = (document, selectElement, typeName) => {
  const option = document.createElement('option');
  option.textContent = typeName;
  selectElement.appendChild(option);
}

const loadRentalTypes = () => {
  fetch('data/rentals.json')
    .then(response => response.json())
    .then(rentals => {
      const selectElement = document.getElementById('rental-type');
      for (const rental of rentals.rentals) {
        addRentalType(document, selectElement, rental.type);
      };
    });
};

loadRentalTypes();