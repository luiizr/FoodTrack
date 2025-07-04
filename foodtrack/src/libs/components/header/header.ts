import { Component } from '@angular/core';
<<<<<<< HEAD
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  imports: [ButtonModule, ],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderComponent {
=======

// Primeng Imports
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-header',
  imports: [ButtonModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class HeaderModule {
>>>>>>> b4aafb5bfe82a98c8317d4d6fc9ddeb75ca05495

}
