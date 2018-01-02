/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(1);

var _data = __webpack_require__(6);

var _data2 = _interopRequireDefault(_data);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var portfolio = document.querySelector('#inner-portfolio');
var wordsSpan = document.querySelector('#word');
var mainNavigation = document.querySelector('.websmith-navbar');
var processWrappers = convertNodeList(document.querySelectorAll('.process-wrapper'));
var mobileNav = document.querySelector('.mobile-navigation');
var processListItems = convertNodeList(document.querySelectorAll('.process-list-item'));
var sideNavLinks = convertNodeList(document.querySelectorAll('.sidenav a'));
var closeButton = document.querySelector('.closebtn');
var words = ['elegance', 'simplicity', 'art', 'users first', 'creating your channel', 'getting your competitive advantage'];

/* Set the width of the side navigation to 250px */
function openNav() {
	document.getElementById('mySidenav').style.width = '100%';
}

/* Set the width of the side navigation to 0 */
function closeNav() {
	document.getElementById('mySidenav').style.width = '0';
}

function convertNodeList(node) {
	return Array.prototype.slice.call(node);
}

function cycleWords(words) {
	var counter = 0;
	wordsSpan.textContent = words[0];
	var intervalId = setInterval(changeWord, 2000);
	function changeWord() {
		counter++;
		wordsSpan.textContent = words[counter];
		if (counter >= words.length) {
			wordsSpan.textContent = words[words.length - 1];
			clearInterval(intervalId);
		}
	}
}

function renderPortfolioItems() {
	return new Promise(function (resolve) {
		var portfolioItems = _data2.default.map(function (item, index) {
			var featured = index === 2 ? 'featured' : '';
			return '\n\t\t\t<div class="col-md-6 col-sm-6 ' + featured + '">\n\t\t\t\t<a href="' + item.url + '" target="_blank">\n\t\t\t\t\t<div class="portfolio-item">\n\t\t\t\t\t\t<img src="' + item.img + '" class="portfolio-image slide-in">\n\t\t\t\t\t\t<div class="portfolio-image-overlay">\n\t\t\t\t\t\t\t<div class="portfolio-image-overlay-content">\n\t\t\t\t\t\t\t\t<h3>' + item.name + '</h3>\n\t\t\t\t\t\t\t\t<button class="portfolio-button">Explore</button>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\t\t\t\t</a>\n\t\t\t</div>';
		}).join('');

		portfolio.innerHTML = portfolioItems;
		resolve();
	});
}

function checkSlide(e) {
	if (window.pageYOffset >= 1500) return;
	var sliderImages = convertNodeList(document.querySelectorAll('.slide-in'));
	sliderImages.forEach(function (sliderImage) {
		var slideInAt = window.scrollY + window.innerHeight - sliderImage.height / 2;
		var isHalfShown = slideInAt > sliderImage.offsetTop;
		requestAnimationFrame(function () {
			// Halfway through image
			if (isHalfShown) {
				sliderImage.classList.add('slide-in-active');
				setTimeout(function () {
					sliderImage.parentNode.classList.add('portfolio-item-active');
				}, 800);
			}
		});
	});
}

// Event Handlers
function handleScroll() {
	if (window.pageYOffset >= 80) {
		mainNavigation.classList.add('scrolling');
	} else {
		mainNavigation.classList.remove('scrolling');
	}
}

