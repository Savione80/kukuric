(function() {
  if (!window.console) {
    window.console = {
      log: (function(obj) {})
    };
  }

  $(function() {
    var gallery, getIOSVersion, videocover;
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
      createPlayerAPI: (function(_this) {
        return function() {
          var firstScriptTag, tag;
          tag = document.createElement('script');
          tag.src = "//www.youtube.com/iframe_api";
          firstScriptTag = document.getElementsByTagName('script')[0];
          firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
          return window.hasYT = true;
        };
      })(this),
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
    gallery = $('.js-media-gallery');
    if (gallery.length === 1) {
      new Gallery(gallery);
    }
    videocover = $('.js-video-cover');
    if (videocover.length === 1) {
      return new VideoCover(videocover);
    }
  });

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.Gallery = (function() {
    function Gallery(ref) {
      this.ref = ref;
      this.onSliderMoved = __bind(this.onSliderMoved, this);
      this.setNavigation = __bind(this.setNavigation, this);
      this.setCarousel = __bind(this.setCarousel, this);
      this.onPlayerStateChange = __bind(this.onPlayerStateChange, this);
      this.setButtons = __bind(this.setButtons, this);
      this.onPlayerReady = __bind(this.onPlayerReady, this);
      this.onYouTubeIframeAPIReady = __bind(this.onYouTubeIframeAPIReady, this);
      this.setVideo = __bind(this.setVideo, this);
      this.onResize = __bind(this.onResize, this);
      this.w = $(window);
      this.is_ie = window.helpers.detectIE();
      this.carousel = this.ref.find('.js-carousel');
      this.loop = true;
      this.items = this.carousel.find('> li');
      this.nav = this.ref.find('.js-nav');
      this.next = this.nav.find('.js-next');
      this.prev = this.nav.find('.js-prev');
      this.videoCont = $('.js-videoContainer');
      this.videoplayer = this.videoCont.find('.js-player');
      this.close = this.videoCont.find('.js-close');
      this.playerId = this.videoplayer.attr('id');
      this.current = 0;
      this.is_enabled = true;
      this.setCarousel();
      this.setNavigation();
      this.setVideo();
      this.w.resize(this.onResize);
      this.onResize();
    }

    Gallery.prototype.onResize = function() {
      var _itm;
      _itm = this.carousel.find("li:eq(0)");
      return _itm.css({
        left: "-" + (_itm.width()) + "px"
      });
    };

    Gallery.prototype.setVideo = function() {
      var i, item, _i, _ref, _results;
      _results = [];
      for (i = _i = 0, _ref = this.items.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        item = $(this.items[i]);
        if (item.attr('data-type') === 'video') {
          if (window.hasYT !== true) {
            window.helpers.createPlayerAPI();
            window.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady;
            _results.push(this.firstIdtoload = item.attr('data-videoid'));
          } else {
            _results.push(void 0);
          }
        } else {
          _results.push(void 0);
        }
      }
      return _results;
    };

    Gallery.prototype.onYouTubeIframeAPIReady = function() {
      this.player = new YT.Player(this.playerId, {
        height: '100%',
        width: '100%',
        videoId: '',
        playerVars: {
          'controls': 1,
          'showinfo': 0,
          'disablekb': 1,
          'wmode': 'transparent',
          'enablejsapi': 1,
          'origin': document.domain,
          'rel': 0
        },
        events: {
          'onReady': this.onPlayerReady,
          'onStateChange': this.onPlayerStateChange
        }
      });
      return this.setButtons();
    };

    Gallery.prototype.onPlayerReady = function(ev) {};

    Gallery.prototype.setButtons = function() {
      var i, item, play_btn, _i, _ref;
      for (i = _i = 0, _ref = this.items.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        item = $(this.items[i]);
        if (item.attr('data-type') === 'video') {
          play_btn = item.find('.js-video-play');
          play_btn.click((function(_this) {
            return function(e) {
              var videoId;
              e = $.event.fix(e);
              e.preventDefault();
              videoId = $(e.currentTarget).closest('.video').attr('data-videoid');
              _this.ref.addClass('video-show');
              if (!window.is_mobile) {
                return _this.player.loadVideoById(videoId);
              } else {
                return _this.player.cueVideoById(videoId);
              }
            };
          })(this));
        }
      }
      return this.close.click((function(_this) {
        return function(e) {
          e = $.event.fix(e);
          e.preventDefault();
          _this.player.pauseVideo();
          _this.ref.removeClass('video-show');
          return _this.player.seekTo(0);
        };
      })(this));
    };

    Gallery.prototype.onPlayerStateChange = function(state) {
      if (state.data === YT.PlayerState.ENDED) {
        return this.ref.removeClass('video-show');
      }
    };

    Gallery.prototype.setCarousel = function() {
      var first_item, i, item, last_item, _i, _ref;
      this.carousel.css({
        width: "" + (this.items.length * 100) + "%"
      });
      for (i = _i = 0, _ref = this.items.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        item = $(this.items[i]);
        item.css({
          width: "" + (100 / this.items.length) + "%"
        });
      }
      if (this.loop) {
        first_item = $(this.items[0]).clone();
        this.carousel.append(first_item);
        last_item = $(this.items[this.items.length - 1]).clone();
        this.carousel.prepend(last_item);
        return last_item.css({
          position: 'absolute',
          left: "-" + ($(this.items[this.items.length - 1]).width()) + "px"
        });
      }
    };

    Gallery.prototype.setNavigation = function() {
      this.next.click((function(_this) {
        return function(e) {
          e.preventDefault();
          if (_this.is_enabled) {
            return _this.moveSlider(1);
          }
        };
      })(this));
      this.prev.click((function(_this) {
        return function(e) {
          e.preventDefault();
          if (_this.is_enabled) {
            return _this.moveSlider(-1);
          }
        };
      })(this));
      return this.carousel.swipe({
        swipe: (function(_this) {
          return function(event, direction, distance, duration, fingerCount, fingerData) {
            switch (direction) {
              case 'left':
                return _this.next.click();
              case 'right':
                return _this.prev.click();
            }
          };
        })(this)
      });
    };

    Gallery.prototype.moveSlider = function(delta) {
      this.is_enabled = false;
      if (this.carousel.hasClass('notransition')) {
        this.carousel.removeClass('notransition');
      }
      this.current = this.current + delta;
      if (!this.is_ie) {
        this.carousel.css({
          left: "" + (-100 * this.current) + "%"
        });
        return this.carousel.one("" + window.transEndEventName, (function(_this) {
          return function(e) {
            e.stopPropagation();
            return _this.onSliderMoved();
          };
        })(this));
      } else {
        return this.carousel.animate({
          left: "" + (-100 * this.current) + "%",
          avoidTransforms: true
        }, {
          duration: 1500,
          complete: this.onSliderMoved
        });
      }
    };

    Gallery.prototype.onSliderMoved = function() {
      this.carousel.addClass('notransition');
      if (this.current === this.items.length) {
        this.current = 0;
        this.carousel.css({
          left: '0'
        });
      }
      if (this.current === -1) {
        this.current = this.items.length - 1;
        this.carousel.css({
          left: "" + (-100 * this.current) + "%"
        });
      }
      return this.is_enabled = true;
    };

    return Gallery;

  })();

}).call(this);

