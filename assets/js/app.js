(function() {
  if (!window.console) {
    window.console = {
      log: (function(obj) {})
    };
  }

  $(function() {
    var fixedHeader, getIOSVersion, navigation;
    window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    getIOSVersion = function() {
      var v;
      if (/iP(hone|od|ad)/.test(navigator.platform)) {
        v = navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/);
        return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
      } else {
        return false;
      }
    };
    window.has_ios = getIOSVersion();
    window.is_mobile = navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Android/i) ? true : false;
    window.is_iphone = navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) ? true : false;
    window.is_ipad = navigator.userAgent.match(/iPad/i) ? true : false;
    if (window.is_mobile) {
      $('body').addClass('deviceMobile');
    }
    window.breakpointer = {
      s: 290,
      m: 650,
      l: 959
    };
    window.transEndEventNames = {
      WebkitTransition: "webkitTransitionEnd",
      MozTransition: "transitionend",
      transition: "transitionend"
    };
    window.transEndEventName = window.transEndEventNames[Modernizr.prefixed("transition")];
    Modernizr.addTest("highres", function() {
      var dpr;
      dpr = window.devicePixelRatio || (window.screen.deviceXDPI / window.screen.logicalXDPI) || 1;
      return !!(dpr > 1);
    });
    if (typeof Modernizr.prefixed("transform") === 'string') {
      window.prefixedTransform = Modernizr.prefixed("transform").replace(/([A-Z])/g, function(str, m1) {
        return "-" + m1.toLowerCase();
      }).replace(/^ms-/, "-ms-");
    }
    window.helpers = {
      detectIE8: (function(_this) {
        return function() {
          var IE_version, msie, ua;
          ua = window.navigator.userAgent;
          msie = ua.indexOf('MSIE ');
          IE_version = 0;
          if (msie > 0) {
            IE_version = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10);
          }
          if (IE_version !== 0 && IE_version < 9) {
            return true;
          } else {
            return false;
          }
        };
      })(this),
      detectIE: (function(_this) {
        return function() {
          var msie, ua;
          ua = window.navigator.userAgent;
          msie = ua.indexOf('MSIE ');
          if (msie > 0) {
            return true;
          } else {
            return false;
          }
        };
      })(this)
    };
    fixedHeader = $('.js-fixed-header');
    if (fixedHeader.length > 0) {
      new fixHeader(fixedHeader);
    }
    navigation = $('.js-navigation');
    if (navigation.length > 0) {
      return new showNavigation(navigation);
    }
  });

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.fixHeader = (function() {
    function fixHeader(ref) {
      this.ref = ref;
      this.onScroll = __bind(this.onScroll, this);
      this.window_ref = $(window);
      this.window_ref.on('scroll', this.onScroll);
      this.previousTop = 0;
      this.ref_h = this.ref.height();
    }

    fixHeader.prototype.onScroll = function() {
      this.currentTop = this.window_ref.scrollTop();
      if (this.currentTop < this.previousTop) {
        if (this.currentTop > 0 && this.ref.hasClass('is-fixed')) {
          this.ref.addClass('is-visible');
        } else {
          this.ref.removeClass('is-visible is-fixed');
        }
      } else {
        this.ref.removeClass('is-visible');
        if (this.currentTop > this.ref_h && !this.ref.hasClass('is-fixed')) {
          this.ref.addClass('is-fixed');
        }
      }
      this.previousTop = this.currentTop;
    };

    return fixHeader;

  })();

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.showNavigation = (function() {
    function showNavigation(ref) {
      this.ref = ref;
      this.showNavigation = __bind(this.showNavigation, this);
      this.window_ref = $(window);
      this.w_h = this.window_ref.height();
      this.body = $('body');
      this.btn = this.ref.find('.js-navigation-btn');
      this.navigationWrapper = this.ref.find('.js-navigation-navigationWrapper');
      this.btn.on('click', this.showNavigation);
      this.btn.on('click', this.toggleHamburger);
    }

    showNavigation.prototype.showNavigation = function() {
      if (this.btn.hasClass('is-clicked')) {
        this.btn.removeClass('is-clicked');
        this.ref.removeClass('open');
        return this.body.removeClass('disabled');
      } else {
        this.btn.addClass('is-clicked');
        this.ref.addClass('open');
        return this.body.addClass('disabled');
      }
    };

    return showNavigation;

  })();

}).call(this);
