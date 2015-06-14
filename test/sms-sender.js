var should = require("should");
var nock = require('nock');
var nsmsapi = require('..');

describe('SmsSender', function(){

    it('should rise error when created without credentials', function(){
        (function() {
            new nsmsapi.SmsSender()
        }).should.throwError('Credential options required');
    });

    it('should rise error when created without username', function(){
        (function() {
            new nsmsapi.SmsSender({})
        }).should.throwError('Username required');
    });

    it('should rise error when created without password', function(){
        (function() {
            new nsmsapi.SmsSender({username: 'test'})
        }).should.throwError('Password required');
    });

    it('should send sms to default endpoint', function(done){

        var request = {
            username: 'test',
            password: '098f6bcd4621d373cade4e832627b4f6',
            format: 'json',
            encoding: 'utf-8',
            to: '603322424',
            message: 'This is test'
        };

        var response = {
            "count": 1,
            "list": [
                {
                    "id":"1434295969943616450",
                    "points":0.065,
                    "number":"48603322424",
                    "submitted_number":"603322424",
                    "status":"QUEUE",
                    "error":null,
                    "idx":null
                }
            ]
        };

        var scope = nock('https://ssl.smsapi.pl')
            .post('/sms.do', request)
            .reply(200, response);

        var sender = new nsmsapi.SmsSender({
            username: 'test',
            password: 'test'
        });

        var sms = new nsmsapi.Sms('603322424', 'This is test');

        sender.send(sms, function(err, res, body) {
            scope.done();
            done();
        });
    });

    it('should send sms to custom endpoint')
});