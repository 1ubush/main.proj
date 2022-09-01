//@prepros-append jq-start.js
//@prepros-append responsive.js
//@prepros-append sliders.js
//@prepros-append scroll.js
//@prepros-append map.js
//@prepros-append forms.js
//@prepros-append script.js
//@prepros-append jq-end.js
$(document).ready(function() {
		var w=$(window).outerWidth();
		var h=$(window).outerHeight();
		var ua = window.navigator.userAgent;
		var msie = ua.indexOf("MSIE ");
		var isMobile = {Android: function() {return navigator.userAgent.match(/Android/i);},BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},Windows: function() {return navigator.userAgent.match(/IEMobile/i);},any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}};
	function isIE() {
		ua = navigator.userAgent;
		var is_ie = ua.indexOf("MSIE ") > -1 || ua.indexOf("Trident/") > -1;
		return is_ie; 
	}
	if(isIE()){
		$('body').addClass('ie');
	}
	if(isMobile.any()){
		$('body').addClass('touch');
	}
//Adaptive functions
$(window).resize(function(event) {
	adaptive_function();
});
function adaptive_header(w,h) {
		var headerMenu=$('.header-menu');
		var headerContacts=$('.header-contacts');
	if(w<767){
		if(!headerContacts.hasClass('done')){
			headerContacts.addClass('done').appendTo(headerMenu);
		}
	}else{
		if(headerContacts.hasClass('done')){
			headerContacts.removeClass('done').appendTo(headerMenu);
		}
	}
}
function adaptive_function() {
		var w=$(window).outerWidth();
		var h=$(window).outerHeight();
	adaptive_header(w,h);
}
	adaptive_function();



//SLICK FIX
if($('.objects-slider').length>0){
		var slider=$('.objects-slider');
	slider.slick({
		//autoplay: true,
		//infinite: false,
		infinite: true,
		dots: true,
		arrows: true,
		accessibility:false,
		slidesToShow:2,
		slidesToScroll:1,
		autoplaySpeed: 3000,
		speed: 500,
		waitForAnimate:false,
		//asNavFor:'',
		//appendDots:
		appendDots:$('.objects-controls'),
		appendArrows:$('.objects-controls'),
		nextArrow:'<button type="button" class="slick-next"></button>',
		prevArrow:'<button type="button" class="slick-prev"></button>',
		responsive: [{
			breakpoint: 768,
			settings: {
				slidesToShow:1,
				slidesToScroll:1,
			}
		}]
	});
		var sltoshow=slider.get(0).slick.options.slidesToShow;
		var all=slider.find('.slick-slide').length;
		var allactive=slider.find('.slick-slide').not('.slick-cloned').length;
	slider.on('beforeChange', function(event,slick,currentSlide,nextSlide){
		if(nextSlide==0){
				var ind=all-allactive;
			if(sltoshow==1){
				slider.find('.slick-slide').eq(ind).addClass('active');
			}else{
				sliderfix(slider,ind);
			}
		}
		if(nextSlide==allactive-1){
			if(sltoshow==1){
				slider.find('.slick-slide').eq(0).addClass('active');
			}else{
				sliderfix(slider,sltoshow-1);
			}
		}

		//DIRECTION
		if (currentSlide === 0 && nextSlide === slick.$slides.length - 1) {
			direction = 'prev';
		}else if(nextSlide > currentSlide || (currentSlide === (slick.$slides.length - 1) && nextSlide === 0 )) {
			direction = 'next';
		}else{
			direction = 'prev';
		}
		//console.log(direction);
	});
	slider.on('afterChange', function(event, slick, currentSlide){
		slider.find('.slick-slide').removeClass('active');
	});
	function sliderfix(slider,v){
		for (var i=0; i < sltoshow; i++) {
				var n=v+i;
			slider.find('.slick-slide').eq(n).addClass('active');
		}
	}


}

if($('.newsmodule-slider').length>0){
	$('.newsmodule-slider').slick({
		//autoplay: true,
		//infinite: false,
		fade:true,
		dots: false,
		arrows: false,
		accessibility:false,
		slidesToShow:1,
		autoplaySpeed: 3000,
		//asNavFor:'',
		//appendDots:
		//appendArrows:$('.mainslider-arrows .container'),
		nextArrow:'<button type="button" class="slick-next fa fa-angle-right"></button>',
		prevArrow:'<button type="button" class="slick-prev fa fa-angle-left"></button>',
		responsive: [{
			breakpoint: 768,
			settings: {	}
		}]
	});
	//Опция
	$('.newsmodule-slider').get(0).slick.options.slidesToShow

	$('.newsmodule-items-item').click(function(event) {
		$('.newsmodule-items-item').removeClass('active');
		$(this).addClass('active');
		$('.newsmodule-slider').slick('goTo',$(this).index());
	});
	$('.newsmodule-navigator-info span').eq(1).html($('.newsmodule-items-item').length);
	
	$('.newsmodule-slider').on('beforeChange', function(event, slick, currentSlide, nextSlide){
		$('.newsmodule-navigator-info span').eq(0).html(nextSlide+1);
	});
	$('.newsmodule-slider').on('afterChange', function(event, slick, currentSlide){
		$('.newsmodule-navigator-info span').eq(0).html(currentSlide+1);
	});
	$('.newsmodule-navigator__arrow.fa-angle-left').click(function(event) {
		$('.newsmodule-slider').slick('slickPrev');
	});
	$('.newsmodule-navigator__arrow.fa-angle-right').click(function(event) {
		$('.newsmodule-slider').slick('slickNext');
	});
}

	sectors($(this).scrollTop());
