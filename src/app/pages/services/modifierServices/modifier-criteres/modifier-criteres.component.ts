import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SrvService } from '../../../../services/srv/srv.service';
import { Categorie, Srv } from '../../../../interfaces/srv';
import { ShareService } from '../../../../services/shared/share.service';

@Component({
  selector: 'app-modifier-criteres',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule ,RouterLink],
  templateUrl: './modifier-criteres.component.html',
  styleUrl: './modifier-criteres.component.css'
})
export class ModifierCriteresComponent {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private srvService = inject(SrvService);
  private sharedService = inject(ShareService);
  serviceCreiteres : string[] = [];
  creiteres : string[] = [];
  service! : Srv;
  categorieObj: Categorie[] = [];
  selectedCategorieId!: string;
  private fb = inject(FormBuilder);
  formCriteres! :FormGroup;

  
  constructor () {
    this.formCriteres = this.fb.group({
      options : this.fb.array([], Validators.required)
    })
  }

  ngOnInit() {
    this.loadService();
    this.loadCritieres();
  }
  
  loadService () {
    const id = this.route.snapshot.paramMap.get('id');
    if (id != null) {
      this.srvService.getServiceDetails(id).subscribe(data => {
        this.service = data;
        this.serviceCreiteres = this.service.creiteres
      });
    }
  }

  loadCritieres () {
    this.srvService.getCategories().subscribe((data) => {
      this.categorieObj = data;
      const selectedCategorie = this.categorieObj.find(cat => cat.id === this.service.categorie.toString());
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
      this.updateCriteres();
      this.router.navigate(['/main/service/modifier/apercu/', this.service.id]);
      console.log(this.service.creiteres);
      
    }
    else {
      alert('error!!!')
    }
  }
  
  get options () : FormArray {
    return this.formCriteres.get('options') as FormArray;
  }

  getStringOptions () : string[]{
    return this.options.controls.map(control => control.value);
  }

  updateCriteres () {
    this.srvService.updateCriteres(this.service.id, this.getStringOptions()).subscribe(responce => {
      alert('Critere Updated');
    }) 
  }

}
