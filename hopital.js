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






//-----------------------------------------------jeton / parfeu -----------------------
//utillisateur tom
//apikey       tomtom


/*Implémentez un jeton ayant pour valeur “ceciestmonjeton​” afin d’accéder au service Web de
manière plus sécurisé.
Si le jeton n’est pas fourni où est incorrect, lancez une erreur HTTP 403.*/

/*app.use(function(req, res, next) {
	if ("key" in req.query) {
		var key = req.query["key"];
		key=SHA512(key);
		console.log(key);
		var query = "SELECT * FROM pare_feu WHERE apikey='" + key + "'";
		db.query(query, function(err, result, fields) {
			if (err) throw err;
			if (result.length > 0) {
				next();
			}
			else {
				res.send("Access denied");
			}
		});
	} else {
		res.send("Access denied");
	}
});
*/























/*--------------------------------filtre--------------------------------*/
//propriete:
//id_filtre qualite perte_qualite date_installation


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

//get
app.get('/filtre/:id', function(req, res) {
	var id = req.params.id;
	var query = "SELECT * FROM filtre WHERE id_filtre=" + id;
	db.query(query, function(err, result, fields) {
		if (err) throw err;
		res.send(JSON.stringify(result));
	});
});


    //--------------------------partie filtre dans filtre (lol)------------

//Créez une route /filter-stats en lecture uniquement qui affiche combien de temps il reste avantqu’il ne faille changer le filtre pour chacune des chambres.
app.get('/filter-stats', function(req, res) {
	db.query("SELECT chambre.seuil_critique, filtre.qualite, filtre.perte_qualite FROM Chambre, Filtre WHERE chambre.id_filtre = filtre.id_filtre", function(err, result, fields) {
		if(err) throw err;
		var response = { result };
		res.send(JSON.stringify(response));
		for(let i=0; i<result.length; i++) {
			let calcul = (result[i]["qualite"] - result[i]["seuil_critique"]) / result[i]["perte_qualite"]; //tableaux associatifs
			console.log(calcul);    		
    	};		
	});
});