$(window).scroll(function(event) {
		var scr=$(this).scrollTop();
	sectors(scr);
});
function sectors(scr){
		var w=$(window).outerWidth();
		var h=$(window).outerHeight();
		var headerheight=80;
	if(w<768){headerheight=50;}
	if(scr>0){
		$('header').addClass('scroll');
	}else{
		$('header').removeClass('scroll');
	}
	if(scr>h){
		$('#up').fadeIn(300);
	}else{
		$('#up').fadeOut(300);
	}
	$.each($('.sector'), function(index, val) {
			var th=$(this).outerHeight();
			var tot=$(this).offset().top;
		if(scr>=tot && scr<=tot+th-h){
			$('.sector.scroll').removeClass('scroll');
			$(this).addClass('scroll');
		}
		if($(this).hasClass('scroll')){
			if(scr>=tot && scr<=tot+th-h){
				if($(this).hasClass('normalscroll')){
					$('body').addClass('scroll');
				}else{
					$('body').removeClass('scroll');
				}
			}else{
				if($(this).hasClass('normalscroll')){
					$('body').removeClass('scroll');
				}
			}
		}
		if(scr>tot-h/1.5 && scr<tot+th){
			if($('.dotts').length>0){
				dotts(index,0);
			}
			$(this).addClass('active');
		}else{
			$(this).removeClass('active');
		}
		if(scr>tot-h && scr<tot+th){
			$(this).addClass('view');
			if($(this).hasClass('padding')){
					var ps=100-(tot-scr)/h*100;
					var p=headerheight/100*ps;
				if(p>=headerheight){p=headerheight;}
				$(this).css({paddingTop:p});
			}
		}else{
			$(this).removeClass('view');
		}
	});
	/*
	$.each($('.lz').not('.load'), function(index, val) {
			var img=$(this).data('image');
		if(scr>tot-h && scr<tot+th){
			$(this).html('<img src="'+img+'" alt="" />');
			$(this).addClass('load');
		}
	});
	*/
}
function dotts(ind,init){
	if(init==true){
		$.each($('.sector'), function(index, val) {
			$('.dotts-list').append('<li></li>');
		});
	}
	$('.dotts-list li').removeClass('active').eq(ind).addClass('active');
}
$('body').on('click', '.dotts-list li', function(event) {
		var n=$(this).index()+1;
		var offset=0;
	$('body,html').animate({scrollTop: $('.sector-'+n).offset().top+offset},800, function() {});
});
function map(n){
	google.maps.Map.prototype.setCenterWithOffset= function(latlng, offsetX, offsetY) {
		var map = this;
		var ov = new google.maps.OverlayView(); 
		ov.onAdd = function() { 
			var proj = this.getProjection(); 
			var aPoint = proj.fromLatLngToContainerPixel(latlng);
			aPoint.x = aPoint.x+offsetX;
			aPoint.y = aPoint.y+offsetY;
			map.panTo(proj.fromContainerPixelToLatLng(aPoint));
			//map.setCenter(proj.fromContainerPixelToLatLng(aPoint));
		}
		ov.draw = function() {};
		ov.setMap(this);
	};
	var markers = new Array();
	var infowindow = new google.maps.InfoWindow({
		//pixelOffset: new google.maps.Size(-230,250)
	});
	var locations = [
		[new google.maps.LatLng(53.819055,27.8813694)],
		[new google.maps.LatLng(53.700055,27.5513694)],
		[new google.maps.LatLng(53.809055,27.5813694)],
		[new google.maps.LatLng(53.859055,27.5013694)],
	]
	var options = {
		zoom: 10,
		panControl:false,
		mapTypeControl:false,
		center: locations[0][0],
		styles:[{"featureType":"landscape.natural","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#e0efef"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"hue":"#1900ff"},{"color":"#c0e8e8"}]},{"featureType":"road","elementType":"geometry","stylers":[{"lightness":100},{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"visibility":"on"},{"lightness":700}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#7dcdcd"}]}],
		scrollwheel:false,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	}; 
	var map = new google.maps.Map(document.getElementById('map'), options);
	var icon={
		url:'img/icons/map.svg',
		scaledSize: new google.maps.Size(18, 20),
		anchor: new google.maps.Point(9, 10)
	}
	for (var i = 0; i < locations.length; i++) {
		var marker = new google.maps.Marker({
			icon:icon,
			position: locations[i][0],
			map: map,
		});
		google.maps.event.addListener(marker, 'click', (function (marker, i) {
			return function () {
				for (var m = 0; m < markers.length; m++) {
					markers[m].setIcon(icon);
				}
					var cnt=i+1;
				infowindow.setContent($('.contacts-map-item_'+cnt).html());
				infowindow.open(map, marker);
				marker.setIcon(icon);
				map.setCenterWithOffset(marker.getPosition(),0,0);
				setTimeout(function(){
					baloonstyle();
				},10);
			}
		})(marker, i));
		markers.push(marker);
	}

	if(n){
			var nc=n-1;
		setTimeout(function(){
			google.maps.event.trigger(markers[nc], 'click');
		},500);
	}
}
function baloonstyle(){
	$('.gm-style-iw').parent().addClass('baloon');
	$('.gm-style-iw').prev().addClass('baloon-style');
	$('.gm-style-iw').next().addClass('baloon-close');
	$('.gm-style-iw').addClass('baloon-content');
}
if($("#map").length>0){
	map(1);
}


/* YA
function map(n){
	ymaps.ready(init);
	function init(){ 
		// Создание карты.
		var myMap = new ymaps.Map("map", {
			// Координаты центра карты.
			// Порядок по умолчанию: «широта, долгота».
			// Чтобы не определять координаты центра карты вручную,
			// воспользуйтесь инструментом Определение координат.
			controls: [],
			center: [43.585525,39.723062],
			// Уровень масштабирования. Допустимые значения:
			// от 0 (весь мир) до 19.
			zoom: 10
		});
		
		myPlacemar = new ymaps.Placemark([43.585525,39.723062],{
			id:'2'
		},{
			// Опции.
			hasBalloon:false,
			hideIconOnBalloonOpen:false,
			// Необходимо указать данный тип макета.
			iconLayout: 'default#imageWithContent',
			// Своё изображение иконки метки.
			iconImageHref: 'img/icons/map.svg',
			// Размеры метки.
			iconImageSize: [40, 40],
			// Смещение левого верхнего угла иконки относительно
			// её "ножки" (точки привязки).
			iconImageOffset: [-20, -20],
			// Смещение слоя с содержимым относительно слоя с картинкой.
			iconContentOffset: [0,0],
		});
		myMap.geoObjects.add(myPlacemar);

		myMap.behaviors.disable('scrollZoom');
	}
}
*/
//FORMS
function forms(){
	//SELECT
	if($('select').length>0){
		function selectscrolloptions(){
				var scs=100;
				var mss=50;
			if(isMobile.any()){
				scs=10;
				mss=1;
			}
			var opt={
				cursorcolor:"#2078e5",
				cursorwidth: "3px",
				background: "",
				autohidemode:false,
				bouncescroll:false,
				cursorborderradius: "0px",
				scrollspeed:scs,
				mousescrollstep:mss,
				directionlockdeadzone:0,
				cursorborder: "0px solid #fff",
			};
			return opt;
		}

		function select(){
			$.each($('select'), function(index, val) {
					var ind=index;
				$(this).hide();
				if($(this).parent('.select-block').length==0){
					$(this).wrap("<div class='select-block "+$(this).attr('class')+"-select-block'></div>");
				}else{
					$(this).parent('.select-block').find('.select').remove();
				}
					var milti='';
					var check='';
					var sblock=$(this).parent('.select-block');
					var soptions="<div class='select-options'><div class='select-options-scroll'><div class='select-options-list'>";
				if($(this).attr('multiple')=='multiple'){
					milti='multiple';
					check='check';
				}
				$.each($(this).find('option'), function(index, val) {
					if($(this).attr('value')!=''){
						soptions=soptions+"<div data-value='"+$(this).attr('value')+"' class='select-options__value_"+ind+" select-options__value value_"+$(this).val()+" "+$(this).attr('class')+" "+check+"'>"+$(this).html()+"</div>";
					}else if($(this).parent().attr('data-label')=='on'){
						if(sblock.find('.select__label').length==0){
							sblock.prepend('<div class="select__label">'+$(this).html()+'</div>');
						}
					}
				});
					soptions=soptions+"</div></div></div>";
				if($(this).attr('data-type')=='search'){
						sblock.append("<div data-type='search' class='select_"+ind+" select"+" "+$(this).attr('class')+"__select "+milti+"'>"+
												"<div class='select-title'>"+
													"<div class='select-title__arrow ion-ios-arrow-down'></div>"+
													"<input data-value='"+$(this).find('option[selected="selected"]').html()+"' class='select-title__value value_"+$(this).find('option[selected="selected"]').val()+"' />"+
												"</div>"+
												soptions+
											"</div>");
						$('.select_'+ind).find('input.select-title__value').jcOnPageFilter({
							parentSectionClass:'select-options_'+ind,
							parentLookupClass:'select-options__value_'+ind,
							childBlockClass:'select-options__value_'+ind
						});
				}else{
					sblock.append("<div class='select_"+ind+" select"+" "+$(this).attr('class')+"__select "+milti+"'>"+
											"<div class='select-title'>"+
												"<div class='select-title__arrow ion-ios-arrow-down'></div>"+
												"<div class='select-title__value value_"+$(this).find('option[selected="selected"]').val()+"'>"+$(this).find('option[selected="selected"]').html()+"</div>"+
											"</div>"+
											soptions+
										"</div>");
				}
				if($(this).find('option[selected="selected"]').val()!=''){
					sblock.find('.select').addClass('focus');
				}
				if($(this).attr('data-req')=='on'){
					$(this).addClass('req');
				}
				$(".select_"+ind+" .select-options-scroll").niceScroll('.select-options-list',selectscrolloptions());
			});
		}
			select();

		$('body').on('keyup','input.select-title__value',function() {
			$('.select').not($(this).parents('.select')).removeClass('active').find('.select-options').slideUp(50);
			$(this).parents('.select').addClass('active');
			$(this).parents('.select').find('.select-options').slideDown(50,function() {
				$(this).find(".select-options-scroll").getNiceScroll().resize();
			});
			$(this).parents('.select-block').find('select').val('');
		});
		$('body').on('click','.select',function(){
			if(!$(this).hasClass('disabled')){
				$('.select').not(this).removeClass('active').find('.select-options').slideUp(50);
				$(this).toggleClass('active');
				$(this).find('.select-options').slideToggle(50,function() {
					$(this).find(".select-options-scroll").getNiceScroll().resize();
				});

				//	var input=$(this).parent().find('select');
				//removeError(input);

				if($(this).attr('data-type')=='search'){
					if(!$(this).hasClass('active')){
						searchselectreset();
					}
					$(this).find('.select-options__value').show();
				}
			}
		});
		$('body').on('click','.select-options__value',function() {
			if($(this).parents('.select').hasClass('multiple')){
				if($(this).hasClass('active')){
					if($(this).parents('.select').find('.select-title__value span').length>0){
						$(this).parents('.select').find('.select-title__value').append('<span data-value="'+$(this).data('value')+'">, '+$(this).html()+'</span>');
					}else{
						$(this).parents('.select').find('.select-title__value').data('label',$(this).parents('.select').find('.select-title__value').html());
						$(this).parents('.select').find('.select-title__value').html('<span data-value="'+$(this).data('value')+'">'+$(this).html()+'</span>');
					}
					$(this).parents('.select-block').find('select').find('option').eq($(this).index()+1).prop('selected', true);
					$(this).parents('.select').addClass('focus');
				}else{
					$(this).parents('.select').find('.select-title__value').find('span[data-value="'+$(this).data('value')+'"]').remove();
					if($(this).parents('.select').find('.select-title__value span').length==0){
						$(this).parents('.select').find('.select-title__value').html($(this).parents('.select').find('.select-title__value').data('label'));
						$(this).parents('.select').removeClass('focus');
					}
					$(this).parents('.select-block').find('select').find('option').eq($(this).index()+1).prop('selected', false);
				}
				return false;
			}

			if($(this).parents('.select').attr('data-type')=='search'){
				$(this).parents('.select').find('.select-title__value').val($(this).html());
				$(this).parents('.select').find('.select-title__value').attr('data-value',$(this).html());
			}else{
				$(this).parents('.select').find('.select-title__value').attr('class','select-title__value value_'+$(this).data('value'));
				$(this).parents('.select').find('.select-title__value').html($(this).html());

			}

				$(this).parents('.select-block').find('select').find('option').removeAttr("selected");
			if($.trim($(this).data('value'))!=''){
				$(this).parents('.select-block').find('select').val($(this).data('value'));
				$(this).parents('.select-block').find('select').find('option[value="'+$(this).data('value')+'"]').attr('selected','selected');
			}else{
				$(this).parents('.select-block').find('select').val($(this).html());
				$(this).parents('.select-block').find('select').find('option[value="'+$(this).html()+'"]').attr('selected','selected');
			}


			if($(this).parents('.select-block').find('select').val()!=''){
				$(this).parents('.select-block').find('.select').addClass('focus');
			}else{
				$(this).parents('.select-block').find('.select').removeClass('focus');

				$(this).parents('.select-block').find('.select').removeClass('err');
				$(this).parents('.select-block').parent().removeClass('err');
				$(this).parents('.select-block').removeClass('err').find('.form__error').remove();
			}
			if(!$(this).parents('.select').data('tags')!=""){
				if($(this).parents('.form-tags').find('.form-tags__item[data-value="'+$(this).data('value')+'"]').length==0){
					$(this).parents('.form-tags').find('.form-tags-items').append('<a data-value="'+$(this).data('value')+'" href="" class="form-tags__item">'+$(this).html()+'<span class="fa fa-times"></span></a>');
				}
			}
			$(this).parents('.select-block').find('select').change();

			if($(this).parents('.select-block').find('select').data('update')=='on'){
				select();
			}
		});
		$(document).on('click touchstart',function(e) {
			if (!$(e.target).is(".select *") && !$(e.target).is(".select")) {
				$('.select').removeClass('active');
				$('.select-options').slideUp(50,function() {});
				searchselectreset();
			};
		});
		$(document).on('keydown',function(e) {
			if(e.which==27){
				$('.select').removeClass('active');
				$('.select-options').slideUp(50,function() {});
				searchselectreset();
			}
		});
	}
	//FIELDS
	$('input,textarea').focus(function(){
		if($(this).val() == $(this).attr('data-value')){
				$(this).addClass('focus');
				$(this).parent().addClass('focus');
			if($(this).attr('data-type')=='pass'){
				$(this).attr('type','password');
			};
			$(this).val('');
		};
		removeError($(this));
	});
	$('input[data-value], textarea[data-value]').each(function() {
		if (this.value == '' || this.value == $(this).attr('data-value')) {
			this.value = $(this).attr('data-value');
			if($(this).hasClass('l') && $(this).parent().find('.form__label').length==0){
				$(this).parent().append('<div class="form__label">'+$(this).attr('data-value')+'</div>');
			}
		}
		if(this.value!=$(this).attr('data-value') && this.value!=''){
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			if($(this).hasClass('l') && $(this).parent().find('.form__label').length==0){
				$(this).parent().append('<div class="form__label">'+$(this).attr('data-value')+'</div>');
			}
		}

		$(this).click(function() {
			if (this.value == $(this).attr('data-value')) {
				if($(this).attr('data-type')=='pass'){
					$(this).attr('type','password');
				};
				this.value = '';
			};
		});
		$(this).blur(function() {
			if (this.value == '') {
				this.value = $(this).attr('data-value');
					$(this).removeClass('focus');
					$(this).parent().removeClass('focus');
				if($(this).attr('data-type')=='pass'){
					$(this).attr('type','text');
				};
			};
		});
	});
	$('.form-input__viewpass').click(function(event) {
		if($(this).hasClass('active')){
			$(this).parent().find('input').attr('type','password');
		}else{
			$(this).parent().find('input').attr('type','text');
		}
		$(this).toggleClass('active');
	});

	//$('textarea').autogrow({vertical: true, horizontal: false});
	

	//MASKS//
	//'+7(999) 999 9999'
	//'+38(999) 999 9999'
	//'+375(99)999-99-99'
	//'a{3,1000}' только буквы минимум 3
	//'9{3,1000}' только цифры минимум 3
	$.each($('input.phone'), function(index, val) {
		$(this).attr('type','tel');
		$(this).focus(function(){
			$(this).inputmask('+38(999) 999 9999',{clearIncomplete: true,clearMaskOnLostFocus: true,
				"onincomplete": function(){maskclear($(this));}
			});
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			$(this).parent().removeClass('err');
			$(this).removeClass('err');
		});
	});
	$('input.phone').focusout(function(event) {
		maskclear($(this));
	});
	$.each($('input.num'), function(index, val) {
		$(this).focus(function(){
			$(this).inputmask('9{1,1000}',{clearIncomplete: true,placeholder:"",clearMaskOnLostFocus: true,"onincomplete": function(){maskclear($(this));}});
			$(this).addClass('focus');
			$(this).parent().addClass('focus');
			$(this).parent().removeClass('err');
			$(this).removeClass('err');
		});
	});
	$('input.num').focusout(function(event) {
		maskclear($(this));
	});
	//CHECK
	$.each($('.check'), function(index, val) {
		if($(this).find('input').prop('checked')==true){
			$(this).addClass('active');
		}
	});
	$('body').off('click','.check',function(event){});
	$('body').on('click','.check',function(event){
		if(!$(this).hasClass('disable')){
				var target = $(event.target);
			if (!target.is("a")){
					$(this).toggleClass('active');
				if($(this).hasClass('active')){
					$(this).find('input').prop('checked', true);
				}else{
					$(this).find('input').prop('checked', false);
				}
			}
		}
	});

	//OPTION
	$.each($('.option.active'), function(index, val) {
		$(this).find('input').prop('checked', true);
	});
	$('.option').click(function(event) {
		if(!$(this).hasClass('disable')){
			if($(this).hasClass('active') && $(this).hasClass('order') ){
				$(this).toggleClass('orderactive');
			}
				$(this).parents('.options').find('.option').removeClass('active');
				$(this).toggleClass('active');
				$(this).children('input').prop('checked', true);
		}
	});
	//RATING
	$('.rating.edit .star').hover(function() {
			var block=$(this).parents('.rating');
		block.find('.rating__activeline').css({width:'0%'});
			var ind=$(this).index()+1;
			var linew=ind/block.find('.star').length*100;
		setrating(block,linew);
	},function() {
			var block=$(this).parents('.rating');
		block.find('.star').removeClass('active');
			var ind=block.find('input').val();
			var linew=ind/block.find('.star').length*100;
		setrating(block,linew);
	});
	$('.rating.edit .star').click(function(event) {
			var block=$(this).parents('.rating');
			var re=$(this).index()+1;
			block.find('input').val(re);
			var linew=re/block.find('.star').length*100;
		setrating(block,linew);
	});
	$.each($('.rating'), function(index, val) {
			var ind=$(this).find('input').val();
			var linew=ind/$(this).parent().find('.star').length*100;
		setrating($(this),linew);
	});
	function setrating(th,val) {
		th.find('.rating__activeline').css({width:val+'%'});
	}
	//QUANTITY
	$('.quantity__btn').click(function(event) {
			var n=parseInt($(this).parent().find('.quantity__input').val());
		if($(this).hasClass('dwn')){
			n=n-1;
			if(n<1){n=1;}
		}else{
			n=n+1;
		}
			$(this).parent().find('.quantity__input').val(n);
		return false;
	});
	//RANGE
	if($("#range" ).length>0){
		$("#range" ).slider({
			range: true,
			min: 0,
			max: 5000,
			values: [0, 5000],
			slide: function( event, ui ){
				$('#rangefrom').val(ui.values[0]);
				$('#rangeto').val(ui.values[1]);
				$(this).find('.ui-slider-handle').eq(0).html('<span>'+ui.values[0]+'</span>');
				$(this).find('.ui-slider-handle').eq(1).html('<span>'+ui.values[1]+'</span>');
			},
			change: function( event, ui ){
				if(ui.values[0]!=$( "#range" ).slider( "option","min") || ui.values[1]!=$( "#range" ).slider( "option","max")){
					$('#range').addClass('act');
				}else{
					$('#range').removeClass('act');
				}
			}
		});
		$('#rangefrom').val($( "#range" ).slider( "values", 0 ));
		$('#rangeto').val($( "#range" ).slider( "values", 1 ));

		$("#range" ).find('.ui-slider-handle').eq(0).html('<span>'+$( "#range" ).slider( "option","min")+'</span>');
		$("#range" ).find('.ui-slider-handle').eq(1).html('<span>'+$( "#range" ).slider( "option","max")+'</span>');
		
		$( "#rangefrom" ).bind("change", function(){
			if($(this).val()*1>$( "#range" ).slider( "option","max")*1){
				$(this).val($( "#range" ).slider( "option","max"));
			}
			if($(this).val()*1<$( "#range" ).slider( "option","min")*1){
				$(this).val($( "#range" ).slider( "option","min"));
			}
			$("#range" ).slider( "values",0,$(this).val());
		});
		$( "#rangeto" ).bind("change", function(){
			if($(this).val()*1>$( "#range" ).slider( "option","max")*1){
				$(this).val($( "#range" ).slider( "option","max"));
			}
			if($(this).val()*1<$( "#range" ).slider( "option","min")*1){
				$(this).val($( "#range" ).slider( "option","min"));
			}
			$("#range" ).slider( "values",1,$(this).val());
		});
		$("#range" ).find('.ui-slider-handle').eq(0).addClass('left');
		$("#range" ).find('.ui-slider-handle').eq(1).addClass('right');
	}
	//ADDFILES
	$('.form-addfile__input').change(function(e){
		if($(this).val()!=''){
					var ts=$(this);
				ts.parents('.form-addfile').find('ul.form-addfile-list').html('');
			$.each(e.target.files, function(index, val) {
				if(ts.parents('.form-addfile').find('ul.form-addfile-list>li:contains("'+e.target.files[index].name+'")').length==0){
					ts.parents('.form-addfile').find('ul.form-addfile-list').append('<li>'+e.target.files[index].name+'</li>');
				}
			});
		}
	});
}
forms();

function digi(str){
	var r=str.toString().replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
	return r;
}

//VALIDATE FORMS
$('form button[type=submit]').click(function(){
		var er=0;
		var form=$(this).parents('form');
		var ms=form.data('ms');
	$.each(form.find('.req'), function(index, val) {
		er+=formValidate($(this));
	});
	if(er==0){
		removeFormError(form);
		/*
			var messagehtml='';
		if(form.hasClass('editprofile')){
			var messagehtml='';
		}
		formLoad();
		*/

		//ОПТРАВКА ФОРМЫ
		/*
		function showResponse(html){
			if(!form.hasClass('nomessage')){
				showMessage(messagehtml);
			}
			if(!form.hasClass('noclear')){
				clearForm(form);
			}
		}
		var options={
			success:showResponse
		};
			form.ajaxForm(options);
		

		setTimeout(function(){
			if(!form.hasClass('nomessage')){
				//showMessage(messagehtml);
				showMessageByClass(ms);
			}
			if(!form.hasClass('noclear')){
				clearForm(form);
			}
		},0);

		return false;
		*/

		if(ms!=null && ms!=''){
			showMessageByClass(ms);
			return false;
		}
	}else{
		return false;
	}
});
function formValidate(input){
		var er=0;
		var form=input.parents('form');
	if(input.attr('name')=='email' || input.hasClass('email')){
		if(input.val()!=input.attr('data-value')){
			var em=input.val().replace(" ","");
			input.val(em);
		}
		if(!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/.test(input.val())) || input.val()==input.attr('data-value')){
				er++;
			addError(input);
		}else{
			removeError(input);
		}
	}else{
		if(input.val()=='' || input.val()==input.attr('data-value')){
			er++;
			addError(input);
		}else{
			removeError(input);
		}
	}
	if(input.attr('type')=='checkbox'){
		if(input.prop('checked') == true){
			input.removeClass('err').parent().removeClass('err');
		}else{
			er++;
			input.addClass('err').parent().addClass('err');
		}
	}
	if(input.hasClass('name')){
		if(!(/^[А-Яа-яa-zA-Z-]+( [А-Яа-яa-zA-Z-]+)$/.test(input.val()))){
				er++;
			addError(input);
		}
	}
	if(input.hasClass('pass-2')){
		if(form.find('.pass-1').val()!=form.find('.pass-2').val()){
			addError(input);
		}else{
			removeError(input);
		}
	}
		return er;
}
function formLoad(){
	$('.popup').hide();
	$('.popup-message-body').hide();
	$('.popup-message .popup-body').append('<div class="popup-loading"><div class="popup-loading__title">Идет загрузка...</div><div class="popup-loading__icon"></div></div>');
	$('.popup-message').addClass('active').fadeIn(300);
}
function showMessageByClass(ms){
	$('.popup').hide();
	popupOpen('message.'+ms,'');
}
function showMessage(html){
	$('.popup-loading').remove();
	$('.popup-message-body').show().html(html);
}
function clearForm(form){
	$.each(form.find('.input'), function(index, val) {
			$(this).removeClass('focus').val($(this).data('value'));
			$(this).parent().removeClass('focus');
		if($(this).hasClass('phone')){
			maskclear($(this));
		}
	});
}
function addError(input){
		input.addClass('err');
		input.parent().addClass('err');
		input.parent().find('.form__error').remove();
	if(input.hasClass('email')){
			var error='';
		if(input.val()=='' || input.val()==input.attr('data-value')){
			error=input.data('error');
		}else{
			error=input.data('error');
		}
		if(error!=null){
			input.parent().append('<div class="form__error">'+error+'</div>');
		}
	}else{
		if(input.data('error')!=null && input.parent().find('.form__error').length==0){
			input.parent().append('<div class="form__error">'+input.data('error')+'</div>');
		}
	}
	if(input.parents('.select-block').length>0){
		input.parents('.select-block').parent().addClass('err');
		input.parents('.select-block').find('.select').addClass('err');
	}
}
function addErrorByName(form,input__name,error_text){
		var input=form.find('[name="'+input__name+'"]');
	input.attr('data-error',error_text);
	addError(input);
}
function addFormError(form, error_text){
	form.find('.form__generalerror').show().html(error_text);
}
function removeFormError(form){
	form.find('.form__generalerror').hide().html('');
}
function removeError(input){
	input.removeClass('err');
	input.parent().removeClass('err');
	input.parent().find('.form__error').remove();

	if(input.parents('.select-block').length>0){
		input.parents('.select-block').parent().removeClass('err');
		input.parents('.select-block').find('.select').removeClass('err').removeClass('active');
		//input.parents('.select-block').find('.select-options').hide();
	}
}
function removeFormErrors(form){
	form.find('.err').removeClass('err');
	form.find('.form__error').remove();
}
function maskclear(n){
	if(n.val()==""){
		n.inputmask('remove');
		n.val(n.attr('data-value'));
		n.removeClass('focus');
		n.parent().removeClass('focus');
	}
}
function searchselectreset() {
	$.each($('.select[data-type="search"]'), function(index, val){
			var block=$(this).parent();
			var select=$(this).parent().find('select');
		if($(this).find('.select-options__value:visible').length==1){
			$(this).addClass('focus');
			$(this).parents('.select-block').find('select').val($('.select-options__value:visible').data('value'));
			$(this).find('.select-title__value').val($('.select-options__value:visible').html());
			$(this).find('.select-title__value').attr('data-value',$('.select-options__value:visible').html());
		}else if(select.val()==''){
			$(this).removeClass('focus');
			block.find('input.select-title__value').val(select.find('option[selected="selected"]').html());
			block.find('input.select-title__value').attr('data-value',select.find('option[selected="selected"]').html());
		}
	});
}
	var isMobile = {Android: function() {return navigator.userAgent.match(/Android/i);},BlackBerry: function() {return navigator.userAgent.match(/BlackBerry/i);},iOS: function() {return navigator.userAgent.match(/iPhone|iPad|iPod/i);},Opera: function() {return navigator.userAgent.match(/Opera Mini/i);},Windows: function() {return navigator.userAgent.match(/IEMobile/i);},any: function() {return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());}};
