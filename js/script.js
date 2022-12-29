"use strict";
window.addEventListener("DOMContentLoaded", () => {
	//#region  //! tabs
	const tabs = document.querySelectorAll(".tabheader__item");
	const tabsContent = document.querySelectorAll(".tabcontent");
	const tabsParent = document.querySelector(".tabheader__items");
	function hideTabContent() {
		tabsContent.forEach((item) => {
			item.classList.add("hide");
			item.classList.remove("show", "fade");
		});
		tabs.forEach((item) => {
			item.classList.remove("tabheader__item_active");
		});
	}
	function showTabContent(i = 0) {
		hideTabContent();

		tabsContent[i].classList.add("show", "fade");
		tabsContent[i].classList.remove("hide");

		tabs[i].classList.add("tabheader__item_active");
	}

	showTabContent();

	tabsParent.addEventListener("click", (event) => {
		const target = event.target;

		if (target && target.classList.contains("tabheader__item")) {
			tabs.forEach((item, i) => {
				if (target == item) {
					showTabContent(i);
				}
			});
		}
	});
	//#endregion
	//#region  //! timer
	const deadline = "2022-12-25";
	function getTimeRemaining(endtime) {
		const t = Date.parse(endtime) - Date.parse(new Date());
		const days = Math.floor(t / (1000 * 60 * 60 * 24));
		const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
		const minutes = Math.floor((t / 1000 / 60) % 60);
		const seconds = Math.floor((t / 1000) % 60);
		return {
			total: t,
			days: days,
			hours: hours,
			minutes: minutes,
			seconds: seconds,
		};
	}

	function getZero(num) {
		if (num <= 0) {
			return 0;
		} else if (num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}
	function setClock(selector, endtime) {
		const timer = document.querySelector(selector);
		const days = timer.querySelector("#days");
		const hours = timer.querySelector("#hours");
		const minutes = timer.querySelector("#minutes");
		const seconds = timer.querySelector("#seconds");
		const timeInerval = setInterval(updateClock, 1000);
		updateClock();
		function updateClock() {
			const t = getTimeRemaining(endtime);
			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minutes.innerHTML = getZero(t.minutes);
			seconds.innerHTML = getZero(t.seconds);

			if (t.total <= 0) {
				clearInterval(timeInerval);
			}
		}
	}

	setClock(".timer", deadline);
	//#endregion
	//#region  //! Modal
	const modal = document.querySelector(".modal");
	const modalTrigger = document.querySelectorAll("[data-modal]");
	// const modalCloseBtn = document.querySelector("[data-close]");

	function openModal() {
		// modal.style.cssText = "display: block"; // 1 versiune
		modal.classList.add("show");
		modal.classList.remove("hide"); // a 2-a versiune
		// modal.classList.toggle("show"); //3

		document.body.style.overflow = "hidden"; // anulez scroll
		clearInterval(modalTimerId);
	}
	modalTrigger.forEach((item) => {
		item.addEventListener("click", openModal);
	});
	function closeModal() {
		// modal.style.cssText = "display: none"; //1
		modal.classList.remove("show");
		modal.classList.add("hide"); //2
		// modal.classList.toggle("show"); //3

		document.body.style.overflow = "";
	}

	// modalCloseBtn.addEventListener("click", closeModal);

	modal.addEventListener("click", (e) => {
		if (e.target === modal || e.target.getAttribute("data-close") == "") {
			closeModal();
		}
	});
	document.addEventListener("keydown", (e) => {
		if (e.code === "Escape" && modal.classList.contains("show")) {
			closeModal();
		}
	});

	const modalTimerId = setTimeout(openModal, 50000);

	function showModalByScroll() {
		if (
			window.pageYOffset + document.documentElement.clientHeight >=
			document.documentElement.scrollHeight
		) {
			openModal();
			window.removeEventListener("scroll", showModalByScroll);
		}
	}
	window.addEventListener("scroll", showModalByScroll);

	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector);
			this.transfer = 27;
			this.changeToUAH();
		}

		changeToUAH() {
			this.price *= this.transfer;
		}
		render() {
			const element = document.createElement("div");

			if (this.classes.length === 0) {
				this.element = "menu_item";
				element.classList.add(this.element);
			} else {
				this.classes.forEach((className) => element.classList.add(className));
			}
			element.innerHTML = ` 
            <div class="menu__item">
               <img src=${this.src} alt=${this.alt}>
               <h3 class="menu__item-subtitle">${this.title}"</h3>
               <div class="menu__item-descr">${this.descr}</div>
               <div class="menu__item-divider"></div>
               <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
               </div>
            </div>   
            `;
			this.parent.append(element);
		}
	}

	const getResource = async (url) => {
		const res = await fetch(url);
		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, Status: ${res.status}`);
		}
		return await res.json();
	};

	getResource("http://localhost:3000/menu").then((data) => {
		data.forEach(({ img, altimg, title, descr, price }) => {
			new MenuCard(
				img,
				altimg,
				title,
				descr,
				price,
				".menu .container"
			).render();
		});
	});

	// new MenuCard(
	// 	"img/tabs/vegy.jpg",
	// 	"vegy",
	// 	'Меню "Фитнес"',
	// 	'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей  и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
	// 	9,
	// 	".menu .container"
	// ).render();
	// new MenuCard(
	// 	"img/tabs/elite.jpg",
	// 	"elite",
	// 	"Меню “Премиум”",
	// 	"В меню “Премиум” мы используем не только красивый дизайн упаковки, но икачественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
	// 	20,
	// 	".menu .container",
	// 	"menu__item",
	// 	"big"
	// ).render();
	// new MenuCard(
	// 	"img/tabs/post.jpg",
	// 	"post",
	// 	"Меню “Постное”",
	// 	"Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
	// 	15,
	// 	".menu .container",
	// 	"menu__item",
	// 	"big"
	// ).render();
	//#endregion
	//#region  //! Forms
	const forms = document.querySelectorAll("form");
	const message = {
		loading: "img/form/spinner.svg",
		success: "Спасибо! Скоро мы с вами свяжемся",
		failure: "Что-то пошло не так...",
	};
	forms.forEach((item) => {
		bindPostData(item);
	});

	const postData = async (url, data) => {
		//async spune ca codul trebuie sa se faca treptat
		const res = await fetch(url, {
			// await spune unde trebuie sa astepte
			method: "POST",
			headers: { "Content-type": "application/json" },
			body: data,
		});
		return await res.json();
	};

	function bindPostData(form) {
		form.addEventListener("submit", (e) => {
			e.preventDefault();

			let statusMessage = document.createElement("img");
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
             display: block;
             margin: 0 auto;`;
			// form.append(statusMessage); //Crearea si inserare mesaj notificare
			form.insertAdjacentElement("afterend", statusMessage);

			// const request = new XMLHttpRequest();
			// request.open("POST", "js/server.php");
			// request.setRequestHeader(
			// 	"Content-type",
			// 	"application/json; charset=utf-8"
			// );
			const formData = new FormData(form); // preia datele de pe pagina

			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			postData("http://localhost:3000/requests", json)
				.then((data) => {
					console.log(data);
					showThanksModal(message.success);
					statusMessage.remove();
				})
				.catch(() => {
					showThanksModal(message.failure);
				})
				.finally(() => {
					form.reset();
				});

			// request.send(json);

			// request.addEventListener("load", () => {
			// 	if (request.status === 200) {
			// 		console.log(request.response);
			// 		showThanksModal(message.success);
			// 		statusMessage.remove();
			// 		form.reset();
			// 	} else {
			// 		showThanksModal(message.failure);
			// 	}
			// });
		});
	}

	function showThanksModal(message) {
		const prevModalDialog = document.querySelector(".modal__dialog");
		prevModalDialog.classList.add("hide");
		openModal();
		const thanksModal = document.createElement("div");
		thanksModal.classList.add("modal__dialog");
		thanksModal.innerHTML = `      
         <div class="modal__content">
            <div  class="modal__close">×</div>
            <div class="modal__title">${message}</div>
         </div>`;
		document.querySelector(".modal").append(thanksModal);
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add("show");
			prevModalDialog.classList.remove("hide");
			closeModal();
		}, 4000);
	}

	// fetch("http://localhost:3000/menu")
	// 	.then((data) => data.json())
	// 	.then((res) => console.log(res));
	//#endregion
	//#region  //! slide

	const slides = document.querySelectorAll(".offer__slide");
	const prev = document.querySelector(".offer__slider-prev");
	const next = document.querySelector(".offer__slider-next");
	const total = document.querySelector("#total");
	const current = document.querySelector("#current");

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
	//#endregion
	//#region  //! Calculator
	const result = document.querySelector(".calculating__result span");
	let sex = "female",
		height,
		weight,
		age,
		ratio = 1.375;

	function calcTotal() {
		if (!sex || !height || !weight || !age || !ratio) {
			result.textContent = "____"; // Можете придумать что угодно
			return;
		}
		if (sex == "female") {
			result.textContent = Math.round(
				(447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
			);
		}
		if (sex == "male") {
			result.textContent = Math.round(
				(88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
			);
		}
	}
	calcTotal();

	function getStaticInformation(parentSelector, activeClass) {
		const elements = document.querySelectorAll(`${parentSelector} div`);

		elements.forEach((elem) => {
			elem.addEventListener("click", (e) => {
				if (e.target.getAttribute("data-ratio")) {
					ratio = +e.target.getAttribute("data-ratio");
				} else {
					sex = e.target.getAttribute("id");
				}
				elements.forEach((elem) => {
					elem.classList.remove(activeClass);
				});

				e.target.classList.add(activeClass);
				calcTotal();

				console.log(sex, height, weight, age, ratio);
			});
		});
	}
	getStaticInformation("#gender", "calculating__choose-item_active");
	getStaticInformation(
		".calculating__choose_big",
		"calculating__choose-item_active"
	);

	function getDynamicInformation(selector) {
		const input = document.querySelector(selector);
		input.addEventListener("input", () => {
			switch (input.getAttribute("id")) {
				case "height":
					height = +input.value;
					break;
				case "weight":
					weight = +input.value;
					break;
				case "age":
					age = +input.value;
					break;
			}
			calcTotal();
		});
	}

	getDynamicInformation("#height");
	getDynamicInformation("#weight");
	getDynamicInformation("#age");
	//#endregion
});
