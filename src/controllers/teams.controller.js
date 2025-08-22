import fs from 'fs';

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

export const getAllTeams = (req, res) => {
	const data = readData();

	if (!data) {
		return res.status(404).json({ error: 'Teams not found' });
	}

	res.json(data.teams);
};

export const getTeamById = (req, res) => {
	const data = readData();
	const id = parseInt(req.params.id);
	const team = data.teams.find((team) => team.id === id);

	if (!team) {
		return res.status(404).json({ error: 'Team not found' });
	}

	res.json(team);
};

export const createTeam = (req, res) => {
	const data = readData();
	const body = req.body;
	const newTeam = {
		id: data.teams.length + 1,
		...body,
	};
	data.teams.push(newTeam);
	writeData(data);
	res.status(201).json(newTeam);
};

export const updateTeam = (req, res) => {
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
};

export const deleteTeam = (req, res) => {
	const data = readData();
	const id = parseInt(req.params.id);
	const teamIndex = data.teams.findIndex((team) => team.id === id);
	data.teams.splice(teamIndex, 1);
	writeData(data);
	res.json({ message: 'Team deleted successfully' });
};