if(isMobile.any()){}
	
if(location.hash){
		var hsh=location.hash.replace('#','');
	if($('.popup-'+hsh).length>0){
		popupOpen(hsh);
	}else if($('div.'+hsh).length>0){
		$('body,html').animate({scrollTop:$('div.'+hsh).offset().top,},500, function(){});
	}
}
$('.wrapper').addClass('loaded');

	var act="click";
if(isMobile.iOS()){
	var act="touchstart";
}


//ZOOM
if($('.gallery').length>0){
	baguetteBox.run('.gallery', {
		// Custom options
	});
}
/*
CLOUD-ZOOM
<a rel="position:'right',adjustX:25,adjustY:0,Width: 432" href="img/product/zoom.jpg" class="cloud-zoom product-main-mainimage__item">
	<img class="cloudzoom-gallery" src="img/product/zoom.jpg" alt="" />
</a>
*/




//POPUP
$('.pl').click(function(event) {
		var pl=$(this).attr('href').replace('#','');
		var v=$(this).data('vid');
	popupOpen(pl,v);
	return false;
});
function popupOpen(pl,v){
	$('.popup').removeClass('active').hide();
	if(!$('.header-menu').hasClass('active')){
		$('body').data('scroll',$(window).scrollTop());
	}
	if(!isMobile.any()){
		$('body').css({paddingRight:$(window).outerWidth()-$('.wrapper').outerWidth()}).addClass('lock');
		$('.pdb').css({paddingRight:$(window).outerWidth()-$('.wrapper').outerWidth()});
	}else{
		setTimeout(function() {
			$('body').addClass('lock');
		},300);
	}
	history.pushState('', '', '#'+pl);
	if(v!='' && v!=null){
		$('.popup-'+pl+' .popup-video__value').html('<iframe src="https://www.youtube.com/embed/'+v+'?autoplay=1"  allow="autoplay; encrypted-media" allowfullscreen></iframe>');
	}
	$('.popup-'+pl).fadeIn(300).delay(300).addClass('active');

	if($('.popup-'+pl).find('.slick-slider').length>0){
		$('.popup-'+pl).find('.slick-slider').slick('setPosition');
	}
}
function openPopupById(popup_id){
	$('#'+popup_id).fadeIn(300).delay(300).addClass('active');
}
function popupClose(){
	$('.popup').removeClass('active').fadeOut(300);
	if(!$('.header-menu').hasClass('active')){
		if(!isMobile.any()){
			setTimeout(function() {
				$('body').css({paddingRight:0});
				$('.pdb').css({paddingRight:0});
			},200);
			setTimeout(function() {
				$('body').removeClass('lock');
				$('body,html').scrollTop(parseInt($('body').data('scroll')));
			},200);
		}else{
			$('body').removeClass('lock');
			$('body,html').scrollTop(parseInt($('body').data('scroll')));
		}
	}
	$('.popup-video__value').html('');

	

	history.pushState('', '', window.location.href.split('#')[0]);
}
$('.popup-close,.popup__close').click(function(event) {
	popupClose();
	return false;
});
$('.popup').click(function(e) {
	if (!$(e.target).is(".popup>.popup-table>.cell *") || $(e.target).is(".popup-close") || $(e.target).is(".popup__close")) {
		popupClose();
		return false;
	}
});
$(document).on('keydown',function(e) {
	if(e.which==27){
		popupClose();
	}
});

