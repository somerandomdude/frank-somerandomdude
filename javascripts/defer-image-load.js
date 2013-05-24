(function() {
  var image, images, loadDeferredImage, _i, _len;

  loadDeferredImage = function(element) {
    var s, src;

    src = element.getAttribute('data-defer-src');
    s = document.createAttribute('src');
    s.nodeValue = src;
    element.setAttributeNode(s);
  };

  images = document.querySelectorAll('img[data-defer-src]');

  for (_i = 0, _len = images.length; _i < _len; _i++) {
    image = images[_i];
    loadDeferredImage(image);
  }

}).call(this);
