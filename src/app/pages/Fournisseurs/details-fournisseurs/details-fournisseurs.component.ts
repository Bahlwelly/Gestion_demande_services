import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FournisseursService } from '../../../services/fourinsseurs/fournisseurs.service';
import { Fournisseur } from '../../../interfaces/fournisseur';
import { SrvService } from '../../../services/srv/srv.service';
import { Srv } from '../../../interfaces/srv';
import { ShorterPipe } from "../../../pipes/shorter.pipe";

@Component({
  selector: 'app-details-fournisseurs',
  standalone: true,
  imports: [RouterLink, ShorterPipe],
  templateUrl: './details-fournisseurs.component.html',
  styleUrl: './details-fournisseurs.component.css'
})
export class DetailsFournisseursComponent {
  private frnService = inject(FournisseursService);
  private route = inject(ActivatedRoute);
  private srvService = inject(SrvService);
  private router = inject(Router);
  services : Srv[] = [];
  frnServices : Srv[] = [];
  fournisseursDetails! : Fournisseur;
  ngOnInit () {
    this.laodFournisseurDetails();
    this.loadServcies();
  }

  laodFournisseurDetails () {
    const id = this.route.snapshot.paramMap.get('id');

    if (id != null) {
      this.frnService.getFournisseurDetails(id).subscribe(data => {
        this.fournisseursDetails = data;
      })
    }
  }

  loadServcies () {
    this.srvService.getServices().subscribe(data => {
      this.services = data;
      this.getFrnServices();
    });
  }

  getFrnServices () {
    this.services.forEach(service => {
      if (this.fournisseursDetails.services.includes(parseInt(service.id))) {
        this.frnServices.push(service);
      }
    });
  }

  logId( service : Srv ) {
    console.log(service.id);
  }
  
  delete (id : string) {
    this.frnService.deleteFournisseur(id).subscribe(responce => {
      this.router.navigate(['/main/fournisseurs/list']);
      alert ('Fournisseurs Deleted');
    });
  }
}
