var express = require('express');

var app = express();
var port = process.env.PORT || 8080;

var fs = require('fs');
var studObj = JSON.parse(fs.readFileSync('./data/students.json', 'utf8'));
var gradeObj = JSON.parse(fs.readFileSync('./data/grades.json', 'utf8'));

app.get('/', function(req, res) {
	res.send(studObj);
});

app.get('/:value', function(req, res) {
	var value = req.params.value;
	if (value >= 0 && value <= 100) {
		res.send(getStudsByGrade(value));
	} else  {
		res.send(getStudGrade(value));
	}
});

var getStudGrade = function(studName) {
	var result;
	studObj.forEach(function(key, value) {
		if(studObj[value].name == studName) result= JSON.stringify(studObj[value].age);
	});
	return result;
}

var getStudsByGrade = function(grade) {
	var jsonObj= '[]';
	gradeObj.forEach(function(key, value) {
		if(gradeObj[value].grade >= grade) {
			studObj.forEach(function(key2, value2) {
				if(studObj[value2].name == gradeObj[value].name) {
					var parsed= JSON.parse(jsonObj);
					parsed.push(studObj[value2]);
					jsonObj= JSON.stringify(parsed);
				}
			});
		}
	});
	return JSON.parse(jsonObj);
}

app.listen(port);
console.log('listening on port ' + port);