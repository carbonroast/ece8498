var https = require('https');

exports.handler = function(event, context) {

    var body='';
    var jsonObject = JSON.stringify(event);

    // the post options
    var optionspost = {
        host: 'maker.ifttt.com',
        path: '/trigger/' + event.clickType + '/with/key/[your key]',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        }
    };

    var reqPost = https.request(optionspost, function(res) {
        console.log("statusCode: ", res.statusCode);
        res.on('data', function (chunk) {
            body += chunk;
        });
    });

    reqPost.write(jsonObject);
    reqPost.end();
};