function test() {
	function multiply20(price) {
		return price * 20;
	}
	function divide100(price) {
		return price / 100;
	}
	function normalizePrice(price) {
		return price.toFixed(2);
	}

	function compose(...fns) {
		return function (x) {
			return fns.reduceRight(function (res, fn) {
				return fn(res);
			}, x);
		};
	}
	console.log(compose(normalizePrice, divide100, multiply20)(200));

	const add1 = function (a) {
		return a + 1;
	};
	const addAll3 = function (a, b, c) {
		console.log(a, b, c);
		return a + b + c;
	};
	const composeWithArgs = (
		...fns //[add1, addAll3]
	) =>
		fns.reduceRight(
			(res, fn) =>
				(
					...nr //[1,2,3]
				) =>
					fn(res(...nr))
		);
	console.log(composeWithArgs(add1, addAll3)(1, 2, 3)); // 7
}
export default test;
