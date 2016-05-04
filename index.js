var express = require('express');
var wsFuncs = require('./wsFuncs');

var app = express();
var port = process.env.PORT || 8080;


app.get('/', function(req, res) {
	res.send("Welcome to my Web Server");
});

app.get('/allStudents', function(req, res) {
	res.send(wsFuncs.getAllStudents());
});

app.get('/studentsOverGrade/:value', function(req, res) {
	var value = req.params.value;
	res.send(wsFuncs.getStudsOverGrade(value));
});

app.get('/studentGradeByName/:value', function(req, res) {
	var value = req.params.value;
	res.send(wsFuncs.getStudGrade(value));
});

app.listen(port);
console.log('listening on port ' + port);