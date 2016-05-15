var mongoose = require('mongoose');
var schema = mongoose.Schema;


var studSchema = new schema({
	name: {type:String, required:true},
	age: Number,
	city: String,
	_id: {type:String, select:false}
}, {collection: 'students'});

exports.Student = mongoose.model('Student', studSchema);


var gradeSchema = new schema({
	name: {type:String, required:true},
	grade: Number,
	_id: {type:String, select:false}
}, {collection: 'grades'});

exports.Grades = mongoose.model('grades', gradeSchema);