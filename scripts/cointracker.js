window.addEventListener('load', initialize);

const clockCapital = document.querySelector('.clock-capital');
const coinInt = document.getElementById('coinInt');
const valueInt = document.getElementById('valueInt');
const coinType = document.getElementById('coinType');

const customMenu = document.getElementById('customMenu');
const customMenu2 = document.getElementById('customMenu2');
const customMenu3 = document.getElementById('customMenu3');
const customMenu4 = document.getElementById('customMenu4');
const customMenu5 = document.getElementById('customMenu5');

const customTitle = document.getElementById('customTitle');
const customTitle2 = document.getElementById('customTitle2');
const customTitle3 = document.getElementById('customTitle3');
const customTitle4 = document.getElementById('customTitle4');
const customTitle5 = document.getElementById('customTitle5');

const customTitleSpan = document.getElementById('customTitleSpan');
const customTitleSpan2 = document.getElementById('customTitleSpan2');
const customTitleSpan3 = document.getElementById('customTitleSpan3');
const customTitleSpan4 = document.getElementById('customTitleSpan4');
const customTitleSpan5 = document.getElementById('customTitleSpan5');

const customList = document.getElementById('customList');
const customList2 = document.getElementById('customList2');
const customList3 = document.getElementById('customList3');
const customList4 = document.getElementById('customList4');
const customList5 = document.getElementById('customList5');

const customItem = document.getElementsByClassName('customItem');
const customItem2 = document.getElementsByClassName('customItem2');
const customItem3 = document.getElementsByClassName('customItem3');
const customItem4 = document.getElementsByClassName('customItem4');
const customItem5 = document.getElementsByClassName('customItem5');

const infoDiv = document.getElementById('infoDiv');
const high = document.getElementById('currentHigh');
const low = document.getElementById('currentLow');

const submit1 = document.getElementById('submit1');
const submit2 = document.getElementById('submit2');
const reset1 = document.getElementById('reset1');
const chartToggle = document.getElementById('chartToggle');

const error1 = document.getElementById('errorText1');
const error2 = document.getElementById('errorText2');

// =================================================
// INITIALIZATION
// =================================================
function initialize() {
	if (document.getElementById) {
		fadeIn();
		menuLaunch1();
		menuLaunch2();
		menuLaunch3();
		init();
		storageClear();
		highLowClear();
		submit1.addEventListener('click', () => {
			currencySelect1(text);
		});
		submit2.addEventListener('click', () => {
			compSelect(text);
		});
		reset1.addEventListener('click', () => {
			selectClear();
		});
		chartToggle.addEventListener('click', () => {
			toggleChart();
		});
	}
}

function fadeIn() {
	const fadeIn = document.getElementById('fadeIn');
	setTimeout(() => {
		fadeIn.classList.add('pageShow');
	}, 500);
}

function menuLaunch1() {
	eventsClick(customMenu, customList, customTitle);
	eventsClick(customMenu2, customList2, customTitle2);
	eventsClick(customMenu3, customList3, customTitle3);
	eventsClick(customMenu4, customList4, customTitle4);
	eventsClick(customMenu5, customList5, customTitle5);
}

function menuLaunch2() {
	eventsMouse(customMenu, customList, customTitle);
	eventsMouse(customMenu2, customList2, customTitle2);
	eventsMouse(customMenu3, customList3, customTitle3);
	eventsMouse(customMenu4, customList4, customTitle4);
	eventsMouse(customMenu5, customList5, customTitle5);
}

function menuLaunch3() {
	currencyChoice(customItem, customTitleSpan);
	currencyChoice(customItem2, customTitleSpan2);
	currencyChoice2(customItem3, customTitleSpan3);
	currencyChoice2(customItem4, customTitleSpan4);
	currencyChoice2(customItem5, customTitleSpan5);
}

// ===========================================
// CUSTOM MENU EVENTS AND SELECT
// ===========================================

function eventsClick(menu, list, title) {
	let clickCount = 0;
	menu.addEventListener('click', () => {
		if (clickCount === 0) {
			list.classList.add('customListExpand');
			title.classList.add('customBorder2');
			clickCount = 1;
		} else {
			list.classList.remove('customListExpand');
			title.classList.remove('customBorder2');
			clickCount = 0;
		}
	});
}

