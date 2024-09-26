import { Component, inject } from '@angular/core';
import { Categorie } from '../../../interfaces/categorie';
import { Srv } from '../../../interfaces/srv';
import { SrvService } from '../../../services/srv/srv.service';
import { ShareService } from '../../../services/shared/share.service';
import { RouterLink } from '@angular/router';
import { ShorterPipe } from "../../../pipes/shorter.pipe";
import { FournisseursService } from '../../../services/fourinsseurs/fournisseurs.service';
import { Fournisseur } from '../../../interfaces/fournisseur';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-list-fournisseurs',
  standalone: true,
  imports: [RouterLink, ShorterPipe, NgFor],
  templateUrl: './list-fournisseurs.component.html',
  styleUrl: './list-fournisseurs.component.css'
})
export class ListFournisseursComponent {
  categoriesObj : Categorie[] = [];
  categorie : string | undefined;
  triage = ['plus récent', 'plus ancien', 'moins demandés', 'A -> Z', 'Z -> A'];
  services: Srv[] = [];
  paginatedItems: Fournisseur[] = [];
  pagesNumber: number[] = [];
  sortedList : Fournisseur[] = [];
  fournisseurs : Fournisseur[] = [];
  countDisponible = 0;
  page = 1;
  pageSize = 8;
  selectedItem = 1;
  selectedPageIndex = 1;

  isAdmin = localStorage.getItem('registerType') === 'admin' ? true : false;

  private srvService = inject(SrvService);
  private sharedService = inject(ShareService);
  private frnService = inject(FournisseursService);
  
  ngOnInit() {
    this.frnService.getFournisseurs().subscribe(data => {
      this.fournisseurs = data.reverse();
      this.initializeFournisseurs();
    })
  }


  initializeFournisseurs () {
    // this.services.reverse;
    this.countDisponible = this.fournisseurs.filter(frn => frn.disponible === true).length;
    this.pagesNumber = Array(Math.ceil(this.fournisseurs.length / this.pageSize)).fill(0).map((x, i) => i + 1);
    this.updatePaginatedItems();
    this.loadCategories();
    const savedPage = localStorage.getItem('frnCurrentPage');
    if (savedPage) {
      this.page = parseInt(savedPage, 10);
    }
    this.sortedList = this.fournisseurs;
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



  updatePaginatedItems() {
    const startIndex = (this.page - 1) * this.pageSize;
    
    const endIndex = startIndex + this.pageSize;
    this.paginatedItems = this.fournisseurs.slice(startIndex, endIndex);
    const currentPageIndex = localStorage.getItem('FrnCurrentPageIndex');
    if (currentPageIndex) {
      this.selectedPageIndex = parseInt(currentPageIndex);
    } else {
      this.selectedPageIndex = 1;
    }
  }

  changePage(newPage: number) {
    this.page = newPage;
    localStorage.setItem('frnCurrentPage', this.page.toString());
    this.updatePaginatedItems();
    let event! : Event;
    this.selectItem(event,this.page);
  }

  selectItem(event: Event, item: number) {
    this.selectedPageIndex = item;
    localStorage.setItem('FrnCurrentPageIndex', this.selectedPageIndex.toString())
  }
}
