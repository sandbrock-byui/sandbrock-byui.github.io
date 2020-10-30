
const lazyLoadImage = (image) => {
  image.src = image.getAttribute('data-src');
  image.classList.add('lazyloaded');
}

const imageObserverOptions = {};
const imageObserver = new IntersectionObserver(
  (entries, imageObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      lazyLoadImage(entry.target);
      imageObserver.unobserve(entry.target);
    });
  },
  imageObserverOptions
);

const images = document.querySelectorAll("img[data-src]");
images.forEach(image => {
  imageObserver.observe(image);
});