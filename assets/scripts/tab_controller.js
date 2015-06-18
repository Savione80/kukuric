// Generated by CoffeeScript 1.8.0
(function() {
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };

  window.TabController = (function() {
    function TabController(ref) {
      this.ref = ref;
      this.setContent = __bind(this.setContent, this);
      this.setActiveHeight = __bind(this.setActiveHeight, this);
      this.setHeight = __bind(this.setHeight, this);
      this.highlightLink = __bind(this.highlightLink, this);
      this.buttons = this.ref.find($("[data-tab]"));
      this.contents = this.ref.find($("[data-contenttab]"));
      this.container = this.ref.find('.shopContainer');
      this.buttons.click((function(_this) {
        return function(e) {
          var link;
          e.preventDefault();
          link = $(e.currentTarget);
          _this.highlightLink(link);
          _this.activeTab = link.attr('data-tab');
          _this.setHeight(link);
          return _this.setContent(link);
        };
      })(this));
      $(window).resize(this.setActiveHeight);
    }

    TabController.prototype.highlightLink = function(link) {
      var button, i, _i, _ref, _results;
      _results = [];
      for (i = _i = 0, _ref = this.buttons.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        button = $(this.buttons[i]);
        if (button.attr('data-tab') === link.attr('data-tab')) {
          _results.push(button.toggleClass('open'));
        } else {
          _results.push(button.removeClass('open'));
        }
      }
      return _results;
    };

    TabController.prototype.setHeight = function(link) {
      this.container.removeClass('close');
      this.container.addClass('open');
      return this.container.height($("[data-contenttab = '" + (link.attr('data-tab')) + "']").height());
    };

    TabController.prototype.setActiveHeight = function() {
      if (this.container.hasClass('open')) {
        return this.container.height($("[data-contenttab = '" + this.activeTab + "']").height());
      }
    };

    TabController.prototype.setContent = function(link) {
      var content, i, _i, _ref, _results;
      _results = [];
      for (i = _i = 0, _ref = this.contents.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        content = $(this.contents[i]);
        if (content.attr('data-contenttab') === link.attr('data-tab')) {
          if (link.hasClass('open')) {
            _results.push(content.addClass('fromTop'));
          } else {
            content.removeClass('fromTop');
            content.addClass('toTop');
            this.container.removeClass('open');
            this.container.addClass('close');
            this.container.height(0);
            _results.push(content.one("" + window.transEndEventName, (function(_this) {
              return function(e) {
                e.stopPropagation();
                return $(e.currentTarget).removeClass('toTop');
              };
            })(this)));
          }
        } else {
          if (content.hasClass('fromTop')) {
            content.removeClass('fromTop');
            content.addClass('toBottom');
            _results.push(content.one("" + window.transEndEventName, (function(_this) {
              return function(e) {
                e.stopPropagation();
                return $(e.currentTarget).removeClass('toBottom');
              };
            })(this)));
          } else {
            _results.push(void 0);
          }
        }
      }
      return _results;
    };

    return TabController;

  })();

}).call(this);