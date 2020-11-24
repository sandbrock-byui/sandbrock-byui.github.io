const hamburgerButton = document.querySelector('.hamburgerButton');
const navigation = document.querySelector('.navigation');

hamburgerButton.addEventListener(
  'click',
  () => {
    navigation.classList.toggle('responsive')
  },
  false);

window.onresize =
  () => {
    if (window.innerWidth > 760)
      navigation.classList.remove('responsive');
  }