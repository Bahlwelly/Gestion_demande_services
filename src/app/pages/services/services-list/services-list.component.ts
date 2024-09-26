import { Component, inject, Input, OnInit } from '@angular/core';
import { SrvService } from '../../../services/srv/srv.service';
import { Categorie, Srv } from '../../../interfaces/srv';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgFor } from '@angular/common';
import { ShorterPipe } from "../../../pipes/shorter.pipe";
import { RouterLink } from '@angular/router';
import { ShareService } from '../../../services/shared/share.service';

@Component({
  selector: 'app-services-list',
  standalone: true,
  imports: [NgxPaginationModule, NgFor, ShorterPipe, RouterLink],
  templateUrl: './services-list.component.html',
  styleUrls: ['./services-list.component.css']
})
export class ServicesListComponent implements OnInit {
  categoriesObj : Categorie[] = [];
  categorie : string | undefined;
  triage = ['plus récent', 'plus ancien', 'plus demandés', 'moins demandés', 'A -> Z', 'Z -> A'];
  services: Srv[] = [];
  paginatedItems: Srv[] = [];
  pagesNumber: number[] = [];
  sortedServices : Srv[] = [];
  countActive = 0;
  page = 1;
  pageSize = 7;
  selectedItem = 1;
  selectedPageIndex = 1;

  isAdmin = localStorage.getItem('registerType') === 'admin' ? true : false;

  private srvService = inject(SrvService);
  private sharedService = inject(ShareService);
  
  ngOnInit() {
    this.sharedService.loadServices().subscribe(data => {
      
      this.services = data.filter(service => service.archivee === false).reverse();
      this.initializeServices();
    });
  }

  initializeServices () {
    // this.services.reverse;
    this.countActive = this.services.filter(service => service.etat === 'active').length;
    this.pagesNumber = Array(Math.ceil(this.services.length / this.pageSize)).fill(0).map((x, i) => i + 1);
    this.updatePaginatedItems();
    this.loadCategories();
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) {
      this.page = parseInt(savedPage, 10);
    }
    this.sortedServices = this.services;
    this.updatePaginatedItems();
  }

  loadCategories () {
    this.srvService.getCategories().subscribe((data) => {
      this.categoriesObj = data
    });
  }

  getCategorieName (id : string) : string | undefined {
    this.services.forEach((srv) => {
      this.categorie = this.categoriesObj.find(cat => cat.id === id)?.cat
    });

    return this.categorie;
  }

  // sortByCategories (event : Event) {
  //   console.log('sort by category is called');
    
  //   const target = (event.target as HTMLSelectElement);
  //   const selectedCategorieId = target.value;
  //   console.log('Selected Category id : ', selectedCategorieId);
    
    
  //   this.sortedServices = this.services.filter(service => {
  //     console.log('Service Category ID:', service.categorie.id)
  //     return service.categorie.id === selectedCategorieId
  //   });

  //   console.log('Sorted Services:', this.sortedServices);
  //   this.updatePaginatedItems()
  // }


  updatePaginatedItems() {
    const startIndex = (this.page - 1) * this.pageSize;
    
    const endIndex = startIndex + this.pageSize;
    this.paginatedItems = this.services.slice(startIndex, endIndex);
    const currentPageIndex = localStorage.getItem('currentPageIndex');
    if (currentPageIndex) {
      this.selectedPageIndex = parseInt(currentPageIndex);
    } else {
      this.selectedPageIndex = 1;
    }
  }

  changePage(newPage: number) {
    this.page = newPage;
    localStorage.setItem('currentPage', this.page.toString());
    this.updatePaginatedItems();
    let event! : Event;
    this.selectItem(event,this.page);
  }

  selectItem(event: Event, item: number) {
    this.selectedPageIndex = item;
    localStorage.setItem('currentPageIndex', this.selectedPageIndex.toString())
  }
}
