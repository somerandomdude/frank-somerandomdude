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
