import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SrvService } from '../../../services/srv/srv.service';
import { Srv } from '../../../interfaces/srv';
import { NgClass } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Fournisseur } from '../../../interfaces/fournisseur';
import { FournisseursService } from '../../../services/fourinsseurs/fournisseurs.service';

@Component({
  selector: 'app-ajoute-fournisseurs',
  standalone: true,
  imports: [RouterLink, NgClass, ReactiveFormsModule],
  templateUrl: './ajoute-fournisseurs.component.html',
  styleUrl: './ajoute-fournisseurs.component.css'
})
export class AjouteFournisseursComponent {
  private srvService = inject(SrvService);
  private frnService = inject(FournisseursService);
  frns : Fournisseur[] = [];
  private fb = inject(FormBuilder);
  frnForm! : FormGroup; 
  services : Srv[] = [];
  selectedServices : string[] = [];
  s : boolean = false;
  newFrn! : Fournisseur;

  constructor () {
    this.frnForm = this.fb.group({
      nom : ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]],
      tele : ['', [Validators.required, Validators.pattern(/^[\d]{8}$/)]],
      email : ['', [Validators.required, Validators.email]],
      adress : ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]+$/)]]
    });
  }

  loadFrns () {
    this.frnService.getFournisseurs().subscribe(data => {
      this.frns = data;
    })
  }

  loadServices () {
    this.srvService.getServices().subscribe(data => {
      this.services = data;
    });
  }

  toglleServices (event : Event, id : string) {
    if (!this.selectedServices.includes(id)) {
      this.s = true;
      this.selectedServices.push(id);
      console.log('service selected');
    }
    else if (this.selectedServices.includes(id)) {
      this.s = false;
      this.selectedServices = this.selectedServices.filter(serviceId => serviceId != id);
      console.log('service deselected');
    }

    localStorage.setItem('ss', JSON.stringify(this.selectedServices));
  }

  isServiceSelected (id : string) : boolean {
    return this.selectedServices.includes(id);
  }

  ngOnInit () {
    this.loadServices();
    console.log(this.services);
    
    const storedServices = localStorage.getItem('ss');
    if (storedServices) {
      this.selectedServices = JSON.parse(storedServices);
    }
  }

  // initializeNewFrn () {
  //   this.newFrn = {
  //     id
  //   }
  // }

  submit () {
    if (this.frnForm.valid && this.selectedServices.length > 0) {
      
    }
    else {
      alert('error!!!');
    }
    
  }
}
