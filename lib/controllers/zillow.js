var http = require('http'),
	xml2js = require('xml2js'),
	url = require('url'),
	parser = new xml2js.Parser();

exports.show = function (req, res, next) {
	var url_parts = url.parse(req.url, true);
	var query = url_parts.query;

	var options = {
  		host: 'www.zillow.com',
  		path: '/webservice/GetDeepSearchResults.htm?zws-id=X1-ZWz1b6epidczrf_8p8sy&address=' + query.address + '&citystatezip='+query.citystatezip
	};

	var callback = function(response) {
		var completeResponse = '';
        response.on('data', function (chunk) {
            completeResponse += chunk;
        });
        response.on('end', function() {
        	console.log(completeResponse);
			parser.parseString(completeResponse, function (err, result) {
				// console.log(result);
				res.send(result);
    		});
        });
  	};

  	http.request(options, callback).end();
}
