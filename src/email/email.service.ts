// =============
// SMTP GMail
// =============
// import { Injectable } from '@nestjs/common';
// import * as nodemailer from 'nodemailer';

// @Injectable()
// export class EmailService {
//   private transporter;

//   constructor() {
//     this.transporter = nodemailer.createTransport({
//       service: 'gmail',
//       auth: {
//         user: process.env.GMAIL_USER,
//         pass: process.env.GMAIL_APP_PASSWORD,
//       },
//     });
//   }

//   async sendReply(to: string, subject: string, message: string, originalMessage?: string) {
//     try {
//       const emailBody = `
// ${message}

// ${originalMessage ? `
// ---
// Original Message:
// ${originalMessage}
// ` : ''}

// Best regards,
// ${process.env.SENDER_NAME || 'Your Name'}
//       `.trim();

//       const mailOptions = {
//         from: `${process.env.SENDER_NAME || 'Your Name'} <${process.env.GMAIL_USER}>`,
//         to: to,
//         subject: subject.startsWith('Re:') ? subject : `Re: ${subject}`,
//         text: emailBody,
//         html: `
//           <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//             <p style="white-space: pre-wrap;">${message.replace(/\n/g, '<br>')}</p>
            
//             ${originalMessage ? `
//             <hr style="margin: 20px 0; border: none; border-top: 1px solid #ccc;">
//             <p style="color: #666; font-size: 14px;"><strong>Original Message:</strong></p>
//             <p style="color: #666; font-size: 14px; white-space: pre-wrap;">${originalMessage.replace(/\n/g, '<br>')}</p>
//             ` : ''}
            
//             <p style="margin-top: 20px;">Best regards,<br>${process.env.SENDER_NAME || 'Your Name'}</p>
//           </div>
//         `,
//       };

//       const info = await this.transporter.sendMail(mailOptions);
//       console.log('✅ Email sent successfully:', info.messageId);
//       return { success: true, messageId: info.messageId };
//     } catch (error) {
//       console.error('❌ Failed to send email:', error);
//       throw new Error(`Failed to send email: ${error.message}`);
//     }
//   }

//   async verifyConnection() {
//     try {
//       await this.transporter.verify();
//       console.log('✅ Gmail SMTP connection verified');
//       return true;
//     } catch (error) {
//       console.error('❌ Gmail SMTP connection failed:', error);
//       return false;
//     }
//   }
// }




// ===============
// Resend
// ===============
// import { Injectable } from '@nestjs/common';
// import { Resend } from 'resend';

// @Injectable()
// export class EmailService {
//   private resend: Resend;

//   constructor() {
//     this.resend = new Resend(process.env.RESEND_API_KEY);
//   }

//   async sendReply(to: string, subject: string, message: string, originalMessage?: string) {
//     try {
//       const emailBody = `
// ${message}

// ${originalMessage ? `
// ---
// Original Message:
// ${originalMessage}
// ` : ''}

// Best regards,
// ${process.env.SENDER_NAME || 'Your Name'}
//       `.trim();

//       const { data, error } = await this.resend.emails.send({
//         from: `${process.env.SENDER_NAME || 'Your Name'} <${process.env.RESEND_FROM_EMAIL}>`,
//         to: [to],
//         subject: subject.startsWith('Re:') ? subject : `Re: ${subject}`,
//         text: emailBody,
//         html: `
//           <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//             <p style="white-space: pre-wrap;">${message.replace(/\n/g, '<br>')}</p>
            
//             ${originalMessage ? `
//             <hr style="margin: 20px 0; border: none; border-top: 1px solid #ccc;">
//             <p style="color: #666; font-size: 14px;"><strong>Original Message:</strong></p>
//             <p style="color: #666; font-size: 14px; white-space: pre-wrap;">${originalMessage.replace(/\n/g, '<br>')}</p>
//             ` : ''}
            
//             <p style="margin-top: 20px;">Best regards,<br>${process.env.SENDER_NAME || 'Your Name'}</p>
//           </div>
//         `,
//       });

