import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { SrvService } from '../../../services/srv/srv.service';
import { Srv } from '../../../interfaces/srv';
import { CommonModule, NgFor } from '@angular/common';

@Component({
  selector: 'app-services-details',
  standalone: true,
  imports: [RouterLink, NgFor],
  templateUrl: './services-details.component.html',
  styleUrl: './services-details.component.css'
})
export class ServicesDetailsComponent {
  private route = inject(ActivatedRoute);
  private srvSrvice = inject(SrvService);
  serviceDetails! : Srv; 
  critieres : string[] = [];

  ngOnInit () {
    const id = this.route.snapshot.paramMap.get('id');
    if (id !== null) {
      this.srvSrvice.getServiceDetails(parseInt(id)).subscribe((data) => {
        this.serviceDetails = data;
        this.critieres = data.creiteres;
      });
    }
  }
}
