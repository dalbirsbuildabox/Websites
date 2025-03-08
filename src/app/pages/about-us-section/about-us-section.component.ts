import { Component } from '@angular/core';
import { ContactUsComponent } from '../contact-us/contact-us.component';

@Component({
  selector: 'app-about-us-section',
  imports: [ContactUsComponent],
  templateUrl: './about-us-section.component.html',
  styleUrl: './about-us-section.component.scss'
})
export class AboutUsSectionComponent {

}