//       if (error) {
//         console.error('❌ Failed to send email:', error);
//         throw new Error(`Failed to send email: ${error.message}`);
//       }

//       console.log('✅ Email sent successfully:', data.id);
//       return { success: true, messageId: data.id };
//     } catch (error) {
//       console.error('❌ Failed to send email:', error);
//       throw new Error(`Failed to send email: ${error.message}`);
//     }
//   }

//   async verifyConnection() {
//     try {
//       // Resend doesn't have a verify method, but we can check if API key exists
//       if (!process.env.RESEND_API_KEY) {
//         throw new Error('RESEND_API_KEY is not set');
//       }
//       console.log('✅ Resend API key configured');
//       return true;
//     } catch (error) {
//       console.error('❌ Resend configuration failed:', error);
//       return false;
//     }
//   }
// }




// ===========
// SendGrid
// ===========
// import { Injectable } from '@nestjs/common';
// import sgMail from '@sendgrid/mail';

// @Injectable()
// export class EmailService {
//   constructor() {
//     const apiKey = process.env.SENDGRID_API_KEY;
    
//     if (!apiKey) {
//       console.error('❌ SENDGRID_API_KEY is not set');
//       throw new Error('SENDGRID_API_KEY environment variable is required');
//     }
    
//     sgMail.setApiKey(apiKey);
    
//     console.log('📧 SendGrid Email Service initialized');
//     console.log('   From Email:', process.env.SENDGRID_FROM_EMAIL);
//   }

//   async sendReply(to: string, subject: string, message: string, originalMessage?: string) {
//     try {
//       const fromEmail = process.env.SENDGRID_FROM_EMAIL;
//       const senderName = process.env.SENDER_NAME || 'Mohri Admin';
      
//       if (!fromEmail) {
//         throw new Error('SENDGRID_FROM_EMAIL environment variable is required');
//       }

//       const emailBody = `
// ${message}

// ${originalMessage ? `
// ---
// Original Message:
// ${originalMessage}
// ` : ''}

// Best regards,
// ${senderName}
//       `.trim();

//       const msg = {
//         to: to,
//         from: {
//           email: fromEmail,
//           name: senderName,
//         },
//         subject: subject.startsWith('Re:') ? subject : `Re: ${subject}`,
//         text: emailBody,
//         html: `
//           <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//             <p style="white-space: pre-wrap;">${message.replace(/\n/g, '<br>')}</p>
            
//             ${originalMessage ? `
//             <hr style="margin: 20px 0; border: none; border-top: 1px solid #ccc;">
//             <p style="color: #666; font-size: 14px;"><strong>Original Message:</strong></p>
//             <p style="color: #666; font-size: 14px; white-space: pre-wrap;">${originalMessage.replace(/\n/g, '<br>')}</p>
//             ` : ''}
            
//             <p style="margin-top: 20px;">Best regards,<br>${senderName}</p>
//           </div>
//         `,
//       };

//       const response = await sgMail.send(msg);
      
//       console.log('✅ Email sent successfully via SendGrid');
//       console.log('   Status:', response[0].statusCode);
//       console.log('   To:', to);
      
//       return { 
//         success: true, 
//         messageId: response[0].headers['x-message-id'],
//         statusCode: response[0].statusCode 
//       };
//     } catch (error) {
//       console.error('❌ SendGrid Error:', error);
      
//       if (error.response) {
//         console.error('   Status:', error.response.statusCode);
//         console.error('   Body:', error.response.body);
//       }
      
//       throw new Error(`Failed to send email: ${error.message}`);
//     }
//   }

//   async verifyConnection() {
//     try {
//       const apiKey = process.env.SENDGRID_API_KEY;
//       const fromEmail = process.env.SENDGRID_FROM_EMAIL;
      
//       if (!apiKey) {
//         throw new Error('SENDGRID_API_KEY is not set');
//       }
      
//       if (!fromEmail) {
//         throw new Error('SENDGRID_FROM_EMAIL is not set');
//       }
      
