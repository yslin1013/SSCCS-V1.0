var http = require('http');
var url = require('url');
var fs = require('fs');
var qs = require('querystring');
var serviceModule1 = require('./getContractSource');
var serviceModule2 = require('./viewContractStatus');
var serviceModule3 = require('./transferTokens');

http.createServer(function (req, res) {
    var q = url.parse(req.url, true);
    var filename = "." + q.pathname;
    if(filename == "./") filename += "index.html";

    fs.readFile(filename, function(err, data) {
        if(!err) {
            res.write(data);
            return res.end();
        }

        if(req.method == 'GET') {
            var query = q.query;
            if(q.pathname == "/contract/source") {
                res.writeHead(200);
                var msg = serviceModule1.getContractSource(query.c_name);
                return res.end(msg);
            }
            else{
                res.writeHead(400);
                return res.end();
            }
        }
        else if(req.method == 'POST') {
            var body = '';
            req.on('data', function (data) {
                body += data;
            });

            req.on('end', function () {
                var backHTML = "<p><a href='/'>BACK to index</a></p>";
                var post = qs.parse(body);
                if(q.pathname == "/contract/status") {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    var msg = serviceModule2.viewContractStatus(post['src_addr'], post['passphrase']) + backHTML;
                    return res.end(msg);
                }
                else if(q.pathname == "/contract/token/transfer") {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    var msg = serviceModule3.transferTokens(post['src_addr'], post['passphrase'], 
                                                            post['amount'], post['dst_addr']) + backHTML;
                    return res.end(msg);
                }
                else{
                    res.writeHead(400);
                    return res.end();
                }
            });
        }
        else{}  
    });
}).listen(8888);
