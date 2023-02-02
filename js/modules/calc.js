function calc() {
	const result = document.querySelector(".calculating__result span");

	let sex = "female",
		height,
		weight,
		age,
		ratio = 1.375;
	if (localStorage.getItem("sex")) {
		sex = localStorage.getItem("sex");
	} else {
		localStorage.setItem("sex", sex);
	}
	if (localStorage.getItem("ratio")) {
		ratio = localStorage.getItem("ratio");
	} else {
		localStorage.setItem("ratio", ratio);
	}

	function initLocalSettings(parentSelector, activeClass) {
		const elements = document.querySelectorAll(`${parentSelector} div`);
		elements.forEach((elem) => {
			elem.classList.remove(activeClass);
			if (elem.getAttribute("id") == localStorage.getItem("sex")) {
				elem.classList.add(activeClass);
			}
			if (elem.getAttribute("data-ratio") == localStorage.getItem("ratio")) {
				elem.classList.add(activeClass);
			}
		});
	}
	initLocalSettings("#gender", "calculating__choose-item_active");
	initLocalSettings(
		".calculating__choose_big",
		"calculating__choose-item_active"
	);

	function initLocalSettingsDynamicInformation(idSelector) {
		const item = localStorage.getItem(idSelector);
		if (item) {
			const input = document.querySelector(`#${idSelector}`);
			input.value = item;
		}

		if (idSelector == "height") {
			height = item;
		}
		if (idSelector == "weight") {
			weight = item;
		}
		if (idSelector == "age") {
			age = item;
		}
		validation(`#${idSelector}`);

		calcTotal();
	}
	initLocalSettingsDynamicInformation("height");
	initLocalSettingsDynamicInformation("weight");
	initLocalSettingsDynamicInformation("age");

	function calcTotal() {
		if (!sex || !height || !weight || !age || !ratio) {
			result.textContent = "____";
			return;
		}
		if (sex == "female") {
			result.textContent = Math.round(
				(447.6 + 9.2 * weight + 3.1 * height - 4.3 * age) * ratio
			);
		} else {
			result.textContent = Math.round(
				(88.36 + 13.4 * weight + 4.8 * height - 5.7 * age) * ratio
			);
		}
	}
	calcTotal();

	function getStaticInformation(parentSelector, activeClass) {
		const elements = document.querySelectorAll(`${parentSelector} div`);
		// console.log(elements);
		elements.forEach((elem) => {
			elem.addEventListener("click", (e) => {
				if (e.target.getAttribute("data-ratio")) {
					ratio = +e.target.getAttribute("data-ratio");
					localStorage.setItem("ratio", ratio);
				} else {
					sex = e.target.getAttribute("id");
					localStorage.setItem("sex", sex);
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
			validation(selector);
			switch (input.getAttribute("id")) {
				case "height":
					height = +input.value;
					localStorage.setItem("height", height);
					break;
				case "weight":
					weight = +input.value;
					localStorage.setItem("weight", weight);
					break;
				case "age":
					age = +input.value;
					localStorage.setItem("age", age);
					break;
			}
			calcTotal();
		});
	}

	function validation(selector) {
		const input = document.querySelector(selector);
		if (input.value.match(/\D/g)) {
			input.style.border = "1px solid red";
			input.style.boxShadow = "0px 0px 20px 10px red";
		} else {
			input.style.border = "1px solid green";
			input.style.boxShadow = "0px 4px 15px 0px rgb(0 0 0 / 20%)";
		}
	}
	getDynamicInformation("#height");
	getDynamicInformation("#weight");
	getDynamicInformation("#age");
}
export default calc;
