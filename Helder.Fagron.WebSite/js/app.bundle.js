webpackJsonp([0],[
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__app_rotas__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_constants__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_interceptors__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__app_layout__ = __webpack_require__(4);
﻿





function requireAll(r) {
    r.keys().forEach(r);
}

requireAll(__webpack_require__(5));
requireAll(__webpack_require__(8));
requireAll(__webpack_require__(10));
requireAll(__webpack_require__(12));
requireAll(__webpack_require__(14));

var appModule = angular.module("fagronTest", [
    'ui.router',
    'ngCookies',
    'ngMessages',
    'ngSanitize',
    'cgBusy',
    'angular-jwt',
    'tmh.dynamicLocale',
    'ui.bootstrap',
    'oc.lazyLoad',
    'ui.grid',
    'ui.grid.selection',
    'ui.grid.pagination',
    'ngTouch',
    'angularDatepicker',
    'ui.utils.masks'
]);


requireAll(__webpack_require__(16));
requireAll(__webpack_require__(18));
requireAll(__webpack_require__(23));
requireAll(__webpack_require__(24));
requireAll(__webpack_require__(27));

__WEBPACK_IMPORTED_MODULE_1__app_constants__["a" /* default */].config(appModule);
appModule.config(__WEBPACK_IMPORTED_MODULE_0__app_rotas__["a" /* default */]);
appModule.config(__WEBPACK_IMPORTED_MODULE_2__app_interceptors__["a" /* default */]);
__WEBPACK_IMPORTED_MODULE_3__app_layout__["a" /* default */].config(appModule);




angular.module('fagronTest').factory('vcalert', ['$uibModal', function (modal) {
    return {
        confirm: confirm,
        alert: alert
    };

    function alert(mensagem) {
        var modalInstance = modal.open({
            templateUrl: 'app/comum/views/modals/confirm/modalConfirm.html',
            controller: 'comum.views.modals.confirm.modalConfirm as vm',
            backdrop: 'static',
            size: 'sm',
            windowClass: 'modal-action',
            resolve: {
                mensagemInfo: function () {
                    return mensagem;
                }
            }
        });
    }

    function confirm(mensagem, sim, nao) {
        var modalInstance = modal.open({
            templateUrl: 'app/comum/views/modals/pergunta/modal.html',
            controller: 'comum.views.modals.pergunta.modal as vm',
            backdrop: 'static',
            size: 'sm',
            windowClass: 'modal-action',
            resolve: {
                mensagemInfo: function () {
                    return mensagem;
                }
            }
        });

        modalInstance.result.then(function () {
            if (modalInstance.result.decisao) {
                if (sim)
                    sim();
            }
            else if (nao) {
                nao();
            }
        });

    }
}]);

angular.module('fagronTest').value('cgBusyDefaults', {
    templateUrl: './app/comum/loader/loader.html',
    delay: 500
});

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = rotas;
rotas.$inject = ['$stateProvider', '$urlRouterProvider'];

function rotas($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise("/");
    $stateProvider.state('login', {
        url: '/',
        templateUrl: 'app/autenticacao/views/login.html',
    })

    $stateProvider.state('inicio', {
        url: '/home',
        templateUrl: 'app/cadastros/clientes/index.html',
        controller: "cadastros.clientes.index",
        controllerAs: "vm"
    })

        //#region CADASTROS
        .state('cadastros', {
            'abstract': true,
            url: '/cadastros',
            template: '<div ui-view class="fade-in-up"></div>'
        })
        //#region CLIENTES
        .state('cadastros.clientes', {
            'abstract': true,
            url: '/clientes',
            template: '<div ui-view class="fade-in-up"></div>'

        })

        .state('cadastros.clientes.index', {
            url: '',
            templateUrl: 'app/cadastros/clientes/index.html',
            controller: "cadastros.clientes.index",
            controllerAs: "vm"
        })
        .state('cadastros.clientes.criar', {
            url: '/incluir',
            templateUrl: 'app/cadastros/clientes/criar.html',
            controller: "cadastros.clientes.criar",
            controllerAs: "vm"
        })
        .state('cadastros.clientes.alterar', {
            url: '/alterar/:id',
            templateUrl: 'app/cadastros/clientes/criar.html',
            controller: "cadastros.clientes.criar",
            controllerAs: "vm"
        })
        //#endregion
        ;
    //#endregion
};


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var constants = [];

    var serviceBase = 'http://localhost:51857/api/';

constants.push({
    key: 'ngAuthSettings', value: {
        apiServiceBaseUri: serviceBase
    }
});

var configuration = {
    config: function (appModule) {
        constants.forEach(function (constant) {
            appModule.constant(constant.key, constant.value);
        });
    }
};
/* harmony default export */ __webpack_exports__["a"] = (configuration);

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = authInterceptor;
authInterceptor.$inject =['$httpProvider'];

//Configuração do Serviço para API e InterceptorhttpProvider
function authInterceptor($httpProvider){
    $httpProvider.interceptors.push('authInterceptorService');
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
function layout(appModule) {

    /* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
    appModule.config(['$ocLazyLoadProvider', function ($ocLazyLoadProvider) {
        $ocLazyLoadProvider.config({
            cssFilesInsertBefore: 'ng_load_plugins_before' // load the above css files before a LINK element with this ID. Dynamic CSS files must be loaded between core and theme css files
        });
    }]);

    //AngularJS v1.3.x workaround for old style controller declarition in HTML
    appModule.config(['$controllerProvider', function ($controllerProvider) {
        // this option might be handy for migrating old apps, but please don't use it
        // in new ones!
        $controllerProvider.allowGlobals();
    }]);

    /********************************************
     END: BREAKING CHANGE in AngularJS v1.3.x:
    *********************************************/

    /* Setup global settings */
    appModule.factory('settings', ['$rootScope', function ($rootScope) {

        // supported languages
        var settings = {
            layout: {
                pageAutoScrollOnLoad: 1000 // auto scroll to top on page load
            },
            layoutImgPath: Metronic.getAssetsPath() + 'admin/layout/img/',
            layoutCssPath: Metronic.getAssetsPath() + 'admin/layout/css/'
        };

        $rootScope.settings = settings;

        return settings;
    }]);

    /* Setup App Main Controller */
    appModule.controller('AppController', ['$scope', '$rootScope', function ($scope, $rootScope) {
        var vm = this;
        $rootScope.cgBusyPromises = [];
        $scope.$on('$viewContentLoaded', function () {
            Metronic.initComponents(); // init core components
            //Layout.init(); //  Init entire layout(header, footer, sidebar, etc) on page load if the partials included in server side instead of loading with ng-include directive 
        });

        //Configura��o para o loading...
        vm.delay = 0;
        vm.minDuration = 0;
        vm.message = 'Aguarde...';
        vm.backdrop = true;
        vm.loading = null;
        vm.resultado = null;
    }]);

    /* Setup Layout Part - Header */
    appModule.controller('HeaderController', ['$scope', '$filter', function ($scope, $filter) {
        var vm = this;
        $scope.$on('$includeContentLoaded', function () {
            Layout.initHeader(); // init header
        });
    }]);

    /* Setup Layout Part - Sidebar */
    appModule.controller('PageHeadController', ['$scope', '$filter', function ($scope, $filter) {
        $scope.$on('$includeContentLoaded', function () {
            Demo.init(); // init theme panel
        });
    }]);

    /* Setup Layout Part - Footer */
    appModule.controller('FooterController', ['$scope', function ($scope) {
        $scope.$on('$includeContentLoaded', function () {
            Layout.initFooter(); // init footer
        });
    }]);


    /* Init global settings and run the app */
    appModule.run(["$rootScope", "settings", "$state", function ($rootScope, settings, $state) {
        $rootScope.$state = $state; // state to be accessed from view
    }]);

};


var configuration = {
    config: layout
};

/* harmony default export */ __webpack_exports__["a"] = (configuration);

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./angular-bootstrap-datepicker.js": 6,
	"./angular-datepicker.js": 7
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 5;

/***/ }),
/* 6 */
/***/ (function(module, exports) {

/* =========================================================
 * bootstrap-datepicker.js
 * http://www.eyecon.ro/bootstrap-datepicker
 * =========================================================
 * Copyright 2012 Stefan Petre
 * Improvements by Andrew Rowls
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ========================================================= */

(function( $ ) {

	var $window = $(window);

	function UTCDate(){
		return new Date(Date.UTC.apply(Date, arguments));
	}
	function UTCToday(){
		var today = new Date();
		return UTCDate(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate());
	}


	// Picker object

	var Datepicker = function(element, options) {
		var that = this;

		this._process_options(options);

		this.element = $(element);
		this.isInline = false;
		this.isInput = this.element.is('input');
		this.component = this.element.is('.date') ? this.element.find('.add-on, .btn') : false;
		this.hasInput = this.component && this.element.find('input').length;
		if(this.component && this.component.length === 0)
			this.component = false;

		this.picker = $(DPGlobal.template);
		this._buildEvents();
		this._attachEvents();

		if(this.isInline) {
			this.picker.addClass('datepicker-inline').appendTo(this.element);
		} else {
			this.picker.addClass('datepicker-dropdown dropdown-menu');
		}

		if (this.o.rtl){
			this.picker.addClass('datepicker-rtl');
			this.picker.find('.prev i, .next i')
						.toggleClass('icon-arrow-left icon-arrow-right');
		}


		this.viewMode = this.o.startView;

		if (this.o.calendarWeeks)
			this.picker.find('tfoot th.today')
						.attr('colspan', function(i, val){
							return parseInt(val) + 1;
						});

		this._allow_update = false;

		this.setStartDate(this._o.startDate);
		this.setEndDate(this._o.endDate);
		this.setDaysOfWeekDisabled(this.o.daysOfWeekDisabled);

		this.fillDow();
		this.fillMonths();

		this._allow_update = true;

		this.update();
		this.showMode();

		if(this.isInline) {
			this.show();
		}
	};

	Datepicker.prototype = {
		constructor: Datepicker,

		_process_options: function(opts){
			// Store raw options for reference
			this._o = $.extend({}, this._o, opts);
			// Processed options
			var o = this.o = $.extend({}, this._o);

			// Check if "de-DE" style date is available, if not language should
			// fallback to 2 letter code eg "de"
			var lang = o.language;
			if (!dates[lang]) {
				lang = lang.split('-')[0];
				if (!dates[lang])
					lang = defaults.language;
			}
			o.language = lang;

			switch(o.startView){
				case 2:
				case 'decade':
					o.startView = 2;
					break;
				case 1:
				case 'year':
					o.startView = 1;
					break;
				default:
					o.startView = 0;
			}

			switch (o.minViewMode) {
				case 1:
				case 'months':
					o.minViewMode = 1;
					break;
				case 2:
				case 'years':
					o.minViewMode = 2;
					break;
				default:
					o.minViewMode = 0;
			}

			o.startView = Math.max(o.startView, o.minViewMode);

			o.weekStart %= 7;
			o.weekEnd = ((o.weekStart + 6) % 7);

			var format = DPGlobal.parseFormat(o.format);
			if (o.startDate !== -Infinity) {
				if (!!o.startDate) {
					if (o.startDate instanceof Date)
						o.startDate = this._local_to_utc(this._zero_time(o.startDate));
					else
						o.startDate = DPGlobal.parseDate(o.startDate, format, o.language);
				} else {
					o.startDate = -Infinity;
				}
			}
			if (o.endDate !== Infinity) {
				if (!!o.endDate) {
					if (o.endDate instanceof Date)
						o.endDate = this._local_to_utc(this._zero_time(o.endDate));
					else
						o.endDate = DPGlobal.parseDate(o.endDate, format, o.language);
				} else {
					o.endDate = Infinity;
				}
			}

			o.daysOfWeekDisabled = o.daysOfWeekDisabled||[];
			if (!$.isArray(o.daysOfWeekDisabled))
				o.daysOfWeekDisabled = o.daysOfWeekDisabled.split(/[,\s]*/);
			o.daysOfWeekDisabled = $.map(o.daysOfWeekDisabled, function (d) {
				return parseInt(d, 10);
			});

			var plc = String(o.orientation).toLowerCase().split(/\s+/g),
				_plc = o.orientation.toLowerCase();
			plc = $.grep(plc, function(word){
				return (/^auto|left|right|top|bottom$/).test(word);
			});
			o.orientation = {x: 'auto', y: 'auto'};
			if (!_plc || _plc === 'auto')
				; // no action
			else if (plc.length === 1){
				switch(plc[0]){
					case 'top':
					case 'bottom':
						o.orientation.y = plc[0];
						break;
					case 'left':
					case 'right':
						o.orientation.x = plc[0];
						break;
				}
			}
			else {
				_plc = $.grep(plc, function(word){
					return (/^left|right$/).test(word);
				});
				o.orientation.x = _plc[0] || 'auto';

				_plc = $.grep(plc, function(word){
					return (/^top|bottom$/).test(word);
				});
				o.orientation.y = _plc[0] || 'auto';
			}
		},
		_events: [],
		_secondaryEvents: [],
		_applyEvents: function(evs){
			for (var i=0, el, ev; i<evs.length; i++){
				el = evs[i][0];
				ev = evs[i][1];
				el.on(ev);
			}
		},
		_unapplyEvents: function(evs){
			for (var i=0, el, ev; i<evs.length; i++){
				el = evs[i][0];
				ev = evs[i][1];
				el.off(ev);
			}
		},
		_buildEvents: function(){
			if (this.isInput) { // single input
				this._events = [
					[this.element, {
						focus: $.proxy(this.show, this),
						keyup: $.proxy(this.update, this),
						keydown: $.proxy(this.keydown, this)
					}]
				];
			}
			else if (this.component && this.hasInput){ // component: input + button
				this._events = [
					// For components that are not readonly, allow keyboard nav
					[this.element.find('input'), {
						focus: $.proxy(this.show, this),
						keyup: $.proxy(this.update, this),
						keydown: $.proxy(this.keydown, this)
					}],
					[this.component, {
						click: $.proxy(this.show, this)
					}]
				];
			}
			else if (this.element.is('div')) {  // inline datepicker
				this.isInline = true;
			}
			else {
				this._events = [
					[this.element, {
						click: $.proxy(this.show, this)
					}]
				];
			}

			this._secondaryEvents = [
				[this.picker, {
					click: $.proxy(this.click, this)
				}],
				[$(window), {
					resize: $.proxy(this.place, this)
				}],
				[$(document), {
					mousedown: $.proxy(function (e) {
						// Clicked outside the datepicker, hide it
						if (!(
							this.element.is(e.target) ||
							this.element.find(e.target).length ||
							this.picker.is(e.target) ||
							this.picker.find(e.target).length
						)) {
							this.hide();
						}
					}, this)
				}]
			];
		},
		_attachEvents: function(){
			this._detachEvents();
			this._applyEvents(this._events);
		},
		_detachEvents: function(){
			this._unapplyEvents(this._events);
		},
		_attachSecondaryEvents: function(){
			this._detachSecondaryEvents();
			this._applyEvents(this._secondaryEvents);
		},
		_detachSecondaryEvents: function(){
			this._unapplyEvents(this._secondaryEvents);
		},
		_trigger: function(event, altdate){
			var date = altdate || this.date,
				local_date = this._utc_to_local(date);

			this.element.trigger({
				type: event,
				date: local_date,
				format: $.proxy(function(altformat){
					var format = altformat || this.o.format;
					return DPGlobal.formatDate(date, format, this.o.language);
				}, this)
			});
		},

		show: function(e) {
			if (!this.isInline)
				this.picker.appendTo('body');
			this.picker.show();
			this.height = this.component ? this.component.outerHeight() : this.element.outerHeight();
			this.place();
			this._attachSecondaryEvents();
			if (e) {
				e.preventDefault();
			}
			this._trigger('show');
		},

		hide: function(e){
			if(this.isInline) return;
			if (!this.picker.is(':visible')) return;
			this.picker.hide().detach();
			this._detachSecondaryEvents();
			this.viewMode = this.o.startView;
			this.showMode();

			if (
				this.o.forceParse &&
				(
					this.isInput && this.element.val() ||
					this.hasInput && this.element.find('input').val()
				)
			)
				this.setValue();
			this._trigger('hide');
		},

		remove: function() {
			this.hide();
			this._detachEvents();
			this._detachSecondaryEvents();
			this.picker.remove();
			delete this.element.data().datepicker;
			if (!this.isInput) {
				delete this.element.data().date;
			}
		},

		_utc_to_local: function(utc){
			return new Date(utc.getTime() + (utc.getTimezoneOffset()*60000));
		},
		_local_to_utc: function(local){
			return new Date(local.getTime() - (local.getTimezoneOffset()*60000));
		},
		_zero_time: function(local){
			return new Date(local.getFullYear(), local.getMonth(), local.getDate());
		},
		_zero_utc_time: function(utc){
			return new Date(Date.UTC(utc.getUTCFullYear(), utc.getUTCMonth(), utc.getUTCDate()));
		},

		getDate: function() {
			return this._utc_to_local(this.getUTCDate());
		},

		getUTCDate: function() {
			return this.date;
		},

		setDate: function(d) {
			this.setUTCDate(this._local_to_utc(d));
		},

		setUTCDate: function(d) {
			this.date = d;
			this.setValue();
		},

		setValue: function() {
			var formatted = this.getFormattedDate();
			if (!this.isInput) {
				if (this.component){
					this.element.find('input').val(formatted).change();
				}
			} else {
				this.element.val(formatted).change();
			}
		},

		getFormattedDate: function(format) {
			if (format === undefined)
				format = this.o.format;
			return DPGlobal.formatDate(this.date, format, this.o.language);
		},

		setStartDate: function(startDate){
			this._process_options({startDate: startDate});
			this.update();
			this.updateNavArrows();
		},

		setEndDate: function(endDate){
			this._process_options({endDate: endDate});
			this.update();
			this.updateNavArrows();
		},

		setDaysOfWeekDisabled: function(daysOfWeekDisabled){
			this._process_options({daysOfWeekDisabled: daysOfWeekDisabled});
			this.update();
			this.updateNavArrows();
		},

		place: function(){
						if(this.isInline) return;
			var calendarWidth = this.picker.outerWidth(),
				calendarHeight = this.picker.outerHeight(),
				visualPadding = 10,
				windowWidth = $window.width(),
				windowHeight = $window.height(),
				scrollTop = $window.scrollTop();

			var zIndex = parseInt(this.element.parents().filter(function() {
							return $(this).css('z-index') != 'auto';
						}).first().css('z-index'))+10;
			var offset = this.component ? this.component.parent().offset() : this.element.offset();
			var height = this.component ? this.component.outerHeight(true) : this.element.outerHeight(false);
			var width = this.component ? this.component.outerWidth(true) : this.element.outerWidth(false);
			var left = offset.left,
				top = offset.top;

			this.picker.removeClass(
				'datepicker-orient-top datepicker-orient-bottom '+
				'datepicker-orient-right datepicker-orient-left'
			);

			if (this.o.orientation.x !== 'auto') {
				this.picker.addClass('datepicker-orient-' + this.o.orientation.x);
				if (this.o.orientation.x === 'right')
					left -= calendarWidth - width;
			}
			// auto x orientation is best-placement: if it crosses a window
			// edge, fudge it sideways
			else {
				// Default to left
				this.picker.addClass('datepicker-orient-left');
				if (offset.left < 0)
					left -= offset.left - visualPadding;
				else if (offset.left + calendarWidth > windowWidth)
					left = windowWidth - calendarWidth - visualPadding;
			}

			// auto y orientation is best-situation: top or bottom, no fudging,
			// decision based on which shows more of the calendar
			var yorient = this.o.orientation.y,
				top_overflow, bottom_overflow;
			if (yorient === 'auto') {
				top_overflow = -scrollTop + offset.top - calendarHeight;
				bottom_overflow = scrollTop + windowHeight - (offset.top + height + calendarHeight);
				if (Math.max(top_overflow, bottom_overflow) === bottom_overflow)
					yorient = 'top';
				else
					yorient = 'bottom';
			}
			this.picker.addClass('datepicker-orient-' + yorient);
			if (yorient === 'top')
				top += height;
			else
				top -= calendarHeight + parseInt(this.picker.css('padding-top'));

			this.picker.css({
				top: top,
				left: left,
				zIndex: zIndex
			});
		},

		_allow_update: true,
		update: function(){
			if (!this._allow_update) return;

			var oldDate = new Date(this.date),
				date, fromArgs = false;
			if(arguments && arguments.length && (typeof arguments[0] === 'string' || arguments[0] instanceof Date)) {
				date = arguments[0];
				if (date instanceof Date)
					date = this._local_to_utc(date);
				fromArgs = true;
			} else {
				date = this.isInput ? this.element.val() : this.element.data('date') || this.element.find('input').val();
				delete this.element.data().date;
			}

			this.date = DPGlobal.parseDate(date, this.o.format, this.o.language);

			if (fromArgs) {
				// setting date by clicking
				this.setValue();
			} else if (date) {
				// setting date by typing
				if (oldDate.getTime() !== this.date.getTime())
					this._trigger('changeDate');
			} else {
				// clearing date
				this._trigger('clearDate');
			}

			if (this.date < this.o.startDate) {
				this.viewDate = new Date(this.o.startDate);
				this.date = new Date(this.o.startDate);
			} else if (this.date > this.o.endDate) {
				this.viewDate = new Date(this.o.endDate);
				this.date = new Date(this.o.endDate);
			} else {
				this.viewDate = new Date(this.date);
				this.date = new Date(this.date);
			}
			this.fill();
		},

		fillDow: function(){
			var dowCnt = this.o.weekStart,
			html = '<tr>';
			if(this.o.calendarWeeks){
				var cell = '<th class="cw">&nbsp;</th>';
				html += cell;
				this.picker.find('.datepicker-days thead tr:first-child').prepend(cell);
			}
			while (dowCnt < this.o.weekStart + 7) {
				html += '<th class="dow">'+dates[this.o.language].daysMin[(dowCnt++)%7]+'</th>';
			}
			html += '</tr>';
			this.picker.find('.datepicker-days thead').append(html);
		},

		fillMonths: function(){
			var html = '',
			i = 0;
			while (i < 12) {
				html += '<span class="month">'+dates[this.o.language].monthsShort[i++]+'</span>';
			}
			this.picker.find('.datepicker-months td').html(html);
		},

		setRange: function(range){
			if (!range || !range.length)
				delete this.range;
			else
				this.range = $.map(range, function(d){ return d.valueOf(); });
			this.fill();
		},

		getClassNames: function(date){
			var cls = [],
				year = this.viewDate.getUTCFullYear(),
				month = this.viewDate.getUTCMonth(),
				currentDate = this.date.valueOf(),
				today = new Date();
			if (date.getUTCFullYear() < year || (date.getUTCFullYear() == year && date.getUTCMonth() < month)) {
				cls.push('old');
			} else if (date.getUTCFullYear() > year || (date.getUTCFullYear() == year && date.getUTCMonth() > month)) {
				cls.push('new');
			}
			// Compare internal UTC date with local today, not UTC today
			if (this.o.todayHighlight &&
				date.getUTCFullYear() == today.getFullYear() &&
				date.getUTCMonth() == today.getMonth() &&
				date.getUTCDate() == today.getDate()) {
				cls.push('today');
			}
			if (currentDate && date.valueOf() == currentDate) {
				cls.push('active');
			}
			if (date.valueOf() < this.o.startDate || date.valueOf() > this.o.endDate ||
				$.inArray(date.getUTCDay(), this.o.daysOfWeekDisabled) !== -1) {
				cls.push('disabled');
			}
			if (this.range){
				if (date > this.range[0] && date < this.range[this.range.length-1]){
					cls.push('range');
				}
				if ($.inArray(date.valueOf(), this.range) != -1){
					cls.push('selected');
				}
			}
			return cls;
		},

		fill: function() {
			var d = new Date(this.viewDate),
				year = d.getUTCFullYear(),
				month = d.getUTCMonth(),
				startYear = this.o.startDate !== -Infinity ? this.o.startDate.getUTCFullYear() : -Infinity,
				startMonth = this.o.startDate !== -Infinity ? this.o.startDate.getUTCMonth() : -Infinity,
				endYear = this.o.endDate !== Infinity ? this.o.endDate.getUTCFullYear() : Infinity,
				endMonth = this.o.endDate !== Infinity ? this.o.endDate.getUTCMonth() : Infinity,
				currentDate = this.date && this.date.valueOf(),
				tooltip;
			this.picker.find('.datepicker-days thead th.datepicker-switch')
						.text(dates[this.o.language].months[month]+' '+year);
			this.picker.find('tfoot th.today')
						.text(dates[this.o.language].today)
						.toggle(this.o.todayBtn !== false);
			this.picker.find('tfoot th.clear')
						.text(dates[this.o.language].clear)
						.toggle(this.o.clearBtn !== false);
			this.updateNavArrows();
			this.fillMonths();
			var prevMonth = UTCDate(year, month-1, 28,0,0,0,0),
				day = DPGlobal.getDaysInMonth(prevMonth.getUTCFullYear(), prevMonth.getUTCMonth());
			prevMonth.setUTCDate(day);
			prevMonth.setUTCDate(day - (prevMonth.getUTCDay() - this.o.weekStart + 7)%7);
			var nextMonth = new Date(prevMonth);
			nextMonth.setUTCDate(nextMonth.getUTCDate() + 42);
			nextMonth = nextMonth.valueOf();
			var html = [];
			var clsName;
			while(prevMonth.valueOf() < nextMonth) {
				if (prevMonth.getUTCDay() == this.o.weekStart) {
					html.push('<tr>');
					if(this.o.calendarWeeks){
						// ISO 8601: First week contains first thursday.
						// ISO also states week starts on Monday, but we can be more abstract here.
						var
							// Start of current week: based on weekstart/current date
							ws = new Date(+prevMonth + (this.o.weekStart - prevMonth.getUTCDay() - 7) % 7 * 864e5),
							// Thursday of this week
							th = new Date(+ws + (7 + 4 - ws.getUTCDay()) % 7 * 864e5),
							// First Thursday of year, year from thursday
							yth = new Date(+(yth = UTCDate(th.getUTCFullYear(), 0, 1)) + (7 + 4 - yth.getUTCDay())%7*864e5),
							// Calendar week: ms between thursdays, div ms per day, div 7 days
							calWeek =  (th - yth) / 864e5 / 7 + 1;
						html.push('<td class="cw">'+ calWeek +'</td>');

					}
				}
				clsName = this.getClassNames(prevMonth);
				clsName.push('day');

				if (this.o.beforeShowDay !== $.noop){
					var before = this.o.beforeShowDay(this._utc_to_local(prevMonth));
					if (before === undefined)
						before = {};
					else if (typeof(before) === 'boolean')
						before = {enabled: before};
					else if (typeof(before) === 'string')
						before = {classes: before};
					if (before.enabled === false)
						clsName.push('disabled');
					if (before.classes)
						clsName = clsName.concat(before.classes.split(/\s+/));
					if (before.tooltip)
						tooltip = before.tooltip;
				}

				clsName = $.unique(clsName);
				html.push('<td class="'+clsName.join(' ')+'"' + (tooltip ? ' title="'+tooltip+'"' : '') + '>'+prevMonth.getUTCDate() + '</td>');
				if (prevMonth.getUTCDay() == this.o.weekEnd) {
					html.push('</tr>');
				}
				prevMonth.setUTCDate(prevMonth.getUTCDate()+1);
			}
			this.picker.find('.datepicker-days tbody').empty().append(html.join(''));
			var currentYear = this.date && this.date.getUTCFullYear();

			var months = this.picker.find('.datepicker-months')
						.find('th:eq(1)')
							.text(year)
							.end()
						.find('span').removeClass('active');
			if (currentYear && currentYear == year) {
				months.eq(this.date.getUTCMonth()).addClass('active');
			}
			if (year < startYear || year > endYear) {
				months.addClass('disabled');
			}
			if (year == startYear) {
				months.slice(0, startMonth).addClass('disabled');
			}
			if (year == endYear) {
				months.slice(endMonth+1).addClass('disabled');
			}

			html = '';
			year = parseInt(year/10, 10) * 10;
			var yearCont = this.picker.find('.datepicker-years')
								.find('th:eq(1)')
									.text(year + '-' + (year + 9))
									.end()
								.find('td');
			year -= 1;
			for (var i = -1; i < 11; i++) {
				html += '<span class="year'+(i == -1 ? ' old' : i == 10 ? ' new' : '')+(currentYear == year ? ' active' : '')+(year < startYear || year > endYear ? ' disabled' : '')+'">'+year+'</span>';
				year += 1;
			}
			yearCont.html(html);
		},

		updateNavArrows: function() {
			if (!this._allow_update) return;

			var d = new Date(this.viewDate),
				year = d.getUTCFullYear(),
				month = d.getUTCMonth();
			switch (this.viewMode) {
				case 0:
					if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear() && month <= this.o.startDate.getUTCMonth()) {
						this.picker.find('.prev').css({visibility: 'hidden'});
					} else {
						this.picker.find('.prev').css({visibility: 'visible'});
					}
					if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear() && month >= this.o.endDate.getUTCMonth()) {
						this.picker.find('.next').css({visibility: 'hidden'});
					} else {
						this.picker.find('.next').css({visibility: 'visible'});
					}
					break;
				case 1:
				case 2:
					if (this.o.startDate !== -Infinity && year <= this.o.startDate.getUTCFullYear()) {
						this.picker.find('.prev').css({visibility: 'hidden'});
					} else {
						this.picker.find('.prev').css({visibility: 'visible'});
					}
					if (this.o.endDate !== Infinity && year >= this.o.endDate.getUTCFullYear()) {
						this.picker.find('.next').css({visibility: 'hidden'});
					} else {
						this.picker.find('.next').css({visibility: 'visible'});
					}
					break;
			}
		},

		click: function(e) {
			e.preventDefault();
			var target = $(e.target).closest('span, td, th');
			if (target.length == 1) {
				switch(target[0].nodeName.toLowerCase()) {
					case 'th':
						switch(target[0].className) {
							case 'datepicker-switch':
								this.showMode(1);
								break;
							case 'prev':
							case 'next':
								var dir = DPGlobal.modes[this.viewMode].navStep * (target[0].className == 'prev' ? -1 : 1);
								switch(this.viewMode){
									case 0:
										this.viewDate = this.moveMonth(this.viewDate, dir);
										this._trigger('changeMonth', this.viewDate);
										break;
									case 1:
									case 2:
										this.viewDate = this.moveYear(this.viewDate, dir);
										if (this.viewMode === 1)
											this._trigger('changeYear', this.viewDate);
										break;
								}
								this.fill();
								break;
							case 'today':
								var date = new Date();
								date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);

								this.showMode(-2);
								var which = this.o.todayBtn == 'linked' ? null : 'view';
								this._setDate(date, which);
								break;
							case 'clear':
								var element;
								if (this.isInput)
									element = this.element;
								else if (this.component)
									element = this.element.find('input');
								if (element)
									element.val("").change();
								this._trigger('changeDate');
								this.update();
								if (this.o.autoclose)
									this.hide();
								break;
						}
						break;
					case 'span':
						if (!target.is('.disabled')) {
							this.viewDate.setUTCDate(1);
							if (target.is('.month')) {
								var day = 1;
								var month = target.parent().find('span').index(target);
								var year = this.viewDate.getUTCFullYear();
								this.viewDate.setUTCMonth(month);
								this._trigger('changeMonth', this.viewDate);
								if (this.o.minViewMode === 1) {
									this._setDate(UTCDate(year, month, day,0,0,0,0));
								}
							} else {
								var year = parseInt(target.text(), 10)||0;
								var day = 1;
								var month = 0;
								this.viewDate.setUTCFullYear(year);
								this._trigger('changeYear', this.viewDate);
								if (this.o.minViewMode === 2) {
									this._setDate(UTCDate(year, month, day,0,0,0,0));
								}
							}
							this.showMode(-1);
							this.fill();
						}
						break;
					case 'td':
						if (target.is('.day') && !target.is('.disabled')){
							var day = parseInt(target.text(), 10)||1;
							var year = this.viewDate.getUTCFullYear(),
								month = this.viewDate.getUTCMonth();
							if (target.is('.old')) {
								if (month === 0) {
									month = 11;
									year -= 1;
								} else {
									month -= 1;
								}
							} else if (target.is('.new')) {
								if (month == 11) {
									month = 0;
									year += 1;
								} else {
									month += 1;
								}
							}
							this._setDate(UTCDate(year, month, day,0,0,0,0));
						}
						break;
				}
			}
		},

		_setDate: function(date, which){
			if (!which || which == 'date')
				this.date = new Date(date);
			if (!which || which  == 'view')
				this.viewDate = new Date(date);
			this.fill();
			this.setValue();
			this._trigger('changeDate');
			var element;
			if (this.isInput) {
				element = this.element;
			} else if (this.component){
				element = this.element.find('input');
			}
			if (element) {
				element.change();
			}
			if (this.o.autoclose && (!which || which == 'date')) {
				this.hide();
			}
		},

		moveMonth: function(date, dir){
			if (!dir) return date;
			var new_date = new Date(date.valueOf()),
				day = new_date.getUTCDate(),
				month = new_date.getUTCMonth(),
				mag = Math.abs(dir),
				new_month, test;
			dir = dir > 0 ? 1 : -1;
			if (mag == 1){
				test = dir == -1
					// If going back one month, make sure month is not current month
					// (eg, Mar 31 -> Feb 31 == Feb 28, not Mar 02)
					? function(){ return new_date.getUTCMonth() == month; }
					// If going forward one month, make sure month is as expected
					// (eg, Jan 31 -> Feb 31 == Feb 28, not Mar 02)
					: function(){ return new_date.getUTCMonth() != new_month; };
				new_month = month + dir;
				new_date.setUTCMonth(new_month);
				// Dec -> Jan (12) or Jan -> Dec (-1) -- limit expected date to 0-11
				if (new_month < 0 || new_month > 11)
					new_month = (new_month + 12) % 12;
			} else {
				// For magnitudes >1, move one month at a time...
				for (var i=0; i<mag; i++)
					// ...which might decrease the day (eg, Jan 31 to Feb 28, etc)...
					new_date = this.moveMonth(new_date, dir);
				// ...then reset the day, keeping it in the new month
				new_month = new_date.getUTCMonth();
				new_date.setUTCDate(day);
				test = function(){ return new_month != new_date.getUTCMonth(); };
			}
			// Common date-resetting loop -- if date is beyond end of month, make it
			// end of month
			while (test()){
				new_date.setUTCDate(--day);
				new_date.setUTCMonth(new_month);
			}
			return new_date;
		},

		moveYear: function(date, dir){
			return this.moveMonth(date, dir*12);
		},

		dateWithinRange: function(date){
			return date >= this.o.startDate && date <= this.o.endDate;
		},

		keydown: function(e){
			if (this.picker.is(':not(:visible)')){
				if (e.keyCode == 27) // allow escape to hide and re-show picker
					this.show();
				return;
			}
			var dateChanged = false,
				dir, day, month,
				newDate, newViewDate;
			switch(e.keyCode){
				case 27: // escape
					this.hide();
					e.preventDefault();
					break;
				case 37: // left
				case 39: // right
					if (!this.o.keyboardNavigation) break;
					dir = e.keyCode == 37 ? -1 : 1;
					if (e.ctrlKey){
						newDate = this.moveYear(this.date, dir);
						newViewDate = this.moveYear(this.viewDate, dir);
						this._trigger('changeYear', this.viewDate);
					} else if (e.shiftKey){
						newDate = this.moveMonth(this.date, dir);
						newViewDate = this.moveMonth(this.viewDate, dir);
						this._trigger('changeMonth', this.viewDate);
					} else {
						newDate = new Date(this.date);
						newDate.setUTCDate(this.date.getUTCDate() + dir);
						newViewDate = new Date(this.viewDate);
						newViewDate.setUTCDate(this.viewDate.getUTCDate() + dir);
					}
					if (this.dateWithinRange(newDate)){
						this.date = newDate;
						this.viewDate = newViewDate;
						this.setValue();
						this.update();
						e.preventDefault();
						dateChanged = true;
					}
					break;
				case 38: // up
				case 40: // down
					if (!this.o.keyboardNavigation) break;
					dir = e.keyCode == 38 ? -1 : 1;
					if (e.ctrlKey){
						newDate = this.moveYear(this.date, dir);
						newViewDate = this.moveYear(this.viewDate, dir);
						this._trigger('changeYear', this.viewDate);
					} else if (e.shiftKey){
						newDate = this.moveMonth(this.date, dir);
						newViewDate = this.moveMonth(this.viewDate, dir);
						this._trigger('changeMonth', this.viewDate);
					} else {
						newDate = new Date(this.date);
						newDate.setUTCDate(this.date.getUTCDate() + dir * 7);
						newViewDate = new Date(this.viewDate);
						newViewDate.setUTCDate(this.viewDate.getUTCDate() + dir * 7);
					}
					if (this.dateWithinRange(newDate)){
						this.date = newDate;
						this.viewDate = newViewDate;
						this.setValue();
						this.update();
						e.preventDefault();
						dateChanged = true;
					}
					break;
				case 13: // enter
					this.hide();
					e.preventDefault();
					break;
				case 9: // tab
					this.hide();
					break;
			}
			if (dateChanged){
				this._trigger('changeDate');
				var element;
				if (this.isInput) {
					element = this.element;
				} else if (this.component){
					element = this.element.find('input');
				}
				if (element) {
					element.change();
				}
			}
		},

		showMode: function(dir) {
			if (dir) {
				this.viewMode = Math.max(this.o.minViewMode, Math.min(2, this.viewMode + dir));
			}
			/*
				vitalets: fixing bug of very special conditions:
				jquery 1.7.1 + webkit + show inline datepicker in bootstrap popover.
				Method show() does not set display css correctly and datepicker is not shown.
				Changed to .css('display', 'block') solve the problem.
				See https://github.com/vitalets/x-editable/issues/37

				In jquery 1.7.2+ everything works fine.
			*/
			//this.picker.find('>div').hide().filter('.datepicker-'+DPGlobal.modes[this.viewMode].clsName).show();
			this.picker.find('>div').hide().filter('.datepicker-'+DPGlobal.modes[this.viewMode].clsName).css('display', 'block');
			this.updateNavArrows();
		}
	};

	var DateRangePicker = function(element, options){
		this.element = $(element);
		this.inputs = $.map(options.inputs, function(i){ return i.jquery ? i[0] : i; });
		delete options.inputs;

		$(this.inputs)
			.datepicker(options)
			.bind('changeDate', $.proxy(this.dateUpdated, this));

		this.pickers = $.map(this.inputs, function(i){ return $(i).data('datepicker'); });
		this.updateDates();
	};
	DateRangePicker.prototype = {
		updateDates: function(){
			this.dates = $.map(this.pickers, function(i){ return i.date; });
			this.updateRanges();
		},
		updateRanges: function(){
			var range = $.map(this.dates, function(d){ return d.valueOf(); });
			$.each(this.pickers, function(i, p){
				p.setRange(range);
			});
		},
		dateUpdated: function(e){
			var dp = $(e.target).data('datepicker'),
				new_date = dp.getUTCDate(),
				i = $.inArray(e.target, this.inputs),
				l = this.inputs.length;
			if (i == -1) return;

			if (new_date < this.dates[i]){
				// Date being moved earlier/left
				while (i>=0 && new_date < this.dates[i]){
					this.pickers[i--].setUTCDate(new_date);
				}
			}
			else if (new_date > this.dates[i]){
				// Date being moved later/right
				while (i<l && new_date > this.dates[i]){
					this.pickers[i++].setUTCDate(new_date);
				}
			}
			this.updateDates();
		},
		remove: function(){
			$.map(this.pickers, function(p){ p.remove(); });
			delete this.element.data().datepicker;
		}
	};

	function opts_from_el(el, prefix){
		// Derive options from element data-attrs
		var data = $(el).data(),
			out = {}, inkey,
			replace = new RegExp('^' + prefix.toLowerCase() + '([A-Z])'),
			prefix = new RegExp('^' + prefix.toLowerCase());
		for (var key in data)
			if (prefix.test(key)){
				inkey = key.replace(replace, function(_,a){ return a.toLowerCase(); });
				out[inkey] = data[key];
			}
		return out;
	}

	function opts_from_locale(lang){
		// Derive options from locale plugins
		var out = {};
		// Check if "de-DE" style date is available, if not language should
		// fallback to 2 letter code eg "de"
		if (!dates[lang]) {
			lang = lang.split('-')[0]
			if (!dates[lang])
				return;
		}
		var d = dates[lang];
		$.each(locale_opts, function(i,k){
			if (k in d)
				out[k] = d[k];
		});
		return out;
	}

	var old = $.fn.datepicker;
	$.fn.datepicker = function ( option ) {
		var args = Array.apply(null, arguments);
		args.shift();
		var internal_return,
			this_return;
		this.each(function () {
			var $this = $(this),
				data = $this.data('datepicker'),
				options = typeof option == 'object' && option;
			if (!data) {
				var elopts = opts_from_el(this, 'date'),
					// Preliminary otions
					xopts = $.extend({}, defaults, elopts, options),
					locopts = opts_from_locale(xopts.language),
					// Options priority: js args, data-attrs, locales, defaults
					opts = $.extend({}, defaults, locopts, elopts, options);
				if ($this.is('.input-daterange') || opts.inputs){
					var ropts = {
						inputs: opts.inputs || $this.find('input').toArray()
					};
					$this.data('datepicker', (data = new DateRangePicker(this, $.extend(opts, ropts))));
				}
				else{
					$this.data('datepicker', (data = new Datepicker(this, opts)));
				}
			}
			if (typeof option == 'string' && typeof data[option] == 'function') {
				internal_return = data[option].apply(data, args);
				if (internal_return !== undefined)
					return false;
			}
		});
		if (internal_return !== undefined)
			return internal_return;
		else
			return this;
	};

	var defaults = $.fn.datepicker.defaults = {
		autoclose: false,
		beforeShowDay: $.noop,
		calendarWeeks: false,
		clearBtn: false,
		daysOfWeekDisabled: [],
		endDate: Infinity,
		forceParse: true,
		format: 'mm/dd/yyyy',
		keyboardNavigation: true,
		language: 'en',
		minViewMode: 0,
		orientation: "auto",
		rtl: false,
		startDate: -Infinity,
		startView: 0,
		todayBtn: false,
		todayHighlight: false,
		weekStart: 0
	};
	var locale_opts = $.fn.datepicker.locale_opts = [
		'format',
		'rtl',
		'weekStart'
	];
	$.fn.datepicker.Constructor = Datepicker;
	var dates = $.fn.datepicker.dates = {
		en: {
		    days: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"],
			daysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sab", "Dom"],
			daysMin: ["D", "S", "T", "Q", "Q", "S", "S", "D"],
			months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
			monthsShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
			today: "Hoje",
			clear: "Limpar"
		}
	};

	var DPGlobal = {
		modes: [
			{
				clsName: 'days',
				navFnc: 'Month',
				navStep: 1
			},
			{
				clsName: 'months',
				navFnc: 'FullYear',
				navStep: 1
			},
			{
				clsName: 'years',
				navFnc: 'FullYear',
				navStep: 10
		}],
		isLeapYear: function (year) {
			return (((year % 4 === 0) && (year % 100 !== 0)) || (year % 400 === 0));
		},
		getDaysInMonth: function (year, month) {
			return [31, (DPGlobal.isLeapYear(year) ? 29 : 28), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
		},
		validParts: /dd?|DD?|mm?|MM?|yy(?:yy)?/g,
		nonpunctuation: /[^ -\/:-@\[\u3400-\u9fff-`{-~\t\n\r]+/g,
		parseFormat: function(format){
			// IE treats \0 as a string end in inputs (truncating the value),
			// so it's a bad format delimiter, anyway
			var separators = format.replace(this.validParts, '\0').split('\0'),
				parts = format.match(this.validParts);
			if (!separators || !separators.length || !parts || parts.length === 0){
				throw new Error("Invalid date format.");
			}
			return {separators: separators, parts: parts};
		},
		parseDate: function(date, format, language) {
			if (date instanceof Date) return date;
			if (typeof format === 'string')
				format = DPGlobal.parseFormat(format);
			if (/^[\-+]\d+[dmwy]([\s,]+[\-+]\d+[dmwy])*$/.test(date)) {
				var part_re = /([\-+]\d+)([dmwy])/,
					parts = date.match(/([\-+]\d+)([dmwy])/g),
					part, dir;
				date = new Date();
				for (var i=0; i<parts.length; i++) {
					part = part_re.exec(parts[i]);
					dir = parseInt(part[1]);
					switch(part[2]){
						case 'd':
							date.setUTCDate(date.getUTCDate() + dir);
							break;
						case 'm':
							date = Datepicker.prototype.moveMonth.call(Datepicker.prototype, date, dir);
							break;
						case 'w':
							date.setUTCDate(date.getUTCDate() + dir * 7);
							break;
						case 'y':
							date = Datepicker.prototype.moveYear.call(Datepicker.prototype, date, dir);
							break;
					}
				}
				return UTCDate(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate(), 0, 0, 0);
			}
			var parts = date && date.match(this.nonpunctuation) || [],
				date = new Date(),
				parsed = {},
				setters_order = ['yyyy', 'yy', 'M', 'MM', 'm', 'mm', 'd', 'dd'],
				setters_map = {
					yyyy: function(d,v){ return d.setUTCFullYear(v); },
					yy: function(d,v){ return d.setUTCFullYear(2000+v); },
					m: function(d,v){
						if (isNaN(d))
							return d;
						v -= 1;
						while (v<0) v += 12;
						v %= 12;
						d.setUTCMonth(v);
						while (d.getUTCMonth() != v)
							d.setUTCDate(d.getUTCDate()-1);
						return d;
					},
					d: function(d,v){ return d.setUTCDate(v); }
				},
				val, filtered, part;
			setters_map['M'] = setters_map['MM'] = setters_map['mm'] = setters_map['m'];
			setters_map['dd'] = setters_map['d'];
			date = UTCDate(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0);
			var fparts = format.parts.slice();
			// Remove noop parts
			if (parts.length != fparts.length) {
				fparts = $(fparts).filter(function(i,p){
					return $.inArray(p, setters_order) !== -1;
				}).toArray();
			}
			// Process remainder
			if (parts.length == fparts.length) {
				for (var i=0, cnt = fparts.length; i < cnt; i++) {
					val = parseInt(parts[i], 10);
					part = fparts[i];
					if (isNaN(val)) {
						switch(part) {
							case 'MM':
								filtered = $(dates[language].months).filter(function(){
									var m = this.slice(0, parts[i].length),
										p = parts[i].slice(0, m.length);
									return m == p;
								});
								val = $.inArray(filtered[0], dates[language].months) + 1;
								break;
							case 'M':
								filtered = $(dates[language].monthsShort).filter(function(){
									var m = this.slice(0, parts[i].length),
										p = parts[i].slice(0, m.length);
									return m == p;
								});
								val = $.inArray(filtered[0], dates[language].monthsShort) + 1;
								break;
						}
					}
					parsed[part] = val;
				}
				for (var i=0, _date, s; i<setters_order.length; i++){
					s = setters_order[i];
					if (s in parsed && !isNaN(parsed[s])){
						_date = new Date(date);
						setters_map[s](_date, parsed[s]);
						if (!isNaN(_date))
							date = _date;
					}
				}
			}
			return date;
		},
		formatDate: function(date, format, language){
			if (typeof format === 'string')
				format = DPGlobal.parseFormat(format);
			var val = {
				d: date.getUTCDate(),
				D: dates[language].daysShort[date.getUTCDay()],
				DD: dates[language].days[date.getUTCDay()],
				m: date.getUTCMonth() + 1,
				M: dates[language].monthsShort[date.getUTCMonth()],
				MM: dates[language].months[date.getUTCMonth()],
				yy: date.getUTCFullYear().toString().substring(2),
				yyyy: date.getUTCFullYear()
			};
			val.dd = (val.d < 10 ? '0' : '') + val.d;
			val.mm = (val.m < 10 ? '0' : '') + val.m;
			var date = [],
				seps = $.extend([], format.separators);
			for (var i=0, cnt = format.parts.length; i <= cnt; i++) {
				if (seps.length)
					date.push(seps.shift());
				date.push(val[format.parts[i]]);
			}
			return date.join('');
		},
		headTemplate: '<thead>'+
							'<tr>'+
								'<th class="prev">&laquo;</th>'+
								'<th colspan="5" class="datepicker-switch"></th>'+
								'<th class="next">&raquo;</th>'+
							'</tr>'+
						'</thead>',
		contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>',
		footTemplate: '<tfoot><tr><th colspan="7" class="today"></th></tr><tr><th colspan="7" class="clear"></th></tr></tfoot>'
	};
	DPGlobal.template = '<div class="datepicker">'+
							'<div class="datepicker-days">'+
								'<table class=" table-condensed">'+
									DPGlobal.headTemplate+
									'<tbody></tbody>'+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
							'<div class="datepicker-months">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
							'<div class="datepicker-years">'+
								'<table class="table-condensed">'+
									DPGlobal.headTemplate+
									DPGlobal.contTemplate+
									DPGlobal.footTemplate+
								'</table>'+
							'</div>'+
						'</div>';

	$.fn.datepicker.DPGlobal = DPGlobal;


	/* DATEPICKER NO CONFLICT
	* =================== */

	$.fn.datepicker.noConflict = function(){
		$.fn.datepicker = old;
		return this;
	};


	/* DATEPICKER DATA-API
	* ================== */

	$(document).on(
		'focus.datepicker.data-api click.datepicker.data-api',
		'[data-provide="datepicker"]',
		function(e){
			var $this = $(this);
			if ($this.data('datepicker')) return;
			e.preventDefault();
			// component click requires us to explicitly show it
			$this.datepicker('show');
		}
	);
	$(function(){
		$('[data-provide="datepicker-inline"]').datepicker();
	});

}( window.jQuery ));

/**
 * Arabic translation for bootstrap-datepicker
 * Mohammed Alshehri <alshehri866@gmail.com>
 */
;(function($){
    $.fn.datepicker.dates['ar'] = {
        days: ["الأحد", "الاثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت", "الأحد"],
        daysShort: ["أحد", "اثنين", "ثلاثاء", "أربعاء", "خميس", "جمعة", "سبت", "أحد"],
        daysMin: ["ح", "ن", "ث", "ع", "خ", "ج", "س", "ح"],
        months: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
        monthsShort: ["يناير", "فبراير", "مارس", "أبريل", "مايو", "يونيو", "يوليو", "أغسطس", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"],
        today: "هذا اليوم",
        rtl: true
    };
}(jQuery));

/**
 * Bulgarian translation for bootstrap-datepicker
 * Apostol Apostolov <apostol.s.apostolov@gmail.com>
 */
;(function($){
	$.fn.datepicker.dates['bg'] = {
		days: ["Неделя", "Понеделник", "Вторник", "Сряда", "Четвъртък", "Петък", "Събота", "Неделя"],
		daysShort: ["Нед", "Пон", "Вто", "Сря", "Чет", "Пет", "Съб", "Нед"],
		daysMin: ["Н", "П", "В", "С", "Ч", "П", "С", "Н"],
		months: ["Януари", "Февруари", "Март", "Април", "Май", "Юни", "Юли", "Август", "Септември", "Октомври", "Ноември", "Декември"],
		monthsShort: ["Ян", "Фев", "Мар", "Апр", "Май", "Юни", "Юли", "Авг", "Сеп", "Окт", "Ное", "Дек"],
		today: "днес"
	};
}(jQuery));

/**
 * Catalan translation for bootstrap-datepicker
 * J. Garcia <jogaco.en@gmail.com>
 */
;(function($){
	$.fn.datepicker.dates['ca'] = {
		days: ["Diumenge", "Dilluns", "Dimarts", "Dimecres", "Dijous", "Divendres", "Dissabte", "Diumenge"],
		daysShort: ["Diu",  "Dil", "Dmt", "Dmc", "Dij", "Div", "Dis", "Diu"],
		daysMin: ["dg", "dl", "dt", "dc", "dj", "dv", "ds", "dg"],
		months: ["Gener", "Febrer", "Març", "Abril", "Maig", "Juny", "Juliol", "Agost", "Setembre", "Octubre", "Novembre", "Desembre"],
		monthsShort: ["Gen", "Feb", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Oct", "Nov", "Des"],
		today: "Avui"
	};
}(jQuery));

/**
 * Czech translation for bootstrap-datepicker
 * Matěj Koubík <matej@koubik.name>
 * Fixes by Michal Remiš <michal.remis@gmail.com>
 */
;(function($){
	$.fn.datepicker.dates['cs'] = {
		days: ["Neděle", "Pondělí", "Úterý", "Středa", "Čtvrtek", "Pátek", "Sobota", "Neděle"],
		daysShort: ["Ned", "Pon", "Úte", "Stř", "Čtv", "Pát", "Sob", "Ned"],
		daysMin: ["Ne", "Po", "Út", "St", "Čt", "Pá", "So", "Ne"],
		months: ["Leden", "Únor", "Březen", "Duben", "Květen", "Červen", "Červenec", "Srpen", "Září", "Říjen", "Listopad", "Prosinec"],
		monthsShort: ["Led", "Úno", "Bře", "Dub", "Kvě", "Čer", "Čnc", "Srp", "Zář", "Říj", "Lis", "Pro"],
		today: "Dnes"
	};
}(jQuery));

/**
 * Danish translation for bootstrap-datepicker
 * Christian Pedersen <http://github.com/chripede>
 */
;(function($){
	$.fn.datepicker.dates['da'] = {
		days: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"],
		daysShort: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"],
		daysMin: ["Sø", "Ma", "Ti", "On", "To", "Fr", "Lø", "Sø"],
		months: ["Januar", "Februar", "Marts", "April", "Maj", "Juni", "Juli", "August", "September", "Oktober", "November", "December"],
		monthsShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
		today: "I Dag"
	};
}(jQuery));
/**
 * German translation for bootstrap-datepicker
 * Sam Zurcher <sam@orelias.ch>
 */
;(function($){
	$.fn.datepicker.dates['de'] = {
		days: ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag", "Sonntag"],
		daysShort: ["Son", "Mon", "Die", "Mit", "Don", "Fre", "Sam", "Son"],
		daysMin: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"],
		months: ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"],
		monthsShort: ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"],
		today: "Heute",
		weekStart: 1,
		format: "dd.mm.yyyy"
	};
}(jQuery));

/**
* Greek translation for bootstrap-datepicker
*/
;(function($){
  $.fn.datepicker.dates['el'] = {
    days: ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο", "Κυριακή"],
    daysShort: ["Κυρ", "Δευ", "Τρι", "Τετ", "Πεμ", "Παρ", "Σαβ", "Κυρ"],
    daysMin: ["Κυ", "Δε", "Τρ", "Τε", "Πε", "Πα", "Σα", "Κυ"],
    months: ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"],
    monthsShort: ["Ιαν", "Φεβ", "Μαρ", "Απρ", "Μάι", "Ιουν", "Ιουλ", "Αυγ", "Σεπ", "Οκτ", "Νοε", "Δεκ"],
    today: "Σήμερα"
  };
}(jQuery));
/**
 * Spanish translation for bootstrap-datepicker
 * Bruno Bonamin <bruno.bonamin@gmail.com>
 */
;(function($){
	$.fn.datepicker.dates['es'] = {
		days: ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"],
		daysShort: ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"],
		daysMin: ["Do", "Lu", "Ma", "Mi", "Ju", "Vi", "Sa", "Do"],
		months: ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"],
		monthsShort: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
		today: "Hoy"
	};
}(jQuery));

/**
 * Estonian translation for bootstrap-datepicker
 * Ando Roots <https://github.com/anroots>
 */
;(function($){
	$.fn.datepicker.dates['et'] = {
		days: ["Pühapäev", "Esmaspäev", "Teisipäev", "Kolmapäev", "Neljapäev", "Reede", "Laupäev", "Pühapäev"],
		daysShort: ["Püh", "Esm", "Tei", "Kol", "Nel", "Ree", "Lau", "Sun"],
		daysMin: ["P", "E", "T", "K", "N", "R", "L", "P"],
		months: ["Jaanuar", "Veebruar", "Märts", "Aprill", "Mai", "Juuni", "Juuli", "August", "September", "Oktoober", "November", "Detsember"],
		monthsShort: ["Jaan", "Veeb", "Märts", "Apr", "Mai", "Juuni", "Juuli", "Aug", "Sept", "Okt", "Nov", "Dets"],
		today: "Täna"
	};
}(jQuery));

/**
 * Finnish translation for bootstrap-datepicker
 * Jaakko Salonen <https://github.com/jsalonen>
 */
;(function($){
	$.fn.datepicker.dates['fi'] = {
		days: ["sunnuntai", "maanantai", "tiistai", "keskiviikko", "torstai", "perjantai", "lauantai", "sunnuntai"],
		daysShort: ["sun", "maa", "tii", "kes", "tor", "per", "lau", "sun"],
		daysMin: ["su", "ma", "ti", "ke", "to", "pe", "la", "su"],
		months: ["tammikuu", "helmikuu", "maaliskuu", "huhtikuu", "toukokuu", "kesäkuu", "heinäkuu", "elokuu", "syyskuu", "lokakuu", "marraskuu", "joulukuu"],
		monthsShort: ["tam", "hel", "maa", "huh", "tou", "kes", "hei", "elo", "syy", "lok", "mar", "jou"],
		today: "tänään",
		weekStart: 1,
		format: "d.m.yyyy"
	};
}(jQuery));

/**
 * French translation for bootstrap-datepicker
 * Nico Mollet <nico.mollet@gmail.com>
 */
;(function($){
	$.fn.datepicker.dates['fr'] = {
		days: ["Dimanche", "Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"],
		daysShort: ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam", "Dim"],
		daysMin: ["D", "L", "Ma", "Me", "J", "V", "S", "D"],
		months: ["Janvier", "Février", "Mars", "Avril", "Mai", "Juin", "Juillet", "Août", "Septembre", "Octobre", "Novembre", "Décembre"],
		monthsShort: ["Jan", "Fev", "Mar", "Avr", "Mai", "Jui", "Jul", "Aou", "Sep", "Oct", "Nov", "Dec"],
		today: "Aujourd'hui",
		clear: "Effacer",
		weekStart: 1,
		format: "dd/mm/yyyy"
	};
}(jQuery));

/**
 * Hebrew translation for bootstrap-datepicker
 * Sagie Maoz <sagie@maoz.info>
 */
;(function($){
  $.fn.datepicker.dates['he'] = {
      days: ["ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת", "ראשון"],
      daysShort: ["א", "ב", "ג", "ד", "ה", "ו", "ש", "א"],
      daysMin: ["א", "ב", "ג", "ד", "ה", "ו", "ש", "א"],
      months: ["ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"],
      monthsShort: ["ינו", "פבר", "מרץ", "אפר", "מאי", "יונ", "יול", "אוג", "ספט", "אוק", "נוב", "דצמ"],
      today: "היום",
      rtl: true
  };
}(jQuery));

/**
 * Croatian localisation
 */
;(function($){
	$.fn.datepicker.dates['hr'] = {
		days: ["Nedjelja", "Ponedjelja", "Utorak", "Srijeda", "Četrtak", "Petak", "Subota", "Nedjelja"],
		daysShort: ["Ned", "Pon", "Uto", "Srr", "Čet", "Pet", "Sub", "Ned"],
		daysMin: ["Ne", "Po", "Ut", "Sr", "Če", "Pe", "Su", "Ne"],
		months: ["Siječanj", "Veljača", "Ožujak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac"],
		monthsShort: ["Sije", "Velj", "Ožu", "Tra", "Svi", "Lip", "Jul", "Kol", "Ruj", "Lis", "Stu", "Pro"],
		today: "Danas"
	};
}(jQuery));

/**
 * Hungarian translation for bootstrap-datepicker
 * Sotus László <lacisan@gmail.com>
 */
;(function($){
  $.fn.datepicker.dates['hu'] = {
		days: ["Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat", "Vasárnap"],
		daysShort: ["Vas", "Hét", "Ked", "Sze", "Csü", "Pén", "Szo", "Vas"],
		daysMin: ["Va", "Hé", "Ke", "Sz", "Cs", "Pé", "Sz", "Va"],
		months: ["Január", "Február", "Március", "Április", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"],
		monthsShort: ["Jan", "Feb", "Már", "Ápr", "Máj", "Jún", "Júl", "Aug", "Sze", "Okt", "Nov", "Dec"],
		today: "Ma",
		weekStart: 1,
		format: "yyyy.mm.dd"
	};
}(jQuery));

/**
 * Bahasa translation for bootstrap-datepicker
 * Azwar Akbar <azwar.akbar@gmail.com>
 */
;(function($){
	$.fn.datepicker.dates['id'] = {
		days: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
		daysShort: ["Mgu", "Sen", "Sel", "Rab", "Kam", "Jum", "Sab", "Mgu"],
		daysMin: ["Mg", "Sn", "Sl", "Ra", "Ka", "Ju", "Sa", "Mg"],
		months: ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"],
		monthsShort: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ags", "Sep", "Okt", "Nov", "Des"],
		today: "Hari Ini",
		clear: "Kosongkan"
	};
}(jQuery));

/**
 * Icelandic translation for bootstrap-datepicker
 * Hinrik Örn Sigurðsson <hinrik.sig@gmail.com>
 */
;(function($){
	$.fn.datepicker.dates['is'] = {
		days: ["Sunnudagur", "Mánudagur", "Þriðjudagur", "Miðvikudagur", "Fimmtudagur", "Föstudagur", "Laugardagur", "Sunnudagur"],
		daysShort: ["Sun", "Mán", "Þri", "Mið", "Fim", "Fös", "Lau", "Sun"],
		daysMin: ["Su", "Má", "Þr", "Mi", "Fi", "Fö", "La", "Su"],
		months: ["Janúar", "Febrúar", "Mars", "Apríl", "Maí", "Júní", "Júlí", "Ágúst", "September", "Október", "Nóvember", "Desember"],
		monthsShort: ["Jan", "Feb", "Mar", "Apr", "Maí", "Jún", "Júl", "Ágú", "Sep", "Okt", "Nóv", "Des"],
		today: "Í Dag"
	};
}(jQuery));

/**
 * Italian translation for bootstrap-datepicker
 * Enrico Rubboli <rubboli@gmail.com>
 */
;(function($){
	$.fn.datepicker.dates['it'] = {
		days: ["Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato", "Domenica"],
		daysShort: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Dom"],
		daysMin: ["Do", "Lu", "Ma", "Me", "Gi", "Ve", "Sa", "Do"],
		months: ["Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"],
		monthsShort: ["Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic"],
		today: "Oggi",
		weekStart: 1,
		format: "dd/mm/yyyy"
	};
}(jQuery));

/**
 * Japanese translation for bootstrap-datepicker
 * Norio Suzuki <https://github.com/suzuki/>
 */
;(function($){
	$.fn.datepicker.dates['ja'] = {
		days: ["日曜", "月曜", "火曜", "水曜", "木曜", "金曜", "土曜", "日曜"],
		daysShort: ["日", "月", "火", "水", "木", "金", "土", "日"],
		daysMin: ["日", "月", "火", "水", "木", "金", "土", "日"],
		months: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
		monthsShort: ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"],
		today: "今日",
		format: "yyyy/mm/dd"
	};
}(jQuery));

/**
 * Georgian translation for bootstrap-datepicker
 * Levan Melikishvili <levani0101@yahoo.com>
 */
;(function($){
    $.fn.datepicker.dates['ka'] = {
        days: ["კვირა", "ორშაბათი", "სამშაბათი", "ოთხშაბათი", "ხუთშაბათი", "პარასკევი", "შაბათი", "კვირა"],
        daysShort: ["კვი", "ორშ", "სამ", "ოთხ", "ხუთ", "პარ", "შაბ", "კვი"],
        daysMin: ["კვ", "ორ", "სა", "ოთ", "ხუ", "პა", "შა", "კვ"],
        months: ["იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი", "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომები", "ნოემბერი", "დეკემბერი"],
        monthsShort: ["იან", "თებ", "მარ", "აპრ", "მაი", "ივნ", "ივლ", "აგვ", "სექ", "ოქტ", "ნოე", "დეკ"],
        today: "დღეს",
        clear: "გასუფთავება"
    };
}(jQuery));

/**
 * Korean translation for bootstrap-datepicker
 * Gu Youn <http://github.com/guyoun>
 */
;(function($){
	$.fn.datepicker.dates['kr'] = {
		days: ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일", "일요일"],
		daysShort: ["일", "월", "화", "수", "목", "금", "토", "일"],
		daysMin: ["일", "월", "화", "수", "목", "금", "토", "일"],
		months: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"],
		monthsShort: ["1월", "2월", "3월", "4월", "5월", "6월", "7월", "8월", "9월", "10월", "11월", "12월"]
	};
}(jQuery));

/**
 * Lithuanian translation for bootstrap-datepicker
 * Šarūnas Gliebus <ssharunas@yahoo.co.uk>
 */

;(function($){
    $.fn.datepicker.dates['lt'] = {
        days: ["Sekmadienis", "Pirmadienis", "Antradienis", "Trečiadienis", "Ketvirtadienis", "Penktadienis", "Šeštadienis", "Sekmadienis"],
        daysShort: ["S", "Pr", "A", "T", "K", "Pn", "Š", "S"],
        daysMin: ["Sk", "Pr", "An", "Tr", "Ke", "Pn", "Št", "Sk"],
        months: ["Sausis", "Vasaris", "Kovas", "Balandis", "Gegužė", "Birželis", "Liepa", "Rugpjūtis", "Rugsėjis", "Spalis", "Lapkritis", "Gruodis"],
        monthsShort: ["Sau", "Vas", "Kov", "Bal", "Geg", "Bir", "Lie", "Rugp", "Rugs", "Spa", "Lap", "Gru"],
        today: "Šiandien",
        weekStart: 1
    };
}(jQuery));

/**
 * Latvian translation for bootstrap-datepicker
 * Artis Avotins <artis@apit.lv>
 */

;(function($){
    $.fn.datepicker.dates['lv'] = {
        days: ["Svētdiena", "Pirmdiena", "Otrdiena", "Trešdiena", "Ceturtdiena", "Piektdiena", "Sestdiena", "Svētdiena"],
        daysShort: ["Sv", "P", "O", "T", "C", "Pk", "S", "Sv"],
        daysMin: ["Sv", "Pr", "Ot", "Tr", "Ce", "Pk", "St", "Sv"],
        months: ["Janvāris", "Februāris", "Marts", "Aprīlis", "Maijs", "Jūnijs", "Jūlijs", "Augusts", "Septembris", "Oktobris", "Novembris", "Decembris"],
        monthsShort: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jūn", "Jūl", "Aug", "Sep", "Okt", "Nov", "Dec."],
        today: "Šodien",
        weekStart: 1
    };
}(jQuery));
/**
 * Macedonian translation for bootstrap-datepicker
 * Marko Aleksic <psybaron@gmail.com>
 */
;(function($){
    $.fn.datepicker.dates['mk'] = {
        days: ["Недела", "Понеделник", "Вторник", "Среда", "Четврток", "Петок", "Сабота", "Недела"],
        daysShort: ["Нед", "Пон", "Вто", "Сре", "Чет", "Пет", "Саб", "Нед"],
        daysMin: ["Не", "По", "Вт", "Ср", "Че", "Пе", "Са", "Не"],
        months: ["Јануари", "Февруари", "Март", "Април", "Мај", "Јуни", "Јули", "Август", "Септември", "Октомври", "Ноември", "Декември"],
        monthsShort: ["Јан", "Фев", "Мар", "Апр", "Мај", "Јун", "Јул", "Авг", "Сеп", "Окт", "Ное", "Дек"],
        today: "Денес"
    };
}(jQuery));

/**
 * Malay translation for bootstrap-datepicker
 * Ateman Faiz <noorulfaiz@gmail.com>
 */
;(function($){
	$.fn.datepicker.dates['ms'] = {
		days: ["Ahad", "Isnin", "Selasa", "Rabu", "Khamis", "Jumaat", "Sabtu", "Ahad"],
		daysShort: ["Aha", "Isn", "Sel", "Rab", "Kha", "Jum", "Sab", "Aha"],
		daysMin: ["Ah", "Is", "Se", "Ra", "Kh", "Ju", "Sa", "Ah"],
		months: ["Januari", "Februari", "Mac", "April", "Mei", "Jun", "Julai", "Ogos", "September", "Oktober", "November", "Disember"],
		monthsShort: ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Ogo", "Sep", "Okt", "Nov", "Dis"],
		today: "Hari Ini"
	};
}(jQuery));

/**
 * Norwegian (bokmål) translation for bootstrap-datepicker
 * Fredrik Sundmyhr <http://github.com/fsundmyhr>
 */
;(function($){
	$.fn.datepicker.dates['nb'] = {
		days: ["Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag", "Søndag"],
		daysShort: ["Søn", "Man", "Tir", "Ons", "Tor", "Fre", "Lør", "Søn"],
		daysMin: ["Sø", "Ma", "Ti", "On", "To", "Fr", "Lø", "Sø"],
		months: ["Januar", "Februar", "Mars", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Desember"],
		monthsShort: ["Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Des"],
		today: "I Dag"
	};
}(jQuery));
/**
 * Dutch translation for bootstrap-datepicker
 * Reinier Goltstein <mrgoltstein@gmail.com>
 */
;(function($){
	$.fn.datepicker.dates['nl'] = {
		days: ["Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"],
		daysShort: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"],
		daysMin: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za", "Zo"],
		months: ["Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "Oktober", "November", "December"],
		monthsShort: ["Jan", "Feb", "Mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
		today: "Vandaag"
	};
}(jQuery));

/**
 *  Norwegian translation for bootstrap-datepicker
 **/
;(function($){
  $.fn.datepicker.dates['no'] = {
    days: ['Søndag','Mandag','Tirsdag','Onsdag','Torsdag','Fredag','Lørdag'],
    daysShort: ['Søn','Man','Tir','Ons','Tor','Fre','Lør'],
    daysMin: ['Sø','Ma','Ti','On','To','Fr','Lø'],
    months: ['Januar','Februar','Mars','April','Mai','Juni','Juli','August','September','Oktober','November','Desember'],
    monthsShort: ['Jan','Feb','Mar','Apr','Mai','Jun','Jul','Aug','Sep','Okt','Nov','Des'],
    today: 'I dag',
    clear: 'Nullstill',
    weekStart: 0
  };
}(jQuery));

/**
 * Polish translation for bootstrap-datepicker
 * Robert <rtpm@gazeta.pl>
 */
;(function($){
        $.fn.datepicker.dates['pl'] = {
                days: ["Niedziela", "Poniedziałek", "Wtorek", "Środa", "Czwartek", "Piątek", "Sobota", "Niedziela"],
                daysShort: ["Nie", "Pn", "Wt", "Śr", "Czw", "Pt", "So", "Nie"],
                daysMin: ["N", "Pn", "Wt", "Śr", "Cz", "Pt", "So", "N"],
                months: ["Styczeń", "Luty", "Marzec", "Kwiecień", "Maj", "Czerwiec", "Lipiec", "Sierpień", "Wrzesień", "Październik", "Listopad", "Grudzień"],
                monthsShort: ["Sty", "Lu", "Mar", "Kw", "Maj", "Cze", "Lip", "Sie", "Wrz", "Pa", "Lis", "Gru"],
                today: "Dzisiaj",
                weekStart: 1
        };
}(jQuery));

/**
 * Brazilian translation for bootstrap-datepicker
 * Cauan Cabral <cauan@radig.com.br>
 */
;(function($){
	$.fn.datepicker.dates['pt-BR'] = {
		days: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"],
		daysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
		daysMin: ["Do", "Se", "Te", "Qu", "Qu", "Se", "Sa", "Do"],
		months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
		monthsShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
		today: "Hoje",
		clear: "Limpar"
	};
}(jQuery));

/**
 * Portuguese translation for bootstrap-datepicker
 * Original code: Cauan Cabral <cauan@radig.com.br>
 * Tiago Melo <tiago.blackcode@gmail.com>
 */
;(function($){
	$.fn.datepicker.dates['pt'] = {
		days: ["Domingo", "Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"],
		daysShort: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
		daysMin: ["Do", "Se", "Te", "Qu", "Qu", "Se", "Sa", "Do"],
		months: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
		monthsShort: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"],
		today: "Hoje",
		clear: "Limpar"
	};
}(jQuery));

/**
 * Romanian translation for bootstrap-datepicker
 * Cristian Vasile <cristi.mie@gmail.com>
 */
;(function($){
	$.fn.datepicker.dates['ro'] = {
		days: ["Duminică", "Luni", "Marţi", "Miercuri", "Joi", "Vineri", "Sâmbătă", "Duminică"],
		daysShort: ["Dum", "Lun", "Mar", "Mie", "Joi", "Vin", "Sâm", "Dum"],
		daysMin: ["Du", "Lu", "Ma", "Mi", "Jo", "Vi", "Sâ", "Du"],
		months: ["Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"],
		monthsShort: ["Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		today: "Astăzi",
		weekStart: 1
	};
}(jQuery));

/**
 * Serbian latin translation for bootstrap-datepicker
 * Bojan Milosavlević <milboj@gmail.com>
 */
;(function($){
	$.fn.datepicker.dates['rs-latin'] = {
		days: ["Nedelja","Ponedeljak", "Utorak", "Sreda", "Četvrtak", "Petak", "Subota", "Nedelja"],
		daysShort: ["Ned", "Pon", "Uto", "Sre", "Čet", "Pet", "Sub", "Ned"],
		daysMin: ["N", "Po", "U", "Sr", "Č", "Pe", "Su", "N"],
		months: ["Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"],
		monthsShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec"],
		today: "Danas"
	};
}(jQuery));

/**
 * Serbian cyrillic translation for bootstrap-datepicker
 * Bojan Milosavlević <milboj@gmail.com>
 */
;(function($){
	$.fn.datepicker.dates['rs'] = {
		days: ["Недеља","Понедељак", "Уторак", "Среда", "Четвртак", "Петак", "Субота", "Недеља"],
		daysShort: ["Нед", "Пон", "Уто", "Сре", "Чет", "Пет", "Суб", "Нед"],
		daysMin: ["Н", "По", "У", "Ср", "Ч", "Пе", "Су", "Н"],
		months: ["Јануар", "Фебруар", "Март", "Април", "Мај", "Јун", "Јул", "Август", "Септембар", "Октобар", "Новембар", "Децембар"],
		monthsShort: ["Јан", "Феб", "Мар", "Апр", "Мај", "Јун", "Јул", "Авг", "Сеп", "Окт", "Нов", "Дец"],
		today: "Данас"
	};
}(jQuery));

/**
 * Russian translation for bootstrap-datepicker
 * Victor Taranenko <darwin@snowdale.com>
 */
;(function($){
	$.fn.datepicker.dates['ru'] = {
		days: ["Воскресенье", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота", "Воскресенье"],
		daysShort: ["Вск", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Суб", "Вск"],
		daysMin: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"],
		months: ["Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"],
		monthsShort: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
		today: "Сегодня",
		weekStart: 1
	};
}(jQuery));

/**
 * Slovak translation for bootstrap-datepicker
 * Marek Lichtner <marek@licht.sk>
 * Fixes by Michal Remiš <michal.remis@gmail.com>
 */
;(function($){
	$.fn.datepicker.dates["sk"] = {
		days: ["Nedeľa", "Pondelok", "Utorok", "Streda", "Štvrtok", "Piatok", "Sobota", "Nedeľa"],
		daysShort: ["Ned", "Pon", "Uto", "Str", "Štv", "Pia", "Sob", "Ned"],
		daysMin: ["Ne", "Po", "Ut", "St", "Št", "Pia", "So", "Ne"],
		months: ["Január", "Február", "Marec", "Apríl", "Máj", "Jún", "Júl", "August", "September", "Október", "November", "December"],
		monthsShort: ["Jan", "Feb", "Mar", "Apr", "Máj", "Jún", "Júl", "Aug", "Sep", "Okt", "Nov", "Dec"],
		today: "Dnes"
	};
}(jQuery));

/**
 * Slovene translation for bootstrap-datepicker
 * Gregor Rudolf <gregor.rudolf@gmail.com>
 */
;(function($){
	$.fn.datepicker.dates['sl'] = {
		days: ["Nedelja", "Ponedeljek", "Torek", "Sreda", "Četrtek", "Petek", "Sobota", "Nedelja"],
		daysShort: ["Ned", "Pon", "Tor", "Sre", "Čet", "Pet", "Sob", "Ned"],
		daysMin: ["Ne", "Po", "To", "Sr", "Če", "Pe", "So", "Ne"],
		months: ["Januar", "Februar", "Marec", "April", "Maj", "Junij", "Julij", "Avgust", "September", "Oktober", "November", "December"],
		monthsShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec"],
		today: "Danes"
	};
}(jQuery));

/**
 * Albanian translation for bootstrap-datepicker
 * Tomor Pupovci <http://www.github.com/ttomor>
 */
;(function($){
	$.fn.datepicker.dates['sq'] = {
		days: ["E Diel", "E Hënë", "E martē", "E mërkurë", "E Enjte", "E Premte", "E Shtunë", "E Diel"],
		daysShort: ["Die", "Hën", "Mar", "Mër", "Enj", "Pre", "Shtu", "Die"],
		daysMin: ["Di", "Hë", "Ma", "Më", "En", "Pr", "Sht", "Di"],
		months: ["Janar", "Shkurt", "Mars", "Prill", "Maj", "Qershor", "Korrik", "Gusht", "Shtator", "Tetor", "Nëntor", "Dhjetor"],
		monthsShort: ["Jan", "Shk", "Mar", "Pri", "Maj", "Qer", "Korr", "Gu", "Sht", "Tet", "Nën", "Dhjet"],
		today: "Sot"
	};
}(jQuery));


/**
 * Swedish translation for bootstrap-datepicker
 * Patrik Ragnarsson <patrik@starkast.net>
 */
;(function($){
	$.fn.datepicker.dates['sv'] = {
		days: ["Söndag", "Måndag", "Tisdag", "Onsdag", "Torsdag", "Fredag", "Lördag", "Söndag"],
		daysShort: ["Sön", "Mån", "Tis", "Ons", "Tor", "Fre", "Lör", "Sön"],
		daysMin: ["Sö", "Må", "Ti", "On", "To", "Fr", "Lö", "Sö"],
		months: ["Januari", "Februari", "Mars", "April", "Maj", "Juni", "Juli", "Augusti", "September", "Oktober", "November", "December"],
		monthsShort: ["Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"],
		today: "I Dag",
		format: "yyyy-mm-dd",
		weekStart: 1
	};
}(jQuery));

/**
 * Swahili translation for bootstrap-datepicker
 * Edwin Mugendi <https://github.com/edwinmugendi>
 * Source: http://scriptsource.org/cms/scripts/page.php?item_id=entry_detail&uid=xnfaqyzcku
 */
;(function($){
    $.fn.datepicker.dates['sw'] = {
        days: ["Jumapili", "Jumatatu", "Jumanne", "Jumatano", "Alhamisi", "Ijumaa", "Jumamosi", "Jumapili"],
        daysShort: ["J2", "J3", "J4", "J5", "Alh", "Ij", "J1", "J2"],
        daysMin: ["2", "3", "4", "5", "A", "I", "1", "2"],
        months: ["Januari", "Februari", "Machi", "Aprili", "Mei", "Juni", "Julai", "Agosti", "Septemba", "Oktoba", "Novemba", "Desemba"],
        monthsShort: ["Jan", "Feb", "Mac", "Apr", "Mei", "Jun", "Jul", "Ago", "Sep", "Okt", "Nov", "Des"],
        today: "Leo"
    };
}(jQuery));

/**
 * Thai translation for bootstrap-datepicker
 * Suchau Jiraprapot <seroz24@gmail.com>
 */
;(function($){
	$.fn.datepicker.dates['th'] = {
		days: ["อาทิตย์", "จันทร์", "อังคาร", "พุธ", "พฤหัส", "ศุกร์", "เสาร์", "อาทิตย์"],
		daysShort: ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส", "อา"],
		daysMin: ["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส", "อา"],
		months: ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"],
		monthsShort: ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."],
		today: "วันนี้"
	};
}(jQuery));

/**
 * Turkish translation for bootstrap-datepicker
 * Serkan Algur <kaisercrazy_2@hotmail.com>
 */
;(function($){
	$.fn.datepicker.dates['tr'] = {
		days: ["Pazar", "Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"],
		daysShort: ["Pz", "Pzt", "Sal", "Çrş", "Prş", "Cu", "Cts", "Pz"],
		daysMin: ["Pz", "Pzt", "Sa", "Çr", "Pr", "Cu", "Ct", "Pz"],
		months: ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"],
		monthsShort: ["Oca", "Şub", "Mar", "Nis", "May", "Haz", "Tem", "Ağu", "Eyl", "Eki", "Kas", "Ara"],
		today: "Bugün",
		format: "dd.mm.yyyy"
	};
}(jQuery));


/**
 * Ukrainian translation for bootstrap-datepicker
 * Andrey Vityuk <andrey [dot] vityuk [at] gmail.com>
 */
;(function($){
	$.fn.datepicker.dates['uk'] = {
		days: ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота", "Неділя"],
		daysShort: ["Нед", "Пнд", "Втр", "Срд", "Чтв", "Птн", "Суб", "Нед"],
		daysMin: ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Нд"],
		months: ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"],
		monthsShort: ["Січ", "Лют", "Бер", "Кві", "Тра", "Чер", "Лип", "Сер", "Вер", "Жов", "Лис", "Гру"],
		today: "Сьогодні"
	};
}(jQuery));
/**
 * Simplified Chinese translation for bootstrap-datepicker
 * Yuan Cheung <advanimal@gmail.com>
 */
;(function($){
	$.fn.datepicker.dates['zh-CN'] = {
		days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
		daysShort: ["周日", "周一", "周二", "周三", "周四", "周五", "周六", "周日"],
		daysMin:  ["日", "一", "二", "三", "四", "五", "六", "日"],
		months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
		monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
		today: "今日",
		format: "yyyy年mm月dd日",
		weekStart: 1
	};
}(jQuery));

/**
 * Traditional Chinese translation for bootstrap-datepicker
 * Rung-Sheng Jang <daniel@i-trend.co.cc>
 * FrankWu  <frankwu100@gmail.com> Fix more appropriate use of Traditional Chinese habit
 */
;(function($){
	$.fn.datepicker.dates['zh-TW'] = {
		days: ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"],
		daysShort: ["週日", "週一", "週二", "週三", "週四", "週五", "週六", "週日"],
		daysMin:  ["日", "一", "二", "三", "四", "五", "六", "日"],
		months: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
		monthsShort: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
		today: "今天",
		format: "yyyy年mm月dd日",
		weekStart: 1
	};
}(jQuery));

var dp;

dp = angular.module('ng-bootstrap-datepicker', []);

dp.directive('ngDatepicker', function() {
  return {
    restrict: 'A',
    replace: true,
    scope: {
      ngOptions: '=',
      ngModel: '='
    },
    template: "<div class=\"input-append date\">\n  <input type=\"text\"><span class=\"add-on\"><i class=\"icon-th\"></i></span>\n</div>",
    link: function(scope, element) {
      scope.inputHasFocus = false;
      element.datepicker(scope.ngOptions).on('changeDate', function(e) {
        var defaultFormat, defaultLanguage, format, language;
        defaultFormat = $.fn.datepicker.defaults.format;
        format = scope.ngOptions.format || defaultFormat;
        defaultLanguage = $.fn.datepicker.defaults.language;
        language = scope.ngOptions.language || defaultLanguage;
        return scope.$apply(function() {
          return scope.ngModel = $.fn.datepicker.DPGlobal.formatDate(e.date, format, language);
        });
      });
      element.find('input').on('focus', function() {
        return scope.inputHasFocus = true;
      }).on('blur', function() {
        return scope.inputHasFocus = false;
      });
      return scope.$watch('ngModel', function(newValue) {
        if (!scope.inputHasFocus) {
          return element.datepicker('update', newValue);
        }
      });
    }
  };
});


/***/ }),
/* 7 */
/***/ (function(module, exports) {

(function () {
    var picker;

    picker = angular.module('angularDatepicker', []);



    picker.directive('picker', ['$locale', function ($locale) {


        return {
            restrict: 'A',
            scope: {
                ngModel: "=ngModel",
                ngModelDate: '=ngModelDate',
                startDate: '=startDate'
            },
            require: 'ngModel',
            link: function ($scope, element, attrs, ngModelCtrl) {
                picker.defaults = { format: $locale.DATETIME_FORMATS.shortDate.toLowerCase().replace('yy', 'yyyy'), language: $locale.id, orientation: "left", autoclose: true };

                var config = $scope.$parent.vm && $scope.$parent.vm.configuracao ? $scope.$parent.vm.configuracao : picker.defaults;
                config.startDate = $scope.startDate;

                var pickerElem = element.datepicker(config);
                pickerElem.on('changeDate', function (ev) {
                    $scope.$apply(function () {
                        $scope.ngModelDate = ev.date;
                    });
                });

                ngModelCtrl.$render = function () {
                    var newValue = ngModelCtrl.$viewValue;
                    if (newValue !== undefined && newValue !== NaN && newValue !== null) {
                        element.datepicker("update", newValue);
                    }
                    else {
                        if (element.context != null && element.context != undefined) element.context.value = "";
                    }
                };

            }
        };
    }]);

}).call(this);


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./js/bootstrap-select.js": 9
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 8;

/***/ }),
/* 9 */
/***/ (function(module, exports) {

/*!
 * Bootstrap-select v1.6.3 (http://silviomoreto.github.io/bootstrap-select/)
 *
 * Copyright 2013-2014 bootstrap-select
 * Licensed under MIT (https://github.com/silviomoreto/bootstrap-select/blob/master/LICENSE)
 */
(function ($) {
  'use strict';

  // Case insensitive search
  $.expr[':'].icontains = function (obj, index, meta) {
    return icontains($(obj).text(), meta[3]);
  };

  // Case and accent insensitive search
  $.expr[':'].aicontains = function (obj, index, meta) {
    return icontains($(obj).data('normalizedText') || $(obj).text(), meta[3]);
  };

  /**
   * Actual implementation of the case insensitive search.
   * @access private
   * @param {String} haystack
   * @param {String} needle
   * @returns {boolean}
   */
  function icontains(haystack, needle) {
    return haystack.toUpperCase().indexOf(needle.toUpperCase()) > -1;
  }

  /**
   * Remove all diatrics from the given text.
   * @access private
   * @param {String} text
   * @returns {String}
   */
  function normalizeToBase(text) {
    var rExps = [
      {re: /[\xC0-\xC6]/g, ch: "A"},
      {re: /[\xE0-\xE6]/g, ch: "a"},
      {re: /[\xC8-\xCB]/g, ch: "E"},
      {re: /[\xE8-\xEB]/g, ch: "e"},
      {re: /[\xCC-\xCF]/g, ch: "I"},
      {re: /[\xEC-\xEF]/g, ch: "i"},
      {re: /[\xD2-\xD6]/g, ch: "O"},
      {re: /[\xF2-\xF6]/g, ch: "o"},
      {re: /[\xD9-\xDC]/g, ch: "U"},
      {re: /[\xF9-\xFC]/g, ch: "u"},
      {re: /[\xC7-\xE7]/g, ch: "c"},
      {re: /[\xD1]/g, ch: "N"},
      {re: /[\xF1]/g, ch: "n"}
    ];
    $.each(rExps, function () {
      text = text.replace(this.re, this.ch);
    });
    return text;
  }


  function htmlEscape(html) {
    var escapeMap = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#x27;',
      '`': '&#x60;'
    };
    var source = '(?:' + Object.keys(escapeMap).join('|') + ')',
        testRegexp = new RegExp(source),
        replaceRegexp = new RegExp(source, 'g'),
        string = html == null ? '' : '' + html;
    return testRegexp.test(string) ? string.replace(replaceRegexp, function (match) {
      return escapeMap[match];
    }) : string;
  }

  var Selectpicker = function (element, options, e) {
    if (e) {
      e.stopPropagation();
      e.preventDefault();
    }

    this.$element = $(element);
    this.$newElement = null;
    this.$button = null;
    this.$menu = null;
    this.$lis = null;
    this.options = options;

    // If we have no title yet, try to pull it from the html title attribute (jQuery doesnt' pick it up as it's not a
    // data-attribute)
    if (this.options.title === null) {
      this.options.title = this.$element.attr('title');
    }

    //Expose public methods
    this.val = Selectpicker.prototype.val;
    this.render = Selectpicker.prototype.render;
    this.refresh = Selectpicker.prototype.refresh;
    this.setStyle = Selectpicker.prototype.setStyle;
    this.selectAll = Selectpicker.prototype.selectAll;
    this.deselectAll = Selectpicker.prototype.deselectAll;
    this.destroy = Selectpicker.prototype.remove;
    this.remove = Selectpicker.prototype.remove;
    this.show = Selectpicker.prototype.show;
    this.hide = Selectpicker.prototype.hide;

    this.init();
  };

  Selectpicker.VERSION = '1.6.3';

  // part of this is duplicated in i18n/defaults-en_US.js. Make sure to update both.
  Selectpicker.DEFAULTS = {
    noneSelectedText: 'Nothing selected',
    noneResultsText: 'No results match',
    countSelectedText: function (numSelected, numTotal) {
      return (numSelected == 1) ? "{0} item selected" : "{0} items selected";
    },
    maxOptionsText: function (numAll, numGroup) {
      var arr = [];

      arr[0] = (numAll == 1) ? 'Limit reached ({n} item max)' : 'Limit reached ({n} items max)';
      arr[1] = (numGroup == 1) ? 'Group limit reached ({n} item max)' : 'Group limit reached ({n} items max)';

      return arr;
    },
    selectAllText: 'Select All',
    deselectAllText: 'Deselect All',
    multipleSeparator: ', ',
    style: 'btn-default',
    size: 'auto',
    title: null,
    selectedTextFormat: 'values',
    width: false,
    container: false,
    hideDisabled: false,
    showSubtext: false,
    showIcon: true,
    showContent: true,
    dropupAuto: true,
    header: false,
    liveSearch: false,
    actionsBox: false,
    iconBase: 'glyphicon',
    tickIcon: 'glyphicon-ok',
    maxOptions: false,
    mobile: false,
    selectOnTab: false,
    dropdownAlignRight: false,
    searchAccentInsensitive: false
  };

  Selectpicker.prototype = {

    constructor: Selectpicker,

    init: function () {
      var that = this,
          id = this.$element.attr('id');

      this.$element.hide();
      this.multiple = this.$element.prop('multiple');
      this.autofocus = this.$element.prop('autofocus');
      this.$newElement = this.createView();
      this.$element.after(this.$newElement);
      this.$menu = this.$newElement.find('> .dropdown-menu');
      this.$button = this.$newElement.find('> button');
      this.$searchbox = this.$newElement.find('input');

      if (this.options.dropdownAlignRight)
        this.$menu.addClass('dropdown-menu-right');

      if (typeof id !== 'undefined') {
        this.$button.attr('data-id', id);
        $('label[for="' + id + '"]').click(function (e) {
          e.preventDefault();
          that.$button.focus();
        });
      }

      this.checkDisabled();
      this.clickListener();
      if (this.options.liveSearch) this.liveSearchListener();
      this.render();
      this.liHeight();
      this.setStyle();
      this.setWidth();
      if (this.options.container) this.selectPosition();
      this.$menu.data('this', this);
      this.$newElement.data('this', this);
      if (this.options.mobile) this.mobile();
    },

    createDropdown: function () {
      // Options
      // If we are multiple, then add the show-tick class by default
      var multiple = this.multiple ? ' show-tick' : '',
          inputGroup = this.$element.parent().hasClass('input-group') ? ' input-group-btn' : '',
          autofocus = this.autofocus ? ' autofocus' : '',
          btnSize = this.$element.parents().hasClass('form-group-lg') ? ' btn-lg' : (this.$element.parents().hasClass('form-group-sm') ? ' btn-sm' : '');
      // Elements
      var header = this.options.header ? '<div class="popover-title"><button type="button" class="close" aria-hidden="true">&times;</button>' + this.options.header + '</div>' : '';
      var searchbox = this.options.liveSearch ? '<div class="bs-searchbox"><input type="text" class="input-block-level form-control" autocomplete="off" /></div>' : '';
      var actionsbox = this.options.actionsBox ? '<div class="bs-actionsbox">' +
      '<div class="btn-group btn-block">' +
      '<button class="actions-btn bs-select-all btn btn-sm btn-default">' +
      this.options.selectAllText +
      '</button>' +
      '<button class="actions-btn bs-deselect-all btn btn-sm btn-default">' +
      this.options.deselectAllText +
      '</button>' +
      '</div>' +
      '</div>' : '';
      var drop =
          '<div class="btn-group bootstrap-select' + multiple + inputGroup + '">' +
          '<button type="button" class="btn dropdown-toggle selectpicker' + btnSize + '" data-toggle="dropdown"' + autofocus + '>' +
          '<span class="filter-option pull-left"></span>&nbsp;' +
          '<span class="caret"></span>' +
          '</button>' +
          '<div class="dropdown-menu open">' +
          header +
          searchbox +
          actionsbox +
          '<ul class="dropdown-menu inner selectpicker" role="menu">' +
          '</ul>' +
          '</div>' +
          '</div>';

      return $(drop);
    },

    createView: function () {
      var $drop = this.createDropdown();
      var $li = this.createLi();
      $drop.find('ul').append($li);
      return $drop;
    },

    reloadLi: function () {
      //Remove all children.
      this.destroyLi();
      //Re build
      var $li = this.createLi();
      this.$menu.find('ul').append($li);
    },

    destroyLi: function () {
      this.$menu.find('li').remove();
    },

    createLi: function () {
      var that = this,
          _li = [],
          optID = 0;

      // Helper functions
      /**
       * @param content
       * @param [index]
       * @param [classes]
       * @returns {string}
       */
      var generateLI = function (content, index, classes) {
        return '<li' +
        (typeof classes !== 'undefined' ? ' class="' + classes + '"' : '') +
        (typeof index !== 'undefined' | null === index ? ' data-original-index="' + index + '"' : '') +
        '>' + content + '</li>';
      };

      /**
       * @param text
       * @param [classes]
       * @param [inline]
       * @param [optgroup]
       * @returns {string}
       */
      var generateA = function (text, classes, inline, optgroup) {
        var normText = normalizeToBase(htmlEscape(text));
        return '<a tabindex="0"' +
        (typeof classes !== 'undefined' ? ' class="' + classes + '"' : '') +
        (typeof inline !== 'undefined' ? ' style="' + inline + '"' : '') +
        (typeof optgroup !== 'undefined' ? 'data-optgroup="' + optgroup + '"' : '') +
        ' data-normalized-text="' + normText + '"' +
        '>' + text +
        '<span class="' + that.options.iconBase + ' ' + that.options.tickIcon + ' check-mark"></span>' +
        '</a>';
      };

      this.$element.find('option').each(function () {
        var $this = $(this);

        // Get the class and text for the option
        var optionClass = $this.attr('class') || '',
            inline = $this.attr('style'),
            text = $this.data('content') ? $this.data('content') : $this.html(),
            subtext = typeof $this.data('subtext') !== 'undefined' ? '<small class="muted text-muted">' + $this.data('subtext') + '</small>' : '',
            icon = typeof $this.data('icon') !== 'undefined' ? '<span class="' + that.options.iconBase + ' ' + $this.data('icon') + '"></span> ' : '',
            isDisabled = $this.is(':disabled') || $this.parent().is(':disabled'),
            index = $this[0].index;
        if (icon !== '' && isDisabled) {
          icon = '<span>' + icon + '</span>';
        }

        if (!$this.data('content')) {
          // Prepend any icon and append any subtext to the main text.
          text = icon + '<span class="text">' + text + subtext + '</span>';
        }

        if (that.options.hideDisabled && isDisabled) {
          return;
        }

        if ($this.parent().is('optgroup') && $this.data('divider') !== true) {
          if ($this.index() === 0) { // Is it the first option of the optgroup?
            optID += 1;

            // Get the opt group label
            var label = $this.parent().attr('label');
            var labelSubtext = typeof $this.parent().data('subtext') !== 'undefined' ? '<small class="muted text-muted">' + $this.parent().data('subtext') + '</small>' : '';
            var labelIcon = $this.parent().data('icon') ? '<span class="' + that.options.iconBase + ' ' + $this.parent().data('icon') + '"></span> ' : '';
            label = labelIcon + '<span class="text">' + label + labelSubtext + '</span>';

            if (index !== 0 && _li.length > 0) { // Is it NOT the first option of the select && are there elements in the dropdown?
              _li.push(generateLI('', null, 'divider'));
            }

            _li.push(generateLI(label, null, 'dropdown-header'));
          }

          _li.push(generateLI(generateA(text, 'opt ' + optionClass, inline, optID), index));
        } else if ($this.data('divider') === true) {
          _li.push(generateLI('', index, 'divider'));
        } else if ($this.data('hidden') === true) {
          _li.push(generateLI(generateA(text, optionClass, inline), index, 'hide is-hidden'));
        } else {
          _li.push(generateLI(generateA(text, optionClass, inline), index));
        }
      });

      //If we are not multiple, we don't have a selected item, and we don't have a title, select the first element so something is set in the button
      if (!this.multiple && this.$element.find('option:selected').length === 0 && !this.options.title) {
        this.$element.find('option').eq(0).prop('selected', true).attr('selected', 'selected');
      }

      return $(_li.join(''));
    },

    findLis: function () {
      if (this.$lis == null) this.$lis = this.$menu.find('li');
      return this.$lis;
    },

    /**
     * @param [updateLi] defaults to true
     */
    render: function (updateLi) {
      var that = this;

      //Update the LI to match the SELECT
      if (updateLi !== false) {
        this.$element.find('option').each(function (index) {
          that.setDisabled(index, $(this).is(':disabled') || $(this).parent().is(':disabled'));
          that.setSelected(index, $(this).is(':selected'));
        });
      }

      this.tabIndex();
      var notDisabled = this.options.hideDisabled ? ':not([disabled])' : '';
      var selectedItems = this.$element.find('option:selected' + notDisabled).map(function () {
        var $this = $(this);
        var icon = $this.data('icon') && that.options.showIcon ? '<i class="' + that.options.iconBase + ' ' + $this.data('icon') + '"></i> ' : '';
        var subtext;
        if (that.options.showSubtext && $this.attr('data-subtext') && !that.multiple) {
          subtext = ' <small class="muted text-muted">' + $this.data('subtext') + '</small>';
        } else {
          subtext = '';
        }
        if ($this.data('content') && that.options.showContent) {
          return $this.data('content');
        } else if (typeof $this.attr('title') !== 'undefined') {
          return $this.attr('title');
        } else {
          return icon + $this.html() + subtext;
        }
      }).toArray();

      //Fixes issue in IE10 occurring when no default option is selected and at least one option is disabled
      //Convert all the values into a comma delimited string
      var title = !this.multiple ? selectedItems[0] : selectedItems.join(this.options.multipleSeparator);

      //If this is multi select, and the selectText type is count, the show 1 of 2 selected etc..
      if (this.multiple && this.options.selectedTextFormat.indexOf('count') > -1) {
        var max = this.options.selectedTextFormat.split('>');
        if ((max.length > 1 && selectedItems.length > max[1]) || (max.length == 1 && selectedItems.length >= 2)) {
          notDisabled = this.options.hideDisabled ? ', [disabled]' : '';
          var totalCount = this.$element.find('option').not('[data-divider="true"], [data-hidden="true"]' + notDisabled).length,
              tr8nText = (typeof this.options.countSelectedText === 'function') ? this.options.countSelectedText(selectedItems.length, totalCount) : this.options.countSelectedText;
          title = tr8nText.replace('{0}', selectedItems.length.toString()).replace('{1}', totalCount.toString());
        }
      }

      this.options.title = this.$element.attr('title');

      if (this.options.selectedTextFormat == 'static') {
        title = this.options.title;
      }

      //If we dont have a title, then use the default, or if nothing is set at all, use the not selected text
      if (!title) {
        title = typeof this.options.title !== 'undefined' ? this.options.title : this.options.noneSelectedText;
      }

      this.$button.attr('title', htmlEscape(title));
      this.$newElement.find('.filter-option').html(title);
    },

    /**
     * @param [style]
     * @param [status]
     */
    setStyle: function (style, status) {
      if (this.$element.attr('class')) {
        this.$newElement.addClass(this.$element.attr('class').replace(/selectpicker|mobile-device|validate\[.*\]/gi, ''));
      }

      var buttonClass = style ? style : this.options.style;

      if (status == 'add') {
        this.$button.addClass(buttonClass);
      } else if (status == 'remove') {
        this.$button.removeClass(buttonClass);
      } else {
        this.$button.removeClass(this.options.style);
        this.$button.addClass(buttonClass);
      }
    },

    liHeight: function () {
      if (this.options.size === false) return;

      var $selectClone = this.$menu.parent().clone().find('> .dropdown-toggle').prop('autofocus', false).end().appendTo('body'),
          $menuClone = $selectClone.addClass('open').find('> .dropdown-menu'),
          liHeight = $menuClone.find('li').not('.divider').not('.dropdown-header').filter(':visible').children('a').outerHeight(),
          headerHeight = this.options.header ? $menuClone.find('.popover-title').outerHeight() : 0,
          searchHeight = this.options.liveSearch ? $menuClone.find('.bs-searchbox').outerHeight() : 0,
          actionsHeight = this.options.actionsBox ? $menuClone.find('.bs-actionsbox').outerHeight() : 0;

      $selectClone.remove();

      this.$newElement
          .data('liHeight', liHeight)
          .data('headerHeight', headerHeight)
          .data('searchHeight', searchHeight)
          .data('actionsHeight', actionsHeight);
    },

    setSize: function () {
      this.findLis();
      var that = this,
          menu = this.$menu,
          menuInner = menu.find('.inner'),
          selectHeight = this.$newElement.outerHeight(),
          liHeight = this.$newElement.data('liHeight'),
          headerHeight = this.$newElement.data('headerHeight'),
          searchHeight = this.$newElement.data('searchHeight'),
          actionsHeight = this.$newElement.data('actionsHeight'),
          divHeight = this.$lis.filter('.divider').outerHeight(true),
          menuPadding = parseInt(menu.css('padding-top')) +
              parseInt(menu.css('padding-bottom')) +
              parseInt(menu.css('border-top-width')) +
              parseInt(menu.css('border-bottom-width')),
          notDisabled = this.options.hideDisabled ? ', .disabled' : '',
          $window = $(window),
          menuExtras = menuPadding + parseInt(menu.css('margin-top')) + parseInt(menu.css('margin-bottom')) + 2,
          menuHeight,
          selectOffsetTop,
          selectOffsetBot,
          posVert = function () {
            // JQuery defines a scrollTop function, but in pure JS it's a property
            //noinspection JSValidateTypes
            selectOffsetTop = that.$newElement.offset().top - $window.scrollTop();
            selectOffsetBot = $window.height() - selectOffsetTop - selectHeight;
          };
      posVert();
      if (this.options.header) menu.css('padding-top', 0);

      if (this.options.size == 'auto') {
        var getSize = function () {
          var minHeight,
              lisVis = that.$lis.not('.hide');

          posVert();
          menuHeight = selectOffsetBot - menuExtras;

          if (that.options.dropupAuto) {
            that.$newElement.toggleClass('dropup', (selectOffsetTop > selectOffsetBot) && ((menuHeight - menuExtras) < menu.height()));
          }
          if (that.$newElement.hasClass('dropup')) {
            menuHeight = selectOffsetTop - menuExtras;
          }

          if ((lisVis.length + lisVis.filter('.dropdown-header').length) > 3) {
            minHeight = liHeight * 3 + menuExtras - 2;
          } else {
            minHeight = 0;
          }

          menu.css({
            'max-height': menuHeight + 'px',
            'overflow': 'hidden',
            'min-height': minHeight + headerHeight + searchHeight + actionsHeight + 'px'
          });
          menuInner.css({
            'max-height': menuHeight - headerHeight - searchHeight - actionsHeight - menuPadding + 'px',
            'overflow-y': 'auto',
            'min-height': Math.max(minHeight - menuPadding, 0) + 'px'
          });
        };
        getSize();
        this.$searchbox.off('input.getSize propertychange.getSize').on('input.getSize propertychange.getSize', getSize);
        $(window).off('resize.getSize').on('resize.getSize', getSize);
        $(window).off('scroll.getSize').on('scroll.getSize', getSize);
      } else if (this.options.size && this.options.size != 'auto' && menu.find('li' + notDisabled).length > this.options.size) {
        var optIndex = this.$lis.not('.divider' + notDisabled).find(' > *').slice(0, this.options.size).last().parent().index();
        var divLength = this.$lis.slice(0, optIndex + 1).filter('.divider').length;
        menuHeight = liHeight * this.options.size + divLength * divHeight + menuPadding;
        if (that.options.dropupAuto) {
          //noinspection JSUnusedAssignment
          this.$newElement.toggleClass('dropup', (selectOffsetTop > selectOffsetBot) && (menuHeight < menu.height()));
        }
        menu.css({'max-height': menuHeight + headerHeight + searchHeight + actionsHeight + 'px', 'overflow': 'hidden'});
        menuInner.css({'max-height': menuHeight - menuPadding + 'px', 'overflow-y': 'auto'});
      }
    },

    setWidth: function () {
      if (this.options.width == 'auto') {
        this.$menu.css('min-width', '0');

        // Get correct width if element hidden
        var selectClone = this.$newElement.clone().appendTo('body');
        var ulWidth = selectClone.find('> .dropdown-menu').css('width');
        var btnWidth = selectClone.css('width', 'auto').find('> button').css('width');
        selectClone.remove();

        // Set width to whatever's larger, button title or longest option
        this.$newElement.css('width', Math.max(parseInt(ulWidth), parseInt(btnWidth)) + 'px');
      } else if (this.options.width == 'fit') {
        // Remove inline min-width so width can be changed from 'auto'
        this.$menu.css('min-width', '');
        this.$newElement.css('width', '').addClass('fit-width');
      } else if (this.options.width) {
        // Remove inline min-width so width can be changed from 'auto'
        this.$menu.css('min-width', '');
        this.$newElement.css('width', this.options.width);
      } else {
        // Remove inline min-width/width so width can be changed
        this.$menu.css('min-width', '');
        this.$newElement.css('width', '');
      }
      // Remove fit-width class if width is changed programmatically
      if (this.$newElement.hasClass('fit-width') && this.options.width !== 'fit') {
        this.$newElement.removeClass('fit-width');
      }
    },

    selectPosition: function () {
      var that = this,
          drop = '<div />',
          $drop = $(drop),
          pos,
          actualHeight,
          getPlacement = function ($element) {
            $drop.addClass($element.attr('class').replace(/form-control/gi, '')).toggleClass('dropup', $element.hasClass('dropup'));
            pos = $element.offset();
            actualHeight = $element.hasClass('dropup') ? 0 : $element[0].offsetHeight;
            $drop.css({
              'top': pos.top + actualHeight,
              'left': pos.left,
              'width': $element[0].offsetWidth,
              'position': 'absolute'
            });
          };
      this.$newElement.on('click', function () {
        if (that.isDisabled()) {
          return;
        }
        getPlacement($(this));
        $drop.appendTo(that.options.container);
        $drop.toggleClass('open', !$(this).hasClass('open'));
        $drop.append(that.$menu);
      });
      $(window).resize(function () {
        getPlacement(that.$newElement);
      });
      $(window).on('scroll', function () {
        getPlacement(that.$newElement);
      });
      $('html').on('click', function (e) {
        if ($(e.target).closest(that.$newElement).length < 1) {
          $drop.removeClass('open');
        }
      });
    },

    setSelected: function (index, selected) {
      this.findLis();
      this.$lis.filter('[data-original-index="' + index + '"]').toggleClass('selected', selected);
    },

    setDisabled: function (index, disabled) {
      this.findLis();
      if (disabled) {
        this.$lis.filter('[data-original-index="' + index + '"]').addClass('disabled').find('a').attr('href', '#').attr('tabindex', -1);
      } else {
        this.$lis.filter('[data-original-index="' + index + '"]').removeClass('disabled').find('a').removeAttr('href').attr('tabindex', 0);
      }
    },

    isDisabled: function () {
      return this.$element.is(':disabled');
    },

    checkDisabled: function () {
      var that = this;

      if (this.isDisabled()) {
        this.$button.addClass('disabled').attr('tabindex', -1);
      } else {
        if (this.$button.hasClass('disabled')) {
          this.$button.removeClass('disabled');
        }

        if (this.$button.attr('tabindex') == -1) {
          if (!this.$element.data('tabindex')) this.$button.removeAttr('tabindex');
        }
      }

      this.$button.click(function () {
        return !that.isDisabled();
      });
    },

    tabIndex: function () {
      if (this.$element.is('[tabindex]')) {
        this.$element.data('tabindex', this.$element.attr('tabindex'));
        this.$button.attr('tabindex', this.$element.data('tabindex'));
      }
    },

    clickListener: function () {
      var that = this;

      this.$newElement.on('touchstart.dropdown', '.dropdown-menu', function (e) {
        e.stopPropagation();
      });

      this.$newElement.on('click', function () {
        that.setSize();
        if (!that.options.liveSearch && !that.multiple) {
          setTimeout(function () {
            that.$menu.find('.selected a').focus();
          }, 10);
        }
      });

      this.$menu.on('click', 'li a', function (e) {
        var $this = $(this),
            clickedIndex = $this.parent().data('originalIndex'),
            prevValue = that.$element.val(),
            prevIndex = that.$element.prop('selectedIndex');

        // Don't close on multi choice menu
        if (that.multiple) {
          e.stopPropagation();
        }

        e.preventDefault();

        //Don't run if we have been disabled
        if (!that.isDisabled() && !$this.parent().hasClass('disabled')) {
          var $options = that.$element.find('option'),
              $option = $options.eq(clickedIndex),
              state = $option.prop('selected'),
              $optgroup = $option.parent('optgroup'),
              maxOptions = that.options.maxOptions,
              maxOptionsGrp = $optgroup.data('maxOptions') || false;

          if (!that.multiple) { // Deselect all others if not multi select box
            $options.prop('selected', false);
            $option.prop('selected', true);
            that.$menu.find('.selected').removeClass('selected');
            that.setSelected(clickedIndex, true);
          } else { // Toggle the one we have chosen if we are multi select.
            $option.prop('selected', !state);
            that.setSelected(clickedIndex, !state);
            $this.blur();

            if ((maxOptions !== false) || (maxOptionsGrp !== false)) {
              var maxReached = maxOptions < $options.filter(':selected').length,
                  maxReachedGrp = maxOptionsGrp < $optgroup.find('option:selected').length;

              if ((maxOptions && maxReached) || (maxOptionsGrp && maxReachedGrp)) {
                if (maxOptions && maxOptions == 1) {
                  $options.prop('selected', false);
                  $option.prop('selected', true);
                  that.$menu.find('.selected').removeClass('selected');
                  that.setSelected(clickedIndex, true);
                } else if (maxOptionsGrp && maxOptionsGrp == 1) {
                  $optgroup.find('option:selected').prop('selected', false);
                  $option.prop('selected', true);
                  var optgroupID = $this.data('optgroup');

                  that.$menu.find('.selected').has('a[data-optgroup="' + optgroupID + '"]').removeClass('selected');

                  that.setSelected(clickedIndex, true);
                } else {
                  var maxOptionsArr = (typeof that.options.maxOptionsText === 'function') ?
                          that.options.maxOptionsText(maxOptions, maxOptionsGrp) : that.options.maxOptionsText,
                      maxTxt = maxOptionsArr[0].replace('{n}', maxOptions),
                      maxTxtGrp = maxOptionsArr[1].replace('{n}', maxOptionsGrp),
                      $notify = $('<div class="notify"></div>');
                  // If {var} is set in array, replace it
                  /** @deprecated */
                  if (maxOptionsArr[2]) {
                    maxTxt = maxTxt.replace('{var}', maxOptionsArr[2][maxOptions > 1 ? 0 : 1]);
                    maxTxtGrp = maxTxtGrp.replace('{var}', maxOptionsArr[2][maxOptionsGrp > 1 ? 0 : 1]);
                  }

                  $option.prop('selected', false);

                  that.$menu.append($notify);

                  if (maxOptions && maxReached) {
                    $notify.append($('<div>' + maxTxt + '</div>'));
                    that.$element.trigger('maxReached.bs.select');
                  }

                  if (maxOptionsGrp && maxReachedGrp) {
                    $notify.append($('<div>' + maxTxtGrp + '</div>'));
                    that.$element.trigger('maxReachedGrp.bs.select');
                  }

                  setTimeout(function () {
                    that.setSelected(clickedIndex, false);
                  }, 10);

                  $notify.delay(750).fadeOut(300, function () {
                    $(this).remove();
                  });
                }
              }
            }
          }

          if (!that.multiple) {
            that.$button.focus();
          } else if (that.options.liveSearch) {
            that.$searchbox.focus();
          }

          // Trigger select 'change'
          if ((prevValue != that.$element.val() && that.multiple) || (prevIndex != that.$element.prop('selectedIndex') && !that.multiple)) {
            that.$element.change();
          }
        }
      });

      this.$menu.on('click', 'li.disabled a, .popover-title, .popover-title :not(.close)', function (e) {
        if (e.target == this) {
          e.preventDefault();
          e.stopPropagation();
          if (!that.options.liveSearch) {
            that.$button.focus();
          } else {
            that.$searchbox.focus();
          }
        }
      });

      this.$menu.on('click', 'li.divider, li.dropdown-header', function (e) {
        e.preventDefault();
        e.stopPropagation();
        if (!that.options.liveSearch) {
          that.$button.focus();
        } else {
          that.$searchbox.focus();
        }
      });

      this.$menu.on('click', '.popover-title .close', function () {
        that.$button.focus();
      });

      this.$searchbox.on('click', function (e) {
        e.stopPropagation();
      });


      this.$menu.on('click', '.actions-btn', function (e) {
        if (that.options.liveSearch) {
          that.$searchbox.focus();
        } else {
          that.$button.focus();
        }

        e.preventDefault();
        e.stopPropagation();

        if ($(this).is('.bs-select-all')) {
          that.selectAll();
        } else {
          that.deselectAll();
        }
        that.$element.change();
      });

      this.$element.change(function () {
        that.render(false);
      });
    },

    liveSearchListener: function () {
      var that = this,
          no_results = $('<li class="no-results"></li>');

      this.$newElement.on('click.dropdown.data-api touchstart.dropdown.data-api', function () {
        that.$menu.find('.active').removeClass('active');
        if (!!that.$searchbox.val()) {
          that.$searchbox.val('');
          that.$lis.not('.is-hidden').removeClass('hide');
          if (!!no_results.parent().length) no_results.remove();
        }
        if (!that.multiple) that.$menu.find('.selected').addClass('active');
        setTimeout(function () {
          that.$searchbox.focus();
        }, 10);
      });

      this.$searchbox.on('click.dropdown.data-api focus.dropdown.data-api touchend.dropdown.data-api', function (e) {
        e.stopPropagation();
      });

      this.$searchbox.on('input propertychange', function () {
        if (that.$searchbox.val()) {

          if (that.options.searchAccentInsensitive) {
            that.$lis.not('.is-hidden').removeClass('hide').find('a').not(':aicontains(' + normalizeToBase(that.$searchbox.val()) + ')').parent().addClass('hide');
          } else {
            that.$lis.not('.is-hidden').removeClass('hide').find('a').not(':icontains(' + that.$searchbox.val() + ')').parent().addClass('hide');
          }

          if (!that.$menu.find('li').filter(':visible:not(.no-results)').length) {
            if (!!no_results.parent().length) no_results.remove();
            no_results.html(that.options.noneResultsText + ' "' + htmlEscape(that.$searchbox.val()) + '"').show();
            that.$menu.find('li').last().after(no_results);
          } else if (!!no_results.parent().length) {
            no_results.remove();
          }

        } else {
          that.$lis.not('.is-hidden').removeClass('hide');
          if (!!no_results.parent().length) no_results.remove();
        }

        that.$menu.find('li.active').removeClass('active');
        that.$menu.find('li').filter(':visible:not(.divider)').eq(0).addClass('active').find('a').focus();
        $(this).focus();
      });
    },

    val: function (value) {
      if (typeof value !== 'undefined') {
        this.$element.val(value);
        this.render();

        return this.$element;
      } else {
        return this.$element.val();
      }
    },

    selectAll: function () {
      this.findLis();
      this.$lis.not('.divider').not('.disabled').not('.selected').filter(':visible').find('a').click();
    },

    deselectAll: function () {
      this.findLis();
      this.$lis.not('.divider').not('.disabled').filter('.selected').filter(':visible').find('a').click();
    },

    keydown: function (e) {
      var $this = $(this),
          $parent = ($this.is('input')) ? $this.parent().parent() : $this.parent(),
          $items,
          that = $parent.data('this'),
          index,
          next,
          first,
          last,
          prev,
          nextPrev,
          prevIndex,
          isActive,
          keyCodeMap = {
            32: ' ',
            48: '0',
            49: '1',
            50: '2',
            51: '3',
            52: '4',
            53: '5',
            54: '6',
            55: '7',
            56: '8',
            57: '9',
            59: ';',
            65: 'a',
            66: 'b',
            67: 'c',
            68: 'd',
            69: 'e',
            70: 'f',
            71: 'g',
            72: 'h',
            73: 'i',
            74: 'j',
            75: 'k',
            76: 'l',
            77: 'm',
            78: 'n',
            79: 'o',
            80: 'p',
            81: 'q',
            82: 'r',
            83: 's',
            84: 't',
            85: 'u',
            86: 'v',
            87: 'w',
            88: 'x',
            89: 'y',
            90: 'z',
            96: '0',
            97: '1',
            98: '2',
            99: '3',
            100: '4',
            101: '5',
            102: '6',
            103: '7',
            104: '8',
            105: '9'
          };

      if (that.options.liveSearch) $parent = $this.parent().parent();

      if (that.options.container) $parent = that.$menu;

      $items = $('[role=menu] li a', $parent);

      isActive = that.$menu.parent().hasClass('open');

      if (!isActive && /([0-9]|[A-z])/.test(String.fromCharCode(e.keyCode))) {
        if (!that.options.container) {
          that.setSize();
          that.$menu.parent().addClass('open');
          isActive = true;
        } else {
          that.$newElement.trigger('click');
        }
        that.$searchbox.focus();
      }

      if (that.options.liveSearch) {
        if (/(^9$|27)/.test(e.keyCode.toString(10)) && isActive && that.$menu.find('.active').length === 0) {
          e.preventDefault();
          that.$menu.parent().removeClass('open');
          that.$button.focus();
        }
        $items = $('[role=menu] li:not(.divider):not(.dropdown-header):visible', $parent);
        if (!$this.val() && !/(38|40)/.test(e.keyCode.toString(10))) {
          if ($items.filter('.active').length === 0) {
            if (that.options.searchAccentInsensitive) {
              $items = that.$newElement.find('li').filter(':aicontains(' + normalizeToBase(keyCodeMap[e.keyCode]) + ')');
            } else {
              $items = that.$newElement.find('li').filter(':icontains(' + keyCodeMap[e.keyCode] + ')');
            }
          }
        }
      }

      if (!$items.length) return;

      if (/(38|40)/.test(e.keyCode.toString(10))) {
        index = $items.index($items.filter(':focus'));
        first = $items.parent(':not(.disabled):visible').first().index();
        last = $items.parent(':not(.disabled):visible').last().index();
        next = $items.eq(index).parent().nextAll(':not(.disabled):visible').eq(0).index();
        prev = $items.eq(index).parent().prevAll(':not(.disabled):visible').eq(0).index();
        nextPrev = $items.eq(next).parent().prevAll(':not(.disabled):visible').eq(0).index();

        if (that.options.liveSearch) {
          $items.each(function (i) {
            if ($(this).is(':not(.disabled)')) {
              $(this).data('index', i);
            }
          });
          index = $items.index($items.filter('.active'));
          first = $items.filter(':not(.disabled):visible').first().data('index');
          last = $items.filter(':not(.disabled):visible').last().data('index');
          next = $items.eq(index).nextAll(':not(.disabled):visible').eq(0).data('index');
          prev = $items.eq(index).prevAll(':not(.disabled):visible').eq(0).data('index');
          nextPrev = $items.eq(next).prevAll(':not(.disabled):visible').eq(0).data('index');
        }

        prevIndex = $this.data('prevIndex');

        if (e.keyCode == 38) {
          if (that.options.liveSearch) index -= 1;
          if (index != nextPrev && index > prev) index = prev;
          if (index < first) index = first;
          if (index == prevIndex) index = last;
        }

        if (e.keyCode == 40) {
          if (that.options.liveSearch) index += 1;
          if (index == -1) index = 0;
          if (index != nextPrev && index < next) index = next;
          if (index > last) index = last;
          if (index == prevIndex) index = first;
        }

        $this.data('prevIndex', index);

        if (!that.options.liveSearch) {
          $items.eq(index).focus();
        } else {
          e.preventDefault();
          if (!$this.is('.dropdown-toggle')) {
            $items.removeClass('active');
            $items.eq(index).addClass('active').find('a').focus();
            $this.focus();
          }
        }

      } else if (!$this.is('input')) {
        var keyIndex = [],
            count,
            prevKey;

        $items.each(function () {
          if ($(this).parent().is(':not(.disabled)')) {
            if ($.trim($(this).text().toLowerCase()).substring(0, 1) == keyCodeMap[e.keyCode]) {
              keyIndex.push($(this).parent().index());
            }
          }
        });

        count = $(document).data('keycount');
        count++;
        $(document).data('keycount', count);

        prevKey = $.trim($(':focus').text().toLowerCase()).substring(0, 1);

        if (prevKey != keyCodeMap[e.keyCode]) {
          count = 1;
          $(document).data('keycount', count);
        } else if (count >= keyIndex.length) {
          $(document).data('keycount', 0);
          if (count > keyIndex.length) count = 1;
        }

        $items.eq(keyIndex[count - 1]).focus();
      }

      // Select focused option if "Enter", "Spacebar" or "Tab" (when selectOnTab is true) are pressed inside the menu.
      if ((/(13|32)/.test(e.keyCode.toString(10)) || (/(^9$)/.test(e.keyCode.toString(10)) && that.options.selectOnTab)) && isActive) {
        if (!/(32)/.test(e.keyCode.toString(10))) e.preventDefault();
        if (!that.options.liveSearch) {
          $(':focus').click();
        } else if (!/(32)/.test(e.keyCode.toString(10))) {
          that.$menu.find('.active a').click();
          $this.focus();
        }
        $(document).data('keycount', 0);
      }

      if ((/(^9$|27)/.test(e.keyCode.toString(10)) && isActive && (that.multiple || that.options.liveSearch)) || (/(27)/.test(e.keyCode.toString(10)) && !isActive)) {
        that.$menu.parent().removeClass('open');
        that.$button.focus();
      }
    },

    mobile: function () {
      this.$element.addClass('mobile-device').appendTo(this.$newElement);
      if (this.options.container) this.$menu.hide();
    },

    refresh: function () {
      this.$lis = null;
      this.reloadLi();
      this.render();
      this.setWidth();
      this.setStyle();
      this.checkDisabled();
      this.liHeight();
    },

    update: function () {
      this.reloadLi();
      this.setWidth();
      this.setStyle();
      this.checkDisabled();
      this.liHeight();
    },

    hide: function () {
      this.$newElement.hide();
    },

    show: function () {
      this.$newElement.show();
    },

    remove: function () {
      this.$newElement.remove();
      this.$element.remove();
    }
  };

  // SELECTPICKER PLUGIN DEFINITION
  // ==============================
  function Plugin(option, event) {
    // get the args of the outer function..
    var args = arguments;
    // The arguments of the function are explicitly re-defined from the argument list, because the shift causes them
    // to get lost
    //noinspection JSDuplicatedDeclaration
    var _option = option,
        option = args[0],
        event = args[1];
    [].shift.apply(args);

    // This fixes a bug in the js implementation on android 2.3 #715
    if (typeof option == 'undefined') {
      option = _option;
    }

    var value;
    var chain = this.each(function () {
      var $this = $(this);
      if ($this.is('select')) {
        var data = $this.data('selectpicker'),
            options = typeof option == 'object' && option;

        if (!data) {
          var config = $.extend({}, Selectpicker.DEFAULTS, $.fn.selectpicker.defaults || {}, $this.data(), options);
          $this.data('selectpicker', (data = new Selectpicker(this, config, event)));
        } else if (options) {
          for (var i in options) {
            if (options.hasOwnProperty(i)) {
              data.options[i] = options[i];
            }
          }
        }

        if (typeof option == 'string') {
          if (data[option] instanceof Function) {
            value = data[option].apply(data, args);
          } else {
            value = data.options[option];
          }
        }
      }
    });

    if (typeof value !== 'undefined') {
      //noinspection JSUnusedAssignment
      return value;
    } else {
      return chain;
    }
  }

  var old = $.fn.selectpicker;
  $.fn.selectpicker = Plugin;
  $.fn.selectpicker.Constructor = Selectpicker;

  // SELECTPICKER NO CONFLICT
  // ========================
  $.fn.selectpicker.noConflict = function () {
    $.fn.selectpicker = old;
    return this;
  };

  $(document)
      .data('keycount', 0)
      .on('keydown', '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role=menu], .bs-searchbox input', Selectpicker.prototype.keydown)
      .on('focusin.modal', '.bootstrap-select [data-toggle=dropdown], .bootstrap-select [role=menu], .bs-searchbox input', function (e) {
        e.stopPropagation();
      });

  // SELECTPICKER DATA-API
  // =====================
  $(window).on('load.bs.select.data-api', function () {
    $('.selectpicker').each(function () {
      var $selectpicker = $(this);
      Plugin.call($selectpicker, $selectpicker.data());
    })
  });
})(jQuery);


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./js/angular-busy.js": 11
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 10;

/***/ }),
/* 11 */
/***/ (function(module, exports) {

angular.module('cgBusy',[]);

//loosely modeled after angular-promise-tracker
angular.module('cgBusy').factory('_cgBusyTrackerFactory',['$timeout','$q',function($timeout,$q){

    return function(){

        var tracker = {};
        tracker.promises = [];
        tracker.delayPromise = null;
        tracker.durationPromise = null;
        tracker.delayJustFinished = false;

        tracker.reset = function(options){
            tracker.minDuration = options.minDuration;

            tracker.promises = [];
            angular.forEach(options.promises,function(p){
                if (!p || p.$cgBusyFulfilled) {
                    return;
                }
                addPromiseLikeThing(p);
            });

            if (tracker.promises.length === 0) {
                //if we have no promises then dont do the delay or duration stuff
                return;
            }

            tracker.delayJustFinished = false;
            if (options.delay) {
                tracker.delayPromise = $timeout(function(){
                    tracker.delayPromise = null;
                    tracker.delayJustFinished = true;
                },parseInt(options.delay,10));
            }
            if (options.minDuration) {
                tracker.durationPromise = $timeout(function(){
                    tracker.durationPromise = null;
                },parseInt(options.minDuration,10) + (options.delay ? parseInt(options.delay,10) : 0));
            }            
        };

        tracker.isPromise = function(promiseThing){
            var then = promiseThing && (promiseThing.then || promiseThing.$then ||
                (promiseThing.$promise && promiseThing.$promise.then));

            return typeof then !== 'undefined';            
        };

        tracker.callThen = function(promiseThing,success,error){
            var promise;
            if (promiseThing.then || promiseThing.$then){
                promise = promiseThing;
            } else if (promiseThing.$promise){
                promise = promiseThing.$promise;
            } else if (promiseThing.denodeify){
                promise = $q.when(promiseThing);
            }
                       
            var then = (promise.then || promise.$then);

            then.call(promise,success,error);
        };

        var addPromiseLikeThing = function(promise){

            if (!tracker.isPromise(promise)) {
                throw new Error('cgBusy expects a promise (or something that has a .promise or .$promise');
            }

            if (tracker.promises.indexOf(promise) !== -1){
                return;
            }
            tracker.promises.push(promise);

            tracker.callThen(promise, function(){
                promise.$cgBusyFulfilled = true;
                if (tracker.promises.indexOf(promise) === -1) {
                    return;
                }
                tracker.promises.splice(tracker.promises.indexOf(promise),1);
            },function(){
                promise.$cgBusyFulfilled = true;
                if (tracker.promises.indexOf(promise) === -1) {
                    return;
                }
                tracker.promises.splice(tracker.promises.indexOf(promise),1);
            });
        };

        tracker.active = function(){
            if (tracker.delayPromise){
                return false;
            }

            if (!tracker.delayJustFinished){
                if (tracker.durationPromise){
                    return true;
                }
                return tracker.promises.length > 0;
            } else {
                //if both delay and min duration are set, 
                //we don't want to initiate the min duration if the 
                //promise finished before the delay was complete
                tracker.delayJustFinished = false;
                if (tracker.promises.length === 0) {
                    tracker.durationPromise = null;
                }
                return tracker.promises.length > 0;
            }
        };

        return tracker;

    };
}]);

angular.module('cgBusy').value('cgBusyDefaults',{});

angular.module('cgBusy').directive('cgBusy',['$compile','$templateCache','cgBusyDefaults','$http','_cgBusyTrackerFactory',
    function($compile,$templateCache,cgBusyDefaults,$http,_cgBusyTrackerFactory){
        return {
            restrict: 'A',
            link: function(scope, element, attrs, fn) {

                //Apply position:relative to parent element if necessary
                var position = element.css('position');
                if (position === 'static' || position === '' || typeof position === 'undefined'){
                    element.css('position','relative');
                }

                var templateElement;
                var backdropElement;
                var currentTemplate;
                var templateScope;
                var backdrop;
                var tracker = _cgBusyTrackerFactory();

                var defaults = {
                    templateUrl: 'angular-busy.html',
                    delay:0,
                    minDuration:0,
                    backdrop: true,
                    message:'Please Wait...',
                    wrapperClass: 'cg-busy cg-busy-animation'
                };

                angular.extend(defaults,cgBusyDefaults);

                scope.$watchCollection(attrs.cgBusy,function(options){

                    if (!options) {
                        options = {promise:null};
                    }

                    if (angular.isString(options)) {
                        throw new Error('Invalid value for cg-busy. cgBusy no longer accepts string ids to represent promises/trackers.');
                    }

                    //is it an array (of promises) or one promise
                    if (angular.isArray(options) || tracker.isPromise(options)) {
                        options = {promise:options};
                    }

                    options = angular.extend(angular.copy(defaults),options);

                    if (!options.templateUrl){
                        options.templateUrl = defaults.templateUrl;
                    }

                    if (!angular.isArray(options.promise)){
                        options.promise = [options.promise];
                    }

                    // options.promise = angular.isArray(options.promise) ? options.promise : [options.promise];
                    // options.message = options.message ? options.message : 'Please Wait...';
                    // options.template = options.template ? options.template : cgBusyTemplateName;
                    // options.minDuration = options.minDuration ? options.minDuration : 0;
                    // options.delay = options.delay ? options.delay : 0;

                    if (!templateScope) {
                        templateScope = scope.$new();
                    }

                    templateScope.$message = options.message;

                    if (!angular.equals(tracker.promises,options.promise)) {
                        tracker.reset({
                            promises:options.promise,
                            delay:options.delay,
                            minDuration: options.minDuration
                        });
                    }

                    templateScope.$cgBusyIsActive = function() {
                        return tracker.active();
                    };


                    if (!templateElement || currentTemplate !== options.templateUrl || backdrop !== options.backdrop) {

                        if (templateElement) {
                            templateElement.remove();
                        }
                        if (backdropElement){
                            backdropElement.remove();
                        }

                        currentTemplate = options.templateUrl;
                        backdrop = options.backdrop;

                        $http.get(currentTemplate,{cache: $templateCache}).success(function(indicatorTemplate){

                            options.backdrop = typeof options.backdrop === 'undefined' ? true : options.backdrop;

                            if (options.backdrop){
                                var backdrop = '<div class="cg-busy cg-busy-backdrop cg-busy-backdrop-animation ng-hide" ng-show="$cgBusyIsActive()"></div>';
                                backdropElement = $compile(backdrop)(templateScope);
                                element.append(backdropElement);
                            }

                            var template = '<div class="'+options.wrapperClass+' ng-hide" ng-show="$cgBusyIsActive()">' + indicatorTemplate + '</div>';
                            templateElement = $compile(template)(templateScope);

                            angular.element(templateElement.children()[0])
                                .css('position','absolute')
                                .css('top',0)
                                .css('left',0)
                                .css('right',0)
                                .css('bottom',0);
                            element.append(templateElement);

                        }).error(function(data){
                            throw new Error('Template specified for cgBusy ('+options.templateUrl+') could not be loaded. ' + data);
                        });
                    }

                },true);
            }
        };
    }
]);


angular.module('cgBusy').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('angular-busy.html',
    "<div class=\"cg-busy-default-wrapper\">\n" +
    "\n" +
    "   <div class=\"cg-busy-default-sign\">\n" +
    "\n" +
    "      <div class=\"cg-busy-default-spinner\">\n" +
    "         <div class=\"bar1\"></div>\n" +
    "         <div class=\"bar2\"></div>\n" +
    "         <div class=\"bar3\"></div>\n" +
    "         <div class=\"bar4\"></div>\n" +
    "         <div class=\"bar5\"></div>\n" +
    "         <div class=\"bar6\"></div>\n" +
    "         <div class=\"bar7\"></div>\n" +
    "         <div class=\"bar8\"></div>\n" +
    "         <div class=\"bar9\"></div>\n" +
    "         <div class=\"bar10\"></div>\n" +
    "         <div class=\"bar11\"></div>\n" +
    "         <div class=\"bar12\"></div>\n" +
    "      </div>\n" +
    "\n" +
    "      <div class=\"cg-busy-default-text\">{{$message}}</div>\n" +
    "\n" +
    "   </div>\n" +
    "\n" +
    "</div>"
  );

}]);


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./angular.input.mask.js": 13
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 12;

