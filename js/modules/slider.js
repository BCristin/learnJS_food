const modal = require("./modal");

function slider({
	container,
	nextArrow,
	prevArrow,
	slide,
	totalCounter,
	currentCounter,
	wrapper,
	field,
}) {
	const slides = document.querySelectorAll(slide);
	const prev = document.querySelector(prevArrow);
	const next = document.querySelector(nextArrow);
	const total = document.querySelector(totalCounter);
	const current = document.querySelector(currentCounter);

	let slideIndex = 1;
	showSlide(slideIndex);

	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
	} else {
		total.textContent = slides.length;
	}
	function showSlide(n) {
		if (n > slides.length) {
			slideIndex = 1;
		}
		if (n < 1) {
			slideIndex = slides.length;
		}

		slides.forEach((item) => (item.style.display = "none"));
		slides[slideIndex - 1].style.display = "block";

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}
	}
	function plusSlides(n) {
		showSlide((slideIndex += n));
	}

	prev.addEventListener("click", () => {
		plusSlides(-1);
	});
	next.addEventListener("click", () => {
		plusSlides(1);
	});
}

export default slider;
