const mongoose = require("mongoose");

const ProblemSchema = mongoose.Schema({
  id: Number,
  name: String,
  desc: String,
  difficulty: String
});
//the schema determines that it will have the first four keys
const ProblemModel = mongoose.model("ProblemModel",ProblemSchema);
//the instance is problemmodel-->use to save new doc to db

module.exports = ProblemModel;
