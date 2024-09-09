import { Component, inject, OnInit } from '@angular/core';
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
  categories : string [] = [];
  triage = ['plus récent', 'plus ancien', 'plus demandés', 'moins demandés', 'A -> Z', 'Z -> A'];
  services: Srv[] = [];
  paginatedItems: Srv[] = [];
  pagesNumber: number[] = [];
  countActive = 0;
  page = 1;
  pageSize = 8;
  selectedItem = 1;
  selectedPageIndex = 1;

  private srvService = inject(SrvService);

  ngOnInit() {
    this.loadServices();
    this.loadCategories();
    const savedPage = localStorage.getItem('currentPage');
    if (savedPage) {
      this.page = parseInt(savedPage, 10);
    }
    this.updatePaginatedItems();
  }

  loadServices() {
    this.srvService.getServices().subscribe((data) => {
      this.services.unshift(...data.reverse());
      this.countActive = this.services.filter(service => service.etat === 'active').length;
      this.pagesNumber = Array(Math.ceil(this.services.length / this.pageSize)).fill(0).map((x, i) => i + 1);
      this.updatePaginatedItems();
    });
  }

  loadCategories () {
    this.srvService.getCategories().subscribe((data) => {
      this.categoriesObj = data;
      this.categoriesObj.forEach (cat => {
        this.categories.push(cat.cat);
      })
    })
  }


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