//function ibg(){
//	$.each($('.ibg'), function(index, val) {
//		if($(this).find('img').length>0){
//			$(this).css('background-image','url("'+$(this).find('img').attr('src')+'")');
//		}
//	});
//}
//ibg();
	
//Клик вне области
$(document).on('click touchstart',function(e) {
	if (!$(e.target).is(".select *")) {
		$('.select').removeClass('active');
	};
});

$('body').on('click','.tab__navitem',function(event) {
			var eq=$(this).index();
		if($(this).hasClass('parent')){
			var eq=$(this).parent().index();
		}
	if(!$(this).hasClass('active')){
			$(this).closest('.tabs').find('.tab__navitem').removeClass('active');
			$(this).addClass('active');
			$(this).closest('.tabs').find('.tab__item').removeClass('active').eq(eq).addClass('active');
		if($(this).closest('.tabs').find('.slick-slider').length>0){
			$(this).closest('.tabs').find('.slick-slider').slick('setPosition');
		}
	}
});
$.each($('.spoller.active'), function(index, val) {
	$(this).next().show();
});
$('body').on('click','.spoller',function(event) {
	if($(this).hasClass('mob') && !isMobile.any()){
		return false;
	}
	if($(this).hasClass('closeall') && !$(this).hasClass('active')){
		$.each($(this).closest('.spollers').find('.spoller'), function(index, val) {
			$(this).removeClass('active');
			$(this).next().slideUp(300);
		});
	}
	$(this).toggleClass('active').next().slideToggle(300,function(index, val) {
			if($(this).parent().find('.slick-slider').length>0){
				$(this).parent().find('.slick-slider').slick('setPosition');
			}
	});
	return false;
});



