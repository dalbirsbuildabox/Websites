import { Injectable } from '@angular/core';
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SesService {
  private sesClient: SESClient;

  constructor() {
    this.sesClient = new SESClient({
      region: environment.awsRegion,
      credentials: {
        accessKeyId: environment.accessKeyId,
        secretAccessKey: environment.secretAccessKey,
      },
    });
  }

  async sendEmail(subject: string, message: string) {
    const websiteOwnerEmail = environment.senderEmail; // Your verified email

    const params = {
      Destination: { ToAddresses: [websiteOwnerEmail] }, // Send to the website owner
      Message: {
        Body: { Text: { Data: message } },
        Subject: { Data: subject },
      },
      Source: websiteOwnerEmail, // Must be a verified email
    };

    try {
      const command = new SendEmailCommand(params);
      await this.sesClient.send(command);
      console.log('Email sent successfully!');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }
}
