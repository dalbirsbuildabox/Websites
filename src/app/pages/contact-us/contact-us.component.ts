import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SesService } from '../../services/ses.service';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss',
  imports: [ReactiveFormsModule],
})
export class ContactUsComponent {
  contactForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private sesService: SesService,
    private toastr: ToastrService
  ) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  async onSubmit() {
    if (this.contactForm.valid) {
      const { name, email, message } = this.contactForm.value;
      const subject = `New Contact Form Submission from ${name}`;
      const formattedMessage = `You have received a new message from your website contact form.\n\n
        Name: ${name}\n
        Email: ${email}\n
        Message: ${message}\n`;

      try {
        await this.sesService.sendEmail(subject, formattedMessage);
        this.toastr.success('Your message has been sent!', 'Success');
        this.contactForm.reset();
      } catch (error) {
        console.error('Error sending email:', error);
        this.toastr.error('Failed to send your message. Please try again.', 'Error');
      }
    }
  }
}
