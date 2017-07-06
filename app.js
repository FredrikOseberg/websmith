"use strict";

import './css/app.css';
import data from './data.js';

const portfolio = document.querySelector('#inner-portfolio');
const wordsSpan = document.querySelector('#word');
const mainNavigation = document.querySelector('.websmith-navbar');
const processHexagons = document.querySelectorAll('.hexagon');
const processWrappers = document.querySelectorAll('.process-wrapper');
const words = ['elegance', 'simplicity', 'art', 'users first', 'creating your channel', 'getting your competitive advantage']

function cycleWords(words) {
	var counter = 0;
	wordsSpan.textContent = words[0];
	setInterval(changeWord, 2000);
	function changeWord() {
		counter++;
		wordsSpan.textContent = words[counter];
		if (counter >= words.length) {
			wordsSpan.textContent = words[words.length - 1];
		}
	}
}


function debounce(func, wait = 20, immediate = true) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}

function renderPortfolioItems() {
	return new Promise(resolve => {
		const portfolioItems = data.map((item, index) => {
		const featured = index === 2 ? 'featured' : ''
		return `
			<div class="col-md-6 col-sm-6 ${featured}">
				<a href="${item.url}" target="_blank">
					<div class="portfolio-item">
						<img src="${item.img}" class="portfolio-image slide-in">
						<div class="portfolio-image-overlay">
							<div class="portfolio-image-overlay-content">
								<h3>${item.name}</h3>
								<button class="portfolio-button">Explore</button>
							</div>
						</div>
					</div>
				</a>
			</div>`
		}).join("");

		portfolio.innerHTML = portfolioItems;
		resolve();
	});
}

function checkSlide(e) {
	const sliderImages = document.querySelectorAll('.slide-in');

	sliderImages.forEach(sliderImage => {
		// Halfway through image
		const slideInAt = (window.scrollY + window.innerHeight) - sliderImage.height / 2;
		// Bottom of the image
		const isHalfShown = slideInAt > sliderImage.offsetTop;

		if (isHalfShown) {
			sliderImage.classList.add('slide-in-active');
			setTimeout(() => {
				sliderImage.parentNode.classList.add('portfolio-item-active');
			}, 800)
		}
	});
}




renderPortfolioItems()
	.then(() => window.addEventListener('scroll', debounce(checkSlide)));

cycleWords(words);

// Event Handlers
function handleScroll(e) {
	if (window.pageYOffset >= 80) {
		mainNavigation.classList.add('scrolling');
	} else {
		mainNavigation.classList.remove('scrolling');
	}
}

function handleProcessClick(e) {
	const hexItem = this;
	const wrapper = this.parentNode;
	const infoBox = this.nextElementSibling;


	if (hexItem.dataset.target === 'problem') {
		if (!this.classList.contains('clicked')) {
			this.classList.add('clicked');
			setTimeout(() => {
				infoBox.classList.add('problem-information-active');
				wrapper.classList.add('process-wrapper-active');
				wrapper.style.backgroundColor = '#cc243b';
			}, 300);
			setTimeout(() => {
				infoBox.children[0].classList.add('active');
			}, 900);
		} else {
			setTimeout(() => {
				infoBox.classList.remove('problem-information-active');
				wrapper.classList.remove('process-wrapper-active');
				wrapper.style.backgroundColor = '#fff';
				infoBox.children[0].classList.remove('active');
			}, 500);

			setTimeout(() => {
				this.classList.remove('clicked');
			}, 2500);

			
		}

	}
}

// Event Listener
window.addEventListener('scroll', handleScroll);
processHexagons.forEach(hexagon => hexagon.addEventListener('click', handleProcessClick));
processWrappers.forEach(wrapper => wrapper.addEventListener('click', handleProcessClick));

