unless window.console then window.console = {log: ((obj) ->)}

$ ->
	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame

	#############################
	# USER AGENT CHECK#
	#############################

	getIOSVersion = ->
		if /iP(hone|od|ad)/.test(navigator.platform)
			v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/)
			return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)]
		else
			return false


	# window.ie_version = getInternetExplorerVersion()
	window.has_ios = getIOSVersion()
	window.is_mobile = if navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) || navigator.userAgent.match(/iPad/i) || navigator.userAgent.match(/Android/i) then true else false
	window.is_iphone = if navigator.userAgent.match(/iPhone/i) || navigator.userAgent.match(/iPod/i) then true else false
	window.is_ipad = if navigator.userAgent.match(/iPad/i) then true else false

	if window.is_mobile then $('body').addClass('deviceMobile')
	window.breakpointer = {
		s: 290
		m: 650
		l: 959
	}

	# MODERNIZR TESTS
	# TRANSITIONEND
	window.transEndEventNames = {
		WebkitTransition: "webkitTransitionEnd" # Saf 6, Android Browser
		MozTransition: "transitionend" # only for FF < 15
		transition: "transitionend" # IE10, Opera, Chrome, FF 15+, Saf 7+
	}
	window.transEndEventName = window.transEndEventNames[Modernizr.prefixed("transition")]

	#DPI Modernizr.highres
	Modernizr.addTest "highres", ->
		dpr = window.devicePixelRatio or (window.screen.deviceXDPI / window.screen.logicalXDPI) or 1
		!!(dpr > 1)
	#TRANSFORM PREFIXED

	if typeof Modernizr.prefixed("transform") is 'string'
		window.prefixedTransform = Modernizr.prefixed("transform").replace(/([A-Z])/g, (str, m1) -> "-" + m1.toLowerCase()).replace /^ms-/, "-ms-"


	#############################
	#WINDOW HELPERS#
	#############################

	window.helpers =


		# createPlayerAPI : =>
		# 	tag = document.createElement 'script'
		# 	tag.src = "//www.youtube.com/iframe_api"
		# 	firstScriptTag = document.getElementsByTagName('script')[0]
		# 	firstScriptTag.parentNode.insertBefore tag, firstScriptTag
		# 	window.hasYT = true

		detectIE8 : =>
			ua = window.navigator.userAgent
			msie = ua.indexOf 'MSIE '
			IE_version = 0
			if msie > 0 then IE_version = parseInt(ua.substring(msie + 5, ua.indexOf('.', msie)), 10)
			if IE_version isnt 0 and IE_version < 9 then return true else return false

		detectIE : =>
			ua = window.navigator.userAgent
			msie = ua.indexOf 'MSIE '
			if msie > 0 then return true else return false


	# gallery = $ '.js-media-gallery'
	# if gallery.length is 1 then new Gallery gallery

	# videocover = $ '.js-video-cover'
	# if videocover.length is 1 then new VideoCover videocover




