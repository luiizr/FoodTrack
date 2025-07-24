import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LandingPage } from './Landing-page/landing-page';

@Component({
  selector: 'app-root',
  imports: [RouterModule, LandingPage],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

}
