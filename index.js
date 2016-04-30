var express = require('express');

var app = express();
var port = process.env.PORT || 8080;

var fs = require('fs');
var studObj = JSON.parse(fs.readFileSync('./students.json', 'utf8'));
var gradeObj = JSON.parse(fs.readFileSync('./grades.json', 'utf8'));

app.get('/', function(req, res) {
	res.send(studObj);
});

app.get('/:value', function(req, res) {
	var value = req.params.value;
	if (value >= 0 && value <= 100) {
		getStudsByGrade(value);
	} else {
		res.send(getStudGrade(value));
	}
});

var getStudGrade = function(studName) {
	studObj.forEach(function(key, value) {
		if(studObj[value].name == studName) {
			return (JSON.stringify(studObj[value].age));
		}
	});
}

var getStudsByGrade = function(grade) {
	gradeObj.forEach(function(key, value) {
		if(gradeObj[value].grade >= grade) {
			studObj.forEach(function(key2, value2) {
				if(studObj[value2].name == gradeObj[value].name) {
					console.log(studObj[value2]);
				}
			});
			//res.send(JSON.stringify(studObj[value].age));
		}
	});
}

app.listen(port);
console.log('listening on port ' + port);