function eventsMouse(menu, list, title) {
	menu.addEventListener('mouseover', () => {
		list.classList.add('customListExpand');
		title.classList.add('customBorder2');
	});
	menu.addEventListener('mouseout', () => {
		list.classList.remove('customListExpand');
		title.classList.remove('customBorder2');
	});
}

let text;
let text2;
let target;
let evObj;
let choiceCount = 0;

function currencyChoice(item, span) {
	for (let i = 0; i < item.length; i++) {
		item[i].addEventListener('click', e => {
			evObj = e;
			if (choiceCount === 0) {
				text = evObj.srcElement.innerText;
				span.innerHTML = text;
				choiceCount++;
			} else {
				target = evObj.srcElement.innerText;
				span.innerHTML = target;
				choiceCount = 0;
			}
		});
	}
}

function currencyChoice2(item, span) {
	for (let i = 0; i < item.length; i++) {
		item[i].addEventListener('click', e => {
			evObj = e;
			if (choiceCount === 0) {
				text = evObj.srcElement.innerText;
				span.innerHTML = text;
				choiceCount++;
			} else if (choiceCount === 1) {
				target = evObj.srcElement.innerText;
				span.innerHTML = target;
				choiceCount++;
			} else if (choiceCount === 2) {
				text2 = evObj.srcElement.innerText;
				span.innerHTML = text2;
				choiceCount = 0;
			}
		});
	}
}

// =======================================================
// REALTIME BITCOIN CHART
// =======================================================

const coinChart = document.getElementById('coinChart').getContext('2d');
Chart.defaults.global.defaultFontColor = '#fff';
let coinTracker = new Chart(coinChart, {
	type: 'line',
	data: {
		labels: [],
		datasets: [
			{
				label: 'Current BitCoin Value',
				data: [],
				lineTension: 0.5,
				backgroundColor: 'rgb(255, 104, 0)',
				borderColor: 'white',
				borderCapStyle: 'square',
				pointBorderColor: 'white',
				pointBackgroundColor: 'rgb(255, 104, 0)',
				pointBorderWidth: 1,
				pointHoverRadius: 8,
				pointHoverBackgroundColor: 'rgba(19, 65, 145, 0.6)',
				pointHoverBorderColor: 'rgb(255, 104, 0)',
				pointHoverBorderWidth: 2,
				pointRadius: 4,
				pointHitRadius: 10,
				spanGaps: true,
			},
		],
	},
	options: {
		title: {
			fontSize: 18,
			display: true,
			text: 'Realtime BitCoin Tracker',
			position: 'bottom',
		},
	},
});

let curVal;
let timeAdder = 0;

function currencySelect1(text) {
	switch (text) {
		case 'EUR':
			curVal = 'eur';
			coinType.textContent = 'EUR € ';
			clockCapital.textContent = 'Brussels';
			timeAdder = 1;
			break;
		case 'GBP':
			curVal = 'gbp';
			coinType.textContent = 'GBP £';
			clockCapital.textContent = 'London';
			break;
		case 'JPY':
			curVal = 'jpy';
			coinType.textContent = 'JPY ¥';
			clockCapital.textContent = 'Tokyo';
			timeAdder = 8;
			break;
		case 'RUB':
			curVal = 'rub';
			coinType.textContent = 'RUB ₽';
			clockCapital.textContent = 'Moscow';
			timeAdder = 2;
			break;
		case 'USD':
			curVal = 'usd';
			coinType.textContent = 'USD $';
			clockCapital.textContent = 'New York';
			timeAdder = -5;
			break;
		default:
			curVal = 'gbp';
			coinType.textContent = 'GBP £';
			clockCapital.textContent = 'London';
	}
	currencySelect2(target);
}
let time;

function currencySelect2(target) {
	switch (target) {
		case '30sec':
			time = 30000;
			labelArr = multiLabel[0];
			break;
		case '1min':
			time = 60000;
			labelArr = multiLabel[1];
			break;
		case '2min':
			time = 120000;
			labelArr = multiLabel[2];
			break;
		case '5min':
			time = 300000;
			labelArr = multiLabel[3];
			break;
		default:
			time = 30000;
			labelArr = multiLabel[0];
	}
	timer(fetchBitcoinPrice, time);
}
let timeStop;