/***/ }),
/* 13 */
/***/ (function(module, exports) {

!function (n) {
    var i = function () { var n = { 0: { pattern: /\d/, _default: "0" }, 9: { pattern: /\d/, optional: !0 }, "#": { pattern: /\d/, optional: !0, recursive: !0 }, S: { pattern: /[a-zA-Z]/ }, $: { escape: !0 } }, i = function (i, a) { for (var l = 0, r = a - 1, e = { escape: !0 }; r >= 0 && e && e.escape;)e = n[i.charAt(r)], l += e && e.escape ? 1 : 0, r--; return l > 0 && l % 2 === 1 }, a = function (n, i) { var a = n.replace(/[^0]/g, "").length, l = i.replace(/[^\d]/g, "").length; return l - a }, l = function (n, i, a) { return a.reverse ? i + n : n + i }, r = function (i, a, l) { var e = i.charAt(a), t = n[e]; return "" === e ? !1 : t && !t.escape ? !0 : r(i, a + l, l) }, e = function (n, i, a) { var l = n.split(""); return l.splice(a >= 0 ? a : 0, 0, i), l.join("") }, t = function (o, u) { this.options = u || {}, this.options = { reverse: this.options.reverse || !1, usedefaults: this.options.usedefaults || this.options.reverse }, this.pattern = o, t.prototype.process = function (t) { if (!t) return ""; t += ""; for (var o = this.pattern, u = !0, s = "", f = this.options.reverse ? t.length - 1 : 0, m = a(o, t), c = !1, d = [], g = !1, D = { start: this.options.reverse ? o.length - 1 : 0, end: this.options.reverse ? -1 : o.length, inc: this.options.reverse ? -1 : 1 }, p = function (n) { if (!g && r(o, $, D.inc)) return !0; if (g || (g = d.length > 0), g) { var i = d.shift(); if (d.push(i), n.reverse && f >= 0) return $++ , o = e(o, i, $), !0; if (!n.reverse && f < t.length) return o = e(o, i, $), !0 } return $ < o.length && $ >= 0 }, $ = D.start; p(this.options); $ += D.inc) { var y = o.charAt($), v = t.charAt(f), h = n[y]; if (!g || v) { if (this.options.reverse && i(o, $)) { s = l(s, y, this.options), $ += D.inc; continue } if (!this.options.reverse && c) { s = l(s, y, this.options), c = !1; continue } if (!this.options.reverse && h && h.escape) { c = !0; continue } } if (!g && h && h.recursive) d.push(y); else { if (g && !v) { h && h.recursive || (s = l(s, y, this.options)); continue } if (d.length > 0 && h && !h.recursive) { u = !1; continue } if (!g && d.length > 0 && !v) continue } if (h) if (h.optional) { if (h.pattern.test(v) && m) s = l(s, v, this.options), f += D.inc, m--; else if (d.length > 0 && v) { u = !1; break } } else if (h.pattern.test(v)) s = l(s, v, this.options), f += D.inc; else { if (v || !h._default || !this.options.usedefaults) { u = !1; break } s = l(s, h._default, this.options) } else s = l(s, y, this.options), !g && d.length && d.push(y) } return { result: s, valid: u } }, t.prototype.apply = function (n) { return this.process(n).result }, t.prototype.validate = function (n) { return this.process(n).valid } }; return t.process = function (n, i, a) { return new t(i, a).process(n) }, t.apply = function (n, i, a) { return new t(i, a).apply(n) }, t.validate = function (n, i, a) { return new t(i, a).validate(n) }, t }(), a = { "boolean": !1, "function": !0, object: !0, number: !1, string: !1, undefined: !1 }; a[typeof module] && (module.exports = i), function () { function n(n, i) { var a = i.algorithmSteps, l = o.handleStr[a[0]](n), r = o.sum[a[1]](l, i.pesos), e = o.rest[a[2]](r), t = parseInt(l[i.dvpos]), u = o.expectedDV[a[3]](e, l); return t === u } function i(i, a) { if (a.match && !a.match.test(i)) return !1; for (var l = 0; l < a.dvs.length; l++)if (!n(i, a.dvs[l])) return !1; return !0 } var a = this, l = {}; l.validate = function (n) { var i = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]; n = n.replace(/[^\d]/g, ""); var a = /^(0{14}|1{14}|2{14}|3{14}|4{14}|5{14}|6{14}|7{14}|8{14}|9{14})$/; if (!n || 14 !== n.length || a.test(n)) return !1; n = n.split(""); for (var l = 0, r = 0; 12 > l; l++)r += n[l] * i[l + 1]; if (r = 11 - r % 11, r = r >= 10 ? 0 : r, parseInt(n[12]) !== r) return !1; for (l = 0, r = 0; 12 >= l; l++)r += n[l] * i[l]; return r = 11 - r % 11, r = r >= 10 ? 0 : r, parseInt(n[13]) !== r ? !1 : !0 }; var r = {}; r.validate = function (n) { function i(i) { for (var a = 0, l = i - 9, r = 0; 9 > r; r++)a += parseInt(n.charAt(r + l)) * (r + 1); return a % 11 % 10 === parseInt(n.charAt(i)) } n = n.replace(/[^\d]+/g, ""); var a = /^(0{11}|1{11}|2{11}|3{11}|4{11}|5{11}|6{11}|7{11}|8{11}|9{11})$/; return !n || 11 !== n.length || a.test(n) ? !1 : i(9) && i(10) }; var e = function (n) { return this instanceof e ? (this.rules = t[n] || [], this.rule, e.prototype._defineRule = function (n) { this.rule = void 0; for (var i = 0; i < this.rules.length && void 0 === this.rule; i++) { var a = n.replace(/[^\d]/g, ""), l = this.rules[i]; a.length !== l.chars || l.match && !l.match.test(n) || (this.rule = l) } return !!this.rule }, e.prototype.validate = function (n) { return n && this._defineRule(n) ? this.rule.validate(n) : !1 }, void 0) : new e(n) }, t = {}, o = { handleStr: { onlyNumbers: function (n) { return n.replace(/[^\d]/g, "").split("") }, mgSpec: function (n) { var i = n.replace(/[^\d]/g, ""); return i = i.substr(0, 3) + "0" + i.substr(3, i.length), i.split("") } }, sum: { normalSum: function (n, i) { for (var a = n, l = 0, r = 0; r < i.length; r++)l += parseInt(a[r]) * i[r]; return l }, individualSum: function (n, i) { for (var a = n, l = 0, r = 0; r < i.length; r++) { var e = parseInt(a[r]) * i[r]; l += e % 10 + parseInt(e / 10) } return l }, apSpec: function (n, i) { var a = this.normalSum(n, i), l = n.join(""); return l >= "030000010" && "030170009" >= l ? a + 5 : l >= "030170010" && "030190229" >= l ? a + 9 : a } }, rest: { mod11: function (n) { return n % 11 }, mod10: function (n) { return n % 10 }, mod9: function (n) { return n % 9 } }, expectedDV: { minusRestOf11: function (n) { return 2 > n ? 0 : 11 - n }, minusRestOf11v2: function (n) { return 2 > n ? 11 - n - 10 : 11 - n }, minusRestOf10: function (n) { return 1 > n ? 0 : 10 - n }, mod10: function (n) { return n % 10 }, goSpec: function (n, i) { var a = i.join(""); return 1 === n ? a >= "101031050" && "101199979" >= a ? 1 : 0 : 0 === n ? 0 : 11 - n }, apSpec: function (n, i) { var a = i.join(""); return 0 === n ? a >= "030170010" && "030190229" >= a ? 1 : 0 : 1 === n ? 0 : 11 - n }, voidFn: function (n) { return n } } }; t.PE = [{ chars: 9, dvs: [{ dvpos: 7, pesos: [8, 7, 6, 5, 4, 3, 2], algorithmSteps: ["onlyNumbers", "normalSum", "mod11", "minusRestOf11"] }, { dvpos: 8, pesos: [9, 8, 7, 6, 5, 4, 3, 2], algorithmSteps: ["onlyNumbers", "normalSum", "mod11", "minusRestOf11"] }], validate: function (n) { return i(n, this) } }, { chars: 14, pesos: [[1, 2, 3, 4, 5, 9, 8, 7, 6, 5, 4, 3, 2]], dvs: [{ dvpos: 13, pesos: [5, 4, 3, 2, 1, 9, 8, 7, 6, 5, 4, 3, 2], algorithmSteps: ["onlyNumbers", "normalSum", "mod11", "minusRestOf11v2"] }], validate: function (n) { return i(n, this) } }], t.RS = [{ chars: 10, dvs: [{ dvpos: 9, pesos: [2, 9, 8, 7, 6, 5, 4, 3, 2], algorithmSteps: ["onlyNumbers", "normalSum", "mod11", "minusRestOf11"] }], validate: function (n) { return i(n, this) } }], t.AC = [{ chars: 13, match: /^01/, dvs: [{ dvpos: 11, pesos: [4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2], algorithmSteps: ["onlyNumbers", "normalSum", "mod11", "minusRestOf11"] }, { dvpos: 12, pesos: [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2], algorithmSteps: ["onlyNumbers", "normalSum", "mod11", "minusRestOf11"] }], validate: function (n) { return i(n, this) } }], t.MG = [{ chars: 13, dvs: [{ dvpos: 12, pesos: [1, 2, 1, 2, 1, 2, 1, 2, 1, 2, 1, 2], algorithmSteps: ["mgSpec", "individualSum", "mod10", "minusRestOf10"] }, { dvpos: 12, pesos: [3, 2, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2], algorithmSteps: ["onlyNumbers", "normalSum", "mod11", "minusRestOf11"] }], validate: function (n) { return i(n, this) } }], t.SP = [{ chars: 12, match: /^[0-9]/, dvs: [{ dvpos: 8, pesos: [1, 3, 4, 5, 6, 7, 8, 10], algorithmSteps: ["onlyNumbers", "normalSum", "mod11", "mod10"] }, { dvpos: 11, pesos: [3, 2, 10, 9, 8, 7, 6, 5, 4, 3, 2], algorithmSteps: ["onlyNumbers", "normalSum", "mod11", "mod10"] }], validate: function (n) { return i(n, this) } }, { chars: 12, match: /^P/i, dvs: [{ dvpos: 8, pesos: [1, 3, 4, 5, 6, 7, 8, 10], algorithmSteps: ["onlyNumbers", "normalSum", "mod11", "mod10"] }], validate: function (n) { return i(n, this) } }], t.DF = [{ chars: 13, dvs: [{ dvpos: 11, pesos: [4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2], algorithmSteps: ["onlyNumbers", "normalSum", "mod11", "minusRestOf11"] }, { dvpos: 12, pesos: [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2], algorithmSteps: ["onlyNumbers", "normalSum", "mod11", "minusRestOf11"] }], validate: function (n) { return i(n, this) } }], t.ES = [{ chars: 9, dvs: [{ dvpos: 8, pesos: [9, 8, 7, 6, 5, 4, 3, 2], algorithmSteps: ["onlyNumbers", "normalSum", "mod11", "minusRestOf11"] }], validate: function (n) { return i(n, this) } }], t.BA = [{ chars: 8, match: /^[0123458]/, dvs: [{ dvpos: 7, pesos: [7, 6, 5, 4, 3, 2], algorithmSteps: ["onlyNumbers", "normalSum", "mod10", "minusRestOf10"] }, { dvpos: 6, pesos: [8, 7, 6, 5, 4, 3, 0, 2], algorithmSteps: ["onlyNumbers", "normalSum", "mod10", "minusRestOf10"] }], validate: function (n) { return i(n, this) } }, { chars: 8, match: /^[679]/, dvs: [{ dvpos: 7, pesos: [7, 6, 5, 4, 3, 2], algorithmSteps: ["onlyNumbers", "normalSum", "mod11", "minusRestOf11"] }, { dvpos: 6, pesos: [8, 7, 6, 5, 4, 3, 0, 2], algorithmSteps: ["onlyNumbers", "normalSum", "mod11", "minusRestOf11"] }], validate: function (n) { return i(n, this) } }, { chars: 9, match: /^[0-9][0123458]/, dvs: [{ dvpos: 8, pesos: [8, 7, 6, 5, 4, 3, 2], algorithmSteps: ["onlyNumbers", "normalSum", "mod10", "minusRestOf10"] }, { dvpos: 7, pesos: [9, 8, 7, 6, 5, 4, 3, 0, 2], algorithmSteps: ["onlyNumbers", "normalSum", "mod10", "minusRestOf10"] }], validate: function (n) { return i(n, this) } }, { chars: 9, match: /^[0-9][679]/, dvs: [{ dvpos: 8, pesos: [8, 7, 6, 5, 4, 3, 2], algorithmSteps: ["onlyNumbers", "normalSum", "mod11", "minusRestOf11"] }, { dvpos: 7, pesos: [9, 8, 7, 6, 5, 4, 3, 0, 2], algorithmSteps: ["onlyNumbers", "normalSum", "mod11", "minusRestOf11"] }], validate: function (n) { return i(n, this) } }], t.AM = [{ chars: 9, dvs: [{ dvpos: 8, pesos: [9, 8, 7, 6, 5, 4, 3, 2], algorithmSteps: ["onlyNumbers", "normalSum", "mod11", "minusRestOf11"] }], validate: function (n) { return i(n, this) } }], t.RN = [{ chars: 9, match: /^20/, dvs: [{ dvpos: 8, pesos: [9, 8, 7, 6, 5, 4, 3, 2], algorithmSteps: ["onlyNumbers", "normalSum", "mod11", "minusRestOf11"] }], validate: function (n) { return i(n, this) } }, { chars: 10, match: /^20/, dvs: [{ dvpos: 8, pesos: [10, 9, 8, 7, 6, 5, 4, 3, 2], algorithmSteps: ["onlyNumbers", "normalSum", "mod11", "minusRestOf11"] }], validate: function (n) { return i(n, this) } }], t.RO = [{ chars: 14, dvs: [{ dvpos: 13, pesos: [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2], algorithmSteps: ["onlyNumbers", "normalSum", "mod11", "minusRestOf11"] }], validate: function (n) { return i(n, this) } }], t.PR = [{ chars: 10, dvs: [{ dvpos: 8, pesos: [3, 2, 7, 6, 5, 4, 3, 2], algorithmSteps: ["onlyNumbers", "normalSum", "mod11", "minusRestOf11"] }, { dvpos: 9, pesos: [4, 3, 2, 7, 6, 5, 4, 3, 2], algorithmSteps: ["onlyNumbers", "normalSum", "mod11", "minusRestOf11"] }], validate: function (n) { return i(n, this) } }], t.SC = [{ chars: 9, dvs: [{ dvpos: 8, pesos: [9, 8, 7, 6, 5, 4, 3, 2], algorithmSteps: ["onlyNumbers", "normalSum", "mod11", "minusRestOf11"] }], validate: function (n) { return i(n, this) } }], t.RJ = [{ chars: 8, dvs: [{ dvpos: 7, pesos: [2, 7, 6, 5, 4, 3, 2], algorithmSteps: ["onlyNumbers", "normalSum", "mod11", "minusRestOf11"] }], validate: function (n) { return i(n, this) } }], t.PA = [{ chars: 9, match: /^15/, dvs: [{ dvpos: 8, pesos: [9, 8, 7, 6, 5, 4, 3, 2], algorithmSteps: ["onlyNumbers", "normalSum", "mod11", "minusRestOf11"] }], validate: function (n) { return i(n, this) } }], t.SE = [{ chars: 9, dvs: [{ dvpos: 8, pesos: [9, 8, 7, 6, 5, 4, 3, 2], algorithmSteps: ["onlyNumbers", "normalSum", "mod11", "minusRestOf11"] }], validate: function (n) { return i(n, this) } }], t.PB = [{ chars: 9, dvs: [{ dvpos: 8, pesos: [9, 8, 7, 6, 5, 4, 3, 2], algorithmSteps: ["onlyNumbers", "normalSum", "mod11", "minusRestOf11"] }], validate: function (n) { return i(n, this) } }], t.CE = [{ chars: 9, dvs: [{ dvpos: 8, pesos: [9, 8, 7, 6, 5, 4, 3, 2], algorithmSteps: ["onlyNumbers", "normalSum", "mod11", "minusRestOf11"] }], validate: function (n) { return i(n, this) } }], t.PI = [{ chars: 9, dvs: [{ dvpos: 8, pesos: [9, 8, 7, 6, 5, 4, 3, 2], algorithmSteps: ["onlyNumbers", "normalSum", "mod11", "minusRestOf11"] }], validate: function (n) { return i(n, this) } }], t.MA = [{ chars: 9, match: /^12/, dvs: [{ dvpos: 8, pesos: [9, 8, 7, 6, 5, 4, 3, 2], algorithmSteps: ["onlyNumbers", "normalSum", "mod11", "minusRestOf11"] }], validate: function (n) { return i(n, this) } }], t.MT = [{ chars: 11, dvs: [{ dvpos: 10, pesos: [3, 2, 9, 8, 7, 6, 5, 4, 3, 2], algorithmSteps: ["onlyNumbers", "normalSum", "mod11", "minusRestOf11"] }], validate: function (n) { return i(n, this) } }], t.MS = [{ chars: 9, match: /^28/, dvs: [{ dvpos: 8, pesos: [9, 8, 7, 6, 5, 4, 3, 2], algorithmSteps: ["onlyNumbers", "normalSum", "mod11", "minusRestOf11"] }], validate: function (n) { return i(n, this) } }], t.TO = [{ chars: 11, match: /^[0-9]{2}((0[123])|(99))/, dvs: [{ dvpos: 10, pesos: [9, 8, 0, 0, 7, 6, 5, 4, 3, 2], algorithmSteps: ["onlyNumbers", "normalSum", "mod11", "minusRestOf11"] }], validate: function (n) { return i(n, this) } }], t.AL = [{ chars: 9, match: /^24[03578]/, dvs: [{ dvpos: 8, pesos: [9, 8, 7, 6, 5, 4, 3, 2], algorithmSteps: ["onlyNumbers", "normalSum", "mod11", "minusRestOf11"] }], validate: function (n) { return i(n, this) } }], t.RR = [{ chars: 9, match: /^24/, dvs: [{ dvpos: 8, pesos: [1, 2, 3, 4, 5, 6, 7, 8], algorithmSteps: ["onlyNumbers", "normalSum", "mod9", "voidFn"] }], validate: function (n) { return i(n, this) } }], t.GO = [{ chars: 9, match: /^1[015]/, dvs: [{ dvpos: 8, pesos: [9, 8, 7, 6, 5, 4, 3, 2], algorithmSteps: ["onlyNumbers", "normalSum", "mod11", "goSpec"] }], validate: function (n) { return i(n, this) } }], t.AP = [{ chars: 9, match: /^03/, dvs: [{ dvpos: 8, pesos: [9, 8, 7, 6, 5, 4, 3, 2], algorithmSteps: ["onlyNumbers", "apSpec", "mod11", "apSpec"] }], validate: function (n) { return i(n, this) } }]; var u = { ie: e, cpf: r, cnpj: l }, s = { "function": !0, object: !0 }; s[typeof module] ? module.exports = u : a.BrV = u }.call(this), n.module("ui.utils.masks.cep", []).directive("uiBrCepMask", [function () { function n(n) { return n ? n.replace(/[^0-9]/g, "") : n } function a(n, i) { if (!n) return i.$setValidity("cep", !0), n; var a = l.process(n); i.$setValidity("cep", a.valid); var r = a.result; return r.trim().replace(/[^0-9]$/, "") } var l = new i("00000-000"); return { restrict: "A", require: "?ngModel", link: function (i, l, r, e) { e && (e.$formatters.push(function (n) { return a(n, e) }), e.$parsers.push(function (i) { if (!i) return a(i, e); var l = n(i), r = a(l, e); return e.$viewValue !== r && (e.$setViewValue(r), e.$render()), n(r) })) } } }]), function () { function a(n, i) { var a = n.$isEmpty(i) || BrV.cpf.validate(i); return n.$setValidity("cpf", a), i } function l(n, i) { var a = n.$isEmpty(i) || BrV.cnpj.validate(i); return n.$setValidity("cnpj", a), i } function r(n, i) { return !i || i.length <= 11 ? (l(n, ""), a(n, i)) : (a(n, ""), l(n, i)) } function e() { function n(n) { if (!n) return n; var i = s.apply(n); return i.trim().replace(/[^0-9]$/, "") } return { restrict: "A", require: "?ngModel", link: function (i, l, r, e) { e && (e.$formatters.push(function (i) { return n(a(e, i)) }), e.$parsers.push(function (i) { if (!i) return i; var a = i.replace(/[^\d]/g, ""), l = n(a); return e.$viewValue !== l && (e.$setViewValue(l), e.$render()), l.replace(/[^\d]+/g, "") }), e.$parsers.push(function (n) { return a(e, n) })) } } } function t() { function n(n) { if (!n) return n; var i = u.apply(n); return i.trim().replace(/[^0-9]$/, "") } return { restrict: "A", require: "?ngModel", link: function (i, a, r, e) { e && (e.$formatters.push(function (i) { return n(l(e, i)) }), e.$parsers.push(function (i) { if (!i) return i; var a = i.replace(/[^\d]+/g, ""), l = n(a); return e.$viewValue !== l && (e.$setViewValue(l), e.$render()), l.replace(/[^\d]+/g, "") }), e.$parsers.push(function (n) { return l(e, n) })) } } } function o() { function n(n) { if (!n) return n; var i; return i = n.length > 11 ? u.apply(n) : s.apply(n), i.trim().replace(/[^0-9]$/, "") } return { restrict: "A", require: "?ngModel", link: function (i, a, l, e) { e && (e.$formatters.push(function (i) { return n(r(e, i)) }), e.$parsers.push(function (i) { if (!i) return i; var a = i.replace(/[^\d]+/g, ""), l = n(a); return e.$viewValue !== l && (e.$setViewValue(l), e.$render()), l.replace(/[^\d]+/g, "") }), e.$parsers.push(function (n) { return r(e, n) })) } } } var u = new i("00.000.000/0000-00"), s = new i("000.000.000-00"); n.module("ui.utils.masks.cpfCnpj", []).directive("uiBrCpfMask", [e]).directive("uiBrCnpjMask", [t]).directive("uiBrCpfcnpjMask", [o]).directive("uiCpfMask", [e]).directive("uiCnpjMask", [t]).directive("uiCpfcnpjMask", [o]) }(); var l; "undefined" != typeof moment && (l = moment); var r = []; try { n.module("angular-momentjs"), r.push("angular-momentjs") } catch (e) { } n.module("ui.utils.masks.date", r).directive("uiDateMask", ["$locale", "$log", "$injector", function (a, r, e) { var t; if ("undefined" == typeof l) { if (!e.has("MomentJS")) throw new Error("Moment.js not found. Check if it is available."); t = e.get("MomentJS") } else t = l; var o = { "pt-br": "DD/MM/YYYY" }, u = o[a.id] || "YYYY-MM-DD"; return { restrict: "A", require: "?ngModel", link: function (a, l, e, o) { function s(i) { return n.isUndefined(i) ? i : i.replace(/[^0-9]/g, "") } function f(i) { if (!n.isUndefined(i) && 0 !== i.length) { var a = s(i), l = g.process(a).result; return l.trim().replace(/[^0-9]$/, "") } } function m(i) { if (r.debug("[uiDateMask] Formatter called: ", i), !n.isUndefined(i)) { var a = f(t(i).format(u)); return d(a), a } } function c(n) { r.debug("[uiDateMask] Parser called: ", n); var i = f(n); r.debug("[uiDateMask] Formated value: ", i), o.$viewValue !== i && (o.$setViewValue(i), o.$render()), d(i); var a = t(i, u); return a.toDate() } function d(n) { r.debug("[uiDateMask] Validator called: ", n); var i = t(n, u).isValid() && n.length === u.length; o.$setValidity("date", o.$isEmpty(n) || i) } var g = new i(u.replace(/[YMD]/g, "0")); o.$formatters.push(m), o.$parsers.push(c) } } }]), n.module("ui.utils.masks.helpers", []).factory("PreFormatters", [function () { function n(n) { var i = n.replace(/^-/, "").replace(/^0*/, ""); return i = i.replace(/[^0-9]/g, "") } function i(i, a) { return n(parseFloat(i).toFixed(a)) } return { clearDelimitersAndLeadingZeros: n, prepareNumberToFormatter: i } }]).factory("NumberValidators", [function () { return { maxNumber: function (n, i, a) { var l = parseFloat(a), r = n.$isEmpty(i) || isNaN(l) || l >= i; return n.$setValidity("max", r), i }, minNumber: function (n, i, a) { var l = parseFloat(a), r = n.$isEmpty(i) || isNaN(l) || i >= l; return n.$setValidity("min", r), i } } }]).factory("NumberMasks", [function () { return { viewMask: function (n, a, l) { var r = "#" + l + "##0"; if (n > 0) { r += a; for (var e = 0; n > e; e++)r += "0" } return new i(r, { reverse: !0 }) }, modelMask: function (n) { var a = "###0"; if (n > 0) { a += "."; for (var l = 0; n > l; l++)a += "0" } return new i(a, { reverse: !0 }) } } }]), n.module("ui.utils.masks.ie", []).directive("uiBrIeMask", ["$parse", function (n) { function a(n) { return n ? n.replace(/[^0-9]/g, "") : n } function l(n, i) { if (!n || !e[n]) return void 0; var l = n.toUpperCase(); if ("SP" === l && /^P/i.test(i)) return e.SP[1].mask; for (var r = e[n], t = 0; r[t].chars && r[t].chars < a(i).length && t < r.length - 1;)t++; return r[t].mask } function r(n, i, r) { var e = l(i, n); if (!n || !e) return r.$setValidity("ie", !0), n; var t = e.process(a(n)); r.$setValidity("ie", BrV.ie(i).validate(n)); var o = t.result; return i && "SP" === i.toUpperCase() && /^p/i.test(n) ? "P" + (o ? o.trim().replace(/[^0-9]$/, "") : "") : o ? o.trim().replace(/[^0-9]$/, "") : o } var e = { AC: [{ mask: new i("00.000.000/000-00") }], AL: [{ mask: new i("000000000") }], AM: [{ mask: new i("00.000.000-0") }], AP: [{ mask: new i("000000000") }], BA: [{ chars: 8, mask: new i("000000-00") }, { mask: new i("0000000-00") }], CE: [{ mask: new i("00000000-0") }], DF: [{ mask: new i("00000000000-00") }], ES: [{ mask: new i("00000000-0") }], GO: [{ mask: new i("00.000.000-0") }], MA: [{ mask: new i("000000000") }], MG: [{ mask: new i("000.000.000/0000") }], MS: [{ mask: new i("000000000") }], MT: [{ mask: new i("0000000000-0") }], PA: [{ mask: new i("00-000000-0") }], PB: [{ mask: new i("00000000-0") }], PE: [{ chars: 9, mask: new i("0000000-00") }, { mask: new i("00.0.000.0000000-0") }], PI: [{ mask: new i("000000000") }], PR: [{ mask: new i("000.00000-00") }], RJ: [{ mask: new i("00.000.00-0") }], RN: [{ chars: 9, mask: new i("00.000.000-0") }, { mask: new i("00.0.000.000-0") }], RO: [{ mask: new i("0000000000000-0") }], RR: [{ mask: new i("00000000-0") }], RS: [{ mask: new i("000/0000000") }], SC: [{ mask: new i("000.000.000") }], SE: [{ mask: new i("00000000-0") }], SP: [{ mask: new i("000.000.000.000") }, { mask: new i("-00000000.0/000") }], TO: [{ mask: new i("00000000000") }] }; return { restrict: "A", require: "?ngModel", link: function (i, l, e, t) { var o = n(e.uiBrIeMask)(i); t && (i.$watch(e.uiBrIeMask, function (n) { o = n, r(t.$viewValue, o, t) }), t.$formatters.push(function (n) { return r(n, o, t) }), t.$parsers.push(function (n) { if (!n) return r(n, o, t); var i = r(n, o, t); return t.$viewValue !== i && (t.$setViewValue(i), t.$render()), o && "SP" === o.toUpperCase() && /^p/i.test(n) ? "P" + a(i) : a(i) })) } } }]), n.module("ui.utils.masks", ["ui.utils.masks.helpers", "ui.utils.masks.number", "ui.utils.masks.percentage", "ui.utils.masks.money", "ui.utils.masks.phone", "ui.utils.masks.cep", "ui.utils.masks.ie", "ui.utils.masks.cpfCnpj", "ui.utils.masks.date", "ui.utils.masks.time", "ui.utils.masks.scientific-notation", "ui.utils.masks.nfe"]).config(["$logProvider", function (n) { n.debugEnabled(!1) }]), n.module("ui.utils.masks.money", []).directive("uiMoneyMask", ["$locale", "$parse", "PreFormatters", "NumberValidators", function (a, l, r, e) { return { restrict: "A", require: "?ngModel", link: function (t, o, u, s) { function f(n) { if (!n) return n; var i = n.replace(/[^\d]+/g, ""); i = i.replace(/^[0]+([1-9])/, "$1"); var a = $.apply(i); return n !== a && (s.$setViewValue(a), s.$render()), a ? parseInt(a.replace(/[^\d]+/g, "")) / Math.pow(10, g) : null } var m = a.NUMBER_FORMATS.DECIMAL_SEP, c = a.NUMBER_FORMATS.GROUP_SEP, d = a.NUMBER_FORMATS.CURRENCY_SYM, g = parseInt(u.uiMoneyMask); if (s) { n.isDefined(u.uiHideGroupSep) && (c = ""), isNaN(g) && (g = 2); var D = g > 0 ? m + new Array(g + 1).join("0") : "", p = d + " #" + c + "##0" + D, $ = new i(p, { reverse: !0 }); s.$formatters.push(function (i) { if (n.isUndefined(i)) return i; var a = r.prepareNumberToFormatter(i, g); return $.apply(a) }), s.$parsers.push(f), u.uiMoneyMask && t.$watch(u.uiMoneyMask, function (n) { isNaN(n) && (n = 2), D = n > 0 ? m + new Array(n + 1).join("0") : "", p = d + " #" + c + "##0" + D, $ = new i(p, { reverse: !0 }), f(s.$viewValue || "") }), u.min && (s.$parsers.push(function (n) { var i = l(u.min)(t); return e.minNumber(s, n, i) }), t.$watch(u.min, function (n) { e.minNumber(s, s.$modelValue, n) })), u.max && (s.$parsers.push(function (n) { var i = l(u.max)(t); return e.maxNumber(s, n, i) }), t.$watch(u.max, function (n) { e.maxNumber(s, s.$modelValue, n) })) } } } }]), n.module("ui.utils.masks.nfe", []).directive("uiNfeAccessKeyMask", ["$log", function (a) { function l(i) { return n.isUndefined(i) || 0 === i.length ? i : i.replace(/[^0-9]/g, "").slice(0, 44) } var r = new i("0000 0000 0000 0000 0000 0000 0000 0000 0000 0000 0000"); return { restrict: "A", require: "ngModel", link: function (i, e, t, o) { function u(i) { if (a.debug("[uiNfeAccessKeyMask] Formatter called: ", i), n.isUndefined(i) || 0 === i.length) return i; var l = r.apply(i); return l.replace(/[^0-9]$/, "") } function s(n) { a.debug("[uiNfeAccessKeyMask] Parser called: ", n); var i = l(n), r = u(i); return o.$viewValue !== r && (o.$setViewValue(r), o.$render()), i } function f(i) { if (a.debug("[uiNfeAccessKeyMask] Validator called: ", i), n.isUndefined(i)) return i; var l = 44 === i.toString().length; return o.$setValidity("nfe-access-key", o.$isEmpty(i) || l), i } o.$formatters.push(u), o.$formatters.push(f), o.$parsers.push(s), o.$parsers.push(f) } } }]), n.module("ui.utils.masks.number", []).directive("uiNumberMask", ["$locale", "$parse", "PreFormatters", "NumberMasks", "NumberValidators", function (i, a, l, r, e) { return { restrict: "A", require: "?ngModel", link: function (t, o, u, s) { function f(i) { if (!i) return i; var a = l.clearDelimitersAndLeadingZeros(i) || "0", r = g.apply(a), e = parseFloat(D.apply(a)); if (n.isDefined(u.uiNegativeNumber)) { var t = "-" === i[0], o = "-" === i.slice(-1); o ^ t && e && (e *= -1, r = "-" + r) } return s.$viewValue !== r && (s.$setViewValue(r), s.$render()), e } var m = i.NUMBER_FORMATS.DECIMAL_SEP, c = i.NUMBER_FORMATS.GROUP_SEP, d = a(u.uiNumberMask)(t); if (s) { n.isDefined(u.uiHideGroupSep) && (c = ""), isNaN(d) && (d = 2); var g = r.viewMask(d, m, c), D = r.modelMask(d); s.$formatters.push(function (i) { var a = ""; if (n.isDefined(u.uiNegativeNumber) && 0 > i && (a = "-"), !i) return i; var r = l.prepareNumberToFormatter(i, d); return a + g.apply(r) }), s.$parsers.push(f), u.uiNumberMask && t.$watch(u.uiNumberMask, function (n) { isNaN(n) && (n = 2), g = r.viewMask(n, m, c), D = r.modelMask(n), f(s.$viewValue || "") }), u.min && (s.$parsers.push(function (n) { var i = a(u.min)(t); return e.minNumber(s, n, i) }), t.$watch(u.min, function (n) { e.minNumber(s, s.$modelValue, n) })), u.max && (s.$parsers.push(function (n) { var i = a(u.max)(t); return e.maxNumber(s, n, i) }), t.$watch(u.max, function (n) { e.maxNumber(s, s.$modelValue, n) })) } } } }]), n.module("ui.utils.masks.percentage", []).directive("uiPercentageMask", ["$locale", "$parse", "PreFormatters", "NumberMasks", "NumberValidators", function (i, a, l, r, e) { function t(n, i) { return l.clearDelimitersAndLeadingZeros((100 * parseFloat(n)).toFixed(i)) } return { restrict: "A", require: "?ngModel", link: function (o, u, s, f) { function m(n) { if (!n) return n; var i = l.clearDelimitersAndLeadingZeros(n) || "0"; n.length > 1 && -1 === n.indexOf("%") && (i = i.slice(0, i.length - 1)); var a = p.apply(i) + " %", r = parseFloat($.apply(i)); return f.$viewValue !== a && (f.$setViewValue(a), f.$render()), r } var c = i.NUMBER_FORMATS.DECIMAL_SEP, d = i.NUMBER_FORMATS.GROUP_SEP, g = parseInt(s.uiPercentageMask); if (f) { n.isDefined(s.uiHideGroupSep) && (d = ""), isNaN(g) && (g = 2); var D = g + 2, p = r.viewMask(g, c, d), $ = r.modelMask(D); f.$formatters.push(function (n) { if (!n) return n; var i = t(n, g); return p.apply(i) + " %" }), f.$parsers.push(m), s.uiPercentageMask && o.$watch(s.uiPercentageMask, function (n) { isNaN(n) && (n = 2), D = n + 2, p = r.viewMask(n, c, d), $ = r.modelMask(D), m(f.$viewValue || "") }), s.min && (f.$parsers.push(function (n) { var i = a(s.min)(o); return e.minNumber(f, n, i) }), o.$watch("min", function (n) { e.minNumber(f, f.$modelValue, n) })), s.max && (f.$parsers.push(function (n) { var i = a(s.max)(o); return e.maxNumber(f, n, i) }), o.$watch("max", function (n) { e.maxNumber(f, f.$modelValue, n) })) } } } }]); var t = { AF: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^937[05789][0-9]{6,7}$"] }, AL: { countryDialingCode: 355, nationalDialingPrefix: 0, format: ["^3556[7-9][0-9]{7}$"] }, DZ: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^213[5-9][0-9]{7}$", "^213(55|66|77)[0-9]{7}$", "^213(79[0-6]|69[7-9])[0-9]{6}$"] }, AR: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^54[0-9]{10}$"] }, AS: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^1684(25[248]|73[13])[0-9]{4}$"] }, AD: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^376[346][0-9]{5}$"] }, AO: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^2449[12][0-9]{7}$"] }, AI: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^1264(235|476|5(3[6-9]|8[1-4])|7(29|72))[0-9]{4}$"] }, AG: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^1268(464|7(64|7[0-5]|8[358]))[0-9]{4}$", "^126872[0-9]{5}$"] }, AM: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^374(77|99|9[1-4])[0-9]{6}$"] }, AW: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^297(56|59|96)[0-9]{5}$", "^297(990|99[2-9])[0-9]{4}$"] }, AU: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^614[0-1][0-9]{7}$", "^614(2([1-4]|[7-9])|3([0-4]|[7-9])|4[89])[0-9]{6}$", "^61425([1-3]|[6-8])[0-9]{5}$"] }, AT: { countryDialingCode: 43, nationalDialingPrefix: 0, format: ["^436[7-9][0-9]{5,11}$", "^436(44|5([0-3]|[579])|6[01]|6[3-9])[0-9]{4,10}$"] }, AZ: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^994(40|5[015]|70)[0-9]{7}$", "^99460540[0-9]{4}$"] }, BS: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^1242(357|359|457|557)[0-9]{4}$"] }, BH: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^9733[69][0-9]{6}$", "^973377[0-9]{5}$", "^973383[0-9]{5}$"] }, BD: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^8801[1-9][0-9]{8}$"] }, BB: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^124626[0-9]{5,8}$"] }, BY: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^375(29|44|33)[0-9]{7}$", "^375259[0-9]{6}$"] }, BE: { countryDialingCode: 32, nationalDialingPrefix: 0, format: ["^324[0-9]{8}$"] }, BZ: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^501(62[01])[0-9]{4}$", "^501(6[67])[0-9]{5}$"] }, BJ: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^2299[0-9]{7}$"] }, BM: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^1441([37][0-9]{6}|5[0-3][0-9]{5}|59[09][0-9]{4})$"] }, BT: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^97517[0-9]{6}$"] }, BO: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^5917(0[6-8]|1([01]|[4-9])|2([0-2]|[89])|7[0-5])[0-9]{5}$", "^5917(11[2-4]|24[015])[0-9]{4}$"] }, BA: { countryDialingCode: 387, nationalDialingPrefix: 0, format: ["^3876[12356][0-9]{6,7}$"] }, BW: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^2677[34][0-9]{6}$"] }, BR: { countryDialingCode: "55", mask: "(00) 00000-0000", nationalDialingPrefix: null, format: ["^55(1[1-9]|2[12478]|3[1234578]|4[1-9]|5[1345]|6[1-9]|7[134579]|8[1-9]|9[1-9])[89][0-9]{7}$"] }, VI: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^1284(30[0-3]|44[0-5]|4(68|96|99)|54[0-4])[0-9]{4}$"] }, BN: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^673[78][0-9]{6}$"] }, BG: { countryDialingCode: 359, nationalDialingPrefix: 0, format: ["^359(4[38]|8[789]|98)[0-9]{5,7}$"] }, BF: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^2267[01568][0-9]{6}$"] }, BI: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^257(2955|795[6-9])[0-9]{4}$", "^2577(66|77|88|99)[0-9]{5}$"] }, KH: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^855[19][0-9]{7,8}$"] }, CA: { countryDialingCode: 1, nationalDialingPrefix: 1, format: ["^1(403|250|289|204|306|403|289|587|780|604|778|250|204|506|709|867|906|289|519|226|705|613|807|416|647|902|418|581|450|514|438|819|306|867)[0-9]{7}$"] }, CL: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^56[89][0-9]{7,8}$"] }, CM: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^237[79][0-9]{7}$"] }, CV: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^2389[0-9]{6}$"] }, KY: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^1345(32([3-7]|9)|5(1[467]|2[5-7]|4[5-9])|9(1[679]|2[4-9]|3[089]))[0-9]{4}$"] }, CF: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^2367[0257][0-9]{6}$"] }, TD: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^235(620|679|980)[0-9]{4}$"] }, CN: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^861[35][0-9]{9}$", "^86189[0-9]{8}$"] }, CO: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^573(00|1[012356])[0-9]{7}$"] }, KM: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^2693[23][0-9]{5}$"] }, CG: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^242[4-6][0-9]{6}$"] }, CD: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^243(68|80|81|88|98|99)[0-9]{7}$"] }, CK: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^6827[0-9]{4}$"] }, CR: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^5068[0-9]{6,7}$"] }, CI: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^2250[0-9]{7}$", "^225(4[4-8]|6[067])[0-9]{6}$"] }, HR: { countryDialingCode: 385, nationalDialingPrefix: 0, format: ["^3859[12589][0-9]{7,10}$"] }, CU: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^535[0-9]{6,7}$"] }, CY: { countryDialingCode: 357, nationalDialingPrefix: null, format: ["^3579(6|7[67]|9[0-689])[0-9]{5,6}$", "^357997[14-9][0-9]{4}$"] }, CZ: { countryDialingCode: 420, nationalDialingPrefix: null, format: ["^42060[1-8][0-9]{6}$", "^4207[2379][0-9]{7}$"] }, DK: { countryDialingCode: 45, nationalDialingPrefix: null, format: ["^452[0-9]{7}$", "^45(3[01]|4[01]|5[0-2]|6[01])[0-9]{6}$"] }, DJ: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^2536[0-9]{5}$", "^2538[0-5][0-9]{4}$"] }, DM: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^1767(2(25|35|45|65|7[567])|31[567]|61[456])[0-9]{4}$"] }, DO: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^1809[0-9]{7}$", "^1829[0-9]{7}$", "^1849[0-9]{7}$"] }, TL: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^6707[0-9]{6}$"] }, EC: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^593(8|9)[0-9]{6}$"] }, EG: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^201[01268][0-9]{7}$"] }, SV: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^5037[0-9]{7}$"] }, GQ: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^240[256][0-9]{5}$"] }, ER: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^29117[1-3][0-9]{4}$", "^2917[0-9]{6}$"] }, EE: { countryDialingCode: 372, nationalDialingPrefix: null, format: ["^3728[1-5][0-9]{6}$", "^3725[0-9]{6,7}$"] }, ET: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^25191[0-9]{7}$"] }, FK: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^500[56][0-9]{4}$"] }, FO: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^2982[0-9]{5}$", "^298(7[5-9]|9[1-5])[0-9]{4}$"] }, FJ: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^679(7[0-4]|9[29])[0-9]{5}$"] }, FR: { countryDialingCode: 33, nationalDialingPrefix: 0, format: ["^33[67][0-9]{8}$"] }, GF: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^594694[0-9]{6}$"] }, PF: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^689[27][0-9]{5}$", "^6893[01][0-9]{4}$", "^68975[48][0-9]{3}$", "^6894114[0-9]{2}$"] }, GA: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^2410[567][0-9]{6}$"] }, GM: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^220(7[02789]|9[7-9])[0-9]{5}$", "^22077[05-9][0-9]{4}$"] }, GE: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^995(5[578]|77|93)[0-9]{6}$"] }, DE: { countryDialingCode: 49, nationalDialingPrefix: 0, format: ["^4915(05|1[125]|2[025]|7[03578])[0-9]{7}$", "^491(6[023489]|7[0-9])[0-9]{7,8}$"] }, FI: { countryDialingCode: 358, nationalDialingPrefix: 0, format: ["^358(4[0-9]|50)[0-9]{7}$"] }, GH: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^233(2[36]|54)[0-9]{7}$"] }, GI: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^350(5[4678]|60)[0-9]{6}$"] }, GR: { countryDialingCode: 30, nationalDialingPrefix: null, format: ["^309[347][0-9]{8}$", "^3069[0349][0-9]{7}$"] }, GL: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^299(49|5[2-9])[0-9]{4}$"] }, GD: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^1473(53[3-8]|4(0[3-79]|1[04-9]|20|58))[0-9]{4}$"] }, GP: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^590690[0-9]{6}$"] }, GU: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^1671(48[238]|726|8[6-9]8)|9(22|69))[0-9]{4}$"] }, GT: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^502[45][0-9]{7}$"] }, GW: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^245[567][0-9]{6}$"] }, GN: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^2246[02-7][0-9]{6}$"] }, GY: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^5926[0-9]{6}$"] }, GG: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^447839[1278][0-9]{5}$", "^447781[0-9]{6}$"] }, HT: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^509(3[3-9]|40|9[04])[0-9]{5,6}$"] }, HN: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^504[3789][0-9]{7}$"] }, HK: { countryDialingCode: 852, nationalDialingPrefix: null, format: ["^852[569][0-9]{7}$"] }, HU: { countryDialingCode: 36, nationalDialingPrefix: 6, format: ["^36[237]0[0-9]{5,7}$"] }, IE: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^35308[235-9][0-9]{5,6}$"] }, IS: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^354(95[48]|77[0-3])[0-9]{4}$", "^354(6|8|38[089])[0-9]{6}$"] }, IN: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^919[0-9]{9}$", "^9110[1-4][0-9]{8}$"] }, ID: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^6281[16]0[0-9]{6}$", "^628[23][0-9]{7}$", "^6281(1[1-9]|[235-9])[0-9]{6,7}$", "^628[568][0-9]{7,8}$", "^6281(1[1-9]|[235-9])[0-9]{5}$"] }, IR: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^9891[2678][0-9]{7}$"] }, IQ: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^96407[5789][0-9]{8}$"] }, IL: { countryDialingCode: 972, nationalDialingPrefix: 0, format: ["^972[0-9]{9}$"] }, IM: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^447924[0-4][0-9]{5}$"] }, IT: { countryDialingCode: 39, nationalDialingPrefix: 0, format: ["^393[0-9]{8,9}$"] }, JM: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^1876[2-9][0-9]{6}$"] }, JP: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^81[89]0[0-9]{8}$"] }, JE: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^447(509[0125]|5372|700[378]|797[7-9]|82(23|9[789])|9780)[0-9]{5}$", "^447937[0-9]{6}$"] }, JO: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^96274(5[4-7]|66|77)[0-9]{5}$", "^9627(7[569]|8[568]|9[0567])[0-9]{6}$"] }, KZ: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^77(0[01257]|6[0-3]|77)[0-9]{7}$", "^77(1[2-578]9[01]|2([13-7]9[01]|758))[0-9]{5}$"] }, KE: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^254(7[237]|84)[0-9]{7,8}$"] }, KI: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^686(30|69)[0-9]{3}$"] }, KP: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^85019[0-9]{5}$"] }, KR: { countryDialingCode: 82, nationalDialingPrefix: 0, format: ["^821[016-9][0-9]{7,8}$"] }, KW: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^965[569][0-9]{6,7}$"] }, KG: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^996(5[14-7]|77)[0-9]{7}$", "^996700[0-9]{6}$"] }, LA: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^85620[0-9]{7}$"] }, LV: { countryDialingCode: 371, nationalDialingPrefix: null, format: ["^3712[0-9]{6,7}$"] }, LB: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^961(3|70)[0-9]{6}$"] }, LS: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^266[56][0-9]{7}$"] }, LR: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^231(4[0167]|6[4-9])[0-9]{5}$", "^2315[0-9]{6}$", "^2317[0-9]{7}$"] }, LY: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^2189[12][0-9]{7}$"] }, LI: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^4236[0-9]{6,8}$"] }, LT: { countryDialingCode: 370, nationalDialingPrefix: 0, format: ["^3706[0-9]{7}$"] }, LU: { countryDialingCode: 352, nationalDialingPrefix: null, format: ["^3526[0-9]{8}$"] }, MO: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^85366[0-9]{6}$"] }, MK: { countryDialingCode: 389, nationalDialingPrefix: 0, format: ["^3897[0125-8][0-9]{6}$"] }, MX: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^52[0-9]{10}$"] }, MG: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^2613[0-3][0-9]{7}$"] }, MW: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^265[4589][0-9]{6}$"] }, MY: { countryDialingCode: 60, nationalDialingPrefix: 0, format: ["^601[0-9]{7,8}$"] }, MV: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^960(7[6-9]|9[6-9])[0-9]{5}$"] }, ML: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^223[67][0-9]{7}$"] }, MT: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^356[79][79][0-9]{6}$", "^356981[12][0-9]{4}$"] }, MH: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^692(45|62|23)5[0-9]{4}$"] }, MQ: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^596696[0-9]{6}$"] }, MR: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^2226[34][0-9]{5}$"] }, MU: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^2307[0-9]{6}$", "^230(49|9[134578])[0-9]{5}$", "^230(42[12389]|87[1567])[0-9]{4}$"] }, YT: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^269639[0-9]{6}$"] }, FM: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^6919[2357]0[0-9]{4}$"] }, MD: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^373(6([589]0|7[12])|7[89]0)[0-9]{5}$"] }, MC: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^377[46][0-9]{7,8}$"] }, MN: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^976(88|9[1569])[0-9]{6}$"] }, ME: { countryDialingCode: 382, nationalDialingPrefix: 0, format: ["^382(6[379]|70)[0-9]{3,10}$", "^38268[0-9]{2,10}$"] }, MS: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^1664492[0-9]{4}$"] }, MA: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^212[167][0-9]{7}$", "^212(4[0124-8]|5[01])[0-9]{6}$"] }, MZ: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^258[89][0-9]{8}$"] }, MM: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^959[0-9]{7,8}$"] }, NA: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^26481[0-9]{7}$"] }, NR: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^674555[0-9]{4}$"] }, NL: { countryDialingCode: 31, nationalDialingPrefix: 0, format: ["^316[0-9]{8}$"] }, AN: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^599([59]4|98)[0-9]{5}$", "^599(318|416|5(25|8[239])|71[578]|9(50|7[34]))[0-9]{4}$", "^5999(7(2[0-3]|6[3567]|777))[0-9]{3}$"] }, NC: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^6879[0-9]{5}$", "^687(7[5-9]|8[0-79])[0-9]{4}$"] }, NZ: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^642[01345789][0-9]{6,8}$"] }, NI: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^505[68][0-9]{6}$"] }, NE: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^2779[0-9]{7}$"] }, NG: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^23490[0-9]{6}$", "^234(703|80[2-7])[0-9]{7}$"] }, NF: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^67238[0-9]{4}$"] }, NO: { countryDialingCode: 47, nationalDialingPrefix: null, format: ["^47[49][0-9]{7,8}$"] }, OM: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^9689[25-9][0-9]{6}$"] }, PK: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^923[0-9]{9}$"] }, PW: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^680(6[234689]0|77[59])[0-9]{4}$"] }, PS: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^9705[59][0-9]{7}$"] }, PA: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^5076[0-9]{6,7}$"] }, PG: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^675170[0-9]{2}$", "^675189[0-9]$", "^6756[1-3][0-9]{6}$", "^6756[5-9][0-9]{5}$"] }, PY: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^5959[0-9]{8}$"] }, PE: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^519[0-9]{9,10}$", "^5119[0-9]{8}$"] }, PH: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^639[0-9]{8,9}$"] }, PL: { countryDialingCode: 48, nationalDialingPrefix: 0, format: ["^48(5[01]|6[069]|7[89]|88)[0-9]{7}$", "^4872[12][0-9]{6}$"] }, PT: { countryDialingCode: 351, nationalDialingPrefix: null, format: ["^3519[0-9]{8}$"] }, PR: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^1(787|939)[0-9]{10}$"] }, QA: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^974[356][0-9]{6}$"] }, RE: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^26269[23][0-9]{6}$"] }, RO: { countryDialingCode: 40, nationalDialingPrefix: 0, format: ["^407(2[0123]|4[045]|61|62|66|88)[0-9]{6}$"] }, RU: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^79[0-9]{9}$"] }, RW: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^2500[358][0-9]{6}$"] }, KN: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^1869(5(5[678]|6[567])|66[2-57-9]|76[2-5])[0-9]{4}$"] }, LC: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^1758(28[4-7]|384|4(6[01]|8[4-9])|5(1[89]|20|84)|72[034])[0-9]{4}$", "^175871[0-9]{5}$"] }, PM: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^50855[0-9]{4}$"] }, VC: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^1784(4(3[0124]|5[45]|9[2-5])|5(2[6-9]|3[0-3]|93))[0-9]{4}$"] }, WS: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^6857[2567][0-9]{5}$"] }, SM: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^3786[0-9]{8,12}$"] }, ST: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^23960[0-9]{4}$"] }, SA: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^9665[0-9]{8}$"] }, SN: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^2217[67][0-9]{7}$"] }, RS: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^3816[0-9]{3,11}$"] }, SC: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^248[579][0-9]{5}$"] }, SL: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^232(25|3[03]|40|5[05]|7[678]|88)[0-9]{6}$"] }, SG: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^65525[0-9]{5}$", "^6581[0-9]{6}$"] }, SK: { countryDialingCode: 421, nationalDialingPrefix: 0, format: ["^4219[01][0-9]{7}$", "^421949[01][0-9]{6}$"] }, SI: { countryDialingCode: 386, nationalDialingPrefix: 0, format: ["^386(3[01]|4[01]|51|6[4-9]|7[01])[0-9]{5,6}$", "^386(30)[0-9]{5,6}$"] }, SB: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^6776[5-9][0-9]{3}$", "^677[89][0-9]{4}$"] }, SO: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^2529[01][0-9]{6}$"] }, ZA: { countryDialingCode: 27, nationalDialingPrefix: 0, format: ["^27[78][0-9]{4,11}$"] }, ES: { countryDialingCode: 34, nationalDialingPrefix: null, format: ["^346[0-9]{8}$"] }, LK: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^947[12578][0-9]{7}$"] }, SD: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^2499[12][0-9]{7}$"] }, SR: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^59775[0-9]{5}$", "^597[89][0-9]{6}$"] }, SZ: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^2686[0-7][0-9]{4}$"] }, SE: { countryDialingCode: 46, nationalDialingPrefix: 0, format: ["^467[036][0-9]{5,7}$"] }, CH: { countryDialingCode: 41, nationalDialingPrefix: 0, format: ["^417[46-9][0-9]{7}$"] }, SY: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^9639[0-9]{8}$"] }, TW: { countryDialingCode: 866, nationalDialingPrefix: 0, format: ["^8869[0-9]{7,8}$"] }, TJ: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^9929190[0-3][0-9]{4}$", "^992918[68][0-9]{5}$", "^9929(17|27|35|51|62|73|81|98)[0-9]{6}$"] }, TZ: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^2557[1-9][0-9]{7}$"] }, TH: { countryDialingCode: 66, nationalDialingPrefix: 0, format: ["^668[013-9][0-9]{6,7}$"] }, TG: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^2289(0[1-5]|4[6-9])[0-9]{4}$"] }, TO: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^676(1[5-9]|4[69]|5[3-9]|6[3-9]|7[567]|8[789])[0-9]{3,5}$"] }, TT: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^1868(22[1-4]|4(2[01]|8[0-4])|6(20|78))[0-9]{4}$", "^1868(29|4[01679]|68)[0-9]{5}$", "^1868[37][0-9]{6}$"] }, TR: { countryDialingCode: 90, nationalDialingPrefix: 0, format: ["^905[0-9]{9}$"] }, TM: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^9936[0-9]{7}$"] }, TC: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^1649(2(3[12]|4[1-5])|3(3[123]|4[1-5])|4(3[12]|4[12]))[0-9]{4}$"] }, TV: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^6889[0-9]{4}$"] }, UG: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^2567[1578][0-9]{7}$", "^25670[0-4][0-9]{6}$"] }, UA: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^380(39|50|6[3678]|9[1-9])[0-9]{7}$"] }, US: { countryDialingCode: 1, nationalDialingPrefix: 1, mask: "(000) 000-0000", format: ["^1[0-9]{10}$"] }, AE: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^9715[05][0-9]{7}$"] }, GB: { countryDialingCode: 44, nationalDialingPrefix: 0, format: ["^447[045789][0-9]{8}$"] }, VG: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^1340(2(26|77)|3(32|44)|47[34]|677|998)[0-9]{4,7}$"] }, UY: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^5989[4-9][0-9]{6,7}$"] }, UZ: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^9989[0-3789][0-9]{7}$"] }, VU: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^678(5[45]|77)[0-9]{5}$"] }, VE: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^58(41|25)[24-8][0-9]{7}$"] }, VN: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^841(2[1236]|6[6-9])[0-9]{7}$", "^84(2|4|9)[0-9]{8}$"] }, WF: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^6819[0-9]{5}$"] }, YE: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^9677[137][0-9]{7}$"] }, ZM: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^2609[567][0-9]{6,7}$"] }, ZW: { countryDialingCode: null, nationalDialingPrefix: null, format: ["^263(11|23|91)[0-9]{6}$"] } };
    n.module("ui.utils.masks.phone-number-plans", []).constant("phoneNumberingPlans", t), n.module("ui.utils.masks.phone", ["ui.utils.masks.phone-number-plans"]), n.module("ui.utils.masks.phone").factory("PhoneValidators", [function () { function n(n, i) { var a, l; for (a = 0; a < i.length; a++)if (l = new RegExp(i[a]), l.test(n)) return console.log("MATCHED: ", i[a]), !0; return !1 } function i(i, a) { return function (l, r) { var e; return r = r || "", r = r.replace(/[^0-9]/g, ""), e = l.$isEmpty(r) || n(r, a.format) || n(a.countryDialingCode + r, a.format), l.$setValidity(i.toLowerCase() + "-phone-number", e), r } } var a, l = {}; for (a in t) t.hasOwnProperty(a) && t[a].countryDialingCode && (l[a.toLowerCase() + "PhoneNumber"] = i(a, t[a])); return l }]), n.module("ui.utils.masks.phone").directive("uiPhoneNumber", ["PhoneValidators", function (n) { function a(n) { return n ? n.replace(/[^0-9]/g, "") : n } return { restrict: "A", require: "?ngModel", link: function (l, r, e, o) { function u(n) { var i; return n ? (i = f.apply(n), i.trim().replace(/[^0-9]$/, "")) : n } var s, f; s = (e.uiPhoneNumber || "").toUpperCase(), f = new i(t[s].mask), o && (o.$formatters.push(function (i) { return u(n[s.toLowerCase() + "PhoneNumber"](o, i)) }), o.$parsers.push(function (n) { var i, l; return n ? (i = a(n), l = u(i), o.$viewValue !== l && (o.$setViewValue(l), o.$render()), a(l)) : n }), o.$parsers.push(function (i) { return n[s.toLowerCase() + "PhoneNumber"](o, i) })) } } }]), n.module("ui.utils.masks.scientific-notation", []).directive("uiScientificNotationMask", ["$locale", "$parse", "$log", function (a, l, r) { function e(n) { var a = "0"; if (n > 0) { a += t; for (var l = 0; n > l; l++)a += "0" } return new i(a, { reverse: !0 }) } var t = a.NUMBER_FORMATS.DECIMAL_SEP, o = 2; return { restrict: "A", require: "ngModel", link: function (i, a, u, s) { function f(n) { var i = n.toString(), a = i.match(/(-?[0-9]*)[\.]?([0-9]*)?[Ee]?([\+-]?[0-9]*)?/); return { integerPartOfSignificand: a[1], decimalPartOfSignificand: a[2], exponent: 0 | a[3] } } function m(i) { if (r.debug("[uiScientificNotationMask] Formatter called: ", i), n.isUndefined(i)) return i; if ("string" == typeof i) { if (0 === i.length) return i; i = i.replace(t, ".") } else "number" == typeof i && (i = i.toExponential(g)); var a, l, e = f(i), o = 0 | e.integerPartOfSignificand, u = o.toString(); n.isDefined(e.decimalPartOfSignificand) && (u += e.decimalPartOfSignificand); var s = (o >= 1 || -1 >= o) && (n.isDefined(e.decimalPartOfSignificand) && e.decimalPartOfSignificand.length > g || 0 === g && u.length >= 2); return s && (l = u.slice(g + 1, u.length), u = u.slice(0, g + 1)), a = D.apply(u), 0 !== e.exponent && (l = e.exponent), n.isDefined(l) && (a += "e" + l), a } function c(i) { if (r.debug("[uiScientificNotationMask] Parser called: ", i), n.isUndefined(i) || 0 === i.toString().length) return i; var a = m(i), l = parseFloat(a.replace(t, ".")); return s.$viewValue !== a && (s.$setViewValue(a), s.$render()), l } function d(i) { if (r.debug("[uiScientificNotationMask] Validator called: ", i), n.isUndefined(i)) return i; var a = i < Number.MAX_VALUE; return s.$setValidity("max", s.$isEmpty(i) || a), i } var g = l(u.uiScientificNotationMask)(i); isNaN(g) && (g = o); var D = e(g); s.$formatters.push(m), s.$formatters.push(d), s.$parsers.push(c), s.$parsers.push(d) } } }]), n.module("ui.utils.masks.time", []).directive("uiTimeMask", ["$log", function (a) { if ("undefined" == typeof i) throw new Error("StringMask not found. Check if it is available."); return { restrict: "A", require: "?ngModel", link: function (l, r, e, t) { function o(i) { return n.isUndefined(i) || 0 === i.length ? i : i.replace(/[^0-9]/g, "").slice(0, m) } function u(i) { if (a.debug("[uiTimeMask] Formatter called: ", i), n.isUndefined(i) || 0 === i.length) return i; var l = g.process(o(i)).result; return l.replace(/[^0-9]$/, "") } function s(n) { a.debug("[uiTimeMask] Parser called: ", n); var i = u(n), l = i; return t.$viewValue !== l && (t.$setViewValue(l), t.$render()), i } function f(i) { if (a.debug("[uiTimeMask] Validator called: ", i), n.isUndefined(i)) return i; var l = i.toString().split(/:/).filter(function (n) { return !!n }), r = parseInt(l[0]), e = parseInt(l[1]), o = parseInt(l[2] || 0), u = i.toString().length === c && 24 > r && 60 > e && 60 > o; return t.$setValidity("time", t.$isEmpty(i) || u), i } var m = 6, c = 8, d = "00:00:00"; n.isDefined(e.uiTimeMask) && "short" === e.uiTimeMask && (m = 4, c = 5, d = "00:00"); var g = new i(d); t.$formatters.push(u), t.$formatters.push(f), t.$parsers.push(s), t.$parsers.push(f) } } }])
}(angular);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./jquery-debounce.js": 15
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 14;

