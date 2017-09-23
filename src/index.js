import playlist from './playlist.json';
import Player from './player';

window.player = new Player(playlist, {
	parentNode: document.body,
	autoplay: false,
	startFrom: 0,
	loop: true
});