function timer(fn, t) {
	fn();
	timeStop = setInterval(fn, t);
}

function stop(t) {
	clearInterval(t);
}

let boolValue;
let result;
let resultStore;

const fetchBitcoinPrice = async () => {
	try {
		const response = await fetch('/currencyfetch', {
			method: 'GET',
			mode: 'same-origin',
			headers: {
				currencyvalue: curVal,
			},
		});
		const data = await response.json();
		console.log(data);

		coinInt.textContent = price;

		valueDifferential(price);
		intTest(result);
		labelInputer(coinTracker);
		dataInputer(coinTracker, price, 0);
		highLow(resultStore);
	} catch {
		error1.classList.add('errorDisplay');
		setTimeout(() => {
			error1.classList.remove('errorDisplay');
			error1.classList.add('errorText');
			selectClear();
		}, 4000);
	}
};

function valueDifferential(price) {
	if (boolValue) {
		localStorage.setItem('firstValue', price);
		result = localStorage.firstValue - localStorage.secondValue;
		valueInt.textContent = result;
		boolValue = false;
		resultStore = localStorage.firstValue;
	} else {
		localStorage.setItem('secondValue', price);
		result = localStorage.secondValue - localStorage.firstValue;
		valueInt.textContent = result;
		boolValue = true;
		resultStore = localStorage.secondValue;
	}
}

function intTest(int) {
	if (int === 0) {
		valueInt.classList.remove('positive');
		valueInt.classList.remove('negative');
		valueInt.classList.add('neutral');
		valueIcon.innerHTML = '';
	} else if (int < 0) {
		valueInt.classList.remove('positive');
		valueInt.classList.remove('neutral');
		valueInt.classList.add('negative');
		valueIcon.innerHTML = `&nbsp;<i class="fas fa-arrow-down"></i>`;
	} else if (int > 0) {
		valueInt.classList.remove('negative');
		valueInt.classList.remove('neutral');
		valueInt.classList.add('positive');
		valueIcon.innerHTML = `&nbsp;<i class="fas fa-arrow-up"></i>`;
	}
}

let labelArr;

function labelInputer(chart) {
	let labelCtr = chart.data.labels.length;

	if (labelCtr >= 0 && labelCtr < 11) {
		chart.data.labels.unshift(labelArr[labelCtr]);
	}

	chart.update();
}

function dataInputer(chart, price, int) {
	if (chart.data.datasets[int].data.length === 11) {
		chart.data.datasets[int].data.shift();
		chart.data.datasets[int].data.push(price);
	} else {
		chart.data.datasets[int].data.push(price);
	}

	chart.update();
}

function highLow(data) {
	if (low.textContent === '') {
		low.textContent = data;
	}

	if (data > high.textContent) {
		high.textContent = data;
	}

	if (data < low.textContent) {
		low.textContent = data;
	}
	infoDiv.classList.add('infoActive');
}

const multiLabel = [
	[
		'0sec',
		'-30sec',
		'-1min',
		'-1.30',
		'-2min',
		'-2.30',
		'-3min',
		'-3.30',
		'-4min',
		'-4.30',
		'-5min',
	],
	[
		'0sec',
		'-1min',
		'-2min',
		'-3min',
		'-4min',
		'-5min',
		'-6min',
		'-7min',
		'-8min',
		'-9min',
		'-10min',
	],
	[
		'0sec',
		'-2min',
		'-4min',
		'-6min',
		'-8min',
		'-10min',
		'-12min',
		'-14min',
		'-16min',
		'-18min',
		'-20min',
	],
	[
		'0sec',
		'-5min',
		'-10min',
		'-15min',
		'-20min',
		'-25min',
		'-30min',
		'-35min',
		'-40min',
		'-45min',
		'-50min',
	],
];

// ==================================================
// HISTORICAL DATA CHART
// ==================================================

let chartType = 'bar';
let coinComparison;

