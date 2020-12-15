const setLastModified = () => {
  var element = document.getElementById('last-modified');
  element.textContent = document.lastModified;
}

setLastModified();