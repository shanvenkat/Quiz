var express = require('express');
var router = express.Router();

// custom function..
function toLower (v) {
	return v.toLowerCase();
}

function formatDate(d) {
	var dd = d.getDate()
  if ( dd < 10 ) dd = '0' + dd
  		var mm = d.getMonth()+1
  if ( mm < 10 ) mm = '0' + mm
		  var yyyy = d.getFullYear() % 100
  if ( yyyy < 10 ) yyyy = '0' + yyyy
	  return mm+'-'+dd+'-'+yyyy
}

// moongoose DB Connection
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
mongoose.connect('mongodb://localhost/test');


var registerschema = new Schema ({	
	email: String,	
	password: String
})


var registermodels = mongoose.model('registermodels', registerschema);
 
//AddUser for Register schema
router.post('/registeruser/:email/:password', function(req, res) {
	var stremail = req.params.email;
	var strpassword = req.params.password;
	
	registermodels.create({email:stremail,password:strpassword}, function(err){
		if (err) // ...  			
  			console.log(stremail + " " + strpassword  +  ' failed');
		else
		{
			console.log(stremail + " " + strpassword  + ' successfully added');	
			registermodels.find(function (err, registerlists) {
			   	if (err) return console.error(err);	
			   	else  	 
			   		{
			   			res.json(registerlists);
			   		}	   		
			});
		}
	});
});


// Read from Travel Required Model
router.get('/validatelogin/:email/:password', function(req, res) {
	var stremail = req.params.email;
	var strpassword = req.params.password;
	registermodels.find({email:stremail, password:strpassword }, function (err, validateloginjson) {
	   if (err) return console.error(err);	  	 
	   		res.json(validateloginjson);	 
	});
});



// Register ID Deletet Express Router
router.delete('/registerdelete/', function(req, res) {
	registermodels.remove( function(err){
	if (err) // ...
  		{console.log(' Register Delete failed');}
  	else
		{
			{console.log(' - Delete success');}	
			registermodels.find(function (err, registerlists) {
			   	if (err) return console.error(err);	  	 
			   	res.json(registerlists);	   		
			});
		}
	});	 
});

module.exports = router;