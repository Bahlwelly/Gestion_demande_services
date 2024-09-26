import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-admin-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css'
})
export class AdminSidebarComponent {
  private router = inject(Router);
  selectedItem = '';
  selectItem(event: Event, item: string) {
    this.selectedItem = item;
    localStorage.setItem('selctedItem', item);
  } 
  
  ngOnInit() {
    console.log('services list init');
    
    const storedItem = localStorage.getItem('selctedItem');
    if (storedItem) {
      this.selectedItem = storedItem;
    } else {
      this.selectedItem = 'servs';
    }
  }  
}