function scrolloptions(){
		var scs=100;
		var mss=50;
		var bns=false;
	if(isMobile.any()){
		scs=10;
		mss=1;
		bns=true;
	}
	var opt={
		cursorcolor:"#fff",
		cursorwidth: "4px",
		background: "",
		autohidemode:true,
		cursoropacitymax: 0.4,
		bouncescroll:bns,
		cursorborderradius: "0px",
		scrollspeed:scs,
		mousescrollstep:mss,
		directionlockdeadzone:0,
		cursorborder: "0px solid #fff",
	};
	return opt;
}
function scroll(){
	$('.scroll-body').niceScroll('.scroll-list',scrolloptions());
}
if(navigator.appVersion.indexOf("Mac")!=-1){
}else{
	if($('.scroll-body').length>0){scroll();}
}

/*
function scrollwhouse(){
		var scs=100;
		var mss=50;
		var bns=false;
	if(isMobile.any()){
		scs=10;
		mss=1;
		bns=true;
	}
	var opt={
		cursorcolor:"#afafaf",
		cursorwidth: "5px",
		background: "",
		autohidemode:false,
		railalign: 'left',
		cursoropacitymax: 1,
		bouncescroll:bns,
		cursorborderradius: "0px",
		scrollspeed:scs,
		mousescrollstep:mss,
		directionlockdeadzone:0,
		cursorborder: "0px solid #fff",
	};
	return opt;
}
$('.whouse-content-body').niceScroll('.whouse-content-scroll',scrollwhouse());
$('.whouse-content-body').scroll(function(event) {
		var s=$(this).scrollTop();
		var r=Math.abs($(this).outerHeight()-$('.whouse-content-scroll').outerHeight());
		var p=s/r*100;
	$('.whouse-content__shadow').css({opacity:1-1/100*p});
});
*/


