import { Component } from '@angular/core';
import { AdminSidebarComponent } from '../../core/sidebars/admin-sidebar/admin-sidebar.component';
import { NgIf } from '@angular/common';
import { ClientSidebarComponent } from "../../core/sidebars/client-sidebar/client-sidebar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [AdminSidebarComponent, NgIf, ClientSidebarComponent, RouterOutlet],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {
  accessType = localStorage.getItem('registerType');
}
