var element = document.querySelector('.current-year');
var currentDate = new Date();
element.textContent = currentDate.getFullYear();

var element = document.querySelector('.last-updated-time');
element.textContent = document.lastModified;