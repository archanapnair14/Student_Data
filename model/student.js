const Mongoose = require("mongoose");
const studentSchema = Mongoose.Schema({
  name: String,
  rollno: Number,
  admno:{
    type : Number,
    required:true
  },
  college: String,
});
const StudentModel = Mongoose.model("students", studentSchema);
module.exports = {StudentModel}
