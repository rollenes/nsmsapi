
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

        if (typeof recipients === 'number') {
            recipients = recipients.toString();
        }

        if (typeof recipients === 'string') {
            return guardStringRecipients();
        }

        if (Array.isArray(recipients)) {
            guardNotEmpty();

            return recipients;
        }

        throw new Error('Invalid recipient type');

        function guardStringRecipients() {
            guardNotEmpty();

            return [recipients];
        }

        function guardNotEmpty() {
            if (!recipients.length) {
                throw new Error('Empty recipient');
            }
        }
    }
};

module.exports = Sms;
