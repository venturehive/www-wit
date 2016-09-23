// SCROLLING FUNCTIONS
var sectionArray = new Array();
function createSections() {
	$('section').each(function() {
		sectionArray.push({
			sectionName: '#' + $(this).attr('id'),
			sectionTop: $('#' + $(this).attr('id')).position().top - 85,
			sectionHeight: $('#' + $(this).attr('id')).outerHeight(),
			scolled: false
		});
	});
}
function resetSections() {
	sectionArray= [];
	createSections();
}
var gotoRunning = false;
function gotoSection(obj) {
	gotoRunning = true;
	var sectionAnchor = $(obj).attr('href');
	var sectionTop;
	if($(document).width() > 1099) {
		sectionTop = $(sectionAnchor).position().top - 85;
	} else {
		sectionTop = $(sectionAnchor).position().top
	}
	$('header a.current').removeClass('current');
	$(obj).addClass('current');
	$(window).scrollTo(sectionTop, 1250, {
		onAfter: function() {
			gotoRunning = false
		}
	});
}
var lastScroll;
var parIconWeAreInit,
	parIconCampaignInit,
	parIconHappeningsInit,
	worldmapInit,
	parIconTheBlogInit, 
	parIconGlobalInit;
function parallaxScroll() {
	if ($(document).width() > 1099) {
		var scrolled = $(window).scrollTop();
		// UPDATE CURRENT NAV ELEMENT
		if (scrolled <= sectionArray[1].sectionTop && gotoRunning == false) {
			$('header a.current').removeClass('current');
		}
		if (scrolled > sectionArray[1].sectionTop && scrolled < sectionArray[2].sectionTop && gotoRunning == false) {
			if (!$('header a:eq(1)').hasClass('current')) {
				$('header a.current').removeClass('current');
				$('header a:eq(1)').addClass('current');
			}
		}
		if (scrolled > sectionArray[2].sectionTop && scrolled < sectionArray[3].sectionTop && gotoRunning == false) {
			if (!$('header a:eq(2)').hasClass('current')) {
				$('header a.current').removeClass('current');
				$('header a:eq(2)').addClass('current');
			}
		}
		if (scrolled > sectionArray[3].sectionTop && scrolled < sectionArray[4].sectionTop && gotoRunning == false) {
			if (!$('header a:eq(3)').hasClass('current')) {
				$('header a.current').removeClass('current');
				$('header a:eq(3)').addClass('current');
			}
		}
		if (scrolled > sectionArray[4].sectionTop && scrolled < sectionArray[5].sectionTop && gotoRunning == false) {
			if (!$('header a:eq(4)').hasClass('current')) {
				$('header a.current').removeClass('current');
				$('header a:eq(4)').addClass('current');
			}
		}
		// PARALLAX ANIMATIONS
		if ((scrolled >= (sectionArray[1].sectionTop * .5) && scrolled <= (sectionArray[2].sectionTop - (sectionArray[2].sectionHeight * .5))) && (parIconHappeningsInit != null) ) {
			$('#parIconHappenings').css({
				top: (parIconHappeningsInit.top - (scrolled - (sectionArray[1].sectionTop * .5)))
			});
		}
		if (scrolled >= (sectionArray[3].sectionTop + (sectionArray[3].sectionHeight * .25)) && scrolled <= sectionArray[4].sectionTop) {
			$('.program .icon').css({
				opacity: ((scrolled - sectionArray[3].sectionTop) / (sectionArray[3].sectionHeight - 50))
			});
		}
		if (scrolled >= (sectionArray[5].sectionTop - 400) && scrolled <= sectionArray[5].sectionTop) {
			/*$('.world-map').css({
				opacity: ((scrolled - sectionArray[4].sectionTop) / (sectionArray[4].sectionHeight - 50))
			});*/
		}
	}
	lastScroll = scrolled;
}
// OPEN PORTFOLIO OVERLAYS
var programArray = new Array();
var programNavArray = new Array();
function getProgramEl(obj, dir) {
	var $t,
		tURL,
		tContentHTML,
		tBannerHTML,
		ti;
	switch(dir) {
		case 'load': 
			$t = $(obj);
			tURL = $t.attr('href');
			ti = $('#TheProgram li.item').index($t.parent());
			if (programArray[ti].isLoaded == true) {
				$('#programOverlay .po-banner').html(programArray[ti].banner);
				$('#programOverlay .po-content').html(programArray[ti].content);
				$('#programOverlay').data('overlay').load();
			} else {
				$.get(tURL, function(data) {
					tBannerHTML = '<img src="' + $t.siblings('img').attr('src') + '" /><h3>' + $t.siblings('h3').text() + '</h3><div class="clear"></div>';
					tContentHTML = $('.content', data).html();
					$('#programOverlay .po-banner').html(tBannerHTML);
					$('#programOverlay .po-content').html(tContentHTML);
					programArray[ti] = {
						isLoaded: true,
						banner: tBannerHTML,
						content: tContentHTML
					}
				}).done(function() {
					$('#programOverlay').data('overlay').load();
				});
			}
			$t.parent().addClass('current');
			break;
		case 'over': 
			$t = $('a[href*="' + obj + '"]');
			tURL = $t.attr('href');
			ti = $('#TheProgram li.item').index($t.parent());
			if (programArray[ti].isLoaded == true) {
				$('#programOverlay .po-banner').html(programArray[ti].banner);
				$('#programOverlay .po-content').html(programArray[ti].content);
				$('#programOverlay').data('overlay').load();
			} else {
				$.get(tURL, function(data) {
					tBannerHTML = '<img src="' + $t.siblings('img').attr('src') + '" /><h3>' + $t.siblings('h3').text() + '</h3><div class="clear"></div>';
					tContentHTML = $('.content', data).html();
					$('#programOverlay .po-banner').html(tBannerHTML);
					$('#programOverlay .po-content').html(tContentHTML);
					programArray[ti] = {
						isLoaded: true,
						banner: tBannerHTML,
						content: tContentHTML
					}
				}).done(function() {
					$('#programOverlay').data('overlay').load();
				});
			}
			$t.parent().addClass('current');
			break;
		case 'next':
			if ($('#TheProgram li.current').hasClass('last')) {
				$t = $('#TheProgram li.item').first();
			} else {
				$t = $('#TheProgram li.current').next();
			}
			tURL = $t.children('a').attr('href');
			ti = $('#TheProgram li.item').index($t);
			$('#poDataWrap').addClass('next-anim');
			if (programArray[ti].isLoaded == true) {
				$('.po-data').after('<div class="po-data"><div class="po-banner">' + programArray[ti].banner + '</div><div class="po-content">' + programArray[ti].content + '</div></div>');
				$('#TheProgram li.current').removeClass('current');
				$('#poDataWrap .scroll').animate({
					left: -1280
				}, 500, function() {
					$('.po-data').first().remove();
					$('#poDataWrap').removeClass();
					$('#poDataWrap .scroll').removeAttr('style');
				});
				$t.addClass('current');
			} else {
				$.get(tURL, function(data) {
					tBannerHTML = $('.banner', data).html();
					tContentHTML = $('.content', data).html();
					$('.po-data').after('<div class="po-data"><div class="po-banner">' + tBannerHTML + '</div><div class="po-content">' + tContentHTML + '</div></div>');
					programArray[ti] = {
						isLoaded: true,
						banner: tBannerHTML,
						content: tContentHTML
					}
				}).done(function() {
					$('#TheProgram li.current').removeClass('current');
					$('#poDataWrap .scroll').animate({
						left: -1280
					}, 500, function() {
						$('.po-data').first().remove();
						$('#poDataWrap').removeClass();
						$('#poDataWrap .scroll').removeAttr('style');
					});
					$t.addClass('current');
				});
			}
			break;
		case 'prev':
			if ($('#TheProgram li.current').hasClass('first')) {
				$t = $('#TheProgram li.item').last();
			} else {
				$t = $('#TheProgram li.current').prev();
			}
			tURL = $t.children('a').attr('href');
			ti = $('#TheProgram li.item').index($t);
			$('#poDataWrap').addClass('prev-anim');
			if (programArray[ti].isLoaded == true) {
				$('.po-data').after('<div class="po-data"><div class="po-banner">' + programArray[ti].banner + '</div><div class="po-content">' + programArray[ti].content + '</div></div>');
				$('#TheProgram li.current').removeClass('current');
				$('#poDataWrap .scroll').animate({
					right: -1280
				}, 500, function() {
					$('.po-data').first().remove();
					$('#poDataWrap').removeClass();
					$('#poDataWrap .scroll').removeAttr('style');
				});
				$t.addClass('current');
			} else {
				$.get(tURL, function(data) {
					tBannerHTML = $('.banner', data).html();
					tContentHTML = $('.content', data).html();
					$('.po-data').after('<div class="po-data"><div class="po-banner">' + tBannerHTML + '</div><div class="po-content">' + tContentHTML + '</div></div>');
					programArray[ti] = {
						isLoaded: true,
						banner: tBannerHTML,
						content: tContentHTML
					}
				}).done(function() {
					$('#TheProgram li.current').removeClass('current');
					$('#poDataWrap .scroll').animate({
						right: -1280
					}, 500, function() {
						$('.po-data').first().remove();
						$('#poDataWrap').removeClass();
						$('#poDataWrap .scroll').removeAttr('style');
					});
					$t.addClass('current');
				});
			}
			break;
	}
}
function clearProgram() {
	$('#programOverlay .po-banner').html('');
	$('#programOverlay .po-content').html('');
	$('#TheProgram nav li.current').removeClass('current');
}
// OPEN ACCELERATORS OVERLAYS
var acceleratorArray = new Array();
var acceleratorNavArray = new Array();
function getAcceleratorEl(obj, dir) {
	var $t,
		tURL,
		tContentHTML,
		tBannerHTML,
		ti;
	switch(dir) {
		case 'load': 
			$t = $(obj);
			tURL = $t.attr('href');
			ti = $('#dnn_LocatePane h2').index($t.parent());
			if (acceleratorArray[ti].isLoaded == true) {
				$('#locationOverlay .po-banner').html(acceleratorArray[ti].banner);
				$('#locationOverlay .po-content').html(acceleratorArray[ti].content);
				$('#locationOverlay').data('overlay').load();
			} else {
				$.get(tURL, function(data) {
					tBannerHTML = '<h3>' + $t.text() + '</h3>';
					tContentHTML = $('.content', data).html();
					$('#locationOverlay .po-banner').html(tBannerHTML);
					$('#locationOverlay .po-content').html(tContentHTML);
					acceleratorArray[ti] = {
						isLoaded: true,
						banner: tBannerHTML,
						content: tContentHTML
					}
				}).done(function() {
					$('#locationOverlay').data('overlay').load();
				});
			}
			$t.parent().addClass('current');
			break;
		case 'over': 
			$t = $('a[href*="' + obj + '"]');
			tURL = $t.attr('href');
			ti = $('#dnn_LocatePane h2').index($t.parent());
			if (acceleratorArray[ti].isLoaded == true) {
				$('#locationOverlay .po-banner').html(acceleratorArray[ti].banner);
				$('#locationOverlay .po-content').html(acceleratorArray[ti].content);
				$('#locationOverlay').data('overlay').load();
			} else {
				$.get(tURL, function(data) {
					tBannerHTML = '<h3>' + $t.text() + '</h3>';
					tContentHTML = $('.content', data).html();
					$('#locationOverlay .po-banner').html(tBannerHTML);
					$('#locationOverlay .po-content').html(tContentHTML);
					acceleratorArray[ti] = {
						isLoaded: true,
						banner: tBannerHTML,
						content: tContentHTML
					}
				}).done(function() {
					$('#locationOverlay').data('overlay').load();
				});
			}
			$t.parent().addClass('current');
			break;
	}
}
// OPEN ACCELERATORS LOCATIONS OVERLAYS
var locationArray = new Array();
var locationNavArray = new Array();
function getLocationEl(obj, dir) {
	var $t,
		tURL,
		tContentHTML,
		tBannerHTML,
		ti;
	switch(dir) {
		case 'load': 
			$t = $(obj);
			tURL = $t.attr('href');
			ti = $('.world-map li a').index($t);
			if (locationArray[ti].isLoaded == true) {
				$('#locationOverlay .po-banner').html(locationArray[ti].banner);
				$('#locationOverlay .po-content').html(locationArray[ti].content);
				$('#locationOverlay').data('overlay').load();
			} else {
				$.get(tURL, function(data) {
					tBannerHTML = '<h3>' + $t.text() + '</h3>';
					tContentHTML = $('.content', data).html();
					$('#locationOverlay .po-banner').html(tBannerHTML);
					$('#locationOverlay .po-content').html(tContentHTML);
					locationArray[ti] = {
						isLoaded: true,
						banner: tBannerHTML,
						content: tContentHTML
					}
				}).done(function() {
					$('#locationOverlay').data('overlay').load();
				});
			}
			$t.parent().addClass('current');
			break;
		case 'over': 
			$t = $('a[href*="' + obj + '"]');
			tURL = $t.attr('href');
			ti = $('.world-map li a').index($t.parent());
			if (locationArray[ti].isLoaded == true) {
				$('#locationOverlay .po-banner').html(locationArray[ti].banner);
				$('#locationOverlay .po-content').html(locationArray[ti].content);
				$('#locationOverlay').data('overlay').load();
			} else {
				$.get(tURL, function(data) {
					tBannerHTML = '<h3>' + $t.text() + '</h3>';
					tContentHTML = $('.content', data).html();
					$('#locationOverlay .po-banner').html(tBannerHTML);
					$('#locationOverlay .po-content').html(tContentHTML);
					locationArray[ti] = {
						isLoaded: true,
						banner: tBannerHTML,
						content: tContentHTML
					}
				}).done(function() {
					$('#locationOverlay').data('overlay').load();
				});
			}
			$t.parent().addClass('current');
			break;
	}
}
function clearLocation() {
	$('#locationOverlay .po-banner').html('');
	$('#locationOverlay .po-content').html('');
	$('.world-map li.current').removeClass('current');
}
// REDIRECT IN CAPABILILTY
function digestURL() {
	if (location.search != '') {
		var action, goto;
		var query = location.search.replace('?', '');
		if (query.indexOf('TheProgram')) {
			action = location.search.replace('?', '').match('over=(.*)&')[1];
			goto = location.search.replace('?', '').match('goto=(.*)')[1];
			$(window).scrollTo('#' + goto, 1250, {
				onAfter: function() {
					gotoRunning = false;
					getProgramEl(action, 'over');
				}
			});
		}
	}
}
// INIT FUNCTIONALITY
$(document).ready(function() {
	/*$('#TheProgram li.item').each(function() {
		programArray.push({
			isLoaded: false,
			banner: 'default',
			content: 'default'
		});
		programNavArray.push($(this));
	});
	$('#TheProgram a.btn').click(function(e) {
		var href = $(this).attr('href').toLowerCase();
		if ($(this).attr('target') != '_new' && href.indexOf('accelerators.aspx') == -1) {
			e.preventDefault();
//			alert(href.indexOf('accelerators.aspx'));
			getProgramEl(this, 'load');
		}
	});
	$('#programOverlay').r2iOverlay({
		top: 'center',
		left: 'center',
		mask: {
			color: '#000',
			opacity: .6,
			loadSpeed: 250
		},
		onLoad: function() {
			$('a.contact-link').click(function(e) {
				e.preventDefault();
				$(window).scrollTo(($('#ContactUs').position().top - 85), 1250, {
					onAfter: function() {
						gotoRunning = false
					}
				});
				$('#programOverlay').data('overlay').close();
			});
		},
		onClose: function() {
			clearProgram();
		},
		fixed: false
	});
	$('.world-map ul li a').each(function() {
		locationArray.push({
			isLoaded: false,
			banner: 'default',
			content: 'default'
		});
		locationNavArray.push($(this));
	});
	$('.world-map ul li a').click(function(e) {
		if ($(this).attr('target') != '_new') {
			e.preventDefault();
			getLocationEl(this, 'load');
		}
	});*/
	$('#dnn_LocatePane h2 a').each(function() {
		acceleratorArray.push({
			isLoaded: false,
			banner: 'default',
			content: 'default'
		});
		acceleratorNavArray.push($(this));
	});
	$('#dnn_LocatePane h2 a').click(function(e) {
		if ($(this).attr('target') != '_new') {
			e.preventDefault();
			getAcceleratorEl(this, 'load');
		}
	});
	$('#locationOverlay').r2iOverlay({
		top: 'center',
		left: 'center',
		mask: {
			color: '#000',
			opacity: .6,
			loadSpeed: 250
		},
		onLoad: function() {
			$('a.contact-link').click(function(e) {
				e.preventDefault();
				$(window).scrollTo(($('#ContactUs').position().top - 85), 1250, {
					onAfter: function() {
						gotoRunning = false
					}
				});
				$('#locationOverlay').data('overlay').close();
			});
		},
		onClose: function() {
			clearLocation();
		},
		fixed: false
	});
	$('span.logo a').attr('href', '#top');
	createSections();
	$('header a.go-to, footer nav.footer li a').click(function(e) {
		e.preventDefault();
		gotoSection(this);
		if($(document).width() < 1099) {
			$('header nav.main').slideUp(250);
		}
	});
	//$('#StartupShowcase h2').click(function() {
	//	if ($(this).hasClass('active')) {
	//		$(this).removeClass('active');
	//		$(this).find('.toggle').text('View All');
	//		$('nav.startups').slideUp(250, function() {
	//			resetSections();
	//			$(window).off('scroll',function(e){
	//				parallaxScroll();
	//			}).on('scroll',function(e){
	//				parallaxScroll();
	//			});
	//		});
	//	} else {
	//		$(this).addClass('active');
	//		$(this).find('.toggle').text('View Less');
	//		$('nav.startups').slideDown(250, function() {
	//			resetSections();
	//			$(window).off('scroll',function(e){
	//				parallaxScroll();
	//			}).on('scroll',function(e){
	//				parallaxScroll();
	//			});
	//			$(window).scrollTo('nav.startups', 750);
	//		});
	//	}
	//});
	// FIRE ONLY IF BROWSER IS NOT IE8
	if (!$('html').hasClass('ie8')) {
		$('#TheBlog a.browse').css({
			'height': $('#TheBlog ul').height()
		});
		$(window).on('scroll',function(e){
			parallaxScroll();
		});
		parIconWeAreInit = $('#parIconWeAre').position();
		parIconCampaignInit = $('#parIconCampaign').position();
		parIconHappeningsInit = $('#parIconHappenings').position();
		worldmapInit = $('.world-map ul').position();
		parIconTheBlogInit = $('#parIconTheBlog').position();
		parIconGlobalInit = $('#parIconGlobal').position();
		$('.showcase a').each(function() {
			var itemHeight = $(this).height();
			$(this).children('.logo').css({
				top: itemHeight
			});
		});
		if($(window).width() > 1099) {
			$('.startups li').hover(
				function() {
					var imgSRC = $(this).children('.tooltip').attr('icon');
					if (!$(this).children('.tooltip').hasClass('loaded')) {
						$(this).children('.tooltip').addClass('loaded').prepend('<img src=' + imgSRC + ' />').stop().fadeIn(250);
					} else {
						$(this).children('.tooltip').stop().fadeIn(250);
					}
				}, 
				function() {
					$(this).children('.tooltip').stop().fadeOut(250);
				}
			);
			$('.showcase a').hover(
				function() {
					var parHeight = $(this).height();
					var logoHeight = $(this).children('.logo').outerHeight();
					$(this).children('.logo').stop().animate({
						top: ((parHeight / 2) - (logoHeight / 2))
					}, 500);
				}, 
				function() {
					$(this).children('.logo').stop().animate({
						top: ($(this).parent().height())
					}, 500);
				}
			);
		}
		if ($(window).width() > 767) {
			$('.startups ul').makeacolumnlists({
				cols:4,
				colWidth:'25%',
				equalHeight:false
			});
		} else {
			$('.startups ul').makeacolumnlists({
				cols:2,
				colWidth:'25%',
				equalHeight:false
			});
		}
	} else {
		$('.startups li').hover(
			function() {
				var imgSRC = $(this).children('.tooltip').attr('icon');
				if (!$(this).hasClass('loaded')) {
					$(this).addClass('loaded').children('.tooltip').prepend('<img src=' + imgSRC + ' />').stop().fadeIn(250);
				} else {
					$(this).children('.tooltip').stop().fadeIn(250);
				}
			}, 
			function() {
				$(this).children('.tooltip').stop().fadeOut(250);
			}
		);
		$('.startups ul').makeacolumnlists({
			cols:4,
			colWidth:'25%',
			equalHeight:false
		});
	}
	digestURL();
	$('.world-map li.disabled').mouseenter(function() {
		$(this).children('.tooltip').fadeIn(250);
	}).mouseleave(function() {
		$(this).children('.tooltip').fadeOut(250);
	});
});
$(window).resize(function() {
	if (!$('html').hasClass('ie8')) {
		resetSections();
		$('#TheBlog a.browse').css({
			'height': $('#TheBlog ul').height()
		});
		$('.showcase a .logo').css('top', $(this).parent().height());
		if($(window).width() > 1099) {
			$('.showcase a').hover(
				function() {
					var parHeight = $(this).height();
					var logoHeight = $(this).children('.logo').outerHeight();
					$(this).children('.logo').stop().animate({
						top: ((parHeight / 2) - (logoHeight / 2))
					}, 500);
				}, 
				function() {
					$(this).children('.logo').stop().animate({
						top: ($(this).parent().height())
					}, 500);
				}
			);
		}
		if ($(window).width() > 767) {
			$('.startups ul').uncolumnlists();
			$('.startups ul').makeacolumnlists({
				cols:4,
				colWidth:'25%',
				equalHeight:false
			});
		} else {
			$('.startups ul').uncolumnlists();
			$('.startups ul').makeacolumnlists({
				cols:2,
				colWidth:'25%',
				equalHeight:false
			});
		}
	}
});