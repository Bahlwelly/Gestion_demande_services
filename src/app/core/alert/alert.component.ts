import { NgClass, NgIf } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-alert',
  standalone: true,
  imports: [NgIf, NgClass],
  templateUrl: './alert.component.html',
  styleUrl: './alert.component.css'
})
export class AlertComponent {
  @Input() title : string = ''
  @Input() message: string = '';
  @Input() type: 'success' | 'error' | 'info' | string = 'info';
  @Input() visible: boolean = false;

  close () {
    this.visible = false;
  }
}
