export function createElement(tag, className, props = {}) {
	const el = document.createElement(tag);
	if (className) {
		el.classList.add(className);
	}
	for (let key in props) {
		el[key] = props[key];
	}
	return el;
}

export function secondsToTimeString(seconds) {
	const mins = Math.floor(seconds / 60);
	const secs = seconds % 60;
	return `${mins === 0 ? '00' : mins}:${secs < 10 ? `0${secs}` : secs}`;
}