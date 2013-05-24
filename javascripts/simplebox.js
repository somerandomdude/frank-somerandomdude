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
