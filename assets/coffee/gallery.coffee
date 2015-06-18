# class window.Gallery

# 	constructor: (@ref) ->

# 		@w = $(window)
# 		@is_ie = window.helpers.detectIE()

# 		@carousel = @ref.find '.js-carousel'
# 		@loop = true
# 		@items = @carousel.find '> li'
# 		@nav = @ref.find '.js-nav'
# 		@next = @nav.find '.js-next'
# 		@prev = @nav.find '.js-prev'

# 		@videoCont = $ '.js-videoContainer'
# 		@videoplayer = @videoCont.find '.js-player'
# 		@close = @videoCont.find '.js-close'
# 		@playerId = @videoplayer.attr 'id'

# 		@current = 0
# 		@is_enabled = true

# 		@setCarousel()
# 		@setNavigation()
# 		@setVideo()



# 		@w.resize @onResize
# 		@onResize()


# 	onResize : =>
# 		_itm = @carousel.find("li:eq(0)")
# 		_itm.css {left : "-#{_itm.width()}px"}

# 	setVideo : =>
# 		for i in [0...@items.length]
# 			item = $ @items[i]
# 			if item.attr('data-type') is 'video'
# 				if window.hasYT isnt true
# 					window.helpers.createPlayerAPI()
# 					window.onYouTubeIframeAPIReady = @onYouTubeIframeAPIReady
# 					@firstIdtoload = item.attr('data-videoid')

# 	onYouTubeIframeAPIReady : =>
# 		@player = new YT.Player @playerId,
# 			height: '100%'
# 			width: '100%'
# 			videoId: ''
# 			playerVars:
# 				'controls': 1
# 				'showinfo': 0
# 				'disablekb': 1
# 				'wmode': 'transparent'
# 				'enablejsapi': 1
# 				'origin': document.domain
# 				'rel': 0
# 			events:
# 				'onReady': @onPlayerReady
# 				'onStateChange': @onPlayerStateChange

# 		@setButtons()

# 	onPlayerReady : (ev)=>


# 	setButtons : =>
# 		for i in [0...@items.length]
# 			item = $ @items[i]
# 			if item.attr('data-type') is 'video'
# 				play_btn = item.find '.js-video-play'

# 				play_btn.click (e)=>
# 					e = $.event.fix(e)
# 					e.preventDefault()
# 					videoId = $(e.currentTarget).closest('.video').attr('data-videoid')
# 					@ref.addClass 'video-show'
# 					if !window.is_mobile then @player.loadVideoById videoId else @player.cueVideoById videoId

# 		@close.click (e)=>
# 			e = $.event.fix(e)
# 			e.preventDefault()
# 			@player.pauseVideo()
# 			@ref.removeClass 'video-show'
# 			@player.seekTo(0)

# 	onPlayerStateChange : (state)=>
# 		if state.data is YT.PlayerState.ENDED then @ref.removeClass 'video-show'

# 	setCarousel: =>
# 		@carousel.css {width: "#{@items.length * 100}%"}
# 		for i in [0...@items.length]
# 			item = $ @items[i]
# 			item.css {width: "#{100 / @items.length}%"}

# 		if @loop
# 			first_item = $(@items[0]).clone()
# 			@carousel.append first_item
# 			last_item = $(@items[@items.length-1]).clone()
# 			@carousel.prepend last_item
# 			last_item.css
# 				position : 'absolute'
# 				left : "-#{$(@items[@items.length-1]).width()}px"

# 	setNavigation : =>
# 		@next.click (e)=>
# 			e.preventDefault()
# 			if @is_enabled then @moveSlider 1

# 		@prev.click (e)=>
# 			e.preventDefault()
# 			if @is_enabled then @moveSlider -1

# 		@carousel.swipe
# 			swipe:(event, direction, distance, duration, fingerCount, fingerData)=>
# 				switch direction
# 					when 'left' then @next.click()
# 					when 'right' then @prev.click()

# 	moveSlider: (delta) ->
# 		@is_enabled = false
# 		if @carousel.hasClass 'notransition' then @carousel.removeClass 'notransition'
# 		@current = @current + delta
# 		if !@is_ie
# 			@carousel.css left:"#{- 100 * @current}%"
# 			@carousel.one "#{window.transEndEventName}",(e) =>
# 				e.stopPropagation()
# 				@onSliderMoved()
# 		else
# 			@carousel.animate {left:"#{- 100 * @current}%", avoidTransforms:true}, {duration:1500,complete:@onSliderMoved}


# 	onSliderMoved: =>
# 		@carousel.addClass 'notransition'
# 		if @current is @items.length
# 			@current = 0
# 			@carousel.css left: '0'
# 		if @current is -1
# 			@current = @items.length-1
# 			@carousel.css left: "#{- 100 * @current}%"
# 		@is_enabled = true



