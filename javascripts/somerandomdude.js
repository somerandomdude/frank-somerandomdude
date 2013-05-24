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

/*global
*/


(function() {
  var FSS;

  FSS = (function() {
    var autoNext, createElement, isChild, mouseOutHandler, mouseOverHandler, navClickHandler;

    function FSS(el, o) {
      this.element = el;
      if (Object.prototype.toString.call(o) === '[object Object]') {
        this.options = o;
      } else {
        this.options = {};
      }
      this.init();
      this.gotoslide(0);
      if (this.autoplay) {
        this.play();
      }
    }

    FSS.prototype.pause = function() {
      clearTimeout(this.interval);
    };

    FSS.prototype.play = function() {
      clearTimeout(this.interval);
      this.interval = setTimeout(autoNext, this.duration, this);
    };

    FSS.prototype.next = function() {
      var index;

      index = this.currentIndex < this.slides.length - 1 ? this.currentIndex + 1 : 0;
      this.gotoslide(index);
    };

    FSS.prototype.gotoslide = function(index) {
      var a, m;

      if (this.currentIndex === index) {
        return;
      }
      a = this.element.parentNode.querySelector(".visible");
      if (a && a === this.slideA) {
        this.slideB.style.backgroundPosition = '0px ' + String(this.options.height * index * -1) + 'px';
        this.slideA.className = this.slideA.className.replace(new RegExp('(\\s|^)' + 'visible' + '(\\s|$)'), '');
        this.slideB.className += ' visible';
      } else {
        this.slideA.style.backgroundPosition = '0px ' + String(this.options.height * index * -1) + 'px';
        this.slideB.className = this.slideB.className.replace(new RegExp('(\\s|^)' + 'visible' + '(\\s|$)'), '');
        this.slideA.className += ' visible';
      }
      a = this.navigation.querySelector('.active');
      if (a) {
        a.removeAttribute('class');
      }
      a = document.createAttribute('class');
      a.nodeValue = 'active';
      this.navigation.childNodes.item(index).setAttributeNode(a);
      m = this.currentIndex === -1 ? 0 : this.currentIndex;
      this.slides[m].el.className = this.slides[m].el.className.replace(new RegExp('(\\s|^)' + 'active' + '(\\s|$)'), '');
      this.slides[index].el.className += ' active';
      this.currentIndex = index;
    };

    FSS.prototype.init = function() {
      var cap, context, i, l, n, slide, _i, _len, _ref;

      context = this;
      if (!this.options.width) {
        this.options.width = this.element.offsetWidth;
      }
      if (!this.options.height) {
        this.options.height = this.element.offsetHeight;
      }
      this.autoplay = true;
      this.duration = 5000;
      this.currentIndex = -1;
      if (!this.element.className.match(new RegExp('(\\s|^)' + 'fss' + '(\\s|$)'))) {
        this.element.className += ' ' + 'fss';
      }
      this.caption = this.element.querySelector('.captions');
      if (!this.caption) {
        return;
      }
      cap = this.caption.firstChild;
      n = 0;
      this.slides = [];
      while (cap) {
        if (cap && cap.nodeType !== 3) {
          this.slides.push({
            ndx: n++,
            el: cap
          });
        }
        cap = cap.nextSibling;
      }
      this.container = createElement('div', 'slide-container');
      this.slideA = createElement('div', 'slide-a visible');
      this.slideB = createElement('div', 'slide-b');
      this.element.insertBefore(this.container, this.caption);
      this.container.appendChild(this.slideA);
      this.container.appendChild(this.slideB);
      this.slideA.style.width = this.slideB.style.width = this.options.width + 'px';
      this.slideA.style.height = this.slideB.style.height = this.options.height + 'px';
      this.navigation = createElement('ul', 'fss-nav');
      _ref = this.slides;
      for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
        slide = _ref[i];
        l = createElement('li');
        l.appendChild(document.createTextNode(String(i + 1)));
        this.navigation.appendChild(l);
        l.onclick = navClickHandler(l, this);
      }
      this.container.appendChild(this.navigation);
      this.container.onmouseover = function(e) {
        return mouseOverHandler(e, context);
      };
      this.container.onmouseout = function(e) {
        return mouseOutHandler(e, context);
      };
    };

    createElement = function(tagName, className) {
      var attribute, element;

      element = document.createElement(tagName);
      if (!className) {
        return element;
      }
      attribute = document.createAttribute("class");
      attribute.nodeValue = className;
      element.setAttributeNode(attribute);
      return element;
    };

    isChild = function(child, parent) {
      if (child === parent) {
        return false;
      }
      while (child && child !== parent) {
        child = child.parentNode;
      }
      return child === parent;
    };

    autoNext = function(closure) {
      if (!closure) {
        return;
      }
      closure.next();
      closure.play();
    };

    navClickHandler = function(elem, closure) {
      return function() {
        var i;

        closure.pause();
        i = 0;
        while (closure.navigation.childNodes.item(i)) {
          if (closure.navigation.childNodes.item(i) === elem) {
            closure.gotoslide(i);
            return;
          }
          i++;
        }
      };
    };

    mouseOverHandler = function(e, closure) {
      if (!e) {
        return;
      }
      if (!isChild(e.target, closure.container)) {
        e.cancelBubble = true;
        e.stopPropagation();
        return false;
      }
      closure.pause();
      if (!closure.navigation.className.match(new RegExp('(\\s|^)' + 'active' + '(\\s|$)'))) {
        closure.navigation.className += ' active';
      }
    };

    mouseOutHandler = function(e, closure) {
      if (isChild(e.relatedTarget, closure.container)) {
        e.cancelBubble = true;
        e.stopPropagation();
        return false;
      }
      closure.play();
      if (closure.navigation.className.match(new RegExp('(\\s|^)' + 'active' + '(\\s|$)'))) {
        closure.navigation.className = closure.navigation.className.replace(new RegExp('(\\s|^)' + 'active' + '(\\s|$)'), '');
      }
    };

    return FSS;

  })();

}).call(this);

