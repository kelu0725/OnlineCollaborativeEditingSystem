const express = require("express")
const router = express.Router();
const problemService = require("../services/problemService")
const bodyParser = require("body-parser")
const jsonParser = bodyParser.json()

//get problems
router.get("/problems", (req, res) => { //then return a promise
  problemService.getProblems()
   .then((problems) => res.json(problems));
})

//get problem: forgot to parse id
router.get("/problems/:id", (req, res) => {
  const id = req.params.id;
  problemService.getProblem(+id)
  .then((problem) => res.json(problem));
})

//post problems
router.post("/problems", jsonParser, (req, res) => {
  problemService.addProblem(req.body)
  .then(
    (problem) => res.json(problem),
    (error) => res.status(400).send("Problem is invalid!"));
})

module.exports = router;
