 ///////////////////////////////////Менюха
// $('.header__menu-icon').click(function(event) {
//   $(this).toggleClass('active');
//   $('.header__menu').toggleClass('active');
//   if($(this).hasClass('active')){
//      $('body').data('scroll',$(window).scrollTop());
//   }
//      $('body').toggleClass('lock');
//   if(!$(this).hasClass('active')){
//      $('body,html').scrollTop(parseInt($('body').data('scroll')));
//   }
//});

////////////////////////////////////



//////////////////////////////Авто высота для картинки хедера
$(window).resize(function (event) {
   header();
 });
 function header() {
   var h = $(window).outerHeight();
   $(".header").css("min-height", h);
 }
 header();

 ////////////////////////////////////////Прилипающая менюха при скроле
   // var h_hght = 110; // высота шапки
   // var h_mrg = 15;     // отступ когда шапка уже не видна
  
   // $(function(){
   // $(window).scroll(function(){
   //    var top = $(this).scrollTop();
   //    var elem = $('.header__menu');
   //    if (top+h_mrg < h_hght) {
   //     elem.css('top', (h_hght-top));
   //    } else {
   //     elem.css('top', h_mrg);
   //     //elem.css('position', pos_ab);
   //    }   
   //  });
   // });

 //UP - кнопка плавно на вверх
$(window).scroll(function() {
   var w=$(window).width();
if($(window).scrollTop()>50){
   $('#up').fadeIn(300);
}else{
   $('#up').fadeOut(300);
}
});
$('#up').click(function(event) {
$('body,html').animate({scrollTop:0},600);
});

 ////////////////////////////////Переход по якорям
 $('.goto').click(function() {
   var el=$(this).attr('href').replace('#','');
   var offset=0;
$('body,html').animate({scrollTop:$('.'+el).offset().top+offset},500, function() {});

if($('.header__menu').hasClass('active')){
   $('.header__menu,.header__menu_link').removeClass('active');
   $('body').removeClass('lock');
}
return false;
});


 ////////////////////

 /////////////////////////////////////////////
 //1 пример
 $(function(){
   $("#phone1").mask("8(999) 999-9999");
 });
 //2 пример
 $("#date").mask("99.99.9999", {placeholder: "дд.мм.гггг" });
 $("#index").mask("999999", {placeholder: " " });
 //3
 $("#phone3").mask("8(999) 999-9999", {
   completed: function(){ alert("Вы ввели номер: " + this.val()); }
 });
 //4
 $("#number").mask("0.9?9");
 //5
 $.mask.definitions['~']='[+-]';
 $("#number2").mask("~9.99");
 $.mask.definitions['h']='[A-Fa-f0-9]';
 $("#color").mask("#hhhhhh");

   $(function() {
     function maskPhone() {
       var country = $('#country option:selected').val();
       switch (country) {
         case "ru":
           $("#phone").mask("+7(999) 999-99-99");
           break;
         case "ua":
           $("#phone").mask("+380(999) 999-99-99");
           break;
         case "by":
           $("#phone").mask("+375(999) 999-99-99");
           break;          
       }    
     }
     maskPhone();
     $('#country').change(function() {
       maskPhone();
     });
   });
 ////////////////Маски
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

///////////////////////
  /* Меню */
//  $('ul.header__menu-list a[href^="#"').click(function() {
//   var target = $(this).attr("href");
//   $("html, body").animate(
//     {
//       scrollTop: $(target).offset().top
//     },
//     500
//   );
//   $('ul.header__menu-list a[href^="#"').css({
//     //color: "#212121"
//   });
//   $(this).css({
//     color: "#004bee"
//   });
//   return false;
// });

  ////////////////////////////////Переход по якорям активным пунктом
//  $(document).ready(function(){
//      $("#menu").on("click","a", function (event) {
//          event.preventDefault();
//          var id  = $(this).attr('href'),
//              top = $(id).offset().top;
//          $('body,html').animate({scrollTop: top}, 1500);
//      });
//  });
 
// jQuery("document").ready(function($){
//      var nav = $('.nav-container');
//      $(window).scroll(function () {
//        if ($(this).scrollTop() > 136) {
//           nav.addClass("f-nav");
//         } else {
//            nav.removeClass("f-nav");
//        }
//      });
//   });
 
 // Cache selectors