(function() {
  var FLB;

  FLB = (function() {
    var clickHandler, closeClickHandler, imageLoadHandler, sizeContainer;

    function FLB(el, o) {
      this.element = el;
      if (Object.prototype.toString.call(o) === '[object Object]') {
        this.options = o;
      } else {
        this.options = {};
      }
      this.options.resizeImage = false;
      this.init();
    }

    FLB.prototype.init = function() {
      var context;

      context = this;
      this.element.onclick = function(e) {
        return clickHandler(e, context);
      };
    };

    FLB.prototype.createOverlay = function(imageURL) {
      var context;

      context = this;
      this.overlay = document.createElement('div');
      this.overlay.setAttribute('id', 'flb-overlay');
      this.overlay.innerHTML = '<div id="flb-container"><a href="#" title="Close" class="closingElement">&nbsp;</a></div><div id="flb-content"><a id="flb-image" class="closingElement" href="#" title="Close"></a><a id="flb-close" class="closingElement" href="#" title="Close">&times;</a></div>';
      document.getElementsByTagName("body")[0].appendChild(this.overlay);
      this.container = document.getElementById('flb-content');
      this.container.onclick = this.overlay.onclick = function(e) {
        return closeClickHandler(e, context);
      };
      this.imgContainer = document.getElementById('flb-image');
      this.imgContainer.style.background = 'url(' + imageURL + ') no-repeat 50% 50%';
      this.image = new Image();
      this.image.onload = function(e) {
        return imageLoadHandler(e, context);
      };
      this.image.src = imageURL;
    };

    imageLoadHandler = function(e, closure) {
      var delay, imgHeight, imgWidth, resizeHeight;

      if (!closure.options.resizeImage) {
        imgHeight = closure.image.height;
        imgWidth = closure.image.width;
      } else {
        resizeHeight = document.documentElement.clientHeight - 40;
        if (closure.image.height < resizeHeight) {
          imgHeight = closure.image.height;
          imgWidth = closure.image.width;
        } else {
          imgHeight = resizeHeight;
          imgWidth = Math.round(resizeHeight * closure.image.width / closure.image.height);
          closure.image.height = imgHeight;
          closure.image.width = imgWidth;
        }
      }
      delay = function() {
        return sizeContainer(closure.container, imgWidth, imgHeight);
      };
      setTimeout(delay, 600);
    };

    sizeContainer = function(container, width, height) {
      container.style.width = width + 'px';
      container.style.height = height + 'px';
      container.style.margin = '-' + ((height + 28) / 2) + 'px 0 0 -' + (width / 2) + 'px';
      container.setAttribute('class', 'active');
    };

    clickHandler = function(e, closure) {
      closure.createOverlay(e.currentTarget.getAttribute('href'));
      e.cancelBubble = true;
      e.stopPropagation();
      return false;
    };

    closeClickHandler = function(e, closure) {
      closure.container.setAttribute('class', '');
      document.getElementsByTagName("body")[0].removeChild(closure.overlay);
    };

    return FLB;

  })();

}).call(this);

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