const compChart = document.getElementById('compChart').getContext('2d');
let data = {
	labels: [],
	datasets: [
		{
			label: '',
			fill: false,
			data: [],
			backgroundColor: 'rgb(71, 207, 114)',
			borderColor: 'rgb(71, 207, 114)',
			borderCapStyle: 'square',
			pointBorderColor: 'white',
			pointBackgroundColor: 'rgb(71, 207, 114)',
			pointBorderWidth: 1,
			pointHoverRadius: 8,
			pointHoverBackgroundColor: 'rgba(19, 65, 145, 0.6)',
			pointHoverBorderColor: 'white',
			pointHoverBorderWidth: 2,
			pointRadius: 4,
			pointHitRadius: 10,
			spanGaps: true,
		},
		{
			label: '',
			fill: false,
			data: [],
			backgroundColor: 'rgb(0, 96, 255)',
			borderColor: 'rgb(0, 96, 255)',
			borderCapStyle: 'square',
			pointBorderColor: 'white',
			pointBackgroundColor: 'rgb(0, 96, 255)',
			pointBorderWidth: 1,
			pointHoverRadius: 8,
			pointHoverBackgroundColor: 'rgba(19, 65, 145, 0.6)',
			pointHoverBorderColor: 'white',
			pointHoverBorderWidth: 2,
			pointRadius: 4,
			pointHitRadius: 10,
			spanGaps: true,
		},
	],
};

let options = {
	scales: {
		yAxes: [
			{
				type: 'logarithmic',
				ticks: {
					userCallback: (value, index) => {
						const remain =
							value / Math.pow(10, Math.floor(Chart.helpers.log10(value)));
						if (remain == 1 || remain == 2 || remain == 5 || index == 0) {
							return value.toLocaleString();
						}
						return '';
					},
				},
			},
		],
	},
	title: {
		fontSize: 18,
		display: true,
		text: 'Historical Comparison Data',
		position: 'bottom',
	},
};

function init() {
	coinComparison = new Chart(compChart, {
		type: chartType,
		data: data,
		options: options,
	});
}
let searchItem;

function compSelect(text) {
	switch (text) {
		case 'EUR':
			searchItem = 'Euro';
			data.datasets[0].label = 'EUR';

			break;
		case 'GBP':
			searchItem = 'United Kingdom';
			data.datasets[0].label = 'GBP';

			break;
		case 'JPY':
			searchItem = 'Japan';
			data.datasets[0].label = 'JPY';

			break;
		case 'CHF':
			searchItem = 'Switzerland';
			data.datasets[0].label = 'CHF';

			break;
		default:
			searchItem = 'United Kingdom';
			data.datasets[0].label = 'GBP';
	}
	compSelect2(target);
}

let searchDate;

function compSelect2(target) {
	switch (target) {
		case '2010':
			searchDate = '2010';
			options.title.text += ' By Month';
			break;
		case '2011':
			searchDate = '2011';
			options.title.text += ' By Month';

			break;
		case '2012':
			searchDate = '2012';
			options.title.text += ' By Month';

			break;
		case '2013':
			searchDate = '2013';
			options.title.text += ' By Month';

			break;
		case '2014':
			searchDate = '2014';
			options.title.text += ' By Month';

			break;
		case '2015':
			searchDate = '2015';
			options.title.text += ' By Month';

			break;
		case '2016':
			searchDate = '2016';
			options.title.text += ' By Month';

			break;
		case '2017':
			searchDate = '2017';
			options.title.text += ' By Month';

			break;
		case 'Average':
			options.title.text += ' By Year';

			break;
		default:
			searchDate = '2010';
			options.title.text += ' By Month';
	}

	compSelect3(text2);
}

let searchItem2;

function compSelect3(text) {
	switch (text) {
		case 'EUR':
			searchItem2 = 'Euro';
			data.datasets[1].label = 'EUR';

			break;
		case 'GBP':
			searchItem2 = 'United Kingdom';
			data.datasets[1].label = 'GBP';

			break;
		case 'JPY':
			searchItem2 = 'Japan';
			data.datasets[1].label = 'JPY';

			break;
		case 'CHF':
			searchItem2 = 'Switzerland';
			data.datasets[1].label = 'CHF';

			break;
		default:
			searchItem2 = 'Euro';
			data.datasets[1].label = 'EUR';
	}
	fetchCurrency();
}

