/*
* Lets define group of routers using exporess router.
*
*/

// Dependancies
import express from "express";
import testData from "../src/testData.json";

const router = express.Router();
const contests = testData.contests.reduce((obj, contest) => {
	obj[contest.id] = contest;
	return obj;
}, {});

router.get('/contests', (req, res) => {
	res.send({ contests: contests });
});

router.get('/contests/:id', (req, res) => {
	let contestId = req.params.id;
	let contest = contests[contestId];

	contest.description = "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."

	res.send(contest);
});

export default router;