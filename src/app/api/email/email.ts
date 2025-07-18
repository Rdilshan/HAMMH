import nodemailer,{ Transporter } from 'nodemailer';

class EmailService {
  transporter: Transporter;
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER, 
        pass: process.env.SMTP_PASS, 
      },
    } as nodemailer.TransportOptions);
  }

  async sendEmail(to: string, subject: string, html:string) {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_USER, 
        to,                         
        subject,                    
        html,                       
      });
    } catch (error) {
      console.error("Error sending email:", error);
      throw new Error("Failed to send email");
    }
  }
}

export default EmailService;
