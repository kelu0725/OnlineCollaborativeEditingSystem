const ProblemModel = require("../models/problemModel");

let problems = [{
  "id": 1,
   "name": "Two Sum",
   "desc": "Given an array of integers, return indices of the two numbers such that they add up to a specific target.You may assume that each input would have exactly one solution, and you may not use the same element twice.",
   "difficulty": "easy"
},
{
    "id": 2,
    "name": "Three Sum",
    "desc": "Given an array of integers, return indices of the two numbers such that they add up to a specific target.You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    "difficulty": "medium"
},
{
    "id": 3,
    "name": "Four Sum",
    "desc": "Given an array of integers, return indices of the two numbers such that they add up to a specific target.You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    "difficulty": "medium"
},
{
    "id": 4,
    "name": "Five Sum",
    "desc": "Given an array of integers, return indices of the two numbers such that they add up to a specific target.You may assume that each input would have exactly one solution, and you may not use the same element twice.",
    "difficulty": "hard"
}
]


// const getProblems = function(){
//   return new Promise((resolve, reject) => {
//     resolve(problems);
//   });
// }
//BELOWS connect to database
const getProblems = function(){
  return new Promise((resolve, reject) => {
    ProblemModel.find({},(err, problems) => {
      if(err){
        reject(err);
      }else{
        resolve(problems);
      }
    })
  })
}
// const getProblem = function(id){
//   return new Promise((resolve, reject) => {
//     resolve(problems.find(problem => problem.id === id));
//   })
// }
const getProblem = function(id){
  return new Promise((resolve, reject) =>{
    ProblemModel.findOne({id: id}, (err, problem) => {
      if(err){
        reject(err);
      }else{
        resolve(problem)
    }
  });
  })
}

// const addProblem = function(newProblem){
//    return new Promise((resolve, reject) => {
//      if(problems.find((problem) => problem.name===newProblem.name)){
//        reject("Problem exists!")
//      }else{
//        newProblem.id = problems.length+1;
//        problems.push(newProblem);
//        resolve(newProblem)
//      }
//    });
// }
const addProblem = function(newProblem){
  return new Promise((resolve, reject) => {
    //check
    if(ProblemModel.findOne({name: newProblem.name}, function(err, problem){
       if(problem){
         reject("Problem already exists!");
       }else{
         ProblemModel.count({},function(err, data){
           if(data){
             newProblem.id = data+1;
             const monProblem = new ProblemModel(newProblem);
             monProblem.save();
             resolve(monProblem);
           }
         });
       }
     }));
   })
 }


module.exports = {
  getProblems,
  getProblem,
  addProblem
}
