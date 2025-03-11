import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { ServicesComponent } from './pages/services/services.component';
import { AboutUsSectionComponent } from './pages/about-us-section/about-us-section.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' }, // Redirect to Home Page
  { path: 'home', component: HomeComponent },
  { path: 'services', component: ServicesComponent },
  { path: 'about', component: AboutUsSectionComponent },
  { path: '**', redirectTo: '/home' } // Wildcard route for unknown paths
];
