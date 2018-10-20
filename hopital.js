const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
var db = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "web_service",
	port: "3306"
});

//’extraire les données de notre requête POST
app.use(bodyParser.urlencoded({ extended: true }));



















/*--------------------------------filtre--------------------------------*/

//id_filtre qualite perte_calite

//date=    int=   string=  

//post
app.post('/filtre', function(req, res) {
	var qualite = req.body.qualite;
	var perte_qualite = req.body.perte_qualite;
	var date_installation = req.body.date_installation;
	var query = "INSERT INTO filtre (qualite, perte_qualite, date_installation) VALUES ('" + qualite +"', '"+ perte_qualite + "','"+ date_installation + "')";
	db.query(query, function(err, result, fields) {
		if (err) throw err;
		res.send(JSON.stringify("Success"));
	});
});

//filtre
app.get('/filtre', function(req, res) {
	db.query("SELECT * FROM filtre", function(err, result, fields) {
		if(err) throw err;
		var response = { "qualite" : "perte_qualite" , "date_installation" : result };
		res.send(JSON.stringify(response));
	});
});
app.get('/filtre/:id', function(req, res) {
	var id = req.params.id;
	var query = "SELECT * FROM filtre WHERE id_filtre=" + id;
	db.query(query, function(err, result, fields) {
		if (err) throw err;
		res.send(JSON.stringify(result));
	});
});

//put
app.put('/filtre/:id', function(req, res) {
	var id_filtre = req.params.id;
	var qualite = req.body.qualite;
	var perte_qualite = req.body.perte_qualite;
	var date_installation = req.body.date_installation;
	var query = "UPDATE filtre SET qualite = '" + qualite + "' , perte_qualite= '" + perte_qualite +"', date_installation= '"+ date_installation + "' WHERE id_filtre="
	+ id_filtre;
	db.query(query, function(err, result, fields) {
		if (err) throw err;
		res.send(JSON.stringify("Success"));
	});
});

//delete
app.delete('/filtre', function(req, res) {
	var query = "DELETE FROM filtre";
	db.query(query, function(err, result, fields) {
		if (err) throw err;
		res.send(JSON.stringify("Success"));
	});
});
app.delete('/filtre/:id', function(req, res) {
	var id = req.params.id;
	var query = "DELETE FROM filtre WHERE id_filtre=" + id;
	db.query(query, function(err, result, fields) {
		if (err) throw err;
		res.send(JSON.stringify("Success"));
	});
});


















/*--------------------------------chambre--------------------------------*/

//id_chambre capacite seuil_critique id_filtre

//post
app.post('/chambre', function(req, res) {
	var capacite = req.body.capacite;
	var seuil_critique = req.body.seuil_critique;
	var id_filtre = req.body.id_filtre;
	var query = "INSERT INTO chambre ( capacite , seuil_critique ,  id_filtre) VALUES ('" + capacite +"', '"+ seuil_critique + "','"+ id_filtre + "')";
	db.query(query, function(err, result, fields) {
		if (err) throw err;
		res.send(JSON.stringify("Success"));
	});
});

//chambre
app.get('/chambre', function(req, res) {
	db.query("SELECT * FROM chambre", function(err, result, fields) {
		if(err) throw err;
		var response = { "capacite": "seuil_critique", "id_filtre" : result };
		res.send(JSON.stringify(response));
	});
});
app.get('/chambre/:id', function(req, res) {
	var id = req.params.id;
	var query = "SELECT * FROM chambre WHERE id_chambre=" + id;
	db.query(query, function(err, result, fields) {
		if (err) throw err;
		res.send(JSON.stringify(result));
	});
});

//put
app.put('/chambre/:id', function(req, res) {
	var id_chambre = req.params.id;
	var capacite = req.body.capacite;
	var seuil_critique = req.body.seuil_critique;
	var id_filtre = req.body.id_filtre;
	var query = "UPDATE chambre SET capacite = '" + capacite + "' , seuil_critique= '" + seuil_critique +"', id_filtre= '"+ id_filtre + "' WHERE id_chambre="
	+ id_chambre;
	db.query(query, function(err, result, fields) {
		if (err) throw err;
		res.send(JSON.stringify("Success"));
	});
});

//delete
app.delete('/chambre', function(req, res) {
	var query = "DELETE FROM chambre";
	db.query(query, function(err, result, fields) {
		if (err) throw err;
		res.send(JSON.stringify("Success"));
	});
});
app.delete('/chambre/:id', function(req, res) {
	var id = req.params.id;
	var query = "DELETE FROM chambre WHERE id_chambre=" + id;
	db.query(query, function(err, result, fields) {
		if (err) throw err;
		res.send(JSON.stringify("Success"));
	});
});





















/*--------------------------------patient--------------------------------*/

