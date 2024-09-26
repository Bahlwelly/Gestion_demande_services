import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SrvService } from '../../../../services/srv/srv.service';
import { Categorie, Srv } from '../../../../interfaces/srv';
import { Fournisseur } from '../../../../interfaces/fournisseur';
import { MoyennePipe } from "../../../../pipes/moyenne.pipe";
import { ShareService } from '../../../../services/shared/share.service';
import { FournisseursService } from '../../../../services/fourinsseurs/fournisseurs.service';

@Component({
  selector: 'app-client-details',
  standalone: true,
  imports: [RouterLink, MoyennePipe],
  templateUrl: './client-details.component.html',
  styleUrl: './client-details.component.css'
})
export class ClientDetailsComponent {
  private route = inject(ActivatedRoute);
  private srvSrvice = inject(SrvService);
  private sharedService = inject(ShareService)
  private frnService = inject(FournisseursService);
  serviceDetails! : Srv; 
  categorie : string | undefined;
  critieres : string[] = [];
  categoriesObj! : Categorie[];
  fournisseurs! : Fournisseur[];
  serviceFournisseurs! : Fournisseur[];
  rating : number = 0;

  ajouteSouhaite () {
    this.sharedService.toggleSouhaite(this.serviceDetails);  
  }


  ngOnInit () {
    this.loadCategories();
    const id = this.route.snapshot.paramMap.get('id');
    console.log(id);
    
    if (id !== null) {
      this.srvSrvice.getServiceDetails(id).subscribe((data) => {
        this.serviceDetails = data;
        
        this.critieres = data.creiteres;
        this.loadFournisseurs();

        this.serviceFournisseurs = this.fournisseurs.filter(frn => frn.services.includes(parseInt(id)));
      }
      ,
      (error) => {
        console.error('Error fetching service details', error);
      });
    }
    }

    loadCategories () {
      this.srvSrvice.getCategories().subscribe((data) => {
        this.categoriesObj = data
      });
    }

    getCategorieName (id : string) : string | undefined {
      this.categorie = this.categoriesObj.find(cat => cat.id === id)?.cat
      return this.categorie;
    }

    loadFournisseurs () {
      this.frnService.getFournisseurs().subscribe(data => {
        this.fournisseurs = data;
      });
    }
}
