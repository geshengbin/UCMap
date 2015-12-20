!function(n){function e(t){if(a[t])return a[t].exports;var o=a[t]={exports:{},id:t,loaded:!1};return n[t].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var a={};return e.m=n,e.c=a,e.p="",e(0)}([function(module,exports,__webpack_require__){eval("var navOpen = false;\n\n// scrollfade\n$(document).on('complete',function(){\n\n	var $el = $('.hero-platform .container');\n	var $nav = $('.navbar');\n\n	if($el.length < 1)\n		return;\n\n	$(document).on('navopen',function(){\n		if($(window).width() >= 1200){\n			$el.css({'position':'absolute','top': window.scrollY });\n		}\n	});\n\n	$(document).on('navclosed',function(){\n		$el.removeAttr('style');\n	});\n\n	// $('body').prepend($el);\n\n	// var latestKnownScrollY = 0,\n	// 	ticking = false;\n\n	// function onScroll() {\n	// 	latestKnownScrollY = window.scrollY;\n	// 	requestTick();\n	// }\n\n	// function requestTick() {\n	// 	if(!ticking) {\n	// 		requestAnimationFrame(update);\n	// 	}\n	// 	ticking = true;\n	// }\n\n	// function update() {\n	// 	ticking = false;\n	// 	var currentScrollY = latestKnownScrollY;\n	// 	$el.css({'transform': 'translate3d(0,' + currentScrollY + 'px,0)'});\n	// }\n\n	// $(window).on('mousewheel',function(){});\n\n	// $(window).on('scroll',function(){\n\n	// 	onScroll();\n\n	// });\n	\n	\n});\n\n// Wisdom engine loop\n$(document).on('complete',function(){\n\n	$el = $('.wisdom-engine');\n\n	if(!$el.length > 0)\n		return\n\n	var $loop = $el.find('.loopback');\n	var $itemTop = $el.find('.item:nth-child(2)');\n	var $itemBottom = $el.find('.item.recursive');\n\n	var calc = function(){\n		return $itemBottom.position().top - $itemTop.position().top;\n	};\n\n	var loopHeight = function(){\n		$loop.css({'height':calc(),'top':$itemTop.position().top})\n	};\n\n	$(window).on('resize',function(){\n		calc();\n		loopHeight();\n	});\n\n	loopHeight();\n});\n\n\n// Old main.js\n(function () {\n	'use strict';\n	Modernizr.addTest('iphone', function () {\n		return !!navigator.userAgent.match(/iPhone/i);\n	});\n\n	Modernizr.addTest('androidlte42', function () { \n		// old android cannot handle multiple css transitions. UA detection (sorry)\n		var ua = ua || navigator.userAgent, \n		match = ua.match(/Android\\s([0-9\\.]*)/);\n		if ( match ) {\n			return	( parseFloat( match[1] ) < 4.3 );\n		}\n\n		else {\n			return false;\n		}\n\n	});\n\n	function debounce(func, wait, immediate) {\n	// utility to trigger events after set time (used on scroll principally)\n			var timeout;\n			return function() {\n				var context = this, args = arguments;\n				clearTimeout(timeout);\n				timeout = setTimeout(function() {\n					timeout = null;\n					if (!immediate) {\n						func.apply(context, args);\n					}\n				}, wait);\n				if (immediate && !timeout) {\n					func.apply(context, args);\n				}\n			};\n	}\n\n	// http://www.html5rocks.com/en/tutorials/pagevisibility/intro/\n\n	function getHiddenProp(){\n		var prefixes = ['webkit','moz','ms','o'];\n		\n		// if 'hidden' is natively supported just return it\n		if ('hidden' in document ) {\n			return 'hidden';\n		}\n		\n		// otherwise loop over all the known prefixes until we find one\n		for (var i = 0; i < prefixes.length; i++){\n			if ((prefixes[i] + 'Hidden') in document) {\n				return prefixes[i] + 'Hidden';\n			}\n		}\n\n		// otherwise it's not supported\n		return null;\n	}\n\n	function isHidden() {\n		var prop = getHiddenProp();\n		if (!prop) {\n			return false;\n		}\n		\n		return document[prop];\n	}\n	// used in tabState()\n\n// document ready \n $(function() {\n	var pageLoaded = false,\n	canTransition = Modernizr.csstransitions,\n	canAnimate = Modernizr.cssanimations,\n	canHistory = Modernizr.history,\n	canVideo = Modernizr.video,\n	beginHistory = false,\n	heroClasses,\n	$window = $(window),\n	loadTimer = null,\n	// ueno: new\n	prevScroll = 0,\n	$document = $(document),\n	// ueno: end new\n	$html = $('html'),\n	$body = $('body'),\n	$wrap = $('#wrap'),\n	// ueno: new \n	$navbar = $('.navbar-global'),\n	$container = $('.wrap-inner'),\n	$hero = $('.hero.is-fixed'),\n	$loadingScreen = $('.loading-screen'),\n	$loadingSprite = $('.loading-sprite'),\n	loadingSpriteHtml = $loadingScreen.html();\n	// conditional html for Modernizr.no-cssanimations ? \n	\n	var menuIsOpen = function() {\n		var mo = $body.hasClass('open');\n		return mo;\n	};\n	\n	var getVideoRendered = function() {\n		var vr = $('.video-pane').find('video').length;\n		return vr;\n	};\n\n	var openNav = function() {\n		$body.addClass('open');\n		navOpen = true;\n		$(document).trigger('navopen');\n	};\n	\n	var closeNav = function() {\n		$body.removeClass('open');\n		navOpen = false;\n		$(document).trigger('navclose');\n	};\n\n	$('.wrap-group').on('transitionend webkitTransitionEnd',function(){\n		if(navOpen === false){\n			$(document).trigger('navclosed');\n		}\n	});\n	\n	var closeModal = function () {\n		// now only used for modal-carousel\n		// ie doesnt like the scrolltop stuff\n		var $thisModal = $body.find('.modal.in');\n		$thisModal.modal('hide');\n		// $html.removeClass('modal-open');\n		\n	};\n\n	var closeModalCarousel = function () {\n		var $thisModal = $('.modal-carousel.open');\n		$thisModal.removeClass('open').attr(\"aria-hidden\", true);\n	};\n\n \n	var levelHandler = function()  {\n		// do this for levels - might need to add a class to nav when it is over a dark (gradient) level?\n		if ( canAnimate || canTransition ) {\n			var $animParent = $wrap.find('.anim-parent');\n		\n		// need to detect hero offset as posiiton fixed keeps hero in viewport\n		// $animParent.filter(':not(:in-viewport)').removeClass('active-state');\n			$animParent.filter(':not(:in-viewport)').removeClass('active-state');\n			$animParent.filter(':in-viewport').addClass('active-state');\n		}\n	};\n\n	// ueno: new\n	// show nav on upscroll\n	var toggleNav = function() {\n		var navPadding = parseInt( $navbar.css('padding-top') ),\n		navHeight = $navbar.outerHeight(true),\n		navOffset = navHeight-navPadding,\n		st = $window.scrollTop(),\n		windowHeight = $window.height(),\n		documentHeight = $document.height();\n\n\n			// is (nearish) bottom of page so show nav \n\n		// scroll position is greater than the nav offset, so set fixed nav\n		if ( st > navOffset ) {\n\n			if ( st + windowHeight >= documentHeight -200 ) {\n\n				$navbar.addClass('is-scrolling navbar-active').removeClass('navbar-inactive');\n\n			}\n\n			else {\n\n				if ( ! $navbar.hasClass('is-scrolling') )  {\n					$navbar.addClass('is-scrolling no-transition');\n\n					setTimeout( function() {\n						$navbar.removeClass('no-transition');\n					},10);\n				}\n				// $navbar.addClass('is-scrolling');\n\n				// $navbar.css('background' , 'red');\n				\n				\n				// downward scroll, hide nav \n\n				if ( st > prevScroll ) {\n					$navbar.removeClass('navbar-active').addClass('navbar-inactive');\n						\n				}\n\n				// is scroll up\n				else {\n					\n					$navbar.addClass('navbar-active').removeClass('navbar-inactive');\n				\n				}\n				prevScroll = st;\n			}\n\n			// navbar still partially visible\n		}\n\n		else {\n			$navbar.removeClass('navbar-active').removeClass('is-scrolling');\n		}\n	}\n\n	// ueno: ends new\n	\n	$window.on('scroll', function(){\n		toggleNav();\n	});\n	\n	var scrollCheck = debounce(function() {\n		levelHandler();\n\n		// ueno: new\n		// toggleNav();\n		// easeInHero();\n	}, 50);\n	\n	var drawGraph = function() {\n		// todo: set this variable OUTSIDE function?\n		var $chartContainer = $wrap.find('.chart-container');\n		\n		if ( $chartContainer.length ) {\n		// look at this - animation only triggers SOMETIMES in iOS\n			$chartContainer.each(function() {\n			\n				var $chart = $(this),\n				barIteration = 0,\n				sizeOfBar = $chart.data('barsize') || [73,91,82,96],\n				count;\n				$chart.empty();\n				\n				if ( $chart.hasClass('cols-50') ) {\n					count = 50;\n				}\n				\n				else {\n					count = 60;\n				}\n\n				for (var i=0; i< count ; i++) {\n					if ( ! sizeOfBar[barIteration] ) {\n						barIteration = 0;\n					}\n					\n					$chart.append( '<span class=bar-outer><i style=\"height:' + sizeOfBar[barIteration] +'%\" class=\"bar auto-anim\"></i></span>' );\n					\n					barIteration ++;\n				}\n			\n			});\n		\n		}\n	}; \n\n	var tabState = function( animatedEle ) {\n		var visProp = getHiddenProp();\n		\n		if ( visProp ) {\n		var evtname = visProp.replace(/[H|h]idden/,'') + 'visibilitychange';\n		document.addEventListener(evtname, visChange);\n		}\n		else {\n		  // borked, do something?\n		}\n\n		function visChange() {\n		\n			var animatedEle = $body.find('.auto-anim');\n			if ( animatedEle.length ) {\n				if ( isHidden() ) {\n					$body.addClass('anim-paused');\n				}\n				else {\n					$body.removeClass('anim-paused');\n				}\n			}\n		}\n	};\n	\n	// renders video post-load into video-pane\n	var renderVideo = function () {\n		\n		if ( ! getVideoRendered() && canVideo ) {\n			\n			$('.video-pane').each(function() {\n				var $this = $(this),\n				v = document.createElement('video'),\n				videoID = $this.attr('id'),\n				videoSrc = $this.data('video-src'),\n				videoPath = \"/video/\",\n				source = document.createElement('source'),\n				preloadAttr = document.createAttribute('preload');\n				preloadAttr.value=\"none\";\n				\n				v.setAttributeNode(preloadAttr);\n				v.id = videoID + '-tape';\n				\n				if ( Modernizr.video.webm ) {\n					source.type = \"video/webm\";\n					source.src =  videoPath + videoSrc + '.webm';\n				}\n				\n				else {\n					source.type = \"video/mp4\";\n					source.src = videoPath + videoSrc + '.mp4';\n				}\n				\n				v.appendChild( source );\n				$this.append(v).append('<a href=\"#' + videoID + '-tape\"><i class=\"icon icon-modal-close icon-white\"></i></a>');\n				$this.wrapInner('<div class=video-player></div>');\n			});\n		}\n	};\n\n	var clearVideo = function( ele ) {\n	// ele should be a jq object\n		var\n		$videoplayer = ele.closest('.video-pane'),		\n		videoEle = ele.get(0);\n		$videoplayer.removeClass('playing').removeClass('active');\n		\n		if ( ! videoEle.paused || ! videoEle.ended ) {\n			videoEle.pause();\n		}\n		$body.removeClass('modal-open');\n\n		setTimeout(function() { \n			if ( videoEle.readyState !== 0 ) {\n					videoEle.currentTime = 0;\n			}\n		}, 500);\n		/* var $videoEle = ele.parent().find('video'),\n		videoEle = $videoEle.get(0),\n		$videoPane = ele.parent();\n		// one $ for jq, one for standard js\n		$videoPane.addClass('trans-out');\n		$videoEle.removeClass('playing');\n		videoEle.pause();\n		videoEle.currentTime = 0;\n		$html.removeClass('modal-open');\n\n		setTimeout(function() { \n			$videoPane.removeClass('active trans-out');\n		}, 500); */\n\n	};\n\n	// modal video stuff - TIDY pls\n	var playVideo = function ( videoID ) {\n	\n		if ( canVideo ) {\n			var $videoWrapper = $('#' + videoID ),\n			videotape = document.getElementById( videoID + '-tape' );\n			$body.addClass('modal-open');\n			\n			// $videoWrapper.addClass('active').append(loadingSpriteHtml);\n			$videoWrapper.addClass('active');\n			// needs loading icon on black? \n			videotape.load();\n			\n			// autotrigger play hack iOS (ipad)\n			videotape.play();\n			videotape.pause();\n			\n			\n			setTimeout(function() {\n				// needs to be a live query (i.e. not $loadingSprite i think)\n				// $videoWrapper.find('.loading-sprite').remove();\n				if ( videotape.classList ) {\n					videotape.classList.add('playing');\n				}\n				else {\n					videotape.className += ' playing';\n				}\n				videotape.play();\n				// videotape.currentTime = 110;\n				\n				\n				videotape.addEventListener('webkitendfullscreen', function() {\n					clearVideo( $(this) );\n				}, false);\n					\n				videotape.addEventListener('ended', function() {\n					clearVideo( $(this) );\n					}, false);\n				\n			},800);	\n			\n		}\n	};\n	\n	var togglePlayPause = function( trigger ) {\n		var videoEle = trigger.get(0);\n		// If the mediaPlayer is currently paused or has ended\n		if (videoEle.paused || videoEle.ended ) {\n			videoEle.play();\n			\n		}\n		// Otherwise it must currently be playing?\n		else {\n			videoEle.pause();\n		}\n	};\n	\n	// loads carousel based on target content. v custom, may need tidying\n	// TARGET: the modal, TARGET CONTENT: the html to be used in the modal, SLIDE INDEX: number of slide to go to on launch\n	var launchCarousel = function( target, content, slideIndex ) {\n		var\n		$target = $(target),\n		$content = $(content),\n		carouselHtml = $content.html(),\n		controls = 	'<a class=\"left carousel-control hidden-xs\" href=\"#modal-carousel\" role=\"button\" data-slide=\"prev\"><i class=\"icon carousel-arrow arrow-left\"></i></a><a class=\"right carousel-control hidden-xs\" href=\"#modal-carousel\" role=\"button\" data-slide=\"next\"><i class=\"icon carousel-arrow arrow-right\"></i></a>';\n		$target.html(carouselHtml + controls);\n\n		if ( menuIsOpen() ) {\n			closeNav();\n		}\n\n		else {\n\n			$content.hide();\n			$target.carousel(slideIndex).addClass('open');\n\n		}\n		\n	};\n	\n	\n	// end of load - called below\n	var completeLoading = function () {\n		$body.addClass('loaded'); \n		if ( !window.location.hash ) {\n			$(window).scrollTop(0); \n		}\n		$loadingScreen.empty();\n	};\n	\n	// init pliugins and anything that needs sorting on load\n	var updatePage = function() {\n		pageLoaded = false;\n		\n		if ( loadTimer ) {\n				clearTimeout( loadTimer ); \n				loadTimer = null;\n			}\n		loadTimer = setTimeout( function() { \n				//check status after 4 secs?\n				if ( !pageLoaded ) {\n					completeLoading();\n					pageLoaded = true;\n				}\n			}, 4000);\n		\n		drawGraph();\n		renderVideo();\n\n		$(document).trigger('complete');\n\n		$body.waitForImages( function() {\n		\n			// also below could make more sense?\n			if ( !pageLoaded ) {\n					clearTimeout( loadTimer );\n					setTimeout(function(){ completeLoading(); }, 1000);\n					pageLoaded = true;\n			}\n		});\n			\n		\n		\n		\n		// plugin init stuff...\n		// floatlabel.js\n		$('.floatlabel-parent').floatlabel({slideInput: false});\n		\n		// jquery.validate\n		$('.modal-form').validate({\n			messages: {\n				Field11: {\n						email: \"not a valid email\"\n					}\n				},\n			invalidHandler: function() {\n			\n			},\n			submitHandler: function( form ) {\n				var url = $(form).attr( 'action' ),\n				posting = $.post( url, $(form).serialize() );\n				// we dont get a response, so just always do this\n				posting.always(function() {\n					$(form).closest('.form-parent').addClass('success');\n					// settimeout and modal.close()\n				});		   \n			}\n		});\n		\n		// http://api.jquerymobile.com/swipe/\n		$('.carousel').on('swiperight', function() {\n			$(this).carousel('prev');\n		}).on('swipeleft', function() {\n			$(this).carousel('next');\n		});\n\n	};\n	// end update page\n\n	// runs post-ajax to set up page classes, titles etc\n	var buildPage = function ( data ) {\n			var\n			metaTitle = $( data ).filter('title').text(),\n			htmlContent = $( data ).find( \".wrap-inner > div\" ),\n			hero = $( data ).filter( '.nav-extended + .hero' ),\n			heroHtml = hero.html() || false,\n			heroBg = hero.attr('style') || false,\n			theme = $( data ).filter('#wrap').data('theme') || false,\n			themeClasses = [\"navbar-trans\", \"navbar-lite\", \"standard-content\"];\n			$container.html( htmlContent );\n			\n			if ( heroBg ) {\n				$('.hero:nth(0)').attr('style', heroBg);\n			}\n			else {\n				$('.hero').removeAttr('style');\n			}\n			// if ajax data has a hero, append stuff / modify classes accordingly\n			if ( heroHtml ) {\n				heroClasses = hero.attr( 'class' );\n				$('.hero:nth(0)').attr( {\"class\": heroClasses } ).html( heroHtml );\n			}\n			else {\n				$('.hero:nth(0)').empty().attr({\"class\": \"hero placeholder\"});\n			}\n\n\n			// todo: - could be miles better!\n			$body.removeClass( themeClasses.join(' ') );\n			if ( theme ) {\n				$body.addClass(theme);\n			}\n			document.title = metaTitle || \"Protectwise\";\n		};\n		// end build page\n	\n	// performs an ajax load on browsers that can handle history.  \n	var preload = function ( url ) {\n		if ( canTransition ) {\n			closeNav();\n			$body.removeClass('modal-open').removeClass('loaded');\n			if ( $loadingScreen.find($loadingSprite).length === 0 ) {\n				$loadingScreen.append(loadingSpriteHtml);\n			}\n			\n			\n			// $wrap.addClass('anim-paused');\n			// $extendedNav.hide();\n			\n			// check wrap-inners transition state before loading in content\n			\n			// $loadingScreen.on('transitionend.od48 webkitTransitionEnd.od48', function(e) {\n			// $loadingScreen.off('transitionend.od48 webkitTransitionEnd.od48');\n			// $(window).scrollTop(0); \n				$.ajax( {\n					url: url,\n					type: \"GET\",\n					cache: false,\n					timeout: 2000,\n					success: function( data, status ) {\n						// build page\n						buildPage( data );\n						// update page - function to run as \"onload\"\n						updatePage();\n						// analytics\n						if ( typeof ga !== 'undefined' ) {\n							ga('send', 'pageview', url);\n						}					\n					},\n					error: function ( data, status, err ) {\n\n						if ( status === \"timeout\" ) {\n							\n							window.location.href = url;\n							// natural load as get request took too long\n						}\n\n						else {\n							window.location.href = \"/404.html\";\n						}\n						\n					}\n				\n				});\n							\n			// });\n		\n		}\n		\n		else {\n			window.location = url;\n		}\n	\n	};\n	// end page setup stuff\n	\n	// ANCHOR CLICK EVENTS - triggering functions as \"live\"\n	$body.on('click', '> div a, >nav a', function ( e ) {\n			var $btn = $(this),\n			anchor = $btn.attr( 'href' );\n			// if browser has history API, run preload ( fetch via ajax ) ( else default action )\n			if ( canHistory ) {\n			\n				if ( $btn.hasClass( 'page-load' ) ) {\n					$(window).scrollTop(0);\n					preload( anchor );\n					// checks if we can run preload (defaults to false)\n					if ( ! beginHistory ) {\n						beginHistory = true;\n					}\n					history.pushState(null, null, anchor);\n					e.preventDefault();\n				}\n				\n			}\n			\n			// load modal carousel ( mabe needs mq check?\n			if ( $btn.hasClass('launch-carousel') ) {\n				var \n				target = $btn.data('target'),\n				targetContent = $btn.data('content'),\n				slideIndex = $btn.data('slide-to');\n				\n				launchCarousel(target, targetContent, slideIndex);\n				e.preventDefault();\n					\n			}\n			\n			// open / close side nav\n			else if ( $btn.hasClass('toggle-menu') ) {\n				\n				if ( menuIsOpen() ) {\n					closeNav();\n				}\n		\n				else {\n					openNav();\n				}\n				e.preventDefault();\n			}\n			\n			// launch video player\n			else if ( $btn.hasClass('play-video') ) {\n				var	$t = $(this),\n				videoID = $t.data('video-id');\n					// launch a video modal if >767\n				playVideo ( videoID );\n				e.preventDefault();	\n			}\n			// show more content (hidden below)\n			else if ( $btn.hasClass('show-more') ) {\n				var $t = $(this),\n				$parent = $t.parent(),\n				$target = $parent.next('.show-more-content');\n				if ( $target.length ) {\n					$target.addClass('active');\n					$t.hide();\n				}\n\n				e.preventDefault();\n			}\n			\n		});\n		\n	// close video\n	$body.on('click', '.video-pane .icon-modal-close', function(e) {\n		var target = $(this).parent().attr('href');\n		clearVideo( $(target) );\n		e.preventDefault();\n		\n	}).on('click', '.wrap-group', function ( e ) {\n		if ( ! $( e.target ).is('a') && menuIsOpen() ) {\n			closeNav();\n		}\n	});\n	\n	// pause play video on click\n	$body.on('click', '.active video', function(e) {\n		togglePlayPause( $(this) );\n	});\n	\n	// close nav swipe right - might need to look at this for other swipes?\n	// not sure about this - revisit\n	/* $('.nav-extended').nextAll().on('swiperight', function( e ) {\n		\n		if ( menuIsOpen() ) {\n			closeNav();\n		}\n	}); */\n	\n	// modal carousel only at the moment i think\n	$('.modal-carousel, .overlay').on('click', function ( e ) {\n		var target = $( e.target );\n		// console.log(target[0]);\n		if ( target.is('.container') || target.is('.overlay') || target.is('.gallery-detail') ) {\n			closeModalCarousel();\n		}\n	});\n	\n	// window events\n		\n	$(window).on('popstate', function(e) {\n		// check if history has run\n		if ( beginHistory ) {\n			preload( location.pathname );\n		}\n		else {\n			// need to set a variable somehow that detects if the previous / next page was ajax or not. tricky!\n		}\n	});\n	\n	// jquery validation plugin\n	$.extend(jQuery.validator.messages, {	\n		required: \"This is a required field\"\n	});\n	\n\n	updatePage();\n	$window.on('DOMContentLoaded load', tabState() );\n	$window.on('resize scroll',  scrollCheck );\n	\n	// bootstrap modal hack - click detection to see if click is within modal or not \n	// this css: http://jsfiddle.net/sRmLV/22/\n	$('.modal-valign-helper').on('click', function(e) {\n		var target = $( e.target );\n		if ( target.is('.modal-dialog') ) {\n				$('.modal').modal('hide');\n			}\n\n		// e.preventDefault();\n	});\n	\n	$('.modal').on('show.bs.modal', function () {\n		closeNav();\n	});\n\n	$(document).on('click', '.modal nav', function() {\n		closeModal();\n	});\n	\n});\n// end doc.ready\n\n})();\n// end anon function\n\n/*****************\n ** WEBPACK FOOTER\n ** ./src/js/main.js\n ** module id = 0\n ** module chunks = 0\n **/\n//# sourceURL=webpack:///./src/js/main.js?")}]);