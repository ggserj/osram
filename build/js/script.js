$(document).ready(function(){

//........................................home.........................................

	$('.advantages-slider').slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: true,
		cssEase: 'ease-out',
		speed: 300
	});

//........................................delivery.........................................
	$('.delivery-item').click(function() {
		$(this).addClass('delivery-item__active');
	});
	$('.delivery-item').mouseleave(function() {
		$(this).removeClass('delivery-item__active');
	});

//........................................about.........................................

	if ($(window).width() > 767) {
		skrollr.init({forceHeight: false});
	}
	else skrollr.init().destroy();

//........................................certificates.........................................

	$('.certificates-slider').slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: false,
		cssEase: 'ease-out',
		speed: 300,
		arrows: true
	});

//........................................reviews.........................................

	$('.reviews-slider').slick({
		infinite: false,
		slidesToShow: 2,
		slidesToScroll: 1,
		autoplay: false,
		cssEase: 'ease-out',
		speed: 300,
		arrows: true
	});

//........................................contacts.........................................

	// блокировка скролла на карте
	var map = $('#map');
	var mapWrap = $('#map-wrap');
	map.css('pointer-events', 'none');
	mapWrap.click(function () {
		map.css('pointer-events', 'auto');
	});
	map.mouseleave(function() {
		map.css('pointer-events', 'none');
	});


// карта
	ymaps.ready(init);
	function init(){
		var myMap = new ymaps.Map("map", {
			center: [55.839516, 37.5146503],
			zoom: 17
		});

		var myMark = new ymaps.Placemark([55.839516, 37.5146503], {
			hintContent: 'Туда не ходи, сюда ходи',
			balloonContent: '<h3>Главная лампочка</h3><p>Купи здесь, купи сейчас!</p>'
		});

		myMap.geoObjects.add(myMark);
		myMark.balloon.open();
	}





});
