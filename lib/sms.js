
Sms = function(recipients, message) {

    var recipients = guardRecipients(recipients);
    var message = message;

    this.getMessage = function () {
        return message;
    };

    this.getRecipients = function() {
        return recipients;
    };

    function guardRecipients(recipients) {

        if (typeof recipients === 'string' || typeof recipients === 'number') {
            return guardScalarRecipient();
        }

        if (Array.isArray(recipients)) {
            return guardArrayRecipients();
        }

        throw new Error('Invalid recipient type');

        function guardScalarRecipient() {
            guardNotEmpty();

            if (!isRecipientValid(recipients)) {
                throw new Error('Invalid recipients: ' + recipients)
            }

            return [recipients];
        }

        function guardArrayRecipients() {
            guardNotEmpty();

            var invalidRecipients = [];

            recipients.forEach(function (recipient) {
                if (!isRecipientValid(recipient)) {
                    invalidRecipients.push(recipient);
                }
            });

            if (!isEmpty(invalidRecipients)) {
                throw new Error('Invalid recipients: ' + invalidRecipients.toString());
            }

            return recipients;
        }

        function isRecipientValid(recipient) {
            return !isEmpty(recipient) && !/[^\d]/.test(recipient);
        }

        function isEmpty(recipient) {
            return recipient.length === 0;
        }

        function guardNotEmpty() {
            if (isEmpty(recipients)) {
                throw new Error('Empty recipients');
            }
        }
    }
};

module.exports = Sms;
