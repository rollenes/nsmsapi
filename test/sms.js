var assert = require("should");
var nsmsapi = require('..');

describe('Sms', function(){



    describe('#recipients', function(){
        it ('should have one recipient', function () {
            var sms = new nsmsapi.Sms('606606606', 'Test message');

            sms.getRecipients().should.be.an.instanceOf(Array).and.eql(['606606606']);
        });

        it('should have many recipients', function(){
            var sms = new nsmsapi.Sms(['606606601', '606606602'], 'Test message');

            sms.getRecipients().should.be.an.instanceOf(Array).and.eql(['606606601', '606606602']);
        });

        describe('#empty', function(){

            var emptyRecipients = [
                {key: 'empty string', value: ''},
                {key: 'empty array', value: [] }
            ];

            emptyRecipients.forEach(function(recipients) {
                it('should rise empty recipient error for: ' + recipients.key , function() {
                    (function() {new nsmsapi.Sms(recipients.value, 'Test message');}).should.throwError('Empty recipient');
                });
            })
        })

        describe('#invalid type', function(){
            var invalidTypes = [
                {key: '"null"', value: null},
                {key: "undefined", value: undefined}
            ];

            invalidTypes.forEach(function(recipients) {
                it('should rise invalid recipient type error for: ' + recipients.key , function() {
                    (function() {new nsmsapi.Sms(recipients.value, 'Test message');}).should.throwError('Invalid recipient type');
                });
            })
        })

    });

    describe('#message', function(){
        it('should have message', function() {
            var sms = new nsmsapi.Sms('603322424', 'Test message');

            sms.getMessage().should.equal('Test message');
        });
    });
});
