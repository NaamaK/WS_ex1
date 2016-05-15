
var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://db_usr:db_pass@ds023570.mlab.com:23570/stud_grades');

var students = require('./student').Student;
var grades = require('./student').Grades;

mongoose.connection.once('open', function(){
	students.find({}, function(err, studentsDB) {
		if(err) throw err;
		students= studentsDB;
	});
	grades.find({}, function(err, gradesDB) {
		if(err) throw err;
		grades= gradesDB;
	});
	//mongoose.disconnect();
});

// function that returns info about every students.
exports.getAllStudents = function() {
	return students;
}

// function that gets student name as a parameter and returns his grade.
exports.getStudGrade = function(studName) {
	var result;
	grades.forEach(function(key, value) {
		if(grades[value].name == studName) result= JSON.stringify(grades[value].grade);
	});
	return result;
}

// function that get a grade as a parameter and returns a list of 
// all students with grade that is equal or bigger.
exports.getStudsOverGrade = function(grade) {
	var arrResult = [];
	grades.forEach(function(key, value) {
		if(grades[value].grade >= grade) {
			students.forEach(function(key2, value2) {
				if(students[value2].name == grades[value].name) {
					arrResult.push(students[value2]);
				}
			});
		}
	});
	return arrResult;
}