var url = require("url");
var http = require('http'),
// And mysql module you've just installed. 
    mysql = require("mysql");

// Create the connection. 
// Data is default to new mysql installation and should be changed according to your configuration. 
var connection = mysql.createConnection({
    host: "stardock.cs.virginia.edu",
    user: "cs4720lw6gk",
    password: "spring2014",
    database: "cs4720lw6gk"
});



http.createServer(function (request, response) {
    
   var pathname = url.parse(request.url).pathname;
	var url_parts = url.parse(request.url, true);
	var query = url_parts.query;
	//var path = pathname.substring(1);
	response.writeHead(200, {
		'Content-Type': 'text/html'
	});
	if(pathname === "/"){
		connection.query('SELECT * FROM users;', function (error, rows, fields) {
			response.write(JSON.stringify(rows));
			
			response.end();
			console.log("nothing: " + pathname);
		});
	}
	else{
		pathname = pathname.substring(1);
		connection.query("SELECT * FROM users WHERE gender = '" + pathname + "' ;", function (error, rows, fields) {
			response.write(JSON.stringify(rows));
			//console.log("Values: " + pathname);
			response.end();
		});
	}
	//console.log("Values: " + pathname);
}).listen(process.env.PORT || 8080);
