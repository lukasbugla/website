function debounce(func, wait, immediate) {
  var timeout;
  return function() {
    var context = this,
      args = arguments;
    var later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

setTimeout(() => document.querySelector('html').classList.add('visible'), 100);

window.addEventListener(
  'scroll',
  debounce(() => {
    var processEl = document.querySelector('#process');
    console.log(isElementInViewport(processEl));
    if (isElementInViewport(processEl)) {
      [0, 1, 2, 3].forEach(i =>
        setTimeout(
          () =>
            document
              .querySelector(`#ellipse${i}`)
              .setAttribute('stroke-dashoffset', 0),
          160 * i
        )
      );

      setTimeout(() => processEl.classList.add('visible'), 700);
    }
  }, 100)
);

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}
