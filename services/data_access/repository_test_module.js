//get express framework
var express = require('express');
var app = express();
//get bodyparser middleware
var bodyParser = require('body-parser');
var CryptoJS = require('crypto-js');

var patientRepo = require('./patient_repository');
//TODO: Change this directory to the actual Model Folder
var patient = require('./PatientModel');
var mongodb = require('./db_connection.js');

app.use(bodyParser.json() );
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

//The variable that holds the db connection
var db;

//The test method to check all patientrepository function
app.get('/', function (req, res) {
    var userAccessTool = new PatientRepo(db);
    var newPatient = new patient(
        'req.body.fName',
        'req.body.lName',
        'req.body.username',
        'CryptoJS.PBKDF2(req.body.password,salt, { keySize: 128/32, iterations: 1000 }).toString()',
        'req.body.SQ1',
        'req.body.SQ2',
        'req.body.SQ3',
        'CryptoJS.SHA256(req.body.A1).toString(CryptoJS.enc.Hex)',
        'CryptoJS.SHA256(req.body.A2).toString(CryptoJS.enc.Hex)',
        'CryptoJS.SHA256(req.body.A3).toString(CryptoJS.enc.Hex)',
        'req.body.medicalProCode',
        'salt.toString()'
       );
    userAccessTool.Create(newPatient);
       //Checking the query for information of data
    userAccessTool.GetOne("req.body.username").then(function(value){
        var list=value;
        console.log(list);
        res.end("Values " + list[0].username); 
    });
    
});
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
    //Create the database connection and make the connection
    var connection = new mongodb();
    connection.Connect().then(function(value){
        db=value;
    }); 
    
 });