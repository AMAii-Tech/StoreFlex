import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
    private resend: Resend;
    constructor() {
        this.resend = new Resend(process.env.RESEND_TOKEN);
    }

    async sendEmail({
        subject,
        body,
        to,
        from = 'storeflex@therohankumar.com',
    }) {
        this.resend.emails
            .send({
                from,
                subject,
                to,
                html: body,
            })
            .catch(console.error);
    }
}
