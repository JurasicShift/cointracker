window.addEventListener('load', initialize);

const btn = document.getElementById('btn');
const coinBtn = document.getElementById('coinBtn');
const coinText = document.getElementById('coinText');
const header = document.getElementById('header');
const title = document.getElementById('title');

function initialize() {
	if (document.getElementById) {
		timer(addBtnStyle, 3000);
		coinBtn.addEventListener('click', () => {
			stop(timeStop);
		});
		coinBtn.addEventListener('click', () => {
			titleSlide();
		});
	}
}

// ==================================================
// BUTTON PULSE STYLE
// ==================================================

function addBtnStyle() {
	coinBtn.classList.add('coinBtn2');
	setTimeout(() => {
		coinBtn.classList.remove('coinBtn2');
		setTimeout(() => {
			coinBtn.classList.add('coinBtn2');
			setTimeout(() => {
				coinBtn.classList.remove('coinBtn2');
			}, 300);
		}, 300);
	}, 300);
}

let timeStop;

function timer(fn, t) {
	fn();
	timeStop = setInterval(fn, t);
}

function stop(t) {
	clearInterval(t);
}
// =======================================================
// =======================================================
// ========================================================
// SLIDE OUT EFFECTS
// ========================================================

function titleSlide() {
	title.style.left = '-1200px';
	header.style.top = '-1260px';
	btn.style.right = '-1500px';
	coinText.classList.add('fader');
	setTimeout(() => {
		window.open('/cointracker', '_self');
	}, 500);
}
