const Student = require("./Student")
const Course = require("./Course")

Course.belongsToMany(Student, { through: "courseStudents" }) //here is in plural because we want to save this in our db in singular
Student.belongsToMany(Course, { through: "courseStudents" })