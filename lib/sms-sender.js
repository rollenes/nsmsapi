var request = require('request');
var crypto = require('crypto');
var md5sum = crypto.createHash('md5');

module.exports = SmsSender;

function SmsSender(options) {

    if ('undefined' === typeof options) {
        throw new Error('Credential options required');
    }

    if (!options.username) {
        throw new Error('Username required');
    }

    if (!options.password) {
        throw new Error('Password required');
    }

    var username = options.username;
    var password = options.password;
    var endpoint = 'https://ssl.smsapi.pl/sms.do';

    //var endpoint = options.endpoint || 'https://ssl.smsapi.pl/sms.do';
    
    this.send = function(sms, callback) {

        var postData = {
            username: username,
            password: md5sum.update(password).digest('hex'),
            format: 'json',
            encoding: 'utf-8',
            to: sms.getRecipients().join(),
            message: sms.getMessage()
        };
        
        request.post({ url: endpoint, form: postData }, callback);
    }
}

