import { Component, inject } from '@angular/core';
import { ShareService } from '../../../../services/shared/share.service';
import { SrvService } from '../../../../services/srv/srv.service';
import { Categorie } from '../../../../interfaces/categorie';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Srv } from '../../../../interfaces/srv';
import { Fournisseur } from '../../../../interfaces/fournisseur';

@Component({
  selector: 'app-services-form',
  standalone: true,
  imports: [RouterLink, ReactiveFormsModule],
  templateUrl: './services-form.component.html',
  styleUrl: './services-form.component.css'
})
export class ServicesFormComponent {
  categoriesObj : Categorie[] = [];
  sous_categories! : string [];
  selectedCategorieId : string | null = null;
  selectedSousCategorie : string = '';
  servicesForm! : FormGroup;
  private srvService = inject(SrvService);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private sharedService = inject(ShareService);
  private route = inject(ActivatedRoute);
  categorie: string | undefined;

  constructor () {
    this.servicesForm = this.fb.group({
      designation : ['', Validators.required],
      categorie : ['', Validators.required],
      sous_categorie : ['', Validators.required],
      description : ['', Validators.required]
    });
  }
  
  ngOnInit () {
    this.loadCategories();
  }

  loadCategories () {
    this.srvService.getCategories().subscribe((data) => {
      this.categoriesObj = data;
    });
  }

  onCategorieChange (event : Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.selectedCategorieId = selectedValue;

    if (this.selectedCategorieId) {
      const selectedCategorie = this.categoriesObj.find(cat => cat.id === this.selectedCategorieId);
      localStorage.setItem('selectedCategorieId', selectedCategorie!.id);
      if (selectedCategorie && selectedCategorie.sous_categories) {
        this.sous_categories = selectedCategorie.sous_categories;
      }
      else {
        this.sous_categories = [];
      }
    }
    else {
      this.sous_categories = [];
    }
    this.selectedSousCategorie = '';
  }

  onSousCategorieChange (event : Event) {
    this.selectedSousCategorie = (event.target as HTMLSelectElement).value;
  }
  
  
  suivant () {
    // console.log('services Form works!!');
    if (this.servicesForm.valid) {
      this.sharedService.changeFormData(this.servicesForm.value);
      console.log('Form submitted : ', this.servicesForm.value);
      this.router.navigate(['/main/services/ajoute/creiteres']);
    }
    else {
      alert('error!!')
    }
  }
}