if($('.t,.tip').length>0){
	tip();
}
function tip(){
	$('.t,.tip').webuiPopover({
		placement:'top',
		trigger:'hover',
		backdrop: false,
		//selector:true,
		animation:'fade',
		dismissible: true,
		padding:false,
		//hideEmpty: true
		onShow: function($element) {},
		onHide: function($element) {},
	}).on('show.webui.popover hide.webui.popover', function(e){
		$(this).toggleClass('active');
	});
}

///////////////////ibg for IE
function ibg() {
   if (isIE()) {
      let ibg = document.querySelectorAll(".ibg");
      for (var i = 0; i < ibg.length; i++) {
         if (ibg[i].querySelector('img') && ibg[i].querySelector('img').getAttribute('src') != null) {
            ibg[i].style.backgroundImage = 'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
         }
      }
   }
}
ibg();

////////////////////////Выпадашка клик-показать, клик-спрятать
   let user_icon = document.querySelector('.user-header__icon');
   user_icon.addEventListener("click", function(e){
      let user_menu = document.querySelector('.user-header__menu');
      user_menu.classList.toggle('_active')
   });

////////////////////////////////При клике проподает выпадашка
   document.documentElement.addEventListener("click", function(e){
      if(!e.target.closest('.user-header')){
         let user_menu = document.querySelector('.user-header__menu');
         user_menu.classList.remove('_active');
      }
   });

  