/***/ }),
/* 15 */
/***/ (function(module, exports) {

/**
 * Debounce and throttle function's decorator plugin 1.0.5
 *
 * Copyright (c) 2009 Filatov Dmitry (alpha@zforms.ru)
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
 *
 */

(function ($) {

    $.extend({

        debounce: function (fn, timeout, invokeAsap, ctx) {

            if (arguments.length == 3 && typeof invokeAsap != 'boolean') {
                ctx = invokeAsap;
                invokeAsap = false;
            }

            var timer;

            return function () {

                var args = arguments;
                ctx = ctx || this;

                invokeAsap && !timer && fn.apply(ctx, args);

                clearTimeout(timer);

                timer = setTimeout(function () {
                    !invokeAsap && fn.apply(ctx, args);
                    timer = null;
                }, timeout);

            };

        },

        throttle: function (fn, timeout, ctx) {

            var timer, args, needInvoke;

            return function () {

                args = arguments;
                needInvoke = true;
                ctx = ctx || this;

                if (!timer) {
                    (function () {
                        if (needInvoke) {
                            fn.apply(ctx, args);
                            needInvoke = false;
                            timer = setTimeout(arguments.callee, timeout);
                        }
                        else {
                            timer = null;
                        }
                    })();
                }

            };

        }

    });

})(jQuery);

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./directives.js": 17
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 16;

/***/ }),
/* 17 */
/***/ (function(module, exports) {

/***
GLobal Directives
***/

// Route State Load Spinner(used on page or content load)
var appModule = angular.module("fagronTest");
appModule.directive('ngSpinnerBar', ['$rootScope',
    function ($rootScope) {
        return {
            link: function (scope, element, attrs) {
                // by defult hide the spinner bar
                element.addClass('hide'); // hide spinner bar by default

                // display the spinner bar whenever the route changes(the content part started loading)
                $rootScope.$on('$stateChangeStart', function () {
                    element.removeClass('hide'); // show spinner bar
                    Layout.closeMainMenu();
                });

                // hide the spinner bar on rounte change success(after the content loaded)
                $rootScope.$on('$stateChangeSuccess', function () {
                    element.addClass('hide'); // hide spinner bar
                    $('body').removeClass('page-on-load'); // remove page loading indicator
                    Layout.setMainMenuActiveLink('match'); // activate selected link in the sidebar menu

                    // auto scorll to page top
                    setTimeout(function () {
                        Metronic.scrollTop(); // scroll to the top on content load
                    }, $rootScope.settings.layout.pageAutoScrollOnLoad);
                });

                // handle errors
                $rootScope.$on('$stateNotFound', function () {
                    element.addClass('hide'); // hide spinner bar
                });

                // handle errors
                $rootScope.$on('$stateChangeError', function () {
                    element.addClass('hide'); // hide spinner bar
                });
            }
        };
    }
])

// Handle global LINK click
appModule.directive('a',
    function () {
        return {
            restrict: 'E',
            link: function (scope, elem, attrs) {
                if (attrs.ngClick || attrs.href === '' || attrs.href === '#') {
                    elem.on('click', function (e) {
                        e.preventDefault(); // prevent link click for above criteria
                    });
                }
            }
        };
    });

// Handle Dropdown Hover Plugin Integration
appModule.directive('dropdownMenuHover', function () {
    return {
        link: function (scope, elem) {
            elem.dropdownHover();
        }
    };
});



/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./auth/authInterceptorService.js": 19,
	"./cadastros/clienteService.js": 20,
	"./cadastros/profissaoService.js": 21,
	"./grid/config-grid.js": 22
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 18;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
﻿
angular.module('fagronTest').factory('authInterceptorService',
    ['$q', '$injector', '$location', function ($q, $injector, $location) {

        var authInterceptorServiceFactory = {};

        var _request = function (config) {

            config.headers = config.headers || {};

            return config;
        }

        var _responseError = function (rejection) {
            if (rejection.status === 401) {
                var authService = $injector.get('authService');
                var authData = localStorageService.get('authorizationData');

                if (authData) {
                    if (authData.useRefreshTokens) {
                        $location.path('/refresh');
                        return $q.reject(rejection);
                    }
                }
                authService.logOut();
                $location.path('login');
            }
            return $q.reject(rejection);
        }

        authInterceptorServiceFactory.request = _request;
        authInterceptorServiceFactory.responseError = _responseError;

        return authInterceptorServiceFactory;
    }]);

/***/ }),
/* 20 */
/***/ (function(module, exports) {

(function () {
    angular.module('fagronTest').factory('clienteService', ['$http', 'ngAuthSettings', '$q',
        function ($http, ngAuthSettings, $q) {

            var serviceBase = ngAuthSettings.apiServiceBaseUri + "Cliente/";
            var deferred = $q.defer();

            return {
                listar: listar,
                inserir: inserir,
                alterar: alterar,
                obter: obter,
                excluir: excluir
            };

            function listar(paginaAtual, totalPagina) {
                return $http({
                    method: 'GET',
                    url: serviceBase + "Listar"
                });
            }

            function inserir(objeto) {
                return $http.post(serviceBase, objeto);
            }

            function alterar(id, objeto) {
                return $http.put(serviceBase + id, objeto);
            }

            function obter(id) {
                return $http.get(serviceBase + id);
            }

            function excluir(id) {
                return $http.delete(serviceBase + id);
            }
        }
    ]);
})();


/***/ }),
/* 21 */
/***/ (function(module, exports) {

(function () {
    angular.module('fagronTest').factory('profissaoService', ['$http', 'ngAuthSettings', '$q',
        function ($http, ngAuthSettings, $q) {

            var serviceBase = ngAuthSettings.apiServiceBaseUri + "Profissao/";
            var deferred = $q.defer();

            return {
                listar: listar,
                inserir: inserir,
                alterar: alterar,
                obter: obter,
                excluir: excluir
            };

            function listar(paginaAtual, totalPagina) {
                return $http({
                    method: 'GET',
                    url: serviceBase + "Listar"
                });
            }

            function inserir(objeto) {
                return $http.post(serviceBase, objeto);
            }

            function alterar(id, objeto) {
                return $http.put(serviceBase + id, objeto);
            }

            function obter(id) {
                return $http.get(serviceBase + id);
            }

            function excluir(id) {
                return $http.delete(serviceBase + id);
            }
        }
    ]);
})();


/***/ }),
/* 22 */
/***/ (function(module, exports) {

﻿(function () {
    angular.module('fagronTest').factory('gridConfig', [
        function () {

            return {

                verificarUltimaLinha: verificarUltimaLinha
            };

            function verificarUltimaLinha() {
                var objeto = $("button[aria-expanded='true']").next();

                if (objeto.length > 0) {
                    $(objeto[0]).removeAttr('style');
                    var position = objeto[0].getBoundingClientRect().bottom;

                    if (position > 0) {
                        var dropdownMenu = $(objeto[0]);
                        var menuHeight = dropdownMenu.outerHeight(true);

                        var grid = $("button[aria-expanded='true']").parent().parent().parent().parent().parent().parent().parent();
                        var gridHeight = grid.height();
                        var posicaoLinhaBaixoGrid = grid[0].getBoundingClientRect().bottom
                        var posicaoLinhaCimaGrid = grid[0].getBoundingClientRect().top

                        if ((posicaoLinhaCimaGrid > position) || (posicaoLinhaBaixoGrid < position)) {
                            $(objeto[0]).css('border-bottom', '0');
                            $(objeto[0]).css('top', 'auto');
                            $(objeto[0]).css('bottom', '10px');

                            var positionTop = objeto[0].getBoundingClientRect().top;

                            if ((posicaoLinhaCimaGrid > positionTop)) {
                                $(objeto[0]).removeAttr('style');
                            }
                        }
                        else {
                            $(objeto[0]).removeAttr('style');
                        }
                    }
                }
            }
        }
    ]);
})();

/***/ }),
/* 23 */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 23;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./views/modals/confirm/modalConfirm.js": 25,
	"./views/modals/pergunta/modal.js": 26
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 24;

