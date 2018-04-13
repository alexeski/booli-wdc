var http = require('http');
var querystring = require('querystring');
var crypto = require('crypto');
var shasum = crypto.createHash('sha1');

var auth = {};
auth.callerId = "wdc";
auth.time = Math.floor(Date.now() / 1000);
auth.unique = crypto.randomBytes(Math.ceil(16/2)).toString("hex").slice(0, 16);
auth.hash = shasum.update(auth.callerId + auth.time + "jiFIGOd2aNzMwEWX1aL7kKTobgVtZiwg4UeVPVlj" + auth.unique).digest("hex");

var url = "http://api.booli.se/sold/?q=stockholm&" + querystring.stringify(auth);

http.get(url, function (res) {
  console.log(res.statusCode);
  var body = "";
  res.on('data', function(chunk) {
    body += chunk;
  });
  res.on('end', function() {
    console.log(JSON.parse(body));
  });
});