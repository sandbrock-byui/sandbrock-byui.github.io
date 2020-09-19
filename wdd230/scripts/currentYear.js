let element = document.querySelector('.current-year');
let currentDate = new Date();
element.textContent = currentDate.getFullYear();