function handleProcessClick(e) {
	var hexItem = this.querySelector('div[data-target="hexagon"]');
	var wrapper = hexItem.parentNode;
	var infoBox = hexItem.nextElementSibling;
	var infoParagraph = infoBox.children[0];

	if (hexItem.dataset.target === 'hexagon') {
		if (!wrapper.classList.contains('clicked')) {
			wrapper.classList.add('clicked');
			hexItem.classList.add('clicked');
			setTimeout(function () {
				infoBox.classList.add('problem-information-active');
				wrapper.classList.add('process-wrapper-active');
				hexItem.classList.remove('process-item-shadow');
				wrapper.style.backgroundColor = '#cc243b';
			}, 300);
			setTimeout(function () {
				infoParagraph.classList.add('show');
			}, 600);
			setTimeout(function () {
				return infoParagraph.classList.add('active');
			}, 600);
		} else {
			setTimeout(function () {
				infoBox.classList.remove('problem-information-active');
				wrapper.classList.remove('process-wrapper-active');
				wrapper.style.backgroundColor = '#fff';
				infoParagraph.classList.remove('show');
				infoParagraph.classList.remove('active');
			}, 300);

			setTimeout(function () {
				wrapper.classList.remove('clicked');
				hexItem.classList.remove('clicked');
				hexItem.classList.add('process-item-shadow');
			}, 400);
		}
	}
}

// Setup application
function init() {
	renderPortfolioItems().then(function () {
		return window.addEventListener('scroll', checkSlide);
	});

	cycleWords(words);
}

// Event Listener
window.addEventListener('scroll', handleScroll);
mobileNav.addEventListener('click', openNav);
closeButton.addEventListener('click', closeNav);
sideNavLinks.forEach(function (link) {
	return link.addEventListener('click', closeNav);
});
processListItems.forEach(function (listItem) {
	return listItem.addEventListener('click', handleProcessClick);
});

// Initialize
init();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(2);
if(typeof content === 'string') content = [[module.i, content, '']];
// Prepare cssTransformation
var transform;

