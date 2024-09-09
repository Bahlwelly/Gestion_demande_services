import { Component, inject } from '@angular/core';
import { ShareService } from '../../../../services/shared/share.service';
import { SrvService } from '../../../../services/srv/srv.service';
import { Categorie } from '../../../../interfaces/categorie';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-services-form',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './services-form.component.html',
  styleUrl: './services-form.component.css'
})
export class ServicesFormComponent {
  id : number = 1;
  categoriesObj : Categorie[] = [];
  sous_categories! : string [];
  selectSousCat! : HTMLSelectElement;
  
  private srvService = inject(SrvService);

  loadCategories () {
    this.srvService.getCategories().subscribe((data) => {
      this.categoriesObj = data;
      this.categoriesObj.forEach(cat => {
        console.log(cat.critieres);
      });
    });
  }

  ngOnInit () {
    this.loadCategories();
  }
}