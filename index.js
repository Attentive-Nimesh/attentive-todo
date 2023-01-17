const express = require('express');
const moongoose = require('mongoose');

const PORT = 8080;
const URI = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.hfbiv.mongodb.net/${process.env.MONGO_NAME}`;

const routes = require('./routes');
const setheaders = require('./middleware');

const app = express();

app.use(express.json());
app.use(setheaders);
app.use(routes);

app.use((req, res) => {
	res.status(500).json({ error: 'an unexpexted error occured' });
});

moongoose.set('strictQuery', false);

moongoose
	.connect(URI)
	.then(() => {
		app.listen(PORT, () => {
			console.log(`Server listening at ${PORT}`);
		});
	})
	.catch((err) => {
		console.log(err);
	});
