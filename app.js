import express from 'express';
const app = express();
import fetch from 'node-fetch';
import path from 'path';
const __dirname = path.resolve();
import cors from 'cors';

const port = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname)));
app.use('/styles', express.static(__dirname));
app.use('/images', express.static(__dirname + '/images'));
app.use('/scripts', express.static(__dirname + '/scripts'));

app.use(cors());

app.get('/', function (req, res) {
	res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.get('/cointracker', function (req, res) {
	res.sendFile(path.join(__dirname + '/views/cointracker.html'));
});

app.get('/currencyfetch', async (req, res) => {
	const curVal = req.headers.currencyvalue;
	try {
		const response = await fetch(
			`https://api.cryptonator.com/api/ticker/btc-${curVal}`
		);

		// const data = await response.json();
		console.log(response);
		res.status(200).send(response);
	} catch (e) {
		console.log(e);
		res.status(503).send(e);
	}
});

app.get('/historicalfetch', async (req, res) => {
	try {
		const response = await fetch(
			'https://pkgstore.datahub.io/core/exchange-rates/monthly_json/data/2f6410b9ec898d29ee88035df7f7652d/monthly_json.json'
		);

		const data = await response.json();
		res.status(200).send(data);
	} catch (e) {
		console.log(e);
		res.status(500).send(e);
	}
});

app.listen(port, err => {
	if (err) console.log('Error in server setup:', err);
	console.log('Server listening on:', port);
});
