class window.showNavigation

	constructor: (@ref) ->

		@window_ref = $ window
		@w_h = @window_ref.height()
		@body = $ 'body'
		@btn = @ref.find '.js-navigation-btn'
		@navigationWrapper = @ref.find '.js-navigation-navigationWrapper'
		@btn.on 'click', @showNavigation
		@btn.on 'click', @toggleHamburger


	showNavigation : =>
		if @btn.hasClass('is-clicked')
			@btn.removeClass 'is-clicked'
			@ref.removeClass 'open'
			@body.removeClass 'disabled'
		else
			@btn.addClass 'is-clicked'
			@ref.addClass 'open'
			@body.addClass 'disabled'



