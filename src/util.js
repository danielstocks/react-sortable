function closest(elem, selector) {
  while (elem) {
    if (elem.matches(selector)) {
      return elem;
    } else {
      elem = elem.parentNode;
    }
  }
  return elem;
}
