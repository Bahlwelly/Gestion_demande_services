import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-client-sidebar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './client-sidebar.component.html',
  styleUrl: './client-sidebar.component.css'
})
export class ClientSidebarComponent {
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
      this.selectedItem = 'servs';
    }
  }
  
}
