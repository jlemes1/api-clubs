import express from 'express';
import fs from 'fs';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json());
const PORT = 3000;

const readData = () => {
	try {
		const data = fs.readFileSync('./teams.json');
		return JSON.parse(data);
	} catch (error) {
		console.log(error);
	}
};

const writeData = (data) => {
	try {
		fs.writeFileSync('./teams.json', JSON.stringify(data));
	} catch (error) {
		console.log(error);
	}
};

app.get('/', (req, res) => {
	res.send('Testing API');
});

app.get('/teams', (req, res) => {
	const data = readData();

	if (!data) {
		return res.status(404).json({ message: 'Teams not found' });
	}

	res.json(data.teams);
});

app.get('/teams/:id', (req, res) => {
	const data = readData();
	const id = parseInt(req.params.id);
	const team = data.teams.find((team) => team.id === id);

	if (!team) {
		return res.status(404).json({ message: 'Team not found' });
	}

	res.json(team);
});

app.post('/teams', (req, res) => {
	const data = readData();
	const body = req.body;
	const newTeam = {
		id: data.teams.length + 1,
		...body,
	};
	data.teams.push(newTeam);
	writeData(data);
	res.status(201).json(newTeam);
});

app.put('/teams/:id', (req, res) => {
	const data = readData();
	const body = req.body;
	const id = parseInt(req.params.id);
	const teamIndex = data.teams.findIndex((team) => team.id === id);
	data.teams[teamIndex] = {
		...data.teams[teamIndex],
		...body,
	};
	writeData(data);
	res.json({ message: 'Team updated successfully' });
});

app.delete('/teams/:id', (req, res) => {
	const data = readData();
	const id = parseInt(req.params.id);
	const teamIndex = data.teams.findIndex((team) => team.id === id);
	data.teams.splice(teamIndex, 1);
	writeData(data);
	res.json({ message: 'Team deleted successfully' });
});

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
