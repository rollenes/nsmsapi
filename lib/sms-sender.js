var request = require('request');
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

    this.send = function(callback) {
        request.post(endpoint, callback);
    }
}
