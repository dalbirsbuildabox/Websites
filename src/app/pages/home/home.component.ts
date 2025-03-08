import { Component } from '@angular/core';
import { AboutUsComponent } from '../about-us/about-us.component';
import { ServicesComponent } from '../services/services.component';

@Component({
  selector: 'app-home',
  imports: [AboutUsComponent, ServicesComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
