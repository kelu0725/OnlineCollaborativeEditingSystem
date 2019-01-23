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
    }, {
      "id": 3,
      "name": "Four Sum",
      "desc": "Given an array of integers, return indices of the two numbers such that they add up to a specific target.You may assume that each input would have exactly one solution, and you may not use the same element twice.",
      "difficulty": "medium"
    }, {
      "id": 4,
      "name": "Five Sum",
      "desc": "Given an array of integers, return indices of the two numbers such that they add up to a specific target.You may assume that each input would have exactly one solution, and you may not use the same element twice.",
      "difficulty": "hard"
    }
  ]

const getProblems = function(){
  return new Promise((resolve, reject) => {
    resolve(problems);
  });
}

const getProblem = function(id){
  return new Promise((resolve, reject) => {
    resolve(problems.find(problem => problem.id === id));
  })
}

const addProblem = function(newProblem){
   return new Promise((resolve, reject) => {
     if(problems.find((problem) => problem.name===newProblem.name)){
       reject("Problem exists!")
     }else{
       newProblem.id = problems.length+1;
       problems.push(newProblem);
       resolve(newProblem)
     }
   });
}
module.exports = {
  getProblems,
  getProblem,
  addProblem
}
