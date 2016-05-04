var fs = require('fs');

var dataObj = JSON.parse(fs.readFileSync('./data/studVsGrades.json', 'utf8'));
var students = dataObj.students;
var grades = dataObj.grades;

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