import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AlertService } from '../../services/alert.service';
import { AlertComponent } from "../alert/alert.component";

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule, AlertComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private router = inject(Router);
  registerType = localStorage.getItem('registerType');
  inputType = 'password';
  private fb = inject(FormBuilder);
  loginForm! : FormGroup;
  private alert = inject(AlertService);

  alertTitle = '';
  alertMessge = '';
  alertType: string= 'info';
  alertVisible = false;
  

  ngOnInit() {
    this.alert.alert$.subscribe(alert => {
      this.alertTitle = alert.title,
      this.alertMessge = alert.message,
      this.alertType = alert.type,
      this.alertVisible = alert.visible
    });
  }

  constructor () {
    this.loginForm = this.fb.group({
      userName : ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]{4,}$/)]],
      password : ['', Validators.required]
    });
  }

  submit () {
    if (this.loginForm.valid) {
      this.router.navigate(['/main']);
      const validLogin = 'true';
      localStorage.setItem('validLogin', validLogin);
    }
    else {
      this.alert.showAlert('Erreur login !!', 'userNmae or password are inccorrect!!', 'error');
      setTimeout(() => {
        this.alert.hideAlert();
      }, 2000);
    }
  }

  hidePassword () {
    this.inputType = this.inputType === 'password' ? 'text' : 'password';
  }

  register () {
    if (this.registerType === 'admin') {
      this.router.navigate(['/admin/register']);
    }
    else if (this.registerType === 'client') {
      this.router.navigate(['/client/register']);
    }
  }


}