//       console.log('✅ SendGrid API key configured');
//       console.log('✅ From email configured:', fromEmail);
//       console.log('⚠️  Note: Verify your sender email at sendgrid.com/sender_verification');
      
//       return true;
//     } catch (error) {
//       console.error('❌ SendGrid configuration failed:', error);
//       return false;
//     }
//   }
// }


// ==============
// Mailer Send
// ==============
// import { Injectable } from '@nestjs/common';
// import { MailerSend, EmailParams, Sender, Recipient } from 'mailersend';

// @Injectable()
// export class EmailService {
//   private mailerSend: MailerSend;
//   private fromEmail: Sender;

//   constructor() {
//     const apiKey = process.env.MAILERSEND_API_KEY;
    
//     if (!apiKey) {
//       console.error('❌ MAILERSEND_API_KEY is not set');
//       throw new Error('MAILERSEND_API_KEY environment variable is required');
//     }
    
//     this.mailerSend = new MailerSend({
//       apiKey: apiKey,
//     });

//     const fromEmailAddress = process.env.MAILERSEND_FROM_EMAIL;
//     const senderName = process.env.SENDER_NAME || 'Mohri Admin';
    
//     if (!fromEmailAddress) {
//       throw new Error('MAILERSEND_FROM_EMAIL environment variable is required');
//     }

//     this.fromEmail = new Sender(fromEmailAddress, senderName);
    
//     console.log('📧 MailerSend Email Service initialized');
//     console.log('   From Email:', fromEmailAddress);
//     console.log('   Sender Name:', senderName);
//   }

//   async sendReply(to: string, subject: string, message: string, originalMessage?: string) {
//     try {
//       const senderName = process.env.SENDER_NAME || 'Mohri Admin';

//       const emailBody = `
// ${message}

// ${originalMessage ? `
// ---
// Original Message:
// ${originalMessage}
// ` : ''}

// Best regards,
// ${senderName}
//       `.trim();

//       const htmlBody = `
//         <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//           <p style="white-space: pre-wrap;">${message.replace(/\n/g, '<br>')}</p>
          
//           ${originalMessage ? `
//           <hr style="margin: 20px 0; border: none; border-top: 1px solid #ccc;">
//           <p style="color: #666; font-size: 14px;"><strong>Original Message:</strong></p>
//           <p style="color: #666; font-size: 14px; white-space: pre-wrap;">${originalMessage.replace(/\n/g, '<br>')}</p>
//           ` : ''}
          
//           <p style="margin-top: 20px;">Best regards,<br>${senderName}</p>
//         </div>
//       `;

//       const recipients = [new Recipient(to)];

//       const emailParams = new EmailParams()
//         .setFrom(this.fromEmail)
//         .setTo(recipients)
//         .setSubject(subject.startsWith('Re:') ? subject : `Re: ${subject}`)
//         .setText(emailBody)
//         .setHtml(htmlBody);

//       const response = await this.mailerSend.email.send(emailParams);
      
//       console.log('✅ Email sent successfully via MailerSend');
//       console.log('   To:', to);
//       console.log('   Subject:', subject);
      
//       return { 
//         success: true, 
//         messageId: response.headers?.['x-message-id'] || 'sent',
//         response: response.statusCode 
//       };
//     } catch (error) {
//       console.error('❌ MailerSend Error:', error);
      
//       if (error.response) {
//         console.error('   Status:', error.response.statusCode);
//         console.error('   Body:', error.response.body);
//       }
      
//       throw new Error(`Failed to send email: ${error.message}`);
//     }
//   }

//   async verifyConnection() {
//     try {
//       const apiKey = process.env.MAILERSEND_API_KEY;
//       const fromEmail = process.env.MAILERSEND_FROM_EMAIL;
      
//       if (!apiKey) {
//         throw new Error('MAILERSEND_API_KEY is not set');
//       }
      
//       if (!fromEmail) {
//         throw new Error('MAILERSEND_FROM_EMAIL is not set');
//       }
      
