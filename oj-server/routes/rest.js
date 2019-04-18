//This file is used to route to different modules in client
const express = require("express")
const router = express.Router();
const problemService = require("../services/problemService")
const bodyParser = require("body-parser")
const jsonParser = bodyParser.json()
const nodeRestClient = require('node-rest-client').Client;
const restClient = new nodeRestClient();

EXCUTOR_SERVER_URL = 'http://localhost:5000/result';//flask的endpoint

restClient.registerMethod('result', EXCUTOR_SERVER_URL, 'POST');


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

// post submit
router.post("/result", jsonParser, (req, res) => {
  const userCodes = req.body.userCodes;
  const lang = req.body.lang;
  // console.log('lang:' + lang + "userCode:"+userCodes);
  // res.json('text':'hehehehehe');

  //build( array including data and headers, function)
  //传入要用的data, 把传入的data，
  restClient.methods.result(
    {
      data : {code : userCodes, lang: lang},
      headers : {'Content-Type':'application/json'}
    },
    (data, response) => {
      //data{build:xxx, run:xxx}
      //data里有个变量叫做build, 另一个叫做run
      //localization:
      const text = `Build output: ${data['build']}, Execute output: ${data['run']}`;
      data['text'] = text;
      res.json(data);
    }
  )
})


module.exports = router;
