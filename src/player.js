import { createElement, secondsToTimeString } from './util';

export default class Player {
	constructor(playlist, options = {}) {
		this._playlist = [ ...playlist ];
		this._options = { ...options };
		this._currentTrackId = (this._options.startFrom && this._playlist[this._options.startFrom]) ?
			this._options.startFrom : 0;
		this._currentTrackDuration = 0;
		this._rootElement = createElement('div', 'player');
		this._ui = { controls: this._createControlsUI(), playlist: this._createPlaylistUI() };
		this._rootElement.appendChild(this._ui.controls);
		this._rootElement.appendChild(this._ui.playlist);
		this._audio = this._createAudioElement(this._playlist[this._currentTrackId].src);
		this._setTrack(this._currentTrackId);
		this._rootElement.appendChild(this._audio);
		if (this._options.parentNode) {
			this._options.parentNode.appendChild(this._rootElement)
		} else {
			document.body.appendChild(this._rootElement);
		}
		if (this._options.autoplay) {
			this.play();
		}
	}
	next = () => {
		if (!this._isLastTrack(this._currentTrackId)) {
			this._setTrack(this._currentTrackId + 1);
		} else if (this._options.loop) {
			this._setTrack(0);
		}
	};
	pause() {
		this._audio.pause();
	}
	play() {
		this._audio.play();
	}
	prev = () => {
		if (!this._isFirstTrack(this._currentTrackId)) {
			this._setTrack(this._currentTrackId - 1);
		} else if (this._options.loop) {
			this._setTrack(this._playlist.length - 1);
		}
	};
	
	_createAudioElement(src) {
		const audio = new Audio(src);
		audio.addEventListener('playing', () => {
			audio.addEventListener('timeupdate', this._handleTimeUpdate);
		});
		audio.addEventListener('pause', () => {
			audio.removeEventListener('timeupdate', this._handleTimeUpdate);
		});
		audio.addEventListener('ended', () => {
			const isLastTrack = this._isLastTrack(this._currentTrackId);
			this.next();
			if (!isLastTrack) {
				this.play();
			}
		});
		audio.addEventListener('durationchange', e => {
			this._currentTrackDuration = Math.round(e.target.duration);
		});
		return audio;
	}
	_isLastTrack(id) {
		return id === this._playlist.length - 1;
	}
	_isFirstTrack(id) {
		return id === 0;
	}
	_setCover(id) {
		this._rootElement.style.backgroundImage = `url(${this._playlist[id].cover}`;
	}
	_handleTimeUpdate = e => {
		const time = Math.round(e.srcElement.currentTime);
		if (time !== this._currentTime) {
			this._updateCurrentTime(time);
		}
	};

	_updateSongInfo(id) {
		const title = this._ui.controls.querySelector('.songInfo_title');
		const artist = this._ui.controls.querySelector('.songInfo_artist');
		const track = this._playlist[id];
		title.innerText = track.title;
		artist.innerText = track.artist;
	}
	_updateCurrentTime(time) {
		this._currentTime = time;
		this._ui.controls.querySelector('.player_currentTime').innerText = secondsToTimeString(time);
		this._ui.playlist.querySelector('.progress_bar').style.width = `${Math.round(time / this._currentTrackDuration * 100)}%`;
	}

	_setTrack(id) {
		const { paused } = this._audio;
		this._currentTrackId = id;
		this._setSrc(id);
		this._updateCurrentTime(0);
		this._updateSongInfo(id);
		this._setCover(id);
		if (!paused) {
			this.play();
		}
	}
	_setSrc(id) {
		this._audio.src = this._playlist[id].src;
	}
	_setTime(time) {
		this._audio.currentTime = time;
		this._updateCurrentTime(time);
	}

	_togglePlay = () => {
		if (this._audio.paused) {
			this.play();
		} else {
			this.pause();
		}
	};
	_createControlsUI() {
		const controls = createElement('div', 'player_controls'),
			songInfo = createElement('div', 'player_songInfo');

		songInfo.appendChild(createElement('div', 'songInfo_title'));
		songInfo.appendChild(createElement('div', 'songInfo_artist'));

		controls.appendChild(createElement('button', 'controls_playToggle', { onclick: this._togglePlay }));
		controls.appendChild(createElement('button', 'controls_playlist', { onclick: this._togglePlaylist }));
		controls.appendChild(createElement('button', 'controls_next', { onclick: this.next }));
		controls.appendChild(createElement('button', 'controls_prev', { onclick: this.prev }));
		controls.appendChild(createElement('div', 'player_currentTime'));
		controls.appendChild(songInfo);

		return controls;
	}
	_handleTrackSelect = e => {
		if (e.target.className === 'item_title' || e.target.className === 'item_artist') {
			const li = e.target.parentNode;
			const ul = li.parentNode;
			const index = Array.prototype.indexOf.call(ul.childNodes, li);
			this._setTrack(index);
			this._togglePlaylist();
		}
	};
	_createPlaylistUI() {
		const playlist = createElement('div', 'player_playlist'),
			progressBar = createElement('div', 'playlist_progress', {
				onclick: e => {
					this._setTime(Math.round(this._currentTrackDuration * (e.offsetX / e.currentTarget.clientWidth)));
				}
			}),
			tracks = createElement('ul', 'playlist_tracks', { onclick: this._handleTrackSelect }),
			_createTrackItem = data => {
				const track = createElement('li', 'tracks_item');
				track.appendChild(createElement('div', 'item_title', { innerText: data.title }));
				track.appendChild(createElement('div', 'item_artist', { innerText: data.artist }));
				return track;
			};

		for (let i in this._playlist) {
			tracks.appendChild(_createTrackItem(this._playlist[i]));
		}

		progressBar.appendChild(createElement('div', 'progress_bar'));

		playlist.appendChild(progressBar);
		playlist.appendChild(createElement('button', 'playlist_closeBtn', { onclick: this._togglePlaylist }));
		playlist.appendChild(tracks);
		return playlist;
	}
	_togglePlaylist = () => {
		if (this._rootElement.classList.contains('player__isPlaylistOpened')) {
			this._rootElement.classList.remove('player__isPlaylistOpened');
		} else {
			this._rootElement.classList.add('player__isPlaylistOpened');
		}
	};
};