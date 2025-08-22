import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
	res.send('Testing API');
});

import teamsRouter from './src/routes/teams.router.js';
app.use('/api', teamsRouter);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
