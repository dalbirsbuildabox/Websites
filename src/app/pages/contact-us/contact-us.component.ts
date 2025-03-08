import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SesService } from '../../services/ses.service';

@Component({
  selector: 'app-contact-us',
  imports: [ReactiveFormsModule],
  templateUrl: './contact-us.component.html',
  styleUrl: './contact-us.component.scss'
})
export class ContactUsComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder, private sesService: SesService) {
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
      try {
        await this.sesService.sendEmail(email, subject, message);
        alert('Email sent successfully!');
        this.contactForm.reset();
      } catch (error) {
        console.error('Error sending email:', error);
        alert('Failed to send email. Please try again.');
      }
    }
  }
}