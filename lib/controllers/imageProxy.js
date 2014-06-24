// var http = require('http'),
// 	url = require('url');

// exports.show = function (req, res, next) {
//     var url_parts = url.parse(req.url, true);
// 	var query = url_parts.query;
// 	var options = {
// 		host: "cdn.photos.sparkplatform.com",
// 		path: "/dgtf/20080303201247771409000000.jpg"
// 	};

// 	var callback = function(response) {
// 		var completeResponse = '';
// 		response.on('data', function (chunk) {
// 		    completeResponse += chunk;
// 		});
// 		response.on('end', function() {
// 			res.writeHead(200, {'Content-Type': response.headers['content-type'], 'Content-Length': response.headers['content-length'], 'Connection': null });
// 			res.end(completeResponse, 'binary');
// 		});
// 	};

// 	http.request(options, callback).end();
// };

var http = require('http'),
    url = require('url');

exports.show = function (req, res, next) {
    var url_parts = url.parse(req.url, true);
    var query = url_parts.query;
    var image_url_hash = url.parse(query.url);
    var options = {
        host: image_url_hash.host,
        path: image_url_hash.path
    };

    var callback = function(response) {
        if (response.statusCode === 200) {
            res.writeHead(200, {
                'Content-Type': response.headers['content-type']
            });
            response.pipe(res);
        } else {
            res.writeHead(response.statusCode);
            res.end();
        }
    };

    http.request(options, callback).end();
};
// exports.show = function(request_from_client, response_to_client){
//   var url_parts = url.parse(request_from_client.url, true);
//   var query = url_parts.query;
//   var image_url = query.url;
 
//   var image_host_name = url.parse(image_url).hostname
//   var filename = url.parse(image_url).pathname.split("/").pop()
 
//   var http_client = http.createClient(80, image_host_name);
//   var image_get_request = http_client.request('GET', image_url, {"host": image_host_name});
//   image_get_request.addListener('response', function(proxy_response){
//     var current_byte_index = 0;
//     var response_content_length = parseInt(proxy_response.header("Content-Length"));
//     var response_body = new Buffer(response_content_length);
   
//     proxy_response.setEncoding('binary');
//     proxy_response.addListener('data', function(chunk){
//       response_body.write(chunk, current_byte_index, "binary");
//       current_byte_index += chunk.length;
//     });
//     proxy_response.addListener('end', function(){
//       response_to_client.contentType(filename);
//       response_to_client.send(response_body);
//     });
//   });
//   image_get_request.end();
// };