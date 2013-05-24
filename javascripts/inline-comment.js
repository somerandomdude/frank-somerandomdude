(function() {
  var appendParagraph, paragraph, paragraphs, _i, _len;

  console.log('go');

  appendParagraph = function(element) {
    var c, s;

    s = document.createElement('span');
    c = document.createAttribute('class');
    c.nodeValue = 'comment-marker';
    s.setAttributeNode(c);
    element.appendChild(s);
  };

  paragraphs = document.querySelectorAll('.post p[name]');

  for (_i = 0, _len = paragraphs.length; _i < _len; _i++) {
    paragraph = paragraphs[_i];
    appendParagraph(paragraph);
  }

}).call(this);
