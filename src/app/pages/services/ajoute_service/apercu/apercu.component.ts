import { Component, inject } from '@angular/core';
import { ShareService } from '../../../../services/shared/share.service';
import { Router, RouterLink } from '@angular/router';
import { Categorie, Srv } from '../../../../interfaces/srv';
import { SrvService } from '../../../../services/srv/srv.service';

@Component({
  selector: 'app-apercu',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './apercu.component.html',
  styleUrl: './apercu.component.css'
})
export class ApercuComponent {
  private router = inject(Router);
  private sharedService = inject(ShareService);
  newService! : Srv; 
  options : string [] = [];
  private srvSrvice = inject (SrvService);
  categoriesObj : Categorie[] = [];
  categorie: string | undefined;
  services : Srv[] = [];
  defultEtat = "active";
  defultArchived = false;


  ngOnInit () {
    
    this.loadCategories();
    
    this.sharedService.currentFormData$.subscribe(data => {
      this.newService = data;
      this.newService.etat = this.defultEtat;
      this.newService.archivee = this.defultArchived;
      console.log(this.newService.archivee);
      
      this.sharedService.currentData$.subscribe(data => {
        this.newService.creiteres = data;
        console.log(this.options);    
      })
    })

  }

  loadCategories () {
    this.srvSrvice.getCategories().subscribe((data) => {
      this.categoriesObj = data
      console.log(this.categoriesObj);
      
    });
  }

  getCategorieName (id : string) : string | undefined {
    this.categorie = this.categoriesObj.find(cat => cat.id === id)?.cat
    return this.categorie;
  }

  enregistrer (service : Srv) {
    this.srvSrvice.addService(service).subscribe(
      (responce) => {
        alert('new Service added succefully !!');
        this.router.navigate(['/main/services/list']);
      },
      (error) => {
        alert('error!!!');
      }
    );
  }
}