// var lastId,
//     topMenu = $("#top-menu"),
//     topMenuHeight = topMenu.outerHeight()+15,
//     // All list items
//     menuItems = topMenu.find("a"),
//     // Anchors corresponding to menu items
//     scrollItems = menuItems.map(function(){
//       var item = $($(this).attr("href"));
//       if (item.length) { return item; }
//     });
 
 // Bind click handler to menu items
 // so we can get a fancy scroll animation
// menuItems.click(function(e){
//   var href = $(this).attr("href"),
//       offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
//   $('html, body').stop().animate({ 
//       scrollTop: offsetTop
//   }, 300);
//   e.preventDefault();
// });
 
 // Bind to scroll
// $(window).scroll(function(){
//    // Get container scroll position
//    var fromTop = $(this).scrollTop()+topMenuHeight;
    
//    // Get id of current scroll item
//    var cur = scrollItems.map(function(){
//      if ($(this).offset().top < fromTop)
//        return this;
//    });
//    // Get the id of the current element
//    cur = cur[cur.length-1];
//    var id = cur && cur.length ? cur[0].id : "";
    
//    if (lastId !== id) {
//        lastId = id;
//        // Set/remove active class
//        menuItems
//          .parent().removeClass("active")
//          .end().filter("[href='#"+id+"']").parent().addClass("active");
//    }                   
// });

// Dynamic Adapt v.1
	// HTML data-move="where(uniq class name),position(digi),when(breakpoint)"
	// e.x. data-move="item,2,992"
	// Andrikanych Yevhen 2020
	var move_array = [];
	var move_objects = document.querySelectorAll("[data-move]");

	if (move_objects.length > 0) {
		for (var _index10 = 0; _index10 < move_objects.length; _index10++) {
			var _el6 = move_objects[_index10];

			var data_move = _el6.getAttribute("data-move");

			if (data_move != "" || data_move != null) {
				_el6.setAttribute("data-move-index", _index10);

				move_array[_index10] = {
					parent: _el6.parentNode,
					index: index_in_parent(_el6)
				};
			}
		}
	}

	function dynamic_adapt() {
		var w = document.querySelector("body").offsetWidth;

		if (move_objects.length > 0) {
			for (var _index11 = 0; _index11 < move_objects.length; _index11++) {
				var _el7 = move_objects[_index11];

				var _data_move = _el7.getAttribute("data-move");

				if (_data_move != "" || _data_move != null) {
					var data_array = _data_move.split(",");

					var data_parent = document.querySelector("." + data_array[0]);
					var data_index = data_array[1];
					var data_bp = data_array[2];

					if (w < data_bp) {
						if (!_el7.classList.contains("js-move_done_" + data_bp)) {
							if (data_index > 0) {
								//insertAfter
								var actual_index = index_of_elements(data_parent)[data_index];
								data_parent.insertBefore(_el7, data_parent.childNodes[actual_index]);
							} else {
								data_parent.insertBefore(_el7, data_parent.firstChild);
							}

							_el7.classList.add("js-move_done_" + data_bp);
						}
					} else {
						if (_el7.classList.contains("js-move_done_" + data_bp)) {
							dynamic_adaptive_back(_el7);

							_el7.classList.remove("js-move_done_" + data_bp);
						}
					}
				}
			}
		}

		custom_adapt(w);
	}

	function dynamic_adaptive_back(el) {
		var index_original = el.getAttribute("data-move-index");
		var move_place = move_array[index_original];
		var parent_place = move_place["parent"];
		var index_place = move_place["index"];

		if (index_place > 0) {
			//insertAfter
			var actual_index = index_of_elements(parent_place)[index_place];
			parent_place.insertBefore(el, parent_place.childNodes[actual_index]);
		} else {
			parent_place.insertBefore(el, parent_place.firstChild);
		}
	}

	function index_in_parent(node) {
		var children = node.parentNode.childNodes;
		var num = 0;

		for (var _i2 = 0; _i2 < children.length; _i2++) {
			if (children[_i2] == node) return num;
			if (children[_i2].nodeType == 1) num++;
		}

		return -1;
	}

	function index_of_elements(parent) {
		var children = [];

		for (var _i3 = 0; _i3 < parent.childNodes.length; _i3++) {
			if (parent.childNodes[_i3].nodeType == 1 && parent.childNodes[_i3].getAttribute("data-move") == null) {
				children.push(_i3);
			}
		}

		return children;
	}

	window.addEventListener("resize", function (event) {
		dynamic_adapt();
	});
	dynamic_adapt();

	function custom_adapt(w) { }