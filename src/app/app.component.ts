import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from "./core/login/login.component";
import { LogOptionComponent } from './core/log-option/log-option.component';
import { AdminSidebarComponent } from "./core/sidebars/admin-sidebar/admin-sidebar.component";
import { ClientSidebarComponent } from "./core/sidebars/client-sidebar/client-sidebar.component";
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, LogOptionComponent, AdminSidebarComponent, ClientSidebarComponent, NgIf],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'demandeServices';
  validLogin = localStorage.getItem('validLogin');
}
