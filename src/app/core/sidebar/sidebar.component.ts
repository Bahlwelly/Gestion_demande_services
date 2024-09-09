import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  selectedItem = '';
  selectItem(event: Event, item: string) {
    this.selectedItem = item;
    localStorage.setItem('selctedItem', item);
  } 
  
  ngOnInit() {
    const storedItem = localStorage.getItem('selctedItem');
    if (storedItem) {
      this.selectedItem = storedItem;
    } else {
      this.selectedItem = 'dashboard';
    }
  }
  
}