/*global FSS:true, FLB:true
*/


(function() {
  window.onload = function() {
    var flb, fss, lightbox, lightboxes, navClickHandler, navItem, navItems, postTweet, slideshow, slideshows, _i, _j, _k, _len, _len1, _len2;

    if (!document.querySelector) {
      return;
    }
    slideshows = document.querySelectorAll('#hero_slideshow .slideshow');
    if (slideshows.length) {
      for (_i = 0, _len = slideshows.length; _i < _len; _i++) {
        slideshow = slideshows[_i];
        fss = new FSS(slideshow, {
          width: 725,
          height: 210
        });
      }
    }
    lightboxes = document.querySelectorAll('a[rel=simplebox]');
    if (lightboxes.length) {
      for (_j = 0, _len1 = lightboxes.length; _j < _len1; _j++) {
        lightbox = lightboxes[_j];
        flb = new FLB(lightbox, {});
      }
    }
    navClickHandler = function(elem, navItems) {
      return function() {
        var a, item, projectItem, projectItems, _k, _l, _len2, _len3;

        a = elem.getAttribute('rel');
        for (_k = 0, _len2 = navItems.length; _k < _len2; _k++) {
          item = navItems[_k];
          if (item.className.match(new RegExp('(\\s|^)' + 'active' + '(\\s|$)'))) {
            item.className = item.className.replace(new RegExp('(\\s|^)' + 'active' + '(\\s|$)'), '');
          }
        }
        projectItems = document.querySelectorAll('#projects_list li');
        for (_l = 0, _len3 = projectItems.length; _l < _len3; _l++) {
          projectItem = projectItems[_l];
          if (projectItem.className.match(new RegExp('(\\s|^)' + 'deselected' + '(\\s|$)'))) {
            projectItem.className = projectItem.className.replace(new RegExp('(\\s|^)' + 'deselected' + '(\\s|$)'), '');
          }
          if (a !== 'all' && !projectItem.className.match(new RegExp('(\\s|^)' + a + '(\\s|$)'))) {
            if (!projectItem.className.match(new RegExp('(\\s|^)' + 'deselected' + '(\\s|$)'))) {
              projectItem.className += ' ' + 'deselected';
            }
          }
        }
        elem.className = ' ' + 'active';
      };
    };
    if (document.querySelector('#p72')) {
      navItems = document.querySelectorAll('#projects-nav dd');
      for (_k = 0, _len2 = navItems.length; _k < _len2; _k++) {
        navItem = navItems[_k];
        navItem.onclick = navClickHandler(navItem, navItems);
      }
    }
    postTweet = document.querySelector('#post-tweet');
    if (postTweet) {
      return postTweet.onclick = function() {
        var centerLeft, centerTop;

        centerLeft = window.screen.width / 2 - 550 / 2;
        centerTop = window.screen.height / 2 - 470 / 2;
        window.open(this.href, this.getAttribute("target"), 'width=550, height=470, location=0, left=' + centerLeft + ', top=' + centerTop);
        return false;
      };
    }
  };

}).call(this);