var options = {}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(4)(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!../node_modules/css-loader/index.js!./app.css", function() {
			var newContent = require("!!../node_modules/css-loader/index.js!./app.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, "/** BASIC STYLES **/\n\nh1,\nh2,\nh3,\nh4,\nh5,\nh6 {\n\tfont-family: Satisfy, 'Open sans';\n}\n\np {\n\tfont-family: Roboto, sans-serif;\n\tcolor: #4e4e4e;\n\tfont-size: 1.2em;\n}\n\nbody {\n\tpadding-top: 80px;\n\tfont-family: Roboto, sans-serif;\n}\n\nhtml {\n\tmargin: 0;\n\tpadding: 0;\n}\n\na,\na:focus,\na:visited,\na:hover,\na:active {\n\ttext-decoration: none;\n\tcolor: inherit;\n}\n\n.text-header {\n\ttext-align: center;\n\tpadding: 60px;\n\tfont-size: 3.5em;\n\tcolor: #444343;\n\tfont-weight: bold;\n}\n\n.main-content {\n\theight: 500px;\n\tbackground: #004e92;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n}\n\n.main-content h1 {\n\tfont-family: Satisfy, Roboto;\n\tfont-size: 4em;\n\tcolor: #fff;\n\tmax-width: 50%;\n\ttext-align: center;\n\tpadding: 15px;\n\ttransition: all 0.5s ease;\n}\n\n#word {\n\tcolor: #f56815;\n}\n\n/** NAVBAR **/\n\n/** SIDENAV **/\n.sidenav {\n\theight: 100%; /* 100% Full-height */\n\twidth: 0; /* 0 width - change this with JavaScript */\n\tposition: fixed; /* Stay in place */\n\tz-index: 1000; /* Stay on top */\n\ttop: 0;\n\tleft: 0;\n\tbackground-color: #fff; /* Black*/\n\toverflow-x: hidden; /* Disable horizontal scroll */\n\tpadding-top: 60px; /* Place content 60px from the top */\n\ttransition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */\n\tdisplay: flex;\n\tflex-direction: column;\n\talign-items: center;\n}\n\n/* The navigation menu links */\n.sidenav a {\n\tpadding: 8px 8px 8px 8px;\n\ttext-decoration: none;\n\tfont-size: 20px;\n\tcolor: #444444;\n\tdisplay: block;\n\ttransition: 0.3s;\n}\n\n/* When you mouse over the navigation links, change their color */\n.sidenav a:hover,\n.offcanvas a:focus {\n\tcolor: #696969;\n}\n\n/* Position and style the close button (top right corner) */\n.sidenav .closebtn {\n\tposition: absolute;\n\ttop: 0;\n\tright: 25px;\n\tfont-size: 36px;\n\tmargin-left: 50px;\n}\n\n.websmith-navbar {\n\tdisplay: flex;\n\tjustify-content: center;\n\tposition: fixed;\n\ttop: 0;\n\tz-index: 1000;\n\tbackground-color: #fff;\n\twidth: 100%;\n}\n\n.navbar-content {\n\tdisplay: flex;\n\talign-items: center;\n\twidth: 90%;\n\tposition: relative;\n}\n\n.navigation {\n\tlist-style-type: none;\n\tdisplay: flex;\n\tjustify-content: flex-end;\n\twidth: 100%;\n\tmargin-bottom: 0;\n\tmargin-left: auto;\n}\n\n.navigation li {\n\tpadding: 10px 20px;\n\tposition: relative;\n\tdisplay: flex;\n\tjustify-content: center;\n\tborder: 1px solid #004e92;\n\tmargin: 5px;\n\ttransition: all 0.5s;\n\tcolor: #004e92;\n\tfont-family: Roboto;\n\tfont-size: 1.1em;\n\tborder-radius: 3px;\n}\n\n.navigation li.mobile-navigation {\n\tdisplay: none;\n\tcursor: pointer;\n}\n\n.navigation li:hover {\n\tbackground-color: #004e92;\n\tcolor: #fff;\n}\n\n.logo {\n\tfont-family: 'Satisfy';\n\tcolor: #004e92;\n\tfont-weight: bold;\n}\n\n.scrolling {\n\tbox-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n}\n\n/**  PORTFOLIO STYLES **/\n\n#portfolio {\n\tpadding-bottom: 100px;\n}\n\n.portfolio-item {\n\tposition: relative;\n\tdisplay: block;\n\tmargin: 10px;\n\ttransition: all 1s ease-in-out;\n}\n\n.portfolio-item-active {\n\tbox-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n}\n\n.slide-in {\n\topacity: 0;\n\ttransform: translateX(-100%) scale(0.95);\n\ttransition: all 1s ease-in-out;\n}\n\n.slide-in-active {\n\topacity: 1;\n\ttransform: translateX(0) scale(1);\n}\n\n.portfolio-image {\n\twidth: 100%;\n\tdisplay: block;\n\theight: 240px;\n}\n\n.portfolio-image-overlay {\n\tposition: absolute;\n\ttop: 0;\n\tbottom: 0;\n\tleft: 0;\n\tright: 0;\n\theight: 100%;\n\twidth: 100%;\n\topacity: 0;\n\ttransition: 0.5s ease;\n\tbackground: #141e30; /* fallback for old browsers */\n\tbackground: -webkit-linear-gradient(to right, #243b55, #141e30); /* Chrome 10-25, Safari 5.1-6 */\n\tbackground: linear-gradient(\n\t\tto right,\n\t\t#243b55,\n\t\t#141e30\n\t); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */\n}\n\n.portfolio-image-overlay-content {\n\tcolor: white;\n\tfont-size: 20px;\n\twidth: 100%;\n\tposition: absolute;\n\ttext-align: center;\n\ttop: 45%;\n\tleft: 50%;\n\ttransform: translate(-50%, -50%);\n\t-ms-transform: translate(-50%, -50%);\n}\n\n.portfolio-image-overlay-content h3 {\n\tpadding: 20px;\n}\n\n.portfolio-item:hover .portfolio-image-overlay {\n\topacity: 0.9;\n\tcursor: pointer;\n}\n\n.portfolio-button {\n\tborder: none;\n\tcolor: #fff;\n\tbackground-color: #141e30;\n\tborder: 2px solid #fff;\n\tpadding: 10px 20px;\n\tborder-radius: 3px;\n\tcursor: pointer;\n}\n\n.portfolio-button:hover {\n\tcursor: pointer;\n}\n\n.featured {\n\twidth: 100%;\n}\n\n.featured .portfolio-image {\n\twidth: 100%;\n\theight: auto;\n}\n\n.portfolio-button:focus {\n\toutline: none;\n}\n\n.special-offer {\n\tmargin: 80px auto 0 auto;\n\twidth: 60%;\n\tmax-width: 500px;\n\tborder: 3px solid #004e92;\n\tborder-radius: 3px;\n\tpadding: 30px;\n\ttext-align: center;\n}\n\n.special-offer h3 {\n\tpadding: 10px 0 20px 0;\n\tfont-size: 2.8em;\n\tcolor: #444343;\n}\n\n.special-offer p {\n\tline-height: 1.6;\n}\n\n.special-offer .fa-handshake-o {\n\tfont-size: 4em;\n\tcolor: #004e92;\n}\n\n.special-offer-button {\n\tborder: none;\n\tbackground-color: #f56815;\n\tpadding: 15px 40px;\n\twidth: 250px;\n\ttext-align: center;\n\tmargin: 25px auto 25px auto;\n}\n\n.bttn {\n\tborder-radius: 3px;\n\tfont-family: Satisfy;\n\tcolor: #fff;\n\tfont-size: 1.5em;\n\tbox-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);\n\ttransition: all 0.3s ease;\n}\n\n.bttn:hover {\n\tbox-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n}\n\n/**  SOCIAL MEDIA **/\n\n#social-media {\n\tpadding: 100px 0;\n\ttext-align: center;\n\tbackground-color: #004e92;\n}\n#social-media .fa {\n\tcolor: #fff;\n\tfont-size: 5em;\n\tpadding: 30px 20px;\n}\n#social-media .fa:hover {\n\tcolor: #002e56;\n\ttransition: ease 0.5s;\n}\n\n/** CONTACT ME */\n#contact-me {\n\tpadding-bottom: 60px;\n}\n\n#contact-me label {\n\tpadding: 5px;\n}\n\n.contact-text-input {\n\twidth: 100%;\n\tpadding: 8px;\n\tborder: none;\n\tborder-radius: 7px;\n\tbackground: #ededed;\n\ttransition: all 0.5s ease;\n\tborder-bottom: 2px solid #ededed;\n}\n.contact-text-input:focus {\n\tborder-bottom: 2px solid #f56815;\n\ttransition: ease 0.5s;\n\toutline: none;\n}\n\n.contact-textarea {\n\twidth: 100%;\n\tpadding: 8px;\n\tborder: none;\n\ttransition: all 0.5s ease;\n\tborder-radius: 7px;\n\tbackground: #ededed;\n\tborder-bottom: 2px solid #ededed;\n}\n\n.contact-textarea:focus {\n\tborder-bottom: 2px solid #f56815;\n\ttransition: ease 0.5s;\n\toutline: none;\n}\n\n.contact-button {\n\tfont-family: Satisfy;\n\tdisplay: block;\n\tmargin: 0 auto;\n\tcolor: #fff;\n\tborder-radius: 3px;\n\tbackground-color: #f56815;\n\tborder: none;\n\tpadding: 15px;\n\twidth: 100%;\n\tfont-size: 1.4em;\n\tcursor: pointer;\n}\n.contact-button .fa {\n\tmargin-right: 5px;\n}\n\n.contact-details {\n\tdisplay: flex;\n\tjustify-content: center;\n}\n.contact-details ul {\n\tlist-style-type: none;\n\tfont-size: 1.2em;\n}\n.contact-details ul li {\n\tpadding: 10px 0;\n}\n.contact-details ul li .fa-mobile {\n\tfont-size: 1.5em;\n\tmargin-right: 5px;\n}\n.contact-details ul li .fa-envelope {\n\tmargin-right: 3px;\n}\n.contact-details ul li .fa {\n\tcolor: #cc243b;\n}\n\n/**  PROCESS **/\n\n.process {\n\ttext-align: center;\n\tpadding-bottom: 60px;\n}\n\n.process-undertext {\n\tpadding-bottom: 40px;\n\tfont-size: 2em;\n}\n\n.process-list {\n\tlist-style-type: none;\n\tpadding-left: 0;\n\tdisplay: flex;\n\tflex-direction: column;\n\talign-items: center;\n}\n\n.process-list li {\n\twidth: 80%;\n\tmargin: 20px;\n\tposition: relative;\n}\n\n.process-item {\n\tbackground-color: #cc243b;\n\tborder-radius: 100%;\n\theight: 200px;\n\twidth: 200px;\n\tcolor: #fff;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\tflex-direction: column;\n\tcursor: pointer;\n\tmargin-bottom: 50px;\n}\n\n.process-link {\n\tposition: absolute;\n\tbackground-color: #cc243b;\n\theight: 250px;\n\twidth: 4px;\n\ttransform: translateY(-50px);\n}\n\n.process-item-shadow {\n\tbox-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n}\n\n.process-heading {\n\tmargin: 20px;\n}\n\n.process-wrapper .fa {\n\tmargin-top: 40px;\n\tfont-size: 3em;\n\tz-index: 999;\n}\n\n.process-wrapper .fa-times {\n\tposition: absolute;\n}\n\n.problem h3 {\n\tz-index: 999;\n\tmargin-top: 10px;\n}\n\n.process-wrapper {\n\tdisplay: flex;\n\tflex-direction: row;\n\tjustify-content: center;\n\ttransition: all 0.5s ease;\n\tmax-width: 750px;\n\tmargin: 0 auto;\n}\n\n.process-wrapper-active {\n\tbox-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n\twidth: 100%;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n}\n\n.process-content {\n\tcolor: #fff;\n\tpadding: 25px;\n\ttransition: all 0.5s;\n\topacity: 0;\n\theight: 0;\n\tdisplay: none;\n}\n\n.process-content.show {\n\tdisplay: block;\n}\n\n.process-content.active {\n\topacity: 1;\n\theight: 100%;\n}\n\n.problem-information {\n\tdisplay: flex;\n\tmargin-top: 20px;\n\topacity: 0;\n\theight: 0;\n\twidth: 0%;\n\ttransition: all 1s ease;\n}\n\n.problem-information-active {\n\tdisplay: block;\n\topacity: 1;\n\twidth: 100%;\n\theight: 100%;\n}\n\n/* LEARNING PROJECTS */\n\n#learning-projects {\n\tbackground-color: #004e92;\n\tpadding-bottom: 60px;\n}\n\n.learning-header {\n\tcolor: #fff;\n}\n\n.learning-box {\n\tbackground-color: #fff;\n\tpadding: 20px;\n\twidth: 100%;\n\tmargin: 0 auto 60px auto;\n\tborder-radius: 3px;\n\tbox-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);\n}\n\n.learning-box p {\n\tline-height: 1.7;\n\ttext-align: center;\n\tmargin: 25px;\n}\n\n.learning-box h2 {\n\ttext-align: center;\n\tpadding: 10px;\n}\n\n.learning-box .fa-book {\n\tfont-size: 4em;\n\tcolor: #004e92;\n\ttext-align: center;\n\tdisplay: block;\n\tpadding: 20px;\n}\n\n.learning-project-details {\n\tcolor: #fff;\n\tdisplay: flex;\n\tflex-direction: column;\n\talign-items: center;\n}\n\n.learning-tech-wrapper {\n\tborder: 2px solid #fff;\n\tmargin-top: 20px;\n\tpadding: 20px;\n}\n\n.learning-tech-wrapper ul {\n\tpadding-left: 0;\n}\n\n.learning-project-details-header {\n\tmargin-bottom: 20px;\n}\n\n.learning-tech-header {\n\tmargin: 30px 0;\n\ttext-align: center;\n}\n\n.learning-list,\n.learning-list-tech {\n\tlist-style-type: none;\n}\n\n.learning-list-tech {\n\tdisplay: flex;\n\tjustify-content: space-around;\n}\n\n.learning-list li,\n.learning-list-tech li {\n\tdisplay: flex;\n\talign-items: center;\n\tfont-family: Roboto, sans-serif;\n\tpadding: 5px;\n\tfont-size: 1.1em;\n}\n\n.learning-list li .fa {\n\tmargin-right: 8px;\n\tfont-size: 1.8em;\n}\n\n.tech-logo {\n\twidth: 80px;\n\theight: 80px;\n\tbackground-color: #fff;\n\tborder-radius: 100%;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n\tbox-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n\ttransition: all 0.3s ease;\n}\n\n.tech-logo:hover {\n\tbox-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);\n}\n\n.tech-logo img {\n\twidth: 60px;\n\theight: 60px;\n}\n\n.learning-project-button {\n\tdisplay: block;\n\tmargin: 40px auto;\n\tbackground-color: #f56815;\n\tborder: none;\n\tpadding: 20px 40px;\n\ttext-align: center;\n\twidth: 200px;\n}\n\n/**  ABOUT ME **/\n\n#about-me {\n\tpadding-bottom: 100px;\n}\n\n#about-me img {\n\tborder-radius: 3px;\n\tbox-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);\n}\n\n#about-me p {\n\tline-height: 1.5;\n\tpadding: 5px;\n}\n\n#about-me a {\n\tcolor: #f56815;\n}\n\n.about-image-primary {\n\tposition: relative;\n\twidth: 100%;\n}\n\n.about-image-secondary {\n\tposition: absolute;\n\theight: 200px;\n\twidth: 150px;\n\ttop: -20px;\n\tleft: -10px;\n}\n\n.about-me-bttn {\n\tmargin-top: 50px;\n}\n\n/** MANIFESTO **/\n\n#manifesto {\n\tbackground-color: #004e92;\n\tcolor: #fff;\n\ttext-align: center;\n\tpadding-bottom: 100px;\n}\n\n#manifesto p {\n\tpadding: 20px;\n\tcolor: #fff;\n\tmax-width: 400px;\n\tmargin: 0 auto;\n\tline-height: 1.6;\n}\n\n#manifesto .fa {\n\tfont-size: 3.5em;\n}\n\n.manifesto-header {\n\tcolor: #fff;\n}\n\n.manifesto-wrapper {\n\tmargin-top: 40px;\n}\n\n.manifesto-design,\n.manifesto-coding,\n.manifesto-product {\n\tborder: 1px solid #fff;\n\tborder-radius: 3px;\n\tpadding: 20px;\n\tmargin: 40px 0;\n}\n\n.manifesto-product {\n\tmargin: 0;\n}\n\n/** INSPIRATION **/\n\n#inspiration {\n\tpadding-bottom: 60px;\n}\n\n.inspiration-card {\n\tdisplay: flex;\n\tflex-direction: column;\n\tjustify-content: center;\n\talign-items: center;\n\ttext-align: center;\n\tbackground-color: #cc243b;\n\tcolor: #fff;\n\tborder-radius: 3px;\n\tpadding: 20px;\n\tmargin: 20px 0;\n\theight: 300px;\n\tbox-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n}\n\n.inspiration-card h3 {\n\tline-height: 1.5;\n}\n\n.inspiration-card p {\n\tcolor: #fff;\n\tpadding-top: 10px;\n\tfont-size: 1.1em;\n}\n\n/** FOUNDER OFFER **/\n#founder-offer {\n\tbackground-color: #004e92;\n\tpadding-bottom: 60px;\n}\n\n.learning-box .fa-lightbulb-o {\n\tfont-size: 4em;\n\tcolor: #004e92;\n\ttext-align: center;\n\tdisplay: block;\n\tpadding: 20px;\n}\n\n.founder-offer-header {\n\tcolor: #fff;\n}\n\n.founder-offer-requirements {\n\tdisplay: flex;\n\tflex-direction: column;\n\talign-items: center;\n}\n\n.founder-offer-requirements h2 {\n\tcolor: #fff;\n}\n\n.number {\n\tbackground-color: #f56815;\n\tdisplay: inline;\n\tpadding: 5px 10px;\n\tborder-radius: 100%;\n\tmargin-right: 8px;\n\tcolor: #fff;\n\tbox-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);\n}\n\n.founder-offer-requirements ul {\n\tlist-style-type: none;\n\tpadding-left: 0;\n}\n\n.founder-offer-requirements ul li {\n\tmargin: 15px;\n\tcolor: #fff;\n\tfont-size: 1.1em;\n}\n\n.founder-offer-details {\n\tmargin-top: 25px;\n\tborder: 1px solid #fff;\n\twidth: 100%;\n\tdisplay: flex;\n\tflex-direction: column;\n\talign-items: center;\n\tpadding: 20px;\n}\n\n.founder-offer-details ul li {\n\tmargin: 0px;\n}\n\n/** FOOTER STYLES **/\n\n#websmith-footer {\n\tbackground-color: #004e92;\n\tpadding: 20px;\n\tmargin: 0;\n\tdisplay: flex;\n\tjustify-content: center;\n\talign-items: center;\n}\n\n.footer-contact {\n\tmargin-left: auto;\n\tlist-style-type: none;\n\tdisplay: flex;\n\tmargin-bottom: 0;\n}\n\n.footer-contact li {\n\tcolor: #fff;\n\tpadding: 10px;\n\tfont-size: 1.1em;\n}\n\n.footer-contact li .fa {\n\tmargin-right: 5px;\n\tfont-size: 1.2em;\n}\n\n.footer-contact li:last-child {\n\tpadding-bottom: 0;\n}\n\n.footer-logo {\n\tpadding: 0;\n\tmargin: 0;\n\tcolor: #fff;\n}\n\n/** MEDIA QUERIES **/\n\n@media (min-width: 1200px) {\n\t.portfolio-image {\n\t\theight: 300px;\n\t}\n}\n\n@media (max-width: 991px) {\n\t.portfolio-image {\n\t\theight: 200px;\n\t\tmargin-bottom: 40px;\n\t}\n\n\t#about-me img {\n\t\tdisplay: block;\n\t\tmargin: 0 auto;\n\t}\n\n\t.about-image-primary {\n\t\twidth: 50%;\n\t}\n\n\t#about-me {\n\t\ttext-align: center;\n\t}\n\n\t#about-me p {\n\t\twidth: 60%;\n\t\tmargin: 15px auto;\n\t}\n\t.inspiration-card {\n\t\tmargin-top: 40px;\n\t}\n\t.about-image-secondary {\n\t\tdisplay: block;\n\t\theight: 185px;\n\t\twidth: 140px;\n\t\ttop: -60px;\n\t\tleft: 5px;\n\t\tposition: inherit;\n\t}\n}\n\n@media (max-width: 768px) {\n\t.portfolio-image {\n\t\theight: auto;\n\t\tmargin-bottom: 40px;\n\t}\n\n\t.special-offer {\n\t\twidth: 95%;\n\t}\n\n\t.process-wrapper {\n\t\tflex-direction: column;\n\t\talign-items: center;\n\t}\n\t.process-content {\n\t\tpadding: 0 30px 30px 30px;\n\t\ttext-align: center;\n\t}\n\n\t.about-image-primary {\n\t\twidth: 90%;\n\t}\n\n\t#about-me {\n\t\ttext-align: center;\n\t}\n\t#websmith-footer {\n\t\tflex-direction: column;\n\t\talign-items: center;\n\t}\n\n\t#about-me p {\n\t\twidth: 100%;\n\t\tmargin: 15px auto;\n\t}\n\t.footer-contact {\n\t\tpadding: 25px;\n\t\tflex-direction: column;\n\t\talign-items: center;\n\t\tmargin-left: 0;\n\t}\n\t.footer-contact li {\n\t\tpadding: 10px;\n\t}\n\t.navigation li.mobile-navigation {\n\t\tdisplay: block;\n\t\tborder: none;\n\t\tfont-size: 2em;\n\t}\n\t.navigation li.main-nav-links {\n\t\tdisplay: none;\n\t}\n\t.main-content h1 {\n\t\tmax-width: 80%;\n\t}\n\t.process-item {\n\t\tmargin-bottom: 0;\n\t}\n}\n\n@media screen and (max-height: 450px) {\n\t.sidenav {\n\t\tpadding-top: 15px;\n\t}\n\t.sidenav a {\n\t\tfont-size: 18px;\n\t}\n}\n", ""]);

// exports


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getElement = (function (fn) {
	var memo = {};

	return function(selector) {
		if (typeof memo[selector] === "undefined") {
			memo[selector] = fn.call(this, selector);
		}

		return memo[selector]
	};
})(function (target) {
	return document.querySelector(target)
});

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__(5);

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton) options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
	if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	options.attrs.type = "text/css";

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	options.attrs.type = "text/css";
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = options.transform(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 5 */
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = [{
	name: 'Loopring',
	description: '',
	img: 'img/portfolio/loopringThumb.png',
	url: 'https://fredrikoseberg.github.io/loopringv2/'
}, {
	name: 'Wikipedia Viewer',
	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam bibendum imperdiet nunc. \
					Aenean mauris dui, pulvinar eleifend purus porta, mattis elementum orci. Ut quam lorem, auctor ut nunc nec, \
					gravida scelerisque arcu. Aliquam congue justo ipsum, non varius enim congue vel. Phasellus vel neque egestas, \
					ullamcorper neque consectetur, feugiat sapien. Quisque bibendum urna lorem, \
					quis facilisis ligula rhoncus ut. Pellentesque at accumsan elit. Maecenas mollis eros sed enim volutpat, sed iaculis ipsum tincidunt.',
	img: 'img/portfolio/thumbnail001.png',
	url: 'https://codepen.io/khare/full/yXzzxg/'
}, {
	name: 'Cryptodasher',
	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam bibendum imperdiet nunc. \
					Aenean mauris dui, pulvinar eleifend purus porta, mattis elementum orci. Ut quam lorem, auctor ut nunc nec, \
					gravida scelerisque arcu. Aliquam congue justo ipsum, non varius enim congue vel. Phasellus vel neque egestas, \
					ullamcorper neque consectetur, feugiat sapien. Quisque bibendum urna lorem, \
					quis facilisis ligula rhoncus ut. Pellentesque at accumsan elit. Maecenas mollis eros sed enim volutpat, sed iaculis ipsum tincidunt.',
	img: 'img/portfolio/crytpodashFeature.png',
	url: 'https://www.cryptodasher.com'
}, {
	name: 'Weather App',
	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam bibendum imperdiet nunc. \
					Aenean mauris dui, pulvinar eleifend purus porta, mattis elementum orci. Ut quam lorem, auctor ut nunc nec, \
					gravida scelerisque arcu. Aliquam congue justo ipsum, non varius enim congue vel. Phasellus vel neque egestas, \
					ullamcorper neque consectetur, feugiat sapien. Quisque bibendum urna lorem, \
					quis facilisis ligula rhoncus ut. Pellentesque at accumsan elit. Maecenas mollis eros sed enim volutpat, sed iaculis ipsum tincidunt.',
	img: 'img/portfolio/thumbnail004.png',
	url: 'https://codepen.io/khare/full/vmaVqV/'
}, {
	name: 'Twitch JSON API',
	description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam bibendum imperdiet nunc. \
					Aenean mauris dui, pulvinar eleifend purus porta, mattis elementum orci. Ut quam lorem, auctor ut nunc nec, \
					gravida scelerisque arcu. Aliquam congue justo ipsum, non varius enim congue vel. Phasellus vel neque egestas, \
					ullamcorper neque consectetur, feugiat sapien. Quisque bibendum urna lorem, \
					quis facilisis ligula rhoncus ut. Pellentesque at accumsan elit. Maecenas mollis eros sed enim volutpat, sed iaculis ipsum tincidunt.',
	img: 'img/portfolio/thumbnail003.png',
	url: 'https://codepen.io/khare/full/YQvXdq/'
}];

/***/ })
/******/ ]);