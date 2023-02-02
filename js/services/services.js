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
const getResource = async (url) => {
	const res = await fetch(url);
	if (!res.ok) {
		throw new Error(`Could not fetch ${url}, Status: ${res.status}`);
	}
	return await res.json();
};
export { postData };
export { getResource };
