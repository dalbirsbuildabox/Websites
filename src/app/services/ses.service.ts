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

  async sendEmail(toEmail: string, subject: string, message: string) {
    const params = {
      Destination: { ToAddresses: [toEmail] },
      Message: {
        Body: { Text: { Data: message } },
        Subject: { Data: subject },
      },
      Source: environment.senderEmail,
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
