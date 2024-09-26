import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SrvService } from '../../../../services/srv/srv.service';
import { Categorie, Srv } from '../../../../interfaces/srv';
import { enableDebugTools } from '@angular/platform-browser';
import { FournisseursService } from '../../../../services/fourinsseurs/fournisseurs.service';
import { Fournisseur } from '../../../../interfaces/fournisseur';

@Component({
  selector: 'app-admin-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './admin-details.component.html',
  styleUrl: './admin-details.component.css'
})
export class AdminDetailsComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router)
  private srvSrvice = inject(SrvService);
  private frnService = inject(FournisseursService);
  serviceDetails! : Srv; 
  categorie : string | undefined;
  critieres : string[] = [];
  categoriesObj! : Categorie[];
  frn! : Fournisseur;
  selectedPage = localStorage.getItem('selctedItem');
  id!: string | null;

  ngOnInit () {
    this.loadCategories();
    this.getFrn();
    this.route.paramMap.subscribe(params => {
      this.id = params.get('id');
      console.log(this.id); // Logs ID whenever it changes
      if (this.id !== null) {
        this.srvSrvice.getServiceDetails(this.id).subscribe((data) => {
          this.serviceDetails = data;
          console.log(this.serviceDetails);
          
          this.critieres = data.creiteres;
        }
        ,
        (error) => {
          console.error('Error fetching service details', error);
        });
      }
    });
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

    archiver () {
      this.srvSrvice.archiverService(this.serviceDetails.id).subscribe(responce => {
        alert('Service Archivee !!');
        this.router.navigate(['/main/services/list']);
      })
    }

    getFrn () {
      const id = this.route.snapshot.paramMap.get('id');
      if (id != null) {
        this.frnService.getFournisseurDetails(id).subscribe(data => {
          this.frn = data;
        });
      }
    } 

    
}
