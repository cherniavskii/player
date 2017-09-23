/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(3);

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Player = function () {
	function Player(playlist) {
		var _this = this;

		var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		_classCallCheck(this, Player);

		this.next = function () {
			if (!_this._isLastTrack(_this._currentTrackId)) {
				_this._setTrack(_this._currentTrackId + 1);
			} else if (_this._options.loop) {
				_this._setTrack(0);
			}
		};

		this.prev = function () {
			if (!_this._isFirstTrack(_this._currentTrackId)) {
				_this._setTrack(_this._currentTrackId - 1);
			} else if (_this._options.loop) {
				_this._setTrack(_this._playlist.length - 1);
			}
		};

		this._handleTimeUpdate = function (e) {
			var time = Math.round(e.srcElement.currentTime);
			if (time !== _this._currentTime) {
				_this._updateCurrentTime(time);
			}
		};

		this._togglePlay = function () {
			if (_this._audio.paused) {
				_this.play();
			} else {
				_this.pause();
			}
		};

		this._handleTrackSelect = function (e) {
			if (e.target.className === 'item_title' || e.target.className === 'item_artist') {
				var li = e.target.parentNode;
				var ul = li.parentNode;
				var index = Array.prototype.indexOf.call(ul.childNodes, li);
				_this._setTrack(index);
				_this._togglePlaylist();
			}
		};

		this._togglePlaylist = function () {
			if (_this._rootElement.classList.contains('player__isPlaylistOpened')) {
				_this._rootElement.classList.remove('player__isPlaylistOpened');
			} else {
				_this._rootElement.classList.add('player__isPlaylistOpened');
			}
		};

		this._playlist = [].concat(_toConsumableArray(playlist));
		this._options = _extends({}, options);
		this._currentTrackId = this._options.startFrom && this._playlist[this._options.startFrom] ? this._options.startFrom : 0;
		this._currentTrackDuration = 0;
		this._rootElement = (0, _util.createElement)('div', 'player');
		this._ui = { controls: this._createControlsUI(), playlist: this._createPlaylistUI() };
		this._rootElement.appendChild(this._ui.controls);
		this._rootElement.appendChild(this._ui.playlist);
		this._audio = this._createAudioElement(this._playlist[this._currentTrackId].src);
		this._setTrack(this._currentTrackId);
		this._rootElement.appendChild(this._audio);
		if (this._options.parentNode) {
			this._options.parentNode.appendChild(this._rootElement);
		} else {
			document.body.appendChild(this._rootElement);
		}
		if (this._options.autoplay) {
			this.play();
		}
	}

	_createClass(Player, [{
		key: 'pause',
		value: function pause() {
			this._audio.pause();
		}
	}, {
		key: 'play',
		value: function play() {
			this._audio.play();
		}
	}, {
		key: '_createAudioElement',
		value: function _createAudioElement(src) {
			var _this2 = this;

			var audio = new Audio(src);
			audio.addEventListener('playing', function () {
				audio.addEventListener('timeupdate', _this2._handleTimeUpdate);
			});
			audio.addEventListener('pause', function () {
				audio.removeEventListener('timeupdate', _this2._handleTimeUpdate);
			});
			audio.addEventListener('ended', function () {
				var isLastTrack = _this2._isLastTrack(_this2._currentTrackId);
				_this2.next();
				if (!isLastTrack) {
					_this2.play();
				}
			});
			audio.addEventListener('durationchange', function (e) {
				_this2._currentTrackDuration = Math.round(e.target.duration);
			});
			return audio;
		}
	}, {
		key: '_isLastTrack',
		value: function _isLastTrack(id) {
			return id === this._playlist.length - 1;
		}
	}, {
		key: '_isFirstTrack',
		value: function _isFirstTrack(id) {
			return id === 0;
		}
	}, {
		key: '_setCover',
		value: function _setCover(id) {
			this._rootElement.style.backgroundImage = 'url(' + this._playlist[id].cover;
		}
	}, {
		key: '_updateSongInfo',
		value: function _updateSongInfo(id) {
			var title = this._ui.controls.querySelector('.songInfo_title');
			var artist = this._ui.controls.querySelector('.songInfo_artist');
			var track = this._playlist[id];
			title.innerText = track.title;
			artist.innerText = track.artist;
		}
	}, {
		key: '_updateCurrentTime',
		value: function _updateCurrentTime(time) {
			this._currentTime = time;
			this._ui.controls.querySelector('.player_currentTime').innerText = (0, _util.secondsToTimeString)(time);
			this._ui.playlist.querySelector('.progress_bar').style.width = Math.round(time / this._currentTrackDuration * 100) + '%';
		}
	}, {
		key: '_setTrack',
		value: function _setTrack(id) {
			var paused = this._audio.paused;

			this._currentTrackId = id;
			this._setSrc(id);
			this._updateCurrentTime(0);
			this._updateSongInfo(id);
			this._setCover(id);
			if (!paused) {
				this.play();
			}
		}
	}, {
		key: '_setSrc',
		value: function _setSrc(id) {
			this._audio.src = this._playlist[id].src;
		}
	}, {
		key: '_setTime',
		value: function _setTime(time) {
			this._audio.currentTime = time;
			this._updateCurrentTime(time);
		}
	}, {
		key: '_createControlsUI',
		value: function _createControlsUI() {
			var controls = (0, _util.createElement)('div', 'player_controls'),
			    songInfo = (0, _util.createElement)('div', 'player_songInfo');

			songInfo.appendChild((0, _util.createElement)('div', 'songInfo_title'));
			songInfo.appendChild((0, _util.createElement)('div', 'songInfo_artist'));

			controls.appendChild((0, _util.createElement)('button', 'controls_playToggle', { onclick: this._togglePlay }));
			controls.appendChild((0, _util.createElement)('button', 'controls_playlist', { onclick: this._togglePlaylist }));
			controls.appendChild((0, _util.createElement)('button', 'controls_next', { onclick: this.next }));
			controls.appendChild((0, _util.createElement)('button', 'controls_prev', { onclick: this.prev }));
			controls.appendChild((0, _util.createElement)('div', 'player_currentTime'));
			controls.appendChild(songInfo);

			return controls;
		}
	}, {
		key: '_createPlaylistUI',
		value: function _createPlaylistUI() {
			var _this3 = this;

			var playlist = (0, _util.createElement)('div', 'player_playlist'),
			    progressBar = (0, _util.createElement)('div', 'playlist_progress', {
				onclick: function onclick(e) {
					_this3._setTime(Math.round(_this3._currentTrackDuration * (e.offsetX / e.currentTarget.clientWidth)));
				}
			}),
			    tracks = (0, _util.createElement)('ul', 'playlist_tracks', { onclick: this._handleTrackSelect }),
			    _createTrackItem = function _createTrackItem(data) {
				var track = (0, _util.createElement)('li', 'tracks_item');
				track.appendChild((0, _util.createElement)('div', 'item_title', { innerText: data.title }));
				track.appendChild((0, _util.createElement)('div', 'item_artist', { innerText: data.artist }));
				return track;
			};

			for (var i in this._playlist) {
				tracks.appendChild(_createTrackItem(this._playlist[i]));
			}

			progressBar.appendChild((0, _util.createElement)('div', 'progress_bar'));

			playlist.appendChild(progressBar);
			playlist.appendChild((0, _util.createElement)('button', 'playlist_closeBtn', { onclick: this._togglePlaylist }));
			playlist.appendChild(tracks);
			return playlist;
		}
	}]);

	return Player;
}();