(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.VideoCover = (function() {
    function VideoCover(ref) {
      this.ref = ref;
      this.onPlayerStateChange = __bind(this.onPlayerStateChange, this);
      this.onPlayerReady = __bind(this.onPlayerReady, this);
      this.onYouTubeIframeAPIReady = __bind(this.onYouTubeIframeAPIReady, this);
      this.w = $(window);
      this.videoCont = this.ref.find('.js-videoContainer');
      this.videoplayer = this.videoCont.find('.js-player');
      this.close = this.videoCont.find('.js-close');
      this.playerId = this.videoplayer.attr('id');
      this.play_btn = this.ref.find('.js-video-play');
      this.videoId = this.ref.attr('data-videoid');
      this.close.click((function(_this) {
        return function(e) {
          e.preventDefault();
          _this.player.pauseVideo();
          _this.ref.removeClass('video-show');
          return _this.player.seekTo(0);
        };
      })(this));
      if (window.hasYT !== true) {
        window.helpers.createPlayerAPI();
        window.onYouTubeIframeAPIReady = this.onYouTubeIframeAPIReady;
      }
      this.play_btn.click((function(_this) {
        return function(e) {
          var videoId;
          e.preventDefault();
          videoId = $(e.currentTarget).closest('.video').attr('data-videoid');
          if (!window.is_mobile) {
            _this.player.playVideo();
          } else {
            _this.player.cueVideoById(_this.videoId);
          }
          return _this.ref.addClass('video-show');
        };
      })(this));
    }

    VideoCover.prototype.onYouTubeIframeAPIReady = function() {
      return this.player = new YT.Player(this.playerId, {
        height: '100%',
        width: '100%',
        videoId: this.videoId,
        playerVars: {
          controls: 1,
          rel: 0,
          showinfo: 0,
          cc_load_policy: 0,
          autoplay: 0,
          enablejsapi: 1
        },
        events: {
          'onReady': this.onPlayerReady,
          'onStateChange': this.onPlayerStateChange
        }
      });
    };

    VideoCover.prototype.onPlayerReady = function() {};

    VideoCover.prototype.onPlayerStateChange = function(state) {
      if (state.data === YT.PlayerState.ENDED) {
        return this.ref.removeClass('video-show');
      }
    };

    return VideoCover;

  })();

}).call(this);
