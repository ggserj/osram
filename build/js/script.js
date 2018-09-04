$(document).ready(function(){

//........................................home.........................................

	var burger = $('.nav-burger');
	var navMenu = $('.nav_ul-wrap');

	burger.click(function() {
		burger.prop('disabled', 'true');
		burger.toggleClass('nav-burger__active');
		navMenu.slideToggle(250);
		setTimeout(function () { burger.removeAttr('disabled') }, 250);
	});

	$('.advantages_slider').slick({
		infinite: true,
		slidesToShow: 4,
		slidesToScroll: 1,
		autoplay: false,
		cssEase: 'ease-out',
		speed: 300,
		responsive: [
			{breakpoint: 1280,
				settings: {
					slidesToShow: 3
				}},
			{breakpoint: 940,
				settings: {
					slidesToShow: 2
				}},
			{breakpoint: 665,
				settings: {
					slidesToShow: 1
				}}
		]
	});

//........................................hits.........................................

	var hitsFilter = $('select[name="hits-filter"]');

	function showHits() {
		var selection = hitsFilter.val();
		var incandescent = $('#hits_incandescent');
		var halogen = $('#hits_halogen');

		if (selection === "incandescent") {
			incandescent.css('display','flex');
			halogen.css('display','none');
		}
		else {
			incandescent.css('display','none');
			halogen.css('display','flex');
		}
	}

	showHits();

	hitsFilter.change(function(){
		showHits();
	});

//........................................calculator.........................................

	var data = {
		lamps: {
			simple: {
				'Рубли': {
					1: 12650,
					2: 25300,
					3: 37950,
					4: 50600,
					5: 63250
				},
				'Ватты': {
					1: 6000,
					2: 12000,
					3: 18000,
					4: 24000,
					5: 30000
				}
			},
			osram: {
				'Рубли': {
					1: 2806,
					2: 4298,
					3: 5790,
					4: 7282,
					5: 8774
				},
				'Ватты': {
					1: 760,
					2: 1520,
					3: 2280,
					4: 3040,
					5: 3800
				}
			}
		},
		duration: 5000,
		cases: {
			'год': {
				1: 'год',
				2: 'года',
				3: 'года',
				4: 'года',
				5: 'лет'
			}
		}
	};

// ресет
	var costValue = $('.calculator-item_value');
	var timelinePart = $('.calculator-timeline_part');
	var timelinePartFirst = $('.calculator-timeline_part:nth-child(1)');
	var calculatorTotal = $('.calculator-total');
	var calculatorVisual = $('.calculator-item_visual');

	function reset() {
		costValue.text('0');
		calculatorVisual.css('width', '0%');
		timelinePart.removeClass('calculator-timeline_part__active');
		timelinePartFirst.addClass('calculator-timeline_part__active');
		calculatorTotal.removeClass('calculator-total__active');
	}

// слайдер единиц измерения
	var units;
	var checkbox = $('.calculator-switch_checkbox');
	var switchText = $('.calculator-item_text');
	var switchUnits = $('.calculator-item_units');

	function changeUnits() {
		if (checkbox.is(':checked')) {
			units = 'Ватты';
			switchText.text('Потреблено ватт');
			switchUnits.text('Вт');
		}
		else {
			units = 'Рубли';
			switchText.text('Потрачено рублей');
			switchUnits.html('&#8381;');
		}
		reset();
	}
	changeUnits();
	checkbox.change(function(){
		changeUnits();
	});

// анимация линий
	var lineSimple = $('.calculator-item_visual__simple');
	var lineOsram = $('.calculator-item_visual__osram');

	function animateLines() {
		var simpleEndWidth = 100;
		var osramEndWidth = (simpleEndWidth * data.lamps.osram['Рубли'][5] / data.lamps.simple['Рубли'][5]).toFixed();
		lineSimple.animate({
			width: simpleEndWidth + '%'
		}, data.duration);
		lineOsram.animate({
			width: osramEndWidth + '%'
		}, data.duration);
	}

//клик по кнопке старт

	var startButton = $('.calculator_btn');
	var calculatorSwitch = $('.calculator-switch');
	var timeline = $('.calculator-timeline');
	var stepsNumber = 5;
	var stepDuration = data.duration / stepsNumber;
	var costValueSimple = $('.calculator-item_value__simple');
	var costValueOsram = $('.calculator-item_value__osram');

	startButton.click(function() {
		startButton.addClass('calculator_btn__disabled');
		calculatorSwitch.addClass('calculator-switch__disabled');
		timeline.addClass('calculator-timeline__disabled');
		reset();

		function gotoStep(i) {
			costValueSimple.prop('number', costValueSimple.text()).animateNumber({
				number: data.lamps.simple[units][i],
				numberStep: $.animateNumber.numberStepFactories.separator(' ')
			}, stepDuration);
			costValueOsram.prop('number', costValueOsram.text()).animateNumber({
				number: data.lamps.osram[units][i],
				numberStep: $.animateNumber.numberStepFactories.separator(' ')
			}, stepDuration);

			if (i > stepsNumber) {
				startButton.removeClass('calculator_btn__disabled');
				calculatorSwitch.removeClass('calculator-switch__disabled');
				timeline.removeClass('calculator-timeline__disabled');
				calculatorTotal.addClass('calculator-total__active');
				setTotal(i - 1);
				return;
			}

			setTimeout(function() {
				$('.calculator-timeline_part:nth-child(' + (i + 1) + ')').addClass('calculator-timeline_part__active');
				gotoStep(i + 1);
			}, stepDuration);
		}

		gotoStep(1);
		animateLines();
	});

// клик по линии времени

	function setTotal(years) {
		var economy = data.lamps.simple['Рубли'][years] - data.lamps.osram['Рубли'][years];
		$('.calculator-total_years').text(years);
		$('.calculator-total_word').text(data.cases['год'][years]);
		$('.calculator-total_value').text(economy);
		calculatorTotal.addClass('calculator-total__active');
	}

	function setItemsCost(years) {
		costValueSimple.text(data.lamps.simple[units][years]);
		costValueOsram.text(data.lamps.osram[units][years]);
	}

	function setLinesSize(years) {
		var simpleEndWidth = (data.lamps.simple['Рубли'][years] / data.lamps.simple['Рубли'][5] * 100).toFixed();
		var osramEndWidth = (data.lamps.osram['Рубли'][years] / data.lamps.simple['Рубли'][5] * 100).toFixed();
		lineSimple.css('width', simpleEndWidth + '%');
		lineOsram.css('width', osramEndWidth + '%');
	}

	function setYears(years) {
		timelinePart.removeClass('calculator-timeline_part__active');
		for (i = 0; i <= years; i++) {
			timelinePart.eq(i).addClass('calculator-timeline_part__active');
		}
		setTotal(years);
		setItemsCost(years);
		setLinesSize(years)
	}

	$('.calculator-timeline_part:not(:eq(0))').click(function() {
		setYears(timelinePart.index($(this)));
	});

//........................................delivery.........................................

	$('.delivery-item').click(function() {
		$(this).addClass('delivery-item__active');
	});
	$('.delivery-item').mouseleave(function() {
		$(this).removeClass('delivery-item__active');
	});

//........................................about.........................................

// отключение летающих лампочек на мобильном
	if ($(window).width() > 767) {
		skrollr.init({forceHeight: false});
	}
	else skrollr.init().destroy();

//........................................numbers.........................................

	$('#numbers').waypoint(function() {
		$('.numbers-item_number').each(function() {
			var number = $(this).attr('data-to');
			$(this).animateNumber({
				number: number
			}, 600);
		});
		this.destroy();
	}, {offset: 'bottom-in-view'});

//........................................certificates.........................................

	$('.certificates_slider').slick({
		infinite: true,
		slidesToShow: 3,
		slidesToScroll: 1,
		autoplay: false,
		cssEase: 'ease-out',
		speed: 300,
		arrows: true,
		responsive: [
			{breakpoint: 940,
				settings: {
					slidesToShow: 2
				}},
			{breakpoint: 665,
				settings: {
					slidesToShow: 1
				}}
		]
	});

//........................................reviews.........................................

	$('.reviews_slider').slick({
		infinite: false,
		slidesToShow: 2,
		slidesToScroll: 1,
		autoplay: false,
		cssEase: 'ease-out',
		speed: 300,
		arrows: true,
		responsive: [
			{breakpoint: 1199,
				settings: {
					slidesToShow: 1
				}}
		]
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