let jsonObj;

const fetchCurrency = async () => {
	try {
		const response = await fetch('/historicalfetch', {
			method: 'GET',
			mode: 'same-origin',
		});
		const data = await response.json();
		jsonObj = data;
		if (target === 'Average') {
			countryParser(searchItem, searchItem2);
		} else {
			currencySearch(searchItem, searchItem2);
		}
	} catch (e) {
		error2.classList.add('errorDisplay');
		setTimeout(() => {
			error2.classList.remove('errorDisplay');
			error2.classList.add('errorText');
			selectClear();
		}, 4000);
		console.log(e);
	}
};

let countryArr = [];
let countryArr2 = [];

function countryParser(country, country2) {
	let count = 0;
	for (let i = 0; i < jsonObj.length; i++) {
		if (
			jsonObj[i].Country === country &&
			jsonObj[i].Date.substring(0, 5) > '2000'
		) {
			countryArr[count++] = jsonObj[i];
		}
	}
	count = 0;
	for (let i = 0; i < jsonObj.length; i++) {
		if (
			jsonObj[i].Country === country2 &&
			jsonObj[i].Date.substring(0, 5) > '2000'
		) {
			countryArr2[count++] = jsonObj[i];
		}
	}
	if (countryArr >= countryArr2) {
		yearLabelParser(countryArr);
	} else {
		yearLabelParser(countryArr2);
	}
}

let dateData = [];
let uniqueYear;

function yearLabelParser(arr) {
	let count = 0;
	for (let i = 0; i < arr.length; i++) {
		dateData[count++] = arr[i].Date.slice(0, 4);
	}
	uniqueYear = dateData.filter(onlyUnique);
	valueRetreval(countryArr);
	valueRetreval(countryArr2);
}

function onlyUnique(value, index, self) {
	return self.indexOf(value) === index;
}

let valueArr = [];
let valueArr2 = [];
let count = 0;
let incrementCount = 0;
let cumulativeValue = 0;

function valueRetreval(arr) {
	let arrCapture = arr;
	for (let i = 0; i < arr.length; i++) {
		if (arr[i].Date.search(uniqueYear[count]) !== -1) {
			cumulativeValue += arr[i].Value;
			incrementCount++;
		}
	}
	if (arr === countryArr) {
		valueArr[count] = cumulativeValue;
	} else {
		valueArr2[count] = cumulativeValue;
	}

	cumulativeValue = 0;
	valueAverage(arrCapture);
}

function valueAverage(arr) {
	let arrCapture = arr;
	if (arr === countryArr) {
		let newVal = valueArr[count] / incrementCount;
		valueArr[count] = newVal;
	} else {
		let newVal = valueArr2[count] / incrementCount;
		valueArr2[count] = newVal;
	}

	count++;
	incrementCount = 0;
	if (count < uniqueYear.length) {
		valueRetreval(arrCapture);
	} else {
		count = 0;
		if (arrCapture === countryArr) {
			rounder(valueArr);
		} else {
			rounder(valueArr2);
		}
	}
}

function rounder(arr) {
	for (let i = 0; i < arr.length; i++) {
		let rounded = Math.round(arr[i] * 100) / 100;
		arr[i] = rounded;
	}
	if (arr === valueArr2) {
		dataInputer3(valueArr, valueArr2, uniqueYear);
	}
}

function dataInputer3(arrVal1, arrVal2, arrLabels) {
	for (let i = 0; i < arrVal1.length; i++) {
		data.datasets[0].data.push(arrVal1[i]);
	}
	for (let i = 0; i < arrVal2.length; i++) {
		data.datasets[1].data.push(arrVal2[i]);
	}
	for (let i = 0; i < arrLabels.length; i++) {
		data.labels.push(arrLabels[i]);
	}

	init();
}

let newArr = [];
let newArr2 = [];

function currencySearch(item, item2) {
	let count = 0;
	if (item) {
		for (let i = 0; i < jsonObj.length; i++) {
			if (
				jsonObj[i].Country === item &&
				jsonObj[i].Date.search(searchDate) !== -1
			) {
				newArr[count++] = jsonObj[i];
			}
		}
	}
	count = 0;
	if (item2) {
		for (let i = 0; i < jsonObj.length; i++) {
			if (
				jsonObj[i].Country === item2 &&
				jsonObj[i].Date.search(searchDate) !== -1
			) {
				newArr2[count++] = jsonObj[i];
			}
		}
	}
	dataInputer2(newArr, newArr2);
}