//       console.log('✅ MailerSend API key configured');
//       console.log('✅ From email configured:', fromEmail);
//       console.log('⚠️  Note: Verify your domain at mailersend.com/domains');
      
//       return true;
//     } catch (error) {
//       console.error('❌ MailerSend configuration failed:', error);
//       return false;
//     }
//   }
// }




// =============
//    Brevo
// =============
import { Injectable } from '@nestjs/common';
import * as SibApiV3Sdk from '@sendinblue/client';

@Injectable()
export class EmailService {
  private apiInstance: SibApiV3Sdk.TransactionalEmailsApi;

  constructor() {
    const apiKey = process.env.BREVO_API_KEY;
    
    if (!apiKey) {
      console.error('❌ BREVO_API_KEY is not set');
      throw new Error('BREVO_API_KEY environment variable is required');
    }

    // Initializing Brevo API client
    this.apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    this.apiInstance.setApiKey(
      SibApiV3Sdk.TransactionalEmailsApiApiKeys.apiKey,
      apiKey
    );
    
    console.log('📧 Brevo Email Service initialized');
  }

  async sendReply(to: string, subject: string, message: string, originalMessage?: string) {
    try {
      const senderName = process.env.SENDER_NAME || 'Mohri Muakpo';
      const senderEmail = process.env.SENDER_EMAIL || 'noreply@example.com';

      const emailBody = `
${message}

${originalMessage ? `
---
Original Message:
${originalMessage}
` : ''}

Best regards,
${senderName}
      `.trim();

      const htmlBody = `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <p style="white-space: pre-wrap; color: #333;">${message.replace(/\n/g, '<br>')}</p>
          
          ${originalMessage ? `
          <hr style="margin: 20px 0; border: none; border-top: 1px solid #ddd;">
          <p style="color: #666; font-size: 14px;"><strong>Original Message:</strong></p>
          <p style="color: #666; font-size: 14px; white-space: pre-wrap; background: #f5f5f5; padding: 15px; border-radius: 5px;">
            ${originalMessage.replace(/\n/g, '<br>')}
          </p>
          ` : ''}
          
          <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
            <p style="margin: 0; color: #666;">Best regards,<br><strong>${senderName}</strong></p>
          </div>
        </div>
      `;

      const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
      
      sendSmtpEmail.sender = {
        name: senderName,
        email: senderEmail
      };
      
      sendSmtpEmail.to = [{ email: to }];
      sendSmtpEmail.subject = subject.startsWith('Re:') ? subject : `Re: ${subject}`;
      sendSmtpEmail.textContent = emailBody;
      sendSmtpEmail.htmlContent = htmlBody;

      const response = await this.apiInstance.sendTransacEmail(sendSmtpEmail);
      
      console.log('✅ Email sent successfully via Brevo');
      console.log('   Message ID:', response.body?.messageId || 'sent');
      console.log('   To:', to);
      
      return { 
        success: true, 
        messageId: response.body?.messageId || 'sent'
      };
    } catch (error) {
      console.error('❌ Brevo Error:', error);
      
      if (error.response) {
        console.error('   Status:', error.response.status);
        console.error('   Body:', error.response.body);
      }
      
      throw new Error(`Failed to send email: ${error.message}`);
    }
  }

  async verifyConnection() {
    try {
      const apiKey = process.env.BREVO_API_KEY;
      
      if (!apiKey) {
        throw new Error('BREVO_API_KEY is not set');
      }
      
      // Test the API by getting account info
      const accountApi = new SibApiV3Sdk.AccountApi();
      accountApi.setApiKey(
        SibApiV3Sdk.AccountApiApiKeys.apiKey,
        apiKey
      );
      
      await accountApi.getAccount();
      
      console.log('✅ Brevo API key verified');
      console.log('✅ Ready to send emails');
      console.log('⚠️  Note: Brevo free tier allows 300 emails/day');
      
      return true;
    } catch (error) {
      console.error('❌ Brevo configuration failed:', error);
      return false;
    }
  }
}