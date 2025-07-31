import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, ButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loading = true;
      this.error = '';

      this.authService.login(this.loginForm.value).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.loading = false;
          if (error.error?.error) {
            this.error = error.error.error;
          } else {
            this.error = 'Erro ao fazer login. Tente novamente.';
          }
        }
      });
    }
  }

  getErrorMessage(field: string): string {
    const control = this.loginForm.get(field);
    if (control?.hasError('required')) {
      return 'Este campo é obrigatório';
    }
    if (field === 'password' && control?.hasError('minlength')) {
      return 'A senha deve ter pelo menos 6 caracteres';
    }
    return '';
  }
} 