function dataInputer2(arr1, arr2) {
	for (let i = 0; i < arr1.length; i++) {
		data.datasets[0].data.push(arr1[i].Value);
	}
	for (let i = 0; i < arr2.length; i++) {
		data.datasets[1].data.push(arr2[i].Value);
	}
	monthLabelInput();
}

function monthLabelInput() {
	for (let i = 0; i < monthLabel.length; i++) {
		data.labels.push(monthLabel[i]);
	}
	init();
}

const monthLabel = [
	'Jan',
	'Feb',
	'Mar',
	'Apr',
	'May',
	'Jun',
	'Jul',
	'Aug',
	'Sep',
	'Oct',
	'Nov',
	'Dec',
];

function toggleChart() {
	coinComparison.destroy();
	chartType = chartType === 'bar' ? 'line' : 'bar';
	init();
}
// ================================================
// CLOCK
// ================================================
class DigitalClock {
	constructor(element) {
		this.element = element;
	}

	start() {
		this.update();
		setInterval(() => {
			this.update();
		}, 500);
	}

	update() {
		const parts = this.getTimeParts();
		const minuteFormatted = parts.minute.toString().padStart(2, '0');
		const londonHour = parts.hour;
		const hourFormatted = parts.hour + timeAdder;
		const timeFormatted = `${hourFormatted}:${minuteFormatted}`;
		const londonTime = `${londonHour}:${minuteFormatted}`;
		const ampm = parts.isAm ? 'AM' : 'PM';

		if (customTitleSpan.innerText === 'Currency') {
			this.element.querySelector('.clock-time').textContent = londonTime;
			this.element.querySelector('.clock-ampm').textContent = ampm;
		} else {
			this.element.querySelector('.clock-time').textContent = timeFormatted;
			this.element.querySelector('.clock-ampm').textContent = ampm;
		}
	}
	getTimeParts() {
		const now = new Date();
		return {
			hour: now.getHours() % 12 || 12,
			minute: now.getMinutes(),
			isAm: now.getHours() < 12,
		};
	}
}
const clockElement = document.querySelector('.clock');
const clockObject = new DigitalClock(clockElement);

clockObject.start();

// ==================================================
// RESET
// ==================================================

function selectClear() {
	coinInt.textContent = 0;
	valueInt.textContent = 0;
	valueIcon.innerHTML = '';
	customTitleSpan.innerText = 'Currency';
	customTitleSpan2.innerText = 'Interval';
	customTitleSpan3.innerText = 'Currency';
	customTitleSpan4.innerText = 'Year/Avg';
	customTitleSpan5.innerText = 'Comparison';
	coinType.textContent = '';
	options.title.text = 'Historical Comparison Data';
	clockCapital.textContent = 'London';
	storageClear();
	highLowClear();
	valuesClear();
	stop(timeStop);
	timeStop = '';
	timeAdder = 0;
	removeData(coinTracker, 0, 1);
}

function storageClear() {
	localStorage.firstValue = '';
	localStorage.secondValue = '';
}

function highLowClear() {
	low.textContent = '';
	high.textContent = '';
	infoDiv.classList.remove('infoActive');
}

function valuesClear() {
	coinInt.textContent = '';
	valueInt.textContent = '';
}

function removeData(chart, int, int2) {
	chart.data.labels = [];
	data.labels = [];
	chart.data.datasets[int].data = [];
	data.datasets[int].data = [];
	data.datasets[int].label = '';
	data.datasets[int2].data = [];
	data.datasets[int2].label = '';
	clockObject.start();

	arrayCleaner();
	chart.update();
	init();
}

function arrayCleaner() {
	countryArr = [];
	countryArr2 = [];
	valueArr = [];
	valueArr2 = [];
	dateData = [];
	uniqueYear = [];
	newArr = [];
	newArr2 = [];
	dateData = [];
}

// ==========================================
// ==========================================
