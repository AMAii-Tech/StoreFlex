const { Resend } = require("resend");

class EmailService {
    _resend;
    constructor() {
        this._resend = new Resend(process.env.RESEND_TOKEN);
    }

    sendEmail({ subject, html, to, from = "noreply@therohankumar.com" }) {
        this._resend.emails.send({
            subject,
            html,
            to,
            from,
        });
    }
}

module.exports = new EmailService();