/***/ }),
/* 25 */
/***/ (function(module, exports) {

﻿(function () {
    angular.module('fagronTest').controller('comum.views.modals.confirm.modalConfirm', ['$scope', '$uibModalInstance', 'mensagemInfo',
    function ($scope, instanciaModal, mensagemInfo) {
        var vm = this;

        vm.mensagem = mensagemInfo;
        vm.fechar = function () {
            instanciaModal.close();
        };

    }]);
})();


/***/ }),
/* 26 */
/***/ (function(module, exports) {

﻿(function () {
    angular.module('fagronTest').controller('comum.views.modals.pergunta.modal', ['$scope', '$uibModalInstance', 'mensagemInfo',
    function ($scope, instanciaModal, mensagemInfo) {
        var vm = this;

       instanciaModal.result.decisao = false;
        vm.mensagem = mensagemInfo;
        vm.fechar = function () {
            instanciaModal.close();
        };
        vm.sim = function () {
           instanciaModal.result.decisao = true;
            vm.fechar();
        }

    }]);
})();


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./clientes/criar.js": 28,
	"./clientes/index.js": 29
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 27;

/***/ }),
/* 28 */
/***/ (function(module, exports) {

//@ts-check
(function () {
    angular.module('fagronTest').controller('cadastros.clientes.criar', ['$scope', 'clienteService', '$stateParams', '$state', 'vcalert', '$rootScope', 'profissaoService',
        function ($scope, clienteService, $stateParams, $state, vcalert, $rootScope, profissaoService) {
            var vm = this;

            //configuração do DatePicker
            vm.configuracao = {
                "autoclose": true,
                format: "dd/mm/yyyy",
                language: "pt-BR",
                orientation: "left"
            };

            vm.init = init;
            vm.Salvar = salvar;
            vm.carregaCliente = carregaCliente;
            vm.loadComboProfissoes = loadComboProfissoes;

            vm.dataNascimento = new Date();

            vm.init();
            function init() {
                vm.cliente = {};
                vm.cliente.Status = true;

                vm.idCliente = $stateParams.id
                vm.isEditing = vm.idCliente > 0;
                vm.saving = false;

                vm.TituloPagina = vm.isEditing ? "Alterar Cliente" : "Adicionar Cliente";

                vm.listProfissoes = [];

                vm.loadComboProfissoes();
                vm.carregaCliente();
            }

            function salvar() {
                vm.saving = true;
                if (vm.isEditing)
                    alterar();
                else
                    inserir();
            }

            function inserir() {
                $rootScope.cgBusyPromises.push({
                    $promise: clienteService.inserir(vm.cliente)
                        .success(function () {
                            vcalert.alert("Registro cadastrado com sucesso.");
                            $state.go('cadastros.clientes.index');
                        })
                        .error(function (result) {
                            vcalert.alert("Um erro ocorreu: " + result.error);
                        }).finally(function () {
                            vm.saving = false;
                        })
                });
            }

            function alterar() {
                $rootScope.cgBusyPromises.push({
                    $promise: clienteService.alterar(vm.idCliente, vm.cliente)
                        .success(function () {
                            vcalert.alert("Registro alterado com sucesso.");
                            $state.go('cadastros.clientes.index');
                        })
                        .error(function (result) {
                            vcalert.alert("Um erro ocorreu: " + result.error);
                        }).finally(function () {
                            vm.saving = false;
                        })
                });
            }

            function carregaCliente() {
                if (!vm.isEditing)
                    return;

                $scope.$parent.vm.loading = clienteService.obter(vm.idCliente)
                    .success(function (result) {
                        vm.cliente.Nome = result.Nome;
                        vm.cliente.Sobrenome = result.Sobrenome;
                        vm.cliente.DataNascimento = result.DataNascimento;
                        vm.cliente.DataNascimentoStr = result.DataNascimentoStr;
                        vm.cliente.ProfissaoId = result.ProfissaoId;
                        vm.cliente.Status = result.Status;
                    })
                    .error(function (result) {
                        vcalert.alert("Um erro ocorreu: " + result.error);
                    }).finally(function () {
                        vm.saving = false;
                    });;
            }

            function loadComboProfissoes() {
                $scope.$parent.vm.loading = profissaoService.listar()
                    .success(function (result) {
                        vm.listProfissoes = result;
                    });
            }
        }
    ]);
})();

/***/ }),
/* 29 */
/***/ (function(module, exports) {

(function () {
    angular.module('fagronTest').controller('cadastros.clientes.index', ['$scope', '$state', 'clienteService', 'uiGridConstants', 'vcalert', '$rootScope',
        function ($scope, $state, clienteService, uiGridConstants, vcalert, $rootScope) {
            var vm = this;

            vm.init = init;
            vm.listar = listar;
            vm.carregaGrid = carregaGrid;
            vm.excluir = excluir;

            vm.init();

            function init() {
                vm.carregaGrid();
                vm.listar();
            }

            function carregaGrid() {
                vm.userGridOptions = {
                    enableRowSelection: false,
                    enableRowHeaderSelection: false,
                    multiSelect: false,
                    modifierKeysToMultiSelect: false,
                    enablePaginationControls: false,
                    noUnselect: true,
                    showGridFooter: false,
                    appScopeProvider: vm,
                    columnDefs: [
                        {
                            displayName: "Nome",
                            field: 'Nome',
                            enableColumnMenu: false,
                            width: 200,
                            minWidth: 200,
                        },
                        {
                            displayName: "Sobrenome",
                            field: 'Sobrenome',
                            enableColumnMenu: false,
                            width: 300,
                            minWidth: 300,
                        },
                        {
                            displayName: "Data Nascimento",
                            field: 'DataNascimento',
                            enableColumnMenu: false,
                            cellTemplate:
                                '<div style="margin-top: 5px; margin-left: 10px;">' +
                                '<span>{{row.entity.DataNascimento | date:"dd/MM/yyyy"}}</span>' +
                                '</div>',
                            width: 150,
                            minWidth: 150,
                        },
                        {
                            displayName: "Idade",
                            field: 'Idade',
                            enableColumnMenu: false,
                            width: 60,
                            minWidth: 60,
                        },
                        {
                            displayName: "Profissão",
                            field: 'Profissao',
                            enableColumnMenu: false
                        },
                        {
                            displayName: "Status",
                            field: 'Status',
                            enableColumnMenu: false,
                            width: 100,
                            minWidth: 100,
                            cellTemplate:
                                '<div style="margin-top: 5px; margin-left: 10px;">' +
                                '  <span ng-show="row.entity.Status" class="label label-sm label-success">' + "Ativo" + '</span>' +
                                '  <span ng-show="!row.entity.Status" class="label label-sm label-danger">' + "Inativo" + '</span>' +
                                '</div>'
                        },
                        {
                            name: "Ações",
                            enableColumnMenu: false,
                            width: 80,
                            minWidth: 50,
                            cellTemplate:
                                "<div class='btn-group'>" +
                                "<span class='dropdown-toggle' id='dropdownMenu1' data-toggle='dropdown' aria-haspopup='true' aria-expanded='true'><a href='#'><i class='fa fa-ellipsis-v' aria-hidden='true'></i></a></span>" +
                                "<ul class='dropdown-menu' aria-labelledby='dropdownMenu1'>" +
                                "<li><a href='#' ui-sref='cadastros.clientes.alterar({id: row.entity.Id})'>Editar</a></li>" +
                                "<li role='separator' class ='divider' ></li>" +
                                "<li><a href='#' data-toggle='modal' data-target='.bs-example-modal-sm' ng-click='grid.appScope.excluir(row.entity.Id)' >Excluir</a></li>" +
                                "</ul>" +
                                "</div>"
                        }

                    ],
                    onRegisterApi: function (gridApi) {
                        vm.gridApi = gridApi;

                        vm.gridApi.core.on.sortChanged($scope, function (grid, sortColumns) {
                        });
                        vm.gridApi.pagination.on.paginationChanged($scope, function (pageNumber, pageSize) {
                            listar(vm.filtro, pageNumber, pageSize);
                        });

                    }
                };
            }

            function listar() {
                $rootScope.cgBusyPromises.push({
                    $promise: clienteService.listar()
                        .success(function (result) {
                            vm.userGridOptions.totalItems = result.length;
                            vm.userGridOptions.data = result;
                        })
                        .finally(function () {
                            vm.exibirPaginacao = true;
                        })
                });
            }

            function excluir(id) {
                vcalert.confirm(
                    "Confirma a exclusão do registro?",
                    function () {
                        $rootScope.cgBusyPromises.push({
                            $promise: clienteService.excluir(id).success(function () {
                                vcalert.alert("Registro excluído com sucesso.");
                                vm.listar();
                            }).error(function (result) {
                                vcalert.alert("Um erro ocorreu: " + result.message);
                            })
                        });
                    });
            }
        }]);
})();


/***/ })
],[0]);
//# sourceMappingURL=app.bundle.js.map