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