//id_patients nom prenom date_naissance date_entre


//post
app.post('/patient', function(req, res) {
	var nom = req.body.nom;
	var prenom = req.body.prenom;
	var date_naissance = req.body.date_naissance;
	var date_entre = req.body.date_entre;
	var query = "INSERT INTO patient (nom, prenom, date_naissance, date_entre) VALUES ('" + nom +"', '"+ prenom + "','"+ date_naissance + "' ,'"+ date_entre + "')";
	db.query(query, function(err, result, fields) {
		if (err) throw err;
		res.send(JSON.stringify("Success"));
	});
});

//patient
app.get('/patient', function(req, res) {
	db.query("SELECT * FROM patient", function(err, result, fields) {
		if(err) throw err;
		var response = { "nom": "prenom", "date_entre": result };
		res.send(JSON.stringify(response));
	});
});
app.get('/patient/:id', function(req, res) {
	var id = req.params.id;
	var query = "SELECT * FROM patient WHERE id_patient=" + id;
	db.query(query, function(err, result, fields) {
		if (err) throw err;
		res.send(JSON.stringify(result));
	});
});

//put
app.put('/patient/:id', function(req, res) {
	var id_patient = req.params.id;
	var nom = req.body.nom;
	var prenom = req.body.prenom;
	var date_naissance = req.body.date_naissance;
	var date_entre = req.body.date_entre;
	var query = "UPDATE patient SET nom = '" + nom + "' , prenom= '" + prenom +"', date_naissance= '"+ date_naissance + "' , date_entre= '"+ date_entre + "' WHERE id_patient="
	+ id_patient;
	db.query(query, function(err, result, fields) {
		if (err) throw err;
		res.send(JSON.stringify("Success"));
	});
});

//delete
app.delete('/patient', function(req, res) {
	var query = "DELETE FROM patient";
	db.query(query, function(err, result, fields) {
		if (err) throw err;
		res.send(JSON.stringify("Success"));
	});
});
app.delete('/patient/:id', function(req, res) {
	var id = req.params.id;
	var query = "DELETE FROM patient WHERE id_patient=" + id;
	db.query(query, function(err, result, fields) {
		if (err) throw err;
		res.send(JSON.stringify("Success"));
	});
});






























/*--------------------------------personnel--------------------------------*/
//id_personnel prenom nom fonction salaire

//post
app.post('/personnel', function(req, res) {
	var nom = req.body.nom;
	var prenom = req.body.prenom;
	var fonction = req.body.fonction;
	var salaire = req.body.salaire;
	var query = "INSERT INTO personnel (nom, prenom, fonction, salaire) VALUES ('" + nom +"', '"+ prenom + "','"+ fonction + "' ,'"+ salaire + "')";
	db.query(query, function(err, result, fields) {
		if (err) throw err;
		res.send(JSON.stringify("Success"));
	});
});

//personnel
app.get('/personnel', function(req, res) {
	db.query("SELECT * FROM personnel", function(err, result, fields) {
		if(err) throw err;
		var response = { "nom": "prenom", "salaire": result };
		res.send(JSON.stringify(response));
	});
});
app.get('/personnel/:id', function(req, res) {
	var id = req.params.id;
	var query = "SELECT * FROM personnel WHERE id_personnel=" + id;
	db.query(query, function(err, result, fields) {
		if (err) throw err;
		res.send(JSON.stringify(result));
	});
});

//put
app.put('/personnel/:id', function(req, res) {
	var id_personnel = req.params.id;
	var nom = req.body.nom;
	var prenom = req.body.prenom;
	var fonction = req.body.fonction;
	var salaire = req.body.salaire;
	var query = "UPDATE personnel SET nom = '" + nom + "' , prenom= '" + prenom +"', fonction= '"+ fonction + "' , salaire= '"+ salaire + "' WHERE id_personnel="
	+ id_personnel;
	db.query(query, function(err, result, fields) {
		if (err) throw err;
		res.send(JSON.stringify("Success"));
	});
});

//delete
app.delete('/personnel', function(req, res) {
	var query = "DELETE FROM personnel";
	db.query(query, function(err, result, fields) {
		if (err) throw err;
		res.send(JSON.stringify("Success"));
	});
});
app.delete('/personnel/:id', function(req, res) {
	var id = req.params.id;
	var query = "DELETE FROM personnel WHERE id_personnel=" + id;
	db.query(query, function(err, result, fields) {
		if (err) throw err;
		res.send(JSON.stringify("Success"));
	});
});




































/*------------------------------ecoute-------------------------------*/

app.listen(3000, function() {
	db.connect(function(err) {
		if(err) throw err;
		console.log('Connection to database successful!');
	});
	console.log('Example app listening on port 3000!');
});







