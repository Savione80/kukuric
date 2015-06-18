(function() {
  if (!window.console) {
    window.console = {
      log: (function(obj) {})
    };
  }

  $(function() {
    var getIOSVersion;
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
    return window.helpers = {
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
  });

}).call(this);

(function() {


}).call(this);
