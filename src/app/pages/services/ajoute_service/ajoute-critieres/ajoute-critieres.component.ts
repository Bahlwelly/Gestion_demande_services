import { Component, EventEmitter, inject, Output, output } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SrvService } from '../../../../services/srv/srv.service';
import { Categorie } from '../../../../interfaces/categorie';
import { ShorterPipe } from "../../../../pipes/shorter.pipe";
import { FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
// import Swal from 'sweetalert2';
import { ShareService } from '../../../../services/shared/share.service';
import { Srv } from '../../../../interfaces/srv';

@Component({
  selector: 'app-ajoute-critieres',
  standalone: true,
  imports: [RouterLink, ShorterPipe, ReactiveFormsModule],
  templateUrl: './ajoute-critieres.component.html',
  styleUrl: './ajoute-critieres.component.css'
})
export class AjouteCritieresComponent {
  categorieObj : Categorie[] = [];
  creiteres : string[] = [];
  selectedCategorieId = localStorage.getItem('selectedCategorieId');
  private route = inject(ActivatedRoute);
  private srvService = inject(SrvService);
  private fb = inject(FormBuilder);
  formCriteres! :FormGroup;
  private router = inject(Router);
  private sharedService = inject(ShareService);


  constructor () {
    this.formCriteres = this.fb.group({
      options : this.fb.array([], Validators.required)
    })
  }

  ngOnInit () {
    this.loadCritieres();
  }
  
  loadCritieres () {
    this.srvService.getCategories().subscribe((data) => {
      this.categorieObj = data;
      const selectedCategorie = this.categorieObj.find(cat => cat.id === this.selectedCategorieId);
      this.creiteres = selectedCategorie!.creiteres;
    });
  }

  onCheckboxChange (e : any) {
    const options = this.formCriteres.get('options') as FormArray;
    
    if (e.target!.checked) {
      options.push(new FormControl(e.target.value));
    }
    else {
      const index = options.controls.findIndex(x => x.value === e.target.value);
      options.removeAt(index);
    }
  }

  submit () {
    if (this.formCriteres.valid) {
      alert('success');
      this.sendOptions();
      this.router.navigate(['/main/services/apercu']);
    }
    else {
      alert('error!!!')
    }
  }

  get options () : FormArray {
    return this.formCriteres.get('options') as FormArray;
  }

  sendOptions () {
    this.sharedService.changeOptionsData(this.options.value);
  }
}