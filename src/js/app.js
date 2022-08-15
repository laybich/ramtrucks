$(window).on('load', () => {
	const PATH = '/wa-apps/blog/themes/ramtrucks/';
	lazySizes.init();

	// ============================ <ADAPTIVE MENU> ============================
	function adaptMenu() {
		if (window.innerWidth < 992) {
			$('#more').parent().remove();
			return;
		}

		if (window.innerWidth < calcMenuWidth()) {
			// if #more does not exist
			if (!$('*').is('#more')) {
				const htmlCode =
					`<li class="nav__item">
						<a id="more" href="" class="nav__link">ещё</a>
					</li>`;
				$('.nav__list').append(htmlCode);
			}

			// hide items
			let i = $('.nav__item').length - 2;
			while (window.innerWidth < calcMenuWidth()) {
				$($('.nav__item')[i]).addClass('hiden');
				i--;
			}
		}
	}

	function calcMenuWidth() {
		let menuWidth =
			$('.nav__list').width() +
			$('.secondary-navigation__modelname').last().width();
			 
		return menuWidth;
	}

	$('html, body').on('click', 'body, #more', e => {
		if (e.target == $('#more')[0]) {
			e.preventDefault();
			// opacity
			let o = Number($('.nav__item.hiden').css('opacity'));
			$('.nav__item.hiden').css('opacity', Number(!o));
			// visibility
			let v = $('.nav__item.hiden').css('visibility');
			$('.nav__item.hiden').css('visibility', v == 'hidden' ? 'visible' : 'hidden');
			// top
			for (let i = 0; i < $('.nav__item.hiden').length;) {
				$($('.nav__item.hiden')[i]).css('top', ++i * 100 + '%');
			}
		}
		else {
			$('.nav__item.hiden').css('opacity', 0);
			$('.nav__item.hiden').css('visibility', 'hidden');
		}
	});

	adaptMenu();
	// ============================ </ADAPTIVE MENU> ===========================

	// ============================ <SCROLL EFFECTS> ============================
	// prop for each counter - counter should to animate
	$('.counter, .proggress-bar__inner').each((i, e) => {
		e.shouldCount = true;
	});
	$(window).on('scroll', () => {
		// Fix the index
		if ($('*').is('.secondary-navigation')) {
			if(window.scrollY >= 200) {
				$('.secondary-navigation').addClass('fix')
			} else {
				$('.secondary-navigation').removeClass('fix')
			}
		}
		// Choose active sticky-slider item
		$('.sticky-media__item').each((i, el) => {
			if ($(window).scrollTop() <= $(el).offset().top + ($(el).height()) / 2 - 100) {
				// remove active classes
				$(el).parent().find('.sticky-media__item').removeClass('sticky-media__item_active');
				// add active class to `el`
				$(el).addClass('sticky-media__item_active');

				// define target image
				const target = $(el).data('target');

				// remove active classes
				$(el).parent().parent().find('.sticky-media__image').removeClass('sticky-media__image_active');
				// choose active image
				$(`#${target}`).addClass('sticky-media__image_active');

				return false;
			}
		});

		// Choose active menu item
		$('.nav__link[href^="#"]').each((i, el) => {
			const target = $(el).attr('href');
			if ($(window).scrollTop() >= $(target).offset().top - 57) {
				// remove active classes
				$('.nav__item').removeClass('nav__item_active');
				// add active class to `el` parent
				$(el).parent().addClass('nav__item_active');
			}
		});
		
		// count each counter
		$('.counter').each((i, counter) => {
			// count if it was scrolled and it wasn't counted
			if ($(window).scrollTop() > $(counter).offset().top - $(window).height() * 0.9 && counter.shouldCount) {
				counter.shouldCount = false;
				
				$(counter).prop('Counter', 0).animate({
					Counter: $(counter).text()
				}, {
					duration: 1000,
					easing: 'swing',
					step: now =>  $(counter).html(
						`${new Intl.NumberFormat().format(Math.ceil(now))}
						<span class="feature-highlight__keystat-suffix">${$(counter).data('suffix-value') || ''}</span>`
					),
					done: () => $(counter).html(
						`${new Intl.NumberFormat().format($(counter).data('end'))}
						<span class="feature-highlight__keystat-suffix">${$(counter).data('suffix-value') || ''}</span>`
					)
				});
			}
		});
		// count each counter
		$('.proggress-bar__inner').each((i, counter) => {
			// count if it was scrolled and it wasn't counted
			if ($(window).scrollTop() > $(counter).offset().top - $(window).height() && counter.shouldCount) {
				counter.shouldCount = false;
				
				$(counter).prop('Counter', 0).animate({
					Counter: $(counter).css('max-width').slice(0,-1)
				}, {
					duration: 2000,
					easing: 'swing',
					step: now =>  $(counter).css('max-width', now + '%')
				});
			}
		});
	})
	// ============================ </SCROLL EFFECTS> ============================

	// ============================ <SMOOTH TRANSITIONS> ============================
	$('a[href^="#"]').on('click', e => {
		// prevent default events
		e.preventDefault();
		
		// define target what you want to see
		const target = $(e.target).attr('href');
		
		// define Y coordinate of target
		const Y = $(target).offset().top - 47;
		// smooth scroll
		$('html, body').animate({scrollTop: Y}, 800);
	});
	$('a[href$="#"]').off('click');
	// ============================ </SMOOTH TRANSITIONS> ============================

	// ============================ <OWLCAROUSEL> ============================
	$('.cars-carousel__wrapper').owlCarousel({
		loop: false,
		nav: true,
		dots: false,
		lazyLoad: true,
		responsive: {
			0: {
				items: 1
			},
			576: {
				items: 3
			},
			993: {
				items: 4
			}
		}
	});
	
	$('.blurb-rail__list.owl-carousel').owlCarousel({
		lazyLoad: true,
		responsive: {
			0: {
				items: 1,
				center: true,
				dots: true,
				nav: false
			},
			993: {
				items: 4,
				center: false,
				dots: false,
				nav: true
			}
		}
	});
	const owl = $('.owl-carousel').owlCarousel({
		loop: true,
		nav: true,
		items: 1,
		lazyLoad: true,
		autoplay: true,
		autoplayHoverPause: true,
		autoHeight: true
	});
	// create pause button
	$(document.body).on('click', '[data-play="pause"]', e => {
		owl.trigger('play.owl.autoplay',[1000]);
		$(e.target).attr('data-play', 'play');
		$(e.target).toggleClass('_icon-pause');
		$(e.target).toggleClass('_icon-play-2');
	});
	$(document.body).on('click', '[data-play="play"]', e => {
		owl.trigger('stop.owl.autoplay');
		$(e.target).attr('data-play', 'pause');
		$(e.target).toggleClass('_icon-play-2');
		$(e.target).toggleClass('_icon-pause');
	});

	if ($(window).width() <= 992) {
		// transform #awards section to owl-carousel
		$('#awards .blurb-rail__list').addClass('owl-carousel')
		var awards = $('#awards .blurb-rail__list').owlCarousel({
			nav: false,
			items: 1,
			dots: true,
			lazyLoad: true,
			center: true
		});
	}

	// change #awards section on resize window
	$(window).on('resize', () => {
		if ($(window).width() <= 992) {
			// transform #awards section to owl-carousel
			$('#awards .blurb-rail__list').addClass('owl-carousel');
			awards = $('#awards .blurb-rail__list').owlCarousel({
				nav: false,
				items: 1,
				dots: true,
				lazyLoad: true,
				center: true
			});
		} else if (awards) {
			// destroy carousel
			awards.trigger('destroy.owl.carousel');
		}
		adaptMenu();
	});
	// ============================ </OWLCAROUSEL> ============================

	// ============================ <AUDIO> ============================
	const audio = new Audio(`${PATH}storage/TRXEngine.mp3`);
	audio.addEventListener('ended', () => {
		audio.currentTime = 0;
		$('.feature-highlight__link-img').attr('src', `${PATH}img/TRX-Performance-Engine-Start-1.png`);
	})
	$('#turn-audio').on('click', e => {
		// prevent default events
		e.preventDefault();

		if (audio.paused) {
			audio.play();
			$('.feature-highlight__link-img').attr('src', `${PATH}img/TRX-Performance-Engine-Start-3.png`);
		} else {
			audio.pause();
			$('.feature-highlight__link-img').attr('src', `${PATH}img/TRX-Performance-Engine-Start-1.png`);
		}
	})
	// ============================ </AUDIO> ============================

	// pannellum
	$('#interior-360').on('click', () => {
		$('#interior-360').addClass('loaded');
		pannellum.viewer('panorama', {
			'default': {
				"type": "equirectangular",
				'firstScene': 'gtx',
				'authorURL': 'https://www.fl.ru/users/supermatvij/portfolio/',
				'sceneFadeDuration': 1000,
				'autoLoad': true,
				'autoRotate': 2,
				'showZoomCtrl': false,
				'keyboardZoom': false,
				'mouseZoom': false,
				'panorama': `${PATH}img/Interior-1-Pre_Runner.jpg`
			},
			'scenes': {
				'gtx': {
					'title': 'Каснитесь или используйте W, A, S, D клавиши',
					'hfov': 100,
					'pitch': 0,
					'yaw': 0,
					'northOffset': 289,
					'hotSpots': [
						{'pitch': -14,'yaw': 39,'type': 'info','text': 'ПРЕМИУМ МАТЕРИАЛЫ'},
						{'pitch': -27,'yaw': -16,'type': 'info','text': 'ПЕРЕКЛЮЧАТЕЛЬ ПЕРЕДАЧИ'},
						{'pitch': -13,'yaw': 8.5,'type': 'info','text': '12-ДЮЙМОВЫЙ ТАЧСКРИН'},
						{'pitch': -44,'yaw': 40,'type': 'info','text': 'ПОДКЛАДКИ ДЛЯ СИДЕНИЯ'}
					]
				}
			}
		});
		$('#interior-360').off('click');
	});

	// gallery page
	$('#gallery-page .alfagallery__link').on('click', e => {
		if ($(e.target).attr('data-target') === 'all') {
			$('#gallery-page [data-category]').show();
			$('#gallery-page [data-category]').attr('data-fancybox', 'alfagallery');
		} else {
			$('#gallery-page [data-category]').hide();
			$('#gallery-page [data-category]').each((i, el) => {
				$(el).attr('data-fancybox', $(el).attr('data-category'));
			})
		}
		$(`#gallery-page [data-category='${$(e.target).attr('data-target')}']`).show();

		$('#gallery-page .alfagallery__link').removeClass('active');
		$(e.target).addClass('active');
	});

	// twenty
	$('#twenty').twentytwenty();

	// accordeon
	$(document.body).on('click', '.accordeon__link', function(e) {
		e.preventDefault();

		$(this).parent().find('.accordeon__desc').toggleClass('expanded');
		$(this).parent().find('._icon-chevron-down').toggleClass('_icon-chevron-up');
	});

	$('#5-8').hide();
	$(document.body).on('click', '.compare__arrow_right', e => {
		e.preventDefault();
		$('#1-4').hide();
		$('#5-8').show();
	})
	$(document.body).on('click', '.compare__arrow_left', e => {
		e.preventDefault();
		$('#1-4').show();
		$('#5-8').hide();
	})

















	// specs
	const MODEL_NAME = 0;
	const COMPLECTATION = 1;
	const DRIVE = 2;
	const CABINE = 3;
	const BOX = 4;
	const PRICE = 5;
	const E_MODEL = 6;
	const E_COLOR = 7;
	const I_MODEL = 8;
	const I_COLOR = 9;
	const HIGHLIGHTS = 10;
	const ACCORDEON = 11;

	const S_SPECS = 0x0;
	const S_EXTERIOR = 0x1;
	const S_INTERIOR = 0x2;
	const S_HIGHLIGHTS = 0x3;

	const CONFIGURATOR = 0x0;
	const ENCYCLOPEDIA = 0x1;

	const isChassis = $(document.body).find('.ram-chassis-cab')[0];

	class Config {
		/** @param {string} subject */
		constructor(subject) {
			/** @type {array} */
			/** !Array<Array> */ this.data = [];
			/** @type {Map<number, Vehicle>} */
			/** !Map<Vehicle> */this.archive = new Map;
			/** @type {number} */
			this.activeCar = -1;
			/** @type {string} */
			this.printArea = '.specs__info';
			/** @type {string} */
			this.drawSubject = subject;
			/** @type {number} */
			this.state = subject === ENCYCLOPEDIA ? S_SPECS : S_EXTERIOR;

			this.init();
		}

		init() {
			console.info('Configurator initialization...');

			if (isChassis) {
				this.loadVehicles(`${PATH}storage/ram-chassis-cab.json`)
			} else {
				this.loadVehicles(`${PATH}storage/ram-x500.json`);
			}

			// Add initial vehicle
			$('.cars-carousel__item').first().addClass('active');
			const id = Number($('.cars-carousel__item').first().attr('id'));
			this.addCar(id);
			this.activeCar = id;

			this.print(id);
			this.setCallbacks();
		}

		/** @param {string} filePath */
		loadVehicles(filePath) {
			console.info('load vihecles...');

			let xhr = new XMLHttpRequest()
			xhr.open('GET', filePath, false)
			xhr.send()

			if (xhr.status == 200) {
				this.data = JSON.parse(xhr.responseText).Specs;
			} else {
				console.error(xhr.status + ': ' + xhr.statusText);
			}
		}

		/** @param {number} carID */
		print(carID) {
			console.info('output vehicle data...');

			switch (this.drawSubject) {
			case CONFIGURATOR:
				this.trims(carID);
				break;
			case ENCYCLOPEDIA:
				this.specs(carID);
				break;
			}
		}

		/** @param {number} carID */
		trims(carID) {
			let car = this.getCar(carID);

			if (!car) {
				throw Error('Couldn\'t find a vehicle with ID: ' + carID);
			}

			let set = car.getSet();

			$(this.printArea).append(`
			<div class="row">
				<div class="col-lg-7 col-md-12">
					<!-- description of vehicle -->
					<h2 class="specs__complect">
						${car.model}&nbsp;
						${car.complect}&nbsp;
						${set.cab}&nbsp;
						${set.drive}&nbsp;
						${set.box}&nbsp;
						см. кузов
					</h2>
				</div>

				<div class="col-lg-5 col-md-12">
					<!-- infoblocks -->
					<ul class="specs__tabs">
						<li class="specs__tabs-item active">
							<a class="specs__tabs-link" href="#" data-target="exterior">
								Экстерьер
							</a>
						</li>
						<li class="specs__tabs-item">
							<a class="specs__tabs-link" href="#" data-target="interior">
								Интерьер
							</a>
						</li>
						<li class="specs__tabs-item">
							<a class="specs__tabs-link" href="#" data-target="highlights">
								Особенности
							</a>
						</li>
					</ul>
				</div>

				<!-- exterior model -->
				<div id="exterior" class="col-sm-12 feature-carousel__item" style="position:static">
					<img class="specs__vehicle lazyload" src="${PATH}img/loader.gif" data-src="${set.eModel}" alt="">
				</div>

				<!-- interior model -->
				<div id="interior" class="col-sm-12 feature-carousel__item" style="position:static">
					<div id="interiordesign" style="height:400px"></div>
				</div>

				<!-- highlights slider -->
				<div id="highlights" class="col-sm-12 feature-carousel__item" style="position:static">
					<div id="highlights-slider" class="owl-carousel"></div>
				</div>
			</div>

			<div class="row specs__options">

				<!-- available colors -->
				<div class="col-md-6">
					<h3 class="specs__options-label">Однотонные цвета экстерьера</h3>
					<div class="colors"></div>
				</div>
				<div class="col-md-4 col-md-offset-2 b-left">
					<h3 class="specs__options-label">Опции</h3>

					<!-- drive option -->
					<label for="drive" class="specs__label ${set.drive === '4x2' ? 'active' : ''}">
						4x2
					</label>
					<input id="drive" class="specs__checkbox" type="checkbox">
					<label for="drive" class="specs__label ${set.drive === '4x4' ? 'active' : ''}">
						4x4
					</label>

					<!-- cab/box option -->
					<div class="select-fix">
						<select id='cab' class='specs__select'></select>
					</div>
				</div>
			</div>
			`)

			// Init select of sets
			for (let i = 0; i < car.sets.length; i++) {
				let cab = car.sets[i].cab;
				let box = car.sets[i].box;

				if ($('.specs__select').find(`option[value='${cab} ${box}']`).length > 0) {
					break;
				}

				$('.specs__select').append(`<option value='${cab} ${box}'>${cab} ${box} см. кузов</option>`);
			}

			$(`.specs__select option[ value='${set.cab} ${set.box}'`).prop('selected', true);

			let eColors = this.data[E_COLOR][car.id].split(' ');

			for (let i = 0; i < eColors.length; i++) {
				$('.colors').append(`<button class="colors__item" data-target="exteriorColor" id="${eColors[i]}">
					<img src="${PATH}img/colors/${eColors[i]}.jpg" alt="">
				</button>`);
			}
			
			if (this.state == S_INTERIOR) {
				pannellum.viewer('interiordesign', {
					'default': {
						'firstScene': 'test',
						'authorURL': 'https://www.fl.ru/users/supermatvij/portfolio/',
						'autoLoad': true,
						'showZoomCtrl': false,
						'keyboardZoom': false,
						'mouseZoom': false,
						'panorama': `${PATH}img/360/${set.iModel}-${this.data[I_COLOR][car.id].split(' ')[0]}.jpg`
					},
					'scenes': {
						'test': {
							'title': 'Коснитесь или используйте W, A, S, D клавиши',
							'hfov': 100,
							'pitch': 0,
							'yaw': 0,
							'northOffset': 289
						}
					}
				});
			}
			if (this.state == S_HIGHLIGHTS) {
				$('#highlights-slider').owlCarousel('destroy');
				$('#highlights-slider').html('');
				for (let slide of this.data[HIGHLIGHTS][car.id].split('++')) {
					$('#highlights-slider').append(`
					<div class="highlights-slide">
						<img class="highlights-slide__image" src="${PATH}img/highlights/${slide.split('+')[0]}">
						<h2 class="highlights-slide__title">${slide.split('+')[1]}</h2>
						<div class="highlights-slide__desc">${slide.split('+')[2]}</div>
					</div>
					`);
				}
				$('#highlights-slider').owlCarousel({
					loop:true,
					margin:10,
					nav:true,
					responsive:{
						0:{
								items:1
						}
					}
				});
				$('.specs__options').hide();
			} else {
				$('.specs__options').show();
			}
		}

		/** @param {number} carID */
		specs(carID) {
			let car = this.getCar(carID);

			if (!car) {
				throw Error('Couldn\'t find a vehicle with ID: ' + carID);
			}

			let set = car.getSet();

			// Markup
			$(this.printArea).append(`
			<div class="col-md-6">
				<div class="specs__model">
					${car.model}
				</div>
				<h2 class="specs__complect">
					${car.complect}
				</h2>

				<label for="drive" class="specs__label ${set.drive === '4x2' ? 'active' : ''}">
					4x2
				</label>
				<input id="drive" class="specs__checkbox" type="checkbox">
				<label for="drive" class="specs__label ${set.drive === '4x4' ? 'active' : ''}">
					4x4
				</label>

				<div class="select-fix">
					<select id='cab' class='specs__select'></select>
				</div>
			</div>

			<div class="col-md-6">
				<img class="specs__vehicle" src="${set.eModel}" alt="">
			</div>
			`);

			// Init select of sets
			for (let i = 0; i < car.sets.length; i++)
			{
			let cab = car.sets[i].cab;
			let box = car.sets[i].box;

			if ($('.specs__select').find(`option[value='${cab} ${box}']`).length > 0) {
				break;
			}

			$('.specs__select').append(`<option value='${cab} ${box}'>${cab} ${box} см. кузов</option>`);
			}

			$(`.specs__select option[ value='${set.cab} ${set.box}'`).prop('selected', true);

			this.drawAccordeon(carID);
		}

		/** @param {number} carID */
		drawAccordeon(carID) {
			let car = this.getCar(carID);

			if (!car) {
			throw Error('Couldn\'t find a vehicle with ID: ' + carID);
			}
			
			$('#accordeon').html('');
			for (let i = ACCORDEON; i < 329; i++) {
				// accordeon__item
				if (this.data[i][0] !== undefined
					&& this.data[i + 1][0] === undefined
					&& this.data[i - 1][0] === undefined
					&& this.data[i][1] === undefined) {
					$('#accordeon').append(
						`<li class="accordeon__item">
						<a href="#" class="accordeon__link">
							${this.data[i][0]}
							<span class="_icon-chevron-down"></span>
						</a>
						<div class="accordeon__desc row"></div>
						</li>`
					);
				}

				// stat title
				else if (this.data[i][0] != undefined &&
							this.data[i][1] == undefined) {
					let lastLi = $('#accordeon li').last();
					$(lastLi).find('.accordeon__desc').append(
						`<div class="col-sm-6">
						<span class="accordeon__stat">
							${this.data[i][0]}
						</span>
						</div>`
					);
				}

				// stats
				else if (this.data[i][0] != undefined &&
							this.data[i][car.offset] != undefined &&
							this.data[i][0][0] != '(') {
					let lastLi = $('#accordeon li').last();
					let lastCol = $(lastLi).find('.col-sm-6').last();
					$(lastCol).append(
						`<span class="accordeon__stat">
						<span class="not-bold">
							${this.data[i][0]}
						</span>
						<span class="accordeon__value">
							${typeof(this.data[i][car.id + car.offset]) === 'number' ? new Intl.NumberFormat().format(Math.round(this.data[i][car.id + car.offset] * 10) / 10) : this.data[i][car.id + car.offset]}
						</span>
						</span>`
					);
				}
			}

			// If accordeon has one block, expand it
			$('.accordeon__desc').each(function() {
				if ($(this).find('.col-sm-6').length === 1) {
					$(this).find('.col-sm-6').last().addClass('first-child');
				}
			});

			// Expand first section
			$('#accordeon li').first().find('.accordeon__desc').toggleClass('expanded');
			$('#accordeon li').first().find('._icon-chevron-down').toggleClass('_icon-chevron-up');
		}

		/** @param {number} carID */
		edit(carID) {
			let car = this.getCar(carID);

			if (!car) {
				throw Error('Couldn\'t find a vehicle with ID: ' + carID);
			}

			let set = car.getSet();

			// Изменяем заголовок
			$('.specs__complect').html(`
			${car.model}&nbsp;
			${car.complect}&nbsp;
			${set.cab}&nbsp;
			${set.drive}&nbsp;
			${set.box}&nbsp;
			см. кузов`);
				
			// Изменяем изображение
			if (this.state === S_EXTERIOR && car.getExteriorColor()) {
				this.setColor(this.activeCar, car.getExteriorColor());
			}

			$('.specs__vehicle').addClass('loading');
			$('.specs__vehicle').attr('src', set.eModel);
			$('.specs__vehicle').on('load', () => $('.specs__vehicle').removeClass('loading'));
			
			$('.specs__select').html('');
			for (let i = 0; i < car.sets.length; i++) {
				let cab = car.sets[i].cab;
				let box = car.sets[i].box;

				if ($('.specs__select').find(`option[value='${cab} ${box}']`).length > 0) {
					break;
				}

				$('.specs__select').append(`<option value='${cab} ${box}'>${cab} ${box} см. кузов</option>`);
			}

			$(`.specs__select option[ value='${set.cab} ${set.box}'`).prop('selected', true);
			
			// Изменяем цвета
			$('.colors').html('')

			let colors = [];
			if (this.state === S_EXTERIOR) {
				colors = this.data[E_COLOR][car.id].split(' ');
			} else if (this.state === S_INTERIOR) {
				colors = this.data[I_COLOR][car.id].split(' ');
			}

			for (let i = 0; i < colors.length; i++) {
				$('.colors').append(`
				<button class="colors__item" id="${colors[i]}">
					<img src="${PATH}img/colors/${colors[i]}.jpg" alt="">
				</button>`);
			}

			// Выбираем привод
			if (set.drive === '4x2') {
				$('#drive').prop('checked', false)
				$('.specs__label').first().addClass('active');
				$('.specs__label').last().removeClass('active');
			} else {
				$('#drive').prop('checked', true)
				$('.specs__label').last().addClass('active');
				$('.specs__label').first().removeClass('active');
			}

			if (this.state === S_INTERIOR) {
				pannellum.viewer('interiordesign', {
					'default': {
						'type': 'equirectangular',
						'firstScene': 'test',
						'authorURL': 'https://www.fl.ru/users/supermatvij/portfolio/',
						'autoLoad': true,
						'showZoomCtrl': false,
						'keyboardZoom': false,
						'mouseZoom': false,
						'panorama': `${PATH}img/360/${set.iModel}-${car.iColor}.jpg`
					},
					'scenes': {
						'test': {
							'title': 'Коснитесь или используйте W, A, S, D клавиши',
							'hfov': 100,
							'pitch': 0,
							'yaw': 0,
							'northOffset': 289
						}
					}
				});
			}

			if (this.state == S_HIGHLIGHTS) {
				$('#highlights-slider').owlCarousel('destroy');
				$('#highlights-slider').html('');
				for (let slide of this.data[HIGHLIGHTS][car.id].split('++')) {
					$('#highlights-slider').append(`
					<div class="highlights-slide">
						<img class="highlights-slide__image" src="${PATH}img/highlights/${slide.split('+')[0]}">
						<h2 class="highlights-slide__title">${slide.split('+')[1]}</h2>
						<div class="highlights-slide__desc">${slide.split('+')[2]}</div>
					</div>
					`);
				}
				$('#highlights-slider').owlCarousel({
					loop:true,
					margin:10,
					nav:true,
					responsive:{
						0:{
								items:1
						}
					}
				});
				$('.specs__options').hide();
			} else {
				$('.specs__options').show();
			}
		}

		/** @param {number} carID */
		addCar(carID) {
			console.info('adding vahicle...');
			let car = new Vehicle(carID, this.data);
			this.archive.set(carID, car);
		}

		/** @param {number} carID */
		getCar(carID)  {
			return this.archive.get(carID);
		}

		/** @param {number} carID */
		hasCar(carID) {
			return this.archive.has(carID);
		}
		
		/** @param {number} stateID */
		changeState(stateID) {
			this.state = stateID;
			this.edit(this.activeCar);
		}

		// Change set of car
		setSet(carID, cab, box, drive) {
			let car = this.getCar(carID);

			if (!car) {
				throw Error('Couldn\'t find a vehicle with ID: ' + carID);
			}

			let set = car.getSet();

			let offset;
			if (drive) {
				// change drive
				car.sets.find((e, i) => {
					return cab == e.cab &&
						box == e.box &&
						drive == e.drive ? offset = i : undefined;
				});
			} else {
				// change cabine & box
				car.sets.find((e, i) => {
					return cab == e.cab &&
						box == e.box &&
						set.drive == e.drive ? offset = i : undefined;
				});
			}
			
			if (offset === undefined) this.uniqs.find((e, i) => cab == e.cab && box == e.box ? offset = i : undefined);
			car.setOffset(offset);

			this.edit(carID);
		}

		setColor(carID, colorID) {
			let car = this.getCar(carID);

			if (!car) {
				throw Error('Couldn\'t find a vehicle with ID: ' + carID);
			}

			if (this.state === S_EXTERIOR) {
				car.setExteriorColor(colorID);
			} else if (this.state === S_INTERIOR) {
				car.setInteriorColor(colorID);
			}
		}

		setCallbacks() {
			// Add vehicle from menu
			$('.cars-carousel__item').on('click', e => {
				// choose active menu item
				$('.cars-carousel__item').removeClass('active');
				$(e.currentTarget).addClass('active');
				
				// push car
				let id = $(e.currentTarget).attr('id');
				if (!this.hasCar(Number(id))) {
					this.addCar(Number(id));
				}

				this.edit(Number(id));
				this.activeCar = Number(id);
			});

			// Add model from menu
			$('.ram-chassis-cab__models .tabnav__link').on('click', e => {
				e.preventDefault()

				// choose active menu item
				$('.ram-chassis-cab__models .tabnav__link').parent().removeClass('active');
				$(e.currentTarget).parent().addClass('active');
				let targetID = $(e.currentTarget).data('target');
				
				$('.cars-carousel .feature-carousel__item').hide();
				$(`#${targetID}`).show();

				$('.cars-carousel__item').removeClass('active');
				targetID = $(e.currentTarget).data('target');
				let car = $(`#${targetID} .cars-carousel__item`).first();
				car.addClass('active');
				
				// push car
				let id = car.attr('id');
				if (!this.hasCar(Number(id))) {
					this.addCar(Number(id));
				}

				this.edit(Number(id));
				this.activeCar = Number(id);
			});

			// Change drive
			$('#drive').on('change', e => {
				let car = this.getCar(this.activeCar);
				let set = car.getSet();
				const drive = set.drive === '4x2' ? '4x4' : '4x2';
				this.setSet(this.activeCar, set.cab, set.box, drive);
			});
			// Change cabine
			$('#cab').on('change', e => {
				const cabbox = $(e.target).val();
				const cab = cabbox.match(/^Regular Cab 10K GVWR|^Crew Cab 10K GVWR|^Mega Cab|^Crew Cab|^Quad Cab|^Regular Cab/);
				const box = cabbox.match(/\d{3}$/);
				this.setSet(this.activeCar, cab[0], box[0]);
			});
			// Change color
			$('html').on('click', '.colors__item', e => {
				let car = this.getCar(this.activeCar);

				if (!car) {
					throw Error('Couldn\'t find a vehicle with ID: ' + this.activeCar);
				}

				this.setColor(this.activeCar, $(e.currentTarget).attr('id'));
				this.edit(this.activeCar);
			});

			// Change state
			$('[data-target="interior"]').on('click', e => {
				this.changeState(S_INTERIOR);
			});
			$('[data-target="exterior"]').on('click', e => {
				this.changeState(S_EXTERIOR);
			});
			$('[data-target="highlights"]').on('click', e => {
				this.changeState(S_HIGHLIGHTS);
			});
		}
	}

	// This class has description of any car
	class Vehicle {
		constructor(id, data) {
			/** @type {number} */
			this.id = id;
			/** @type {string} */
			this.model = data[MODEL_NAME][id];
			/** @type {string} */
			this.complect = data[COMPLECTATION][id];
			/** @type {array} */
			this.sets = [];
			/** @type {number} */
			this.offset = 0;
			/** @type {string} */
			this.eColor;
			/** @type {string} */
			this.iColor;

			this.loadSets(data);
		}

		/** @param {array} data */
		loadSets(data) {
			for (let offset = this.id; this.complect === data[COMPLECTATION][offset]; offset++) {
				this.sets.push({
					drive: data[DRIVE][offset],
					cab: data[CABINE][offset],
					box: data[BOX][offset],
					price: data[PRICE][offset],
					eModel: data[E_MODEL][offset],
					iModel: data[I_MODEL][offset],
				});
			}

			if (!isChassis) this.iColor = data[I_COLOR][this.id].split(' ')[0];
		}

		/** @return {object} */
		getSet() {
			return this.sets[this.offset];
		}

		/** @return {string} */
		getExteriorColor() {
			return this.eColor;
		}

		/** @return {string} */
		getInteriorColor() {
			return this.iColor;
		}

		/** @param {number} offset */
		setOffset(offset) {
			this.offset = offset;
		}

		/** @param {string} color */
		setExteriorColor(color) {
			this.eColor = color;

			let set = this.sets[this.offset];
			let src = set.eModel;
			let srcExp = /wXGXQpMTV1rU../;
			set.eModel = src.replace(srcExp, `wXGXQpMTV1rU${this.eColor}`);
		}

		/** @param {string} color */
		setInteriorColor(color) {
			this.iColor = color;
		}
	}

	if ($(document.body).find('.specs_page')[0]) {
		let config = new Config(ENCYCLOPEDIA);
	}
	else if ($(document.body).find('.specs')[0]) {
		let config = new Config(CONFIGURATOR);
	}

	// ============================ <NAVTABS> ============================
	$('.feature-carousel__item').hide();

	useTabnav('launch', 'tabnav__link' /* lnkClass */, 'performance1' /* id */);
	useTabnav('air', 'tabnav__link' /* lnkClass */, 'exterior-carousel' /* id */);
	useTabnav('hud', 'tabnav__link' /* lnkClass */, 'interior-carousel' /* id */);
	useTabnav('ext', 'tabnav__link' /* lnkClass */, 'buildyourtrx' /* id */);
	useTabnav('srw', 'tabnav__link' /* lnkClass */, 'buildyourtrx' /* id */);
	useTabnav('exterior', 'specs__tabs-link' /* lnkClass */, 'trims' /* id */);

	/**
	 * @param {string} defaultSlide ID of default slide
	 * @param {string} lnkClass class of links
	 * @param {string} id ID of navtab
	 */
	function useTabnav(defaultSlide, lnkClass, id) {
			// Show default slide
			$(`#${defaultSlide}`).show();

			// Click handler on #id .linkClass
			$(`#${id} .${lnkClass}`).on('click', e => {
				// define target tab id
				const targetId = $(e.currentTarget).data('target');

				// hide all tab and show active
				$(`#${id} .feature-carousel__item`).hide();
				$(`#${targetId}`).show();
		
				// turn off all links and turn on active
				$(`#${id} .${lnkClass} .active`).removeClass('active');
				$(`#${id} .${lnkClass}`).parent().removeClass('active');
				$(e.target).parent().addClass('active');
		
				// cancel default action handlers
				e.preventDefault();
			});
	}
	// ============================ </NAVTABS> ============================
});