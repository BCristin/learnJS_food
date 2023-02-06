"use strict";
require("es6-promise").polyfill();
import "nodelist-foreach-polyfill";

import calc from "./modules/calc";
import cards from "./modules/cards";
import forms from "./modules/forms";
import modal from "./modules/modal";
import slider from "./modules/slider";
import tabs from "./modules/tabs";
import timer from "./modules/timer";
import { openModal } from "./modules/modal";
import test from "./modules/test";

window.addEventListener("DOMContentLoaded", () => {
	const modalTimerId = setTimeout(
		() => openModal(".modal", modalTimerId),
		500000
	);
	calc();
	cards();
	forms("form", modalTimerId);
	modal("[data-modal]", ".modal", modalTimerId);
	slider({
		nextArrow: ".offer__slider-next",
		prevArrow: ".offer__slider-prev",
		slide: ".offer__slide",
		totalCounter: "#total",
		currentCounter: "#current",
	});
	tabs(
		".tabheader__item",
		".tabcontent",
		".tabheader__items",
		"tabheader__item_active"
	);
	timer(".timer", "2023-02-26");
	test();
});
