import { Component, inject } from '@angular/core';
import { Categorie, Srv } from '../../../../interfaces/srv';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SrvService } from '../../../../services/srv/srv.service';

@Component({
  selector: 'app-modifier-apercu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './modifier-apercu.component.html',
  styleUrl: './modifier-apercu.component.css'
})
export class ModifierApercuComponent {
  service! : Srv;
  private route = inject(ActivatedRoute);
  private srvService = inject(SrvService);
  categorie! : string | undefined;
  categoriesObj :Categorie[] = [];

  ngOnInit () {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.srvService.getServiceDetails(id).subscribe(data => {
        this.service = data;
      });
    }
  }

  getCategorieName (id : string) : string | undefined {
    this.categorie = this.categoriesObj.find(cat => cat.id === id)?.cat
    return this.categorie;
  }
}
