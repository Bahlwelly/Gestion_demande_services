import { Component, inject } from '@angular/core';
import { Categorie } from '../../../interfaces/categorie';
import { SrvService } from '../../../services/srv/srv.service';
import { RouterLink } from '@angular/router';
import { Srv } from '../../../interfaces/srv';
import { ShareService } from '../../../services/shared/share.service';

@Component({
  selector: 'app-souhaites',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './souhaites.component.html',
  styleUrl: './souhaites.component.css'
})
export class SouhaitesComponent {
  categoriesObj! : Categorie[];
  private srvService = inject(SrvService);
  private sharedService = inject(ShareService);

  listSouhaites : Srv[] = [];

  ngOnInit () {
    this.sharedService.souhites$.subscribe(data => {
      this.listSouhaites = data;
    });

    this.loadCategories();
  }

  loadCategories () {
    this.srvService.getCategories().subscribe((data) => {
      this.categoriesObj = data
    });
  }
}