exports.default = Player;
;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = [{"src":"https://p4.bcbits.com/download/track/3a4d0f828651e271128f9c1c069960d7/mp3-128/3703677944?fsig=5039f759ce7e3d97a686649c6cb7598a&id=3703677944&stream=1&ts=1506168000.0&token=1506168060_796c56ebbe0f39bd5552a5ba49da76b2adf14c71","cover":"./img/background.jpg","artist":"Andrew Cherniavskii","title":"Memories"},{"src":"https://p4.bcbits.com/download/track/ec5eadbd2e2747bedf7c5592b9d799df/mp3-128/1933941760?fsig=2a3f24fbdd88c7aee4362b543769ddd3&id=1933941760&stream=1&ts=1506168000.0&token=1506168060_6e56dac03710ccc5a0714070bb547e5d52dbcd57","cover":"./img/background.jpg","artist":"Andrew Cherniavskii","title":"Rising up to heaven"},{"src":"https://p4.bcbits.com/download/track/f5e69cce0c73d68e6bf12968d43c62dd/mp3-128/240016838?fsig=159fb97b59a9834046964e7c7aaba4cd&id=240016838&stream=1&ts=1506168000.0&token=1506168060_b504f7495dd933e5ba3e7f0aef2c9b5fb6dce04c","cover":"./img/background.jpg","artist":"Andrew Cherniavskii","title":"Flame"},{"src":"https://p4.bcbits.com/download/track/bec2b18b5f7394010d0375df261567c9/mp3-128/4118829894?fsig=7f82f5a77f4dba5d20d67037ec19c567&id=4118829894&stream=1&ts=1506168000.0&token=1506168060_4d6c1a39e1d47b202a50ad409717784fb6a630ba","cover":"./img/background.jpg","artist":"Andrew Cherniavskii","title":"Rock"},{"src":"https://p4.bcbits.com/download/track/bfe3a5245745bb6d5e3fdb7b362c7802/mp3-128/1919585954?fsig=aacfd6e49e277b10a9a5f22ba0fbc04b&id=1919585954&stream=1&ts=1506168000.0&token=1506168060_3f0e5160dd0fa67f29fb998e9adec4c19ca7229e","cover":"./img/background.jpg","artist":"Andrew Cherniavskii","title":"Sunrise"},{"src":"https://p4.bcbits.com/download/track/bb420713131f2ce11555ddcd84721a0c/mp3-128/2627994276?fsig=60169fda4d9f6c30dca6c768b654b7d5&id=2627994276&stream=1&ts=1506168000.0&token=1506168060_4949d06ed6620506b844382ed957894476f60611","cover":"./img/background.jpg","artist":"Andrew Cherniavskii","title":"Traffic (Faust cover)"},{"src":"https://p4.bcbits.com/download/track/3c7e68b5fda3d78016700ac3466e92ef/mp3-128/270237419?fsig=11cfde21f2e5b4d60eed1caeba8e124d&id=270237419&stream=1&ts=1506168000.0&token=1506168060_e000a5b791caf70a0879769865403856f2dcc53d","cover":"./img/background.jpg","artist":"Andrew Cherniavskii","title":"Lights"}]

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _playlist = __webpack_require__(1);

var _playlist2 = _interopRequireDefault(_playlist);

var _player = __webpack_require__(0);

var _player2 = _interopRequireDefault(_player);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

window.player = new _player2.default(_playlist2.default, {
	parentNode: document.body,
	autoplay: false,
	startFrom: 0,
	loop: true
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.createElement = createElement;
exports.secondsToTimeString = secondsToTimeString;
function createElement(tag, className) {
	var props = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	var el = document.createElement(tag);
	if (className) {
		el.classList.add(className);
	}
	for (var key in props) {
		el[key] = props[key];
	}
	return el;
}

function secondsToTimeString(seconds) {
	var mins = Math.floor(seconds / 60);
	var secs = seconds % 60;
	return (mins === 0 ? '00' : mins) + ':' + (secs < 10 ? '0' + secs : secs);
}

/***/ })
/******/ ]);