//-------------------------------//
app.get('/filtre', function(req,res)
{

		//filtre de pagination : 
		//postma: http://localhost:3000/filtre?limit=1
		var query = "SELECT * FROM filtre";
		
		if("limit" in req.query)
		{k=1;
			query += " LIMIT " + req.query["limit"];
		}
		if ("offset" in req.query)
		{
			query += " OFFSET " + req.query["offset"];
		}
		if (k==1)
		{
				db.query(query, function(err, result, fields)
				{
					
					if(err) throw err;
					else res.send(JSON.stringify(result)); 
				});
				k=0;
		}


		//Filtre d’ordre
		//postman:http://localhost:3000/filtre?sort=-qualite,+perte_qualite

		var query = "SELECT * FROM filtre";
		if ("sort" in req.query) {
			k=1;
			var sort = req.query["sort"].split(",");
			query += " ORDER BY";
			for (var index in sort) {
				var direction = sort[index].substr(0, 1);
				var field = sort[index].substr(1);
				query += " " + field;
				if (direction == "-")
					query += " DESC,";
				else
					query += " ASC,";
			}
			query = query.slice(0, -1);
		}
		if (k==1)
		{
				db.query(query, function(err, result, fields)
				{
					
					if(err) throw err;
					else res.send(JSON.stringify(result)); 
				});
				k=0;
		}

		// get avec filtre de condition
		//postman: http://localhost:3000/filtre?qualite=80
		var query = "SELECT * FROM filtre";

		var conditions = ["id_filtre","qualite","perte_qualite","date_installation"];
		for(var i in conditions)
		{
			if(conditions[i] in req.query)
			{
				if(query.indexOf("WHERE")< 0)
				{k=1;
					query += " WHERE";
				}
				else {
					query += " AND";
				}
				query += " " + conditions[i] + "='" + req.query[conditions[i]] + "'";
			}

		}
		if (k==1)
		{
				db.query(query, function(err, result, fields)
				{
					
					if(err) throw err;
					else res.send(JSON.stringify(result)); 
				});
				k=0;
		}

		// filtre de champ
		//postman : http://localhost:3000/filtre?fields=qualite
		var query = "SELECT * FROM filtre";
		if ("fields" in req.query) 
		{k=1;
			query = query.replace("*", req.query["fields"]);
		}
		if (k==1)
		{
				db.query(query, function(err, result, fields)
				{
					
					if(err) throw err;
					else res.send(JSON.stringify(result)); 
				});
				k=0;
		}
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

//propriete:
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

//get
app.get('/chambre/:id', function(req, res) {
	var id = req.params.id;
	var query = "SELECT * FROM chambre WHERE id_chambre=" + id;
	db.query(query, function(err, result, fields) {
		if (err) throw err;
		res.send(JSON.stringify(result));
	});
});
    //get avec relation
    app.get('/chambre/:id/filtre', function(req, res) {
    	var id = req.params.id;
    	var query = "SELECT filtre.id_filtre, filtre.qualite,filtre.perte_qualite,filtre.date_installation FROM chambre INNER JOIN filtre ON chambre.id_filtre = filtre.id_filtre WHERE chambre.id_chambre=" + id;
    	db.query(query, function(err, result, fields) {
    		if (err) throw err;
    		res.send(JSON.stringify(result));
    	});
    });
    app.get('/chambre/:id_chambre/filtre/:id_filtre', function(req, res) {
    	var id_chambre = req.params.id_chambre;
    	var id_filtre = req.params.id_filtre;
    	var query = "SELECT filtre.id_filtre, filtre.qualite, filtre.perte_qualite, filtre.date_installation FROM chambre INNER JOIN filtre ON chambre.id_filtre = filtre.id_filtre WHERE chambre.id_chambre=" + id_chambre + " AND filtre.id_filtre=" +
    	id_filtre;
    	db.query(query, function(err, result, fields) {
    		if (err) throw err;
    		res.send(JSON.stringify(result));
    	});
    });


    //--------------------------partie filtre chambre------------


app.get('/chambre', function(req,res)
{

var k=0;

		//filtre de pagination : 
		//postma: http://localhost:3000/chambre?limit=1
		var query = "SELECT * FROM chambre";
		
		if("limit" in req.query)
		{k=1;
			query += " LIMIT " + req.query["limit"];
		}
		if ("offset" in req.query)
		{
			query += " OFFSET " + req.query["offset"];
		}
		if (k==1)
		{
				db.query(query, function(err, result, fields)
				{
					
					if(err) throw err;
					else res.send(JSON.stringify(result)); 
				});
				k=0;
		}


		//Filtre d’ordre
		//postman:http://localhost:3000/chambre?sort=+seuil_critique

		var query = "SELECT * FROM chambre";
		if ("sort" in req.query) {
			k=1;
			var sort = req.query["sort"].split(",");
			query += " ORDER BY";
			for (var index in sort) {
				var direction = sort[index].substr(0, 1);
				var field = sort[index].substr(1);
				query += " " + field;
				if (direction == "-")
					query += " DESC,";
				else
					query += " ASC,";
			}
			query = query.slice(0, -1);
		}
		if (k==1)
		{
				db.query(query, function(err, result, fields)
				{
					
					if(err) throw err;
					else res.send(JSON.stringify(result)); 
				});
				k=0;
		}

		// get avec filtre de condition
		//postman: http://localhost:3000/chambre?capacite=2
		var query = "SELECT * FROM chambre";

		var conditions = ["id_chambre","capacite","seuil_critique","id_filtre"];
		for(var i in conditions)
		{
			if(conditions[i] in req.query)
			{
				if(query.indexOf("WHERE")< 0)
				{k=1;
					query += " WHERE";
				}
				else {
					query += " AND";
				}
				query += " " + conditions[i] + "='" + req.query[conditions[i]] + "'";
			}

		}
		if (k==1)
		{
				db.query(query, function(err, result, fields)
				{
					
					if(err) throw err;
					else res.send(JSON.stringify(result)); 
				});
				k=0;
		}

		// filtre de champ
		//postman : http://localhost:3000/chambre?fields=capacite
		var query = "SELECT * FROM chambre";
		if ("fields" in req.query) 
		{k=1;
			query = query.replace("*", req.query["fields"]);
		}
		if (k==1)
		{
				db.query(query, function(err, result, fields)
				{
					
					if(err) throw err;
					else res.send(JSON.stringify(result)); 
				});
				k=0;
		}
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

//propriete:
//id_patient nom prenom date_naissance date_entre id_chambre


//post
app.post('/patient', function(req, res) {
	var nom = req.body.nom;
	var prenom = req.body.prenom;
	var date_naissance = req.body.date_naissance;
	var date_entre = req.body.date_entre;
	var id_chambre = req.body.id_chambre;
	var query = "INSERT INTO patient (nom, prenom, date_naissance, date_entre, id_chambre) VALUES ('" + nom +"', '"+ prenom + "','"+ date_naissance + "' ,'"+ date_entre + "','"+ id_chambre + "')";
	db.query(query, function(err, result, fields) {
		if (err) throw err;
		res.send(JSON.stringify("Success"));
	});
});

//get
app.get('/patient/:id', function(req, res) {
	var id = req.params.id;
	var query = "SELECT * FROM patient WHERE id_patient=" + id;
	db.query(query, function(err, result, fields) {
		if (err) throw err;
		res.send(JSON.stringify(result));
	});
});

    //get avec relation
    app.get('/patient/:id/chambre', function(req, res) {
    	var id = req.params.id;
    	var query = "SELECT chambre.id_chambre, chambre.capacite, chambre.seuil_critique, chambre.id_filtre FROM patient INNER JOIN chambre ON patient.id_chambre = chambre.id_chambre WHERE patient.id_patient=" + id;
    	db.query(query, function(err, result, fields) {
    		if (err) throw err;
    		res.send(JSON.stringify(result));
    	});
    });
    app.get('/patient/:id_patient/chambre/:id_chambre', function(req, res) {
    	var id_patient = req.params.id_patient;
    	var id_chambre = req.params.id_chambre;
    	var query = "SELECT chambre.id_chambre, chambre.capacite, chambre.seuil_critique, chambre.id_filtre FROM patient INNER JOIN chambre ON patient.id_chambre = chambre.id_chambre WHERE patient.id_patient=" + id_patient + " AND chambre.id_chambre=" +
    	id_chambre;
    	db.query(query, function(err, result, fields) {
    		if (err) throw err;
    		res.send(JSON.stringify(result));
    	});
    });




//--------------------------partie filtre patient------------


app.get('/patient', function(req,res)
{
	var k=0;



			//filtre de pagination : 
		//postma: http://localhost:3000/patient?limit=1
		var query = "SELECT * FROM patient";
		
		if("limit" in req.query)
		{k=1;
			query += " LIMIT " + req.query["limit"];
		}
		if ("offset" in req.query)
		{
			query += " OFFSET " + req.query["offset"];
		}
		if (k==1)
		{
				db.query(query, function(err, result, fields)
				{
					if(err) throw err;
					else res.send(JSON.stringify(result)); 
				});
				k=0;
		}
		



		//Filtre d’ordre
		//postman:http://localhost:3000/patient?sort=-prenom

			var query = "SELECT * FROM patient";
			if ("sort" in req.query) {
				
			var sort = req.query["sort"].split(",");
			query += " ORDER BY";
			for (var index in sort) {
				k=1;
			var direction = sort[index].substr(0, 1);
			var field = sort[index].substr(1);
			query += " " + field;
			if (direction == "-")
			query += " DESC,";
			else
			query += " ASC,";
			}
			query = query.slice(0, -1);
			}
		if (k==1)
		{
				db.query(query, function(err, result, fields)
				{
					
					if(err) throw err;
					else res.send(JSON.stringify(result)); 
				});
				k=0;
		}


		// get avec filtre de condition
		//postman: http://localhost:3000/patient?nom=haik
		var query = "SELECT * FROM patient";

		var conditions = ["id_patient","nom","prenom","date_naissance","date_entre", "id_chambre"];
		for(var i in conditions)
		{
			if(conditions[i] in req.query)
			{
				if(query.indexOf("WHERE")< 0)
				{k=1;
					query += " WHERE";
				}
				else {
					query += " AND";
				}
				query += " " + conditions[i] + "='" + req.query[conditions[i]] + "'";
			}
		}
		if (k==1)
		{
				db.query(query, function(err, result, fields)
				{
					
					if(err) throw err;
					else res.send(JSON.stringify(result)); 
				});
				k=0;
		}

		// filtre de champ
		//postman : http://localhost:3000/patient?fields=prenom
		var query = "SELECT * FROM patient";
		if ("fields" in req.query) 
		{k=1;
			query = query.replace("*", req.query["fields"]);
		}
		if (k==1)
		{
				db.query(query, function(err, result, fields)
				{
					
					if(err) throw err;
					else res.send(JSON.stringify(result)); 
				});
				k=0;
		}
		
});




//put
app.put('/patient/:id', function(req, res) {
	var id_patient = req.params.id;
	var nom = req.body.nom;
	var prenom = req.body.prenom;
	var date_naissance = req.body.date_naissance;
	var date_entre = req.body.date_entre;
	var id_chambre = req.body.id_chambre;
	var query = "UPDATE patient SET nom = '" + nom + "' , prenom= '" + prenom +"', date_naissance= '"+ date_naissance + "' , date_entre= '"+ date_entre + "', id_chambre= '"+ id_chambre + "' WHERE id_patient="
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

//propriete:
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

//get
app.get('/personnel/:id', function(req, res) {
	var id = req.params.id;
	var query = "SELECT * FROM personnel WHERE id_personnel=" + id;
	db.query(query, function(err, result, fields) {
		if (err) throw err;
		res.send(JSON.stringify(result));
	});
});


//--------------------------partie filtre personnel------------


app.get('/personnel', function(req,res)
{

var k=0;

		//filtre de pagination : 
		//postma: http://localhost:3000/personnel?limit=1
		var query = "SELECT * FROM personnel";
		
		if("limit" in req.query)
		{k=1;
			query += " LIMIT " + req.query["limit"];
		}
		if ("offset" in req.query)
		{
			query += " OFFSET " + req.query["offset"];
		}
		if (k==1)
		{
				db.query(query, function(err, result, fields)
				{
					
					if(err) throw err;
					else res.send(JSON.stringify(result)); 
				});
				k=0;
		}


		//Filtre d’ordre
		//postman:http://localhost:3000/personnel?sort=-fonction,+nom

		var query = "SELECT * FROM personnel";
		if ("sort" in req.query) {
			k=1;
			var sort = req.query["sort"].split(",");
			query += " ORDER BY";
			for (var index in sort) {
				var direction = sort[index].substr(0, 1);
				var field = sort[index].substr(1);
				query += " " + field;
				if (direction == "-")
					query += " DESC,";
				else
					query += " ASC,";
			}
			query = query.slice(0, -1);
		}
		if (k==1)
		{
				db.query(query, function(err, result, fields)
				{
					
					if(err) throw err;
					else res.send(JSON.stringify(result)); 
				});
				k=0;
		}

		// get avec filtre de condition
		//postman: http://localhost:3000/personnel?nom=haik
		var query = "SELECT * FROM personnel";

		var conditions = ["id_personnel","prenom","nom","fonction","salaire"];
		for(var i in conditions)
		{
			if(conditions[i] in req.query)
			{
				if(query.indexOf("WHERE")< 0)
				{k=1;
					query += " WHERE";
				}
				else {
					query += " AND";
				}
				query += " " + conditions[i] + "='" + req.query[conditions[i]] + "'";
			}

		}
		if (k==1)
		{
				db.query(query, function(err, result, fields)
				{
					
					if(err) throw err;
					else res.send(JSON.stringify(result)); 
				});
				k=0;
		}

		// filtre de champ
		//postman : http://localhost:3000/personnel?fields=fonction
		var query = "SELECT * FROM personnel";
		if ("fields" in req.query) 
		{k=1;
			query = query.replace("*", req.query["fields"]);
		}
		if (k==1)
		{
				db.query(query, function(err, result, fields)
				{
					
					if(err) throw err;
					else res.send(JSON.stringify(result)); 
				});
				k=0;
		}
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







