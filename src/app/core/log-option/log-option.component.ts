import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-log-option',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './log-option.component.html',
  styleUrl: './log-option.component.css'
})
export class LogOptionComponent {
  registerType : string = '';

  setRegisterType (type : string) {
    this.registerType = type;
    localStorage.setItem('registerType', this.registerType);
  }
}
