import { Router } from 'express';
import {
	getAllTeams,
	getTeamById,
	createTeam,
	updateTeam,
	deleteTeam,
} from '../controllers/teams.controller.js';

const router = Router();

router.get('/teams', getAllTeams);
router.get('/teams/:id', getTeamById);
router.post('/teams', createTeam);
router.put('/teams/:id', updateTeam);
router.delete('/teams/:id', deleteTeam);

export default router;
