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
      try {
        await this.sesService.sendEmail(email, subject, message);
        this.toastr.success('Email sent successfully!', 'Success');
        this.contactForm.reset();
      } catch (error) {
        console.error('Error sending email:', error);
        this.toastr.error('Failed to send email. Please try again.', 'Error');
      }
    }
  }
}
