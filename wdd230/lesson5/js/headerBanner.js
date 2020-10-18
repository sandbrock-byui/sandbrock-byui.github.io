const headerDate = new Date();
const headerDay = headerDate.getDay();

if (headerDay === 6) {
  let banner = document.querySelector('.header-banner');
  banner.classList.add('header-banner-enabled');
}