////////////////////////////////Слайдер Slick
if($('.mainslider').length>0){
	$('.mainslider').slick({
		//autoplay: true,
		autoplaySpeed: 3000,
		//infinite: false,
		dots: true,
		arrows: false,
		accessibility:false,
		slidesToShow:1,
		speed: 500,
		//slidesToScroll:1,
		//initialSlide:0,
		// работает вместе с align-items: flex-start;
		adaptiveHeight:true,
		easing:'ease',
		
		//Название класса большого слайдера
		//asNavFor:'',
		//appendDots:
		//appendArrows:$('.mainslider-arrows .container'),
		//pauseOnFocus:true,
		//pauseOnHover:true,
		//pauseOnDotsHover:true,
		//centerMode:false,
		//variableWidth:true,
		
		//Количество рядов
		//row:3,
		
		//Количество слайдов в ряду: по умолчанию 1
		//slidesPerRow:2,
		
		vertical:true,
		verticalSwiping:true,
		
		//Скорость слайдов при нажатии
		//waitForAnimate:true,
		nextArrow:'<button type="button" class="slick-next"></button>',
		prevArrow:'<button type="button" class="slick-prev"></button>',
		responsive: [
		{
			breakpoint: 768,
			settings: {
				//slidesToShow:2,
			}
		},
			{
			breakpoint: 480,
			settings: {
				//slidesToShow:2,
			}
		}
		
		]
	});
	
	//большой слайдер
	$('.mainslider').slick({
		fade:true,
	});
	
	$('.main-slider__body').on('beforeChange', function(event,slick,currentSlide,nextSlide){
      console.log(currentSlide);
   });
   $('.main-slider__body').on('afterChange', function(event,slick,currentSlide){
      console.log(currentSlide);
   });

   //$('.slider').slick('slickPrev');
   //$('.slider').slick('slickNext');

//////////Вызвать любой елемент (класс) для управление
   $('.control-main-slider__arrow_prev').click(function(event){
      $('.main-slider__body').slick('slickPrev');
   });
   $('.control-main-slider__arrow_next').click(function(event){
      $('.main-slider__body').slick('slickNext');
   });
}
//////////////////////////////////////////////////////////////	
	



});
