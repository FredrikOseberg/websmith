'use strict';

import './css/app.css';
import data from './data.js';

const portfolio = document.querySelector('#inner-portfolio');
const wordsSpan = document.querySelector('#word');
const mainNavigation = document.querySelector('.websmith-navbar');
const processWrappers = convertNodeList(document.querySelectorAll('.process-wrapper'));
const mobileNav = document.querySelector('.mobile-navigation');
const processListItems = convertNodeList(document.querySelectorAll('.process-list-item'));
const sideNavLinks = convertNodeList(document.querySelectorAll('.sidenav a'));
const closeButton = document.querySelector('.closebtn');
const words = [
	'elegance',
	'simplicity',
	'art',
	'users first',
	'creating your channel',
	'getting your competitive advantage'
];

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
	let counter = 0;
	wordsSpan.textContent = words[0];
	const intervalId = setInterval(changeWord, 2000);
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
	return new Promise(resolve => {
		const portfolioItems = data
			.map((item, index) => {
				const featured = index === 2 ? 'featured' : '';
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
			</div>`;
			})
			.join('');

		portfolio.innerHTML = portfolioItems;
		resolve();
	});
}

function checkSlide(e) {
	if (window.pageYOffset >= 1500) return;
	const sliderImages = convertNodeList(document.querySelectorAll('.slide-in'));
	sliderImages.forEach(sliderImage => {
		const slideInAt = window.scrollY + window.innerHeight - sliderImage.height / 2;
		const isHalfShown = slideInAt > sliderImage.offsetTop;
		requestAnimationFrame(() => {
			// Halfway through image
			if (isHalfShown) {
				sliderImage.classList.add('slide-in-active');
				setTimeout(() => {
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
	const hexItem = this.querySelector('div[data-target="hexagon"]');
	const wrapper = hexItem.parentNode;
	const infoBox = hexItem.nextElementSibling;
	const infoParagraph = infoBox.children[0];

	if (hexItem.dataset.target === 'hexagon') {
		if (!wrapper.classList.contains('clicked')) {
			wrapper.classList.add('clicked');
			hexItem.classList.add('clicked');
			setTimeout(() => {
				infoBox.classList.add('problem-information-active');
				wrapper.classList.add('process-wrapper-active');
				hexItem.classList.remove('process-item-shadow');
				wrapper.style.backgroundColor = '#cc243b';
			}, 300);
			setTimeout(() => {
				infoParagraph.classList.add('show');
			}, 600);
			setTimeout(() => infoParagraph.classList.add('active'), 600);
		} else {
			setTimeout(() => {
				infoBox.classList.remove('problem-information-active');
				wrapper.classList.remove('process-wrapper-active');
				wrapper.style.backgroundColor = '#fff';
				infoParagraph.classList.remove('show');
				infoParagraph.classList.remove('active');
			}, 300);

			setTimeout(() => {
				wrapper.classList.remove('clicked');
				hexItem.classList.remove('clicked');
				hexItem.classList.add('process-item-shadow');
			}, 400);
		}
	}
}

// Setup application
function init() {
	renderPortfolioItems().then(() => window.addEventListener('scroll', checkSlide));

	cycleWords(words);
}

// Event Listener
window.addEventListener('scroll', handleScroll);
mobileNav.addEventListener('click', openNav);
closeButton.addEventListener('click', closeNav);
sideNavLinks.forEach(link => link.addEventListener('click', closeNav));
processListItems.forEach(listItem => listItem.addEventListener('click', handleProcessClick));

// Initialize
init();
