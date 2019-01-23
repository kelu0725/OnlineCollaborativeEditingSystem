const mongoose = require("mongoose")
require("dotenv").config();
const db = process.env.DB_CON;

mongoose.connect(db)


const problemModel = mongoose.model("problems");
//get problems
const getProblems = problemModel.find({}, function(err,problem) {
  if(err){
    throw err;
  }else{
    return problem;
  }
})

//get problems
const getProblem = function(id){
  problem.Model.find({id:id}, function(err, problem){
    if(err) {
      throw err;
    }else 
     return new Promise(problem => problem.id===id);
   }
}

//post problems
const addProblem = function(newProblem){

}
n
