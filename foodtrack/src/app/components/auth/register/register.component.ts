import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  loading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      first_name: ['', [Validators.required]],
      last_name: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      password2: ['', [Validators.required]]
    }, { validators: this.passwordMatchValidator });
  }

  passwordMatchValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const password = control.get('password');
    const password2 = control.get('password2');
    
    if (password && password2 && password.value !== password2.value) {
      return { passwordMismatch: true };
    }
    return null;
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.loading = true;
      this.error = '';

      this.authService.register(this.registerForm.value).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.loading = false;
          if (error.error?.username) {
            this.error = 'Nome de usuário já existe.';
          } else if (error.error?.email) {
            this.error = 'Email já está em uso.';
          } else if (error.error?.password) {
            this.error = error.error.password[0];
          } else {
            this.error = 'Erro ao criar conta. Tente novamente.';
          }
        }
      });
    }
  }

  getErrorMessage(field: string): string {
    const control = this.registerForm.get(field);
    if (control?.hasError('required')) {
      return 'Este campo é obrigatório';
    }
    if (field === 'email' && control?.hasError('email')) {
      return 'Email inválido';
    }
    if (field === 'username' && control?.hasError('minlength')) {
      return 'Nome de usuário deve ter pelo menos 3 caracteres';
    }
    if (field === 'password' && control?.hasError('minlength')) {
      return 'A senha deve ter pelo menos 6 caracteres';
    }
    if (field === 'password2' && this.registerForm.hasError('passwordMismatch')) {
      return 'As senhas não coincidem';
    }
    return '';
  }
} 