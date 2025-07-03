import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  imports: [ButtonModule, ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {

}
